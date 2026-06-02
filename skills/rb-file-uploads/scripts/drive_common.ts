import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import mime from "mime-types";
import fetch from "node-fetch";

import {
  GcloudAccessTokenCommand,
  GcloudAuthManager,
  GcloudLoginCommand,
  GcloudLoginMode,
} from "../../rb-google-auth/scripts/gcloud_auth";
import {
  getPersonaOauthAccessToken,
  hasPersonaOauthCredentials,
  personaSlugForOAuth,
} from "../../rb-google-auth/scripts/persona_oauth_vault";

export const DEFAULT_FILE_FIELDS = "id,name,mimeType,webViewLink,parents";
export const DEFAULT_UPLOAD_FIELDS = "id,name,mimeType,webViewLink,parents,size,md5Checksum";

const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

export type CliOptions = Record<string, string | boolean>;

export interface ParsedArgs {
  positionals: string[];
  options: CliOptions;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  webViewLink?: string;
  parents?: string[];
  size?: string;
  md5Checksum?: string;
}

export interface FolderPathResult {
  targetFolder: DriveFile;
  createdFolders: DriveFile[];
}

export interface UploadFileOptions {
  sourceFile: string;
  folderId: string;
  title?: string;
  mimeType?: string;
  fields?: string;
}

export interface CopyFileOptions {
  sourceFileId: string;
  title: string;
  parentFolderId?: string;
  fields?: string;
}

export type DriveAuthSource = "auto" | "vault" | "adc" | "account" | "gcloud" | "direct-adc";

interface RequestOptions {
  method?: string;
  body?: Buffer | Record<string, unknown> | null;
  headers?: Record<string, string>;
}

export interface DriveAccessTokenProvider {
  getAccessToken(forceLogin?: boolean): string | Promise<string>;
}

interface AdcCredentialFile {
  type?: string;
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
}

interface OAuthTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

export class CliArguments {
  public parse(argv: string[]): ParsedArgs {
    const positionals: string[] = [];
    const options: CliOptions = {};

    for (let index = 0; index < argv.length; index += 1) {
      const arg = argv[index];
      if (!arg.startsWith("--")) {
        positionals.push(arg);
        continue;
      }

      const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
      const key = this.toCamelCase(rawKey);
      if (inlineValue !== undefined) {
        options[key] = inlineValue;
      } else if (index + 1 < argv.length && !argv[index + 1].startsWith("--")) {
        options[key] = argv[index + 1];
        index += 1;
      } else {
        options[key] = true;
      }
    }

    return { positionals, options };
  }

  public stringOption(options: CliOptions, key: string, defaultValue = ""): string {
    const value = options[key];
    if (value === undefined || value === false) {
      return defaultValue;
    }
    return String(value);
  }

  private toCamelCase(key: string): string {
    return key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
  }
}

export class DirectAdcAccessTokenProvider implements DriveAccessTokenProvider {
  public constructor(private readonly adcFile = "") {}

  public async getAccessToken(): Promise<string> {
    const credentials = this.readCredentials();
    const params = new URLSearchParams({
      client_id: credentials.client_id || "",
      client_secret: credentials.client_secret || "",
      refresh_token: credentials.refresh_token || "",
      grant_type: "refresh_token",
    });
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const body = (await response.json()) as OAuthTokenResponse;
    if (!response.ok || !body.access_token) {
      const details = [body.error, body.error_description].filter(Boolean).join(": ") || response.statusText;
      throw new Error(`Failed to refresh saved ADC credentials without gcloud: ${details}`);
    }
    return body.access_token;
  }

  private readCredentials(): AdcCredentialFile {
    const credentialPath = this.resolveAdcFile();
    const parsed = JSON.parse(fs.readFileSync(credentialPath, "utf8")) as AdcCredentialFile;
    if (parsed.type !== "authorized_user" || !parsed.client_id || !parsed.client_secret || !parsed.refresh_token) {
      throw new Error(`Unsupported or incomplete ADC credential file: ${credentialPath}`);
    }
    return parsed;
  }

