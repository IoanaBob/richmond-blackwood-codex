# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; WEW Drive financial-statement source; local batch build.
Imported: 2026-06-04.
Review: WEW 2024 is populated in eBilanz-Online and ties to the source after account-value and manual taxonomy corrections. The 2024 period-start review is resolved: Notion company data records 2024-05-13 as the registration/start date, matching the eBilanz period start. Empty editable report components were removed live on 2026-06-05; the special-cases taxable-income component remains selected because eBilanz displayed it as disabled/forced for this period setup. Transmission still requires operator/professional review, paid assets/voucher/certificate/PIN handling, and explicit approval. No final eBilanz transmission was performed by Codex in this run.

## Prepared Upload

| Period label | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 initial pack | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/WEW_2024_ebilanz_import.xlsx` | `wew_2024_fs.xlsx` | `Trial Balance 2024` | 78 | Superseded for live upload: it included duplicate customer/supplier subledger rows and was `.xlsx`, not the preferred legacy `.xls`. |
| 2024 live import | `/Users/jp/Downloads/WEW_2024_ebilanz_import_sourcesigned_legacy.xls` | `wew_2024_fs.xlsx` | `Trial Balance 2024` | 23 | Genuine BIFF8 `.xls`; GL-only nonzero accounts below `10000`; source-signed `SUM of Db-Cr` values; no S/H column. Accepted by eBilanz-Online on 2026-06-04. |

## Platform Notes

- Workbook shape for live account-value uploads should be a single `Import` sheet with `Konto`, `Beschriftung`, and source-signed `Saldo`. For WEW, leaving `S/H` blank and preserving source signs was necessary; inverted/platform-facing signs made the liability side display incorrectly.
- WEW has separate offboarding/export records in `drive-locations.md`; keep this E-Bilanz preparation separate from the handover package.

## WEW 2024 In-Platform Status - 2026-06-04

Status: provisional.
Source: live eBilanz-Online period `625444`; local WEW source workbook and corrected import file; browser read-back on 2026-06-04.
Imported: 2026-06-04.
Review: Needs operator/professional review before any transmission. Transmission page was inspected only and requires certificate/PIN/voucher/payment inputs; do not proceed without fresh explicit approval.

- Period: `625444`, `WEWRITE CREATIVE LIMITED`, 2024/05/13-2024/12/31.
- Account values imported from `/Users/jp/Downloads/WEW_2024_ebilanz_import_sourcesigned_legacy.xls`.
- Import assignments used: sheet `Import`, account column `A (Konto)`, description column `B (Beschriftung)`, value column `C (Saldo)`, no S/H column.
- Standard SKR04 mapping was retained where it mapped source accounts correctly.
- Duplicate customer/supplier detail accounts `10000`-`99999` were excluded from the live import because they duplicated control accounts `1200` and `3300`.
- Manual balance-sheet equity values entered from source: `de-gaap-ci_bs.eqLiab.equity.netIncome` / `Net income/net loss for the financial year` = `20,995.73`; `de-gaap-ci_bs.eqLiab.equity.association.withdrawals` / `Withdrawals` = `40.00`.
- Manual income-statement value entered from source: `de-gaap-ci_is.netIncome.regular.operatingTC.otherCost.employee` / `Business travel costs of employees` = `126.38`, matching account `6673` (`Reisekosten Unternehmer Fahrtkosten`) because the corporate SKR04 standard mapping did not map that sole-proprietor-style travel account.
- Balance sheet after correction: total assets `22,320.67`; total equity and liabilities `22,320.67`; equity `20,955.73`; liabilities `1,364.94`.
- Income statement after correction: net income/net loss `20,995.73`; earnings after taxes `20,995.73`.
- Transmission page was inspected only. No certificate/PIN entry, payment, voucher purchase, transmission, or final send was performed.

## WEW 2024 PDF Review - 2026-06-05

Status: provisional.
Source: eBilanz-Online print-preview ZIP `/Users/jp/Downloads/WEWRITE_CREATIVE_LIMITED_2024_05_13_-_2024_12_31_2024.zip`; extracted PDFs under `/private/tmp/rb-ebilanz-company-review-2026-06-05/wew-2024`.
Imported: 2026-06-05.
Review: Editable empty report components were removed live on 2026-06-05. The remaining empty `Determination of taxable income in special cases` component is platform-forced/disabled in period setup and should be accepted or escalated by the reviewer before transmission.

- Print preview ZIP contains Global Common Document, Balance sheet, Income statement, Appropriation of profits, Notes, Statement of changes in fixed assets, Detailed information, and Determination of taxable income.
- Balance sheet PDF: total assets `22,320.67`; total equity and liabilities `22,320.67`; equity `20,955.73`; current-year net income `20,995.73`; liabilities `1,364.94`.
- Income statement PDF: net income/net loss `20,995.73`; earnings after taxes `20,995.73`; gross profit `50,610.29`; gross revenue `86,285.40`.
- Empty selected components: Appropriation of profits, Notes, Statement of changes in fixed assets, and Determination of taxable income in special cases all say there are no data to print. These empty enabled components can block validation and should be removed unless a reviewer says they are required for WEW.

## WEW 2024 Period Component Cleanup - 2026-06-05

Status: provisional.
Source: live eBilanz-Online period `625444`; browser read-back on 2026-06-05.
Imported: 2026-06-05.
Review: Reviewer should confirm that the platform-forced special-cases taxable-income component is acceptable even though the earlier print-preview PDF had no data to print.

- Removed editable empty report components in period administration: `Appropriation of profits`, `Notes`, and `Statement of changes in fixed assets (gross)`.
- eBilanz displayed `Determination of taxable income in special cases` as checked and disabled, so it could not be removed without changing another period/legal-form setting.
- Period details read-back after save shows selected components: `Balance sheet`, `Income statement`, `Detailed information / Account details`, and `Determination of taxable income in special cases`.
- Platform displayed last saved timestamp: `05.06.2026, 11:37`.
- No final eBilanz transmission, certificate/PIN entry, payment, voucher purchase, or final send was performed.

## WEW 2024 Period Tie-Out - 2026-06-05

Status: provisional.
Source: Notion WEW company record; live eBilanz-Online period `625444`.
Imported: 2026-06-05.
Review: Period start is resolved for transmission review, subject to the normal final no-submission approval gate.

- eBilanz period `625444` starts on `2024-05-13`.
- Notion company data records WEW registration/start date as `2024-05-13`, so the short first-year eBilanz period is consistent with the company record.
