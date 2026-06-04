# eBilanz-Online Filing Packet

Status: provisional.
Source: User instruction on 2026-06-03 and 2026-06-04, Finanzamt Lichtenberg E-Bilanz letter in Drive, Notion task `https://www.notion.so/353e413013148070ad92d56880997fb6`, Aaron individual record, 2023/2024 FS workbooks, eBilanz-Online account screens, mapping exports/PDFs, and downloaded transmission protocol PDFs.
Imported: 2026-06-03.
Review: 2023 and 2024 filings were corrected and transmitted through eBilanz-Online on 2026-06-04 after user-operated upload/review steps. Store the protocol PDFs in Drive and update live Notion filing/task rows if not already done.

## Authority Requirement

Finanzamt Lichtenberg letter dated 2026-05-20 asks Aaron to submit the E-Bilanzen for 2023 and 2024 electronically through a tax program/form. The letter states that the submitted Excel tables are not sufficient and asks for submission by 2026-06-10.

Source letter: `https://drive.google.com/file/d/1CicvmfDj5xMfO1lJ7EDA4BjTeQo6E7Rn/view`

## Platform Status

Status: provisional.
Source: eBilanz-Online public pages, in-app browser inspection, user-operated uploads, mapping PDFs, and protocol PDFs on 2026-06-03 to 2026-06-04.
Imported: 2026-06-03.
Review: Final transmission was completed for Aaron 2023 and 2024 on 2026-06-04. Future amendments still require fresh user approval before any certificate/PIN/voucher/payment/final send step.

- Public site: `https://www.ebilanzonline.de/`
- Login is required; user logged into Aaron's eBilanz-Online account in the in-app browser on 2026-06-03.
- eBilanz-Online supports multiple clients/mandants and periods.
- eBilanz-Online supports manual entry and Excel import. Public docs say data can be entered in the import module, GCD module, and GAAP module, or imported through Excel.
- Public docs say DATEV SKR03/SKR04 standard mappings are available. Aaron's workbooks use DATEV-style accounts; confirm SKR03 mapping in the app before relying on auto-mapping.
- A 13-digit ELSTER tax number is needed for E-Bilanz setup. For Berlin, the public converter rule is `11FF0BBBUUUUP`; derive the exact value from Aaron's live Notion/Drive tax number at data-entry time and do not store it here.
- An ElsterBasis software certificate is required for final transmission. Draft creation/import was possible before transmission. The final 2023 and 2024 transfers were completed by the user/operator on 2026-06-04.

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

## Final Filing Status

Status: provisional.
Source: eBilanz-Online account screens, user-uploaded import files, source FS workbooks, corrected mapping files, mapping PDF read-back, and downloaded protocol PDFs on 2026-06-03 to 2026-06-04.
Imported: 2026-06-03.
Review: The known account `1766` VAT mapping issue was corrected before final transmission. If an amended filing is later required, rerun pre-validation, review the full generated print/PDF packet, and download a fresh protocol after transmission.

### 2023 Filing

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
- Associated-account correction:
  - Account `1766` (`Umsatzsteuer nicht faellig 19%`) was moved from tax provisions to `Liabilities -> Other liabilities -> Taxes`, matching the VAT/tax-liability mapping used for `1776`, `1780`, and `1790`.
  - Corrected mapping upload artifact: `/Users/jp/Downloads/Aaron_2023_mapping_1766_VAT_fix_v2.xlsx`
  - Mapping PDF read-back confirms `Provision for other taxes (except deferred tax liabilities)` excludes `1766`, and `Other liabilities -> Taxes` includes `1766`.
- Transmission status: transmitted.
  - Protocol PDF: `/Users/jp/Downloads/protocol-1780574201263.pdf`
  - Protocol type: `Übertragungsprotokoll`, `ElsterBilanz`
  - Destination: Finanzamt Lichtenberg
  - Year-end date: `2023-12-31`
  - Sendedatum: `2026-06-04 13:56:08`
  - Transfer identifier: `eh1556a327x6986hag8t51say4b9rd5w`

### 2024 Filing

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
  - Provisions: source-backed provision accounts total `1,570.11` before eBilanz sign presentation, from accounts `970` and `977`
  - VAT payable / tax liabilities include source account `1766` after mapping correction
- Determination of taxable income by comparison of business assets:
  - Net profit/net loss: `171,456.02`
  - Business assets at financial year end: `15,613.15`
  - Business assets at previous financial year end: `22,054.66`
  - Withdrawals/distributions: `177,897.53`
  - Contributions: blank
- Determination of taxable income:
  - Taxable profit/loss: `171,456.02`
  - Net income/net loss for the financial year: `171,456.02`
- Associated-account correction:
  - Account `1766` (`Umsatzsteuer nicht faellig 19%`) was moved from tax provisions to the same VAT/tax-liability taxonomy row used by `1776`, `1780`, and `1790`.
  - Corrected mapping upload artifact: `/Users/jp/Downloads/Aaron_2024_mapping_1766_VAT_fix.xlsx`
- Transmission status: transmitted.
  - Protocol PDF: `/Users/jp/Downloads/protocol-1780574646716.pdf`
  - Protocol type: `Übertragungsprotokoll`, `ElsterBilanz`
  - Destination: Finanzamt Lichtenberg
  - Year-end date: `2024-12-31`
  - Sendedatum: `2026-06-04 14:03:53`
  - Transfer identifier: `eh1552bcc7uhnr5i8ia6pu53772dzw37`

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

## Post-Transmission Follow-Up

- Store the two protocol PDFs in Aaron's Drive filing folder and link them from the relevant Notion filing/task rows if not already done.
- Keep the corrected mapping upload workbooks as working artifacts only; the source FS workbooks remain the accounting source of truth.
- If the Finanzamt later asks for amendment/correction, use the corrected mapping rule above and create a new protocol after any fresh transmission.
