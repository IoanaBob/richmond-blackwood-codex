import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { gmail_v1, google } from "googleapis";
import mime from "mime-types";

import { GcloudAuthManager, GcloudLoginMode, parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";
import {
  getPersonaOauthAccessToken,
  hasPersonaOauthCredentials,
  PERSONA_GMAIL_SCOPES,
  GOOGLE_IDENTITY_SCOPES,
  personaSlugForOAuth,
} from "../../rb-google-auth/scripts/persona_oauth_vault";

export type CliOptions = Record<string, string | boolean | string[]>;

export interface ParsedArgs {
  positionals: string[];
  options: CliOptions;
}

export interface GmailConfig {
  accessToken: string;
}

export type GmailAuthSource = "auto" | "vault" | "adc" | "gcloud";

export const GMAIL_REPLY_CONTEXT_SCOPE = "https://www.googleapis.com/auth/gmail.modify";

const GMAIL_SCOPES = [
  ...GOOGLE_IDENTITY_SCOPES,
  ...PERSONA_GMAIL_SCOPES,
];

export function requiredGmailOAuthClientFile(explicitFile = "", fromEmail = ""): string {
  const oauthClientFile = gmailOAuthClientFile(explicitFile, fromEmail);
  if (oauthClientFile) {
    return oauthClientFile;
  }

  const senderSpecificPath = senderSpecificGmailOAuthClientFile(fromEmail);
  if (senderSpecificPath) {
    throw new Error(
      `Missing sender-matched Gmail OAuth client file for ${fromEmail}. Save the matching desktop OAuth client JSON at ` +
        `${senderSpecificPath}, or pass --oauth-client-file explicitly. Do not reuse another branded OAuth client for this sender.`,
    );
  }

  throw new Error(
    "Missing Gmail OAuth client file. Create a Google OAuth desktop client, trust/allow it in Google Workspace Admin, " +
      `save it at ${globalCodexPath("google-oauth-client.json")}, then retry. This path is outside worktree-local storage.`,
  );
}

export function gmailOAuthClientFile(explicitFile = "", fromEmail = ""): string {
  if (explicitFile) {
    return explicitFile;
  }

  const senderSpecificPath = senderSpecificGmailOAuthClientFile(fromEmail);
  if (senderSpecificPath) {
    return fs.existsSync(senderSpecificPath) ? senderSpecificPath : "";
  }

  if (process.env.CODEX_GOOGLE_OAUTH_CLIENT_FILE) {
    return process.env.CODEX_GOOGLE_OAUTH_CLIENT_FILE;
  }
  if (process.env.GOOGLE_OAUTH_CLIENT_FILE) {
    return process.env.GOOGLE_OAUTH_CLIENT_FILE;
  }

  const defaultPath = globalCodexPath("google-oauth-client.json");
  return fs.existsSync(defaultPath) ? defaultPath : "";
}

export function senderGcloudConfigDir(fromEmail: string): string {
  const email = fromEmail.toLowerCase();
  const slugByEmail: Record<string, string> = {
    "accounting@richmondblackwood.com": "accounting-richmond-blackwood",
    "johnpaul.okolie@richmondblackwood.com": "jp-richmond-blackwood",
    "ioana@eip.ventures": "ioana-eip",
    "ioana.sbob@gmail.com": "ioana-private",
    "eran@eip.ventures": "eran-everguard",
    "eran@konvi.app": "eran-konvi",
    "eran@richmondblackwood.com": "eran-richmond-blackwood",
  };
  const slug = slugByEmail[email];
  if (!slug) {
    return "";
  }

  const configDir = globalCodexPath("google-personas", slug, "gcloud");
  return fs.existsSync(configDir) ? configDir : "";
}

function senderSpecificGmailOAuthClientFile(fromEmail: string): string {
  const domain = fromEmail.toLowerCase().split("@")[1] || "";
  if (domain === "eip.ventures") {
    return process.env.CODEX_GOOGLE_OAUTH_CLIENT_EIP_FILE ||
      process.env.GOOGLE_OAUTH_CLIENT_EIP_FILE ||
      globalCodexPath("google-oauth-client.eip.json");
  }
  if (domain === "konvi.app") {
    return process.env.CODEX_GOOGLE_OAUTH_CLIENT_KONVI_FILE ||
      process.env.GOOGLE_OAUTH_CLIENT_KONVI_FILE ||
      globalCodexPath("google-oauth-client.konvi.json");
  }
  if (domain === "richmondblackwood.com") {
    return process.env.CODEX_GOOGLE_OAUTH_CLIENT_RICHMOND_BLACKWOOD_FILE ||
      process.env.GOOGLE_OAUTH_CLIENT_RICHMOND_BLACKWOOD_FILE ||
      globalCodexPath("google-oauth-client.richmondblackwood.json");
  }
  return "";
}

function globalCodexPath(...segments: string[]): string {
  return path.join(os.homedir(), ".codex", ...segments);
}

export interface DraftAttachment {
  filePath: string;
  filename: string;
  contentType: string;
  content: Buffer;
}

export interface DraftInput {
  fromEmail: string;
  fromName: string;
  to: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
  isHtml: boolean;
  replyMessageId?: string;
  inReplyTo?: string;
  references?: string;
  attachments: DraftAttachment[];
}

export interface AliasStatus {
  email: string;
  displayName: string;
  verificationStatus: string;
  isDefault: boolean;
}

interface ReplyContext {
  threadId?: string;
  messageIdHeader?: string;
  references?: string;
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
      const value = inlineValue !== undefined
        ? inlineValue
        : index + 1 < argv.length && !argv[index + 1].startsWith("--")
          ? argv[++index]
          : true;
      if (key === "attachment") {
        const existing = options[key];
        options[key] = Array.isArray(existing) ? [...existing, String(value)] : [String(value)];
      } else {
        options[key] = value;
      }
    }

    return { positionals, options };
  }

  public stringOption(options: CliOptions, key: string, defaultValue = ""): string {
    const value = options[key];
    if (Array.isArray(value)) return value[0] || defaultValue;
    if (value === undefined || value === false) return defaultValue;
    return String(value);
  }

  public booleanOption(options: CliOptions, key: string): boolean {
    return options[key] === true;
  }

  public arrayOption(options: CliOptions, key: string): string[] {
    const value = options[key];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return [value];
    return [];
  }

  private toCamelCase(key: string): string {
    return key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
  }
}

