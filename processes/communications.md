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

Client-specific communication facts belong under `clients/Companies/<client-reference>/`, using the exact Notion Companies `Reference`.

Non-client private company communication facts belong under `internal/`.

General communication operating rules belong under `processes/` and `memory/`, and may be backed up to the RB Internal Knowledge Base when reviewed.

If the logging destination is unclear, record the blocker in `memory/open-questions.md` and ask for review.

## WhatsApp Chat ID Pointers

Use WhatsApp chat IDs as pointers only. Do not treat a saved chat ID as approval to import chat history, download media, or send future messages without explicit user instruction.

When a user asks to save a WhatsApp chat ID for a known company client:

1. Resolve the contact or chat through the `whatsapp` MCP tools.
2. If search returns multiple plausible contacts, ask the user to choose the intended contact before filing.
3. Store the selected JID in `clients/Companies/<client-reference>/communications.md` under a WhatsApp chat ID table.
4. Include `Status`, `Source`, `Imported`, and `Review` fields for the pointer.
5. Mark the pointer `provisional` unless the user explicitly approves the contact relationship and preferred-contact status.
6. Add a matching source row in `clients/Companies/<client-reference>/source-register.md`.

The general process document should describe the filing pattern only. Keep client names, phone numbers, JIDs, and role assumptions inside the relevant client folder.

## Voice Notes And Media

- Download media locally only when needed.
- Summarize the business-relevant point; do not store raw media or full transcript text in git by default.
- Do not commit WhatsApp SQLite databases, QR/session state, downloaded media, or transcription artifacts.

## Follow-Up Handling

When a communication creates work:

- Record the follow-up in `memory/tasks.md` if it is repo/process work.
- Record the follow-up in the relevant client file if it is client-specific and the client `Reference` is known.
- Use the appropriate Notion database only when the destination is clear and existing.
