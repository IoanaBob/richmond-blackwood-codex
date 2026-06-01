# Growth, Sales, And Marketing

Status: provisional.
Imported: 2026-05-04.
Updated: 2026-06-01.
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
- Backend supports HubSpot contact/deal sync and lead payment/order paths.
- HubSpot pipeline and funnel metrics can be accessed through the HubSpot API and RB database on demand when the user asks for a specific task.

## Germany Growth Operating System

Status: provisional.
Source: user instruction in Codex thread on 2026-06-01 and live Notion connector create/read-back.
Imported: 2026-06-01.
Review: confirm approved public claims, current offer framing, Ioana sender identity routes, future audience targets, and whether the user's "Refund" item is a separate channel or out of scope.

Task project:

- `RB Germany Growth System`: `https://www.notion.so/372e41301314817bb344fbb0a11d9ae8`

Database home:

- `RB Client Databases`: `https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`

Operating databases:

- Audiences: `https://www.notion.so/3f6c49da1a4f455a9935cba8da1d22d7`
- Channels: `https://www.notion.so/4d0f85fa5e7f4a208861c4705aecc2c4`
- Targets: `https://www.notion.so/c4faf7ded71a4f7580dee4aa39106ee8`
- Business Partners: `https://www.notion.so/a179e21f0e014f4db65bbe59135c9d0f`
- Compliance Checks: `https://www.notion.so/cc0561be66e44aa0a5296271a376917d`
- Metrics: `https://www.notion.so/0fa79723d1e74fb7a7eb2c491e517a53`
- Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`

Audience model:

- The system is Germany growth overall, not only Americans in Germany.
- The Germany Growth project is for tasks only; operating databases live in the Richmond Blackwood teamspace database hub.
- Each channel, target, business partner, compliance check, metric, and growth communication should be attached to an `Audience Target` where the schema supports it.
- First audience target: `American tech workers in Germany / relocating to Germany`.
- The superseded `RB DE Growth Partnerships` data source was trashed on 2026-06-01. Partnership prospects now use the existing Business Partners database with optional `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate` fields.

LinkedIn operating quota:

- Status: provisional internal operating rule.
- Source: user instruction on 2026-06-01; LinkedIn Help pages `https://www.linkedin.com/help/linkedin/answer/a550555`, `https://www.linkedin.com/help/linkedin/answer/a563153/`, and `https://www.linkedin.com/help/linkedin/answer/a6264256` fetched on 2026-06-01.
- Imported: 2026-06-01.
- Review: confirm live LinkedIn warning/restriction state before any send-capable run.
- Goal math: target 4 customers/month. Planning assumption is about 1.5 meetings/business day, or about 30-32 meetings/month. At about 10% invite-to-meeting conversion, plan about 320 blank invite requests/month.
- Calculation: 320 blank connection requests/month / 20 business days = 16 requests/business day.
- Daily operating range: 15-20 blank connection requests/business day after approval and immediate Ioana-session verification.
- Personalized invite notes are off by default. If the user requests an exception, use a separate approval gate and respect the current LinkedIn personalized-note limit for Ioana's account.
- The LinkedIn skill may run several times per business day for invite batches, acceptance checks, first-message packets, explicit reply drafting, follow-up drafting, and metrics-only closeout.
- First messages, replies, and follow-ups are sent only after acceptance or thread context warrants them. They must be short, relevant to the visible profile signal, and about who the person is and what they do.
- LinkedIn message drafts must be highly specific and targeted: name the company, product, project, shipped system, post, launch, or real public detail such as a feature, market, customer segment, technical problem, or founder decision. Generic phrasing like "saw the founder angle", "saw your work", or "what are you focused on" is blocked.
- LinkedIn copy should bring up US-vs-Germany differences when relevant: use admin/taxes only as a passing joke, preferably "Admin and taxes I'm sure were much easier in the States", plus one second contrast tied to the prospect's topic, such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, or developer adoption. Avoid self-labels like "as a fellow tech founder" or "I am a tech founder too."
- Questions must be highly pointed and tied to a named detail. Broad prompts like "How are you thinking about that?" are blocked; prefer decision/tradeoff questions like "Did X push you toward Y instead of Z?"
- Outreach copy must not mention RB services, tax/admin offerings, savings claims, sales paths, or booking a call. Ioana's tone should be natural, specific, and curious about the person's work; the sale happens later, outside the outreach copy.
- The Germany move/tax/admin line may be used only as a light aside before pivoting to the person's work, not as a service hook.
- If LinkedIn shows a warning, restriction, checkpoint, or degraded acceptance pattern, pause sending and log the blocker in Communications.

Relocation partner email quota:

- Status: provisional internal operating rule.
- Source: user instruction on 2026-06-01.
- Imported: 2026-06-01.
- Review: confirm Ioana email sender route and first partner queue quality before send-capable runs.
- Daily operating target: open at least 5 new first-time email conversations with distinct relocation-partner Business Partner prospects per business day for the active audience.
- First-time email conversations are counted separately from replies and follow-ups. Replies and follow-ups still advance Communications and Business Partner stage, but they do not satisfy the 5/day first-time conversation target.
- Daily automation may source, qualify, draft, and report the queue; it must not send. First-time emails send only after explicit approval for exact text and immediate Ioana sender-session verification.
- If fewer than 5 qualified or draft-ready relocation partner prospects are available for the day, record a sourcing queue gap/blocker rather than lowering the target.

Required channel skills:

- Master daily orchestration.
- LinkedIn direct connect followed by message after approval.
- Facebook group sponsorship and posting for the active audience target.
- Relocation-agent partnership outreach.
- Reddit community presence for the active audience target.

Operational gates:

- Partnership prospects go to Business Partners immediately, including Facebook group sponsorship/admin leads, relocation agents, expat coaches, immigration-adjacent firms, and commercial/professional referral firms.
- Non-partner LinkedIn individuals, Reddit communities/posts, and direct research targets stay in Growth Targets.
- Reddit is direct community engagement only for now. Do not pursue Reddit moderator outreach, sponsorships, paid posts, DMs, modmail, or commercial counterparties, and do not create Business Partners from Reddit routes unless the user explicitly re-enables that channel.
- Business Partner `Invoicing Email` is only for genuine invoicing/commercial emails; casual/admin/contact routes stay in `Notes` and Communications.
- All outbound send-ready stages must use Ioana as the sender persona.
- Any send-ready action must block if the active connector or browser session is not verified as Ioana.
- Drafts, sends, replies, and follow-ups for growth use canonical Communications, not a separate growth outreach database.
- Growth communication records should set `Audience Target`, `Growth Channel`, and `Sender Identity` when available.
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
- Verify Ioana identity/session checks for LinkedIn, Facebook, Reddit, and personal email before enabling send-capable growth skills.
- Confirm whether the user's 2026-06-01 "Refund" item is a separate channel, a campaign angle, or intentionally out of scope.
- Confirm which older tax-savings claims should be retired, reworded, or retained when marketing Authority Calling and the newer service model.
