import {
  CliArguments,
  printJson,
  runCli,
  SignNowClient,
  SignNowEnvironment,
} from "./signnow_common";

class GetDocumentCommand {
  private readonly cli = new CliArguments();
  private readonly env = new SignNowEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 1) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    this.env.load(this.cli.stringOption(options, "envFile", ".env"));
    const client = await SignNowClient.create(this.env.readConfig(options));
    const result = await client.getDocument(positionals[0]);
    printJson(result);
    return 0;
  }

  private usage(): string {
    return `Usage: signnow_get_document.ts [--env-file .env] [--api-base URL] <document-id>

Fetch raw SignNow document metadata through the official SDK.`;
  }
}

void runCli(() => new GetDocumentCommand().run(process.argv.slice(2)));
