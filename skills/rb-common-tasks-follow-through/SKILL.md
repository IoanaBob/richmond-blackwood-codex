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
- Treat MCP `_notion_query_data_sources` as unavailable for all-row inventory unless a future run proves the exact connector path reliable again. Do not retry it as the default Stage 2 path.
- Keep MCP `fetch` for schema fetches and known page/data-source readbacks. Keep MCP `search` only for candidate discovery; never use search as proof of a complete inventory.
- For authoritative all-row inventory, page data sources through the Notion REST API with an approved non-browser Notion API credential stored outside git. Use the exact same query URL, query parameters, filters, sorts, and `page_size` on every request; add only `start_cursor` from the previous response until `has_more` is false.
- A minimal optional loop helper is available as `npm run notion:query-data-source -- "<query-url>" --body /private/tmp/<run-id>/query-body.json --out /private/tmp/<run-id>/<name>.json`. It changes only `start_cursor` between requests and appends `results`.
- The Notion REST path reads `RB_NOTION_API_KEY`, `NOTION_API_KEY`, or `NOTION_TOKEN` from the environment. Do not put Notion API credentials in tracked files or packet output.
- At Communication creation/update time, set `Relevance` to exactly one of `Ignore`, `Short Living`, or `Long Living`, and choose one primary client subject: `Company` or `Individual`, not both.
- Do not use `Assigned To` as a substitute for the communication subject. Use `Assigned To` only for the internal owner of the Communication row itself; action ownership normally belongs on the linked task or operational row.
- Treat every live data source under `RB Client Databases` as task-capable for inventory and closeout analysis, even if its field names differ.
- For triage routing, assign each inbound first to one of `Communications`, `Invoicing`, `Expenses`, or `Central Tasks`; then update dependent/automation-backed tables only when the communication directly affects them.
- Central Tasks is for action work, especially when a dependent table gets a draft/update. It is not a substitute for keeping Communications, Expenses, or Invoicing current.
- Do not create separate one-off Central Tasks for items that belong inside an existing recurring workflow, such as weekly invoice generation, weekly invoice payables/expenses, payroll, bookkeeping, or tax filing cadence tasks. Link the Communication/evidence to the recurring task or operational row instead.
- Do not create human tasks for source extraction or evidence upload that Codex can perform from approved Gmail/WhatsApp reads during the run. Human tasks are only for inaccessible portals, missing permissions, unresolved destination/folder decisions, human judgment calls, or actions outside Codex's source access.
- When approved Gmail/WhatsApp source messages include evidence attachments, route them through `rb-file-uploads` during the commit/update stage: upload/preserve the files, attach them to the Communication or owning operational row, link them to relevant tasks, then mark the Communication `Logged` once evidence, translation, and Notes are complete.
- When an inbound includes a form/questionnaire, run `rb-form-fill-assist` before assigning human follow-up. Codex must read the form, draft field-level answers from existing RB context, list unknowns, and route only unresolved judgment calls or missing facts to the human owner.
- Assign SteuerGo communications to Richmond Blackwood/RBL, not the underlying client company. A SteuerGo receipt confirmation is `Short Living`; the durable `Long Living` record is the uploaded receipt/evidence itself.
- ELSTER activation expiry reminders are `Short Living`, not durable authority correspondence. Once the ELSTER account/certificate is activated, the reminder has no continuing value; the linked activation task carries the active work.
- Assign legal contract/counterparty/VAT-route decisions to Johnpaul Okolie, including cases where a client discussion may require a direct contract or legal route decision before a Contract row changes.
- For TK/private-health-insurance/social-insurance transition edge cases where Simoneta is not onboarded, assign the active task to Johnpaul Okolie and merge duplicate backlog tasks into one active task.
- Slack closeout happens after task closeout analysis and updates, not immediately after communication logging.
- Do not include Team Updates in this workflow. Team Updates use a separate workflow/automation.
- Do not save German `W-IdNr` values. If a communication only provides a `W-IdNr` or asks RB to store it, treat that as a verified no-op unless there is a separate operational action; if action is needed, create the action without storing the number.
- Do not use raw timestamp ranges as user-facing Slack copy. Use a human window label such as "yesterday's client follow-through" or "the May 18 corrective rerun" and keep exact timestamps inside packets.
- Never describe an unsent Slack preview as "corrected"; use "corrected" only when replacing or superseding a Slack message that was actually sent.
- Ioana-authored or Ioana-approved Slack templates are the final source of truth. Do not improvise section labels, message shape, or level of detail when such a template exists.
- For client follow-through Slack closeouts, use the latest available Ioana-approved `#rb-client-updates` client follow-through template from Notion/canonical Communications unless the operator provides a newer exact template. Current known template shape uses a short first-person completion line followed by `New Correspondence`, `Received invoices`, and `Updated tasks`. Do not replace this with ad hoc sections such as `Completed/recorded`, `Owner updates`, or `Skipped per operator instruction`.
- If the Ioana template cannot be located, cannot fit the run, or required template fields/links/mentions cannot be resolved, stop with a blocker packet and ask for the exact template or explicit approval of a degraded version. Do not post manually or through Slack MCP until the template issue is resolved.
- Stage 12 Slack copy must read like a human operator update, not an automation trace. Do not include background source-marker mechanics, Codex/internal process actions, checkpoint details, or no-reply/no-action rows that do not matter to humans. Include only actionable or useful business context, with named Notion links.
- When addressing people in Slack, resolve Slack user IDs and use `<@USERID>` mentions so assignees are notified. Bare names are not acceptable for responsible-person routing in the final Stage 12 Slack payload. If a required Slack ID cannot be resolved through Slack MCP or a repo-approved mapping, Stage 12 is blocked unless the operator explicitly approves a named, no-notification fallback for that exact person and message.
- Stage 12 manual-post fallbacks must provide Slack-ready raw text with Slack-native links (`<url|label>`) and resolved Slack mentions (`<@USERID>`), plus a rendered preview when useful. Do not give the operator a degraded manual message with bare URLs or bare responsible-person names.

