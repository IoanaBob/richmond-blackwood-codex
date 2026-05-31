import {
  CliArguments,
  GmailClient,
  GmailEnvironment,
  gmailOAuthClientFile,
  printJson,
  runCli,
  senderGcloudConfigDir,
} from "./gmail_common";

const RB_SENDER_EMAIL = "accounting@richmondblackwood.com";

class SendDraftCommand {
  private readonly cli = new CliArguments();
  private readonly env = new GmailEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help) {
      process.stdout.write(`${this.usage()}\n`);
      return 0;
    }

    const draftId = this.cli.stringOption(options, "draftId") || positionals[0];
    if (!draftId) {
      process.stdout.write(`${this.usage()}\n`);
      return 2;
    }

    const fromEmail = this.sender(options);
    this.assertSenderAllowed(fromEmail, options);
    const authSource = this.cli.stringOption(options, "authSource", "auto");
    const authLogin = this.cli.stringOption(options, "authLogin", "never");
    const accountEmail = this.cli.stringOption(options, "accountEmail", fromEmail);
    const gcloudConfigDir = this.cli.stringOption(options, "gcloudConfigDir") || senderGcloudConfigDir(accountEmail);
    const personaSlug = this.cli.stringOption(options, "personaSlug");

    const gmail = new GmailClient(await this.env.readApiConfig(
      authSource,
      authLogin,
      this.requiredOauthClientFile(options, fromEmail),
      [],
      gcloudConfigDir,
      accountEmail,
      personaSlug,
    ));
    const message = await gmail.sendDraft(draftId, fromEmail);
    printJson({
      ok: true,
      transport: "api",
      draft_id: draftId,
      message_id: message.id || null,
      thread_id: message.threadId || null,
      from: fromEmail,
      auth_account: accountEmail,
      persona_slug: personaSlug || null,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: send_draft.ts [options] <draft-id>

Sends an existing Gmail draft after verifying the saved From header. It does not compose or modify the draft.

Sender:
  --from EMAIL                         Defaults to accounting@richmondblackwood.com.
  --allow-non-accounting-sender        Required for any sender other than accounting@richmondblackwood.com.

Options:
  --draft-id ID                        Alternative to positional <draft-id>.
  --oauth-client-file PATH             Defaults to sender-specific global Codex OAuth files when required.
  --auth-source vault|adc|gcloud|auto  Defaults to auto.
  --auth-login auto|always|never       Defaults to never. Reuses saved credentials only.
  --account-email EMAIL                Auth account used for the Gmail API. Defaults to --from.
  --gcloud-config-dir PATH             Defaults to the auth account's global persona gcloud cache when known.
  --persona-slug SLUG                  Optional explicit ~/.codex/google-personas/<slug>/oauth vault.`;
  }

  private requiredOauthClientFile(options: Record<string, string | boolean | string[]>, fromEmail: string): string {
    const explicit = this.cli.stringOption(options, "oauthClientFile");
    return gmailOAuthClientFile(explicit, fromEmail);
  }

  private sender(options: Record<string, string | boolean | string[]>): string {
    return this.cli.stringOption(options, "from", process.env.GMAIL_FROM_EMAIL || RB_SENDER_EMAIL);
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
}

void runCli(() => new SendDraftCommand().run(process.argv.slice(2)));
