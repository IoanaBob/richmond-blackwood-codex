---
name: rb-google-auth
description: Use when Richmond Blackwood repo-local helpers need Google authentication for Drive or Gmail through gcloud.
---

# RB Google Auth

Use this skill when a repo-local helper needs Google Drive or Gmail access through `gcloud`.

## Rules

- Helper code should trigger the relevant `gcloud` auth flow itself.
- Do not require `.env` variables or `GOOGLE_APPLICATION_CREDENTIALS` for Drive or Gmail helper auth.
- Drive helpers use `gcloud auth login --enable-gdrive-access`.
- Drive helpers must not require OAuth client JSON files.
- Gmail draft helpers must always use `gcloud auth application-default login --client-id-file=<path> --scopes=...` for Gmail drafting, sender verification, reply context reads performed by the helper, and unsafe-draft deletion.
- Gmail OAuth desktop client files live at `.codex-local/google-oauth-client.json` by default. This path is gitignored and must not be committed.
- Gmail helpers must not use IMAP, app passwords, mailbox passwords, or keychain-stored mail credentials.
- Do not send Gmail messages automatically from local Gmail draft helpers; those helpers create, verify, or delete drafts only.

## Helper Behavior

Repo-local Gmail draft helpers default to `--auth-login always`: run the gcloud application-default login step before Gmail drafting actions so the drafting path is always gcloud-managed.

Drive helpers may default to `--auth-login always` because Drive uses account auth plus `--enable-gdrive-access`.

Use `--auth-login never` only for verification or CI contexts where interactive browser auth is not allowed.
