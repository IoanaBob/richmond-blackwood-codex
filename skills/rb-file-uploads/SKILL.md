---
name: rb-file-uploads
description: Use when receiving, uploading, attaching, or cataloging Richmond Blackwood local files, Drive files, or Notion file attachments.
---

# RB File Uploads

Use this skill whenever a local or cloud file should be preserved for Richmond Blackwood operations.

## Workflow

1. Identify the target destination before moving files.
   - For client-specific files, use `clients/Companies/<client-reference>/` where `<client-reference>` is the exact Notion Companies `Reference`.
   - For Notion updates, fetch the target schema first and use a `FILES` property for Drive-backed documents where available.
2. Confirm the source file exists or the cloud URL is accessible.
3. Record filename, type, size, and SHA-256 in memory when the file is signed, confidential, or operationally important.
4. Use RB Drive routing.
   - General archive: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
   - Client documents: existing `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>` tree.
   - Do not infer `<group or external>` or create replacement Drive structures.
5. If the file is already in Drive or Notion, attach that URL and verify the record.
6. For generic local files when the connector lacks upload support:
   - Resolve or create the final folder through the Google Drive connector.
   - Upload with `npm run drive:upload -- <local-file> <folder-id> --title "<filename>"` only when connector upload is insufficient. The helper uses shared global Codex persona auth and defaults to no-login mode.
   - Attach the returned `webViewLink` to Notion and verify by fetching the record.
7. For Notion-native image/file handling:
   - Default to MCP for inspecting the Notion page/record and confirming filenames or schema.
   - Download existing Notion-hosted files through the REST API by re-fetching the page or block, using the refreshed temporary `file.url`, and saving outside git.
   - Do not treat MCP `file://...attachment...` references as downloadable URLs.
   - Upload local images/files to Notion only through the File Upload API or an approved connector path with a Notion API credential outside git.
   - Prefer Drive-backed evidence for client documents unless the operational target explicitly requires a Notion file property, image block, icon, or cover.
8. For native Google Docs that have already been edited through the connector, export/upload PDF with `npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"`.
9. Update the relevant repo memory, source register, import log, tasks, and handoff.

## Client Export Folder Map (WEW Current)

For WEW offboarding/handover exports, keep this exact root structure:

- `1.Bookkeeping Archive`
- `2.Filings`
- `3.Co-Sec`
- `4.Correspondence`
- `5.Contracts`
- `6.Payroll`
- `7.Personal Tax Filings`
- `8.Registrations`

Required subfolder rules:

- `4.Correspondence`: always split into `Incoming` and `Outgoing`; route current-year correspondence by direction.
- `6.Payroll`: create one subfolder per person and verify payroll entries per linked employment before marking payroll complete.

## Boundaries

Do not commit live credentials, private keys, certificate bundles, credential exports, OAuth vault files, token responses, or unsafe secret material. Store large raw documents in Drive when they do not need always-on Codex access.

Google helper auth options:

- `--auth-source auto|vault|adc|account|gcloud|direct-adc`
- `--auth-login auto|always|never` (defaults to `never`)
- `--account-email <google-account>`
- `--persona-slug <slug>`
- `--gcloud-config-dir ~/.codex/google-personas/<slug>/gcloud`
