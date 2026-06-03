---
name: rb-common-tasks-follow-through
description: Task-first Richmond Blackwood operating workflow that uses Gmail/WhatsApp communications to advance every task-capable RB Client Databases data source through packet-reviewed stages.
---

# RB Common Tasks Follow-Through

Use this skill for daily or ad hoc Richmond Blackwood operating follow-through. It supersedes the older inbound-triage phase-skill flow.

The goal is not just to clear a mailbox. The goal is to use communications to move open work across RB Client Databases from open states toward done states.

## Required Context

1. Read `processes/common-tasks-follow-through.md`.
2. Read `references/stage-packet-protocol.md`.
3. Read `references/rb-client-database-task-registry.md`.
4. Read `references/whatsapp-source-roster.md` before Stage 3 Gmail/WhatsApp discovery.
5. Read `references/whatsapp-checkpoint-registry.md` before Stage 3 Gmail/WhatsApp discovery and Stage 10/11 WhatsApp checkpoint planning.
6. Load supporting skills only when needed:
   - Gmail/email replies: `skills/rb-gmail-drafts/SKILL.md`.
   - WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
   - File upload/export/attachment: `skills/rb-file-uploads/SKILL.md`.
   - Form/questionnaire completion support: `skills/rb-form-fill-assist/SKILL.md`.
   - Outbound approval/send/logging: `skills/rb-communications/SKILL.md`.
   - Owner routing: `internal/people-roles.md`.

## Core Rules

