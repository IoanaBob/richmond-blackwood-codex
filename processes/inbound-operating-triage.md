---
title: Inbound Operating Triage
status: provisional
source: user instruction (generalized inbound triage plan + AGENTS.md)
imported: 2026-05-11
review: Validate channel windows and active-index performance on the next live multi-channel run.
---

# Inbound Operating Triage

## Purpose

Use this process to turn inbound signals into operating progress. A triage run is not just a status report: it reads configured inbound channels, reconciles signals against active client work, performs safe verified updates, and batches approval-required actions into one execution packet.

## Start With A Global Active Index

Build the active worklist before reading channel detail:

- open Notion Tasks across client projects and general RB work;
- active client projects and relevant client/company/individual records;
- open RB Communications follow-ups;
- active source records connected to onboarding, signatures, approvals, contracts, evidence, finance, correspondence, settlement, or follow-up where discoverable.

Prefer one global active index over client-by-client polling. Fetch schemas/data source IDs once, batch Notion searches where possible, and fetch full pages only for records that affect a matching or write decision.

## Channel Registry

Read the smallest useful window for each channel. Do not invent context for unavailable connectors.

| Channel | Read window / checkpoint | Completion marker |
| --- | --- | --- |
| Gmail | New/unhandled inbound for configured RB/accounting/client aliases; start with metadata, snippets, recipients, subjects, message IDs, and attachment filenames. | For any Gmail item from the accounting/client inbound scope, apply Gmail `Triaged` only after required handling or verified no-op classification succeeds. Do not archive by default. |
| Slack | Configured RB channels, relevant task-linked threads, or user-requested channels since the last successful run/checkpoint. | Record reviewed source links/timestamps in the run ledger or Communications. When a task is created from a Slack message, reply in the source thread after task creation is verified with the task URL and assignee. |
| WhatsApp | Saved client chat checkpoints only (`Last read through` / `Last read message ID`). No historical backfill unless the user explicitly asks. | Advance the client checkpoint only after required handling for inspected messages succeeds. |
| Notion | Open Tasks, task comments/status changes, Communications follow-ups, and relevant source-record changes from the active index. | Update task/source records directly when safe and verified. |
| SignNow / signing systems | Check only records linked to active work or inbound status. | Status alone is evidence only; do not complete signature work until signed files are retrieved/attached. |
| Drive / Docs / files | Inspect only files linked from inbound items or active work. | Attach/link files only in the verified destination; do not claim attachments exist until fetched back. |
| Calendar / calls | Inspect only relevant meetings/call records where available and tied to active work. | Log material outcomes in Communications or task comments. |
| DocSend / HubSpot / other source systems | Inspect only when available and relevant to active work or inbound status. | Update source records only from verified source data. |

## Classification And Safe Direct Writes

Classify each inbound item against the active index:

- `no-op`: no Notion, Drive, Slack, supplier/client, or source action required; mark the channel completion marker after verification.
- `task update`: comment/update the matched active task with new context, source link, and next step.
- `new task`: create one task in the relevant client project when no matching task exists and RB action is required.
- `Correspondence`: create/update only for real non-invoice correspondence or source documents/messages that should be filed.
- `Expense/Invoicing`: create/update payables, receipts, contractor invoices, or AR records under the finance rules below.
- `blocker`: create/update a blocked task when entity, supplier, contract, evidence, or destination is ambiguous.
- `approval-required`: add the exact proposed action to the batch execution packet.

Safe direct writes are allowed after verification: Notion task comments/creation, Correspondence, Expense/Invoicing updates, Communications logs, labels, and checkpoints. Do not make irreversible or sensitive changes as a safe write.

## Client Requests Without Correspondence

If an inbound client request has no document or correspondence artifact to file:

- Do not force a Correspondence row.
- Search the relevant client project first.
- If a matching task exists, add a task comment with the source channel, source link/message ID, new context, and proposed/actual next action.
- If no matching task exists, create one task in the client project with source context, owner, status, priority, and due date when known.
- Assign using explicit instructions, the project owner/inherited owner, established process rule, or `internal/people-roles.md`; if ownership is unclear, create a blocked task rather than an unowned task.
- If the new task came from Slack, reply in the source Slack thread after the task is verified. Keep the reply factual: task created, assignee, and task URL. If the reply would include substantive advice, a client answer, a promise, or sensitive context, put that reply in the batch approval packet instead.

## Finance And Document Rules

- Do not create per-invoice or per-expense payment tasks; recurring invoice/expense processing covers those.
- Before creating finance records, de-duplicate by source message ID, invoice/receipt number, supplier + amount + date, and unique references.
- Expense records must have verified `Receipt / Invoice` evidence or an explicit blocker/human-uploaded-file note before the source item is complete.
- Contractor invoices under active contracts belong in Invoicing linked to the Contract and Company, not Expenses.
- Routine invoices, receipts, payment reminders, upcoming direct-debit notices, and payment receipts are not Correspondence by default unless they include separate non-invoice operational requests.
- Correspondence attachments belong in the verified client Drive folder under `Correspondence/Incoming` or `Correspondence/Outgoing`, then linked back to Notion/task context.

## Targeted Edge Cases

Company-specific edge cases live in `clients/Companies/<Reference>/edge-cases.md`, each under its own `##` heading.

- Do not scan every company folder for possible edge cases during normal triage.
- Load an edge-case entry only when channel metadata, content, attachment filename, parsed text, or a verified Notion match satisfies its trigger.
- The process owns the trigger and lookup path; the client file owns the business rule and handling.

Current hook:

| Hook | Trigger | Rule entry | Apply before |
| --- | --- | --- | --- |
| RBL Workhub invoice validation | Invoice, renewal notice, payment notice, or invoice correction request where sender, subject, body snippet, attachment filename, parsed invoice text, or matched Notion record indicates Workhub, Stein Commercial, or Camden Street | `clients/Companies/RBL/edge-cases.md`, starting at `## Workhub Invoice Validation` | Creating/updating Expense or Invoicing records, marking channel completion, or reporting the item |

## Batch Approval Packet

Collect approval-required actions into one packet at the end of investigation and safe direct writes.

Approval-required actions include:

- outbound emails, Slack/WhatsApp messages, or other external replies;
- final Slack/channel overview posts unless the current run prompt explicitly pre-authorizes direct posting to that channel;
- substantive Slack task-thread replies beyond a minimal factual task-created acknowledgement;
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

- channels checked and checkpoints/labels advanced;
- active work matched;
- tasks commented, created, updated, or blocked;
- Correspondence, Expense, Invoicing, Communications, source records, and files created/updated;
- batch approval packet item IDs and approval status;
- outbound actions executed after approval;
- no-op counts;
- skipped same-day nudges;
- remaining blockers with next owner/action/date.

If no actionable items and no Notion/Drive/source records changed, do not post Slack; return a concise no-op summary only. If a Slack/channel overview is needed and not explicitly pre-authorized by the run prompt, include it in the batch approval packet.