export class GmailEnvironment {
  public async readApiConfig(
    authSource = "auto",
    authLogin = "never",
    oauthClientFile = "",
    extraScopes: string[] = [],
    gcloudConfigDir = "",
    accountEmail = "",
    personaSlug = "",
  ): Promise<GmailConfig> {
    const source = this.authSource(authSource);
    return {
      accessToken: await new GcloudTokenProvider().getAccessToken(
        source,
        parseGcloudLoginMode(authLogin),
        oauthClientFile,
        extraScopes,
        gcloudConfigDir,
        accountEmail,
        personaSlug,
      ),
    };
  }

  private authSource(value: string): GmailAuthSource {
    if (value === "auto" || value === "vault" || value === "adc" || value === "gcloud") {
      return value;
    }
    throw new Error("--auth-source must be one of: auto, vault, adc, gcloud.");
  }
}

export class GcloudTokenProvider {
  public async getAccessToken(
    authSource: GmailAuthSource = "adc",
    loginMode: GcloudLoginMode = "never",
    oauthClientFile = "",
    extraScopes: string[] = [],
    gcloudConfigDir = "",
    accountEmail = "",
    personaSlug = "",
  ): Promise<string> {
    if (authSource === "vault") {
      return this.personaVaultAccessToken(personaSlug, accountEmail, gcloudConfigDir);
    }

    if (authSource === "adc") {
      return this.applicationDefaultAccessToken(loginMode, oauthClientFile, extraScopes, gcloudConfigDir);
    }

    if (authSource === "gcloud") {
      return this.gcloudAccountAccessToken(loginMode, accountEmail, gcloudConfigDir);
    }

    return this.autoAccessToken(loginMode, oauthClientFile, extraScopes, gcloudConfigDir, accountEmail, personaSlug);
  }

  private applicationDefaultAccessToken(
    loginMode: GcloudLoginMode,
    oauthClientFile: string,
    extraScopes: string[],
    gcloudConfigDir: string,
  ): string {
    return new GcloudAuthManager().getAccessToken({
      serviceName: "Gmail",
      tokenCommand: "application-default",
      loginCommand: "application-default",
      loginMode,
      scopes: Array.from(new Set([...GMAIL_SCOPES, ...extraScopes])),
      disableQuotaProject: true,
      oauthClientFile: oauthClientFile || undefined,
      gcloudConfigDir: gcloudConfigDir || undefined,
    });
  }

