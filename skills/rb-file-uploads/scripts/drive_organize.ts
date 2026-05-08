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
    if (![
      "ensure-folder",
      "move-file",
      "list-folder",
      "copy-file",
      "copy-folder-contents",
      "download-file",
      "get-file",
      "get-spreadsheet",
      "get-spreadsheet-values",
      "batch-update-spreadsheet",
      "import-spreadsheet",
      "update-file-content",
      "trash-file",
    ].includes(command)) {
      process.stdout.write(`${this.usage()}\n`);
      return 2;
    }
    if (
      (command === "ensure-folder" && args.length !== 2) ||
      (command === "move-file" && args.length !== 3) ||
      (command === "list-folder" && args.length !== 1) ||
      (command === "copy-file" && args.length !== 2) ||
      (command === "copy-folder-contents" && args.length !== 2) ||
      (command === "download-file" && args.length !== 2) ||
      (command === "get-file" && args.length !== 1) ||
      (command === "get-spreadsheet" && args.length !== 1) ||
      (command === "get-spreadsheet-values" && args.length !== 2) ||
      (command === "batch-update-spreadsheet" && args.length !== 2) ||
      (command === "import-spreadsheet" && args.length !== 2) ||
      (command === "update-file-content" && args.length !== 2) ||
      (command === "trash-file" && args.length !== 1)
    ) {
      process.stdout.write(`${this.usage()}\n`);
      return 2;
    }

    const authLogin = parseGcloudLoginMode(this.cli.stringOption(options, "authLogin", "always"));
    const tokenProvider = new GcloudAccessTokenProvider(authLogin);
    const drive = new DriveApiClient(tokenProvider.getAccessToken(), tokenProvider);
    if (command === "list-folder") {
      printJson({ files: await drive.listFolder(args[0], this.cli.stringOption(options, "fields") || undefined) });
      return 0;
    }
    if (command === "copy-file") {
      const source = await drive.getFile(args[0]);
      const copied = await drive.copyFile({
        sourceFileId: args[0],
        parentFolderId: args[1],
        title: this.cli.stringOption(options, "title", source.name),
      });
      printJson({ source, copied });
      return 0;
    }
    if (command === "copy-folder-contents") {
      const sourceFiles = await drive.listFolder(args[0]);
      const copied = [];
      const skippedFolders = [];
      for (const sourceFile of sourceFiles) {
        if (sourceFile.mimeType === "application/vnd.google-apps.folder") {
          skippedFolders.push(sourceFile);
          continue;
        }
        copied.push(await drive.copyFile({
          sourceFileId: sourceFile.id,
          parentFolderId: args[1],
          title: sourceFile.name,
          fields: "id,name,mimeType,webViewLink,parents,size,md5Checksum,createdTime,modifiedTime",
        }));
      }
      printJson({ source_files: sourceFiles, copied, skipped_folders: skippedFolders });
      return 0;
    }
    if (command === "download-file") {
      const outputPath = args[1];
      const bytes = await drive.downloadFile(args[0]);
      await import("node:fs/promises").then((fs) => fs.writeFile(outputPath, bytes));
      printJson({ file_id: args[0], output_path: outputPath, size: bytes.length });
      return 0;
    }
    if (command === "get-file") {
      printJson({
        file: await drive.getFile(
          args[0],
          this.cli.stringOption(
            options,
            "fields",
            "id,name,mimeType,webViewLink,parents,size,md5Checksum,createdTime,modifiedTime",
          ),
        ),
      });
      return 0;
    }
    if (command === "get-spreadsheet") {
      printJson({
        spreadsheet: await drive.getSpreadsheet(
          args[0],
          this.cli.stringOption(
            options,
            "fields",
            "spreadsheetId,spreadsheetUrl,properties(title,locale,timeZone),sheets(properties(sheetId,title,index,sheetType,hidden,gridProperties))",
          ),
        ),
      });
      return 0;
    }
    if (command === "get-spreadsheet-values") {
      printJson({
        values: await drive.getSpreadsheetValues(
          args[0],
          args[1],
          this.cli.stringOption(options, "valueRenderOption", "FORMULA"),
        ),
      });
      return 0;
    }
    if (command === "batch-update-spreadsheet") {
      const requestBytes = await import("node:fs/promises").then((fs) => fs.readFile(args[1], "utf8"));
      const parsed = JSON.parse(requestBytes) as unknown;
      const requests = Array.isArray(parsed)
        ? parsed
        : typeof parsed === "object" && parsed !== null && Array.isArray((parsed as { requests?: unknown }).requests)
          ? (parsed as { requests: unknown[] }).requests
          : null;
      if (!requests) {
        throw new Error("Batch update JSON must be an array or an object with a requests array.");
      }
      printJson({ response: await drive.batchUpdateSpreadsheet(args[0], requests as Record<string, unknown>[]) });
      return 0;
    }
    if (command === "import-spreadsheet") {
      printJson({
        file: await drive.importSpreadsheet({
          sourceFile: args[0],
          folderId: args[1],
          title: this.cli.stringOption(options, "title") || undefined,
          fields: this.cli.stringOption(
            options,
            "fields",
            "id,name,mimeType,webViewLink,parents,createdTime,modifiedTime",
          ),
        }),
      });
      return 0;
    }
    if (command === "update-file-content") {
      printJson({
        file: await drive.updateFileContent({
          fileId: args[0],
          sourceFile: args[1],
          title: this.cli.stringOption(options, "title") || undefined,
          mimeType: this.cli.stringOption(options, "mimeType") || undefined,
          fields: this.cli.stringOption(options, "fields", "id,name,mimeType,webViewLink,size,md5Checksum,modifiedTime"),
        }),
      });
      return 0;
    }
    if (command === "trash-file") {
      printJson({ file: await drive.trashFile(args[0]) });
      return 0;
    }

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
  drive_organize.ts list-folder <folder-id>
  drive_organize.ts copy-file <source-file-id> <target-folder-id> [--title NAME]
  drive_organize.ts copy-folder-contents <source-folder-id> <target-folder-id>
  drive_organize.ts download-file <file-id> <output-path>
  drive_organize.ts get-file <file-id>
  drive_organize.ts get-spreadsheet <spreadsheet-id>
  drive_organize.ts get-spreadsheet-values <spreadsheet-id> <Sheet!A1:Z10> [--value-render-option FORMULA|FORMATTED_VALUE|UNFORMATTED_VALUE]
  drive_organize.ts batch-update-spreadsheet <spreadsheet-id> <requests-json-file>
  drive_organize.ts import-spreadsheet <source-file> <target-folder-id> [--title NAME]
  drive_organize.ts update-file-content <file-id> <source-file> [--title NAME] [--mime-type TYPE]
  drive_organize.ts trash-file <file-id>

Options:
  --fields FIELDS
  --auth-login always|auto|never

Create Drive folders and move, copy, list, or trash files. The helper runs gcloud Drive auth itself by default.`;
  }
}

void runCli(() => new DriveOrganizeCommand().run(process.argv.slice(2)));
