---
title: RBL invoices, payments, and expenses
status: provisional
source: user instruction in Codex thread, 2026-05-08
imported: 2026-05-08
review: Confirm whether the Workhub plan amounts are VAT-exclusive and whether any additional companies have upgraded plans.
---

# RBL Invoices, Payments, And Expenses

## Current Finance Follow-Ups

- Status: provisional.
- Source: Notion tax-payment, filing, and task records reviewed on 2026-06-03.
- Imported: 2026-06-03.
- Review: Confirm live payment/billing status before escalating, paying, or closing any row.

| Item | Status | Source | Notes |
| --- | --- | --- | --- |
| RBL PAYE payroll tax Apr 2026 payment | Tax payment row `Due`; due date 2026-06-02; amount EUR 3,115.26 | `https://www.notion.so/365e413013148122813cd9da7e6530c4` | Current date is 2026-06-03. Confirm whether paid outside Notion before escalation. |
| April 2026 payroll filing | Filed | `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Filing row is filed, but linked payment remains a separate check. |
| Connect RBL debit card for SimplePay payroll billing | To Do; due 2026-05-28 | `https://www.notion.so/36ee4130131481028f58f198b235e43c` | Do not store card/security details. Confirm SimplePay billing route and outstanding amount before action. |
| Ask Wamo about RBL payment approval | To Do; due 2026-06-01 | `https://www.notion.so/36fe413013148181baf9dd56021d3d97` | Task explicitly says not to send until sender, recipient, and body are approved. |

## Workhub Invoice Validation

- Status: provisional.
- Source: user instruction in Codex thread, 2026-05-08 and 2026-05-10.
- Imported: 2026-05-10.
- Review: Confirm whether Workhub plan amounts are VAT-exclusive and whether any additional companies have upgraded plans.

### Trigger

Use this RBL invoice validation rule when an item is an invoice, renewal notice, payment notice, invoice correction request, or matched Notion invoice/expense record and one of these fields indicates Workhub, Stein Commercial, or Camden Street:

- sender;
- subject;
- body snippet;
- attachment filename;
- parsed invoice text;
- matched Notion record title or supplier.

### Applies Before

- Creating or updating an Expense.
- Creating or updating an Invoicing record.
- Completing the Workhub-specific validation before normal channel completion.
- Reporting the item in the final run report or Slack closeout.

### Rule

All Workhub / Stein Commercial / Camden Street invoices should be issued and addressed to **RICHMOND BLACKWOOD LIMITED**.

Approved Workhub plan schedule:

- CBMAX, Pacheco Cruz Limited (PCL), NA Capital Ventures Limited (NACV), and Konvi are on the upgraded/non-essential plan at **€199**.
- All other companies are on the essential plan at **€99**.

### Handling

- If the invoice matches the addressee and plan schedule, process it through the normal Expense/Invoicing path and report it normally.
- If Workhub sends an invoice addressed to a client company, with the wrong plan, or otherwise inconsistent with this schedule, do not process it as a payable expense.
- For an incorrect Workhub invoice, request or prepare a request for a corrected invoice, and keep any existing Notion Expense row only as a rejected/correction-required audit pointer.
- Leave the source channel item incomplete until the correction/review path required for that item is complete.
- If the user has already reviewed and approved a Workhub item as correct, do not reverse it during automation cleanup; report it as human-reviewed/approved.

### Current Workhub Invoice States

- Status: approved for CC-INV-19364; provisional for broader rule.
- Source: user instruction in Codex thread, 2026-05-08.
- Imported: 2026-05-10.
- Review: Keep checking future Workhub invoices against the addressee and plan rules.

The user confirmed `Workhub renewals May 2026 (CC-INV-19364)` is the only correct Workhub expense from the May 2026 batch and marked it approved in Notion. Automation should not reverse or relabel that human-reviewed approval.

The Workhub `CC-INV-19339` and `CC-INV-18370` records remain correction-required unless Workhub sends corrected invoices addressed to RICHMOND BLACKWOOD LIMITED and priced according to the approved plan schedule.
