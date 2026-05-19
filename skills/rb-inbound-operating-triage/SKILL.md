---
name: rb-inbound-operating-triage
description: Master/orchestrator skill for Richmond Blackwood client-speaking inbound triage. Use for daily or ad hoc Gmail/WhatsApp inbound runs; routes capture, classification, finance, task/correspondence, closeout preview, and approval/send/logging through narrower RB skills.
---

# RB Inbound Operating Triage

Use this as the master skill for client-speaking inbound triage. It owns the flow, gates, and routing contract; it should not carry out every specialist step itself.

## Required Context

1. Read automation memory for last-run checkpoints, canonical reports, blockers, and human-reviewed exceptions.
2. Load phase skills in this order:
   - `skills/rb-inbound-capture/SKILL.md`
   - `skills/rb-inbound-classify/SKILL.md`
   - `skills/rb-inbound-finance-routing/SKILL.md` when an item is finance-like.
   - `skills/rb-inbound-task-correspondence/SKILL.md` when an item is task/correspondence-like.
   - `skills/rb-inbound-closeout/SKILL.md` when a Slack closeout preview is needed.
3. Load supporting skills only when a phase requires them:
   - Gmail/email replies: `skills/rb-gmail-drafts/SKILL.md`.
   - WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
   - File upload/export/attachment: `skills/rb-file-uploads/SKILL.md`.
   - Approval, send, and RB Communications logging: `skills/rb-communications/SKILL.md`.
   - Owner routing: `internal/people-roles.md`.
4. Use `processes/inbound-operating-triage.md` as reference only when a phase needs detailed rules such as finance matching, recurring invoicing, correspondence filing, or Slack closeout formatting. Do not copy the whole process into the run plan.

## Daily Automation Contract

- Default window: `08:00 Europe/Dublin` on the previous working day through `08:00 Europe/Dublin` on the run day. If the run day is Monday, start from the previous Friday at `08:00 Europe/Dublin`.
- Inbound sources are Gmail inbox first, then saved or explicitly configured WhatsApp client checkpoints/topic queries. Slack, Notion, Drive, SignNow, status systems, and files are supporting systems, not inbound channels.
- Every source item must pass through capture, classification, routed handling, verification, and only then source completion markers.
- `approval_required` is a separate gate, not a route class. Safe writes happen first; outbound sends and sensitive actions wait for explicit approval.
- Slack closeouts are never pre-authorized. Render the exact message in Codex, request approval through the Codex approval flow, send only after approval, verify the Slack link, and log the sent message in RB Communications.
- If no actionable items, no records changed, and no verified existing match is worth reporting, do not post Slack; return a concise no-op report.

## Orchestrator Flow

1. **Capture** with `rb-inbound-capture`.
   - Read Gmail inbox first and WhatsApp by saved/topic checkpoints.
   - Produce a source ledger only. Do not write Notion, Drive, Gmail labels, WhatsApp checkpoints, or Slack from the capture phase.

2. **Classify** with `rb-inbound-classify`.
   - Every captured item must become exactly one primary route class: `verified-no-op`, `finance`, `task-correspondence`, `blocker`, or `out-of-scope`.
   - Mark `approval_required` separately for outbound communication, Slack closeout, app/software drafts, signature actions, irreversible/sensitive moves, or other operator-gated actions.
   - `ignore` means verified no-op, not uncertainty. Unclear items are blockers.

3. **Route each item from the classified ledger**.
   - If it is an invoice, receipt, expense, payment notice, payment failure, supplier invoice, contractor invoice, or recurring client invoicing item, route it to `rb-inbound-finance-routing`.
   - If it is correspondence, a document to file, a client/counterparty request, or an RB-owned commitment, route it to `rb-inbound-task-correspondence`.
   - If it is `verified-no-op`, record the reason in the run ledger and apply the channel completion marker only after verification.
   - If it is a `blocker`, create/update the correct blocker only when the destination and owner are clear; otherwise stop and ask.
   - If the routed item also has `approval_required`, add the exact proposed action to the batch approval packet after safe verified writes. Do not let approval-required status replace the item's finance or task/correspondence route.

4. **Verify before completion markers**.
   - Apply Gmail `Triaged` only after the item is saved/updated, blocked with clear owner/action, or verified no-op.
   - Advance WhatsApp checkpoints only after inspected topic chunks are handled.
   - Read back Notion/Drive/source writes before reporting completion.

5. **Closeout preview** with `rb-inbound-closeout`.
   - Build the Slack-ready preview only from the verified run ledger.
   - Do not send, draft, schedule, or log Slack from the closeout skill.

6. **Approval, send, and log** with `rb-communications`.
   - Show destination, sending identity, and exact rendered message.
   - Send an actual Codex approval request. If unavailable, stop and report Slack as unsent/approval-blocked.
   - Send Slack only after explicit per-message approval, then verify the message link and log in RB Communications.

## Hard Gates

- If a required phase skill is missing, stop and report the missing skill instead of falling back to a long prompt or inventing a replacement workflow.
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