  private async autoAccessToken(
    loginMode: GcloudLoginMode,
    oauthClientFile: string,
    extraScopes: string[],
    gcloudConfigDir: string,
    accountEmail: string,
    personaSlug: string,
  ): Promise<string> {
    const failures: string[] = [];
    const resolvedPersonaSlug = personaSlugForOAuth(accountEmail, gcloudConfigDir, personaSlug);

    if (resolvedPersonaSlug && hasPersonaOauthCredentials(resolvedPersonaSlug)) {
      try {
        return await this.personaVaultAccessToken(resolvedPersonaSlug, accountEmail, gcloudConfigDir);
      } catch (error) {
        failures.push(`persona OAuth vault ${resolvedPersonaSlug}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    try {
      return this.applicationDefaultAccessToken("never", oauthClientFile, extraScopes, gcloudConfigDir);
    } catch (error) {
      failures.push(`saved ADC: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (accountEmail) {
      try {
        return this.gcloudAccountAccessToken("never", accountEmail, gcloudConfigDir);
      } catch (error) {
        failures.push(`account token for ${accountEmail}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (loginMode !== "never") {
      const loginOauthClientFile = oauthClientFile || requiredGmailOAuthClientFile("", accountEmail);
      return this.applicationDefaultAccessToken(loginMode, loginOauthClientFile, extraScopes, gcloudConfigDir);
    }

    throw new Error(
      "Failed to get a Gmail access token from the persona OAuth vault, saved ADC, or matching account-token fallback.\n\n" +
        failures.join("\n\n"),
    );
  }

  private async personaVaultAccessToken(personaSlug: string, accountEmail: string, gcloudConfigDir: string): Promise<string> {
    return getPersonaOauthAccessToken({
      serviceName: "Gmail",
      personaSlug,
      accountEmail,
      gcloudConfigDir,
      updateStatus: true,
    });
  }

  private gcloudAccountAccessToken(loginMode: GcloudLoginMode, accountEmail: string, gcloudConfigDir: string): string {
    return new GcloudAuthManager().getAccessToken({
      serviceName: "Gmail",
      tokenCommand: "account",
      loginCommand: "account",
      loginMode,
      accountEmail: accountEmail || undefined,
      gcloudConfigDir: gcloudConfigDir || undefined,
    });
  }
}

export class GmailClient {
  private readonly gmail: gmail_v1.Gmail;

  public constructor(config: GmailConfig) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: config.accessToken });
    this.gmail = google.gmail({ version: "v1", auth });
  }

  public async verifyAlias(email: string): Promise<AliasStatus> {
    try {
      const result = await this.gmail.users.settings.sendAs.list({ userId: "me" });
      const aliases = result.data.sendAs || [];
      const alias = aliases.find((item) => item.sendAsEmail?.toLowerCase() === email.toLowerCase());
      if (!alias) {
        throw new Error(
          `Gmail send-as alias not found: ${email}. Add it in Gmail Settings > Accounts > Send mail as, then retry.`,
        );
      }
      if (alias.verificationStatus && alias.verificationStatus !== "accepted") {
        throw new Error(`Gmail send-as alias ${email} is not accepted. Status: ${alias.verificationStatus}.`);
      }
      return {
        email: alias.sendAsEmail || email,
        displayName: alias.displayName || "",
        verificationStatus: alias.verificationStatus || "",
        isDefault: Boolean(alias.isDefault),
      };
    } catch (error) {
      throw this.withScopeHint(error, "verify Gmail send-as aliases");
    }
  }

  public async createDraft(input: DraftInput): Promise<gmail_v1.Schema$Draft> {
    await this.verifyAlias(input.fromEmail);
    const replyContext = input.replyMessageId
      ? await this.readReplyContext(input.replyMessageId)
      : this.manualReplyContext(input);
    const raw = this.encodeRawMessage(this.buildMime(input, replyContext));
    try {
      const result = await this.gmail.users.drafts.create({
        userId: "me",
        requestBody: {
          message: {
            raw,
            threadId: replyContext.threadId,
          },
        },
      });
      await this.requireStoredSender(result.data, input.fromEmail);
      return result.data;
    } catch (error) {
      throw this.withScopeHint(error, "create Gmail drafts");
    }
  }

  public async sendMessage(input: DraftInput): Promise<gmail_v1.Schema$Message> {
    await this.verifyAlias(input.fromEmail);
    const replyContext = input.replyMessageId
      ? await this.readReplyContext(input.replyMessageId)
      : this.manualReplyContext(input);
    const raw = this.encodeRawMessage(this.buildMime(input, replyContext));
    try {
      const result = await this.gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw,
          threadId: replyContext.threadId,
        },
      });
      await this.requireSentSender(result.data, input.fromEmail);
      return result.data;
    } catch (error) {
      throw this.withScopeHint(error, "send Gmail messages");
    }
  }

  public async sendDraft(draftId: string, expectedEmail: string): Promise<gmail_v1.Schema$Message> {
    await this.verifyAlias(expectedEmail);
    await this.requireExistingDraftSender(draftId, expectedEmail);
    try {
      const result = await this.gmail.users.drafts.send({
        userId: "me",
        requestBody: { id: draftId },
      });
      await this.requireSentSender(result.data, expectedEmail);
      return result.data;
    } catch (error) {
      throw this.withScopeHint(error, `send Gmail draft ${draftId}`);
    }
  }

  public async deleteDraft(draftId: string): Promise<void> {
    try {
      await this.gmail.users.drafts.delete({ userId: "me", id: draftId });
    } catch (error) {
      throw this.withScopeHint(error, `delete Gmail draft ${draftId}`);
    }
  }

  private async requireStoredSender(draft: gmail_v1.Schema$Draft, expectedEmail: string): Promise<void> {
    const draftId = draft.id;
    if (!draftId) {
      throw new Error("Gmail created a draft but did not return a draft ID, so the stored sender could not be verified.");
    }

    try {
      const stored = await this.gmail.users.drafts.get({
        userId: "me",
        id: draftId,
        format: "full",
      });
      const from = stored.data.message?.payload?.headers?.find((header: gmail_v1.Schema$MessagePartHeader) => (
        header.name?.toLowerCase() === "from"
      ))?.value || "";
      if (!this.fromHeaderUsesEmail(from, expectedEmail)) {
        await this.deleteDraftQuietly(draftId);
        throw new Error(
          `Gmail stored the draft with From "${from || "(missing)"}" instead of ${expectedEmail}. ` +
            `Deleted draft ${draftId}. Do not create or send this draft until the intended Gmail send-as alias is the actual saved sender.`,
        );
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("instead of")) {
        throw error;
      }
      await this.deleteDraftQuietly(draftId);
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Gmail draft ${draftId} was created, but the saved From header could not be verified. Deleted the draft to avoid an unsafe sender. ` +
          `Original verification error: ${message}`,
      );
    }
  }

  private async requireExistingDraftSender(draftId: string, expectedEmail: string): Promise<void> {
    try {
      const stored = await this.gmail.users.drafts.get({
        userId: "me",
        id: draftId,
        format: "full",
      });
      const from = stored.data.message?.payload?.headers?.find((header: gmail_v1.Schema$MessagePartHeader) => (
        header.name?.toLowerCase() === "from"
      ))?.value || "";
      if (!this.fromHeaderUsesEmail(from, expectedEmail)) {
        throw new Error(
          `Gmail draft ${draftId} has From "${from || "(missing)"}" instead of ${expectedEmail}. ` +
            "Do not send this draft until the intended Gmail send-as alias is the actual saved sender.",
        );
      }
    } catch (error) {
      throw this.withScopeHint(error, `verify Gmail draft ${draftId} sender`);
    }
  }

  private async requireSentSender(message: gmail_v1.Schema$Message, expectedEmail: string): Promise<void> {
    const messageId = message.id;
    if (!messageId) {
      throw new Error("Gmail sent a message but did not return a message ID, so the sender could not be verified.");
    }

    const sent = await this.gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "metadata",
      metadataHeaders: ["From"],
    });
    const from = sent.data.payload?.headers?.find((header: gmail_v1.Schema$MessagePartHeader) => (
      header.name?.toLowerCase() === "from"
    ))?.value || "";
    if (!this.fromHeaderUsesEmail(from, expectedEmail)) {
      throw new Error(
        `Gmail sent message ${messageId} with From "${from || "(missing)"}" instead of ${expectedEmail}. ` +
          "Do not treat this sender path as safe until the Gmail send-as alias is fixed.",
      );
    }
  }

  private async deleteDraftQuietly(draftId: string): Promise<void> {
    try {
      await this.gmail.users.drafts.delete({ userId: "me", id: draftId });
    } catch {
      // The caller still fails closed; deletion may fail if Gmail already removed the draft.
    }
  }

  private fromHeaderUsesEmail(from: string, expectedEmail: string): boolean {
    return from.toLowerCase().includes(expectedEmail.toLowerCase());
  }

  private async readReplyContext(messageId: string): Promise<ReplyContext> {
    try {
      return await this.replyContext(messageId);
    } catch (error) {
      throw this.withScopeHint(error, "read Gmail message metadata for --reply-message-id");
    }
  }

  private async replyContext(messageId: string): Promise<ReplyContext> {
    const result = await this.gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "metadata",
      metadataHeaders: ["Message-ID", "References"],
    });
    const headers = result.data.payload?.headers || [];
    return {
      threadId: result.data.threadId || undefined,
      messageIdHeader: headers.find((header) => header.name?.toLowerCase() === "message-id")?.value || undefined,
      references: headers.find((header) => header.name?.toLowerCase() === "references")?.value || undefined,
    };
  }

