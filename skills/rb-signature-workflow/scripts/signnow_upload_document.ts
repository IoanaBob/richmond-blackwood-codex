import fs from "node:fs";
import path from "node:path";

import {
  CliArguments,
  printJson,
  runCli,
  SignNowClient,
  SignNowEnvironment,
} from "./signnow_common";

class UploadDocumentCommand {
  private readonly cli = new CliArguments();
  private readonly env = new SignNowEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 1) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    this.env.load(this.cli.stringOption(options, "envFile", ".env"));
    const filePath = this.resolveFile(positionals[0]);
    const client = await SignNowClient.create(this.env.readConfig(options));
    const result = options.fieldExtract
      ? await client.uploadDocumentWithFieldExtract(filePath)
      : await client.uploadDocument(filePath, this.cli.stringOption(options, "name", path.basename(filePath)));
    printJson(result);
    return 0;
  }

  private usage(): string {
    return `Usage: signnow_upload_document.ts [--env-file .env] [--api-base URL] [--name NAME] <file>

Upload a local PDF/DOC/DOCX/etc. to SignNow through the official SDK.
Use --field-extract when the document contains SignNow text tags that should be converted into fields.

Environment:
  SIGNNOW_API_KEY       SignNow API credential used with the same bearer path as the older working SIGNNOW_ACCESS_TOKEN setup.
  SIGNNOW_ACCESS_TOKEN  Optional older name for the same bearer credential.
  SIGNNOW_API_BASIC_TOKEN Optional Basic Authorization token for OAuth exchange.
  SIGNNOW_API_USERNAME  Required with SIGNNOW_API_BASIC_TOKEN.
  SIGNNOW_API_PASSWORD  Required with SIGNNOW_API_BASIC_TOKEN.
  SIGNNOW_API_BASE      Optional API base. Defaults to https://api.signnow.com.`;
  }

  private resolveFile(input: string): string {
    const filePath = path.resolve(input);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }
    return filePath;
  }
}

void runCli(() => new UploadDocumentCommand().run(process.argv.slice(2)));
