---
name: rb-communications
description: Use when drafting, sending, or logging Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone follow-ups, Notion comments, or other channels.
---

# RB Communication Rules

Use this skill for any Richmond Blackwood outbound communication.

## Direct-Send Rule

- Draft communication text in chat with the user, not as an app/software draft.
- For client-facing copy, abstract Richmond Blackwood's internal software, helpers, connectors, automations, and back-office vendor names unless the user explicitly approves naming them, the client already supplied the named system, or the recipient is the named software/vendor and the name is necessary. Prefer wording such as "we applied", "we requested the correction", "we are waiting for feedback", or "we are processing this" over exposing the tool path.
- For Gmail work, keep the active human workspace actor, source mailbox, and sending identity separate. `RB_WORKSPACE_ACTOR` is a human name from `internal/people-roles.md`, with `RB_CODEX_ACTOR` as a legacy alias; shared mailboxes such as `accounting@richmondblackwood.com` are source mailboxes or senders, not actors.
- Always show the sender before the user approves the message.
- For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- For email, also show the exact source mailbox or mailboxes that were searched/read. Do not infer the source mailbox or sender from the active workspace actor.
- Prefer replying in the existing email thread when email context exists. Start a new email thread only when there is no relevant thread or the user explicitly asks for a new thread.
- After the user approves or explicitly says to send, send directly through the supported connector or MCP tool.
- After sending, store the sent communication in the canonical Communications database.
- For outgoing Communications, set `Snooze Until` to one week after the row `Created At` date unless a more specific follow-up date is approved. After any follow-up is sent, reset `Snooze Until` to one week after the follow-up send date by default.
- Do not create a Gmail, Slack, WhatsApp, Notion, or other software draft for the user to manually hit send unless the user explicitly asks for that exception.
- Germany growth pre-lead outreach, posting, replies, blockers, approvals, and follow-ups use `RB DE Growth Messages`, not canonical Communications.
- Germany growth partnership prospects use existing Business Partners for prospect state. Canonical Communications is used only after a growth thread becomes a lead/client/business communication or when a Growth Messages record is intentionally promoted and linked through `Promoted Communication`.
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
- Operator: active human workspace actor from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR` when operator-specific context matters, or `not required`.
- Source mailbox(es): exact mailbox(es) searched/read for email.
- From: exact sender identity, including email address for email.
- To: recipients or destination.
- Cc/Bcc: if email and applicable.
- Subject: always for email.
- Source/reply thread: always for email when thread context exists.
- Attachments/files: if any.
- Message body.

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
6. Store the communication in the canonical Communications database.
7. If the Communications database is unavailable or its schema is unclear, report the blocker and record it in `memory/open-questions.md`.

## Communications Database Logging

Canonical Notion database:

- Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`

Do not create new Richmond Blackwood records in the old `RB Communications` database at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`; it is migration source only after the 2026-05-19 common-tasks redesign.

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
- Related company or individual when the communication is client-relevant. Leave company empty for internal, system, spam, or non-client-relevant communications.
- Follow-up owner, action, deadline, and priority when needed.
- `Snooze Until` for outgoing messages and follow-ups that need reply monitoring.
- For letters attached to or forwarded inside an email, record that the communication contains a letter, save/link the letter document, and record the actual letter source/originator separately from the email forwarder.

Germany growth pre-lead messaging has its own Notion database:

- Growth Messages: `https://www.notion.so/ca339af617e5497483970cac110abc03`
- Data source: `collection://0eb425a4-f739-412c-acc6-3fee8cc825df`

Use Growth Messages for pre-lead growth drafts, sends/posts, replies, blockers, approvals, DMs, public comments, and follow-ups. Set `Audience Target`, `Growth Channel`, `Sender Identity`, `Message Kind`, `Status`, `Growth Event At`, and the applicable sent/posted/received/follow-up timestamp when available. If the thread later becomes a lead/client/business communication, create or update the canonical Communications handoff record and link it from Growth Messages through `Promoted Communication`. Send-ready growth work must use the required channel sender identity; current LinkedIn outreach and replies use Eran Richmond Blackwood, LinkedIn booked-call scheduling hands off to Ioana, and Reddit/Facebook/relocation partner email remain Ioana unless the user explicitly switches that channel. If the required identity cannot be verified, block the send in Growth Messages instead of sending from another account.

Client-specific communication facts must still follow the `clients/<client-reference>/` routing rule when repo storage is needed.

Use the company relation for company/client-operational communications. Use the individual relation for personal tax, personal KYC, personal identity, individual assets, individual expenses, individual bank accounts, or personal insolvency/solvency communications. A communication record should usually be linked to either a company or an individual, not both. If both seem relevant, choose the entity that owns the subject matter and keep a pointer in the other entity's repo file if needed.

## Follow-Up Tasks

When a sent or received communication requires Richmond Blackwood action, first use the owning task-capable RB Client Databases row when one exists. Create a central Tasks row only for additional action work that cannot be represented by the operational row itself.

- Link client tasks to the client project stored on the responsible Company record's project relation/attribute. Use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) only for truly RB-internal work. If the responsible Company has no readable linked client project, record a blocker instead of choosing an arbitrary project.
- Use the Tasks fields `Name`, `Status`, `Assigned To`, and `Project`; add due date, source communication, and relation fields when useful.
- Assign the task to the right person from the request, existing row owner, owner of the project linked on the responsible Company record, established process rule, or `internal/people-roles.md`. If ownership is unclear, ask before creating the task.
- Keep the canonical Communications record as the audit/source log.
