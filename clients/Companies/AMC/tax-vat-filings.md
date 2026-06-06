# Tax And VAT Filings

Status: provisional.
Source: Notion filing registrations, tax prepayment records, VAT filing/task records, WhatsApp, Gmail, Drive, Slack, and user instruction reviewed on 2026-05-18.
Imported: 2026-05-18.
Review: Confirm Q1 2026 VAT and Q4 2025 VAT status through the separate VAT review, confirm missing-invoice resolution, and confirm the P&L/electronic balance-sheet submission status.

## Company Tax Position

AMC is recorded in Notion as tax resident in Germany. The company has German registration records for corporation tax, trade tax, VAT, payroll-related filings, and related tax prepayment schedules.

Do not copy exact Finanzamt bank details, payment references, certificate filenames, ELSTER credential material, or attachment identifiers into git. Use the live Notion filing registration and prepayment records when exact details are needed.

## High-Signal Registration Records

| Registration | Notion record | Status | Notes |
| --- | --- | --- | --- |
| Corporation tax | `https://www.notion.so/1e9e41301314813b872def91550763af` | Registered | Active quarterly prepayments are recorded in Notion. |
| Trade tax | `https://www.notion.so/1e9e4130131481f59025c2cb4dacef13` | Registered | Active quarterly prepayments are recorded in Notion. |
| VAT | `https://www.notion.so/1e9e4130131481049c87d2d4cdcaf38f` | Registered | Filing cadence in Notion is quarterly. |
| VAT prepayment schedule | `https://www.notion.so/1fce413013148070937fe12be666dfd9` | Pending | Exact payment details remain in Notion only. |

## Current Filing State

Status: provisional.
Source: user instruction on 2026-05-18; WhatsApp 2026-05-18; Notion VAT filing/task records.
Imported: 2026-05-18.
Review: Confirm live filing status through the separate VAT review.

- Initial user instruction: AMC is on time with company filings except VAT Q1 2026, which is booked and pending filing.
- User clarification: VAT Q1 2026 and the Slack Q4 2025 VAT concern both need checking through a separate VAT skill, so do not treat either status as settled from this context import.
- WhatsApp on 2026-05-18: RB is working on Q1 books and missing invoices; Aaron believes he uploaded support through April, while RB saw missing invoices and planned to share a missing-file list.
- Slack on 2026-05-18 asked internally whether Q4 2025 appeared unfiled for AMC and other clients. Leave this open for the separate VAT review.

## Related VAT Tasks And Filings

| Item | URL | Current note |
| --- | --- | --- |
| AMC VAT filing extension | `https://www.notion.so/330e4130131481b2b798e9b97f8111d5` | To Do as of Notion read; intended to extend German VAT filing by one month. |
| Historical quarterly extension task | `https://www.notion.so/330e413013148176adbffbc0b20c20b2` | Marked Done in Notion on 2026-03-27. |
| VAT Q3 2025 filing | `https://www.notion.so/1c7e41301314803ea89be0b4e624c565` | Filed in Notion; review exact payment details in Notion only. |
| Annual German VAT registration | `https://www.notion.so/377e413013148169b64bf17b8f3206e3` | Created on 2026-06-06 as the yearly DE VAT registration layer for annual VAT filing rows; due / first filing 2027-03-01 for first annual period 2025-02-11 to 2025-12-31. |
| AMC - 2025 Annual VAT return | `https://www.notion.so/376e4130131480c7bfd8f3b4b1e4e926` | Existing manual annual VAT row renamed from generic title and linked to the annual German VAT registration on 2026-06-06; period 2025-02-11 to 2025-12-31; due 2027-03-01. |
| VAT prepayments due in 2026 | `https://www.notion.so/330e4130131481919f34c9b4b684ed8a` | Marked Done in Notion; comments say related payments were paid. |
| 2025 unpaid VAT letter task | `https://www.notion.so/330e4130131481b5be0adcb98a8d5b80` | In Progress in Notion; use the live record for exact balances. |

## Payroll And ZM/VIES Audit Pass 2026-06-06

Status: provisional.
Source: live Notion payroll registration and filings read on 2026-06-06; current AMC contract/customer records.
Imported: 2026-06-06.
Review: Recheck invoice-level customer VAT data if AMC has EU VAT-numbered business customers outside Germany.

Payroll Tax: no new payroll rows were created. The AMC Payroll Tax registration already has linked equivalent payroll filing rows from February 2025 onward.

ZM/VIES: no German ZM/VIES rows were created from the current evidence. The reviewed customer context was German or non-EU, including Riot Games Services GmbH and Echo/UVS LLC, so it does not support a German ZM row from this pass.

## Personal / Gewerbe Spillover

Status: provisional.
Source: user instruction on 2026-05-18; WhatsApp and Notion personal-tax/garnishment records.
Imported: 2026-05-18.
Review: Do not treat this as AMC company tax unless the filing record explicitly links to the company. The operational crisis is tied to Aaron's prior personal/freelancer registration.

The previous accountant did not file Aaron's 2023 and 2024 personal tax returns. RB filed both. During that work, RB found that Aaron had been registered as a Gewerbe and therefore had trade tax and VAT obligations that were also not filed. User clarified that the open catch-up periods are 2023, 2024, and Q1 2025; Aaron was deregistered after Q1 2025.

Finanzamt asked for P&L / balance-sheet support for 2023 and 2024. User clarified to follow the source dates rather than the earlier "today" shorthand: WhatsApp says profit/loss is due by 2026-05-19 at latest, and the Notion task `Prepare P&L and Balance Sheet for Aaron` says the authority deadline is before 2026-05-22. Confirm actual transmission evidence before treating this as complete.

Detailed personal-tax, payment-plan, and bank-garnishment context is routed to `../../Individuals/Aaron Richard Chamberlain/personal-tax-returns.md` and `../../Individuals/Aaron Richard Chamberlain/bank-accounts.md`.