  private resolveAdcFile(): string {
    const credentialPath =
      this.adcFile ||
      path.join(process.env.CLOUDSDK_CONFIG || path.join(os.homedir(), ".config", "gcloud"), "application_default_credentials.json");
    if (!fs.existsSync(credentialPath) || !fs.statSync(credentialPath).isFile()) {
      throw new Error(`Saved ADC credential file is missing: ${credentialPath}`);
    }
    return credentialPath;
  }
}

export class GcloudAccessTokenProvider implements DriveAccessTokenProvider {
  public constructor(
    private readonly loginMode: GcloudLoginMode = "never",
    private readonly authSource: Exclude<DriveAuthSource, "auto" | "vault" | "direct-adc"> = "adc",
    private readonly accountEmail = "",
    private readonly gcloudConfigDir = "",
  ) {}

  public getAccessToken(forceLogin = false): string {
    if (forceLogin && this.loginMode === "never") {
      throw new Error(
        "Google Drive rejected the cached token, but --auth-login never forbids browser auth. " +
          "Fix the saved gcloud/ADC execution path or explicitly approve a token refresh before retrying.",
      );
    }
    if (this.authSource === "account" || this.authSource === "gcloud") {
      return this.getAccountAccessToken(forceLogin);
    }

    try {
      return this.getApplicationDefaultAccessToken(forceLogin);
    } catch (error) {
      if (!this.accountEmail) {
        throw error;
      }
      const accountError = this.tryAccountAccessToken(forceLogin);
      if (accountError.ok) {
        return accountError.token;
      }
      throw new Error(
        "Failed to get a saved Google Drive token from application-default credentials or the account-token fallback.\n\n" +
          `Application-default error:\n${error instanceof Error ? error.message : String(error)}\n\n` +
          `Account-token fallback error:\n${accountError.error}`,
      );
    }
  }

  private getApplicationDefaultAccessToken(forceLogin = false): string {
    const effectiveForceLogin = forceLogin && this.loginMode !== "never";
    return this.gcloudAccessToken({
      serviceName: "Google Drive",
      tokenCommand: "application-default",
      loginCommand: "application-default",
      loginMode: effectiveForceLogin ? "always" : this.loginMode,
      forceLogin: effectiveForceLogin,
      gcloudConfigDir: this.gcloudConfigDir,
    });
  }

  private getAccountAccessToken(forceLogin = false): string {
    const effectiveForceLogin = forceLogin && this.loginMode !== "never";
    return this.gcloudAccessToken({
      serviceName: "Google Drive account-token fallback",
      tokenCommand: "account",
      loginCommand: "account",
      accountEmail: this.accountEmail,
      loginMode: effectiveForceLogin ? "always" : this.loginMode,
      forceLogin: effectiveForceLogin,
      enableDriveAccess: true,
      gcloudConfigDir: this.gcloudConfigDir,
    });
  }

  private gcloudAccessToken(request: {
    serviceName: string;
    tokenCommand: GcloudAccessTokenCommand;
    loginCommand: GcloudLoginCommand;
    accountEmail?: string;
    loginMode: GcloudLoginMode;
    forceLogin?: boolean;
    enableDriveAccess?: boolean;
    gcloudConfigDir?: string;
  }): string {
    return new GcloudAuthManager().getAccessToken(request);
  }

