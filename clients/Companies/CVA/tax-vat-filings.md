# Tax, VAT, And Filings

Status: provisional.
Source: Notion filing and filing-registration rows fetched 2026-06-04; Slack source message from Min on 2026-06-04.
Imported: 2026-06-04.
Review: Resolve the Slack proof-file download blocker and the filing-period row mapping before marking all current CVA CT filing work complete.

## Corporation Tax

| Record | Current status at readback | Due date | Filing period in Notion | URL | Notes |
| --- | --- | --- | --- | --- | --- |
| CVA - Corp Tax 2024 | Filed | 2025-09-20 | 2023-04-15 to 2024-04-14 | `https://app.notion.com/p/348e4130131480f3b492dbc4a7793427` | Already has a Notion-hosted submission file. Min's 2026-06-04 Slack note covers later periods, so this row was not changed. |
| CVA - Corp Tax 2025 | Pending | 2026-09-20 | 2025-04-15 to 2026-04-14 | `https://app.notion.com/p/348e41301314800cadfec17bc446947e` | Likely matches Min's completed `16/04/2025 - 15/04/2026` period, subject to one-day Notion/source-date reconciliation. Proof image upload is blocked by Slack file scope. |
| CVA - Corporation Tax -20 Sep 2027 | Pending | 2027-09-20 | 2026-04-15 to 2027-04-14 | `https://app.notion.com/p/348e413013148166941fe182f2cfef9f` | Future row; Min's 2026-06-04 message does not support marking this filed. |
| CVA corporation-tax registration | Overdue | 2023-09-21 | Filing cadence yearly | `https://app.notion.com/p/175e4130131480fc8446d68cd30eeb35` | Registration status may need review once filing records and proof uploads are reconciled. |

## Current Blockers

| Blocker | Source | Review |
| --- | --- | --- |
| Slack connector can identify but not download Min's two proof images because `slack_read_file` returned `missing_scopes`. | Slack file IDs `F0B82Q6TJR1`, `F0B895TTFUJ`; message `https://eipventuresworkspace.slack.com/archives/C0AM003C6B1/p1780570175938759` | Reconnect/reauthorize Slack with file-read scope or provide the two images through another approved source, then upload to Drive and attach/link to the matching Notion filing rows. |
| No distinct fetched filing row clearly maps to Min's completed `16/04/2024 - 15/04/2025` period. | Notion Filings search/fetch on 2026-06-04 | Confirm whether to create a missing filing row, correct the existing CVA period data, or map the first proof to another existing row not exposed by search. |
