import fs from "node:fs";
import path from "node:path";

import { gmail_v1, google } from "googleapis";
import mime from "mime-types";

import { GcloudAuthManager, GcloudLoginMode, parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";

export type CliOptions = Record<string, string | boolean | string[]>;

export interface ParsedArgs {
  positionals: string[];
  options: CliOptions;
}

export interface GmailConfig {
  accessToken: string;
}

export const GMAIL_REPLY_CONTEXT_SCOPE = "https://www.googleapis.com/auth/gmail.metadata";

const GMAIL_SCOPES = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.settings.basic",
  GMAIL_REPLY_CONTEXT_SCOPE,
];

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
  public readApiConfig(authLogin = "auto", oauthClientFile = "", extraScopes: string[] = []): GmailConfig {
    return {
      accessToken: new GcloudTokenProvider().getAccessToken(
        parseGcloudLoginMode(authLogin),
        oauthClientFile,
        extraScopes,
      ),
    };
  }
}

export class GcloudTokenProvider {
  public getAccessToken(
    loginMode: GcloudLoginMode = "always",
    oauthClientFile = "",
    extraScopes: string[] = [],
  ): string {
    return this.applicationDefaultAccessToken(loginMode, oauthClientFile, extraScopes);
  }

  private applicationDefaultAccessToken(loginMode: GcloudLoginMode, oauthClientFile: string, extraScopes: string[]): string {
    return new GcloudAuthManager().getAccessToken({
      serviceName: "Gmail",
      tokenCommand: "application-default",
      loginCommand: "application-default",
      loginMode,
      scopes: Array.from(new Set([...GMAIL_SCOPES, ...extraScopes])),
      disableQuotaProject: true,
      oauthClientFile: oauthClientFile || undefined,
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
            `Deleted draft ${draftId}. Do not create or send this client-facing draft until the desk alias is the actual saved sender.`,
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

  private async deleteDraftQuietly(draftId: string): Promise<void> {
    try {
      await this.gmail.users.drafts.delete({ userId: "me", id: draftId });
    } catch {
      // The caller will still fail closed; deletion may fail if Gmail already removed the draft.
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

  private buildMime(
    input: DraftInput,
    replyContext: { messageIdHeader?: string; references?: string },
  ): string {
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
      const scopes = GMAIL_SCOPES;
      const replyScopeNote = action.includes("message metadata")
        ? "\n\n`--reply-message-id` needs Gmail message metadata access. Run the one-time Gmail ADC setup command from `setup/README.md`, then retry before creating a new thread."
        : "";
      return new Error(
        `Gmail API token does not have enough scope to ${action}. The helper should trigger this gcloud auth flow itself:\n` +
          `  gcloud auth application-default login --client-id-file=.codex-local/google-oauth-client.json --scopes=${scopes.join(",")} --disable-quota-project${replyScopeNote}\n\n` +
          "Retry with the default helper auth mode:\n" +
          "  npm run gmail:create-alias-draft -- --verify-only\n\n" +
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
