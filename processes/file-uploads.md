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
- Client folders: `clients/<client-reference>/`.
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

## Helper Commands

```bash
npm run drive:organize -- ensure-folder <root-folder-id> "<folder/path>"
npm run drive:upload -- <local-file> <folder-id> --title "<filename>"
npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"
```

## Boundaries

Do not commit live credentials, private keys, certificate bundles, credential exports, or unsafe secret material. Do not imply a file is present when only its filename or source record is known.
