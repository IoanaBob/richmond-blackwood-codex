---
name: rb-germany-growth
description: Master daily orchestration for the Richmond Blackwood Germany growth system across audience targets, LinkedIn, Facebook, relocation email/Gmail, Reddit, channel skills, send gates, wrap-up ledger, and Growth Messages logging.
---

# RB Germany Growth

Use this skill for the master Germany growth daily run or any coordinated Germany growth work across LinkedIn, Facebook partnerships, Facebook posting, relocation partner email/Gmail, Reddit, Business Partners, Growth Targets, Growth Messages, Communications handoffs, Tasks, and ephemeral compliance gates.

## Hard Gates

- Sender persona is channel-specific. Current LinkedIn sender is Eran Richmond Blackwood; booked-call scheduling from LinkedIn hands off to Ioana. Current Reddit sender is Eran Richmond Blackwood through the active Eran Reddit account, currently `Ornery-Service3272`. Facebook, relocation partner email, and other existing growth channels remain Ioana unless the user explicitly switches that channel.
- Any send-ready action blocks unless the active connector/browser/account session is verified as the required channel sender immediately before the send.
- Do not infer the channel sender from the local operator, mailbox, or workspace user.
- Outbound content is previewed in chat, not saved as an app draft.
- Sends only happen after explicit user approval for the exact message(s).
- Every pre-lead growth send, post, comment, DM, reply, blocker, approval, follow-up, and material state change is recorded in `RB DE Growth Messages`.
- Promote/link to canonical Communications only when the growth thread becomes a lead, client, or business communication that belongs in the main RB communications ledger.
- Daily automation advances queues, blockers, tasks, and timestamped state. It does not send messages.
- Do not create, use, or resurrect the legacy growth partnership data source. If it is active, stop and report a migration blocker.
- LinkedIn invite planning for the first active audience uses an internal target of 200 blank connection requests/month, calculated as a 10-request planning baseline across 20 business days. The old 15-20/day and 320/month rule is superseded. Sends still require explicit approval and immediate Eran-session verification.
- LinkedIn contact state is persona-owned, not discarded on sender switches. Ioana-owned contacts remain owned by Ioana and Eran-owned contacts remain owned by Eran. A sender switch changes which owned queue is active for sends; it does not erase, close, or ignore the other persona's contacts.
- Before any LinkedIn connection request, first message, reply, follow-up, or send-ready packet, run a cross-persona conflict check across Growth Targets and Growth Messages. Match by normalized LinkedIn profile URL/vanity, visible thread URL, message URL, target name plus current company/location where URL is missing, and any known message/thread identifiers. If the same person is already owned by a different persona with a request, connection, message, reply, active follow-up, or blocker, block the new outreach and produce a handoff/reassignment packet instead of contacting them from the second persona.
- Daily target math must declare an exact quota date and timezone before counting any daily sends. Do not treat prior run packets, channel notes, browser-visible pending state, or rows outside the declared quota-day window as today's activity. If the quota date is ambiguous because the run crosses midnight or user/operator/browser timezones differ, block the count and ask for the quota date before deciding whether the daily target is met.
- LinkedIn daily invite closeout is blocked until the packet shows a Daily Invite Gate with quota date, timezone, current time, included blank connection-request rows, excluded prior/next-day rows, and remaining count to the 10-request daily target.
- The LinkedIn channel skill may run several times per day for invite batches, acceptance checks, first-message packets, reply triage, follow-up sweeps, and reporting. The master daily automation can call it in read/plan mode only; send-capable LinkedIn runs still require explicit user approval.
- Accepted LinkedIn connections awaiting first messages are not optional follow-up work. If the browser, Growth Targets, or Growth Messages show accepted connections without a first message, the master run must surface and ledger a LinkedIn first-message packet before closeout unless the user explicitly pauses LinkedIn first messages for that exact run. Once that packet is printed and LinkedIn is marked `Waiting Approval` or `Blocked`, continue to the remaining required channels instead of stopping the master run there.
- LinkedIn reply triage must not draft or send a reply until a prospect-specific overarching reply strategy has been agreed in chat, saved on that prospect's Growth Target page, and read back. This strategy must be a 3-4 message conversation arc toward a possible call about the prospect's situation in Germany, not only the next-message tactic.
- Ongoing growth conversations use the three-message admin/tax bridge rule: after roughly three substantive messages in a thread, excluding connection requests, pure logistics, and acknowledgements, the next strategy packet must look for a natural way to move from the current topic into the person's Germany admin, tax, company, freelance, or remote-employment setup. If the bridge would be random or fake, block it, record the missing fact, and keep the thread on the real topic until a better signal appears.
- Relocation partner planning uses a daily target of at least 5 new first-time email conversations with distinct Business Partner prospects per business day. Daily automation may prepare the packet and queue, but first-time emails still require exact approval and immediate Ioana email-session verification.
- Reddit planning uses a conservative daily cap of 1 approved public post/comment per quota day for the active Reddit account until the user explicitly raises it. The prior ramp formula is superseded. Revisit any increase only after at least 3 full calendar days of safe single-comment operation, and still require explicit user approval before changing the cap. Public posts/comments remain spaced at least 15 minutes apart. Replies, reply-thread follow-ups, DMs, reactive DMs, modmail, votes, saves, passive scrolling, and second comments on the same post are excluded from the cap. Posting still requires exact approval and immediate Eran Reddit-session verification.
- Reddit candidate fit is a closeout gate. If the only available Reddit posts are adjacent, stale, low-intent, low-budget, or missing a concrete Germany/freelance/company/tax/admin/banking problem, mark Reddit `Complete` with `no safe draft today` instead of drafting or forcing a daily cap item.
- Public community replies/comments across Reddit, Facebook groups, and similar channels must check dates before drafting. Every packet must show post created date and latest meaningful activity date. Default to activity in the last 72 hours; allow 3-7 days only when the thread is still clearly live. Older public targets are research-only unless the user explicitly approves that exact dated exception.
- Reddit help-call, scheduling, or deeper-support packets must include the full source chain before drafting: initial thread title/URL/date, exact initial problem facts, our prior public response, the other person's public response, all visible DM/private-message text, timestamps where available, known unknowns, and why each detail matters. Broad summaries block the packet.
- If a prior Reddit account used by the skill is banned, suspended, deleted, or otherwise unusable, start a new Reddit sender flow only after verifying the new active Reddit account belongs to the required Reddit sender. Current Reddit sender is Eran through `Ornery-Service3272`. Prior Reddit tasks, Growth Messages, chats, and follow-ups from the banned account become historical-only/no-follow-up unless the user explicitly approves a specific exception after seeing the old source context and new-account risk.
- Reddit scheduling replies ask for the prospect's email when an invite is needed. If proposing a time, explicitly say it is a call or meeting; do not use vague availability phrasing such as `I can do Friday` without naming the call. Do not disclose Ioana's, RB's, or EIP's email address in Reddit.
- Calendar holds and invites must use the meeting persona calendar. For LinkedIn call handoffs and Ioana/RB growth calls, use `ioana@richmondblackwood.com`. Calendar access must come from the approved OAuth vault / shared Google persona store only; do not start browser OAuth, connector reauth, MCP-server reauth, or a new consent flow during a growth run. If a prospect has accepted a time and provided an email address, create the calendar invite and Google Meet ourselves through the vault route. Never ask the prospect to create the Meet, invite, or scheduling link because our tooling route is blocked. If vault-backed persona calendar access is unavailable, record a blocker, fix or verify the vault route, and stop rather than falling back to another persona calendar or pushing setup work to the prospect.
- A growth call invite is incomplete until the prospect/contact page in Notion contains a call brief and Ioana has received the same brief by email. The brief must include source chain, current strategy, known facts, unknowns, agreed time, Meet link, and what Ioana should find out before the call. If the correct Notion contact/prospect page cannot be found, create or update the appropriate Growth Target/lead-contact record first; do not leave the brief only in the calendar event.

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

