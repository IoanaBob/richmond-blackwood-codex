# eBilanz-Online

Status: provisional.
Source: User request on 2026-06-04; Notion eBilanz task `https://app.notion.com/p/36ee413013148170b032fe9f451df367`; Drive CLV 2024/2025 financial-statement sources; local batch build.
Imported: 2026-06-04.
Review: CLV 2024 and CLV 2025 are populated in eBilanz-Online and balance after mapping/equity corrections. The CLV 2024 result mismatch raised on review is resolved: the current Drive sheet updated on 2026-06-04 and the filed KSt PDF support the eBilanz result. CLV 2025 source and filed-return figures reconcile once the filed pre-tax/rounded/add-back presentation is distinguished from the eBilanz net income after tax. CLV 2025 still has a prior-year continuity review flag: 2025 retained loss brought forward is `-3,794.63`, while the 2024 eBilanz closing equity is `-3,704.99`, a difference of `89.64`. Transmission still requires operator/professional review, paid assets/voucher/certificate/PIN handling, and explicit approval. No final eBilanz transmission was performed by Codex in this run.

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

## Reviewer Tie-Out - 2026-06-05

Status: provisional.
Source: Google Drive sheets `CLV 2024-01-01_to_2024-12-31` and `CLV 2025-01-01_to_2025-12-31`; local filed KSt/GewSt PDFs in Downloads; live eBilanz-Online read-back for CLV periods `625433` and `625447`.
Imported: 2026-06-05.
Review: Result tie-outs are resolved for CLV 2024 and CLV 2025. Do not transmit until the open CLV 2025 continuity and empty-component review items are accepted or corrected.

- CLV 2024: the current Drive sheet updated on 2026-06-04 shows net income/loss `561.23`, matching eBilanz period `625433`. The filed 2024 KSt PDF shows the same result rounded to `561`. The older Drive financial statement showing `2,617.90` is superseded for this filing unless Lorenzo or the reviewer says it is the final version.
- CLV 2025: the current Drive sheet and eBilanz period `625447` show net income after tax `1,333.63`. The filed KSt/GewSt PDFs show rounded pre-tax/business profit `1,432`; this reconciles because `1,333.63 + 98.40 = 1,432.03`, rounded to `1,432`. The KSt return then adds back rounded corporation-tax expense `98` to reach taxable income `1,530`.
- Remaining CLV 2025 review items are the `89.64` retained-loss/opening-equity continuity difference and the empty selected taxable-income special-cases component.

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

## CLV 2025 PDF Review - 2026-06-05

Status: provisional.
Source: eBilanz-Online print preview ZIP `/Users/jp/Downloads/COHEN_LIBERTAS_VISION_LIMITED_2025_01_01_-_2025_12_31_2025.zip`; extracted PDFs under `/private/tmp/rb-ebilanz-clv-review-2026-06-05/clv-2025`; source workbook `/private/tmp/rb-ebalanz-batch-2026-06-04/sources/clv_2025_source.xlsx`; 2024 comparison ZIP `/Users/jp/Downloads/COHEN_LIBERTAS_VISION_LIMITED_2024_01_01_-_2024_12_31_2024.zip`.
Imported: 2026-06-05.
Review: Do not transmit CLV 2025 until Lorenzo/operator/professional reviewer explains or approves the `89.64` prior-year continuity difference and the empty selected taxable-income special-cases report.

- Print preview ZIP downloaded successfully and contains five PDFs: Global Common Document, Balance sheet, Income statement, Detailed information, and Determination of taxable income.
- Balance sheet PDF: total assets `2,068.22`; total equity and liabilities `2,068.22`; equity `-2,461.00`; retained profits/accumulated loss brought forward `-3,794.63`; current-year net income `1,333.63`; liabilities `4,529.22`.
- Income statement PDF: net income/net loss for the financial year `1,333.63`; earnings after taxes `1,333.63`; gross revenue `40,886.81`.
- Detailed information PDF confirms retained-loss carry-forward from accounts `9000` and `9009` and current-year result from `9258`.
- GCD PDF lists report elements as balance sheet, income statement, account balances, and determination of taxable income for special cases.
- Determination of taxable income PDF says there are no data to be printed for the selected special-cases report. This may be acceptable only if that component is intentionally required for this client; otherwise remove the empty component before final review/transmission.
- Continuity check: CLV 2024 balance sheet PDF shows closing equity `-3,704.99` (`-4,266.22` retained loss plus `561.23` current-year profit). CLV 2025 source opening equity is `-3,794.63` from accounts `9000 + 9009`, so 2025 opens `89.64` lower than the 2024 eBilanz closing equity.
- Source check: the `89.64` difference is source-driven, not an import-file sign error. The 2025 trial balance has `9000 = -2,409.11` and `9009 = 6,203.74`, which the eBilanz balance sheet presents net as retained loss `-3,794.63`.

## Pause Handoff - 2026-06-05 00:30 IST

Status: provisional.
Source: live eBilanz-Online period `625447`; user instruction to pause on 2026-06-05.
Imported: 2026-06-05.
Review: Resume only after the user explicitly asks. Do not transmit, pay, enter certificate/PIN, or click final send without fresh explicit approval naming CLV 2025 and the transmission data.

Resume note 2026-06-05: Initial browser-control resume was blocked by a URL policy, but a later authenticated in-app browser session was controllable again. Codex opened CLV period `625447`, downloaded/read the print-preview ZIP, and found the `89.64` prior-year continuity review flag recorded above.

Current platform position:

- Browser URL at pause: `https://www.ebilanzonline.de/ebo/index.html#:sections:transmission:index.html?periodeId=625447`.
- CLV 2025 draft is balanced but not clean for transmission review until the `89.64` continuity difference is explained or approved.
- eBilanz PDF print preview ZIP is saved at `/Users/jp/Downloads/COHEN_LIBERTAS_VISION_LIMITED_2025_01_01_-_2025_12_31_2025.zip`.
- If resuming for review, do not regenerate or re-upload anything unless the reviewer instructs a correction. Start with the continuity question and empty special-cases taxable-income component.
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
