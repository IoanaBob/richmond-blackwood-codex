---
name: rb-steuergo-personal-tax-filing
description: Prepare, review, submit only after approval, and log Richmond Blackwood German personal tax filings in SteuerGo. Use when a user mentions SteuerGo, German personal tax filing submission, Finanzamt prefilled data, SteuerGo validation notes, PDF previews, Anlage Vorsorgeaufwand, health/care insurance, pension or unemployment insurance checks, or updating Notion after a SteuerGo filing.
---

# RB SteuerGo Personal Tax Filing

Use this skill for the filing-stage workflow after, or alongside, `rb-personal-tax-analysis-de`. The analysis workbook supports the filing, but SteuerGo and the source evidence control what is actually filed.

## Required Context

- Personal Tax Filings row: `https://www.notion.so/206e41301314800493d2e00f69621528` / `collection://206e4130-1314-8182-b513-000b0c0cc725`.
- Tasks database: `collection://25de4130-1314-8158-af69-000b6c9fb49e`.
- Linked Individual record, Drive evidence folder, current-year workbook, and prior-year SteuerGo filing or preview when available.
- Browser access to `steuergo.de`. Open the English UI when possible.

Let the operator complete login unless they explicitly provide credentials for the current session. Never store, print, or commit SteuerGo credentials. Do not use ELSTER when the operator says this taxpayer does not have or should not use an ELSTER account.

## Source Precedence

1. Finanzamt prefilled data, Finanzamt PDFs/notices, and official tax-number/certificate data.
2. Employer annual Lohnsteuerbescheinigung and other official payer certificates.
3. Insurance and pension certificates, including health insurance, Pflegepflichtversicherung, contribution refunds, statutory pension, private pension, Ruerup/Riester, and unemployment insurance evidence.
4. RB maintained workbook, only where the row is source-backed and current.
5. Prior-year return, only for stable profile and consistency checks. Do not copy current-year amounts from prior year without current-year source evidence.

If Finanzamt or official certificate data conflicts with the workbook, the official source takes precedence. Record the deviation in the filing task or filing-row comment.

## Workflow

1. Fetch the live Personal Tax Filings row, linked Individual, preparation task, filing task, Drive folder, and available submission/preview files. Capture the current `Status`, `Tax Due`, `Filed on`, comments, and evidence URLs.
2. Open SteuerGo and select the correct person, jurisdiction, and tax year. Record the visible SteuerGo return ID when available.
3. Import or review the Finanzamt data already shared with SteuerGo. Accept official prefill values unless a stronger current-year source shows the prefill is stale or duplicated.
4. Compare the current filing against the prior-year SteuerGo return for stable settings:
   - name, address, tax ID, tax number, marital status, children, church tax/religion, bank account, refund route, foreign holdings/forms, and recurring non-income sections.
   - Treat current-year income, withholding, insurance, expenses, and deductions as year-specific and source-controlled.
5. Review income and withholding:
   - Ensure only one annual Lohnsteuerbescheinigung is included per employment unless evidence supports multiple certificates.
   - Avoid duplicated wage certificates from upload plus Finanzamt import.
   - Enter capital income, broker withholding, solidarity surcharge, foreign tax, freelance/business income, and tax prepayments only from source evidence or approved workbook rows.
