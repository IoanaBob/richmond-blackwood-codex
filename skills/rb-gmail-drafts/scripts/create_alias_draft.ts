import fs from "node:fs";
import path from "node:path";

import {
  attachmentFromPath,
  CliArguments,
  GmailClient,
  GmailEnvironment,
  GMAIL_REPLY_CONTEXT_SCOPE,
  gmailOAuthClientFile,
  printJson,
  runCli,
  senderGcloudConfigDir,
} from "./gmail_common";

const RB_SENDER_EMAIL = "accounting@richmondblackwood.com";
const RB_SENDER_NAME = "Richmond Blackwood Accounting Team";

class CreateAliasDraftCommand {
  private readonly cli = new CliArguments();
  private readonly env = new GmailEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { options } = this.cli.parse(argv);
    if (options.help) {
      process.stdout.write(`${this.usage()}\n`);
      return 0;
    }

    const fromEmail = this.sender(options);
    this.assertSenderAllowed(fromEmail, options);
    const fromName = this.senderName(options, fromEmail);
    const authSource = this.cli.stringOption(options, "authSource", "auto");
    const authLogin = this.cli.stringOption(options, "authLogin", "never");
    const accountEmail = this.cli.stringOption(options, "accountEmail", fromEmail);
    const gcloudConfigDir = this.cli.stringOption(options, "gcloudConfigDir") || senderGcloudConfigDir(accountEmail);
    const personaSlug = this.cli.stringOption(options, "personaSlug");

    if (this.cli.booleanOption(options, "verifyOnly")) {
      printJson(await this.verify(fromEmail, authSource, authLogin, gcloudConfigDir, accountEmail, personaSlug, options));
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

    const oauthClientFile = this.requiredOauthClientFile(options, fromEmail);
    const gmail = new GmailClient(await this.env.readApiConfig(
      authSource,
      authLogin,
      oauthClientFile,
      draftInput.replyMessageId ? [GMAIL_REPLY_CONTEXT_SCOPE] : [],
      gcloudConfigDir,
      accountEmail,
      personaSlug,
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
      from: this.senderLabel(fromName, fromEmail),
      auth_account: accountEmail,
      persona_slug: personaSlug || null,
      to,
      cc: this.cli.stringOption(options, "cc") || null,
      subject,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: create_alias_draft.ts [options]

Creates a Gmail draft from a Richmond Blackwood Gmail send-as alias. It never sends.

Required unless --verify-only:
  --to EMAILS
  --subject TEXT
  --body TEXT or --body-file PATH

Sender:
  --from EMAIL                      Defaults to accounting@richmondblackwood.com.
  --from-name TEXT                  Defaults to "Richmond Blackwood Accounting Team" for accounting@.
  --allow-non-accounting-sender     Required for any sender other than accounting@richmondblackwood.com.

Options:
  --cc EMAILS
  --bcc EMAILS
  --html
  --oauth-client-file PATH          Defaults to sender-specific global Codex OAuth files when required, then
                                    CODEX_GOOGLE_OAUTH_CLIENT_FILE / GOOGLE_OAUTH_CLIENT_FILE, then
                                    ~/.codex/google-oauth-client.json when present.
  --in-reply-to MESSAGE_ID_HEADER   Optional RFC Message-ID header for manual reply threading.
  --references MESSAGE_ID_HEADERS   Optional RFC References header for draft threading.
  --auth-source vault|adc|gcloud|auto  Defaults to auto. API mode only.
  --auth-login auto|always|never    Defaults to never. Reuses saved ADC/account caches only.
  --account-email EMAIL             Auth account used for the Gmail API. Defaults to --from.
  --gcloud-config-dir PATH          Defaults to the auth account's global persona gcloud cache when known.
  --persona-slug SLUG               Optional explicit ~/.codex/google-personas/<slug>/oauth vault.
  --reply-message-id GMAIL_MESSAGE_ID  API mode only. Requires the Gmail metadata scope.
  --attachment /absolute/path/file.pdf  Repeat for multiple attachments.
  --verify-only`;
  }

  private oauthClientFile(options: Record<string, string | boolean | string[]>, fromEmail: string): string {
    return gmailOAuthClientFile(this.cli.stringOption(options, "oauthClientFile"), fromEmail);
  }

  private requiredOauthClientFile(options: Record<string, string | boolean | string[]>, fromEmail: string): string {
    return this.oauthClientFile(options, fromEmail);
  }

  private async verify(
    fromEmail: string,
    authSource: string,
    authLogin: string,
    gcloudConfigDir: string,
    accountEmail: string,
    personaSlug: string,
    options: Record<string, string | boolean | string[]>,
  ): Promise<unknown> {
    const gmail = new GmailClient(await this.env.readApiConfig(
      authSource,
      authLogin,
      this.requiredOauthClientFile(options, fromEmail),
      [],
      gcloudConfigDir,
      accountEmail,
      personaSlug,
    ));
    const alias = await gmail.verifyAlias(fromEmail);
    return { ok: true, transport: "api", alias, auth_account: accountEmail, persona_slug: personaSlug || null };
  }

  private required(options: Record<string, string | boolean | string[]>, key: string): string {
    const value = this.cli.stringOption(options, key);
    if (!value) {
      throw new Error(`Missing required option --${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}.`);
    }
    return value;
  }

  private sender(options: Record<string, string | boolean | string[]>): string {
    return this.cli.stringOption(options, "from", process.env.GMAIL_FROM_EMAIL || RB_SENDER_EMAIL);
  }

  private senderName(options: Record<string, string | boolean | string[]>, fromEmail: string): string {
    return this.cli.stringOption(
      options,
      "fromName",
      process.env.GMAIL_FROM_NAME || (fromEmail === RB_SENDER_EMAIL ? RB_SENDER_NAME : ""),
    );
  }

  private assertSenderAllowed(fromEmail: string, options: Record<string, string | boolean | string[]>): void {
    if (fromEmail === RB_SENDER_EMAIL || this.cli.booleanOption(options, "allowNonAccountingSender")) {
      return;
    }
    throw new Error(
      `Richmond Blackwood client-facing drafts default to ${RB_SENDER_EMAIL}. ` +
        "Pass --allow-non-accounting-sender only after the user explicitly approves a different exact From identity.",
    );
  }

  private body(options: Record<string, string | boolean | string[]>): string {
    const bodyFile = this.cli.stringOption(options, "bodyFile");
    if (bodyFile) {
      return fs.readFileSync(path.resolve(bodyFile), "utf8");
    }
    return this.required(options, "body");
  }

  private senderLabel(fromName: string, fromEmail: string): string {
    return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  }
}

void runCli(() => new CreateAliasDraftCommand().run(process.argv.slice(2)));
