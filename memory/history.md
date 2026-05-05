# History

Status: active.
Source: local repo.
Imported: 2026-05-05.
Review: operational ledger structure ported from neutral repo infrastructure; entries remain provisional until reviewed.

This file is the append-only chronological ledger for meaningful Richmond Blackwood Codex sessions.

## 2026-05-05 - Initial RB Repository Build

- User request: Build the RB Codex operating repository and keep facts provisional.
- Context read: User instructions, RB Notion destinations, local RB source repos, Slack/Gmail/Drive search summaries.
- Actions taken: Created initial RB memory, source, process, client, and skill structure.
- Files changed: Initial repository structure.
- Decisions made: Keep unsanitised operational context in repo except secrets/credentials; route client-specific private detail under `clients/<client-reference>/`.
- Verification: `git diff --check` and source keyword scans were clean in the initial pass.
- Limitations or gaps: Full Slack, Gmail, Drive, and Notion client imports remain partial.
- Next step: Continue source-backed imports and resolve open routing questions before external filing.

## 2026-05-05 - Port Neutral Operating Infrastructure

- User request: Port neutral decisions and helper infrastructure from `everguard-research-codex`, excluding company-specific workflows.
- Context read: source package/helper/process/memory structure and current RB repo rules.
- Actions taken: Added RB npm/TypeScript helper layer, RB-neutral helper skills, process docs, and memory ledger scaffolding.
- Files changed: Package metadata, helper scripts under `skills/rb-*`, memory/process/setup/source documentation.
- Decisions made: Gmail drafts default to `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`; SignNow helpers remain generic mechanics only.
- Verification: `npm install`, `npm run typecheck`, helper `--help` smoke checks, `git diff --check`, and forbidden carryover scans passed.
- Limitations or gaps: `npm install` still reports an `@signnow/api-client` engine warning on Node 18.7.0; RB signing policy, signer identity, template catalog, and Drive group/external classifications remain open unless already confirmed elsewhere.
- Next step: User review before any senior-review/commit/push workflow.

## 2026-05-05 - Port WhatsApp MCP Setup

- User request: Port the newly merged WhatsApp MCP server work from `everguard-research-codex` into the currently open RB PR.
- Context read: Source WhatsApp MCP setup guide, persistent bridge helper, WhatsApp communications skill, memory/process rules, and pinned submodule state.
- Actions taken: Added optional RB WhatsApp MCP submodule, setup guide, background bridge helper, WhatsApp communications skill, communication process, and memory/source records.
- Files changed: `.gitmodules`, `third_party/whatsapp-mcp`, `setup/mcp/`, `skills/rb-whatsapp-comms/`, process docs, memory docs, and source logs.
- Decisions made: WhatsApp work should use the MCP tools for normal reads/sends, keep QR/session/media/transcripts local-only, and require explicit send approval.
- Verification: Submodule status, bridge shell syntax, Go bridge test, Python compile check, TypeScript check, `git diff --check`, and source-specific business keyword scan passed.
- Limitations or gaps: RB WhatsApp account, operator rollout, and any dedicated Communications database remain unapproved.
- Next step: Run validation, commit, push, and update PR #1.
