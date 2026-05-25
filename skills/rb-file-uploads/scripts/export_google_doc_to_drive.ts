import fs from "node:fs";
import path from "node:path";

import {
  CliArguments,
  createDriveAccessTokenProvider,
  DriveApiClient,
  parseDriveAuthSource,
  printJson,
  runCli,
} from "./drive_common";
import { parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";

class ExportGoogleDocToDriveCommand {
  private readonly cli = new CliArguments();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 2) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const [documentId, targetFolderId] = positionals;
    const title = this.cli.stringOption(options, "pdfTitle", `${documentId}.pdf`);
    const outputPath = path.resolve(this.cli.stringOption(options, "pdfOutput", `/private/tmp/${title}`));
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
    const pdfBytes = await drive.exportFile(documentId, "application/pdf");

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, pdfBytes);

    const uploadedPdf = await drive.uploadFile({
      sourceFile: outputPath,
      folderId: targetFolderId,
      title,
      mimeType: "application/pdf",
    });

    printJson({
      source_google_doc_id: documentId,
      pdf_output: outputPath,
      uploaded_pdf: uploadedPdf,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: export_google_doc_to_drive.ts <google-doc-id> <target-folder-id> [--pdf-title TITLE] [--pdf-output PATH] [--auth-source auto|vault|adc|account|gcloud|direct-adc] [--auth-login always|auto|never] [--account-email EMAIL] [--gcloud-config-dir PATH] [--persona-slug SLUG] [--adc-file PATH]

Exports a native Google Doc to PDF and uploads the PDF to Drive.
This helper performs no Google Docs content edits and tries the per-persona OAuth vault before saved gcloud/ADC caches.`;
  }
}

void runCli(() => new ExportGoogleDocToDriveCommand().run(process.argv.slice(2)));