Notion read route:

- Use Notion fetch/read tools for known schemas, pages, database metadata, and view discovery.
- Use `notion_query_database_view` for row reads when a database view URL is available. Paginate it when needed, and record the view URL in the run packet when it is part of a gate.
- Do not use or probe `notion-query-data-sources`, SQL-style Notion tools, or connector-advertised data-source query tools in Germany growth runs.
- Do not treat a `collection://...` fetch returning a schema as proof that a legacy database is active. Deleted or trashed Notion data-source metadata can still be fetchable by ID.
- For the legacy `RB DE Growth Partnerships` gate, fetch the database page URL (`https://app.notion.com/p/cb92130c782e439a81edb9da540d96c1`) and inspect whether it is marked deleted/trashed. Then query its returned default/all-rows view with `notion_query_database_view`. The gate is clear when the database page is deleted/trashed and the view returns zero active rows. Block only if the page is not deleted/trashed, active rows remain, or the view cannot be checked.

LinkedIn ownership source of truth:

- Use the Growth Targets `Owner` person property as the contact owner. Ioana-owned targets must have Ioana as `Owner`; Eran-owned targets must have Eran as `Owner`.
- Infer missing owner only from evidence: Growth Messages `Sender Identity = Ioana`, `Platform Account` containing Ioana/Eran, verified sender in the packet, or explicit user instruction. If evidence conflicts or the owner is missing before a send-ready LinkedIn action, block and print the conflict/backfill packet.
- Growth Messages must keep the sender evidence with `Sender Identity` when the select supports it and `Platform Account` for the exact account/persona, especially while the live sender select does not include Eran.

