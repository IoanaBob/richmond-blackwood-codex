---
name: rb-germany-growth-linkedin
description: LinkedIn direct-connect, acceptance-check, first-message, reply, and follow-up flow for RB Germany growth, using Growth Targets for individuals, Eran sender gates, and Ioana call-booking handoff.
---

# RB Germany Growth LinkedIn

Use this skill for LinkedIn prospect research, connection request planning, acceptance checks, accepted-connection first messages, replies, follow-ups, and logging for a Germany growth audience target. This skill may be run several times per business day.

## Hard Gates

- Current LinkedIn sender persona is Eran Richmond Blackwood unless the user explicitly switches the sender for a run.
- Connection requests and messages block unless the active LinkedIn account/session is verified as Eran Richmond Blackwood immediately before sending.
- When a prospect is ready to book a call, switch the scheduling/meeting persona to Ioana: use Ioana's calendar, Ioana's meeting invite sender, and state the handoff in the approval packet when it matters for the prospect-facing text.
- Do not use Ioana-specific personal claims in Eran-authored LinkedIn messages unless the user explicitly switches that thread/run to Ioana or the message is a booked-call handoff.
- LinkedIn contacts are persona-owned in Growth Targets. Ioana contacts stay owned by Ioana; Eran contacts stay owned by Eran. Sender changes do not reset, hide, or close another persona's contacts.
- Before any connection request, first message, reply, or follow-up packet, run the cross-persona conflict gate. If the same person is already owned by the other persona, block new outreach from the active sender and produce a handoff/reassignment packet.
- Prefer the guarded local `linkedin` MCP server for LinkedIn reads when available. The guarded MCP must run through `setup/mcp/linkedin-guard-proxy.mjs` with `RB_LINKEDIN_MCP_MODE=read_only` for normal work; do not use the upstream LinkedIn MCP server raw inside Codex.
- In read-only MCP mode, `send_message`, `connect_with_person`, and unknown write tools must be unavailable. If they appear, treat the MCP setup as unsafe, stop, and fix the local MCP config before using it.
- If the native Codex `linkedin` MCP namespace is missing or appears degraded, do not immediately mark LinkedIn blocked and do not switch to another channel. First run the repo guard recovery checks: `node --check setup/mcp/linkedin-guard-proxy.mjs`, `setup/mcp/linkedin-login.sh status` outside the sandbox when browser launch is needed, and a read-only guard smoke test that verifies `rb_linkedin_guard_status`, hidden write tools, and `get_my_profile = Eran Peer` when possible. If the guard works but Codex has not reloaded the native namespace, use the guarded MCP route directly for read/plan packets or state clearly that a Codex reload is required before native tool calls.
- LinkedIn is blocked only after the MCP recovery packet is printed with the exact failing command, observed failure, attempted recovery, and next remediation. A missing native namespace alone is not a LinkedIn blocker when the guarded MCP can be invoked directly.
- Safeguards mean account-protection controls, not a permanent ban on writes. LinkedIn MCP writes are allowed with permission only inside an approved send stage.
- Do not enable LinkedIn MCP `approved_write` mode except for a time-bounded approved send stage after the exact packet approval, daily quota gate, pacing plan, immediate Eran-session verification, warning/restriction stop rule, and Growth Messages logging plan are all in place.
- Revert the LinkedIn MCP config to `RB_LINKEDIN_MCP_MODE=read_only` after the approved send stage ends.
- Do not send during daily automation.
- Preview outbound text in chat. Do not save LinkedIn drafts.
- Send only after explicit user approval for the exact request or message.
- A quota reminder, `continue`, `do it`, `approved`, or a general instruction to run the channel is not enough to send a LinkedIn invite batch. The user must approve the exact printed target list for the current stage, or name the exact targets to send. If that exact-list approval is missing or ambiguous, stop at the packet and ask for review.
- Log every pre-lead request, first message, reply, blocker, and follow-up in Growth Messages.
- LinkedIn replies block until an overarching reply strategy has been proposed in chat, explicitly agreed by the user, saved on the prospect's Growth Target page, and read back before drafting or sending the reply.
- Default invite operating quota for the active first audience is 200 blank connection requests/month, calculated as a 10-request planning baseline across a 20-business-day month.
- Daily invite-batch target is 10 blank connection requests per quota day after explicit approval and immediate Eran-session verification. The old 15-request rule is superseded and must not be used. Status: approved. Source: user instruction in chat. Imported: 2026-06-11. Review: revisit only if the user explicitly changes the quota again.
- Daily invite counts are valid only for an explicitly declared quota date and timezone. Before deciding whether an invite batch is needed, build a Daily Invite Gate that shows the quota window, the current time, included connection-request sends, excluded previous/next-day sends, and remaining count to 10.
- Do not count accepted connections, first messages, replies, follow-ups, pending invite state, channel notes, or prior run packet summaries toward the daily blank-invite target.
- If the quota date is ambiguous because user, shell, browser, LinkedIn, or Notion timestamps fall on different calendar dates, block the invite count and ask for the quota date before reporting the target as met.
- Treat LinkedIn platform limits as dynamic. Do not exceed the internal quota or 10/day without explicit user approval, current LinkedIn guidance review, and read-back of recent warnings, acceptance rate, pending-invite state, and meeting conversion.
- Do not add personalized connection-request notes by default. If the user requests an exception, require separate approval and respect the current LinkedIn personalized-note limit for Eran's account.
- Stop immediately if LinkedIn shows a warning, temporary restriction, or unusual checkpoint. Log the blocker; do not work around it.
- If a sent batch later proves materially off-target, do not defend the batch or continue sending. Write a correction packet, mark the bad targeting reason in run state, and rebuild the next packet under stricter criteria.
- `Open to Work` exclusion is a hard targeting gate. Do not invite, first-message, reply-follow-up, or start any further outreach with profiles showing LinkedIn `Open to Work`, `#OPEN_TO_WORK`, job-seeking, unemployed, career-transition, or recruiter-facing job-hunt signals unless the user explicitly approves that exact person as an exception.
- If an `Open to Work` profile is already connected but has no substantive thread, block the first message and remove the person from the send list. If the person was already contacted before this rule, close or block further proactive outreach unless they reply with a business-relevant Germany setup, freelance, company, tax, admin, or remote-employment signal and the user explicitly approves the exact continuation.
- For the first LinkedIn audience, `foreigner in Germany` is a hard invite gate, not a preference. Do not qualify German-local profiles just because they are freelancers, contractors, technical, or high quality. Every invite target must have visible evidence that the person came to Germany from abroad or has an explicit non-Germany background; if that evidence is missing, block the invite unless the user approves that exact person as an exception.

