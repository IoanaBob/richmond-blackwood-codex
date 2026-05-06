---
name: rb-whatsapp-comms
description: Use when reading, searching, summarizing, transcribing, logging, drafting, or sending WhatsApp messages, media, files, or voice notes through the local WhatsApp MCP server for Richmond Blackwood work.
---

# RB WhatsApp Communications

Use this skill when WhatsApp context is needed for Richmond Blackwood work and the local `whatsapp` MCP server is available.

## Setup Source

- Setup guide: `setup/mcp/whatsapp.md`
- Submodule: `third_party/whatsapp-mcp`
- Bridge helper: `setup/mcp/start-whatsapp-bridge.sh`

If the `whatsapp` MCP server is not available, do not invent WhatsApp context. Ask the user to start the bridge, reload Codex, or provide WhatsApp exports/notes.

## Corrective Rules

These rules come from the first WhatsApp MCP setup/test run in the source repo and must be followed going forward:

- Use the WhatsApp MCP tools for normal WhatsApp reads, contact searches, sends, media downloads, and voice-note handling. Do not use the bridge REST endpoint as the normal execution path.
- Before WhatsApp reads or sends, ensure the local bridge is running. If port `8080` is not listening, start `setup/mcp/start-whatsapp-bridge.sh start` outside the sandbox and leave it running in the background.
- If the MCP server or an MCP tool fails, fix or reload the MCP path first. Do not silently bypass it with local SQLite queries, REST calls, or shell helpers unless the user explicitly approves a diagnostic fallback.
- If the bridge prints a QR code in terminal output, identify the QR block and paste it into chat immediately so the user can scan it.
- If contact search is ambiguous, stop before sending and ask which contact is correct. Do not infer a recipient from partial names when multiple plausible contacts exist.
- If contact search returns `Unexpected response type`, verify that `search_contacts` returns `{ "contacts": [...], "count": n }` and reload Codex so the patched MCP process is running.

## Pairing Rule

When Codex starts or monitors the WhatsApp bridge and a QR code is printed in terminal output or the bridge log, relay that QR block directly in chat so the user can scan it. Do not merely say that the QR was printed somewhere else.

## Safety Rules

- WhatsApp reads and media downloads are private-data operations. Keep queries narrow: contact, chat, date range, search term, and small limits.
- Do not send messages or files automatically unless the user explicitly asks to send and the tool approval confirms recipient and content.
- For suggested WhatsApp responses, draft in chat first unless the user explicitly asks to send.
- Do not store QR state, SQLite databases, downloaded media, voice-note files, transcripts, or private WhatsApp exports in git.
- Do not copy full private chat history into memory or Notion. Summarize only the business-relevant facts.
- Route material WhatsApp facts to existing RB destinations only. Do not create a new Communications database or parallel Notion structure without user approval.

## Read Workflow

1. Identify the target contact or chat.
2. Search contacts or chats if the user provided a name rather than a JID/number.
3. Read only the smallest useful message window.
4. If media or a voice note matters, use the MCP media download tool, inspect or transcribe locally as needed, then summarize the business relevance.
5. Route the resulting communication summary to the existing RB destination when clear.

## Contact Search Fix

The repo fork's `search_contacts` tool must return a stable object shaped as `{ "contacts": [...], "count": n }`, not raw dataclass objects or an empty list. It should search both the message chat index and the WhatsApp contact store.

If Codex sees `Unexpected response type` from contact search, inspect `third_party/whatsapp-mcp/whatsapp-mcp-server/main.py` and `whatsapp.py`, then reload Codex after patching so the MCP process restarts.

## Send Workflow

1. Resolve the intended recipient by contact search or explicit phone/JID.
2. If more than one plausible contact is returned, ask the user to choose before sending.
3. Ensure the local bridge is listening. If not, start `setup/mcp/start-whatsapp-bridge.sh start` outside the sandbox so it persists beyond the current chat turn.
4. Draft the message in chat unless the user already supplied exact text and asked to send.
5. Confirm files are the intended files and contain no wrong-side or confidential disclosure.
6. Send through the WhatsApp MCP tools only after explicit send instruction and tool approval. Use the bridge REST API only for local bridge diagnostics or when the MCP server is unavailable and the user explicitly approves that fallback.
7. Record the material business consequence in the right RB place.

## Richmond Blackwood Routing

When logging WhatsApp:

- Client-specific facts belong under `clients/Companies/<client-reference>/`; the folder name must be the exact Notion Companies `Reference`.
- Non-client private company facts belong under `internal/`.
- General process rules belong under `processes/`, `memory/`, and the RB Internal Knowledge Base when a backup destination is clear.
- If the right Notion/Drive/client destination is unclear, record the blocker in `memory/open-questions.md` and ask for review.

For voice notes, store a concise summary and the operating consequence, not full transcript text unless the user asks and it is safe.
