---
name: rb-authority-call-setup
description: Use when a user wants Codex to set up or submit a Richmond Blackwood authority/outbound call request in Notion with minimal user input. The skill gathers Company, Individual, Contact, Contact Availabilities, PoA, and call-objective context from Notion and connected sources, can update or create supporting Notion contacts/entities when the user provides corrections, asks only for missing or ambiguous information after research, presents a review packet, then creates the Calls record only after user approval.
---

# RB Authority Call Setup

Use this skill to create a Notion `Calls` record for the RB calling bot. The user should be able to give a short instruction such as "set up a call for VUN about the VAT number" and have Codex find the rest where possible.

## Source Of Truth

- Calls database: `https://www.notion.so/342e413013148012964ad969a860dd93`
- Calls data source: `collection://342e4130-1314-8000-96eb-000b89507c28`
- Companies data source: `collection://7093d403-7026-4978-9f6e-41ab559bc599`
- Individuals data source: `collection://40cfddcb-ad31-4425-be6a-345aa0f340b7`
- Front Office Contacts data source: `collection://2d8e4130-1314-802d-95fa-000b5483a135`
- Contact Availabilities data source: `collection://342e4130-1314-8051-8d67-000b937562b5`

Always fetch the Calls database or data source before writing. Use the live schema if it differs from this skill.

## Required Form Fields

Create or complete these Notion properties:

- `Short reason` title.
- `Submitter` person.
- `Reviewer` person.
- `Contact` relation to Front Office Contacts.
- `First call date` date.
- `Requires PoA?` checkbox.
- `Priority` select: `Low`, `Medium`, or `High`.
- `Company` relation.
- `Individual` relation.
- `Subject` select: `Contact`, `Company`, or `Individual`.
- `Reason for call` text.
- `Desired outcome` text.
- `Main question` text.

The selected Front Office Contact must also have at least one linked `Availabilities` relation. Treat missing contact availability as a blocker because the voice workflow will not call contacts without availability windows.

Set normal intake defaults unless the user explicitly asks otherwise:

- `Call Status`: `Not started`.
- `Approved`: `__NO__`.
- `Live Help Status`: `None`.
- `Retry Count`: `0`.
- `PoA Validated`: `__YES__` only when the correct subject-specific PoA evidence exists and the user approves that interpretation; otherwise `__NO__`.

Do not set `Call Status` to `Reviewed` or `Approved` to `__YES__` unless the user explicitly approves bypassing the normal review workflow.

## Workflow

1. Parse the user's minimum instruction.
   - Extract the company, individual, authority/contact, topic, desired outcome, deadline/date, urgency, subject, and PoA clues.
   - If there is no usable anchor at all, ask one starter question: who/what the call is about, who should be called, and what outcome is needed.
2. Resolve Notion entities before asking follow-up questions.
   - Search Companies by legal name, `Reference`, tax numbers, and likely client names.
   - Search Individuals by first name, last name, email, phone, and company relations.
   - Search Front Office Contacts by authority name, phone, website, location, language, `Purposes`, and linked `Availabilities`.
   - Search Contact Availabilities when a contact is missing windows or when the requested call date needs a compatible day/time.
   - Prefer exact relation evidence over fuzzy name matches.
3. Reconcile user corrections and supporting entity changes.
   - The user may correct a matched Company, Individual, Contact, reviewer, PoA assumption, call date, subject, phone number, authority office, or other detail in the original prompt or follow-up prompts. Apply those corrections before preparing the final review packet.
   - If the correct Front Office Contact does not exist, offer to create it as part of the flow after collecting at least `Name`, one usable contact route such as `Phone`, `Website`, or `Email`, and at least one `Availabilities` window. Add `Language(s)`, `Location(s)`, and `Purposes` when known.
   - If the selected Front Office Contact has no `Availabilities`, create or link an availability record before submitting the Calls record, or ask for approval to submit a blocked/review-only request.
   - If a Company or Individual exists but has an incorrect or missing field needed for the call, offer to update that existing record after showing the exact change. Examples: add a missing `Company PoA`/`Individual PoA` reference through the supported file workflow, fix a phone/email field, add contact availability, or correct a relation between Company and Individual.
   - If a required Company or Individual does not exist, do not create a full client record casually. Explain that client entity creation is higher impact, ask for explicit approval, and create only the minimum schema-valid record needed when the user confirms. Mark it provisional and route any private details under the normal client filing rules.
   - After any supporting record is created or updated, fetch it back and use the verified Notion URL in the call review packet.