## Current Sender Persona

- Status: approved. Source: user instruction in chat. Imported: 2026-06-11. Review: active until the user changes the LinkedIn sender again.
- Current LinkedIn outreach sender is Eran Richmond Blackwood.
- Booked-call handoff uses Ioana: when the prospect is ready for a call, scheduling and meeting ownership switch to Ioana, using Ioana's calendar and invite sender.
- Eran-authored LinkedIn copy must not borrow Ioana's personal biography, shared nationality/language hooks, or past personal claims unless the user explicitly says that thread has switched to Ioana.
- The 2026-06-11 switch to Eran superseded Ioana as the default LinkedIn sender, but it did not delete Ioana-owned contacts. Keep all Ioana-owned Growth Targets active under Ioana's `Owner`, keep all Eran-owned Growth Targets active under Eran's `Owner`, and filter action queues by the active sender owner after running the global conflict check.

## Contact Ownership And Conflict Gate

- Growth Targets `Owner` is the contact owner. Set Ioana as `Owner` for contacts first requested, messaged, replied to, or managed by Ioana. Set Eran as `Owner` for contacts first requested, messaged, replied to, or managed by Eran.
- If `Owner` is missing, infer it only from evidence: linked Growth Messages `Sender Identity = Ioana`, `Platform Account` containing Ioana/Eran, prior packet sender verification, or explicit user instruction. If no evidence exists, mark the item blocked for owner backfill before any send-ready step.
- If evidence says Ioana and Eran both touched the same person, treat it as `Conflict - Cross Persona`. Do not send. Print a conflict packet with both records, source URLs, message/thread evidence, proposed surviving owner, proposed duplicate close/merge action, and ask for approval.
- Normalize LinkedIn profile URLs before dedupe: strip query strings, locale parameters, trailing slashes, `/overlay/contact-info/`, and lower-case the `/in/<vanity>` key. Also compare visible thread URL, message URL, message IDs, target name plus current company/location, and any user-provided profile URL.
- Queue reads are two-step: first read all LinkedIn Growth Targets/Growth Messages for global conflict detection; then filter the active queue by `Owner = active sender`. Other persona rows do not count toward the active sender's daily/monthly quota, but they do block duplicate outreach.
- An Ioana call-booking handoff does not change the LinkedIn contact owner. Reassign the Growth Target `Owner` only when the user explicitly approves a handoff/reassignment packet.

## Superseded Ioana Persona Claims

Approved persona claims for LinkedIn growth copy:

- Status: superseded for Eran-led LinkedIn sending. Source: user instruction in chat. Imported: 2026-06-08; superseded for current LinkedIn sender on 2026-06-11. Review: use only if the user explicitly switches the LinkedIn sender to Ioana for a run or the message is part of the Ioana call-booking handoff.
- Ioana's background is in engineering and computer science.
- Ioana has an engineering background in Berlin and can say it is possible she met someone at a Berlin event when the person says she looks familiar.
- When relevant after engagement, Ioana can say she may have been talking a lot about tax optimizations because helping people in Germany save money on taxes is what she does full time, especially for freelancers and companies.
- When an engineering/networking thread starts drifting away from Germany setup, Ioana may say she is well connected and can support if there is a fit, but the next move should bring the thread back toward the prospect's Germany freelance, company, tax, admin, or remote-employment setup. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: use only when it is true to the thread and do not turn it into a vague recruiting/networking promise.
- When a prospect has already invited concrete help after a Germany tax/admin/setup bridge, Ioana may say she can probably save them a lot of money or lots of money. Use this only when the thread has a real setup/income/tax signal and the user approves the exact message; do not use it in first messages or as a guarantee. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: strongest fit is Saurabh-style Toptal/foreign-platform income where the prospect says they are happy to learn.
- In a Saurabh-style foreign-platform income thread where the prospect asks for notes/context before a call, Ioana may explain the high-level company setup mechanism: if they are billing personally in Germany, a company can invoice the platform/client, pay the person only the salary they need, retain remaining profit in the company, optimize legitimate expenses, and review German pension/social-contribution exposure. Keep this as a setup explanation, not a legal/tax guarantee, and ask whether they currently invoice personally or through a company. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: use only after the prospect has invited concrete explanation or asked what Ioana can do.
- For Saurabh-style call asks after a concrete setup explanation, Ioana may say the consultation is free and has no commitment/requirements. Do not keep asking another follow-up question when the user says to leave the offer in the air. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: use only after concrete relevance has been established.
- In recruiting/AI messaging conversations, Ioana may say she helped a Japanese company build something in the space a while back, `neotalent.net`. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: use only when directly relevant to recruiting, AI messaging, recruiter/company voice, or candidate-messaging product context.
- Keep these claims human and thread-specific. Do not guarantee savings, give tax advice in chat, or force the tax line into a technical thread before the person has asked why Ioana is interested or the setup/tax bridge is earned.

## Run Cadence And Modes

This skill can run multiple times per business day because LinkedIn state changes throughout the day. Each run should choose one or more modes and only advance the matching queue:

- `invite-batch`: prepare or send an approved block of 10 blank connection requests for the declared quota day.
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

Persona ownership rule:

- Before queue loading, identify the active LinkedIn sender account/persona and the Notion user expected in Growth Targets `Owner`.
- Queue items are valid for sending only when `Owner` matches the active sender or the user explicitly approves a named handoff/reassignment.
- Other persona Growth Messages/Targets remain active evidence. They are not deleted and they do create conflict requirements for the active account.
- If a Growth Message/Target does not clearly state which account sent or owns it, treat it as owner-unknown until proven. Exclude it from sends and quota counts, list it under owner-backfill exclusions, and do not contact that person until ownership is resolved.

Date-boundary rule:

- Use `Sent/Posted At` first, then `Growth Event At`, to classify a connection request into the quota day.
- The quota window is `[quota date 00:00, next date 00:00)` in the declared timezone.
- A row created just after midnight in one timezone but still yesterday in the declared quota timezone is yesterday, not today.
- If the daily count is below 10, an `acceptance-check`, `first-message`, `reply-triage`, or `follow-up-sweep` run must still prompt the next invite-batch gap unless the user explicitly pauses LinkedIn invites for that quota date.
- Never say today's invite target is met from a prior-day batch. If that happens, write a correction packet and reopen the invite-batch stage.

## Data Routing

- Individual LinkedIn prospects go to Growth Targets, not Business Partners.
- Growth Targets must carry the correct `Owner` before send-ready work. Ioana-owned targets have Ioana as owner; Eran-owned targets have Eran as owner. Missing owner, conflicting owner evidence, or cross-persona duplicate evidence blocks the send packet.
- A company, agency, or commercial counterparty discovered through LinkedIn goes to Business Partners only if there is a partner/commercial relationship.
- Connection requests are Growth Messages records tied to the Growth Target.
- Accepted-connection messages are drafted only after acceptance is verified.
- First messages, replies, blockers, and follow-ups are Growth Messages records tied to the Growth Target.
- The prospect's Growth Target page is the source of truth for LinkedIn reply strategy. Use a dedicated strategy property if one exists; otherwise save the strategy in a clearly labeled `LinkedIn Reply Strategy` section in the page content or target notes. Do not store the strategy only in a packet, chat, or Growth Message.
- A saved reply strategy is not just the next-message tactic. It must be a prospect-specific 3-4 message conversation arc toward a possible call about the person's actual situation in Germany, only if the thread earns that ask.
- A saved reply strategy must include: current thread context, the prospect's likely Germany/company/employment setup hypothesis and evidence, useful personal or cultural hooks, the 3-4 message arc, what must not be mentioned, where a Germany-situation question could enter naturally, when a call ask would be justified, the approval basis, and a review date. Keep it prospect-specific enough that it would be wrong on another prospect's page.
- Three-message admin/tax bridge rule: after roughly three substantive messages in a LinkedIn thread, excluding connection requests, pure logistics, and acknowledgements, the saved strategy must include a concrete attempt to bridge from the current topic into the prospect's Germany admin, tax, company, freelance, or remote-employment setup. The bridge must be tied to a real signal in the thread or profile and phrased as one pointed question. If no natural bridge exists, record why it is not appropriate yet and what fact would make it appropriate; do not force a random tax/admin remark.
- Go-for-the-kill rule: once a prospect has had a meaningful exchange and there is either a setup/friction signal, a freelance/company/remote-employment signal, a side-product/commercial signal, or the user says to go for the kill, stop drafting more curiosity questions. The strategy must switch to a direct help/call ask, still grounded in the profile/thread evidence and still approved by the user before sending.
- Every reply-triage packet must include a `Call Ask Decision`: `not yet`, `bridge now`, `ask now`, or `close/no opportunity`. If the decision is not `ask now` after three substantive messages, the packet must say exactly what is missing.
- Bridge-before-call rule: if the next outbound message asks the setup/friction question, do not also say RB does this professionally, offer help, or ask for a call in the same message. Wait for the prospect's answer. Classify this as `bridge now`, not `ask now`, unless the prospect has already disclosed relevant setup/friction or the user explicitly approves a direct call ask for the exact message.
- Invited-in call rule: when a prospect says they are happy to learn, asks what RB has to share, or otherwise invites help after a Germany tax/admin/setup bridge, switch to `ask now`. In Eran-led threads, the ask should bridge to an Ioana call: say RB/Ioana can likely help, check the approved RB and EIP Ioana calendars through the OAuth vault or connector, offer three concrete near-term slots, and ask for the prospect's email when an invite is needed. Status: approved. Source: user instruction in chat. Imported: 2026-06-08; updated for Eran-to-Ioana handoff on 2026-06-11. Review: still requires exact message approval and immediate Eran LinkedIn-session verification before send.
- No same-day call rule: do not offer same-day call slots in growth outreach, even when the calendar is free. Start from the next business day unless the user explicitly approves a same-day exception for that exact prospect and message. Status: approved. Source: user instruction in chat. Imported: 2026-06-08. Review: apply to LinkedIn call asks and reuse in other growth channels when scheduling from this skill.
- Pushback recovery rule: when a prospect pushes back on motive or asks why the sender is asking, do not keep probing or ask for a call. Answer plainly, de-escalate, name the specific reason the question is relevant, and give a useful solution direction if possible. Preserve the opportunity only if the prospect stays engaged.
- Freelancer setup-interest rule: for freelancers, contractors, self-employed people, EOR users, or solo-company operators, show interest in their current setup before making the company-setup/tax-saving offer. Use what they already disclosed, such as regular freelancer, Remote EOR, Dubai company, German clients, foreign clients, Toptal, UG, or current company. The first line should acknowledge or probe the setup itself, not jump straight to RB handling the solution. Status: approved. Source: user instruction in chat. Imported: 2026-06-10. Review: still keep first messages non-salesy and do not ask facts already visible.
- Company-used answer rule: when a prospect answers that they are using a company, have a company, or otherwise confirms a company setup, the next setup question should normally ask what entity type they use, usually GmbH or UG for Germany, and whether they are happy with the admin/tax side. Do not jump straight to salary, retained-profit, dividend, pension, or expense mechanics unless the entity type and admin/tax satisfaction are already known or the user explicitly asks for that deeper question. Status: approved. Source: user instruction in chat. Imported: 2026-06-12. Review: introduced for Ivan-style replies.
- Setup-before-topic rule: when a freelancer, contractor, self-employed consultant, or solo operator asks what the sender wants to discuss and the current setup has not yet been asked, the next question should establish how they are set up in Germany before moving into business, research, product, or technical detail. Keep it simple, such as whether they are set up through a company or as a regular freelancer. Status: approved. Source: user instruction in chat. Imported: 2026-06-12. Review: introduced for Akshay-style replies; do not ask setup again if it is already visible or already asked.
- Company-setup final reply rule: when a prospect has disclosed a real freelance, company, foreign-client, remote-employment, EOR, tax, or admin setup and the thread is being closed, stalled, or softly rejected, do not close silently. Draft one concise final reply that lets them know if they ever want to set up through a company to save more on tax, RB can handle the full setup end to end. Keep it low pressure, do not ask another curiosity question, and do not promise a guaranteed saving. Status: approved. Source: user instruction in chat. Imported: 2026-06-10; updated for Eran-led LinkedIn sender on 2026-06-11. Review: use only after a setup signal exists; first messages remain non-salesy.
- Known-fact rule: do not ask the prospect to confirm a fact already visible in their profile, post, project page, or the thread. State the known fact briefly if needed, then ask the next unknown. For example, if a profile already shows a product is a side project, do not ask whether it is a side thing; ask whether it has a company/freelance setup behind it.
- Source-answer brevity rule: when the prospect asks how the sender found something, answer plainly and briefly. Do not re-explain the whole source detail, compliment the feature, or add unnecessary color such as why a theme/post was funny. Use only enough context to be truthful, then move to the next pointed question.
- The first reply in the arc should still answer the person's actual message and keep the topic alive. Do not dump the whole strategy into one reply.
- A call ask is not automatic, but it must not be delayed past the earned moment. It belongs when the prospect has engaged on their own Germany setup, company structure, remote/freelance work, UG/company administration, side-product/commercial setup, or similar lived context, or when the user explicitly approves moving there. It still requires user approval of the exact text.
- If the prospect shares a real language, nationality, education, or founder/company-structure hook with the active sender, the strategy can use it naturally. Do not use Ioana-specific shared-language hooks in Eran-authored messages.
- Any non-English LinkedIn outbound draft must include an English translation in the chat approval packet directly under the original text. Do this even when the sender and prospect share the language. The translation is for user review and is not sent unless explicitly included in the approved outbound text.
- Promote/link to canonical Communications only when the thread becomes a lead, client, or business communication that belongs in the main RB communications ledger.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-linkedin/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends. The master daily run may use this skill for read/plan work only.

