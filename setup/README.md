# Setup And Verification

Status: provisional.

## Required Connectors

- Notion: required for Internal Knowledge Base and Client Databases backup.
- Google Drive: required for source documents and archive/client folder routing.
- Slack: required for operational history and channel context.
- Gmail: required for accounting, invoice, and client communication context.
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
git diff --check
```

Also run keyword scans for prior-template business terms before committing.

Run TypeScript checks only if TypeScript helpers are added later.

## Connector Safety

- Read before writing.
- Fetch database schemas before creating Notion database pages.
- Do not create client Notion pages until the company relation is clear.
- Do not create or move Drive files until the exact destination is clear.