- Every stage writes a Markdown packet, prints the same packet in chat, and stops for approval or modifications.
- Every packet that includes Gmail work must list `Operator`, `Source mailbox(es)`, `From`, and `Thread/source` separately. `Operator` is the human `RB_CODEX_ACTOR` when operator-specific context matters; `accounting@richmondblackwood.com` and personal/operator mailboxes are source or sender identities, not actors.
- Auto-approval exceptions: Stages 1, 2, 10, and 11 still write and print packets, but continue without waiting for operator approval unless the packet contains an unexpected blocker or proposed action outside this skill. After the operator approves the exact Stage 12 Slack closeout text for sending, Stages 13 and 14 are auto-approved and should run immediately. Stage 15 is also auto-approved only for bounded media/evidence cleanup of blockers already listed in Stage 14, using already-read sources or already-resolved destinations, and must stop if it would introduce a new destination, new task, reply/send, source marker, checkpoint, or unresolved routing decision.
- For all other stages, do not continue to the next stage until the operator approves the exact printed packet.
- Do not mutate Notion, Gmail, WhatsApp, Drive, Slack, or email until the packet for that exact action is approved by the operator or covered by the standing auto-approval exception for that stage.
- Use canonical Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807` / `collection://1b5e4130-1314-8183-afd8-000b6f4da982`.
- Do not write new RB communication logs to the old `RB Communications` database `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.
- Default to the Notion MCP connector for schema fetches, known page/data-source readbacks, ordinary connector-supported updates, and search-based candidate discovery.
- Do not use MCP search as proof of a complete Stage 2 inventory. For authoritative all-row inventory, page data sources through the Notion REST API with an approved non-browser Notion API credential stored outside git.
- For REST inventory, first run the plain request and save page 1. If page 1 has `has_more: false`, the query is complete. If `has_more: true`, continue with the exact same query URL, query parameters, filters, sorts, and `page_size`; add only `start_cursor` from the previous response until `has_more` is false.
- Keep Notion pagination loops run-local under `/private/tmp` unless repeated production use proves a repo helper is needed. Do not add or retain repo-local Notion helper code just for a one-off query.
- Use the Notion REST API for Notion-hosted file/image downloads and Notion-native file/image uploads. Do not treat MCP `file://...attachment...` references as downloadable URLs.
- The tested Notion REST credential is `NOTION_ACCESS_TOKEN` in an ignored local env file. Do not put Notion API credentials in tracked files or packet output.
- Treat the Stage 2 and Stage 3 CSV snapshots as the run-local source of truth for planning. After those snapshots exist, do not repeatedly query Notion, Gmail, WhatsApp, Slack, or Drive just to re-answer planning questions already represented in the CSVs. Use live services later only for approved writes, targeted readbacks of changed rows, file upload/download operations approved by packet, source markers/checkpoints, or an explicit snapshot-refresh addendum when the CSV is missing data needed for safe routing.
- Before proposing live creates/updates, first write the proposed change into the relevant draft CSV in the run folder, then generate the packet from that updated CSV. After approval, apply the live write from the approved draft CSV and update the CSV row with live URL, write status, and readback.
- Do not create Communication rows for ignored, no-scope, spam, marketing, system-only, or no-action messages. List them as skipped in packets when useful for audit, but do not log them in canonical Communications.
- `Ignore` is a legacy/readback value only. New Communication rows should be `Short Living` or `Long Living`; if a proposed row would be `Ignore`, skip it instead.
- Do not process or log Wamo payment, cashback, account-notification, or marketing emails in this workflow unless the operator explicitly identifies a separate source document or business action outside the Wamo email itself.
- Do not process or log WeWork newsletters or other marketing/newsletter emails.
- Do not process or log automated broker/investment portal availability notices, including IBKR daily/monthly activity statement or trade-confirmation availability emails, when the actual statement/document is not retrieved and the email contains no separate action request. Treat these as marketing/no-scope for this workflow: no Communication row, task, label/source marker, Slack line, or portal retrieval task unless the operator explicitly approves retrieving the statement or identifies a separate business action.
- At Communication creation/update time, set `Relevance` to `Short Living` or `Long Living`, and choose one primary client subject: `Company` or `Individual`, not both.
- Do not use `Assigned To` as a substitute for the communication subject. Use `Assigned To` only for the internal owner of the Communication row itself; action ownership normally belongs on the linked task or operational row.
- Treat every live data source under `RB Client Databases` as task-capable for inventory and closeout analysis, even if its field names differ.
- For triage routing, assign each inbound first to one of `Communications`, `Invoicing`, `Expenses`, or `Central Tasks`; then update dependent/automation-backed tables only when the communication directly affects them.
- Central Tasks is for action work, especially when a dependent table gets a draft/update. It is not a substitute for keeping Communications, Expenses, or Invoicing current.
- Do not create separate one-off Central Tasks for items that belong inside an existing recurring workflow, such as weekly invoice generation, weekly invoice payables/expenses, payroll, bookkeeping, or tax filing cadence tasks. Link the Communication/evidence to the recurring task or operational row instead.
- Do not create Central Tasks for payment notifications, payment receipts, invoice receipts, cashback notices, card/account notifications, or other finance-source messages merely to decide ownership/routing. If no active contract or Invoicing row matches a finance-source item, route it to Expenses when business-scoped and source evidence is sufficient; if business scope is not supported by the source, skip/no-scope it. Use `Review Required` or the equivalent Expense status for finance review instead of creating a separate routing task.
- Do not create human tasks for source extraction or evidence upload that Codex can perform from approved Gmail/WhatsApp reads during the run. Human tasks are only for inaccessible portals, missing permissions, unresolved destination/folder decisions, human judgment calls, or actions outside Codex's source access.
- When approved Gmail/WhatsApp source messages include evidence attachments, route them through `rb-file-uploads` during the commit/update stage: upload/preserve the files, attach them to the Communication or owning operational row, link them to relevant tasks, then mark the Communication `Logged` once evidence, translation, and Notes are complete.
- When an inbound includes a form/questionnaire, run `rb-form-fill-assist` before assigning human follow-up. Codex must read the form, draft field-level answers from existing RB context, list unknowns, and route only unresolved judgment calls or missing facts to the human owner.
- Assign SteuerGo communications to Richmond Blackwood/RBL, not the underlying client company. A SteuerGo receipt confirmation is `Short Living`; the durable `Long Living` record is the uploaded receipt/evidence itself.
- ELSTER activation expiry reminders are `Short Living`, not durable authority correspondence. Once the ELSTER account/certificate is activated, the reminder has no continuing value; the linked activation task carries the active work.
- Assign legal contract/counterparty/VAT-route decisions to Johnpaul Okolie, including cases where a client discussion may require a direct contract or legal route decision before a Contract row changes.
- For TK/private-health-insurance/social-insurance transition edge cases where Simoneta is not onboarded, assign the active task to Johnpaul Okolie and merge duplicate backlog tasks into one active task.
- Slack closeout happens after task closeout analysis and updates, not immediately after communication logging.
- Do not include Team Updates in this workflow. Team Updates, daily standup updates, standup transcripts, and Team Updates-derived assignment audits use a separate workflow/automation. In this skill, the initial task inventory plus the communication snapshots are the context; do not query Team Updates or meeting transcripts to enrich this run. If the operator wants Team Updates handled, stop this workflow boundary and use the separate Team Updates skill.
- Do not save German `W-IdNr` values. If a communication only provides a `W-IdNr` or asks RB to store it, treat that as a verified no-op unless there is a separate operational action; if action is needed, create the action without storing the number.
- Do not use raw timestamp ranges as user-facing Slack copy. Use a human window label such as "yesterday's client follow-through" or "the May 18 corrective rerun" and keep exact timestamps inside packets.
- Never describe an unsent Slack preview as "corrected"; use "corrected" only when replacing or superseding a Slack message that was actually sent.
- Ioana-authored or Ioana-approved Slack templates are the final source of truth. Do not improvise section labels, message shape, or level of detail when such a template exists.
- For client follow-through Slack closeouts, use the latest available Ioana-approved `#rb-client-updates` client follow-through template from Notion/canonical Communications unless the operator provides a newer exact template. Current known template shape uses a short first-person completion line followed by `New Correspondence`, `Received invoices`, and `Updated tasks`. Do not replace this with ad hoc sections such as `Completed/recorded`, `Owner updates`, or `Skipped per operator instruction`.
- If the Ioana template cannot be located, cannot fit the run, or required template fields/links/mentions cannot be resolved, stop with a blocker packet and ask for the exact template or explicit approval of a degraded version. Do not post manually or through Slack MCP until the template issue is resolved.
- Stage 12 Slack copy must read like a human operator update, not an automation trace. Do not include background source-marker mechanics, Codex/internal process actions, checkpoint details, or no-reply/no-action rows that do not matter to humans. Include only actionable or useful business context, with named Notion links.
- When addressing people in Slack, resolve Slack user IDs and use `<@USERID>` mentions so assignees are notified. Bare names are not acceptable for responsible-person routing in the final Stage 12 Slack payload. If a required Slack ID cannot be resolved through Slack MCP or a repo-approved mapping, Stage 12 is blocked unless the operator explicitly approves a named, no-notification fallback for that exact person and message.
- Stage 12 manual-post fallbacks must provide Slack-ready raw text with Slack-native links (`<url|label>`) and resolved Slack mentions (`<@USERID>`), plus a rendered preview when useful. Do not give the operator a degraded manual message with bare URLs or bare responsible-person names.

