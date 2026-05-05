import {
  CliArguments,
  printJson,
  runCli,
  SignNowClient,
  SignNowEnvironment,
} from "./signnow_common";

class CreateEmbeddedReviewLinkCommand {
  private readonly cli = new CliArguments();
  private readonly env = new SignNowEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    const type = this.cli.stringOption(options, "type", "document");
    if (options.help || positionals.length !== 1 || !["document", "editor"].includes(type)) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    this.env.load(this.cli.stringOption(options, "envFile", ".env"));
    const client = await SignNowClient.create(this.env.readConfig(options));
    const result = type === "editor"
      ? await client.createEmbeddedEditorLink({
          documentId: positionals[0],
          type: "editor",
          redirectUri: this.cli.stringOption(options, "redirectUri"),
          redirectTarget: this.cli.stringOption(options, "redirectTarget"),
          linkExpiration: this.cli.numberOption(options, "linkExpiration", 45),
        })
      : await client.createEmbeddedDocumentReviewLink({
          documentId: positionals[0],
          type: "document",
          redirectUri: this.cli.stringOption(options, "redirectUri"),
          redirectTarget: this.cli.stringOption(options, "redirectTarget"),
          linkExpiration: this.cli.numberOption(options, "linkExpiration", 45),
        });

    printJson(result);
    return 0;
  }

  private usage(): string {
    return `Usage: signnow_create_embedded_review_link.ts [options] <document-id>

Creates a SignNow review link only. It must not be used to send invites.

Optional:
  --type document|editor
  --redirect-uri URL
  --redirect-target TARGET
  --link-expiration 45
  --env-file .env
  --api-base URL`;
  }
}

void runCli(() => new CreateEmbeddedReviewLinkCommand().run(process.argv.slice(2)));
