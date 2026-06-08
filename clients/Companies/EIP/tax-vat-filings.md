# Tax, VAT, And Filings

Status: provisional.
Source: Notion company, filing-registration, filing, tax-payment, task, and internal tax-status records fetched on 2026-06-05; local repo process note `processes/ie-ros-filing-logging.md`; user instruction and live Notion updates/read-backs on 2026-06-07.
Imported: 2026-06-05; updated 2026-06-07.
Review: Verify live ROS/CRO/German authority status before treating any due, overdue, payment, deregistration, or filed position as settled.

## Tax-Residence Context

| Period | Source position | Source | Notes |
| --- | --- | --- | --- |
| Current company record | Ireland | `https://www.notion.so/b394acc6efaa48d3904cd0bad638e64d` | Company `Tax Residence` property reads Ireland. |
| 2021 | Germany | `Internal Companies Tax Statuses` `https://www.notion.so/19fe4130131480a4ad14f6e5496107f2` | Internal matrix says EIP was German tax resident in 2021. |
| 2022 | Germany | `Internal Companies Tax Statuses` | Internal note says EIP needs a nil German return for 2022. |
| 2023 | Ireland for the tax year; German trading under 180 days | User instruction 2026-06-07; `Internal Companies Tax Statuses` | User clarified 2023 was Ireland for the tax year, while EIP still traded in Germany for less than 180 days. Reconcile this against the internal note saying 2023 should be filed with taxes only from June 2023. |
| 2024 and 2025 | Ireland | `Internal Companies Tax Statuses` | Aligns with current Notion company tax-residence property. |

The internal tax-status document also says EIP corporation tax returns for 2022, 2023, and 2024 were due or under cleanup, and it records Irish VAT interest amounts for Sep-Oct and July-Aug periods. Treat this as an active cleanup pointer, not as final authority status.

## Filing Registrations

| Area | Current Notion status | Source | Notes |
| --- | --- | --- | --- |
| RBO | Registered | `https://www.notion.so/175e41301314805cb30bf4c933ddbf34` | One-off registration. |
| Annual Returns | Registered | `https://www.notion.so/175e4130131480c5a89df4004ea93754` | User review on 2026-06-07 said the registration is registered; live Notion status was updated/read back as Registered. Linked annual-return filing row is `EIP-28/07/2026- Annual Returns`, due 2026-08-06. |
| Irish VAT | Registered | `https://www.notion.so/175e41301314808d9926e5689763d9c9` | Bi-monthly filing/payment cadence; Notion payment reference shown as `3740939BH`. |
| Irish Corporation Tax | Registered | `https://www.notion.so/175e4130131480f3b12dea715b3e85e2` | Yearly cadence; active prepayments yes; prepayment cadence quarterly; linked tax-prepayment schedule exists in Notion. |
| RTD / annual VAT | Overdue | `https://www.notion.so/175e41301314803bac0ff7ed6903da20` | Yearly cadence; verify exact RTD backlog before creating duplicate tasks. |
| VIES | Overdue | `https://www.notion.so/175e41301314802cb871f931d53e4d3a` | Title typo was corrected from `VEIS` to `VIES` and read back on 2026-06-07. Status remains Overdue pending live filing review. Quarterly cadence. |
| German all-tax registration | Deregistered | `https://www.notion.so/176e41301314800d9508da97f8309f9b` | German corporation-tax/all-tax route, one filing linked. |
| Irish Payroll Tax | Overdue | `https://www.notion.so/176e4130131480d3b618e7707b545ce2` | Row title says payroll tax, jurisdiction IE, but the number/comments show `Betriebsnummer: 152500094`. Local process memory says ROS used PREM/payment reference `3740939BH`, so this identifier mismatch needs review. |
| German VAT | Deregistered | `https://www.notion.so/cbe65719166a45fb95975204fcb74fdb` | Quarterly cadence while active. |
| VBG accident insurance | Registered | `https://www.notion.so/18ae413013148071beddd12c62835a8f` | Source row contains registration details. Credential-like PIN data was deliberately excluded from git. |
| My Future Fund / Auto Enrolment | Registered | `https://www.notion.so/2c6e41301314801e87e6ceb8d9a350f8` | Irish auto-enrolment registration. |

## Current Filing And Payment Status

| Item | Status in Notion | Source | Notes |
| --- | --- | --- | --- |
| EIP VAT3 Mar/Apr 2026 filing | `Filed`; filed on logging date 2026-06-08; ROS Date Filed 2026-05-25 | Filing `https://app.notion.com/p/311e41301314817fba62fff1e417f8e5`; Drive proof `https://drive.google.com/file/d/1l8EaX45SsUSXrUhk3aRqGgwSxppQw6gf/view?usp=drivesdk` | ROS Revenue Record > Returns > VAT showed registration `3740939BH`, VAT3 period 01/03/2026-30/04/2026, due 19/05/2026, issue 10/04/2026, Date Filed 25/05/2026. Notion `Submission`, `Status`, and `Filed on` read back populated. Payment Due was left unchanged and no Tax payment row was created because the proof page did not show a balance and Charges & Payments was unavailable during the run. Local proof capture was JPEG data in `/private/tmp/eip-ros-vat3-2026-03-01_2026-04-30-proof.png`, 164325 bytes, SHA-256 `01703f7ef87bd57b33395cec9c6700042554d8cc1d24b2984a1d4884795c5e01`. |
| EIP 2024 annual returns row | Pending; due 2026-08-06; period 2024-01-01 to 2024-12-31 | `https://www.notion.so/310e4130131480feb593fbcfee338e4a` | This is the annual-return filing row behind the user's 2026-06-07 due-date question. The related registration is now Registered; the filing row still needs separate status review because it reads Pending while comments say court extension was granted, filing was completed, and files uploaded. |
| EIP VAT3 Jan/Feb 2026 tax payment | Overdue; due 2026-03-23; amount EUR 5,415 | `https://www.notion.so/2f1e41301314809a8a9fe1680128c297` | User does not know current payment status and assumes payment may have happened by direct debit. Verify bank/ROS/direct-debit evidence before marking paid or escalating. |
| EIP PAYE payroll tax Apr 2026 payment | Due; due 2026-06-02; amount EUR 6,002.59 | `https://www.notion.so/365e41301314815da024f803b1fa5014` | User does not know current payment status and assumes payment may have happened by direct debit. Verify bank/ROS/direct-debit evidence before marking paid or escalating. |
| Bi-monthly EIP VAT filing task | To Do | `https://www.notion.so/331e413013148190b039c79561c6f606` | Task requires Xero bookkeeping review, expense review in Notion, filing evidence upload, and proof before completion. |

## Process Notes

`processes/ie-ros-filing-logging.md` records a prior ROS filing/logging observation: EIP payroll in ROS used PREM/payment reference `3740939BH`; the linked Notion payroll registration showed `Betriebsnummer: 152500094`, which was not a ROS PREM option. Keep both visible until reconciled.
