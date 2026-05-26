---
title: Accounting Team Updates Triage
status: provisional
source: user instruction in Codex chat; Team Updates Notion database schema fetched 2026-05-19; Slack closeout instruction from user on 2026-05-21; Slack context channels and packet-plan instruction from user on 2026-05-26; packetization implementation instruction from user on 2026-05-26
imported: 2026-05-21
review: Validate Slack context reads, ChatGPT/Codex filtering, and closeout wording on the next weekday automation run.
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

Slack context channels:

- `#rb-client-updates` (`C0B1UTJJDLJ`, private)
- `#rb-operations` (`C0AMJHHHAKY`, private)
- `#rb-structuring` (`C0AMDDTNSFL`, private)
- `#all-richmond-blackwood` (`C0ALBMSLL5A`, public)

For the same working-day/run window, read human-authored messages in these channels and read new message threads where the parent message or any reply falls in the window. If an in-window reply needs the parent message for context, read the parent even if it predates the window. Do not read broad older channel history beyond what is needed for thread context.

Exclude messages authored by ChatGPT, Codex, OpenAI, automation bots, or prior automation closeout posts. Slack is supporting context for blockers, action points, owner corrections, completion signals, duplicate/superseded work, and review routing; it is not a replacement source for Team Updates and must not be used here to process `New client inbounds`.

## Sections To Process

The page may include:

- `What was achieved yesterday?`
- `New client inbounds`
- `Any blockers?`
- `What are the action points today?`

Rules:

- Ignore `What was achieved yesterday?` unless it links to an open blocker that is also repeated in the blockers/action-points sections.
- Treat `New client inbounds` as observed / out of scope; count and report it, but do not route it from this skill because `rb-common-tasks-follow-through` owns client inbound reading and routing.
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
7. Assign from explicit line owner (`- JP`, `JP to`, `Simoneta to`, `Ioana to`), page owner, or `internal/people-roles.md`. Known shorthand is `JP = Johnpaul Okolie`, `SV` or `Simoneta = Simoneta Vicente`, and `Ioana = Ioana Surdu-Bob`. If ownership, project, source meaning, or owning operational record remains unclear, Stage 3 must add an `unresolved` routing row with the proposed Team Updates note; Stage 4 writes that note only after approval. Do not create an unowned task.
8. Keep task assignment on the operational doer. Treat approval wording as review: add the approver or reviewer to `Review By` on the most appropriate existing task instead of assigning the work to the reviewer.
9. Do not create separate approval tasks when a recurring or operational task already owns the workflow. For invoice, contractor, expense, or payment approvals, update/comment the weekly invoice-payables/payables task and add the approver in `Review By`.
10. Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should not be assigned to Ioana by default. Use Simoneta as the routine owner unless the source or user explicitly identifies a different doer.
11. Include the source section, exact source line, Team Updates page URL, linked pages, and next concrete action in the task body/comment.
12. When Slack context changes the routing decision, include the relevant Slack message or thread link in the task comment or Team Updates routing note unless doing so would expose inappropriate private source content.

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

After all task create/update operations and the Team Updates write-back have been read back successfully, prepare one Slack completion notice to `#rb-client-updates`.

The Slack notice is part of this automation, but packet mode requires approval of the exact Stage 5 Slack Closeout Plan before sending unless a future explicit standard-closeout auto-approval is added. The standard notice must use the shape below, link the Team Updates page, and list the task pages created or updated during the triage:

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
- If there are unresolved routing blockers, add only a short count or phrase such as `One item needs routing review; details are on the page.`
- Do not include private source content, connector mechanics, skipped placeholder text, or broad operational commentary in Slack.
- Do not use broad mentions such as `@here` or `@channel`.
- Do not post Slack if no blocker/action-point task was created, updated, or commented; record the no-op on the Team Updates page and in the final report instead.
- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Report the Slack blocker in the final run report and add it to the Team Updates page comment.
- Any non-standard Slack text still follows `processes/communications.md` and `skills/rb-communications/SKILL.md` approval rules.

## Packet Requirement

This skill is packet-gated. Each run must write a packet to `/private/tmp/rb-accounting-team-updates-triage/<run-id>/`, print the same packet in chat, and proceed only through approved or explicitly auto-approved stages. The detailed stage contract lives in `skills/rb-accounting-team-updates-triage/references/stage-packet-protocol.md`. Stage 3 must apply `skills/rb-accounting-team-updates-routing/SKILL.md` to produce the routing table.

Required packet files:

1. **Run Preflight**: current date/window, branch and `git pull origin main` result, Notion/Slack connector availability, Team Updates query, Slack channel IDs, and ChatGPT/Codex exclusion rule.
2. **Source Context**: Team Updates page, section rows, `New client inbounds` observed / out-of-scope count, relevant human Slack messages/threads grouped by channel, source links, and any degraded reads.
3. **Routing Plan**: create/update/skip proposal for each blocker/action point, dedupe evidence, assignee, project, reviewer, assignee Slack mention, and unresolved decisions.
4. **Notion Write Results**: task create/update links, owner/status/project read-back, Team Updates write-back read-back, and unresolved rows.
5. **Slack Closeout Plan**: exact standard Slack notice with Team Updates link, created/updated task links, assigned-person mentions, and any short unresolved-item phrase.
6. **Slack Send And Run Closeout**: Slack message link, communication/log backlinks when used, verification summary, preserved scratch path, and final blocker list.

Standing intent:

- Stage 1 is always auto-approved after its packet is written and printed.
- Stage 2 may continue automatically after reads if no routing decisions or live writes are made yet.
- No Notion writes happen until the routing plan packet is approved or covered by a future explicit auto-approval exception.
- No Slack send happens until the exact closeout packet is approved or covered by an explicit standard-closeout auto-approval exception.
- Stop despite auto-approval if a packet introduces a new destination, broad Slack mention, unresolved owner/project/source meaning/owning operational record, unexpected live mutation, or connector degradation that makes routing unsafe.

## Verification And Report

Read back every task, Team Updates write-back, and Slack send result before reporting success.

Final report:

- page processed and date;
- count of `New client inbounds` observed / out-of-scope items;
- blockers/action points reviewed;
- tasks created;
- existing tasks/pages updated or commented;
- checked/completed items skipped as already handled;
- Slack context channels read and material human-authored thread context used;
- packet run folder and final stage reached;
- Team Updates page write-backs verified;
- Slack completion notice status and message link when available;
- unresolved routing blockers.
