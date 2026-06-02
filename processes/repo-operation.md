# Repository Operation And Memory

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB rules; user instruction on 2026-05-21.
Imported: 2026-05-05.
Review: confirm whether pure read-only chats should use the branch/PR closeout rule or only report that no branch was needed.

## Purpose

Keep this repository as Richmond Blackwood's durable operating memory, local skill library, source register, and branch workspace.

## Master Chat And Skill Run Rule

Every RB Codex chat or skill run that can change repository files, helper behavior, or live workspace state starts and ends with the git workflow below.

Start of run:

1. Inspect `git status --short --branch`.
2. Run `git pull origin main`.
3. If the tree is clean, create or switch to a new `codex/<task-slug>` branch before editing files or changing live state.
4. If the tree is dirty, the pull cannot apply cleanly, or conflicts appear, classify changes by task ownership before continuing. Split task-owned changes into relevant commits, push scoped branch(es), open PRs when GitHub tooling is available, and report PR URLs or blockers.

End of run:

1. Run verification appropriate to the change.
2. Commit only task-owned changes.
3. Push the branch.
4. Fetch or otherwise check the branch against `origin/main`.
5. Fix conflicts on the task branch, rerun verification, and push the corrected branch.
6. Create or update the PR, then communicate the branch, PR URL when available, conflict status, verification, and blockers.

## Start A Task

1. Apply the Master Chat And Skill Run Rule.
2. Read `AGENTS.md`.
3. Read `README.md`.
4. Read `memory/index.md`.
5. Read `memory/storage-rules.md`.
6. Read `memory/current-state.md`.
7. Skim recent `memory/history.md`.
8. Skim recent `memory/skill-runs.md`.
9. Read `memory/handoff.md`.
10. Read `skills/index.md`.
11. Open the matching process file and repo-local skill.

## Branch And PR

- Prefer one branch per meaningful repository task.
- Never include unrelated user changes in a task branch or commit.
- If the worktree is dirty, identify whether changes belong to the current task before branching or committing, then split task-owned changes into relevant commits and PRs when needed.
- Do not use destructive git commands to make the tree clean.
- Ask the user to review the diff before every commit unless the user has explicitly instructed this run to push and open a PR as part of closeout.
- Run focused validation before finalizing.

## Skill Run Register

Record skill use in `memory/skill-runs.md` when Codex uses a repo-local skill as the controlling workflow, opens it for task execution, or explicitly invokes a plugin/system skill.

Do not record secrets, credentials, bearer-token links, or confidential document contents.

## Connector And Helper Boundary

Reject browser use for any live workspace or business-system workflow when an API, app connector, MCP tool, or repo-approved helper could support the current plan.

Before choosing browser automation:

1. Check whether the current plan can use an app connector, MCP tool, public/private API, or repo-approved helper.
2. If the route is unclear, ask the responsible RB team member whether an API/MCP path exists.
3. If API/MCP access is possible but blocked by missing credentials, stop and ask the responsible RB team member to provision the right API keys or credentials through approved secret storage.
4. Do not use browser automation as a workaround for missing API/MCP access, and do not store keys, tokens, credential dumps, or pasted secrets in git.

Browser use is limited to visual QA, local UI verification, public/manual-only pages, or explicitly approved human-only steps after the no-API/MCP reason is clear.

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
