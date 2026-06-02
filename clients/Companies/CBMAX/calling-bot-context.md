# CBMAX Authority Call Context

Status: provisional.
Source: user instruction on 2026-05-20; local CBMAX client files; official Hamburg-Nord, Berlin Koerperschaften III, and ELSTER public pages.
Imported: 2026-05-20.
Review: Not yet submitted as a live Calls record and no live telephone call has been placed from this session. Confirm reviewer/approval and submit through the live Notion Calls workflow before using the automated caller.

## Proposed Call Request

| Field | Proposed value | Status | Source | Review |
| --- | --- | --- | --- | --- |
| Short reason | CBMAX Hamburg VAT/tax-number issue | provisional | user instruction; existing task `https://www.notion.so/330e4130131481649b3be0908190ad91` | Submit to Calls after review. |
| Subject | Company | provisional | company VAT/tax-number issue | Correct for company registration, VAT, ELSTER, and tax-standing questions. |
| Company | CBMAX FORGEMATE VENTURES LIMITED / `CBMAX` | provisional | local company file; Notion company `https://www.notion.so/c71b32a86f424e63b63945fe63d7b45b` | Verify live Company relation at submission. |
| Individual relation | Claudio Brivio | provisional | local linked-individuals file | Calls schema requires an Individual relation; Claudio is director, UBO, shareholder, employee, and client POC. |
| Primary contact | Finanzamt Hamburg-Nord | provisional | official Hamburg page; Hamburg issue in existing task | Best first contact for the Hamburg demand; verify whether this is the correct Hamburg office for `17/070/40128`. |
| Fallback contact | Finanzamt fuer Koerperschaften III, Berlin | provisional | official Berlin page; CBMAX Berlin tax number `29/648/60019` | Use if Hamburg cannot act or to confirm Berlin filings/transfer position. |
| First call date | 2026-05-20 if using Berlin fallback; 2026-05-21 first thing if calling Hamburg-Nord | provisional | current time checked 2026-05-20 12:06 IST / 13:06 CEST; Hamburg phone hours | Hamburg phone window had already closed for 2026-05-20 when this was prepared. |
| Priority | High | provisional | user urgency; VAT/ELSTER blocker | User asked for same-day action and fastest resolution. |
| Requires PoA? | No for first call | provisional | RB company-secretary role; local authority guidance | If the authority requires Vollmacht, ask exactly what form/channel is required and capture it as the outcome. |
| PoA Validated | No | provisional | `contracts-and-authority.md` says POA page still needs fetching before recording PoA status | Do not claim a validated PoA on the call. |
| Submitter | Johnpaul Okolie | inferred | user instruction in this thread; `internal/people-roles.md` authority default | Verify live Notion person relation. |
| Reviewer | Johnpaul Okolie unless user names another reviewer | inferred | `internal/people-roles.md` authority default | Confirm before creating Calls record if the normal workflow needs a separate reviewer. |

## Authority Routing

### Primary: Finanzamt Hamburg-Nord

Status: provisional.
Source: official Hamburg-Nord page, checked 2026-05-20.
Imported: 2026-05-20.
Review: Use official route only; avoid any phone number printed on a demand letter until verified.

- Address: Borsteler Chaussee 45, 22453 Hamburg.
- Phone route: `040 115` through HamburgService.
- Fax: `040 4279-58001`.
- Email: `FAHamburgNord@finanzamt.hamburg.de`.
- Telephone hours: Monday-Friday 08:00-12:00 Germany time, which is 07:00-11:00 Dublin/Ireland time in summer.
- Public page: `https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/finanzaemter/nord-207130`.

### Fallback Today: Finanzamt fuer Koerperschaften III, Berlin

Status: provisional.
Source: official Berlin page, checked 2026-05-20.
Imported: 2026-05-20.
Review: Useful because CBMAX has known German company-tax filings under Berlin number `29/648/60019`.

- Address: Volkmarstr. 13, 12099 Berlin.
- Phone: `+49 30 9024 31-0`.
- Telephone hours: Monday-Thursday 08:00-15:00 Germany time and Friday 08:00-13:00 Germany time.
- Public page: `https://www.berlin.de/sen/finanzen/steuern/finanzaemter/finanzamt-fuer-koerperschaften-iii/`.

## Call Objectives

Status: provisional.
Source: user instruction; local CBMAX tax/VAT file.
Imported: 2026-05-20.
Review: Live outcome should be written back to the Notion task and CBMAX communications after the call.

1. Confirm whether Hamburg tax number `17/070/40128` belongs to CBMAX FORGEMATE VENTURES LIMITED.
2. Confirm why Hamburg demanded estimated 2024 VAT under `17/070/40128` when RB believes 2024 VAT returns were filed as zero under Berlin number `29/648/60019`.
3. Ask whether Hamburg can see the Berlin filings or whether Berlin/Hamburg need a transfer, duplicate filing, objection, correction, or written explanation.
4. Ask for the fastest route to stop or cancel any estimated VAT assessment/demand if it was raised under the wrong number or wrong office.
5. Ask for a caseworker name, department, reference, deadline, and exact next action before ending the call.
6. Ask about the ELSTER organisation access attempts from February 2026 and April 2026: whether the activation code was issued, which tax number and address it was sent under, whether it can be reissued, and whether the office can confirm or correct the postal address used for organisation-code letters.
7. Ask whether there are any visible open German tax liabilities, missing VAT filings, open notices, blocked accounts, or other German tax-standing issues for CBMAX.

