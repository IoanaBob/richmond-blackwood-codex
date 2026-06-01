import fs from "node:fs";
import path from "node:path";

const NOTION_API_ORIGIN = "https://api.notion.com";
const NOTION_VERSION = "2026-03-11";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

interface QueryResponse {
  results?: Json[];
  has_more?: boolean;
  next_cursor?: string | null;
}

async function main(argv: string[]): Promise<number> {
  const { endpoint, options } = parseArgs(argv);
  if (!endpoint || options.help) {
    printUsage();
    return options.help ? 0 : 2;
  }

  const bodyFile = stringOption(options, "body");
  const firstResponseFile = stringOption(options, "firstResponse");
  const outFile = stringOption(options, "out");
  if (!bodyFile || !firstResponseFile || !outFile) {
    printUsage();
    return 2;
  }

  const token = process.env.RB_NOTION_API_KEY || process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error("Set RB_NOTION_API_KEY, NOTION_API_KEY, or NOTION_TOKEN in the environment.");
  }

  const url = endpointUrl(endpoint);
  const baseBody = readJsonObject(bodyFile);
  const firstResponse = readQueryResponse(firstResponseFile);
  const results: Json[] = [...(firstResponse.results || [])];
  let cursor = firstResponse.next_cursor || undefined;
  let pageCount = 1;

  if (!firstResponse.has_more || !cursor) {
    writeJson(outFile, outputPayload(url, bodyFile, firstResponseFile, pageCount, results, firstResponse));
    return 0;
  }

  for (;;) {
    const requestBody = { ...baseBody };
    requestBody.start_cursor = cursor;

    const response = await postQuery(url, token, stringOption(options, "notionVersion", NOTION_VERSION), requestBody);
    pageCount += 1;
    results.push(...(response.results || []));

    if (!response.has_more || !response.next_cursor) {
      writeJson(outFile, outputPayload(url, bodyFile, firstResponseFile, pageCount, results, response));
      return 0;
    }

    cursor = response.next_cursor;
  }
}

async function postQuery(url: URL, token: string, notionVersion: string, body: Record<string, Json>): Promise<QueryResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": notionVersion,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Notion query failed with HTTP ${response.status}: ${await response.text()}`);
  }
  return (await response.json()) as QueryResponse;
}

function parseArgs(argv: string[]): { endpoint: string; options: Record<string, string | boolean> } {
  const options: Record<string, string | boolean> = {};
  let endpoint = "";

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--") && !endpoint) {
      endpoint = arg;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected positional argument: ${arg}`);
    }

    const name = camelCase(arg.slice(2));
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      options[name] = next;
      index += 1;
    } else {
      options[name] = true;
    }
  }

  return { endpoint, options };
}

function endpointUrl(endpoint: string): URL {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return new URL(endpoint);
  }
  if (endpoint.startsWith("/v1/")) {
    return new URL(endpoint, NOTION_API_ORIGIN);
  }
  if (endpoint.startsWith("/")) {
    return new URL(`/v1${endpoint}`, NOTION_API_ORIGIN);
  }
  return new URL(`/v1/data_sources/${endpoint.replace(/^collection:\/\//, "")}/query`, NOTION_API_ORIGIN);
}

function readJsonObject(file: string): Record<string, Json> {
  const parsed = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")) as Json;
  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    throw new Error("--body must point to a JSON object.");
  }
  return parsed as Record<string, Json>;
}

function readQueryResponse(file: string): QueryResponse {
  const parsed = readJsonObject(file);
  if (!Array.isArray(parsed.results)) {
    throw new Error("--first-response must point to a Notion query response with a results array.");
  }
  return parsed as QueryResponse;
}

function outputPayload(
  url: URL,
  bodyFile: string,
  firstResponseFile: string,
  pageCount: number,
  results: Json[],
  lastResponse: QueryResponse,
): Json {
  return {
    endpoint: url.toString(),
    body_file: path.resolve(bodyFile),
    first_response_file: path.resolve(firstResponseFile),
    fetched_at: new Date().toISOString(),
    page_count: pageCount,
    result_count: results.length,
    has_more: Boolean(lastResponse.has_more),
    next_cursor: lastResponse.next_cursor || null,
    results,
  };
}

function writeJson(file: string, value: Json): void {
  const resolved = path.resolve(file);
  fs.mkdirSync(path.dirname(resolved), { recursive: true, mode: 0o700 });
  fs.writeFileSync(resolved, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
}

function stringOption(options: Record<string, string | boolean>, name: string, fallback = ""): string {
  const value = options[name];
  return typeof value === "string" ? value : fallback;
}

function camelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function printUsage(): void {
  process.stdout.write(`Usage: notion_query_data_source.ts <data-source-id-or-query-url> --body query.json --first-response page-1.json --out results.json

The body file is the full JSON request body for POST /v1/data_sources/{id}/query.
Run the first curl manually, save its response, and call this only when page 1 has has_more=true.
The endpoint argument may be a collection ID, collection:// ID, /v1 path, or full URL with query params such as filter_properties[].
The script starts with page 1's results, changes only start_cursor between later requests, and appends every response's results array.

Auth env: RB_NOTION_API_KEY, NOTION_API_KEY, or NOTION_TOKEN.
`);
}

void main(process.argv.slice(2)).then(
  (code) => process.exit(code),
  (error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  },
);