## Run-Local CSV Source Tables

Every run must keep structured CSV tables in the run folder. The Markdown packets are the approval surface, but the CSVs are the working ledger used to avoid repeated third-party reads.

Minimum files:

- `csv-manifest.csv`: every CSV artifact, stage created/updated, row count, source query/window, status, and notes.
- `tasks-open.csv`: every open or non-terminal row from RB Client Databases and Central Tasks captured in Stage 2, excluding Team Updates. Include database, row URL, status, owner, company/individual, project, due date, source links, next action, closeout condition, and enough raw field/context columns to support later routing without requerying.
- `source-messages.csv`: every in-window Gmail, WhatsApp, and explicitly in-scope Slack source message captured in Stage 3. Include source channel, source mailbox/channel/chat, source IDs, thread IDs, timestamp, sender, recipients, subject/title, attachment names, body/read summary, likely company/individual/project, classification, skipped flag, proposed Communication title, proposed relevance, and source-marker eligibility.
- `source-attachments.csv`: every attachment/file found in approved source reads, with source message ID, filename, MIME/type, local path or external URL, text/OCR status, proposed destination, upload status, and live file URL after commit.
- `draft-communications.csv`: proposed Communication creates/updates before Stage 4 packets and live Stage 6 writes.
- `draft-operational-rows.csv`: proposed Invoicing, Expense, Filing, Filing Registration, Payroll, Tax Payment/Prepayment, Contract, Asset, Bank Account, Investment Account, Employment, or other operational-row creates/updates before Stage 5 packets and live Stage 6 writes.
- `draft-tasks.csv`: proposed Central Task or task-capable row creates/updates, comments, owners, due dates, statuses, relations, and closeout changes before Stage 8 packets and live Stage 9 writes.
- `draft-replies.csv`: reply, snooze, no-reply, sender, destination, and exact reply text decisions before Stage 8/9.
- `draft-source-markers.csv`: Gmail label and WhatsApp checkpoint proposals before Stage 10/11.
- `live-write-results.csv`: every approved live write, send, upload, label, checkpoint, readback, failed write, and skipped duplicate after execution.
- `blockers.csv`: unresolved permissions, schema gaps, missing source data, unsafe routing decisions, and why they block or do not block the next stage.

