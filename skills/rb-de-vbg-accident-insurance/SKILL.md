---
name: rb-de-vbg-accident-insurance
description: Use when applying for, preparing, reviewing, or logging a German VBG accident-insurance / Unfallversicherung / Unternehmensnummer registration for an RB company client, especially where the result is needed for a Betriebsnummer.
---

# RB DE VBG Accident Insurance

Status: provisional.
Source: Notion guideline `https://www.notion.so/165e413013148096a9fbf8abc5b41057`, live VBG public form `https://service.vbg.de/unternehmen-anmelden` inspected on 2026-06-03, RB form-fill and client-file rules.
Imported: 2026-06-03.
Review: Re-check the live VBG form before each submission because labels and required fields can change.

Use this for one company at a time when RB needs the German accident-insurance registration / Unternehmensnummer from VBG, including when the number blocks a German Betriebsnummer or payroll setup.

## Required Sources

- Linked task or operational row.
- Notion Companies record, using the exact `Reference` for repo routing.
- Filing Registration record named or equivalent to `Unternehmensnummer / Accident Insurance`.
- Linked company project.
- Linked Employment records and employment contracts.
- Primary director / legal representative Individual record.
- Company purpose from the tax-registration/company record.
- Company correspondence address and company email.

## Guardrails

- Use Notion/app connectors and repo records for source truth. Browser use is only for the public VBG form because this is a manual public-authority form and no RB API/MCP route is available.
- Do not translate the live VBG form in-browser. Use a separate translation tab or offline translation for comprehension only.
- Do not enter real client data into the VBG form or submit until the operator has approved an exact form-fill packet for the target company.
- Do not store credentials, full private identifiers, raw identity documents, certificate files, or form screenshots in git.
- Keep source evidence and screenshots in Notion/Drive or run-local private storage; git stores only pointers and process notes.
- Maintain a running field-evidence log while filling the form. Do not rely on browser state or memory as the only record of why a field was chosen.

## Workflow

1. Fetch the task, comments, linked project, company, filing registration, employment, contract, and primary individual records.
2. Confirm the target company from the Client Databases Companies record, not only the project-management relation.
3. Build a form-fill packet with field, proposed value, reasoning, exact source location, confidence, and review note.
4. Ask for approval of the exact packet before typing real client data into VBG or submitting.
5. Create a run-local field-evidence log before browser data entry, for example `/private/tmp/rb-de-vbg-accident-insurance/YYYY-MM-DD-<client-ref>/field-evidence.md`.
6. After each initial/numbered VBG page, save the fields entered on that page to the field-evidence log with:
   - VBG page/step and field label.
   - Value entered or selected.
   - Reasoning for that value.
   - Exact source location: Notion page URL plus property name, repo file path plus heading/row, Drive URL, Gmail/Slack/WhatsApp source pointer, or explicit user instruction.
   - Confidence: `Ready`, `Needs review`, or `Unknown`.
   - Whether operator review is required before continuing.
7. Open `https://service.vbg.de/unternehmen-anmelden`.
8. Do not use browser translation.
9. Select applicant role before the numbered steps:
   - Prefer `Gesetzl. Vertreterin/gesetzl. Vertreter` when the director/legal representative is the applicant and their details will be entered.
   - If RB is applying under another authority route, stop and confirm the correct role before proceeding.
10. Complete the VBG steps, saving the field-evidence log after each page before advancing.
11. On the VBG overview page, reconcile every displayed value against the field-evidence log. Any mismatch becomes a blocker until corrected or approved.
12. Before submitting, give the operator the final review output in the required format:
    - State that `Absenden` has not been clicked.
    - Include a `Source Links` block with hyperlinks for the VBG guide, task, company, individual/legal representative, employment records, filing registration, and field-evidence log.
    - Include a field-by-field review table covering every displayed/entered value on the overview page.
    - Put embedded hyperlinks in each table row's source/reasoning cell; do not rely only on the separate source list.
    - Stop here for operator review.
