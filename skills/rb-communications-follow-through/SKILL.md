---
name: rb-communications-follow-through
description: Use when moving Richmond Blackwood Communications rows forward from the canonical Notion Communications database, including logging cleanup, evidence attachment, reply planning, approved email/Slack/WhatsApp sends, linked task updates, and verified closeout.
---

# RB Communications Follow-Through

Use this skill for focused follow-through on existing Richmond Blackwood Communications rows. It is row-led: start from canonical Communications records, then read only the source context needed to move those rows forward.

This skill does not replace `rb-common-tasks-follow-through`. Use `rb-common-tasks-follow-through` for broad daily Gmail/WhatsApp discovery across task-capable RB Client Databases. Use this skill when the work is to advance known Communications rows.

## Load First

Before live work, read:

1. `references/stage-packet-protocol.md`.
2. `processes/communications.md`.
3. `skills/rb-communications/SKILL.md`.
4. `skills/rb-common-tasks-follow-through/references/rb-client-database-task-registry.md` when a Communication may create or update task-capable rows.

Load only when needed:

- Email sends or Gmail-backed replies: `skills/rb-gmail-drafts/SKILL.md`.
- WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
- Evidence upload, attachment, or translation file handling: `skills/rb-file-uploads/SKILL.md`.
- Form or questionnaire handling: `skills/rb-form-fill-assist/SKILL.md`.
- Owner routing: `internal/people-roles.md`.

## Source Of Truth

Canonical Communications:

- Database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`

Use only current live fields in v1:

- `Title`
- `Type`
- `Status`
- `Relevance`
- `Sent/Received On`
- `Due Date`
- `Snooze Until`
- `Company`
- `Individual`
- `Tasks`
- `Assigned To`
- `Document(s)`
- `Translated Doc(s)`
- `Notes`

Do not change the Notion schema in this skill. If source URL, source message ID, reply status, letter metadata, or another useful field is missing, record it as a schema blocker in the packet. Use `Notes` as a temporary approved fallback only when needed for safe operation.

Current Communications status values are:

- To do: `Captured`
- In progress: `Needs Triage`, `Drafting`, `Follow-Up`, `Needs Reply`
- Complete: `Done`, `Archived`

If the live schema changes, use the status options returned by the Stage 2 schema fetch and record the mapping in the packet before any write.

Do not write new RB records to the old `RB Communications` database at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.

## Inventory Pull Contract

For any scope that says "all", "since inception", "every assigned row", or otherwise requires complete coverage, Stage 2 must use an authoritative row pull, not Notion search.

Do a live capability check before deciding the inventory path. Prior failures are useful context, not proof of the current connector state. At the start of Stage 2, fetch the canonical Communications database, then run one non-mutating SQL probe such as `SELECT COUNT(*)` and, where a view URL is relevant, one non-mutating view-mode probe. Record the exact tool names, inputs, and errors/successes in the packet/run state.

Authoritative row pulls are:

- Notion connector data-source SQL query against `collection://1b5e4130-1314-8183-afd8-000b6f4da982`, paged with `LIMIT` / `OFFSET` until a page returns fewer rows than requested.
- Notion connector view query against a supplied or approved view URL, paged with `page_size: 100` and `next_cursor` until `has_more` is false.
- A user-provided/exported CSV or other full table export from the canonical Communications database/view.
- A direct Notion API/export helper path that can prove it read the full table, including total row count or unambiguous pagination completion. Do not use the browser for Communications inventory unless the operator explicitly overrides that boundary for the run.

For rows assigned to the active operator, resolve `RB_CODEX_ACTOR` through `internal/people-roles.md`, then filter on the Notion user ID in `Assigned To`. For Ioana Surdu-Bob the current provisional Notion user ID is `3a46f87a-9bc2-408f-baff-b4c23326e0f2`.

