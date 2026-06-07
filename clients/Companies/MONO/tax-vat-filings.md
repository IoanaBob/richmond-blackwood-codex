# Tax, VAT, And Filings

Status: provisional.
Source: Notion company record and filing registration/filing/task records fetched on 2026-06-07; Notion Communication `Revenue Letter - VAT Repayment EUR 853.00`; Drive `VAT DOCS` folder list.
Imported: 2026-06-07.
Review: Reconcile overdue/stale status conflicts before treating filings as complete or overdue.

## Tax Position

MONO is recorded in Notion as incorporated in Ireland and tax resident in Ireland.

## Filing Registrations

| Registration | Type | Jurisdiction | Status | Cadence | Due / first filing context | Source | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MONO - 4222495IH - VAT | VAT | IE | Overdue | Bi-monthly filing and bi-monthly tax payment cadence | Due date recorded as 2024-04-22; formula next filing date present | `https://app.notion.com/p/175e41301314801c87efde677440cdcf` | Confirm whether `Overdue` is real or stale; task records show ongoing recurring VAT filing work. |
| MONO - CT04222495IH - Corporation Tax | Corporation Tax | IE | Registered | Yearly | First filing date 2023-01-20; due date recorded as 2024-04-22 | `https://app.notion.com/p/175e413013148094b087eec0cf862a05` | Registration row is registered; verify linked CT filing rows before external reliance. |
| MONO - CT04222495IH - Annual Tax | Annual Tax Filing | IE | Registered | Yearly | First filing date 2024-01-10; linked tax payment rows exist | `https://app.notion.com/p/175e41301314808c8b5cd5547205ef33` | Payment rows were not fetched in this pass; review exact amounts/statuses before payment action. |
| MONO - 733392 - Annual Returns | Annual Returns | IE | Overdue | Yearly | First filing date 2023-07-18; due date 2024-07-20 | `https://app.notion.com/p/175e4130131480bf9f5de742833360cd` | Status conflicts with a linked annual-return filing row marked Filed on 2026-01-26. |
| MONO - Pending - VEIS | VIES | IE | Overdue | Quarterly | Due date recorded as 2024-04-22 | `https://app.notion.com/p/175e41301314807188cdeb55d21f27af` | Title appears misspelled as `VEIS`; confirm whether this should be corrected to `VIES` and whether overdue status is real. |
| MONO - Pending - RTD | RTD | IE | Overdue | Yearly | Due date recorded as 2024-04-22 | `https://app.notion.com/p/175e41301314806d9b8ec843060c1987` | Confirm whether RTD overdue status is real. |
| MONO - RBO | RBO | IE | Registered | One-off | Due date recorded as 2024-04-22 | `https://app.notion.com/p/175e4130131480d8bb91feae63cf7184` | No issue identified in this pass. |

## Specific Filing Rows And Correspondence

| Record | Status / detail | Source | Review |
| --- | --- | --- | --- |
| MONO-2025/07/20-Annual Returns | Filed on 2026-01-26; filing period 2024-01-01 to 2024-12-31; payment due EUR 519 | `https://app.notion.com/p/1c8e4130131480ea95d8cebfd7b153fe` | Reconcile with Annual Returns registration row still marked Overdue. |
| Revenue Letter - VAT Repayment EUR 853.00 | Incoming, long-living, Done; sent/received 2025-12-11; document title says Notice of returns outstanding and current estimates | `https://app.notion.com/p/2c6e4130131480b3bc4bd8f6ebc62b08` | Keep the Revenue letter available when reviewing VAT/RTD/VIES overdue rows. |
| MONO - add annual VAT filing rows for 2023 and 2024 corp-tax years | Archived duplicate; comment says superseded by consolidated RB Clients VAT task | `https://app.notion.com/p/373e4130131481b1ad0bdc26d0024d12` | The consolidated task checklist does not include MONO, even though the duplicate was for MONO. Confirm whether MONO annual VAT filing rows remain in scope. |
| File annual VAT for affected RB clients | To Do; consolidated RB Clients VAT task | `https://app.notion.com/p/373e4130131481e495f1e2d22008e4ed` | Checklist currently names NACV, CLV, AGL, CBMAX, WEW, and PCL, not MONO. |

## Drive Evidence

Canonical folder candidate has `VAT DOCS`: `https://drive.google.com/drive/folders/1QdIbzQj9bRrRM-1dt5oUIqAzd9DutONd`.

Listed VAT docs include three `Monochromatic Renewal Apr 17 2025` PDFs. Do not infer contents until the PDFs are fetched or opened through the approved Drive route.
