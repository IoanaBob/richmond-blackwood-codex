# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; AGL Drive workbook copied locally as `agl_2024_final_review_pack.xlsx`; local batch build.
Imported: 2026-06-04.
Review: AGL source uses non-SKR account codes and is marked review-only. Import only with manual/custom eBilanz mapping and reviewer approval. No eBilanz import or transmission was performed by Codex in this run.

## Prepared Upload

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/AGL_2024_ebilanz_import_REVIEW.xlsx` | `agl_2024_final_review_pack.xlsx` | `Trial Balance` | 31 | Review-only: source is a final E-Bilanz review/data-entry pack with non-SKR account codes. Blank source bank-account rows were assigned upload account codes `1801`-`1804` to make the account-balance import structurally uploadable. |

## Platform Notes

- The source workbook says the E-Bilanz XBRL still needs to be generated and transmitted in E-Bilanz-capable software.
- The source checks show the trial balance balances to zero and the German mapping presentation balances, but this still needs in-platform validation.
- Do not use standard automatic SKR03/SKR04 mapping blindly for this upload; inspect account mapping row by row.
