# RB Communications Follow-Through Stage Packet Protocol

Status: provisional.
Source: RB Communications follow-through implementation plan, adapted from Everguard communications-log and RB common-tasks packet patterns.
Imported: 2026-05-31.
Review: Validate on the first supervised packet-only dry run and first approved live row movement.

## Purpose

Packets make row-led Communications follow-through reviewable and recoverable. A packet is both the approval surface and the run memory. Do not rely on chat memory to reconstruct already approved work.

This protocol is scoped to `rb-communications-follow-through` runs only. It is not a general rule for every RB workflow or every person; the default queue is the active operator's own due Communications, unless the operator explicitly supplies another row URL or view scope.

## Run Folder And Lock

Use:

```text
/private/tmp/rb-communications-follow-through/<run-id>/
```

Run ID format:

```text
YYYY-MM-DD-HHMM-<short-window-or-row-label>
```

Create `LOCK.md` before Stage 1 completes. If a lock already exists:

1. Read `LOCK.md`.
2. Read `RUN_STATE.md` when present.
3. Read the latest `stage-*.md`.
4. Continue from the next unapproved or approved-but-unexecuted stage.

Never start a new live run over an incomplete locked run unless the operator explicitly abandons it.

## Packet Files

Each stage writes:

```text
stage-XX-<short-name>.md
```

Each packet must include:

- run ID;
- stage number and name;
- exact Communications rows, view URL, query, or search path used;
- rows considered and skipped;
- proposed or completed action;
- owner, company, individual, task, project, due date, and source-thread fields when relevant;
- approval status;
- blockers;
- next stage.

Print the same packet in chat after writing it. Stop for approval before any live write or send unless the packet is read-only and the protocol explicitly permits continuing.

## Mutation Rule

No Notion write, Gmail send, Gmail draft send, Slack send, WhatsApp send, file upload, attachment update, task update, status change, or source marker happens merely because a packet exists.

The operator must approve the exact packet for Stage 5 execution. Approval must identify the exact stage and action. Do not ask for broad approval such as "continue the run" when the next stage includes writes or sends.

If new material facts appear during execution, stop and issue a revised Stage 4 or Stage 5 packet before continuing.

## Stage 1 - Preflight

Goal: establish a safe run context.

Required actions:

- Inspect `git status --short --branch`.
- Run `git pull origin main` from the active RB repo/worktree before substantive live-state work.
- If the worktree is clean and a new repo edit is needed, use a `codex/<task-slug>` branch.
- Fetch the canonical Communications database/schema.
- Confirm the run scope: user-specified row URLs, view URL, or default open/due inventory.
- Create the run folder and `LOCK.md`.

Packet fields:

