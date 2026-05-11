# Personal Tax Returns

Status: provisional.
Imported: 2026-05-05.
Source: Notion individual record and Personal Tax Filings records.
Notion backup: `notion-backup.md`.

## Linked Person

Nathan Mawali A Vandy:

- Individual record: `https://www.notion.so/182e4130131480cead22dd69fd3f2dc7`
- Tax filings enabled: yes.
- Personal tax fee monthly: EUR 200.
- Tax residence: Germany.

## Filing Records

| Period | Record | Jurisdiction | Status | Document gathering | Due date | Filed on | Drive docs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2023 | `https://www.notion.so/2cae41301314806e985fe16e5fe2c56a` | Germany | Filed | Attached in Drive | 2025-06-02 | 2026-01-15 | `https://drive.google.com/drive/folders/1--N8uiH7KFh5Q0gtu4Zl5k-ikC9ScbL2?usp=drive_link` |
| 2024 | `https://www.notion.so/2cae4130131480409442daeb9e9ffbec` | Germany | Filed | Attached in Drive | 2026-04-30 | 2026-01-15 | `https://drive.google.com/drive/folders/1VnnhYdnuep-b2-1SQP5DlbWO_yeJLEfk?usp=drive_link` |
| 2025 | `https://www.notion.so/342e4130131480849114fe02636b759a` | Germany | Pending | In progress | 2026-07-31 | blank | `https://drive.google.com/drive/folders/1VEDfpcRJOQvnkJ0Y7M8wCQ9g-a4DU6eo` |

## Linked Task Tracking

Status: provisional.
Source: VUN Notion project task review on 2026-05-07.
Imported: 2026-05-07.
Review: Confirm filing task completion only against filing evidence.

- 2023 + 2024 analysis: `VUN add VAT to 2023 + 2024 tax analysis` (`https://www.notion.so/34be4130131480db998dd3bfb292da55`) was narrowed from a combined 2023/2024 + 2025 task because 2025 has a separate spreadsheet/source set.
- 2025 analysis: `Nathan - 2025 Personal Tax Analysis` (`https://www.notion.so/332e41301314813aadb4fca120d13eae`) remains the separate 2025 analysis task.
- 2023 + 2024 filing follow-up: `Nathan - 2023 + 2024 personal tax filing` (`https://www.notion.so/359e4130131481d581d7c9f68213a54c`) was created in Notion, assigned to Johnpaul Okolie, and marked `Dependent on` the 2023 + 2024 analysis task.
- 2025 filing follow-up: `Nathan - 2025 personal tax filing` (`https://www.notion.so/359e4130131481628a34c1f252a3637b`) was created in Notion, assigned to Johnpaul Okolie, and marked `Dependent on` the 2025 analysis task.

## Submission Attachments In Notion

- 2023 submission: `Nathan_2023_tax_filing.zip`.
- 2024 submission: `Nathan_2024_tax_filings_docs.zip`.
- 2025 submission: none listed.

## 2025 Evidence Received

Status: provisional.
Source: user instruction, Nathan-created Drive folder `https://drive.google.com/drive/folders/1D08w9OoSfEaRSpVjoWuvnSn50Gidctym`, and copied Drive files listed in `drive-locations.md`.
Imported: 2026-05-06.
Review: cash-basis bank-statement reconciliation and invoice matching still pending; do not treat unpaid invoices as 2025 taxable cash receipts without bank evidence.

| Evidence | Period covered | Destination | Initial tax-analysis use |
| --- | --- | --- | --- |
| `UAB 25 Invoice` batch | January-July 2025 service/payment periods, based on filenames | `https://drive.google.com/drive/folders/105rhUMudr7QwhYBmxRXp_TrSWmzrPxCe` | Use as corrected 2025 DappRadar/UAB invoice support; reconcile against bank deposits before recognizing cash-basis revenue. |
| `Vandy Un Limited Invoices July - Dec 25` batch | July-December 2025 | `https://drive.google.com/drive/folders/1R6ot_IHyWuRo-xDlAHxBBIX-Xalk27Xz` | Use as corrected Vandy UN Limited invoice support; reconcile carefully against employment/payroll evidence and bank deposits to avoid double counting. |
| `Dappradar UAB - Inv RE0003 - August 2025.pdf` | August 2025 | `https://drive.google.com/file/d/1lrSugdwxQi7WHE93B3Ld9ImnFzme95WV/view?usp=drivesdk` | Appears, from extracted PDF text, to be a Vandy UN Limited invoice to DappRadar UAB; reconcile through the Vandy UN/company-to-Nathan payment trail before personal cash-basis inclusion. |
| Coinbase and Kraken account summaries | 2025-2026 | Coinbase folder `https://drive.google.com/drive/folders/17Az7jYRma43-RPzQRR1ICR2rhX7q4WAm`; Kraken ZIP `https://drive.google.com/file/d/1OboSu49R3aBCqK2qcNmyfyo2_X6_WSnX/view?usp=drivesdk` | Use for the 2025 investment/assets audit and reconcile to bank movements where relevant. |

