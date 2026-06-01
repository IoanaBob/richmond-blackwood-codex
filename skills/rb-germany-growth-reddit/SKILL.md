---
name: rb-germany-growth-reddit
description: Reddit community presence, moderator-safe participation, and sponsorship/moderator flow for RB Germany growth with Growth Targets, Business Partners, and Ioana-only send gates.
---

# RB Germany Growth Reddit

Use this skill for Reddit community discovery, rule review, helpful participation planning, moderator outreach, sponsorship prospects, follow-ups, and logging for a Germany growth audience target.

## Hard Gates

- Sender persona is always Ioana.
- Any Reddit post, comment, modmail, DM, or sponsorship ask blocks unless the active Reddit account/session is verified as Ioana immediately before sending.
- No promotional post without subreddit-rule basis or moderator approval.
- Do not send/post/comment during daily automation.
- Preview outbound text in chat. Do not save Reddit drafts.
- Send/post/comment only after explicit user approval for the exact text.
- Log every post, comment, modmail, DM, reply, blocker, and follow-up in canonical Communications.

## Data Routing

- Subreddits, posts, and non-commercial community targets go to Growth Targets.
- Moderator, sponsorship, or commercial counterparties go to Business Partners.
- Helpful participation can be tracked in Growth Targets and Communications without creating a Business Partner unless there is a moderator/commercial relationship.
- Use `Audience Target` and `Growth Channel = Reddit` where available.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-reddit/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends, posts, or comments. The master daily run may use this skill for read/plan work only.

Shared gates:

- No post, comment, modmail, DM, or sponsorship ask is sent before exact text approval.
- No promotional post is drafted as send-ready unless rules or moderator approval support it.
- Stop if Ioana is not the verified active Reddit session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Business Partners schema, Communications schema, Compliance Checks, Metrics, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.

2. Audience And Community Criteria
   - Default audience is `Americans in Germany / relocating to Germany`.
   - Target communities where the audience naturally asks about German setup, relocation, taxes, company structure, visas, work, or expat administration.
   - Keep research reusable for future Germany growth audience targets.

3. Discovery And Growth Target Upsert
   - Dedupe by subreddit URL, post URL, and community name.
   - Create/update Growth Targets for subreddits, relevant posts, recurring threads, and non-commercial research targets.
   - Record audience fit, activity, rules URL, promotional restrictions, and participation angle.

4. Rule And Compliance Review
   - Read subreddit rules, wiki/sidebar, pinned posts, and recent moderator guidance when available.
   - Classify allowed actions: helpful comments only, self-promo allowed under conditions, modmail required, sponsorship possible, or blocked.
   - Promotional content blocks without a rules basis or moderator approval.

5. Helpful Participation Packet
   - Draft helpful, non-promotional comments or posts in chat when rules allow.
   - Avoid unapproved claims and sales language.
   - Show sender identity as Ioana and Reddit account/session verification requirement.
   - Include target URL, rule basis, and follow-up date.

6. Moderator/Sponsorship Routing
   - If a moderator, sponsorship, or commercial relationship is needed, create/update a Business Partner.
   - Put subreddit/mod route in `Website` or `Notes` as appropriate.
   - Set `Growth Channel = Reddit`, `Growth Stage`, `Audience Target`, and `Ioana Gate` when available.
   - Draft modmail or sponsorship asks in chat for approval.

7. Approved Send/Post/Comment
   - Run only after explicit approval.
   - Re-check the Reddit session is Ioana.
   - If not Ioana, log a blocker in Communications and stop.
   - Send/post/comment only the approved text.
   - Log the URL/message ID, rule basis, result, and next follow-up in Communications.

8. Reply And Follow-Up Advancement
   - Track replies, moderator responses, removals, bans/warnings, helpful engagements, and link clicks if available.
   - Update Growth Target status and Business Partner `Growth Stage` only when evidence supports it.
   - Use Communications follow-up dates for later checks.

9. Metrics And Closeout
   - Update Metrics for communities researched, rule checks, comments/posts, mod asks, approvals, replies, blockers, and meetings.
   - Report any community-specific constraints before future runs.

## Output Packet

Return:

- Growth Targets created/updated.
- Business Partners created/updated for mod/commercial relationships.
- Rule/compliance findings.
- Communications created/updated.
- Previews awaiting approval, blockers, follow-ups, and metrics.
