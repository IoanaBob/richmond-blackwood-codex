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
- Log every pre-lead request, first message, reply, blocker, and follow-up in Growth Messages.
- Default invite operating quota for the active first audience is 320 blank connection requests/month, calculated as a 16-request planning baseline across a 20-business-day month.
- Daily send range is 15-20 blank connection requests/business day after explicit approval and immediate Ioana-session verification.
- Treat LinkedIn platform limits as dynamic. Do not exceed the internal quota or 20/day without explicit user approval, current LinkedIn guidance review, and read-back of recent warnings, acceptance rate, pending-invite state, and meeting conversion.
- Do not add personalized connection-request notes by default. If the user requests an exception, require separate approval and respect the current LinkedIn personalized-note limit for Ioana's account.
- Stop immediately if LinkedIn shows a warning, temporary restriction, or unusual checkpoint. Log the blocker; do not work around it.

## Run Cadence And Modes

This skill can run multiple times per business day because LinkedIn state changes throughout the day. Each run should choose one or more modes and only advance the matching queue:

- `invite-batch`: prepare or send an approved block of blank connection requests inside the 15-20/day range.
- `acceptance-check`: check pending requests for accepted connections and update Growth Messages/Growth Targets.
- `first-message`: prepare first-message packets for newly accepted connections.
- `follow-up-sweep`: inspect due follow-ups and prepare follow-up drafts for review.
- `reply-triage`: inspect new LinkedIn replies and prepare reply drafts for review.
- `reporting-only`: reconstruct counts and conversion rates from timestamped records without preparing sends.

Suggested operating rhythm:

- Morning: queue and send approved blank invite batch; check overnight acceptances/replies.
- Midday: acceptance check and first-message packets for newly accepted connections.
- Afternoon: second invite batch only if daily quota and approval remain available; follow-up sweep.
- End of day: reporting-only closeout and next-day queue preparation.

Do not duplicate sends across intra-day runs. Every run must read current Growth Messages and Growth Targets before proposing a send.

## Data Routing

- Individual LinkedIn prospects go to Growth Targets, not Business Partners.
- A company, agency, or commercial counterparty discovered through LinkedIn goes to Business Partners only if there is a partner/commercial relationship.
- Connection requests are Growth Messages records tied to the Growth Target.
- Accepted-connection messages are drafted only after acceptance is verified.
- First messages, replies, blockers, and follow-ups are Growth Messages records tied to the Growth Target.
- Promote/link to canonical Communications only when the thread becomes a lead, client, or business communication that belongs in the main RB communications ledger.

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
   - Load active Audience Target, Growth Targets schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Choose run mode(s): `invite-batch`, `acceptance-check`, `first-message`, `follow-up-sweep`, `reply-triage`, or `reporting-only`.
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
   - Set `Stage Updated At` and `Last Activity At` on Growth Targets whenever stage or material state changes.
   - Do not store sensitive personal details in git.
   - Track each planned invite against the current monthly LinkedIn quota. Default every request to blank/no-note.

4. Qualification
   - Classify each target as `Research`, `Qualified`, `Blocked`, or not relevant using available Growth Target status fields.
   - Record qualification evidence in Growth Target notes and, when action is needed, Growth Messages or Tasks.
   - When a target becomes qualified, set `Qualified At`; when it becomes blocked, set `Blocked At`.
   - Block targets where the US/Germany signal is too weak.
   - Treat LinkedIn rules, approved claims, and Ioana identity as in-run compliance gates. Do not create compliance-check rows.

5. Connection Request Packet
   - Prepare a blank-invite approval packet in chat. Do not draft or add a personalized note unless the user explicitly asks for a note exception.
   - Show sender identity: Ioana, LinkedIn account/session pending verification.
   - Include target URL, qualification basis, and proposed follow-up date.
   - Include current month counts: planned invites, sent blank invites, remaining invite quota, daily send count, acceptance rate, meetings booked, and invite-to-meeting conversion where available.
   - Create/update a Growth Messages operating record only after the packet is accepted for tracking.

