# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; PCL Drive accounting sources; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. Use the verified legacy `.xls` upload files for live eBilanz uploads; the `.xlsx` build artifacts are not the preferred live-upload files. Use calendar-year eBilanz periods for PCL unless Notion, filed German tax returns, source accounts, or reviewer instructions show an approved deviating fiscal year. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 account export | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2024_ebilanz_import_legacy.xls` | `pcl_2024_export_konten.xlsx` | `Export_Konten_von_2024-05-01_bi` | 58 | Ready for platform upload after confirming the 2024 first-year short-period start date. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |
| 2025 account export | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2025_ebilanz_import_legacy.xls` | `pcl_2025_export_konten.xlsx` | `Export_Konten_von_2025-01-01_bi` | 47 | Ready for platform upload as the normal 2025 calendar-year file if the filed German KSt/source accounts use `2025-01-01` to `2025-12-31`. Verified as genuine BIFF8/OLE Excel with `file` on 2026-06-05. |
| FY2025 full SFS period review | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_FY2025_full_sfs_period_ebilanz_import_REVIEW.xlsx` | `pcl_2025_sfs.xlsx` | `TB 09.05.24-30.06.25` | 58 | Review-only support material. Do not create a separate `09.05.2024`-`30.06.2025` eBilanz period from this file unless a filed German return or approved deviating fiscal year explicitly uses that period. |

Build artifacts retained for audit only: `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2024_ebilanz_import.xlsx` and `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/PCL_2025_ebilanz_import.xlsx`.

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- Normal PCL eBilanz periods should be calendar years after the first year. Use a first-year short period from incorporation/commencement to year-end when the source/filer confirms that start date.
- Full SFS/statutory-accounts workbooks that cross calendar years are support/review inputs only; they do not override German eBilanz period dates without filed-return or approved-fiscal-year evidence.
