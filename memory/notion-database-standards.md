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

## Data Ownership

- Put each business fact in the database or repo file that owns it.
- Use relations or pointers instead of copying private client detail into broad process docs.
- Use one-way relations by default. Create reciprocal relations only when the reverse database needs that relationship as an operational surface.
- Company-specific private detail belongs under `clients/Companies/<client-reference>/` in the repo and in the relevant Client Databases destination in Notion.
- Individual-specific private detail belongs under `clients/Individuals/<legal-name>/` and should relate to the correct Notion individual/person records.
