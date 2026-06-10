---
name: rb-germany-growth-facebook-partnerships
description: Facebook group admin, sponsorship, and paid-promotion partnership acquisition flow for RB Germany growth, using Business Partners, Growth Messages, and Ioana-only send gates.
---

# RB Germany Growth Facebook Partnerships

Use this skill for Facebook group/admin sponsorship discovery, partner qualification, admin outreach, commercial approval, follow-ups, and logging for a Germany growth audience target. This skill does not draft or publish ordinary group posts; use `rb-germany-growth-facebook-posting` for public group participation.

## Hard Gates

- Sender persona is always Ioana.
- Any admin message, sponsorship ask, or partnership follow-up blocks unless the active Facebook account/session is verified as Ioana immediately before sending.
- Do not send during daily automation.
- Preview outbound text in chat. Do not save Facebook drafts.
- Send only after explicit user approval for the exact text.
- Log every pre-lead ask, approval, reply, blocker, payment/promotion status, and follow-up in Growth Messages.
- Commercial terms, payment, and disclosure language remain approval-gated.

## Data Routing

- Facebook group admins, group owners, sponsorship prospects, paid-promotion counterparts, and commercial posting routes go to Business Partners.
- Use Business Partner `Legal Name` for the group/admin/organization name.
- Put the group URL in `Website`.
- Put admin route, group rules, audience fit, sponsor terms, commercial model, and approval evidence in `Notes`.
- Use `Audience Target`, `Growth Channel = Facebook Groups`, `Growth Stage`, and `Ioana Gate` on Business Partners when available.
- Use Growth Messages for admin asks, partner pitches, approvals, replies, blockers, and follow-ups until the relationship becomes a lead/client/business communication.
- Promote/link to canonical Communications only when the thread becomes a lead/client/business communication that belongs in the main RB communications ledger.
- Non-commercial public group participation belongs to `rb-germany-growth-facebook-posting`, not this skill.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-facebook-partnerships/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of sending. The master daily run may use this skill for read/plan work only.

Shared gates:

- No admin message, sponsorship ask, or partnership follow-up is sent before exact text approval.
- No post is drafted or published from this skill.
- Stop if Ioana is not the verified active Facebook session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Business Partners schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.

2. Partner Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Prioritize groups with clear audience fit, active admins, visible partnership/admin route, rules that permit sponsorship or admin-approved promotion, and members likely to have meaningful budget for Germany setup/admin support.
   - Prefer established expat communities, founder/operator groups, senior tech/professional communities, affluent international clubs, and relocation-adjacent communities.
   - Do not target broad job-seeker groups as Facebook partnership prospects unless the group is clearly senior, founder/operator, executive, high-income tech, or otherwise budget-qualified. General English-speaking job-search groups are normally excluded.
   - Classify groups as community, relocation, city-specific, professional, tech/professional, startup/founder, student/alumni, tax/admin, or other.

3. Discovery And Business Partner Upsert
   - Dedupe by Facebook group URL, admin route, and group name.
   - Create/update a Business Partner for each group/admin/sponsorship prospect immediately.
   - Preserve group URL, admin/contact route, visible rules, member/activity signals, and audience fit in `Notes`.
   - Set `Ioana Gate = Unverified` unless a current Ioana session has been verified for this channel.
   - Set `Growth Stage Updated At` and the matching growth milestone timestamp whenever `Growth Stage` changes.

4. Rule And Commercial Review
   - Record whether sponsorships, paid posts, partner offers, admin-approved promotions, or direct admin messages are allowed.
   - If rules are unclear, create a blocker and propose an admin-permission ask.
   - Do not infer permission from similar groups.
   - Keep payment terms, promotion deliverables, and disclosure requirements explicit.
   - Treat rule, disclosure, approved-claim, commercial-approval, and Ioana-session checks as in-run gates. Preserve evidence in Business Partner notes and Growth Messages, not in a compliance-check database.

5. Sponsorship/Admin Ask Packet
   - Draft the admin or sponsorship ask in chat.
   - Before each draft, show the initial group/admin/sponsorship topic, source context, group audience/rules context, why this ask is relevant, and the exact group/admin/business URL.
   - Show sender identity as Ioana and the Facebook account/session verification requirement.
   - Include group URL, Business Partner URL, proposed commercial model, disclosure needs, approval basis, and next follow-up date.
   - Keep the ask concise and specific to the group/audience.
   - Avoid list-style outbound copy. Do not stack examples, alternatives, caveats, or issue lists in outward-facing text; use one concrete point, or two only when the message truly needs both.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must explain the ask, answer context, or move the thread forward.
   - Avoid comma-chain lists. Outbound sentences should normally have at most two commas and never more than three.

6. Approved Admin/Sponsor Send
   - Run only after explicit approval.
   - Re-check the active Facebook session is Ioana.
   - If not Ioana, log a blocker in Growth Messages and stop.
   - Send the approved ask and log result in Growth Messages.
   - Move Business Partner `Growth Stage` only when the result supports it, and set `Growth Stage Updated At`, `First Contacted At`, and `Last Contacted At` where applicable.

7. Reply Drafting Packet
   - Inspect Facebook admin/partner replies and summarize what changed.
   - Before each reply draft, show the initial ask/topic, prior context, the latest admin/partner reply, and the specific issue being answered.
   - Draft exact reply text in chat before any send.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must answer the reply, explain the ask, or move the thread forward.
   - Keep replies tied to the group/admin context, approval basis, sponsorship terms, or posting rules actually discussed.
   - Avoid list-style outbound copy. Do not stack examples, alternatives, caveats, or issue lists in outward-facing text; use one concrete point, or two only when the message truly needs both.
   - Avoid comma-chain lists. Outbound sentences should normally have at most two commas and never more than three.
   - Do not introduce new commercial terms, claims, commitments, or payment approval without explicit user approval.

8. Follow-Up Drafting Packet
   - Inspect due follow-ups for unanswered admin asks, sponsorship approvals, payment/promotion logistics, and replies.
   - Before each follow-up draft, show the initial ask/topic, prior interaction, latest status, and the specific reason a follow-up adds value now.
   - Draft follow-up text in chat only when there is a specific next reason to follow up.
   - Avoid list-style outbound copy. Do not stack examples, alternatives, caveats, or issue lists in outward-facing text; use one concrete point, or two only when the message truly needs both.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must explain the follow-up reason or move the thread forward.
   - Avoid comma-chain lists. Outbound sentences should normally have at most two commas and never more than three.
   - If no useful follow-up context exists, advance the due date, close the item, or mark it blocked.

9. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct channel reporting from timestamped Business Partner and Growth Messages records: prospects, asks, approvals, spend, replies, blockers, and partner-stage movement.

## Output Packet

Return:

- Business Partners created/updated.
- Rule/commercial/compliance findings.
- Growth Messages created/updated.
- Sponsorship/admin ask previews awaiting approval.
- Ioana-gate blockers, reply drafts, follow-up drafts, and reporting counts.
