---
type: operating_memory
status: provisional
privacy: private
confidence: medium
last_reviewed: 2026-05-25
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
| `rb-accounting` | `accounting@richmondblackwood.com` | Shared RB service mailbox and default client-facing sender/auth route when available | configured in helper registry, credential unverified | This is not an actor. Use only as source/sender/auth route when explicitly scoped. |
| `ioana-richmond-blackwood` | Needs confirmation | Human operator RB Google route | not configured | Do not infer this from `RB_CODEX_ACTOR`; confirm source/sender/auth separately. |
| `johnpaul-richmond-blackwood` | `johnpaul.okolie@richmondblackwood.com` | Human operator RB Google route | not configured | Email is provisional in `internal/people-roles.md`. Confirm before treating as approved sender. |
| `simoneta-richmond-blackwood` | Needs confirmation | Human operator RB Google route | not configured | Confirm email before use. |

## Shared Global Personas

The RB helper code can also resolve shared global persona slugs that exist for other local Codex projects, such as `ioana-private`, `ioana-eip`, `eran-richmond-blackwood`, or other business/persona slugs recorded in the shared `~/.codex/google-personas/` store. A shared persona is still only an auth route; it does not change the active RB actor, Gmail source mailbox, or Gmail sender.

## Verification

Run no-login checks:

```bash
npm run google-auth:verify-personas
npm run google-auth:verify-oauth-vault
```

If a row reports a reconnect candidate, show the exact persona slug and command to the user. Do not run an interactive reconnect until that exact reconnect is approved.