CSV usage rules:

- Stage packets must cite the CSV files and row counts they were generated from.
- If a later stage needs data that is not in the CSV, do not silently requery the third party. Write a snapshot-refresh addendum explaining the missing field/source, fetch only that bounded data after approval or auto-approval when applicable, update the CSV, then regenerate the packet from the CSV.
- Use targeted live readbacks after writes to verify changed rows and update the CSV. Do not repeat broad Notion/Gmail/WhatsApp/Slack discovery after the snapshot unless the packet explicitly opens a corrective rerun or snapshot-refresh scope.
- Preserve raw sensitive source values only in local scratch artifacts when necessary for the run. CSVs and packets must stay source-safe: do not copy exact tax, registration, payment-profile, or account identifiers unless the operator explicitly approves that exact storage.
- Skipped Wamo, WeWork, marketing, setup, security, spam, no-scope, and other ignored messages may appear in `source-messages.csv` with `skipped=true` for audit, but they must not be copied into draft rows, logged, labeled, source-marked, or included in Slack.

## Company And Project Resolution

Resolve company from the strongest available evidence, in this order:

1. Document addressee or invoice billed party.
2. Existing linked Communication, source thread, or operational row.
3. Mailbox alias or recipient pattern.
4. Existing task/project relation.
5. Sender/contact mapping.
6. Repo client files.

For invoice, receipt, and expense submissions, the document addressee or billed party is not just a hint. Read it from the source document and use that issued-to company in the Expense/Invoicing form. Do not override it with a related client, project, mailbox alias, Drive folder, repo context, or commercial assumption. If the document appears issued to the wrong company for the requested submission, stop before upload or live record creation, record the blocker, and wait for a corrected invoice/receipt.

Never assign a company just to fill a field. If the communication is internal, system-only, spam, or not client-relevant, leave `Company` empty so it does not appear in company correspondence views.

For Communications, choose the more relevant primary subject relation:

- Use `Company` when the communication documents company operations, authority notices, invoices, contracts, payroll, filing, VAT, bank/account, asset, or client-company evidence.
- Use `Individual` when the communication documents personal tax, insurance, individual evidence, or an individual-specific authority/client matter.
- Leave both empty for internal/system/no-scope items.
- Do not set both `Company` and `Individual` on the same Communication unless the operator explicitly approves an exception in the packet.

Set `Relevance` at the same time:

- `Short Living`: transactional chats, referral/status/follow-up messages, ELSTER activation expiry reminders, or short-lived coordination that should not become durable company/individual documentation after closeout.
- `Long Living`: durable documentation or evidence about a company or individual, including letters, filings, contracts, invoices, receipts, tax/insurance evidence, usable bank/broker exports, and authority correspondence.

Classify `Relevance` by what the Communication row itself represents, not merely by whether the topic sounds durable. A tax, legal, finance, filing, contract, or authority topic can still be `Short Living` when the Communication is only a coordination/status/reply wrapper and the durable state lives on a task, filing row, invoice/expense row, or later evidence-bearing record. Use `Long Living` only when the Communication is or is expected to become the durable evidence container, especially when original files, letters, contracts, notices, receipts, filings, or other source documents are attached or will be attached.

