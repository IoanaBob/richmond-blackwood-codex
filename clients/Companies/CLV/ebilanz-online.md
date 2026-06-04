# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; Drive CLV 2024/2025 financial-statement sources; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. No new eBilanz import or transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/CLV_2024_ebilanz_import_legacy.xls` | `clv_2024_rebuilt_source.xlsx` | `Trial Balance 2024` | 28 | Legacy BIFF8 `.xls` generated for live eBilanz upload after the `.xlsx` upload stalled. |
| 2025 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/CLV_2025_ebilanz_import.xlsx` | `clv_2025_source.xlsx` | `Trial Balance 2025` | 42 | Ready for platform upload, then mapping/validation review. |

## Platform Notes

- Workbook shape follows the accepted Aaron import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`; live upload file should be a genuine BIFF8 `.xls`.
- Validate VAT/tax-liability mapping after upload; do not rely only on a green pre-validation status.
