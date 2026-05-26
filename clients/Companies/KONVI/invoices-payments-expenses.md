# Invoices, Payments, And Expenses

Status: provisional.
Source: Notion company, contract, business partner, invoice/payment relation summaries, and task records reviewed on 2026-05-26.
Imported: 2026-05-26.
Review: Confirm live invoicing metadata and whether deferred RB fee amounts should be separately tracked in an operating row.

## RB Fee And Billing

The Notion company record lists monthly fee to RB as EUR 9,500. The active `Konvi -> RB Monthly` contract also records EUR 9,500 monthly, with extra invoice details saying that until Konvi recovers liquidity it pays EUR 6,000 plus VAT out of the invoice and later pays back the difference.

Source: `https://www.notion.so/33be413013148032907afcac7ba0be3b`.

## Business Partner Metadata

| Record | Source | Issue |
| --- | --- | --- |
| `Konvi Limited` business partner | `https://www.notion.so/b99b161584fc4936a38fa9412bfa91b4` | Invoicing email is `invoices@konvi.app`, but `VAT Registered?` is set to `NO` and VAT Number is blank, while company registration records show IE VAT and UK VAT registrations. Treat as stale until reconciled. |

## Contract-Linked Payment Issues

| Issue | Status | Source | Notes |
| --- | --- | --- | --- |
| Dracoon EUR 500/week invoice lines | To Do | `https://www.notion.so/35fe4130131481608ce6fbdc43ff167e` | Ioana correction says resolution is to pay EUR 500/week and attach the invoice lines to the contract so future checks see the payment basis. |
| Dracoon contract record | Inactive | `https://www.notion.so/318e41301314801da9aec39356e47299` | Contract shows EUR -4,000 monthly and ended 2026-04-15. Reconcile against the EUR 500/week task before payment decisions. |

## Relation Map Notes

The company record has high-volume linked expenses, invoices, tax payments, tax prepayments, bank accounts, and correspondence. This first pass records only the active issues and pointers; fetch individual payment or expense records before actioning a specific payment.
