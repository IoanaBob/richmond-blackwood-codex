# WhatsApp Inbound Monitoring

Status: provisional.
Source: user instruction in Codex chat, WhatsApp MCP setup, fetched Notion Communications and Tasks schemas, common-tasks redesign, and existing RB client routing rules.
Imported: 2026-05-05.
Review: run one supervised live pass before approving; confirm Notion file upload support for file properties and the assignment defaults with the team.

## Purpose

Use this process for manual WhatsApp monitoring of a specific saved client chat. The workflow checks only messages newer than the client checkpoint, processes inbound attachments or actionable text requests, creates or updates the required Notion task-capable record, posts a Slack notification after approval, and advances the checkpoint only after all required handling succeeds.

This is not an always-on monitor and does not run unless the user explicitly asks for a client or chat to be checked.

## Related Skill

- `skills/rb-whatsapp-inbound-monitor/SKILL.md`
- General WhatsApp reads and sends: `skills/rb-whatsapp-comms/SKILL.md`
- WhatsApp setup: `setup/mcp/whatsapp.md`

## Client Checkpoint Pattern

Client communication files may include a `WhatsApp Monitoring Checkpoints` table:

| Chat label | Chat JID | Monitor enabled | Last read through | Last read message ID | Last run | Status | Source | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Contact or chat label | `chat-id@s.whatsapp.net` | yes/no | Timestamp through which messages were inspected | Last inspected WhatsApp message ID, when available | Last manual run timestamp | provisional/approved/superseded/blocked | Source of chat ID and checkpoint | What still needs confirmation |

Initial checkpoints start when monitoring is enabled. Do not backfill historical WhatsApp messages unless the user explicitly asks for backfill. If a checkpoint has a timestamp but no message ID, use the timestamp as the lower bound and store the message ID after the first successful run.

## Manual Run Workflow

1. Confirm the user explicitly asked to monitor a named client or saved chat.
2. Read the relevant client communication file and checkpoint.
3. Resolve the chat JID from the saved checkpoint, not from memory.
4. Use the `whatsapp` MCP tools for the smallest useful message window after `Last read through` or `Last read message ID`.
5. Inspect each new inbound item and classify it:
   - Attachment message: create a Communications record and link it to the owning task-capable row or action task.
   - Text-only actionable request: create or update a task-capable row and Slack notification; create a Communications record when it is client-operational, reply-relevant, or needed as evidence.
   - Casual or non-actionable text: skip after inspection.
6. If more than one inbound item is present, process each item independently but avoid duplicate Notion uploads or duplicate tasks for the same request.
7. Advance the checkpoint only after the run has inspected the message window and all required records, tasks, translations, and Slack notifications for actionable items have succeeded.

Outbound WhatsApp messages are out of scope for this process. Do not reply to the chat unless the user separately gives an explicit send instruction.

## Entity Matching For Company Chats

For chats saved under a company client:

1. Read the inbound text and every relevant attachment to decide whether the item is company-related or personally related.
2. If company-related, link the company.
3. If personally related, link the specific `Individual` only when that individual is already linked to the monitored company in the client files or Notion.
4. If the individual is not linked to the monitored company, is ambiguous, or cannot be confidently identified, default to linking the company.
5. Do not link unrelated individuals from a company chat.
6. Link either the company or the individual for this workflow, not both, unless the user later approves dual-linking.

If there is no matched company or individual, leave the linkage empty for the Communications record. Create or update an action row only when the correct related project can still be identified confidently from existing Notion context.

## Communications Records

Use canonical Communications:

- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`
- Database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`

Set:

- `Title`: concise title from the sender, date, and subject/request.
- `Source Channel`: `WhatsApp`
- `Direction`: `Incoming`
- `Communication Time`: WhatsApp received date.
- `Source Message ID`, `Source Thread ID`, and `Source URL` when available.
- `Company`: matched company when company-linked.
- `Individual`: matched linked individual when personally linked.
- `Contains Letter`, `Letter Source`, and `Letter Date` when the attachment is a letter.
- `Document(s)`: all relevant original inbound attachment files.
- `Translated Doc(s)`: full English translated files for non-English documents.
- `Notes`: concise but useful summary covering purpose, main request or information, deadlines or obligations, and follow-up implications.

