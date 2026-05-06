import fs from "node:fs";
import path from "node:path";

import {
  attachmentFromPath,
  CliArguments,
  GmailClient,
  GmailEnvironment,
  GMAIL_REPLY_CONTEXT_SCOPE,
  printJson,
  runCli,
} from "./gmail_common";

const RB_SENDER_EMAIL = "accounting@richmondblackwood.com";

class CreateAliasDraftCommand {
  private readonly cli = new CliArguments();
  private readonly env = new GmailEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { options } = this.cli.parse(argv);
    if (options.help) {
      process.stdout.write(`${this.usage()}\n`);
      return 0;
    }

    const fromEmail = this.requireRbSender(this.cli.stringOption(options, "from", RB_SENDER_EMAIL));
    const fromName = this.cli.stringOption(options, "fromName", "Richmond Blackwood Accounting Team");
    const authLogin = this.cli.stringOption(options, "authLogin", "always");

    if (this.cli.booleanOption(options, "verifyOnly")) {
      printJson(await this.verify(fromEmail, authLogin, options));
      return 0;
    }

    const to = this.required(options, "to");
    const subject = this.required(options, "subject");
    const body = this.body(options);
    const draftInput = {
      fromEmail,
      fromName,
      to,
      subject,
      body,
      cc: this.cli.stringOption(options, "cc") || undefined,
      bcc: this.cli.stringOption(options, "bcc") || undefined,
      isHtml: this.cli.booleanOption(options, "html"),
      replyMessageId: this.cli.stringOption(options, "replyMessageId") || undefined,
      inReplyTo: this.cli.stringOption(options, "inReplyTo") || undefined,
      references: this.cli.stringOption(options, "references") || undefined,
      attachments: this.cli.arrayOption(options, "attachment").map((filePath) => attachmentFromPath(filePath)),
    };

    const oauthClientFile = this.requiredOauthClientFile(options);
    const gmail = new GmailClient(this.env.readApiConfig(
      authLogin,
      oauthClientFile,
      draftInput.replyMessageId ? [GMAIL_REPLY_CONTEXT_SCOPE] : [],
    ));
    const alias = await gmail.verifyAlias(fromEmail);
    const draft = await gmail.createDraft(draftInput);
    printJson({
      ok: true,
      transport: "api",
      alias,
      draft_id: draft.id || null,
      message_id: draft.message?.id || null,
      thread_id: draft.message?.threadId || null,
      from: `${fromName} <${fromEmail}>`,
      to,
      cc: this.cli.stringOption(options, "cc") || null,
      subject,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: create_alias_draft.ts [options]

Creates a Gmail draft from the configured Richmond Blackwood send-as alias. It never sends.

Required unless --verify-only:
  --to EMAILS
  --subject TEXT
  --body TEXT or --body-file PATH

Defaults:
  --from accounting@richmondblackwood.com
  --from-name "Richmond Blackwood Accounting Team"

Options:
  --cc EMAILS
  --bcc EMAILS
  --html
  --oauth-client-file PATH           Gmail API/gcloud OAuth client JSON. Defaults to .codex-local/google-oauth-client.json when present.
  --in-reply-to MESSAGE_ID_HEADER    Optional RFC Message-ID header for threaded replies.
  --references MESSAGE_ID_HEADERS    Optional RFC References header for draft threading.
  --auth-login auto|always|never     Defaults to always. Uses gcloud application-default OAuth.
  --reply-message-id GMAIL_MESSAGE_ID   Requires the Gmail metadata scope.
  --attachment /absolute/path/file.pdf   Repeat for multiple attachments.
  --verify-only`;
  }

  private oauthClientFile(options: Record<string, string | boolean | string[]>): string {
    const explicit = this.cli.stringOption(options, "oauthClientFile");
    if (explicit) {
      return explicit;
    }
    const defaultPath = path.resolve(".codex-local/google-oauth-client.json");
    return fs.existsSync(defaultPath) ? defaultPath : "";
  }

  private requiredOauthClientFile(options: Record<string, string | boolean | string[]>): string {
    const oauthClientFile = this.oauthClientFile(options);
    if (!oauthClientFile) {
      throw new Error(
        "Missing Gmail OAuth client file. Create a Google OAuth desktop client, trust/allow it in Google Workspace Admin, " +
          "save it at .codex-local/google-oauth-client.json, then retry. This path is gitignored.",
      );
    }
    return oauthClientFile;
  }

  private async verify(
    fromEmail: string,
    authLogin: string,
    options: Record<string, string | boolean | string[]>,
  ): Promise<unknown> {
    const gmail = new GmailClient(this.env.readApiConfig(authLogin, this.requiredOauthClientFile(options)));
    const alias = await gmail.verifyAlias(fromEmail);
    return { ok: true, transport: "api", alias };
  }

  private required(options: Record<string, string | boolean | string[]>, key: string): string {
    const value = this.cli.stringOption(options, key);
    if (!value) {
      throw new Error(`Missing required option --${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}.`);
    }
    return value;
  }

  private body(options: Record<string, string | boolean | string[]>): string {
    const bodyFile = this.cli.stringOption(options, "bodyFile");
    if (bodyFile) {
      return fs.readFileSync(path.resolve(bodyFile), "utf8");
    }
    return this.required(options, "body");
  }

  private requireRbSender(fromEmail: string): string {
    if (fromEmail !== RB_SENDER_EMAIL) {
      throw new Error(
        `Richmond Blackwood client-facing drafts must use ${RB_SENDER_EMAIL}. ` +
          "Do not create or send drafts from another sender.",
      );
    }
    return fromEmail;
  }
}

void runCli(() => new CreateAliasDraftCommand().run(process.argv.slice(2)));
