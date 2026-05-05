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

## Repo Backup Package

Actual downloaded/exported client files should be stored in:

- `clients/Companies/VUN/Client export - VUN/`

This git package is the default backup destination. Do not mirror the package to Drive as part of routine backup.

The backup package manifest records when a source file is downloaded, blocked, not applicable, or still pending.

Local package locations are tracked in `backup-locations.md`.

## Review Needed

- Confirm whether the supplied Drive folder is shared with this connector account.
