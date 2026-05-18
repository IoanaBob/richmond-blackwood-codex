---
name: rb-inbound-operating-triage
description: Use when running Richmond Blackwood inbound operating triage for client-speaking channels: Gmail inbox first, then WhatsApp topic extraction, with finance split-out, correspondence filing, task creation, and batched approval-required actions.
---

# RB Inbound Operating Triage

Use this skill for client-speaking inbound triage. The goal is to move work forward from verified Gmail and WhatsApp communications, not to summarize every system Richmond Blackwood can access.

## Required Context

1. Read `processes/inbound-operating-triage.md`.
2. Read automation memory for last-run checkpoints, canonical reports, blockers, and human-reviewed exceptions.
3. Load supporting skills only when needed:
   - Gmail/email: `skills/rb-gmail-drafts/SKILL.md` for sender/thread rules when replies or email actions are needed.
   - WhatsApp: `skills/rb-whatsapp-comms/SKILL.md` for WhatsApp reads, topic queries, media, and checkpoint safety.
   - Files: `skills/rb-file-uploads/SKILL.md` when uploading, exporting, attaching, or verifying documents.
   - Slack guidance only for an approved or pre-authorized final triage closeout, not as an inbound channel for this workflow.
4. Read `internal/people-roles.md` when assigning newly created client-inbound tasks.

## Run Workflow

1. **Capture communications first**:
   - Default daily automation window: `08:00 Europe/Dublin` on the previous working day through `08:00 Europe/Dublin` on the run day. Do not shorten the daily automation to "since the previous successful run". If today is Monday, use the previous Friday at `08:00 Europe/Dublin`. If the scheduled run is re-run manually later the same day, keep the original `08:00 Europe/Dublin` end time unless the operator explicitly asks for a same-day catch-up pass.
   - Gmail: read inbox-only inbound messages in the run window that are not labelled `Triaged`; start from metadata/snippets/attachments and fetch full bodies/files only when needed.
   - WhatsApp: query saved or explicitly identified client chats by topic and time window; extract topic chunks rather than message-by-message rows when several messages belong to the same discussion.
   - Do not read Slack, signatures, files, Drive folders, Notion, Calendar, HubSpot, or status systems as inbound channels in this workflow. Query supporting systems only after a Gmail/WhatsApp item needs saving, matching, verification, or final notification.
2. **Build a local run scratch list and change ledger**:
   - capture source channel, source link, message/thread IDs, timestamp, sender, recipients, subject/title, attachment names, likely company/client, topic, language, classification, needed writes, assignee candidate, and verification state.
   - append every verified task/record/file/channel change as it happens and use that ledger for the final report or Slack closeout.
3. **Split finance out of the batch**:
   - handle all invoice/expense items before general correspondence/tasks;
   - de-duplicate by source message ID, invoice/receipt number, supplier + amount + date, and unique reference;
   - for billed parties/contractors, query the Business Partners database before deciding Expense vs Invoicing;
   - if no Business Partner is found, save in Expenses with the relevant company/client association;
   - if a matching Business Partner is found, fetch associated contract links before any Expense write; a Business Partner with any associated contract is a hard stop before Expense creation;
   - for a usable associated contract, query all related Invoicing records for that contract, including paid/completed/booked records as well as incomplete records;
   - match the invoice to the existing Invoicing record by invoice number, supplier, period, amount, date, and source metadata; compare net/excl.-VAT contract or Invoicing amounts against gross invoice totals where applicable instead of treating that difference as a failed match; if the record is already paid/completed/booked, record a verified no-op instead of creating anything new; if it is incomplete, attach/set the source file on that invoice record;
   - if the contract or invoice match is unclear, create/update a blocked finance follow-up instead of guessing or falling back to Expenses.
4. **Group the remaining chunks by company and topic**:
   - merge multiple chunks under the same topic before writes;
   - create/update Correspondence only for real correspondence, with original files, full English translations for non-English documents, source metadata, and verified links;
   - if there is no correspondence artifact, create/update only the relevant task;
   - task descriptions/comments must include the actionable information from the communication or translated correspondence, not just a record link.
5. **Perform safe direct writes** after verification:
   - task comments/creation;
   - Correspondence, Expense/Invoicing, Communications, and source-record updates;
   - file links/attachments and translations where destination is verified;
   - Gmail `Triaged` labels and WhatsApp checkpoints only after required handling succeeds.
