# Decisions

Status: provisional.

## 2026-05-04 - Unsanitised Context In Repo

Decision: This repository keeps unsanitised operational context.

Boundaries:

- Private client-specific knowledge goes under `clients/Companies/<client-reference>/`.
- Private individual-specific knowledge goes under `clients/Individuals/<legal-name>/`.
- Private non-client company history goes under `internal/`.
- Live secrets, tokens, private keys, certificate files, and credential dumps remain excluded.

Source: user instruction on 2026-05-04.
Review: approved as a storage rule by user instruction; exact client Notion and Drive destinations still require review where unclear.

## 2026-05-04 - Notion And Drive Reuse

Decision: Reuse existing Notion and Drive structures.

Targets:

- General SOPs: RB Internal Knowledge Base.
- Client knowledge: Client Databases.
- Non-always-needed docs: general Drive archive.
- Client docs: current RB finance/accounting folder structure.

Source: user instruction on 2026-05-04.
Review: approved as a routing rule by user instruction; specific client mapping remains provisional.

## 2026-05-05 - Port Neutral Helper Infrastructure

Decision: Port neutral local helper infrastructure from `everguard-research-codex` into RB with RB-specific routing and sender defaults.

Boundaries:

- Port npm/TypeScript structure and generic Drive, Gmail, Google auth, SignNow, Google Doc transform, PDF signing-plan, and task PR mechanics.
- Exclude source-company business workflows, client/asset/counterparty names, source Notion/Drive IDs, and source-specific signing identities.
- Treat local helpers as support for connector gaps and validation, not as completion paths for business tasks.

Source: user instruction on 2026-05-05 and local source repo inspection.
Review: implementation should be reviewed for remaining source-specific carryover before approval.

## 2026-05-05 - RB Gmail Draft Sender

Decision: Richmond Blackwood Gmail drafts created by repo-local helpers must use `accounting@richmondblackwood.com` and the display/signoff identity `Richmond Blackwood Accounting Team`.

Consequence:

- The Gmail helper fails closed if any other sender is requested.
- If Gmail stores a draft with another sender, the draft must be deleted or marked unsafe.
- Gmail email drafting actions that touch Gmail must always use the repo-local gcloud-managed Gmail API helper path. Do not use IMAP, app passwords, stored mailbox credentials, or connector-created Gmail drafts for those actions.

Source: user instruction on 2026-05-05; reinforced by user instruction on 2026-05-06.
Review: approved as a sender rule by user instruction; confirm whether this applies to every RB communication type or only accounting/client drafts.

## 2026-05-05 - Generic SignNow Only

Decision: SignNow helper scripts may be ported as generic mechanics only.

Consequence:

- Do not invent RB signer identity, routing order, template catalog, or full signing workflow.
- Create review/editor links before any send and require explicit user approval before sending signing requests.

Source: user instruction on 2026-05-05.
Review: RB signing policy remains open.

## 2026-05-05 - Optional WhatsApp MCP Only Through Local MCP

Decision: Port the neutral WhatsApp MCP server setup into RB as an optional local MCP service.

Consequence:

- Pin `third_party/whatsapp-mcp` as a submodule at compatibility commit `018ea770ca9524c43000910ada7611fa1a503fe6`.
- Use `setup/mcp/start-whatsapp-bridge.sh` only to start, stop, or inspect the local bridge.
- Use the `whatsapp` MCP tools for normal WhatsApp reads, contact searches, sends, media downloads, and voice-note handling.
- Do not use direct REST or SQLite access as the normal execution path.
- Do not commit WhatsApp QR/session state, SQLite databases, downloaded media, transcripts, or personal Codex config.
- Do not send WhatsApp messages/files unless the user explicitly asks and tool approval confirms recipient and content.

Source: user instruction on 2026-05-05 and local source repo inspection.
Review: confirm the RB WhatsApp account and whether WhatsApp should be enabled for all operators.

## 2026-05-06 - Chat Draft, Direct Send, Communications Log

Decision: All Richmond Blackwood communication drafting should happen in chat with Codex, not as software drafts for the user to manually send.

Consequence:

- Every outbound communication preview must show the sending identity before approval.
- Email previews must show the exact `From` name, email address, `Subject`, and source/reply thread when thread context exists.
- Email should reply in the existing thread whenever email context exists; new threads are for cases with no relevant thread or explicit user instruction.
- After the user approves or explicitly asks to send, Codex should send directly through the supported connector or MCP tool.
- After sending, Codex should store the sent communication in RB Communications.
- Gmail, Slack, WhatsApp, Notion, or other software drafts should be created only when the user explicitly asks for that exception.

Source: user instruction on 2026-05-06.
Review: approved as an operating rule by user instruction.

## 2026-05-12 - Calling Bot Minimal Startup Context

Decision: RB authority calls should not preload every linked record into ElevenLabs. Startup context is limited to tax registration/reference context, Contact JSON, Company JSON, Individual JSON, routing/owner metadata, live-help sentinels, and the public-safe call brief. Other approved categories must be fetched on demand through the n8n `RB Calls Context Lookup` workflow and ElevenLabs `lookup_call_context` tool.

Consequence:

- `RB Calls Voice Execution` must avoid generic linked-record crawling before the outbound call.
- New call-critical context categories require an explicit allowlisted n8n lookup branch before they are available to the agent.
- Lookup responses may be `partial` when a permitted Notion source is unavailable; the agent should ask the call creator rather than assume no records exist.

Source: user instruction on 2026-05-12.
Review: provisional until a controlled live call confirms startup stability and lookup behavior.
