---
name: rb-germany-growth-linkedin
description: LinkedIn direct-connect and accepted-connection message flow for RB Germany growth, using Growth Targets for individuals and Ioana-only send gates.
---

# RB Germany Growth LinkedIn

Use this skill for LinkedIn prospect research, connection request planning, accepted-connection messaging, follow-ups, and logging for a Germany growth audience target.

## Hard Gates

- Sender persona is always Ioana.
- Connection requests and messages block unless the active LinkedIn account/session is verified as Ioana immediately before sending.
- Do not send during daily automation.
- Preview outbound text in chat. Do not save LinkedIn drafts.
- Send only after explicit user approval for the exact request or message.
- Log every request, reply, blocker, and follow-up in canonical Communications.
- Default invite operating quota for the active first audience is 80 connection requests/month, calculated as 4 Ioana-verified requests per business day across a conservative 20-business-day month.
- Treat LinkedIn platform limits as dynamic. Do not exceed the internal quota without explicit user approval, current LinkedIn guidance review, and read-back of recent warnings, acceptance rate, and pending-invite state.
- Use no more than 3 personalized connection-request notes/month unless Ioana Premium is verified. Blank connection requests may still be used inside the invite quota; message only after acceptance.
- Stop immediately if LinkedIn shows a warning, temporary restriction, or unusual checkpoint. Log the blocker; do not work around it.

## Data Routing

- Individual LinkedIn prospects go to Growth Targets, not Business Partners.
- A company, agency, or commercial counterparty discovered through LinkedIn goes to Business Partners only if there is a partner/commercial relationship.
- Connection requests are Communications records tied to the Growth Target.
- Accepted-connection messages are drafted only after acceptance is verified.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-linkedin/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends. The master daily run may use this skill for read/plan work only.

Shared gates:

- No connection request or message is sent before exact text approval.
- No first message is drafted until connection acceptance is verified.
- Stop if Ioana is not the verified active LinkedIn session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Communications schema, Compliance Checks, Metrics, and relevant Tasks.
   - Verify LinkedIn account identity only when approaching a send-ready step.

2. Audience Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Target people with a plausible US signal and Germany signal:
     - Past US work experience.
     - Past US university/study experience.
     - US nationality/residency signals combined with current Germany location.
     - Current relocation-to-Germany signal.
   - Prioritize technology workers and founders:
     - Software engineering, product, data, cloud, cybersecurity, AI, fintech, startup, platform, devops, design, or technical leadership roles.
     - Remote-work, founder, startup, VC-backed, or international-transfer context.
     - Berlin, Munich, Hamburg, Frankfurt, Cologne, Dusseldorf, and other visible Germany tech-hub signals.
   - Block profiles where the US, Germany, or technology signal is too weak to justify the request.
   - Keep the criteria reusable for future Germany growth audiences.

3. Discovery And Dedupe
   - Search approved sources or user-provided lists.
   - Dedupe by LinkedIn URL, name, current company, and location.
   - Create/update Growth Targets with profile URL, audience, channel, status, evidence notes, and next action.
   - Do not store sensitive personal details in git.
   - Track each planned invite against the current monthly LinkedIn quota and note whether it is a blank request or one of the monthly personalized-note slots.

4. Qualification
   - Classify each target as `Research`, `Qualified`, `Blocked`, or not relevant using available Growth Target status fields.
   - Record qualification evidence in Growth Target notes and, when action is needed, Communications or Tasks.
   - Block targets where the US/Germany signal is too weak.

5. Connection Request Packet
   - Draft a short, non-promotional connection request in chat.
   - Show sender identity: Ioana, LinkedIn account/session pending verification.
   - Include target URL, qualification basis, and proposed follow-up date.
   - Include current month counts: planned invites, sent invites, remaining invite quota, personalized notes used, and personalized notes remaining.
   - Create/update a Communications operating record only after the packet is accepted for tracking.

6. Approved Connection Send
   - Run only after explicit approval.
   - Re-check LinkedIn session is Ioana.
   - If not Ioana, write a blocker in Communications and stop.
   - If monthly quota is exhausted, if the personalized-note cap would be exceeded, or if LinkedIn displays any warning/restriction, write a blocker in Communications and stop.
   - Send the approved request directly and log result in Communications with next follow-up.

7. Acceptance Check
   - On later runs, check whether the connection was accepted.
   - If not accepted, advance follow-up dates without messaging.
   - If accepted, move to accepted-message drafting.

8. Accepted-Connection Message Packet
   - Draft the first message only after acceptance is verified.
   - Use a helpful, low-pressure opener tailored to the audience signal.
   - Include approved claims only; public claims remain provisional unless approved.
   - Preview in chat with sender identity and source target.

9. Approved Message Send And Follow-Up
   - Re-check Ioana LinkedIn session before sending.
   - Send only the approved text.
   - Log send URL/message ID if available, response state, and next follow-up in Communications.
   - Update Metrics for monthly invite quota, connection requests, personalized notes, acceptances, messages, replies, blockers, and meetings.

## Output Packet

Return:

- Growth Targets created/updated.
- Communications created/updated.
- Blockers and Ioana-gate status.
- Message previews awaiting approval.
- Follow-ups and metrics to advance.
