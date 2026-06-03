---
name: rb-whatsapp-inbound-monitor
description: Use when explicitly asked to manually monitor a saved Richmond Blackwood client WhatsApp chat for new inbound messages, create Communications records and task-capable Notion action rows, post Slack notifications after approval, and update the client's checkpoint.
---

# RB WhatsApp Inbound Monitor

Use this skill only when the user explicitly asks to check or monitor a specific saved client WhatsApp chat. This is a manual-run workflow, not a background service.

## Required Context

Before reading WhatsApp messages:

1. Read `processes/whatsapp-inbound-monitoring.md`.
2. Read `skills/rb-whatsapp-comms/SKILL.md` for WhatsApp MCP setup and safety.
3. Read the relevant client communication file, usually `clients/Companies/<client-reference>/communications.md`.
4. Read linked-company or linked-individual files when a company chat may contain personal correspondence.
5. Verify the checkpoint has a saved `Chat JID`, `Monitor enabled`, and `Last read through` or `Last read message ID`.

If the checkpoint is missing or disabled, stop and ask for review before reading messages.

## Run Boundary

- Read only messages newer than the saved checkpoint.
- Do not perform historical backfill unless the user explicitly asks.
- Do not send WhatsApp replies as part of monitoring.
- Do not store WhatsApp SQLite databases, QR/session state, downloaded media, transcripts, or raw chat exports in git.
- Advance the checkpoint only after all required writes and notifications succeed.

## Classification

For each new inbound item:

- Attachment message: create a Communications record and link it to the owning task-capable row or action task.
- Text-only actionable request: create or update a task-capable row and prepare a Slack notification for approval; create a Communications record when it is client-operational, reply-relevant, or needed as evidence.
- Casual or non-actionable text: skip after inspection.

If a text-only message asks Richmond Blackwood to do something, create or update a task-capable row even when there is no attachment.

## Company Chat Entity Matching

For company chats, inspect the inbound body and attachments before choosing the Notion linkage.

- Company-related item: link the company.
- Personally related item: link the specific `Individual` only when the individual is already linked to the monitored company.
- Unlinked, ambiguous, or unclear personal item: default to the company.
- Do not link unrelated individuals from a company chat.
- Link either the company or the individual for this workflow, not both, unless the user approves dual-linking later.

## Communications Handling

Use canonical Communications data source `collection://1b5e4130-1314-8183-afd8-000b6f4da982`.

Set:

- `Source Channel = WhatsApp`
- `Status = Needs Triage` until routing, originals, translations, and Notes are complete; then `Done`
- `Direction = Incoming`
- `Communication Time` to the WhatsApp received date
- `Source Message ID`, `Source Thread ID`, and `Source URL` when available
- `Title` to a concise sender/date/subject title
- `Company` or `Individual` according to the entity matching rules
- `Notes` to a concise summary with purpose, requests, deadlines, obligations, and follow-up implications
- `Contains Letter`, `Letter Source`, and `Letter Date` when the attachment is a letter
- `Document(s)` to all relevant original inbound attachments
- `Translated Doc(s)` to full English translations for non-English documents

Upload originals directly into the Notion `Document(s)` file property. If local Notion file upload is unavailable, stop, record a blocker, and leave the checkpoint unchanged.

## Attachment And Translation Rules

- Inspect the message body and every relevant attachment.
- Use attachments as primary evidence when they contain the invoice, receipt, letter, notice, or client document.
- Process all relevant attachments.
- Do not upload the same file twice for the same inbound item.
- For non-English documents, read the full document and create a faithful full English translation, not a summary.
- Prefer PDF for layout-sensitive translations; otherwise DOCX is acceptable.

## Task Handling

Use the owning task-capable data source first. Use Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e` and template `New Task` at `https://www.notion.so/342e4130131480ca9dc5e781a3e0f55a` only for extra action work or when the owning data source cannot represent the action.

For every communications item and actionable text request:

1. Use the client project stored on the responsible Company record's project relation/attribute. If the item is individual-owned, resolve the responsible linked company first; if no responsible company/project is clear, record a blocker instead of choosing an arbitrary project.
2. Prefer the owning task-capable data source when the item clearly belongs to an operational row. Use central Tasks only for extra action work or when the owning data source cannot represent the action.
3. Set `Status = To Do` or the nearest open status.
4. Assess `Priority`.
5. Add label `Client Inbound` and any relevant `Bookkeeping`, `Tax`, `Legal`, or `Sales` labels when labels exist on the destination.
6. Assign by competency using `internal/people-roles.md`:
   - Johnpaul Okolie for legal and banking.
   - Simoneta Vicente for bookkeeping and general queries.
   - Ioana Surdu-Bob for sales, software engineering, product, and structuring.
7. Make the task clearly actionable and reference the Communications record or existing uploaded file when files exist.

If no matched company or individual exists, create a task-capable row only when the correct related project can be identified confidently from existing Notion context.

## Slack Notification

After task-capable record handling succeeds, show the exact `#rb-client-updates` (`C0B1UTJJDLJ`) text and post only after approval.

Include:

- client or entity;
- summary;
- task-capable row or task URL;
- priority;
- assignee;
- Communications URL, when one exists.

If the task-capable row or action task is not created, do not post the Slack notification.

## Checkpoint Update

Update the client checkpoint only after all required work succeeds:

- `Last read through`: newest successfully inspected message timestamp in the run.
- `Last read message ID`: newest successfully inspected message ID in the run, when available.
- `Last run`: current run timestamp.
- `Status`: keep `provisional` unless the user approves the process.
- `Review`: update remaining blockers or confirmations.

If a run partially succeeds, record the blocker and enough retry detail to avoid duplicates, then leave the checkpoint unchanged.
