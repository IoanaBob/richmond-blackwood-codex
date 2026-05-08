---
title: Gmail Inbound Triage
status: provisional
source: user instruction (Daily Gmail Inbound Triage automation prompt + AGENTS.md)
imported: 2026-05-08
review: Confirm the canonical Notion databases and which inbound aliases are in-scope for this triage.
---

# Gmail Inbound Triage

## Scope

This process covers daily inbound email triage for Richmond Blackwood, focusing on accounting/client-alias inbound mail that is not labelled `Triaged`.

## Performance And Checkpoint Rules

- Read the automation memory first and treat its canonical Slack link, superseded Slack links, open blockers, and known human-reviewed exceptions as the starting checkpoint.
- Keep a run ledger before writing anything, with one row per Gmail message/thread: message ID, thread ID, source alias, classification, unique keys, existing Notion matches, required writes, verification state, Gmail label state, and Slack-summary section.
- Work in phases instead of bouncing between apps message-by-message:
  1. Gmail discovery and lightweight classification.
  2. Batched Notion/Drive/contract de-duplication checks.
  3. Required Notion/Drive writes.
  4. Verification fetches.
  5. Gmail `Triaged` labels for successfully handled messages only.
  6. One Slack overview built from the verified run ledger.
- Fetch Gmail metadata, snippets, recipients, subjects, message IDs, and attachment filenames before downloading full bodies or files. Download/upload files only after the target Notion record and Drive destination are known.
- Fetch each Notion database schema/data source ID at most once per run, then reuse it. Batch searches by datasource and unique keys where the connector supports it; fetch full Notion pages only for matched candidates that affect a write or verification decision.
- Cache Slack user IDs for task assignees once per run before composing the final overview.
- Do not use cached or memory-only facts to skip required verification for mutable state, file attachments, record ownership, or Gmail label decisions. Performance shortcuts must reduce repeated reads, not reduce correctness checks.

## Operating Rules

- Prefer **Company** ownership over **Individual** ownership when both are plausible.
- Do **not** create duplicate Notion records:
  - Before creating any Notion row/page, search for an existing record by:
    - Gmail message ID, and/or
    - invoice number / receipt number, and/or
    - supplier + amount + date, and/or
    - unique reference (e.g., `CC-INV-19364`, `INV-0103`, `RE0006`).
  - If a matching record exists, update it instead of creating a new one.
- Keep **Correspondence** clean:
  - Use Correspondence for actionable non-invoice communications (e.g., compliance/tax letters, account issues, client instructions, or supplier/client messages that require a non-routine response).
  - Do **not** log routine invoices/receipts as Correspondence unless they carry additional non-invoice operational context; log invoices/receipts as Expenses only.
  - Do **not** log invoice payment-failed notices, upcoming direct-debit notices, ordinary payment reminders, or payment receipts as Correspondence by default. Route them to Expenses, Invoicing/AR, or ignore/no-op as appropriate unless the message also contains a separate operational request.
  - If an item was mistakenly logged as Correspondence, mark it **Superseded** (rename title + note) rather than creating a second “correct” correspondence row.
- Keep **Expenses** complete:
  - Resolve the owning company before writing or updating the Expense:
    - Set the Notion `Company` relation to the client/company receiving the invoice or receipt.
    - Use `Internal company` only when the payer is one of the configured internal options; do not use it as a substitute for the `Company` relation.
    - If one invoice covers multiple companies, link every verified company relation and describe the allocation in `Should be charged to`; do not pick a single company just to avoid ambiguity.
  - Every invoice/receipt email with an attachment must have the source file attached in the Expense database `Receipt / Invoice` field.
  - If the file is already uploaded by a human, do not upload a duplicate; state that the invoice was found and no new file upload was needed.
  - If no attachment is present in the email but an invoice/receipt link or text was found, upload or preserve the found evidence through the approved file workflow before marking triage complete.
