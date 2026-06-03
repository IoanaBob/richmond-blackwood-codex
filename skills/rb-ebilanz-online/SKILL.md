---
name: rb-ebilanz-online
description: Prepare Richmond Blackwood German E-Bilanz / electronic balance sheet filings in eBilanz-Online for individual or company clients, including Drive/Notion source checks, account-balance import workbooks, taxonomy mapping, validation, Notion closeout, and explicit no-transmission-without-approval controls.
---

# RB eBilanz-Online

Use this skill when preparing German E-Bilanz / electronic balance sheet filings through `ebilanzonline.de`, especially when Finanzamt rejects PDF, Excel, or ELSTER message uploads because the balance sheet must be transmitted in the official E-Bilanz format.

## Boundary

- eBilanz-Online is a manual filing platform. Use API/MCP/connectors for RB Notion, Drive, Gmail, and local source preparation, but browser assistance is acceptable for the eBilanz-Online UI after confirming there is no practical approved API/MCP route for the current task.
- Do not transmit, submit, authorize, pay, enter an ELSTER certificate PIN, consume a voucher, or click the final send action without explicit user approval naming the client, year, filing destination, and filing data to be transmitted.
- Do not store live credentials, ELSTER certificates, PINs, voucher/payment data, full tax IDs, full Steuer-IDs, or credential dumps in git, Notion comments, Slack, or chat. Store pointers and review status only.

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
   - Use account number, account name/description, and signed balance columns.
   - Match the source chart of accounts, usually SKR03 or SKR04.
   - Prefer a clean `Import` sheet with columns `Account`, `Description`, and `Balance`; include debit/credit marker only if the platform/source format requires it.
   - If eBilanz-Online rejects `.xlsx`, create a legacy Excel `.xls` import file from the same data.
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
4. Inspect balance sheet and P&L before manual changes:
   - Compare total assets, total equity/liabilities, and net income/loss to the source workbook.
   - Do not overwrite imported account balances just to make the platform balance.
5. Sole-proprietor equity correction, when source-backed:
   - If the platform mapping leaves equity opening capital or current-year profit empty, add manual values only to the dedicated equity taxonomy fields, not to random suspense accounts.
   - Typical fields are beginning business assets/opening capital and current-year net income/net loss for the private account / sole proprietor equity.
   - Use source opening capital and P&L profit signs as the platform expects.
   - If the current year's opening equity does not match the prior year's prepared closing equity, stop and flag it for reviewer confirmation rather than forcing continuity.
6. Populate tax-income schedules:
   - For `Determination of taxable income by comparison of business assets`, use the platform assistant/import-from-balance-sheet option when available, then verify year-end business assets, prior-year business assets, withdrawals, contributions, and resulting profit/loss.
   - For `Determination of taxable income`, use the platform assistant/import-from-P&L option when available, then verify taxable profit/loss equals the expected source result unless there are documented tax adjustments.
7. Transmission page:
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
4. After an approved transmission, store the transfer protocol/proof in Drive, update the live Notion filing/task row, and record the proof pointer in the client repo file.
