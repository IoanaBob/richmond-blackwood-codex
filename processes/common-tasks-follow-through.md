---
title: Common Tasks Follow-Through
status: provisional
source: user-approved redesign from 2026-05-19
imported: 2026-05-19
review: Validate on the corrective run from 2026-05-18 and update the task registry when live Notion schemas are approved.
---

# Common Tasks Follow-Through

## Purpose

Use communications to advance work across all Richmond Blackwood task-capable databases. A run is complete only when source communications, operational database rows, task status, owner follow-ups, replies, source markers, and Slack closeout state are handled through packet-approved stages.

This process supersedes the older inbound operating triage process.

## Canonical Databases

- RB Client Databases page: `https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`.
- Canonical Communications database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`, data source `collection://1b5e4130-1314-8183-afd8-000b6f4da982`.
- Old RB Communications database `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c` is migration source only. Do not create new records there.
- Central Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`; use it for additional action work, not as a replacement for the owning operational row.
- Existing recurring workflow tasks, such as weekly invoice generation, weekly invoice payables/expenses, payroll, bookkeeping, and tax filing cadence tasks, should receive related Communications/evidence instead of duplicate one-off Central Tasks.
- Team Updates are excluded from this process and must run through their own workflow/automation.
- SteuerGo communications belong to Richmond Blackwood/RBL, not the underlying client company. Treat SteuerGo receipt confirmations as `Short Living`; the uploaded receipt/evidence file is the durable `Long Living` record.
- Old RB Communications is a migration source. Any historical merge into canonical Communications must be proposed as a packet-approved migration action before live writes.

Every data source under RB Client Databases is task-capable for inventory and closeout analysis. Triage routing is narrower: assign each inbound first to one of Communications, Invoicing, Expenses, or Central Tasks. Then search dependent tables and create/update them only when the communication directly affects that entity.

Ignore the `Empty Databases` placeholder area.

Ancillary/dependent tables:

- Business Partners: ancillary to Contracts; fill only when contract/invoice information identifies the other party.
- Client Notes & Updates: ignore during triage unless an approved client-update action explicitly depends on it.

Automation-backed tables:

- Invoicing, Filing Registrations, Filings, and Payroll may receive records from automations. Use them as byproducts of communications that affect those tables, not as default manual destinations.
- Tax Prepayments and Tax Payments need automation. If communication affects one, create a primary task and propose the correct payment/prepayment update as a byproduct.

Discussion/client-driven tables:

- Employment, Contracts, Investment Accounts, Bank Accounts, and Assets are usually created from client discussions. Create drafts/updates when chats or emails support them, but always link a primary task.
- If a client requests an invoice and no contract can be found, propose creating the contract and link the primary task.

## Packet Requirement

Every stage must:

1. write a Markdown packet to the run folder;
2. print that exact packet in chat;
3. stop for approval or modifications unless the stage is explicitly auto-approved;
4. execute only the approved or standing-auto-approved next action.

Every packet involving Gmail must keep these fields separate:

- `Operator`: human `RB_CODEX_ACTOR` when operator-specific context matters, or `not required`.
- `Source mailbox(es)`: exact Gmail mailbox(es) searched/read.
- `From`: exact sender for drafts, sends, or replies.
- `Thread/source`: Gmail thread/message ID, link, or source summary.

Do not treat shared mailboxes as actors. `accounting@richmondblackwood.com` is the shared accounting/client-facing source or sender identity. Personal/operator mailboxes may be read only when explicitly in scope and must be labelled.

No Notion write, source marker, file upload, reply, Slack send, or checkpoint update may happen without operator approval of the exact packet or a standing auto-approval exception for that stage/action.

Standing auto-approval exceptions:

- Stages 1 and 2 are auto-approved after their packets are written and printed.
- Stages 10 and 11 are auto-approved for Gmail labels and WhatsApp checkpoints that are within the approved workflow.
- Once the operator approves the exact Stage 12 Slack closeout text for sending, Stages 13 and 14 are auto-approved for send and closeout only: send the exact Slack message, write the results packet, write the final closeout packet, and release the lock. Recording is not auto-approved.
- Stage 15 is auto-approved only for bounded post-closeout media/evidence cleanup of blockers already listed in Stage 14. It may recover/read already-identified media, upload to already-resolved Drive destinations, attach evidence, and update owning Communications to `Logged` when the recovered source confirms the route. It must stop for approval before any reply/send, source marker/checkpoint, new task, new operational record, new destination, disputed route, or business-judgment decision.

Stop despite auto-approval if a packet introduces an unexpected mutation, a new destination, a broad Slack mention, an unresolved data-source mismatch that makes routing unsafe, or a source/checkpoint action outside this process.

## Stage Flow

1. Run Preflight, including `git pull origin main` from the active repo/worktree before the run folder/lock is created.
2. Open Task Inventory.
3. Communication Discovery And Read.
4. Communication Ledger Plan.
5. Finance / Operational Routing Plan.
6. Ledger And Record Commit Results.
7. Task Closeout Analysis.
8. Task Update, Owner Follow-Up, And Reply Plan.
9. Task Update And Reply Results.
10. Source Marker Plan.
11. Source Marker Results.
12. Slack Closeout Plan.
13. Slack Send And Log Results.
14. Run Closeout.
15. Post-Closeout Media Evidence Cleanup.

The definitive stage contract lives in `skills/rb-common-tasks-follow-through/SKILL.md` and `skills/rb-common-tasks-follow-through/references/stage-packet-protocol.md`.

## Communication Rules

- Do not automatically log sent outbound messages. Ask the user whether to record each sent message, and only record qualifying third-party outbound messages when the user explicitly says yes and recording is necessary as a durable audit/source record.
- Do not log internal pings, workflow closeouts, quick questions, reminders, nudges, or coordination notes to Notion.
- Spam/no-action inbound communications are logged only when the approved run scope explicitly treats them as source records.
- Set `Relevance` when the Communication is created or updated:
  - `Ignore`: spam, no-scope, churned-client no-action, or system/error notices retained only for audit.
  - `Short Living`: transactional chats, referrals, status updates, follow-ups, ELSTER activation expiry reminders, automated broker/bank notifications that cannot be acted on directly, or short-lived coordination.
  - `Long Living`: durable documentation or evidence about a company or individual, including letters, filings, contracts, invoices, receipts, tax/insurance evidence, usable bank/broker exports, and authority correspondence.
- A receipt confirmation without the underlying durable receipt/evidence file is `Short Living`; the receipt, invoice, export, or source document itself is `Long Living` once uploaded/linked.
- ELSTER activation expiry reminders are `Short Living`; the durable work item is the linked activation task, and the reminder loses value once activation is complete.
- Mark a Communication `Logged` when communication logging is complete, even if a linked task remains open. For attachment/document communications, logging is complete only when the original attachment is in `Document(s)`, any non-English attachment has a Markdown translation in `Translated Doc(s)`, and `Notes` has a useful description/summary. Keep the Communication `In Progress` only while evidence, translation, description, or routing is incomplete.
- Assign `Company` only for relevant incoming/outgoing client letters or client-operational communications.
- Leave `Company` empty for internal, system, spam, or non-client-relevant communications.
- Choose one primary client subject on each Communication: `Company` or `Individual`, not both. Use `Company` for company-operational evidence and `Individual` for personal tax, insurance, or individual-specific evidence. Leave both empty for internal/system/no-scope items.
- `Assigned To` is an internal owner field, not a client subject field. Prefer putting action ownership on the linked task or operational row; set `Assigned To` on the Communication only when the Communication row itself is the active owned work item.
- If an email contains a letter, mark it as a letter, save/link the document, and record the actual letter source/originator separately from the forwarder.
- For each communication, decide reply status: reply now, snooze reply, no reply needed, or blocked.
- For each Gmail communication, retain source mailbox and thread/source in packets and logging context so a read from one mailbox can still lead to an approved reply from another sender, such as `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- German `W-IdNr` values are not saved by RB. Treat standalone `W-IdNr` receipt/storage requests as verified no-op unless another operational action is present; do not copy the number into repo memory, Notion, Slack, or packets beyond a redacted note that a `W-IdNr` was received.

