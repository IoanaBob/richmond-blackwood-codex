import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import dotenv from "dotenv";
import mime from "mime-types";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2026-03-11";
const DEFAULT_AUTH_FILE = path.join(os.homedir(), ".codex", "richmond-blackwood", "notion.env");
const COMMUNICATIONS_DATA_SOURCE_ID = "1b5e4130-1314-8183-afd8-000b6f4da982";
const MAX_SINGLE_PART_BYTES = 20 * 1024 * 1024;
const MULTI_PART_BYTES = 10 * 1024 * 1024;
const DEFAULT_COMMUNICATIONS_PROPERTIES = [
  "Title",
  "Status",
  "Relevance",
  "Type",
  "Sent/Received On",
  "Created At",
  "Company",
  "Individual",
  "Tasks",
  "Document(s)",
  "Translated Doc(s)",
];

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

interface ParsedArgs {
  command: string;
  positionals: string[];
  options: Record<string, string | boolean>;
}

interface NotionListResponse {
  results?: Json[];
  has_more?: boolean;
  next_cursor?: string | null;
}

interface FileCandidate {
  source: string;
  name: string;
  type: string;
  url: string;
  expiry_time?: string;
}

interface UploadPlan {
  mode: "single_part" | "multi_part";
  filename: string;
  contentType: string;
  size: number;
  parts: number;
}

class NotionApiClient {
  public constructor(
    private readonly token: string,
    private readonly notionVersion: string,
  ) {}

  public async getJson(endpoint: string, query?: URLSearchParams): Promise<Json> {
    return this.requestJson("GET", endpoint, undefined, query);
  }

  public async postJson(endpoint: string, body?: Json, query?: URLSearchParams): Promise<Json> {
    return this.requestJson("POST", endpoint, body, query);
  }

  public async patchJson(endpoint: string, body?: Json, query?: URLSearchParams): Promise<Json> {
    return this.requestJson("PATCH", endpoint, body, query);
  }

  public async sendForm(endpoint: string, form: FormData): Promise<Json> {
    return this.request("POST", endpoint, {
      body: form,
      headers: this.authHeaders(),
    });
  }

  private async requestJson(method: string, endpoint: string, body?: Json, query?: URLSearchParams): Promise<Json> {
    const headers = {
      ...this.authHeaders(),
      "Content-Type": "application/json",
    };
    return this.request(method, endpoint, {
      body: body === undefined ? undefined : JSON.stringify(body),
      headers,
      query,
    });
  }

  private authHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Notion-Version": this.notionVersion,
    };
  }

  private async request(
    method: string,
    endpoint: string,
    options: { body?: BodyInit | string; headers: Record<string, string>; query?: URLSearchParams },
  ): Promise<Json> {
    const url = new URL(`${NOTION_API_BASE}${endpoint}`);
    if (options.query) {
      for (const [key, value] of options.query.entries()) {
        url.searchParams.append(key, value);
      }
    }

    let lastError: Error | undefined;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        const response = await fetch(url, {
          method,
          headers: options.headers,
          body: options.body,
        });
        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            return (await response.json()) as Json;
          }
          return await response.text();
        }

        const detail = sanitizeForOutput(await response.text());
        if ((response.status === 429 || response.status === 503 || response.status === 504) && attempt < 3) {
          const retryAfter = Number(response.headers.get("retry-after") || "0");
          await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 500 * 2 ** attempt);
          continue;
        }

        throw new Error(`Notion API ${method} ${endpoint} failed with HTTP ${response.status}: ${detail}`);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < 3 && isTransientNetworkError(lastError)) {
          await sleep(500 * 2 ** attempt);
          continue;
        }
        throw lastError;
      }
    }
    throw lastError || new Error(`Notion API ${method} ${endpoint} failed.`);
  }
}

