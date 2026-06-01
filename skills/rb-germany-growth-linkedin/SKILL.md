---
name: rb-germany-growth-linkedin
description: LinkedIn direct-connect, acceptance-check, first-message, reply, and follow-up flow for RB Germany growth, using Growth Targets for individuals and Ioana-only send gates.
---

# RB Germany Growth LinkedIn

Use this skill for LinkedIn prospect research, connection request planning, acceptance checks, accepted-connection first messages, replies, follow-ups, and logging for a Germany growth audience target. This skill may be run several times per business day.

## Hard Gates

- Sender persona is always Ioana.
- Connection requests and messages block unless the active LinkedIn account/session is verified as Ioana immediately before sending.
- Do not send during daily automation.
- Preview outbound text in chat. Do not save LinkedIn drafts.
- Send only after explicit user approval for the exact request or message.
- Log every request, reply, blocker, and follow-up in canonical Communications.
- Default invite operating quota for the active first audience is 320 blank connection requests/month, calculated as a 16-request planning baseline across a 20-business-day month.
- Daily send range is 15-20 blank connection requests/business day after explicit approval and immediate Ioana-session verification.
- Treat LinkedIn platform limits as dynamic. Do not exceed the internal quota or 20/day without explicit user approval, current LinkedIn guidance review, and read-back of recent warnings, acceptance rate, pending-invite state, and meeting conversion.
- Do not add personalized connection-request notes by default. If the user requests an exception, require separate approval and respect the current LinkedIn personalized-note limit for Ioana's account.
- Stop immediately if LinkedIn shows a warning, temporary restriction, or unusual checkpoint. Log the blocker; do not work around it.

## Run Cadence And Modes

This skill can run multiple times per business day because LinkedIn state changes throughout the day. Each run should choose one or more modes and only advance the matching queue:

- `invite-batch`: prepare or send an approved block of blank connection requests inside the 15-20/day range.
- `acceptance-check`: check pending requests for accepted connections and update Communications/Growth Targets.
- `first-message`: prepare first-message packets for newly accepted connections.
- `follow-up-sweep`: advance due follow-ups, stale acceptances, pending messages, blockers, and Tasks.
- `reply-triage`: inspect new LinkedIn replies and prepare response or call-booking packets.
- `metrics-only`: update counts and conversion rates without preparing sends.

Suggested operating rhythm:

- Morning: queue and send approved blank invite batch; check overnight acceptances/replies.
- Midday: acceptance check and first-message packets for newly accepted connections.
- Afternoon: second invite batch only if daily quota and approval remain available; follow-up sweep.
- End of day: metrics-only closeout and next-day queue preparation.

Do not duplicate sends across intra-day runs. Every run must read current Communications and Growth Targets before proposing a send.

## Data Routing

- Individual LinkedIn prospects go to Growth Targets, not Business Partners.
- A company, agency, or commercial counterparty discovered through LinkedIn goes to Business Partners only if there is a partner/commercial relationship.
- Connection requests are Communications records tied to the Growth Target.
- Accepted-connection messages are drafted only after acceptance is verified.
- First messages, replies, call asks, blockers, and follow-ups are Communications records tied to the Growth Target.

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
   - Choose run mode(s): `invite-batch`, `acceptance-check`, `first-message`, `follow-up-sweep`, `reply-triage`, or `metrics-only`.
   - Load current-day sent counts, monthly sent counts, pending requests, accepted connections awaiting first message, due follow-ups, and open blockers before proposing any send.
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
   - Track each planned invite against the current monthly LinkedIn quota. Default every request to blank/no-note.

4. Qualification
   - Classify each target as `Research`, `Qualified`, `Blocked`, or not relevant using available Growth Target status fields.
   - Record qualification evidence in Growth Target notes and, when action is needed, Communications or Tasks.
   - Block targets where the US/Germany signal is too weak.

