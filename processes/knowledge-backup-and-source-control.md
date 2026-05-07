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
3. Write unsanitised detail under `clients/Companies/<client-reference>/`, using the exact `Reference` value.
4. Link source evidence in the client source register.
5. Choose the most specific client database: Client Notes & Updates, Correspondence, Companies, Invoicing, Filings, Payroll, Employment, Tax Payments, Bank Accounts, Personal Tax Filings, or another relevant database.
6. Create or update the backup.
7. Add the Notion URL to `clients/Companies/<client-reference>/notion-backup.md`.
8. For communications, bank accounts, assets, and expenses, link the Notion record to either the company or the individual, not both. Use the company relation for company-owned or company-operational records and the individual relation for personal or individual-owned records. If both entities are useful context, keep the record attached to the owning entity and add a pointer from the other entity's repo file.
9. If the backfill or closeout identifies a follow-up that requires Richmond Blackwood action, create it in the Notion Tasks database and link it to the relevant company project. For this repository, use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required. Assign it to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`.
10. When a client backfill or history refresh changes repo files, send a Slack closeout to `#rb-client-updates` with:
   - only what was added in Notion;
   - only what was modified in Notion;
   - named hyperlinks for Notion pages/records that were actually added or modified;
   - row-level sub-items for any Notion database rows actually added or modified;
   - human-readable page/database names; avoid repo paths unless the audience needs implementation detail;
   - any blockers or follow-up review points.
   Do not list Notion source records that were only read as if they were added or modified.
   When reviewing or creating Notion tasks during the backfill, add task comments that explain the review decision, split, blocker, or next action so progress is visible inside Notion.
   When creating connected follow-up tasks, set the follow-up task's `Dependent on` relation to the initial task whenever the follow-up cannot start until the initial task is complete. Use the initial task's `Is blocking` relation only when that direction is clearer in the existing workflow.
   Before including a blocker in Slack, try to resolve it twice using distinct methods or queries. If it remains unresolved, phrase it in plain business language rather than exposing connector/helper errors.
11. Record the closeout communication or logging blocker according to `processes/communications.md`.

If any step is unclear, stop and record the blocker.

## Drive Backup

1. Decide whether the document needs always-on Codex access.
2. If not, place it in Drive and keep a pointer in the repo.
3. For client-specific docs, use the current RB finance/accounting folder tree.
4. Do not guess group/external classification.

## Review Needed

- Confirm whether Notion should be treated as backup only or as the canonical source for some client records.
- Confirm whether future individual-specific folders should use an individual reference, and how they should nest with company references.
