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

The operator approved these standing exceptions on 2026-05-20, with bounded Stage 15 cleanup added on 2026-05-22:

- Stage 1 - Run Preflight: run `git pull origin main` from the active repo/worktree before creating the run folder/lock, write and print the packet with the branch and pull result, then continue automatically if the pull succeeded and there are no conflicts.
- Stage 2 - Open Task Inventory: write and print the packet, then continue automatically. If inventory is degraded, the packet must say so, but the run may proceed with degraded inventory unless the degradation blocks safe routing.
- Stage 10 - Source Marker Plan: write and print the packet, then proceed to Stage 11 automatically when proposed markers are limited to Gmail labels and WhatsApp checkpoints covered by the approved workflow.
- Stage 11 - Source Marker Results: apply the Stage 10 source markers, write and print the packet, then proceed to Stage 12 automatically unless marking fails or a checkpoint blocker needs operator review.
- Stage 13 - Slack Send And Log Results: once the operator approves the exact Stage 12 Slack message for sending, Stage 13 is approved. Send the exact message, log it, write and print the packet.
- Stage 14 - Run Closeout: after successful Stage 13, write and print the closeout packet, release the lock, and preserve scratch packets by default.
- Stage 15 - Post-Closeout Media Evidence Cleanup: after Stage 14, automatically recover/read already-identified media, upload to already-resolved Drive destinations, attach evidence, update owning Communications, write and print the plan/results/readback packet, and update memory, but only for blockers listed in Stage 14 and only when no new business judgment or destination choice is required.

Auto-approval does not waive mutation safety outside the named stage scope. If a packet introduces a new Notion write, source mutation, reply send, file upload, Slack destination, broad mention, or data source not already covered by the stage contract, stop for operator approval.

## Mutation Rule

No live write, send, label, checkpoint, file upload, status change, or Slack post happens merely because a packet exists.

The operator must approve the exact next action packet unless the stage is covered by the auto-approval exceptions. Approval for Stage 12 Slack send text approves Stage 13 send/log and Stage 14 closeout only for that exact Slack message and normal closeout actions.

Stage 15 does not need separate approval when limited to already-identified Stage 14 evidence/media blockers and already-resolved destinations. Stage 15 must stop for approval before any reply/send, source marker/checkpoint, new task, new Expense/Invoicing/Communication row, new Drive destination, disputed task relation, unresolved client subject mapping, or business-judgment decision.

## Stage 12 Slack Format Gate

Before Stage 12 can request send approval, the packet must include a Slack-format checklist:

- Ioana-approved template source, section labels, and ordering used without improvisation.
- Every Communication, task, invoice, expense, filing, contract, blocker, or operational row reference is a named link; manual-post payloads use Slack-native `<url|label>` links.
- Every responsible person on an action/update line has a resolved Slack mention (`<@USERID>`).
- Mention-resolution table lists every responsible person, Slack ID, and resolution source.
- No bare responsible-person names remain in the final Slack payload unless the operator explicitly approved a no-notification fallback for that exact person and message.
- No background Gmail label, source-marker, checkpoint, packet, or Codex-process mechanics appear in the Slack body.

If any required link or mention cannot be resolved, write and print a blocker packet instead of asking for send approval.

## Compaction Recovery

If context is compacted or the run resumes:

1. Read `LOCK.md`.
2. Read `RUN_STATE.md`.
3. Read the latest `stage-*.md` packet.
4. Continue only from the next unapproved or approved-but-unexecuted stage.

Do not rely on conversational memory to reconstruct already-approved actions.

## Packet Cleanup

Do not delete scratch packets until Stage 14 is complete, or until Stage 15 is complete when post-closeout cleanup runs. Preserve scratch packets by default for audit/recovery. Delete them only when the operator explicitly asks for cleanup after the final closeout. At run closeout, either:

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
