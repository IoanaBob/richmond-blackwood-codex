---
name: rb-germany-growth-reddit
description: Reddit community engagement and reactive DM flow for RB Germany growth with Growth Targets, Growth Messages, and Ioana-only send gates.
---

# RB Germany Growth Reddit

Use this skill for Reddit community discovery, rule review, helpful community participation planning, reactive DM handling, follow-ups, and logging for a Germany growth audience target. Reddit starts from direct public community engagement; DMs are allowed only after engagement with our public post/comment or when an inbound DM is received.

## Hard Gates

- Sender persona is always Ioana.
- Any Reddit post, comment, reply, or DM blocks unless the active Reddit account/session is verified as Ioana immediately before sending.
- No promotional posts, cold/proactive DMs, moderator outreach, modmail, sponsorship asks, paid posts, or commercial-counterparty work in the Reddit channel for now.
- Reactive DMs are allowed only when the person engaged with our public Reddit post/comment or sent an inbound DM first.
- Do not send/post/comment/DM during daily automation.
- Preview outbound text in chat. Do not save Reddit drafts.
- Send/post/comment/DM only after explicit user approval for the exact text.
- Log every pre-lead post, comment, reply, DM, blocker, and follow-up in Growth Messages.

## Data Routing

- Subreddits, posts, and non-commercial community targets go to Growth Targets.
- Do not create Business Partners from Reddit moderator, sponsorship, paid-post, or commercial-counterparty routes unless the user explicitly re-enables that channel later.
- Helpful participation and reactive DMs are tracked in Growth Targets and Growth Messages.
- Use `Audience Target` and `Growth Channel = Reddit` where available.
- Promote/link to canonical Communications only when an interaction becomes a lead/client/business communication that belongs in the main RB communications ledger.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-reddit/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends, posts, or comments. The master daily run may use this skill for read/plan work only.

Shared gates:

- No post, comment, reply, or DM is sent before exact text approval.
- No promotional post, cold/proactive DM, moderator outreach, modmail, sponsorship ask, paid post, or commercial-counterparty ask is drafted or routed from this skill.
- Stop if Ioana is not the verified active Reddit session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.
   - Confirm no Reddit work is routed to Business Partners, modmail, cold DMs, sponsorship, paid posts, or commercial counterparties.

2. Audience And Community Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Target communities where the audience naturally asks about German setup, relocation, taxes, company structure, visas, work, tech careers, startup/founder setup, remote work, or expat administration.
   - Keep research reusable for future Germany growth audience targets.

3. Discovery And Growth Target Upsert
   - Dedupe by subreddit URL, post URL, and community name.
   - Create/update Growth Targets for subreddits, relevant posts, recurring threads, and non-commercial research targets.
   - Record audience fit, activity, rules URL, promotional restrictions, and participation angle.
   - Set `Stage Updated At`, `Rules Checked At`, and `Last Activity At` when target state or rule state changes.

4. Rule And Compliance Review
   - Read subreddit rules, wiki/sidebar, pinned posts, and recent visible moderator guidance when available.
   - Classify allowed actions for community-first engagement: helpful comments, helpful non-promotional posts, replies to replies, recurring-thread participation, reactive DMs after a valid trigger, or blocked.
   - If rules require modmail, moderator approval, sponsorship, payment, or commercial permission before participation, mark the item blocked for now.
   - Treat rule, approved-claim, and Ioana-session checks as in-run gates. Store rule evidence on the Growth Target and blockers/follow-ups in Growth Messages or Tasks, not in a compliance-check database.

5. Helpful Participation Packet
   - Draft helpful, non-promotional comments or posts in chat when rules allow.
   - Avoid unapproved claims and sales language.
   - Show sender identity as Ioana and Reddit account/session verification requirement.
   - Include target URL, rule basis, and follow-up date.

6. Community Engagement Readiness
   - Confirm the proposed action is a direct community post/comment/reply or an allowed reactive DM.
   - For DMs, confirm the exact trigger: the person engaged with our public post/comment, or the person sent an inbound DM first.
   - Confirm the content is useful on its own without relying on RB promotion.
   - Confirm there is no request for moderator approval, commercial placement, sponsorship, paid posting, cold DM, or modmail.
   - If any commercial or moderator route is needed, block the item and record that Reddit commercial/moderator routing is disabled.

7. Approved Send/Post/Comment/DM
   - Run only after explicit approval.
   - Re-check the Reddit session is Ioana.
   - If not Ioana, log a blocker in Growth Messages and stop.
   - Send/post/comment/DM only the approved text.
   - For DMs, send only when the approved packet includes the valid trigger and source URL/message context.
   - Log the URL/message ID, rule basis, result, `Message Kind = Post`, `Comment`, `Reply`, or `DM`, `Status = Sent/Posted`, `Growth Event At`, and next follow-up in Growth Messages.
   - Set Growth Target `Outreach Active At`, `Stage Updated At`, and `Last Activity At` when participation starts.

8. Reply And DM Drafting Packet
   - Track replies, removals, bans/warnings, helpful engagements, and link clicks if available.
   - Track inbound Reddit DMs and people who engage with our public post/comment.
   - Draft Reddit replies and allowed reactive DMs in chat before any send.
   - Keep replies useful to the thread and responsive to the other person's comment.
   - Keep DMs tied to the exact public engagement or inbound DM context; do not generate DMs from subreddit member lists, profile searches, or cold prospecting.
   - Do not pitch, ask for mod approval, suggest paid/commercial placement, or introduce RB services unless the person explicitly asked for help that makes RB directly relevant and the exact wording is user-approved.
   - Update Growth Target status only when evidence supports it.

9. Follow-Up Drafting Packet
   - Inspect due follow-ups for posts, comments, replies, DMs, removals, warnings, and recurring threads.
   - Draft follow-up comments/replies/DMs only when there is a real thread or DM reason to add value.
   - If a follow-up would be promotional, repetitive, or contextless, do not draft it; advance the due date, close it, or mark it blocked.
   - Use Growth Messages follow-up dates for later checks.

10. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct channel reporting from timestamped Growth Targets and Growth Messages records for communities researched, rule checks, comments/posts/replies, reactive DMs, helpful engagements, blockers, and replies.
   - Report any community-specific constraints before future runs.

## Output Packet

Return:

- Growth Targets created/updated.
- Rule/compliance findings.
- Growth Messages created/updated.
- Post/comment previews, reply drafts, reactive DM drafts, follow-up drafts, blockers, and reporting counts.
