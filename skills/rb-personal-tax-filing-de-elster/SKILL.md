---
name: rb-personal-tax-filing-de-elster
description: File German personal tax returns through ELSTER from Richmond Blackwood personal-tax analysis workbooks, with certificate/QR login routing, page-by-page review packets, and strict no-credential-storage handling.
---

# RB Personal Tax Filing - DE ELSTER

Status: provisional.
Source: user instruction on 2026-05-22 and RB personal-tax workflow.
Imported: 2026-05-22.
Review: Update after each supervised ELSTER filing run, especially after operator corrections.

Use this skill when preparing or filing a German personal tax return in ELSTER for an RB individual client from a completed or in-progress German personal-tax analysis.

## Related Skills

- Read `skills/rb-personal-tax-analysis-de/SKILL.md` for the analysis workbook, Notion filing, Drive, and task routing workflow.
- Use Browser Use only for ELSTER website interaction.
- Use Notion/Drive/Sheets connectors for source context, workbook read-back, and live RB records.
- Use `rb-memory-capture` at closeout when updating repo memory or skill-run logs.

## Guardrails

- Do not store ELSTER certificates, certificate passwords, QR codes, OTPs, recovery codes, or attachment payloads in git, memory files, Notion comments, Slack, or chat.
- It is acceptable to use an approved live credential source to log in, but never echo the secret value back to the user unless the user typed it in this chat.
- Do not submit the final return, transmit attachments, or accept final ELSTER declarations without explicit action-time approval from the operator.
- If the filing year, filing status, or task readiness conflicts across Notion, repo notes, workbook, or user instruction, stop and ask for the intended filing target before entering ELSTER data.
- Treat workbook figures as analysis inputs, not final law conclusions, whenever open checks or missing-info flags remain.

## Startup Workflow

1. Confirm the exact person, tax year, jurisdiction, Notion Personal Tax Filing row, filing task, preparation task, workbook, and Drive folder.
2. Fetch the live Notion individual record and check whether an `Elster File` or equivalent certificate attachment exists.
   - If a certificate exists, use it only for login and keep the file/password out of repo and chat.
   - If no certificate exists, open ELSTER through Browser Use and pause for the QR/client-approval login path.
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

If one year is already marked filed and another year is open, ask which year to file before entering ELSTER.

If required evidence is missing but the operator still wants to prepare the form, label each affected ELSTER value `Needs review` and do not final-submit.

## ELSTER Navigation Notes

Maintain these as learned during supervised filing runs:

- Start with the annual income tax return / `Einkommensteuererklärung` for the target tax year unless the task specifies an amendment, supplement, or message to the Finanzamt.
- Do not assume ELSTER imports all prior-year or certificate data correctly; read visible imported values and compare them to the RB workbook before accepting.
- Save progress inside ELSTER only when needed for continuity, and note that a saved draft is not a filed return.

## Closeout

After a completed filing or blocked filing attempt:

- Save only permitted proof pointers, confirmation numbers, exported receipts, and source URLs.
- Update the Personal Tax Filing row status only after ELSTER filing evidence exists.
- Add a Notion comment to the filing task with filed date, proof pointer, remaining post-filing tasks, and any review caveats.
- Update `clients/Individuals/<legal-name>/tax-filings.md`, `personal-tax-returns.md`, `source-register.md`, and `drive-locations.md` as needed.
- Update `memory/skill-runs.md` and `sources/import-log.md`.
- Review this skill and add any general correction learned during the run.
- Back up the finalized skill/process to the RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc` and verify by read-back.
