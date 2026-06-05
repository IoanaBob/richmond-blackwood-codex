---
type: operating_memory
status: provisional
privacy: private
confidence: medium
last_reviewed: 2026-05-26
tags: [google, personas, oauth]
---

# Google Persona Registry

Status: provisional.
Source: personal-codex global persona model ported on 2026-05-25 plus RB actor/mailbox routing rules.
Imported: 2026-05-25.
Review: confirm which RB-specific persona slugs have approved Gmail, Drive, and Calendar credentials.

Use this file for safe persona metadata only. Do not store refresh tokens, access tokens, OAuth client secrets, passwords, private keys, or full token responses here.

Actual token caches live only in ignored global Codex storage:

```text
~/.codex/google-personas/<persona-slug>/
```

The helper-facing OAuth vault is:

```text
~/.codex/google-personas/<persona-slug>/oauth/authorized_user.json
```

## RB Personas

| Persona slug | Expected account | Role | Config status | Notes |
| --- | --- | --- | --- | --- |
| `accounting-richmond-blackwood` | `accounting@richmondblackwood.com` | Shared RB service mailbox and default client-facing sender/auth route when available | configured and verified 2026-05-26 | This is not an actor. Use only as source/sender/auth route when explicitly scoped. Legacy helper alias: `rb-accounting`. |
| `ioana-richmond-blackwood` | Needs confirmation | Human operator RB Google route | not configured | Do not infer this from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR`; confirm source/sender/auth separately. |
| `jp-richmond-blackwood` | `johnpaul.okolie@richmondblackwood.com` | Human operator RB Google route | configured and verified 2026-05-26 | Email is provisional in `internal/people-roles.md`. Legacy helper alias: `johnpaul-richmond-blackwood`. Confirm before treating as approved sender. |
| `simoneta-richmond-blackwood` | Needs confirmation | Human operator RB Google route | not configured | Confirm email before use. |

## 2026-05-26 Verification

Status: provisional.
Source: user instruction in Codex chat on 2026-05-26; Notion Google Persona Auth Migration Guide `https://www.notion.so/36be4130131481289808d08faf17d8f6`; local helper verification output.
Imported: 2026-05-26.
Review: Johnpaul's work email remains provisional in `internal/people-roles.md` until the team approves it as a sender; unrelated Eran/private MCP personas remain missing from the global store.

- `accounting-richmond-blackwood`: OAuth vault created under global Codex storage, backed by `accounting@richmondblackwood.com`, using the Richmond Blackwood OAuth client context. Refresh, identity, Gmail, Drive, Calendar, and Gmail sender verify-only checks passed on 2026-05-26.
- `jp-richmond-blackwood`: OAuth vault created under global Codex storage, backed by `johnpaul.okolie@richmondblackwood.com`, using the Richmond Blackwood OAuth client context. Refresh, identity, Gmail, Drive, Calendar, and exact From verify-only checks passed on 2026-05-26.

## Shared Global Personas

The RB helper code can also resolve shared global persona slugs that exist for other local Codex projects, such as `ioana-private`, `ioana-eip`, `eran-richmond-blackwood`, or other business/persona slugs recorded in the shared `~/.codex/google-personas/` store. A shared persona is still only an auth route; it does not change the active RB actor, Gmail source mailbox, or Gmail sender.

## Verification

Run no-login checks:

```bash
npm run google-auth:verify-personas
npm run google-auth:verify-oauth-vault
```

If a row reports a reconnect candidate, show the exact persona slug and command to the user. Do not run an interactive reconnect until that exact reconnect is approved.
