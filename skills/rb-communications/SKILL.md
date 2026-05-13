---
name: rb-communications
description: Use when drafting, sending, or logging Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone follow-ups, Notion comments, or other channels.
---

# RB Communications

Use this skill for any Richmond Blackwood outbound communication.

## Direct-Send Rule

- Draft communication text in chat with the user, not as an app/software draft.
- Always show the sender before the user approves the message.
- For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- Prefer replying in the existing email thread when email context exists. Start a new email thread only when there is no relevant thread or the user explicitly asks for a new thread.
- After the user approves or explicitly says to send, send directly through the supported connector or MCP tool.
- After sending, store the sent communication in the RB Communications database.
- Do not create a Gmail, Slack, WhatsApp, Notion, or other software draft for the user to manually hit send unless the user explicitly asks for that exception.
- For Slack closeouts or other Slack messages that need user review, use the Codex approval prompt/notification when the runtime exposes it. The prompt must identify the exact destination and exact message already shown in chat, and must offer a clear approve/send choice and a do-not-send choice.
- The Slack message shown in chat for approval must be a rendered, readable Codex preview, not a fenced raw Markdown/code block. Use normal text, headings or labels where useful, Slack mention syntax, and named Markdown links so the operator can click each link in Codex before approving. Keep the raw Slack payload internal unless the operator explicitly asks to inspect it.
- Do not claim that a Codex approval notification was sent unless the prompt tool call succeeds and returns a prompt for the user.
- If the native Codex approval prompt is unavailable and the operator has approved a popup fallback, use a local macOS approval dialog as the fallback. First show the exact Slack message as a rendered, clickable Codex preview. Then request sandbox permission only to run the local dialog command. The dialog itself must ask whether to send the exact Slack message shown in chat to the named Slack destination and must include Send and Do Not Send choices.
- Treat the sandbox command-permission prompt only as permission to show the local dialog, never as approval to send Slack. Send Slack only if the local dialog command returns the explicit Send choice.
- If neither a native Codex approval prompt nor an approved local approval-dialog fallback is available, stop and report that blocker instead of asking the user to type approval.

## Required Preview

Before sending, show:

- Channel: Gmail, Slack, WhatsApp, Notion, or other.
- From: exact sender identity, including email address for email.
- To: recipients or destination.
- Cc/Bcc: if email and applicable.
- Subject: always for email.
- Source/reply thread: always for email when thread context exists.
- Attachments/files: if any.
- Message body.

For Slack messages, the message body preview should be readable directly in Codex, with clickable named links. Do not put the approval preview inside a code block unless the operator specifically asks for raw Slack text.

For email, the default sender is:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

If a different email sender is needed, stop and confirm it before drafting.

## Send And Log Workflow

1. Gather source context from the relevant connector or user-provided notes.
2. Prepare the message in chat and show the required preview.
3. Ask for approval unless the user already supplied exact final text and explicitly asked to send it. For Slack closeouts that require review, prefer the native Codex approval prompt over typed chat approval; when that prompt is unavailable and the operator wants a popup, use the local approval-dialog fallback described above.
4. Send directly through the supported connector or MCP tool.
5. Verify the send result when the connector returns a message link, ID, timestamp, or status.
6. Store the communication in the RB Communications database.
7. If the RB Communications database is unavailable or its schema is unclear, report the blocker and record it in `memory/open-questions.md`.

## Communications Database Logging

Canonical Notion database:

- RB Communications: `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`
- Data source: `collection://3b849ad0-96b7-4972-a1ac-1a0203300e7b`

Do not use the Everguard/research Communications table for Richmond Blackwood records.

Record enough detail to reconstruct the business action without dumping unnecessary private history:

- Communication time.
- Channel.
- Direction.
- From.
- To / participants.
- Subject or short title.
- Summary.
- Full content when safe and useful.
- Source link, message ID, or thread ID when available.
- Related company or individual when known. A communication record should be linked to either a company or an individual, not both.
- Follow-up owner, action, deadline, and priority when needed.

Client-specific communication facts must still follow the `clients/<client-reference>/` routing rule when repo storage is needed.

Use the company relation for company/client-operational communications. Use the individual relation for personal tax, personal KYC, personal identity, individual assets, individual expenses, individual bank accounts, or personal insolvency/solvency communications. If both seem relevant, choose the entity that owns the subject matter and keep a pointer in the other entity's repo file if needed.

## Follow-Up Tasks

When a sent or received communication requires Richmond Blackwood action, create a task in the Notion Tasks database instead of leaving the work only in `Follow-Up Action`.

- Link the task to the relevant company project. In this repository, use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required.
- Use the Tasks fields `Name`, `Status`, `Assigned To`, and `Project`; add due date, source communication, and relation fields when useful.
- Assign the task to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`. If ownership is unclear, ask before creating the task.
- Keep the RB Communications record as the audit/source log.
