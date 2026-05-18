---
name: rb-inbound-closeout
description: Generate the Slack-ready Richmond Blackwood inbound triage closeout preview from the verified run ledger. Use after capture, classification, finance routing, and task/correspondence handling are complete; this skill never sends Slack.
---

# RB Inbound Closeout

Use this phase to generate the Slack closeout preview only. Sending, approval, and RB Communications logging belong to `rb-communications`.

## Inputs

- Verified run ledger.
- Human window label.
- Slack destination, normally `#rb-client-updates`.
- Slack user mappings for active task owners.

## Hard Rules

- Do not send, draft, schedule, or log Slack.
- Build only from verified ledger rows, not memory.
- Use a human window label such as `Friday-to-Monday`, `Friday 15 May to Monday 18 May`, or `today's`. Do not use raw timestamp ranges in the Slack opener.
- Do not call the closeout `corrected` unless replacing or superseding a Slack closeout that was actually sent.
- Include current Notion task status in every task row.
- Tag active task assignees when Slack ID is known.
- If a finance section is empty, omit the finance owner tag in the heading.
- If a section has no rows, keep the heading and write `- None`.
- Do not include substantive client advice, promises, or sensitive context unless explicitly approved.

## Required Shape

```text
I've finished the <human window label> inbound triage pass. I read the correspondence contents, added translated/read notes, added tasks, and routed the tasks to the right owners.

New Correspondence
- <name>: <Correspondence link> / <Task link> - assigned to <@owner>

New expenses <@U0ALBF770E8>
- <expense name link>

Received invoices <@U0ALBF770E8>
- <invoice or finance blocker link>

New tasks
- <task link> - Status: <status> - assigned to <@owner>

Updated tasks
- <task link> - Status: <status> - <short update> - assigned to <@owner when active>

Blocked / left open
- <source/record> - <reason>
```

## Approval Handoff

After rendering the preview, hand off to `rb-communications`:

- Destination.
- Sending identity.
- Exact rendered message.
- Approval status: pending.

Do not ask for approval from this skill unless `rb-communications` is unavailable; the communications skill owns the permission/send/log sequence.