## Company And Project Resolution

Resolve company from the strongest available evidence, in this order:

1. Document addressee or invoice billed party.
2. Existing linked Communication, source thread, or operational row.
3. Mailbox alias or recipient pattern.
4. Existing task/project relation.
5. Sender/contact mapping.
6. Repo client files.

Never assign a company just to fill a field. If the communication is internal, system-only, spam, or not client-relevant, leave `Company` empty so it does not appear in company correspondence views.

For Communications, choose the more relevant primary subject relation:

- Use `Company` when the communication documents company operations, authority notices, invoices, contracts, payroll, filing, VAT, bank/account, asset, or client-company evidence.
- Use `Individual` when the communication documents personal tax, insurance, individual evidence, or an individual-specific authority/client matter.
- Leave both empty for internal/system/no-scope items.
- Do not set both `Company` and `Individual` on the same Communication unless the operator explicitly approves an exception in the packet.

Set `Relevance` at the same time:

- `Ignore`: spam, no-scope, churned-client no-action, or system/error notices retained only for audit.
- `Short Living`: transactional chats, referral/status/follow-up messages, ELSTER activation expiry reminders, automated broker/bank notifications that cannot be acted on directly, or short-lived coordination that should not become durable company/individual documentation after closeout.
- `Long Living`: durable documentation or evidence about a company or individual, including letters, filings, contracts, invoices, receipts, tax/insurance evidence, usable bank/broker exports, and authority correspondence.

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

Packet must include run ID, run window, operator, source systems, canonical Communications DB, RB Client Databases page, task registry version, git branch/pull result, and prior incomplete run state.

### 2. Open Task Inventory

Fetch every open or non-terminal row from every RB Client Databases data source plus central Tasks.

Packet columns: database, row URL, status, owner, company/individual, client project, due date, source links, next action, closeout condition.

Treat dependent and automation-backed tables as context for later closeout analysis. Ignore the `Empty Databases` placeholder area.

### 3. Communication Discovery And Read

