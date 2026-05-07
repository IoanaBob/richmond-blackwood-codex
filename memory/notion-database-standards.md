# Notion Database Standards

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB routing rules.
Imported: 2026-05-05.
Review: confirm which RB databases should be canonical operating databases versus backup-only records.

## Purpose

Record Richmond Blackwood standards for creating or updating Notion databases, records, tables, and views.

## Placement

Use existing RB Notion structures. Do not create replacement structures unless the user approves.

- General SOPs and process docs: RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc`.
- Client-specific records: relevant page or database under Client Databases at `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`.

When the target database, company relation, or client reference is unclear, record the blocker in `memory/open-questions.md` and stop before creating external Notion records.

## Page And Database Rules

- Titles stay plain. Emoji belongs in icon metadata when the connector supports it.
- Notes fields describe the record itself, not connector status, upload history, or debug commentary.
- Google Drive-backed documents should use Notion file/files properties where possible, not plain URL fields as the primary file reference.
- URL properties are appropriate for public web sources or external sharing links.
- New databases should include useful filtered views where the schema has meaningful dimensions.
- Table views should use wrapped cells where the connector exposes view configuration. With the current connector DSL, use `WRAP CELLS true`.
- Use page-property groups where the Notion UI or connector supports them. If tooling cannot apply groups, record the intended grouping and the blocker.

## Task-Like Databases

When an RB database is intended to track ongoing work, design it as task-ready:

- `Stage` for status.
- A Notion people owner/assignee field such as `Owner`, `Assignee`, `Client Manager`, or `Relationship Owner`.
- `Deadline` for due date when timing applies.

The current Notion connector does not expose native `Turn into Tasks` conversion. If a database should appear in Notion My Tasks or a master calendar, create the task-ready schema and tell the user to complete `Turn into Tasks` in the Notion UI.

## Follow-Up Tasks

Richmond Blackwood action items should use the existing Notion Tasks database, not free-text follow-up fields as the only work tracker.

- Tasks database: `https://www.notion.so/25de413013148145b24ee8728c582650`
- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Required fields for task creation: `Name`, `Status`, `Assigned To`, and `Project`.
- Link each task to the relevant company project. In this repository, default to `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required.
- Assign the task to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`. If the assignee is unclear, ask before creating the task.
- Keep communications, notes, or source records as audit/source context and link or reference them from the task where useful.

## Data Ownership

- Put each business fact in the database or repo file that owns it.
- Use relations or pointers instead of copying private client detail into broad process docs.
- Use one-way relations by default. Create reciprocal relations only when the reverse database needs that relationship as an operational surface.
- Company-specific private detail belongs under `clients/Companies/<client-reference>/` in the repo and in the relevant Client Databases destination in Notion.
- Individual-specific private detail belongs under `clients/Individuals/<legal-name>/` and should relate to the correct Notion individual/person records.
- Communications, bank accounts, assets, and expenses must belong to either a company or an individual, not both. If both entities are contextually relevant, link the record to the entity that owns the subject matter and add a pointer from the other entity's repo file when useful.
- For those either/or records, use company relations for company operating matters and individual relations for personal tax, personal KYC, personal identity, individual assets, individual expenses, individual bank accounts, or personal insolvency/solvency matters.
