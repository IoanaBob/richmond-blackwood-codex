# eBilanz-Online Draft Packet

Status: provisional.
Source: User instruction on 2026-06-03, Finanzamt Lichtenberg E-Bilanz letter in Drive, Notion task `https://www.notion.so/353e413013148070ad92d56880997fb6`, Aaron individual record, 2023/2024 FS workbooks, and eBilanz-Online public FAQ pages reviewed on 2026-06-03.
Imported: 2026-06-03.
Review: Drafts were created and populated in eBilanz-Online on 2026-06-03. Do not submit/transmit without explicit user approval. Final ELSTER certificate/PIN/voucher/payment and any reviewer sign-off remain outstanding.

## Authority Requirement

Finanzamt Lichtenberg letter dated 2026-05-20 asks Aaron to submit the E-Bilanzen for 2023 and 2024 electronically through a tax program/form. The letter states that the submitted Excel tables are not sufficient and asks for submission by 2026-06-10.

Source letter: `https://drive.google.com/file/d/1CicvmfDj5xMfO1lJ7EDA4BjTeQo6E7Rn/view`

## Platform Status

Status: provisional.
Source: eBilanz-Online public pages and in-app browser inspection on 2026-06-03.
Imported: 2026-06-03.
Review: Final transmission was not attempted. Transmit pages require an ElsterBasis certificate/PIN and a voucher/payment asset before final transfer.

- Public site: `https://www.ebilanzonline.de/`
- Login is required; user logged into Aaron's eBilanz-Online account in the in-app browser on 2026-06-03.
- eBilanz-Online supports multiple clients/mandants and periods.
- eBilanz-Online supports manual entry and Excel import. Public docs say data can be entered in the import module, GCD module, and GAAP module, or imported through Excel.
- Public docs say DATEV SKR03/SKR04 standard mappings are available. Aaron's workbooks use DATEV-style accounts; confirm SKR03 mapping in the app before relying on auto-mapping.
- A 13-digit ELSTER tax number is needed for E-Bilanz setup. For Berlin, the public converter rule is `11FF0BBBUUUUP`; derive the exact value from Aaron's live Notion/Drive tax number at data-entry time and do not store it here.
- An ElsterBasis software certificate is required for final transmission. Draft creation/import was possible before transmission. The 2024 transmit page showed certificate/PIN/voucher inputs and no final transfer was made.

Useful public docs:

- Import/mapping FAQ: `https://www.ebilanzonline.de/wissen/faq/mapping-und-datenerfassung/`
- DATEV import FAQ: `https://www.ebilanzonline.de/wissen/faq/importmoeglichkeiten/datev-mittelstand-faktura-mit-rechnungswesen/`
- Technical requirements: `https://www.ebilanzonline.de/wissen/faq/technische-voraussetzungen/`
- Multi-client capability: `https://www.ebilanzonline.de/wissen/faq/mandantenfaehigkeit/`
- 13-digit tax number: `https://www.ebilanzonline.de/wissen/13-stellige-steuernummer/`

## Draft Creation Plan

1. User logs into eBilanz-Online in the in-app browser.
2. Create or select a mandant for Aaron's former German freelance/Gewerbe activity.
3. Use Aaron's personal tax number/tax ID/address from live Notion and the 2026-05-20 letter; do not copy exact tax identifiers into git.
4. Create one period/vorgang for 2023 and one for 2024.
5. Prefer import via `Kontensalden fuer Zuordnung` using the source FS workbook for the matching year. If import fails, use manual GAAP/Taxonomy entry from the summary tabs.
6. Validate each draft inside eBilanz-Online. Fix mapping/sign/mandatory-field errors.
7. Stop before any paid transfer, ELSTER certificate authentication, or final transmission. Show the validation result and ask the user for approval.

## Live Draft Status

Status: provisional.
Source: eBilanz-Online account screens, user-uploaded import files, and source FS workbooks on 2026-06-03.
Imported: 2026-06-03.
Review: A tax reviewer should confirm the 2024 beginning/previous-year business assets value before transmission because the 2024 source balance sheet imports `22,054.66`, while the 2023 eBilanz ending equity shown in the prepared 2023 draft is `19,658.45`. No transmission or ELSTER authentication has been performed.

### 2023 Draft

- eBilanz period ID: `625302`
- Period: `2023-01-01` to `2023-12-31`
- Version: `2023`
- Taxonomy: Kerntaxonomie from `2022-05-02`, Taxonomy `6.6`
- Legal form: Einzelunternehmen
- Presentation: Gesamtkostenverfahren
- Import file used: `/Users/jp/Downloads/Aaron_Chamberlain_eBilanz_2023_import_legacy.xls`
- Import result: 18 account balances imported, then SKR03 standard mapping for Einzelunternehmen / Taxonomy 6.6 applied.
- Balance sheet after manual correction:
  - Total assets: `20,158.76`
  - Total equity and liabilities: `20,158.76`
  - Equity: `19,658.45`
  - Beginning balance: `756.91` after manual correction to the mapped capital/opening values
  - Net income/net loss for the financial year: `127,209.80`
  - Capital withdrawals: `108,308.26`
