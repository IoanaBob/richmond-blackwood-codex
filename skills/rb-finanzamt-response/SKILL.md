---
name: rb-finanzamt-response
description: Use when Richmond Blackwood needs to triage, respond to, file, or plan action for German Finanzamt or ELSTER notices for company clients, including annual VAT returns, UStVA protocols, E-Bilanz datasets, KSt/GewSt filings, Mahnungen/account statements, payroll-tax/Lohnsteuer queries, objections, suspension requests, and deadline-driven authority messages.
---

# RB Finanzamt Response

Use this skill for German tax-authority packets where RB must decide what to file, what to answer, what to pay or dispute, and what to record.

## Pair With

- `rb-source-research` for Notion, Drive, Gmail, Slack, local-file, and public-source context.
- `rb-client-file` for company/individual routing.
- `rb-file-uploads` for preserving source PDFs and proof in Drive.
- `rb-communications` for any Finanzamt, accountant, client, Slack, or email text.
- `rb-send-elster-message` for ELSTER authority messages, supporting-document uploads, objections/AdV, deadline extensions, payment-proof responses, and sent-message logging.
- `rb-gmail-drafts` only when Gmail thread context or email sending is explicitly in scope.
- `rb-google-auth` only when Google helper auth is needed.

## Non-Negotiables

- Do not store ELSTER certificates, certificate passwords, OAuth tokens, private keys, credential bundles, or credential dumps in git.
- Do not submit a return, send an authority message, file an objection, request suspension, or make/pay a tax payment without the user's reviewed approval unless the user has already approved the exact action and content.
- Use the exact Notion Companies `Reference` value before writing company client files.
- Preserve exact source filenames in repo notes, including unusual characters, duplicate-scan labels, and original language.
- Every meaningful factual claim in repo files needs `Status`, `Source`, `Imported`, and `Review` context.
- For legal or tax claims beyond the source documents, check current official sources first. Prefer ELSTER, BMF, Finanzamt/state tax-office, Bundesfinanzministerium, or gesetze-im-internet sources.
- If the destination, owner, filing tool, sender authority, or payment decision is unclear, record the blocker and ask for review.

## Workflow

1. Start from the repo rule.
   - Inspect `git status --short --branch`.
   - Run `git pull origin main`.
   - Work on a `codex/<task-slug>` branch when the worktree is clean, or preserve and classify existing user changes when dirty.

2. Identify the client and authority scope.
   - Fetch the Notion company and use its exact `Reference`.
   - Record Steuernummer, VAT number, payroll-tax registration, filing registrations, linked project, and accountant/representative context when available.
   - Read only credential pointers. Never copy the ELSTER certificate or password into repo text.

3. Build the evidence packet.
   - Read local PDFs, Drive files, Notion records, Gmail threads, and existing client files.
   - For scanned PDFs, render/OCR enough to identify date, tax type, deadline, amount, reference, and action requested.
   - For important local files, record filename, source, and where practical size/hash; raw evidence belongs in Drive, not git.
   - Separate source documents from forwarded emails and internal notes.
   - If Notion or Drive exposes attached-file metadata but not an uploadable local file, create a manifest with exact attachment names, row/page URLs, source dates, and download/upload blockers. Do not imply those attachments were sent to ELSTER until the files are actually available to the browser/local file picker or another approved upload route.

4. Classify every notice before drafting.
   - `Umsatzsteuererklaerung`: annual VAT return; quarterly `UStVA` protocols support it but do not replace it.
   - `UStVA-Protokoll`: proof of pre-return transmission, not proof of annual VAT filing.
   - `E-Bilanz` or `Datensatz`: electronic XBRL/taxonomy dataset for balance sheet and GuV; a PDF financial statement or filed KSt/GewSt return is not the same artifact.
   - `Koerperschaftsteuer` / `Gewerbesteuer`: distinguish return filing, assessment notice, evidence follow-up, and prepayment notice.
   - `Mahnung`, `Kontoauszug`, `Vollstreckung`: urgent collection/account-balance matter; do not treat it as the underlying assessment notice unless the Bescheid is included.
   - `Lohnsteuer` query: separate employee existence, payroll calculation, tax payment proof, electronic Lohnsteuer-Anmeldung submission, and payment allocation.
   - `Verspaetungszuschlag`, `Saeumniszuschlag`, `Zwangsgeld`: penalty/collection side effects; identify whether they follow a missing filing, late payment, or estimated assessment.

