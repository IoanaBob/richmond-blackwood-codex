---
title: Inbound Operating Triage
status: provisional
source: user instruction (communications-first inbound triage review + AGENTS.md)
imported: 2026-05-11
review: Validate Gmail-inbox-first capture, WhatsApp topic extraction, and finance split behavior on the next live run.
---

# Inbound Operating Triage

## Purpose

Use this process to turn client-speaking inbound communications into operating progress. A triage run is not just a status report: it reads the minimum needed client communication channels, separates finance items first, files true correspondence, creates or updates tasks, and batches approval-required actions into one execution packet.

This workflow is for channels where clients or counterparties talk to Richmond Blackwood. Current input priority is:

1. Gmail inbox only.
2. WhatsApp, queried and grouped by discussion topic.

Do not treat Slack, signatures, files, Drive folders, Notion, SignNow, status systems, or other tooling as channels for this workflow. Query those systems only when they are needed to verify, route, upload, save, or notify about a communication already captured from Gmail or WhatsApp.

## Communication Capture First

Do not build a global active index before reading communications. First capture the communication batch, with enough source metadata to route and verify it later.

- Gmail: read the inbox only for configured RB/accounting/client inbound addresses. Start with metadata, snippets, sender, recipients, subject, message/thread IDs, labels, source link, date, and attachment filenames. Fetch full bodies and files only for messages that plausibly contain finance, correspondence, or actionable client work.
- WhatsApp: use targeted WhatsApp queries by client/contact, date window, and topic terms. Extract discussion chunks by topic rather than processing each message one by one when a topic group tells the same story. Use saved checkpoints where available; if chat identity or checkpoint scope is unclear, record a blocker instead of backfilling broadly.
- Do not query every available channel because access exists. Query Notion, Drive, file helpers, Business Partners, client folders, or tasks only after the captured communication requires that lookup.
- Keep a local run scratch list or ledger containing source channel, source link, message/thread IDs, timestamps, sender, recipients, subject/title, attachment names, likely company/client, topic, language, classification, needed writes, assignee candidate, and verification state.

## Run Change Ledger Prerequisite

Before writing anything, create a run change ledger from the captured communication batch. Append every verified change as it happens: source channel/link/message ID, classification, created/updated Notion/Drive/source records, associated task links, assignees, verification performed, report section, and approval-packet item ID when relevant. Build the final Slack closeout or approval-ready report from this verified ledger, not from memory.

## Default Daily Window

For the scheduled daily inbound triage automation, the default capture window starts at `08:00 Europe/Dublin` on the previous working day and ends at `08:00 Europe/Dublin` on the run day.

- Do not shorten the window to "since the previous successful run" for the daily automation.
- If the previous day is Saturday or Sunday, use `08:00 Europe/Dublin` on the most recent Friday.
- If the scheduled run is re-run manually later on the same day, keep the original scheduled end time (`08:00 Europe/Dublin` on the run day) unless the operator explicitly asks for a same-day catch-up pass.
- Use saved Gmail completion markers (`Triaged`) and WhatsApp checkpoints inside that window to avoid duplicate handling.
- For ad hoc/manual triage runs outside the scheduled daily automation, the operator may supply a narrower or different window.

## Channel Registry

Use these default read windows. If a connector is unavailable, mark that source `Skipped - connector unavailable` in the run ledger/final report, use only user-provided or already-verified context, and do not infer what might have happened there.

