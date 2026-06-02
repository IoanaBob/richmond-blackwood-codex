---
name: rb-communications
description: Use when drafting, sending, or logging Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone follow-ups, Notion comments, or other channels.
---

# RB Communication Rules

Use this skill for any Richmond Blackwood outbound communication.

## Direct-Send Rule

- Draft communication text in chat with the user, not as an app/software draft.
- For Gmail work, keep the active human operator, source mailbox, and sending identity separate. `RB_CODEX_ACTOR` is a human name from `internal/people-roles.md`; shared mailboxes such as `accounting@richmondblackwood.com` are source mailboxes or senders, not actors.
- Always show the sender before the user approves the message.
- For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- For email, also show the exact source mailbox or mailboxes that were searched/read. Do not infer the source mailbox or sender from the active operator.
- Prefer replying in the existing email thread when email context exists. Start a new email thread only when there is no relevant thread or the user explicitly asks for a new thread.
- After the user approves or explicitly says to send, send directly through the supported connector or MCP tool.
- Always ask the user whether the sent outbound message should be recorded. Do not create a Notion Communications record unless the user explicitly says to record that exact message.
- Only record third-party outbound messages, and only when recording is necessary as a durable audit/source record. Never log internal messages to Notion. This includes one-off Slack/WhatsApp/DM/channel pings to a named teammate, quick questions, reminders, nudges, workflow closeouts, or coordination notes, even when the message mentions a client or matter. If such a message needs follow-up, use the owning task-capable row or ask the user where to track it.
- Do not create a Gmail, Slack, WhatsApp, Notion, or other software draft for the user to manually hit send unless the user explicitly asks for that exception.
- For Slack closeouts or other Slack messages that need user review, use the Codex approval prompt/notification when the runtime exposes it. The prompt must identify the exact destination and exact message already shown in chat, and must offer a clear approve/send choice and a do-not-send choice.
- The Slack message shown in chat for approval must be a rendered, readable Codex preview, not a fenced raw Markdown/code block. Use normal text, headings or labels where useful, Slack mention syntax, and named Markdown links so the operator can click each link in Codex before approving. Keep the raw Slack payload internal unless the operator explicitly asks to inspect it.
- When a Slack message assigns, routes, or updates work owned by a person, the final Slack payload must use resolved Slack mentions (`<@USERID>`) for those responsible people. Bare names are acceptable only when the operator explicitly approves a no-notification fallback for the exact person and message.
- Manual Slack-post fallbacks must preserve final formatting: Slack-native named links (`<url|label>`) for record references and resolved `<@USERID>` mentions for responsible people. Do not ask the operator to post a degraded bare-name or bare-URL version.
- Do not claim that a Codex approval notification was sent unless the prompt tool call succeeds and returns a prompt for the user.
- If the native Codex approval prompt is unavailable and the operator has approved a popup fallback, use a local macOS approval dialog as the fallback. First show the exact Slack message as a rendered, clickable Codex preview. Then request sandbox permission only to run the local dialog command. The dialog itself must ask whether to send the exact Slack message shown in chat to the named Slack destination and must include Send and Do Not Send choices.
- Treat the sandbox command-permission prompt only as permission to show the local dialog, never as approval to send Slack. Send Slack only if the local dialog command returns the explicit Send choice.
- If neither a native Codex approval prompt nor an approved local approval-dialog fallback is available, stop and report that blocker instead of asking the user to type approval, unless a more specific approved workflow such as `rb-common-tasks-follow-through` explicitly permits typed approval of the exact rendered Slack text.

## Required Preview

Before sending, show:

- Channel: Gmail, Slack, WhatsApp, Notion, or other.
- Operator: active human operator from `RB_CODEX_ACTOR` when operator-specific context matters, or `not required`.
- Source mailbox(es): exact mailbox(es) searched/read for email.
- From: exact sender identity, including email address for email.
- To: recipients or destination.
- Cc/Bcc: if email and applicable.
- Subject: always for email.
- Source/reply thread: always for email when thread context exists.
- Attachments/files: if any.
- Message body.
- Recording decision: ask whether the user wants this exact sent message recorded in Notion Communications.

