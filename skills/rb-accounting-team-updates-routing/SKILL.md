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
5. linked Notion task/page records needed to understand source rows;
6. responsible Company records, client project relations, and owning operational rows when a source row is client-related;
7. target Notion data source schemas before proposing writes.

Route only `Any blockers?` and `What are the action points today?` / `Action points`. Treat `New client inbounds` as observed / out of scope.

## Routing Strategy

First split source rows into atomic routing items. A single Team Updates line may contain multiple companies, tasks, approvals, or next actions. Preserve the original source row ID, but produce one routing item and one decision per atomic action.

For each atomic routing item, produce exactly one decision:

- `create_task`: no matching active task exists and owner/project/action are clear.
- `update_task`: an existing task, recurring task, or task-capable operational row owns the work.
- `comment_existing`: an existing page/task/operational row owns the work, but the safest action is a comment or review note.
- `skip_already_handled`: source is checked, completed, duplicated, superseded, or purely informational.
- `unresolved`: owner, project, source meaning, owning operational record, target schema, or write-back method is unclear.

Decision rules:

1. Fetch linked Notion mentions before deciding.
2. Classify the item as RB-internal or client-related. For client-related work, resolve the responsible Company record and its linked client project before proposing a task write.
3. Search task-capable operational rows before Central Tasks. Consider Invoicing, Expenses, Contracts, Filings, Payroll, Assets, Bank Accounts, Filing Registrations, Personal Tax Filings, and other RB Client Databases rows when they can own the action.
4. Use Richmond Blackwood Backlog only for truly RB-internal work. If a client-related item has no readable company project, choose `unresolved`.
5. Search for existing tasks by Team Updates page URL, linked page URL, exact or near-exact line text, owner, current date, company, project, and subject.
6. Reuse the owning task/page/operational row when a source line already links to the correct work item.
7. When search results include a task whose title/content identifies it as a duplicate bookkeeping/VAT context task, or whose comments say not to create/use a duplicate task, do not route fresh comments there. Treat it as a stale duplicate: route the source context to the owning recurring bookkeeping task, active VAT/source-review task, filing-dependent bookkeeping row, Communication, or operational row, and propose archiving the stale duplicate if it is still active.
8. Do not choose `unresolved` solely because no matching active task or operational row was found. If the owner, responsible company/project, source action, and Tasks schema are clear, propose `create_task` with source caveats instead.
9. Do not create duplicate approval tasks. Treat approval wording as review by adding the approver to `Review By` on the owning task or recurring workflow.
10. For invoice, contractor, expense, or payment approvals, route to the weekly invoice-payables/payables task when it owns the workflow.
11. Keep assignment on the operational doer. Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should default to Simoneta unless the source or user identifies another doer.
12. Do not assign routine operational work to Ioana by default.
13. If a source line contains multiple companies or unrelated actions, split them. Do not nest one company's filing, VAT, contract, or bookkeeping work under another company's task merely because both appear in the same source row or transcript excerpt.
14. Treat repeated known-status lines as `skip_already_handled` when the source adds no new action, owner change, due date, blocker, or evidence.
15. Include `Status = To Do` for active Central Task creates unless the source supports another status. Include a due date when the source, linked page, recurring workflow, or process gives one; otherwise leave it blank with `due_date_source = none`.
16. Verify the target Notion schema and exact property names for every proposed write, including `Assigned To`, `Review By`, `Project`, `Status`, due/deadline fields, and page comments when applicable.
17. Any proposed task comment, operational-row update, Team Updates write-back, Slack closeout text, or packet text that tells a person an item was routed must include the URL of the source entity being routed from. For Accounting Team Updates, use the Team Updates page URL by default; if a block/row URL is available, use it, and otherwise pair the Team Updates page URL with the source section and exact line.
18. If the owner, project, source meaning, owning record, target schema, or Team Updates write-back method is unclear, choose `unresolved`. Do not propose an unowned or unsafely writable task. For every `unresolved` row, explicitly state why creating a new task is unsafe.

## Human Approval Surface

Stage 3 must start with a human-readable approval surface. This is the part printed in chat for operator approval.

Group the visible rows under these headings:

- `Creates`
- `Updates / comments`
- `Skips / no action`
- `Unresolved / needs decision`

Use one compact table per group. The visible table columns must be:

- `Source row`
- `Source line`
- `Decision`
- `Target`
- `Owner`
- `Due`
- `Exact action`
- `Team Updates write-back`
- `Blocker / approval needed`

Human-table rules:

- Put the business decision first: what will be created, updated, skipped, or blocked.
- Use readable names and links for targets, not raw Notion payloads.
- Keep each row short enough to scan. Move schema details, dedupe notes, and exact payloads to the machine log.
- For `unresolved` rows, state the missing decision in plain language and explain why a new task would be unsafe.
- If the packet contains a separate machine log or handover file, link it near the top and label it as a continuation/execution log, not the approval surface.

## Machine Routing Log

Stage 3 must preserve a machine-complete routing log with these fields, either later in `stage-03-routing-plan.md` under `## Machine Routing Log (not approval surface)` or in a linked `stage-03-routing-log.md` / handover file:

- `source_row_id`
- `routing_item_id`
- `source_section`
- `source_text`
- `checkbox_state`
- `source_links`
- `source_entity_url`
- `slack_source_links`
- `scope`
- `responsible_company`
- `owning_data_source`
- `owning_row`
- `decision`
- `target_type`
- `target_task_or_page`
- `assignee`
- `review_by`
- `project`
- `project_source`
- `status`
- `due_date`
- `due_date_source`
- `slack_assignee_mention`
- `slack_mention_status`
- `dedupe_evidence`
- `create_task_safety_analysis`
- `notion_schema_verified`
- `proposed_notion_write_payload`
- `proposed_task_or_comment_text`
- `team_updates_writeback_method`
- `team_updates_writeback_text`
- `unresolved_reason`
- `execution_guard`

For `unresolved` rows:

- leave `assignee`, `project`, `owning_row`, and `target_task_or_page` blank unless a partial value is verified;
- set `team_updates_writeback_text` to the exact unresolved note proposed for the Team Updates page;
- set `execution_guard` to `write unresolved note only after Stage 3 approval`;
- set `create_task_safety_analysis` to a concrete unsafe reason covering the missing owner, project, action, schema, source meaning, or write-back method; "no existing task found" is not a valid unsafe reason;
- do not create a task.

For `create_task`, `update_task`, or `comment_existing` rows:

- include the exact proposed task title, task properties, or comment text;
- include the exact source entity URL in any proposed text that says the item was routed;
- include the exact Team Updates write-back method and text;
- include the resolved assignee and verified Slack mention;
- include `Review By` when the source asks for approval, review, or sign-off.
- set `slack_mention_status = verified` for every assignee, or block Stage 5 until the operator approves a no-notification fallback.

## Stage Boundary

The output of this skill is the Stage 3 Routing Plan packet plus any linked machine log. Stage 4 executes only the approved rows from the human approval surface, using the machine log for exact payload details, and then proves read-back. If the approved human table and machine log disagree, return to Stage 3 correction before writing.
