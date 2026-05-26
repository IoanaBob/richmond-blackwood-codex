---
name: rb-personal-tax-filing-de-elster
description: File German personal tax returns through ELSTER from Richmond Blackwood personal-tax analysis workbooks, with certificate/QR login routing, page-by-page review packets, draft-PDF review, and strict no-credential-storage handling.
---

# RB Personal Tax Filing - DE ELSTER

Status: provisional.
Source: user instruction on 2026-05-22 and 2026-05-26; RB supervised ELSTER filing runs.
Imported: 2026-05-22.
Review: Update after each supervised ELSTER filing run, especially after operator corrections.

Use this skill when preparing or filing a German personal tax return in ELSTER for an RB individual client from a completed or in-progress German personal-tax analysis.

## Related Skills

- Read `skills/rb-personal-tax-analysis-de/SKILL.md` for the analysis workbook, Notion filing, Drive, and task-routing workflow.
- Use Browser Use only for ELSTER website interaction.
- Use Notion/Drive/Sheets connectors for source context, workbook read-back, and live RB records.
- Use `rb-memory-capture` at closeout when updating repo memory or skill-run logs.

## Guardrails

- Do not store ELSTER certificates, certificate passwords, QR codes, OTPs, recovery codes, local certificate paths, or attachment payloads in git, memory files, Notion comments, Slack, or chat.
- It is acceptable to use an approved live credential source to log in, but never echo the secret value back to the user unless the user typed it in this chat.
- Do not submit the final return, transmit attachments, or accept final ELSTER declarations. The operator must click the final ELSTER submission button personally after reviewing the final packets and PDF.
- Before typing sensitive identifiers from source documents into ELSTER, get action-time confirmation unless the operator has already approved that exact data and destination in the current run.
- If the filing year, filing status, or task readiness conflicts across Notion, repo notes, workbook, or user instruction, stop and ask for the intended filing target before entering ELSTER data.
- Treat workbook figures as analysis inputs, not final law conclusions, whenever open checks or missing-info flags remain.

## Startup Workflow

1. Confirm the exact person, tax year, jurisdiction, Notion Personal Tax Filing row, filing task, preparation task, workbook, and Drive folder.
2. Ask the operator whether the client has an ELSTER certificate for this run, then fetch the live Notion individual record and check whether an `Elster File` or equivalent certificate attachment exists.
   - If a certificate exists or the operator provides a local certificate path/password for the run, use certificate login and keep the file path/password out of durable memory.
   - If the active Browser Use backend cannot attach/upload a local certificate file, stop and ask the operator to take over only the ELSTER file-selection/login step or switch to the QR/client-approval path.
   - If no certificate exists and none is provided, open ELSTER through Browser Use and pause for the QR/client-approval login path.
3. Fetch the filing task and filing-row comments. If they say filing should wait, list the blockers and ask before proceeding.
4. Read the workbook summary tabs and relevant input tabs. Prefer connector read-back over stale repo summaries when available.
5. Prepare page/stage filing packets with screenshots, fields, source, value, explanation, confidence, and review question.
6. Open ELSTER with Browser Use only, log in through the chosen route, and find the relevant Einkommensteuer form for the tax year.

## Page Screenshot And Packet Protocol

For every ELSTER page or logical stage before data entry:

1. Take a screenshot of the page/stage before filling it. Keep screenshots out of git and durable memory unless the operator explicitly asks for an evidence file to be preserved.
2. Write one packet for that page/stage before entering data.
3. Each packet must include:
   - ELSTER page/section name.
   - Screenshot reference or timestamp.
   - Every field filled or deliberately left blank.
   - Value entered.
   - Source used, such as Notion property, workbook tab/cell/row, Drive evidence, or operator instruction.
   - Explanation for why the field is included, left blank, or overridden.
   - Confidence: `Ready`, `Needs review`, or `Blocked`.
   - Any alternative treatment considered.
4. Auto-approve ordinary page/stage packets only when all entries are `Ready`, the source is already approved for this filing run, and there is no new judgment call or discrepancy. In that case, fill the page and proceed to the next page without waiting for operator approval.
5. Do not auto-approve packets containing `Needs review` or `Blocked` items, new sensitive identifiers not already approved for this filing run, source conflicts, workbook-to-ELSTER discrepancies, attachments/uploads, family/support questions, foreign/capital/business income judgment calls, or any material tax-position uncertainty. Pause and ask the operator before filling those fields.
6. After filling a page/stage, read back the entered values from ELSTER, note any differences from the packet, and then continue to the next page.
7. Record reusable corrections in this skill as general rules, not client-specific secrets.

