# Connector Boundaries

Status: provisional.
Imported: 2026-05-04.

## Notion

Use Notion for structured backup and operational discoverability.

- General SOP/process docs go to RB Internal Knowledge Base.
- Client-specific knowledge goes to relevant Client Databases.
- Fetch schemas before creating or updating database pages.
- Do not create client-specific pages if the company relation or target database is unclear.

## Google Drive

Use Drive for raw documents, evidence, and files not needed in every Codex session.

- General archive: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
- Client docs: existing RB finance/accounting tree.
- Do not infer missing folder destinations.

## Slack

Use Slack for operational context, decisions, handoffs, and source evidence. When importing client-specific Slack context, write the detail only under `clients/<client-reference>/`.

## Gmail

Use Gmail for accounting, invoice, payment, and client communications. When importing a Gmail thread:

- Summarize the operational detail in the client folder.
- Record the thread/source query in `source-register.md`.
- Back up to Notion once the destination is clear.

## Local Repos

Use local repos for current implementation truth. Business facts inferred from code remain provisional until reviewed.
