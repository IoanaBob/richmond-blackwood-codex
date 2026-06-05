# Accounting, Bookkeeping, And Payroll

Status: provisional.
Source: Notion company record, filing registrations, payroll filing/payment rows, internal tasks, `RB Porting to Sage Exploration`, and user review/live Notion read-back on 2026-06-05.
Imported: 2026-06-03; updated 2026-06-05.
Review: Confirm live Xero/SimplePay/Wamo status before acting on billing or payment-support rows.

## Accounting Setup

| Area | Current source value | Source | Notes |
| --- | --- | --- | --- |
| Accounting software | Xero | Notion company | Treat as current Notion source until accounting-system migration is approved. |
| Company email | `invoices@richmondblackwood.com` | Notion company | Company record email. |
| Accounting software email | Blank | Notion company | Confirm whether a software alias should be added. |
| Bank accounts | Two linked bank-account rows | Notion company | Do not copy account numbers or bank credentials into git. Fetch live rows only when needed for a specific approved finance workflow. |

`RB Porting to Sage Exploration` records a current strategy question: RB wants a practice-wide operating solution that reduces accounting-tool fragmentation across Ireland, Germany, and the UK, supports automation, lowers per-company software cost, and preserves Notion dashboards/automation unless the accounting system clearly becomes a better source of truth.

Source: `https://www.notion.so/33de41301314805ca8c5c4b429df2858`.

The document says the critical decision point is Germany; a full move is attractive only if Sage Germany works well enough. Treat Sage migration as open strategy, not current operating truth.

## Payroll

| Area | Status | Source | Notes |
| --- | --- | --- | --- |
| Payroll Tax registration | Registered | `https://www.notion.so/344e41301314800cb03dd1e3c72261c0` | Updated from `Overdue` to `Registered` on 2026-06-05 after user review; read back in Notion. |
| April 2026 payroll filing | Filed | `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Filed on 2026-05-19 after due date 2026-05-14. |
| April 2026 PAYE payment | Paid | `https://www.notion.so/365e413013148122813cd9da7e6530c4` | User confirmed paid on 2026-06-05; Notion row was updated and read back as `Paid`. |
| Future August 2026 payroll tax filing | Pending | `https://www.notion.so/372e41301314812392bff3e2d79934f4` | Due 2026-09-14. |
| Auto enrolment | Registered | `https://www.notion.so/2c6e4130131480358c05fc19f4d98f07` | Comments say RB is now enrolled with Auto enrolment. |

## Operational Admin Issues Affecting Finance

| Issue | Status | Source | Notes |
| --- | --- | --- | --- |
| Connect RBL debit card for SimplePay payroll billing | To Do; due 2026-05-28 | `https://www.notion.so/36ee4130131481028f58f198b235e43c` | SimplePay could not be paid through the new BOI credit-card setup. Task says Simoneta and Ioana agreed to connect an RBL debit card in Ioana's name when in office. Do not store card/security details in git. |
| Ask Wamo about RBL payment approval | To Do; due 2026-06-01 | `https://www.notion.so/36fe413013148181baf9dd56021d3d97` | Ask Wamo ETA for payment approval support. Do not send an outbound message until sender, recipient, and body are approved. |

## Ownership Boundary

Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should not be assigned to Ioana by default. Use the repo-wide owner rule in `internal/people-roles.md`: Simoneta is the default owner for bookkeeping/routine operations unless the source names another doer; approval belongs in `Review By` rather than a standalone task where the workflow supports it.