4. Build the call context.
   - Fetch resolved Company, Individual, Contact, and linked Contact Availability pages.
   - Check that the Individual is linked to the Company through at least one relevant relation, such as UBO, director, employee, shareholder, customer company, or related company role.
   - Confirm the Contact has at least one linked `Availabilities` page. If the call is meant to happen on a specific day, prefer an availability window for that day.
   - Dereference linked records before relying on them. A relation ID alone is not usable call context. Fetch the linked page, extract the relevant fields, and cite the source in the review packet.
   - For `Subject = Company`, always dereference Company relations that can carry call-critical authority context: `Filing Registrations`, tax payments, tax prepayments, bank accounts, contracts, correspondence, client/project records, directors, UBOs, shareholders, and any linked individual records relevant to representation. High-volume relations such as expenses, invoices, filings, and correspondence may be summarized by count plus the latest/relevant records, but tax/registration relations must not be skipped.
   - For `Subject = Individual`, always dereference Individual relations that can carry call-critical authority context: tax filings, bank accounts, assets, customer/linked companies, director/UBO/employment relationships, and individual-specific authority references.
   - Build a `Relation Map` that lists every included relation, count, fetched record names, key extracted facts, and any relation intentionally summarized or omitted because it was high-volume or irrelevant.
   - Gather enough linked context to explain the call: tax IDs, filing registrations, filings, correspondence, tax payments/prepayments, bank accounts, contracts, and relevant client/project notes when available.
   - If a direct Company/Individual tax field is blank but a linked registration carries a reference number, include both facts. Example: `Company.German VAT No is blank; linked Filing Registration "Company-DE123456789 - VAT" shows DE123456789 and status Deregistered`.
   - If no linked tax/authority reference is found after dereferencing, state that explicitly in the review packet and ask the user whether to proceed without it.
   - Keep two separate artifacts:
     - Private review context for the user: the full `Relation Map`, source URLs/descriptions, internal field names, source/review notes, and uncertainty.
     - Public voice context for the Call `Context Pack`: only facts and instructions safe for the agent to use on the phone.
   - Populate the Call `Context Pack` with a public-safe voice brief, not raw Notion/source/debug context. The voice brief may include call objective, represented subject, public identifiers, caller identity, representative authority, raw-identifier slow-delivery guidance, safe uncertainty language, and explicit "do not disclose internal systems" rules. It must not include `Relation Map`, Notion/database names, property names such as "direct field", workflow/tool names, Slack/n8n/ElevenLabs internals, or source labels that could be repeated to an authority.
   - The first substantive phone sentence should identify the caller as Alexander Gulin and the represented Company or Individual. Do not put Richmond Blackwood Limited in that first sentence.
   - For company-subject calls, the public-safe brief should say Richmond Blackwood Limited is the company secretary, which is a representative position for the company. Do not lead with Power of Attorney or Vollmacht.
   - For individual-subject calls, the public-safe brief should say the caller is calling on behalf of the individual. Use Power of Attorney or Vollmacht only if the call is marked as requiring it or the authority specifically requires it.
   - If the internal context contains historical, deregistered, uncertain, or unconfirmed references, translate that into public-safe language such as "I do not have a confirmed active German tax number available. I have a German V-A-T reference that may be historical. If useful, I can say it very slowly so you can write it down." Keep the raw identifier exact in the field/context; do not create n8n-style spoken variants or `Say as:` text.
   - Treat fetched facts as provisional and include sources in the review packet.
5. Determine `Subject` and PoA.
   - Use `Company` when calling on behalf of a company or about company tax/registrations/filings.
   - Use `Individual` when calling on behalf of a person or about personal tax/insurance/residence matters.
   - Use `Contact` only for a general authority/contact setup that is not substantively on behalf of the company or individual. The current form still requires Company and Individual relations, so explain the chosen placeholder relation if this happens.
   - If `Requires PoA?` is true and `Subject` is `Company`, check the Company's `Company PoA` files.
   - If `Requires PoA?` is true and `Subject` is `Individual`, check the Individual's `Individual PoA` files.
   - One matching PoA file is enough. If it is missing, ask for the file or explicit approval to submit a blocked/review-only request.
   - If `Requires PoA?` is false, do not mark PoA as part of the planned opening. Treat PoA/Vollmacht as a last resort if the authority explicitly requires it during the call.
