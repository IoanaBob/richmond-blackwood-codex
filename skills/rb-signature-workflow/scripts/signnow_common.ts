import fs from "node:fs";
import path from "node:path";

import dotenv from "dotenv";
import { Sdk } from "@signnow/api-client/core";
import {
  DocumentPostRequest,
  DocumentPutRequest,
  FieldExtractPostRequest,
  type DocumentGetResponse,
  type DocumentPostResponse,
  type DocumentPutResponse,
  type FieldRequestAttribute,
} from "@signnow/api-client/api/document";
import { DocumentGetRequest } from "@signnow/api-client/api/document";
import {
  CancelInvitePutRequest,
  type CancelInvitePutResponse,
  SigningLinkPostRequest,
  type SigningLinkPostResponse,
  type ToRequestAttribute,
} from "@signnow/api-client/api/documentInvite";
import {
  DocumentInviteDeleteRequest,
  type DocumentInviteDeleteResponse,
  DocumentInviteLinkPostRequest,
  type DocumentInviteLinkPostResponse,
  DocumentInvitePostRequest,
  type DocumentInvitePostResponse,
  type InviteRequestAttribute,
} from "@signnow/api-client/api/embeddedInvite";
import {
  DocumentEmbeddedEditorLinkPostRequest,
  type DocumentEmbeddedEditorLinkPostResponse,
} from "@signnow/api-client/api/embeddedEditor";
import {
  DocumentEmbeddedSendingLinkPostRequest,
  type DocumentEmbeddedSendingLinkPostResponse,
} from "@signnow/api-client/api/embeddedSending";

export type CliOptions = Record<string, string | boolean>;

export interface ParsedArgs {
  positionals: string[];
  options: CliOptions;
}

export interface SignNowConfig {
  apiHost: string;
  apiKey?: string;
  accessToken?: string;
  basicToken?: string;
  username?: string;
  password?: string;
}

export interface FieldsPayload {
  fields: Array<Record<string, unknown>>;
  client_timestamp?: string | number;
}

export interface EmbeddedReviewOptions {
  documentId: string;
  type: "document" | "editor";
  redirectUri?: string;
  redirectTarget?: string;
  linkExpiration?: number;
}

export interface EmbeddedInviteSigner {
  email: string;
  role_id: string;
  order: number;
  auth_method?: string;
  first_name?: string;
  last_name?: string;
  label?: string;
}

export interface EmbeddedInvitePayload {
  invites: EmbeddedInviteSigner[];
  name_formula?: string;
}

export interface NoEmailInviteOptions {
  documentId: string;
  to: Array<ToRequestAttribute & Record<string, unknown>>;
  from: string;
  subject: string;
  message: string;
}

export const EMBEDDED_SIGNING_LINK_MINUTES = {
  min: 15,
  max: 45,
} as const;

export function assertEmbeddedSigningLinkExpiration(minutes: number): void {
  const { min, max } = EMBEDDED_SIGNING_LINK_MINUTES;
  if (minutes < min || minutes > max) {
    throw new Error(
      [
        `SignNow embedded signing links must expire between ${min} and ${max} minutes.`,
        "They are ephemeral signing sessions, not durable email links.",
        "For ordinary signature execution, use SignNow-managed emails only after the user reviews the document in SignNow and explicitly approves sending.",
      ].join(" "),
    );
  }
}

export function embeddedSigningLinkMetadata(linkExpiration: number): Record<string, string | number | boolean> {
  return {
    durable: false,
    expires_in_minutes: linkExpiration,
    expires_at: new Date(Date.now() + linkExpiration * 60_000).toISOString(),
    warning: "Embedded SignNow signer links are ephemeral. Do not use them as durable client email links.",
  };
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

  public numberOption(options: CliOptions, key: string, defaultValue: number): number {
    const value = this.stringOption(options, key, String(defaultValue));
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new Error(`--${key} must be a number.`);
    }
    return parsed;
  }

  private toCamelCase(key: string): string {
    return key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
  }
}

export class SignNowEnvironment {
  public load(envFile = ".env"): void {
    const resolved = path.resolve(envFile);
    if (fs.existsSync(resolved)) {
      dotenv.config({ path: resolved, override: false });
    }
  }

