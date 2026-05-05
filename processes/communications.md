# Communications

Status: provisional.
Source: neutral WhatsApp MCP and communication-routing decisions ported from local `everguard-research-codex`, adapted to RB storage rules.
Imported: 2026-05-05.
Review: confirm whether RB wants a dedicated Communications database, which WhatsApp account should be connected, and which communication types should be mirrored to Notion.

## Purpose

Use this process for material Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone, calendar, Notion, SignNow, Drive, or other operating systems.

## General Rules

- Prefer app connectors and MCP tools for app-native reads and writes.
- Do not invent transcripts or communication context.
- Keep reads narrow and purpose-bound.
- Do not send messages automatically unless the user explicitly asks to send and the tool approval confirms recipient, content, and any attachment.
- Do not create replacement Notion or Drive structures for communication logs unless the user approves.

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