## Public-Safe Voice Context Pack

Use this text for the caller-facing context. It is designed to be safe to say aloud to the authority.

```text
After the contact answers, the first substantive sentence should be:
"My name is Alexander Gulin. I am calling for CBMAX FORGEMATE VENTURES LIMITED about a German VAT and tax-number issue."

If asked about the caller's relationship to the company:
"Richmond Blackwood Limited is the company secretary and is handling this administrative tax follow-up for the company."

Company details available for identification:
CBMAX FORGEMATE VENTURES LIMITED is an Irish company. Irish company registration number: 755006. Registered office: Workhub, 77 Camden Street Lower, Dublin 2, D02 XE80, Ireland. German correspondence address available: Kamminer Strasse 2, 10589 Berlin, Germany. Company email: contact+cbmaxforgemateventures@richmondblackwood.com.

Identifiers available:
Known Berlin German tax number: 29/648/60019.
German VAT reference available: DE451021099.
German Umsatzsteuer-Identifikationsnummer available: DE455085802.
Disputed or unconfirmed Hamburg tax number from a 2024 estimated VAT demand: 17/070/40128.
Irish VAT and corporation tax number: 4388950KH.

Important context:
The company believes 2024 German VAT filings were submitted at zero under Berlin tax number 29/648/60019. A Hamburg demand appears to refer to estimated 2024 VAT under 17/070/40128, which is not confirmed as a valid CBMAX number. The goal is to identify the correct office and file number, understand whether Hamburg can see the Berlin filings, and get the exact action needed to remove or resolve the estimated VAT demand.

Main questions:
1. Does 17/070/40128 belong to CBMAX FORGEMATE VENTURES LIMITED?
2. If yes, why was it opened and what tax types/periods does it cover?
3. Can Hamburg see the 2024 VAT filings under Berlin tax number 29/648/60019?
4. What action will resolve the estimated 2024 VAT demand fastest: transfer, correction, duplicate zero filing, written objection, or another route?
5. What is the current status of the company's ELSTER organisation activation-code requests from February 2026 and April 2026? Was a postal activation code issued, where was it sent, and can it be reissued?
6. Are there any other visible German tax-standing issues, open liabilities, missing filings, or notices for the company?

If the authority cannot disclose details without Vollmacht:
Ask what exact authorisation form or portal route they need, whether company-secretary evidence is enough, where it should be sent, and whether they can still confirm the correct office, department, reference, and next deadline.

Before ending the call:
Repeat the action required, the office/department, the case reference, any deadline, and whether a written follow-up should go by ELSTER contact form, email, fax, or post.
```

## Private Relation Map

Status: provisional.
Source: local CBMAX files populated from Notion, Drive, Gmail, WhatsApp, and user corrections.
Imported: 2026-05-20.
Review: Re-fetch live Notion relations before final Calls submission if the connector is available.

| Relation / source | Count / record | Key facts for call | Review |
| --- | --- | --- | --- |
| Company | CBMAX FORGEMATE VENTURES LIMITED | Reference `CBMAX`; Irish company number `755006`; company email and German correspondence address are available. | Treat all local facts as provisional until live readback. |
| Individual | Claudio Brivio | Director, UBO, shareholder, employee, and client POC. | Use as schema-required Individual relation unless user names a better relation. |
| German tax registrations | Several filing registrations | Berlin tax number `29/648/60019`; German VAT `DE451021099`; USt-IdNr. `DE455085802`; Hamburg number `17/070/40128` unresolved. | Confirm active/historical status before treating any identifier as current. |
| Irish registrations | IE VAT/CT/VIES | Irish VAT/CT number `4388950KH`; backdate from January 2025 requested, not confirmed accepted. | Do not present Irish backdate as settled. |
| Active task | Call Hamburg Tax Office - CBMAX VAT Issue | Hamburg demand for estimated 2024 VAT under unrecognized number; believed Berlin zero filings under `29/648/60019`. | Live task body not re-fetched in this session. |
| Company authority | Richmond Blackwood Limited company secretary | RB can describe itself as company secretary and administrative representative. | Company PoA file is not validated; avoid saying PoA unless authority asks. |
| ELSTER official help | ELSTER registration guidance | For organisation registrations, activation-code postal address is the address stored by the tax administration under the organisation's tax number. | Ask the office which address was used and whether reissue/correction is possible. |

## Warnings And Blockers

- No live phone call was placed from this Codex session.
- The live Notion Calls connector is not available in this session, so this context is prepared for review/submission rather than already filed into the Calls database.
- Hamburg-Nord telephone hours for 2026-05-20 had already ended by the time this pack was prepared. Berlin Koerperschaften III was still within telephone hours until 14:00 Dublin / 15:00 Berlin on 2026-05-20.
- A same-day written follow-up can still go through the ELSTER contact form or Hamburg-Nord email route if approved.
