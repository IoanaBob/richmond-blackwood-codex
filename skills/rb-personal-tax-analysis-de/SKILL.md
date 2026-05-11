---
name: rb-personal-tax-analysis-de
description: Prepare Richmond Blackwood German personal tax analysis work for an individual client/person, including Drive setup, client document request, Notion Individuals cross-check, linked-entity routing, and repo updates.
---

# RB Personal Tax Analysis - DE

Use this skill when preparing a German personal tax analysis for an individual linked to Richmond Blackwood work.

## Read First

1. `clients/Individuals/<legal-name>/README.md`
2. `clients/Individuals/<legal-name>/tax-filings.md`
3. `clients/Individuals/<legal-name>/personal-tax-returns.md`
4. `clients/Individuals/<legal-name>/linked-entities.md`
5. `clients/Individuals/<legal-name>/drive-locations.md`
6. If linked to a company, `clients/Companies/<client-reference>/linked-individuals.md`

Note: the fuller process document is pending review and should not be treated as active until restored from the process-file stash or recreated on the active branch.

## Source Notion Pages

- Main SOP: `https://www.notion.so/343e4130131480e49963d5d4cce17f55`
- Freelancer checklist: `https://www.notion.so/199e413013148032a1e2fe436b461e7a`
- Employee checklist: `https://www.notion.so/199e4130131480969768d79991ca4d1c`
- Company director with RB checklist: `https://www.notion.so/343e41301314808da9a5dfd769af90ea`
- Individuals database: `https://www.notion.so/295d1e1ad2084f8f9bf1fa741fd9edb3`
- Personal Tax Filings database: `https://www.notion.so/206e41301314800493d2e00f69621528` / `collection://206e4130-1314-8182-b513-000b0c0cc725`
- Tasks database: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Task template: `[Annually] Personal Tax Filing` at `https://www.notion.so/32ee413013148090a435e5858b918f25`
- Default analysis assignee: Ioana Surdu-Bob, Notion user `3a46f87a-9bc2-408f-baff-b4c23326e0f2`
- Default filing assignee: Johnpaul Okolie, Notion user `b85bb822-968a-4f79-809a-5ee2f3e6d828`

## Workflow

1. Confirm the individual legal name, Notion individual record, filing year, and linked company reference.
2. Determine whether the filing period includes freelancer status, employee status, RB company-director status, or a mixed period.
   - Keep one Notion task per real piece of work. If separate spreadsheets/source sets exist, split them into separate analysis tasks rather than combining years by habit.
   - When reviewing, narrowing, or creating tasks, add Notion task comments that explain the progress and next step so the requester/team can see what changed.
3. Create/find the Drive folder structure from the company client folder:
   - `Personal tax filings/<individual legal name>/<year>/Documents from Client - <year> - <first name>/`
4. Record Drive folder URLs in the individual `drive-locations.md` and the live Notion filing entry.
   - Use the Personal Tax Filings database at `https://www.notion.so/206e41301314800493d2e00f69621528`.
   - If a Drive filing folder is newly created or an existing filing folder is discovered, update the respective filing entry `GDrive Docs` field with that folder URL immediately and verify it by read-back.
   - Whenever the analysis status changes in the repo, workbook, task, or operator workflow, update the respective filing entry `Status` field too. Do not rely only on local files, workbook notes, or task comments.
   - Use the live status options exactly as configured, for example `Pending`, `Pending upload`, `In progress`, `Filed`, and `Paid`.
   - When the client has shared evidence and it still needs upload, review, or reconciliation, set `Document gathering status` to `In progress`.
   - When all currently required client evidence for that filing stage is in Drive and linked, set `Document gathering status` to `Attached in Drive`. Use `Nothing to Provide` only when the client/operator explicitly confirms there are no documents to provide.
   - Use `Reminded Client` only after a reminder was sent, and leave or set `Not provided` while evidence has not been supplied.
   - Record progress/explanations in actual Notion page comments, not in a database `Comments` field.
