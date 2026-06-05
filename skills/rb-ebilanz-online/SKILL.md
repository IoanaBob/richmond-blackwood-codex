---
name: rb-ebilanz-online
description: Prepare Richmond Blackwood German E-Bilanz / electronic balance sheet filings in eBilanz-Online for individual or company clients, including Drive/Notion source checks, account-balance import workbooks, taxonomy mapping, validation, Notion closeout, and explicit no-transmission-without-approval controls.
---

# RB eBilanz-Online

Use this skill when preparing German E-Bilanz / electronic balance sheet filings through `ebilanzonline.de`, especially when Finanzamt rejects PDF, Excel, or ELSTER message uploads because the balance sheet must be transmitted in the official E-Bilanz format.

## Boundary

- eBilanz-Online is a manual filing platform. Use API/MCP/connectors for RB Notion, Drive, Gmail, and local source preparation. Use browser assistance only when the active browser tooling permits it; if Codex browser control is blocked by security policy for the tax-filing site, do not bypass it through another browser-control route. Prepare exact upload files and guide the human operator instead.
- Do not transmit, submit, authorize, pay, enter an ELSTER certificate PIN, consume a voucher, or click the final send action without explicit user approval naming the client, year, filing destination, and filing data to be transmitted.
- Do not store live credentials, ELSTER certificates, PINs, voucher/payment data, full tax IDs, full Steuer-IDs, or credential dumps in git, Notion comments, Slack, or chat. Store pointers and review status only.

## RB Account Model

- Prefer one Richmond Blackwood master eBilanz-Online account with separate `Mandanten`/clients and separate periods per client. eBilanz-Online's official multi-client FAQ says any number of companies/clients and periods can be created; use separate client accounts only if RB deliberately wants separate ownership, billing, or access isolation.
- Transmission still needs an ElsterBasis software certificate and the platform's paid transfer/voucher/payment flow. Do not upload or store certificate/PIN/payment material in git.
- Official reference checked on 2026-06-04:
  - Multi-client capability: `https://www.ebilanzonline.de/en/knowledge/faq/multi-client-capability/`
  - Technical requirements / Excel import / ElsterBasis: `https://www.ebilanzonline.de/en/knowledge/faq/technical-requirements/`

## Browser Access Notes

- Status on 2026-06-04: Codex in-app Browser control can attach to the production site at `https://www.ebilanzonline.de/`, switch to English at `/en/`, and open the login panel. A direct unauthenticated app URL redirects back to the public homepage, so ask the human operator to log in before trying to create clients, periods, imports, validation, or review exports.
- Status on 2026-06-05: Codex in-app Browser control was blocked by the browser URL policy when attaching to the authenticated eBilanz app URL. When this happens, do not bypass it through alternate browser-control routes. Continue by preparing accepted upload files, reading local/provided downloads, and giving exact operator steps.
- If registration is required, prefer the production registration path `https://www.ebilanzonline.de/ebo/register.html`. Avoid the public English hero link when it targets `https://beta.ebilanzonline.de/ebo/register.html`, because that beta host timed out during the 2026-06-04 retry.
- Do not enter or store RB account credentials. Let the operator type credentials/registration secrets, then continue after login.

## Source Setup

1. Identify the client, year, entity type, and filing owner:
   - Individual clients go under `clients/Individuals/<legal-name>/`.
   - Company clients go under `clients/Companies/<client-reference>/`.
   - Find or create the owning Notion filing/task row before doing platform work, and add progress comments there.
2. Read the authority correspondence first:
   - Confirm the Finanzamt, tax number context, deadline, and whether the authority explicitly rejected PDF/Excel/ELSTER attachment filing.
   - Record only source pointers and a short summary in repo files.
3. Gather source evidence:
   - Final balance sheet / financial statements workbook from Drive.
   - Trial balance, SUSA, DATEV export, account balances, or accounting workbook used to support the balance sheet.
   - Notion person/company metadata needed for the platform, while avoiding durable storage of sensitive identifiers.