  private manualReplyContext(input: DraftInput): ReplyContext {
    return {
      messageIdHeader: input.inReplyTo,
      references: input.references,
    };
  }

  private buildMime(input: DraftInput, replyContext: { messageIdHeader?: string; references?: string }): string {
    const headers = [
      `From: ${this.mailbox(input.fromName, input.fromEmail)}`,
      `To: ${input.to}`,
      input.cc ? `Cc: ${input.cc}` : "",
      input.bcc ? `Bcc: ${input.bcc}` : "",
      `Subject: ${this.headerValue(input.subject)}`,
      "MIME-Version: 1.0",
      replyContext.messageIdHeader ? `In-Reply-To: ${replyContext.messageIdHeader}` : "",
      replyContext.messageIdHeader
        ? `References: ${[replyContext.references, replyContext.messageIdHeader].filter(Boolean).join(" ")}`
        : "",
    ].filter(Boolean);

    if (input.attachments.length === 0) {
      return [
        ...headers,
        `Content-Type: ${input.isHtml ? "text/html" : "text/plain"}; charset="UTF-8"`,
        "Content-Transfer-Encoding: base64",
        "",
        this.base64(input.body),
      ].join("\r\n");
    }

    const boundary = `rb-gmail-${Date.now().toString(16)}`;
    const parts = [
      `--${boundary}`,
      `Content-Type: ${input.isHtml ? "text/html" : "text/plain"}; charset="UTF-8"`,
      "Content-Transfer-Encoding: base64",
      "",
      this.base64(input.body),
      ...input.attachments.flatMap((attachment) => [
        `--${boundary}`,
        `Content-Type: ${attachment.contentType}; name="${this.escapeQuoted(attachment.filename)}"`,
        "Content-Transfer-Encoding: base64",
        `Content-Disposition: attachment; filename="${this.escapeQuoted(attachment.filename)}"`,
        "",
        this.base64(attachment.content),
      ]),
      `--${boundary}--`,
      "",
    ];
    return [
      ...headers,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      ...parts,
    ].join("\r\n");
  }