Shared gates:

- No connection request or message is sent before exact text approval.
- No first message is drafted until connection acceptance is verified.
- Stop if Eran Richmond Blackwood is not the verified active LinkedIn session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Verify Growth Targets has an `Owner` person property. If it is missing or unreadable, block LinkedIn send-ready work and print a schema blocker instead of using `Platform Account` alone as owner state.
   - Choose run mode(s): `invite-batch`, `acceptance-check`, `first-message`, `follow-up-sweep`, `reply-triage`, or `reporting-only`.
   - Declare quota date and timezone before loading daily counts. If the user says `today` or `yesterday`, resolve it to an exact date in the user's operating timezone and print the exact date.
   - Load current-day sent counts for the declared quota window, monthly sent counts, pending requests, accepted connections awaiting first message, due follow-ups, and open blockers before proposing any send.
   - Load all LinkedIn Growth Targets and linked Growth Messages for cross-persona conflict detection before filtering the active sender queue.
   - Print a Daily Invite Gate in every LinkedIn run, even when the selected mode is acceptance-check, first-message, follow-up-sweep, reply-triage, or reporting-only.
   - Verify LinkedIn account identity only when approaching a send-ready step.

2. Audience Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Current LinkedIn priority segment uses hard gates: currently Germany-based, clearly came to Germany from abroad or has an explicit non-Germany background, explicit freelance/contractor/self-employed status or a current foreign employer/client with zero offices in Germany, and technology/operator relevance.
   - Foreign-background evidence is mandatory for this audience. Acceptable evidence includes explicit relocation-to-Germany context, current Germany residence plus prior non-Germany residence/work/study that clearly indicates the person came from abroad, US/non-Germany nationality or residency signals, user-confirmed foreigner status, or profile text that directly frames them as an expat/immigrant/relocated person in Germany. Do not infer foreigner status from name, appearance, language, or accent. Do not treat foreign clients/employers alone as foreign-person evidence.
   - Highest-priority current-role signal: explicit freelancer, contractor, self-employed, independent consultant, or fractional tech operator living in Germany and working with foreign clients.
   - Second-priority current-role signal: current employee or contractor for a foreign company that has zero offices in Germany. `No office in the person's city` is not enough. If the company has any Germany office, block unless the profile explicitly says freelance/contractor and the user approves the exception.
   - Prefer American or US-background profiles: US nationality/residency signals, past US work, past US study, US company/client base, US-market role, or user-confirmed American background. Do not infer nationality from name, language, or appearance.
   - Prefer explicit remote, freelance, contractor, consultant, fractional, self-employed, or independent operator language when it appears alongside Germany residence and foreign-company/client signals.
   - Founders are excluded for now. Do not qualify founder/founding-company profiles unless the profile clearly frames the current work as freelance/contractor work and the user explicitly re-allows founders.
   - `Open to Work` profiles are excluded for now. Do not qualify profiles with LinkedIn `Open to Work`, `#OPEN_TO_WORK`, active job-seeking, unemployed, career-transition, or recruiter-facing job-hunt framing. These people are not budget-qualified active targets for this channel.
   - Prefer US-headquartered, US-market, UK, Canadian, Swiss, Dutch, or otherwise foreign-company current roles where the Germany residence signal is visible and the company has no German office at all.
   - Under-40 is a useful positive signal, not a hard gate. Use it only when explicit public evidence or user-provided confirmation exists. Do not infer, estimate, store, or mention guessed age from photos, graduation years, seniority, or career length. Unknown age does not block a target that otherwise passes the hard gates.
   - Target people with strong Germany, came-from-abroad, current-foreign-employer, and tech signals:
     - Current Germany location or clear current Germany residence.
     - Current employer or client outside Germany, with proof that the company has zero offices in Germany, or explicit freelance/contractor/self-employed status.
     - Remote/distributed role for a foreign company, freelancing/contracting for foreign clients, international transfer, EOR-style work, or self-employed operator status.
     - Came-from-abroad evidence such as prior non-Germany work, non-Germany study, relocation writing, international-transfer context, or user-confirmed abroad origin.
     - Past US work experience.
     - Past US university/study experience.
     - US nationality/residency signals combined with current Germany location.
     - Current relocation-to-Germany signal.
   - Prioritize technology workers, freelancers, contractors, and remote employees with budget-qualified profiles:
     - Software engineering, product, data, cloud, cybersecurity, AI, fintech, startup, platform, devops, design, or technical leadership roles.
     - Freelance, contractor, self-employed, remote-work, US-employer, foreign-employer, or international-transfer context.
     - Berlin, Munich, Hamburg, Frankfurt, Cologne, Dusseldorf, and other visible Germany tech-hub signals.
   - Block profiles where the Germany, came-from-abroad/foreigner, current-foreign-employer, or technology signal is too weak to justify the request.
   - Block profiles where the only match is generic tech employment in Germany, German-local freelance/contractor status without explicit foreign-background evidence, a German-only local employer, a founder profile, a foreign employer with any Germany office and no explicit remote/freelance/contractor signal, `Open to Work` status, broad job seeking, student-only status, an old foreign-employer role with no current foreign-company role, unverified company office status, or a guessed age fit.
   - Keep the criteria reusable for future Germany growth audiences.

