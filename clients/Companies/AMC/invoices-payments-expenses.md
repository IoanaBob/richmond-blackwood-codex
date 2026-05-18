# Invoices, Payments, And Expenses

Status: provisional.
Source: Notion contracts/invoices, Gmail sent invoice messages, WhatsApp, Drive, and user instruction reviewed on 2026-05-18.
Imported: 2026-05-18.
Review: Use the updated Business Partner invoice-to/CC fields for Riot and Echo, while preserving the Riot Nicole recipient from Business Partner notes/last pattern; reconcile missing Q1 2026 expense/invoice support before filing VAT.

## RB Fee

AMC's Notion company record lists Monthly fee to RB as EUR 1,000.

Gmail and Drive show a Richmond Blackwood Stripe receipt/invoice for May 2026:

| Item | Source | Routing note |
| --- | --- | --- |
| Stripe receipt #2252-5049 / invoice F585EF66-0395 | Gmail `19e1458190c60703`; Drive file in `drive-locations.md` | RB-issued income from RB to AMC, not an inbound payable invoice. |

## Revenue Invoice Workflow

Aaron's invoice work is variable. He may not charge the same amount every month, because billing depends on the actual work performed and the travel/expense position for that period.

Operational rule:

1. Ask Aaron what to bill for the period and whether travel costs, per diem, Uber, flights, or other expenses should be included.
2. If Aaron provides exact details, create the invoice and attach/support the relevant expense evidence.
3. Send Aaron the invoice/expense preview for approval in WhatsApp.
4. After he approves, send through the accounting email using the relevant counterparty route.
5. Keep the task in the general invoice process, not a bespoke "make invoices for AMC" process.

## Contract-Specific Send Rules

| Counterparty | Source | Send rule |
| --- | --- | --- |
| Riot Games | WhatsApp 2026-05-08; Gmail `19e0813ffa76d29a`; Notion contract `https://www.notion.so/1a1e4130131480b9859de06e1ffc98e9`; Business Partner `https://www.notion.so/208e41301314805c8591f9b2576720be`; user answer 2026-05-18 | Business Partner fields updated on 2026-05-18: primary invoice email is `emeatalent-invoices-rg@riotgames.com`, CC is Aaron. Because the schema has only one invoice email and one CC email, preserve Nicole Constantine from the Business Partner notes/last sent invoice preview. |
| Echo / Echo Esports | WhatsApp 2026-05-08 to 2026-05-11; Gmail `19e172959b5fc9e5`; Notion contract `https://www.notion.so/246e4130131480aa9b05cb0b9adb2f96`; Business Partner `https://www.notion.so/360e4130131480b09475e824f7e4bac1` | Business Partner fields updated on 2026-05-18: invoice email is `payments@echoesports.gg`, CC is Aaron. Invoice/expenses email should mention invoice and expenses attached, and where relevant that USD amounts are shown together with EUR amounts for German compliance. |
| UVS Games LLC | WhatsApp 2026-04-02 to 2026-04-21; Notion contract `https://www.notion.so/349e41301314809a805ad295f9ad2e05`; invoice `https://www.notion.so/349e41301314802ab95ffa79801d5957` | One-off event invoice. Aaron said he sent the UVS invoice himself. For similar cases, confirm whether Aaron or RB should send before creating outbound email. |

## Message Templates

Historical Riot-style email:

From: `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` for future previews.
Subject: `Aaron Chamberlain - Invoice <invoice number>`

```text
Hello Riot Team,

I hope this message finds you well.

Please find attached Invoice <invoice number> for AARON MEDIC CHAMBERLAIN LIMITED followed by the receipts.

If you have any questions or need further information, feel free to reach out.

Kind regards,
Accounting & Finance Team
Richmond Blackwood Limited
```

Historical Echo-style email:

From: `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` for future previews.
Subject: `Aaron Medic C LTD - Invoice <invoice number> - <month/year or period>`

```text
Hello Team,

Hope you are doing well. Please take into consideration the invoice and expenses attached.

On the attachment we have the correct amounts outlined in US Dollars followed also by the Euro amounts due to German regulations.

Please let us know in case you have any questions.

Kind regards,
Accounting & Finance Team
Richmond Blackwood Limited
```

## Travel, Per Diem, And Expense Rules

Status: provisional.
Source: WhatsApp 2026-02-27, 2026-03-05, 2026-03-27, 2026-04-04, 2026-04-20, and 2026-05-08.
Imported: 2026-05-18.
Review: Confirm any counterparty-specific requirement before sending an invoice with travel or per diem charges.

- Aaron often needs travel costs included in client invoices. He should provide exact invoice description, rate, travel cost, per diem, and expense support.
- For per diem and Uber, Aaron instructed on 2026-05-08 that these do not need to be individual line items for each invoice; use the total and attach the invoices/receipts unless a counterparty requires otherwise.
- If invoice/receipt support is missing, ask Aaron for the missing items before VAT treatment is finalized.
- If RB needs expense invoices to reclaim VAT, supporting invoices can be accepted through WhatsApp and then added to the files.

## Current Q1 2026 Bookkeeping / Expense Support

Status: provisional.
Source: WhatsApp 2026-05-18 and user instruction on 2026-05-18.
Imported: 2026-05-18.
Review: Confirm whether the missing-invoice list was shared; VAT Q1 2026 filing status is left for the separate VAT review.

Aaron said on WhatsApp that he believes he uploaded everything through April. RB then noted that the Q1 books still showed many missing invoices and would prepare a file with everything missing.

## Payment And Sensitive Detail Boundary

Notion and Gmail contain bank/payment references, Wamo notices, tax prepayment details, and attachment identifiers. Those raw details are not stored here. Use the live Notion/Gmail/Drive records when exact payment details are required.