async function main(argv: string[]): Promise<number> {
  const parsed = parseArgs(argv);
  if (!parsed.command || parsed.options.help) {
    printUsage();
    return parsed.options.help ? 0 : 2;
  }

  if (parsed.command === "help") {
    printUsage();
    return 0;
  }

  if (parsed.command === "upload-file" && parsed.options.dryRun) {
    printJson({ command: parsed.command, dry_run: true, plan: uploadPlan(parsed.positionals[0]) });
    return 0;
  }

  const auth = loadNotionAuth(parsed.options);
  const client = new NotionApiClient(auth.token, stringOption(parsed.options, "notionVersion", NOTION_VERSION));

  if (parsed.command === "probe-auth") {
    const user = await client.getJson("/users/me");
    printJson({
      command: parsed.command,
      auth_source: auth.source,
      notion_version: stringOption(parsed.options, "notionVersion", NOTION_VERSION),
      user: summarizeUser(user),
    });
    return 0;
  }

  if (parsed.command === "communications-export") {
    const result = await exportDataSource(client, {
      dataSourceId: stringOption(parsed.options, "dataSourceId", COMMUNICATIONS_DATA_SOURCE_ID),
      filterProperties: listOption(parsed.options, "filterProperties", DEFAULT_COMMUNICATIONS_PROPERTIES),
      filter: jsonFileOption(parsed.options, "filterJson"),
      sorts: jsonFileOption(parsed.options, "sortJson") as Json[] | undefined,
      pageSize: intOption(parsed.options, "pageSize", 100),
      limit: optionalIntOption(parsed.options, "limit"),
      inTrash: boolOption(parsed.options, "inTrash"),
    });
    writeResult(result, parsed.options);
    return 0;
  }

  if (parsed.command === "query-data-source") {
    const dataSourceId = parsed.positionals[0] || stringOption(parsed.options, "dataSourceId");
    if (!dataSourceId) {
      throw new Error("query-data-source requires a data source ID or --data-source-id.");
    }
    const result = await exportDataSource(client, {
      dataSourceId,
      filterProperties: listOption(parsed.options, "filterProperties"),
      filter: jsonFileOption(parsed.options, "filterJson"),
      sorts: jsonFileOption(parsed.options, "sortJson") as Json[] | undefined,
      pageSize: intOption(parsed.options, "pageSize", 100),
      limit: optionalIntOption(parsed.options, "limit"),
      inTrash: boolOption(parsed.options, "inTrash"),
    });
    writeResult(result, parsed.options);
    return 0;
  }

  if (parsed.command === "download-page-files") {
    const pageId = parsed.positionals[0] || stringOption(parsed.options, "pageId");
    if (!pageId) {
      throw new Error("download-page-files requires a page ID.");
    }
    const result = await downloadPageFiles(client, pageId, parsed.options);
    printJson(result);
    return 0;
  }

  if (parsed.command === "upload-file") {
    const result = await uploadFile(client, parsed.positionals[0], parsed.options);
    printJson(result);
    return 0;
  }

  throw new Error(`Unknown command: ${parsed.command}`);
}

async function exportDataSource(
  client: NotionApiClient,
  options: {
    dataSourceId: string;
    filterProperties?: string[];
    filter?: Json;
    sorts?: Json[];
    pageSize: number;
    limit?: number;
    inTrash?: boolean;
  },
): Promise<Json> {
  const pageSize = clamp(options.pageSize, 1, 100);
  const query = new URLSearchParams();
  for (const property of options.filterProperties || []) {
    query.append("filter_properties[]", property);
  }

  const results: Json[] = [];
  let hasMore = true;
  let cursor: string | undefined;
  let pageCount = 0;

  while (hasMore) {
    const requestBody: { [key: string]: Json } = { page_size: pageSize };
    if (cursor) requestBody.start_cursor = cursor;
    if (options.filter) requestBody.filter = options.filter;
    if (options.sorts) requestBody.sorts = options.sorts;
    if (options.inTrash !== undefined) requestBody.in_trash = options.inTrash;

    const response = (await client.postJson(
      `/data_sources/${stripCollectionPrefix(options.dataSourceId)}/query`,
      requestBody,
      query,
    )) as NotionListResponse;

    pageCount += 1;
    for (const item of response.results || []) {
      results.push(item);
      if (options.limit && results.length >= options.limit) break;
    }

    if (options.limit && results.length >= options.limit) {
      hasMore = Boolean(response.has_more);
      cursor = response.next_cursor || undefined;
      break;
    }

    hasMore = Boolean(response.has_more);
    cursor = response.next_cursor || undefined;
  }

  return {
    data_source_id: stripCollectionPrefix(options.dataSourceId),
    fetched_at: new Date().toISOString(),
    page_size: pageSize,
    page_requests: pageCount,
    result_count: results.length,
    has_more: hasMore,
    next_cursor: cursor || null,
    filter_properties: options.filterProperties || [],
    results,
  };
}

