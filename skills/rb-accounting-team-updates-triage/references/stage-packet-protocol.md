# Accounting Team Updates Stage Packet Protocol

Status: provisional.
Source: user instruction to make Accounting Team Updates triage packet-based, modelled on `rb-common-tasks-follow-through`; user instruction on 2026-06-02 that packet approval surfaces must be human-readable tables, with machine logs kept later or in a handover/log file.
Imported: 2026-05-26.
Review: Validate on the next weekday Accounting Team Updates run.

## Purpose

Packets make Accounting Team Updates triage reviewable and recoverable after context compaction. The packet on disk is run memory; the packet printed in chat is the approval surface.

The approval surface must be written for a human reviewer first. Machine-complete logs, schema payloads, and continuation details may be kept later in the packet or in a linked handover/log file, but they must not be the first thing the operator sees.

This workflow remains separate from `rb-common-tasks-follow-through`.

## Run Folder And Lock

- Use `/private/tmp/rb-accounting-team-updates-triage/<run-id>/`.
- Run ID format: `YYYY-MM-DD-HHMM-accounting-updates`.
- Create `LOCK.md` before stage 1 starts.
- Write `RUN_STATE.md` after every stage with the latest stage, approval state, and next action.
- If a lock already exists, read `LOCK.md`, `RUN_STATE.md`, and the latest `stage-*.md` packet before continuing.
- Never start a new run over an incomplete locked run unless the operator explicitly abandons it.

## Packet Files

Each stage writes:

```text
stage-XX-<short-name>.md
```

Each packet must include:

- run ID;
- stage number and name;
- exact source/query/window used;
- rows or messages considered;
- proposed or completed action;
- owner, reviewer, project, and Slack assignee mention when relevant;
- approval status;
- blockers;
- next stage.

Print the packet content in chat after writing it. Then stop for approval unless the stage is explicitly auto-approved below.

For stages with long machine logs, print only the human approval surface unless the operator explicitly asks to see the log. The disk packet must link any hidden or later log that Stage 4 or a resumed runner needs.

## Stage Execution Contract

Each stage must say exactly what the runner has done or will do next:

- `Inputs read`: files, packets, Notion pages, Slack channels, or linked tasks consulted.
- `Decision method`: skill, process rule, or source evidence used to choose each row action.
- `Rows considered`: every Team Updates blocker/action-point row and every material Slack context item.
- `Proposed action` or `completed action`: exact live write/send/checkpoint when applicable.
- `Approval status`: `auto-approved`, `requires approval`, `approved`, `executed`, or `blocked`.
- `Next stage`: the next packet name and whether it can start automatically.

No stage may rely on implied behavior. If a stage applies another skill, name that skill in the packet.

## Auto-Approval

- Stage 1 - Run Preflight is auto-approved after the packet is written and printed only when the worktree is clean, `git pull origin main` succeeds, and no conflicts appear.
- Stage 2 - Source Context may continue automatically after reads if no routing decisions, Notion writes, Team Updates write-backs, task comments, or Slack sends are made yet.
- Stage 4 - Notion Write Results is approved only after the operator approves Stage 3 Routing Plan or a future explicit auto-approval exception covers the exact write.
- Stage 6 - Slack Send And Run Closeout is approved only after the operator approves the exact Stage 5 Slack Closeout Plan, unless a future explicit standard-closeout auto-approval exception covers the exact send.

Stop despite auto-approval if a packet introduces dirty or conflicted git state, a new destination, broad Slack mention, unresolved owner/project/source meaning/owning operational record/target schema/write-back method, unexpected live mutation, or connector degradation that makes routing unsafe.

## Stage 1 - Run Preflight

Purpose: establish the safe run frame.

Execution:

1. Run `git status --short --branch`.
2. Run `git pull origin main` from the active repo/worktree.
3. If the worktree is dirty before the run, `git pull` fails, or conflicts appear, write the Stage 1 packet as `blocked` and stop for operator direction.
4. Create the run folder and `LOCK.md`.
5. Verify the run date/window and connector availability.
6. Write and print `stage-01-run-preflight.md`.

Required packet fields:

- branch, `git status --short --branch`, and `git pull origin main` result;
- clean/dirty/conflicted worktree assessment and whether Stage 1 may auto-continue;
- run date/window in `Europe/Dublin`;
- Team Updates data source query or fallback search strategy;
- Slack source channels and IDs;
- ChatGPT/Codex/OpenAI/bot-authored message exclusion rule;
- Notion and Slack connector availability;
- approval status: `auto-approved` only for clean/no-conflict preflight, otherwise `blocked`;
- next stage: `Stage 2 - Source Context`.

