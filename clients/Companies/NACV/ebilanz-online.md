# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; NACV Drive accounting sources; local batch build.
Imported: 2026-06-04.
Review: NACV 2024 was imported and pre-validated cleanly in eBilanz-Online on 2026-06-05, but still requires operator/professional review before transmission. Use verified legacy `.xls` upload files for live eBilanz uploads; the `.xlsx` build artifacts are review/build artifacts. No final transmission, certificate/PIN entry, voucher/payment action, or final send was performed.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2024_ebilanz_import_legacy.xls` | `nacv_2024_sfs.xlsx` | `TB 2024` | 64 | Ready for platform upload, then mapping/validation review. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |
| 2025 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2025_ebilanz_import_legacy.xls` | `nacv_may2024_june2025.xlsx` | `Trial Balance 2025` | 56 | Ready for platform upload, then mapping/validation review. Confirm exact period dates before creating the eBilanz period. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |

Build artifacts retained for audit only: `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2024_ebilanz_import.xlsx` and `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2025_ebilanz_import.xlsx`.

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- NACV has open Finanzamt follow-up context around 2024/2025 company taxes, prepayments, and VAT reinstatement; do not transmit until those reviewer questions are cleared or explicitly accepted.

## Live eBilanz Drafts

### 2024

Status: provisional.
Source: live eBilanz-Online period `625488`; user-guided upload and browser read-back on 2026-06-05; local GL-only build artifacts.
Imported: 2026-06-05.
Review: Ready for review in eBilanz-Online. Do not transmit until the reviewer approves the prepared draft and the user gives fresh explicit transmission approval.

- Client/period: `NA CAPITAL VENTURES LIMITED`, 2024/01/01-2024/12/31, eBilanz period ID `625488`.
- Upload used: `/Users/jp/Downloads/NACV_2024_ebilanz_GL_only_import.xls`, generated from `/private/tmp/rb-nacv-ebalanz/NACV_2024_ebilanz_GL_only_import.xlsx`.
- Import shape: sheet `Import`, account column `A (Konto)`, description column `B (Beschriftung)`, value column `C (Saldo)`, no S/H column.
- Source-control choice: GL/control accounts only; duplicate customer/supplier subledger rows were removed from the upload so control accounts were not double-counted.
- Mapping: standard SKR04 mapping applied, then source-backed manual taxonomy entries were used for SKR04 accounts that did not map cleanly.
- Manual income-statement correction: entrepreneur travel accounts `6670`, `6673`, and `6674` were added to `Business travel costs of employees` for total `3,426.95`.
- Manual balance-sheet correction: net income/net loss for the financial year set to `33,594.80`; withdrawal/deficit line set to `2,000.00` to reflect source account `2500 Privatentnahmen allgemein`.
- Business-assets determination: closing business assets `31,594.80`, prior-year business assets `0.00`, capital adjustments `0.00`, withdrawals/distributions `2,000.00`, contributions `0.00`, producing net profit `33,594.80`.
- Platform assistant note: the business-assets assistant initially imported prior-year business assets as `-2,000.00`; this was corrected to the source-backed `0.00` before validation.
- Pre-validation read-back on 2026-06-05: `No errors or warnings present`.
- No final eBilanz transmission, certificate/PIN entry, voucher/payment action, or final send was performed.
