---
name: rb-de-freelancer-deregistration
description: Use when preparing, reviewing, submitting, or logging a German freelancer / Freiberufler / self-employed tax deregistration with the Finanzamt, including ELSTER routes, final VAT/prepayment handling, client instructions, Drive evidence, and Notion task closeout.
---

# RB DE Freelancer Deregistration

Status: provisional.
Source: RB Notion SOP `https://www.notion.so/27ee413013148065b563ce0c0ba7138b`, Berlin service page `https://service.berlin.de/dienstleistung/325405/`, Berlin tax deregistration PDF `https://www.berlin.de/sen/finanzen/steuern/downloads/betriebseroeffnung-betriebseinstellung/vorl__ufige_endg__ltige_steuerliche_abmeldung_ummeldung.pdf`, AO section 138 `https://www.gesetze-im-internet.de/ao_1977/__138.html`, and ELSTER `Sonstige Nachricht an das Finanzamt` `https://www.elster.de/eportal/formulare-leistungen/alleformulare/eingsonstnachr`.
Imported: 2026-06-09.
Review: Re-check the live Finanzamt/ELSTER form and the client's state-specific requirements before any submission because labels and available online forms can change.

Use this for one individual at a time when RB needs to deregister a German freelance / self-employed activity with the Finanzamt, stop or refund tax prepayments, and keep the Notion task open until the Finanzamt confirmation is recorded.

## Required Sources

- Source Notion task or operational row.
- Individual record and exact legal name.
- Linked company/person context, if the freelance status ended because the individual became employed by a linked company.
- German tax number and responsible Finanzamt.
- Activity description used for the original freelancer registration.
- Start date, end date, and evidence for why the activity ended.
- Bank statements, Finanzamt notices, or client confirmation showing income-tax/VAT prepayments and amounts paid.
- Drive folder for client evidence and generated PDFs.
- ELSTER access route, only if the operator confirms the account is active and is ready to log in.

## Guardrails

- Use Notion/app connectors and repo records for source truth before browser work.
- Browser use for ELSTER is allowed only as a manual government-portal step when the user/operator has logged in or explicitly approved it.
- Do not submit an ELSTER message/form, upload private documents, or send a client message without action-time approval of the exact destination and content.
- Do not store ELSTER credentials, certificate files, OTPs, raw bank exports, or identity documents in git.
- Keep private individual detail under `clients/Individuals/<legal-name>/`; keep raw backup/export evidence in Drive.
- Treat every tax conclusion as provisional until an RB reviewer or the Finanzamt confirms it.

## Core Answer For ELSTER/Form Questions

When the form asks what activity has ended, choose the freelance/self-employed route:

- For a freelancer: select `selbständige Tätigkeit`, `freiberufliche Tätigkeit`, or the closest `sonstige selbständige Arbeit` label.
- Do not select `gewerbliche Tätigkeit` unless source records show the person had a registered trade/Gewerbe.
- Do not treat wage employment as the ended activity. Employment may be the later activity, but the deregistration is for the prior freelance/self-employed activity.
- In the activity description, use the source-backed freelancer activity wording, not the job title of the later employment.

For the common Berlin-style PDF fields:

- Opening line: `Die selbständige Tätigkeit als <source-backed activity> ... wurde mit Wirkung ab <end date> beendet.`
- `Die Beendigung betrifft`: for a sole freelancer ending the whole freelance activity, normally check `den gesamten Betrieb i. S. d. EStG`.
- Also check `das gesamte Unternehmen i. S. d. UStG` only when sources show the person has no continuing VAT-relevant entrepreneurial/self-employed activity.
- If only one activity among several ended, use `Teilbetrieb` or explain the limited scope and do not imply the whole VAT enterprise ended.
- Reason/type: choose `Aufgabe` when the activity ceased and was not sold, moved, contributed, liquidated, leased, or only paused.
- Use `Betriebsunterbrechung` only when the client intends a temporary pause and keeps the activity ready to resume.
- Later activity: enter source-backed employment or `keine selbständige Tätigkeit` as applicable.

If unsure whether the entire VAT enterprise ended, stop and ask. This affects final VAT return timing and whether ongoing VAT prepayments should continue.

## Workflow