5. Reconcile against internal records.
   - Check client `tax-vat-filings.md`, `accounting-bookkeeping-payroll.md`, `drive-locations.md`, `source-register.md`, `open-questions.md`, and relevant individual linked files.
   - Check Notion filings, registrations, operational tasks, Communications, Invoicing/Expenses/Payroll/Employment records, and linked project tasks.
   - Check Gmail/Drive for ELSTER confirmations, accountant forwards, assessment notices, payment proof, and translations.
   - Mark contradictions explicitly as provisional rather than forcing a conclusion.

6. Prioritize actions.
   - First: deadline-bound filings or responses requested by Finanzamt.
   - Second: enforcement-facing Mahnungen, account statements, Zwangsgeld, and payment-risk items.
   - Third: missing electronic datasets or returns needed to correct estimated assessments.
   - Fourth: payroll-tax return/payment-allocation reconciliation.
   - Fifth: Drive filing, source registers, and durable memory cleanup.
   - Do not recommend paying an apparently inconsistent Mahnung as final unless the assessment basis has been reviewed. If urgency requires temporary payment, present that as an operator/accountant decision.

7. Start filing preparation safely.
   - For annual VAT, summarize the filing basis from UStVA protocols, bookkeeping, invoices, and financial statements; identify whether it appears zero/near-zero, but verify against books before submission.
   - For E-Bilanz, identify the tool/owner that can generate the dataset. If no tool is available, draft an extension or holding message instead of pretending a PDF satisfies the request.
   - For payroll tax, do not deny employment when employment/payroll records exist. Confirm whether Lohnsteuer-Anmeldungen were missing, filed late, rejected, or misallocated, then prepare corrected submissions or an explanatory response.
   - When the user is actively reviewing a final ELSTER `Absenden` screen, leave that browser page untouched. Use the waiting time for local evidence staging, connector reads, response drafting, and repo records only; return to the live browser only after the user approves submission or asks for a change.

### Lohnsteuer-Anmeldung Batch Filing Guardrail

Use this pattern when a user explicitly approves filing multiple monthly payroll-tax returns based on a reviewed schedule.

- Treat the approval as bounded by the exact periods, company, Steuernummer, address, employee count, and monthly Kz42/Kz49/Kz83 figures. Stop if any review screen differs.
- Keep `Berichtigte Anmeldung` unchecked for original missing returns. Use corrected returns only when source evidence shows an original return exists and needs correction.
- Validate each period in ELSTER before final review. Submit only after the final review screen shows the expected period, Steuernummer, company name, address, employee count, Lohnsteuer, Solidaritaetszuschlag, Kirchensteuer/Gesamtbetrag, and no blocking errors.
- For repeated months, a prior submitted month may be used as the data-takeover template only after the final review confirms the newly selected period and unchanged figures.
- When annual/version behavior differs, for example currency symbols appearing in one year but not another, verify numeric values and labels rather than relying only on display formatting.
- Record every successful `Versandbestaetigung`: period, ELSTER Auftrag, Transferticket, Ordnungskriterium, and Abgabezeit.
- Do not try to attach payslips or payment proofs inside a Lohnsteuer-Anmeldung if the final review has no attachment step. Use ELSTER Belegnachreichung or the most specific Finanzamt evidence/message route after the return is transmitted and the exact PDFs are uploadable.

### Reviewed Template Reuse Guardrail

Use this pattern when a user reviews the first ELSTER filing, message, appeal, or evidence upload and asks RB to use it as a template for related items.

- Treat the first reviewed item as approval for the process and fixed wording structure, not as permission to ignore new differences.
- Reuse the template only for the same client, authority route, tax type, Steuernummer, period series, and procedural purpose.
- Change only source-backed variables such as period, amounts, transfer tickets, payment references, filenames, and deadlines.
- Stop for review if any later item introduces a new procedural request, new tax type, new penalty/enforcement issue, different address/Steuernummer, unexpected ELSTER warning, different final-screen totals, or a missing attachment.
- Capture each submission proof before proceeding to the next item. The batch is not complete until every item has a ticket/status and the client records say which periods/items were sent, pending, or blocked.

