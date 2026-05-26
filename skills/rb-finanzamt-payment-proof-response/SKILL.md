---
name: rb-finanzamt-payment-proof-response
description: Use when preparing a Richmond Blackwood response to a German Finanzamt reminder, demand, or query where payment proof should be matched to a tax period, preserved in Drive, and drafted for ELSTER, email, or written submission.
---

# RB Finanzamt Payment Proof Response

Use this for one Finanzamt payment-proof response at a time.

## Required Inputs

- Incoming Finanzamt notice, reminder, demand, or query.
- Bank, Wise, Wamo, or other payment confirmation.
- Owning company or individual client route.
- Destination channel when known: ELSTER contact form, email, postal letter, or other.

## Workflow

1. Load `skills/rb-communications/SKILL.md`, `skills/rb-client-file/SKILL.md`, and `skills/rb-file-uploads/SKILL.md`.
2. Identify the owning entity before filing anything.
   - Company payroll, wage tax, VAT, corporation tax, and company tax registration matters go under `clients/Companies/<Reference>/`.
   - Personal tax, garnishment, payment plan, or individual tax matters go under `clients/Individuals/<legal-name>/`.
3. Extract and compare the notice facts against the payment proof:
   - Finanzamt name and address.
   - Tax number or account reference.
   - Tax type, period, due date, principal amount, surcharge/interest/fees, and total claimed.
   - Payment sender, recipient, paid-out/value date, amount, recipient account, payment reference, and provider transaction ID.
4. Treat exact amount matches carefully.
   - If the payment matches only the principal tax amount, state that the principal tax was paid and ask whether any surcharge remains open.
   - Do not say a full reminder balance is settled unless payment proof covers principal plus surcharges/fees or the Finanzamt balance evidence confirms that.
   - If the reference period on the payment differs from the notice period, include both facts and ask the Finanzamt to allocate the payment to the intended account/period.
5. Prepare a concise German response preview in chat.
   - Show channel, operator if required, sender/representative, recipient, subject, attachments, and body.
   - Do not send or create an app draft unless the user explicitly approves that exact action.
6. Preserve evidence in Drive.
   - Use the verified client Drive folder and existing correspondence subfolders where available.
   - Upload a combined packet when useful: cover letter, payment confirmation, and incoming notice.
   - Store raw evidence in Drive, not git.
7. Update the repo with pointers only:
   - Client `drive-locations.md` for packet/evidence URLs.
   - Client `source-register.md` for incoming notice, payment proof, and generated packet.
   - Client tax/payroll or communications file for the business status and follow-up.
   - `memory/skill-runs.md` for meaningful skill use.
8. After a real send, log the communication in canonical RB Communications and record any blocker if the database/schema is unavailable.

## German Reply Pattern

Use this shape, adapting facts and not overclaiming:

```text
Sehr geehrte Damen und Herren,

bezugnehmend auf Ihre Mahnung vom <date> reichen wir den Zahlungsnachweis fuer die <tax type> fuer den Zeitraum <period> ein.

Die Hauptforderung in Hoehe von EUR <amount> wurde am <date> von <payer> an <Finanzamt> ueberwiesen. Die Zahlung erfolgte mit der Referenz <reference>; Zahlungsnachweis/Transfer <id> ist beigefuegt.

Wir bitten um Zuordnung dieser Zahlung auf das Steuerkonto <tax number/account> und um Bestaetigung, dass die <tax type>-Forderung fuer den Zeitraum <period> damit ausgeglichen ist. Falls ein ausgewiesener Saeumniszuschlag oder sonstiger Nebenbetrag noch gesondert offen sein sollte, bitten wir um kurze Mitteilung.

Mit freundlichen Gruessen
<sender>
```

## Guardrails

- Keep factual claims provisional until the user approves or the live source of truth confirms them.
- Do not infer authority to represent a client from possession of a notice; use neutral wording when representative authority is unclear.
- Do not store full bank statements, raw PDFs, credentials, ELSTER certificates, or payment tokens in git.
- Do not send via Gmail, ELSTER, WhatsApp, Slack, or any other channel without explicit approval of the exact rendered message and attachments.
