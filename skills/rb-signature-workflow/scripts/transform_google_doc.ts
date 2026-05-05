import fs from "node:fs";
import path from "node:path";

import { PDFDocument } from "pdf-lib";

import {
  DEFAULT_UPLOAD_FIELDS,
  DriveApiClient,
  GcloudAccessTokenProvider,
} from "../../rb-file-uploads/scripts/drive_common";
import { parseGcloudLoginMode } from "../../rb-google-auth/scripts/gcloud_auth";
import { CliArguments, printJson, runCli } from "./signnow_common";

interface TextRun {
  startIndex: number;
  endIndex: number;
  content: string;
}

interface TextMatch {
  startIndex: number;
  endIndex: number;
}

interface TableCellEdit {
  startIndex: number;
  endIndex: number;
  value: string;
}

interface ReplaceAllTextOperation {
  text: string;
  value: string | number | null;
  matchCase?: boolean;
}

interface DeleteBoundaryOperation {
  text: string;
}

interface DeleteBetweenTextOperation {
  startText: string;
  endText: string;
  includeStart?: boolean;
  includeEnd?: boolean;
}

interface TableFillOperation {
  tableIndex: number;
  labels: Record<string, string | number | null | undefined>;
  labelColumnIndex?: number;
  valueColumnIndex?: number;
  normalizeLabels?: boolean;
}

interface TransformPlan {
  deleteBeforeText?: DeleteBoundaryOperation[];
  deleteFromTextToEnd?: DeleteBoundaryOperation[];
  deleteBetweenText?: DeleteBetweenTextOperation[];
  replaceAllText?: ReplaceAllTextOperation[];
  fillTableCells?: TableFillOperation[];
}

