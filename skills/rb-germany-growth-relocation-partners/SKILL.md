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
- Log every send, reply, blocker, commercial approval, and follow-up in canonical Communications.
- Commercial terms and sponsorship/payment commitments remain approval-gated.

## Data Routing

- Every relocation agent, expat coach, immigration-adjacent firm, tax/visa/admin advisory firm, or professional referral partner goes directly to Business Partners.
- Put the official website in `Website`.
- Put contact route, audience fit, service focus, commercial model, approval state, next action, and source notes in `Notes`.
- Use `Audience Target`, `Growth Channel = Relocation Partnerships`, `Growth Stage`, and `Ioana Gate` when available.
- Link Contracts only later through the existing Contracts relation if a real agreement exists.

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
   - Load active Audience Target, Business Partners schema, Communications schema, Compliance Checks, Metrics, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.

2. Audience And Partner Criteria
   - Default audience is `Americans in Germany / relocating to Germany`.
   - Target firms that influence the relocation decision or early German admin setup:
     - Relocation agents.
     - Expat coaches.
     - Immigration/visa-adjacent service firms.
     - International tax, legal, accounting, or admin firms.
     - US-to-Germany professional communities with a commercial operator.

3. Discovery And Business Partner Upsert
   - Search approved sources or user-provided lists.
   - Dedupe by legal/brand name, website, domain, and contact route.
   - Create/update Business Partners immediately for all plausible partner prospects.
   - Store source URL, audience evidence, service overlap, and contact route in `Notes`.

4. Qualification
   - Classify `Growth Stage` as `Research`, `Qualified`, `Blocked`, or `Closed`.
   - Mark blockers for weak audience fit, unclear contact route, restricted solicitation, competitor conflict, or missing approval.
   - Keep public claims provisional unless approved.

5. Commercial Model Review
   - Identify likely model: referral, content partnership, paid placement, co-marketing, webinar, affiliate, service bundle, or other.
   - Do not offer pricing, commission, payments, or contract terms without user approval.
   - Preserve proposed commercial terms and approval state in Business Partner `Notes` and Communications.

6. Pitch Draft Packet
   - Draft outreach in chat, personalized to the partner type and active audience.
   - Show sender identity as Ioana and the required account/session verification.
   - Include Business Partner URL, website, contact route, commercial assumptions, and next follow-up date.

7. Approved Send
   - Run only after explicit approval.
   - Re-check the sending session is Ioana.
   - If not Ioana, log a blocker in Communications and stop.
   - Send the approved message directly through the supported route.
   - Log send result, URL/message ID, and follow-up in Communications.

8. Reply, Negotiation, And Pilot Tracking
   - Route replies into Communications.
   - Update Business Partner `Growth Stage` to `Contacted by Ioana`, `Negotiating`, `Pilot Active`, `Blocked`, or `Closed` only when evidence supports it.
   - Link Contracts only when there is a real agreement or contract workflow.

9. Metrics And Closeout
   - Update Metrics for prospects researched, qualified partners, pitches, replies, meetings, pilots, blockers, and closed outcomes.
   - Report follow-ups and commercial approval blockers.

## Output Packet

Return:

- Business Partners created/updated.
- Commercial approval needs.
- Communications created/updated.
- Pitch previews awaiting approval.
- Follow-ups, blockers, and metrics.
