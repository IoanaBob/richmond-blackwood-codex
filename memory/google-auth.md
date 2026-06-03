---
type: operating_memory
status: provisional
privacy: private
confidence: medium
last_reviewed: 2026-05-25
tags: [google, auth, gmail, drive, calendar, personas]
---

# Google Auth Defaults

Status: provisional.
Source: user instruction on 2026-05-25 to port the personal-codex global OAuth/persona model; local personal-codex `origin/main` auth implementation.
Imported: 2026-05-25.
Review: confirm which RB Google accounts are actually credentialed in the global persona store.

## Storage Rule

- Durable Google persona caches, OAuth client files, and Google Workspace MCP credentials belong under `~/.codex`, not worktree-local `.codex-local`.
- `~/.codex/google-personas/` is the shared global Codex persona store used by this repo, its worktrees, personal-codex, and other local Codex project repositories. Persona credentials are not project-scoped.
- Worktree-local `.codex-local` is only for ephemeral packets, scratch outputs, and task-local temporary files.
- The primary helper credential file is `~/.codex/google-personas/<persona-slug>/oauth/authorized_user.json`. It is a sensitive per-user OAuth refresh credential and must never be printed, committed, copied into Notion, or stored in repo memory.

## Identity Boundaries

- `RB_WORKSPACE_ACTOR` is a human workspace actor name from `internal/people-roles.md`; `RB_CODEX_ACTOR` is a legacy compatibility alias for the same value.
- A Google persona is an auth route for Gmail, Drive, and Calendar helpers.
- A Gmail source mailbox is the mailbox searched/read for a job.
- A Gmail `From` sender is the exact send-as identity used for a draft/send/reply.
- Shared mailboxes such as `accounting@richmondblackwood.com` are not actors. They can be source mailboxes, senders, or auth personas only when explicitly scoped.

## Auth Default

- Default to no-login/no-reauth mode for Google helper work.
- Routine commands must try the per-persona OAuth vault, configured connectors, approved MCP routes, persona-local ADC, saved gcloud/account-token caches, and global Codex credential paths without starting browser OAuth.
- Do not run `gcloud auth login`, `gcloud auth application-default login`, browser OAuth, or any other interactive reauth flow unless the user explicitly approves that exact auth action in the current context.
- Do not ask the user to paste OAuth access tokens, refresh tokens, RAPT values, client secrets, or other credential material.
- Do not use Workspace domain-wide delegation or service-account impersonation for persona Gmail, Drive, or Calendar access.

## Helper Commands

```bash
npm run google-auth:verify-personas
npm run google-auth:verify-oauth-vault
npm run google-auth:sync-oauth-vault
npm run google-auth:recover-oauth-clients
npm run google-auth:reconnect-oauth-vault -- --persona <persona-slug> --interactive
```

`sync-oauth-vault`, `verify-oauth-vault`, `verify-personas`, and `recover-oauth-clients` must not print secrets or start OAuth. `reconnect-oauth-vault --interactive` starts OAuth for exactly one approved persona and should only run after explicit user approval.

## RB Sender Defaults

- Client-facing Gmail drafts default to `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- The Gmail helper supports global OAuth/persona routing, but a non-accounting sender requires an explicit `--allow-non-accounting-sender` flag and must only be used after the user approves that exact `From` identity.
- Sender-matched OAuth client files for Richmond Blackwood should live under `~/.codex/google-oauth-client.richmondblackwood.json`.
