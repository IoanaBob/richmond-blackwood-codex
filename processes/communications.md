# Communications

Status: provisional.
Source: neutral WhatsApp MCP and communication-routing decisions ported from local `everguard-research-codex`, adapted to RB storage rules.
Imported: 2026-05-05.
Review: confirm the canonical Communications database URL/schema, which WhatsApp account should be connected, and which communication types should be mirrored to Notion.

## Purpose

Use this process for material Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone, calendar, Notion, SignNow, Drive, or other operating systems.

## General Rules

- Prefer app connectors and MCP tools for app-native reads and writes.
- Do not invent transcripts or communication context.
- Keep reads narrow and purpose-bound.
- Do not send messages automatically unless the user explicitly asks to send and the tool approval confirms recipient, content, and any attachment.
- Draft outbound communications in chat with the user. Do not create app/software drafts for the user to manually hit send unless the user explicitly asks for that exception.
- Always show the sending identity before approval. For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- Prefer replying in the existing email thread when email context exists. Start a new thread only when no relevant thread exists or the user explicitly asks for a new thread.
- After user approval, send directly through the supported connector or MCP tool and then store the sent communication in the Communications database.
- Do not create replacement Notion or Drive structures for communication logs unless the user approves.

## Direct Send Preview

Before sending any communication, show:

- Channel.
- From, including email address for email.
- To or destination.
- Cc/Bcc when relevant.
- Subject, always for email.
- Source/reply thread, always for email when thread context exists.
- Attachments or files.
- Message body.

For Richmond Blackwood accounting/client email, default to:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

If another sender is required, stop and confirm it before drafting.

## Communications Database Logging

After sending, create or update the Communications database record with:

- Communication time.
- Channel.
- Direction.
- From.
- To / participants.
- Subject or short title.
- Summary.
- Full content when safe and useful.
- Source link, message ID, thread ID, or connector status when available.
- Related client/company/person/project if known.
- Follow-up owner, action, deadline, and priority when needed.

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

Client-specific communication facts belong under `clients/<client-reference>/`, using the exact Notion Companies `Reference`.

Non-client private company communication facts belong under `internal/`.

General communication operating rules belong under `processes/` and `memory/`, and may be backed up to the RB Internal Knowledge Base when reviewed.

If the logging destination is unclear, record the blocker in `memory/open-questions.md` and ask for review.

## Voice Notes And Media

- Download media locally only when needed.
- Summarize the business-relevant point; do not store raw media or full transcript text in git by default.
- Do not commit WhatsApp SQLite databases, QR/session state, downloaded media, or transcription artifacts.

## Follow-Up Handling

When a communication creates work:

- Record the follow-up in `memory/tasks.md` if it is repo/process work.
- Record the follow-up in the relevant client file if it is client-specific and the client `Reference` is known.
- Use the appropriate Notion database only when the destination is clear and existing.
