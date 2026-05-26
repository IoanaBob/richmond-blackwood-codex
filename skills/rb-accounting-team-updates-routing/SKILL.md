---
name: rb-accounting-team-updates-routing
description: "Use inside Stage 3 of rb-accounting-team-updates-triage to turn approved source-context packet rows into a deterministic routing plan for Accounting Team Updates blockers and action points. Produces create/update/skip/unresolved decisions only; never performs Notion or Slack writes."
---

# RB Accounting Team Updates Routing

Use this skill only inside Stage 3 - Routing Plan of `rb-accounting-team-updates-triage`.

This is a planning skill. It must not create, update, comment, write back to Team Updates, check boxes, or send Slack.

## Inputs

Read:

1. the latest Stage 2 Source Context packet;
2. `processes/accounting-team-updates-triage.md`;
3. `processes/notion-operations.md`;
4. `internal/people-roles.md`;
5. linked Notion task/page records needed to understand source rows.

Route only `Any blockers?` and `What are the action points today?` / `Action points`. Treat `New client inbounds` as observed / out of scope.

## Routing Strategy

For each source row, produce exactly one decision:

- `create_task`: no matching active task exists and owner/project/action are clear.
- `update_task`: an existing task or linked task owns the work.
- `comment_existing`: an existing page/task owns the work, but the safest action is a comment or review note.
- `skip_already_handled`: source is checked, completed, duplicated, superseded, or purely informational.
- `unresolved`: owner, project, source meaning, or owning operational record is unclear.

Decision rules:

1. Fetch linked Notion mentions before deciding.
2. Search for existing tasks by Team Updates page URL, linked page URL, exact or near-exact line text, owner, current date, and subject.
3. Reuse the owning task/page when a source line already links to the correct work item.
4. Do not create duplicate approval tasks. Treat approval wording as review by adding the approver to `Review By` on the owning task.
5. For invoice, contractor, expense, or payment approvals, route to the weekly invoice-payables/payables task when it owns the workflow.
6. Keep assignment on the operational doer. Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should default to Simoneta unless the source or user identifies another doer.
7. Do not assign routine operational work to Ioana by default.
8. If the owner, project, source meaning, or owning record is unclear, choose `unresolved`. Do not propose an unowned task.

## Output Table

Stage 3 must include a routing table with these columns:

- `row_id`
- `source_section`
- `source_text`
- `checkbox_state`
- `source_links`
- `slack_source_links`
- `decision`
- `target_task_or_page`
- `assignee`
- `review_by`
- `project`
- `slack_assignee_mention`
- `dedupe_evidence`
- `proposed_task_or_comment_text`
- `team_updates_writeback_text`
- `unresolved_reason`
- `execution_guard`

For `unresolved` rows:

- leave `assignee`, `project`, and `target_task_or_page` blank unless a partial value is verified;
- set `team_updates_writeback_text` to the exact unresolved note proposed for the Team Updates page;
- set `execution_guard` to `write unresolved note only after Stage 3 approval`;
- do not create a task.

For `create_task`, `update_task`, or `comment_existing` rows:

- include the exact proposed task title or comment text;
- include the exact Team Updates write-back text;
- include the resolved assignee and Slack mention if available;
- include `Review By` when the source asks for approval, review, or sign-off.

## Stage Boundary

The output of this skill is the Stage 3 Routing Plan packet. Stage 4 executes only the approved rows from that packet and then proves read-back.
