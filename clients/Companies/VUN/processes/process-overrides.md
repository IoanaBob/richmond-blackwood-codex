# VUN Process Overrides

Status: provisional.
Imported: 2026-05-05.
Client reference: `VUN`.

## Source Access And Backup Package

Status: provisional.
Extends: `memory/storage-rules.md` and `processes/knowledge-backup-and-source-control.md`.
Type: blocker.
Source: VUN client folder review and connector results on 2026-05-05.
Review: Confirm access to the supplied VUN Drive folder and whether a Drive package is ever required.

### Client-Specific Access Note

The supplied VUN Drive folder did not list through the connected Drive account, and metadata lookup by raw folder ID returned `File not found`.

### Rule

Use the git-held package as the working backup destination:

- `clients/Companies/VUN/Client export - VUN/`

Do not create a Drive-based backup or offboarding package unless specifically requested. If a Drive package is requested, first resolve Drive access and store the copied/created folder URL in `clients/Companies/VUN/backup-locations.md`.

### Private Detail Location

- `clients/Companies/VUN/backup-locations.md`
- `clients/Companies/VUN/drive-locations.md`
- `clients/Companies/VUN/Client export - VUN/backup-manifest.json`
