---
name: rb-finanzamt-payroll-evidence
description: Use when Richmond Blackwood needs to prepare or send evidence for a German Finanzamt payroll-tax/Lohnsteuer query, especially where Lohnsteuer-Anmeldungen, payslips, payment proofs, bank credits, and ELSTER Belegnachreichung need to be reconciled.
---

# RB Finanzamt Payroll Evidence

Use this skill after, or alongside, `rb-finanzamt-response` when the payroll issue is narrow enough to need evidence packaging and payment allocation.

## Non-Negotiables

- Do not store ELSTER certificates, certificate passwords, OAuth tokens, Notion signed file URLs, cookies, private keys, or credential bundles in git.
- Do not say payslips, payment proofs, or bank statements were attached or sent unless the exact files were actually transmitted and a confirmation/ticket was captured.
- If Notion/Drive exposes attachment names but not uploadable files, create a manifest and record the blocker. Do not confuse attachment metadata with a filed PDF.
- Treat ELSTER `Belegnachreichung` or another specific supporting-document route as preferred for evidence PDFs. Use `Sonstige Nachricht` only when a better route is unavailable or when sending a text allocation notice without attachments.
- Final browser submission of an authority message, evidence upload, return, objection, suspension request, or other tax communication needs action-time confirmation unless the user has just reviewed and approved the exact final screen/content under the active browser rules.

## Evidence Workflow

1. Start from the repo rule.
   - Inspect `git status --short --branch`.
   - Run `git pull origin main`.
   - Use the exact Notion Companies `Reference` folder under `clients/Companies/<Reference>/`.

2. Build the source inventory.
   - Identify the payroll query letter/date, Steuernummer, company address, employee(s), period range, and deadline.
   - Read existing client records: `accounting-bookkeeping-payroll.md`, `finanzamt-YYYY-MM-response-plan.md`, `drive-locations.md`, `source-register.md`, and `open-questions.md`.
   - Inventory payslip PDFs and payment-proof PDFs by exact filename, period, source page/row, and current upload status.
   - Read bank statements or payment ledgers for payee, date, reference, amount, status, and balance/account-credit context.
   - Record ELSTER Lohnsteuer-Anmeldung transfer tickets, filing dates, employee count, Lohnsteuer, Solidaritaetszuschlag, Kirchensteuer, and total.

3. Reconcile period by period.
   - For each month, match the payroll-tax total to:
     - payslip Lohnsteuer plus Solidaritaetszuschlag plus Kirchensteuer;
     - ELSTER Lohnsteuer-Anmeldung figures and transfer ticket;
     - bank payment date, payee, amount, and reference;
     - Finanzamt account statement credit, where visible.
   - Flag mismatches instead of smoothing them. Common mismatch categories are payment made before return filed, credit sitting unallocated, prior external-software filing not visible in Mein ELSTER, and duplicate/corrective filing risk.

4. Prepare the packet.
   - Create a concise authority-facing PDF or document with company, Steuernummer, address, employee, period range, source basis, total, and a monthly allocation table.
   - Create a machine-readable CSV/XLSX schedule when it helps the Finanzamt or the internal reviewer see the mapping.
   - Keep raw source PDFs in Drive or the live source system; repo records should keep filenames, URLs, hashes for local generated artifacts, and blockers only.
   - If individual payslips/payment proofs are not locally uploadable, write clearly that they are on record and can be provided separately, not that they are attached.

5. Use ELSTER carefully.
   - Prefer `Belegnachreichung` where ELSTER accepts PDF evidence for the relevant filing/query.
   - If the in-app browser cannot select local files or the certificate login needs a native file picker, ask the operator to select the file manually and record the blocker.
   - If only a text message can be sent immediately, make it an allocation/processing note and ask the Finanzamt to request specific PDFs if the route cannot accept them.
   - Capture the final route, subject, attachments, transfer ticket, Ordnungskriterium, and submission time after sending.