3. Discovery And Dedupe
   - Search approved sources or user-provided lists.
   - Dedupe globally by normalized LinkedIn URL, visible thread URL, message URL/ID, name, current company, and location before checking active-sender quota.
   - Create/update Growth Targets with profile URL, audience, channel, `Owner`, status, evidence notes, and next action.
   - Set `Stage Updated At` and `Last Activity At` on Growth Targets whenever stage or material state changes.
   - If a matching target exists under the same `Owner`, update that target instead of creating a duplicate. If a matching target exists under another `Owner`, block the candidate and include it in the conflict packet.
   - Do not store sensitive personal details in git.
   - Track each planned invite against the current monthly LinkedIn quota. Default every request to blank/no-note.

4. Qualification
   - Classify each target as `Research`, `Qualified`, `Blocked`, or not relevant using available Growth Target status fields.
   - Record qualification evidence in Growth Target notes and, when action is needed, Growth Messages or Tasks.
   - When a target becomes qualified, set `Qualified At`; when it becomes blocked, set `Blocked At`.
   - Block targets where the Germany, came-from-abroad, current-foreign-employer, or tech signal is too weak.
   - If the under-40 signal is part of qualification, use only explicit public evidence or user-provided confirmation. Never record estimated age. If age evidence is unknown, omit the signal and qualify on the hard gates.
   - Treat LinkedIn rules, approved claims, and active sender identity as in-run compliance gates. Do not create compliance-check rows.

5. Connection Request Packet
   - Prepare a blank-invite approval packet in chat. Do not draft or add a personalized note unless the user explicitly asks for a note exception.
   - Show sender identity: Eran Richmond Blackwood, LinkedIn account/session pending verification.
   - Include target URL, qualification basis, and proposed follow-up date.
   - Qualification basis must name the visible Germany residence signal, explicit foreigner/came-from-abroad signal, current freelance/contractor/self-employed signal or current foreign employer/client signal, proof that the company has zero offices in Germany when relying on employer/client fit, tech-role signal, and explicit under-40 evidence when available.
   - Include a `Foreign Background Gate` field for every proposed invite. Allowed values are `Explicit came-from-abroad/relocation`, `Current Germany plus prior non-Germany work/study/residence`, `Explicit US/non-Germany nationality or residency signal`, or `User-confirmed foreigner`. If none of these is available, exclude the person even when they are a strong German freelancer.
   - Include an `Office/Freelance Gate` field for every proposed invite with one of these allowed values: `Explicit freelancer/contractor`, `Explicit self-employed`, `Foreign company, zero Germany offices verified`, or `American/US-background plus zero-Germany-office employer`. Anything else belongs in exclusions, not the invite list.
   - Include a `Founders excluded check` for every proposed invite. If the person is a founder, cofounder, or primarily promoting their own startup, exclude unless the user explicitly re-allows that exact profile.
   - Include an `OpenToWork Gate` for every proposed invite with one of these allowed values: `Clear` or `Blocked - OpenToWork`. Only `Clear` targets can appear in the invite list; `Blocked - OpenToWork` targets go to exclusions and do not count toward the daily invite quota.
   - Include current month counts: planned invites, sent blank invites, remaining invite quota, Daily Invite Gate daily count, excluded prior/next-day invite rows, acceptance rate, meetings booked, and invite-to-meeting conversion where available.
   - Include a `Persona Owner Gate` for every proposed invite: expected active sender, Growth Target `Owner`, owner evidence, and cross-persona conflict result. Only `Clear - Active Owner` can appear in the invite list.
   - If the declared quota-day count is below 10, show the exact invite gap and prepare enough qualified targets to reach 10 unless the user explicitly pauses the daily LinkedIn invite target.
   - Create/update a Growth Messages operating record only after the packet is accepted for tracking.

6. Approved Connection Send
   - Run only after explicit approval of the exact current-stage target list. A generic continuation, quota reminder, broad approval, or approval from another stage does not authorize sends.
   - Before sending, restate the approved target count and first/last target names from the approved packet. If approval does not clearly apply to that exact packet, stop and ask for review.
   - Re-check LinkedIn session is Eran Richmond Blackwood.
   - If not Eran Richmond Blackwood, write a blocker in Growth Messages and stop.
   - Re-run the cross-persona conflict gate immediately before the first send. If any approved target now matches another persona's target/message/thread, stop that target and ask for approval on the conflict packet.
   - Recompute the Daily Invite Gate immediately before the first send. If the declared quota-day count changed, update the remaining gap and stop for re-approval unless the approved target count is still inside the remaining 10/day window.
   - If monthly quota is exhausted, daily count would exceed 10 without an explicit same-day exception, the quota date is ambiguous, or LinkedIn displays any warning/restriction, write a blocker in Growth Messages and stop.
   - Send the approved blank request directly and log result in Growth Messages with `Message Kind = Connection Request`, `Status = Sent/Posted`, `Growth Event At`, `Sent/Posted At`, and next follow-up.
   - Move the Growth Target to `Outreach Active` only with `Outreach Active At`, `Stage Updated At`, and `Last Activity At`.

7. Acceptance Check
   - This stage may run several times per day.
   - On later runs, check whether the connection was accepted.
   - If not accepted, advance follow-up dates without messaging.
   - If accepted and the visible profile or thread shows `Open to Work`, `#OPEN_TO_WORK`, active job-seeking, unemployed, career-transition, or recruiter-facing job-hunt signals, block the first-message item, remove the person from the send list, and record the blocker in Growth Targets/Growth Messages.
   - If accepted but `Owner` is missing, mismatched, or conflicting with another persona's target/message/thread, block first-message drafting until owner backfill or reassignment is approved.
   - If accepted, update the Growth Target with `Last Activity At`, create/update a Growth Messages first-message item with `Message Kind = First Message`, `Status = Draft` or `Needs Approval`, and `Growth Event At`, and move to accepted-message drafting.

