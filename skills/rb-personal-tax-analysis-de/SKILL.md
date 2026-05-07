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

## Workflow

1. Confirm the individual legal name, Notion individual record, filing year, and linked company reference.
2. Determine whether the filing period includes freelancer status, employee status, RB company-director status, or a mixed period.
   - Keep one Notion task per real piece of work. If separate spreadsheets/source sets exist, split them into separate analysis tasks rather than combining years by habit.
   - When reviewing, narrowing, or creating tasks, add Notion task comments that explain the progress and next step so the requester/team can see what changed.
3. Create/find the Drive folder structure from the company client folder:
   - `Personal tax filings/<individual legal name>/<year>/Documents from Client - <year> - <first name>/`
4. Record Drive folder URLs in the individual `drive-locations.md`.
5. Select the right client checklist and draft the upload request.
6. Copy the personal tax analysis template into the filing-year folder.
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
10. After the analysis task is clear or complete, create separate filing follow-up task(s) in Notion:
   - Assign personal tax filing follow-up tasks to Johnpaul Okolie unless the user specifies another owner.
   - Keep filing tasks separate from analysis tasks.
   - Split filing follow-up tasks to match the underlying work/source sets, for example one filing task for a combined 2023 + 2024 analysis spreadsheet and one filing task for a separate 2025 spreadsheet.
   - Set `Dependent on` on each filing follow-up task to the analysis task it depends on. Use `Is blocking` on the initial task only when that direction is more natural for an existing workflow.
   - Add a comment on each filing task explaining the analysis dependency and why the task was created.
11. If Notion relation routing is wrong, fix the relation: link the correct individual/company first, then unlink the incorrect entity.
12. Record missing data in `open-questions.md` and update source registers.

## Output

After setup, leave:

- Updated individual tax filing status.
- Drive folder pointers.
- Client upload request draft or sent-status note.
- Notion analysis task comments showing review progress.
- Separate Notion filing follow-up task(s), assigned to Johnpaul Okolie unless another owner is specified.
- Task dependency links using `Dependent on` for connected follow-up work.
- List of missing data/documents.
- Links to payroll/payslip evidence when applicable.
- Linked-entity records routed to the correct files.

## Guardrails

- Keep personal tax data under `clients/Individuals/<legal-name>/`.
- Keep company-only tax/VAT/payroll context under `clients/Companies/<client-reference>/`.
- Do not guess Drive folder locations, Notion relations, or filing status.
- Do not send client messages unless the user explicitly asks.
- Do not treat the analysis as filed until filing evidence exists.