6. Draft the form values.
   - Keep `Short reason` concise and operational, for example `VUN VAT number follow-up`.
   - `Reason for call` should explain the background and why the call is needed.
   - `Main question` should be the exact question the agent should get answered.
   - `Desired outcome` should describe an acceptable call result, including reference numbers, deadlines, callback details, routing instructions, or document-submission instructions.
   - `First call date` should be the requested date or the next reasonable business day. Do not use a past date unless the user explicitly asks.
   - Set `Priority` from urgency: deadline/tax-blocking issues are usually `High`, normal authority follow-ups `Medium`, low-impact checks `Low`.
7. Ask for missing support only after research.
   - Ask one consolidated set of questions for fields that remain missing, ambiguous, or risky.
   - Typical blockers: multiple possible companies/individuals/contacts, no authority phone/contact, missing contact availability, no reviewer, missing required date, missing required PoA, unclear subject, company-individual relationship mismatch, or approval needed to create/update a supporting Notion entity.
   - Do not ask for information that can be confidently found in Notion or connected sources.
8. Present a review packet before submission.
   - Show every required form field and its value.
   - Mark each value as `user-provided`, `found`, `inferred`, or `missing`.
   - Include source URLs or source descriptions for found/inferred facts.
   - Include the private `Relation Map`.
   - Show the public-safe `Context Pack` text exactly as it will be sent to the voice agent.
   - Check the public-safe `Context Pack` for forbidden internal terms before submission: `Notion`, `Slack`, `n8n`, `ElevenLabs`, `workflow`, `tool`, `database`, `relation map`, `linked record`, `linked filing registration`, `direct field`, `our records`, and internal status/source labels.
   - Include any supporting Notion creates/updates already made or still proposed, with old value, new value, and source.
   - Show the selected Contact availability windows.
   - Highlight warnings: missing PoA, missing/incompatible contact availability, uncertain relation match, low-confidence contact, duplicate open calls, date in past, or anything that may cause n8n to reject/block the call.
   - Ask for explicit approval to submit the Notion call record.
9. Submit only after approval.
   - Use the Notion create-pages tool with parent `data_source_id` set to the Calls data source.
   - Use fetched schema names exactly.
   - For checkboxes, use `__YES__` or `__NO__`.
   - For dates, use expanded date properties such as `date:First call date:start` and `date:First call date:is_datetime`.
   - For single relations and people, use the page URL or user ID returned by Notion. If the tool rejects the value, follow the SQLite hint in the fetched schema for JSON string formatting.
   - Add short page content with the call setup source register: status, source, imported date, review notes, and any unresolved assumptions.
10. Verify after submit.
   - Fetch the created page.
   - Confirm required properties, relations, status, approval flag, PoA flag, date, and text fields match the review packet.
   - Return the Notion URL and say whether the call is waiting for review or ready for the existing n8n review workflow.

## Supporting Entity Changes

Support user-requested changes during the setup conversation when they are necessary to make the call request correct.

- Create Front Office Contacts when an authority/contact is missing and the user provides enough detail.
- Create or link Contact Availabilities when a new or existing Contact has no availability windows. Do this before final call submission unless the user explicitly wants a blocked/review-only record.
- Update existing Contacts when the selected authority has a better phone number, website, language, location, purpose, or availability.
- Update Company/Individual call-critical fields only with explicit user confirmation and source context.
- Use the repo-local file upload workflow for PoA files; do not fake a file reference or claim a PoA exists when only a filename or intent was mentioned.
- Re-run the call review packet after any supporting entity change.

Keep a clear boundary: creating a contact is usually low risk; creating or materially changing a Company or Individual is higher risk and must be explicitly approved before writing.

## Duplicate And Safety Checks

Before creating a new call, query or search the Calls data source for open calls with the same Company, Individual, Contact, or similar `Short reason`. If a likely duplicate exists, show it in the review packet and ask whether to update that record or create a new one.

Never place a live phone call from this skill. This skill creates the request record only. Calling is controlled later by the n8n and ElevenLabs workflows.

Do not store API keys, webhook secrets, recordings, full transcripts, or private credential material in the repo or in the call record.

## Minimal User Prompts

When follow-up is needed, prefer one consolidated prompt:

```text
I found the company, individual, and likely authority contact. Before I submit the Notion call request, I need:

1. Reviewer: who should review this call?
2. PoA: I did not find a Company PoA. Should I wait for the file, or submit this as review-only/blocking?
3. Call date: should first attempt be 2026-05-12?
```

Then present the review packet once the missing items are resolved.