  public readConfig(options: CliOptions): SignNowConfig {
    const cli = new CliArguments();
    const accessToken = process.env.SIGNNOW_API_KEY || process.env.SIGNNOW_ACCESS_TOKEN || "";
    return {
      apiHost: this.cleanApiHost(
        cli.stringOption(
          options,
          "apiBase",
          process.env.SIGNNOW_API_BASE || process.env.SIGNNOW_API_HOST || "https://api.signnow.com",
        ),
      ),
      apiKey: "",
      accessToken,
      basicToken: process.env.SIGNNOW_API_BASIC_TOKEN || "",
      username: process.env.SIGNNOW_API_USERNAME || "",
      password: process.env.SIGNNOW_API_PASSWORD || "",
    };
  }

  private required(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`${name} is not set. Export it or add it to a local untracked .env file.`);
    }
    return value;
  }

  private cleanApiHost(apiHost: string): string {
    return apiHost.replace(/\/+$/, "");
  }
}

export class SignNowClient {
  private readonly sdkClient: ReturnType<Sdk["getClient"]>;

  public static async create(config: SignNowConfig): Promise<SignNowClient> {
    if (!config.accessToken && !config.apiKey && !(config.basicToken && config.username && config.password)) {
      throw new Error(
        [
          "Set SIGNNOW_API_KEY, SIGNNOW_ACCESS_TOKEN, or",
          "SIGNNOW_API_BASIC_TOKEN with SIGNNOW_API_USERNAME and SIGNNOW_API_PASSWORD",
          "in a local untracked .env file.",
        ].join(" "),
      );
    }

    const sdk = new Sdk({
      apiHost: config.apiHost,
      apiKey: config.apiKey,
      basicToken: config.basicToken,
    });
    if (config.accessToken) {
      sdk.setBearerToken(config.accessToken);
    } else if (!config.apiKey && config.basicToken && config.username && config.password) {
      await sdk.authenticate(config.username, config.password);
    }
    return new SignNowClient(sdk.getClient());
  }

  private constructor(sdkClient: ReturnType<Sdk["getClient"]>) {
    this.sdkClient = sdkClient;
  }

  public async uploadDocument(filePath: string, name = path.basename(filePath)): Promise<DocumentPostResponse> {
    const request = new DocumentPostRequest(filePath, name);
    return this.sdkClient.send<DocumentPostResponse>(request);
  }

  public async uploadDocumentWithFieldExtract(filePath: string): Promise<DocumentPostResponse> {
    const request = new FieldExtractPostRequest(filePath);
    return this.sdkClient.send<DocumentPostResponse>(request);
  }

  public async getDocument(documentId: string): Promise<DocumentGetResponse> {
    return this.sdkClient.send<DocumentGetResponse>(new DocumentGetRequest(documentId));
  }

  public async updateDocumentFields(documentId: string, payload: FieldsPayload): Promise<DocumentPutResponse> {
    if (!Array.isArray(payload.fields)) {
      throw new Error('Fields JSON must contain a top-level "fields" array.');
    }

    const clientTimestamp = String(payload.client_timestamp || Math.floor(Date.now() / 1000));
    const request = new DocumentPutRequest(
      documentId,
      payload.fields as unknown as FieldRequestAttribute[],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      null,
      clientTimestamp,
    );
    return this.sdkClient.send<DocumentPutResponse>(request);
  }

  public async cancelEmbeddedInvites(documentId: string): Promise<DocumentInviteDeleteResponse> {
    return this.sdkClient.send<DocumentInviteDeleteResponse>(new DocumentInviteDeleteRequest(documentId));
  }

  public async cancelFieldInvites(documentId: string, reason: string): Promise<CancelInvitePutResponse> {
    return this.sdkClient.send<CancelInvitePutResponse>(new CancelInvitePutRequest(documentId, reason));
  }

  public async createNoEmailFieldInvite(options: NoEmailInviteOptions): Promise<unknown> {
    return this.sdkClient.send<unknown>(new NoEmailFieldInvitePostRequest(options));
  }

  public async createSigningLink(documentId: string, redirectUri = ""): Promise<SigningLinkPostResponse> {
    return this.sdkClient.send<SigningLinkPostResponse>(new SigningLinkPostRequest(documentId, redirectUri));
  }

