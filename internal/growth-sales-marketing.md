# Growth, Sales, And Marketing

Status: provisional.
Imported: 2026-05-04.
Updated: 2026-06-11.
Sources: local RB memory files, local landing repo, Slack search summaries, user review instruction, Figma marketing creatives metadata, `product-offerings.md`, Notion connector create/read-back on 2026-06-01, LinkedIn Help pages fetched on 2026-06-01.

## Growth Context

Provisional:

- SEO/content growth was previously recorded as moving from roughly 50-100 daily impressions to 5,000+ average daily impressions in January.
- Niche article strategy was considered effective.
- IamExpat provider listings and freelancer tax content were noted as visibility channels.
- AI readability and backlinks were noted as next actions.

## Current Acquisition Channels

Status: user-confirmed on 2026-05-05.

Current paid acquisition channels:

- Meta ads.
- Reddit ads.
- Google ads.

Historical or adjacent acquisition channels remain provisional:

- SEO/content.
- IamExpat listings.
- Referral or partner visibility.
- HubSpot booking and website lead capture.

## Creative Sources

Static creatives:

- Figma: `https://www.figma.com/design/wTD51i2TLRAK44BMIw3gz4/Marketing---Richmond-Blackwood?node-id=844-267&t=NZP4LUsKAB9q02mY-1`
- Figma node reviewed: `844:267`, named `Ads 2023-2024`.
- Company-wide guideline: use a new tab for each batch of static creatives.

Video creatives:

- Drive: `https://drive.google.com/drive/folders/1e3zlksWGPWM9AsilWLyM7zJuM-tACNzt?usp=sharing`
- Company-wide guideline: use a new tab for each batch of video creatives.
- Connector status 2026-05-05: folder list returned no files and metadata lookup by folder ID returned not found. Access or sharing needs review before deeper import.

## Observed Prior Ad Angles

Status: provisional creative review from Figma metadata.

The reviewed Figma batch appears to advertise:

- German employee tax reduction.
- High-income employee/freelancer targeting, especially around EUR 80k+ income or revenue.
- Average client savings claim around EUR 10,500 yearly.
- A "calculate your savings" call to action.
- All-in-one administration across legal, tax, accounting, and finance.
- Tax optimisation.
- No hidden costs or full-service positioning.
- Risk management and liability protection while focusing on growth.
- Example investment/savings framing around compounding saved tax.

These claims need claim-by-claim approval before public reuse in the new business model.

## Product Offering Pointer

Status: provisional.

Detailed service catalogue, pricing signals, bundles, and Authority Calling product notes now live in:

- `internal/product-offerings.md`

Marketing should use that file as the offer source when deciding which campaign, creative angle, landing page, or claim belongs to which product.

For current marketing strategy, the important implication is:

- Older tax-savings creatives should be evaluated against the current product catalogue before reuse.
- Authority Calling / Authority Liaison should be treated as an emerging product and lead wedge, not as a marketing-only strategy note.
- Product claims and proof points still need claim-by-claim approval before public use.

## Sales System Context

Provisional:

- Landing app routes leads into backend/API and HubSpot.
- HubSpot booking link is embedded in the site.
- Backend supports HubSpot contact/deal sync and lead payment/order flows.
- HubSpot pipeline and funnel metrics can be accessed through the HubSpot API and RB database on demand when the user asks for a specific task.

## Germany Growth Operating System

Status: provisional.
Source: user instruction in Codex thread on 2026-06-01 and live Notion connector create/read-back.
Imported: 2026-06-01.
Review: confirm approved public claims, current offer framing, channel sender identity routes, future audience targets, and whether the user's "Refund" item is a separate channel or out of scope.

Task project:

- `RB Germany Growth System`: `https://www.notion.so/372e41301314817bb344fbb0a11d9ae8`

Database home:

- `RB Client Databases`: `https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`

Operating databases:

- Audiences: `https://www.notion.so/3f6c49da1a4f455a9935cba8da1d22d7`
- Channels: `https://www.notion.so/4d0f85fa5e7f4a208861c4705aecc2c4`
- Targets: `https://www.notion.so/c4faf7ded71a4f7580dee4aa39106ee8`
- Business Partners: `https://www.notion.so/a179e21f0e014f4db65bbe59135c9d0f`
- Growth Messages: `https://www.notion.so/ca339af617e5497483970cac110abc03`
- Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807` for promoted lead/client/business handoffs.

Audience model:

- The system is Germany growth overall, not only Americans in Germany.
- The Germany Growth project is for tasks only; operating databases live in the Richmond Blackwood teamspace database hub.
- Each channel, target, business partner, and growth communication should be attached to an `Audience Target` where the schema supports it.
- First audience target: `American tech workers in Germany / relocating to Germany`.
- The superseded `RB DE Growth Partnerships` data source was trashed on 2026-06-01. Partnership prospects now use the existing Business Partners database with optional `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate` fields.
- The superseded `RB DE Growth Metrics` data source was trashed on 2026-06-01. Growth reporting is reconstructed from timestamped records instead of summary rows.
- `RB DE Growth Messages` was added on 2026-06-01 as the pre-lead growth message/post/comment/DM log and has the `💬` icon.
- The superseded `RB DE Growth Compliance Checks` data source was trashed on 2026-06-01. Compliance is now a one-time in-run skill gate, with blockers recorded in Growth Messages or Tasks when action is needed.

Reporting model:

- Status: provisional internal operating rule.
- Source: user instruction on 2026-06-01.
- Imported: 2026-06-01.
- Review: validate the timestamp update discipline during the first daily run.
- Do not create or update summary reporting rows for Germany growth.
- Reconstruct daily, weekly, and monthly reporting by querying event and stage timestamps in Growth Messages, Growth Targets, Business Partners, Channels, and Audiences.
- Growth Messages use `Message Kind`, `Status`, `Growth Event At`, `Sent/Posted At`, `Received At`, and `Follow-Up Due` for pre-lead sends/posts/comments/DMs, replies, blockers, approvals, and follow-ups.
- Growth Targets use `Stage Updated At`, `Qualified At`, `Ready To Draft At`, `Outreach Active At`, `Waiting Since`, `Blocked At`, `Closed At`, `Rules Checked At`, and `Last Activity At`.
- Business Partners use `Growth Stage Updated At`, `Growth Qualified At`, `Pitch Drafted At`, `First Contacted At`, `Last Contacted At`, `Last Reply At`, `Growth Blocked At`, `Growth Closed At`, `Pilot Started At`, and `Ioana Gate Updated At`.
- Channels and Audiences use their stage/status timestamp fields to reconstruct setup and blocker history. Compliance gate outcomes are reconstructed from Growth Messages blockers, send/post records, target/partner notes, and Tasks when extra action is required.

LinkedIn operating quota:

- Status: provisional internal operating rule.
- Source: user instruction on 2026-06-01; LinkedIn Help pages `https://www.linkedin.com/help/linkedin/answer/a550555`, `https://www.linkedin.com/help/linkedin/answer/a563153/`, and `https://www.linkedin.com/help/linkedin/answer/a6264256` fetched on 2026-06-01.
- Imported: 2026-06-01.
- Review: confirm live LinkedIn warning/restriction state before any send-capable run.
- Current approved daily LinkedIn target: 10 blank connection requests per quota day after approval and immediate current LinkedIn sender-session verification. The old 15-20/day and 320/month planning rule is superseded for the active Eran LinkedIn account unless the user explicitly changes it again.
- Current monthly planning baseline: 200 blank connection requests/month across a 20-business-day month.
- Current LinkedIn sender is Eran Richmond Blackwood unless the user explicitly switches it again.
- LinkedIn contact state is persona-owned through Growth Targets `Owner`. The 2026-06-11 switch to Eran Richmond Blackwood changed the default LinkedIn sender but did not clear Ioana-owned contacts. Ioana-owned contacts remain active under Ioana; Eran-owned contacts remain active under Eran. Send queues and quota counts are filtered by the active owner, while conflict checks are global across both personas.
- Before any LinkedIn invite, first message, reply, or follow-up, run a cross-persona conflict check across Growth Targets and Growth Messages using normalized LinkedIn profile URL/vanity, thread/message URLs and IDs, and name plus current company/location when URL evidence is missing. If the same person is already owned by another persona with any request, connection, message, reply, active follow-up, or blocker, block outreach from the second persona and produce a handoff/reassignment packet for approval.
- Current LinkedIn priority segment within the first audience: people living in Germany who work in tech for foreign employers, ideally US-headquartered or US-market employers, with visible US background. Use public career-stage signals for the user's younger-profile preference; do not infer, estimate, store, or mention age.
- Personalized invite notes are off by default. If the user requests an exception, use a separate approval gate and respect the current LinkedIn personalized-note limit for the active sender account.
- The LinkedIn skill may run several times per business day for invite batches, acceptance checks, first-message packets, explicit reply drafting, follow-up drafting, and reporting-only closeout.
- First messages, replies, and follow-ups are sent only after acceptance or thread context warrants them. They must be short, relevant to the visible profile signal, and about who the person is and what they do.
- LinkedIn message drafts must be highly specific and targeted: name the company, product, project, shipped system, post, launch, or real public detail such as a feature, market, customer segment, technical problem, or founder decision. Generic phrasing like "saw the founder angle", "saw your work", or "what are you focused on" is blocked.
- LinkedIn copy should bring up US-vs-Germany differences when relevant: use admin/taxes only as a passing joke, preferably "Admin and taxes I'm sure were much easier in the States", plus one second contrast tied to the prospect's topic, such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, or developer adoption. Avoid self-labels like "as a fellow tech founder" or "I am a tech founder too."
- Questions must be highly pointed and tied to a named detail. Broad prompts like "How are you thinking about that?" are blocked; prefer decision/tradeoff questions like "Did X push you toward Y instead of Z?"
- Cold first outreach copy must not mention RB services, tax/admin offerings, savings claims, sales funnels, or booking a call. LinkedIn tone should be natural, specific, and curious about the person's work; the sale happens later after the thread has context.
- The Germany move/tax/admin line may be used only as a light aside before pivoting to the person's work, not as a service hook.
- If LinkedIn shows a warning, restriction, checkpoint, or degraded acceptance pattern, pause sending and log the blocker in Growth Messages.

