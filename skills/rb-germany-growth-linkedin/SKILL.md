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
- LinkedIn replies block until an overarching reply strategy has been proposed in chat, explicitly agreed by the user, saved on the prospect's Growth Target page, and read back before drafting or sending the reply.
- Default invite operating quota for the active first audience is 320 blank connection requests/month, calculated as a 16-request planning baseline across a 20-business-day month.
- Daily send range is 15-20 blank connection requests/business day after explicit approval and immediate Ioana-session verification.
- Daily invite counts are valid only for an explicitly declared quota date and timezone. Before deciding whether an invite batch is needed, build a Daily Invite Gate that shows the quota window, the current time, included connection-request sends, excluded previous/next-day sends, remaining count to 15, and remaining capacity to 20.
- Do not count accepted connections, first messages, replies, follow-ups, pending invite state, channel notes, or prior run packet summaries toward the daily blank-invite target.
- If the quota date is ambiguous because user, shell, browser, LinkedIn, or Notion timestamps fall on different calendar dates, block the invite count and ask for the quota date before reporting the target as met.
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

Date-boundary rule:

- Use `Sent/Posted At` first, then `Growth Event At`, to classify a connection request into the quota day.
- The quota window is `[quota date 00:00, next date 00:00)` in the declared timezone.
- A row created just after midnight in one timezone but still yesterday in the declared quota timezone is yesterday, not today.
- If the daily count is below 15, an `acceptance-check`, `first-message`, `reply-triage`, or `follow-up-sweep` run must still prompt the next invite-batch gap unless the user explicitly pauses LinkedIn invites for that quota date.
- Never say today's invite target is met from a prior-day batch. If that happens, write a correction packet and reopen the invite-batch stage.

## Data Routing

- Individual LinkedIn prospects go to Growth Targets, not Business Partners.
- A company, agency, or commercial counterparty discovered through LinkedIn goes to Business Partners only if there is a partner/commercial relationship.
- Connection requests are Growth Messages records tied to the Growth Target.
- Accepted-connection messages are drafted only after acceptance is verified.
- First messages, replies, blockers, and follow-ups are Growth Messages records tied to the Growth Target.
- The prospect's Growth Target page is the source of truth for LinkedIn reply strategy. Use a dedicated strategy property if one exists; otherwise save the strategy in a clearly labeled `LinkedIn Reply Strategy` section in the page content or target notes. Do not store the strategy only in a packet, chat, or Growth Message.
- A saved reply strategy must include: current thread context, the agreed objective for the next reply, the angle Ioana should take, what must not be mentioned, the proposed next step if the person engages, the approval basis, and a review date. Keep it prospect-specific enough that it would be wrong on another prospect's page.
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
   - Declare quota date and timezone before loading daily counts. If the user says `today` or `yesterday`, resolve it to an exact date in the user's operating timezone and print the exact date.
   - Load current-day sent counts for the declared quota window, monthly sent counts, pending requests, accepted connections awaiting first message, due follow-ups, and open blockers before proposing any send.
   - Print a Daily Invite Gate in every LinkedIn run, even when the selected mode is acceptance-check, first-message, follow-up-sweep, reply-triage, or reporting-only.
   - Verify LinkedIn account identity only when approaching a send-ready step.

