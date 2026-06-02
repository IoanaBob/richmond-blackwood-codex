---
name: rb-send-elster-message
description: Use when Richmond Blackwood needs to prepare, enter, send, or record a German ELSTER authority message or supporting-document upload for a client, including Belegnachreichung, Sonstige Nachricht, Einspruch/AdV, deadline extensions, payment-proof responses, payroll evidence allocation, and other non-return Finanzamt communications. Keep message content and client facts in the task/client records, not in the skill.
---

# RB Send ELSTER Message

Use this skill after the Finanzamt correspondence, client, tax type, period, and intended route have been identified. It is route/workflow guidance only: the actual message text, attachments, and client-specific facts belong in chat previews, response plans, client files, Notion Communications, and source logs.

## Pair With

- `rb-finanzamt-response` for notice triage, filing-vs-message separation, and tax workstream prioritisation.
- `rb-communications` for exact outbound text previews and sent-message logging.
- `rb-file-uploads` for Drive storage and evidence filing.
- `rb-source-research` and the relevant client-file skill before relying on Notion, Drive, Gmail, local files, or public sources.

## Non-Negotiables

- Do not store ELSTER certificates, certificate passwords, OAuth tokens, private keys, cookies, credential bundles, or credential dumps in git.
- Do not submit a message, objection, AdV, evidence upload, extension request, payment proposal, or final return screen without the user's reviewed approval for the exact action and content.
- Do not put reusable client-specific message text into this skill. Save actual drafts and sent text in chat/client response plans, canonical Notion Communications, and durable memory/source pointers.
- Prefer the most specific ELSTER route that fits the correspondence. Use generic `Sonstige Nachricht` only when no more specific form, appeal, filing, or supporting-document route fits.
- Do not say an attachment was sent unless ELSTER showed the filename/attachment row as complete and a confirmation/ticket was captured.
- If Notion/Drive exposes attachment names but not an uploadable local file, record a manifest and blocker. Do not treat attachment metadata as a transmitted PDF.
- Raw evidence and submitted copies belong in Drive or the live source system. Repo files keep source pointers, filenames, hashes where useful, tickets, and blockers.

## Workflow

1. Build the message packet.
   - Identify client `Reference`, Steuernummer, Finanzamt, tax type, period, deadline, source correspondence, and requested procedural act.
   - Classify the route: `Belegnachreichung`, specific filing/form, `Einspruch`/AdV, extension request, payment-proof or allocation response, or `Sonstige Nachricht`.
   - State which source records support each fact. If a fact is not source-backed, mark it as review-required.

2. Prepare the reviewed preview.
   - Show channel, route, operator/sender, recipient Finanzamt, subject/reference, attachments, and exact body.
   - For objections, AdV, collection pause, deadline extension, or payment allocation, put the procedural request in the form body, not only inside an attachment.
   - Store the draft text in the task/client response plan or Notion record when useful. Do not create software drafts unless the user explicitly asks.

3. Handle attachments.
   - Inventory files by exact filename, source URL/page, period, purpose, local path if available, and upload status.
   - Keep ELSTER attachment labels short; a neutral label can work when the message body and filename carry detail.
   - A label alone is not an attachment. If ELSTER reports `Dateiname` missing, the file has not landed.
   - Do not click final send with an empty attachment row. Delete or complete the row first.
   - If the in-app browser cannot set ELSTER's hidden native file input, ask the operator to select the exact local file manually and continue only after the filename is visible.

4. Enter and review in ELSTER.
   - Navigate only through the approved route and client/account context.
   - Stop when the final screen or send action changes legal/tax state unless the user has already approved that exact final screen and content.
   - If ELSTER warnings, Steuernummer, period, route, attachment set, or final-screen text differ from the approved packet, stop for review.

5. Record after sending.
   - Capture route, Auftrag, Transferticket, Ordnungskriterium, Abgabezeit, subject/reference, attachment list, and any non-blocking ELSTER Hinweise.
   - Create/update the canonical Notion Communications record for the sent message, including the sent text or a pointer to the authoritative submitted copy.
   - Update the owning client files, source register, import log, task/filing rows, and response plan with sent/pending/blocked status.
   - If Communications, Drive, or Notion write-back is unavailable, record the blocker instead of implying closeout.

## Reviewed Template Reuse

Use a first reviewed item as a control template only within a narrow envelope:

- Same client, authority route, Steuernummer, tax type, period series, evidence class, and procedural purpose.
- Update only source-backed variables such as period, amount, ticket, payment date/reference, filename, and deadline.
- Stop for review if a later item adds a new procedural request, new tax type, different address/Steuernummer, different route, unexpected warning, missing attachment, changed final-screen totals, or stronger legal effect.
- Capture each submission proof before moving to the next item.

## Consolidated Cases

Do not create a one-off skill for a single client response. Use this skill for reusable ELSTER message mechanics across:

- payroll-tax evidence allocation and payment-proof follow-up;
- payment-proof responses for assessed balances or account credits;
- annual VAT processing messages and formal objections/AdV;
- E-Bilanz deadline-extension or holding messages;
- supporting-document uploads after returns or filings;
- personal or company filing-related messages where the actual filing workflow lives in a more specific tax skill.