Relocation partner email quota:

- Status: provisional internal operating rule.
- Source: user instruction on 2026-06-01.
- Imported: 2026-06-01.
- Review: confirm Ioana email sender route and first partner queue quality before send-capable runs.
- Daily operating target: open at least 5 new first-time email conversations with distinct relocation-partner Business Partner prospects per business day for the active audience.
- First-time email conversations are counted separately from replies and follow-ups. Replies and follow-ups still advance Growth Messages and Business Partner stage, but they do not satisfy the 5/day first-time conversation target.
- Daily automation may source, qualify, draft, and report the queue; it must not send. First-time emails send only after explicit approval for exact text and immediate Ioana sender-session verification.
- If fewer than 5 qualified or draft-ready relocation partner prospects are available for the day, record a sourcing queue gap/blocker and keep the target unchanged.

Required channel skills:

- Master daily orchestration.
- LinkedIn direct connect followed by message after approval.
- Facebook group partnerships/sponsorships for the active audience target.
- Facebook group posting/commenting for the active audience target.
- Relocation-agent partnership outreach, including the relocation partner email/Gmail sub-run.
- Reddit community presence for the active audience target.

Master-run completion rule:

- A Germany growth master run is incomplete until it has attempted every required active channel row in read/plan mode: LinkedIn, Facebook partnerships, Facebook posting, relocation partner email/Gmail, and Reddit.
- A channel approval gate or blocker does not stop the master run. Record that channel as `Waiting Approval` or `Blocked` in the master Channel Ledger, then continue to the next unswept channel unless the user explicitly pauses the master run.
- Final wrap-up must merge all child channel packets into one master closeout packet with per-channel status, unresolved approvals/blockers, sends/posts completed, drafts prepared, follow-ups advanced, and the next prompt.