- branch and git status;
- pull result;
- workspace actor from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR` when needed, an explicit actor supplied in the current run/chat if both env keys are missing, or `not required`;
- Communications database URL and data source ID;
- live Communications fields available;
- missing expected fields, if any;
- run scope and source coverage limits;
- blocker list.

Stage 1 is read-only except creating the scratch run folder and lock.

## Stage 2 - Communications Inventory

Goal: choose Communications rows in scope.

Default inclusion:

- `Assigned To` contains the active workspace actor's Notion user ID resolved from `RB_WORKSPACE_ACTOR`, legacy `RB_CODEX_ACTOR`, or an explicit actor supplied in the current run/chat;
- `Status` is not a complete status;
- `Snooze Until` is blank or is on/before the run date in the Codex timezone;
- the user supplied a specific row URL, labelled as an `operator_supplied_override` if it does not match the default assignment or snooze filter;
- the row appears in a user-supplied Notion view/query scope, with the view filter recorded exactly.

Default exclusion:

- `Status` is `Done` or `Archived`, even when `Due Date` is today or overdue.
- Rows assigned to someone else, unless explicitly supplied by URL/view for review.
- Rows with future `Snooze Until`; write them to skipped/deferred CSV with `deferred_until` and `defer_reason=future_snooze`.
- A stale due date on a complete Communication is cleanup metadata, not follow-through selection.
- If RB is waiting for a reply or follow-through, the Communication should be `Follow-Up`.
- If RB owes the next reply, the Communication should be `Needs Reply`.
- If evidence, upload, translation, or source-link work is incomplete, the Communication should be `Drafting`.

Use the canonical data source:

```text
collection://1b5e4130-1314-8183-afd8-000b6f4da982
```

Preferred method:

- For broad scopes such as "all rows", "since inception", "all assigned to X", or any other complete inventory, follow `processes/notion-operations.md`: use Notion REST API data-source pagination, a full approved export/CSV, or a currently working MCP SQL/view pagination path. Do not use MCP search as the inventory source.
- REST API mode: use `POST /v1/data_sources/<data-source-id>/query` with `page_size: 100`; follow `next_cursor` with `start_cursor` until `has_more` is false. Record every cursor, returned row count, and final total in the packet. Keep token handling outside git and never print the token.
- SQL mode: if the MCP backend currently exposes data-source query, use the canonical data source as the table name, request deterministic columns, and page with `LIMIT 100 OFFSET <n>` until a query returns fewer than 100 rows. Record every query, offset, returned row count, and final total in the packet.
- View mode: if the MCP backend currently exposes view pagination, query the supplied/approved view URL with `page_size: 100`; follow `next_cursor` until `has_more` is false. Record every cursor, returned row count, and final total in the packet.
- For operator assignment scopes, resolve the active human workspace actor from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR` and `internal/people-roles.md`, or from an explicit actor supplied in the current run/chat if both env keys are missing, then filter by the Notion user ID stored in `Assigned To`.
- Google personas are auth routes only. Do not use a Google persona, Gmail mailbox, or sender identity as the active human workspace actor.
- If using a user-provided CSV/export, record the file path, export timestamp if known, source view/database URL, row count, and exact filter/sort that produced it.

Example SQL for Ioana-assigned rows:

```sql
SELECT
  url,
  "Title",
  "Status",
  "Type",
  "Relevance",
  "date:Sent/Received On:start",
  "date:Due Date:start",
  "date:Snooze Until:start",
  "Company",
  "Individual",
  "Tasks",
  "Assigned To",
  "Document(s)",
  "Translated Doc(s)",
  "Notes"
FROM "collection://1b5e4130-1314-8183-afd8-000b6f4da982"
WHERE "Assigned To" LIKE ?
  AND COALESCE("Status", '') NOT IN ('Done', 'Archived')
  AND ("date:Snooze Until:start" IS NULL OR "date:Snooze Until:start" <= ?)
ORDER BY COALESCE("date:Due Date:start", "date:Sent/Received On:start", "Created At", createdTime) ASC
LIMIT 100 OFFSET 0;
```

Use parameter:

```text
%3a46f87a-9bc2-408f-baff-b4c23326e0f2%
<run-date YYYY-MM-DD>
```

Fallback method:

- Do not rely on historical connector behavior alone. Each run must do a live `fetch` probe, check whether the REST API/export path is available, and run live non-mutating SQL/view query probes when those connector paths are callable before deciding whether complete inventory is available.
- If SQL/view query returns an error such as `Tool notion-query-data-sources not found`, treat that as a connector backend blocker only. Continue to the REST API/export availability check before declaring the run blocked.
- If every authoritative inventory path is unavailable for a complete-scope run, do not substitute Notion search as inventory. Stop with a coverage blocker unless the operator provides a full export, enables a direct Notion API/export helper path, or explicitly approves a degraded candidate-only run.
- Notion search may be used only for candidate discovery. It has a 25-result cap, semantic ranking, and can return false positives where linked tasks or page content mention the operator while the Communication row has no `Assigned To` value.
- Any search-based packet must say `coverage: degraded candidate discovery` and must not use words like "all", "complete", or "since inception" for the resulting row set.

Packet columns:

- Communication URL;
- title;
- status;
- type;
- relevance;
- sent/received date;
- due date;
- snooze until;
- company;
- individual;
- tasks;
- assigned-to;
- assigned-to-operator match;
- snooze eligibility or deferred reason;
- document state;
- translated-document state;
- notes summary;
- inclusion reason;
- proposed next stage read need.