13. Submit only after action-time approval of the final overview table and the visible VBG overview page.
14. After submission, capture the displayed application/reference/company number if one is shown, the confirmation text, the VBG PDF copy/download if available, and a screenshot.
15. Upload the VBG PDF copy and screenshot to the existing company Drive folder or approved registration/payroll evidence folder. If connector upload is unavailable, use the repo-approved `rb-file-uploads` helper path. Record file title, URL, size, MD5 if returned, and SHA-256 in the run-local field-evidence log.
16. Add the reference, current waiting status, and proof links to:
    - the source task comments;
    - the company Filing Registration record for accident insurance / Unternehmensnummer.
17. If VBG does not immediately assign an Unternehmensnummer, keep the task open/in progress, add a waiting label/status where available, and state that VBG will respond in the coming days.
18. Set the accident-insurance Filing Registration to the in-progress/submitted status option exposed by its database, for example `Submitted` when that is the available in-progress status. Do not mark it `Registered` until the actual Unternehmensnummer and PIN are received and logged.
19. Notify the owner through the company's preferred communication channel that the VBG application was submitted, that they should expect letters from VBG by post, and that RB needs them shared when they arrive to finish payroll setup.
20. For outbound owner notification, use `rb-communications` plus the channel-specific skill:
    - Resolve the recipient and channel from the Company and Individual records, saved communication pointers, and preferred communication setting.
    - Use plain client-facing wording. Avoid German administrative terms such as `Unternehmensnummer`, `Betriebsnummer`, and `Lohnnachweis Digital` unless the operator explicitly asks to include them.
    - Draft the message in chat and show the destination, sender/channel, attachments, and body unless the user supplied exact final text and explicitly asked to send it.
    - Send only after the required approval for the exact recipient and content.
    - Log the sent message in canonical Communications after successful send.
21. Read back the task, filing registration, proof files, and communication log updates. Only then mark any source task done.

## Current VBG Field Map

Initial page:

- `Anmeldung erfolgt durch`: usually `Gesetzl. Vertreterin/gesetzl. Vertreter`.

Step 1 `Allgemein`:

- `Unternehmen besteht seit`: use the company's incorporated/registered-on date or documented business start date.
- `Haben Sie Beschäftigte oder ist die Einstellung von Beschäftigten geplant?`: `Ja` when there is active or planned employment.
- `Seit/Ab wann haben Sie Beschäftigte?`: use the earliest employment start date/contract date that establishes when the company employed people.
- Leave unpaid reportable-person checkboxes blank unless source records explicitly show such people.

Step 2 `Unternehmensgegenstand`:

- Enter the company purpose from the tax-registration/company record.
- If VBG autocomplete shows a clearly matching option, select it; otherwise leave the entered description as free text after confirming the wording.
- `Anzahl Beschäftigte`: number of employees for that business purpose. Use active Employment records, not shareholders/directors alone unless employed.

Step 3 `Zum Unternehmen`:

- `Rechtsform`: for Irish limited companies, use `ausländische juristische Person (EU-Recht); z.B. NV; BV; S.L.; s.r.l.`.
- `Ist das Unternehmen in einem deutschen Register eingetragen?`: usually `Nein` for a foreign company with no German register entry.
- `Firmenname`: full legal name.
- `Adresse`: use company correspondence address from Notion when available. If manual entry is used, select the manual `Land` option from the dropdown, not just typed text.
- `E-Mail-Adresse`: company communication email used by RB for that client.
- `Telefonnummer`: RB company phone unless the operator approves a different client phone.
- Leave `Internetadresse`, `Postfach`, and `Rechtssitz weicht vom Unternehmenssitz ab` blank/unchecked unless a source record requires them.

Step 4 `Kontaktinformationen`:

- `Gesetzlich vertreten durch`: primary director/legal representative from the Individual record.
- Enter first name, last name, birth date, and legal representative address.
- If manual address entry is used, select the manual `Land` option from the dropdown.
- `Anmelder/-in`: with the legal-representative route, repeat the legal representative details where required.
- Use the RB phone for applicant phone unless the operator approves otherwise.
- Add applicant email when RB needs the Unternehmensnummer by email; the form says the number is displayed after submission and additionally emailed when an email is provided.

