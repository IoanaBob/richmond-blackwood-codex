# Drive Locations

Status: provisional.
Imported: 2026-05-05.
Notion backup: `notion-backup.md`.

## Supplied Folder

Drive folder supplied by user:

- `https://drive.google.com/drive/folders/1R93FDUsJ6WH2U1Bi_G5TdywAW5xFaFbR`

Connector results:

- `list_folder` returned no files.
- `get_file_metadata` using raw ID `1R93FDUsJ6WH2U1Bi_G5TdywAW5xFaFbR` returned `File not found`.
- Drive search for `VUN` returned no results.
- Drive search for `VANDY UN` returned unrelated `Neotalent Europe.xlsx`.

## Individual Drive Locations

Nathan-specific personal tax and solvency Drive locations are stored in:

- `../../Individuals/Nathan Mawali A Vandy/drive-locations.md`

## Drive Backup/Export Folder

Actual downloaded/exported client files should be stored in Drive, not git.

Use find-or-create for the VUN Drive backup/export folder under the existing RB finance/accounting client structure. If the folder is created or found, record the URL in `backup-locations.md` and add file-level pointers in the relevant domain file.

The git repo should record whether each source file is uploaded, blocked, not applicable, or still pending.

## Review Needed

- Confirm whether the supplied Drive folder is shared with this connector account.