  private tryAccountAccessToken(forceLogin = false): { ok: true; token: string } | { ok: false; error: string } {
    try {
      return { ok: true, token: this.getAccountAccessToken(forceLogin) };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

export class PersonaVaultDriveAccessTokenProvider implements DriveAccessTokenProvider {
  public constructor(
    private readonly personaSlug = "",
    private readonly accountEmail = "",
    private readonly gcloudConfigDir = "",
  ) {}

  public async getAccessToken(forceLogin = false): Promise<string> {
    if (forceLogin) {
      throw new Error(
        "Google Drive rejected the persona OAuth vault token scope. Refresh-token reload does not add scopes; " +
          "use a different saved persona connection or explicitly approve a new OAuth consent flow for that persona.",
      );
    }
    return getPersonaOauthAccessToken({
      serviceName: "Google Drive",
      personaSlug: this.personaSlug,
      accountEmail: this.accountEmail,
      gcloudConfigDir: this.gcloudConfigDir,
      updateStatus: true,
    });
  }
}

class FallbackDriveAccessTokenProvider implements DriveAccessTokenProvider {
  public constructor(
    private readonly primary: DriveAccessTokenProvider,
    private readonly fallback: DriveAccessTokenProvider,
    private readonly primaryLabel: string,
    private readonly fallbackLabel: string,
  ) {}

  public async getAccessToken(forceLogin = false): Promise<string> {
    if (forceLogin) {
      return this.fallback.getAccessToken(false);
    }
    try {
      return await this.primary.getAccessToken(false);
    } catch (primaryError) {
      try {
        return await this.fallback.getAccessToken(false);
      } catch (fallbackError) {
        throw new Error(
          `Failed to get a Google Drive token from ${this.primaryLabel} or ${this.fallbackLabel}.\n\n` +
            `${this.primaryLabel} error:\n${primaryError instanceof Error ? primaryError.message : String(primaryError)}\n\n` +
            `${this.fallbackLabel} error:\n${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
        );
      }
    }
  }
}

export function createDriveAccessTokenProvider(options: {
  authSource?: DriveAuthSource;
  loginMode?: GcloudLoginMode;
  adcFile?: string;
  accountEmail?: string;
  gcloudConfigDir?: string;
  personaSlug?: string;
}): DriveAccessTokenProvider {
  const authSource = options.authSource || "auto";
  if (authSource === "direct-adc") {
    return new DirectAdcAccessTokenProvider(options.adcFile || "");
  }

  const resolvedPersonaSlug = personaSlugForOAuth(options.accountEmail || "", options.gcloudConfigDir || "", options.personaSlug || "");
  if (authSource === "vault") {
    return new PersonaVaultDriveAccessTokenProvider(resolvedPersonaSlug, options.accountEmail || "", options.gcloudConfigDir || "");
  }

  const gcloudSource: Exclude<DriveAuthSource, "auto" | "vault" | "direct-adc"> =
    authSource === "account" || authSource === "gcloud" ? authSource : "adc";
  const gcloudProvider = new GcloudAccessTokenProvider(
    options.loginMode || "never",
    gcloudSource,
    options.accountEmail || "",
    options.gcloudConfigDir || "",
  );
  if (authSource === "auto" && resolvedPersonaSlug && hasPersonaOauthCredentials(resolvedPersonaSlug)) {
    return new FallbackDriveAccessTokenProvider(
      new PersonaVaultDriveAccessTokenProvider(resolvedPersonaSlug, options.accountEmail || "", options.gcloudConfigDir || ""),
      gcloudProvider,
      `persona OAuth vault ${resolvedPersonaSlug}`,
      "saved gcloud/ADC fallback",
    );
  }
  return gcloudProvider;
}

export function parseDriveAuthSource(value: string, defaultValue: DriveAuthSource = "auto"): DriveAuthSource {
  const normalized = value || defaultValue;
  if (
    normalized === "auto" ||
    normalized === "vault" ||
    normalized === "adc" ||
    normalized === "account" ||
    normalized === "gcloud" ||
    normalized === "direct-adc"
  ) {
    return normalized;
  }
  throw new Error("--auth-source must be one of: auto, vault, adc, account, gcloud, direct-adc.");
}

export class DriveApiClient {
  public constructor(
    private token: string,
    private readonly tokenProvider?: DriveAccessTokenProvider,
  ) {}

  public async getFile(fileId: string, fields = DEFAULT_FILE_FIELDS): Promise<DriveFile> {
    const params = this.params({ fields, supportsAllDrives: "true" });
    return this.requestJson<DriveFile>(`https://www.googleapis.com/drive/v3/files/${fileId}?${params}`);
  }

  public async ensureFolderPath(rootId: string, folderPath: string): Promise<FolderPathResult> {
    const parts = folderPath
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      return { targetFolder: await this.getFile(rootId), createdFolders: [] };
    }

    let currentId = rootId;
    let current: DriveFile | null = null;
    const createdFolders: DriveFile[] = [];
    for (const part of parts) {
      current = await this.findChildFolder(currentId, part);
      if (!current) {
        current = await this.createFolder(currentId, part);
        createdFolders.push(current);
      }
      currentId = current.id;
    }

    return { targetFolder: current || (await this.getFile(rootId)), createdFolders };
  }

  public async moveFile(fileId: string, targetFolderId: string): Promise<DriveFile> {
    const current = await this.getFile(fileId);
    if (!Array.isArray(current.parents)) {
      throw new Error(`Unexpected parent list for ${fileId}: ${JSON.stringify(current)}`);
    }

    const removeParents = current.parents
      .filter((parent) => String(parent) !== String(targetFolderId))
      .join(",");
    const params: Record<string, string> = {
      addParents: targetFolderId,
      fields: DEFAULT_FILE_FIELDS,
      supportsAllDrives: "true",
    };
    if (removeParents) {
      params.removeParents = removeParents;
    }

    return this.requestJson<DriveFile>(`https://www.googleapis.com/drive/v3/files/${fileId}?${this.params(params)}`, {
      method: "PATCH",
      body: {},
    });
  }

  public async uploadFile(options: UploadFileOptions): Promise<DriveFile> {
    const sourceFile = this.resolveFile(options.sourceFile);
    const title = options.title || path.basename(sourceFile);
    const mimeType = options.mimeType || this.guessMimeType(sourceFile);
    const fields = options.fields || DEFAULT_UPLOAD_FIELDS;
    const metadata = { name: title, parents: [options.folderId], mimeType };
    const { boundary, body } = this.buildMultipart(metadata, sourceFile, mimeType);
    const params = new URLSearchParams({ uploadType: "multipart", fields, supportsAllDrives: "true" });

    return this.requestJson<DriveFile>(`https://www.googleapis.com/upload/drive/v3/files?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": `multipart/related; boundary=${boundary}`,
        "Content-Length": String(body.length),
      },
      body,
    });
  }

  public async copyFile(options: CopyFileOptions): Promise<DriveFile> {
    const fields = options.fields || DEFAULT_FILE_FIELDS;
    const metadata: Record<string, unknown> = { name: options.title };
    if (options.parentFolderId) {
      metadata.parents = [options.parentFolderId];
    }
    const params = this.params({ fields, supportsAllDrives: "true" });
    return this.requestJson<DriveFile>(
      `https://www.googleapis.com/drive/v3/files/${options.sourceFileId}/copy?${params}`,
      { method: "POST", body: metadata },
    );
  }

  public async getDocument(documentId: string): Promise<Record<string, unknown>> {
    return this.requestJson<Record<string, unknown>>(`https://docs.googleapis.com/v1/documents/${documentId}`);
  }

  public async batchUpdateDocument(documentId: string, requests: Record<string, unknown>[]): Promise<unknown> {
    return this.requestJson<unknown>(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: "POST",
      body: { requests },
    });
  }

  public async exportFile(fileId: string, mimeType: string): Promise<Buffer> {
    const params = this.params({ mimeType });
    return this.requestBuffer(`https://www.googleapis.com/drive/v3/files/${fileId}/export?${params}`);
  }

  private async findChildFolder(parentId: string, name: string): Promise<DriveFile | null> {
    const query =
      `'${this.quoteQuery(parentId)}' in parents and ` +
      `name = '${this.quoteQuery(name)}' and ` +
      `mimeType = '${FOLDER_MIME_TYPE}' and trashed = false`;
    const params = this.params({
      q: query,
      fields: "files(id,name,mimeType,webViewLink,parents)",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });
    const response = await this.requestJson<{ files?: DriveFile[] }>(
      `https://www.googleapis.com/drive/v3/files?${params}`,
    );
    if (!Array.isArray(response.files)) {
      throw new Error(`Unexpected Drive files response: ${JSON.stringify(response)}`);
    }
    return response.files[0] || null;
  }

  private async createFolder(parentId: string, name: string): Promise<DriveFile> {
    const params = this.params({ fields: DEFAULT_FILE_FIELDS, supportsAllDrives: "true" });
    return this.requestJson<DriveFile>(`https://www.googleapis.com/drive/v3/files?${params}`, {
      method: "POST",
      body: { name, mimeType: FOLDER_MIME_TYPE, parents: [parentId] },
    });
  }

  private async requestJson<T>(url: string, options: RequestOptions = {}, didForceAuth = false): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      ...(options.headers || {}),
    };
    let body: Buffer | undefined;

    if (Buffer.isBuffer(options.body)) {
      body = options.body;
    } else if (options.body !== undefined && options.body !== null) {
      body = Buffer.from(JSON.stringify(options.body), "utf8");
      headers["Content-Type"] = headers["Content-Type"] || "application/json; charset=UTF-8";
      headers["Content-Length"] = String(body.length);
    }

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body,
      timeout: 120000,
    });
    const responseBody = await response.text();
    if (!response.ok) {
      if (response.status === 403 && responseBody.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT")) {
        if (this.tokenProvider && !didForceAuth) {
          this.token = await this.tokenProvider.getAccessToken(true);
          return this.requestJson<T>(url, options, true);
        }
        throw new Error(
          "Google Drive rejected the token scope after trying saved persona/global credentials. Retry with the exact " +
            "persona/account and use interactive auth only after explicit approval for that auth action.\n\n" +
            `Drive API response:\n${responseBody}`,
        );
      }
      throw new Error(`Drive API request failed with HTTP ${response.status}:\n${responseBody}`);
    }
    return (responseBody ? JSON.parse(responseBody) : {}) as T;
  }

