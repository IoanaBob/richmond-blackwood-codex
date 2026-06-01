---
name: rb-germany-growth-facebook-groups
description: Facebook group sponsorship, admin partnership, and approved posting flow for RB Germany growth, using Business Partners and Ioana-only send gates.
---

# RB Germany Growth Facebook Groups

Use this skill for Facebook group discovery, admin/sponsor prospect routing, sponsorship outreach, group-rule review, approved posting, and follow-up for a Germany growth audience target.

## Hard Gates

- Sender persona is always Ioana.
- Any admin message, sponsorship ask, or post blocks unless the active Facebook account/session is verified as Ioana immediately before sending.
- Do not post promotional content without group-rule basis or admin approval.
- Do not send or post during daily automation.
- Preview outbound text in chat. Do not save Facebook drafts.
- Send/post only after explicit user approval for the exact text.
- Log every ask, approval, reply, blocker, payment/promotion status, and follow-up in canonical Communications.

## Data Routing

- Every group, group admin, sponsorship prospect, or commercial posting route goes to Business Partners.
- Use Business Partner `Legal Name` for the group/admin/organization name.
- Put the group URL in `Website`.
- Put admin route, group rules, audience fit, sponsor terms, commercial model, and approval evidence in `Notes`.
- Use `Audience Target`, `Growth Channel = Facebook Groups`, `Growth Stage`, and `Ioana Gate` on Business Partners when available.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-facebook-groups/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends or posts. The master daily run may use this skill for read/plan work only.

Shared gates:

- No admin message, sponsorship ask, or post is sent before exact text approval.
- No promotional post is drafted as send-ready unless rules or admin approval support it.
- Stop if Ioana is not the verified active Facebook session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Business Partners schema, Communications schema, Compliance Checks, Metrics, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.

2. Audience And Group Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Search for groups with explicit audience fit, activity, admin route, and rules visibility.
   - Classify groups as community, relocation, city-specific, professional, tech/professional, startup/founder, student/alumni, tax/admin, or other.

3. Discovery And Business Partner Upsert
   - Dedupe by Facebook group URL and group name.
   - Create/update a Business Partner for each group/admin/sponsorship prospect immediately.
   - Preserve group URL, admin/contact route, visible rules, member/activity signals, and audience fit in `Notes`.
   - Set `Ioana Gate = Unverified` unless a current Ioana session has been verified for this channel.

4. Rule And Compliance Review
   - Record whether promotional posts, sponsorships, paid posts, partner offers, or admin DMs are allowed.
   - If rules are unclear, create a blocker and propose an admin-permission ask.
   - Do not infer permission from similar groups.

5. Sponsorship/Admin Ask Packet
   - Draft the admin or sponsorship ask in chat.
   - Show sender identity as Ioana and the Facebook account/session verification requirement.
   - Include group URL, Business Partner URL, proposed commercial model, disclosure needs, and next follow-up date.
   - Commercial terms remain approval-gated.

6. Approved Admin/Sponsor Send
   - Run only after explicit approval.
   - Re-check the active Facebook session is Ioana.
   - If not Ioana, log a blocker in Communications and stop.
   - Send the approved ask and log result in Communications.
   - Move Business Partner `Growth Stage` only when the result supports it.

7. Approved Posting Packet
   - Draft group posts only when rules or admin approval allow them.
   - Keep claims approved and audience-specific.
   - Include disclosure and sponsorship/payment language when required.
   - Preview exact post in chat for approval.

8. Post/Promotion Execution
   - Re-check Ioana session before posting.
   - Post only the approved content in the approved group.
   - Log post URL, approval basis, payment/promotion details, and next follow-up in Communications.

9. Follow-Up And Metrics
   - Advance Communications follow-ups for unanswered admin asks, sponsorship approvals, rejected posts, live posts, and replies.
   - Update Metrics by audience and Facebook Groups channel for prospects, asks, approvals, posts, spend, replies, blockers, and meetings.

## Output Packet

Return:

- Business Partners created/updated.
- Rule/compliance findings.
- Communications created/updated.
- Sponsorship or post previews awaiting approval.
- Ioana-gate blockers and follow-ups.