6. Approved Connection Send
   - Run only after explicit approval.
   - Re-check LinkedIn session is Ioana.
   - If not Ioana, write a blocker in Growth Messages and stop.
   - If monthly quota is exhausted, daily count would exceed 20, or LinkedIn displays any warning/restriction, write a blocker in Growth Messages and stop.
   - Send the approved blank request directly and log result in Growth Messages with `Message Kind = Connection Request`, `Status = Sent/Posted`, `Growth Event At`, `Sent/Posted At`, and next follow-up.
   - Move the Growth Target to `Outreach Active` only with `Outreach Active At`, `Stage Updated At`, and `Last Activity At`.

7. Acceptance Check
   - This stage may run several times per day.
   - On later runs, check whether the connection was accepted.
   - If not accepted, advance follow-up dates without messaging.
   - If accepted, update the Growth Target with `Last Activity At`, create/update a Growth Messages first-message item with `Message Kind = First Message`, `Status = Draft` or `Needs Approval`, and `Growth Event At`, and move to accepted-message drafting.

8. Accepted-Connection Message Packet
   - Draft the first message only after acceptance is verified.
   - Before each draft, show the initial topic/source context: who the person is, what public signal triggered the message, the exact company/product/post/project detail being referenced, and why it is relevant to Ioana.
   - Use a helpful, low-pressure opener tailored to who the person is and what they do.
   - Cite at least one concrete public signal: company/product name, specific feature, market, article, launch, role scope, technical area, or founder decision.
   - Block the draft if it could be sent unchanged to many people in the batch.
   - Include approved claims only; public claims remain provisional unless approved.
   - Do not mention RB services, tax offerings, sales paths, or booking a call.
   - Make the message short, highly specific, non-salesy, and designed to start a genuine conversation.
   - Preview in chat with sender identity and source target.

9. Reply Drafting Packet
   - Inspect new replies and summarize what the person actually said.
   - Before each reply draft, show the initial topic/source context and the latest reply context so the user can see what the draft is responding to.
   - Draft a reply in chat that responds to their topic, not a preset sales path.
   - Keep the reply founder/operator-to-founder/operator when relevant.
   - Do not pitch, mention services, ask for a call, or steer toward a sales path. If the person explicitly asks for help, draft a neutral human reply for user review rather than converting the thread into an offer.
   - Preview exact reply text with sender identity, source target, and proposed follow-up date.

10. Follow-Up Drafting Packet
   - Inspect due follow-ups for accepted connections, first messages, replies, and blockers.
   - Before each follow-up draft, show the initial topic/source context, previous message context, and the specific reason a follow-up adds value now.
   - Draft follow-ups only when there is a reason beyond "checking in": their work, product, founder context, relocation context, or a previous thread detail.
   - Keep follow-ups short and human; no pressure, no call ask, no sales framing.
   - If no useful context exists, advance the follow-up date or close the thread instead of drafting filler.

11. Approved Message Send And Follow-Up
   - Re-check Ioana LinkedIn session before sending.
   - Send only the approved text.
   - Log send URL/message ID if available, response state, `Message Kind`, `Status`, `Growth Event At`, `Sent/Posted At` or `Received At`, and next follow-up in Growth Messages.
   - Promote/link to canonical Communications only if the thread becomes a lead/client/business communication.
   - Do not write a summary reporting row. Reconstruct invite quota, blank connection requests, acceptances, accepted-connection messages, replies, blockers, meetings, and invite-to-meeting conversion by querying Growth Messages and Growth Target timestamps.

## First-Time Message Guidance

Goal: start a real conversation about who they are and what they do. The first message is not a pitch, not a path to a call, not a tax/admin services opener, and not a claim-heavy sales message. Any sale should happen later, outside the outreach copy.

Rules:

- Keep it to 2-4 short sentences.
- Open with a concrete, named profile signal: the company they founded, the product, feature, customer segment, market, article, launch, named project, shipped system, technical decision, or founder decision.
- Ioana can reference operator/founder context only in natural wording. Avoid labels like "as a fellow tech founder" or "I am a tech founder too."
- The message must prove real attention. It should contain a detail that came from the person's profile, company site, post, article, or other approved source.
- Generic founder or professional language is blocked. Do not say "saw the founder angle", "saw your work", "what are you focused on", "specific thing", or any phrasing that sounds templated.
- "I am a big fan of [company/product]" is allowed only when paired with a specific reason, feature, product decision, article, or market move that Ioana can honestly point to.
- Bring up US-vs-Germany differences when relevant: use admin/taxes only as a passing joke, then add one second difference tied to the person's actual topic, such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, or developer adoption.
- Preferred tax aside: "Admin and taxes I'm sure were much easier in the States."
- Ask one highly pointed, low-pressure question that is specific to the concrete signal. Good question shapes name a specific decision, tradeoff, audience, market, or technical constraint: "Did X push you toward Y instead of Z?", "Was A the reason you chose B?", "Are German customers reacting differently to C than US customers?", or "Did regulation/privacy/procurement change D?"
- Do not ask for a call in the first message.
- Do not mention RB, services, discounts, savings claims, fear-based tax language, or broad marketing copy.
- Do not imply RB knows private facts. Use only visible profile/source evidence.
- Do not send if the only personalization available is the person's name, title, country, or generic founder status.

Good message shape:

```text
Thanks for connecting, [Name]. Saw you founded [Company] - I am a big fan of [specific product/feature/positioning], especially the way you are handling [specific customer/problem/technical tradeoff].

Admin and taxes I'm sure were much easier in the States. On [specific topic], did [Germany-specific constraint] push you toward [specific product/market decision] instead of [specific alternative]?
```

Germany move opener:

```text
Thanks for connecting, [Name]. Admin and taxes I'm sure were much easier in the States.

Also saw you founded [Company] and are building [specific product] for [specific audience]. I liked [specific feature/positioning] - are German [customers/developers/buyers] pushing harder on [specific requirement] than US ones?
```

Founder/operator variant:

```text
Thanks for connecting, [Name]. Saw you founded [Company]; I have been following [specific launch/product/post] and really liked [specific reason].

Admin and taxes I'm sure were much easier in the States, but the part that seems more relevant to [Company] is [topic-specific difference]. Did that change [specific go-to-market/product/hiring/fundraising decision]?
```

Technical-role variant:

```text
Thanks for connecting, [Name]. The [specific project/system/post/launch] at [Company] caught my eye - especially [specific technical or market detail].

Admin and taxes I'm sure were much easier in the States. For [technical/product area], did [privacy/procurement/infrastructure/customer-behavior difference] force a different [architecture/roadmap/sales motion] for [specific thing]?
```

Follow-up after no reply:

```text
No pressure on this, [Name] - I asked because [specific product/feature/post/company move] stood out to me.

Still curious whether [specific constraint] made you choose [specific decision] over [specific alternative].
```

Avoid:

- "We can save you EUR X."
- "Book a call now to learn about our offer."
- "Happy to jump on a quick call."
- "We help Americans in Germany with taxes/admin."
- "Saw the founder angle."
- "Saw your work."
- "What are you focused on this quarter?"
- "Saw you are working on something interesting."
- "As a fellow tech founder..."
- "I am a tech founder too..."
- "How are you thinking about that?"
- "Curious how you are thinking about this."
- Long explanations of RB services.
- Generic compliments unrelated to the profile.
- More than one question in the same message.

## Output Packet

Return:

- Growth Targets created/updated.
- Growth Messages created/updated.
- Blockers and Ioana-gate status.
- Message previews awaiting approval.
- Follow-ups and reporting counts to advance.