Notion search is not inventory. Search has a 25-result page cap, semantic ranking, and can match related page content or linked tasks without the Communication row itself being assigned. Use search only for candidate discovery, source lookup, or recovery after a complete inventory has already defined the row set. If the query/export path is unavailable, stop with a coverage blocker or ask for browser login/CSV/export support; do not present search results as "all records".

## Queue And Batch Contract

For complete-scope follow-through runs, Stage 2 must materialize the selected row set as CSV before Stage 3 starts.

Default follow-through selection:

- Resolve the active operator from `RB_CODEX_ACTOR` and `internal/people-roles.md`, then include only rows whose `Assigned To` contains that operator's Notion user ID.
- Include only rows whose `Status` is not a complete status and whose `Snooze Until` is blank or is on/before the run date in the Codex timezone.
- Include user-supplied row URLs only when the operator explicitly supplies them; label those rows as `operator_supplied_override` if they do not match the default assignment or snooze filter.
- Exclude `Status = Done` and `Status = Archived`, even when `Due Date` is today or overdue.
- Exclude rows assigned to someone else unless the operator explicitly supplied the row URL or view scope.
- Defer rows with future `Snooze Until` to the skipped/deferred CSV with `deferred_until` and `defer_reason=future_snooze`; do not batch-select them.
- Treat `Due Date` as priority/sort metadata inside the open queue, not as a reason to reopen complete Communications.
- If RB is waiting for a reply or follow-through, the Communication should remain `Follow-Up`.
- Use `Needs Reply` when RB owes a reply, `Drafting` while evidence/translation/file handling is incomplete, and `Needs Triage` only while ownership/routing is unresolved.
- Reopen or inspect complete rows only when the operator explicitly asks for complete-row cleanup or supplies specific row URLs.

Write:

- a full selected queue CSV with one physical line per Communication row;
- a skipped/deferred CSV for complete rows, rows assigned to other owners, future-snoozed rows, and any other out-of-scope rows from the authoritative pull;
- a manifest with selected count, skipped count, batch size, batch count, and per-batch file paths;
- batch CSVs that are contiguous slices of the selected queue.

Filter the selected queue before sorting and slicing batches:

1. deadline: `Due Date` ascending, missing due dates last;
2. urgency: `Needs Reply`, then `Follow-Up`, then `Drafting`, then `Needs Triage`, then `Captured`, then other non-complete statuses;
3. relevance: `Long Living`, then `Short Living`, then `Ignore`;
4. stable tie-breakers: `Sent/Received On`, `Created At`, then title.

Default batch size is 25. Include stable `queue_index`, `batch_number`, `batch_position`, `deadline_sort_key`, `urgency_rank`, `urgency_label`, `assigned_to_operator`, `snooze_until`, and `snooze_eligibility` columns. Do not create ad hoc Stage 3 batches by urgency, due date, owner, or status unless the packet labels that pass as diagnostic or priority-only and does not use it as the queue batch number.

Stage 3 context-read status is not completion. A batch is only "context read" after Stage 3; its rows stay in the active run state until Stage 5/6 verifies an approved action that closes the row, sets a future `Snooze Until`, records a blocker, or explicitly carries the row forward.

## Core Rules

