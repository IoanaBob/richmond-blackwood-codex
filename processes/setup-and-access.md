# Setup And Access

Status: provisional.
Source: neutral setup boundary ported from local `everguard-research-codex`, adapted to RB helpers.
Imported: 2026-05-05.
Review: confirm whether SignNow is an active RB tool before requiring it for all operators.

## Purpose

Keep setup documentation limited to human setup: local tools, connector authentication, local credential-file placement, and health checks.

## Required Local Tools

- Git and GitHub CLI.
- Node.js `v18.7.0` and npm.
- Google Cloud CLI.
- Python 3 when document or validation tooling needs it.
- Poppler PDF tools when PDF inspection/rendering is needed.

## Local Files

Local-only files belong under `.codex-local/` or `.env`. Both are ignored by git.

- `.codex-local/google-oauth-client.json` for Gmail API/gcloud OAuth where needed.
- `.env` for local SignNow helper credentials if SignNow helpers are used.

Never commit credentials, tokens, OAuth JSON files, certificate bundles, private keys, or local service secrets.

## Health Checks

```bash
npm install
npm run typecheck
npm run drive:organize -- --help
npm run gmail:create-alias-draft -- --help
npm run signnow:upload -- --help
npm run signnow:get-document -- --help
git diff --check
```

If a live service check fails because authentication is missing, complete the relevant auth step. Do not print or commit secrets while debugging.
