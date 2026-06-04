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

## AGL 2024 In-Platform Status - 2026-06-04

Status: provisional.
Source: live eBilanz-Online period `625445`; local AGL 2024 import file; browser read-back on 2026-06-04.
Imported: 2026-06-04.
Review: Needs operator/professional review before any transmission. No final eBilanz transmission, certificate/PIN entry, payment, voucher purchase, or final send was performed.

- Period: `625445`, `AGILE LINCS LIMITED`, 2024/01/10-2024/12/31, taxonomy version 2024.
- Legal/entity setup used foreign corporate legal form and non-tax-privileged corporation with taxable purpose business.
- Account values imported from `/Users/jp/Downloads/AGL_2024_ebilanz_skr04_summary_import.xls`.
- Standard mapping applied: `SKR 04 for Kapitalgesellschaften - Taxonomy 6.8`.
- Manual/source-backed balance-sheet equity row populated: `de-gaap-ci_bs.eqLiab.equity.netIncome` / `Net income/net loss for the financial year` = `-14,447.12`.
- Balance sheet after correction: total assets `24,697.31`; total equity and liabilities `24,697.31`; equity `-14,355.60`; liabilities `39,052.91`.
- Income statement after correction: net income/net loss `-14,447.12`; earnings after taxes `-14,447.12`.
- Transmission page was inspected only.

## AGL 2025 Source Check - 2026-06-05

Status: provisional.
Source: local Downloads search and PDF text extraction on 2026-06-05.
Imported: 2026-06-05.
Review: Do not start AGL 2025 eBilanz from the currently found local PDF. A final 2025 account-level source workbook/trial balance still needs to be found or provided.

- Local file `/Users/jp/Downloads/Agile LinCS Limited FS Abridged Jan 10 2024 - Dec 31 2025.pdf` has a 2025-looking filename, but extracted text shows it is actually the AGL abridged audited financial statements for the financial period ended `31 December 2024`.
- Local search found AGL 2025 VAT protocol/annual VAT files, but not a final 2025 annual financial-statements workbook or trial balance suitable for eBilanz import.
- Next resume step, if AGL 2025 is still desired: search Drive/Slack/Lorenzo sources for a final 2025 AGL annual FS or trial balance before creating any eBilanz period. Do not rely on VAT filings alone for eBilanz.
