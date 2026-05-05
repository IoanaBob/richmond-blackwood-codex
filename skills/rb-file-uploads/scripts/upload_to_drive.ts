import path from "node:path";

import {
  CliArguments,
  DEFAULT_UPLOAD_FIELDS,
  DriveApiClient,
  GcloudAccessTokenProvider,
  printJson,
  runCli,
} from "./drive_common";
import { parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";

class UploadToDriveCommand {
  private readonly cli = new CliArguments();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 2) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const authLogin = parseGcloudLoginMode(this.cli.stringOption(options, "authLogin", "always"));
    const tokenProvider = new GcloudAccessTokenProvider(authLogin);
    const drive = new DriveApiClient(tokenProvider.getAccessToken(), tokenProvider);
    const result = await drive.uploadFile({
      sourceFile: path.resolve(positionals[0]),
      folderId: positionals[1],
      title: this.cli.stringOption(options, "title") || undefined,
      mimeType: this.cli.stringOption(options, "mimeType") || undefined,
      fields: this.cli.stringOption(options, "fields", DEFAULT_UPLOAD_FIELDS),
    });
    printJson(result);
    return 0;
  }

  private usage(): string {
    return `Usage: upload_to_drive.ts <source-file> <folder-id> [--title NAME] [--mime-type TYPE] [--fields FIELDS] [--auth-login always|auto|never]

Upload a local file to Google Drive. The helper runs gcloud Drive auth itself by default.`;
  }
}

void runCli(() => new UploadToDriveCommand().run(process.argv.slice(2)));
