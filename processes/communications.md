# Communications

Status: provisional.
Source: neutral WhatsApp MCP and communication-routing decisions ported from local `everguard-research-codex`, adapted to RB storage rules.
Imported: 2026-05-05.
Review: confirm which WhatsApp account should be connected and which communication types should be mirrored to Notion.

## Purpose

Use this process for material Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone, calendar, Notion, SignNow, Drive, or other operating systems.

## General Rules

- Prefer app connectors and MCP tools for app-native reads and writes.
- Do not invent transcripts or communication context.
- Keep reads narrow and purpose-bound.
- For Gmail work, keep active human workspace actor, source mailbox, and sending identity separate. `RB_WORKSPACE_ACTOR` is a human name from `internal/people-roles.md`, with `RB_CODEX_ACTOR` as a legacy alias; `accounting@richmondblackwood.com` is a shared service mailbox and must not be treated as an actor.
- Do not send messages automatically unless the user explicitly asks to send and the tool approval confirms recipient, content, and any attachment.
- Draft outbound communications in chat with the user. Do not create app/software drafts for the user to manually hit send unless the user explicitly asks for that exception.
- Always show the sending identity before approval. For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- For email, also show the exact source mailbox or mailboxes searched/read. Do not infer the source mailbox or sender from the active operator.
- Prefer replying in the existing email thread when email context exists. Start a new thread only when no relevant thread exists or the user explicitly asks for a new thread.
- After user approval, send directly through the supported connector or MCP tool and then store the sent communication in the canonical Communications database.
- For outgoing Communications, set `Snooze Until` to one week after the row `Created At` date unless a more specific follow-up date is approved. After any follow-up is sent, reset `Snooze Until` to one week after the follow-up send date by default.
- For operator follow-up sweeps, select canonical Communications assigned to the active operator where `Status` is not `Done`/`Archived` and `Snooze Until` is blank or on/before the run date. Future-snoozed rows are deferred, not selected into the active batch.
- Do not create replacement Notion or Drive structures for communication logs unless the user approves.
- For Slack messages that need user review, put the proposed message text in the Codex chat first. When the Codex runtime exposes an approval prompt/notification, use it for the send approval instead of typed chat approval. The prompt must identify the destination and exact message, and must offer a clear approve/send choice and a do-not-send choice.
- The proposed Slack message in Codex chat must be a rendered, readable preview rather than a fenced raw Markdown/code block. Use named links that render as clickable links in Codex, keep Slack mentions visible, and keep the raw Slack payload internal unless the operator asks to inspect it.
- For operational closeouts, write the Slack body like a human team update rather than an automation trace. Omit background Gmail-label/source-marker/checkpoint/Codex mechanics. Hyperlink incoming items, pending replies, and blockers. When assigning action checks to people, resolve Slack user IDs and use `<@USERID>`; bare responsible-person names are allowed only after the operator explicitly approves a no-notification fallback for the exact person and message.
- Manual Slack-post fallbacks must still use Slack-native named links (`<url|label>`) and resolved responsible-person mentions (`<@USERID>`). Do not ask the operator to post a degraded bare-URL or bare-name version.
- Do not report that a Codex approval notification was sent unless the prompt tool call succeeds and returns a user-visible prompt.
- If the native Codex approval prompt is unavailable and the operator has approved a popup fallback, use a local macOS approval dialog as the fallback. First show the exact Slack message as a rendered, clickable Codex preview. Then request sandbox permission only to run the local dialog command. The dialog itself must ask whether to send the exact Slack message shown in chat to the named Slack destination and must include Send and Do Not Send choices.
- Treat the sandbox command-permission prompt only as permission to show the local dialog, never as approval to send Slack. Send Slack only if the local dialog command returns the explicit Send choice.
- If neither a native Codex approval prompt nor an approved local approval-dialog fallback is available, stop and report that blocker instead of asking the user to type approval, unless a more specific workflow such as `rb-common-tasks-follow-through` explicitly permits typed approval of the exact rendered Slack text.
- After approval, send the approved text directly in Slack; do not create a Slack draft as the default review step unless the user explicitly asks for a Slack draft.

