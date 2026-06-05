---
name: rb-germany-growth-reddit
description: Reddit community engagement and reactive DM flow for RB Germany growth with Growth Targets, Growth Messages, and Ioana-only send gates.
---

# RB Germany Growth Reddit

Use this skill for Reddit community discovery, rule review, helpful community participation planning, reactive DM handling, follow-ups, and logging for a Germany growth audience target. Reddit starts from direct public community engagement; DMs are allowed only after engagement with our public post/comment or when an inbound DM is received.

## Hard Gates

- Sender persona is always Ioana.
- Any Reddit post, comment, reply, or DM blocks unless the active Reddit account/session is verified as Ioana immediately before sending.
- No overt promotional posts, cold/proactive DMs, moderator outreach, modmail, sponsorship asks, paid posts, or commercial-counterparty work in the Reddit channel for now.
- For any public Reddit draft where Ioana or RB can seriously help with the specific problem, assess whether a soft DM-help line fits naturally. Add it only when it makes the comment more useful and does not feel forced. Label it as a promotion-rule risk in the packet and remove it if subreddit rules or thread style make it unsafe.
- Never copy, lightly paraphrase, or structurally mirror another Reddit user's comment. Existing comments are style/context input only; drafts must be original to the post facts and Ioana's specific view.
- Reactive DMs are allowed only when the person engaged with our public Reddit post/comment or sent an inbound DM first.
- Reddit help must be direct advice first. Give the most pertinent high-level answer to the person's actual problem before asking for anything from them. If the issue needs case-specific review, then offer a call or deeper help as the next step.
- Any Reddit help-call, scheduling, or deeper-support packet must include a full source-chain brief before drafting: original thread title and URL, original poster, post date, exact problem facts from the initial post, Ioana's public comment/reply, the other person's public reply, all visible DM/private-message text, timestamps where available, source URLs, known unknowns, and why each fact matters. If a source is truncated or unavailable, label it as truncated/unread instead of summarizing around it.
- For Reddit banking, address, PMB, domicile, KYC, brokerage, or frozen-account cases, default strategy is to stabilize the immediate banking/address/KYC issue first. Irish company/banking setup is internal strategy only: save it in the Growth Target, Growth Message, task, or call brief when freelance/company income makes it relevant, but do not mention it in outbound Reddit copy unless the user explicitly approves that exact disclosure later.
- Reddit scheduling replies must ask for the prospect's email if an invite is needed. If proposing a time, explicitly say it is a call or meeting; do not use vague availability phrasing such as `I can do Friday` without naming the call. Do not post Ioana's, RB's, or EIP's email address in Reddit DMs or public Reddit replies.
- Reddit call holds and invites must use Ioana's RB persona calendar, `ioana@richmondblackwood.com`, through the approved OAuth vault / shared Google persona store only. Do not start browser OAuth, connector reauth, or a new consent flow during this skill. If the vault-backed persona calendar route is unavailable, record a blocker in Growth Messages/Tasks and stop.
- Public Reddit engagement must be very recent. Every candidate must show the post created date and latest meaningful activity date before drafting. Default to posts active in the last 72 hours; allow 3-7 days only when the thread is still clearly live. Older threads are research-only unless the user explicitly approves that exact dated exception.
- Threads older than 7 days are research-only unless they are current recurring megathreads, pinned/current weekly threads, or the user explicitly approves the exact dated exception after seeing the dates.
- Threads older than 14 days are never direct engagement targets by default; use them only for audience research, wording patterns, subreddit fit, and rules/context.
- Daily Reddit commenting target is 10 approved top-level comments on 10 distinct recent posts for the active audience. Replies, reply-thread follow-ups, DMs, reactive DMs, modmail, votes, saves, and engagement with existing RB/Ioana comments do not count toward this target.
- Source enough recent relevant posts, normally at least 15-20 candidates, to produce 10 safe top-level comment drafts. If fewer than 10 safe recent comment-ready posts are available, report the comment-target gap and do not fill it with stale, weak-fit, or unsafe threads.
- Do not send/post/comment/DM during daily automation.
- Preview outbound text in chat. Do not save Reddit drafts.
- Send/post/comment/DM only after explicit user approval for the exact text.
- Log every pre-lead post, comment, reply, DM, blocker, and follow-up in Growth Messages.

