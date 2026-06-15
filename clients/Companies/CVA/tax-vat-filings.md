# Tax, VAT, And Filings

Status: provisional.
Source: Notion filing and filing-registration rows fetched 2026-06-04; Slack source message from Min on 2026-06-04; CORE draft readback on 2026-06-15.
Imported: 2026-06-04; updated 2026-06-15.
Review: Resolve the Slack proof-file download blocker before attaching the proof images to the completed corporation-tax filing rows. Complete the H15 draft only after the resolution details, Revenue no-objection letter, and newspaper publication evidence are available.

## Corporation Tax

| Record | Current status at readback | Due date | Filing period in Notion | URL | Notes |
| --- | --- | --- | --- | --- | --- |
| CVA - Corp Tax 2024 | Filed | 2025-09-20 | 2023-04-15 to 2024-04-14 | `https://app.notion.com/p/348e4130131480f3b492dbc4a7793427` | Already has a Notion-hosted submission file. Min's 2026-06-04 Slack note covers later periods, so this row was not changed. |
| CVA - Corporation Tax -20 Sep 2025 | Filed | 2025-09-20 | 2024-04-16 to 2025-04-15 | `https://app.notion.com/p/375e41301314814598d8fe13111ba948` | Created on 2026-06-04 from Min's Slack completion source. `Filed on` set to 2026-06-04 and `Payment Due` set to 0. Proof image upload is blocked by Slack file scope. |
| CVA - Corporation Tax -20 Sep 2026 | Filed | 2026-09-20 | 2025-04-16 to 2026-04-15 | `https://app.notion.com/p/348e41301314800cadfec17bc446947e` | Renamed/updated from `CVA - Corp Tax 2025` on 2026-06-04 from Min's Slack completion source. `Filed on` set to 2026-06-04 and `Payment Due` set to 0. Proof image upload is blocked by Slack file scope. |
| CVA - Corporation Tax -20 Sep 2027 | Pending | 2027-09-20 | 2026-04-15 to 2027-04-14 | `https://app.notion.com/p/348e413013148166941fe182f2cfef9f` | Future row; Min's 2026-06-04 message does not support marking this filed. |
| CVA corporation-tax registration | Registered | 2023-09-21 | Filing cadence yearly | `https://app.notion.com/p/175e4130131480fc8446d68cd30eeb35` | Updated from `Overdue` to `Registered` on 2026-06-04 after Min confirmed both current CT filings are complete and CT is up to date. |

## CRO H15 Voluntary Strike-Off

| Record | Current status at readback | Due date | Filing period in Notion | URL | Notes |
| --- | --- | --- | --- | --- | --- |
| CVA - Form H15 voluntary strike-off draft | Pending upload | n/a | n/a | `https://app.notion.com/p/380e413013148104866ce81d06f946ce` | CORE draft `SR8885667` created and verified under My Filings on 2026-06-15 for register number `706165`. Company details are auto-filled. Do not upload, sign, submit, or pay until the missing resolution, Revenue no-objection, and newspaper-publication fields are sourced and reviewed. |

## Current Blockers

| Blocker | Source | Review |
| --- | --- | --- |
| Slack connector can identify but not download Min's two proof images because `slack_read_file` returned `missing_scopes`. | Slack file IDs `F0B82Q6TJR1`, `F0B895TTFUJ`; message `https://eipventuresworkspace.slack.com/archives/C0AM003C6B1/p1780570175938759` | Reconnect/reauthorize Slack with file-read scope or provide the two images through another approved source, then upload to Drive and attach/link to the matching Notion filing rows. |
| CORE H15 draft cannot be completed beyond the shell draft. | CORE draft `SR8885667`; Notion filing row `https://app.notion.com/p/380e413013148104866ce81d06f946ce`; task `https://app.notion.com/p/379e413013148166b1cbf0774375444c` | Add resolution text, resolution date, whether the resolution passed in writing or at a meeting, Revenue letter of no objection, advertisement PDF, newspaper selection, publication date, and 30-day/prescribed-form confirmation before upload, signature, submission, or payment. |
