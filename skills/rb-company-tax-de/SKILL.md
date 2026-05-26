---
name: rb-company-tax-de
description: Prepare German company tax filings for Richmond Blackwood clients, especially ELSTER corporation tax and trade tax nil-return work, without making final transmissions unless the operator explicitly authorises that exact click.
---

# RB Company Tax - DE

Use this skill when preparing or filing German company tax returns for a company client, including Körperschaftsteuer, Gewerbesteuer, solidarity-surcharge context, and nil returns in ELSTER.

## Authority And Operator Rule

- Codex may research, prepare, enter data, validate, and navigate to non-final review screens.
- Codex must not click the final ELSTER transmission button (`Absenden`) unless the operator gives a narrow, action-time instruction for that exact filing and exact button.
- Default rule: the human operator clicks final send/transmission buttons. If the user says "proceed" or gives a broad task instruction, treat that as preparation/validation approval only, not final filing approval.
- Before any browser action that could submit, transmit, send, or file data with an authority, stop and state the destination, client, tax year, return type, and the exact button/action required.
- If there is uncertainty whether a button is only a review step or the actual submission step, stop and let the operator click it.

Status: approved.
Source: user instruction in Codex chat on 2026-05-26.
Imported: 2026-05-26.
Review: Apply to every future RB authority filing skill and browser workflow unless the user explicitly supersedes it.

## Required Sources

1. Company folder under `clients/Companies/<client-reference>/`, especially `README.md`, `tax-vat-filings.md`, `source-register.md`, `drive-locations.md`, `communications.md`, and `open-questions.md`.
2. Notion company record plus relevant Communications, Tasks, Filing Registrations, Filings, Tax Payments, Employment, Payroll, and other operational records that could affect the filing.
3. Drive company folder, evidence files, prior filing confirmations, and saved Drive pointers.
4. Latest Notion communication, task, filing-registration, or authority-response source that triggered the filing.
5. Existing ELSTER or filing evidence only as source material, never as proof that a new filing can be submitted without operator approval.
6. Official ELSTER help or form availability pages when deciding whether a return can be filed online.

## Workflow

1. Confirm the responsible company reference from Notion before writing repo files.
2. Register or update the source context with:
   - Status.
   - Source URL or local source pointer.
   - Imported date.
   - Review gap.
3. Verify the exact German tax number from the newest authority source before using older repo memory.
   - If an old repo value conflicts with a newer Finanzamt/ELSTER/Notion source, treat the old value as superseded and record the correction.
4. Confirm whether the return can be filed with an RB/general ELSTER account as data transmitter.
   - A client-owned ELSTER certificate is preferable where available but is not required when the authorised transmitter account can submit the form.
   - A `Sonstige Nachricht` is not a substitute for a tax return when ELSTER provides the correct return form.
5. Prefer data takeover from a prior accepted filing only to copy identity and structural data.
   - Actively neutralise copied non-zero figures.
   - Remove stale prior-year notes, urgency text, old authority names, and old tax numbers.
   - Check carried-forward financial-year dates.
6. For nil returns, inspect the final entered data for:
   - Correct tax number and Finanzamt.
   - Correct assessment year.
   - Correct company legal name, seat, management location, and representative details.
   - Zero profit/income/trade-income fields.
   - No stale non-zero values in Anlage GK, ZVE, GewSt, additions, reductions, or carry-forward sections.
7. Use ELSTER validation.
   - Fix every blocking error.
   - If ELSTER introduces a reason category for supplemental text and none fits, clear the supplemental note rather than choosing an inaccurate category.
8. Stop before transmission.
   - Tell the operator the return type/year, validation status, key zero-value checks, and current ELSTER screen.
   - Ask the operator to click the final transmission button.
9. After the operator completes transmission, capture the confirmation:
   - Return type and year.
   - Tax number / Ordnungskriterium.
   - Transferticket.
   - Submission timestamp.
   - Any warning or follow-up instruction.
10. Update the company client files and Notion/Drive source pointers as supported.

## Output

Leave behind:

- A concise filing-preparation or filing-completion note in the company tax file.
- Corrected source-register entries when authority context changed a tax number or filing instruction.
- Open questions for anything not confirmed by a source.
- Confirmation details only after the operator has actually submitted the return.
- A clear statement of which filings remain prepared-only versus submitted.

## Guardrails

- Do not store ELSTER credentials, certificate files, private keys, OTPs, or session cookies.
- Do not treat a phone call summary as sufficient source for unrelated tax years or tax types; keep the filing instruction scoped to the years/forms mentioned.
- Do not send authority messages or submit returns from broad approval language.
- Do not choose a supplemental explanation category just to pass validation if the category does not match the facts.
- Do not mark a return filed until ELSTER returns a successful transmission confirmation or another authority proof exists.
