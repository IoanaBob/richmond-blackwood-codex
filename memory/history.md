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
- Decisions made: Keep unsanitised operational context in repo except secrets/credentials; route client-specific private detail under `clients/Companies/<client-reference>/`.
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
- Limitations or gaps: RB WhatsApp account and operator rollout remain unconfirmed.
- Next step: Run validation, commit, push, and update PR #1.

## 2026-05-05 - Recover VUN Client Backup And Individual Routing

- User request: Rebase/recover the VUN work after important teammate changes landed on main, favouring the upstream workflow/memory/skills conventions.
- Context read: `origin/main` PR #1 commit, `AGENTS.md`, `processes/repo-operation.md`, `skills/rb-task-pr/SKILL.md`, memory standards, current stashes, and VUN/Nathan client files.
- Actions taken: Created branch `codex/vun-client-routing-backup` from `origin/main`, reapplied the task-owned VUN/Nathan work, migrated client roots to `clients/Companies/` and `clients/Individuals/`, removed stale non-VUN backup references, and left newly created process files stashed.
- Files changed: Client company/individual records, client templates, routing docs, source/memory logs, and the German personal tax analysis skill.
- Decisions made: Treat upstream main as authoritative for repo workflow; keep evidence files in Drive with repo pointers; keep offboarding/delivery separate; route personal correspondence and personal tax material to the individual root.
- Verification: `git diff --check`, `git diff --cached --check`, and `npm run typecheck` passed; branch pushed and draft PR opened at `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.
- Limitations or gaps: VUN relation-filtered Notion table backfill and Nathan personal tax analysis creation remain active tasks.
- Next step: Validate, commit in scoped commits, push the recovery branch, then continue review from the PR workflow.

## 2026-05-05 - Revert Client Evidence Storage To Drive

- User request: Treat downloading all VUN client export files into git as a mistake and return to the Drive-folder procedure.
- Context read: Current VUN/Nathan repo pointers, client storage rules, PR branch history, and evidence package references.
- Actions taken: Rewrote the PR branch to drop the mistaken binary evidence commit, removed the `Client export - VUN/` package from the branch, and updated procedures so Drive stores downloaded/exported client evidence while git stores pointers and blockers only.
- Files changed: Storage rules, VUN/Nathan location files, source/memory logs, and client routing docs.
- Decisions made: Use find-or-create for Drive backup/export folders; do not store downloaded/exported client binaries in git unless the user explicitly approves a narrow exception.
- Verification: `git diff --check` passed, typecheck passed with installed Node 18.17.1, and no `Client export - VUN`, `backup-manifest`, or `download-log` paths remain tracked.
- Next step: Validate, force-push the rewritten PR branch, and update PR #2 notes.

## 2026-05-06 - Direct-Send Communications Rule

- User request: Create a new PR adding the rule that communication drafts should happen in chat, email drafts always show sender, `Subject`, and source thread, email replies prefer existing threads, sends happen directly, and sent communications are stored in RB Communications.
- Context read: `AGENTS.md`, communications process, Gmail/WhatsApp skills, and memory decisions.
- Actions taken: Added central `rb-communications` skill and updated AGENTS, README, communications, Gmail, WhatsApp, and memory docs. After user correction, kept `rb-gmail-drafts` as the email-specific skill for sender/`Subject`/source-thread/signoff and verified draft fallback behavior.
- Files changed: `AGENTS.md`, `README.md`, `processes/communications.md`, `processes/signature-and-gmail.md`, `skills/rb-communications/SKILL.md`, `skills/rb-gmail-drafts/SKILL.md`, `skills/rb-whatsapp-comms/SKILL.md`, `skills/index.md`, and memory files.
- Decisions made: Normal outbound communications are chat-drafted, sender-visible, direct-sent after approval, and logged to Communications; email previews always show `Subject` and source/reply thread when available; existing email threads are preferred; software drafts are exception-only. Email communications still use `rb-gmail-drafts` for Gmail-specific rules.
- Verification: `npm run typecheck`, `git diff --check`, and source-specific/conflicting-rule scan passed.
- Later update: On 2026-05-07, RB Communications was created under RB Client Databases and the VUN Slack closeout record was moved there from the Everguard/research table.
- Next step: Commit, push, and open a new PR.

## 2026-05-06 - Gcloud Gmail Drafting Rule

- User request: Update PR #4 so Gmail email drafting always uses gcloud.
- Context read: Gmail communication skill, Google auth skill, Gmail helper scripts, AGENTS, README, process docs, and memory.
- Actions taken: Made Gmail draft/delete helper defaults run `gcloud auth application-default login` by default and documented that Gmail drafting actions touching Gmail must always use the repo-local gcloud-managed Gmail API helper path.
- Files changed: `skills/rb-gmail-drafts/`, `skills/rb-google-auth/`, `AGENTS.md`, `README.md`, `processes/signature-and-gmail.md`, and memory files.
- Decisions made: Gmail draft fallback, sender verification, helper reply-context reads, and unsafe-draft deletion must not use IMAP, app passwords, stored mailbox credentials, or connector-created Gmail drafts.
- Verification: `npm run typecheck`, Gmail draft/delete helper `--help` smoke checks, `git diff --check`, and stale auth-default scan passed.
- Next step: Commit, push, and update PR #4.
