---
name: rb-inbound-operating-triage
description: Master/orchestrator skill for Richmond Blackwood client-speaking inbound triage. Use for daily or ad hoc Gmail/WhatsApp inbound runs; routes capture, classification, finance, task/correspondence, closeout preview, and approval/send/logging through narrower RB skills.
---

# RB Inbound Operating Triage

Use this as the master skill for client-speaking inbound triage. It owns the flow, gates, and routing contract; it should not carry out every specialist step itself.

## Required Context

1. Read `processes/inbound-operating-triage.md`.
2. Read automation memory for last-run checkpoints, canonical reports, blockers, and human-reviewed exceptions.
3. Load phase skills in this order:
   - `skills/rb-inbound-capture/SKILL.md`
   - `skills/rb-inbound-classify/SKILL.md`
   - `skills/rb-inbound-finance-routing/SKILL.md` when an item is finance-like.
   - `skills/rb-inbound-task-correspondence/SKILL.md` when an item is task/correspondence-like.
   - `skills/rb-inbound-closeout/SKILL.md` when a Slack closeout preview is needed.
4. Load supporting skills only when a phase requires them:
   - Gmail/email replies: `skills/rb-gmail-drafts/SKILL.md`.
   - WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
   - File upload/export/attachment: `skills/rb-file-uploads/SKILL.md`.
   - Approval, send, and RB Communications logging: `skills/rb-communications/SKILL.md`.
   - Owner routing: `internal/people-roles.md`.

## Orchestrator Flow

1. **Capture** with `rb-inbound-capture`.
   - Read Gmail inbox first and WhatsApp by saved/topic checkpoints.
   - Produce a source ledger only. Do not write Notion, Drive, Gmail labels, WhatsApp checkpoints, or Slack from the capture phase.

2. **Classify** with `rb-inbound-classify`.
   - Every captured item must become exactly one primary class: `verified-no-op`, `finance`, `task-correspondence`, `blocker`, `approval-required`, or `out-of-scope`.
   - `ignore` means verified no-op, not uncertainty. Unclear items are blockers.

3. **Route each item from the classified ledger**.
   - If it is an invoice, receipt, expense, payment notice, payment failure, supplier invoice, contractor invoice, or recurring client invoicing item, route it to `rb-inbound-finance-routing`.
   - If it is correspondence, a document to file, a client/counterparty request, or an RB-owned commitment, route it to `rb-inbound-task-correspondence`.
   - If it is `verified-no-op`, record the reason in the run ledger and apply the channel completion marker only after verification.
   - If it is a `blocker`, create/update the correct blocker only when the destination and owner are clear; otherwise stop and ask.
   - If it requires outbound communication, Slack closeout, signature sends/cancellations, app drafts, irreversible changes, or sensitive status moves, add it to the batch approval packet.

4. **Verify before completion markers**.
   - Apply Gmail `Triaged` only after the item is saved/updated, blocked with clear owner/action, or verified no-op.
   - Advance WhatsApp checkpoints only after inspected topic chunks are handled.
   - Read back Notion/Drive/source writes before reporting completion.

5. **Closeout preview** with `rb-inbound-closeout`.
   - Build the Slack-ready preview only from the verified run ledger.
   - Do not send, draft, schedule, or log Slack from the closeout skill.

6. **Approval, send, and log** with `rb-communications`.
   - Show destination, sending identity, and exact rendered message.
   - Send an actual Codex approval request. If unavailable, ask in chat or use the approved local dialog fallback.
   - Send Slack only after explicit per-message approval, then verify the message link and log in RB Communications.

## Hard Gates

- Do not treat Slack, signatures, Drive folders, Notion, SignNow, status systems, or other tools as inbound channels.
- Do not create a task or Correspondence record just because a source exists.
- Do not create per-invoice or per-expense payment tasks.
- Do not let finance items pass to task/correspondence handling unless they contain a separate non-finance operational request.
- Do not label Gmail `Triaged` or advance WhatsApp checkpoints until the routed handler has verified completion.
- Do not send Slack without explicit per-message approval.
- Do not call a Slack closeout `corrected` unless a previously sent Slack closeout is being replaced or superseded.

## Final Report

Return:

- sources checked and completion markers advanced;
- items captured and routed by class;
- records/files/tasks created or updated;
- source items labelled `Triaged` or intentionally left unlabelled;
- WhatsApp checkpoint changes;
- approval packet items and approval/send/log status;
- Slack message and RB Communications links if sent;
- blockers and next owner/action/date.
