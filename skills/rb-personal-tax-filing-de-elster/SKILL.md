---
name: rb-personal-tax-filing-de-elster
description: File German personal tax returns through ELSTER from Richmond Blackwood personal-tax analysis workbooks, with certificate/QR login routing, page-by-page review packets, draft-PDF review, and strict no-credential-storage handling.
---

# RB Personal Tax Filing - DE ELSTER

Status: provisional.
Source: user instruction on 2026-05-22 and RB supervised ELSTER filing runs.
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
- Do not submit the final return, transmit attachments, or accept final ELSTER declarations without the operator's proper final review and explicit action-time approval.
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
5. Prepare a page-by-page filing packet with fields, source, value, confidence, and review question.
6. Open ELSTER with Browser Use only, log in through the chosen route, and find the relevant Einkommensteuer form for the tax year.

## Page Review Protocol

For the first ELSTER page in a filing run:

1. Fill only the page currently being prepared.
2. Before clicking next/continue, stop and ask the operator to review.
3. The review packet must include:
   - ELSTER page/section name.
   - Every field filled or deliberately left blank.
   - Value entered.
   - Source used, such as Notion property, workbook tab/cell/row, Drive evidence, or operator instruction.
   - Confidence: `Ready`, `Needs review`, or `Blocked`.
   - Any alternative treatment considered.
4. Apply corrections from the operator before moving on.
5. Record reusable corrections in this skill as general rules, not client-specific secrets.

For later pages in the same run, keep using the same packet format. Ask for review whenever the page introduces a new source category, judgment call, or data-transmission risk.

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
- For `Anlage N`, enter home-office daily allowance only in the correct general or no-other-workplace line and leave the stricter no-other-workplace line blank unless the workbook/source explicitly supports it.
- For `Anlage KAP`, foreign dividends or broker income without German withholding belong on the non-domestic-withholding capital-income path only when the workbook/source supports it. Enter saver allowance used elsewhere as zero only when no other allowance-use evidence exists, and flag missing broker/tax certificate evidence.
- For `Anlage S`, ELSTER may require a separate `Anlage EUR` submission. Do not imply the business/freelance income reporting is complete merely because `Anlage S` contains the profit.
- The Codex in-app browser may be unable to download ELSTER's `Drucken` / review-PDF output. If download support is blocked, stop on the ELSTER overview page and ask the operator to click `Drucken` and save the PDF manually; do not use a non-browser ELSTER workaround.
- Save progress inside ELSTER only when needed for continuity, and note that a saved draft is not a filed return.
- Treat certificate upload limits as a tooling limitation. They do not change client readiness; they only decide whether login needs an operator handoff or QR fallback.

## Final Submission Gate

Before clicking `Absenden` or any equivalent final transmission action:

1. Stop on the final ELSTER review/submission page.
2. Generate or download the draft submission PDF from ELSTER for comprehensive operator review. If Browser Use cannot automate the native print/save dialog, stop and ask the operator to complete only that PDF-save step.
3. Provide a concise final review packet covering validation result, calculated refund/payment, bank details, imported certificate values, operator-approved deviations from the workbook, and known post-filing reconciliation items.
4. Ask for explicit action-time approval to submit after the operator has reviewed the PDF.
5. Submit only after the operator gives a clear approval for the final submission action. General approval to continue, page-level approval, prior login approval, or approval to prepare the review PDF is not enough.

## Closeout

After a completed filing or blocked filing attempt:

- Save only permitted proof pointers, confirmation numbers, exported receipts, and source URLs.
- Update the Personal Tax Filing row status only after ELSTER filing evidence exists.
- Add a Notion comment to the filing task with filed date, proof pointer, remaining post-filing tasks, and any review caveats.
- Update `clients/Individuals/<legal-name>/tax-filings.md`, `personal-tax-returns.md`, `source-register.md`, and `drive-locations.md` as needed.
- Update `memory/skill-runs.md` and `sources/import-log.md`.
- Review this skill and add any general correction learned during the run.
- Back up the finalized skill/process to the RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc` and verify by read-back.