2. Audience Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Current LinkedIn priority segment uses hard gates: currently Germany-based, clearly came from abroad, currently employed by, freelancing for, consulting for, or founding a company abroad while residing in Germany, and technology/operator relevance.
   - Highest-priority current-role signal: a foreign employer/client/company with no visible office in Germany or in the person's German city, making the person likely a remote employee, freelancer, contractor, consultant, EOR/payroll case, or self-employed operator.
   - Prefer explicit remote, freelance, contractor, consultant, fractional, self-employed, founder, or independent operator language when it appears alongside Germany residence and foreign-company/client signals.
   - Prefer US-headquartered, US-market, UK, Canadian, Swiss, Dutch, or otherwise foreign-company current roles where the Germany residence signal is visible and the company does not obviously operate a local German office for that city.
   - Under-40 is a useful positive signal, not a hard gate. Use it only when explicit public evidence or user-provided confirmation exists. Do not infer, estimate, store, or mention guessed age from photos, graduation years, seniority, or career length. Unknown age does not block a target that otherwise passes the hard gates.
   - Target people with strong Germany, came-from-abroad, current-foreign-employer, and tech signals:
     - Current Germany location or clear current Germany residence.
     - Current employer, client, or founded company outside Germany, especially where no German office or local-city office is visible.
     - Remote/distributed role for a foreign company, freelancing/contracting for foreign clients, international transfer, EOR-style work, or self-employed operator status.
     - Came-from-abroad evidence such as prior non-Germany work, non-Germany study, relocation writing, international-transfer context, or user-confirmed abroad origin.
     - Past US work experience.
     - Past US university/study experience.
     - US nationality/residency signals combined with current Germany location.
     - Current relocation-to-Germany signal.
   - Prioritize technology workers and founders with budget-qualified profiles:
     - Software engineering, product, data, cloud, cybersecurity, AI, fintech, startup, platform, devops, design, or technical leadership roles.
     - Remote-work, founder, startup, VC-backed, US-employer, foreign-employer, or international-transfer context.
     - Berlin, Munich, Hamburg, Frankfurt, Cologne, Dusseldorf, and other visible Germany tech-hub signals.
   - Block profiles where the Germany, came-from-abroad, current-foreign-employer, or technology signal is too weak to justify the request.
   - Block profiles where the only match is generic tech employment in Germany, a German-only local employer, a foreign employer with a clear local German office in the same city and no remote/freelance signal, broad job seeking, student-only status, an old foreign-employer role with no current foreign-company role, or a guessed age fit.
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
   - Block targets where the Germany, came-from-abroad, current-foreign-employer, or tech signal is too weak.
   - If the under-40 signal is part of qualification, use only explicit public evidence or user-provided confirmation. Never record estimated age. If age evidence is unknown, omit the signal and qualify on the hard gates.
   - Treat LinkedIn rules, approved claims, and Ioana identity as in-run compliance gates. Do not create compliance-check rows.

5. Connection Request Packet
   - Prepare a blank-invite approval packet in chat. Do not draft or add a personalized note unless the user explicitly asks for a note exception.
   - Show sender identity: Ioana, LinkedIn account/session pending verification.
   - Include target URL, qualification basis, and proposed follow-up date.
   - Qualification basis must name the visible Germany residence signal, came-from-abroad signal, current foreign-employer/company-abroad signal, whether the company appears to lack a German or same-city office or whether the person is explicitly freelance/remote/contracting, tech-role signal, and explicit under-40 evidence when available.
   - Include current month counts: planned invites, sent blank invites, remaining invite quota, Daily Invite Gate daily count, excluded prior/next-day invite rows, acceptance rate, meetings booked, and invite-to-meeting conversion where available.
   - If the declared quota-day count is below 15, show the exact invite gap and prepare enough qualified targets to reach at least 15 unless the user explicitly pauses the daily LinkedIn invite target.
   - Create/update a Growth Messages operating record only after the packet is accepted for tracking.

6. Approved Connection Send
   - Run only after explicit approval.
   - Re-check LinkedIn session is Ioana.
   - If not Ioana, write a blocker in Growth Messages and stop.
   - Recompute the Daily Invite Gate immediately before the first send. If the declared quota-day count changed, update the remaining gap and stop for re-approval unless the approved target count is still inside the remaining 15-20/day window.
   - If monthly quota is exhausted, daily count would exceed 20, the quota date is ambiguous, or LinkedIn displays any warning/restriction, write a blocker in Growth Messages and stop.
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
   - Cite at least one concrete public signal beyond the top card/headline: company/product name, specific feature, market, article, launch, role scope, technical area, shipped system, hiring post, technical post, conference talk, or founder decision.
   - Block the draft if it could be sent unchanged to many people in the batch.
   - Block the draft if the available source context is only name, location, company, title, broad headline, generic tech stack, or generic founder/operator status. Gather deeper source context first.
   - Include approved claims only; public claims remain provisional unless approved.
   - Do not mention RB services, tax offerings, sales funnels, or booking a call.
   - Make the message short, highly specific, non-salesy, and designed to start a genuine conversation.
   - Preview in chat with sender identity and source target.