## Packet Workflow

For live daily runs, use packet stages like the other RB multi-stage skills. Use `/private/tmp/rb-germany-growth/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving to the next stage.

Required channel sub-runs:

- Treat each channel as a sub-run inside the master run, not as an optional section of Stage 4.
- Create or update `subruns/<order>-<channel>/SUBRUN_STATE.md` for every required channel, or, when keeping one-file packets, include the same fields in `stage-04-<channel>.md`. The sub-run state must show `Sub-run ID`, `Channel`, `Required sender`, `Started At`, `Ended At`, `Status`, `Packet path`, `Reads performed`, `Writes performed`, `Approvals waiting`, `Blockers`, and `Next prompt`.
- Before touching a channel, write the sub-run start marker and mark the master `Channel Ledger` row `Read/Plan Running`.
- Before advancing away from that channel, write the sub-run end marker, print the channel packet in chat, and update the master tally. A channel that hits an approval gate, sender gate, connector failure, or live-write blocker still gets an end marker with `Waiting Approval` or `Blocked`.
- Do not ask for a final approval, send/log closeout, or master final response while any required channel remains `Not Started`, `Read/Plan Running`, or missing an end marker. If a channel has a waiting approval or logging blocker, mark it and continue to the next unattempted channel in read/plan mode unless the user explicitly says to stop on that channel.
- If the user interrupts with an approval for one channel, perform the approved action, reconcile that child sub-run into Stage 7/8, then immediately resume the next unattempted channel rather than treating the master run as complete.

Mandatory sub-run work lanes:

- Every channel sub-run must explicitly check and tally: due follow-ups/tasks, inbound replies/messages/notifications where the channel supports them, send-ready or draft-ready queue, quota/cap state, blockers, and next action.
- If a lane cannot be checked, write `Blocked` with the exact missing connector, permission, account, or source. Do not omit the lane.
- For LinkedIn, the inbound lane includes new replies, accepted connections waiting first messages, unread/visible conversation context that is approved to read, and follow-up triggers.
- For Facebook partnerships, the inbound lane includes group/admin replies, group-join or membership state, due sponsorship/admin follow-ups, and blocked admin routes.
- For Facebook posting, the inbound lane includes replies to prior comments/posts, usable joined-group state, recent post candidates, and comments needing follow-up.
- For relocation partner email/Gmail, the inbound lane includes Gmail replies in the Ioana source mailbox, due follow-ups, first-time partner quota, draft-ready partner prospects, and post-send logging blockers.
- For Reddit, the inbound lane is mandatory even when the public posting cap is already used or no public comment target is found. It includes Reddit inbox, chat/DMs, comment replies, post/comment engagement triggers, removals/warnings, and due follow-ups for the active Reddit account.

Parent/child handoff rule:

- When this master skill invokes a channel skill, the channel result is not complete until the matching master packet is written or updated.
- Packet-before-advance rule: once a channel has started, do not do research, sourcing, drafting, sending, or live-state changes for any later channel until the current channel's packet has been written, printed in chat, and the `Channel Ledger` row has been updated. Connector failures, empty queues, and blockers still require a printed packet; they are not permission to silently continue to the next channel.
- Current-channel correction rule: if the user asks about, challenges, or redirects the current channel, stop all later-channel work and return to the current channel packet. Do not justify later-channel work by saying the master order had already moved on.
- A channel approval gate is not a master-run stop condition. If LinkedIn, Facebook, Reddit, relocation email/Gmail, or another channel reaches `Waiting Approval`, `Needs Conversation Read Approval`, `Needs Sender Verification`, or a similar gate, record that channel's exact status in the master ledger and continue to the next unswept active channel in read/plan mode unless the user explicitly says to stop and handle only that channel.
- After any channel sub-skill Stage 7, Stage 8, Stage 9, send, post, comment, reply, DM, follow-up, blocker, or material Notion state change, immediately return to the master run and update the matching master Stage 7, Stage 8, Stage 9, and `RUN_STATE.md` cursor before closeout.
- A final answer after channel work must name both the child channel stage completed and the master stage updated.
- If child packets exist but the parent master packets or cursor are stale, the run is incomplete; do not report closeout until the parent state is reconciled.
- Use this checklist after every sub-skill action: child packet completed; child sends/logs done if approved; master Stage 7 updated when applicable; master Stage 8 updated when applicable; master Stage 9 updated when applicable; `RUN_STATE.md` cursor updated; master packet printed.

Mandatory channel ledger:

- Every master run must create and keep current a `Channel Ledger` table in `RUN_STATE.md` and in the latest master packet.
- Required rows for the active Germany growth system are: LinkedIn, Facebook partnerships, Facebook posting, relocation partner email/Gmail, and Reddit.
- Each row must have one status: `Not Started`, `Read/Plan Running`, `Packet Printed`, `Waiting Approval`, `Blocked`, `Skipped`, `Sent/Logged`, or `Complete`.
- Every master run must also keep a `Sub-Run Tally` table in `RUN_STATE.md` and in the latest master packet. Required columns are `Channel`, `Sub-run ID`, `Started At`, `Ended At`, `Packet`, `Inbound checked`, `Follow-ups checked`, `Quota/cap checked`, `Drafts/proposals`, `Sends/logs`, `Status`, and `Next prompt`.
- `Inbound checked`, `Follow-ups checked`, and `Quota/cap checked` must be `yes`, `blocked`, or `n/a with reason`; blank cells block closeout.
- `Skipped` is allowed only with an explicit reason such as `user paused channel`, `credentials unavailable`, `no active channel row`, or `out of scope for this run`.
- The master run cannot enter Stage 9 closeout while any required row is `Not Started` or `Read/Plan Running`.
- The master run cannot enter Stage 9 closeout while any required channel has no sub-run end marker or lacks the mandatory lane tallies.
- A channel in `Waiting Approval` or `Blocked` does not prevent the other channel rows from running. It remains in the ledger and the final wrap-up's `Next prompt` must return to the highest-value unresolved approval or blocker.

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
- Stop if the worktree becomes conflicted, the legacy partnership source appears active, a new destination is introduced, the required channel sender identity cannot be verified for a send-ready item, or connector access is degraded in a way that would make state tracking unsafe.

## Routing Rules

- Partnership prospects always go to Business Partners, including Facebook group sponsorship leads, group admins, relocation agents, expat coaches, immigration-adjacent firms, commercial referral partners, and professional firms.
- Non-partner targets go to Growth Targets, including LinkedIn individuals, Facebook groups/posts/threads for non-commercial posting, Reddit communities/posts, and non-commercial research targets.
- Facebook group admin/sponsorship acquisition and Facebook group public posting are separate channels. Use `rb-germany-growth-facebook-partnerships` for admin, sponsor, payment, commercial approval, and paid-promotion counterparties. Use `rb-germany-growth-facebook-posting` for public posts/comments/replies in groups where rules or approvals allow participation.
- Facebook partnerships blockers do not automatically block normal group interaction. If rules allow helpful non-promotional participation, run `rb-germany-growth-facebook-posting` against that group and track the public interaction through Growth Targets and Growth Messages.
- Reddit is direct community engagement first: subreddits, posts, recurring threads, comments, replies, and allowed reactive DMs stay in Growth Targets and Growth Messages. Do not route Reddit moderator outreach, sponsorships, paid posts, cold/proactive DMs, modmail, or commercial counterparties to Business Partners unless the user explicitly re-enables that channel. Reactive DMs are allowed only when someone engaged with our public Reddit post/comment or sent an inbound DM first. Reddit help should give the pertinent high-level answer first, then offer deeper help or a call only when the person's situation needs case-specific review.
- Reddit banking, address, PMB, domicile, KYC, brokerage, or frozen-account cases use this default strategy: stabilize the immediate banking/address/KYC issue first, stop actions that could worsen account freezes, collect the minimum missing facts, and keep any Irish company/banking setup angle as internal strategy only unless the user explicitly approves exact outbound wording later.
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
   - Check that the legacy growth partnership data source is deleted/trashed or unavailable. Use the Notion read route above: database page fetch plus `notion_query_database_view` on the returned default/all-rows view. Block if it is active after migration should be complete, but do not block merely because a `collection://...` schema fetch still returns deleted metadata.
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
   - For LinkedIn, load all active Growth Targets and Growth Messages globally for conflict detection first, then filter send queues by the active persona owner. Do not count another persona's owned rows toward the active sender's daily/monthly quota, but do use them to block duplicate outreach to the same person.
   - For LinkedIn, count only `Message Kind = Connection Request` rows whose `Sent/Posted At` or `Growth Event At` falls inside the declared quota-date window in the declared timezone. Exclude and list rows from the previous or next quota day even if they were created in the current run folder or are still pending.
   - If LinkedIn daily blank invites counted for the declared quota day are below 10, Stage 4 must include an invite-batch packet to cover the gap before reporting/closeout. Acceptance checks, first messages, replies, and follow-ups do not count toward the blank-invite daily target.
   - If accepted LinkedIn connections are found without a visible first-message send or logged Growth Messages first-message event, Stage 4 must include an accepted-connection first-message packet. Do not defer this behind Facebook, Reddit, relocation partners, or reporting unless the user explicitly pauses it.
   - Count relocation-partner first-time email conversations opened today, approved-send queue, draft-ready queue, blockers, and remaining count against the 5/business-day target.
   - Compute the Reddit public daily cap for the declared quota date and count public posts/comments posted today, safe public post/comment drafts, high-risk/provisional drafts, timestamp of the last public post/comment, earliest next allowed public post/comment time, and remaining capacity against that cap. Current cap is 1 public post/comment per quota day until the user explicitly raises it after at least 3 full calendar days of safe single-comment operation. Do not count replies, DMs, follow-ups, passive scrolling, or second comments on the same post.
   - For public community channels, exclude stale targets from draft and target counts unless an exact dated exception was explicitly approved.
   - Separate send-ready items from research, reply-drafting, follow-up-drafting, blocker, and follow-up advancement work.

