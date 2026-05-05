# Skill Runs

Status: active.
Source: local repo.
Imported: 2026-05-05.
Review: operational ledger structure ported from neutral repo infrastructure.

| Timestamp | Skill | Task | Reason | Outcome | Verification / gaps |
| --- | --- | --- | --- | --- | --- |
| 2026-05-05 | `rb-source-research` | Port neutral operating infrastructure | Used source repo and RB repo context to separate neutral infrastructure from company-specific workflows. | Migration plan and source-backed implementation scope. | Source repo was inspected locally; no external writes made during planning. |
| 2026-05-05 | `rb-memory-capture` | Port neutral operating infrastructure | Updated durable repo memory and operational ledgers. | Added history/skill-run structure and updated memory rules. | `npm run typecheck`, helper smoke checks, `git diff --check`, and carryover scans passed. |
| 2026-05-05 | `rb-file-uploads` | Port neutral operating infrastructure | Added Drive helper workflow and upload/export docs. | Added Drive organize/upload/export scripts and file-upload process/memory docs. | Drive helper `--help` smoke checks passed; live Drive writes were not run. |
| 2026-05-05 | `rb-gmail-drafts` | Port neutral operating infrastructure | Added verified RB accounting sender draft helper. | Added Gmail draft and delete helper scripts defaulting to `accounting@richmondblackwood.com`; IMAP/app-password fallback was removed by user instruction. | Gmail helper `--help` smoke check passed; live Gmail verification was not run. |
| 2026-05-05 | `rb-signature-workflow` | Port neutral operating infrastructure | Added generic SignNow/PDF/Google Doc helper mechanics. | Added generic SignNow upload/get/update/review helpers plus document/PDF transform helpers. | SignNow/PDF/Google Doc `--help` smoke checks passed; no live SignNow writes were run. |
| 2026-05-05 | `rb-whatsapp-comms` | Port WhatsApp MCP setup | User asked to port the newly merged source WhatsApp MCP server work into RB PR #1. | Added optional WhatsApp MCP submodule, setup guide, bridge helper, RB WhatsApp skill, and communication-routing rules. | Submodule status, bridge shell syntax, Go bridge test, Python compile check, TypeScript check, `git diff --check`, and source-specific business keyword scan passed; live WhatsApp reads/sends were not run. |
| 2026-05-05 | `rb-memory-capture` | WhatsApp MCP port closeout | Durable state needed the optional MCP setup, local-only data boundary, and open review questions. | Updated decisions, history, tasks, current state, handoff, process index, setup docs, and import/source logs. | No WhatsApp transcript, media, QR, or session state recorded. |
| 2026-05-05 | `rb-task-pr` | Recover VUN client backup and individual routing | Upstream main added the authoritative branch/PR workflow while VUN work was still local. | Created `codex/vun-client-routing-backup` from `origin/main`, reapplied task-owned work, pushed scoped commits, and opened draft PR #2. | `git diff --check`, cached diff check, manifest JSON parse, evidence count, and typecheck passed; newly created process files remain stashed by user instruction. |
| 2026-05-05 | `rb-memory-capture` | VUN recovery closeout | Memory needed to reflect company/individual client roots, removed non-VUN backup references, and recurring git-held backup packages. | Updated current state, tasks, history, handoff, storage rules, and source logs. | Non-VUN imports remain intentionally pending until redone from Notion Companies `Reference`. |
