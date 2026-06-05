# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; PCL Drive accounting sources; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. Use the verified legacy `.xls` upload files for live eBilanz uploads; the `.xlsx` build artifacts are not the preferred live-upload files. PCL period boundaries need confirmation before period creation/import. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 account export | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2024_ebilanz_import_legacy.xls` | `pcl_2024_export_konten.xlsx` | `Export_Konten_von_2024-05-01_bi` | 58 | Ready for platform upload only after confirming the correct short-period dates. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |
| 2025 account export | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2025_ebilanz_import_legacy.xls` | `pcl_2025_export_konten.xlsx` | `Export_Konten_von_2025-01-01_bi` | 47 | Ready for platform upload only after confirming the correct short-period dates. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |
| FY2025 full SFS period review | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_FY2025_full_sfs_period_ebilanz_import_REVIEW.xlsx` | `pcl_2025_sfs.xlsx` | `TB 09.05.24-30.06.25` | 58 | Review-only. This is a full SFS-period support file, not a confirmed separate calendar-year eBilanz upload. |

Build artifacts retained for audit only: `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2024_ebilanz_import.xlsx` and `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2025_ebilanz_import.xlsx`.

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- PCL appears to have short-period/account-export boundaries. Confirm period setup in eBilanz before upload so the period date range matches the source.
