# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; CBMAX 2024 SFS source workbook; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Upload

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/CBMAX_2024_ebilanz_import.xlsx` | `cbmax_2024_sfs_final.xlsx` | `TB 2024` | 35 | Ready for platform upload, then mapping/validation review. |

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- Keep the existing CBMAX tax-residence/VAT limbo context separate from this E-Bilanz upload; do not treat import readiness as resolution of ROS/German VAT open points.
