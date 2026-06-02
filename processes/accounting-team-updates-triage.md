---
title: Accounting Team Updates Triage
status: provisional
source: user instruction in Codex chat; Team Updates Notion database schema fetched 2026-05-19; Slack closeout instruction from user on 2026-05-21; Slack context channels and packet-plan instruction from user on 2026-05-26; packetization implementation instruction from user on 2026-05-26; packet gap-hardening instruction from user on 2026-05-26; source-entity URL routing instruction from user on 2026-05-27; human-readable packet approval-surface instruction from user on 2026-06-02; meeting transcript existence-check instruction from user on 2026-06-02
imported: 2026-05-21
review: Validate clean-git Stage 1 gating, Stage 3 atomic routing/project/schema output, unresolved-row guards, Slack context reads, ChatGPT/Codex filtering, verified Slack mention blocking, and closeout wording on the next weekday automation run.
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

Meeting transcript / notes:

- During Stage 2, check whether a current-working-day Accounting Team Updates meeting transcript or approved meeting notes exist in the Team Updates page, linked Notion pages, approved Slack threads, or another approved source location named by the run context.
- If transcript/notes are found, read them and save task-relevant context in the Stage 2 packet or a linked transcript-context appendix/handover file in the run folder. Stage 3 task descriptions and contextual comments should use that saved context.
- If no transcript/notes are found after the check, record `Transcript check: none found` and continue. Absence alone is not a blocker.

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
- Richmond Blackwood Backlog: `https://www.notion.so/25de4130131481769758f5f2d465a141`; use only for truly RB-internal work.

For each unchecked blocker/action point:

1. Capture section name, exact line text, checkbox state, linked Notion mentions, owner hints, dates, and source page URL in a local ledger.
2. Fetch any linked task/page mention before creating anything new.
3. If the line already links to the right task, update/comment that task rather than creating another one.
4. Search for existing tasks by source page URL, linked page URL, exact or near-exact line text, owner, current date, and subject.
5. For client-related work, resolve the responsible Company record, linked client project, and any owning task-capable operational row before proposing a Central Task. Create a new Central Task only when no matching active task or owning operational row exists and owner/project are clear.
6. Set `Status = To Do` unless the source explicitly supports another active status.
7. Assign from explicit line owner (`- JP`, `JP to`, `Simoneta to`, `Ioana to`), page owner, or `internal/people-roles.md`. Known shorthand is `JP = Johnpaul Okolie`, `SV` or `Simoneta = Simoneta Vicente`, and `Ioana = Ioana Surdu-Bob`. If ownership, project, source meaning, owning operational record, target schema, or Team Updates write-back method remains unclear, Stage 3 must add an `unresolved` routing row with the proposed Team Updates note; Stage 4 writes that note only after approval. Do not create an unowned task.
8. Keep task assignment on the operational doer. Treat approval wording as review: add the approver or reviewer to `Review By` on the most appropriate existing task instead of assigning the work to the reviewer.
9. Do not create separate approval tasks when a recurring or operational task already owns the workflow. For invoice, contractor, expense, or payment approvals, update/comment the weekly invoice-payables/payables task and add the approver in `Review By`.
10. Routine operations, bookkeeping, payment movement, subscription administration, and general operational follow-up should not be assigned to Ioana by default. Use Simoneta as the routine owner unless the source or user explicitly identifies a different doer.
11. Include the source section, exact source line, Team Updates page URL, linked pages, exact target properties, and next concrete action in the task body/comment or operational-row update.
12. When Slack context changes the routing decision, include the relevant Slack message or thread link in the task comment or Team Updates routing note unless doing so would expose inappropriate private source content.
13. Any task comment, operational-row update, Team Updates write-back, Slack closeout, or packet text that tells a person an item was routed must include the URL of the source entity being routed from. For this automation the default source entity URL is the Team Updates page URL. If a block/row URL is available, include that more specific URL; if not, include the Team Updates page URL plus the source section and exact source line.
14. Do not leave a blocker/action point unresolved only because no existing task or owning operational row was found. If the assignee, responsible company/project, source action, and Tasks schema are clear, create a new follow-up task. Unresolved rows must explain why creating a task would be unsafe.
15. Stage 4 must reject a Stage 3 packet before writing if any unresolved row lacks a concrete create-task unsafe reason or only says no existing task was found.

Do not process invoices, receipts, expenses, or correspondence as source documents from this page. If an action point refers to one, create/update the operational task or blocker only; document intake remains owned by the inbound/finance workflows.

## Team Updates Write-Back

After creating/updating/commenting a task or operational row, update the Team Updates page so the source line shows where the work went.

Preferred write-back:

- add a child note under the source item: `Codex routed from <source entity URL>: <task/row/comment link> - <short action/status>`;
- check the source checkbox only after the task/row/comment update and the page write-back both read back correctly.

Fallbacks:

- If block-level editing is unavailable, add an actual page comment or `Codex task routing` section with source line text and task/row/comment link.
- If neither page-body edit nor page comment is available, stop before making new Notion writes and report the connector blocker.

## Slack Completion Notice

After all task create/update operations and the Team Updates write-back have been read back successfully, prepare one Slack completion notice to `#rb-client-updates`.

