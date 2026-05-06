# File Upload Operations

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB Drive routing.
Imported: 2026-05-05.
Review: confirm exact RB Drive client group/external classifications before writing or moving client files.

## Purpose

Track durable operating rules for Richmond Blackwood files that need to be stored in Drive, attached to Notion, or referenced from repo memory.

## Standard Process

1. Identify the business context and target record.
2. For client-specific files, fetch the Notion Companies record and use its exact `Reference` for the repo folder.
3. Identify the exact Notion record and file/files property before updating Notion.
4. Confirm the source file exists or the cloud URL is accessible.
5. Record filename, type, size, and SHA-256 in memory when useful for audit.
6. Use RB Drive routing:
   - General archive: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
   - Client documents: existing `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>` tree.
7. If the file is already in Drive/Notion, attach the accessible URL and verify the record.
8. For local binary uploads when connector support is insufficient:
   - `npm run drive:organize -- ensure-folder <root-folder-id> "<folder/path>"`
   - `npm run drive:upload -- <local-file> <folder-id> --title "<filename>"`
9. For edited Google Docs that need a PDF in Drive:
   - `npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"`
10. Fetch the target Notion record and verify the intended file property is populated.

## Boundaries

- Do not infer missing Drive destinations.
- Do not upload into arbitrary personal Drive folders.
- Do not commit live credentials, private keys, certificate bundles, credential exports, or unsafe secret material.
- Client backup/export files belong in Drive. Git keeps pointers, source registers, and blockers only. External delivery is a separate offboarding/handover task and must only happen when the user explicitly asks.