Step 5 `Weitere Informationen`:

- `Wird eine Zweigniederlassung / unselbstständige Niederlassung im Inland unterhalten?`: `Nein` unless a German branch is recorded.
- `Wird oder wurde ein Unternehmen übernommen?`: `Nein` unless source records show an acquisition.
- `Ist die öffentliche Hand zu über 50% an dem Unternehmen beteiligt?`: `Nein` unless source records show public ownership.
- `Ist das Unternehmen als gemeinnützig anerkannt?`: `Nein` unless source records show nonprofit recognition.
- `Möchten Sie ein SEPA-Lastschriftmandat erteilen?`: `Nein` unless the operator approves a payment mandate and bank details.

## Packet Template

| VBG step | VBG field | Proposed value | Reasoning | Exact source location | Confidence | Review |
| --- | --- | --- | --- | --- | --- | --- |
| Initial | Anmeldung erfolgt durch |  |  |  | Ready / Needs review / Unknown |  |

## Final Review Template

Use this at the overview page before `Absenden`:

```md
Still stopped on the VBG overview page. `Absenden` has not been clicked.

**Source Links**
- [VBG guide](<guide URL>)
- [Task](<task URL>)
- [Company record](<company URL>)
- [Legal representative / individual record](<individual URL>)
- [Employment record(s)](<employment URL>)
- [Filing registration](<filing registration URL>)
- [Field evidence log](<absolute local field-evidence path>)

| VBG step | Field shown on overview | Value shown on overview | Reason / embedded source | Confidence | Operator decision |
| --- | --- | --- | --- | --- | --- |
| 1 Allgemein | Unternehmen besteht seit |  | Company registered/incorporated date. Source: [Company record](<company URL>), property `Registered on`. | Ready / Needs review / Unknown | Approve / change |
```

The review table must include at least these overview values when present:

- applicant role;
- `Unternehmen besteht seit`;
- employee/planned employee answer and employee since date;
- unpaid reportable-person answer;
- `Unternehmensgegenstand`;
- `Anzahl Beschäftigte`;
- `Unternehmensschwerpunkt`;
- legal form;
- German register-entry answer;
- company name, address, country, email, phone, website, PO box, and legal-seat-differs answer;
- legal representative academic title, name, birth date, address, and country;
- applicant name, phone, and email;
- branch, acquisition, public-ownership, nonprofit, and SEPA mandate answers.

The operator must review this final table before submission. If the visible VBG overview and the final table differ, correct the form or update the evidence log before asking for approval.

## Completion Comment Template

Use this shape for task and filing-registration comments after a verified submission:

```text
VBG accident-insurance / Unternehmensnummer application submitted on YYYY-MM-DD.
Company: <legal name> (<reference>)
Application/reference/company number shown by VBG: <reference, or "not shown immediately">
VBG status: <e.g. successful submission; immediate Unternehmensnummer assignment not possible; response expected in coming days>
Proof PDF: <Drive URL>
Confirmation screenshot: <Drive URL>
Source task: <task URL>
Review: waiting for Unternehmensnummer/code and PIN by post; both are needed to finalise payroll/Betriebsnummer registration.
```

## Owner Notification Template

Use this as the default client-facing message after submission, adapting the greeting, entity name, and proof links. Keep the wording plain and avoid German administrative terms unless the operator asks to include them. Send through the company's preferred communication channel after the exact-message approval required by `rb-communications`:

```text
Hi <owner first name>, quick update: we have submitted the application with VBG for <company legal name>.

VBG confirmed that the application was received. They said they will respond in the coming days and send the required letters by post to the submitted company address.

Please watch for any letters from VBG. When they arrive, please share them with us so we can finish the payroll setup.

Proof of submission: <Drive proof link, if appropriate to share>
```