| Channel | Read window / checkpoint | Completion marker |
| --- | --- | --- |
| Gmail | Inbox only. For the scheduled daily automation, read inbound messages received from `08:00 Europe/Dublin` on the previous working day through `08:00 Europe/Dublin` on the run day that are not labelled `Triaged`; start with metadata, snippets, recipients, subjects, message IDs, labels, and attachment filenames before fetching full bodies/files. For ad hoc/manual runs, use the operator-approved run window. | Apply Gmail `Triaged` only after the item is fully saved/updated or a verified no-op classification succeeds. Do not archive by default. |
| WhatsApp | Query saved or explicitly identified client chats by topic and time window. For the scheduled daily automation, inspect new messages/topic chunks that fall within the default daily window while still respecting saved checkpoints. If the scheduled run is re-run manually later the same day, keep the original `08:00 Europe/Dublin` end time unless the operator explicitly asks for same-day catch-up. If `Last read message ID` exists, read after that ID; otherwise read after `Last read through`; if neither exists, use only the user-approved query/window and record the checkpoint blocker. | Advance the client checkpoint only after required handling for inspected topic chunks succeeds. |
| Supporting systems | Not inbound channels for this workflow. Query Notion, Business Partners, Drive/files, client folders, Tasks, Invoicing, Expenses, and Communications only when a captured Gmail/WhatsApp item needs saving, matching, verification, or final notification. | Record verified writes/readbacks in the run ledger. |

## Classification And Safe Direct Writes

Classify each captured communication chunk after the source capture pass:

- `no-op`: no Notion, Drive, Slack, supplier/client, or source action required; mark the channel completion marker after verification.
- `task update`: comment/update the matched active task with new context, source link, and next step.
- `new task`: create task(s) in the relevant client project when no matching task exists and RB action is required; create multiple tasks only when the inbound item contains distinct actionable workstreams.
- `Correspondence`: create/update only for real non-invoice correspondence or source documents/messages that should be filed.
- `Expense/Invoicing`: create/update expenses, receipts, contractor invoices, or invoicing records under the finance split below.
- `blocker`: create/update a blocked task when entity, supplier, contract, evidence, or destination is ambiguous.
- `approval-required`: add the exact proposed action to the batch execution packet.

Safe direct writes are allowed after verification: Notion task comments/creation, Correspondence, Expense/Invoicing updates, Communications logs, labels, and checkpoints. Do not make irreversible or sensitive changes as a safe write.

## Finance Split First

After the communication capture pass, split all expense and invoice items out of the working set before handling general correspondence or tasks.

- De-duplicate finance items by source message ID, invoice/receipt number, supplier + amount + date, and unique references.
- Routine invoices, receipts, payment reminders, upcoming direct-debit notices, and payment receipts are not Correspondence unless they include a separate non-invoice operational request.
- Do not create per-invoice or per-expense payment tasks; recurring finance processing covers those.
- Expense records must have verified `Receipt / Invoice` evidence or an explicit blocker/human-uploaded-file note before the source item is complete.
- SteuerGo charges are always paid by Richmond Blackwood: record SteuerGo expenses under `RICHMOND BLACKWOOD LIMITED` (RBL) even when the source email references a client mailbox or client tax-return context. Do not create tasks for automated SteuerGo registration/login confirmation emails; treat them as verified `no-op` source items and archive only when explicitly requested.
- ELSTER/BZSt W-IdNr availability notices (`Mitteilung der Wirtschafts-Identifikationsnummer`, `W-IdNr.`) are user-approved verified no-ops as of 2026-05-18. Richmond Blackwood does not save W-IdNr values: do not create tasks, Correspondence, Drive evidence, or client records for the notice itself, and do not retrieve/download the notice merely to save the identifier. After confirming the source is only a W-IdNr availability notice, apply Gmail `Triaged`. If the same source contains a separate explicit RB action, blocker, client request, or deadline unrelated to saving the W-IdNr, handle only that separate item.

For contractor or business-partner invoices:

1. Identify the billed party/person/supplier from the source message, invoice text, attachment filename, or parsed document.
2. Query the Business Partners database for that party before deciding Expense vs Invoicing: `https://www.notion.so/Business-Partners-834796d901db48adb6273fb7db89eaf7?source=copy_link`.
3. If no matching Business Partner is found, save the item in Expenses and associate it with the relevant company/client using the established entity-routing rules.
4. If a Business Partner is found, do not create an Expense yet. Fetch and inspect all associated contract links first; a Business Partner with any associated contract is a hard stop before Expense creation. Supplier-to-RB wording, a negative contract amount, or an invoice addressed to Richmond Blackwood does not by itself make the item an Expense.
5. Use a contract only when the associated contract's Company/other-party field matches the counterparty context for the bill. If that relationship is unclear, create/update a blocker instead of guessing.
6. For a usable associated contract, query all related Invoicing records for that contract, including paid, completed, booked, and incomplete records, before assuming new work is required.
7. Match the respective invoice by invoice number, supplier, period, amount, date, and source metadata. Compare net/excl.-VAT contract or Invoicing amounts against gross invoice totals where applicable; do not treat a gross/net amount difference as a failed match when the contract, party, period, and invoice metadata line up. If the matching invoice record already exists and is paid/completed/booked, record the verified no-op/matched-existing result and do not create a duplicate Expense or payment task. If the matched record is incomplete and needs evidence, set/attach the source file on that invoice record and record the source metadata.
8. If a Business Partner has an associated contract but no matching invoice record can be verified, create/update a blocked finance follow-up with the attempted matches and source metadata; do not fall back to Expenses unless a user-approved or documented business rule confirms the invoice is off-contract.
9. Only create an Expense for a matched Business Partner after all associated contract links have been fetched and ruled out for the billed company/counterparty context.

For Gmail finance items, apply Gmail `Triaged` only after the Expense or Invoicing record has been saved/updated and the file/source attachment has been verified, or after a verified no-op/correction-required classification succeeds.

## Recurring Outbound Client Invoicing

Some client billing cases are regular operating cadence, not one-off tasks. When a client-specific rule says a recurring invoice already exists or should be handled by the weekly/monthly finance process, do not create bespoke tasks such as `make invoices for <client>`.

- Route the item through the general recurring invoice process and the contract-linked Invoicing records.
- When the contract/source requires both services and expenses for the same period, create or update separate service and expense invoice records instead of combining them.
- If time/services evidence is available but expense evidence is delayed, process the service invoice and leave the expense invoice/report pending until reviewed evidence arrives.
- For day-based recurring invoices, the general process may include a monthly planned-absence check with the billing contact so future service invoices use the right day count.
- If a client or director repeatedly delays expense evidence, raise reminders through the general finance evidence-aging/reminder routine, not a client-only standing task.
- Outbound invoice emails remain approval-required unless the current workflow explicitly pre-authorizes sending. Use the client domain file for the exact recipient/body format and source evidence.

## Action Requests Without Correspondence

After finance items are removed, group the remaining chunks by company/client and topic. Merge multiple chunks about the same topic before writing records so the run creates one coherent task/correspondence trail instead of one record per message.

If an inbound request or instruction has no document or correspondence artifact to file, handle it as task work whether it came from a client/counterparty or from the internal RB team:

- Do not force a Correspondence row.
- Search the relevant client project first.
- If Richmond Blackwood has already said something actionable in the source conversation, create or update a task for it even if the message came from the RB side. Treat wording such as "we will do", "we will look", "we will check", "we will tell/update/send", "I will", or equivalent commitments as RB-owned action unless the surrounding context clearly shows it is already complete or owned elsewhere.
- If a matching task exists, add a task comment with the source channel, source link/message ID, new context, and proposed/actual next action.
- If no matching task exists, create task(s) in the client project with source context, owner, status, priority, and due date when known. Use one task for one coherent workstream; split into multiple tasks only when the inbound item clearly contains separate owners, deadlines, or deliverables.
- If the run creates or updates related records such as Correspondence, Expense, Invoicing, Communications, Drive files, or source records, include those associated links in the task description or task comment, and include the task link back in the related record where supported.
- Assign using explicit instructions, the project owner/inherited owner, established process rule, or `internal/people-roles.md`; if ownership is unclear, create a blocked task rather than an unowned task.
- Payment, bookkeeping, accounting-document, and routine client-operation requests belong with the bookkeeping owner unless another owner is explicit; under current defaults this is Simoneta Vicente.
- Task descriptions/comments must include the actionable information from the communication or translated correspondence, not just a link to the source. Include source metadata and the next concrete action.

