---
name: rb-gmail-inbound-triage
description: Daily Gmail inbound triage for Richmond Blackwood with Notion/Slack/Gmail write-safety, de-duplication, and no-spam Slack overview rules.
status: provisional
source: user instruction (Daily Gmail Inbound Triage automation prompt + AGENTS.md) + processes/gmail-inbound-triage.md
imported: 2026-05-08
review: Confirm the exact inbound aliases to include, and confirm which Notion databases are canonical for Expenses/Invoicing/Correspondence/Tasks.
---

# RB Gmail Inbound Triage

Use this skill when running the Daily Gmail inbound triage automation.

## Inputs

- Gmail: search inbound mail that is **not** labelled `Triaged`.
- Notion: create/update records in:
  - Expenses (for payables/receipts)
  - Invoicing (for AR or invoice tracking where appropriate)
  - Correspondence (only for non-routine, non-invoice communications)
  - Tasks (only for actionable non-invoice correspondence; set `Blocked` when entity match is ambiguous)
- Slack: post **one** overview to `#rb-client-updates` only after Notion writes succeed.

## Workflow (high level)

0. **Start from memory and build a run ledger**:
   - Read automation memory first for canonical Slack state, known blockers, and human-reviewed exceptions.
   - Create a run ledger with message ID, thread ID, source alias, classification, unique keys, existing Notion matches, required writes, verification state, Gmail label state, and Slack-summary section.
   - Keep work phased: discovery → batched de-duplication → writes → verification → Gmail labels → single Slack overview.
   - Cache Notion schemas/data source IDs and Slack assignee IDs once per run. Fetch full pages/files only when they affect a write or verification decision.
   - Do not let performance shortcuts skip required verification for mutable records, files, ownership, or Gmail labels.
1. **Search** Gmail for `in:inbox -label:Triaged` across accounting/client aliases. Start with metadata/snippets/attachment filenames; download full bodies or files only after classification shows they are needed.
2. **Classify** each email:
   - Ignore/no-op (newsletters, marketing, generic notifications) → do nothing, do not label Triaged unless policy says otherwise.
   - Expense/payable/receipt → create/update **Expenses** row and attach the source file to `Receipt / Invoice`; do not create a task.
   - Before saving an Expense, resolve the correct company:
     - Set the Expense `Company` relation to the verified client/company.
     - Set `Internal company` only when the payer maps to an existing internal option.
     - If an invoice spans multiple companies, link every verified company and note the split/allocation in `Should be charged to`.
   - Contractor invoices with an active Contract are **not Expenses**:
     - Search for the active Contract first.
     - Create/update the corresponding **Invoicing** record linked to the Contract and Company.
     - If a human already uploaded the invoice file to the Invoicing line, record that it was found and do not upload a duplicate.
     - Never create a separate contractor-payment task for an invoice.
     - If a contractor invoice was wrongly logged as an Expense, remove it from Expenses if possible; otherwise mark it rejected/removed and point to the correct Invoicing record.
   - Workhub exception: all Workhub / Stein Commercial / Camden Street invoices must be addressed to RICHMOND BLACKWOOD LIMITED and checked against the approved plan schedule: CBMAX, PCL, NACV, and Konvi are on the €199 upgraded/non-essential plan; all other companies are on the €99 essential plan. If the addressee or plan is wrong, do not log it as a payable Expense, do not mark the Gmail message `Triaged`, and request a corrected invoice from Workhub. If already logged, mark the Expense `Rejected` and keep it as an audit pointer only. If the user has already reviewed and approved a Workhub Expense as correct, do not override it; report it as human-reviewed/approved in the final Slack overview.
   - If a human already uploaded the invoice/receipt, record that it was found and no duplicate upload was made.
   - Client/tax/compliance letter or other real non-invoice correspondence → create/update **Correspondence** row.
   - Payment-failed invoice notices, upcoming direct-debit notices, payment reminders, and payment receipts are not Correspondence by default; route them to Expenses, Invoicing/AR, or ignore/no-op unless they include a separate operational request.
   - For correspondence attachments, file the source document in Drive inside the verified client folder:
     - Ensure `Correspondence/Incoming` and `Correspondence/Outgoing` exist.
     - Put inbound files in `Correspondence/Incoming`; put outbound files in `Correspondence/Outgoing`.
     - Use the general archive only as a temporary holding location when the client Drive folder cannot be verified, and record the blocker.
     - Link the final Drive file URL in the Notion Correspondence record and related task comment.
   - Payment received notice → update the relevant invoice/AR record; create Correspondence only if the notice includes separate non-invoice operational context. Route any true correspondence task to the specific client project where possible.
3. **De-duplicate** before writing:
   - Search Notion for invoice numbers, message IDs, and unique refs.
   - Update existing records; avoid “parallel duplicates”.
4. **Handle tasks only for correspondence**:
   - Do not create tasks for invoices or expenses; the weekly recurring invoice/expense task covers those.
   - For actionable correspondence, search the relevant client project first.
   - If a matching task exists, add/update the task comments or status context and link the Correspondence record.
   - If no matching task exists, create one task in the right client project and link the Correspondence record.
   - If entity/supplier/contract is ambiguous, create a Notion Task under the relevant client project where known; otherwise use RB Clients with Status `Blocked` and a short “what decision is needed”.
5. **Slack overview**:
   - Prepare a single, personal “I updated the team” message with clickable links.
   - Use the required section order:
     1. **New Correspondence** — every correspondence row one by one, with the Correspondence link, Drive file link when present, linked task, task status, and tagged Slack owner.
     2. **New Expenses** — every expense row created/updated, with Expense link, amount, status, owning company/internal company, and attachment/evidence state.
     3. **Received Invoices** — non-expense invoice records such as contractor invoices routed to Contracts/Invoicing, with Invoice line, contract link, file status, and no-duplicate/no-task note.
   - If a section is empty, keep the heading and write `None`.
   - Do not send if interrupted; on restart, send one full overview only.
6. **Gmail labeling**:
   - Apply label `Triaged` only to messages whose required handling succeeded.
   - Do not archive by default.

## Output / Reporting

Return:

- Notion links created/updated
- Files attached to Expense `Receipt / Invoice`
- Gmail message IDs labelled `Triaged`
- Slack message link (only if actually posted)
- Created task links and updated task links, separately
- Blockers (with Notion Task links)
