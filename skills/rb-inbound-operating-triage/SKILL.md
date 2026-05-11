---
name: rb-inbound-operating-triage
description: Use when running Richmond Blackwood inbound operating triage across Gmail, Slack, WhatsApp, Notion, signing/status systems, Drive/Docs, Calendar, DocSend, HubSpot, or other channels to match signals to active work, safely update records/tasks, and batch approval-required actions.
---

# RB Inbound Operating Triage

Use this skill for generalized inbound triage. The goal is to move active work forward from verified inbound signals, not to summarize channels for their own sake.

## Required Context

1. Read `processes/inbound-operating-triage.md`.
2. Read automation memory for last-run checkpoints, canonical reports, blockers, and human-reviewed exceptions.
3. Load channel-specific skills only when the run needs that channel:
   - Gmail/email: `skills/rb-gmail-drafts/SKILL.md` for sender/thread rules.
   - Slack: Slack connector/skill guidance for reads or approved sends.
   - WhatsApp: `skills/rb-whatsapp-comms/SKILL.md`; saved-chat monitoring follows client checkpoints only.
   - Signatures: `skills/rb-signature-status-sync/SKILL.md` for evidence gating.
   - Files: `skills/rb-file-uploads/SKILL.md` for Drive/Notion file handling.
4. Read `internal/people-roles.md` when assigning newly created client-inbound tasks.

## Run Workflow

1. **Build global active index**:
   - open Notion Tasks across clients/general RB work;
   - active client projects and relevant company/individual records;
   - open RB Communications follow-ups;
   - active source records tied to onboarding, signatures, approvals, contracts, evidence, finance, correspondence, settlement, or follow-up.
2. **Read channel windows**:
   - Gmail: unhandled/new inbound; label `Triaged` only after handling succeeds.
   - Slack: configured channels, task-linked threads, or user-requested context since last successful run/checkpoint.
   - WhatsApp: saved client chat checkpoints only; no backfill unless requested.
   - Notion: task comments/status changes and open Communications follow-ups.
   - SignNow/status systems, Drive/Docs/files, Calendar/calls, DocSend/HubSpot: only when linked to active work or inbound status.
3. **Classify each inbound item** as no-op, task update, new task, Correspondence, Expense/Invoicing, blocker, or approval-required action.
4. **Perform safe direct writes** after verification:
   - task comments/creation;
   - Correspondence, Expense/Invoicing, Communications, and source-record updates;
   - file links/attachments where destination is verified;
   - labels/checkpoints only after required handling succeeds.
5. **Prepare one batch approval packet** for outbound messages, Slack/channel overview posts that are not explicitly pre-authorized, app drafts, signature sends/cancellations, final signed-package distribution, irreversible changes, and sensitive/high-impact status moves.
6. **Execute only approved packet items**, verify results, then produce the final report.

## Task Handling

- For client requests with no document/correspondence artifact, do not create a Correspondence row just to have one.
- Search the relevant client project first; comment on the matching task with source context and next step.
- If no task matches and RB action is required, create one task in the client project with source link/message ID, owner, priority, status, and due date when known.
- If company, individual, supplier, contract, owner, or project is ambiguous, create/update a blocked task with the exact decision needed instead of guessing.
- Do not proactively chase every stale task in this v1 workflow; move tasks only when inbound/status evidence or an obvious active-work match triggers action.

## Finance And Correspondence Rules

- Do not create per-invoice or per-expense payment tasks.
- De-duplicate finance records by source message ID, invoice/receipt number, supplier + amount + date, and unique reference.
- Expense records need verified `Receipt / Invoice` evidence or a clear blocker/human-uploaded-file note before completion.
- Contractor invoices under active contracts go to Invoicing linked to Contract and Company, not Expenses.
- Routine invoices/receipts/payment reminders are not Correspondence unless they include separate non-invoice operational requests.
- File true correspondence documents in the verified client Drive/Notion destination and link them back to task/source context.

## Edge Cases

- Company-specific edge cases live in `clients/Companies/<Reference>/edge-cases.md`.
- Do not scan every company folder; open only exact entries whose trigger matches.
- Current hook: for Workhub / Stein Commercial / Camden Street invoice-like items, open `clients/Companies/RBL/edge-cases.md` starting at `## Workhub Invoice Validation`.

## Approval Packet Format

Use stable IDs:

```text
APPROVAL-1
Type:
Source:
Action:
Recipient/Destination:
Sending identity:
Exact content / status change:
Files:
Verification after approval:
Risk / reason approval is required:
```

Ask once for approval of the whole packet or specific item IDs. Do not send, draft, cancel, distribute, or make irreversible/sensitive changes outside the approved IDs.

## Final Report

Return:

- channels checked and completion markers advanced;
- active work matched;
- tasks created/commented/updated/blocked;
- records/files created or updated;
- approval packet items and what was approved/executed/skipped;
- outbound links or message IDs actually sent after approval;
- same-day nudges suppressed;
- blockers and next owner/action/date.