8. Accepted-Connection Message Packet
   - Draft the first message only after acceptance is verified.
   - Before drafting or marking a first message send-ready, run the `OpenToWork Gate`. If the person is `Open to Work`, block the draft and remove them from the current packet. Do not draft a softer message as a workaround.
   - Before drafting or marking a first message send-ready, run a duplicate-send gate: read Growth Messages and the visible LinkedIn thread for that exact prospect and prove no prior first message has already been sent. The packet must show the Growth Messages readback, LinkedIn thread readback, and conclusion.
   - The duplicate-send gate must check all personas, not only the active sender. Prior Ioana first messages block Eran first messages to the same person unless the user approves a handoff/reassignment packet, and prior Eran first messages block Ioana first messages in the same way.
   - If a prior first message exists, block the accepted-connection first-message draft and route the prospect to reply, follow-up, or no-action handling based on the latest thread state.
   - Before each draft, show the initial topic/source context: who the person is, what public signal triggered the message, the exact company/product/post/project detail being referenced, and why it is relevant to Eran/RB.
   - Use a helpful, low-pressure opener tailored to who the person is and what they do.
   - Cite at least one concrete public signal beyond the top card/headline: company/product name, specific feature, market, article, launch, role scope, technical area, shipped system, hiring post, technical post, conference talk, or founder decision.
   - Do not turn the opener into a recap of the person's profile. Block drafts that list several profile categories, industries, technologies, roles, or services and then ask a question. Use the profile list only as internal context, choose one meaningful angle, and ask the next useful unknown.
- If the prospect is freelance, self-employed, a contractor, independent, working through a platform such as Toptal, or likely working for foreign clients from Germany, the first message can ask one pointed client-base/status question. If their status is clear, default to the Germany market/client-base opener, such as whether their clients/work are mostly Germany-based now or still mainly abroad. If their status is unclear, first ask what the setup/status is.
- If the prospect appears to be a remote employee for a foreign company, but does not show freelance, contractor, platform, independent, or self-employed evidence, do not ask about payroll, legal setup, tax, company structure, or employment setup in the first message. Ask one work-context question first, such as whether their team, users, reliability surface, market, or product work is mostly US-side or also Europe-facing. Status: approved. Source: user instruction in chat. Imported: 2026-06-13. Review: introduced for Marcelo-style remote-employee profiles.
   - Block the draft if it could be sent unchanged to many people in the batch.
   - Block the draft if the available source context is only name, location, company, title, broad headline, generic tech stack, or generic founder/operator status. Gather deeper source context first.
   - For very senior or unusually high-context profiles, do not manufacture a clever technical question just to have a question. If no honest pointed question is available, use a short honest opener that names the concrete profile areas Eran/RB genuinely understands or finds relevant, and leave the door open without pretending to need an answer. Do not include process/meta wording such as `no clever q here` in the prospect-facing text.
   - Include approved claims only; public claims remain provisional unless approved.
   - Do not mention RB services, tax offerings, sales funnels, or booking a call.
   - Make the message short, highly specific, non-salesy, and designed to start a genuine conversation.
   - Preview in chat with sender identity and source target.

9. Reply Drafting Packet
   - Inspect new replies and summarize what the person actually said.
   - Fetch the prospect's Growth Target page and prior Growth Messages before preparing any reply.
   - Confirm the Growth Target `Owner` matches the active LinkedIn sender or an explicitly approved handoff. If it belongs to another persona, block the reply and print a reassignment packet instead of replying from the wrong account.
   - Run the `OpenToWork Gate` before any proactive reply or follow-up. If the profile is `Open to Work` and there is no business-relevant inbound setup signal, close or block the thread. If there is a business-relevant inbound signal, show the exception basis and get explicit user approval before drafting.
   - Before drafting reply text, produce a `Reply Strategy Packet` in chat for that prospect and ask the user to approve or revise the strategy.
   - The strategy packet must show: prospect URL, Growth Target URL, initial topic/source context, prior RB LinkedIn messages, latest reply context, what the person actually appears to care about, the likely Germany setup hypothesis, and a 3-4 message arc toward a possible call about their situation in Germany.
   - Include a `Call Ask Decision` for every prospect: `not yet`, `bridge now`, `ask now`, or `close/no opportunity`. Base it on message count, prospect engagement, setup/friction signals, freelance/company/remote work evidence, side-product/commercial evidence, and user instruction.
   - Do not confuse the strategy with the next reply. The packet must make clear what the next message does, what the second/third messages try to learn, and what has to be true before a call ask is justified.
   - The arc should usually move from their topic, to one pointed bridge into Germany/remote/freelance/company admin only if it fits, to one direct question about their current setup or satisfaction with it, then to a soft call ask if there is real relevance.
   - By the third substantive message in the thread, the strategy must either propose the admin/tax/setup bridge or explicitly block it with the missing context. Do not wait for the user to ask for this assessment.
   - If `Call Ask Decision = ask now`, draft a direct help/call ask after answering any open question from the prospect. Do not add another technical or product curiosity question unless it is necessary to avoid sounding random.
   - If the exact next reply asks whether a setup exists, whether they are happy with it, or whether the problem is real for them, do not add a professional-help or call line yet. The next state is waiting for their answer.
   - Before drafting, check whether the intended question asks for something already visible in the profile, source post, or thread. If yes, rewrite it to use the known fact and ask only the next unknown.
   - For prospects with an entity or setup signal, such as a UG, the strategy may plan a later question about how they manage it and whether they are happy with the setup. Do not ask it before the thread has enough context.
   - If a shared-language reply would make the exchange more human, include that in the strategy and state which language the next reply should use. Example: Romanian can be used with Romanian prospects only when Ioana is the active sender or the user explicitly approves an Ioana handoff message and the profile/reply context supports it.
   - For any non-English reply draft, show the original text first and then a plain English translation before asking for approval.
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
   - Filter follow-ups by active sender `Owner` after global conflict detection. Do not follow up from Eran on Ioana-owned contacts, or from Ioana on Eran-owned contacts, without explicit handoff approval.
   - Remove `Open to Work` people from follow-up packets unless the user explicitly approved continuing that exact thread after a business-relevant inbound signal.
   - Before each follow-up draft, show the initial topic/source context, previous message context, and the specific reason a follow-up adds value now.
   - Draft follow-ups only when there is a reason beyond "checking in": their work, product, founder context, relocation context, or a previous thread detail.
   - Keep follow-ups short and human; no pressure, no call ask, no sales framing.
   - If no useful context exists, advance the follow-up date or close the thread instead of drafting filler.