Auto-approval means only that Codex may proceed from a prepared packet to non-final data entry. It never authorizes final submission.

## Filing Readiness Checks

Before data entry, compare:

- Notion Personal Tax Filing `Status`, `Filed on`, `Submission`, `Preparation Task`, and `Filing Task`.
- Filing task status and comments.
- Preparation task status and comments.
- Workbook `Summary`, `Missing Info`, and `Checks`.
- Open questions in `clients/Individuals/<legal-name>/open-questions.md`.

Family and support-payment readiness:

- If the taxpayer is divorced, separated, widowed, has children, or bank/workbook records suggest alimony, child support, maintenance, childcare, or household support, pause before final submission and confirm the intended treatment.
- Check whether ELSTER needs `Anlage U`, `Anlage Unterhalt`, `Anlage Kind`, the single-parent relief amount, child allowances, or only no claim because evidence/eligibility is missing.
- Do not infer that support payments are included merely because a generic workbook row exists. They are included only when the workbook/ELSTER draft has an approved amount, recipient details where required, evidence, and operator approval.

Spouse BFD / Taschengeld readiness:

- If the filing has a spouse BFD/Taschengeld source for the correct filing year showing pocket money only, `Steuer-Brutto` / taxable gross as zero, wage tax as zero, and employee pension/health/social deductions as zero, treat spouse taxable wages and employee social-insurance deductions as zero in ELSTER.
- If a wrong-year spouse `Lohnsteuerbescheinigung` was previously entered or imported, remove those spouse wage, tax-class, pension, health/care, unemployment, and employer-subsidy values before final validation. The spouse identity and joint-filing fields can remain when joint filing is still correct.
- If the operator states that a correct-year spouse payslip is the overriding source of truth, use that payslip's taxable wage, tax, and social-insurance values only. Do not add extra BFD assumptions, caveats, or client follow-up beyond that source unless the operator later asks for it.
- Confirm no taxable additional BFD benefits such as accommodation, food, clothing, or other benefits only when the source mentions such benefits, the workbook flags them, or the operator wants extra assurance.

Direct tax payment / prepayment readiness:

- Keep Finanzamt prepayments, direct tax payments, and prior offsets separate from payroll withholding. Payroll wage tax belongs in the wage-certificate / `Anlage N` flow; direct payments/prepayments belong in the workbook `Tax Payments` review.
- If the workbook flags missing direct-payment confirmation, ask the operator before final submission. If the operator confirms there were no direct prepayments or direct payments, record that in the filing task and treat the flag as cleared.

Certificate-only draft readiness:

- If ELSTER validation passes because wage/insurance values are imported from certificates, do not treat that alone as submission readiness. Read back the imported values, identify them as `Übernommen aus Bescheinigung`, and compare them to the active analysis workbook or preparation task.
- If the active year analysis/workbook is unavailable because Notion, Drive, or Sheets cannot be reached, stop before submission and route a reconciliation note to the preparer/operator. List visible omitted attachment areas such as capital income, rental/foreign income, business income, support payments, children, and special deductions instead of assuming they are intentionally blank.
- If a client answer resolves one risk area, such as no maintenance payments, clear only that risk area. Do not let one resolved question override unrelated open analysis flags.

If one year is already marked filed and another year is open, ask which year to file before entering ELSTER.

If required evidence is missing but the operator still wants to prepare the form, label each affected ELSTER value `Needs review` and do not final-submit.

## ELSTER Navigation Notes

Maintain these as learned during supervised filing runs:

- Start with the annual income tax return / `Einkommensteuererklärung` for the target tax year unless the task specifies an amendment, supplement, or message to the Finanzamt.
- Do not assume ELSTER imports all prior-year or certificate data correctly; read visible imported values and compare them to the RB workbook before accepting.
- If ELSTER-imported wage certificate values differ from the workbook and the workbook explicitly says annual LStB/SteuerGo extraction is still pending, prefer the ELSTER certificate values provisionally, flag the mismatch for later reconciliation, and do not overwrite the import without operator approval.
- If ELSTER blocks joint filing validation on spouse / Person B name fields, check for missing spouse identity fields such as date of birth and tax ID. Do not treat the tax-ID notice as the only issue until the validation issue list has been checked.
- For a spouse wage certificate, a scanned PDF may require visual extraction. Use the stable identity fields only after review; keep a year mismatch on the wage certificate as a separate filing-review caveat.
- For manual spouse wage entries, tax class, employer social-insurance shares, and spouse certificate year applicability must remain `Needs review` unless directly supported by a correct-year wage certificate or ELSTER import.
- After changing ELSTER form controls, save the page state through ELSTER's own navigation, continue, or validation controls before jumping elsewhere. Direct browser navigation can leave recent select/field changes unsaved, especially tax-class and spouse wage-certificate edits.
- When zeroing an inapplicable spouse employment source, use the final overview as a read-back: the spouse `Anlage N` should disappear or show no wage rows, and spouse `Vorsorgeaufwand` entries should not show pension, health/care, unemployment, or employer-subsidy amounts.
- For `Anlage N`, enter home-office daily allowance only in the correct general or no-other-workplace line and leave the stricter no-other-workplace line blank unless the workbook/source explicitly supports it.
- For `Anlage KAP`, foreign dividends or broker income without German withholding belong on the non-domestic-withholding capital-income path only when the workbook/source supports it. Enter saver allowance used elsewhere as zero only when no other allowance-use evidence exists, and flag missing broker/tax certificate evidence.
- For `Anlage S`, ELSTER may require a separate `Anlage EUR` submission. Do not imply the business/freelance income reporting is complete merely because `Anlage S` contains the profit.
- The Codex in-app browser may be unable to download ELSTER's `Drucken` / review-PDF output. If download support is blocked, stop on the ELSTER overview page and ask the operator to click `Drucken` and save the PDF manually; do not use a non-browser ELSTER workaround.
- Save progress inside ELSTER only when needed for continuity, and note that a saved draft is not a filed return.
- Treat certificate upload limits as a tooling limitation. They do not change client readiness; they only decide whether login needs an operator handoff or QR fallback.

## Final Review And Submission Handoff

On the final ELSTER review/submission page:

1. Stop. This page is not auto-approved.
2. Generate or download the draft submission PDF from ELSTER for comprehensive operator review. If Browser Use cannot automate the native print/save dialog, stop and ask the operator to complete only that PDF-save step.
3. Present all page/stage packets one by one, followed by a final review packet covering validation result, calculated refund/payment, bank details, imported certificate values, operator-approved deviations from the workbook, known post-filing reconciliation items, and the draft PDF location.
4. Ask the operator to approve the packets and final filing position one by one.
5. Even after approval, Codex must not click `Absenden` or any equivalent final transmission button. The operator clicks final submission personally.
6. Before the operator clicks final submission, the final ELSTER print/review PDF from `Drucken` must be saved to the correct Drive filing folder when tooling allows. This final PDF is the file that must later be attached to the Notion Personal Tax Filing `Submission` property.
7. After the operator clicks final submission, capture the visible ELSTER result/protocol information and proceed to closeout.

## Closeout

After a completed filing or blocked filing attempt:

- Save only permitted proof pointers, confirmation numbers, exported receipts, and source URLs.
- After a successful ELSTER submission, capture the submission result immediately: filing timestamp, ELSTER confirmation / transfer-protocol identifier if shown, payment/refund estimate, and any available `Drucken` / `Transferprotokoll` / confirmation PDF. If Browser Use cannot save the evidence file, stop and ask the operator to save it manually, then record the Drive URL once available.
- Upload or link the final printed PDF and any transfer-protocol evidence in the correct Drive filing folder before marking the filing completed. Keep only Drive/ELSTER/Notion evidence pointers in git; do not store the PDF or tax identifiers in the repository.
- Update the Personal Tax Filing row status only after ELSTER filing evidence exists and the final printed/submission PDF is attached in the `Submission` property. Set `Status = Filed`, `Filed on`, `Submission`, `Document gathering status = Attached in Drive`, `Tax Due` or refund/payment amount, and any proof/evidence URL according to the live schema, then verify by read-back.
- Add actual Notion page comments to the Personal Tax Filing row, filing task, and, when useful, the preparation task. The comments should state filed date/time, ELSTER evidence pointer, submission/protocol pointer, final payment/refund estimate, source of spouse/direct-payment decisions, and any remaining post-filing tasks.
- Update `clients/Individuals/<legal-name>/tax-filings.md`, `personal-tax-returns.md`, `source-register.md`, and `drive-locations.md` as needed.
- Update `memory/skill-runs.md` and `sources/import-log.md`.
- Review this skill and add any general correction learned during the run.
- Back up the finalized skill/process to the RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc` and verify by read-back.