## Direct Send Preview

Before sending any communication, show:

- Channel.
- Operator when operator-specific context matters.
- Source mailbox(es) for email.
- From, including email address for email.
- To or destination.
- Cc/Bcc when relevant.
- Subject, always for email.
- Source/reply thread, always for email when thread context exists.
- Attachments or files.
- Message body.

For Slack previews, do not use a code block by default. Use normal Codex-rendered text with clickable named links and visible `<@USERID>` responsible-person mentions so the operator can review destinations, records, and tags without copying URLs.

For Richmond Blackwood accounting/client email, default to:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

If another sender is required, stop and confirm it before drafting.

## Communications Database Logging

Canonical Notion database:

- Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`

Do not create new Richmond Blackwood records in the old `RB Communications` database at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`; it is migration source only after the 2026-05-19 common-tasks redesign.

After sending, create or update the canonical Communications database record with:

- Communication time.
- Channel.
- Direction.
- From.
- To / participants.
- Subject or short title.
- Summary.
- Full content when safe and useful.
- Source link, message ID, thread ID, or connector status when available.
- Related company or individual when the communication is client-relevant. Leave company empty for internal, system, spam, or non-client-relevant communications.
- Follow-up owner, action, deadline, and priority when needed.
- `Snooze Until` for outgoing messages and follow-ups that need reply monitoring.
- Letter flag, letter source/originator, letter date, and document links when an email or message contains a letter.

Use the company relation for company/client-operational communications. Use the individual relation for personal tax, personal KYC, personal identity, individual assets, individual expenses, individual bank accounts, or personal insolvency/solvency communications. A communication record should usually be linked to either a company or an individual, not both. If both seem relevant, choose the entity that owns the subject matter and keep a pointer in the other entity's repo file if needed.

If the Communications database is unavailable or its schema is unclear, report the blocker and record it in `memory/open-questions.md`.

## WhatsApp MCP Rules

- Setup guide: `setup/mcp/whatsapp.md`.
- Skill: `skills/rb-whatsapp-comms/SKILL.md`.
- Submodule: `third_party/whatsapp-mcp`.
- Background bridge helper: `setup/mcp/start-whatsapp-bridge.sh`.

Use the `whatsapp` MCP tools for normal WhatsApp reads, contact searches, sends, media downloads, and voice-note handling. Do not use the bridge REST API as the normal execution path.

If port `8080` is not listening, start the bridge outside the sandbox:

```bash
setup/mcp/start-whatsapp-bridge.sh start
```

If the bridge prints a QR code in terminal output or `.codex-local/whatsapp-bridge.log`, relay the QR block directly to the user in chat.

## Private Data Routing

Client-specific communication facts belong under `clients/Companies/<client-reference>/`, using the exact Notion Companies `Reference`.

Non-client private company communication facts belong under `internal/`.

General communication operating rules belong under `processes/` and `memory/`, and may be backed up to the RB Internal Knowledge Base when reviewed.

If the logging destination is unclear, record the blocker in `memory/open-questions.md` and ask for review.

## WhatsApp Chat ID Pointers

Use WhatsApp chat IDs as route/source pointers only. A saved JID helps future approved reads or sends resolve the right client route quickly, but it is not approval to import chat history, monitor the chat, download media, or send future messages without explicit user instruction.

When a user asks to save a WhatsApp chat ID, or when a client export/backfill uses WhatsApp context:

1. Resolve the contact or chat through the `whatsapp` MCP tools.
2. If search returns multiple plausible contacts or groups, ask the user to choose the intended route before filing.
3. Store the selected JID in the owning entity's `communications.md` under a WhatsApp chat ID table.
4. Use `clients/Companies/<client-reference>/communications.md` for company/client-operational routes.
5. Use `clients/Individuals/<legal-name>/communications.md` for personal-tax, personal KYC, personal bank, personal asset, or other individual-owned routes.
6. Include `Status`, `Source`, `Imported`, and `Review` fields for the pointer.
7. Mark the pointer `provisional` unless the user explicitly approves the contact relationship and preferred-contact status.
8. Add a matching source row in the same entity's `source-register.md`.

