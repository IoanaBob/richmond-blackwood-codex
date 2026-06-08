---
type: operating_memory
status: provisional
privacy: private
confidence: medium
last_reviewed: 2026-06-02
tags: [google, personas, oauth]
---

# Google Persona Registry

Status: provisional.
Source: personal-codex global persona model ported on 2026-05-25 plus RB actor/mailbox routing rules.
Imported: 2026-05-25.
Review: accounting and JP vaults were missing from this local global store on 2026-06-02; reconnect them only after exact approval if needed.

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
| `compliance-richmond-blackwood` | `compliance@richmondblackwood.com` | Shared RB compliance mailbox and compliance-source/sender/auth route when explicitly scoped | configured and verified 2026-06-03 | This is not an actor. Use only as source/sender/auth route when explicitly scoped. Legacy helper alias: `rb-compliance`. |
| `ioana-richmond-blackwood` | `ioana@richmondblackwood.com` | Human operator RB Google route | configured and verified 2026-06-02 | User approved the exact account and OAuth reconnect on 2026-06-02. Do not infer source/sender/auth from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR`; scope it explicitly. When this exact sender is approved, use saved Gmail signature `ioana general`. |
| `jp-richmond-blackwood` | `johnpaul.okolie@richmondblackwood.com` | Human operator RB Google route | configured and verified 2026-05-26 | Email is provisional in `internal/people-roles.md`. Legacy helper alias: `johnpaul-richmond-blackwood`. Confirm before treating as approved sender. |
| `simoneta-richmond-blackwood` | Needs confirmation | Human operator RB Google route | not configured | Confirm email before use. |

## 2026-05-26 Verification

Status: provisional.
Source: user instruction in Codex chat on 2026-05-26; Notion Google Persona Auth Migration Guide `https://www.notion.so/36be4130131481289808d08faf17d8f6`; local helper verification output.
Imported: 2026-05-26.
Review: Johnpaul's work email remains provisional in `internal/people-roles.md` until the team approves it as a sender; unrelated Eran/private MCP personas remain missing from the global store.

- `accounting-richmond-blackwood`: OAuth vault created under global Codex storage, backed by `accounting@richmondblackwood.com`, using the Richmond Blackwood OAuth client context. Refresh, identity, Gmail, Drive, Calendar, and Gmail sender verify-only checks passed on 2026-05-26.
- `jp-richmond-blackwood`: OAuth vault created under global Codex storage, backed by `johnpaul.okolie@richmondblackwood.com`, using the Richmond Blackwood OAuth client context. Refresh, identity, Gmail, Drive, Calendar, and exact From verify-only checks passed on 2026-05-26.

## 2026-06-02 Verification

Status: approved.
Source: user instruction in Codex chat on 2026-06-02 approving `ioana-richmond-blackwood` and `ioana-eip` persona setup; local helper verification output.
Imported: 2026-06-02.
Review: accounting and JP vaults were missing from this local global store during the same verification run; reconnect them only after exact approval if needed.

- `ioana-richmond-blackwood`: OAuth vault created under global Codex storage, backed by `ioana@richmondblackwood.com`, using the Richmond Blackwood OAuth client context. Refresh, identity, Gmail, Drive, and Calendar checks passed on 2026-06-02.
- `ioana-eip`: OAuth vault created under global Codex storage, backed by `ioana@eip.ventures`, using the EIP OAuth client context. Refresh, identity, Gmail, Drive, and Calendar checks passed on 2026-06-02.

## 2026-06-10 Ioana RB Signature Readback

Status: approved.
Source: user instruction in Codex chat and Gmail settings read-back for `ioana@richmondblackwood.com`.
Imported: 2026-06-10.
Review: re-read Gmail settings if the user says the saved signature changed.

- `ioana-richmond-blackwood`: Gmail settings read-back showed saved signature `ioana general`. Use it for approved outbound email bodies from `ioana@richmondblackwood.com` instead of a manual `Best, Ioana` or typed-name-only signoff. Plain-text equivalent for review: Ioana Surdu-Bob / Partner / Richmond Blackwood Limited / Office 2, 12a Lower Main Street, Lucan Co Dublin, K78 X5P8, Ireland / +353 1 230 8051 / `ioana@richmondblackwood.com` / `www.richmondblackwood.com`.

## Shared Global Personas

The RB helper code can also resolve shared global persona slugs that exist for other local Codex projects, such as `ioana-private`, `ioana-eip`, `eran-richmond-blackwood`, or other business/persona slugs recorded in the shared `~/.codex/google-personas/` store. A shared persona is still only an auth route; it does not change the active RB actor, Gmail source mailbox, or Gmail sender. As of 2026-06-02, `ioana-eip` is verified in this shared store as `ioana@eip.ventures`.

## Verification

Run no-login checks:

```bash
npm run google-auth:verify-personas
npm run google-auth:verify-oauth-vault
```

If a row reports a reconnect candidate, show the exact persona slug and command to the user. Do not run an interactive reconnect until that exact reconnect is approved.
