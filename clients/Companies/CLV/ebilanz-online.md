# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; Drive CLV 2024/2025 financial-statement sources; local batch build.
Imported: 2026-06-04.
Review: Upload/import and in-platform validation still require operator action. No final eBilanz transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/CLV_2024_ebilanz_import_legacy.xls` | `clv_2024_rebuilt_source.xlsx` | `Trial Balance 2024` | 28 | Legacy BIFF8 `.xls` generated for live eBilanz upload after the `.xlsx` upload stalled. |
| 2025 | `/Users/jp/Downloads/eBilanz_uploads_2026-06-04_v2/CLV_2025_ebilanz_import.xlsx` | `clv_2025_source.xlsx` | `Trial Balance 2025` | 42 | Ready for platform upload, then mapping/validation review. |

## Platform Notes

- Workbook shape follows the accepted Aaron import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`; live upload file should be a genuine BIFF8 `.xls`.
- Validate VAT/tax-liability mapping after upload; do not rely only on a green pre-validation status.

## Pause Handoff - 2026-06-04 18:30 IST

Status: provisional.
Source: live eBilanz-Online period `625433`; local CLV source workbooks/PDFs; user instruction to pause on 2026-06-04.
Imported: 2026-06-04.
Review: Resume only after the user says resume. Do not transmit, pay, enter certificate/PIN, or click final send without fresh explicit approval.

Current platform position:

- Client/period: `COHEN LIBERTAS VISION LIMITED`, 2024/01/01-2024/12/31, eBilanz period ID `625433`.
- Browser URL at pause: `https://www.ebilanzonline.de/ebo/index.html#:sections:taxonomy:viewGCD.html?periodeId=625433|viewname=gcd`.
- Account values upload is already accepted from `/Users/jp/Downloads/CLV_2024_ebilanz_import_legacy.xls`; do not redo account-value upload unless the draft is reset.
- Account-values wizard assignments used: sheet `Import`, account column `A (Konto)`, description column `B (Beschriftung)`, value column `C (Saldo)`, no debit/credit column.
- Standard associated-account mapping applied: `SKR 04 for Kapitalgesellschaften - Taxonomy 6.7`.

Observed platform figures after import/mapping:

- Balance sheet total assets: `3,095.79`.
- Balance sheet total equity and liabilities: `6,800.78`.
- Platform error: difference between total assets and total liabilities of `-3,704.99`.
- Income statement net income/net loss: `561.23`; this ties to the 2024 corporation/trade tax returns showing `561`.
- GCD setting `Income statement ends with net retained profits / accumulated loss`: `No`, so the normal net-income link is expected.

Diagnosis to resume from:

- The account-value file itself is source-signed but its raw account-balance sum is `-6,203.74`, exactly account `3300`.
- eBilanz currently maps `3300` to trade payables `6,203.74`, plus other liabilities `597.04`; the liabilities side totals `6,800.78`.
- The missing closing equity equals `-3,704.99`.
- Source account classification file marks opening balance accounts `9000` and `9009` as `Equity`. Their net balance is `-4,266.22`, and adding current-year profit `561.23` reconciles to closing equity `-3,704.99`.
- Therefore the next fix should be mapping/equity presentation, not another account-value upload.

Next action:

1. Return to `Associated accounts (mapping)` for period `625433`.
2. Download the current mapping file if needed.
3. Patch or upload mapping so accounts `9000` and `9009` map to retained earnings/opening equity, preferably taxonomy `de-gaap-ci_bs.eqLiab.equity.retainedEarnings` / `Retained profits/accumulated losses brought forward`.
4. Preserve the platform workbook format when patching. If using the eBilanz export, patch only the mapping worksheet structure rather than rebuilding with openpyxl.
5. Re-open `Tax balance sheet` and verify total assets equal total equity/liabilities. Expected missing equity close is `-3,704.99`.
6. Verify `Income statement` still shows net income `561.23`.
7. Continue to validation/review only after balance sheet ties. No transmission without fresh approval.
