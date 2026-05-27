# Notion Operations

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB Notion routing.
Imported: 2026-05-05.
Review: confirm which RB Notion databases are backup-only versus operational source of truth.

## Purpose

Maintain Notion as Richmond Blackwood's structured backup and operating reference without creating replacement structures or misrouting client detail.

## Placement

- General SOPs and process docs: RB Internal Knowledge Base.
- Client-specific facts: relevant database/page under Client Databases.
- Client folder names: exact Notion Companies `Reference`.

Do not create client-specific Notion pages when the company relation or target database is unclear.

## Page And Database Rules

- Fetch schemas before creating or updating pages.
- Keep page/database titles plain.
- Use icon metadata where supported.
- `Notes` fields describe the record itself, not connector/debug history.
- When a database page has actual Notion comments and the work is a comment/update note, write into the page's comments section rather than a database text field such as `Comments`. If the connector cannot create the actual page comment, stop and report the blocker instead of falling back to the database field.
- Use file/files properties for Drive-backed documents where possible.
- Create useful filtered views for new databases.
- Use `WRAP CELLS true` for table views when view DSL is available.
- Use one-way relations by default unless the reverse relation is an operational surface.
- Avoid duplicating private client details into broad process pages.

## Task-Ready Databases

When a Notion database is intended to track ongoing RB work, include:

- `Stage`
- a Notion people owner/assignee field
- `Deadline`

The connector does not expose native `Turn into Tasks`. If native task visibility is needed, tell the user to complete conversion in the Notion UI.

## Tasks Database

Use the owning task-capable RB Client Databases row first for Richmond Blackwood action items. Use the existing central Notion Tasks database for extra action work or when the owning operational row cannot represent the action.

- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Create follow-up tasks with `Name`, `Status`, `Assigned To`, and `Project`.
- Link client tasks to the client project stored on the responsible Company record's project relation/attribute. Use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) only for truly RB-internal work.
- Use explicit user instructions, existing row owner, owner of the project linked on the responsible Company record, established process rules, or `internal/people-roles.md` to choose the assignee. If none is clear, ask before creating the task.
- Keep `Assigned To` for the person doing the work. Treat approvals as review: when Ioana or another team member needs to approve, check, or sign off, add that person to `Review By` on the owning operational or recurring task instead of assigning them the work.
- Do not create a standalone approval task when the approval belongs inside an existing operational task. For invoice/payment approvals, prefer the existing invoice-payables/payables task and add a page comment with the specific payment/invoice context.
- Communication records, client notes, and repo files can be source context, but they are not substitutes for updating the owning task-capable row when RB action is required.

## Known Connector Limits

- Existing view tabs may not be reorderable or deletable through the connector.
- Page-property groups may require manual Notion UI work.
- Native task conversion is a UI handoff.
- Some file display names may need verification after URL-based attachment.