6. **Prepare one batch approval packet** for outbound messages, Slack closeout posts that are not explicitly pre-authorized, app drafts, signature sends/cancellations, final signed-package distribution, irreversible changes, and sensitive/high-impact status moves.
7. **Execute only approved packet items**, verify results, then produce the final report.

## Task Handling

- For requests/instructions from clients, counterparties, or the internal RB team with no document/correspondence artifact, do not create a Correspondence row just to have one.
- Search the relevant client project first; comment on the matching task with source context and next step.
- If Richmond Blackwood has already said something actionable from our side, create or update a task for it. Treat "we will do/look/check/tell/update/send", "I will", and equivalent commitments as RB-owned action unless the source context clearly shows the work is already complete or owned elsewhere.
- If no task matches and RB action is required, create task(s) in the client project with source link/message ID, owner, priority, status, and due date when known; split into multiple tasks only for separate owners, deadlines, or deliverables.
- If related records/files are created or updated, include their links in the task description/comment and link the task back from the related record where supported.
- If company, individual, supplier, contract, owner, or project is ambiguous, create/update a blocked task with the exact decision needed instead of guessing.
- Assign payment, bookkeeping, accounting-document, and routine client-operation requests to the bookkeeping owner unless another owner is explicit; current default is Simoneta Vicente.
- When a correspondence item has been translated, include the actionable translated information in the task body/comment.
- Do not proactively chase every stale task in this v1 workflow; move tasks only when inbound/status evidence or an obvious active-work match triggers action.

## Finance And Correspondence Rules

- Do not create per-invoice or per-expense payment tasks.
- De-duplicate finance records by source message ID, invoice/receipt number, supplier + amount + date, and unique reference.
- Expense records need verified `Receipt / Invoice` evidence or a clear blocker/human-uploaded-file note before completion.
- SteuerGo charges are always paid by Richmond Blackwood: categorise SteuerGo expenses under `RICHMOND BLACKWOOD LIMITED` (RBL) even when the source email references a client mailbox or client tax-return context.
- Do not create tasks for automated SteuerGo registration/login confirmation emails (e.g. “Confirm your registration now”); mark as `no-op` after verification, label Gmail `Triaged`, and archive only when the operator explicitly requests archiving.
- Treat ELSTER/BZSt W-IdNr availability notices (`Mitteilung der Wirtschafts-Identifikationsnummer`, `W-IdNr.`) as user-approved verified no-ops as of 2026-05-18. Richmond Blackwood does not save W-IdNr values: do not create tasks, Correspondence, Drive evidence, or client records for the notice itself, and do not retrieve/download the notice merely to save the identifier. After confirming the source is only a W-IdNr availability notice, label Gmail `Triaged`. If the same source contains a separate explicit RB action, blocker, client request, or deadline unrelated to saving the W-IdNr, handle only that separate item.
- Query the Business Partners database for the billed party before routing contractor/business-partner invoices: `https://www.notion.so/Business-Partners-834796d901db48adb6273fb7db89eaf7?source=copy_link`.
- If no Business Partner is found, save the item in Expenses and associate it with the relevant company/client.
- If a Business Partner is found, Expense creation is blocked until all associated contract links are fetched and ruled out for the billed company/counterparty context. Supplier-to-RB wording, a negative contract amount, or an invoice addressed to Richmond Blackwood does not by itself make the item an Expense.
- Contractor/business-partner invoices with a verified associated contract and matching Invoicing record go to Invoicing linked to Contract and Company, including records that are already paid/completed/booked. If the matching record is already complete, record the matched-existing/no-op result and do not create a duplicate Expense or payment task.
- For contractor/business-partner invoice matching, check whether the source invoice total is gross while Notion stores contract or Invoicing amounts net/excl. VAT before treating an amount difference as a mismatch.
- If a Business Partner has an associated contract but no matching invoice record can be verified, create/update a blocked finance follow-up; do not fall back to Expenses unless a user-approved or documented business rule confirms the invoice is off-contract.
- For recurring outbound client invoicing, do not create bespoke tasks for known weekly/monthly invoice cadence. Route through the general recurring invoice process and contract-linked Invoicing records. If the source/contract requires separate service and expense invoices for the same period, create or update both records separately; if expense evidence is delayed, process services and leave expense evidence pending through the general finance evidence-aging/reminder path. For day-based recurring invoices, include a monthly planned-absence check when the client rule requires it.
- Routine invoices/receipts/payment reminders are not Correspondence unless they include separate non-invoice operational requests.
- File true correspondence documents in the verified client Drive/Notion destination, include full English translations for non-English documents, and link them back to task/source context.