- Determination of taxable income by comparison of business assets:
  - Net profit/net loss: `127,209.80`
  - Business assets at financial year end: `19,658.45`
  - Business assets at previous financial year end: `756.91`
  - Withdrawals/distributions: `108,308.26`
- Determination of taxable income:
  - Taxable profit/loss: `127,209.80`
  - Net income/net loss for the financial year: `127,209.80`
- Transmission status: not transmitted. Transmit page was inspected only; no certificate/PIN/voucher was entered.

### 2024 Draft

- eBilanz period ID: `625318`
- Period: `2024-01-01` to `2024-12-31`
- Version: `2024`
- Taxonomy: Kerntaxonomie from `2023-04-01`, Taxonomy `6.7`
- Legal form: Einzelunternehmen
- Presentation: Total expenditure format / GKV
- Import file used: `/Users/jp/Downloads/Aaron_Chamberlain_eBilanz_2024_import_legacy.xls`
- Import result: 19 account balances imported, then SKR03 standard mapping for Einzelunternehmen / Taxonomy 6.7 applied.
- Balance sheet after manual correction:
  - Total assets: `24,406.95`
  - Total equity and liabilities: `24,406.95`
  - Equity: `15,613.15`
  - Beginning balance: `22,054.66`
  - Net income/net loss for the financial year: `171,456.02`
  - Capital withdrawals: `177,897.53`
  - Provisions: `-2,837.22`
  - Liabilities: `11,631.02`
- Determination of taxable income by comparison of business assets:
  - Net profit/net loss: `171,456.02`
  - Business assets at financial year end: `15,613.15`
  - Business assets at previous financial year end: `22,054.66`
  - Withdrawals/distributions: `177,897.53`
  - Contributions: blank
- Determination of taxable income:
  - Taxable profit/loss: `171,456.02`
  - Net income/net loss for the financial year: `171,456.02`
- Transmission status: not transmitted. Transmit page was inspected only; no certificate/PIN/voucher was entered.

## Source Workbooks

| Year | Drive source | Scratch download created in this run |
| --- | --- | --- |
| 2023 | `https://docs.google.com/spreadsheets/d/1OnLp0uM1SN2fVyltPrDOqv2p_Th3YzTA/edit` | `/private/tmp/Aaron_Chamberlain_FS_2023.xlsx` |
| 2024 | `https://docs.google.com/spreadsheets/d/1KmyvtL-HW4Qc-r6Fi4mxWy1MM0UYAkj1/edit` | `/private/tmp/Aaron_Chamberlain_FS_2024.xlsx` |

Scratch downloads are not durable evidence. The Drive files above remain the source of truth.

## Summary Figures From FS Workbooks

Use the source workbook signs for import. If entering manually, confirm the eBilanz screen's expected debit/credit sign convention before inverting any values.

### 2023

P&L:

- Turnover: -129,764.75
- Other earnings: 0.00
- Expenditures on service: 0.00
- Staff costs: 0.00
- Depreciations: 0.00
- Other operating expenses: 2,554.95
- Income before tax: -127,209.80
- Taxes: 0.00
- Net income/loss for the year: -127,209.80

Balance sheet:

- Fixed assets: 0.00
- Current assets: 19,801.47
- VAT receivable: 357.29
- Total assets: 20,158.76
- Equity: 107,551.35
- Profit/loss for the year: -127,209.80
- Provisions: 0.00
- Liabilities: 0.00
- VAT payable: -500.31
- Total asset and liability check: 0.00

### 2024

P&L:

- Turnover: -175,254.30
- Other earnings: 0.00
- Expenditures on service: 0.00
- Staff costs: 0.00
- Depreciations: 0.00
- Other operating expenses: 3,798.28
- Income before tax: -171,456.02
- Taxes: 0.00
- Net income/loss for the year: -171,456.02

Balance sheet:

- Fixed assets: 0.00
- Current assets: 23,951.43
- VAT receivable: 455.52
- Total assets: 24,406.95
- Equity: 155,842.87
- Profit/loss for the year: -171,456.02
- Provisions: 1,570.11
- Liabilities: 0.00
- VAT payable: -10,363.91
- Total asset and liability check: 0.00

## Open Review Points

- Confirm the 2024 previous-year business assets/opening equity value of `22,054.66` against the 2023 prepared draft ending equity of `19,658.45` before final transfer.
- Confirm whether the final transmission requires Aaron's own ElsterBasis certificate or RB/adviser authorization can be used in the account.
- Confirm voucher/payment availability in eBilanz-Online before final transfer.
- Confirm that any platform validation shown after certificate/PIN entry passes before asking for final submission approval.
