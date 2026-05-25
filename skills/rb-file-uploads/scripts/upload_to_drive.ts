import path from "node:path";

import {
  CliArguments,
  createDriveAccessTokenProvider,
  DEFAULT_UPLOAD_FIELDS,
  DriveApiClient,
  parseDriveAuthSource,
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

    const authLogin = parseGcloudLoginMode(this.cli.stringOption(options, "authLogin", "never"));
    const authSource = parseDriveAuthSource(this.cli.stringOption(options, "authSource", "auto"));
    const tokenProvider = createDriveAccessTokenProvider({
      authSource,
      loginMode: authLogin,
      adcFile: this.cli.stringOption(options, "adcFile"),
      accountEmail: this.cli.stringOption(options, "accountEmail"),
      gcloudConfigDir: this.cli.stringOption(options, "gcloudConfigDir"),
      personaSlug: this.cli.stringOption(options, "personaSlug"),
    });
    const drive = new DriveApiClient(await tokenProvider.getAccessToken(), tokenProvider);
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
    return `Usage: upload_to_drive.ts <source-file> <folder-id> [--title NAME] [--mime-type TYPE] [--fields FIELDS] [--auth-source auto|vault|adc|account|gcloud|direct-adc] [--auth-login always|auto|never] [--account-email EMAIL] [--gcloud-config-dir PATH] [--persona-slug SLUG] [--adc-file PATH]

Upload a local file to Google Drive. The helper tries the per-persona OAuth vault first, then gcloud-backed saved ADC/account caches, and does not start interactive login unless explicitly requested.`;
  }
}

void runCli(() => new UploadToDriveCommand().run(process.argv.slice(2)));