- Contractor invoices:
  - Search for an existing active Notion Contract before creating anything.
  - If an active contract exists, do **not** create an Expense. Create or update the corresponding **Invoicing** record linked to the Contract and Company, attach or verify the invoice file in the invoice file field, and note the Gmail source.
  - If a matching Invoicing record already exists and a human already uploaded the invoice file, update that record with the Gmail/source evidence and do not upload a duplicate.
  - Do not create a payment task for contractor invoices.
  - If a contractor invoice was mistakenly created as an Expense, remove it from the Expenses database if the connector permits; otherwise mark it `Rejected`/removed with a pointer to the correct Invoicing record.
- Company-specific exceptions:
  - Keep volatile company/supplier exception details in the relevant `clients/Companies/<Reference>/` file, not duplicated in this general process.
  - Before processing a supplier/client exception, check whether the owning company has a local exception file and apply that file’s rule.
  - Current example: RBL Workhub / Stein Commercial / Camden Street invoice handling lives in `clients/Companies/RBL/invoices-payments-expenses.md`.
  - If a company-specific exception says an invoice should not be processed, do not log it as a payable Expense and do not mark Gmail `Triaged`; record or update the audit pointer/blocker required by that company file.
  - If the user has already reviewed and approved a company-specific exception as correct, do not override it during automation cleanup. Report it as human-reviewed/approved in the Slack overview and leave the record unchanged.
- Do **not** create per-invoice or per-expense Tasks. Richmond Blackwood already uses the recurring weekly task for invoice/expense processing across companies.
- Evidence and files:
  - Do not claim files were attached in Notion unless verified.
  - When Notion cannot accept file uploads directly, store the **Gmail message link** and attachment filenames in the Notion record, and route raw files to Drive via the approved upload workflow when available.
  - For client correspondence attachments, Drive is the filing destination:
    - Find the existing client Drive folder first; do not guess the group/external path.
    - If the client folder exists but has no `Correspondence` folder, create `Correspondence`.
    - Inside `Correspondence`, ensure `Incoming` and `Outgoing` folders exist.
    - Save inbound correspondence files to `Correspondence/Incoming`; save outbound correspondence files to `Correspondence/Outgoing`.
    - Link the final Drive file URL from the Notion Correspondence record and the related task comment.
    - If the client Drive folder cannot be verified, use the general archive only as a temporary holding location and record the blocker before applying `Triaged`.
- Client project routing:
  - If an actionable non-invoice item belongs to a specific client (for example Pacheco Cruz Limited), search that client project first.
  - If a matching task already exists in the client project, update it with a comment/status note rather than creating a duplicate task.
  - If no matching task exists, create a task in that client project and link the Correspondence record.

## No-Spam Slack Rule

- Post **one** overview message to `#rb-client-updates` **only after** all required Notion writes for this triage run have succeeded.
- If the run is interrupted (tool rejection/error), **do not post** partial updates.
- On restart, resume from the last confirmed checkpoint and send **one full overview** (assume nothing has been posted yet unless a Slack message link is recorded in automation memory).
- The final Slack overview must use these sections, in this order:
  1. **New Correspondence** — list each Correspondence record one by one with a clickable Notion link, filed Drive document link when present, the linked existing/created task, task status, and the tagged Slack owner. Do not collapse multiple correspondence records into a generic client list.
  2. **New Expenses** — list each Expense record created or materially updated with a clickable Notion link, amount, status, owning company/internal company, and whether the `Receipt / Invoice` field is verified, human-uploaded, rejected/correction-required, or blocked.
  3. **Received Invoices** — list non-expense invoice records, especially contractor invoices routed to Contracts/Invoicing, with the clickable invoice line, linked contract, file status, and confirmation that no duplicate upload/task was created where applicable.
- Do not post a final Slack overview until each section has been checked for omissions. If a section has no entries, write `None` for that section rather than deleting the heading.

## Completion Criteria (per message)

For each Gmail message processed:

1. Required Notion actions (create or update) are completed and verified.
2. Invoice/receipt attachments are present in the Expense `Receipt / Invoice` field, or the record explicitly says a human already uploaded the file and no duplicate was uploaded.
3. Non-invoice correspondence is linked to an existing client-project task or a newly created task in the right client project.
4. Only then apply Gmail label `Triaged`.
5. Do not archive by default.