Queue requirements:

- For complete-scope runs, write a full selected queue CSV before Stage 3 starts.
- Also write a skipped/deferred CSV for complete rows, non-operator rows, future-snoozed rows, and any other excluded rows from the authoritative pull; include the exact exclusion/defer reason.
- Filter the selected queue before sorting and slicing batches.
- Sort the selected queue by deadline first and urgency second:
  - `Due Date` ascending, with missing due dates last;
  - `Needs Reply`, then `Follow-Up`, then `Drafting`, then `Needs Triage`, then `Captured`, then other non-complete statuses;
  - `Long Living`, then `Short Living`, then `Ignore`;
  - `Sent/Received On`, `Created At`, and title as stable tie-breakers.
- The selected queue CSV must be loop-safe: one physical line per Communication row, no embedded newlines in fields, and stable `queue_index`, `batch_number`, `batch_position`, `deadline_sort_key`, `urgency_rank`, `urgency_label`, `assigned_to_operator`, `snooze_until`, and `snooze_eligibility` columns.
- Default batch size is 25.
- Batch CSVs must be contiguous slices from the selected queue, for example rows 1-25, 26-50, and so on.
- Do not define batches by due date, owner, status subgroup, or urgency unless the packet labels that pass as diagnostic/priority-only and not as the queue batch number.
- Stage 3 must consume the next not-yet-read batch file from the manifest and update the packet/run state with exact queue indices.

Do not search Gmail, Slack, or WhatsApp in Stage 2.

Stage 2 cannot advance to Stage 3 for complete-scope runs until the packet has either:

- an authoritative total and full row list;
- a verified zero-row result from authoritative query/export;
- or explicit operator approval to continue with degraded candidate discovery.

## Stage 3 - Context Read

Goal: read only the context needed to move the selected Communications rows.

Stage 3 is read-only and never means a row or batch is done. Mark only `context_read_status`, `context_read_at`, and any blocker/missing-source state in the run CSV/packet. Keep every row active for Stage 4/5 unless Stage 4 later proposes, and Stage 5/6 verifies, a closing action, a future snooze, a blocker, or an explicit carry-forward.

Allowed reads:

- selected Communication pages;
- related Company, Individual, and Tasks pages;
- linked operational rows from task relations;
- linked Drive files or Notion attachments when evidence/translation state is in scope;
- narrow Gmail/Slack/WhatsApp source thread reads only when the Communication notes, page body, task, or operator instruction identifies the source.

Disallowed reads:

- broad inbox sweeps;
- broad WhatsApp chat history imports;
- broad Slack channel history reads;
- unrelated client folder backfills;
- source systems outside the selected row scope.

Packet columns:

- Communication URL;
- queue index and batch position;
- context read status;
- context read timestamp;
- row context read;
- source context read and exact IDs;
- company/individual subject confidence;
- linked task/operational-row status;
- evidence and translation gaps;
- reply need;
- urgency or ownership change;
- blocker or missing source route.

## Stage 4 - Action Packet

Goal: propose the exact next Communication action and row movement before writes.

For every Communication, decide who needs to be answered or chased, through which channel/thread, what should happen next, and how the linked task or operational row should reflect the progress. If no outbound message is needed, state why and what non-message action or closeout is appropriate.

Classify each Communication as exactly one primary action:

- `log cleanup`;
- `needs evidence/translation`;
- `needs reply`;
- `needs task/operational update`;
- `snooze`;
- `no action`;
- `blocked`.

Each row proposal must include:

- exact Notion property updates;
- exact page-content or `Notes` updates, if any;
- exact relation changes;
- evidence files to attach or translate;
- linked task/operational-row updates;
- next communication target, or `none`;
- channel and destination/thread for the next communication, or `none`;
- reply/send/comment/no-send decision and reason;
- next message/action summary;
- linked task note/comment/status update, or an explicit `no linked task update needed` reason;
- owner and due date;
- `Snooze Until` date for outgoing Communications and follow-ups;
- resulting Communication state: `Done`, `Archived`, `Drafting`, `Follow-Up`, `Needs Reply`, `Needs Triage`, `blocked`, `future_snoozed`, or `carry_forward`;
- verification expected after execution.

