---
name: rb-germany-growth-facebook-posting
description: Facebook group posting, commenting, reply, and follow-up flow for RB Germany growth, using Growth Targets, Growth Messages, and Ioana-only send gates.
---

# RB Germany Growth Facebook Posting

Use this skill for Facebook group rule review, public post/comment planning, group reply drafting, follow-up drafting, and logging for a Germany growth audience target. This skill does not acquire sponsorships or admin partnerships; use `rb-germany-growth-facebook-partnerships` for admin/sponsor outreach.

## Hard Gates

- Sender persona is always Ioana.
- Any group post, comment, or reply blocks unless the active Facebook account/session is verified as Ioana immediately before posting.
- Do not post promotional content without group-rule basis or admin/partner approval.
- Do not send/post/comment during daily automation.
- Preview outbound text in chat. Do not save Facebook drafts.
- Post/comment/reply only after explicit user approval for the exact text.
- Log every pre-lead post, comment, reply, blocker, approval basis, and follow-up in Growth Messages.

## Data Routing

- Non-commercial Facebook groups, recurring threads, post opportunities, and public participation targets go to Growth Targets.
- Use `Target Type = Facebook Group` for groups and `Channel = Facebook Groups` where available.
- Store group URL in `URL`, rules and participation angle in `Review` or `Notes`-style fields, and rule status in `Rules Status`.
- Use `Audience Target` and timestamp fields on Growth Targets.
- Use Growth Messages for post/comment drafts, approved posting events, replies, blockers, rule/approval basis, and follow-ups.
- Promote/link to canonical Communications only when an interaction becomes a lead/client/business communication that belongs in the main RB communications ledger.
- If the work becomes an admin sponsorship, paid-promotion, commercial placement, or group-owner relationship, stop and route that counterparty through `rb-germany-growth-facebook-partnerships` and Business Partners.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-facebook-posting/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of posting. The master daily run may use this skill for read/plan work only.

Shared gates:

- No post, comment, or reply is sent before exact text approval.
- No promotional post is drafted as send-ready unless group rules or admin/partner approval support it.
- Stop if Ioana is not the verified active Facebook session at a send-ready step.
- Admin sponsorship acquisition and payment negotiation are out of scope for this skill.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Confirm posting work is not being routed to Business Partners unless a partnership/admin route is explicitly required.

2. Audience And Group Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Search for groups and threads where the audience naturally asks about German setup, relocation, taxes, company setup, employment, tech careers, startup/founder life, or expat administration.
   - Prioritize groups with visible rules, recent activity, and a natural helpful participation angle.

3. Discovery And Growth Target Upsert
   - Dedupe by Facebook group URL, post URL, thread URL, and group name.
   - Create/update Growth Targets for groups, relevant posts, recurring threads, and non-commercial posting opportunities.
   - Record audience fit, activity, rules URL, promotional restrictions, posting angle, and any admin approval basis.
   - Set `Stage Updated At`, `Rules Checked At`, and `Last Activity At` when target state or rule state changes.

4. Rule And Compliance Review
   - Read group rules, about/sidebar text, pinned posts, visible admin guidance, and recent moderation pattern where available.
   - Classify allowed actions: helpful post, helpful comment, reply to replies, recurring-thread participation, admin/partner approval required, or blocked.
   - If rules require admin approval, sponsorship, payment, or commercial permission before posting, block the item and hand it to `rb-germany-growth-facebook-partnerships`.
   - Do not infer permission from similar groups.
   - Treat this as an in-run compliance gate. Store rule evidence on the Growth Target and blockers/follow-ups in Growth Messages or Tasks, not in a compliance-check database.

5. Helpful Posting Packet
   - Draft useful, non-promotional group posts or comments in chat when rules allow.
   - Before each draft, show the initial group question/topic, relevant post/thread context, group rule/admin basis, and why this response is useful for that specific group/thread. If the source context is missing, block the draft.
   - Keep content valuable without relying on RB promotion.
   - Avoid unapproved claims, service pitches, savings claims, and generic "book a call" framing.
   - Avoid the word "path" in outbound copy, slash-heavy phrasing, long enumerations unless the group style supports them, and mechanical contrast sentences that read like a template.
   - Avoid comma-chain lists. Outbound sentences should normally have at most two commas and never more than three.
   - Show sender identity as Ioana, Facebook account/session verification requirement, group URL, rule basis, and follow-up date.

6. Posting Readiness
   - Confirm the proposed action is a public group post, comment, or reply.
   - Confirm the content is useful on its own and fits the rule basis.
   - Confirm there is no unresolved admin-approval, sponsorship, payment, or commercial-placement requirement.
   - If a commercial/admin route is needed, block posting and route to the partnership skill.

7. Approved Post/Comment
   - Run only after explicit approval.
   - Re-check the active Facebook session is Ioana.
   - If not Ioana, log a blocker in Growth Messages and stop.
   - Post/comment/reply only the approved text in the approved group/thread.
   - Log post/comment URL, approval/rule basis, result, `Message Kind = Post` or `Comment`, `Status = Sent/Posted`, `Growth Event At`, and next follow-up in Growth Messages.
   - Set Growth Target `Outreach Active At`, `Stage Updated At`, and `Last Activity At` when participation starts.

8. Reply Drafting Packet
   - Inspect post/comment replies, removals, warnings, and useful engagements.
   - Before each reply draft, show the initial group post/topic, the latest reply/comment being answered, and why a reply adds value.
   - Draft exact reply text in chat before any send.
   - Keep replies useful to the thread and responsive to the other person's comment.
   - Do not pitch, move to DMs, introduce RB services, or make new claims unless the person explicitly asked for help that makes RB directly relevant and the exact wording is user-approved.

9. Follow-Up Drafting Packet
   - Inspect due follow-ups for live posts, comments, replies, removals, warnings, and recurring threads.
   - Before each follow-up draft, show the initial thread/topic context, prior RB/Ioana interaction, latest group/thread state, and the specific reason a follow-up adds value.
   - Draft follow-up posts/comments/replies only when there is a real thread reason to add value.
   - If a follow-up would be promotional, repetitive, or contextless, do not draft it; advance the due date, close it, or mark it blocked.
   - Use Growth Messages follow-up dates for later checks.

10. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct channel reporting from timestamped Growth Targets and Growth Messages records: groups researched, rule checks, posts/comments/replies, helpful engagements, blockers, removals/warnings, and replies.

## Output Packet

Return:

- Growth Targets created/updated.
- Rule/compliance findings.
- Growth Messages created/updated.
- Post/comment/reply previews awaiting approval.
- Partnership-route blockers, Ioana-gate blockers, reply drafts, follow-up drafts, and reporting counts.