Receipt confirmations without the durable receipt/evidence file are `Short Living`. The receipt, invoice, export, or source document itself is `Long Living` once uploaded/linked.

Set a Communication to `Logged` when its logging work is complete, even if a linked task remains open. For attachment/document communications, logging is complete only when the original attachment is saved in `Document(s)`, any non-English attachment has a Markdown translation uploaded in `Translated Doc(s)`, and `Notes` contains a usable description/summary. Keep the Communication `In Progress` only while one of those logging requirements or the routing decision is incomplete.

For a client task/action, fetch the responsible Company record and assign the client project from that Company's project relation/attribute. Use `Richmond Blackwood Backlog` only for truly RB-internal work. If the responsible Company has no readable linked client project, create a blocker packet row instead of choosing an arbitrary project.

Assign owners from explicit instruction, existing row owner, owner of the project linked on the responsible Company record, established process rule, then `internal/people-roles.md`. Do not leave actionable work unowned.

## Stage Flow

### 1. Run Preflight

Before creating the run folder, pull latest `main` in the active repo/worktree:

- run `git pull origin main` from the repo root;
- read only `RB_CODEX_ACTOR` from ignored local env when operator identity is needed, without printing any env file;
- include the branch, pull result, and any conflict/blocker in the packet;
- include the human operator value or state that no operator-specific identity was required;
- stop immediately if the pull fails or introduces conflicts.

Create the run folder and lock.

Initialize `csv-manifest.csv` and empty draft CSVs listed in `Run-Local CSV Source Tables`.

Packet must include run ID, run window, operator, source systems, canonical Communications DB, RB Client Databases page, task registry version, `csv-manifest.csv` path, git branch/pull result, and prior incomplete run state.

### 2. Open Task Inventory

Fetch every open or non-terminal row from every RB Client Databases data source plus central Tasks.

Write `tasks-open.csv` before writing the Stage 2 packet. The packet must be generated from `tasks-open.csv`, list the row count per data source, and cite any inventory degradation or schema gaps.

Packet columns: database, row URL, status, owner, company/individual, client project, due date, source links, next action, closeout condition.

Treat dependent and automation-backed tables as context for later closeout analysis. Ignore the `Empty Databases` placeholder area.

Do not fetch Team Updates, daily standup pages, standup transcripts, or Team Updates-derived assignment context in this stage. If a task already exists in the task database because another skill created it from Team Updates, it appears through the ordinary task inventory and that is sufficient context.

### 3. Communication Discovery And Read

Fetch Gmail/WhatsApp communication metadata and read the needed body/files in the same stage. If Slack messages are explicitly in scope for the run, fetch only the approved Slack channels/threads/messages for the run window in this stage as well; Slack is not a default broad discovery source for this skill.

Write `source-messages.csv` and `source-attachments.csv` before writing the Stage 3 packet. Later stages must use these CSVs for communication planning instead of repeating Gmail/WhatsApp/Slack reads.

For Gmail, list every source mailbox searched or read. Do not assume all reads come from `accounting@richmondblackwood.com`; personal/operator mailbox reads are allowed only when explicitly in scope and must be labelled. Do not infer the eventual reply sender from the source mailbox or active operator.

For WhatsApp, use `references/whatsapp-source-roster.md` as the minimum route checklist. Include every roster route in the packet, including unresolved routes. Resolve missing chat IDs with WhatsApp search where possible. If a route is unresolved or was missed in a prior run, list it as a blocker and do not advance its checkpoint until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location.

For corrective reruns, include items from the operator-approved correction start even if Gmail already has `Triaged`; keep old labels but record the correction note. For the current bad-triage correction, the start is `2026-05-18 00:00 Europe/Dublin`.

Packet columns: operator, source mailbox or channel, source IDs, timestamp, sender, recipients, subject/title, attachment names, full-read summary, likely company or individual subject, likely project, topic/thread, contains-letter flag, letter source, classification, proposed Communication row, proposed relevance, skipped flag, and source-marker eligibility.

