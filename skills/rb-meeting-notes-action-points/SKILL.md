---
name: rb-meeting-notes-action-points
description: "Use inside Richmond Blackwood workflows to find/read current-day Richmond Blackwood meeting notes from the Meetings database, extract action items and task-relevant context, compare them with Team Updates and active RB team tasks, and propose fill/action/context-append plans without live writes."
---

# RB Meeting Notes Action Points

Use this skill as read-only source support for `rb-accounting-team-updates-triage`, normally during Stage 2 source gathering and Stage 3 planning.

## Sources

- Meetings database: `https://www.notion.so/bdf48e974ca84a5d99f3b12ffc3498f8`
- Meetings data source: `collection://4e30eb7f-e5b3-47c7-bd8f-fad3d0f26b72`
- Richmond Blackwood company page: `https://www.notion.so/2d9e4130131480e68232ce1b2c7c313b`
- Team Updates database: `https://www.notion.so/1e4e413013148065a944d94dc14c6ddf`
- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- RB team users from `internal/people-roles.md`: Ioana Surdu-Bob, Johnpaul Okolie, and Simoneta Vicente.

## Read Workflow

1. Fetch the Meetings database/data source schema before relying on properties.
2. Find current-working-day meeting-note candidates for Richmond Blackwood:
   - Prefer pages whose `Companies` relation contains the Richmond Blackwood company page.
   - Prefer pages whose `Event time` falls on the current working day in `Europe/Dublin`.
   - Prefer `Type = Daily` when present.
   - Prefer pages whose title, summary, or transcript suggests Accounting, Operations, client work, or RB.
3. If no exact relation/date match is available, search the Meetings data source for the current date plus `Richmond Blackwood`, `Accounting`, `Operations`, `client work`, and current Team Updates action terms.
4. If a calendar invite or meeting event time is available, choose the matching note closest to the invite time. If there are multiple plausible notes with no clear closest match, mark the meeting-note source unresolved rather than guessing.
5. Fetch the selected meeting page with transcript when supported.
6. Also fetch yesterday's and today's Accounting Team Updates pages for Richmond Blackwood so the transcript can be compared to what was already recorded and what changed today.
7. Treat yesterday's `Action points` section as the carryover baseline. Do not populate today's `What was achieved yesterday?` by copying checked rows from yesterday's `What was achieved yesterday?` section.
8. Pull the full active task inventory assigned to the RB team before Stage 3 matching:
   - use Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e`;
   - include active statuses `To Do`, `In Progress`, `In Review`, and `Blocked`;
   - include tasks assigned to any RB team user listed in `internal/people-roles.md`;
   - store at least task URL, title, status, assignee IDs/names, project URL, labels, due date, last edited time, and enough page/body/comment context to support matching.
9. If a complete RB-team task inventory cannot be pulled, record the connector gap in Stage 2. Stage 3 may still use explicitly fetched tasks, but it must not claim a full-list match and must not create/comment from meeting context when the missing inventory would make dedupe unsafe.

## Extraction

Extract into the Stage 2 packet:

- meeting note URL, title, event time, company relation, team relation, and selection reason;
- transcript availability and whether a summary/action-items block exists;
- action items, decisions, completion signals, blockers, owner hints, due-date hints, and linked source anchors;
- context snippets that are not standalone action items but may help an in-progress task, including the source heading/transcript location, related client/company/person, owner hints, and why the context matters;
- items that are clearly out of accounting triage scope, especially sales/product/website work unless the Team Updates row asks accounting to act;
- active RB team task inventory read status and the task rows pulled for Stage 3 matching;
- exact source links or page anchors when present.

## Stage 3 Comparison Output

Use the meeting-note extraction to produce a Team Updates fill/action plan:

- `What was achieved yesterday`: proposed concise bullets only for yesterday's action points that have evidence of completion or handling, supported by task status/read-back, Team Updates write-back, meeting transcript, or Slack context.
- `Any blockers?`: proposed blockers only when the transcript names a concrete ask/blocker.
- `Action points`: carry forward yesterday's action points that are not completed, then review today's Team Updates action points against the meeting transcript and mark each as supported, stale/completed, missing, or unresolved.
- `Missing action points from transcript`: propose action-point rows only when owner/action/source are clear enough for Stage 3 routing.
- `Task context append plan`: match saved meeting context snippets against the full active RB team task inventory pulled in Stage 2. When a snippet adds material context to an existing active task, propose `comment_existing` with a concise context append and source meeting-note URL. When there is no safe match, mark the snippet unresolved or out of scope rather than creating a duplicate task.

Do not perform live Notion writes from this skill. The output feeds the Stage 3 packet; Stage 4 can write only after the updated Stage 3 plan is approved.
