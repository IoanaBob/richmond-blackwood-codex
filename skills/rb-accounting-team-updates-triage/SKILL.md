---
name: rb-accounting-team-updates-triage
description: "Use for the separate packet-gated Richmond Blackwood weekday 11:00 Accounting Team Updates run that reads the current working day's Team Updates page plus bounded human Slack context, treats New client inbounds as observed/out of scope, creates or updates Notion tasks from blockers and action points, and posts the standard Slack completion notice."
---

# RB Accounting Team Updates Triage

Use this skill only for the separate Accounting Team Updates automation. It is not an inbound-reading workflow and must not be folded into `rb-common-tasks-follow-through`.

## Required Context

1. Read `processes/accounting-team-updates-triage.md`.
2. Read `processes/notion-operations.md` for Notion task and comment rules.
3. Read `internal/people-roles.md` before assigning tasks.
4. Read `references/stage-packet-protocol.md` and run the automation through packet stages. Packet mode is mandatory.
5. During Stage 3, read and apply `skills/rb-accounting-team-updates-routing/SKILL.md` to produce the routing plan. That skill is planning-only and must not perform live writes.
6. Use the Slack connector to read only the bounded source channels listed below and to send the standard completion notice. Exclude ChatGPT/Codex/bot-authored messages from source analysis.
7. Use the Notion connector for Team Updates and Tasks reads/writes. If the needed Notion query, page edit/comment, or task write is unavailable, stop and report the exact blocker.
8. Any non-standard Slack wording must follow `processes/communications.md` and `skills/rb-communications/SKILL.md`.

## Packet Workflow

Packet mode is required. Use `/private/tmp/rb-accounting-team-updates-triage/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Each packet must be written to disk and printed in chat before moving on.

The exact packet filenames, required fields, and recovery rules are defined in `references/stage-packet-protocol.md`; do not restate the full protocol here.

Shared gates:

- No Notion task write, Team Updates write-back, or task comment happens before Stage 3 Routing Plan approval.
- No Slack send happens before Stage 5 exact-message approval, unless a future explicit standard-closeout auto-approval is added.
- Stop despite auto-approval if a packet introduces dirty or conflicted git state, a new destination, broad Slack mention, unresolved owner/project/source meaning/owning operational record/target schema/write-back method, unexpected live mutation, or connector degradation that makes routing unsafe.

### Stage 1 - Run Preflight

Source scope:

- Team Updates database: `https://www.notion.so/1e4e413013148065a944d94dc14c6ddf`
- Team Updates data source: `collection://1e4e4130-1314-8090-9cd7-000b1c19d92f`
- Filter for `Team = Accounting`.
- Use the `Date` property for the current working day in `Europe/Dublin`; page title wording is not authoritative.

Slack context:

- `#rb-client-updates` (`C0B1UTJJDLJ`)
- `#rb-operations` (`C0AMJHHHAKY`)
- `#rb-structuring` (`C0AMDDTNSFL`)
- `#all-richmond-blackwood` (`C0ALBMSLL5A`)

Auto-approval:

- Stage 1 is auto-approved after its packet is written and printed only when the worktree is clean, `git pull origin main` succeeds, and no conflicts appear.

### Stage 2 - Source Context

Source reads:

- If the connector cannot query the data source directly, search the Team Updates database/view for the current date and `Accounting`, then fetch candidate pages and verify properties before acting.
- Check whether a current-working-day Accounting Team Updates meeting transcript or approved meeting notes exist in the Team Updates page, linked Notion pages, approved Slack threads, or other approved source location named by the run context. If found, read it and save the relevant task-context excerpts or summary in the Stage 2 packet or a linked transcript-context appendix in the run folder. If no transcript or notes are found after the check, record `Transcript check: none found` and continue; absence alone is not a blocker.
- Read current-working-day messages in those channels for the same source window as the Team Updates run. Also read new message threads in those channels when the parent message or a reply is in the source window; include the parent message when needed to understand an in-window reply.

Section rules:

- Treat `New client inbounds` as observed / out of scope; count and report the section, but do not route those lines into tasks from this skill.
- Process only `Any blockers?` and `What are the action points today?` / `Action points`.
- Treat checked items as likely already handled from the prior day. Do not create new tasks from checked items unless the text or linked Notion record clearly remains open.
- For unchecked blockers/action points, verify linked Notion page/task mentions first.

Slack read rules:

- Read Slack as context for blockers, action-point routing, owner corrections, completion signals, duplicate/superseded work, and review routing.
- Do not treat Slack as a replacement for Team Updates; the Team Updates page remains the primary source for this automation.
- Do not process `New client inbounds` from Slack in this skill. Client inbound reading remains owned by `rb-common-tasks-follow-through`.
- Exclude messages sent by ChatGPT, Codex, OpenAI, automation bots, or prior automation closeout posts. Analyze only human-authored source messages.
- Preserve Slack message or thread links in the local ledger when a Slack message affects a task decision.