6. Update durable records.
   - Add the packet and ELSTER status to `accounting-bookkeeping-payroll.md`.
   - Add evidence links or upload blockers to `drive-locations.md` and `open-questions.md`.
   - Update the multi-issue `finanzamt-YYYY-MM-response-plan.md` when the payroll issue is part of a larger packet.
   - Add a Notion task comment or operational-row update with the packet links and whether evidence is sent, pending, or blocked.
   - Update `source-register.md`, `memory/history.md`, `memory/skill-runs.md`, `memory/current-state.md`, and `memory/handoff.md` when the run changes live state or reusable process knowledge.

## First-Reviewed Template Reuse

Use this pattern when the user wants to review the first payroll evidence message or Belegnachreichung and then reuse the process for the remaining periods/items.

- Treat the first approved final screen as the control template only for the same client, Steuernummer, authority route, tax type, evidence class, and source schedule.
- For each later item, update only the bounded variables: period, amount, ELSTER ticket, payment date/reference, attachment label, attachment file, and source links.
- Stop for review if the route, Steuernummer, company address, employee count, attachment set, payment total, warning text, or final ELSTER review screen differs from the approved template.
- Keep the Finanzamt text consistent across the batch: state what was filed, what payment/evidence is being allocated, what is attached, and what remains available on request.
- Do not use a template to send a stronger procedural act such as an objection, AdV, deadline extension, or payment proposal unless the first reviewed item included that exact procedural request.
- After each submitted item, capture the ticket and update the schedule before starting the next one; never reconstruct tickets from memory.

## ELSTER Belegnachreichung Upload Notes

- Keep attachment descriptions short. ELSTER may enforce 50 characters; use a neutral label such as `AGL LSt` when the PDF filename and message body carry the detail.
- A label alone is not an attachment. If ELSTER reports `Dateiname` missing or says `Dateiname, Dateigroesse, Bezeichnung, Dateityp und Inhalt` must be provided together, no file has landed.
- Do not click final send with an empty attachment row. Delete or complete the row first.
- If ELSTER carries a stale validation error after shortening a label, reload the attachment page or delete/recreate only the attachment row; do not edit the authority text unless the text itself is wrong.
- The Codex in-app browser may not be able to set ELSTER's hidden native file input. In that case, ask the operator to choose the exact local PDF manually and continue only after the filename is visible in ELSTER.
- ELSTER attachment warnings say uploaded files may be scanned or stripped. Put fristwahrend requests, objections, AdV, extensions, and collection-pause requests in the structured form body, not only inside an attachment.

## Suggested Authority Text Shape

```text
Betreff: <Company>, StNr. <...> - Lohnsteuer <periods> / Zahlungszuordnung und Beleguebersicht

Sehr geehrte Damen und Herren,

zu Ihrem Schreiben vom <date> und zu den am <date> elektronisch nachgereichten Lohnsteuer-Anmeldungen fuer <periods> reichen wir die Zahlungszuordnung und Beleguebersicht nach.

Fuer den Zeitraum bestand ein lohnsteuerpflichtiges Beschaeftigungsverhaeltnis in Deutschland fuer <employee>. Die in den Anmeldungen ausgewiesenen Lohnsteuer- und Solidaritaetszuschlagbetraege stimmen mit den internen Lohnabrechnungen ueberein.

<monthly table or concise bullet list with amount, payment date, bank reference, ELSTER ticket>

Wir bitten, die vorhandenen Zahlungen/Guthaben den jeweiligen Lohnsteuer-Anmeldungszeitraeumen zuzuordnen und etwaige Mahn-, Saeumnis- oder Vollstreckungsfolgen nach Zuordnung entsprechend zu pruefen bzw. zu bereinigen.

Die monatlichen Lohnabrechnungen und Zahlungseinzelbelege liegen vor. Soweit einzelne PDF-Belege noch gesondert benoetigt werden oder in diesem elektronischen Verfahren nicht vollstaendig zugeordnet werden koennen, bitten wir um kurze Rueckmeldung; wir reichen die Einzelbelege dann umgehend auf dem von Ihnen gewuenschten Weg nach.

Mit freundlichen Gruessen

<Company>
```
