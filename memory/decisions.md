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

Source: user instruction on 2026-05-05.
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
Review: confirm the RB WhatsApp account, whether WhatsApp should be enabled for all operators, and whether RB wants a dedicated Communications database.
