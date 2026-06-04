# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; WEW Drive financial-statement source; local batch build.
Imported: 2026-06-04.
Review: WEW 2024 is populated in eBilanz-Online and ties to the source after account-value and manual taxonomy corrections. Transmission still requires operator/professional review, paid assets/voucher/certificate/PIN handling, and explicit approval. No final eBilanz transmission was performed by Codex in this run.

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