  private async requestBuffer(url: string, options: RequestOptions = {}, didForceAuth = false): Promise<Buffer> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      ...(options.headers || {}),
    };
    let body: Buffer | undefined;

    if (Buffer.isBuffer(options.body)) {
      body = options.body;
    } else if (options.body !== undefined && options.body !== null) {
      body = Buffer.from(JSON.stringify(options.body), "utf8");
      headers["Content-Type"] = headers["Content-Type"] || "application/json; charset=UTF-8";
      headers["Content-Length"] = String(body.length);
    }

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body,
      timeout: 120000,
    });
    if (!response.ok) {
      const responseBody = await response.text();
      if (response.status === 403 && responseBody.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT")) {
        if (this.tokenProvider && !didForceAuth) {
          this.token = await this.tokenProvider.getAccessToken(true);
          return this.requestBuffer(url, options, true);
        }
      }
      throw new Error(`Drive API request failed with HTTP ${response.status}:\n${responseBody}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  private quoteQuery(value: string): string {
    return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  private params(params: Record<string, string>): string {
    return new URLSearchParams(params).toString();
  }

  private guessMimeType(filePath: string): string {
    return mime.lookup(filePath) || "application/octet-stream";
  }

  private resolveFile(input: string): string {
    const sourceFile = path.resolve(input);
    if (!fs.existsSync(sourceFile) || !fs.statSync(sourceFile).isFile()) {
      throw new Error(`Source file does not exist or is not a regular file: ${sourceFile}`);
    }
    return sourceFile;
  }

  private buildMultipart(
    metadata: Record<string, unknown>,
    sourceFile: string,
    mimeType: string,
  ): { boundary: string; body: Buffer } {
    const boundary = `codex-drive-upload-${Date.now().toString(16)}`;
    const parts = [
      Buffer.from(`--${boundary}\r\n`, "utf8"),
      Buffer.from("Content-Type: application/json; charset=UTF-8\r\n\r\n", "utf8"),
      Buffer.from(JSON.stringify(metadata), "utf8"),
      Buffer.from("\r\n", "utf8"),
      Buffer.from(`--${boundary}\r\n`, "utf8"),
      Buffer.from(`Content-Type: ${mimeType}\r\n\r\n`, "utf8"),
      fs.readFileSync(sourceFile),
      Buffer.from("\r\n", "utf8"),
      Buffer.from(`--${boundary}--\r\n`, "utf8"),
    ];
    return { boundary, body: Buffer.concat(parts) };
  }
}

export function printJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export async function runCli(action: () => Promise<number> | number): Promise<void> {
  try {
    process.exitCode = await action();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
