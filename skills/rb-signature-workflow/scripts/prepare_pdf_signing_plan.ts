import fs from "node:fs";
import path from "node:path";

import { PDFDocument, StandardFonts } from "pdf-lib";

import { CliArguments, printJson, runCli } from "./signnow_common";

type SignNowFieldType = "text" | "signature" | "initials" | "date" | "checkbox";

interface PdfStamp {
  page: number;
  x: number;
  y: number;
  text: string;
  size?: number;
}

interface SignNowField {
  page_number: number;
  x: number;
  y: number;
  width: number;
  height: number;
  role: string;
  type: SignNowFieldType;
  label: string;
  name: string;
  required?: boolean;
}

interface SigningPlan {
  stamps?: PdfStamp[];
  fields?: SignNowField[];
}

class PdfSigningPlanPreparer {
  private readonly cli = new CliArguments();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length !== 2) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    const sourcePdf = path.resolve(positionals[0]);
    const plan = this.readPlan(positionals[1]);
    const outputPdf = path.resolve(
      this.cli.stringOption(options, "output", this.defaultOutputPath(sourcePdf)),
    );
    const fieldsJson = this.cli.stringOption(options, "fieldsJson", "");

    const pdf = await PDFDocument.load(fs.readFileSync(sourcePdf));
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    for (const stamp of plan.stamps || []) {
      const page = pdf.getPage(stamp.page);
      page.drawText(stamp.text, {
        x: stamp.x,
        y: page.getHeight() - stamp.y - (stamp.size || 10),
        size: stamp.size || 10,
        font,
      });
    }

    fs.mkdirSync(path.dirname(outputPdf), { recursive: true });
    fs.writeFileSync(outputPdf, await pdf.save());

    const fields = (plan.fields || []).map((field) => ({
      ...field,
      required: field.required !== false,
    }));

    if (fieldsJson) {
      const fieldsPath = path.resolve(fieldsJson);
      fs.mkdirSync(path.dirname(fieldsPath), { recursive: true });
      fs.writeFileSync(fieldsPath, `${JSON.stringify({ fields }, null, 2)}\n`);
    }

    printJson({
      output_pdf: outputPdf,
      fields_json: fieldsJson ? path.resolve(fieldsJson) : null,
      stamps_applied: plan.stamps?.length || 0,
      signnow_fields: fields.length,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: prepare_pdf_signing_plan.ts [options] <source-pdf> <signing-plan-json>

Applies explicit PDF text stamps and writes explicit SignNow field JSON.
This helper intentionally contains no Richmond Blackwood business, signer, role, coordinate, or template logic.

Options:
  --output PATH                    Output PDF path.
  --fields-json PATH               Optional SignNow fields JSON output path.

Page indexes are zero-based and coordinates use the same top-left system as the SignNow field helper.

Plan JSON shape:
{
  "stamps": [
    {"page": 0, "x": 120, "y": 440, "text": "Signer Name", "size": 10}
  ],
  "fields": [
    {
      "page_number": 0,
      "x": 121,
      "y": 479,
      "width": 116,
      "height": 28,
      "role": "Company Signatory",
      "type": "signature",
      "label": "Company Signature",
      "name": "rb_signature",
      "required": true
    }
  ]
}`;
  }

  private readPlan(file: string): SigningPlan {
    const parsed = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")) as SigningPlan;
    this.validatePlan(parsed);
    return parsed;
  }

  private validatePlan(plan: SigningPlan): void {
    if (!this.isRecord(plan)) {
      throw new Error("Signing plan must be a JSON object.");
    }
    const stamps = Array.isArray(plan.stamps) ? plan.stamps : [];
    const fields = Array.isArray(plan.fields) ? plan.fields : [];
    for (const [index, stamp] of stamps.entries()) {
      this.requireNumber(stamp.page, `stamps[${index}].page`);
      this.requireNumber(stamp.x, `stamps[${index}].x`);
      this.requireNumber(stamp.y, `stamps[${index}].y`);
      this.requireString(stamp.text, `stamps[${index}].text`);
      if (stamp.size !== undefined) this.requireNumber(stamp.size, `stamps[${index}].size`);
    }
    for (const [index, field] of fields.entries()) {
      this.requireNumber(field.page_number, `fields[${index}].page_number`);
      this.requireNumber(field.x, `fields[${index}].x`);
      this.requireNumber(field.y, `fields[${index}].y`);
      this.requireNumber(field.width, `fields[${index}].width`);
      this.requireNumber(field.height, `fields[${index}].height`);
      this.requireString(field.role, `fields[${index}].role`);
      this.requireString(field.type, `fields[${index}].type`);
      this.requireString(field.label, `fields[${index}].label`);
      this.requireString(field.name, `fields[${index}].name`);
    }
  }

  private defaultOutputPath(sourcePdf: string): string {
    const parsed = path.parse(sourcePdf);
    return path.join(parsed.dir, `${parsed.name} - signing-plan${parsed.ext}`);
  }

  private requireNumber(value: unknown, label: string): void {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error(`${label} must be a number.`);
    }
  }

  private requireString(value: unknown, label: string): void {
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`${label} must be a non-empty string.`);
    }
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}

void runCli(() => new PdfSigningPlanPreparer().run(process.argv.slice(2)));
