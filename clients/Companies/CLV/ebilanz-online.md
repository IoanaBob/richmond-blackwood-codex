# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; Drive CLV 2024/2025 financial-statement sources; local batch build.
Imported: 2026-06-04.
Review: CLV 2024 is populated in eBilanz-Online and balances after the 2026-06-04 mapping/equity correction. Transmission still requires operator review, paid assets/voucher/certificate/PIN handling, and explicit approval. No final eBilanz transmission was performed by Codex in this run.

## Prepared Uploads

| Period | Local upload file | Source workbook | Source sheet | Rows | Review |
| --- | --- | --- | --- | ---: | --- |
| 2024 | `/Users/jp/Downloads/CLV_2024_ebilanz_import_legacy.xls` | `clv_2024_rebuilt_source.xlsx` | `Trial Balance 2024` | 28 | Legacy BIFF8 `.xls` generated for live eBilanz upload after the `.xlsx` upload stalled. |
| 2025 | `/Users/jp/Downloads/CLV_eBilanz_2025_corrected_import.xls` | `clv_2025_source.xlsx` | `Trial Balance 2025` | 28 | Imported live on 2026-06-05 using source-signed value column `D (Source signed balance)`. Closing/P&L account `9258` intentionally excluded from custom mapping to avoid duplicating profit. |

## Platform Notes

- Workbook shape follows the accepted Aaron import pattern: single `Import` sheet with `Konto`, `Beschriftung`, `Saldo`, and `S/H`; live upload file should be a genuine BIFF8 `.xls`.
- Validate VAT/tax-liability mapping after upload; do not rely only on a green pre-validation status.
- For CLV 2024, the account mapping file `/Users/jp/Downloads/CLV_eBilanz_custom_mapping_v2.xls` was accepted by eBilanz-Online on 2026-06-04 using sheet `Mapping`, taxonomy column `A (Taxonomy-ID)`, description column `D (Account description)`, account column `C (Account)`, and no changing-balance group column.
- For CLV 2025, the same legacy BIFF8 mapping upload file `/Users/jp/Downloads/CLV_eBilanz_custom_mapping_v2.xls` was accepted on 2026-06-05. A rebuilt `.xlsx` mapping file was not parsed by eBilanz (`No sheets have been found`), so use genuine legacy `.xls` for mapping imports too when this screen rejects `.xlsx`.
- For corporate SKR04 drafts with opening-balance accounts `9000`/`9009`, mapping those accounts to retained earnings/opening equity fixes opening equity only. If the balance sheet remains off by the P&L net result, enter the source-backed amount in `de-gaap-ci_bs.eqLiab.equity.netIncome` / `Net income/net loss for the financial year`, not in a suspense account.

## CLV 2025 In-Platform Status - 2026-06-05

Status: provisional.
Source: live eBilanz-Online period `625447`; local CLV 2025 import and mapping files; browser read-back on 2026-06-05.
Imported: 2026-06-05.
Review: Needs operator/professional review before any transmission. Transmission page requires ELSTER certificate/PIN and voucher/payment handling. No final eBilanz transmission, certificate/PIN entry, payment, voucher purchase, or final send was performed.

- Period: `625447`, `COHEN LIBERTAS VISION LIMITED`, 2025/01/01-2025/12/31, taxonomy version 2025.
- Account values imported from `/Users/jp/Downloads/CLV_eBilanz_2025_corrected_import.xls`.
- Account-value import assignments used: sheet `Import`, account column `A (Konto)`, description column `B (Beschriftung)`, value column `D (Source signed balance)`, no debit/credit column. Do not use the platform-facing `EBilanz-Wert` column for this live import; it inverted liabilities/revenue incorrectly.
- Custom mapping imported from `/Users/jp/Downloads/CLV_eBilanz_custom_mapping_v2.xls` using sheet `Mapping`, taxonomy column `A (Taxonomy-ID)`, description column `D (Account description)`, account column `C (Account)`, and no changing-balance group column.
- Mapping result fixed the standard SKR04 gaps for opening balance/equity accounts `9000`/`9009` and travel-cost account `6673`.
- Income statement after mapping import: net income/net loss `1,333.63`; earnings after taxes `1,333.63`.
- Balance sheet after mapping import: total assets `2,068.22`; total equity and liabilities `2,068.22`; equity `-2,461.00`; liabilities `4,529.22`.
- Dashboard still shows import rows as `No value`; use taxonomy read-back totals as the authoritative review signal.
- Transmission page was opened for inspection only. It showed certificate/PIN/voucher fields and generic FAQ text; no validation error was acted on and no transmission step was taken.

## Pause Handoff - 2026-06-05 00:30 IST

Status: provisional.
Source: live eBilanz-Online period `625447`; user instruction to pause on 2026-06-05.
Imported: 2026-06-05.
Review: Resume only after the user explicitly asks. Do not transmit, pay, enter certificate/PIN, or click final send without fresh explicit approval naming CLV 2025 and the transmission data.

Current platform position:

- Browser URL at pause: `https://www.ebilanzonline.de/ebo/index.html#:sections:transmission:index.html?periodeId=625447`.
- CLV 2025 draft is balanced and ready for operator/professional review.
- No eBilanz PDF print preview was downloaded during this pause point.
- If resuming for review, first download/print the transmission-page `Print preview as PDF` for CLV 2025 and compare it against the source workbook.
- If resuming for filing, stop before certificate/PIN/voucher/payment/final send and require fresh explicit approval.

## CLV 2024 In-Platform Status - 2026-06-04

Status: provisional.
Source: live eBilanz-Online period `625433`; local CLV import/mapping files; browser read-back on 2026-06-04.
Imported: 2026-06-04.
Review: Needs operator/professional review before any transmission. Transmission page showed `Assets: 0`; do not proceed without arranging payment/voucher/certificate/PIN and fresh explicit approval.

- Period: `625433`, `COHEN LIBERTAS VISION LIMITED`, 2024/01/01-2024/12/31.
- Account values imported from `/Users/jp/Downloads/CLV_2024_ebilanz_import_legacy.xls`.
- Mapping correction imported from `/Users/jp/Downloads/CLV_eBilanz_custom_mapping_v2.xls`.
- Opening equity accounts `9000` and `9009` now populate equity with imported value `-4,266.22`.
- Manual value entered in balance sheet equity row `de-gaap-ci_bs.eqLiab.equity.netIncome` / `Net income/net loss for the financial year`: `561.23`, matching the P&L net income.
- Balance sheet after correction: total assets `3,095.79`; total equity and liabilities `3,095.79`; equity `-3,704.99`; liabilities `6,800.78`.
- Income statement after correction: net income/net loss `561.23`; earnings after taxes `561.23`.
- No transmission, certificate/PIN entry, payment, voucher purchase, or final send was performed.

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