5. Select the right client checklist and draft the upload request.
6. Copy the machine-readable German personal tax analysis template into the filing-year folder.
   - Use the native Google Sheets template `RB German Personal Tax Analysis - Machine-Readable Template v1`: `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.
   - Treat the live native Google Sheet as the maintained template source of truth. Create client workbooks by copying that existing spreadsheet through the Google Drive/Sheets connector into the correct filing folder and renaming the copy.
   - Do not regenerate the template from local TypeScript, XLSX builders, CSV exports, or ad hoc scripts. Template structure changes should be made directly to the maintained native Sheet through the spreadsheet connector after user review.
   - Do not create new client analyses by adding ad hoc `codex - ...` tabs to the legacy human-entry template. That Nathan/VUN-era approach is superseded by the machine-readable ledger workflow.
   - Follow the template control rules below for sheet usage, claims, checks, and review status.
7. Pull RB payslips/payroll yearly overview if the individual was with RB during the period.
8. Cross-check the Notion Individuals record:
   - Tax ID / Steuer-ID.
   - Krankenkasse / health insurance.
   - Tax class.
   - Number of children.
   - Child allowance details when relevant.
   - Address.
   - Marital status.
   - Refund bank account details.
9. Route linked records:
   - Bank accounts to `bank-accounts.md`.
   - Tax filings to `tax-filings.md` and `personal-tax-returns.md`.
   - Assets to `assets.md`.
   - Correspondence to `correspondence.md`.
   - Expenses to `expenses.md`.
10. Ensure the live filing record has the right Notion task relations before or while analysis starts:
   - Fetch the Personal Tax Filings row and inspect `Preparation Task` and `Filing Task`.
   - If `Preparation Task` is empty, create an analysis task in the Tasks database using the `[Annually] Personal Tax Filing` template. Name it for the person/year, assign it to Ioana Surdu-Bob, attach the correct client project in `Project`, and link it back to the filing row in `Preparation Task`.
   - If `Filing Task` is empty, create a separate filing task in the Tasks database, assign it to Johnpaul Okolie, attach the same correct client project in `Project`, set its `Dependent on` relation to the analysis task, and link it back to the filing row in `Filing Task`.
   - The correct client project is the project for the linked client/company relationship, not the generic Richmond Blackwood Backlog when a client project exists. If the project cannot be determined from the filing/person/company relations, stop and ask before creating tasks.
   - Keep one analysis task and one filing task per real filing/source set. If separate spreadsheets/source sets exist, split them into separate analysis and filing task pairs rather than combining years by habit.
   - Add an actual Notion page comment on the filing task explaining that the analysis is in the dependent task and that filing should wait for the analysis dependency to be ready. Do not write this note into a database `Comments` field.
   - Once the tax analysis spreadsheet is created and ready for the filer, add an actual Notion page comment on the filing task with the spreadsheet URL, filing row URL, Drive folder URL, review status, and any remaining flags so the assigned person can file.
11. If Notion relation routing is wrong, fix the relation: link the correct individual/company first, then unlink the incorrect entity.
12. Record missing data in `open-questions.md` and update source registers.
13. Notify the requester when the analysis is ready for review:
   - Capture the triggering person's Slack user ID, channel ID, and thread/message URL at the start when the work is triggered from Slack or another integrated intake.
   - If the trigger came from Codex, Notion, Drive, or another source without a Slack identity, ask the operator for the Slack recipient before sending.
   - Put the exact Slack message text in the Codex chat first and wait for approval. After approval, send the approved text directly through Slack and log the notification in the relevant Notion task/comment or source register.
   - The notification should include the workbook URL, the filing year, the review scope completed, and the remaining review flags.

## Output

After setup, leave:

- Updated individual tax filing status.
- Drive folder pointers.
- Updated Notion Personal Tax Filings `Status`, `Document gathering status`, and `GDrive Docs` fields with read-back confirmation.
- Client upload request text awaiting approval or sent-status note.
- Notion analysis task comments showing review progress.
- Separate Notion analysis task(s), assigned to Ioana Surdu-Bob unless another owner is specified, linked in `Preparation Task`.
- Separate Notion filing follow-up task(s), assigned to Johnpaul Okolie unless another owner is specified, linked in `Filing Task`.
- Task dependency links using `Dependent on` from the filing task to the analysis task.
- Filing-task comments containing the analysis spreadsheet URL once the analysis is ready for the filer.
- List of missing data/documents.
- Links to payroll/payslip evidence when applicable.
- Linked-entity records routed to the correct files.
- Slack requester notification text, plus sent-status once approved and sent.

## Guardrails

- Keep personal tax data under `clients/Individuals/<legal-name>/`.
- Keep company-only tax/VAT/payroll context under `clients/Companies/<client-reference>/`.
- Do not guess Drive folder locations, Notion relations, or filing status.
- Do not send client messages unless the user explicitly asks.
- Do not treat the analysis as filed until filing evidence exists.

## Template Control Rules

Use these rules whenever you create or update the German personal-tax workbook.

### Sheet Roles

- `Revenue`: payroll, employment income, invoices, and other income. For RB-linked employment, fetch the employment record and payroll runs; use payslip gross where available, otherwise mark gross from the employment record as provisional and link the payroll record. Keep `Net Paid EUR` as a formula-driven EUR output and preserve source-currency detail in `Original Amount`, `Original Currency`, `FX Rate To EUR`, and `FX Date`.
- `Expenses`: support personal deduction/expense evidence when no bank extract is available. If a bank extract is available, raw bank tabs remain the source of truth and `Expenses` should support evidence/review rather than duplicate bank-sourced journal rows. Keep `Amount EUR` as a formula-driven EUR output and preserve source-currency detail in `Original Amount`, `Original Currency`, `FX Rate To EUR`, and `FX Date`.
- `Deductibles`: source-backed personal deductions and allowances, including home office, employee lump sum, special expense lump sum, commuting, equipment/training, pension, health/care insurance, childcare, donations, maintenance, and extraordinary burdens.
- `Tax Credits`: reductions to tax liability, including household services, handyman services, political-party credits, foreign tax credits, investment withholding, and energy-renovation reductions.
- `Tax Payments`: direct/non-payroll tax payments and prepayments from bank statements, broker tax certificates, or Finanzamt notices. Payroll withholding stays visible in `Revenue`; `Tax Analysis` combines payroll withholding with direct payments/prepayments.
- `Summary`: ELSTER-facing filing figures. `Tax Analysis`: bridge from gross income to income after deductions, credits, and known payments; show business/freelance total income and total expenses separately before calculating net PNL. Treat both as analysis support, not final tax-liability calculation.

### Formula And Control Requirements

- Preserve complete raw bank and investment exports in matching raw export tabs. Raw export tabs must have one header row, frozen row 1 only, filters enabled, compact widths/heights for a 13-inch laptop, and no oversized title or instruction blocks above the table.
- Drive summaries from formulas reading raw exports, revenue, expenses, deductibles, tax credits, tax payments, invoices, investment lots, assets, depreciation, loans/debt, `FX Rates`, category rules, and journal. Do not hardcode derived categorisation, reconciliation, PNL, balance sheet, checks, missing-info, or filing-summary outputs.
- Place high-level review tabs first (`Setup`, `Summary`, `Tax Analysis`, `PNL`, `Balance Sheet`, `Missing Info`, `Checks`) and helper tables such as `Category Rules` and `FX Rates` at the end of the workbook.
- Use `Category Rules` as the shared categorisation source. Seed and maintain it with German SKR04 account numbers, account names, PNL/balance-sheet mapping, tax treatment, invoice requirement, VAT treatment, and review notes.
- Maintain double-entry bookkeeping through `Journal` and `Checks`; every generated transaction should net to zero, and failures must surface in `Checks` and `Missing Info`.
- Link each year's opening balance sheet to the prior year's closing balance sheet. If prior records are unavailable, use an explicit provisional opening balance plug and label it clearly.
- Keep missing invoices, uncategorised transactions, missing cost basis, transfer mismatches, missing prior-year balances, unconfirmed tax payments/prepayments, and failed checks filterable in `Missing Info`.

### Deductibles And Credits

- Keep all optional deductible and credit rows at `Needs operator review` until the operator answers the applicability questions. Use `Yes` only after facts/evidence support inclusion, and `No` when the operator rules the item out.
- Employee lump sum may be `Baseline only` because it is a comparator for employment income, not an optional evidence claim. Cap the baseline against gross employment income; when the filing has no employment income, the included employee lump sum should be EUR 0 even though the statutory baseline remains visible in `Deductibles`.
- The normal German home-office route is the days-based `Tagespauschale`: ask for qualifying days and calculate EUR 6/day, capped at EUR 1,260, without requiring a dedicated room. If the operator instructs the maximum daily claim, enter 210 days on `home-office-daily`; keep the dedicated-room row inactive with no potential amount unless the operator separately approves the room route.
- For self-employed/freelance cases, use the business/EÜR daily route (`home-office-daily-business`, group `business-betriebsausgaben`) rather than the employment `Anlage N` home-office row. Keep the amount at `Needs operator review` until the qualifying business home-office day count is confirmed; business travel days should be excluded or separately justified before claiming.
- The ELSTER-facing `Summary` should show home-office daily allowance separately and sum only `home-office-daily` by default.
- The German `Sonderausgaben-Pauschbetrag` / Section 10c EStG special expense lump sum belongs in `Deductibles` as `Baseline only`, not as an employment/work expense. Set evidence status to `Not required` and include the statutory baseline automatically unless higher covered special expenses make it redundant.
- Before changing deductible or credit rows from `Needs operator review` to `Yes` or `No`, send the operator a concise question list and wait for review. Record that list in `open-questions.md`.

### Evidence Collection

- Salary rows must not be marked ready while payroll tax/social columns are blank; enter explicit zeroes when the payslip confirms no withholding/deduction.
- Track assets, loans/debt, depreciation, private pension, dividend income/distributions, interest income, interest paid, and withholding tax explicitly. Do not hide these in generic investment or bank-transfer lines.
- For expenses, investments, and direct tax payments/prepayments, check Notion and Drive first. If the client has confirmed none, record that in `Setup` and skip the request. If files and confirmation are both missing, surface the gap in `Missing Info`, draft the relevant reminder in Codex chat, and ask for approval before sending.
