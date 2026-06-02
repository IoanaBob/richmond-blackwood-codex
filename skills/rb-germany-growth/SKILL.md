---
name: rb-germany-growth
description: Master daily orchestration for the Richmond Blackwood Germany growth system across audience targets and channel skills, with Ioana-only send gates and Growth Messages logging.
---

# RB Germany Growth

Use this skill for the master Germany growth daily run or any coordinated Germany growth work across LinkedIn, Facebook partnerships, Facebook posting, relocation partners, Reddit, Business Partners, Growth Targets, Growth Messages, Communications handoffs, Tasks, and ephemeral compliance gates.

## Hard Gates

- Sender persona is always Ioana.
- Any send-ready action blocks unless the active connector/browser/account session is verified as Ioana immediately before the send.
- Do not infer Ioana from the local operator, mailbox, or workspace user.
- Outbound content is previewed in chat, not saved as an app draft.
- Sends only happen after explicit user approval for the exact message(s).
- Every pre-lead growth send, post, comment, DM, reply, blocker, approval, follow-up, and material state change is recorded in `RB DE Growth Messages`.
- Promote/link to canonical Communications only when the growth thread becomes a lead, client, or business communication that belongs in the main RB communications ledger.
- Daily automation advances queues, blockers, tasks, and timestamped state. It does not send messages.
- Do not create, use, or resurrect the legacy growth partnership data source. If it is active, stop and report a migration blocker.
- LinkedIn invite planning for the first active audience uses an internal target of 320 blank connection requests/month, calculated as a 16-request planning baseline across 20 business days. Normal send range is 15-20 blank requests/business day. Sends still require explicit approval and immediate Ioana-session verification.
- The LinkedIn channel skill may run several times per day for invite batches, acceptance checks, first-message packets, reply triage, follow-up sweeps, and reporting. The master daily automation can call it in read/plan mode only; send-capable LinkedIn runs still require explicit user approval.
- Relocation partner planning uses a daily target of at least 5 new first-time email conversations with distinct Business Partner prospects per business day. Daily automation may prepare the packet and queue, but first-time emails still require exact approval and immediate Ioana email-session verification.

## Operating Sources

- Task project: `RB Germany Growth System` (`https://www.notion.so/372e41301314817bb344fbb0a11d9ae8`)
- Database home: `RB Client Databases` (`https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`) in the Richmond Blackwood teamspace.
- Audiences: `collection://a02aa29c-be9c-4983-985d-233ed8f6b31b`
- Channels: `collection://0d028144-e767-41fb-aefe-a59237b5dd68`
- Growth Targets: `collection://1b84523e-9d56-47d0-9215-1618efee0b41`
- Business Partners: `collection://f52ad152-d91f-4663-86f1-e63a18edd90a`
- Growth Messages: `collection://0eb425a4-f739-412c-acc6-3fee8cc825df`
- Communications: `collection://1b5e4130-1314-8183-afd8-000b6f4da982` for promoted lead/client/business communication records only.
- Tasks: `collection://25de4130-1314-8158-af69-000b6c9fb49e`

## Packet Workflow

