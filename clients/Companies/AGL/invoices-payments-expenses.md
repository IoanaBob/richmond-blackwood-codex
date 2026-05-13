# Invoices, Payments, And Expenses

Status: provisional.
Source: User instruction and review on 2026-05-13; Notion Syntentia contract `https://www.notion.so/21ce4130131480bfb4d7e694a8be836d`; Gmail invoice threads; WhatsApp chat `120363222065866778@g.us`.
Imported: 2026-05-13.
Review: General weekly invoice process should handle this recurring case; do not create bespoke AGL invoice tasks.

## AGL Syntentia Weekly Invoicing

Status: provisional.
Source: User instruction on 2026-05-13; active Syntentia contract; Gmail sent invoices; WhatsApp chat `Frasier, Byron | Richmond Blackwood`.
Imported: 2026-05-13.
Review: The general weekly invoice process should handle this recurring case; do not create bespoke recurring tasks named "make invoices for AGL".

Trigger for the general inbound/finance process: Gmail/contract/invoicing context involving AGL, AGILE LINCS, Byron weekly timesheets/expenses, Syntentia, Michelle Howard, Nick Howard, or `accounting@lincs.one`.

Business rule:

- Byron bills Syntentia weekly.
- For each weekly invoice entry, create one invoice for services/hours and one invoice for expenses.
- Byron may send expense receipts a few weeks late. If the weekly services invoice is ready but expenses are missing, send the services invoice and say the expense invoice/report will follow once reviewed.
- If Byron repeatedly forgets to send expenses, remind him periodically through the general recurring finance/expense-evidence aging process, not an AGL-only standing task.
- If Byron takes vacation/off days, he may bill fewer service days. Ask him once a month whether he plans vacation/off days for the next month so the weekly services invoices use the right day count.
- The existing weekly recurring invoice exists for this case and should remain part of the general weekly invoice process.
- Invoices are sent via the accounting email.
- Live monthly task created on 2026-05-13: `[Monthly] AGL - Ask Byron planned vacation/off days` (`https://www.notion.so/35fe41301314814096b2cdc5beb780fa`), assigned to Simoneta with first due date 2026-05-25.

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
Source: Notion active Syntentia contract, historical Gmail sends, and user review on 2026-05-13.
Imported: 2026-05-13.
Review: Sender display name confirmed by user on 2026-05-13.

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

## WhatsApp Evidence

Status: provisional.
Source: WhatsApp chat `Frasier, Byron | Richmond Blackwood` / `120363222065866778@g.us`, searched on 2026-05-13.
Imported: 2026-05-13.
Review: Use as operating context; source invoices/Gmail/Notion records remain the evidence of record for amounts actually billed.

| Date | Topic | Summary | Review |
| --- | --- | --- | --- |
| 2026-02-06 to 2026-02-09 | February holiday / partial week | Byron said he took holiday during that week and had not worked a full 5 days; he later reported Week 7 as 9 hours and no travel expenses. | Confirms day-based billing can be less than a full week and supports the monthly planned holiday check. |
| 2026-03-28 | Week 12/13 reporting | Byron reported Week 12 as 40 hours with expense report pending, and Week 13 as 40 hours with no expenses. | Supports separate tracking of services and expenses. |
| 2026-04-14 to 2026-04-20 | Week 14-16 day counts and expenses | Byron reported Week 14 and Week 15 as 5 days; confirmed no Week 15 expenses; said no planned holidays over the next two months at that point; confirmed Week 16 had extra weekend work and should be treated as 6 days, with expense report policy needing attention. | Confirms the correction pattern and planned-holiday check before future invoices. |
| 2026-05-09 to 2026-05-11 | Week 18/19 delayed expenses | Byron shared Week 18 and Week 19 as 5 workdays each and said expenses for those weeks would follow because he was behind entering them; RB acknowledged invoices would be processed. | Confirms the rule to process services while leaving expense invoice/report pending when receipts are delayed. |

## Personal Expense Boundary

Notion expense records should link to AGL only when the expense is company-owned or company-operational. Byron personal tax expenses, US apartment costs, personal investment account evidence, and individual tax payment evidence belong under `../../Individuals/Byron Jarvis Frasier/` with only a pointer here if a company task needs it.
