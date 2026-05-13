# Invoices, Payments, And Expenses

Status: provisional.
Source: Notion company record; linked Notion contracts; Gmail search; Drive search.
Imported: 2026-05-13.
Review: Fetch invoice records directly before claiming current receivable status, payment status, or VAT treatment.

## Invoice Relations

The company record links many invoice and expense records in Notion. This pass did not backfill every line item because the Notion SQL query endpoint errored and the relation list is large.

Use this file for high-signal invoice and payment context until a relation-filtered export is available.

## Recent Gmail Invoice Context

Gmail search on 2026-05-13 found recent CBMAX invoice messages:

| Date | Gmail message | Subject | Detail | Status |
| --- | --- | --- | --- | --- |
| 2026-05-01 | `19de4323a449e978` | CBMAX - Invoice 28 - April 2026 Services | RB sent an invoice email to Claudio with attachment `Invoice INV-0029.pdf`; snippet says the body referred to `INV-0028` and March 2026 services, so the numbering/body should be checked. | Provisional. |
| 2026-05-03 | `19deef19269e9023` | Re: CBMAX - Invoice 28 - April 2026 Services | Claudio replied that the invoice should be EUR 15,000, not EUR 18,600. | Routed to Notion task/correspondence. |
| 2026-05-12 | `19e1b226d263c88b` | Re: CBMAX - Invoice 28 - April 2026 Services | Claudio asked for the revised invoice. | Inbound follow-up. |
| 2026-05-12 | `19e1b639404e491a` | Re: CBMAX - Invoice 28 - April 2026 Services | RB sent a revised invoice with attachment `Invoice INV-0032.pdf`. | Sent by accounting. |
| 2026-04-30 | `19ddea03b7559b0d` | Re: Fattura supporto Aprile 2026 | Claudio sent a WeBuild-support invoice attachment `Invoice INV-0031.pdf`; snippet describes competitive research for Switzerland and newsletter support. | Provisional. |

## Invoice Correction Task

| Task | Status | Detail | Source |
| --- | --- | --- | --- |
| CBMAX - Correct invoice 28 amount for April 2026 services | Done | Claudio said invoice 28 should be EUR 15,000 rather than EUR 18,600. A correction pass created/linked the missing Correspondence record and noted no Gmail attachment was required for the inbound message. Marked complete on 2026-05-12. | `https://www.notion.so/35ae4130131481af9917d59090714e30` |

Linked correspondence:

- `https://www.notion.so/35ae4130131481ecab85fd1cb97000e4`

## Drive Finance Pointers

The discovered CBMAX Drive folder includes:

- `CBMAX Financial Analysis`: `https://docs.google.com/spreadsheets/d/1fZ8BE5FBpNbvPmg4Ut5DzIpguXWp22PGhRTBYc92Uk8`
- `Pending invoices -CBMAX`: `https://docs.google.com/spreadsheets/d/1YL7I5JZUvtOmiVUgh3bRWpgOd5ODcVhepjo7M6E2y5M`
- `CBMAX Post payroll Salary Estimation Discrepancies`: `https://docs.google.com/spreadsheets/d/1WwNek-6RQ2Yw0S8tDMCCA7XTBoZ8k37lJ4B0IuFwY9g`
- `Bank statement` folder: `https://drive.google.com/drive/folders/1fXY4bk3KcWagtsrbgEN--O0Ry0es7VRf`

## Expense Notes

The company record links many expense records. Direct expense backfill is still pending.

Workhub invoice validation for Richmond Blackwood supplier invoices remains in `../RBL/invoices-payments-expenses.md`. CBMAX is listed there as one of the upgraded Workhub plan references, but those Workhub invoices should not be treated as CBMAX payables without a separate CBMAX-owned expense source.

## Review Needed

- Fetch current Notion invoice records for April and May 2026 before making receivable or correction claims.
- Check whether `Invoice INV-0029.pdf`, `Invoice INV-0032.pdf`, and the Notion invoice task labels agree on invoice number, service month, amount, and VAT.
- Backfill expense records through a relation-filtered Notion export when available.
