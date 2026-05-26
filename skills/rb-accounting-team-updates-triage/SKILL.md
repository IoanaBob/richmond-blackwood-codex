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
5. Use the Slack connector to read only the bounded source channels listed below and to send the standard completion notice. Exclude ChatGPT/Codex/bot-authored messages from source analysis.
6. Use the Notion connector for Team Updates and Tasks reads/writes. If the needed Notion query, page edit/comment, or task write is unavailable, stop and report the exact blocker.
7. Any non-standard Slack wording must follow `processes/communications.md` and `skills/rb-communications/SKILL.md`.

## Source Scope

- Team Updates database: `https://www.notion.so/1e4e413013148065a944d94dc14c6ddf`
- Team Updates data source: `collection://1e4e4130-1314-8090-9cd7-000b1c19d92f`
- Filter for `Team = Accounting`.
- Use the `Date` property for the current working day in `Europe/Dublin`; page title wording is not authoritative.
- If the connector cannot query the data source directly, search the Team Updates database/view for the current date and `Accounting`, then fetch candidate pages and verify properties before acting.

Slack context:

- `#rb-client-updates` (`C0B1UTJJDLJ`)
- `#rb-operations` (`C0AMJHHHAKY`)
- `#rb-structuring` (`C0AMDDTNSFL`)
- `#all-richmond-blackwood` (`C0ALBMSLL5A`)

Read current-working-day messages in those channels for the same source window as the Team Updates run. Also read new message threads in those channels when the parent message or a reply is in the source window; include the parent message when needed to understand an in-window reply.

Slack read rules:

- Read Slack as context for blockers, action-point routing, owner corrections, completion signals, duplicate/superseded work, and review routing.
- Do not treat Slack as a replacement for Team Updates; the Team Updates page remains the primary source for this automation.
- Do not process `New client inbounds` from Slack in this skill. Client inbound reading remains owned by `rb-common-tasks-follow-through`.
- Exclude messages sent by ChatGPT, Codex, OpenAI, automation bots, or prior automation closeout posts. Analyze only human-authored source messages.
- Preserve Slack message or thread links in the local ledger when a Slack message affects a task decision.

## Section Rules

- Treat `New client inbounds` as observed / out of scope; count and report the section, but do not route those lines into tasks from this skill.
- Process only `Any blockers?` and `What are the action points today?` / `Action points`.
- Treat checked items as likely already handled from the prior day. Do not create new tasks from checked items unless the text or linked Notion record clearly remains open.
- For unchecked blockers/action points, verify linked Notion page/task mentions first.

## Packet Workflow

Packet mode is required. Use `/private/tmp/rb-accounting-team-updates-triage/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Each packet must be written to disk and printed in chat before moving on.

Stages:

1. Run Preflight.
2. Source Context.
3. Routing Plan.
4. Notion Write Results.
5. Slack Closeout Plan.
6. Slack Send And Run Closeout.

Auto-approval:

- Stage 1 is always auto-approved after its packet is written and printed.
- Stage 2 may continue automatically after reads if no routing decisions or live writes are made yet.
- No Notion task write, Team Updates write-back, or task comment happens before Stage 3 Routing Plan approval.
- No Slack send happens before Stage 5 exact-message approval, unless a future explicit standard-closeout auto-approval is added.
- Stop despite auto-approval if a packet introduces a new destination, broad Slack mention, unresolved owner/project, unexpected live mutation, or connector degradation that makes routing unsafe.

## Task Routing

Use Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e`; default project is Richmond Blackwood Backlog: `https://www.notion.so/25de4130131481769758f5f2d465a141`.

For each actionable line:

1. If the line links to an existing Notion task/page, fetch it and update/comment that record when it is the right work item.
2. Search for an existing task before creating a new one. Dedupe by Team Updates page URL, source line text, linked page/task URL, current date, owner, and subject.
3. Create a new task only when no matching active task exists and the owner/project can be identified.
4. Assign from explicit suffixes or wording such as `- JP`, `JP to`, `Simoneta to`, or `Ioana to`; known shorthand is `JP = Johnpaul Okolie`, `SV` or `Simoneta = Simoneta Vicente`, and `Ioana = Ioana Surdu-Bob`. Otherwise use `internal/people-roles.md`.
5. If ownership, project, or source meaning is unclear, write an unresolved routing note back to the Team Updates page and do not create an unowned task.
6. Keep `Assigned To` for the person doing the work. Treat approval wording as review: add the approver or reviewer to `Review By` on the owning task instead of assigning them the routine work.
7. Do not create separate approval tasks when a recurring or operational task already owns the workflow. For invoice, contractor, expense, or payment approvals, update/comment the weekly invoice-payables/payables task and add the approver in `Review By`.
8. Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should not be assigned to Ioana by default. Use Simoneta as the routine owner unless the source or user explicitly identifies a different doer.
9. Include the Team Updates page URL, source section, exact source line, linked page/task URLs, and the next concrete action in the task body or comment.

## Write-Back And Verification

Before task writes, confirm that the Team Updates page can be updated through a page-body edit or an actual page comment. After every task create/update:

- write the task link back to the Team Updates source item, preferably under the source checkbox line;
- check off the source line only after the task create/update and page write-back both read back correctly;
- if checking the box is not safely supported, leave the checkbox unchanged and add `Codex routed: <task link> - <action>` under the item or in an actual page comment;
- never rely on the final report as the only record of routing.

Verify by reading back:

- the created/updated task link and owner/status/project;
- the Team Updates page routing note, task link, and checkbox state when changed;
- any skipped checked item that was reviewed because it appeared still open.

## Slack Completion Notice

After task create/update operations and the Team Updates write-back have been read back successfully, prepare exactly one Stage 5 completion notice to `#rb-client-updates` when at least one blocker/action-point task was created, updated, or commented. Send it only after the exact Stage 5 Slack text is approved, unless a future explicit standard-closeout auto-approval is added.

Use this standard message shape:

```text
Accounting Team Updates task routing is done for <YYYY-MM-DD>: follow-up tasks were created/updated and linked on <Team Updates page link>.

Created
- <@SlackUserID> <Task title linked to task URL>

Updated
- <@SlackUserID> <Task title linked to task URL>
```

Rules:

- Link the Team Updates page first, then list created and updated task titles as direct hyperlinks in the Slack message.
- Prefix each task line with the assigned person's Slack mention, for example `<@U123> [Task title](task URL)`. If a task has multiple assignees, include every resolved assignee mention. Resolve Slack user IDs before sending when practical.
- If an assignee cannot be resolved to a Slack user, use their plain name rather than a bare `@name`, and record the unresolved Slack mapping in the final report.
- Include only task titles and task links in the created/updated lists; keep source-line detail and skipped-item notes on the Team Updates page.
- If no tasks were created or no tasks were updated, include `None` under that heading.
- If routing blockers remain, add only a short phrase such as `One item needs routing review; details are on the page.`
- Do not include private source content, connector mechanics, skipped placeholder text, or broad mentions such as `@here` or `@channel`.
- Do not post Slack on a no-op run where no blocker/action-point task was created, updated, or commented. Record the no-op on the Team Updates page and in the final report.
- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Add a Team Updates page note for the Slack blocker and report it.
- No other outbound Slack or app messages are part of this automation.

## Output

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
