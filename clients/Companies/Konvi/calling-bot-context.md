# Konvi Calling Bot Context

Status: provisional.
Source: Notion Call `RBCALL-11`, Notion Company `KONVI LIMITED`, linked Filing Registrations, Tax Payments, Tax Prepayments, Individual, and Front Office Contact records fetched on 2026-05-11.
Imported: 2026-05-11.
Review: controlled test-call context only; verify all registration statuses with the source records before production use.

This file records company-specific calling-bot context for `KONVI LIMITED`. General calling-bot process behavior belongs in `internal/calling-bot-implementation-map.md`.

## Test Call

- Call: `RBCALL-11` / `Konvi test call - simulated Finanzamt`.
- Subject: Company.
- Represented company: `KONVI LIMITED`.
- Company Reference: `Konvi`.
- Linked individual: Eran Peer, director/UBO context for Konvi.
- Test contact: `Test Finanzamt - Eran Peer`.
- Purpose: controlled English test call where the called person acts as a Finanzamt contact.

## Direct Company Identifiers

- Legal name: `KONVI LIMITED`.
- Register number: `683014`.
- Direct `German VAT No`: blank in the Company record.
- Direct `TAIN`: blank in the Company record.
- Direct `Unique Taxpayer Reference (UTR)`: blank in the Company record.

## Dereferenced Filing Registration References

- Germany VAT: `DE345068258` from linked Filing Registration `Konvi-DE345068258 - VAT`; jurisdiction `DE`; type `VAT`; status `Deregistered`; registration file exists.
- Irish corporation tax / core Irish tax reference: `3989866OH` from `Konvi-3989866OH - Corporation Tax`; jurisdiction `IE`; status `Registered`.
- Irish VAT/RTD/VIES/C&E context: linked registrations and comments reference `3989866OH`.
- Annual Returns / company register reference: `683014` from `Konvi-683014 - Annual Returns`; jurisdiction `IE`; status `Registered`.
- RBO reference: `SR656227` from `SR656227 - RBO`; jurisdiction `IE`; status `Registered`.
- UK VAT reference: `503323441` from `KONVI - 503323441 - UK VAT`; jurisdiction `UK`; status `Registered`.
- UK EORI reference: `GB503323441000` from `Konvi - GB503323441000 - UK EORI`; jurisdiction `UK`.
- Auto-enrolment/payroll reference: `EMP041105089` from `Konvi - EMP041105089 - My Future Funds (Auto Enrolment)`.

## Private Agent Guidance

Do not copy this private guidance verbatim into a public voice prompt. The live Call `Context Pack` must use the public-safe version below.

If asked for a German V-A-T/tax registration reference, the agent should avoid internal source language and say: "I do not have a confirmed active German tax number available. I have a German V-A-T reference that may be historical: D-E 345 068 258. Would that help you search, or do you need a different identifier?"

The agent must not state that Konvi has an active German tax registration unless the authority confirms it.

If asked for the company registration number, use `683014`.

If asked for an Irish corporation tax number, Irish corporate tax number, Irish company tax number, or Irish tax reference, use `3989866OH` and say it slowly as `398 9866 O-H`.

## Public-Safe Voice Context Pattern

Use this shape for the live Notion Call `Context Pack`:

- Opening: "I'm calling on behalf of Konvi Limited regarding German V-A-T and tax registration routing."
- Available public facts: company name, Irish company number, and any public-safe tax/reference numbers.
- Uncertainty: "I do not have a confirmed active German tax number available."
- Possible historical reference: "D-E 345 068 258" only as a possible historical German V-A-T reference.
- Pronunciation: say V-A-T, P-O-A, U-B-O, R-B-O, E-O-R-I, U-T-R, T-A-I-N, I-D, and R-B as individual letters.
- Prohibited public terms: controlled test, our records, direct field, linked registration, relation map, Context Pack, Notion, n8n, Slack, ElevenLabs, workflow, database, tool, source label, or internal status label.

## Relation Map Included In The Test Context

Call relations:

- Company: `KONVI LIMITED`.
- Individual: Eran Peer.
- Contact: `Test Finanzamt - Eran Peer`.
- Call Notes: existing failed/live-help test notes are linked.

Company direct relation coverage:

- Filing Registrations: 13 linked records reviewed for tax/reference numbers; key records listed above.
- Tax Payments: linked payment records exist; recent examples include `KONVI - 01/26 Payee Tax` using payment reference `3989866OH` and `KONVI VAT - MAR - APR 26` linked to Irish VAT.
- Tax Prepayments: linked prepayment records exist; example `KONVI - 1st CIT instalment 2025` linked to Corporation Tax.
- Bank accounts: 5 linked records; not needed for this Finanzamt test unless authority asks for payment routing.
- Contracts: 4 linked records; not needed for this test unless representation/authorization is challenged.
- Correspondence: 24 linked records; high-volume relation summarized, not fully read for this test.
- Filings: high-volume relation summarized, not fully read for this test.
- Expenses and invoices: high-volume relations summarized, not relevant to this authority-routing test.
- Company Project, Director(s), UBOs, Shareholder Companies, Employment Contract: relation IDs visible; used only to establish context/representation unless authority asks.

Individual direct relation coverage:

- Personal German tax ID and German tax number fields are blank.
- PPSN exists in the Individual record but should not be volunteered in this German VAT company test.
- Director of and UBO Of relations include Konvi; use only for representation context if challenged.
- Individual Tax Filings, Assets, Bank Accounts, Customer Companies, and Employed By relations exist but are not relevant unless authority shifts to personal tax identity.

Contact relation coverage:

- Contact has linked availability windows; the test contact was made broadly available for the controlled call.
- Contact phone/language/location/purpose/website fields are available in the Front Office Contact record.

## Live Notion Context Pack

The live `RBCALL-11` Notion `Context Pack` was rewritten on 2026-05-11 as a public-safe voice brief after conversation `conv_9101krcf4cjcfynt5gc06rvq5v8y` exposed internal source language.