## Machine-Readable Template Workflow - 2026-05-06

Status: provisional.
Source: user instruction and Drive helper native spreadsheet import.
Imported: 2026-05-06.
Review: future Nathan/personal-tax continuation should copy or migrate into this template rather than adding more separated Codex tabs to the legacy Office-mode workbooks.

- Active German template: `RB German Personal Tax Analysis - Machine-Readable Template v1` at `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.
- The template uses flat raw bank/investment export tabs, a formula-driven `Journal`, `Bank Summary`, `Investment Lots`, `PNL`, `Balance Sheet`, `Missing Info`, and `Checks`.
- The `Category Rules` tab is seeded with SKR04 fields and DATEV source references, but final account mapping remains reviewable before filing.
- Opening balances must tie to prior-year closing balances or an explicit provisional opening plug.

## 2023/2024 VAT And 2025 Workbook Updates - 2026-05-06

Status: provisional.
Source: user instruction, corrected Drive evidence, and Drive workbook revisions written by Codex on 2026-05-06.
Imported: 2026-05-06.
Review: the workbooks are Office-mode `.xlsx` files and this section is now historical audit trail. Codex added separate formula-backed tabs and preserved the source income/audit tabs, but the separated-Codex-tab format is superseded for future work by the machine-readable template above.

| Workbook | Drive URL | Codex tabs added | Revision verification |
| --- | --- | --- | --- |
| 2023/2024 VAT missing-invoices workbook | `https://docs.google.com/spreadsheets/d/16TQCSfTsyE31o-fvT9HBTm3yvUuGaIbz/edit` | `codex - 2023 - 2026-05-06`; `codex - 2024 - 2026-05-06` | Drive read-back confirmed the annual tabs after upload and confirmed the earlier Codex VAT/missing-invoice tabs were removed. Revision modified `2026-05-06T12:30:40.310Z`, md5 `d509d0cf400d14f87e7c7a1a83b63559`. |
| 2025 personal tax analysis workbook | `https://docs.google.com/spreadsheets/d/1qbv6dAMYaSJFeSp8L0kj16K_tjzKF6_g/edit` | `codex - 2025 - 2026-05-06`; `codex - rev disc - 2026-05-06`; `codex - exp disc - 2026-05-06`; `codex - exp rules - 2026-05-06`; `codex - ABN - 2026-05-06`; `codex - Revolut - 2026-05-06`; `codex - N26 - 2026-05-06`; `codex - invest - 2026-05-06`; `codex - invoices - 2026-05-06` | Drive read-back confirmed the DappRadar/UAB full-statement recheck, investment tab USDC reclassification plus restored investment in/out summary with staking income, revised bank-reconciliation expense tabs with visible formula-backed classifications, and the revenue discrepancy tab with no summary block, review headers at row 5, frozen pane at row 5, and unwrapped status/save-location/action columns. Revision modified `2026-05-06T16:45:23.238Z`, md5 `abc2335acaf669d2946c88bc934d792c`, size `369998`. |

### Provisional VAT Findings

Status: provisional.
Source: 2023/2024 workbook `Income` tab, corrected `UAB 24` Drive folder, and prior 2023 DappRadar UAB invoice evidence.
Imported: 2026-05-06.
Review: final filing should still review the underlying PDF invoices before relying on any single workbook row.

- 2023 included revenue is EUR 86,521.60, formula-classified as EU B2B reverse charge / 0% German VAT in `codex - 2023 - 2026-05-06`.
- 2024 included revenue is EUR 68,436.94 in `codex - 2024 - 2026-05-06`: EUR 22,865.60 EU B2B reverse charge and EUR 45,571.34 non-EU B2B / no German VAT.
- Potential `INV-00013` is included in 2024 revenue as EU reverse charge, per user instruction, but invoice evidence remains missing.
- January 2024 EUR 1,855.77 is excluded from 2024 revenue because the user said the client lost the contract and will not be able to recover it.
- 2024 non-EU rows are categorised, but final filing should still check invoice-by-invoice tie-out to the evidence folder.