No Notion write or Slack send is allowed in this stage.

## Stage 2 - Source Context

Purpose: read source material without deciding live mutations.

Execution:

1. Read the current-day Accounting Team Updates page and verify `Team`, `Date`, and company context.
2. Split rows by section.
3. Count `New client inbounds` as observed / out of scope.
4. Read bounded human-authored Slack context from the approved channels and new in-window threads. Use current working day `00:00 Europe/Dublin` through the Stage 1 preflight timestamp unless the operator supplied a narrower source window.
5. Exclude ChatGPT/Codex/OpenAI/bot-authored messages.
6. Write and print `stage-02-source-context.md`.

Required packet fields:

- Team Updates page URL, properties, and section rows;
- exact Notion and per-channel Slack query bounds, including timezone and preflight timestamp;
- `New client inbounds observed / out of scope` count and a short note that inbound routing belongs to `rb-common-tasks-follow-through`;
- relevant human-authored Slack messages and new thread context by channel;
- excluded ChatGPT/Codex/OpenAI/bot-authored messages when material;
- degraded reads or connector gaps;
- approval status: `auto-approved for read-only continuation` when no routing decision is made;
- next stage: `Stage 3 - Routing Plan`.

Do not use the phrase `skipped New client inbounds` in packets or final reports; use `observed / out of scope`.

## Stage 3 - Routing Plan

Purpose: propose all task and write-back decisions before mutation.

Execution:

1. Read `skills/rb-accounting-team-updates-routing/SKILL.md`.
2. Apply that routing skill to the Stage 2 Source Context packet.
3. Split source rows into atomic routing items where one line contains multiple actions.
4. Fetch linked Notion tasks/pages, responsible Company records, client project relations, task-capable operational rows, and target schemas needed to decide ownership, dedupe, project, reviewer, status, due date, and write payloads.
5. Produce a human-readable routing approval table with one decision per atomic blocker/action-point item.
6. For unclear ownership, project, source meaning, owning operational record, target schema, or Team Updates write-back method, add an `unresolved` row with a proposed Team Updates note. Do not write that note in Stage 3.
7. Do not leave a row unresolved only because no existing task or operational row was found. If owner, responsible company/project, source action, and Tasks schema are clear, propose a new task. Every unresolved row must explain why creating a new task is unsafe.
8. Preserve the machine-complete routing fields after the human approval surface or in `stage-03-routing-log.md` / a handover file referenced from `stage-03-routing-plan.md`.
9. Write `stage-03-routing-plan.md`, print only the human approval surface, then stop for approval.

Human approval surface:

- Start with `## Decision Summary`.
- Group rows under `Creates`, `Updates / comments`, `Skips / no action`, and `Unresolved / needs decision`.
- Use a compact table, not one bullet per machine field.
- Required columns: `Source row`, `Source line`, `Decision`, `Target`, `Owner`, `Due`, `Exact action`, `Team Updates write-back`, and `Blocker / approval needed`.
- Keep raw Notion JSON, exact schema property names, dedupe search notes, Slack user IDs, and long source excerpts out of the visible table unless they are needed for approval.
- Link the log/handover file when details are preserved outside the packet.

Machine routing log fields required for every blocker/action point:

- source section and exact line text;
- source row ID and atomic routing item ID;
- checkbox state and linked Notion pages/tasks;
- source entity URL used in routing comments/write-backs; use the Team Updates page URL when no more specific source row or block URL is available;
- relevant Slack source links when they affect routing;
- responsible Company, scope, owning data source, owning row, and project source;
- proposed action: create task, update/comment existing task, skip already handled, or unresolved;
- dedupe evidence;
- create-task safety analysis for every unresolved row;
- assignee, project, reviewer, status, due date, due-date source, and verified Slack assignee mention;
- exact target Notion schema/property names and proposed write payload;
- Team Updates write-back method and text;
- blockers and unresolved decisions.

Any proposed task comment, operational-row update, Team Updates write-back, Slack closeout, or packet text that tells a person an item was routed must include the source entity URL being routed from.

An unresolved decision must include a create-task safety analysis. If the only gap is that no matching active task exists, Stage 3 should propose `create_task` instead of `unresolved`.