Fetch Gmail/WhatsApp communication metadata and read the needed body/files in the same stage.

For Gmail, list every source mailbox searched or read. Do not assume all reads come from `accounting@richmondblackwood.com`; personal/operator mailbox reads are allowed only when explicitly in scope and must be labelled. Do not infer the eventual reply sender from the source mailbox or active operator.

For WhatsApp, use `references/whatsapp-source-roster.md` as the minimum route checklist. Include every roster route in the packet, including unresolved routes. Resolve missing chat IDs with WhatsApp search where possible. If a route is unresolved or was missed in a prior run, list it as a blocker and do not advance its checkpoint until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location.

For corrective reruns, include items from the operator-approved correction start even if Gmail already has `Triaged`; keep old labels but record the correction note. For the current bad-triage correction, the start is `2026-05-18 00:00 Europe/Dublin`.

Packet columns: operator, source mailbox or channel, source IDs, timestamp, sender, recipients, subject/title, attachment names, full-read summary, likely company or individual subject, likely project, topic/thread, contains-letter flag, letter source, classification, proposed Communication row, and proposed relevance.

If an email includes a letter, identify the letter source as the actual originator/sender of the letter, not merely the forwarder.

### 4. Communication Ledger Plan

Propose create/update of Communications rows for every real communication.

Spam and no-action communications still get logged and marked complete. Company stays empty unless the communication is a relevant incoming/outgoing client letter or client-operational communication.

Every proposed Communication row must include:

- `Relevance`: `Ignore`, `Short Living`, or `Long Living`.
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

For finance items:

- If an active payable/receivable contract or matching Invoicing row exists, attach/link the communication and evidence to the invoice task row.
- If no active contract applies, create/update the Expense task row.
- If the item is a receipt paid by Richmond Blackwood, upload/link the receipt to the correct evidence/expense record. Do not create a Central Task unless there is an unresolved human decision or inaccessible source.
- If the item belongs to an existing weekly invoice generation/payables workflow, attach/link the Communication and evidence to that workflow instead of creating a one-off task.
- If company is unclear, do not guess; assign blocker ownership to Richmond Blackwood only as operational owner.

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

Packet must list every created/updated row, linked company, linked project, owner, uploaded file, readback result, skipped duplicate, and failed write.

For Communications, readback must include `Relevance`, primary subject relation, and whether `Assigned To` is empty or intentionally set.

### 7. Task Closeout Analysis

Compare new communications against all open task-capable rows.

Packet must state which rows can move to done, remain open, need human follow-up, need source reconstruction, or are duplicate/stale. Include exact proposed status and evidence.

Stop before status updates.

### 8. Task Update, Owner Follow-Up, And Reply Plan

Packet proposes exact Notion updates, task comments, owner assignments, due dates, status changes, and Slack owner follow-up rows.

For each communication, include reply handling:

- exact proposed reply when a reply is needed now;
- sender identity, destination, source mailbox, source thread, and factual basis;
- if not time to reply, set `Reply Snoozed Until` and explain the trigger/date;
- if no reply is needed, mark reply status as not required or complete.

Stop before updates or sends.

### 9. Task Update And Reply Results

Apply approved task/database updates. Send only approved exact replies.

Packet lists updated rows, sent replies, unsent replies, snoozed replies, and remaining blockers.

### 10. Source Marker Plan

Propose Gmail labels and WhatsApp checkpoint changes only after records, tasks, and replies are correct.

For prior bad triage, keep existing Gmail labels and add corrective packet notes.

Auto-approved stage: write and print the packet, then continue directly to Stage 11 unless the plan includes an unexpected source mutation outside Gmail labels or WhatsApp checkpoints.

### 11. Source Marker Results

Apply approved Gmail labels and WhatsApp checkpoints.

Packet lists marked messages, skipped messages, and checkpoint state.

Auto-approved stage: write and print the packet, then continue directly to Stage 12 unless marking failed or a route/checkpoint blocker needs operator review.

### 12. Slack Closeout Plan

Build one `#rb-client-updates` message after task closeout.

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