Upload files directly into the Notion `Document(s)` file property. If the current Notion connector or helper path cannot upload local files to a Notion file property, stop and record a blocker. Do not fall back to Drive for this workflow unless the user changes the process.

## Attachments And Translation

Always inspect both the WhatsApp message body and every relevant attachment. Use attachments as primary evidence when they contain the invoice, receipt, letter, notice, or client document.

For multiple attachments:

- process all relevant attachments;
- attach all relevant originals to the destination Communications record;
- do not upload the same file twice when it was already uploaded for the same inbound item;
- create a translated output for each non-English document that needs translation.

For non-English documents:

- read the full document;
- translate the full content into English;
- preserve the meaning faithfully and completely;
- do not summarize instead of translating;
- prefer PDF when layout preservation matters, otherwise a clean DOCX is acceptable;
- upload translated files to `Translated Doc(s)`.

## Task-Capable Record Handling

Create or update an owning task-capable row for every Communications item and every text-only actionable request. Use the operational database first when the content clearly belongs there, for example Invoicing, Expenses, Contracts, Filings, Employment, Payroll, Assets, Bank Accounts, Filing Registrations, Personal Tax Filings, or Communications. Use central Tasks only for extra action work or when the owning data source cannot represent the action.

When central Tasks is needed, use:

- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Template: `New Task`
- Template URL: `https://www.notion.so/342e4130131480ca9dc5e781a3e0f55a`

Set:

- `Project`: the client project stored on the responsible Company record's project relation/attribute. If the item is individual-owned, resolve the responsible linked company first; if no responsible company/project is clear, record a blocker instead of choosing an arbitrary project.
- `Status`: `To Do`
- `Priority`: assessed from content and deadline (`Low`, `Medium`, `High`, or `Critical`).
- `Labels`: `Client Inbound` plus any relevant predefined labels from `Bookkeeping`, `Tax`, `Legal`, or `Sales`.
- `Assigned To`: most relevant team member by competency.

Default assignment rules are recorded in `internal/people-roles.md`:

- Johnpaul Okolie: legal and banking.
- Simoneta Vicente: bookkeeping and general client queries.
- Ioana Surdu-Bob: sales, software engineering, product, and structuring.

Make the row clearly actionable based on the inbound content and summary. If there are files, reference the already uploaded Communications record or attachment rather than saving duplicate copies elsewhere.

## Slack Notification

After the task-capable record or action task is created and the exact Slack text is approved, post to `#rb-client-updates`:

- Channel ID: `C0B1UTJJDLJ`

Include:

- client or linked entity;
- short summary;
- task-capable row or task URL;
- priority;
- assignee;
- Communications URL, when one exists.

If task-capable record handling fails, do not post the Slack notification and do not advance the checkpoint.

## Failure And Checkpoint Handling

If any required write fails:

1. Leave the checkpoint unchanged.
2. Record the blocker in the client communication file or `memory/open-questions.md`, depending on whether it is client-specific or general.
3. Include enough detail to safely retry without duplicating completed writes.
4. Do not imply that a Communications record, task-capable row, translated file, Slack notification, or checkpoint update exists until it has been verified.

When all processing succeeds, update the checkpoint:

- `Last read through`: newest successfully inspected message timestamp in the run.
- `Last read message ID`: newest successfully inspected message ID in the run, when available.
- `Last run`: current run timestamp.
- `Status`: keep `provisional` until the process has been reviewed.
- `Review`: note remaining schema, routing, or relationship confirmations.

## Dry-Run Scenarios

Validate future live execution against these scenarios before approval:

- Company-related attachment: link company, create Communications record, create or update a task-capable row, notify Slack, advance checkpoint.
- Personally related attachment for linked individual: link only the linked individual, create Communications record, create or update a task-capable row in the related project, notify Slack, advance checkpoint.
- Personally related attachment for unlinked or ambiguous individual: default to company, create Communications record, create or update a task-capable row, notify Slack, advance checkpoint.
- Text-only actionable request: create or update a task-capable row and Slack notification, then advance checkpoint.
- Multiple attachments: inspect every relevant attachment, upload originals once, translate each non-English document, create one coherent task unless distinct requests require separate tasks.
- Non-English attachment: read fully, translate fully, upload translated file, summarize in Notes.

Before a live run, verify the live Notion fields still match this process, especially Communications file properties, task-capable status fields, central Task labels, task template, people assignment IDs, and project relations.
