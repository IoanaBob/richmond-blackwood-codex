# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; NACV Drive accounting sources; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2024_ebilanz_import.xlsx` | `nacv_2024_sfs.xlsx` | `TB 2024` | 64 | Ready for platform upload, then mapping/validation review. |
| 2025 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/NACV_2025_ebilanz_import.xlsx` | `nacv_may2024_june2025.xlsx` | `Trial Balance 2025` | 56 | Ready for platform upload, then mapping/validation review. Confirm exact period dates before creating the eBilanz period. |

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- NACV has open Finanzamt follow-up context around 2024/2025 company taxes, prepayments, and VAT reinstatement; do not transmit until those reviewer questions are cleared or explicitly accepted.