4. Channel Work Packets
   - Start a separate sub-run for each required channel in the fixed order. Record the start marker before any reads, and record the end marker before advancing to the next channel.
   - For every channel sub-run, complete the mandatory work lanes: inbound/reply/message check, due follow-up/task check, quota/cap check, blocker check, and draft/proposal check. If the channel does not support a lane, write `n/a` with a reason. If access is unavailable, write `blocked` with the exact missing route.
   - Run every active channel skill in read/plan mode before closeout. Use this fixed order unless the user explicitly changes it for the current run:
     - `rb-germany-growth-linkedin`
     - `rb-germany-growth-facebook-partnerships`
     - `rb-germany-growth-facebook-posting`
     - `rb-germany-growth-relocation-partners`
     - `rb-germany-growth-reddit`
   - Treat relocation partner email/Gmail as a required channel row. Use `rb-germany-growth-relocation-partners` for prospect/business-partner state and the Gmail/email sender rules from `rb-gmail-drafts` when email thread, source mailbox, sender, or Gmail send/read context is needed.
   - Do not stop the master run after LinkedIn, even if LinkedIn has a pending approval gate, duplicate-send conversation-read gate, first-message packet, or send result. Mark LinkedIn's ledger row and continue to Facebook partnerships, Facebook posting, relocation partner email/Gmail, and Reddit in read/plan mode.
   - Do not skip Reddit, Facebook partnerships, Facebook posting, or relocation partner email/Gmail merely because another channel generated a send approval prompt. Their packets still need to run or be explicitly marked `Skipped`/`Blocked` with the reason.
   - Do not stop the master run after relocation partner email/Gmail, even if approved sends completed, Notion logging is waiting explicit approval, or a Gmail/Notion blocker exists. Mark relocation as `Waiting Approval`, `Blocked`, or `Sent/Logged` as appropriate and continue to Reddit read/plan mode unless the user explicitly says to stop before Reddit.
   - For every channel, write or update a child packet and immediately merge its summary into the master `Channel Ledger`: current status, created/updated records proposed or completed, sends/posts blocked or waiting approval, next follow-up, and next prompt for that channel.
   - For every channel, also merge the sub-run lane tallies into the master `Sub-Run Tally`.
   - Do not start the next channel until the current channel packet has been printed in chat. If the user interrupts with a question about the current channel, answer it and keep the cursor on that channel until the packet is accepted, revised, blocked, or explicitly skipped.
   - Produce proposed creates/updates for Growth Targets, Business Partners, Growth Messages, and Tasks.
   - Include timestamp updates for each proposed state transition, milestone, send, reply, blocker, approval, post/comment, or follow-up.
   - Include explicit reply-drafting and follow-up-drafting packets when replies or due follow-ups exist.
   - Include explicit LinkedIn first-message packets when newly accepted or unmessaged accepted connections exist. The packet must show the accepted date, source context, OpenToWork gate, duplicate-send gate, draft text, and blockers. If this packet is skipped, the master run is incomplete.
   - For LinkedIn reply-drafting packets, first require a `Reply Strategy Packet`: read the Growth Target, propose a 3-4 message conversation-arc strategy toward a possible Germany-situation call, get user approval, save it on the prospect's Growth Target page, and read it back before any reply text is drafted or sent.
   - For any ongoing thread at or past the three-message bridge point, show the bridge assessment in the packet: message count basis, best admin/tax/setup hook, proposed pointed question, or the reason the bridge is blocked.
   - Do not send messages in the daily automation.
   - For LinkedIn, distinguish intra-day mode output: invite batch, acceptance check, first-message packet, reply triage, follow-up sweep, or reporting-only.
   - For relocation partners, include the 5/day first-time email target state and any sourcing queue gap needed to keep the daily target achievable.
   - For Facebook posting, include the 3/day relevant public comment/reply target state, usable joined groups, candidate buffer, selected posts, and any sourcing gap. Do not fill the target with weak, stale, low-budget, job-seeker, or rule-unsafe posts.
   - For Reddit, include the computed public Reddit daily cap state, last post/comment timestamp, earliest next allowed public post/comment time, and any sourcing/drafting gap. Current cap is 1/day; do not prepare a second same-day public post/comment. Do not fill the cap with weak or stale threads.
   - For Reddit, always run the inbound message/reply/DM sweep before or alongside public sourcing. The Reddit sub-run packet must show `Reddit inbound checked`, the active account, source checked, inbound/reply/DM count or blocker, any reply/DM drafts, and whether those items are excluded from the public 1/day cap.
   - If Reddit sourcing finds only weak or adjacent candidates, the Reddit channel packet must list the rejected candidates with the missing fit evidence and mark the Reddit row `Complete - no safe draft today` or `Read/Plan Running - continue sourcing`, rather than producing a draft.
   - After every channel packet, update the master packet or explicitly mark the child result as pending parent reconciliation.

