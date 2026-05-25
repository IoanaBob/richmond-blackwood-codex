# Stage Packet Protocol

Status: provisional.
Source: user-approved common-tasks follow-through redesign.
Imported: 2026-05-19.
Review: Validate on the next corrective run from 2026-05-18.

## Purpose

Packets make each stage reviewable and recoverable after context compaction. The packet on disk is the run memory. The packet printed in chat is the approval surface.

## Run Folder And Lock

- Use `/private/tmp/rb-common-tasks-follow-through/<run-id>/`.
- Run ID format: `YYYY-MM-DD-HHMM-<short-window-label>`.
- Create `LOCK.md` before stage 1 starts.
- If a lock already exists, read `RUN_STATE.md` and the latest packet before continuing.
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
- rows considered;
- proposed or completed action;
- owner, company, individual, and project fields when relevant;
- approval status;
- blockers;
- next stage.

Print the packet content in chat after writing it. Then stop and ask for approval or modifications unless the stage is explicitly listed as auto-approved below.

## Auto-Approval Exceptions

The operator approved these standing exceptions on 2026-05-20, amended on 2026-05-21 for Slack source-message triage markers and on 2026-05-22 for bounded Stage 15 media/evidence cleanup:

- Stage 1 - Run Preflight: write and print the packet, then continue automatically.
- Stage 2 - Open Task Inventory: write and print the packet, then continue automatically. If inventory is degraded, the packet must say so, but the run may proceed with degraded inventory unless the degradation blocks safe routing.
- Stage 10 - Source Marker Plan: write and print the packet, then proceed to Stage 11 automatically when proposed markers are limited to Gmail labels, WhatsApp checkpoints, and Slack source-message markers covered by the approved workflow. Slack source-message markers mean only the `📝` / `:memo:` reaction on the source message plus a thread reply linking the approved task/record destination.
- Stage 11 - Source Marker Results: apply the Stage 10 source markers, write and print the packet, then proceed to Stage 12 automatically unless marking fails, a checkpoint blocker needs operator review, or a Slack marker would exceed the limited source-marker pattern.
- Stage 13 - Slack Send And Log Results: once the operator approves the exact Stage 12 Slack message for sending, Stage 13 is approved. Send the exact message, log it, write and print the packet.
- Stage 14 - Run Closeout: after successful Stage 13, write and print the closeout packet, release the lock, and preserve scratch packets by default.
- Stage 15 - Post-Closeout Media Evidence Cleanup: after Stage 14, automatically recover/read already-identified media, upload to already-resolved Drive destinations, attach evidence, update owning Communications, write and print the plan/results/readback packet, and update memory, but only for blockers listed in Stage 14 and only when no new business judgment or destination choice is required.

Auto-approval does not waive mutation safety outside the named stage scope. If a packet introduces a Notion write, source mutation, reply send, file upload, Slack destination, broad mention, Slack source-thread content beyond triage destination links/status, or data source not already covered by that stage's auto-approved contract, stop for operator approval.

## Mutation Rule

No live write, send, label, checkpoint, file upload, status change, or Slack post happens merely because a packet exists.

The operator must approve the exact next action packet unless the stage is covered by the auto-approval exceptions. Approval for Stage 12 Slack send text approves Stage 13 send/log and Stage 14 closeout only for that exact Slack message and normal closeout actions. Stage 15 does not need separate approval when it is limited to already-identified Stage 14 evidence/media blockers and already-resolved destinations.

Stage 15 must stop for approval before any reply/send, source marker/checkpoint, new task, new Expense/Invoicing/Communication row, new Drive destination, disputed task relation, unresolved client subject mapping, or business-judgment decision.

## Compaction Recovery

If context is compacted or the run resumes:

1. Read `LOCK.md`.
2. Read `RUN_STATE.md`.
3. Read the latest `stage-*.md` packet.
4. Continue only from the next unapproved or approved-but-unexecuted stage.

Do not rely on conversational memory to reconstruct already-approved actions.

## Packet Cleanup

Do not delete scratch packets until Stage 14 is complete, or until Stage 15 is complete when post-closeout cleanup runs. Preserve scratch packets by default for audit/recovery. Delete them only when the operator explicitly asks for cleanup after the final closeout/cleanup. At run closeout, either:

- preserve the scratch folder and record the path in the final packet, or
- delete it only after explicit cleanup instruction.

## Approval Language

Ask for approval with the exact next stage name and action. Do not ask broad approval such as "continue the run" when the next stage includes writes or sends.

## Dry-Run Packet Test Checklist

Before approving the workflow as stable, run a dry packet-only pass that covers:

- spam/no-action communication logged complete with no company relation;
- client letter in email with `Contains Letter`, `Letter Source`, document, and company relation;
- forwarded letter where `Letter Source` differs from the email forwarder;
- contract-backed invoice routed to Invoicing rather than Expenses;
- non-contract expense routed to Expenses;
- communication that closes an existing task-capable row;
- reply needed now with exact proposed reply;
- reply snoozed with `Reply Snoozed Until`;
- previously `Triaged` Gmail item from `2026-05-18 00:00 Europe/Dublin` included in the corrective packet.
- Slack source message already routed to an approved task or record, with Stage 10 proposing `📝` plus exact thread reply and Stage 11 recording the resulting Slack marker URL/status.