5. Connection Request Packet
   - Prepare a blank-invite approval packet in chat. Do not draft or add a personalized note unless the user explicitly asks for a note exception.
   - Show sender identity: Ioana, LinkedIn account/session pending verification.
   - Include target URL, qualification basis, and proposed follow-up date.
   - Include current month counts: planned invites, sent blank invites, remaining invite quota, daily send count, acceptance rate, meetings booked, and invite-to-meeting conversion where available.
   - Create/update a Communications operating record only after the packet is accepted for tracking.

6. Approved Connection Send
   - Run only after explicit approval.
   - Re-check LinkedIn session is Ioana.
   - If not Ioana, write a blocker in Communications and stop.
   - If monthly quota is exhausted, daily count would exceed 20, or LinkedIn displays any warning/restriction, write a blocker in Communications and stop.
   - Send the approved blank request directly and log result in Communications with next follow-up.

7. Acceptance Check
   - This stage may run several times per day.
   - On later runs, check whether the connection was accepted.
   - If not accepted, advance follow-up dates without messaging.
   - If accepted, update the Growth Target, create/update a Communications first-message item, and move to accepted-message drafting.

8. Accepted-Connection Message Packet
   - Draft the first message only after acceptance is verified.
   - Use a helpful, low-pressure opener tailored to the person's profile signal.
   - Include approved claims only; public claims remain provisional unless approved.
   - Make the message short, specific, non-salesy, and conducive to a call.
   - Preview in chat with sender identity and source target.

9. Approved Message Send And Follow-Up
   - Re-check Ioana LinkedIn session before sending.
   - Send only the approved text.
   - Log send URL/message ID if available, response state, and next follow-up in Communications.
   - Update Metrics for monthly invite quota, blank connection requests, acceptances, accepted-connection messages, replies, blockers, meetings, and invite-to-meeting conversion.

## First-Time Message Guidance

Goal: start a relevant conversation that can naturally become a 15-minute call. The first message is not a pitch deck, not a service dump, and not a claim-heavy sales message.

Rules:

- Keep it to 2-4 short sentences.
- Open with the relevant profile signal: US background, current Germany location, tech role, founder/remote-worker context, or recent move.
- State the useful context in plain language: German tax/admin/company setup, relocation friction, cross-border setup, or freelancer/founder admin.
- Ask one direct, low-pressure question.
- Offer a short call only when it follows from the question.
- Do not mention discounts, savings claims, fear-based tax language, or broad marketing copy.
- Do not imply RB knows private facts. Use only visible profile/source evidence.
- Do not send if the only personalization available is the person's name.

Good message shape:

```text
Thanks for connecting, [Name]. I noticed the US -> Germany tech path in your profile, and we often speak with people who are trying to make the German tax/admin side less painful after moving.

Is that something on your plate at the moment, or already handled?
```

Call-oriented variant:

```text
Thanks for connecting, [Name]. Saw you are in [role/field] and now based around [city/Germany]; that US-to-Germany setup can create a lot of tax and admin friction.

If any of that is currently open, happy to compare notes on a quick 15-minute call.
```

Founder/company setup variant:

```text
Thanks for connecting, [Name]. I noticed the founder/startup angle and the Germany move signal.

We help with the practical German tax/admin setup around that. If you are still deciding how to structure it, worth a quick 15-minute chat?
```

Employee/relocation variant:

```text
Thanks for connecting, [Name]. Saw the US background and Germany tech role.

Quick question: have you already sorted the German tax/admin side of the move, or is that still creating friction?
```

Follow-up after no reply:

```text
Just checking whether this is relevant, [Name]. If German tax/admin setup is already handled, no need to reply. If it is still open, I can point you in the right direction or set up a short call.
```

Avoid:

- "We can save you EUR X."
- "Book a call now to learn about our offer."
- Long explanations of RB services.
- Generic compliments unrelated to the profile.
- More than one question in the same message.

## Output Packet

Return:

- Growth Targets created/updated.
- Communications created/updated.
- Blockers and Ioana-gate status.
- Message previews awaiting approval.
- Follow-ups and metrics to advance.