5. Compliance And Sender Gate
   - Verify platform rules, approved claims, commercial approval needs, and sender-session status as an in-run checklist, not as database rows.
   - Set or preserve Business Partner `Ioana Gate` where the existing Notion schema still uses that name.
   - Send-ready items with unverified or wrong active sender sessions become blockers, not sends.
   - Record blockers in Growth Messages and, only when extra action is needed, Tasks.
   - Promotional posts or sponsorship asks block without a rules basis, admin/moderator approval, or explicit user approval.
   - Facebook posting work that requires admin sponsorship, payment, or commercial placement must be routed to the Facebook partnerships skill, not handled inside the posting skill.
   - Facebook group interaction may proceed through the posting skill when the content is useful on its own, non-promotional, and backed by the specific group's rules/recent style. Do not mention RB, paid help, sponsorships, resource pages, DMs, calls, or external links unless explicitly approved and rule-supported.
   - For Reddit, overt promotional, moderator, sponsorship, paid-post, cold/proactive DM, modmail, and commercial-counterparty routes are disabled for now and become blockers. When Eran/RB can seriously help with the specific thread problem, assess whether a soft DM-help line fits naturally. Add it only when it makes the comment more useful, label it as a promotion-rule risk, and remove it if rules or thread style make it unsafe. Reactive DMs may proceed only after public engagement with our post/comment or an inbound DM, with exact approval and immediate Eran Reddit-session verification. In Reddit DMs, answer the actual problem first with useful high-level advice, then offer a call only when text is no longer enough.

