# Setup And Verification

Status: provisional.

## Required Connectors

- Notion: required for Internal Knowledge Base and Client Databases backup.
- Google Drive: required for source documents and archive/client folder routing.
- Slack: required for operational history and channel context.
- Gmail: required for accounting, invoice, and client communication context.
- SignNow: optional/generic helper support for document upload, review links, and status checks where RB uses SignNow.
- GitHub or local git: required for repo sync if publishing changes.

## Confirmed On 2026-05-04

- Notion connection works.
- RB Internal Knowledge Base database was fetched.
- Client Databases page was fetched.
- Client Notes & Updates database was fetched.
- Companies database was fetched.

## Local Repo Checks

Run:

```sh
git status --short --branch
npm install
npm run typecheck
git diff --check
```

Also run keyword scans for prior-template business terms before committing.

Helper smoke checks:

```sh
npm run drive:organize -- --help
npm run drive:upload -- --help
npm run drive:export-google-doc-to-drive -- --help
npm run gmail:create-alias-draft -- --help
npm run signnow:upload -- --help
npm run signnow:get-document -- --help
npm run signnow:signature-status -- --help
npm run pdf:prepare-signing-plan -- --help
```

## Local Configuration

Local-only files belong under `.codex-local/` or `.env`; both are ignored by git.

- Gmail API draft helpers use gcloud application-default OAuth with `.codex-local/google-oauth-client.json` when Google's default gcloud OAuth client is blocked for Gmail scopes.
- Do not use Gmail IMAP, app passwords, or stored mailbox passwords for repo-local helpers.
- SignNow helpers use `.env` only for local SignNow API credentials. Never commit or print those values.
- Gmail client-facing drafts must save from `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`.

## Connector Safety

- Read before writing.
- Fetch database schemas before creating Notion database pages.
- Do not create client Notion pages until the company relation is clear.
- Do not create or move Drive files until the exact destination is clear.