9. Reply Drafting Packet
   - Inspect new replies and summarize what the person actually said.
   - Fetch the prospect's Growth Target page and prior Growth Messages before preparing any reply.
   - Before drafting reply text, produce a `Reply Strategy Packet` in chat for that prospect and ask the user to approve or revise the strategy.
   - The strategy packet must show: prospect URL, Growth Target URL, initial topic/source context, prior Ioana messages, latest reply context, what the person actually appears to care about, the proposed conversation strategy, what to avoid, and the next useful outcome.
   - Do not draft the reply text until the user explicitly agrees the strategy.
   - After strategy approval, save the agreed strategy to the prospect's Growth Target page and read it back. If save or readback fails, log a blocker and do not draft or send.
   - If a saved strategy already exists, read it back and show whether it still fits the latest reply. If the latest reply changes the direction, propose a strategy update and get approval before drafting.
   - The saved strategy must be updated before every substantive reply where the intent, tone, topic, or next outcome changes.
   - Once the strategy is agreed, saved, and read back, draft a reply in chat that follows that strategy and responds to their topic without using a preset sales setup.
   - Keep the reply founder/operator-to-founder/operator when relevant.
   - Do not pitch, mention services, ask for a call, or steer toward a sales setup. If the person explicitly asks for help, draft a neutral human reply for user review.
   - Preview exact reply text with sender identity, source target, agreed strategy summary, saved strategy location, and proposed follow-up date.

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
   - If this run sends first messages or replies but the Daily Invite Gate shows the quota-day blank-invite minimum is still unmet, the next prompt must be a LinkedIn invite-batch packet, not closeout.

## First-Time Message Guidance

Goal: start a real conversation about who they are and what they do. The first message is not a pitch, not a call ask, not a tax/admin services opener, and not a claim-heavy sales message. Any sale should happen later, outside the outreach copy.

Copy style:

- Avoid the word "path" in outbound copy.
- Avoid slash-heavy phrasing.
- Avoid list-style copy.
- Do not stack examples, alternatives, caveats, or issue lists in outward-facing text. Use one concrete point, or two only when the message truly needs both.
- Avoid mechanical contrast sentences that read like a template.
- Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must ask a pointed question, name a concrete source detail, or move the thread forward.
- Avoid comma-chain lists. Sentences should normally have at most two commas and never more than three.
- Do not over-polish first messages into corporate prose. Ioana's LinkedIn copy can use casual punctuation, sentence fragments, lowercase emphasis, and a small `lol` when it makes the line sound human.
- Less is more for first messages. Prefer one short `quick q` style message over a researched opener plus a question.
- Do not fake enthusiasm or pretend personal fascination. Avoid filler such as `wild combo`, `pretty unusual`, `pretty specific`, `made me think`, `made me wonder`, `I imagine`, `probably`, `cursed`, `real annoyance`, or similar praise/reaction language unless the user explicitly approves that exact line.
- Do not make the message prove research. Mention only the minimum concrete detail needed to make the question clear.
- A good first message should feel like a real DM someone would send after meeting online: direct, a little informal, and specific enough that it could not be sent to another person.
- Use `lol` sparingly. If several drafts in a packet use `lol`, rewrite most of them without it.
- If the user asks for imperfect human copy, allow light typos or rough punctuation, but do not create ambiguity, disrespect the person, or make Ioana sound careless.
- Do not use hyphen separators in outbound LinkedIn copy. Write like a chat message, using short sentences or commas instead.
- Avoid formulaic lines like `Germany probably makes...`, `admin and taxes here are...`, or any tax/admin aside in first messages.
- Never use contrast-template copy or questions that only offer generic binary options. This sounds artificial in Ioana's outreach.
- Do not make the question a binary-choice template unless the person's own post/source explicitly frames that exact tradeoff. Prefer one pointed question about a named workflow, product decision, technical constraint, customer type, or market behavior.
- Do not use vague anchor phrases like `your X stood out`, `the X stood out`, `X caught my eye`, `I noticed X`, `I was looking at X`, or `I got curious about X`. Name the actual post, product, system, feature, workflow, hiring need, technical decision, or profile note directly.
- Do not refer back to `the thing` as the message anchor. If the source detail matters, say exactly what it is.
- Avoid abstract proximity questions about customer closeness. They sound specific and still say nothing. Ask about a named product decision, workflow, user action, implementation constraint, or market behavior.
- Do not ask broad support questions such as `what support question kept coming back`, `what did users need help with`, or `what was the main issue`. Name the actual failure surface instead: permissions, queueing, configs, retries, observability, handoffs, approval step, migration step, or hidden infrastructure detail.
- Do not use infrastructure metaphors that only sound technical, such as `where did Kubernetes leak through`, `what leaked through`, or `where did infra show up`. Say the visible user-facing behavior in plain language: what was removed, what still required platform help, what error the user saw, what config they still had to touch, or what step stayed too technical.
- Questions must have specific meaning. Block generic objectless prompts such as `what has to stay configurable`, `what needs to stay flexible`, `what changed first`, `what gets weird`, or `where do people get stuck` unless the sentence names the exact object and operation being asked about.
- A specific question should name a concrete noun and action: employer contributions, pay schedule, DAG permissions, system-test selector, wallet transaction limit, robot-arm command mapping, model false negative, country rule import, or customer-facing approval.
- If the draft reads like it was optimized for conversion, rewrite it. The first message should feel like a casual technical/operator question, not a sales opener.
- Avoid sales-coded words unless the person's source uses them: `buyer`, `prospect`, `pipeline`, `conversion`, `trust`, `proof`, `value`, `commercial`, `market motion`, `pain point`, and `product feature`.
- Avoid over-proving research. One named detail is enough; do not turn the opener into a mini case study.
- Prefer one compact chat message, usually 15-30 words after `thanks for connecting`. Short and slightly underwritten is better than polished.
- Do not make every opener start with the same formula such as `I read your profile note`. Use normal chat phrasing.
- Do not use `sounds like` or `sounds [adjective/reaction]` as the source anchor. It is a hedge and reads like sales/AI copy. Make a pointed claim or ask the pointed question directly.
- Avoid adjacent hedge frames too: `is basically`, `must be`, `must have been`, and `seems like` should be rare and usually rewritten into a concrete claim or direct question.
- Do not use definitional or descriptive opener turns such as `[topic] is a...`, `[topic] is the...`, `[topic] is [adjective]`, `[topic] has the...`, or `[topic] feels like...`. Describing what the thing is adds little. Name the source detail and ask the pointed question.
- Do not bring tax/admin into first-time LinkedIn messages. Even when the source context involves payroll, compliance, banking, or cross-border employment, the first message should ask about the actual product, workflow, customer, or technical problem.
- Tax/admin can enter later replies only when the recipient has engaged, the thread context makes it natural, or the user explicitly approves the exact exception.
- If a first-message draft includes tax/admin, block and rewrite it around the source detail instead.
- Avoid opening every message with `on [topic]`. If several drafts start that way, rewrite them into more natural chat phrasing.
- Do not start a sentence with `with [topic]`. It is not natural chat phrasing. Use `for`, `inside`, `when`, or a direct question instead.

Rules:

- Keep it to 1-2 short sentences.
- Open with a concrete, named profile signal: the company they founded, the product, feature, customer segment, market, article, launch, named project, shipped system, technical decision, or founder decision.
- Ioana can reference operator/founder context only in natural wording. Avoid labels like "as a fellow tech founder" or "I am a tech founder too."
- The message must prove real attention. It should contain a detail that came from the person's profile, company site, post, article, or other approved source.
- A profile detail alone is not enough. The draft must identify a real operational detail in the person's work, then ask about that exact detail in a way that could not be reused for another person in the batch.
- Block drafts that simply restate the profile, company tagline, funding news, job title, or a public feature and then add a generic question.
- Prefer questions that are easy for the recipient to answer because they sit inside their daily work: what had to be hidden, constrained, sequenced, localized, simplified, made more conservative, or explained to a user/customer/doctor/buyer.
- Generic founder or professional language is blocked. Do not say "saw the founder angle", "saw your work", "what are you focused on", "specific thing", or any phrasing that sounds templated.
- "I am a big fan of [company/product]" is allowed only when paired with a specific reason, feature, product decision, article, or market move that Ioana can honestly point to.
- Bring up US-vs-Germany differences only when relevant to the person's actual source context, such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, developer adoption, healthcare admin, payroll, or cross-border employment. For first messages, do not make the difference about tax/admin.
- Ask one highly pointed, low-pressure question that is specific to the concrete signal. Good question shapes name one specific workflow, decision, audience, market, or technical constraint: "Where does [named constraint] show up first in [named workflow]?", "Was [specific source detail] mainly driven by [specific customer/user need]?", "Are German customers reacting differently to [specific feature] than US customers?", or "Did regulation/privacy/procurement change [specific part of the product]?"
- Do not ask for a call in the first message.
- Do not mention RB, services, discounts, savings claims, fear-based tax language, or broad marketing copy.
- Do not imply RB knows private facts. Use only visible profile/source evidence.
- Do not send if the only personalization available is the person's name, title, country, or generic founder status.

Good message shape:

```text
thanks for connecting [Name]. quick q on [specific product/post/system/workflow]: what happens when [pointed workflow/customer/technical constraint]?
```

Founder/operator variant:

```text
thanks for connecting [Name]. quick q on [specific product/launch/customer]: where do people usually get stuck?
```

Technical-role variant:

```text
thanks for connecting [Name]. quick q on [specific system] at [Company]: where does [specific component/workflow] get annoying?
```

Follow-up after no reply:

```text
no worries if this is too in the weeds.

still curious about [specific detail] in [specific workflow/product/customer moment].
```

Avoid:

- "We can save you EUR X."
- "Book a call now to learn about our offer."
- "Happy to jump on a quick call."
- "We help Americans in Germany with taxes/admin."
- "Where did buyers ask for proof?"
- "Trust feels like a product feature."
- "This creates the most friction."
- "Sounds like."
- "Sounds [adjective/reaction]."
- "Is basically."
- "Must be."
- "Must have been."
- "Seems like."
- "X is a Y."
- "X is the Y."
- "X is [adjective]."
- "X has the Y."
- "X feels like Y."
- "Saw the founder angle."
- "Saw your work."
- "What are you focused on this quarter?"
- "Saw you are working on something interesting."
- "As a fellow tech founder..."
- "I am a tech founder too..."
- "How are you thinking about that?"
- "Curious how you are thinking about this."
- "Your X stood out."
- "The X stood out."
- "X caught my eye."
- "I noticed X."
- "I was looking at X."
- "I got curious about X."
- "Not X but Y."
- "Not just X."
- "X rather than Y."
- "X instead of Y."
- "X vs Y."
- "Is the hard part X or Y?"
- Long explanations of RB services.
- Generic compliments unrelated to the profile.
- More than one question in the same message.

## Output Packet

Return:

- Growth Targets created/updated.
- Growth Messages created/updated.
- LinkedIn reply strategies proposed, approved, saved, read back, or blocked.
- Blockers and Ioana-gate status.
- Message previews awaiting approval.
- Follow-ups and reporting counts to advance.