## Data Routing

- Subreddits, posts, and non-commercial community targets go to Growth Targets.
- Do not create Business Partners from Reddit moderator, sponsorship, paid-post, or commercial-counterparty routes unless the user explicitly re-enables that channel later.
- Helpful participation and reactive DMs are tracked in Growth Targets and Growth Messages.
- Use `Audience Target` and `Growth Channel = Reddit` where available.
- Promote/link to canonical Communications only when an interaction becomes a lead/client/business communication that belongs in the main RB communications ledger.

## Packet Workflow

When invoked standalone for a live run, use `/private/tmp/rb-germany-growth-reddit/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving on.

When invoked by `rb-germany-growth`, return a channel work packet instead of performing sends, posts, or comments. The master daily run may use this skill for read/plan work only.

Shared gates:

- No post, comment, reply, or DM is sent before exact text approval.
- No overt promotional post, cold/proactive DM, moderator outreach, modmail, sponsorship ask, paid post, or commercial-counterparty ask is drafted or routed from this skill. Narrow soft DM-help lines are allowed only under the hard gate above.
- Stop if Ioana is not the verified active Reddit session at a send-ready step.

## Stages

1. Preflight
   - Read `rb-germany-growth` and `rb-communications`.
   - Load active Audience Target, Growth Targets schema, Growth Messages schema, Communications handoff schema, and relevant Tasks.
   - Confirm no work is routed to the deleted legacy partnership data source.
   - Confirm no Reddit work is routed to Business Partners, modmail, cold DMs, sponsorship, paid posts, or commercial counterparties.

2. Audience And Community Criteria
   - Default audience is `American tech workers in Germany / relocating to Germany`.
   - Target communities where the audience naturally asks about German setup, relocation, taxes, company structure, visas, work, tech careers, startup/founder setup, remote work, or expat administration.
   - Primary sourcing priority is high-intent Germany admin/tax pain, especially posts from people struggling with consulting, freelancing, contractor status, invoicing, VAT, income tax, social security, private/public health insurance, pension contributions, GmbH/UG/company setup, EOR/payroll, or remote work for foreign clients while Germany-based.
   - Prioritize threads with explicit high-earner or budget-qualified signals: six-figure compensation, high day rates, senior tech consulting, US/foreign clients, US-like compensation, RSUs/equity, company revenue, high taxable income, expensive pension or health-insurance contributions, or a stated desire to reduce/avoid statutory pension contributions. Use only explicit public text from the post or comments; do not infer income, wealth, nationality, age, or tax position from identity, appearance, or seniority alone.
   - Deprioritize generic relocation, tourism, student, visa-only, language-learning, housing-only, and low-context job-search posts unless they include a concrete freelance, consulting, company, tax, pension, payroll, banking, or high-earner setup problem.
   - Useful query themes include `Germany freelance tax`, `Freiberufler Germany`, `consultant Germany taxes`, `remote US job Germany`, `US client Germany`, `German pension contributions`, `Rentenversicherung freelancer`, `GmbH vs freelancer`, `UG Germany taxes`, `private health insurance self-employed`, `VAT Germany freelancer`, `EOR Germany`, and `Scheinselbständigkeit`.
   - Target very recent Reddit activity, not stale archive threads. For top-level comment opportunities, default to threads created or meaningfully active within the last 72 hours. Threads active 3-7 days ago are allowed only when the topic is strong and visibly still live.
   - Source enough recent relevant posts to prepare at least 10 top-level comment drafts per day for the active audience. Use 15-20 sourced candidates as the normal buffer when the subreddit quality is uneven.
   - Track the daily top-level comment target state in the packet: target 10, safe comment drafts, high-risk/provisional drafts, approved comments posted today, replies/DMs excluded from count, and remaining gap.
   - Keep research reusable for future Germany growth audience targets.

3. Discovery And Growth Target Upsert
   - Dedupe by subreddit URL, post URL, and community name.
   - Create/update Growth Targets for subreddits, relevant posts, recurring threads, and non-commercial research targets.
   - Mark distinct recent posts that could receive a top-level comment as `Top-Level Comment Candidate` when the schema supports it.
   - Record audience fit, post created date, last meaningful activity date, activity recency, rules URL, promotional restrictions, and participation angle.
   - For each candidate post, record the primary problem category, such as `freelance tax`, `consulting setup`, `pension contribution`, `company structure`, `remote foreign employer`, `EOR/payroll`, `banking/KYC`, `VAT/invoicing`, or `high-comp Germany setup`.
   - Record the explicit high-earner or budget-qualified signal when present. If no explicit signal exists, mark it `not shown` rather than guessing.
   - Rank comment candidates by problem fit first, then recency, then subreddit rule safety. A very recent generic post should not outrank a recent concrete Germany freelance/tax/pension/company-setup problem.
   - Mark stale posts older than 7 days as research-only. Do not create them as active engagement targets unless they are current recurring/pinned threads or the user explicitly approves the exact dated exception.
   - Do not create posts older than 14 days as direct engagement targets by default.
   - Set `Stage Updated At`, `Rules Checked At`, and `Last Activity At` when target state or rule state changes.

4. Rule And Compliance Review
   - Read subreddit rules, wiki/sidebar, pinned posts, and recent visible moderator guidance when available.
   - Read recent posts and visible comments from the same subreddit, and when possible the target thread, to understand local style, level of directness, typical comment length, terminology, and how users frame helpful answers.
   - Treat existing comments as context only. Capture style and thread facts, not wording, ordering, examples, or reasoning structure from another user's comment.
   - Classify allowed actions for community-first engagement: helpful comments, helpful non-promotional posts, replies to replies, recurring-thread participation, reactive DMs after a valid trigger, or blocked.
   - If rules require modmail, moderator approval, sponsorship, payment, or commercial permission before participation, mark the item blocked for now.
   - Treat rule, approved-claim, and Ioana-session checks as in-run gates. Store rule evidence on the Growth Target and blockers/follow-ups in Growth Messages or Tasks, not in a compliance-check database.

5. Helpful Participation Packet
   - Draft helpful, non-promotional top-level comments or posts in chat when rules allow. Default Reddit daily output is 10 top-level comment drafts on 10 distinct posts.
   - Before each draft, show the initial Reddit question/topic, relevant post/comment context, subreddit rule basis, and why this response is useful for that specific thread. If the post body or thread context is missing, block the draft until context is read.
   - For each draft, show the Germany growth fit: problem category, explicit high-earner/budget signal if any, the concrete tax/admin/company/freelance/pension issue, and the immediate advice Ioana can give without turning the comment into a pitch.
   - Include a subreddit style-basis before each draft: recent posts/comments read, observed tone, typical specificity/length, terms users use, and any style to avoid. Drafts must match the local style without becoming rude, promotional, generic, or inaccurate.
   - Include a `DM help assessment` before each draft: whether Ioana or RB can seriously help with the thread's specific problem, whether a DM line fits naturally, and whether it should be removed for rule or tone reasons.
   - DM-help lines must be specific and low-pressure, for example "Can help with both in DM if useful" or "DM me if you want a second pair of eyes on the setup." Do not use generic CTAs, booking language, service names, or broad filler.
   - If the post is directly in Ioana's professional lane, such as company structure, tax residence, cross-border freelance/company setup, German admin/tax setup, banking/KYC, or US/EU expat tax structure, assess whether the comment should say that this is work Ioana does professionally and invite a DM for help. Use it only when it adds real value to that thread.
   - For US-like compensation threads, keep the baseline narrow: remote work through a Germany-compliant setup, or US big tech in DACH through a custom Germany-compliant setup to optimize taxes. Do not add extra options such as HFT, finance, Switzerland, startups, equity-heavy roles, or generic market commentary unless the user explicitly approves them for that thread.
   - Block AI-sounding copy. Avoid the word "path" in outbound copy, slash-heavy phrasing, list-style copy, and mechanical contrast sentences that read like a template.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must either answer the post, give a concrete check, ask a useful question, or move the thread forward.
   - Avoid analysis-intro phrases that announce the point before saying it. Say the actual point directly.
   - Do not stack examples, alternatives, caveats, or issue lists in outward-facing text. Use one concrete point, or two only when the message truly needs both.
   - Block copied-looking copy. Before approval, compare the draft against visible thread comments and rewrite if it uses the same opening, sequence of points, examples, phrasing, or conclusion as another user.
   - Keep outbound sentences short. Avoid comma-chain lists; any outbound sentence should normally have at most two commas and never more than three.
   - Use natural Reddit paragraphing. Do not split every short point into its own paragraph; prefer one compact paragraph or two medium paragraphs when that reads more human. Use a separate paragraph only for a real topic shift or a low-pressure DM line.
   - Block the packet if the target thread is stale: no meaningful activity in the last 72 hours by default, or no clear live-thread reason for activity 3-7 days ago. Threads older than 7 days need exact user approval for that dated exception.
   - Avoid unapproved claims and sales language.
   - Show sender identity as Ioana and Reddit account/session verification requirement.
   - Include target URL, post created date, last meaningful activity date, recency basis, rule basis, follow-up date, and whether the draft counts toward the 10/day top-level comment target.

6. Community Engagement Readiness
   - Confirm the proposed action is a direct community post/top-level comment, a reply, or an allowed reactive DM.
   - For daily target accounting, confirm whether the item is a top-level comment on a distinct post. Replies, DMs, follow-ups, and second comments on the same post do not count toward the 10/day Reddit comment target.
   - For DMs, confirm the exact trigger: the person engaged with our public post/comment, or the person sent an inbound DM first.
   - For DMs, confirm the trigger is recent: inbound DM or engagement with our content within the last 14 days. Older triggers block by default unless the user explicitly approves the exact exception.
   - Confirm public post/comment/reply targets have meaningful activity within the last 72 hours by default, or 3-7 days ago with a clear live-thread reason. Older public targets block unless the user explicitly approves the exact dated exception.
   - Confirm the content is useful on its own without relying on RB promotion.
   - Confirm the content is original and not a close paraphrase of an existing Reddit comment in the thread.
   - Confirm there is no request for moderator approval, commercial placement, sponsorship, paid posting, cold DM, or modmail.
   - If any commercial or moderator route is needed, block the item and record that Reddit commercial/moderator routing is disabled.

7. Approved Send/Post/Comment/DM
   - Run only after explicit approval.
   - Re-check the Reddit session is Ioana.
   - If not Ioana, log a blocker in Growth Messages and stop.
   - Send/post/comment/DM only the approved text.
   - Count only approved top-level comments on distinct posts toward the daily 10-comment target. Do not count replies, reactive DMs, follow-ups, modmail, votes, saves, or any second comment on the same post.
   - For DMs, send only when the approved packet includes the valid trigger and source URL/message context.
   - Log the URL/message ID, rule basis, result, `Message Kind = Post`, `Comment`, `Reply`, or `DM`, `Status = Sent/Posted`, `Growth Event At`, and next follow-up in Growth Messages.
   - Set Growth Target `Outreach Active At`, `Stage Updated At`, and `Last Activity At` when participation starts.

8. Reply And DM Drafting Packet
   - Track replies, removals, bans/warnings, helpful engagements, and link clicks if available.
   - Track inbound Reddit DMs and people who engage with our public post/comment.
   - Before each reply or reactive DM draft, show the initial Reddit question/topic, the public engagement or inbound-DM trigger, the latest message/comment being answered, and why a reply or DM is justified.
   - Before any help-call, scheduling, or deeper-support DM draft, write and show a full source-chain brief: original thread title and URL, original poster, post date, exact initial post facts, Ioana's public response, the other person's public response, visible DM/private-message text, timestamps where available, source URLs, known unknowns, and why each detail changes the advice. Broad summaries are blockers.
   - Include the subreddit/thread style basis before each reply or reactive DM draft, especially whether local replies are blunt, checklist-oriented, anecdotal, source-heavy, short, or conversational.
   - Draft Reddit replies and allowed reactive DMs in chat before any send.
   - Keep replies useful to the thread and responsive to the other person's comment.
   - Keep DMs tied to the exact public engagement or inbound DM context; do not generate DMs from subreddit member lists, profile searches, or cold prospecting.
   - For Reddit help DMs, lead with a concise high-level answer that is actually useful without a call. Then ask for only the missing facts needed to diagnose. If the situation is too specific for text, offer to jump on a call after the useful answer, not before it.
   - For reactive DMs or reply threads after roughly three substantive messages, assess whether the next reply should bridge into Germany admin, tax, company, freelance, banking, or remote-work setup. Use the bridge only when the thread already contains a real setup signal. If the bridge would be forced, record the missing fact and keep answering the actual problem.
   - For Reddit help-call scheduling, ask for the prospect's email if an invite is needed. If proposing a time, explicitly say it is a call or meeting; do not use vague availability phrasing such as `I can do Friday` without naming the call. Do not provide Ioana's, RB's, or EIP's email address in Reddit. Create holds/invites only from `ioana@richmondblackwood.com` through the OAuth vault; if any tool asks for reauth, block instead of continuing.
   - For banking/address/KYC cases, first advise on stopping further account/address changes that could worsen freezes, then ask the minimum missing facts needed to diagnose. Keep Irish company/banking setup out of the outbound Reddit reply or DM; it belongs only in the internal brief unless the user explicitly approves exact wording later.
   - Do not use unnatural phrasing such as "map the clean version", "map the clean setup", or "clean version". Say the concrete thing instead, for example "work out what address to use", "figure out what to update first", or "look at the bank/state details".
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must answer the thread, provide a concrete check, or move the thread forward.
   - Do not pitch, ask for mod approval, suggest paid/commercial placement, or introduce RB services unless the person explicitly asked for help that makes RB directly relevant and the exact wording is user-approved.
   - Update Growth Target status only when evidence supports it.

9. Follow-Up Drafting Packet
   - Inspect due follow-ups for posts, comments, replies, DMs, removals, warnings, and recurring threads.
   - Before each follow-up draft, show the initial thread/topic context, prior RB/Ioana interaction, latest thread state, and the specific reason a follow-up adds value.
   - Re-check the subreddit/thread style basis before follow-up drafting if more than 48 hours passed or the thread tone changed.
   - Draft follow-up comments/replies/DMs only when there is a real thread or DM reason to add value.
   - Block ornamental wording that adds style without a specific purpose. No decorative metaphors, clever summary lines, or sentence structures that add vibe instead of information. Every sentence must answer the thread, provide a concrete check, or move the thread forward.
   - If a follow-up would be promotional, repetitive, or contextless, do not draft it; advance the due date, close it, or mark it blocked.
   - Use Growth Messages follow-up dates for later checks.

10. Reporting And Closeout
   - Do not create or update summary reporting rows.
   - Reconstruct channel reporting from timestamped Growth Targets and Growth Messages records for communities researched, recent relevant candidates sourced, top-level comment drafts, approved top-level comments posted, 10/day top-level comment target met or missed, rule checks, replies, reactive DMs, helpful engagements, blockers, and follow-ups.
   - Report any community-specific constraints before future runs.

## Output Packet

Return:

- Growth Targets created/updated.
- Rule/compliance findings.
- Growth Messages created/updated.
- Post/comment previews, reply drafts, reactive DM drafts, follow-up drafts, blockers, and reporting counts.
- Daily Reddit comment target state: target 10 top-level comments on distinct recent posts, sourced candidates, safe comment drafts, high-risk/provisional drafts, approved comments posted, replies/DMs excluded from count, rejected, and remaining comment-target gap.