### Provisional 2025 Audit Findings

Status: provisional.
Source: 2025 workbook source tabs and copied 2025 Drive evidence.
Imported: 2026-05-06.
Review: final 2025 analysis still needs N26 October 2025, invoice/receipt tie-out, Revolut GBP-to-EUR review where flagged, and non-USDC investment cost-basis/lot support.

- `codex - 2025 - 2026-05-06` now follows the annual revenue format: formula revenue totals at the top, `INCOME Breakdown - 2025` in row 10, table headers in row 11, DappRadar/UAB paid rows categorised as EU reverse charge, and other audit items for investments, prepayments, and Kraken evidence.
- VAT Rate columns are formatted as percentages in `codex - 2025 - 2026-05-06!C3:C6` and `codex - invoices - 2026-05-06!H5:H17`; VAT amount columns remain amount/currency fields.
- Expense totals and expense/bank coverage are intentionally kept out of the revenue review tab; `Summary!B7` now points to `codex - exp disc - 2026-05-06!B7`, and expense collection/review stays in the expense discrepancy, rules, and bank-account tabs.
- `codex - rev disc - 2026-05-06` now uses only the line-by-line `REVENUE DISCREPANCY REVIEW - 2025` section: the prior summary/metric block is removed, headers are directly below in row 5, data starts at row 6, and the status/save-location/action columns are unwrapped for compact review.
- `codex - rev disc - 2026-05-06` separates revenue discrepancies and corrects the DappRadar/UAB evidence status: seven DappRadar/UAB invoice PDFs total EUR 10,500; four EUR 1,500 source rows in `Revenue Summary!B14:B17` are matched by amount, and two additional EUR 1,500 ABN receipts on 2025-06-10 and 2025-07-10 are formula-linked from `codex - ABN - 2026-05-06` rows 214 and 229. The remaining DappRadar/UAB unpaid/unmatched amount is EUR 1,500 for the July 2025 [August] invoice, excluded from cash-basis revenue until payment is found.
- `codex - rev disc - 2026-05-06` now shows `Revenue Summary!A7:D10` as other non-EU invoice evidence to verify, not as DappRadar/UAB evidence.
- `codex - invoices - 2026-05-06` indexes the provided DappRadar/UAB and Vandy UN invoice evidence; the revenue discrepancy tab uses formulas to pull invoice net/gross/status from that index rather than duplicating derived values.
- `codex - rev disc - 2026-05-06` also corrects Vandy UN as invoice-provided evidence: six July-December PDFs total EUR 19,200 net / EUR 22,848 gross; only the July EUR 3,200 source amount is populated in `Revenue Summary!B21`; August-December invoice net EUR 16,000 remains excluded from cash-basis revenue until source amount/payment is located.
- The separate August 2025 `RE0003` PDF was not included in the DappRadar/UAB personal unpaid total because extracted text shows it as a Vandy UN Limited invoice to DappRadar UAB; it should be reconciled with the Vandy UN/company-to-Nathan payment trail.
- `codex - exp disc - 2026-05-06` was rebuilt without the user's earlier Jan-May reference and now sums formula-classified bank-statement rows from `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06`.
- `codex - exp rules - 2026-05-06` is the formula source for keyword-based categorisation, business expense status, tax treatment, evidence action, and review flags; account tabs keep raw statement lines plus formula/cached classification columns instead of static derived classifications.
- The latest bank-reconciliation expense revision removes the visible `Rows parsed` review metric, keeps compact wrapped table widths, and enlarges account transaction rows to 42px so uncategorised/support rows can be reviewed directly.
- The expense rules count London and Dubai business-location spend as business travel, including food/accommodation/travel/taxi there, while supermarket/convenience stores remain personal groceries even when the location is London. Iceland/Icelandair/Reykjavik is not counted as business travel unless separately confirmed.
- Electronics, telecom, software, and business subscription rows that make sense are categorised as business expenses, with high-value electronics still requiring receipt/business-use support.
- Bank-statement rows parsed for the 2025 expense rebuild: 250 ABN AMRO rows, 1,383 Revolut rows, and 86 N26 rows.
- ABN AMRO and Revolut evidence covers January-December 2025. N26 evidence covers January-September and November-December 2025; October 2025 was not present in the N26 ZIP.
- Revolut GBP-statement rows use parsed EUR conversion where the statement shows one; remaining business-claim rows with no EUR support are flagged as `FX/EUR amount missing` and need conversion or exclusion before amounts are claimed.
- `codex - invest - 2026-05-06` adds the 2025 Coinbase/Kraken investment breakdown: non-USDC disposals, staking acquisitions, broker-bank transfers, year-end holdings, formula-based holding-bucket and gain/loss columns, and a missing-basis follow-up section.
- The investment tab top block restores the investment in/out movement summary: `B8` is non-USDC investment out/disposal proceeds, `B9` is staking income/acquisition value, and `B10` is net movement excluding transfers; the annual investment audit row remains formula-linked to `B8`.
- USDC is now treated as a stablecoin/bank-transfer bridge, not an investment asset, and is excluded from investment disposal proceeds and purchase/acquisition formulas.
- The investment tab now splits currencies in a summary section for DOT, ETH, ARB, MATIC, XRP, and POL.
- The 2023/2024 workbook provides purchase-date/source support for DOT, ETH, ARB, and MATIC through `Summary!E11`, with 2024 top-up notes for ETH and MATIC in `Summary!E26`; these rows still need exact lot quantities and cost basis before final gain computation.
- Visible `Investments Summary` source rows 28:31 match Coinbase EUR withdrawals for January-April 2025; treat those as broker-bank transfers, not purchases.
- Statement-backed 2025 acquisitions found so far are Coinbase staking income only: DOT, ETH, MATIC, and POL. No bank-funded 2025 crypto purchase was identified in Coinbase/Kraken statements; USDC movements into Coinbase/Kraken are transfers from external wallets/brokerages.
- Prior-year cost basis is still missing for Coinbase DOT, ETH, ARB, MATIC and Kraken XRP before final capital-gains vs income treatment can be concluded. USDC transfer-in lots should be reconciled as transfers rather than investments.
- The revenue and discrepancy tabs propose saving missing revenue invoices under `2025 Sales / Missing revenue invoices`, expense receipts under `Expense receipts - 2025`, investment evidence under `2025 Investments`, and prepayment support under `Tax prepayment evidence - 2025`.
- The user-provided expense reference has been superseded for the Codex expense review by the bank-statement-derived account tabs above; final filing should still tie claimed business expenses to receipts/invoices where the evidence action column requires it.

