# Repository Operation And Memory

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB rules.
Imported: 2026-05-05.
Review: confirm whether every meaningful RB repo task should be published as a PR or only tasks that the user explicitly asks to publish.

## Purpose

Keep this repository as Richmond Blackwood's durable operating memory, local skill library, source register, and branch workspace.

## Start A Task

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `memory/index.md`.
4. Read `memory/storage-rules.md`.
5. Read `memory/current-state.md`.
6. Skim recent `memory/history.md`.
7. Skim recent `memory/skill-runs.md`.
8. Read `memory/handoff.md`.
9. Read `skills/index.md`.
10. Open the matching process file and repo-local skill.

## Branch And PR

- Prefer one branch per meaningful repository task.
- Never include unrelated user changes in a task branch or commit.
- If the worktree is dirty, identify whether changes belong to the current task before branching or committing.
- Do not use destructive git commands to make the tree clean.
- Ask the user to review the diff before every commit, even when local or tool-level approval is set to auto-review.
- Run focused validation before finalizing.

## Skill Run Register

Record skill use in `memory/skill-runs.md` when Codex uses a repo-local skill as the controlling workflow, opens it for task execution, or explicitly invokes a plugin/system skill.

Do not record secrets, credentials, bearer-token links, or confidential document contents.

## Connector And Helper Boundary

Prefer connectors for app-native workspace state:

- Gmail connector for search, read, and thread context.
- Google Drive/Docs connector for Drive and native Google Docs reads/edits where supported.
- Notion connector for Notion pages, databases, records, and backup pages.
- Slack connector for Slack reads, drafts, and sends.
- SignNow connector for supported document, send, and status operations.
- MCP tools for optional local services such as WhatsApp when the server is configured and available.

Use repo-local helpers only for connector gaps and mechanical actions:

- Drive/gcloud helpers for local binary upload, folder organization, and Google Doc export/upload.
- Gmail API helper for drafts that must save from `accounting@richmondblackwood.com`.
- SignNow helpers for local-file upload, explicit field setup, review-link creation, and status checks.
- PDF/Google Doc helpers for mechanical transforms from explicit plans.
- WhatsApp bridge helper for starting or checking the local bridge only; normal WhatsApp work should go through the `whatsapp` MCP tools, not direct REST or SQLite reads.

`npm` scripts are support tools, not business workflow engines. A task is complete only when the relevant live source of truth is updated, verified, and recorded.

## Close A Task

1. Append to `memory/history.md`.
2. Update `memory/skill-runs.md`.
3. Update `memory/current-state.md` when durable state changed.
4. Update `memory/decisions.md` when a decision was made or reversed.
5. Update `memory/tasks.md` with created/completed/blocked timestamps.
6. Update `memory/handoff.md`.
7. Update process docs and Notion backup pages when workflow changed and the destination is clear.
8. Run verification appropriate to the change.

## Verification

- Markdown/process-only changes: `git diff --check`.
- TypeScript helper changes: `npm run typecheck`.
- Runtime helper changes: run `--help`, `--verify-only`, or a controlled test where possible.
- Notion/Drive/Gmail/Slack/SignNow changes: fetch or verify the changed live state without exposing secrets.
