import {
  CliArguments,
  GmailClient,
  GmailEnvironment,
  printJson,
  runCli,
} from "./gmail_common";

class DeleteDraftCommand {
  private readonly cli = new CliArguments();
  private readonly env = new GmailEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length === 0) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const gmail = new GmailClient(this.env.readApiConfig(
      this.cli.stringOption(options, "authLogin", "always"),
      this.requiredOauthClientFile(options),
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

Deletes Gmail drafts by ID. Use this to remove unsafe Richmond Blackwood drafts whose stored sender is not accounting@richmondblackwood.com.

Options:
  --oauth-client-file PATH
  --auth-login auto|always|never     Defaults to always. Uses gcloud application-default OAuth.`;
  }

  private requiredOauthClientFile(options: Record<string, string | boolean | string[]>): string {
    const explicit = this.cli.stringOption(options, "oauthClientFile");
    if (explicit) return explicit;
    return ".codex-local/google-oauth-client.json";
  }
}

void runCli(() => new DeleteDraftCommand().run(process.argv.slice(2)));