6. Review deductions and credits. Keep conservative exclusions when evidence is missing or the operator ruled the item out. Do not claim commute, meal, work-room, equipment, donation, childcare, household-service, or business deductions just because the workbook has an old row.
7. Review insurance and pension in `Anlage Vorsorgeaufwand` before the filing can be called ready:
   - Health and long-term care insurance must be included where applicable. Do not leave private/statutory basic health-insurance basis contributions or Pflege-Pflichtversicherung at zero when Finanzamt data, an insurer certificate, payslip, or workbook source row shows amounts.
   - Enter basic private health insurance, statutory health insurance, Pflegepflichtversicherung, and contribution refunds/reimbursements in the appropriate SteuerGo fields. Reimbursements reduce the deductible amount; record gross and reimbursed amounts in the review note.
   - Distinguish basic deductible health/care contributions from optional or non-basic insurance components. Include optional/non-basic amounts only when legally relevant and approved by source evidence/operator review; otherwise record the exclusion.
   - Include statutory pension, employer/employee pension contributions, Ruerup/Riester/private pension, and unemployment insurance where current-year Finanzamt/Lohnsteuerbescheinigung/certificate data reports them.
   - If pension or unemployment amounts are zero, verify this against the current-year source. Do not infer zero from an unticked SteuerGo section alone.
8. Clear SteuerGo validation notes:
   - Blocking errors must be fixed or escalated before review.
   - Non-blocking notes must be read, assessed, and either fixed or documented.
   - A successful data check is required before the final review packet.
9. Generate or inspect the PDF preview/calculation before review. If the in-app browser cannot print or download, use the SteuerGo preview pages and any available platform attachment path; clearly report the download limitation and do not imply proof was saved until read-back confirms it.
10. Cross-check the preview:
   - Mantelbogen: identity, address, tax ID/tax number, bank account, marital status.
   - Anlage N: wages, wage tax, solidarity surcharge, church tax, employee expenses, social insurance lines.
   - Anlage KAP or equivalent: interest/dividends, withholding, foreign tax.
   - Anlage Vorsorgeaufwand: health/care insurance, refunds, pension, unemployment insurance.
   - Other forms: foreign holdings/income, business/freelance sections, household-service or special credits when used.
   - Calculation: final refund/payment, major deduction totals, and variance from the workbook or prior expectation.
11. Stop for operator review before submission. Provide a concise packet with the return ID, final refund/payment estimate, open or cleared notes, source-precedence deviations, insurance/pension status, and proof/preview location. Do not submit unless the operator explicitly approves or says they submitted manually.
12. After explicit submission or user-confirmed manual submission:
   - Attach or preserve the submitted return/proof and final preview in the Personal Tax Filings row or verified Drive folder when available.
   - Update Personal Tax Filings: `Status = Filed`, `Filed on = current date`, and `Tax Due` using the live row convention: positive payable, negative refund, unless the row's current instructions say otherwise.
   - Add a Notion page comment with Fact Standard fields: `Status`, `Source`, `Imported`, and `Review`. Include the SteuerGo return ID, final estimate, filing/submission confirmation, insurance/pension treatment, proof location, and any assessment-notice follow-up.
   - Mark the filing task `Done` only after submission is confirmed or the operator explicitly says they submitted. Leave assessment notice, refund receipt, or payment confirmation as pending follow-up when not yet received.

## Guardrails

- Do not submit from SteuerGo without explicit operator approval in the current conversation.
- Do not mark a filing as filed from a draft preview alone.
- Do not rely on the workbook over Finanzamt data or official current-year certificates.
- Do not ignore unchecked SteuerGo sections when the workbook, insurer certificate, payslip, or Finanzamt data indicates insurance or pension values should exist.
- Do not store credentials, downloaded credential material, or raw credential notes in git or Notion comments.
- If the filing cannot be made final because of a mismatch, missing source, blocked download, or unclear prior-year inconsistency, leave the filing task in review/blocked with a specific Notion comment.

## Output

For a ready-but-unsubmitted return, leave:

- SteuerGo return ID and final estimate.
- Cleared/unresolved validation notes.
- Preview or proof location if available.
- Explicit health/care, pension, and unemployment insurance status.
- Filing task comment saying it is ready for operator review, not submitted.

For a submitted return, leave:

- Personal Tax Filings row updated and read back.
- Filing task updated and read back.
- Submission proof/preview attachment or Drive pointer when available.
- Notion comments on the filing row and filing task with the submission confirmation and remaining assessment/payment/refund follow-up.