6. Draft Packet
   - Prepare exact outbound message previews in chat.
   - Show sender identity as the required channel sender and the channel/account context. For LinkedIn, show Eran Richmond Blackwood; for a LinkedIn call handoff, show Ioana as meeting persona.
   - If any outbound draft is in a language other than English, show an English translation directly under the original text before asking for approval. Do this for every approval packet, even when the user and sender both understand the language.
   - Every draft preview must include a short source-context block before the text: initial question/topic, relevant source context, why this draft is being proposed, and the target/thread/person/company URL. If the source context is missing or unclear, block the draft instead of guessing.
   - For public community channels such as Reddit and Facebook groups, include a style-basis block from recent posts/comments in that same community before drafting. Match the local style unless doing so would violate RB gates, platform rules, professionalism, or accuracy.
   - For public community channels, include the post created date, latest meaningful activity date, and recency basis before every draft. Block drafts when date evidence is missing or stale.
   - For Reddit, include a DM-help assessment before the draft text. If Eran/RB can seriously help with the specific problem, include a specific, low-pressure DM-help line only when it fits naturally; do not use generic CTAs, booking language, or service names.
   - For Reddit help-call, scheduling, or deeper-support drafts, include the full source-chain brief and saved/help strategy before the text. The packet must show the initial thread, our prior response, their response, visible DMs, dates/timestamps where available, source URLs, exact facts, unknowns, and why each fact changes the next reply.
   - For any growth scheduling draft, if a specific time is proposed, name the format explicitly as a call or meeting before asking for an email or invite details.
   - For any growth call hold or invite, use the sender persona calendar through the OAuth vault only. If the calendar tool asks for reauth or opens a consent URL, stop and log the missing OAuth-vault route as a blocker. Do not ask the prospect to create the Meet or calendar invite when RB has enough information to create it. If an email is missing, ask only for the email; if an email and accepted time are present, create the invite from the vault route before drafting the reply. After creating the invite, update the prospect/contact page in Notion with the call brief and email the same brief to Ioana before marking the invite complete.
   - For Reddit banking/address/KYC drafts, separate internal strategy from outbound copy. Do not mention Irish setup, Irish company/banking, or strategic commercial positioning in Reddit messages unless the user explicitly approves that exact disclosure after seeing it.
   - For Reddit US-like compensation drafts, keep the suggested answer narrow: remote work through a Germany-compliant setup, or US big tech in DACH through a custom Germany-compliant setup to optimize taxes. Do not add extra career options or generic AI-like market summaries unless the user explicitly asks.
   - For ongoing reply threads after three substantive messages, include the admin/tax bridge assessment before drafting. The outbound text may use the bridge only when it is tied to the person's actual thread, role, company setup, country move, freelance work, or remote-employment facts.
   - For outbound growth copy, avoid the word "path," slash-heavy phrasing, list-style copy, and mechanical contrast sentences that read like a template.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must either answer the person, ask a pointed question, provide a concrete check, or move the thread forward.
   - Say the thing directly. Do not add setup phrases, framing, explanation around the point, or filler to soften a simple answer.
   - Avoid analysis-intro phrases that announce the point before saying it. Say the actual point directly.
   - Avoid AI-style conditional openings such as `If X is Y`, `If this is the case`, or `If property is part of the plan`. State the concrete point directly.
   - Do not use `sanity check` or `sanity-check` in outbound copy. Use a concrete verb such as `look at`, `check`, `review`, or `tell you whether the questions are useful`.
   - Keep copy human without turning it into a gimmick. Normal sentence capitalization is fine and should be the default; an occasional uncapitalized sentence, rough punctuation, or tiny typo is allowed only when it makes the message feel more like a real DM. Do not force lowercase, do not add `lol` to every message, and do not add mistakes mechanically.
   - Do not stack examples, alternatives, caveats, or issue lists in outward-facing text. Use one concrete point, or two only when the message truly needs both.
   - Keep outbound sentences short. Avoid comma-chain lists; any outbound sentence should normally have at most two commas and never more than three.
   - Use natural paragraphing for the channel. For Reddit, do not split every short point into its own paragraph; prefer one compact paragraph or two medium paragraphs when that reads more human.
   - Create/update Growth Messages only as operating log and follow-up state, not as software drafts.
   - Include target URL, Business Partner URL or Growth Target URL, audience, channel, proposed next action, and follow-up date.
   - Label each preview as first message, reply draft, follow-up draft, post/comment draft, admin ask, or partner pitch.

