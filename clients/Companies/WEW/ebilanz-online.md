# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; WEW Drive financial-statement source; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Upload

| Period label | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/WEW_2024_ebilanz_import.xlsx` | `wew_2024_fs.xlsx` | `Trial Balance 2024` | 78 | Ready for platform upload only after confirming the exact eBilanz period dates. The Drive source located for WEW also referenced a financial statement year ended 2025-06-30, so do not assume a calendar-year period without review. |

## Platform Notes

- Workbook shape follows the accepted account-balance import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`.
- WEW has separate offboarding/export records in `drive-locations.md`; keep this E-Bilanz preparation separate from the handover package.
