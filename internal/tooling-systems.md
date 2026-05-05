# Tooling And Systems

Status: provisional.
Imported: 2026-05-04.
Sources: local landing/backend repos, local RB memory files, connector search summaries.

## Systems Observed

See [memory/systems-and-data.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/systems-and-data.md) for the main source map.

## Operational Data Flows

Provisional:

- Website lead form creates/updates leads through the backend.
- HubSpot receives contact/deal updates.
- Stripe checkout handles payment/order path for selected offers.
- Company expense documents can enter via company-specific parseroutes.
- Wise statements can be downloaded and uploaded to Lexoffice in backend code.
- Gmail and Slack contain operational history that should be imported selectively.
- Notion Client Databases hold structured client entities and processes.

## Review Needed

- Confirm which backend jobs are actively scheduled.
- Confirm current accounting software per client before importing records into client folders.