7. Approved Send Stage
   - Only run when the user explicitly asks to send approved messages.
   - Re-check the active session immediately before each send.
   - Block any send where the required channel sender is not verified.
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
   - Before reporting, merge all child channel packets into one master wrap-up packet. The wrap-up must include the `Channel Ledger`, `Sub-Run Tally`, unresolved approvals/blockers, sends/posts completed, drafts prepared, due follow-ups advanced, and the next prompt for each channel.
   - Closeout is blocked until LinkedIn, Facebook partnerships, Facebook posting, relocation partner email/Gmail, and Reddit are each `Complete`, `Waiting Approval`, `Blocked`, `Skipped`, or `Sent/Logged`. If any row is still `Not Started` or `Read/Plan Running`, run or reconcile that channel before final answer.
   - Closeout is blocked until each required channel has a sub-run end marker and mandatory lane tallies. `Waiting Approval` and `Blocked` are valid end states only when the packet states what was checked, what could not be checked, and what exact approval or fix is needed.
   - Do not create or update summary reporting rows.
   - Reconstruct daily/weekly/monthly counts by querying timestamped records by audience and channel.
   - For LinkedIn, report monthly invite quota state from Growth Messages `Message Kind`/`Growth Event At`, Growth Target stage timestamps, and current pending/blocker state: planned blank invites, sent blank invites, remaining invites, daily send count, warnings, acceptances, meetings booked, invite-to-meeting conversion, and acceptance rate where available. Include the Daily Invite Gate table before saying the daily target is met or skipped.
   - If the LinkedIn daily invite minimum is not met for the declared quota date, closeout must not say the channel is complete. Prompt the next stage as LinkedIn invite-batch sourcing or approval, and state the exact remaining invite gap.
   - For relocation partners, report first-time email conversations opened from Growth Messages `Message Kind = First Message` or `Partner Pitch`, Business Partner `First Contacted At`, daily 5/day target met or missed, remaining approved-send queue, replies, follow-ups drafted, and blockers.
   - For Reddit, report public posts/comments posted from Growth Messages `Message Kind = Post` or `Comment` plus `Growth Event At`, computed daily cap remaining, last public post/comment timestamp, earliest next allowed public post/comment time, safe drafts, high-risk/provisional drafts, replies/DMs excluded from the count, and blockers.
   - For Reddit, also report the inbound sweep outcome: inbox/chat/comment replies checked, new messages/replies found, reply/DM drafts waiting approval, historical-only banned-account items, and unread/access blockers.
   - Report created/updated records, blockers, sends skipped, sends completed, and next follow-ups.
   - Record meaningful skill usage in `memory/skill-runs.md`.
   - Confirm every material child channel packet has a matching master packet update before final answer. If any child result is not reconciled into the master packet/cursor, report the run as incomplete and reconcile it first.
   - Closeout must include the current master/child stage, the ledger status for every channel, and an active `Next prompt:` line whenever the run can continue.

## Closeout Checklist

- Business Partners retains icon `🤝` and has `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`.
- Audiences has no active relation to the deleted legacy partnership data source.
- Growth Messages has icon `💬` and relations to Audiences, Channels, Growth Targets, Business Partners, Communications, and Tasks.
- Communications remains available for promoted lead/client/business handoffs and is not the pre-lead growth queue.
- The legacy Compliance Checks source remains superseded/trashed; no skill creates or updates compliance-check rows.
- Facebook partnership acquisition and Facebook posting are separate repo-local skills and are not mixed in a single workflow.
- No send happened unless the exact send stage was approved and the required channel sender was verified.
- The legacy growth partnership data source remains superseded/deleted.
- The final response names the completed stage, the next stage, and the exact next prompt instead of making the user ask for continuation.