## WhatsApp Coverage

Stage 3 must use `skills/rb-common-tasks-follow-through/references/whatsapp-source-roster.md` as the minimum WhatsApp route checklist and `skills/rb-common-tasks-follow-through/references/whatsapp-checkpoint-registry.md` as the persistent checkpoint table. The Stage 3 packet must include every route in that roster, including unresolved routes, with discovery/read status and checkpoint eligibility.

Routes added after the 2026-05-19 corrective run because they were missed:

- `Monochromatic | Richmond Blackwood`;
- `Chamberlain, Aaron | Richmond Blackwood`;
- `PCL (Ricardo)`;
- `CLV (Celine)`;
- `AKS (Ana)`.

These routes were resolved during the `2026-05-21-1006-daily-0800-window` corrective run and are now stored in the checkpoint registry. Do not advance a checkpoint for an unresolved route or for a route that was not included in Stage 3 discovery.

## Finance And Operational Routing

- First classify each inbound into Communications, Invoicing, Expenses, or Central Tasks.
- Contract-backed payables/receivables belong on the matching Invoicing row when a matching invoice/contract route exists.
- Non-contract receipts/finance items belong on Expenses.
- Operational work that is not an invoice or expense belongs on Communications plus a Central Task when action is needed.
- Dependent tables are filled opportunistically after the primary route is chosen, when the inbound affects that specific entity.
- Create central Tasks for action work, especially when a dependent table receives a draft/update.
- Do not create central Tasks or human owner follow-ups for source extraction or evidence upload that Codex can complete from approved Gmail/WhatsApp reads during the run.
- Evidence attachments found in approved Gmail/WhatsApp source reads are Codex-run work: upload/preserve through `rb-file-uploads`, attach to the Communication or owning operational row, link to the relevant tasks, and only keep a human blocker when the destination/folder, permissions, or business judgment is unresolved.
- Forms and questionnaires found in approved source reads are Codex-run research work before human follow-up. Use `rb-form-fill-assist` to read the form, draft field-level answers with evidence, list unknowns, and route only the remaining judgment/missing-fact items to the owner.
- For RB-paid receipts, upload/link the receipt to the appropriate evidence/expense record instead of creating a central task unless a human decision is needed.
- For weekly invoice-generation or invoice-follow-up items, link the communication/evidence to the weekly invoice workflow rather than creating one-off follow-up tasks.
- Resolve and attach the client project from the responsible Company record's project relation/attribute. Use RB Backlog only for RB-internal work; if the responsible Company has no readable linked client project, create a blocker packet row instead of choosing an arbitrary project.