11. Approved Message Send And Follow-Up
   - Re-check Eran Richmond Blackwood LinkedIn session before sending.
   - Re-check that the Growth Target `Owner` is Eran before an Eran send, unless an approved handoff packet says otherwise.
   - Send only the approved text.
   - Log send URL/message ID if available, response state, `Message Kind`, `Status`, `Growth Event At`, `Sent/Posted At` or `Received At`, and next follow-up in Growth Messages.
   - Promote/link to canonical Communications only if the thread becomes a lead/client/business communication.
   - Do not write a summary reporting row. Reconstruct invite quota, blank connection requests, acceptances, accepted-connection messages, replies, blockers, meetings, and invite-to-meeting conversion by querying Growth Messages and Growth Target timestamps.
   - If this run sends first messages or replies but the Daily Invite Gate shows the quota-day blank-invite minimum is still unmet, the next prompt must be a LinkedIn invite-batch packet, not closeout.

## Reusable Reply Strategy Patterns

- Technical-thread bridge: answer the specific technical point first, ask one credible follow-up, then only later bridge into the person's Germany setup if they keep engaging. Do not make the first reply feel like a setup for tax/admin or a call.
- Three-message admin/tax bridge: by the third substantive exchange, look for a natural move into German admin, tax, company setup, freelance registration, contractor status, payroll, or remote-employment structure. Use the specific topic already in the thread as the reason for the question. If it would sound random, save the blocker and ask the next real topic question instead.
- Scope-clarification replies must choose a legitimate scope and show a reason for the question. If the prospect asks whether the sender means architecture, implementation, product fit, or a specific use case, answer that directly and ask a precise question inside that scope. Avoid saying `no current implementation`, `no use case`, or similar unless it is necessary; it can make the sender sound like he has no context and is wasting the prospect's time.
- Shared-language hook: when the active sender genuinely shares language or nationality context with the prospect, the strategy may switch language and mention the shared context casually. It must still respond to the actual thread topic.
- Entity/setup hook: when the prospect has a UG, company, freelance, contractor, remote-employment, or similar setup signal, the later arc can ask how they manage it in Germany and whether they are happy with it. If they merely say they use a company, ask first whether it is a GmbH or UG and whether they are happy with the admin/tax side.
- Call bridge: a call ask belongs near the end of the arc only after the person discusses their Germany setup, friction, or uncertainty. The ask should be framed as comparing their current setup and possible cleaner options, not as an RB pitch in chat.
- Go-for-the-kill bridge: if the user says the thread is ready, or the prospect has already engaged enough and has a real setup/commercial signal, stop asking unrelated curiosity questions. If the next needed move is still the setup/friction question, ask only that and wait. If they have already disclosed the setup/friction, answer their latest message first, then say RB can help professionally and bridge to an Ioana call if useful.
- Invited-in call ask: if the prospect explicitly says they are happy to learn what RB has to share, or otherwise invites concrete help after discussing Germany tax/admin/setup, the next strategy should usually be `ask now`. In Eran-led threads, the outbound message should be direct that RB/Ioana can likely help and can do a short call. Include three Ioana-calendar-checked slots rather than a vague scheduling ask, but never same-day slots unless the user approved that exact exception.
- Pushback solution turn: if a prospect asks the sender's motive, says they do not understand why he is asking, or seems suspicious, stop the sales progression for that message. Explain plainly that RB works professionally with freelancers/foreign-client operators on admin and tax setup, make the relevance specific to their situation, and offer one useful solution direction without pressure.
- Freelancer setup-interest turn: when replying to a freelancer or contractor, lead with their actual setup before the offer. Examples of acceptable structure: acknowledge that regular freelancer/Remote EOR/Dubai company setup is interesting; compare basic freelancing with a company setup; or ask one specific setup question if the setup is still unknown. If they ask what the sender wants to discuss and setup is still unknown, make that the next question. Do not start directly with `we can help`, `we can handle`, or savings language.
- Final company-setup offer: if the prospect has disclosed enough setup context and the thread is not worth pushing further, close with one useful final offer rather than no reply. The message should say that if they ever want to set up through a company to save more on tax, RB can handle the full thing end to end. This is a final door-open message, not another question.
- Networking drift: if the prospect responds as if the thread is about general tech networking, referrals, hiring, or event familiarity, acknowledge that briefly. Do not stay in that lane. The strategy must return to one concrete Germany setup question, usually freelance vs company vs employee setup, tax/admin friction, or whether they have optimized their current structure.
- Save every reused pattern as a prospect-specific strategy on the Growth Target before drafting. The reusable pattern is a starting point, not a substitute for the saved strategy.

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
- Do not over-polish first messages into corporate prose. Eran's LinkedIn copy should usually use normal sentence capitalization, but an occasional uncapitalized sentence, casual punctuation, sentence fragment, or tiny typo is allowed when it makes the message feel like a real DM. Do not force lowercase everywhere.
- Less is more for first messages. Prefer one short `quick q` style message over a researched opener plus a question.
- Do not fake enthusiasm or pretend personal fascination. Avoid filler such as `wild combo`, `pretty unusual`, `pretty specific`, `made me think`, `made me wonder`, `I imagine`, `probably`, `cursed`, `real annoyance`, or similar praise/reaction language unless the user explicitly approves that exact line.
- Do not make the message prove research. Mention only the minimum concrete detail needed to make the question clear.
- A good first message should feel like a real DM someone would send after meeting online: direct, a little informal, and specific enough that it could not be sent to another person.
- Do not write like the sender already knows the recipient. For newly accepted connections, default to `Thanks for connecting.` without the person's first name, avoid chummy reactions such as `Nice`, and do not use inside-joke familiarity. Replies can match the recipient's warmth, but still stay like a first professional exchange unless the thread has earned more familiarity. Status: approved. Source: user instruction in chat. Imported: 2026-06-12. Review: apply to first messages, replies, and follow-ups.
- Use `lol` sparingly and only where it clearly improves the line, for example when owning a small mix-up. If several drafts in a packet use `lol`, rewrite most of them without it.
- If the user asks for imperfect human copy, allow light typos or rough punctuation, but never add mistakes mechanically. The copy should still be clear, respectful, and competent.
- Do not use hyphen separators in outbound LinkedIn copy. Write like a chat message, using short sentences or commas instead.
- Avoid formulaic lines like `Germany probably makes...`, `admin and taxes here are...`, or any tax/admin aside in first messages.
- Never use contrast-template copy or questions that only offer generic binary options. This sounds artificial in Eran's outreach.
- Do not make the question a binary-choice template unless the person's own post/source explicitly frames that exact tradeoff. Prefer one pointed question about a named workflow, product decision, technical constraint, customer type, or market behavior.
- Avoid polished product-growth filler such as `different beast from an MVP`, broad `outcomes` questions, and generic launch-scale comparisons. Ask about a concrete behavior, workflow, constraint, user decision, or product tradeoff from the source context.
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
- Avoid profile-regurgitation openers. Do not list someone's industries, stack, services, headline keywords, or profile sections back to them. If the sentence mainly proves that the profile was read rather than asking something worth answering, delete it.
- Do not use abstract role/work framing such as `for the freelance tech lead work`, `for the AI consulting work`, or `for your X work`. It sounds written. Ask the real unknown directly: whether clients are mostly abroad or Germany-based, whether the person bills through a company, whether the employer setup is local or remote, or the one concrete setup point that matters. Status: approved. Source: user instruction in chat. Imported: 2026-06-12. Review: apply to first messages, replies, and follow-ups.
- Prefer one compact chat message, usually 15-30 words after `thanks for connecting`. Short and slightly underwritten is better than polished.
- Do not make every opener start with the same formula such as `I read your profile note`. Use normal chat phrasing.
- Do not use `sounds like` or `sounds [adjective/reaction]` as the source anchor. It is a hedge and reads like sales/AI copy. Make a pointed claim or ask the pointed question directly.
- Avoid adjacent hedge frames too: `is basically`, `must be`, `must have been`, and `seems like` should be rare and usually rewritten into a concrete claim or direct question.
- Do not use definitional or descriptive opener turns such as `[topic] is a...`, `[topic] is the...`, `[topic] is [adjective]`, `[topic] has the...`, or `[topic] feels like...`. Describing what the thing is adds little. Name the source detail and ask the pointed question.
- Do not bring tax/admin into first-time LinkedIn messages. Even when the source context involves payroll, compliance, banking, or cross-border employment, the first message should ask about the actual product, workflow, customer, or technical problem.
- Tax/admin can enter later replies only when the recipient has engaged, the thread context makes it natural, or the user explicitly approves the exact exception.
- If a first-message draft includes tax/admin, block and rewrite it around the source detail instead.
- Freelance/remote-worker first messages should ask about the person's setup first. When freelance/remote status is already clear, the default opener is the Germany market/client-base question: ask whether their clients or work are mostly Germany-based now or still mainly abroad. When the status is unclear, first ask whether they are freelancing, operating independently, working through a platform, using one long-term contract, or employed through a local setup. Do not skip this in favor of a clever technical question when the profile already shows freelance, self-employed, contractor, independent, Toptal/platform, or remote-work evidence.
- Avoid opening every message with `on [topic]`. If several drafts start that way, rewrite them into more natural chat phrasing.
- Do not start a sentence with `with [topic]`. It is not natural chat phrasing. Use `for`, `inside`, `when`, or a direct question instead.

