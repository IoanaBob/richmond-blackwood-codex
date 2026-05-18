---
name: rb-inbound-finance-routing
description: Handle finance-classified Richmond Blackwood inbound items. Use for invoices, receipts, expenses, payment notices/failures, contractor invoices, recurring client invoicing, finance evidence upload, and finance blockers.
---

# RB Inbound Finance Routing

Use this handler for finance-classified items from the inbound triage ledger.

## Required Context

- Read the finance sections of `processes/inbound-operating-triage.md`.
- Load `skills/rb-file-uploads/SKILL.md` before uploading, exporting, attaching, or verifying documents.
- Load client validation rules only when the trigger matches:
  - Workhub / Stein Commercial / Camden Street: `clients/Companies/RBL/invoices-payments-expenses.md`, `## Workhub Invoice Validation`.
  - AGL / AGILE LINCS / Byron / Syntentia weekly time or expense items: `clients/Companies/AGL/invoices-payments-expenses.md`, `## AGL Syntentia Weekly Invoicing`.

## Core Rules

- Do not create per-invoice or per-expense payment tasks.
- Routine invoices, receipts, payment reminders, payment failures, upcoming direct debits, and payment receipts are not Correspondence unless they include a separate non-finance operational request.
- De-duplicate by source message ID, invoice/receipt number, supplier + amount + date, and unique references.
- Expense/Invoicing records need verified source evidence or a clear blocker before the source item can complete.
- Apply Gmail `Triaged` only after the finance record is saved/updated and evidence verified, or after a verified finance no-op/correction-required result.

## Routing Logic

1. Identify billed party, supplier, company/client, amount, dates, invoice/receipt numbers, period, VAT/gross/net, and source files.
2. Query Business Partners before deciding Expense vs Invoicing.
3. If a matching Business Partner has associated contracts, fetch contract links before any Expense write.
4. If a usable contract exists, query related Invoicing records including paid/completed/booked and incomplete rows.
5. Match by invoice number, supplier, period, amount, date, and source metadata. Account for gross-vs-net/VAT differences.
6. If a matching record is already complete, record a verified no-op and do not create duplicates.
7. If a matching incomplete record needs evidence, attach/set the source file and verify readback.
8. If no Business Partner or contract applies, route to Expenses with the relevant company/client association after evidence is verified.
9. If the route is unclear, create/update a blocked finance follow-up only when destination and owner are clear; otherwise return a blocker to the master skill.

## Output

Return updated ledger rows with:

- `finance_result`
- created/updated record URLs
- evidence file URLs/readback result
- Gmail label/checkpoint recommendation
- owner/action if blocked
- Slack closeout section recommendation (`New expenses`, `Received invoices`, `Blocked / left open`, or none)
