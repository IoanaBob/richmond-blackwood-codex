# RB Communications Follow-Through Stage Packet Protocol

Status: provisional.
Source: RB Communications follow-through implementation plan, adapted from Everguard communications-log and RB common-tasks packet patterns.
Imported: 2026-05-31.
Review: Validate on the first supervised packet-only dry run and first approved live row movement.

## Purpose

Packets make row-led Communications follow-through reviewable and recoverable. A packet is both the approval surface and the run memory. Do not rely on chat memory to reconstruct already approved work.

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
- operator from `RB_CODEX_ACTOR` when needed, or `not required`;
- Communications database URL and data source ID;
- live Communications fields available;
- missing expected fields, if any;
- run scope and source coverage limits;
- blocker list.

Stage 1 is read-only except creating the scratch run folder and lock.

## Stage 2 - Communications Inventory

Goal: choose Communications rows in scope.

Default inclusion:

- `Status` is not `Logged`;
- `Due Date` is today or overdue;
- the user supplied a specific row URL;
- the row appears in a user-supplied Notion view/query scope.

Use the canonical data source:

```text
collection://1b5e4130-1314-8183-afd8-000b6f4da982
```

Preferred method:

- Fetch/query the data source or view with the Notion connector.

Fallback method:

- If SQL or view query is unavailable, use Notion search plus direct page fetches. Record the fallback and any coverage risk in the packet.

Packet columns:

- Communication URL;
- title;
- status;
- type;
- relevance;
- sent/received date;
- due date;
- company;
- individual;
- tasks;
- assigned-to;
- document state;
- translated-document state;
- notes summary;
- inclusion reason;
- proposed next stage read need.

Do not search Gmail, Slack, or WhatsApp in Stage 2.

## Stage 3 - Context Read

Goal: read only the context needed to move the selected Communications rows.

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
- row context read;
- source context read and exact IDs;
- company/individual subject confidence;
- linked task/operational-row status;
- evidence and translation gaps;
- reply need;
- urgency or ownership change;
- blocker or missing source route.

## Stage 4 - Action Packet

Goal: propose exact row movement before writes.

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
- reply/send decision;
- owner and due date;
- verification expected after execution.

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

- Use RB repo helpers, not personal-codex.
- Use `/private/tmp` or another ignored local path for body files.
- Prefer `npm run gmail:send-email`.
- Use `--reply-message-id` when a Gmail message ID is known.
- Keep `--auth-login never` unless the operator explicitly approves an auth action.
- Verify returned `message_id`, `thread_id`, and sent `From`.

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
- fetch every updated linked task or operational row;
- verify sent email/Slack/WhatsApp IDs where the tool returns them;
- confirm blockers still have an owner or next unblock action.

Closeout packet must include:

- rows logged;
- rows left in progress;
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