The Slack notice is part of this automation, but packet mode requires approval of the exact Stage 5 Slack Closeout Plan before sending unless a future explicit standard-closeout auto-approval is added. The standard notice must use the shape below, link the Team Updates page, and list the task pages created or updated during the triage:

```text
Accounting Team Updates task routing is done for <YYYY-MM-DD>: follow-up tasks were created/updated and linked on <Team Updates page link>.

Created
- <@SlackUserID> <Task title linked to task URL>

Updated / Commented
- <@SlackUserID> <Task title linked to task URL>
```

Rules:

- Link the Team Updates page first, then list created and updated/commented task titles as direct hyperlinks in the Slack message.
- The Team Updates page link is the source entity URL for the Slack closeout; do not omit it from any message that says task routing is done.
- Prefix each task line with the assigned person's Slack mention, for example `<@U123> [Task title](task URL)`. If a task has multiple assignees, include every resolved assignee mention. Resolve Slack user IDs before sending.
- If an assignee cannot be resolved to a Slack user, Stage 5 is blocked unless the operator explicitly approves a plain-name no-notification fallback. If that fallback is approved, use their plain name rather than a bare `@name`, and record the unresolved Slack mapping in the final report.
- Include only task titles and task links in the created/updated lists; keep source-line detail and skipped-item notes on the Team Updates page.
- Treat comment-only changes as `Updated / Commented`. If no tasks were created or no tasks were updated/commented, include `None` under that heading.
- If there are unresolved routing blockers, add only a short count or phrase such as `One item needs routing review; details are on the page.`
- Do not include private source content, connector mechanics, skipped placeholder text, or broad operational commentary in Slack.
- Do not use broad mentions such as `@here` or `@channel`.
- Do not post Slack if no blocker/action-point task was created, updated, or commented; record the no-op on the Team Updates page and in the final report instead.
- If Slack sending fails or the Slack connector is unavailable, do not roll back verified Notion work. Report the Slack blocker in the final run report and add it to the Team Updates page comment.
- Any non-standard Slack text still follows `processes/communications.md` and `skills/rb-communications/SKILL.md` approval rules.

## Packet Requirement

This skill is packet-gated. Each run must write a packet to `/private/tmp/rb-accounting-team-updates-triage/<run-id>/`, print the human approval surface in chat, and proceed only through approved or explicitly auto-approved stages. Long machine logs, schema payloads, dedupe notes, and continuation details belong later in the packet or in a linked handover/log file. The detailed stage contract lives in `skills/rb-accounting-team-updates-triage/references/stage-packet-protocol.md`. Stage 3 must apply `skills/rb-accounting-team-updates-routing/SKILL.md` to produce a human-readable routing approval table and preserve a machine routing log.

Required packet files:

1. **Run Preflight**: current date/window, clean/dirty/conflicted git status, `git pull origin main` result, Notion/Slack connector availability, Team Updates query, Slack channel IDs, and ChatGPT/Codex exclusion rule.
2. **Source Context**: Team Updates page, section rows, transcript/approved-notes existence check result, exact Notion/Slack query bounds, `New client inbounds` observed / out-of-scope count, relevant human Slack messages/threads grouped by channel, source links, and any degraded reads.
3. **Routing Plan**: human-readable approval tables grouped as Creates, Updates / comments, Skips / no action, and Unresolved / needs decision. The visible tables must show source row, source line, decision, target, owner, due date, exact action, Team Updates write-back, and blocker/approval need. Exact schema/property write payloads, verified assignee Slack mentions, dedupe evidence, and other execution details must be preserved in a later machine log or linked handover file.
4. **Notion Write Results**: task/operational-row create/update/comment links, owner/status/project/reviewer/due-date read-back, exact payload executed, Team Updates write-back read-back, and unresolved rows.
5. **Slack Closeout Plan**: exact standard Slack notice with Team Updates link, created and updated/commented task links, verified assigned-person mentions, Slack mention resolution table, and any short unresolved-item phrase.
6. **Slack Send And Run Closeout**: Slack message link, communication/log backlinks when used, verification summary, preserved scratch path, and final blocker list.

Standing intent:

- Stage 1 is auto-approved after its packet is written and printed only when the worktree is clean, `git pull origin main` succeeds, and no conflicts appear.
- Stage 2 may continue automatically after reads if no routing decisions or live writes are made yet.
- No Notion writes happen until the routing plan packet is approved or covered by a future explicit auto-approval exception.
- No Slack send happens until the exact closeout packet is approved or covered by an explicit standard-closeout auto-approval exception.
- Stop despite auto-approval if a packet introduces dirty or conflicted git state, a new destination, broad Slack mention, unresolved owner/project/source meaning/owning operational record/target schema/write-back method, unexpected live mutation, or connector degradation that makes routing unsafe.

## Verification And Report

Read back every task, Team Updates write-back, and Slack send result before reporting success.

Final report:

- page processed and date;
- count of `New client inbounds` observed / out-of-scope items;
- blockers/action points reviewed;
- tasks created;
- existing tasks/pages/operational rows updated or commented;
- checked/completed items skipped as already handled;
- Slack context channels read and material human-authored thread context used;
- packet run folder and final stage reached;
- Team Updates page write-backs verified;
- Slack completion notice status and message link when available;
- unresolved routing blockers.
