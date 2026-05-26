# Tax, VAT, And Filings

Status: provisional.
Source: Notion company, filing registration, filing, task, and internal document records reviewed on 2026-05-26.
Imported: 2026-05-26.
Review: Verify live filing status in ROS/HMRC/Notion before treating any due, overdue, filed, refund, or payment position as settled.

## Filing Registrations

| Area | Current Notion status | Source | Notes |
| --- | --- | --- | --- |
| Irish tax residence | Ireland on company record | `https://www.notion.so/b91261a784104aedb4a97494cd325bbb` | Company record has direct German VAT No, TAIN, and UTR fields blank. |
| Irish VAT | Registered | `https://www.notion.so/5326d2f36428405896258a0710fc4145` | Registration cadence is bi-monthly; the registration title carries the Irish tax/VAT reference. |
| Irish payroll tax | Registered | `https://www.notion.so/175e4130131480daba02e86440da4d9a` | Monthly filing cadence. |
| UK VAT | Registered | `https://www.notion.so/2aae4130131480c482c7d68cfa582f58` | Quarterly cadence. Completed automation tasks are misnamed as IE VAT while describing UK VAT. |
| German VAT | Deregistered | `https://www.notion.so/175e4130131480efb420f2d460c8ff6b` | Treat as historical/deregistered unless authority confirms an active German registration. |
| Annual returns / RBO | Registered per linked records | Company relation map and calling-bot source context | Fetch the specific filing registration before public statements or filing work. |

## Current Filing Issues

| Issue | Status in Notion | Source | Review needed |
| --- | --- | --- | --- |
| Finish April books and file VAT after ROS demand | To Do, high priority, due 2026-05-18 | `https://www.notion.so/364e41301314813ab91fdc0d9a521904` | As of 2026-05-26, due date is past. Task says books were done through March and April needs completion so VAT can be filed; coordinate ROS demand/payment and refund follow-up. |
| Revenue VAT refund support request | In Review | `https://www.notion.so/33de4130131480bcb7a8d3a3e867243a` | Revenue requested support for Jan/Feb 2026 VAT refund: business description, sales/purchase schedule, top invoices making up the refund, and business/official address. |
| IE VAT filing for Mar-Apr 2026 | Due, due date 2026-05-19 | `https://www.notion.so/311e4130131481229f94cbea1f8e459f` | Status is stale or overdue as of 2026-05-26 unless filed outside the fetched record. |
| VIES filing for Jan-Mar 2026 | Overdue, due date 2026-04-21 | `https://www.notion.so/311e41301314811894dddf22779d5f1b` | Needs live status check. |
| Future VAT filing title mismatch | Pending | `https://www.notion.so/33be4130131481bc8b0fdde8f5e5bf22` | Title says `19 Jun 2026` but due-date property is 2026-07-19 for May-Jun period. |
| Payroll tax filing for May 2026 | Pending, due 2026-06-14 | `https://www.notion.so/365e4130131481a68a14c27005353a55` | No issue found beyond normal pending status. |

## Annual Returns

| Record | Status | Source | Notes |
| --- | --- | --- | --- |
| Konvi-2025-05-25-Annual Returns | Filed | `https://www.notion.so/19ee413013148076a978d33491c21eba` | Due 2025-05-25 and filed 2025-07-13. The underlying annual return had previously been returned for missing notes and then resubmitted. |
| Konvi annual returns task | Done | `https://www.notion.so/332e41301314818385edd39bee0c11e7` | Points to the 2025 annual-return filing record. |
| Resubmit Konvi Annual Return | Done | `https://www.notion.so/332e4130131481e6ba39f3235e21fcc4` | Returned annual return needed compliant financial-statement notes; marked complete. |
| Confirm/file annual return due 25 May 2026 | Archived | `https://www.notion.so/360e4130131481f786e3c3555feb6c71` | Archived because the annual-return filing is handled through the Richmond Blackwood workflow; still worth checking whether the live 2026 filing row exists. |

## VAT Process Context

The internal document `Fixing VAT` records a general process where invoices before a VAT number may be treated as deposits and retroactively corrected once the VAT number exists. It also says reverse-charge invoices can be created before a company is VAT registered, but VAT reporting should happen retroactively once the VAT number is received.

Sources:

- `Fixing VAT`: `https://www.notion.so/1cbe413013148096a633f8d41011cb1e`.
- `Tax /VAT Numbers Coordination`: `https://www.notion.so/191e413013148079bea3cc22e3d972a8`.