For Slack messages, the message body preview should be readable directly in Codex, with clickable named links and visible Slack mention syntax for every responsible person. Do not put the approval preview inside a code block unless the operator specifically asks for raw Slack text.

For email, the default sender is:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

If a different email sender is needed, stop and confirm it before drafting.

## Send And Log Workflow

1. Gather source context from the relevant connector or user-provided notes.
2. Prepare the message in chat and show the required preview.
3. Ask for approval unless the user already supplied exact final text and explicitly asked to send it. For Slack closeouts that require review, prefer the native Codex approval prompt over typed chat approval; when that prompt is unavailable and the operator wants a popup, use the local approval-dialog fallback described above. If a specific workflow allows typed approval of exact rendered text, follow that workflow's narrower approval rule.
4. Send directly through the supported connector or MCP tool.
5. Verify the send result when the connector returns a message link, ID, timestamp, or status.
6. Ask the user whether to record the exact sent message in Notion Communications if that decision was not already explicitly included in the send approval.
7. If the user says to record it, create a Communications record only when the recipient is a third party and the record is necessary as a durable audit/source record. If the message is internal or not necessary to record, do not create a Communications row and say why.
8. If a user-approved required Communications database log is unavailable or its schema is unclear, report the blocker and record it in `memory/open-questions.md`.

## Communications Database Logging

Canonical Notion database:

- Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`

Do not create new Richmond Blackwood records in the old `RB Communications` database at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`; it is migration source only after the 2026-05-19 common-tasks redesign.

Do not create a Notion Communications row unless the user explicitly approves recording that exact sent message. Recording is only for third-party outbound messages where a durable audit/source record is necessary. Do not record internal messages, including individual-directed internal messages, workflow closeouts, quick questions, reminders, nudges, or coordination notes. The Slack/WhatsApp/message-system link is enough for those.

When the user approves recording a qualifying third-party outbound message, record enough detail to reconstruct the business action without dumping unnecessary private history:

- Communication time.
- Channel.
- Direction.
- From.
- To / participants.
- Subject or short title.
- Summary.
- Full content when safe and useful.
- Source link, message ID, or thread ID when available.
- Related company or individual when the communication is client-relevant. Leave company empty for internal, system, spam, or non-client-relevant communications.
- Follow-up owner, action, deadline, and priority when needed.
- For letters attached to or forwarded inside an email, record that the communication contains a letter, save/link the letter document, and record the actual letter source/originator separately from the email forwarder.

Client-specific communication facts must still follow the `clients/<client-reference>/` routing rule when repo storage is needed.

Use the company relation for company/client-operational communications. Use the individual relation for personal tax, personal KYC, personal identity, individual assets, individual expenses, individual bank accounts, or personal insolvency/solvency communications. A communication record should usually be linked to either a company or an individual, not both. If both seem relevant, choose the entity that owns the subject matter and keep a pointer in the other entity's repo file if needed.

## Follow-Up Tasks

When a sent or received communication requires Richmond Blackwood action, first use the owning task-capable RB Client Databases row when one exists. Create a central Tasks row only for additional action work that cannot be represented by the operational row itself.

- Link client tasks to the client project stored on the responsible Company record's project relation/attribute. Use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) only for truly RB-internal work. If the responsible Company has no readable linked client project, record a blocker instead of choosing an arbitrary project.
- Use the Tasks fields `Name`, `Status`, `Assigned To`, and `Project`; add due date, source communication, and relation fields when useful.
- Assign the task to the right person from the request, existing row owner, owner of the project linked on the responsible Company record, established process rule, or `internal/people-roles.md`. If ownership is unclear, ask before creating the task.
- Keep the canonical Communications record as the audit/source log.