class GoogleDocTransformCommand {
  private readonly cli = new CliArguments();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 1) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const plan = this.readPlan(positionals[0]);
    const sourceDocumentId = this.requiredOption(options, "sourceDocumentId");
    const targetFolderId = this.requiredOption(options, "targetFolderId");
    const title = this.requiredOption(options, "title");
    const pdfOutput = path.resolve(this.cli.stringOption(options, "pdfOutput", `/private/tmp/${title}.pdf`));
    const pdfTitle = this.cli.stringOption(options, "pdfTitle", `${title}.pdf`);
    const maxPdfPages = this.numberOption(options, "maxPdfPages", 0);
    const authLogin = parseGcloudLoginMode(this.cli.stringOption(options, "authLogin", "always"));

    const tokenProvider = new GcloudAccessTokenProvider(authLogin);
    const drive = new DriveApiClient(tokenProvider.getAccessToken(), tokenProvider);
    const generatedDoc = await drive.copyFile({
      sourceFileId: sourceDocumentId,
      parentFolderId: targetFolderId,
      title,
      fields: DEFAULT_UPLOAD_FIELDS,
    });

    await this.applyDeletes(drive, generatedDoc.id, plan);
    await this.applyTextReplacements(drive, generatedDoc.id, plan);
    await this.applyTableFills(drive, generatedDoc.id, plan);

    let pdfBytes = await drive.exportFile(generatedDoc.id, "application/pdf");
    if (maxPdfPages > 0) {
      pdfBytes = await this.limitPdfPages(pdfBytes, maxPdfPages);
    }
    fs.mkdirSync(path.dirname(pdfOutput), { recursive: true });
    fs.writeFileSync(pdfOutput, pdfBytes);

    const uploadedPdf = await drive.uploadFile({
      sourceFile: pdfOutput,
      folderId: targetFolderId,
      title: pdfTitle,
      mimeType: "application/pdf",
    });

    printJson({
      generated_google_doc: generatedDoc,
      pdf_output: pdfOutput,
      uploaded_pdf: uploadedPdf,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: transform_google_doc.ts [options] <transform-plan-json>

Copies a Google Doc, applies explicit mechanical edits, exports a PDF, and uploads that PDF to Drive.
This helper intentionally contains no Richmond Blackwood business or template-selection logic.

Required:
  --source-document-id ID
  --target-folder-id ID
  --title TITLE

Optional:
  --pdf-output PATH
  --pdf-title TITLE
  --max-pdf-pages N
  --auth-login always|auto|never

Plan JSON shape:
{
  "deleteBeforeText": [{"text": "start heading"}],
  "deleteFromTextToEnd": [{"text": "next heading"}],
  "deleteBetweenText": [{"startText": "A", "endText": "B"}],
  "replaceAllText": [{"text": "[PLACEHOLDER]", "value": "filled value"}],
  "fillTableCells": [{
    "tableIndex": 0,
    "labels": {"Field label": "filled value"},
    "labelColumnIndex": 0,
    "valueColumnIndex": 1
  }]
}`;
  }

  private async applyDeletes(drive: DriveApiClient, documentId: string, plan: TransformPlan): Promise<void> {
    let document = await drive.getDocument(documentId);
    const requests: Record<string, unknown>[] = [];

    for (const operation of plan.deleteFromTextToEnd || []) {
      const match = this.requiredTextMatch(document, operation.text);
      const bodyEnd = this.bodyEndIndex(document);
      if (match.startIndex < bodyEnd - 1) {
        requests.push(this.deleteContentRequest(match.startIndex, bodyEnd - 1));
      }
    }

    for (const operation of plan.deleteBeforeText || []) {
      const match = this.requiredTextMatch(document, operation.text);
      if (match.startIndex > 1) {
        requests.push(this.deleteContentRequest(1, match.startIndex));
      }
    }

    for (const operation of plan.deleteBetweenText || []) {
      const start = this.requiredTextMatch(document, operation.startText);
      const end = this.requiredTextMatch(document, operation.endText);
      const startIndex = operation.includeStart ? start.startIndex : start.endIndex;
      const endIndex = operation.includeEnd ? end.endIndex : end.startIndex;
      if (startIndex < endIndex) {
        requests.push(this.deleteContentRequest(startIndex, endIndex));
      }
    }

    if (requests.length > 0) {
      await drive.batchUpdateDocument(documentId, requests.sort((a, b) => (
        this.deleteStartIndex(b) - this.deleteStartIndex(a)
      )));
      document = await drive.getDocument(documentId);
      this.assertDocument(document);
    }
  }

  private async applyTextReplacements(drive: DriveApiClient, documentId: string, plan: TransformPlan): Promise<void> {
    const requests = (plan.replaceAllText || [])
      .filter((operation) => operation.value !== undefined && operation.value !== null)
      .map((operation) => ({
        replaceAllText: {
          containsText: { text: operation.text, matchCase: operation.matchCase !== false },
          replaceText: String(operation.value),
        },
      }));

    if (requests.length > 0) {
      await drive.batchUpdateDocument(documentId, requests);
    }
  }

  private async applyTableFills(drive: DriveApiClient, documentId: string, plan: TransformPlan): Promise<void> {
    if (!plan.fillTableCells || plan.fillTableCells.length === 0) {
      return;
    }

    const document = await drive.getDocument(documentId);
    const tables = this.tables(document);
    const edits: TableCellEdit[] = [];

    for (const operation of plan.fillTableCells) {
      const table = tables[operation.tableIndex];
      if (!table) {
        throw new Error(`Table index ${operation.tableIndex} does not exist in copied document.`);
      }
      edits.push(...this.tableCellEdits(table, operation));
    }

    if (edits.length > 0) {
      await drive.batchUpdateDocument(documentId, edits
        .sort((a, b) => b.startIndex - a.startIndex)
        .flatMap((edit) => this.replaceCellRequests(edit)));
    }
  }

  private tableCellEdits(table: Record<string, unknown>, operation: TableFillOperation): TableCellEdit[] {
    const rows = Array.isArray(table.tableRows) ? table.tableRows as Record<string, unknown>[] : [];
    const labelColumnIndex = operation.labelColumnIndex ?? 0;
    const valueColumnIndex = operation.valueColumnIndex ?? 1;
    const normalizeLabels = operation.normalizeLabels !== false;
    const labels = new Map(Object.entries(operation.labels)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([label, value]) => [this.normalized(label, normalizeLabels), String(value)]));
    const edits: TableCellEdit[] = [];

    for (const row of rows) {
      const cells = Array.isArray(row.tableCells) ? row.tableCells as Record<string, unknown>[] : [];
      const labelCell = cells[labelColumnIndex];
      const valueCell = cells[valueColumnIndex];
      if (!labelCell || !valueCell) continue;
      const label = this.normalized(this.cellText(labelCell), normalizeLabels);
      const value = labels.get(label);
      if (value === undefined) continue;
      edits.push({ ...this.cellTextRange(valueCell), value });
    }

    return edits;
  }

  private deleteContentRequest(startIndex: number, endIndex: number): Record<string, unknown> {
    return {
      deleteContentRange: {
        range: { startIndex, endIndex },
      },
    };
  }

  private deleteStartIndex(request: Record<string, unknown>): number {
    const deleteContentRange = this.isRecord(request.deleteContentRange) ? request.deleteContentRange : {};
    const range = this.isRecord(deleteContentRange.range) ? deleteContentRange.range : {};
    return Number(range.startIndex || 0);
  }

  private replaceCellRequests(edit: TableCellEdit): Record<string, unknown>[] {
    const requests: Record<string, unknown>[] = [];
    if (edit.endIndex > edit.startIndex) {
      requests.push(this.deleteContentRequest(edit.startIndex, edit.endIndex));
    }
    requests.push({
      insertText: {
        location: { index: edit.startIndex },
        text: edit.value,
      },
    });
    return requests;
  }

  private requiredTextMatch(document: Record<string, unknown>, text: string): TextMatch {
    const match = this.findText(document, text);
    if (!match) {
      throw new Error(`Could not locate text boundary in copied Google Doc: ${text}`);
    }
    return match;
  }

  private findText(document: Record<string, unknown>, needle: string): TextMatch | null {
    const runs = this.textRuns(document).sort((a, b) => a.startIndex - b.startIndex);
    let text = "";
    const indexMap: number[] = [];
    for (const run of runs) {
      for (let offset = 0; offset < run.content.length; offset += 1) {
        text += run.content[offset];
        indexMap.push(run.startIndex + offset);
      }
    }

    const offset = text.indexOf(needle);
    if (offset < 0) return null;
    return {
      startIndex: indexMap[offset],
      endIndex: indexMap[offset + needle.length - 1] + 1,
    };
  }

  private readPlan(filePath: string): TransformPlan {
    const raw = fs.readFileSync(path.resolve(filePath), "utf8");
    const parsed = JSON.parse(raw) as TransformPlan;
    if (!this.isRecord(parsed)) {
      throw new Error("Transform plan JSON must be an object.");
    }
    return parsed;
  }

  private requiredOption(options: Record<string, string | boolean>, key: string): string {
    const value = this.cli.stringOption(options, key);
    if (!value) {
      throw new Error(`--${key} is required.`);
    }
    return value;
  }

  private numberOption(options: Record<string, string | boolean>, key: string, defaultValue: number): number {
    const raw = this.cli.stringOption(options, key, String(defaultValue));
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      throw new Error(`--${key} must be a number.`);
    }
    return parsed;
  }

  private async limitPdfPages(pdfBytes: Buffer, maxPages: number): Promise<Buffer> {
    const pdf = await PDFDocument.load(pdfBytes);
    while (pdf.getPageCount() > maxPages) {
      pdf.removePage(pdf.getPageCount() - 1);
    }
    return Buffer.from(await pdf.save());
  }

  private textRuns(node: unknown): TextRun[] {
    if (!this.isRecord(node)) return [];
    const runs: TextRun[] = [];

    if (this.isRecord(node.textRun) && typeof node.textRun.content === "string") {
      runs.push({
        startIndex: Number(node.startIndex),
        endIndex: Number(node.endIndex),
        content: node.textRun.content,
      });
    }

    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          runs.push(...this.textRuns(item));
        }
      } else if (this.isRecord(value)) {
        runs.push(...this.textRuns(value));
      }
    }

    return runs;
  }

  private tables(document: Record<string, unknown>): Record<string, unknown>[] {
    const body = this.isRecord(document.body) ? document.body : {};
    const content = Array.isArray(body.content) ? body.content as Record<string, unknown>[] : [];
    return content
      .map((element) => element.table)
      .filter((table): table is Record<string, unknown> => this.isRecord(table));
  }

  private bodyEndIndex(document: Record<string, unknown>): number {
    const body = this.isRecord(document.body) ? document.body : {};
    const content = Array.isArray(body.content) ? body.content as Record<string, unknown>[] : [];
    const last = content[content.length - 1];
    return Number(last?.endIndex || 1);
  }

  private cellText(cell: Record<string, unknown>): string {
    return this.textRuns(cell).map((run) => run.content).join("").trimEnd();
  }

  private cellTextRange(cell: Record<string, unknown>): Omit<TableCellEdit, "value"> {
    const runs = this.textRuns(cell);
    if (runs.length === 0) {
      const startIndex = Number(cell.startIndex) + 1;
      return { startIndex, endIndex: startIndex };
    }

    const startIndex = Math.min(...runs.map((run) => run.startIndex));
    const endIndex = Math.max(...runs.map((run) => run.endIndex)) - 1;
    return { startIndex, endIndex: Math.max(startIndex, endIndex) };
  }

  private normalized(value: string, normalizeLabels: boolean): string {
    return normalizeLabels ? value.replace(/\s+/g, " ").trim() : value.trim();
  }

  private assertDocument(document: Record<string, unknown>): void {
    if (!this.isRecord(document.body)) {
      throw new Error("Copied Google Doc did not return a body after update.");
    }
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}

void runCli(() => new GoogleDocTransformCommand().run(process.argv.slice(2)));
