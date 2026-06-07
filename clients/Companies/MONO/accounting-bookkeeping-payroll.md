# Accounting, Bookkeeping, And Payroll

Status: provisional.
Source: Notion company record, Notion tasks, Gmail connector search/read, WhatsApp MCP read, and Drive list-folder on 2026-06-07.
Imported: 2026-06-07.
Review: Confirm current Xero setup, recurring invoice automation, and whether Workhub/Google Workspace/Magnific/Framer expenses are all attached to Notion expense rows.

## Accounting Setup

| Item | Current context |
| --- | --- |
| Accounting software | Xero, per Notion company record. |
| Company email | `accounts+mono@richmondblackwood.com`. |
| Older email context | Notion company comment says old company email was `hi@monochromatic.io`. Gmail still receives vendor invoices at `hi@monochromatic.io` and `designer@monochromatic.io`. |
| Recurring invoice/payment process | WhatsApp and Gmail context show MONO invoice/payment work is handled through the general weekly invoice/payable process, with ad hoc approvals in the MONO WhatsApp group when needed. |

## Active Bookkeeping / Accounting Tasks

| Task | Status | Source | Operating consequence |
| --- | --- | --- | --- |
| Monochromatic now VAT registered - change all internal invoices to add VAT | To Do | `https://app.notion.com/p/332e4130131481f88e7ce69725f1dbd5` | Internal automatic invoices should be changed to include VAT for regular MONO/group transactions. Task references Drive folder `VAT DOCS` for payments to adjust. |
| [By-monthly] Monochromatic Ltd VAT Filing | To Do | `https://app.notion.com/p/332e4130131481478688ee4c424f650d` | Review bookkeeping and file in Xero; before completion, check Xero bookkeeping, Notion expenses booked for the period, and filing evidence uploaded to Notion. |
| Google Workspace invoices: capture amounts + book (EIP + Monochromatic) | Source search result | `https://app.notion.com/p/35ae413013148100a99cd47cd2934830` | Google Workspace invoice capture/allocation appears relevant to MONO and EIP; fetch before acting. |
| EIP to charge subsidiaries for tools offered to the group | Open EIP-side task | `https://www.notion.so/331e4130131481559e4ef88d5e247918` | EIP may need to recharge or split tool/subscription costs among RBL, MONO, and EIP. Keep EIP-side logic in `../EIP/`. |

## Payroll

No MONO payroll/employment record was imported in this pass. If payroll rows exist, fetch the Employment/Payroll source before recording them here.

## Source Observations

- Gmail read on 2026-06-07 found Google Workspace, Framer, Magnific, and Workhub invoice/payment emails for MONO-related email addresses. Payment profile IDs, portal tokens, and payment method fragments were intentionally excluded from git.
- WhatsApp read on 2026-06-07 found recent MONO group payment/invoice approval messages, including weekly processing expectations and approval requests. Raw messages and media were intentionally not stored.
