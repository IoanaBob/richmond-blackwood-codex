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

## Auto-Approval

- Stage 1 - Run Preflight is always auto-approved after the packet is written and printed.
- Stage 2 - Source Context may continue automatically after reads if no routing decisions, Notion writes, Team Updates write-backs, task comments, or Slack sends are made yet.
- Stage 4 - Notion Write Results is approved only after the operator approves Stage 3 Routing Plan or a future explicit auto-approval exception covers the exact write.
- Stage 6 - Slack Send And Run Closeout is approved only after the operator approves the exact Stage 5 Slack Closeout Plan, unless a future explicit standard-closeout auto-approval exception covers the exact send.

Stop despite auto-approval if a packet introduces a new destination, broad Slack mention, unresolved owner/project, unexpected live mutation, or connector degradation that makes routing unsafe.

## Stage 1 - Run Preflight

Purpose: establish the safe run frame.

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

## Stage 4 - Notion Write Results

Purpose: execute the approved Stage 3 plan and prove read-back.

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