## Slack Closeout

- Slack is output only for this workflow, not an inbound source.
- Send one Slack message per triage run when requested/pre-authorized or approved in the batch packet.
- Send the closeout to `#rb-client-updates` unless the user explicitly specifies another destination.
- Build the message from the verified run ledger.
- Include the current Notion task status in every task row.
- Tag each task assignee when a Slack user mapping is available and the task is still active; otherwise include the assignee name and note the missing mapping as a verification gap. If a matched task is `Done` or `Archived`, say that status explicitly and do not imply a new owner action is needed.
- If the closeout is not explicitly pre-authorized, include it as a batch approval packet item and **explicitly ask** the operator to approve sending it right after the rendered preview. The approval ask is part of the preview handoff; do not provide a Slack-ready draft and stop without asking whether to send it.
- If the operator has explicitly pre-authorized Slack closeouts for the current automation/run, show the rendered preview and then send it immediately (do not wait for a reply), then log the sent Slack message link in RB Communications.
- Write the closeout as if it came from the user, in concise first-person operating language. Do not use generic assistant-report headings like `main things done`.
- Do not call a closeout `corrected` merely because an earlier Codex preview was rejected, edited, or not sent. Use `corrected` only when a previously sent Slack closeout is being replaced or superseded.
- Use the closeout shape below. When a section has no rows, keep the heading and write `- None`. For empty finance sections, omit the finance owner tag from the heading so the empty section does not ping anyone.

```text
I've finished the <human window label> inbound triage pass. I read the correspondence contents, added translated/read notes, added tasks, and routed the tasks to the right owners.

New Correspondence
- <name>: <Correspondence link> / <Task link> - assigned to <@owner>

New expenses <@U0ALBF770E8>
- <expense name link>

Received invoices <@U0ALBF770E8>
- <invoice or finance blocker link>

New tasks
- <task link> - Status: <status> - assigned to <@owner>

Updated tasks
- <task link> - Status: <status> - <short update> - assigned to <@owner when active>

Blocked / left open
- <source/record> - <reason>
```
- If `New expenses` or `Received invoices` is empty, write the heading without `<@U0ALBF770E8>` and add `- None`.
- The `<human window label>` must sound like a person wrote it, such as `Friday-to-Monday`, `Friday 15 May to Monday 18 May`, or `today's`. Do not use raw timestamp ranges such as `2026-05-15 08:00 to 2026-05-18 08:00` in the Slack opener; keep exact capture windows for the operator-facing final report when needed.
- If an inbound item matches a task whose status is `Done` or `Archived`, list it only when the match is material to the run, include the status in the row, and describe it as a verified existing/no-op or audit note rather than an active update.
- Keep row links and owner tags from the verified ledger. If a Slack user mapping is missing, use the assignee name and report the missing mapping.

## Client Validation Rules

- Company-specific validation rules live in the relevant client domain file.
- Do not scan every company folder; open only exact entries whose trigger matches.
- Current hook: for Workhub / Stein Commercial / Camden Street invoice-like items, open `clients/Companies/RBL/invoices-payments-expenses.md` starting at `## Workhub Invoice Validation`.
- Current hook: for AGL / AGILE LINCS / Byron weekly Syntentia time or expense items, open `clients/Companies/AGL/invoices-payments-expenses.md` starting at `## AGL Syntentia Weekly Invoicing`.

## Approval Packet Format

Use stable IDs:

```text
APPROVAL-1
Type:
Source:
Action:
Recipient/Destination:
Sending identity:
Exact content / status change:
Files:
Verification after approval:
Risk / reason approval is required:
```

Ask once for approval of the whole packet or specific item IDs. Do not send, draft, cancel, distribute, or make irreversible/sensitive changes outside the approved IDs.

## Final Report

Return:

- communication sources checked and completion markers advanced;
- Gmail inbox items and WhatsApp topic groups captured;
- tasks created/commented/updated/blocked;
- records/files created or updated;
- approval packet items and what was approved/executed/skipped;
- outbound links or message IDs actually sent after approval;
- same-day nudges suppressed;
- blockers and next owner/action/date.
