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

class DeleteDraftCommand {
  private readonly cli = new CliArguments();
  private readonly env = new GmailEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length === 0) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const accountEmail = this.cli.stringOption(options, "accountEmail", RB_SENDER_EMAIL);
    const gcloudConfigDir = this.cli.stringOption(options, "gcloudConfigDir") || senderGcloudConfigDir(accountEmail);
    const gmail = new GmailClient(await this.env.readApiConfig(
      this.cli.stringOption(options, "authSource", "auto"),
      this.cli.stringOption(options, "authLogin", "never"),
      this.requiredOauthClientFile(options),
      [],
      gcloudConfigDir,
      accountEmail,
      this.cli.stringOption(options, "personaSlug"),
    ));

    for (const draftId of positionals) {
      await gmail.deleteDraft(draftId);
    }

    printJson({
      ok: true,
      deleted_draft_ids: positionals,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: delete_draft.ts [options] <draft-id> [draft-id...]

Deletes Gmail drafts by ID. Use this to remove outdated, unsafe, or wrong-sender drafts.

Options:
  --oauth-client-file PATH
  --auth-source vault|adc|gcloud|auto
  --auth-login auto|always|never       Defaults to never. Reuses saved ADC/account caches only.
  --account-email EMAIL                Used to resolve the persona OAuth vault. Defaults to accounting@richmondblackwood.com.
  --gcloud-config-dir PATH             Used to resolve the persona OAuth vault; defaults to the account's global persona gcloud cache when known.
  --persona-slug SLUG                  Optional explicit ~/.codex/google-personas/<slug>/oauth vault.`;
  }

  private requiredOauthClientFile(options: Record<string, string | boolean | string[]>): string {
    const explicit = this.cli.stringOption(options, "oauthClientFile");
    return gmailOAuthClientFile(explicit);
  }
}

void runCli(() => new DeleteDraftCommand().run(process.argv.slice(2)));