4. Prepare a platform import workbook only from source-backed account balances:
   - Use account number, account name/description, and source-signed balance columns. Do not invert signs unless a platform read-back proves that the specific import path requires it.
   - Match the source chart of accounts, usually SKR03 or SKR04.
   - Prefer a clean single worksheet named `Import` with columns `Konto`/`Account`, `Beschriftung`/`Description`, `Saldo`/`Balance`, and optional `S/H` debit-credit marker. The `Saldo` column remains source-signed; `S/H` is a helper marker only.
   - For live account-balance uploads, produce a genuine legacy Excel BIFF8 `.xls` file with a short ASCII filename. This matched the Aaron Chamberlain 2023/2024 imports accepted by eBilanz-Online. Do not merely rename an `.xlsx`; verify with `file` that the output is an OLE/CDF Excel container before asking the operator to upload it.
   - Keep `.xlsx` versions as build/review artifacts only unless a specific platform screen has just accepted them. If a BIFF8 writer such as `xlwt` is needed, install it into a scoped temporary directory, generate the `.xls`, then verify the sheet appears in the platform before continuing.
   - If the source chart is not SKR03/SKR04, mark the workbook `REVIEW` and expect manual/custom eBilanz mapping after upload. Do not rely on standard automatic mapping for non-German account codes.
   - Keep generated import files as working artifacts, not as replacement source truth. Tell the user the exact local path when they must upload it manually.

## eBilanz-Online Workflow

1. Select or create the correct client in eBilanz-Online.
2. Create/select the period for the filing year:
   - Use the correct financial year start/end dates.
   - Choose the correct legal form, e.g. sole proprietor / `Einzelunternehmen` for freelancers.
   - Choose the correct report type, generally tax-basis E-Bilanz / tax balance sheet unless the source filing requires another basis.
   - Select the taxonomy version matching the year/platform recommendation.
   - Select the presentation/chart mapping matching the source, e.g. GKV with SKR03 or SKR04.
3. Upload account balances:
   - Navigate to account-balance assignment/import.
   - Upload the prepared workbook.
   - Map account column, description column, and value column exactly.
   - Apply the standard account mapping for the selected SKR chart and legal form.
4. Inspect and, if needed, patch associated-account mapping:
   - Download and inspect the eBilanz mapping file when a taxonomy row looks wrong after standard mapping.
   - For downloaded mapping files, do not re-save the workbook through Excel libraries such as openpyxl/artifact-tool unless the platform explicitly accepts the result. Preserve the original eBilanz OOXML package and patch only the necessary worksheet cell references.
   - If the mapping upload screen reports `No sheets have been found` for an `.xlsx`, convert or reuse a genuine legacy BIFF8 `.xls` mapping workbook and verify with `file` before asking the operator to upload it. CLV 2025 accepted `/Users/jp/Downloads/CLV_eBilanz_custom_mapping_v2.xls` on 2026-06-05 after rejecting a rebuilt `.xlsx`.
   - Use `scripts/patch_mapping_xlsx.py <input.xlsx> <output.xlsx> --account <bad-account> --target-account <good-account>` to move one account to the same taxonomy row as a known-good account while preserving the export structure.
   - Example SKR03 VAT check: account `1766` (`Umsatzsteuer nicht fällig 19%`) belongs with VAT/tax liabilities, normally the same taxonomy row as `1776`, `1780`, and `1790`, not under tax provisions. After correction, verify `1766` appears under `Liabilities -> Other liabilities -> Taxes`; provisions should reflect only real provision accounts such as `970`/`977`.
   - Example SKR04 corporate equity check: opening-balance accounts such as `9000` (`Saldenvorträge, Sachkonten`) and `9009` (`Saldenvorträge, Kreditoren`) may need custom mapping to retained earnings/opening equity. After uploading the mapping, verify that opening equity appears in the balance sheet; if the remaining imbalance equals the P&L net income/loss, populate `de-gaap-ci_bs.eqLiab.equity.netIncome` / `Net income/net loss for the financial year` with the source-backed P&L result rather than changing imported account balances.
   - Example SKR04 short-period corporate source with subledger detail: if the trial balance includes customer/supplier detail accounts `10000`-`99999` plus control accounts such as `1200` and `3300`, do not import both. Import only source-backed GL/control accounts unless the source explicitly requires account-detail transmission for those subledger rows; otherwise the balance sheet and P&L will be duplicated. Keep source signs from the trial balance and leave `S/H` blank when the live read-back shows that source signs produce correct liability/revenue presentation.
   - Example SKR04 corporate source with sole-proprietor-style accounts: accounts such as `2100` (`Privatentnahmen`) or `6673` (`Reisekosten Unternehmer Fahrtkosten`) may not map under a corporate SKR04 standard mapping. If a full mapping export cannot be patched cleanly during the live run, use only source-backed dedicated taxonomy rows, e.g. balance-sheet `Withdrawals` and income-statement `Business travel costs of employees`, and record the manual taxonomy row plus account rationale for reviewer follow-up.
