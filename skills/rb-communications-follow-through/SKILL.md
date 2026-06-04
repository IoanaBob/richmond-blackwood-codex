---
name: rb-communications-follow-through
description: Use when moving Richmond Blackwood Communications rows forward from the canonical Notion Communications database, including logging cleanup, evidence attachment, reply planning, approved email/Slack/WhatsApp sends, linked task updates, and verified closeout.
---

# RB Communications Follow-Through

Use this skill for focused follow-through on existing Richmond Blackwood Communications rows. It is row-led: start from canonical Communications records, then read only the source context needed to move those rows forward.

This skill does not replace `rb-common-tasks-follow-through`. Use `rb-common-tasks-follow-through` for broad daily Gmail/WhatsApp discovery across task-capable RB Client Databases. Use this skill when the work is to advance known Communications rows.

## Load Order

Before live work, read the executable stage contract first:

1. `references/stage-packet-protocol.md`.
2. `processes/communications.md`.
3. `skills/rb-communications/SKILL.md`.
4. `skills/rb-common-tasks-follow-through/references/rb-client-database-task-registry.md` when a Communication may create or update task-capable rows.

Load only when needed:

- Email sends or Gmail-backed replies: `skills/rb-gmail-drafts/SKILL.md`.
- WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
- Evidence upload, attachment, or translation file handling: `skills/rb-file-uploads/SKILL.md`.
- Form or questionnaire handling: `skills/rb-form-fill-assist/SKILL.md`.
- Owner routing: `internal/people-roles.md`.

## Operating Contract

- Follow the six-stage packet workflow in `references/stage-packet-protocol.md`; that file is the stage-local checklist. Do not infer Stage 2 inventory, Stage 4 action-packet, Stage 5 mutation, or Stage 6 readback details from this summary.
- Canonical Communications database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`; data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`.
- Do not write new RB records to old `RB Communications` at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.
- Stage 1 must fetch the live Communications schema/status options. Use only live fields returned by that fetch, and do not change the schema inside this skill.
- Current complete statuses are `Done` and `Archived`. Open statuses are `Captured`, `Needs Triage`, `Drafting`, `Follow-Up`, and `Needs Reply`; if live schema differs, record the live mapping in the packet before any write.
- Keep runs row-led. Do not run broad Gmail, Slack, WhatsApp, Drive, or Notion discovery outside selected Communications rows.
- No live Notion write, file upload/attachment, task update, Gmail/Slack/WhatsApp send, source marker, or status change happens until the operator approves the exact Stage 5 action packet.
- Complete Notion inventory rules live in `processes/notion-operations.md`; do not duplicate current connector names, backend-error advice, or pagination recipes here.
- Resolve the human workspace actor from `RB_WORKSPACE_ACTOR`, legacy `RB_CODEX_ACTOR`, or explicit run instruction plus `internal/people-roles.md`. Google personas, Gmail mailboxes, and sender identities are auth/source/send routes only, not the active actor.
- For email, show the full outbound preview before approval: operator, source mailbox(es), exact `From`, to/cc/bcc, subject, source/reply thread, attachments, and body. Default client-facing sender is `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- Use supported Gmail connector, MCP, or approved API routes for sends. Software drafts are exception-only and require explicit operator approval.
- A document Communication is `Done` only when required source evidence is attached in `Document(s)`, required translation output is attached in `Translated Doc(s)`, and `Notes` contains a useful summary.
- If a Communication's reply state, evidence state, owner, blocker, or snooze changes, Stage 4/5 must also propose and execute the linked task or operational-row comment/status update where supported.
- Update `memory/skill-runs.md` only when the run changed durable repo memory, helper behavior, process rules, or skill files. Do not write raw source content into memory.

## Stage Flow

Run the packet workflow from `references/stage-packet-protocol.md`:

1. Preflight.
2. Communications Inventory.
3. Context Read.
4. Action Packet.
5. Execute Approved Actions.
6. Readback And Closeout.

Every stage writes a Markdown packet under `/private/tmp/rb-communications-follow-through/<run-id>/`, prints the same packet in chat, and stops for approval unless the protocol explicitly says the stage is read-only or already approved.
