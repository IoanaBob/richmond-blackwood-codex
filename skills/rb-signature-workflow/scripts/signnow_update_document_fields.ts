import fs from "node:fs";
import path from "node:path";

import {
  CliArguments,
  type FieldsPayload,
  printJson,
  runCli,
  SignNowClient,
  SignNowEnvironment,
} from "./signnow_common";

class UpdateDocumentFieldsCommand {
  private readonly cli = new CliArguments();
  private readonly env = new SignNowEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 1 || !options.fieldsJson) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    this.env.load(this.cli.stringOption(options, "envFile", ".env"));
    const payload = this.readFieldsPayload(this.cli.stringOption(options, "fieldsJson"));
    const client = await SignNowClient.create(this.env.readConfig(options));
    const result = await client.updateDocumentFields(positionals[0], payload);
    printJson(result);
    return 0;
  }

  private usage(): string {
    return `Usage: signnow_update_document_fields.ts [--env-file .env] [--api-base URL] <document-id> --fields-json fields.json

Add or replace fields on a SignNow document through the official SDK.

The JSON payload must contain a top-level "fields" array.`;
  }

  private readFieldsPayload(fileName: string): FieldsPayload {
    const payloadPath = path.resolve(fileName);
    if (!fs.existsSync(payloadPath) || !fs.statSync(payloadPath).isFile()) {
      throw new Error(`Fields JSON not found: ${payloadPath}`);
    }

    const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8")) as FieldsPayload;
    if (!Array.isArray(payload.fields)) {
      throw new Error('Fields JSON must contain a top-level "fields" array.');
    }
    return payload;
  }
}

void runCli(() => new UpdateDocumentFieldsCommand().run(process.argv.slice(2)));
