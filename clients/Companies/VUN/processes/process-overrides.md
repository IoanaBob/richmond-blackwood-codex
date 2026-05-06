# VUN Process Overrides

Status: provisional.
Imported: 2026-05-05.
Client reference: `VUN`.

## Source Access And Backup Package

Status: provisional.
Extends: `memory/storage-rules.md` and `processes/knowledge-backup-and-source-control.md`.
Type: blocker.
Source: VUN client folder review and connector results on 2026-05-05.
Review: Confirm access to the supplied VUN Drive folder and the correct group/external Drive classification.

### Client-Specific Access Note

The supplied VUN Drive folder did not list through the connected Drive account, and metadata lookup by raw folder ID returned `File not found`.

### Rule

Use Drive as the working backup/export destination. The VUN git folder stores pointers and blockers only.

Before exporting files, find or create the VUN Drive backup/export folder under the approved RB finance/accounting client path. Store the folder URL in `clients/Companies/VUN/backup-locations.md`.

### Private Detail Location

- `clients/Companies/VUN/backup-locations.md`
- `clients/Companies/VUN/drive-locations.md`