Rules:

- Keep it to 1-2 short sentences.
- Open with a concrete, named profile signal: the company they founded, the product, feature, customer segment, market, article, launch, named project, shipped system, technical decision, or founder decision.
- The active sender can reference operator/founder context only when true, approved, and phrased naturally. Avoid labels like "as a fellow tech founder" or "I am a tech founder too."
- The message must prove real attention. It should contain a detail that came from the person's profile, company site, post, article, or other approved source.
- A profile detail alone is not enough. The draft must identify a real operational detail in the person's work, then ask about that exact detail in a way that could not be reused for another person in the batch.
- Block drafts that simply restate the profile, company tagline, funding news, job title, or a public feature and then add a generic question.
- Prefer questions that are easy for the recipient to answer because they sit inside their daily work: what had to be hidden, constrained, sequenced, localized, simplified, made more conservative, or explained to a user/customer/doctor/buyer.
- Generic founder or professional language is blocked. Do not say "saw the founder angle", "saw your work", "what are you focused on", "specific thing", or any phrasing that sounds templated.
- "I am a big fan of [company/product]" is allowed only when paired with a specific reason, feature, product decision, article, or market move that the active sender can honestly point to.
- Bring up US-vs-Germany differences only when relevant to the person's actual source context, such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, developer adoption, healthcare admin, payroll, or cross-border employment. For first messages, do not make the difference about tax/admin.
- Ask one highly pointed, low-pressure question that is specific to the concrete signal. Good question shapes name one specific workflow, decision, audience, market, or technical constraint: "Where does [named constraint] show up first in [named workflow]?", "Was [specific source detail] mainly driven by [specific customer/user need]?", "Are German customers reacting differently to [specific feature] than US customers?", or "Did regulation/privacy/procurement change [specific part of the product]?"
- Do not ask for a call in the first message.
- Do not mention RB, services, discounts, savings claims, fear-based tax language, or broad marketing copy.
- Do not imply RB knows private facts. Use only visible profile/source evidence.
- Do not send if the only personalization available is the person's name, title, country, or generic founder status.

Good message shape:

```text
Thanks for connecting. Quick q on [specific product/post/system/workflow]: what happens when [pointed workflow/customer/technical constraint]?
```

Founder/operator variant:

```text
Thanks for connecting. Quick q on [specific product/launch/customer]: where do people usually get stuck?
```

Technical-role variant:

```text
Thanks for connecting. Quick q on [specific system] at [Company]: where does [specific component/workflow] get annoying?
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
- Blockers and sender-gate status, including legacy Ioana Gate fields where the Notion schema still uses that name.
- Message previews awaiting approval.
- Follow-ups and reporting counts to advance.
