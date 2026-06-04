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
- Daily target math must declare an exact quota date and timezone before counting any daily sends. Do not treat prior run packets, channel notes, browser-visible pending state, or rows outside the declared quota-day window as today's activity. If the quota date is ambiguous because the run crosses midnight or user/operator/browser timezones differ, block the count and ask for the quota date before deciding whether the daily target is met.
- LinkedIn daily invite closeout is blocked until the packet shows a Daily Invite Gate with quota date, timezone, current time, included blank connection-request rows, excluded prior/next-day rows, remaining count to the 15-request minimum, and remaining capacity to the 20-request normal cap.
- The LinkedIn channel skill may run several times per day for invite batches, acceptance checks, first-message packets, reply triage, follow-up sweeps, and reporting. The master daily automation can call it in read/plan mode only; send-capable LinkedIn runs still require explicit user approval.
- LinkedIn reply triage must not draft or send a reply until a prospect-specific overarching reply strategy has been agreed in chat, saved on that prospect's Growth Target page, and read back. This strategy must be a 3-4 message conversation arc toward a possible call about the prospect's situation in Germany, not only the next-message tactic.
- Relocation partner planning uses a daily target of at least 5 new first-time email conversations with distinct Business Partner prospects per business day. Daily automation may prepare the packet and queue, but first-time emails still require exact approval and immediate Ioana email-session verification.
- Reddit planning uses a daily target of 10 approved top-level comments on 10 distinct recent posts for the active audience. Replies, reply-thread follow-ups, DMs, reactive DMs, modmail, votes, saves, and second comments on the same post are excluded from the target. Posting still requires exact approval and immediate Ioana Reddit-session verification.
- Public community replies/comments across Reddit, Facebook groups, and similar channels must check dates before drafting. Every packet must show post created date and latest meaningful activity date. Default to activity in the last 72 hours; allow 3-7 days only when the thread is still clearly live. Older public targets are research-only unless the user explicitly approves that exact dated exception.
- Reddit help-call, scheduling, or deeper-support packets must include the full source chain before drafting: initial thread title/URL/date, exact initial problem facts, Ioana's prior public response, the other person's public response, all visible DM/private-message text, timestamps where available, known unknowns, and why each detail matters. Broad summaries block the packet.
- Reddit scheduling replies ask for the prospect's email when an invite is needed. Do not disclose Ioana's, RB's, or EIP's email address in Reddit.

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

Parent/child handoff rule:

- When this master skill invokes a channel skill, the channel result is not complete until the matching master packet is written or updated.
- After any channel sub-skill Stage 7, Stage 8, Stage 9, send, post, comment, reply, DM, follow-up, blocker, or material Notion state change, immediately return to the master run and update the matching master Stage 7, Stage 8, Stage 9, and `RUN_STATE.md` cursor before closeout.
- A final answer after channel work must name both the child channel stage completed and the master stage updated.
- If child packets exist but the parent master packets or cursor are stale, the run is incomplete; do not report closeout until the parent state is reconciled.
- Use this checklist after every sub-skill action: child packet completed; child sends/logs done if approved; master Stage 7 updated when applicable; master Stage 8 updated when applicable; master Stage 9 updated when applicable; `RUN_STATE.md` cursor updated; master packet printed.

Next-stage prompting rule:

- Every packet print, send result, blocker result, follow-up advancement, and closeout must actively prompt the next stage. Do not wait for the user to ask what comes next.
- The prompt must state the completed stage, the next stage, why that stage is next, whether it is read/plan, approval, send, follow-up, or blocked, and the default proposed action.
- If more work remains, end with a plain `Next prompt:` line containing the exact continue/approval question for the user.
- If the next stage is blocked or due later, name the blocker or exact due date, then propose the next immediately useful channel or packet.
- Do not end a Germany growth response with only a status summary while unreconciled or available next-stage work remains.

Shared gates:

- No outbound send happens before Stage 7 exact-message approval.
- No daily channel target may be reported as met from stale rows. Any stale-row or timezone correction must reopen the relevant channel work packet before closeout.
- No public community reply/comment may be drafted or counted toward a daily target without explicit recency evidence. Stale public threads do not fill target gaps.
- No schema migration or database replacement happens from this skill; schema changes require a separate explicit instruction.
- No channel skill may be run in send mode from the daily automation.
- Stop if the worktree becomes conflicted, the legacy partnership source appears active, a new destination is introduced, Ioana identity cannot be verified for a send-ready item, or connector access is degraded in a way that would make state tracking unsafe.

## Routing Rules

- Partnership prospects always go to Business Partners, including Facebook group sponsorship leads, group admins, relocation agents, expat coaches, immigration-adjacent firms, commercial referral partners, and professional firms.
- Non-partner targets go to Growth Targets, including LinkedIn individuals, Facebook groups/posts/threads for non-commercial posting, Reddit communities/posts, and non-commercial research targets.
- Facebook group admin/sponsorship acquisition and Facebook group public posting are separate channels. Use `rb-germany-growth-facebook-partnerships` for admin, sponsor, payment, commercial approval, and paid-promotion counterparties. Use `rb-germany-growth-facebook-posting` for public posts/comments/replies in groups where rules or approvals allow participation.
- Facebook partnerships blockers do not automatically block normal group interaction. If rules allow helpful non-promotional participation, run `rb-germany-growth-facebook-posting` against that group and track the public interaction through Growth Targets and Growth Messages.
- Reddit is direct community engagement first: subreddits, posts, recurring threads, comments, replies, and allowed reactive DMs stay in Growth Targets and Growth Messages. Do not route Reddit moderator outreach, sponsorships, paid posts, cold/proactive DMs, modmail, or commercial counterparties to Business Partners unless the user explicitly re-enables that channel. Reactive DMs are allowed only when someone engaged with our public Reddit post/comment or sent an inbound DM first. Reddit help should give the pertinent high-level answer first, then offer deeper help or a call only when the person's situation needs case-specific review.
- Reddit banking, address, PMB, domicile, KYC, brokerage, or frozen-account cases use this default strategy: stabilize the immediate banking/address/KYC issue first, stop actions that could worsen account freezes, collect the minimum missing facts, and only later introduce an Irish company/banking setup if freelance, company, or business income makes it relevant.
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
   - Declare the quota date and timezone for daily target math. Use the user's current operating date when the user says `today`, `yesterday`, or similar; if that conflicts with local shell/browser/Notion timestamps, show the conflicting dates and block until the quota date is explicit.

2. Audience Selection
   - Load the active Audience Target.
   - Default first audience: `American tech workers in Germany / relocating to Germany`.
   - For LinkedIn inside the first audience, use hard gates: currently Germany-based, clearly came from abroad, currently employed by or founding a company abroad while residing in Germany, and technology/operator relevance.
   - Prefer US-headquartered, US-market, or otherwise foreign-company current roles where the Germany residence signal is visible.
   - Under-40 is a useful positive signal, not a hard gate. Use it only when explicit public evidence or user-provided confirmation exists. Do not infer, estimate, store, or mention guessed age from photos, graduation years, seniority, or career length. Unknown age does not block a target that otherwise passes the hard gates.
   - Load active channel rows linked to that audience.
   - Treat the system as Germany growth overall, not an Americans-only system.