If an email includes a letter, identify the letter source as the actual originator/sender of the letter, not merely the forwarder.

### 4. Communication Ledger Plan

Propose create/update of Communications rows only for actionable or durable communications.

Update `draft-communications.csv` first. Generate the Stage 4 packet from the updated CSV and `source-messages.csv`; do not requery Gmail/WhatsApp/Slack/Notion for planning data unless a snapshot-refresh addendum is needed.

Do not log spam, no-action, ignored, system-only, marketing, newsletter, Wamo payment/cashback/account-notification, Wamo marketing, WeWork newsletter, or automated broker/investment portal availability messages such as IBKR statement-available notices. Include a skipped-source list in the packet when useful, but these items must not create or update Communications rows.

Every proposed Communication row must include:

- `Relevance`: `Short Living` or `Long Living`.
- Primary subject relation: either `Company`, `Individual`, or neither. Never both without explicit operator approval.
- Subject rationale: why the row is company-owned, individual-owned, or unowned.
- Internal owner rule: if `Assigned To` is set on the Communication, explain why ownership belongs on the Communication row rather than only on the linked task/operational row.

For letters, set:

- `Contains Letter`: true
- `Letter Source`: actual letter sender/originator
- `Letter Date`: date on the letter when known
- `Document(s)`: original source document
- `Translated Doc(s)`: translation when required

Stop before writing.

### 5. Finance / Operational Routing Plan

First assign each inbound to one primary route:

- `Communications`
- `Invoicing`
- `Expenses`
- `Central Tasks`

Update `draft-operational-rows.csv`, `draft-tasks.csv`, `draft-replies.csv`, and `blockers.csv` first. Generate the Stage 5 packet from those CSVs plus `tasks-open.csv`, `source-messages.csv`, `source-attachments.csv`, and `draft-communications.csv`.

For finance items:

- First read the invoice/receipt addressee or billed party and use that company in the Expense/Invoicing form. If that issued-to company conflicts with the intended client or seems wrong, do not create or update the finance row until a corrected document is supplied or the operator explicitly approves a documented exception.
- If an active payable/receivable contract or matching Invoicing row exists, attach/link the communication and evidence to the invoice task row.
- If no active contract applies, create/update the Expense row. Do not create a Central Task just to decide ownership/routing for a payment notification or receipt.
- If the item is a receipt paid by Richmond Blackwood, upload/link the receipt to the correct evidence/expense record. Do not create a Central Task unless there is an unresolved human decision or inaccessible source.
- If the item belongs to an existing weekly invoice generation/payables workflow, attach/link the Communication and evidence to that workflow instead of creating a one-off task.
- If company is unclear, do not guess a client company. For a business-scoped finance source, create/update the Expense row with the source-safe available evidence and `Review Required`/equivalent status; for a source that does not support business scope, skip/no-scope it. Do not create a standalone Central Task as a holding pen.

For non-finance items, link the communication to an existing open row/task or propose one new action row. If the item is a form or questionnaire, the next action is a form-fill research packet unless the source file is unavailable.

Then search dependent tables and propose byproduct updates only where the communication directly affects them:

- `Business Partners` only as ancillary to contract/invoice information about another party.
- `Client Notes & Updates` only when an approved client update requires it; otherwise ignore for now.
- `Filing Registrations`, `Filings`, and `Payroll` only when the communication affects records normally created by automation.
- `Tax Prepayments` and `Tax Payments` always require a primary task; propose the payment/prepayment row as a byproduct.
- `Employment`, `Contracts`, `Investment Accounts`, `Bank Accounts`, and `Assets` can be drafted/updated from client discussion, but always with a linked primary task.
- If a client requests an invoice and no contract can be found, propose creating the contract and linked primary task.

For every task/action, resolve and include the client project linked on the responsible Company record. If no correct project can be found from that company relation/attribute, create a blocker packet row instead of choosing an arbitrary project.

Stop before writing.

### 6. Ledger And Record Commit Results

