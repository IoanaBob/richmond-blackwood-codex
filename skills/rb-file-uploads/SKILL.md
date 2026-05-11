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
   - Upload with `npm run drive:upload -- <local-file> <folder-id> --title "<filename>"` only when connector upload is insufficient.
   - Attach the returned `webViewLink` to Notion and verify by fetching the record.
7. For native Google Docs that have already been edited through the connector, export/upload PDF with `npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"`.
8. Update the relevant repo memory, source register, import log, tasks, and handoff.

## Boundaries

Do not commit live credentials, private keys, certificate bundles, credential exports, or unsafe secret material. Store large raw documents in Drive when they do not need always-on Codex access.