5. Inspect balance sheet and P&L before manual changes:
   - Compare total assets, total equity/liabilities, and net income/loss to the source workbook.
   - Do not overwrite imported account balances just to make the platform balance.
   - Treat eBilanz transmission-page FAQ text such as numbered `Error message ...` articles as help content unless the page presents it as an active validation result for the draft.
6. Sole-proprietor equity correction, when source-backed:
   - If the platform mapping leaves equity opening capital or current-year profit empty, add manual values only to the dedicated equity taxonomy fields, not to random suspense accounts.
   - Typical fields are beginning business assets/opening capital and current-year net income/net loss for the private account / sole proprietor equity.
   - Use source opening capital and P&L profit signs as the platform expects.
   - If the current year's opening equity does not match the prior year's prepared closing equity, stop and flag it for reviewer confirmation rather than forcing continuity.
7. Populate tax-income schedules:
   - For `Determination of taxable income by comparison of business assets`, use the platform assistant/import-from-balance-sheet option when available, then verify year-end business assets, prior-year business assets, withdrawals, contributions, and resulting profit/loss.
   - If the business-assets assistant imports an odd prior-year amount from a deficit/withdrawal line, do not accept it automatically. Correct prior-year business assets to the source-backed opening business assets and verify that the calculated net profit/loss ties to both the balance sheet and P&L.
   - For `Determination of taxable income`, use the platform assistant/import-from-P&L option when available, then verify taxable profit/loss equals the expected source result unless there are documented tax adjustments.
8. Period components and validation:
   - Remove unused empty report components, especially `Notes`/`Anhang`, instead of adding dummy values. Empty enabled components can block pre-validation.
   - Keep only report components that are required or source-backed for the period.
9. Transmission page:
   - It is acceptable to inspect validation status and blocker messages.
   - Distinguish actual validation errors from generic FAQ/help text on the page.
   - Stop before certificate/PIN/voucher/payment/final send unless the user has explicitly approved submission.

## Validation

Before closeout, verify and state:

- Balance sheet assets equal equity/liabilities.
- P&L net income/loss matches the source workbook.
- Taxable profit/loss matches source profit/loss unless documented adjustments exist.
- Business-assets determination ties to source opening and closing equity/business assets.
- Prior-year opening/closing continuity is checked; any mismatch is flagged with exact years and amounts.
- Associated-account mapping has been reviewed for material classification errors, especially VAT/tax accounts that default into provisions.
- No final transmission/submission was performed unless explicitly approved.

## Closeout

1. Add a Notion task/filing comment with:
   - Client, year, eBilanz-Online period/draft ID if visible.
   - Taxonomy/version, chart mapping, entity/legal form, and filing basis used.
   - Final visible balance-sheet and profit/loss figures.
   - Remaining blockers or reviewer questions.
   - Explicit statement that no submission was performed.
2. Update repo client notes with source pointers and provisional status.
3. If later asked to submit, require a fresh approval that names:
   - Client/entity and filing year.
   - Destination/tax office context.
   - Exact prepared draft/data to transmit.
   - Certificate/PIN/voucher/payment method handling.
4. After an approved transmission:
   - Download and retain the ELSTER/eBilanz `Übertragungsprotokoll`.
   - Treat protocol PDFs with `Übertragungsprotokoll`, `Sendedatum`, destination Finanzamt, client, year-end date, tax number context, and transfer identifier as transmission proof for records.
   - Store the proof in Drive, update the live Notion filing/task row, and record the proof pointer in the client repo file.
