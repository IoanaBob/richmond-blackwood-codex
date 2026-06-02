---
name: rb-germany-growth-relocation-partners
description: Relocation-agent, expat coach, immigration-adjacent firm, and professional-firm partnership flow for RB Germany growth using Business Partners and Ioana-only send gates.
---

# RB Germany Growth Relocation Partners

Use this skill for relocation-agent and immigration-adjacent partner research, qualification, outreach, commercial approval, follow-up, and logging for a Germany growth audience target.

## Hard Gates

- Sender persona is always Ioana.
- Any send-ready action blocks unless the active account/session is verified as Ioana immediately before sending.
- Do not send during daily automation.
- Preview outbound text in chat. Do not save app drafts.
- Send only after explicit user approval for the exact text.
- Log every pre-lead send, reply, blocker, commercial approval, and follow-up in Growth Messages.
- Commercial terms and sponsorship/payment commitments remain approval-gated.
- Daily operating target is at least 5 new first-time email conversations with distinct relocation-partner prospects per business day for the active audience. This is a planning and approved-send target, not permission to send without approval.

## Data Routing

- Every relocation agent, expat coach, immigration-adjacent firm, tax, visa, or admin advisory firm, or professional referral partner goes directly to Business Partners.
- Put the official website in `Website`.
- Put contact route, audience fit, service focus, commercial model, approval state, next action, and source notes in `Notes`.
- Use `Audience Target`, `Growth Channel = Relocation Partnerships`, `Growth Stage`, and `Ioana Gate` when available.
- Link Contracts only later through the existing Contracts relation if a real agreement exists.
- Represent each first-time email conversation as a Business Partner row plus a Growth Messages row with sender identity, audience, channel, contact route, sent/blocked state, and next follow-up. Replies and follow-ups update Growth Messages; they do not count toward the 5/day first-time conversation target.
- Promote/link to canonical Communications only when the thread becomes a lead/client/business communication that belongs in the main RB communications ledger.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-relocation-partners/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends. The master daily run may use this skill for read/plan work only.

Shared gates:

- No pitch or follow-up is sent before exact text approval.
- No commercial term is offered without user approval.
- Stop if Ioana is not the verified active sending session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Business Partners schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.
   - Count relocation-partner first-time email sends, queued approved-send items, replies, due follow-ups, blockers, and remaining daily target for the current business day.

2. Audience And Partner Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Target firms that influence the relocation decision or early German admin setup:
     - Relocation agents.
     - Expat coaches.
     - Immigration/visa-adjacent service firms.
     - International tax, legal, accounting, or admin firms.
     - Startup, tech-talent, global-mobility, and remote-worker relocation operators.
     - US-to-Germany professional communities with a commercial operator.

3. Discovery And Business Partner Upsert
   - Search approved sources or user-provided lists.
   - Dedupe by legal/brand name, website, domain, and contact route.
   - Create/update Business Partners immediately for all plausible partner prospects.
   - Store source URL, audience evidence, service overlap, and contact route in `Notes`.
   - Set `Growth Stage Updated At` and `Last Contacted At`/`Last Reply At` only when the matching event actually happens; do not use a summary table.
   - Keep enough qualified or qualifiable Business Partners to support the 5/day first-time email target. If fewer than 5 send-ready or draft-ready prospects exist for the day, produce a sourcing queue gap instead of lowering the target.

4. Qualification
   - Classify `Growth Stage` as `Research`, `Qualified`, `Blocked`, or `Closed`.
   - Mark blockers for weak audience fit, unclear contact route, restricted solicitation, competitor conflict, or missing approval.
   - Set `Growth Stage Updated At` on every stage change; set `Growth Qualified At`, `Growth Blocked At`, or `Growth Closed At` when those milestones happen.
   - Keep public claims provisional unless approved.

5. Commercial Model Review
   - Identify likely model: referral, content partnership, paid placement, co-marketing, webinar, affiliate, service bundle, or other.
   - Do not offer pricing, commission, payments, or contract terms without user approval.
   - Preserve proposed commercial terms and approval state in Business Partner `Notes` and Growth Messages.
   - Treat solicitation rules, approved claims, commercial approval, and Ioana-session checks as in-run gates. Record blockers in Growth Messages or Tasks, not in a compliance-check database.

6. Pitch Draft Packet
   - Draft outreach in chat, personalized to the partner type and active audience.
   - Before each draft, show the initial partner topic/source, what the partner does, why they match the audience/channel, the source URL/contact route, and the specific reason this first message is warranted.
   - Show sender identity as Ioana and the required account/session verification.
   - Include today's first-time email target, sent count, remaining count, queued Business Partners, Business Partner URL, website, contact route, commercial assumptions, and next follow-up date.
   - Label first-time email drafts separately from reply drafts and follow-up drafts.

7. Approved Send
   - Run only after explicit approval.
   - Re-check the sending session is Ioana.
   - If not Ioana, log a blocker in Growth Messages and stop.
   - Send the approved message directly through the supported route.
   - Log send result, URL/message ID, `Message Kind = Partner Pitch` or `First Message`, `Status = Sent/Posted`, `Growth Event At`, `Sent/Posted At`, and follow-up in Growth Messages.
   - Set Business Partner `First Contacted At`, `Last Contacted At`, `Growth Stage Updated At`, and `Growth Stage = Contacted by Ioana`.
   - Stop opening new first-time conversations for the day once the 5/day target is met unless the user explicitly approves an additional batch.

8. Reply Drafting And Negotiation Packet
   - Route replies into Growth Messages and summarize what the partner actually said.
   - Before each reply draft, show the initial partner/topic context, prior Ioana or RB message, latest partner reply, commercial and approval state, and the exact issue being answered.
   - Draft exact reply text in chat before any send.
   - Keep replies tied to the partner's service, audience, commercial model, or open question.
   - Do not introduce pricing, commission, payments, contract terms, or pilot commitments without explicit user approval.
   - Update Business Partner `Last Reply At` for replies and update `Growth Stage` to `Contacted by Ioana`, `Negotiating`, `Pilot Active`, `Blocked`, or `Closed` only when evidence supports it. Set the matching timestamp field with every stage move.
   - Link Contracts only when there is a real agreement or contract workflow.

9. Follow-Up Drafting Packet
   - Inspect due follow-ups for sent pitches, partner replies, commercial approvals, blockers, and negotiation items.
   - Before each follow-up draft, show the initial partner/topic context, prior interaction, latest status, and the specific reason a follow-up adds value now.
   - Draft follow-up text in chat only when there is a specific reason and source context.
   - If no useful follow-up context exists, advance the due date, close the item, or mark it blocked.

10. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct daily/weekly/monthly reporting from Business Partner milestone timestamps and Growth Messages records for prospects researched, qualified partners, first-time email conversations opened, daily first-time email target met/missed, replies, meetings, pilots, blockers, and closed outcomes.
   - Report reply drafts, follow-up drafts, and commercial approval blockers.

## Output Packet

Return:

- Business Partners created/updated.
- Commercial approval needs.
- Growth Messages created/updated.
- Daily first-time email target state: target 5, sent/opened today, remaining, queued, and blockers.
- Pitch, reply, and follow-up previews awaiting approval.
- Follow-ups, blockers, and reporting counts.