1. Fetch the Notion task, comments, linked project, related individual/company records, and the internal SOP.
2. Confirm the exact legal name, Finanzamt, tax number, activity description, end date, and whether the client paid income-tax or VAT prepayments.
3. Locate or create the approved Drive working folder only when the client destination is clear.
4. Save incoming evidence to Drive, not git; keep repo notes to pointers, source filenames, and blockers.
5. Prepare the deregistration packet:
   - filled tax deregistration PDF if the local Finanzamt/state uses one;
   - German cover letter requesting deregistration;
   - prepayment stop/refund request when supported by evidence;
   - bank/prepayment calculation summary for reviewer approval.
6. Ask the operator or named reviewer to approve the exact field packet, refund/prepayment wording, and submission route.
7. Submit only after approval:
   - Use a dedicated ELSTER `steuerliche Abmeldung/Ummeldung` route if the live portal exposes one for the jurisdiction.
   - Otherwise use `Sonstige Nachricht an das Finanzamt` only when no more specific ELSTER form fits, and attach the approved PDF/letter where supported.
   - If ELSTER attachment/submission is not available, give the client clear instructions for Finanzamt submission or ask an approved caller to confirm the route.
8. Save the ELSTER send receipt, PDF copy, and any Finanzamt confirmation in Drive.
9. Update the Notion task with what was submitted, proof links, remaining confirmations, and the next waiting step.
10. Keep the task `In Progress` or waiting/blocked until the Finanzamt confirms the deregistration and any prepayment/refund handling.
11. Mark complete only after government confirmation is recorded.

## Prepayment And VAT Handling

- If the client paid prepayments, ask for bank statements or Finanzamt notices before calculating refund/stop amounts.
- If the entire VAT enterprise ends, the final VAT return is due after all legal relationships connected to the activity are wound up; the Berlin form references the one-month timing for the final VAT declaration after complete business cessation.
- If only a partial activity ended, do not promise a final VAT return or prepayment cancellation without reviewer approval.
- If payments are unclear, draft the Finanzamt request as a reconciliation request rather than an exact refund demand.

## Field Evidence Log

For each run, keep a run-local or Drive-backed field-evidence table:

| Field | Proposed value | Reason | Exact source | Confidence | Review |
| --- | --- | --- | --- | --- | --- |
| Activity type ended | selbständige/freiberufliche Tätigkeit | Freelancer activity ending, not employment | Notion task/SOP/client record | Ready / Needs review / Unknown |  |
| End date |  |  |  |  |  |
| EStG scope | gesamter Betrieb i. S. d. EStG | Sole freelance activity ended |  |  |  |
| UStG scope | whole / partial / unknown | Determines final VAT handling |  |  |  |

## Cover Letter Skeleton

Use this as an internal drafting base and adapt to the source-backed facts:

```text
Betreff: Steuerliche Abmeldung der selbständigen/freiberuflichen Tätigkeit, Steuernummer <Steuernummer>

Sehr geehrte Damen und Herren,

hiermit zeigen wir an, dass die selbständige/freiberufliche Tätigkeit als <Tätigkeit> von <Name> mit Wirkung zum <Datum> beendet wurde.

Bitte bestätigen Sie die steuerliche Abmeldung und teilen Sie mit, ob weitere Unterlagen oder Erklärungen benötigt werden.

Soweit Einkommensteuer- oder Umsatzsteuer-Vorauszahlungen für Zeiträume nach Beendigung der Tätigkeit festgesetzt oder gezahlt wurden, bitten wir um Prüfung, Anpassung und Erstattung beziehungsweise Verrechnung nach Maßgabe der beigefügten Zahlungsübersicht.

Mit freundlichen Grüßen
<Name / approved sender>
```

## Client Message Drafting

Draft client-facing text in chat first. Include the sending identity, destination, subject/channel, and source task/thread. Explain only what the client needs to do:

- RB is preparing the freelancer deregistration.
- RB needs bank statements or Finanzamt notices if prepayments/refunds are involved.
- The task is not complete until the Finanzamt confirms receipt/processing.
- Do not mention RB internal tools, helper names, connector names, or back-office vendors.

## Completion Comment Template

```text
German freelancer tax deregistration submitted on YYYY-MM-DD.
Individual: <legal name>
Finanzamt / tax number: <Finanzamt>, <tax number>
Activity ended: <self-employed/freelance activity>
Effective end date: <date>
Submission route: <ELSTER form / Sonstige Nachricht / postal or client submission>
Proof: <Drive URL>
Prepayments/refund request: <none / requested, amount provisional / reconciliation requested>
Review: waiting for Finanzamt confirmation; do not mark complete until confirmation is received and logged.
```