### E-Bilanz Workpaper Guardrail

Use this pattern when a Finanzamt asks for an `E-Bilanz` or `Datensatz` and the available records include statutory accounts or a trial balance.

- Build a clean balance-sheet/P&L workpaper from the signed accounts and the final trial balance, but label it as a support pack only. Do not imply a spreadsheet, PDF, or Google Sheet is the official XBRL/datensatz.
- Keep the workpaper free of ELSTER certificates, certificate passwords, private keys, and credential material.
- Include a submission-input sheet with entity details, period, Steuernummer, source-basis assumption, cents-level amounts, statutory rounded cross-checks, and sign-convention notes for the E-Bilanz tool.
- If statutory accounts net negative bank balances into cash, show the statutory tie-out and a German mapping view. As a default review recommendation, separate positive bank/cash as assets and negative bank balances/overdrafts as current bank liabilities, while preserving the same net assets.
- If the client has a foreign-company/German-PE position and no separate PE-only balance sheet is located, state the whole-company statutory-account assumption clearly and require the filer to confirm the E-Bilanz software scope before transmission.
- Validate the workpaper for formula errors, balance-sheet equality, P&L-to-equity tie, and source traceability. Render or preview the key sheets before treating the workbook as final.
- The next action after a final workpaper is still to generate, validate, transmit, and save the protocol/ticket from E-Bilanz-capable software.

8. Draft communications for review.
   - Prefer the specific ELSTER form or filing route when one exists. Use generic `Sonstige Nachricht` only when no more specific form fits.
   - For any ELSTER message, supporting-document upload, formal objection/AdV, deadline extension, payment-proof response, or text-only authority communication, switch to `rb-send-elster-message` for route selection, attachment safety, final-send approval, and sent-message logging.
   - For each preview, state channel, operator, sender/representative, source records, subject/reference, attachments, and exact body.
   - Draft in chat and, when useful, in a client response-plan file. Do not create software drafts unless the user explicitly asks for that exception.
   - If asking for suspension, collection pause, extension, or objection, state the underlying source and what is still pending.
   - Do not create client-specific message skills for one Finanzamt response. Store the actual generated letter/message in Notion Communications and the relevant client memory/source files, not in the skill text.

9. Save the reusable record.
   - Add or update `clients/Companies/<Reference>/finanzamt-YYYY-MM-response-plan.md` when there is a multi-notice packet, significant authority risk, or drafted response.
   - Update the client files that own the facts:
     - `tax-vat-filings.md` for filings, tax notices, assessments, VAT, KSt/GewSt, E-Bilanz, and PE position.
     - `accounting-bookkeeping-payroll.md` for payroll-tax and bookkeeping reconciliation.
     - `drive-locations.md` for uploaded or pending evidence.
     - `source-register.md` for source packets.
     - `open-questions.md` for blockers.
   - Update global `sources/source-register.md`, `sources/import-log.md`, and `memory/skill-runs.md` when the run creates reusable knowledge or repo changes.

## Response-Plan Shape

Use a compact response-plan file for complex packets:

```md
# Finanzamt Response Plan - <Month Year> Packet

Status: provisional.
Source: <user instruction>; <local PDFs>; <Notion/Drive/Gmail/public sources>.
Imported: <YYYY-MM-DD>.
Review: <what must be confirmed before sending/submitting>.

## Source Packet
| Source item | Local filename or live source | Working read |

## Priority Actions
| Priority | Action | Owner / route | Current status | Review before sending |

## Working Position
<Separate annual VAT, E-Bilanz, Mahnung, payroll, assessment, and payment issues.>

## Draft <Channel/Topic> Message
Status: draft for review only.
Sending channel: <ELSTER/email/etc.>
Operator: <RB_CODEX_ACTOR or blocker>.

## Filing Blockers
| Blocker | Why it matters | Next step |
```

Keep this plan factual and review-oriented. It is not approval to file, send, object, or pay.