  private encodeRawMessage(message: string): string {
    return Buffer.from(message, "utf8").toString("base64url");
  }

  private base64(input: string | Buffer): string {
    return Buffer.from(input).toString("base64").replace(/(.{76})/g, "$1\r\n");
  }

  private mailbox(name: string, email: string): string {
    return name ? `"${this.escapeQuoted(name)}" <${email}>` : email;
  }

  private headerValue(value: string): string {
    return /^[\x00-\x7F]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
  }

  private escapeQuoted(value: string): string {
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  private withScopeHint(error: unknown, action: string): Error {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("insufficient") || message.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT") || message.includes("403")) {
      const replyScopeNote = action.includes("message metadata")
        ? "\n\n`--reply-message-id` needs Gmail message metadata access. Do not start reauth unless that exact auth action is explicitly approved."
        : "";
      return new Error(
        `Gmail API token does not have enough scope to ${action}. The helper defaults to no-login mode and must not start Google reauth unless explicitly approved.${replyScopeNote}\n\n` +
          "Retry saved credentials with the default helper auth mode:\n" +
          "  npm run gmail:create-alias-draft -- --verify-only --from accounting@richmondblackwood.com\n\n" +
          "If a reauth is explicitly approved, use the sender-matched OAuth client file under ~/.codex and the required scopes.\n\n" +
          "Do not use auth env vars or the wrong Gmail sender as a workaround.\n\n" +
          `Original error:\n${message}`,
      );
    }
    return error instanceof Error ? error : new Error(message);
  }
}

export function attachmentFromPath(filePath: string): DraftAttachment {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    throw new Error(`Attachment does not exist or is not a file: ${resolved}`);
  }
  return {
    filePath: resolved,
    filename: path.basename(resolved),
    contentType: mime.lookup(resolved) || "application/octet-stream",
    content: fs.readFileSync(resolved),
  };
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