The general process document should describe the filing pattern only. Keep client names, phone numbers, JIDs, and role assumptions inside the relevant client folder.

## WhatsApp Monitoring Checkpoints

Manual inbound monitoring is covered by `processes/whatsapp-inbound-monitoring.md` and `skills/rb-whatsapp-inbound-monitor/SKILL.md`.

Use saved checkpoints only for explicit manual runs. A checkpoint may authorize a narrow read window for processing inbound items, but it does not authorize background monitoring, historical backfill, or outbound WhatsApp replies.

## Voice Notes And Media

- Download media locally only when needed.
- Summarize the business-relevant point; do not store raw media or full transcript text in git by default.
- Do not commit WhatsApp SQLite databases, QR/session state, downloaded media, or transcription artifacts.

## Follow-Up Handling

When a communication creates work:

- Use the owning task-capable RB Client Databases row first whenever Richmond Blackwood needs to take action.
- Create a central Notion Tasks row only for additional action work that cannot be represented by the operational row itself.
- If a Richmond Blackwood team message says or implies that RB will do something, create or update a task for it. Examples include "we will do", "we will look", "we will check", "we will tell/update/send", "I will", and equivalent commitments, unless the surrounding context clearly shows the action is already complete or owned elsewhere.
- Link client tasks to the client project stored on the responsible Company record's project relation/attribute. Use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) only for truly RB-internal work. If the responsible Company has no readable linked client project, record a blocker instead of choosing an arbitrary project.
- Use the Tasks database fields `Name`, `Status`, `Assigned To`, and `Project`; include due date, description, source communication, and relation fields when useful.
- Assign the task to the right person from the user request, existing row owner, owner of the project linked on the responsible Company record, established process rule, or `internal/people-roles.md`. If the assignee is unclear, ask before creating the task.
- Keep the canonical Communications record as the audit log/source record. Do not use `Follow-Up Action` as the only place where actionable work lives.
- A context-read batch is not completion. A Communication remains active until an approved, verified action marks it `Done`/`Archived`, sets a future `Snooze Until`, records a blocker, or explicitly carries it forward.
- When a Communication has linked `Tasks`, update or comment on the task in the same approved pass when the Communication's reply state, evidence state, owner, blocker, snooze date, or next follow-up changes. If evidence is missing or RB is waiting for a reply, keep or return the linked task to an in-progress status rather than marking it done.
- Record the follow-up in `memory/tasks.md` only when it is repo/process work that also needs local tracking.
- Record the follow-up in the relevant client file if it is client-specific and the client `Reference` is known.
- Use the appropriate Notion database only when the destination is clear and existing.

## Slack Completion Notifications

For workflow-triggered analysis tasks, such as German personal tax analysis setup, notify the triggering person in Slack when the analysis is ready for review.

- Capture the triggering Slack user ID, channel ID, and thread/message URL at intake when the request starts in Slack.
- If the request starts outside Slack and no Slack identity is available, ask the operator for the recipient before sending.
- Draft the Slack text in Codex chat first, including the workbook/source URL, completed scope, and remaining review flags.
- After the user approves the exact text, send it directly through Slack and log the sent notification in the relevant Notion task/comment or client source register. Use the Codex approval prompt/notification for Slack send approval when available and especially when the operator asks for notification-based approval; in Default mode, use the approved local approval-dialog fallback when the operator wants a popup.
- Do not create a Slack draft by default. Use a draft only when the user explicitly asks for one.

When a personal-tax analysis or operator-review pass unblocks a `Filing Task`, post the unblock update to `#rb-client-updates` after approval:

- Make the Notion filing task link the primary task reference in the message.
- Include the filing record and workbook links.
- State what changed that makes the filing task actionable.
- List remaining flags plainly; if filer judgment is still required, describe the task as unblocked for filing review rather than fully filing-ready.
- Do not use broad mentions such as `@here` or `@channel` unless the operator explicitly asks for them.
