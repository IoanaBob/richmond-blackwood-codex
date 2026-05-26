# Accounting Team Updates Stage Packet Protocol

Status: provisional.
Source: user instruction to make Accounting Team Updates triage packet-based, modelled on `rb-common-tasks-follow-through`.
Imported: 2026-05-26.
Review: Validate on the next weekday Accounting Team Updates run.

## Purpose

Packets make Accounting Team Updates triage reviewable and recoverable after context compaction. The packet on disk is run memory; the packet printed in chat is the approval surface.

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

- Stage 1 - Run Preflight is always auto-approved after the packet is written and printed.
- Stage 2 - Source Context may continue automatically after reads if no routing decisions, Notion writes, Team Updates write-backs, task comments, or Slack sends are made yet.
- Stage 4 - Notion Write Results is approved only after the operator approves Stage 3 Routing Plan or a future explicit auto-approval exception covers the exact write.
- Stage 6 - Slack Send And Run Closeout is approved only after the operator approves the exact Stage 5 Slack Closeout Plan, unless a future explicit standard-closeout auto-approval exception covers the exact send.

Stop despite auto-approval if a packet introduces a new destination, broad Slack mention, unresolved owner/project/source meaning/owning operational record, unexpected live mutation, or connector degradation that makes routing unsafe.

## Stage 1 - Run Preflight

Purpose: establish the safe run frame.

Execution:

1. Run `git status --short --branch`.
2. Run `git pull origin main` from the active repo/worktree.
3. Create the run folder and `LOCK.md`.
4. Verify the run date/window and connector availability.
5. Write and print `stage-01-run-preflight.md`.

Required packet fields:

- branch, `git status --short --branch`, and `git pull origin main` result;
- run date/window in `Europe/Dublin`;
- Team Updates data source query or fallback search strategy;
- Slack source channels and IDs;
- ChatGPT/Codex/OpenAI/bot-authored message exclusion rule;
- Notion and Slack connector availability;
- approval status: `auto-approved`;
- next stage: `Stage 2 - Source Context`.

No Notion write or Slack send is allowed in this stage.

## Stage 2 - Source Context

Purpose: read source material without deciding live mutations.

Execution:

1. Read the current-day Accounting Team Updates page and verify `Team`, `Date`, and company context.
2. Split rows by section.
3. Count `New client inbounds` as observed / out of scope.
4. Read bounded human-authored Slack context from the approved channels and new in-window threads.
5. Exclude ChatGPT/Codex/OpenAI/bot-authored messages.
6. Write and print `stage-02-source-context.md`.

Required packet fields:

- Team Updates page URL, properties, and section rows;
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
3. Fetch linked Notion tasks/pages needed to decide ownership, dedupe, project, and reviewer fields.
4. Produce a routing table with one decision per blocker/action-point row.
5. For unclear ownership, project, source meaning, or owning operational record, add an `unresolved` row with a proposed Team Updates note. Do not write that note in Stage 3.
6. Write and print `stage-03-routing-plan.md`, then stop for approval.

Required packet fields for every blocker/action point:

- source section and exact line text;
- checkbox state and linked Notion pages/tasks;
- relevant Slack source links when they affect routing;
- proposed action: create task, update/comment existing task, skip already handled, or unresolved;
- dedupe evidence;
- assignee, project, reviewer, and Slack assignee mention;
- Team Updates write-back text;
- blockers and unresolved decisions.

Approval is required before any Notion task write, task comment, Team Updates write-back, or source checkbox update.

The packet must explicitly state: `Applied skill: rb-accounting-team-updates-routing`.
The routing table columns must match that skill's `Output Table` contract.

## Stage 4 - Notion Write Results

Purpose: execute the approved Stage 3 plan and prove read-back.

Execution:

1. Execute only rows approved in Stage 3.
2. Create/update/comment tasks and existing pages exactly as approved.
3. For approved `unresolved` rows, write only the approved unresolved note back to the Team Updates page; do not create a task.
4. Write approved task links or unresolved notes back to the Team Updates page.
5. Read back every task/page/comment/write-back result.
6. Write and print `stage-04-notion-write-results.md`.

Required packet fields:

- approved Stage 3 packet reference;
- created and updated task links;
- task owner/status/project/reviewer read-back;
- Team Updates write-back read-back;
- source checkbox state when changed;
- items not executed and reason;
- next stage: `Stage 5 - Slack Closeout Plan`.

Do not continue to Slack closeout if Notion write-back cannot be verified, unless the packet clearly records the blocker and asks for operator direction.

## Stage 5 - Slack Closeout Plan

Purpose: show the exact Slack message before sending.

Execution:

1. Build the Slack closeout only from verified Stage 4 results.
2. Resolve Slack assignee mentions for each created/updated task line.
3. Include `None` under empty Created/Updated headings.
4. Keep source-line detail and unresolved notes out of Slack except for the approved short unresolved phrase.
5. Write and print `stage-05-slack-closeout-plan.md`, then stop for approval.

Required packet fields:

- destination `#rb-client-updates`;
- exact Slack text;
- Team Updates page link;
- created and updated task hyperlinks;
- assigned-person Slack mentions on each task line;
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