## Correspondence And Document Rules

- Create or update Correspondence only for real non-invoice correspondence or source documents/messages that should be filed.
- Correspondence attachments belong in the verified client Drive folder under `Correspondence/Incoming` or `Correspondence/Outgoing`, or in the supported Notion file property when that is the verified destination, then linked back to Notion/task context.
- Attach all relevant original files once and verify the final file links/readback before marking the source complete.
- For non-English correspondence or documents, create a faithful full English translation, not just a summary. Upload or attach the translation in the `Translated Doc(s)` destination where supported, and note the source language.
- Correspondence notes should include the source channel, source message/thread IDs, sender, recipients, received date, subject/title, short summary, and any extracted deadline or requested action.
- Any related task must include the useful information from the translated correspondence in the task body/comment so the assignee can act without opening every file first.
- If the document cannot be read, uploaded, translated, or linked, create/update a blocker and do not mark the source item complete.

## Slack Closeout

Slack is not an inbound channel for this workflow. Use Slack only for the final triage closeout when the run prompt requests or pre-authorizes it, or when the user approves it in the batch approval packet.

- Send one Slack message per triage run, not one per channel or per item.
- Send the closeout to `#rb-client-updates` unless the user explicitly specifies another destination.
- Build the message from the verified run ledger.
- Include the current Notion task status in every task row (`Status: To Do`, `Status: In Progress`, `Status: Done`, `Status: Archived`, etc.).
- Tag the assignee on each task row when a Slack user mapping is available and the task is still active. If a matched task is `Done` or `Archived`, say that status explicitly and do not imply a new owner action is needed; include the assignee only as historical ownership when useful.
- If the closeout is not explicitly pre-authorized by the run prompt, include it as an approval packet item and explicitly ask the operator to approve sending it immediately after the rendered preview. The approval ask is part of the preview handoff; do not provide a Slack-ready draft and stop without asking whether to send it.
- If the operator has explicitly pre-authorized Slack closeouts for the current automation/run, show the rendered preview and then send it immediately (do not wait for a reply), then verify the Slack message link and log it in RB Communications.
- Write the Slack closeout as if it came from the user, in a concise first-person operating style. Do not use generic assistant-report headings such as `main things done`.
- Do not call a closeout `corrected` merely because an earlier Codex preview was rejected, edited, or not sent. Use `corrected` only when a previously sent Slack closeout is being replaced or superseded.
- Use this section order for the triage closeout. When a section has no rows, keep the heading and write `- None`.
  - Opening sentence: `I've finished the <human window label> inbound triage pass. I read the correspondence contents, added translated/read notes, added tasks, and routed the tasks to the right owners.`
  - The `<human window label>` must sound like a person wrote it, such as `Friday-to-Monday`, `Friday 15 May to Monday 18 May`, or `today's`. Do not use raw timestamp ranges such as `2026-05-15 08:00 to 2026-05-18 08:00` in the Slack opener; keep exact capture windows for the operator-facing final report when needed.
  - `New Correspondence`: one row per correspondence item as `<name>: <Correspondence link> / <Task link> - assigned to <@owner>`. Include the task link because the task must contain the actionable translated/read information.
  - `New expenses <@U0ALBF770E8>`: list each new/updated expense as a linked expense name, with blockers inline only when they affect completion. If there are no expense rows, use the heading `New expenses` without the owner tag and write `- None`.
  - `Received invoices <@U0ALBF770E8>`: list each received/matched invoice as a linked invoice or finance blocker. Use this for incoming invoices, payment notices, receipts, and blocked finance matching that needs bookkeeping follow-up. If there are no invoice rows, use the heading `Received invoices` without the owner tag and write `- None`.
  - `New tasks`: list standalone tasks created from communications that are not already covered by a Correspondence row, as `<task link> - Status: <status> - assigned to <@owner>`.
  - `Updated tasks`: list updated existing tasks as linked task names with the current task status, assignee tag when the task is active, and the short update made. For a matched `Done` or `Archived` task, write `Status: Done` or `Status: Archived` and phrase the row as a verified match/no-op or audit note, not as a new action.
  - `Blocked / left open`: list only source items that intentionally remain incomplete, such as Workhub correction-required items or missing attachment/upload blockers.