- Create or update one canonical Communications row for each material sent, received, internal, system, call, draft, or status event that changes RB client/work context or creates follow-up work.
- Keep Communications current in the same task turn. Progress should not live only in Gmail, Slack, WhatsApp, Drive, repo memory, or a human's head.
- If a communication changes urgency, ownership, closeout condition, evidence state, or reply state, update the owning task-capable row in the same approved pass, not only the Communications row.
- Do not run broad source discovery. Read Gmail, Slack, WhatsApp, Drive, or Notion source context only for the Communications rows in scope.
- Choose one primary client subject relation: `Company`, `Individual`, or neither. Do not set both unless the operator explicitly approves that exact exception.
- Use `Company` for company operations and durable company evidence. Use `Individual` for personal tax, insurance, individual evidence, or individual-specific authority/client matters. Leave both empty for internal, system, spam, no-scope, or non-client-relevant logs.
- Use `Assigned To` only when the Communication row itself has an internal owner. Action ownership normally belongs on the linked task or operational row.
- Set `Relevance` when creating or updating the row: `Ignore`, `Short Living`, or `Long Living`.
- Set `Status` to `Done` only when the communication logging work is complete. For document communications, this means original evidence is attached in `Document(s)`, required translation output is attached in `Translated Doc(s)`, and `Notes` contains a useful summary.
- Keep `Status` as `Drafting` when routing, evidence, translation, reply, or source-link capture is not complete.
- Keep `Status` as `Follow-Up` when RB is waiting for a reply or follow-through. Use `Needs Reply` when RB owes the next reply. Do not treat a stale due date on a complete row as open follow-through without explicit operator approval.
- For outgoing Communications, set `Snooze Until` to one week after the row `Created At` date unless a more specific follow-up date is approved. After any follow-up is sent, reset `Snooze Until` to one week after the follow-up send date by default. This keeps sent items visible for reply monitoring without treating them as complete.
- For every open Communication, Stage 4 must decide who, if anyone, RB needs to answer or chase, which channel/thread to use, what the next message or non-message action is, and what linked task/operational note or status update is required.
- If a Communication has linked `Tasks`, update or comment on the task in the same approved pass whenever the Communication's reply state, evidence state, owner, blocker, or next follow-up changes. Do not mark a linked task done when required evidence is missing, RB is waiting for a reply, or the next communication still needs follow-through.
- Do not save credentials, tokens, live SignNow action links, raw WhatsApp transcripts, raw private email bodies, ELSTER certificates, bank secrets, or unsafe sensitive data in git or Notion notes.

## Stage Flow

Run the packet workflow from `references/stage-packet-protocol.md`:

1. Preflight.
2. Communications Inventory.
3. Context Read.
4. Action Packet.
5. Execute Approved Actions.
6. Readback And Closeout.

Every stage writes a Markdown packet under `/private/tmp/rb-communications-follow-through/<run-id>/`, prints the same packet in chat, and stops for approval unless the protocol explicitly says the stage is read-only or already approved.

## Email Sends

For email, RB is self-contained in this repo. Do not delegate email sending to `personal-codex`.

Before sending, show the full preview required by `rb-communications` and `rb-gmail-drafts`:

- Channel: Gmail.
- Operator: active human operator from `RB_CODEX_ACTOR`, or `not required`.
- Source mailbox(es): exact mailbox(es) searched/read.
- From: exact display name and email address.
- To, Cc, and Bcc.
- Subject.
- Source/reply thread.
- Attachments.
- Body.

Default client-facing sender:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

After approval, send directly through the supported Gmail connector, MCP, or approved API path. Prefer thread-aware reply support when a Gmail message or thread ID is known. Record returned message/thread IDs in the execution packet and in the Communications row. If no supported direct-send path is callable, stop and record the connector/API blocker; do not introduce a repo-local direct-send helper as the default workaround.

Software drafts are exception-only. If direct send is unavailable and the user explicitly approves a draft fallback, create a verified draft through the existing RB draft helper and leave final sending to the approved Gmail connector/MCP/API path or the user's explicit next instruction.

## Outbound Approval

Do not send Gmail, Slack, WhatsApp, Notion, or other outbound communications until the operator approves the exact message, destination, sender, attachments, and source thread.

If source context changes after approval, stop and issue a revised packet before sending.

## Closeout

After execution, verify every Notion write and send/readback result. Close the run only after the packet lists:

- Communication rows created or updated.
- Task-capable rows created, updated, linked, or left blocked.
- Evidence files attached or blocked.
- Replies sent, snoozed, skipped, or blocked.
- Source IDs, thread IDs, message IDs, and Notion URLs where available.
- Remaining blockers with next owner and unblock action.

Update `memory/skill-runs.md` only when the run changed durable repo memory, helper behavior, process rules, or skill files. Do not write raw source content into memory.