Apply approved Communications, source-file, operational DB, and task writes.

Use the approved rows in `draft-communications.csv`, `draft-operational-rows.csv`, `draft-tasks.csv`, and `source-attachments.csv` as the execution input. After each live write/upload, perform only targeted readback for the changed row/file, then update `live-write-results.csv` and the relevant draft CSV row with live URL, status, and readback.

Packet must list every created/updated row, linked company, linked project, owner, uploaded file, readback result, skipped duplicate, and failed write, generated from `live-write-results.csv`.

For Communications, readback must include `Relevance`, primary subject relation, and whether `Assigned To` is empty or intentionally set.

### 7. Task Closeout Analysis

Compare new communications against all open task-capable rows.

Use `tasks-open.csv`, `draft-communications.csv`, `draft-operational-rows.csv`, `source-messages.csv`, and `live-write-results.csv` as the analysis inputs. Do not query Team Updates, daily standups, transcripts, Slack, Gmail, WhatsApp, or broad Notion search for assignment enrichment. If the CSVs are missing a necessary task field, write a bounded snapshot-refresh addendum instead of ad hoc requerying.

Packet must state which rows can move to done, remain open, need human follow-up, need source reconstruction, or are duplicate/stale. Include exact proposed status and evidence.

Stop before status updates.

### 8. Task Update, Owner Follow-Up, And Reply Plan

Packet proposes exact Notion updates, task comments, owner assignments, due dates, status changes, and Slack owner follow-up rows.

Update `draft-tasks.csv` and `draft-replies.csv` first. Generate the Stage 8 packet from those CSVs and the prior snapshot CSVs.

For each communication, include reply handling:

- exact proposed reply when a reply is needed now;
- sender identity, destination, source mailbox, source thread, and factual basis;
- if not time to reply, set `Reply Snoozed Until` and explain the trigger/date;
- if no reply is needed, mark reply status as not required or complete.

Stop before updates or sends.

### 9. Task Update And Reply Results

Apply approved task/database updates. Send only approved exact replies.

Use the approved rows in `draft-tasks.csv` and `draft-replies.csv` as the execution input. After each live write/send, perform only targeted readback of changed rows/messages, then update `live-write-results.csv`, `tasks-open.csv`, `draft-tasks.csv`, and `draft-replies.csv`.

Packet lists updated rows, sent replies, unsent replies, snoozed replies, and remaining blockers.

### 10. Source Marker Plan

Propose Gmail labels and WhatsApp checkpoint changes only after records, tasks, and replies are correct.

Update `draft-source-markers.csv` first. Generate the Stage 10 packet from that CSV and `source-messages.csv`.

For prior bad triage, keep existing Gmail labels and add corrective packet notes.

Auto-approved stage: write and print the packet, then continue directly to Stage 11 unless the plan includes an unexpected source mutation outside Gmail labels or WhatsApp checkpoints.

### 11. Source Marker Results

Apply approved Gmail labels and WhatsApp checkpoints.

Use `draft-source-markers.csv` as the execution input. After each label/checkpoint write, update `live-write-results.csv`, `source-messages.csv`, and `draft-source-markers.csv` with readback state.

Packet lists marked messages, skipped messages, and checkpoint state.

Auto-approved stage: write and print the packet, then continue directly to Stage 12 unless marking failed or a route/checkpoint blocker needs operator review.

### 12. Slack Closeout Plan

Build one `#rb-client-updates` message after task closeout.

Build the Slack closeout from the CSVs and approved write results, not by requerying task, communication, Gmail, WhatsApp, Slack, or Team Updates sources. If a required link or mention is missing from the CSVs, resolve only that bounded missing field and update the relevant CSV before regenerating the packet.

Include communications handled, invoices/expenses/contracts updated, tasks closed, tasks advanced, owner action list, replies sent/snoozed, and blockers.

Before drafting the message, locate and apply the Ioana-approved template for the relevant update type. For client follow-through, the current known template sections are `New Correspondence`, `Received invoices`, and `Updated tasks`; include blockers inline only where the template does. If a newer Ioana template exists, use that newer template exactly.

