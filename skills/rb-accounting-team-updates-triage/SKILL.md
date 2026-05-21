---
name: rb-accounting-team-updates-triage
description: "Use for the separate Richmond Blackwood weekday 11:00 Accounting Team Updates run that reads the current working day's Team Updates page, skips New client inbounds, creates or updates Notion tasks from blockers and action points, and posts the standard Slack completion notice."
---

# RB Accounting Team Updates Triage

Use this skill only for the separate Accounting Team Updates automation. It is not an inbound-reading workflow and must not be folded into `rb-common-tasks-follow-through`.

## Required Context

1. Read `processes/accounting-team-updates-triage.md`.
2. Read `processes/notion-operations.md` for Notion task and comment rules.
3. Read `internal/people-roles.md` before assigning tasks.
4. Use the Notion connector for Team Updates and Tasks reads/writes. If the needed Notion query, page edit/comment, or task write is unavailable, stop and report the exact blocker.
5. Use the Slack connector only for the standard completion notice described below. Any non-standard Slack wording must follow `processes/communications.md` and `skills/rb-communications/SKILL.md`.

## Source Scope

- Team Updates database: `https://www.notion.so/1e4e413013148065a944d94dc14c6ddf`
- Team Updates data source: `collection://1e4e4130-1314-8090-9cd7-000b1c19d92f`
- Filter for `Team = Accounting`.
- Use the `Date` property for the current working day in `Europe/Dublin`; page title wording is not authoritative.
- If the connector cannot query the data source directly, search the Team Updates database/view for the current date and `Accounting`, then fetch candidate pages and verify properties before acting.

## Section Rules

- Skip `New client inbounds`; inbound communication is handled by `rb-common-tasks-follow-through`.
- Process only `Any blockers?` and `What are the action points today?` / `Action points`.
- Treat checked items as likely already handled from the prior day. Do not create new tasks from checked items unless the text or linked Notion record clearly remains open.
- For unchecked blockers/action points, verify linked Notion page/task mentions first.

## Task Routing

Use Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e`; default project is Richmond Blackwood Backlog: `https://www.notion.so/25de4130131481769758f5f2d465a141`.

For each actionable line:

1. If the line links to an existing Notion task/page, fetch it and update/comment that record when it is the right work item.
2. Search for an existing task before creating a new one. Dedupe by Team Updates page URL, source line text, linked page/task URL, current date, owner, and subject.
3. Create a new task only when no matching active task exists and the owner/project can be identified.
4. Assign from explicit suffixes or wording such as `- JP`, `JP to`, `Simoneta to`, or `Ioana to`; known shorthand is `JP = Johnpaul Okolie`, `SV` or `Simoneta = Simoneta Vicente`, and `Ioana = Ioana Surdu-Bob`. Otherwise use `internal/people-roles.md`.
5. If ownership, project, or source meaning is unclear, write an unresolved routing note back to the Team Updates page and do not create an unowned task.
6. Include the Team Updates page URL, source section, exact source line, linked page/task URLs, and the next concrete action in the task body or comment.

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

After task create/update operations and the Team Updates write-back have been read back successfully, send exactly one completion notice to `#rb-client-updates` when at least one blocker/action-point task was created, updated, or commented.

Use this standard message shape:

```text
Accounting Team Updates task routing is done for <YYYY-MM-DD>: follow-up tasks were created/updated and linked on <Team Updates page link>.
```

Rules:

- The Team Updates page link is the primary destination; do not list every task link in Slack.
- If routing blockers remain, add only a short phrase such as `One item needs routing review; details are on the page.`
- Do not include client details, source content, connector mechanics, or broad mentions such as `@here` or `@channel`.
- Do not post Slack on a no-op run where no blocker/action-point task was created, updated, or commented. Record the no-op on the Team Updates page and in the final report.
- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Add a Team Updates page note for the Slack blocker and report it.
- No other outbound Slack or app messages are part of this automation.

## Output

Return a concise run report with:

- Team Updates page processed;
- skipped `New client inbounds` count;
- blockers/action points reviewed;
- tasks created, updated, or skipped as already handled;
- Team Updates page write-backs verified;
- Slack completion notice status and message link when available;
- unresolved items and the exact reason.
