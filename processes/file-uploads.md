# File Uploads And Evidence

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB Drive routing.
Imported: 2026-05-05.
Review: confirm exact RB client Drive destinations before writing files externally.

## Purpose

Make Richmond Blackwood evidence findable, structured, and linked to the correct repo, Notion, or Drive destination.

## Source Of Truth

- General file rules: `memory/file-uploads.md`.
- Storage rules: `memory/storage-rules.md`.
- Client folders: `clients/Companies/<client-reference>/`.
- Client Drive routing: existing `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>` tree.

## Process

1. Identify whether the file is general, internal, or client-specific.
2. For client files, fetch the Notion Companies `Reference` before creating or updating the repo folder.
3. Confirm the exact Drive or Notion destination.
4. Record blockers in `memory/open-questions.md` when destination, group/external classification, or company relation is unclear.
5. Preserve source filenames where possible.
6. Upload or move files only after the destination is clear.
7. Attach Drive links through Notion file/files properties where possible.
8. Verify the target record or folder after writing.
9. Update source registers, import logs, and client `drive-locations.md` / `notion-backup.md`.

## Spreadsheet Handling

For German personal-tax spreadsheet analyses, use the native Google Sheets template `RB German Personal Tax Analysis - Machine-Readable Template v1` rather than adding new ad hoc `codex - ...` tabs to legacy Office-mode workbooks. The active template is `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.

Treat that live native Google Sheet as the maintained template source of truth. Create client workbooks by copying the existing spreadsheet through the Google Drive/Sheets connector into the filing folder and renaming the copy. Do not regenerate the template from local TypeScript, XLSX builders, CSV exports, or ad hoc scripts.

Keep revenue, expense, raw bank, and investment exports in flat, filterable tabs with one header row, frozen row 1 only, and compact widths/heights. Use formulas to derive categorisations, journal rows, PNL, balance sheet, missing-info lists, and checks from source data, invoice/evidence registers, investment lots, and `Category Rules`; do not hardcode derived results into source tabs. The former separated-Codex-tab workflow is preserved only as historical audit trail for already-edited workbooks.

## Helper Commands

```bash
npm run drive:organize -- ensure-folder <root-folder-id> "<folder/path>"
npm run drive:upload -- <local-file> <folder-id> --title "<filename>"
npm run drive:organize -- get-spreadsheet <spreadsheet-id>
npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"
```

## Boundaries

Do not commit live credentials, private keys, certificate bundles, credential exports, or unsafe secret material. Do not imply a file is present when only its filename or source record is known.