The message must be a readable rendered preview, not a fenced Markdown block and not a raw internal packet. It must sound like it was written by the operator or another human team member.

Slack preview requirements:

- Use the Ioana-approved section labels and ordering exactly.
- Hyperlink every Communication, task, invoice, expense, filing, contract, blocker, or operational row reference with a named link. For a manual Slack payload, use Slack-native `<url|label>` links.
- Tag every responsible person on an action/update line with a resolved Slack user mention (`<@USERID>`). Bare responsible-person names are a format failure, not a harmless style issue.
- Include a mention-resolution table in the Stage 12 packet for every responsible person, showing the source used to resolve the Slack ID.
- If any required link or responsible-person mention is missing, stop with a blocker packet before asking send approval.
- Use Slack user IDs for addressed people, for example `<@U123>`, after resolving them through Slack search.
- Address only actual people with concrete checks; do not address generic process labels such as "Codex/run" or "weekly workflow owner".
- Do not include background source-marker/checkpoint/Gmail-label mechanics in the Slack body.
- Do not include Codex-only actions unless a human has to do something with the output.
- Do not list replies that are not required. Keep no-reply decisions in packets only.
- Use `None` only for a human-facing section that is expected but genuinely empty.

After printing the exact message, request explicit send approval for that exact Slack message through the Codex approval flow when available; typed chat approval is acceptable only when the operator explicitly approves that exact rendered text.

Stop for explicit send approval.

### 13. Slack Send And Log Results

Send only the approved exact Slack message. Log the sent Slack message into canonical Communications.

Packet lists Slack URL, Communications log URL, failed sends, and skipped sends.

Auto-approved after Stage 12 send approval: once the operator approves the exact Slack message for sending, send it, log it, write and print the packet, and continue directly to Stage 14 unless the send or log fails.

### 14. Run Closeout

Packet summarizes sources checked, all DB rows created/updated, tasks closed/advanced, owner actions, replies, labels/checkpoints, blockers, and next run focus.

Include the final CSV manifest, row counts, and run folder path in the closeout packet.

Release the lock at closeout. Preserve scratch packets by default for audit/recovery; delete them only if the operator explicitly asks for cleanup after final closeout.

Auto-approved after Stage 12 send approval and successful Stage 13: write and print the final closeout packet, release the lock, preserve scratch packets by default for audit/recovery, and do not wait for separate operator approval.

If Stage 14 lists only bounded media/evidence cleanup blockers that can be resolved without new judgment, continue directly to Stage 15.

### 15. Post-Closeout Media Evidence Cleanup

Use this stage only for cleanup of blockers already listed in Stage 14. Stage 15 is for evidence/media work that was too late or technically blocked during the run but no longer needs a new routing decision.

Allowed Stage 15 auto-approved actions:

- start or use approved local helper services needed to recover already-identified source media;
- download/read already-identified Gmail or WhatsApp attachments/media from sources included in the run;
- upload recovered files to already-resolved Drive folders;
- attach uploaded or already-existing Drive files to the owning Communication or operational row;
- update Communication `Notes`, `Document(s)`, `Translated Doc(s)`, task relations, and `Status` when the route is confirmed by the recovered evidence;
- write and print the Stage 15 packet and Stage 15 results/readback packet.

Stage 15 must stop for operator approval before:

- sending any Gmail/email, WhatsApp, or Slack message;
- creating a new task, Expense, Invoicing row, Communication, or other operational record;
- changing source markers, Gmail labels, WhatsApp checkpoints, or Slack source-message reactions/thread replies;
- choosing a new Drive destination or client subject that was not resolved in an earlier approved packet;
- keeping or adding a disputed task relation;
- interpreting media that requires business judgment beyond summarising/routing the recovered source.

Auto-approved after Stage 14 when within the allowed cleanup scope: write and print the cleanup plan/results packet, execute the listed bounded cleanup, read back every changed row/file, and update automation memory. If any stop condition appears, write and print the packet and wait for approval.

## Final Report

Return the final run packet status, changed records, skipped records, source markers, sent/unsent communications, Slack status, blockers, and any files left in the run folder.
