import {
  CliArguments,
  DriveApiClient,
  GcloudAccessTokenProvider,
  printJson,
  runCli,
} from "./drive_common";
import { parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";

class DriveOrganizeCommand {
  private readonly cli = new CliArguments();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    const [command, ...args] = positionals;
    if (options.help || command === "-h") {
      process.stdout.write(`${this.usage()}\n`);
      return 0;
    }
    if (!["ensure-folder", "move-file"].includes(command)) {
      process.stdout.write(`${this.usage()}\n`);
      return 2;
    }
    if ((command === "ensure-folder" && args.length !== 2) || (command === "move-file" && args.length !== 3)) {
      process.stdout.write(`${this.usage()}\n`);
      return 2;
    }

    const authLogin = parseGcloudLoginMode(this.cli.stringOption(options, "authLogin", "always"));
    const tokenProvider = new GcloudAccessTokenProvider(authLogin);
    const drive = new DriveApiClient(tokenProvider.getAccessToken(), tokenProvider);
    const rootFolderId = command === "ensure-folder" ? args[0] : args[1];
    const folderPath = command === "ensure-folder" ? args[1] : args[2];
    const folderResult = await drive.ensureFolderPath(rootFolderId, folderPath);
    const output: Record<string, unknown> = {
      target_folder: folderResult.targetFolder,
      created_folders: folderResult.createdFolders,
    };
    if (command === "move-file") {
      output.file = await drive.moveFile(args[0], folderResult.targetFolder.id);
    }
    printJson(output);
    return 0;
  }

  private usage(): string {
    return `Usage:
  drive_organize.ts ensure-folder <root-folder-id> <folder/path>
  drive_organize.ts move-file <file-id> <root-folder-id> <folder/path>

Options:
  --auth-login always|auto|never

Create Drive folders and move files. The helper runs gcloud Drive auth itself by default.`;
  }
}

void runCli(() => new DriveOrganizeCommand().run(process.argv.slice(2)));
