---
title: Accounting Team Updates Triage
status: provisional
source: user instruction in Codex chat; Team Updates Notion database schema fetched 2026-05-19; Slack closeout instruction from user on 2026-05-21
imported: 2026-05-21
review: Validate the Slack closeout wording on the next weekday automation run.
---

# Accounting Team Updates Triage

## Purpose

Run a separate weekday Accounting Team Updates pass that turns the current working day's blockers and action points into verified Notion task updates. This process is intentionally separate from inbound communication triage.

## Schedule And Window

- Run weekdays only at `11:00 Europe/Dublin`.
- Use the current working day. If a manual run happens on a weekend, stop as `no-op` unless the operator gives an explicit catch-up date.
- Use the Notion `Date` property as the date source; do not infer the date from the title.

## Source

Team Updates:

- Database: `https://www.notion.so/1e4e413013148065a944d94dc14c6ddf`
- Data source: `collection://1e4e4130-1314-8090-9cd7-000b1c19d92f`
- Relevant properties observed on 2026-05-19: `Name`, `Team`, `Owner`, `Date`, `Company`.
- Filter: `Team = Accounting`; prefer `Company = Richmond Blackwood` when present.

If a data source query tool is available, query by `Team = Accounting` and `Date = current working day`. If not, use Notion search/fetch on the Accounting view/current-date candidates and verify properties after fetch.

## Sections To Process

The page may include:

- `What was achieved yesterday?`
- `New client inbounds`
- `Any blockers?`
- `What are the action points today?`

Rules:

- Ignore `What was achieved yesterday?` unless it links to an open blocker that is also repeated in the blockers/action-points sections.
- Skip `New client inbounds`; `rb-common-tasks-follow-through` owns client inbound reading and routing.
- Process `Any blockers?`.
- Process `What are the action points today?` / `Action points`.
- Treat checked items as likely already handled from the previous day. Do not create new tasks from checked items unless the linked record or text still says the item is open.

## Task Handling

Use the existing Notion Tasks database for Richmond Blackwood actions:

- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Default project: Richmond Blackwood Backlog, `https://www.notion.so/25de4130131481769758f5f2d465a141`

For each unchecked blocker/action point:

1. Capture section name, exact line text, checkbox state, linked Notion mentions, owner hints, dates, and source page URL in a local ledger.
2. Fetch any linked task/page mention before creating anything new.
3. If the line already links to the right task, update/comment that task rather than creating another one.
4. Search for existing tasks by source page URL, linked page URL, exact or near-exact line text, owner, current date, and subject.
5. Create a new task only when no matching active task exists and owner/project are clear.
6. Set `Status = To Do` unless the source explicitly supports another active status.
7. Assign from explicit line owner (`- JP`, `JP to`, `Simoneta to`, `Ioana to`), page owner, or `internal/people-roles.md`. Known shorthand is `JP = Johnpaul Okolie`, `SV` or `Simoneta = Simoneta Vicente`, and `Ioana = Ioana Surdu-Bob`. If ownership remains unclear, record an unresolved note on the Team Updates page and do not create an unowned task.
8. Include the source section, exact source line, Team Updates page URL, linked pages, and next concrete action in the task body/comment.

Do not process invoices, receipts, expenses, or correspondence as source documents from this page. If an action point refers to one, create/update the operational task or blocker only; document intake remains owned by the inbound/finance workflows.

## Team Updates Write-Back

After creating or updating a task, update the Team Updates page so the source line shows where the work went.

Preferred write-back:

- add a child note under the source item: `Codex routed: <task link> - <short action/status>`;
- check the source checkbox only after the task and the page write-back both read back correctly.

Fallbacks:

- If block-level editing is unavailable, add an actual page comment or `Codex task routing` section with source line text and task link.
- If neither page-body edit nor page comment is available, stop before making new task writes and report the connector blocker.

## Slack Completion Notice

After all task create/update operations and the Team Updates write-back have been read back successfully, send one short Slack completion notice to `#rb-client-updates`.

The Slack notice is part of this automation and may be sent without a separate per-run approval only when it uses the standard shape below and contains no client-sensitive detail beyond the Team Updates page link:

```text
Accounting Team Updates task routing is done for <YYYY-MM-DD>: follow-up tasks were created/updated and linked on <Team Updates page link>.
```

Rules:

- Link the Team Updates page as the primary destination for the team to inspect the routed task links.
- If there are unresolved routing blockers, add only a short count or phrase such as `One item needs routing review; details are on the page.`
- Do not list every task, client detail, private source content, or connector mechanics in Slack.
- Do not use broad mentions such as `@here` or `@channel`.
- Do not post Slack if no blocker/action-point task was created, updated, or commented; record the no-op on the Team Updates page and in the final report instead.
- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Report the Slack blocker in the final run report and add it to the Team Updates page comment.
- Any non-standard Slack text still follows `processes/communications.md` and `skills/rb-communications/SKILL.md` approval rules.

## Verification And Report

Read back every task, Team Updates write-back, and Slack send result before reporting success.

Final report:

- page processed and date;
- count of skipped `New client inbounds` items;
- blockers/action points reviewed;
- tasks created;
- existing tasks/pages updated or commented;
- checked/completed items skipped as already handled;
- Team Updates page write-backs verified;
- Slack completion notice status and message link when available;
- unresolved routing blockers.
