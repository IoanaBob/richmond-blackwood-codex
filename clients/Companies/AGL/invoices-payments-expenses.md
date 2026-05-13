# Invoices, Payments, And Expenses

Status: provisional.
Source: User instruction on 2026-05-13; Notion Syntentia contract `https://www.notion.so/21ce4130131480bfb4d7e694a8be836d`; Gmail invoice threads.
Imported: 2026-05-13.
Review: Exact future sender display name should follow repo outbound rules unless the user confirms the historical Gmail display name should be preserved.

## AGL Syntentia Weekly Invoicing

Status: provisional.
Source: User instruction on 2026-05-13; active Syntentia contract; Gmail sent invoices.
Imported: 2026-05-13.
Review: The general weekly invoice process should handle this recurring case; do not create bespoke recurring tasks named "make invoices for AGL".

Trigger for the general inbound/finance process: Gmail/contract/invoicing context involving AGL, AGILE LINCS, Byron weekly timesheets/expenses, Syntentia, Michelle Howard, Nick Howard, or `accounting@lincs.one`.

Business rule:

- Byron bills Syntentia weekly.
- For each weekly invoice entry, create one invoice for services/hours and one invoice for expenses.
- Byron may send expense receipts a few weeks late. If the weekly services invoice is ready but expenses are missing, send the services invoice and say the expense invoice/report will follow once reviewed.
- If Byron repeatedly forgets to send expenses, remind him periodically through the general recurring finance/expense-evidence aging process, not an AGL-only standing task.
- The existing weekly recurring invoice exists for this case and should remain part of the general weekly invoice process.
- Invoices are sent via the accounting email.

Contract terms from Notion:

| Field | Value |
| --- | --- |
| Contract | `AGILE LINCS - Syntentia 7/25` |
| Source | `https://www.notion.so/21ce4130131480bfb4d7e694a8be836d` |
| Client legal name | Syntentia Ltd. |
| Rate | EUR 862 daily |
| Frequency | Weekly |
| First due date | 2025-07-01 |
| Bank details for EUR payments | Account holder Agile Lincs Limited; IBAN `LU284080000052195324`; BIC `BCIRLULL`; currency EUR |

## Future Email Format

Status: provisional.
Source: Notion active Syntentia contract and historical Gmail sends.
Imported: 2026-05-13.
Review: Historical Gmail messages show sender display `Accounting Richmond Blackwood <accounting@richmondblackwood.com>`. Repo outbound rules normally preview email as `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` unless the user confirms another sender.

Sender identity for preview/send:

`Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`

Recipients:

To:

- Michelle Howard `<michellehoward@syntentia.com>`
- Nick Howard `<nickhoward@syntentia.com>`
- Richmond Blackwood Team `<contact@richmondblackwood.com>`
- `"Accounting@LIncS" <accounting@lincs.one>`

Subject pattern:

`AGILE LINCS LIMITED - Week <WW>` when both service and expense invoices are clean for one week.

Use a subject that names all affected weeks/invoice numbers when sending corrections, late expenses, or multi-week packets, as seen in the 2026-05-11 email: `AGILE LINCS LIMITED - Week 18 and 19 - INV-0115 - INV-0116 - INV-0117`.

Body pattern:

```text
Hi Team,

Hope you are doing well. Attached you will find the invoice from AGILE LINCS LIMITED for week <WW>:

Week <WW> Services - <service invoice number> - EUR <amount>
Week <WW> Expenses - <expense invoice number / amount, or say it will be sent once reviewed if no expenses are available yet>

Please note different IBAN for EURO payments:

Account holder - Agile Lincs Limited
Account number - LU284080000052195324
BIC - BCIRLULL
Currency - EUR

Thank you!
```

If the client asks for receipts/report support, reply in the same thread with the expense report and receipts if available.

## Recent Gmail Evidence

| Date | Source | Summary | Review |
| --- | --- | --- | --- |
| 2026-05-11 | Gmail message `19e1773225a3367e` | Sent Week 18 expenses plus Week 18 and Week 19 invoices to Syntentia recipients. Attachments: `Invoice INV-0115.pdf`, `Invoice INV-0116.pdf`, `Invoice INV-0117.pdf`, and `SYN-2026-18-EXP_ER-0106 (1).pdf`. | Confirms multi-week catch-up handling and separate expense support. |
| 2026-05-10 | Gmail message `19e13e5aec27b209` | Byron sent Syntentia Week 18: 5 days, expenses attached `SYN-2026-18-EXP_ER-0106.pdf`. | Source for Week 18 expenses. |
| 2026-04-30 | Gmail message `19dde993f33b519d` | Sent subject `AGILE LINCS LIMITED - Week17 - INV-0111`, but body says "Invoice for Week 16". | Possible typo in historical sent email; use source invoice record to confirm week before copying this wording. |
| 2026-04-25 | Gmail message `19dc459d60b09465` | Byron sent Syntentia Week 17: 5 days, expenses `Not Applicable`. | Shows no-expense case. |
| 2026-04-21 | Gmail message `19dafb3eb2749c15` | Sent Week 16 credit note, corrected invoice, and expenses after a 5-day vs 6-day correction. | Shows correction flow; do not create duplicate payment tasks. |
| 2026-04-20 | Gmail thread around Nick Howard request | Syntentia requested expense report/receipts for invoice support; RB sent report attachments. | Confirms expense reports/receipts may be requested separately. |

## Personal Expense Boundary

Notion expense records should link to AGL only when the expense is company-owned or company-operational. Byron personal tax expenses, US apartment costs, personal investment account evidence, and individual tax payment evidence belong under `../../Individuals/Byron Jarvis Frasier/` with only a pointer here if a company task needs it.