3. Daily Queue
   - Pull due Growth Messages follow-ups for the active audience and growth channels.
   - Pull due Tasks linked to `RB Germany Growth System`.
   - Pull Business Partners matching the active `Audience Target` and active `Growth Stage`.
   - Pull Growth Targets for non-partner LinkedIn, Reddit, and direct research targets.
   - For LinkedIn, count only `Message Kind = Connection Request` rows whose `Sent/Posted At` or `Growth Event At` falls inside the declared quota-date window in the declared timezone. Exclude and list rows from the previous or next quota day even if they were created in the current run folder or are still pending.
   - If LinkedIn daily blank invites counted for the declared quota day are below 15, Stage 4 must include an invite-batch packet to cover the gap before reporting/closeout. Acceptance checks, first messages, replies, and follow-ups do not count toward the blank-invite daily target.
   - Count relocation-partner first-time email conversations opened today, approved-send queue, draft-ready queue, blockers, and remaining count against the 5/business-day target.
   - Count Reddit top-level comments posted today, safe top-level comment drafts, high-risk/provisional comment drafts, and remaining count against the 10/day top-level comment target. Do not count replies, DMs, follow-ups, or second comments on the same post.
   - For public community channels, exclude stale targets from draft and target counts unless an exact dated exception was explicitly approved.
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
   - For LinkedIn reply-drafting packets, first require a `Reply Strategy Packet`: read the Growth Target, propose a 3-4 message conversation-arc strategy toward a possible Germany-situation call, get user approval, save it on the prospect's Growth Target page, and read it back before any reply text is drafted or sent.
   - Do not send messages in the daily automation.
   - For LinkedIn, distinguish intra-day mode output: invite batch, acceptance check, first-message packet, reply triage, follow-up sweep, or reporting-only.
   - For relocation partners, include the 5/day first-time email target state and any sourcing queue gap needed to keep the daily target achievable.
   - For Reddit, include the 10/day top-level comment target state and any sourcing/drafting gap needed to keep the daily target achievable.
   - After every channel packet, update the master packet or explicitly mark the child result as pending parent reconciliation.

5. Compliance And Ioana Gate
   - Verify platform rules, approved claims, commercial approval needs, and sender-session status as an in-run checklist, not as database rows.
   - Set or preserve Business Partner `Ioana Gate`.
   - Send-ready items with unverified or non-Ioana sessions become blockers, not sends.
   - Record blockers in Growth Messages and, only when extra action is needed, Tasks.
   - Promotional posts or sponsorship asks block without a rules basis, admin/moderator approval, or explicit user approval.
   - Facebook posting work that requires admin sponsorship, payment, or commercial placement must be routed to the Facebook partnerships skill, not handled inside the posting skill.
   - Facebook group interaction may proceed through the posting skill when the content is useful on its own, non-promotional, and backed by the specific group's rules/recent style. Do not mention RB, paid help, sponsorships, resource pages, DMs, calls, or external links unless explicitly approved and rule-supported.
   - For Reddit, overt promotional, moderator, sponsorship, paid-post, cold/proactive DM, modmail, and commercial-counterparty routes are disabled for now and become blockers. When Ioana or RB can seriously help with the specific thread problem, assess whether a soft DM-help line fits naturally. Add it only when it makes the comment more useful, label it as a promotion-rule risk, and remove it if rules or thread style make it unsafe. Reactive DMs may proceed only after public engagement with our post/comment or an inbound DM, with exact approval and immediate Ioana Reddit-session verification. In Reddit DMs, answer the actual problem first with useful high-level advice, then offer a call only when text is no longer enough.

6. Draft Packet
   - Prepare exact outbound message previews in chat.
   - Show sender identity as Ioana and the channel/account context.
   - If any outbound draft is in a language other than English, show an English translation directly under the original text before asking for approval. Do this for every approval packet, even when the user and sender both understand the language.
   - Every draft preview must include a short source-context block before the text: initial question/topic, relevant source context, why this draft is being proposed, and the target/thread/person/company URL. If the source context is missing or unclear, block the draft instead of guessing.
   - For public community channels such as Reddit and Facebook groups, include a style-basis block from recent posts/comments in that same community before drafting. Match the local style unless doing so would violate RB gates, platform rules, professionalism, or accuracy.
   - For public community channels, include the post created date, latest meaningful activity date, and recency basis before every draft. Block drafts when date evidence is missing or stale.
   - For Reddit, include a DM-help assessment before the draft text. If Ioana or RB can seriously help with the specific problem, include a specific, low-pressure DM-help line only when it fits naturally; do not use generic CTAs, booking language, or service names.
   - For Reddit help-call, scheduling, or deeper-support drafts, include the full source-chain brief and saved/help strategy before the text. The packet must show the initial thread, Ioana's prior response, their response, visible DMs, dates/timestamps where available, source URLs, exact facts, unknowns, and why each fact changes the next reply.
   - For Reddit US-like compensation drafts, keep the suggested answer narrow: remote work through a Germany-compliant setup, or US big tech in DACH through a custom Germany-compliant setup to optimize taxes. Do not add extra career options or generic AI-like market summaries unless the user explicitly asks.
   - For outbound growth copy, avoid the word "path," slash-heavy phrasing, list-style copy, and mechanical contrast sentences that read like a template.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must either answer the person, ask a pointed question, provide a concrete check, or move the thread forward.
   - Avoid analysis-intro phrases that announce the point before saying it. Say the actual point directly.
   - Do not stack examples, alternatives, caveats, or issue lists in outward-facing text. Use one concrete point, or two only when the message truly needs both.
   - Keep outbound sentences short. Avoid comma-chain lists; any outbound sentence should normally have at most two commas and never more than three.
   - Use natural paragraphing for the channel. For Reddit, do not split every short point into its own paragraph; prefer one compact paragraph or two medium paragraphs when that reads more human.
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
   - If a channel sub-skill performed the send/post/comment/DM, reconcile the result into this master Stage 7 packet and update `RUN_STATE.md` before continuing.