async function downloadPageFiles(
  client: NotionApiClient,
  pageId: string,
  options: Record<string, string | boolean>,
): Promise<Json> {
  const page = (await client.getJson(`/pages/${pageId}`)) as { properties?: Record<string, Json>; icon?: Json; cover?: Json };
  const candidates = collectPageFiles(page, stringOption(options, "property") || undefined);
  if (boolOption(options, "includeBlocks")) {
    candidates.push(...(await collectBlockFiles(client, pageId)));
  }

  if (boolOption(options, "dryRun")) {
    return {
      command: "download-page-files",
      page_id: pageId,
      dry_run: true,
      files_found: candidates.length,
      files: candidates.map(({ source, name, type, expiry_time }) => ({ source, name, type, expiry_time: expiry_time || null })),
    };
  }

  const outDir = path.resolve(
    stringOption(options, "outDir") || path.join("/private/tmp", "rb-notion-downloads", sanitizeFileName(pageId)),
  );
  fs.mkdirSync(outDir, { recursive: true, mode: 0o700 });

  const downloads = [];
  for (const candidate of candidates) {
    const target = uniquePath(path.join(outDir, sanitizeFileName(candidate.name || `${candidate.type}-file`)));
    const response = await fetch(candidate.url);
    if (!response.ok) {
      throw new Error(`Failed to download ${candidate.source} (${candidate.name}): HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(target, buffer, { mode: 0o600 });
    downloads.push({
      source: candidate.source,
      name: candidate.name,
      type: candidate.type,
      path: target,
      bytes: buffer.byteLength,
      sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
      expiry_time: candidate.expiry_time || null,
    });
  }

  return {
    command: "download-page-files",
    page_id: pageId,
    out_dir: outDir,
    files_found: candidates.length,
    downloads,
  };
}

async function uploadFile(
  client: NotionApiClient,
  sourcePath: string | undefined,
  options: Record<string, string | boolean>,
): Promise<Json> {
  if (!sourcePath) {
    throw new Error("upload-file requires a local file path.");
  }
  const plan = uploadPlan(sourcePath);
  const createBody: { [key: string]: Json } = {
    mode: plan.mode,
    filename: plan.filename,
    content_type: plan.contentType,
  };
  if (plan.mode === "multi_part") {
    createBody.number_of_parts = plan.parts;
  }

  const upload = (await client.postJson("/file_uploads", createBody)) as { id?: string };
  if (!upload.id) {
    throw new Error("Notion did not return a file upload ID.");
  }

  if (plan.mode === "single_part") {
    await sendSinglePart(client, upload.id, sourcePath, plan);
  } else {
    await sendMultiPart(client, upload.id, sourcePath, plan);
    await client.postJson(`/file_uploads/${upload.id}/complete`, {});
  }

  const attachments: Json[] = [];
  const attachPageId = stringOption(options, "attachPageId");
  const appendToPage = stringOption(options, "appendToPage");
  const property = stringOption(options, "property");
  if (attachPageId && property) {
    attachments.push(await attachToFilesProperty(client, attachPageId, property, upload.id, plan.filename, options));
  }
  if (appendToPage) {
    attachments.push(await appendFileBlock(client, appendToPage, upload.id, stringOption(options, "blockType", "image")));
  }

  return {
    command: "upload-file",
    file_upload_id: upload.id,
    filename: plan.filename,
    content_type: plan.contentType,
    bytes: plan.size,
    mode: plan.mode,
    parts: plan.parts,
    attached: attachments,
    warning: attachments.length === 0 ? "File upload expires unless it is attached to a page, block, icon, cover, or files property within one hour." : null,
  };
}

async function sendSinglePart(client: NotionApiClient, uploadId: string, sourcePath: string, plan: UploadPlan): Promise<void> {
  const data = fs.readFileSync(sourcePath);
  const form = new FormData();
  form.append("file", new Blob([data], { type: plan.contentType }), plan.filename);
  await client.sendForm(`/file_uploads/${uploadId}/send`, form);
}

async function sendMultiPart(client: NotionApiClient, uploadId: string, sourcePath: string, plan: UploadPlan): Promise<void> {
  const fd = fs.openSync(sourcePath, "r");
  try {
    for (let partNumber = 1; partNumber <= plan.parts; partNumber += 1) {
      const offset = (partNumber - 1) * MULTI_PART_BYTES;
      const length = Math.min(MULTI_PART_BYTES, plan.size - offset);
      const buffer = Buffer.alloc(length);
      fs.readSync(fd, buffer, 0, length, offset);
      const form = new FormData();
      form.append("file", new Blob([buffer], { type: plan.contentType }), plan.filename);
      form.append("part_number", String(partNumber));
      await client.sendForm(`/file_uploads/${uploadId}/send`, form);
    }
  } finally {
    fs.closeSync(fd);
  }
}

async function attachToFilesProperty(
  client: NotionApiClient,
  pageId: string,
  property: string,
  uploadId: string,
  filename: string,
  options: Record<string, string | boolean>,
): Promise<Json> {
  const mode = stringOption(options, "propertyMode", "append");
  let files: Json[] = [];
  if (mode === "append") {
    const page = (await client.getJson(`/pages/${pageId}`)) as { properties?: Record<string, { type?: string; files?: Json[] }> };
    const current = page.properties?.[property];
    if (current?.type === "files" && Array.isArray(current.files)) {
      files = current.files;
      if (files.length > 0) {
        throw new Error(
          `Files property "${property}" already has ${files.length} file(s). Refusing to merge automatically; use --property-mode replace only when replacing existing attachments is intended.`,
        );
      }
    }
  } else if (mode !== "replace") {
    throw new Error("--property-mode must be append or replace.");
  }

  files.push({
    type: "file_upload",
    file_upload: { id: uploadId },
    name: filename,
  } as Json);

  await client.patchJson(`/pages/${pageId}`, {
    properties: {
      [property]: {
        type: "files",
        files,
      },
    },
  });
  return { type: "files_property", page_id: pageId, property, mode };
}

async function appendFileBlock(client: NotionApiClient, pageOrBlockId: string, uploadId: string, blockType: string): Promise<Json> {
  const allowed = new Set(["image", "file", "pdf", "audio", "video"]);
  if (!allowed.has(blockType)) {
    throw new Error("--block-type must be one of image, file, pdf, audio, video.");
  }

  await client.patchJson(`/blocks/${pageOrBlockId}/children`, {
    children: [
      {
        type: blockType,
        [blockType]: {
          type: "file_upload",
          file_upload: { id: uploadId },
        },
      },
    ],
  });
  return { type: "block", page_or_block_id: pageOrBlockId, block_type: blockType };
}

function uploadPlan(sourcePath: string | undefined): UploadPlan {
  if (!sourcePath) {
    throw new Error("upload-file requires a local file path.");
  }
  const resolved = path.resolve(sourcePath);
  const stats = fs.statSync(resolved);
  if (!stats.isFile()) {
    throw new Error(`Not a file: ${resolved}`);
  }
  const filename = path.basename(resolved);
  const contentType = mime.lookup(filename) || "application/octet-stream";
  const mode = stats.size <= MAX_SINGLE_PART_BYTES ? "single_part" : "multi_part";
  return {
    mode,
    filename,
    contentType,
    size: stats.size,
    parts: mode === "single_part" ? 1 : Math.ceil(stats.size / MULTI_PART_BYTES),
  };
}

function collectPageFiles(page: { properties?: Record<string, Json>; icon?: Json; cover?: Json }, propertyFilter?: string): FileCandidate[] {
  const files: FileCandidate[] = [];
  if (!propertyFilter) {
    addFileObject(files, "page.icon", "icon", page.icon);
    addFileObject(files, "page.cover", "cover", page.cover);
  }
  for (const [propertyName, property] of Object.entries(page.properties || {})) {
    if (propertyFilter && propertyName !== propertyFilter) continue;
    const prop = property as { type?: string; files?: Json[] };
    if (prop.type !== "files" || !Array.isArray(prop.files)) continue;
    prop.files.forEach((file, index) => addFileObject(files, `property:${propertyName}[${index}]`, propertyName, file));
  }
  return files;
}

async function collectBlockFiles(client: NotionApiClient, blockId: string): Promise<FileCandidate[]> {
  const files: FileCandidate[] = [];
  await walkBlockChildren(client, blockId, files, 0);
  return files;
}

async function walkBlockChildren(client: NotionApiClient, blockId: string, files: FileCandidate[], depth: number): Promise<void> {
  if (depth > 8) return;
  let cursor: string | undefined;
  do {
    const query = new URLSearchParams();
    query.set("page_size", "100");
    if (cursor) query.set("start_cursor", cursor);
    const response = (await client.getJson(`/blocks/${blockId}/children`, query)) as NotionListResponse;
    for (const block of response.results || []) {
      const typed = block as { id?: string; type?: string; has_children?: boolean; [key: string]: Json | undefined };
      if (typed.type && ["image", "file", "pdf", "audio", "video"].includes(typed.type)) {
        addFileObject(files, `block:${typed.id || ""}`, typed.type, typed[typed.type]);
      }
      if (typed.id && typed.has_children) {
        await walkBlockChildren(client, typed.id, files, depth + 1);
      }
    }
    cursor = response.next_cursor || undefined;
  } while (cursor);
}

function addFileObject(files: FileCandidate[], source: string, fallbackName: string, value: Json | undefined): void {
  const file = value as { type?: string; name?: string; file?: { url?: string; expiry_time?: string }; external?: { url?: string } };
  if (!file || typeof file !== "object" || !file.type) return;
  if (file.type === "file" && file.file?.url) {
    files.push({
      source,
      name: file.name || inferNameFromUrl(file.file.url) || fallbackName,
      type: "file",
      url: file.file.url,
      expiry_time: file.file.expiry_time,
    });
  }
  if (file.type === "external" && file.external?.url) {
    files.push({
      source,
      name: file.name || inferNameFromUrl(file.external.url) || fallbackName,
      type: "external",
      url: file.external.url,
    });
  }
}

function loadNotionAuth(options: Record<string, string | boolean>): { token: string; source: string } {
  const explicitAuthFile = stringOption(options, "authFile");
  const candidateAuthFile = explicitAuthFile || (fs.existsSync(DEFAULT_AUTH_FILE) ? DEFAULT_AUTH_FILE : "");
  if (candidateAuthFile) {
    dotenv.config({ path: path.resolve(candidateAuthFile), override: false });
  }
  const names = ["RB_NOTION_API_KEY", "NOTION_API_KEY", "NOTION_TOKEN"];
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return { token: value, source: candidateAuthFile ? `file:${candidateAuthFile}:${name}` : `env:${name}` };
    }
  }
  throw new Error(
    `Missing Notion API token. Set RB_NOTION_API_KEY, NOTION_API_KEY, or NOTION_TOKEN in the environment, or store it in ${DEFAULT_AUTH_FILE}.`,
  );
}

function parseArgs(argv: string[]): ParsedArgs {
  const command = argv[0] || "";
  const positionals: string[] = [];
  const options: Record<string, string | boolean> = {};

  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eqAt = arg.indexOf("=");
    const rawName = eqAt >= 0 ? arg.slice(2, eqAt) : arg.slice(2);
    const name = camelCase(rawName);
    if (eqAt >= 0) {
      options[name] = arg.slice(eqAt + 1);
      continue;
    }
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      options[name] = next;
      index += 1;
    } else {
      options[name] = true;
    }
  }
  return { command, positionals, options };
}

function writeResult(result: Json, options: Record<string, string | boolean>): void {
  const out = stringOption(options, "out");
  if (out) {
    const resolved = path.resolve(out);
    fs.mkdirSync(path.dirname(resolved), { recursive: true, mode: 0o700 });
    fs.writeFileSync(resolved, `${JSON.stringify(result, null, 2)}\n`, { mode: 0o600 });
    const summary = result as { result_count?: number; page_requests?: number; has_more?: boolean; next_cursor?: string | null };
    printJson({
      output: resolved,
      result_count: summary.result_count,
      page_requests: summary.page_requests,
      has_more: summary.has_more,
      next_cursor: summary.next_cursor,
    });
    return;
  }

  if (boolOption(options, "includeResults")) {
    printJson(result);
    return;
  }

  const summary = result as { data_source_id?: string; result_count?: number; page_requests?: number; has_more?: boolean; next_cursor?: string | null };
  printJson({
    data_source_id: summary.data_source_id,
    result_count: summary.result_count,
    page_requests: summary.page_requests,
    has_more: summary.has_more,
    next_cursor: summary.next_cursor,
    note: "Full results suppressed. Pass --out /private/tmp/...json or --include-results.",
  });
}

function jsonFileOption(options: Record<string, string | boolean>, name: string): Json | undefined {
  const file = stringOption(options, name);
  if (!file) return undefined;
  return JSON.parse(fs.readFileSync(path.resolve(file), "utf8")) as Json;
}

function listOption(options: Record<string, string | boolean>, name: string, fallback?: string[]): string[] | undefined {
  const value = stringOption(options, name);
  if (!value) return fallback;
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function stringOption(options: Record<string, string | boolean>, name: string, fallback = ""): string {
  const value = options[name];
  return typeof value === "string" ? value : fallback;
}

function intOption(options: Record<string, string | boolean>, name: string, fallback: number): number {
  const value = Number(stringOption(options, name, String(fallback)));
  if (!Number.isInteger(value)) {
    throw new Error(`--${name} must be an integer.`);
  }
  return value;
}

function optionalIntOption(options: Record<string, string | boolean>, name: string): number | undefined {
  const value = stringOption(options, name);
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--${name} must be a positive integer.`);
  }
  return parsed;
}

function boolOption(options: Record<string, string | boolean>, name: string): boolean | undefined {
  const value = options[name];
  if (value === undefined) return undefined;
  if (value === true) return true;
  if (value === false) return false;
  if (typeof value === "string") {
    if (["1", "true", "yes"].includes(value.toLowerCase())) return true;
    if (["0", "false", "no"].includes(value.toLowerCase())) return false;
  }
  throw new Error(`--${name} must be boolean.`);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function camelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function stripCollectionPrefix(value: string): string {
  return value.replace(/^collection:\/\//, "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientNetworkError(error: Error): boolean {
  const message = error.message.toLowerCase();
  return ["econnreset", "etimedout", "socket hang up", "fetch failed"].some((needle) => message.includes(needle));
}

function sanitizeForOutput(value: string): string {
  return value
    .replace(/ntn_[A-Za-z0-9_-]+/g, "ntn_[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9._-]+/g, "Bearer [REDACTED]");
}

function sanitizeFileName(value: string): string {
  const cleaned = value.replace(/[^A-Za-z0-9._ -]+/g, "_").trim();
  return cleaned || "notion-file";
}

function uniquePath(target: string): string {
  if (!fs.existsSync(target)) return target;
  const parsed = path.parse(target);
  for (let index = 2; index < 1000; index += 1) {
    const candidate = path.join(parsed.dir, `${parsed.name}-${index}${parsed.ext}`);
    if (!fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`Could not find an unused path for ${target}`);
}

function inferNameFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const base = path.basename(parsed.pathname);
    return decodeURIComponent(base);
  } catch {
    return "";
  }
}

function summarizeUser(user: Json): Json {
  const typed = user as { object?: string; id?: string; type?: string; name?: string; bot?: { workspace_name?: string; workspace_limits?: Json } };
  return {
    object: typed.object || null,
    id: typed.id || null,
    type: typed.type || null,
    name: typed.name || null,
    workspace_name: typed.bot?.workspace_name || null,
    workspace_limits: typed.bot?.workspace_limits || null,
  };
}

function printJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function printUsage(): void {
  process.stdout.write(`Usage: notion_api_helper.ts <command> [options]

Commands:
  probe-auth
    Verify the REST API token and print non-secret bot/workspace limits.

  communications-export [--out FILE] [--limit N] [--page-size N] [--filter-properties CSV]
    Page the canonical Communications data source through the Notion REST API.

  query-data-source <data-source-id> [--out FILE] [--limit N] [--page-size N] [--filter-json FILE] [--sort-json FILE]
    Page an arbitrary Notion data source through the Notion REST API.

  download-page-files <page-id> [--property NAME] [--include-blocks] [--out-dir DIR] [--dry-run]
    Fetch a page, find file/image objects, refresh signed URLs, and download them.

  upload-file <local-file> [--attach-page-id ID --property NAME] [--property-mode append|replace] [--append-to-page ID --block-type image|file|pdf|audio|video] [--dry-run]
    Upload a local file through the Notion File Upload API, using multipart mode above 20 MiB.
    Default files-property mode is append only when the target property is empty; use replace deliberately.

Auth:
  Set RB_NOTION_API_KEY, NOTION_API_KEY, or NOTION_TOKEN in the environment, or create:
  ${DEFAULT_AUTH_FILE}

Global options:
  --auth-file FILE
  --notion-version VERSION
`);
}

void main(process.argv.slice(2)).then(
  (code) => process.exit(code),
  (error) => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${sanitizeForOutput(message)}\n`);
    process.exit(1);
  },
);