- Include created/updated Correspondence, Expenses, Invoicing records, tasks, Gmail `Triaged` counts, WhatsApp checkpoint changes, and blockers in the relevant sections instead of as a generic run log.
- Do not include substantive client advice, promises, or sensitive context in Slack unless explicitly approved.

## Targeted Client Validation Rules

Company-specific validation rules live in the relevant client domain file, such as `invoices-payments-expenses.md`, `contracts-and-authority.md`, or another matching file.

- Do not scan every company folder for possible validation rules during normal triage.
- Load a client validation rule only when channel metadata, content, attachment filename, parsed text, or a verified Notion match satisfies its trigger.
- The process owns the trigger and lookup path; the client file owns the business rule and handling.

Current hook:

| Hook | Trigger | Rule entry | Apply before |
| --- | --- | --- | --- |
| RBL Workhub invoice validation | Invoice, renewal notice, payment notice, or invoice correction request where sender, subject, body snippet, attachment filename, parsed invoice text, or matched Notion record indicates Workhub, Stein Commercial, or Camden Street | `clients/Companies/RBL/invoices-payments-expenses.md`, starting at `## Workhub Invoice Validation` | Creating/updating Expense or Invoicing records, marking channel completion, or reporting the item |
| AGL Syntentia weekly invoicing | Gmail/contract/invoicing item involving AGL, AGILE LINCS, Byron weekly timesheets/expenses, Syntentia, Michelle Howard, Nick Howard, or `accounting@lincs.one` | `clients/Companies/AGL/invoices-payments-expenses.md`, starting at `## AGL Syntentia Weekly Invoicing` | Creating/updating Invoicing or Expense records, marking channel completion, reporting the item, or preparing/sending invoice emails |

## Batch Approval Packet

Collect approval-required actions into one packet at the end of investigation and safe direct writes.

Approval-required actions include:

- outbound emails, Slack/WhatsApp messages, or other external replies;
- final Slack closeout posts unless the current run prompt explicitly pre-authorizes direct posting;
- app/software draft creation;
- signature request cancellation, sending, or signer redirection;
- final signed-package distribution;
- irreversible changes;
- sensitive/high-impact stage/status moves.

The packet must use stable item IDs and include exact text/actions, source record/channel, recipient/destination, sending identity, files, risks, and verification needed. Ask once for explicit approval covering the full packet, with the option to approve all, reject all, or approve specific item IDs. Execute only approved items, verify them, and report skipped/blocked items.

## Same-Day Suppression

Suppress duplicate outbound nudges to the same recipient about the same action when a same-topic reminder/update was already sent today and nothing material changed.

Suppression does not apply to inbound questions, replies to inbound messages, acknowledgements, new blockers, changed status, completion evidence, invalid-request cleanup, final signed-version gates, reminders to a different actor, or escalation after a missed/partial answer. Record the source message or Communications row that caused suppression.

## Reporting And Completion

Finish with:

- communication sources checked and checkpoints/labels advanced;
- Gmail inbox items captured and Gmail `Triaged` labels applied;
- WhatsApp topic groups captured and checkpoint changes;
- tasks commented, created, updated, or blocked;
- Correspondence, Expense, Invoicing, Communications, source records, and files created/updated, with associated task links where applicable;
- batch approval packet item IDs and approval status;
- outbound actions executed after approval;
- no-op counts;
- skipped same-day nudges;
- remaining blockers with next owner/action/date.

If no actionable items and no Notion/Drive/source records changed, do not post Slack; return a concise no-op summary only. If a Slack closeout is needed and not explicitly pre-authorized by the run prompt, include it in the batch approval packet.