For live daily runs, use packet stages like the other RB multi-stage skills. Use `/private/tmp/rb-germany-growth/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving to the next stage.

Shared gates:

- No outbound send happens before Stage 7 exact-message approval.
- No schema migration or database replacement happens from this skill; schema changes require a separate explicit instruction.
- No channel skill may be run in send mode from the daily automation.
- Stop if the worktree becomes conflicted, the legacy partnership source appears active, a new destination is introduced, Ioana identity cannot be verified for a send-ready item, or connector access is degraded in a way that would make state tracking unsafe.

## Routing Rules

- Partnership prospects always go to Business Partners, including Facebook group sponsorship leads, group admins, relocation agents, expat coaches, immigration-adjacent firms, commercial referral partners, and professional firms.
- Non-partner targets go to Growth Targets, including LinkedIn individuals, Facebook groups/posts/threads for non-commercial posting, Reddit communities/posts, and non-commercial research targets.
- Facebook group admin/sponsorship acquisition and Facebook group public posting are separate channels. Use `rb-germany-growth-facebook-partnerships` for admin, sponsor, payment, commercial approval, and paid-promotion counterparties. Use `rb-germany-growth-facebook-posting` for public posts/comments/replies in groups where rules or approvals allow participation.
- Reddit is direct community engagement first: subreddits, posts, recurring threads, comments, replies, and allowed reactive DMs stay in Growth Targets and Growth Messages. Do not route Reddit moderator outreach, sponsorships, paid posts, cold/proactive DMs, modmail, or commercial counterparties to Business Partners unless the user explicitly re-enables that channel. Reactive DMs are allowed only when someone engaged with our public Reddit post/comment or sent an inbound DM first.
- Growth Messages is the pre-lead growth log for drafts, send/post events, replies, blockers, approvals, DMs, public posting/commenting, and follow-ups.
- Canonical Communications is used only after a prospect becomes a lead/client/business communication or when a Growth Messages record is intentionally promoted and linked through `Promoted Communication`.
- `Invoicing Email` on Business Partners is only for a real invoicing/commercial email. Casual contact routes, admin routes, and DM routes belong in Business Partner `Notes` and Growth Messages.
- Growth Business Partners should use `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate` when available.
- Growth operating databases live in the Richmond Blackwood teamspace database hub, not under the Germany Growth task project. The project is for task grouping and due-work tracking only.
- There is no active growth summary database and no active growth compliance-check database. The old summary and Compliance Checks sources are superseded/trashed; reporting must be reconstructed from timestamped rows in Growth Messages, Growth Targets, Business Partners, Channels, and Audiences.
- Every growth stage/status transition must set `Stage Updated At` or the matching milestone timestamp at the same time as the stage/status change. Every Growth Messages event must set `Message Kind`, `Status`, `Growth Event At`, and the applicable sent/posted/received/follow-up timestamp for growth reporting.
- Compliance is a one-time in-run gate inside the relevant skill stage. Record only the outcome that matters: approved sends/posts in Growth Messages, blockers in Growth Messages/Tasks, and rule/claim evidence in the relevant target or partner notes.

## Stages

1. Preflight
   - Inspect `git status --short --branch` and pull latest `origin/main` before repo or live-state changes.
   - Read `skills/index.md`, `skills/rb-communications/SKILL.md`, this skill, channel skill files, and `internal/growth-sales-marketing.md`.
   - Fetch Notion schemas for Audiences, Channels, Growth Targets, Business Partners, Growth Messages, Communications, and Tasks.
   - Check that the legacy growth partnership data source is deleted/trashed or unavailable. Block if it is active after migration should be complete.

2. Audience Selection
   - Load the active Audience Target.
   - Default first audience: `American tech workers in Germany / relocating to Germany`.
   - Load active channel rows linked to that audience.
   - Treat the system as Germany growth overall, not an Americans-only system.

3. Daily Queue
   - Pull due Growth Messages follow-ups for the active audience and growth channels.
   - Pull due Tasks linked to `RB Germany Growth System`.
   - Pull Business Partners matching the active `Audience Target` and active `Growth Stage`.
   - Pull Growth Targets for non-partner LinkedIn, Reddit, and direct research targets.
   - Count relocation-partner first-time email conversations opened today, approved-send queue, draft-ready queue, blockers, and remaining count against the 5/business-day target.
   - Separate send-ready items from research, reply-drafting, follow-up-drafting, blocker, and follow-up advancement work.

4. Channel Work Packets
   - Run each channel skill in read/plan mode:
     - `rb-germany-growth-linkedin`
     - `rb-germany-growth-facebook-partnerships`
     - `rb-germany-growth-facebook-posting`
     - `rb-germany-growth-relocation-partners`
     - `rb-germany-growth-reddit`
   - Produce proposed creates/updates for Growth Targets, Business Partners, Growth Messages, and Tasks.
   - Include timestamp updates for each proposed state transition, milestone, send, reply, blocker, approval, post/comment, or follow-up.
   - Include explicit reply-drafting and follow-up-drafting packets when replies or due follow-ups exist.
   - Do not send messages in the daily automation.
   - For LinkedIn, distinguish intra-day mode output: invite batch, acceptance check, first-message packet, reply triage, follow-up sweep, or reporting-only.
   - For relocation partners, include the 5/day first-time email target state and any sourcing queue gap needed to keep the daily target achievable.

5. Compliance And Ioana Gate
   - Verify platform rules, approved claims, commercial approval needs, and sender-session status as an in-run checklist, not as database rows.
   - Set or preserve Business Partner `Ioana Gate`.
   - Send-ready items with unverified or non-Ioana sessions become blockers, not sends.
   - Record blockers in Growth Messages and, only when extra action is needed, Tasks.
   - Promotional posts or sponsorship asks block without a rules basis, admin/moderator approval, or explicit user approval.
   - Facebook posting work that requires admin sponsorship, payment, or commercial placement must be routed to the Facebook partnerships skill, not handled inside the posting skill.
   - For Reddit, overt promotional, moderator, sponsorship, paid-post, cold/proactive DM, modmail, and commercial-counterparty routes are disabled for now and become blockers. A narrow soft DM-offer line may be previewed only for directly relevant US/Germany tech-comp, remote-work, or Germany-compliant setup threads, must be labelled as a promotion-rule risk, and needs exact approval. Reactive DMs may proceed only after public engagement with our post/comment or an inbound DM, with exact approval and immediate Ioana Reddit-session verification.

6. Draft Packet
   - Prepare exact outbound message previews in chat.
   - Show sender identity as Ioana and the channel/account context.
   - Every draft preview must include a short source-context block before the text: initial question/topic, relevant source context, why this draft is being proposed, and the target/thread/person/company URL. If the source context is missing or unclear, block the draft instead of guessing.
   - For public community channels such as Reddit and Facebook groups, include a style-basis block from recent posts/comments in that same community before drafting. Match the local style unless doing so would violate RB gates, platform rules, professionalism, or accuracy.
   - For Reddit US-like compensation drafts, keep the suggested path narrow: remote work through a Germany-compliant setup, or US big tech in DACH through a custom Germany-compliant setup to optimize taxes. Do not add extra career paths or generic AI-like market summaries unless the user explicitly asks.
   - Create/update Growth Messages only as operating log and follow-up state, not as software drafts.
   - Include target URL, Business Partner URL or Growth Target URL, audience, channel, proposed next action, and follow-up date.
   - Label each preview as first message, reply draft, follow-up draft, post/comment draft, admin ask, or partner pitch.

7. Approved Send Stage
   - Only run when the user explicitly asks to send approved messages.
   - Re-check the active session immediately before each send.
   - Block any send where Ioana is not verified.
   - Send directly through the supported connector/MCP/browser route after approval.
   - Log the result, URL/message ID, status, and next follow-up in Growth Messages.
   - If the result makes the thread a lead/client/business communication, create or update the canonical Communications handoff record and link it through `Promoted Communication`.

8. Follow-Up Advancement
   - Move due dates, statuses, and blockers forward in Growth Messages and Tasks.
   - Update Business Partner `Growth Stage` only when the communication result justifies it.
   - Do not move a partner to `Contacted by Ioana`, `Negotiating`, or `Pilot Active` without supporting Growth Messages evidence.

9. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct daily/weekly/monthly counts by querying timestamped records by audience and channel.
   - For LinkedIn, report monthly invite quota state from Growth Messages `Message Kind`/`Growth Event At`, Growth Target stage timestamps, and current pending/blocker state: planned blank invites, sent blank invites, remaining invites, daily send count, warnings, acceptances, meetings booked, invite-to-meeting conversion, and acceptance rate where available.
   - For relocation partners, report first-time email conversations opened from Growth Messages `Message Kind = First Message` or `Partner Pitch`, Business Partner `First Contacted At`, daily 5/day target met or missed, remaining approved-send queue, replies, follow-ups drafted, and blockers.
   - Report created/updated records, blockers, sends skipped, sends completed, and next follow-ups.
   - Record meaningful skill usage in `memory/skill-runs.md`.

## Closeout Checklist

- Business Partners retains icon `🤝` and has `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`.
- Audiences has no active relation to the deleted legacy partnership data source.
- Growth Messages has icon `💬` and relations to Audiences, Channels, Growth Targets, Business Partners, Communications, and Tasks.
- Communications remains available for promoted lead/client/business handoffs and is not the pre-lead growth queue.
- The legacy Compliance Checks source remains superseded/trashed; no skill creates or updates compliance-check rows.
- Facebook partnership acquisition and Facebook posting are separate repo-local skills and are not mixed in a single workflow.
- No send happened unless the exact send stage was approved and Ioana was verified.
- The legacy growth partnership data source remains superseded/deleted.
