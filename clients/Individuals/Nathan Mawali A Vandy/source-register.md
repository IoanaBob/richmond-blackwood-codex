# Source Register - Nathan Mawali A Vandy

Status: provisional.
Imported: 2026-05-05.
Linked company reference: `VUN`.

| Source | Imported | Scope |
| --- | --- | --- |
| Notion individual record | 2026-05-05 | Individual identity, roles, contact, tax residence, tax identifiers, personal tax filings, and employment links. |
| Individual linked entities | 2026-05-05 | Bank accounts, tax filings, assets, correspondence, and expenses now have individual-level routing files. |
| German personal tax analysis SOP | 2026-05-05 | General DE analysis skill imported into `skills/rb-personal-tax-analysis-de/SKILL.md`; the fuller process doc is pending review before activation. |
| Gmail Schultze & Braun threads | 2026-05-05 | German insolvency-opening / solvency evidence, tax account context, questionnaire and consent-form attachments. |
| Gmail Workhub / Nexudus identity-address checks | 2026-05-05 | Personal identity/address-check correspondence moved from VUN company communications to `communications.md`. |
| Google Drive solvency evidence folder | 2026-05-05 | Financial Summary, bank statements, crypto holdings, identity, tenancy, employment, and shareholding evidence located in Drive; file URLs should be referenced from individual domain files. |
| Personal tax Drive folders | 2026-05-05 | 2023 and 2024 personal tax Drive folders recorded in `drive-locations.md`; connector returned no files during the crawl pass. |
| VUN company folder | 2026-05-05 | Company relationship and evidence pointer context from `../../Companies/VUN/`. |
| User-provided Nathan VAT and personal-tax workbooks | 2026-05-06 | 2023/2024 missing-invoices workbook, 2025 personal-tax analysis workbook, and 2025 Drive folder supplied by the user; both workbook links need native Sheets or local XLSX access before editing. |
| WhatsApp group `Vandy, Nathan | Richmond Blackwood` | 2026-05-06 | Nathan evidence messages and VAT/invoice context reviewed; one 2025 invoice pack downloaded and uploaded to Drive. |
| 2025 WhatsApp invoice pack Drive upload | 2026-05-06 | Superseded: `vandy_invoice_pack_polished_jul_dec_2025.pdf` was uploaded, then moved to Drive trash after the user identified corrected Drive-folder evidence. |
| Corrected Nathan customer Drive folder | 2026-05-06 | Source folder `https://drive.google.com/drive/folders/1D08w9OoSfEaRSpVjoWuvnSn50Gidctym` copied into the relevant 2024 sales and 2025 client-document destinations. |
| Machine-readable personal tax template | 2026-05-06 | Native Google Sheets template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit` created in the same Drive folder as the old Office-mode template; future personal-tax work should start here. |
| Codex workbook revisions | 2026-05-06 | Superseded audit trail: 2023/2024 VAT workbook and 2025 personal tax analysis workbook updated in Drive with formula-backed `codex - ... - 2026-05-06` tabs; source income/audit tabs preserved, with 2023/2024 Summary revenue formulas, 2025 Summary income/expense formulas, and the 2025 annual investment row now pointing to Codex tabs. Do not use this as the active future template workflow. |
| Coinbase/Kraken 2025 investment statements | 2026-05-06 | Coinbase 2025 PDF and Kraken 2025 monthly statement ZIP parsed for the 2025 investment breakdown; source facts are in `codex - invest - 2026-05-06`, with USDC treated as transfer/bridge and non-USDC cost-basis lots still missing for final gain classification. |
| 2025 personal bank statements for expense rebuild | 2026-05-06 | ABN AMRO Jan-Dec 2025 statement ZIPs, Revolut Jan-Dec 2025 statement PDF, and N26 Jan-Sep plus Nov-Dec 2025 statement ZIP parsed into formula-backed bank-account tabs in the 2025 personal tax analysis workbook; N26 October 2025 is still missing. |
| Codex bank-derived 2025 expense workbook revision | 2026-05-06 | 2025 workbook revised in Drive with `codex - exp rules - 2026-05-06`, `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06`; `Summary!B7` points to the bank-derived expense discrepancy total. |
| Codex bank-reconciliation 2025 business expense reclassification | 2026-05-06 | 2025 workbook revised in Drive so account tabs use visible formula-backed rule keys/categories/statuses with cached results; London/Dubai business-location spend, sensible electronics/telecom/subscriptions, and bank fees are counted as business expenses while supermarkets and Iceland travel are excluded unless separately confirmed. |
| Codex DappRadar full-statement revenue recheck | 2026-05-06 | 2025 workbook revised in Drive after checking all parsed ABN/Revolut/N26 statement rows; ABN 2025-06-10 and 2025-07-10 EUR 1,500 receipts from the DappRadar IBAN are now formula-linked in `codex - invoices - 2026-05-06` and `codex - rev disc - 2026-05-06`; remaining unmatched DappRadar/UAB amount is EUR 1,500. |
| 2023/2024 investment context for 2025 lots | 2026-05-06 | 2023/2024 analysis workbook reviewed for prior crypto purchase context; `Summary!E11` supports 2023 purchases of ETH, OP, AVAX, MATIC, ARB, and DOT, while `Summary!E26` notes small 2024 ETH/MATIC top-up buys. |
| Codex USDC investment reclassification revision | 2026-05-06 | 2025 workbook revised in Drive so `codex - invest - 2026-05-06` excludes USDC from investment proceeds/purchases, splits non-USDC investment rows by currency, and updates the annual investment audit row to non-USDC disposal proceeds. |
| Codex investment in/out summary restoration | 2026-05-06 | 2025 workbook revised in Drive so `codex - invest - 2026-05-06` again shows formula-backed investment out, staking income, net movement, transfer exclusions, and missing-basis review metrics at the top of the investment tab. |
| Codex revenue discrepancy no-summary revision | 2026-05-06 | 2025 workbook revised in Drive so `codex - rev disc - 2026-05-06` removes the summary/metric block, starts the review table at row 4/5, freezes only through row 5, and keeps status/save-location/action columns unwrapped. |

## Evidence Pointer

Actual exported/downloaded individual evidence should live in Drive. Local repo files should keep pointers only, starting with:

- `drive-locations.md`
