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

## Known Connector Limits

- Existing view tabs may not be reorderable or deletable through the connector.
- Page-property groups may require manual Notion UI work.
- Native task conversion is a UI handoff.
- Some file display names may need verification after URL-based attachment.