Auto-approval:

- Stage 2 may continue automatically after reads if no routing decisions or live writes are made yet and the transcript/notes existence check is recorded as found/read or none found.

### Stage 3 - Routing Plan

Task routing:

Use Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e` only for extra action work or when the owning task-capable operational row cannot represent the action. Use Richmond Blackwood Backlog `https://www.notion.so/25de4130131481769758f5f2d465a141` only for truly RB-internal work. Client-related actions must resolve the responsible Company record and its linked client project; if that project is not readable, Stage 3 must mark the item `unresolved`.

Stage 3 must apply `skills/rb-accounting-team-updates-routing/SKILL.md` and produce the routing table before any write. If ownership, project, source meaning, owning operational record, target schema, or Team Updates write-back method is unclear, add an `unresolved` row to the Stage 3 packet with the proposed Team Updates note; do not write the note until Stage 4 executes an approved routing plan.

### Stage 4 - Notion Write Results

Write-back and verification:

Before task writes, confirm that the Team Updates page can be updated through a page-body edit or an actual page comment. After every approved task create/update/comment or operational-row update:

- write the task, operational-row, or comment link back to the Team Updates source item, preferably under the source checkbox line;
- check off the source line only after the task create/update and page write-back both read back correctly;
- if checking the box is not safely supported, leave the checkbox unchanged and add `Codex routed from <source entity URL>: <task link> - <action>` under the item or in an actual page comment;
- whenever a task comment, operational-row update, Team Updates write-back, Slack closeout, or packet text tells a person an item was routed, include the source entity URL being routed from; use the Team Updates page URL plus source section/exact line when no block-level URL exists;
- never rely on the final report as the only record of routing.

Verify by reading back:

- the created/updated/commented task or operational-row link and owner/status/project/reviewer/due date;
- the Team Updates page routing note, task link, and checkbox state when changed;
- any skipped checked item that was reviewed because it appeared still open.

### Stage 5 - Slack Closeout Plan

Slack completion notice:

After task create/update operations and the Team Updates write-back have been read back successfully, prepare exactly one Stage 5 completion notice to `#rb-client-updates` when at least one blocker/action-point task was created, updated, or commented. Send it only after the exact Stage 5 Slack text is approved, unless a future explicit standard-closeout auto-approval is added.

Use this standard message shape:

```text
Accounting Team Updates task routing is done for <YYYY-MM-DD>: follow-up tasks were created/updated and linked on <Team Updates page link>.

Created
- <@SlackUserID> <Task title linked to task URL>

Updated / Commented
- <@SlackUserID> <Task title linked to task URL>
```

Rules:

- Link the Team Updates page first, then list created and updated/commented task titles as direct hyperlinks in the Slack message.
- Treat the Team Updates page link as the source entity URL for the Slack closeout; messages that say task routing is done must include it.
- Prefix each task line with the assigned person's Slack mention, for example `<@U123> [Task title](task URL)`. If a task has multiple assignees, include every resolved assignee mention. Resolve Slack user IDs before sending.
- If an assignee cannot be resolved to a Slack user, Stage 5 is blocked unless the operator explicitly approves a plain-name no-notification fallback. If that fallback is approved, use the person's plain name rather than a bare `@name`, and record the unresolved Slack mapping in the final report.
- Include only task titles and task links in the created/updated lists; keep source-line detail and skipped-item notes on the Team Updates page.
- Treat comment-only changes as `Updated / Commented`. If no tasks were created or no tasks were updated/commented, include `None` under that heading.
- If routing blockers remain, add only a short phrase such as `One item needs routing review; details are on the page.`
- Do not include private source content, connector mechanics, skipped placeholder text, or broad mentions such as `@here` or `@channel`.
- Do not post Slack on a no-op run where no blocker/action-point task was created, updated, or commented. Record the no-op on the Team Updates page and in the final report.

### Stage 6 - Slack Send And Run Closeout

Slack send:

- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Add a Team Updates page note for the Slack blocker and report it.
- No other outbound Slack or app messages are part of this automation.

Output:

Return a concise run report with:

- Team Updates page processed;
- `New client inbounds` observed / out-of-scope count;
- blockers/action points reviewed;
- tasks created, updated, or skipped as already handled;
- relevant Slack context read, including channels and any skipped ChatGPT/Codex-authored messages when material;
- packet run folder and final stage reached;
- Team Updates page write-backs verified;
- Slack completion notice status and message link when available;
- unresolved items and the exact reason.