## Owner Routing Edge Cases

- Legal contract/counterparty/VAT-route decisions belong to Johnpaul Okolie unless the operator explicitly assigns a different legal owner.
- TK/private-health-insurance/social-insurance transition work belongs to Johnpaul Okolie when Simoneta is not onboarded on that task. Merge duplicate TK backlog tasks into one active task before owner follow-up.

## Closeout

Slack closeout is prepared only after task closeout analysis and approved task/reply updates. The closeout should list communications handled, invoices/expenses/contracts updated, tasks closed, tasks advanced, owner action lists, replies sent/snoozed, and blockers.

Slack closeout text must be a rendered, readable preview with named links and `None` for empty human-facing sections. Keep exact timestamps in packets; use human window wording in Slack. Do not call an unsent preview "corrected". Request explicit send approval for the exact Slack text before sending.

Manual-post fallbacks must still be final-quality Slack payloads. Use Slack-native named links (`<url|label>`) and resolved Slack user mentions (`<@USERID>`) in the copy supplied to the operator. Do not provide bare URLs or bare responsible-person names as a workaround for connector failure.

Slack closeout quality rules:

- Ioana-authored or Ioana-approved Slack templates are the source of truth and override improvised formatting. For client follow-through, use the latest available Ioana-approved `#rb-client-updates` client follow-through template from Notion/canonical Communications unless the operator provides a newer exact template.
- The current known client follow-through template shape is a short first-person completion line followed by `New Correspondence`, `Received invoices`, and `Updated tasks`. Do not substitute ad hoc sections such as `Completed/recorded`, `Owner updates`, or `Skipped per operator instruction`.
- If the template cannot be located, cannot fit the run, or required links/mentions cannot be resolved, stop and ask for the exact template or explicit approval of a degraded version before posting.
- Write like the operator or a human team member, not like an automation report.
- Do not include background Gmail label, source-marker, checkpoint, packet, or Codex-process mechanics in the Slack body.
- Hyperlink every Communication, task, invoice, expense, filing, contract, blocker, or operational row reference with a named link; manual Slack payloads must use Slack-native `<url|label>` links.
- Address every responsible-person action/update line to actual people with resolved Slack IDs, not bare names. If a Slack ID cannot be resolved through Slack MCP or a repo-approved mapping, Stage 12 is blocked unless the operator explicitly approves a named, no-notification fallback for that exact person and message.
- Include a Stage 12 mention/link checklist before send approval: Ioana template used, all row references named-linked, every responsible person tagged, mention-resolution table included, no bare responsible-person names, and no source-marker/checkpoint mechanics in the Slack body.
- Do not address generic owners such as `Codex/run` or `workflow owner`; either assign to a resolved person or keep the item in packet memory.
- Do not list no-reply/no-action items under replies. Only list replies that are actually coming up or were sent.