Approval is required before any Notion task write, task comment, Team Updates write-back, or source checkbox update.

The packet must explicitly state: `Applied skill: rb-accounting-team-updates-routing`.
The visible routing table must match that skill's `Human Approval Surface` contract. The later or separate machine log must preserve that skill's `Machine Routing Log` contract.
No row may be approved for Stage 4 execution unless its target schema, project source, owner/reviewer fields, and Team Updates write-back method are explicit in the machine log or the row is marked `unresolved` with a concrete create-task unsafe reason.
If the human table and machine log disagree, Stage 4 must stop and return to Stage 3 correction; the operator-approved human table controls the intended action.

## Stage 4 - Notion Write Results

Purpose: execute the approved Stage 3 plan and prove read-back.

Execution:

1. Execute only rows approved in Stage 3.
2. Before writing, reject the approved packet and return to Stage 3 correction if any `unresolved` row lacks a concrete create-task unsafe reason or lists only "no existing task found" as the reason.
3. Create/update/comment tasks, recurring tasks, and operational rows exactly as approved. Do not add ad hoc fields or infer missing properties during execution.
4. For approved `unresolved` rows, write only the approved unresolved note back to the Team Updates page; do not create a task.
5. Write approved task links, operational-row links, comment links, or unresolved notes back to the Team Updates page using the approved write-back method.
6. Read back every task/page/comment/write-back result.
7. Write and print `stage-04-notion-write-results.md`.

Required packet fields:

- approved Stage 3 packet reference;
- created and updated/commented task or operational-row links;
- task or operational-row owner/status/project/reviewer/due-date read-back;
- exact write payload executed for every row;
- Team Updates write-back read-back;
- source checkbox state when changed;
- items not executed and reason;
- next stage: `Stage 5 - Slack Closeout Plan`.

Do not continue to Slack closeout if Notion write-back cannot be verified, unless the packet clearly records the blocker and asks for operator direction.

## Stage 5 - Slack Closeout Plan

Purpose: show the exact Slack message before sending.

Execution:

1. Build the Slack closeout only from verified Stage 4 results.
2. Verify Slack assignee mentions for each created/updated/commented task line.
3. Include `None` under empty Created and Updated / Commented headings.
4. Keep source-line detail and unresolved notes out of Slack except for the approved short unresolved phrase.
5. Block Stage 5 if any assignee mention is unresolved, unless the operator explicitly approves a plain-name no-notification fallback.
6. Write and print `stage-05-slack-closeout-plan.md`, then stop for approval.

Required packet fields:

- destination `#rb-client-updates`;
- exact Slack text;
- Team Updates page link;
- created and updated/commented task hyperlinks;
- assigned-person Slack mentions on each task line;
- Slack mention resolution table for every assignee;
- unresolved-item phrase, if needed;
- approval status: `requires approval`;
- next stage: `Stage 6 - Slack Send And Run Closeout`.

No Slack send is allowed before approval of this exact text unless a future explicit standard-closeout auto-approval exception applies.

## Stage 6 - Slack Send And Run Closeout

Purpose: send the approved Slack closeout and finish the run.

Execution:

1. Send exactly the approved Stage 5 Slack message.
2. Read back the Slack message link.
3. Record any final Team Updates or Communications log links when used.
4. Write and print `stage-06-slack-send-and-run-closeout.md`.
5. Release the lock only after the packet is written and printed.

Required packet fields:

- approved Stage 5 packet reference;
- Slack message link, or send blocker;
- final verification summary;
- preserved scratch packet path;
- final unresolved items;
- lock release status.

Release the lock only after the final packet is written and printed.

## Compaction Recovery

If context is compacted or the run resumes:

1. Read `LOCK.md`.
2. Read `RUN_STATE.md`.
3. Read the latest `stage-*.md` packet.
4. Continue only from the next unapproved or approved-but-unexecuted stage.

Do not rely on conversational memory to reconstruct approved actions.

## Dry-Run Packet Test

Before treating the workflow as stable, run a packet-only pass that:

- writes all six packet files;
- prints each packet in chat;
- marks Stage 1 as auto-approved;
- records `New client inbounds observed / out of scope`;
- stops before live Notion writes without Stage 3 approval;
- stops before Slack send without Stage 5 approval;
- resumes correctly from `RUN_STATE.md` and the latest packet.