Task update rule:

- If a linked task exists, propose a task comment or status/property update whenever the Communication is waiting on someone, RB owes a reply, evidence is missing, ownership changes, the row is snoozed, or the row is blocked.
- Do not mark the linked task done while evidence/translation/source attachment is missing, RB is waiting for a reply, or the next communication is still open. Keep or return the task to an in-progress status when the Communication remains active.

Outgoing snooze rule:

- For an outgoing Communication, propose `Snooze Until = Created At + 7 days` unless the row already has a more specific approved follow-up date.
- For any sent follow-up, propose `Snooze Until = sent date + 7 days` by default unless the operator approves another follow-up interval.
- Do not mark an outgoing Communication `Done` merely because it was sent when RB still needs to monitor for a reply; keep it `Follow-Up` with the snooze date.

For replies, include the full outbound preview:

- channel;
- operator;
- source mailbox(es), for Gmail;
- from;
- to/destination;
- cc/bcc;
- subject, for email;
- source/reply thread;
- attachments;
- body.

For missing desired schema fields, propose either:

- record schema blocker and stop that row; or
- temporarily store the needed source/reply/letter metadata in `Notes` with explicit operator approval.

Stop before writes or sends.

## Stage 5 - Execute Approved Actions

Goal: execute only the approved Stage 4 action list.

Allowed actions after approval:

- update Communication properties/content;
- create or update linked task-capable rows;
- upload or attach approved evidence files;
- send approved Gmail/Slack/WhatsApp messages;
- send an approved unchanged Gmail draft;
- add approved comments or closeout notes where supported.

Gmail execution rules:

- Use the supported Gmail connector, MCP, or approved API path; do not delegate to `personal-codex`.
- Do not add or require repo-local direct-send scripts as the default execution path.
- Preserve the existing Gmail thread when a message or thread ID is known and the supported send path can do so.
- Verify returned `message_id`, `thread_id`, sent `From`, and destination details where the send path exposes them.
- If direct send is unavailable, stop with a connector/API blocker unless the operator explicitly approves a draft fallback.

Packet columns:

- approved action;
- command/tool used, summarized without secrets;
- write/send result;
- returned Notion URL, message ID, thread ID, Slack timestamp, or WhatsApp message ID;
- skipped actions and reasons;
- failed actions and retry/blocker decision.

If a live write or send fails, do not improvise a new route. Record the blocker and ask for approval before using a fallback.

## Stage 6 - Readback And Closeout

Goal: prove the run state and release the lock.

Required readbacks:

- fetch every updated Communication row;
- verify `Status`, `Relevance`, `Company`, `Individual`, `Tasks`, `Assigned To`, `Document(s)`, `Translated Doc(s)`, and `Notes` changes that were approved;
- verify approved `Snooze Until` changes for outgoing Communications and sent follow-ups;
- fetch every updated linked task or operational row;
- verify sent email/Slack/WhatsApp IDs where the tool returns them;
- confirm blockers still have an owner or next unblock action.

Closeout packet must include:

- rows logged;
- rows left in progress;
- queue rows closed, future-snoozed, blocked, or carried forward;
- replies sent, snoozed, skipped, or blocked;
- evidence attached or blocked;
- task/operational updates;
- durable memory updates, if any;
- remaining blockers;
- run folder path;
- lock release result.

Release `LOCK.md` only after Stage 6 is complete. Preserve scratch packets by default.

## Dry-Run Checklist

Before treating the skill as stable, run a packet-only pass with no Notion writes or sends covering:

- incoming document row needing evidence/translation handling;
- outgoing row needing source/sent proof or closeout;
- blocked row with missing source route or missing schema field;
- row with company subject;
- row with individual subject;
- row with no client subject.

The dry-run packet should demonstrate that the skill stays row-led and does not broaden into inbox discovery.