  public async createEmbeddedInviteLinks(
    documentId: string,
    payload: EmbeddedInvitePayload,
  ): Promise<DocumentInvitePostResponse> {
    const invites = payload.invites.map((invite) => ({
      email: invite.email,
      role_id: invite.role_id,
      order: invite.order,
      auth_method: invite.auth_method || "none",
      first_name: invite.first_name || "",
      last_name: invite.last_name || "",
    })) as InviteRequestAttribute[];
    return this.sdkClient.send<DocumentInvitePostResponse>(
      new DocumentInvitePostRequest(documentId, invites, payload.name_formula || ""),
    );
  }

  public async createEmbeddedInviteLink(
    documentId: string,
    fieldInviteId: string,
    authMethod = "none",
    linkExpiration = 45,
  ): Promise<DocumentInviteLinkPostResponse> {
    assertEmbeddedSigningLinkExpiration(linkExpiration);
    return this.sdkClient.send<DocumentInviteLinkPostResponse>(
      new DocumentInviteLinkPostRequest(documentId, fieldInviteId, authMethod, linkExpiration),
    );
  }

  public async createEmbeddedDocumentReviewLink(
    options: EmbeddedReviewOptions,
  ): Promise<DocumentEmbeddedSendingLinkPostResponse> {
    return this.sdkClient.send<DocumentEmbeddedSendingLinkPostResponse>(
      new DocumentEmbeddedSendingLinkPostRequest(
        options.documentId,
        "document",
        options.redirectUri || "",
        options.linkExpiration || 45,
        options.redirectTarget || "",
      ),
    );
  }

  public async createEmbeddedEditorLink(options: EmbeddedReviewOptions): Promise<DocumentEmbeddedEditorLinkPostResponse> {
    return this.sdkClient.send<DocumentEmbeddedEditorLinkPostResponse>(
      new DocumentEmbeddedEditorLinkPostRequest(
        options.documentId,
        options.redirectUri || "",
        options.redirectTarget || "",
        options.linkExpiration || 45,
      ),
    );
  }
}

class NoEmailFieldInvitePostRequest {
  public constructor(private readonly options: NoEmailInviteOptions) {}

  public getPayload(): Record<string, unknown> {
    return {
      document_id: this.options.documentId,
      to: this.options.to,
      from: this.options.from,
      email_groups: [],
      cc: [],
      cc_step: [],
      viewers: [],
      subject: this.options.subject,
      message: this.options.message,
      cc_subject: "",
      cc_message: "",
    };
  }

  public getMethod(): string {
    return "post";
  }

  public getUrl(): string {
    return "/document/{document_id}/invite";
  }

  public getAuthMethod(): string {
    return "bearer";
  }

  public getContentType(): string {
    return "application/json";
  }

  public getQueryParams(): Record<string, string> {
    return { email: "disable" };
  }

  public getUriParams(): Record<string, string> {
    return { document_id: this.options.documentId };
  }
}

export function printJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export async function runCli(action: () => Promise<number> | number): Promise<void> {
  try {
    process.exitCode = await action();
  } catch (error) {
    process.stderr.write(`${await formatError(error)}\n`);
    process.exitCode = 1;
  }
}

async function formatError(error: unknown): Promise<string> {
  const apiResponse = responseFromError(error);
  if (apiResponse) {
    try {
      const body = await apiResponse.text();
      return `${messageFromError(error)}\nHTTP ${apiResponse.status}: ${body}`;
    } catch {
      return messageFromError(error);
    }
  }
  return messageFromError(error);
}

function responseFromError(error: unknown): { status: number; text: () => Promise<string> } | null {
  if (!error || typeof error !== "object") return null;
  const maybe = error as { getResponse?: () => unknown };
  if (typeof maybe.getResponse !== "function") return null;
  const response = maybe.getResponse();
  if (!response || typeof response !== "object") return null;
  const candidate = response as { status?: unknown; text?: unknown };
  if (typeof candidate.status === "number" && typeof candidate.text === "function") {
    return candidate as { status: number; text: () => Promise<string> };
  }
  return null;
}

function messageFromError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
