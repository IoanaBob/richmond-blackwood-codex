# Knowledge Backup And Source Control

Status: provisional.
Sources: user instruction, Notion fetches, repo setup.
Imported: 2026-05-04.

## Purpose

Keep Codex repo memory, Notion, and Drive aligned without spreading private client details into the wrong place.

## General SOP Backup

1. Write the working SOP in `processes/`.
2. Record source and provisional status.
3. Create or update a page in the RB Internal Knowledge Base.
4. Add the Notion page URL to the repo file.
5. Record the backup in `sources/import-log.md`.

## Client Knowledge Backup

1. Fetch the official Notion Companies record.
2. Read the `Reference` property.
3. Write unsanitised detail under `clients/<client-reference>/`, using the exact `Reference` value.
4. Link source evidence in the client source register.
5. Choose the most specific client database: Client Notes & Updates, Correspondence, Companies, Invoicing, Filings, Payroll, Employment, Tax Payments, Bank Accounts, Personal Tax Filings, or another relevant database.
6. Create or update the backup.
7. Add the Notion URL to `clients/<client-reference>/notion-backup.md`.

If any step is unclear, stop and record the blocker.

## Drive Backup

1. Decide whether the document needs always-on Codex access.
2. If not, place it in Drive and keep a pointer in the repo.
3. For client-specific docs, use the current RB finance/accounting folder tree.
4. Do not guess group/external classification.

## Review Needed

- Confirm whether Notion should be treated as backup only or as the canonical source for some client records.
- Confirm whether future individual-specific folders should use an individual reference, and how they should nest with company references.