### Superseded Evidence

Status: superseded.
Source: user correction on 2026-05-06.
Imported: 2026-05-06.
Review: not to be used for final categorisation.

| Evidence | Prior URL | Status |
| --- | --- | --- |
| `vandy_invoice_pack_polished_jul_dec_2025.pdf` | `https://drive.google.com/file/d/10VeKXKbKIfrucMHkMrvK_1JrUR3t08_B/view?usp=drivesdk` | Moved to Drive trash on 2026-05-06 after user identified corrected Drive-folder evidence. |

## Gmail / Insolvency Matter Cross-Reference

The German insolvency-opening thread includes personal tax references that may affect VUN-linked personal tax history:

- 2023 and 2024 German income tax returns were described as filed on 2026-01-15.
- The 2023 assessment notice was still being chased as of 2026-03-20 according to Nathan's forwarded correspondence.
- 2024 assessment notice dated 2026-02-03 is described in `legal-insolvency-and-solvency.md`.

Detailed unsanitised source notes: `legal-insolvency-and-solvency.md`.

## Review Needed

- Confirm whether the copied 2025 Vandy UN Limited invoices, including the separate August 2025 `RE0003` invoice to DappRadar UAB, represent sales invoices, employment-related re-invoicing, or another compensation trail before final categorisation.
- Obtain or identify the missing `INV-00013` support, the 2025 non-EU invoice evidence for `Revenue Summary!A7:D10`, DappRadar/UAB bank payment dates/refs for the four source-matched EUR 1,500 rows plus evidence/payment confirmation for the remaining unmatched July 2025 [August] DappRadar invoice, Vandy UN source/payment evidence for August-December, expense receipts for claimed business expenses, non-USDC investment cost-basis lots, and prepayment amounts.
- Obtain or identify the missing N26 October 2025 statement, resolve Revolut GBP rows flagged for FX/EUR conversion, and tie claimed business expenses to receipts/invoices where required before final filing.