Operational gates:

- Partnership prospects go to Business Partners immediately, including Facebook group sponsorship/admin leads, relocation agents, expat coaches, immigration-adjacent firms, and commercial/professional referral firms.
- Non-partner LinkedIn individuals, Facebook groups/posts/threads used for public posting, Reddit communities/posts, and direct research targets stay in Growth Targets.
- Facebook admin/sponsorship acquisition and Facebook posting are separate skills. Use Business Partners for admin/sponsorship/payment/commercial approval counterparties; use Growth Targets and Growth Messages for public group posting/commenting where rules or admin approval allow participation.
- Facebook group targeting should prioritize communities with members likely to have meaningful budget for Germany setup/admin support: established expat communities, founder/operator groups, senior tech/professional communities, affluent international clubs, and relocation-adjacent communities. Broad job-seeker groups are excluded by default unless the specific group/thread is clearly senior, founder/operator, executive, high-income tech, or otherwise budget-qualified.
- Facebook public group interaction has a daily operating target of 3 relevant comments/replies across usable joined groups. Source a buffer of recent candidates, select the best 3, and do not fill the daily target with weak, stale, low-budget, job-seeker, or rule-unsafe posts.
- Reddit is direct community engagement first. Do not pursue Reddit moderator outreach, sponsorships, paid posts, cold/proactive DMs, modmail, or commercial counterparties, and do not create Business Partners from Reddit routes unless the user explicitly re-enables that channel. Overt promotional posting stays blocked. When Eran/RB can seriously help with the specific thread problem, assess whether a soft DM-help line fits naturally. Add it only when it makes the comment more useful, label it as a promotion-rule risk, and remove it if rules or thread style make it unsafe. Reactive Reddit DMs are allowed only after someone engages with our public post/comment or sends an inbound DM first; they stay in Growth Targets and Growth Messages and require exact approval plus immediate Eran Reddit-session verification before sending.
- Public community replies/comments across Reddit, Facebook groups, and similar channels must check dates before drafting. Every packet must show post created date and latest meaningful activity date. Default to activity in the last 72 hours; allow 3-7 days only when the thread is still clearly live. Older public targets are research-only unless the user explicitly approves that exact dated exception.
- Reddit direct engagement must be very recent. Prioritize posts/comments created or meaningfully active in the last 72 hours; block normal direct public engagement outside that window unless the user explicitly approves the exact dated exception or the thread is current recurring/pinned with visible new activity. Reactive DMs require a recent trigger: inbound DM or engagement with our public post/comment within the last 14 days unless the user explicitly approves the exact exception.
- Reddit public posting/commenting uses a ramping daily cap for the active account. Anchor date is 2026-06-10 Europe/Dublin at 1 approved public post/comment, increasing by 1 every 2 calendar days, capped at 10/day: `daily_cap = min(10, 1 + floor(days_since_2026-06-10 / 2))`. Replies, reply-thread follow-ups, DMs, reactive DMs, modmail, votes, saves, and second comments on the same post do not count. Daily automation prepares the source/draft packet only; posting still requires exact approval and immediate Eran Reddit-session verification.
- Reddit sourcing should prioritize slightly desperate Germany freelancer/support posts from the last 3 days: consulting, freelance/self-employed setup, contractor status, invoicing, VAT, income tax, social security, private/public health insurance, pension contributions, false self-employment, GmbH/UG/company setup, EOR/payroll, banking/KYC, or foreign-client remote work. Source at least 3-5 candidates when the cap is 1-2 and 2x the cap as the normal buffer once the cap is 3 or higher. If fewer safe recent comment-ready posts exist than the computed cap, report the gap and do not fill it with stale, weak-fit, low-budget, or unsafe threads.
- Business Partner `Invoicing Email` is only for genuine invoicing/commercial emails; casual/admin/contact routes stay in `Notes` and Growth Messages.
- All outbound send-ready stages must use the channel-specific sender persona. Current LinkedIn outreach and replies use Eran Richmond Blackwood. LinkedIn booked-call scheduling hands off to Ioana. Current Reddit sends use Eran's active Reddit account `Ornery-Service3272`. Facebook, relocation partner email, and other non-LinkedIn Germany growth channels remain Ioana unless the user explicitly switches that channel.
- Any send-ready action must block if the active connector, MCP, or approved session is not verified as the required channel sender.
- Drafts, sends, posts, comments, DMs, replies, blockers, approvals, and follow-ups for pre-lead growth use Growth Messages.
- Every growth draft preview must show the source context before the draft text: initial question/topic, relevant source context, why the response is being proposed, and the target/thread/person/company URL. If that context is missing or unclear, block the draft until the source is read.
- Reddit draft previews must also show a style basis from recent posts/comments in the same subreddit, and preferably the target thread: observed tone, typical length/specificity, terminology, and what style to avoid. Match the local subreddit style without violating RB gates, platform rules, professionalism, or accuracy.
- Reddit draft previews must include a DM-help assessment. If Eran/RB can seriously help with the specific issue, include a specific, low-pressure DM-help line only when it fits naturally; do not use generic CTAs, booking language, service names, or broad filler.
- Reddit US-like compensation drafts should use the narrow baseline: remote work through a Germany-compliant setup, or US big tech in DACH through a custom Germany-compliant setup to optimize taxes. Do not add other options such as HFT, finance, Switzerland, startups, equity-heavy roles, or generic AI-like market-summary lines unless explicitly approved for that thread.
- Reddit copy should avoid the word "path," slash-heavy phrasing, long enumerations unless the local style supports them, and mechanical contrast sentences that read like a template.
- All growth outreach copy should follow the same style rule. Keep sentences short. Avoid comma-chain lists; outbound sentences should normally have at most two commas and never more than three.
- Facebook and Reddit public replies must be more useful than generic caution. Do not only say "be careful", "be mindful", "watch out", or "speak to a professional"; each reply should give a concrete next step, decision criterion, setup option, question to ask, document to request, or check the person can act on.
- If a public reply tells someone to compare two options, the reply must actually compare them. Explain the practical difference, when each option may fit, and what to check next. Expanded comments are fine when the topic needs that detail.
- Canonical Communications is used only when a growth thread becomes a lead/client/business communication or when a Growth Messages record is intentionally promoted and linked through `Promoted Communication`.
- Growth Messages records should set `Audience Target`, `Growth Channel`, `Sender Identity`, `Message Kind`, `Status`, and relevant timestamps when available.
- Prospect PII and channel state belong in Notion, not git.
- Audience-target state belongs in Notion so the same Germany growth channel skills can run against future target groups.
- Public claims remain provisional until approved claim by claim.

## Review Needed

- Analyse Meta, Reddit, and Google ad accounts when a specific account-analysis task is requested.
- Import/review video creatives once the Drive folder is accessible to the connector.
- Review current static creative batches in Figma in more depth, using a new tab for each batch.
- Confirm which specific public claims are approved:
  - EUR 10,500 average yearly savings.
  - "Earnings of EUR 80k could lower tax by up to 14%."
  - "Starting from EUR 80k revenue."
  - "All-in-one administration."
  - "No hidden costs / full service, zero add-ons or surcharges."
  - "We protect your liability and your bottom line."
  - Investment compounding examples based on tax savings.
- Verify channel sender identity/session checks for LinkedIn, Facebook, Reddit, and personal email before enabling send-capable growth skills.
- Confirm whether the user's 2026-06-01 "Refund" item is a separate channel, a campaign angle, or intentionally out of scope.
- Confirm which older tax-savings claims should be retired, reworded, or retained when marketing Authority Calling and the newer service model.
