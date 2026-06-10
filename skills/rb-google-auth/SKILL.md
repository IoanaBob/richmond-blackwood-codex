---
name: rb-google-auth
description: Use when Richmond Blackwood repo-local helpers need Google authentication for Drive or Gmail through the shared global Codex persona/OAuth store.
---

# RB Google Auth

Use this skill when a repo-local helper needs Google Drive or Gmail access through the shared global Codex persona/OAuth store.

Read `memory/google-auth.md` and `memory/google-personas.md` before Google auth work.

## Rules

- Durable Google auth artifacts belong under `~/.codex`, not worktree-local `.codex-local`.
- `~/.codex/google-personas/` is the shared global persona store used by this repo, personal-codex, and other local Codex projects.
- Default to no-login/no-reauth. Routine helpers must try the per-persona OAuth vault, saved persona ADC, account-token fallback, and configured connectors before any auth flow.
- Do not run `gcloud auth login`, `gcloud auth application-default login`, browser OAuth, or `google-auth:reconnect-oauth-vault --interactive` unless the user explicitly approves that exact persona/action.
- Do not ask the user to paste tokens, RAPT values, client secrets, or credential material.
- Gmail sender-context OAuth client files live under `~/.codex`, for example `~/.codex/google-oauth-client.richmondblackwood.json`.
- Gmail helpers must not use IMAP, app passwords, mailbox passwords, or keychain-stored mail credentials.
- Do not send Gmail messages automatically from local Gmail draft helpers; those helpers create, verify, or delete drafts only.

## Helper Behavior

Repo-local Gmail draft helpers default to `--auth-source auto --auth-login never`: try the persona OAuth vault first, then saved ADC/account-token fallback, without starting browser auth.

Drive helpers default to the same no-login behavior and accept `--auth-source auto|vault|adc|account|gcloud|direct-adc`, `--account-email`, `--gcloud-config-dir`, and `--persona-slug`.

Use `--auth-login auto` or `--auth-login always` only after explicit user approval for the exact Google auth action.

If auth appears to be requested again, first verify the repo helper path, intended persona slug, `CLOUDSDK_CONFIG`, stale `GOOGLE_APPLICATION_CREDENTIALS` / `CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE` overrides, available vault/ADC credentials, and outside-sandbox token-refresh writes before asking the user to approve reauth.

Recovery and verification commands:

```bash
npm run google-auth:verify-personas
npm run google-auth:verify-oauth-vault
npm run google-auth:sync-oauth-vault
npm run google-auth:recover-oauth-clients
npm run google-auth:reconnect-oauth-vault -- --persona <persona-slug> --interactive
```