8. Follow-Up Advancement
   - Move due dates, statuses, and blockers forward in Growth Messages and Tasks.
   - Update Business Partner `Growth Stage` only when the communication result justifies it.
   - Do not move a partner to `Contacted by Ioana`, `Negotiating`, or `Pilot Active` without supporting Growth Messages evidence.
   - If a channel sub-skill performed reply, DM, or follow-up inspection, reconcile the child result into this master Stage 8 packet and update `RUN_STATE.md` before continuing.

9. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct daily/weekly/monthly counts by querying timestamped records by audience and channel.
   - For LinkedIn, report monthly invite quota state from Growth Messages `Message Kind`/`Growth Event At`, Growth Target stage timestamps, and current pending/blocker state: planned blank invites, sent blank invites, remaining invites, daily send count, warnings, acceptances, meetings booked, invite-to-meeting conversion, and acceptance rate where available. Include the Daily Invite Gate table before saying the daily target is met or skipped.
   - If the LinkedIn daily invite minimum is not met for the declared quota date, closeout must not say the channel is complete. Prompt the next stage as LinkedIn invite-batch sourcing or approval, and state the exact remaining invite gap.
   - For relocation partners, report first-time email conversations opened from Growth Messages `Message Kind = First Message` or `Partner Pitch`, Business Partner `First Contacted At`, daily 5/day target met or missed, remaining approved-send queue, replies, follow-ups drafted, and blockers.
   - For Reddit, report top-level comments posted from Growth Messages `Message Kind = Comment` or `Post/Comment` plus `Growth Event At`, daily 10/day target met or missed, safe drafts, high-risk/provisional drafts, remaining comment gap, replies/DMs excluded from the count, and blockers.
   - Report created/updated records, blockers, sends skipped, sends completed, and next follow-ups.
   - Record meaningful skill usage in `memory/skill-runs.md`.
   - Confirm every material child channel packet has a matching master packet update before final answer. If any child result is not reconciled into the master packet/cursor, report the run as incomplete and reconcile it first.
   - Closeout must include the current master/child stage and an active `Next prompt:` line whenever the run can continue.

## Closeout Checklist

- Business Partners retains icon `🤝` and has `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`.
- Audiences has no active relation to the deleted legacy partnership data source.
- Growth Messages has icon `💬` and relations to Audiences, Channels, Growth Targets, Business Partners, Communications, and Tasks.
- Communications remains available for promoted lead/client/business handoffs and is not the pre-lead growth queue.
- The legacy Compliance Checks source remains superseded/trashed; no skill creates or updates compliance-check rows.
- Facebook partnership acquisition and Facebook posting are separate repo-local skills and are not mixed in a single workflow.
- No send happened unless the exact send stage was approved and Ioana was verified.
- The legacy growth partnership data source remains superseded/deleted.
- The final response names the completed stage, the next stage, and the exact next prompt instead of making the user ask for continuation.
