# Invoices, Payments, And Expenses

Status: provisional.
Source: Notion company, contract, tax-payment, task, and communication records fetched on 2026-06-05.
Imported: 2026-06-05.
Review: Confirm live invoice/payment status in Notion, Xero, banking, and contract rows before sending, paying, or marking complete.

## Intercompany Invoicing

Active EIP intercompany contracts exist for Konvi, Richmond Blackwood, and Mono.

| Contract | Amount in Notion | Source | Notes |
| --- | --- | --- | --- |
| EIP Ventures - Konvi Limited | EUR 17,525 monthly fixed | `https://www.notion.so/2d2e4130131480128b5bce484c42c388` | Extra invoice details list Company tools EUR 650, Employee tools & perks EUR 9,504, Contractors EUR 11,050, and Management fees EUR 15,000. Those lines total EUR 36,204, not the EUR 17,525 contract amount, so confirm which value should drive invoices and whether the component lines are stale, partial, or non-additive. |
| EIP - Richmond Blackwood | EUR 10,446 monthly fixed | `https://www.notion.so/2d2e413013148061b181dfb2b0ff3bfe` | Component lines reconcile to the amount field. |
| EIP - Mono | EUR 2,653 monthly fixed | `https://www.notion.so/2d2e41301314809f8c81e2d75992906f` | Component lines reconcile to the amount field. |

Historical intercompany contracts were also fetched and are summarized in `contracts-and-authority.md`.

## Expense / Tool Allocation

Open task `EIP to charge subsidiaries for tools offered to the group` tracks costs paid by EIP that may need recharging or allocation among EIP, RBL, and Monochromatic.

Source: `https://www.notion.so/331e4130131481559e4ef88d5e247918`.

The source text mentions HubSpot and GSuite/Richmond charges. Treat exact amounts as task-source details to verify in Notion/Xero/bank data before booking or invoicing.

## Payment Checks

| Payment / obligation | Status in Notion | Source | Notes |
| --- | --- | --- | --- |
| VAT3 Jan/Feb 2026 | Overdue; due 2026-03-23; EUR 5,415 | `https://www.notion.so/2f1e41301314809a8a9fe1680128c297` | Confirm paid/stale status before escalation. |
| PAYE payroll tax Apr 2026 | Due; due 2026-06-02; EUR 6,002.59 | `https://www.notion.so/365e41301314815da024f803b1fa5014` | Confirm whether paid after the row was last updated. |
| AIB hire purchase - BYD Seal | Active contract; EUR -804 monthly fixed | `https://www.notion.so/277e413013148036b99cce2cdb7787d8` | Finance/asset obligation. |
| Debt - Mortgage | Active contract; EUR -1,772.66 monthly fixed | `https://www.notion.so/2d2e41301314805395b6f380738ad6ce` | Debt/mortgage obligation. |

## Invoice Routing Notes

Do not copy raw invoice attachment URLs, bank details, payment account numbers, card details, or document access links into git. For sending or payment work, use the live Notion Invoices/Contracts/Expenses rows and approved RB outbound communication rules.
