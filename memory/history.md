# History

Status: active.

## 2026-06-01 - Germany Growth Business Partners Routing And Skills

- User request: Implement the Germany Growth System plan by removing the dedicated Growth Partnerships source, routing all partnership prospects through existing Business Partners, and creating master/channel multi-stage skills without running them.
- Context read: `AGENTS.md`, `skills/index.md`, skill-creator guidance, Germany growth memory/source files, Business Partners, Audiences, project page, and the superseded growth partnership data source.
- Actions taken: Pulled `origin/main`, created branch `codex/germany-growth-business-partners`, added optional `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate` fields to Business Partners, removed the old audience relation to the legacy partnership source, trashed that legacy source after no rows were found to migrate, updated the Germany Growth project page, and added repo-local master, LinkedIn, Facebook groups, relocation partners, and Reddit skills.
- User follow-up on 2026-06-01: Keep Growth Targets, but move all growth operating databases into the Richmond Blackwood teamspace; the Germany Growth project is for Tasks only.
- Actions taken for follow-up: Moved Audiences, Channels, Targets, Compliance Checks, and Metrics under top-level `RB Client Databases` and updated the Germany Growth project page to task-only scope copy.
- User follow-up on 2026-06-01: For the LinkedIn channel, calculate a monthly invite-request number and refine the Americans-in-Germany audience toward tech workers.
- Actions taken for follow-up: Refined the first active audience to `American tech workers in Germany / relocating to Germany`, updated the Notion audience row, and added a LinkedIn internal target of 320 blank connection requests/month, calculated as a 16-request planning baseline across 20 business days. Normal send range is 15-20 blank requests/business day; personalized invite notes are off by default.
- User follow-up on 2026-06-01: LinkedIn should be runnable several times per day for follow-ups, connection acceptance checks, and first-time messages, with first-message guidance and examples.
- Actions taken for follow-up: Added LinkedIn intra-day run modes for invite batches, acceptance checks, first-message packets, follow-up sweeps, reply triage, and metrics-only closeout.
- User follow-up on 2026-06-01: Growth skills were missing reply and follow-up drafting, and LinkedIn outreach should not be about getting a call, creating a sales path, or anything RB sells. The outreach should be about who the person is and what they do, with Ioana writing as a tech founder curious about their work; sale happens later. User also suggested the Germany move/tax/admin pain opener as one possible message.
- Actions taken for follow-up: Added explicit reply-drafting and follow-up-drafting stages across the channel skills and rewrote LinkedIn first-message, reply, and follow-up guidance to block RB services, tax/admin offerings, savings claims, sales paths, and call asks in outreach copy. Added the suggested "I imagine moving to Germany with the taxes and admin side was a massive pain, right?" example as shared human context that pivots back to the person's work.
- User follow-up on 2026-06-01: Corrected the LinkedIn examples: "saw the founder angle" is not natural language, and "what are you focused on" is too generic. Messages should say something like "saw you founded X, of which I am a big fan" only when backed by a specific reason, and the question should be highly specific to show real connection to the person's work.
- Actions taken for follow-up: Tightened LinkedIn message rules and examples so drafts must cite a concrete public signal, name the company/product/work where relevant, avoid generic founder/focus phrasing, and ask a targeted question tied to the source evidence.
- User follow-up on 2026-06-01: Corrected that "as a fellow tech founder" is not human and not how Ioana speaks. Messages should bring up US-vs-Germany differences, using tax as one good example and another difference related to the topic being messaged about.
- Actions taken for follow-up: Replaced self-labeling founder phrasing in LinkedIn guidance with a US-vs-Germany contrast pattern: tax/admin as shared context plus one topic-specific contrast such as privacy, sales cycles, procurement, hiring, fundraising, fintech regulation, cloud/data constraints, consumer behavior, or developer adoption.
- User follow-up on 2026-06-01: Remove Reddit moderator/sponsorship/commercial-counterparty routing for now and keep only direct Reddit community engagement.
- Actions taken for follow-up: Updated the Reddit skill, master skill, live Notion Reddit channel row, and Reddit identity check so Reddit uses direct community posts/comments/replies through Growth Targets and Communications only; Reddit modmail, DMs, sponsorships, paid posts, commercial counterparties, and Business Partner routing are disabled unless explicitly re-enabled.
- Decisions made: Partnership prospects route immediately to Business Partners; non-partner LinkedIn individuals, Reddit communities/posts, and direct research targets stay in Growth Targets; canonical Communications remains the log for drafts, sends, replies, blockers, and follow-ups; Ioana remains the only sender persona for send-ready work; the task project must not own operating databases.
- Verification: Live Notion read-back verified the Business Partners icon and growth fields, the old partnership source is trashed, the five growth operating databases are under `RB Client Databases`, and the Germany Growth project page has no child database blocks. Final repo verification for this branch is recorded in the run closeout.
- Limitations or gaps: Ioana identity registry setup and the daily automation are still separate open tasks; the user's "Refund" item remains out of scope pending clarification.

## 2026-05-20 - Common Tasks Follow-Through Process Corrections

- User request: Apply issues found in the Slack closeout and process run: keep packets but auto-approve specific stages, add missed WhatsApp chats, prevent premature checkpoint advancement, review comments from the run, require Stage 1 to pull latest `main`, and prepare a new PR.
- Context read: Common tasks skill, stage packet protocol, common tasks process, communications process, handoff/current-state/decisions memory, WhatsApp route pointers in client files, and the completed Friday-to-Tuesday run packets.
- Actions taken: Added a WhatsApp source roster reference for mandatory Stage 3 coverage, including unresolved Monochromatic, Aaron Chamberlain, PCL/Ricardo, CLV/Celine, and AKS/Ana routes; documented that unresolved/missed routes must not have checkpoints advanced until discovered, read, and backed by approved checkpoint storage; added standing auto-approval rules for Stages 1, 2, 10, 11, and for Stages 13/14 after Stage 12 Slack send approval; tightened Slack closeout requirements so messages sound human, omit background source-marker/checkpoint/Codex mechanics, hyperlink incoming/replies/blockers, and tag actual people with Slack IDs; added Stage 1 `git pull origin main`.
- Decisions made: Preserve packets/scratch files by default at closeout; typed approval of exact rendered Stage 12 Slack text is allowed for this specific workflow when the native approval prompt is unavailable; general communication rules keep stricter approval behavior unless a specific workflow overrides them.
- Verification: `rg` review checked for the new pull, auto-approval, roster, and Slack quality rules across skill/process/memory; `git diff --check` passed.
- Limitations or gaps: The newly added missed WhatsApp routes still need live WhatsApp search and checkpoint storage resolution during the next run; their checkpoints were intentionally not advanced in the completed run.

## 2026-05-19 - Common Tasks Follow-Through Redesign

- User request: Replace the failing inbound triage flow with a task-first common tasks follow-through workflow based on the approved redesign.
- Context read: Existing inbound triage skills/processes, communications/Gmail/WhatsApp rules, active memory, automation prompt, and the Konvi packet-review example supplied by the user.
- Actions taken: Added `skills/rb-common-tasks-follow-through/`, stage packet protocol, RB Client Databases task registry, and `processes/common-tasks-follow-through.md`; removed the old `rb-inbound-*` phase skill files from the active flow; updated communications, Gmail, WhatsApp, process, memory, and root agent instructions to use canonical Communications and task-capable client data sources.
- Decisions made: Canonical Communications is `https://www.notion.so/1b5e4130131480ab84f3cca356736807`; old RB Communications is migration source only; every live RB Client Databases data source is task-capable; Slack closeout happens after task closeout and requires approval of the exact rendered message; `W-IdNr` values are not saved.
- Verification: Static scans found no active old `rb-inbound-*` workflow references in skills/processes/current memory, and `git diff --check` passed during the implementation pass.
- Limitations or gaps: Live Notion schema changes and historical Communications migration were not performed in this repo-only update; the new skill requires those as packet-approved live run actions.

## 2026-05-18 - SVL And Kristjan Context Import

- User request: Return to main after the MHL branch was closed, pull, and load context for SVL and Andrei-like individual routing for Kristjan, with tax registration pending and personal-tax work from 2026 onward.
- Context read: Notion company/project/individual/employment/contract/filing/task records, Google Drive SVL folder and personal-tax subfolder, Gmail ELSTER/Stripe/Lexware/TK context, WhatsApp `Olafsson, Kristjan | Richmond Blackwood`, Slack internal context, and repo RB client/source skills.
- Actions taken: Switched from the closed MHL branch to updated `main`, created branch `codex/svl-context`, created `clients/Companies/SVL/` and `clients/Individuals/KRISTJAN MAR OLAFSSON/`, and routed company vs individual facts into separate files.
- Decisions made: Use `SVL` as the company folder from Notion `Reference`; use Kristjan's Notion first-name and last-name fields for the individual folder; store WhatsApp/Gmail/Slack/Drive/Notion source pointers and summaries only; keep raw documents, identity files, certificates, credentials, transcripts, media, and attachment identifiers out of git.
- User follow-up on 2026-05-18 resolved: still waiting for tax registration; no chase task should be created here because the user will handle it through a separate skill; filings are overdue with Finanzamt as blocker; Simoneta owns retroactive payroll tax; Kristjan was probably already set up in Lexware; Lexware and WAMO costs are RB-side; Mediainvesting hours/bonus sheet is canonical; personal-tax folder year should be 2026; freelancer deregistration is pending through an open task; RB should set up individual/freelancer ELSTER; AI GreenBytes update is completed but JP needs to upload; apartment amount is about EUR 750k with a hurdle around the partner selling his company. The mistaken Drive year folder was renamed from `2025` to `2026` and verified.
- Verification: Connector reads completed for Notion, Drive, Gmail, WhatsApp, and Slack. No live Notion/Drive/Gmail/Slack/WhatsApp records were modified during the import.
- Limitations or gaps: German tax/VAT registration response, retroactive payroll-tax execution, freelancer deregistration task completion, individual ELSTER setup, TK response, linking the 2026 Drive folder to the Notion filing when personal-tax work starts, JP evidence upload for AI GreenBytes, and final apartment ownership/loan/security structure remain open.

## 2026-05-15 - MHL And Gabriel Context Import

- User request: Return to main after the NACV branch was merged, then load Mindharbour/MHL and Gabriel context, including Grey Desk, Gabriel personal taxes, premium/private-channel context, car purchase/registration, and the Ltd & Co KG / Berlin apartment tax-residence plan.
- Context read: Notion company/project/individual/asset/contract/filing/task records, Google Drive MHL folder and Gabriel personal-tax subfolder, Gmail notary/Zoll/SteuerGo/payment threads, WhatsApp `Grey Desk Restructuring`, private Slack `#rb-structuring` and `#rb-operations`, and repo RB client/source skills.
- Actions taken: Stashed unrelated NACV/Andrei local work, switched to updated `main`, created branch `codex/mhl-gabriel-context`, moved the work to `codex/mhl-context` after user branch correction, created `clients/Companies/MHL/` and `clients/Individuals/GABRIEL LOUIS MANUEL MULLER/`, and routed company vs personal facts into separate files.
- Decisions made: Use `MHL` as the company folder from Notion `Reference`; use Gabriel's full first/last-name fields for the individual folder; store WhatsApp/Slack/Gmail source pointers and summaries only; keep raw documents, Notion attachments, audio/media, and credential/certificate bundles out of git.
- User follow-up on 2026-05-15 resolved: MHL pays EUR 1k/month by Stripe for the European entity; Grey Desk pays approximately USD 10.5k/month for international support; Co-KG service was requested but no notary appointment was booked and blockers are Byron signing availability plus Gabriel's signature route; the Kastanienallee apartment is intended to move under MHL/Co-KG on a flexible timeline; MMG is 100% personal and untouched since Gabriel moved to Germany; preferred WhatsApp communication is the `Grey Desk Restructuring` group.
- Verification: Connector reads completed for Notion, Drive, Gmail, WhatsApp, and Slack. No live Notion/Drive/Gmail/Slack/WhatsApp records were modified during the import.
- Limitations or gaps: Zoll rejection response, VAT registration response/tax number, future-dated filing status cleanup, and the 2025 Gabriel personal-tax filing reconciliation remain open.
Source: local repo.
Imported: 2026-05-05.
Review: operational ledger structure ported from neutral repo infrastructure; entries remain provisional until reviewed.

This file is the append-only chronological ledger for meaningful Richmond Blackwood Codex sessions.

## 2026-05-05 - Initial RB Repository Build

- User request: Build the RB Codex operating repository and keep facts provisional.
- Context read: User instructions, RB Notion destinations, local RB source repos, Slack/Gmail/Drive search summaries.
- Actions taken: Created initial RB memory, source, process, client, and skill structure.
- Files changed: Initial repository structure.
- Decisions made: Keep unsanitised operational context in repo except secrets/credentials; route client-specific private detail under `clients/Companies/<client-reference>/`.
- Verification: `git diff --check` and source keyword scans were clean in the initial pass.
- Limitations or gaps: Full Slack, Gmail, Drive, and Notion client imports remain partial.
- Next step: Continue source-backed imports and resolve open routing questions before external filing.

## 2026-05-05 - Port Neutral Operating Infrastructure

- User request: Port neutral decisions and helper infrastructure from `everguard-research-codex`, excluding company-specific workflows.
- Context read: source package/helper/process/memory structure and current RB repo rules.
- Actions taken: Added RB npm/TypeScript helper layer, RB-neutral helper skills, process docs, and memory ledger scaffolding.
- Files changed: Package metadata, helper scripts under `skills/rb-*`, memory/process/setup/source documentation.
- Decisions made: Gmail drafts default to `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`; SignNow helpers remain generic mechanics only.
- Verification: `npm install`, `npm run typecheck`, helper `--help` smoke checks, `git diff --check`, and forbidden carryover scans passed.
- Limitations or gaps: `npm install` still reports an `@signnow/api-client` engine warning on Node 18.7.0; RB signing policy, signer identity, template catalog, and Drive group/external classifications remain open unless already confirmed elsewhere.
- Next step: User review before any senior-review/commit/push workflow.

## 2026-05-05 - Port WhatsApp MCP Setup

- User request: Port the newly merged WhatsApp MCP server work from `everguard-research-codex` into the currently open RB PR.
- Context read: Source WhatsApp MCP setup guide, persistent bridge helper, WhatsApp communications skill, memory/process rules, and pinned submodule state.
- Actions taken: Added optional RB WhatsApp MCP submodule, setup guide, background bridge helper, WhatsApp communications skill, communication process, and memory/source records.
- Files changed: `.gitmodules`, `third_party/whatsapp-mcp`, `setup/mcp/`, `skills/rb-whatsapp-comms/`, process docs, memory docs, and source logs.
- Decisions made: WhatsApp work should use the MCP tools for normal reads/sends, keep QR/session/media/transcripts local-only, and require explicit send approval.
- Verification: Submodule status, bridge shell syntax, Go bridge test, Python compile check, TypeScript check, `git diff --check`, and source-specific business keyword scan passed.
- Limitations or gaps: RB WhatsApp account and operator rollout remain unconfirmed.
- Next step: Run validation, commit, push, and update PR #1.

## 2026-05-05 - Recover VUN Client Backup And Individual Routing

- User request: Rebase/recover the VUN work after important teammate changes landed on main, favouring the upstream workflow/memory/skills conventions.
- Context read: `origin/main` PR #1 commit, `AGENTS.md`, `processes/repo-operation.md`, `skills/rb-task-pr/SKILL.md`, memory standards, current stashes, and VUN/Nathan client files.
- Actions taken: Created branch `codex/vun-client-routing-backup` from `origin/main`, reapplied the task-owned VUN/Nathan work, migrated client roots to `clients/Companies/` and `clients/Individuals/`, removed stale non-VUN backup references, and left newly created process files stashed.
- Files changed: Client company/individual records, client templates, routing docs, source/memory logs, and the German personal tax analysis skill.
- Decisions made: Treat upstream main as authoritative for repo workflow; keep evidence files in Drive with repo pointers; keep offboarding/delivery separate; route personal correspondence and personal tax material to the individual root.
- Verification: `git diff --check`, `git diff --cached --check`, and `npm run typecheck` passed; branch pushed and draft PR opened at `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.
- Limitations or gaps: VUN relation-filtered Notion table backfill and Nathan personal tax analysis creation remain active tasks.
- Next step: Validate, commit in scoped commits, push the recovery branch, then continue review from the PR workflow.

## 2026-05-05 - Revert Client Evidence Storage To Drive

- User request: Treat downloading all VUN client export files into git as a mistake and return to the Drive-folder procedure.
- Context read: Current VUN/Nathan repo pointers, client storage rules, PR branch history, and evidence package references.
- Actions taken: Rewrote the PR branch to drop the mistaken binary evidence commit, removed the `Client export - VUN/` package from the branch, and updated procedures so Drive stores downloaded/exported client evidence while git stores pointers and blockers only.
- Files changed: Storage rules, VUN/Nathan location files, source/memory logs, and client routing docs.
- Decisions made: Use find-or-create for Drive backup/export folders; do not store downloaded/exported client binaries in git unless the user explicitly approves a narrow exception.
- Verification: `git diff --check` passed, typecheck passed with installed Node 18.17.1, and no `Client export - VUN`, `backup-manifest`, or `download-log` paths remain tracked.
- Next step: Validate, force-push the rewritten PR branch, and update PR #2 notes.

## 2026-05-06 - Direct-Send Communications Rule

- User request: Create a new PR adding the rule that communication drafts should happen in chat, email drafts always show sender, `Subject`, and source thread, email replies prefer existing threads, sends happen directly, and sent communications are stored in RB Communications.
- Context read: `AGENTS.md`, communications process, Gmail/WhatsApp skills, and memory decisions.
- Actions taken: Added central `rb-communications` skill and updated AGENTS, README, communications, Gmail, WhatsApp, and memory docs. After user correction, kept `rb-gmail-drafts` as the email-specific skill for sender/`Subject`/source-thread/signoff and verified draft fallback behavior.
- Files changed: `AGENTS.md`, `README.md`, `processes/communications.md`, `processes/signature-and-gmail.md`, `skills/rb-communications/SKILL.md`, `skills/rb-gmail-drafts/SKILL.md`, `skills/rb-whatsapp-comms/SKILL.md`, `skills/index.md`, and memory files.
- Decisions made: Normal outbound communications are chat-drafted, sender-visible, direct-sent after approval, and logged to Communications; email previews always show `Subject` and source/reply thread when available; existing email threads are preferred; software drafts are exception-only. Email communications still use `rb-gmail-drafts` for Gmail-specific rules.
- Verification: `npm run typecheck`, `git diff --check`, and source-specific/conflicting-rule scan passed.
- Later update: On 2026-05-07, RB Communications was created under RB Client Databases and the VUN Slack closeout record was moved there from the Everguard/research table.
- Next step: Commit, push, and open a new PR.

## 2026-05-06 - Gcloud Gmail Drafting Rule

- User request: Update PR #4 so Gmail email drafting always uses gcloud.
- Context read: Gmail communication skill, Google auth skill, Gmail helper scripts, AGENTS, README, process docs, and memory.
- Actions taken: Made Gmail draft/delete helper defaults run `gcloud auth application-default login` by default and documented the then-current local gcloud-only Gmail API helper path. Superseded on 2026-05-25 by shared global persona auth.
- Files changed: `skills/rb-gmail-drafts/`, `skills/rb-google-auth/`, `AGENTS.md`, `README.md`, `processes/signature-and-gmail.md`, and memory files.
- Decisions made: Gmail draft fallback, sender verification, helper reply-context reads, and unsafe-draft deletion must not use IMAP, app passwords, stored mailbox credentials, or connector-created Gmail drafts.
- Verification: `npm run typecheck`, Gmail draft/delete helper `--help` smoke checks, `git diff --check`, and stale auth-default scan passed.
- Next step: Commit, push, and update PR #4.

## 2026-05-06 - Nathan VAT And 2025 Personal Tax Evidence Triage

- User request: Upload Nathan's WhatsApp evidence, review 2023/2024 VAT missing invoices, and audit the 2025 personal tax analysis against bank statements and invoices.
- Context read: Nathan individual client files, Personal Tax Filing Notion records, user-provided Drive/sheet links, Drive evidence folders, WhatsApp group context, and relevant repo-local skills.
- Actions taken: Uploaded the downloaded WhatsApp invoice pack to the user-provided 2025 Drive folder and recorded repo pointers/source notes under Nathan's individual folder.
- Files changed: Nathan individual Drive/tax/source pointers plus source and memory logs.
- Decisions made: Do not edit the supplied spreadsheets until the user has reviewed the proposed modifications; treat the uploaded invoice pack as provisional evidence pending bank-statement reconciliation.
- Verification: Drive helper upload returned file metadata; Google Sheets/Drive connector access to the workbook links remained blocked because they behaved as Office-mode spreadsheets or inaccessible Drive files.
- Limitations or gaps: 2023/2024 VAT categorisation and 2025 bank-statement audit are waiting on native Sheets/local XLSX access and readable bank-statement extracts.
- Next step: User review of proposed workbook changes, then update the workbook(s) once access is available.

## 2026-05-06 - Nathan Corrected Customer Drive Evidence

- User request: Delete the superseded `vandy_invoice_pack_polished_jul_dec_2025.pdf` and copy the corrected customer-created Drive folder evidence.
- Context read: Nathan source Drive folder, target 2023/2024 and 2025 evidence folder structure, existing repo/Notion pointers.
- Actions taken: Moved the superseded PDF to Drive trash, copied UAB 2024 invoices, UAB 2025 invoices, Vandy UN 2025 invoices, DappRadar August 2025 invoice, Coinbase summaries, and Kraken summary into the existing destination folders.
- Files changed: Nathan individual Drive/tax/source pointers, source and memory logs, and the Drive helper/skill workflow.
- Decisions made: When a customer creates a Drive evidence folder, access that folder and copy its files into RB destinations rather than relying on prior local/WhatsApp copies.
- Verification: Drive helper listings confirmed the copied destinations and that the superseded PDF no longer appears in the target root.
- Limitations or gaps: Workbook categorisation and cash-basis reconciliation still require editable/readable workbook access.
- Next step: Use the corrected copied evidence for the 2023/2024 VAT and 2025 personal-tax audit once workbook access is resolved.

## 2026-05-06 - Spreadsheet And Notion Comment Operating Rules

- User request: Historical/superseded spreadsheet rule: use formula-driven separated Codex tabs named `codex - [sheet name] - [update date]` and never hardcode derived values. The Notion database page rule remains active: use actual page comments for comment updates instead of database fields.
- Context read: repo-local memory/process skills, Notion operations standards, file-upload/spreadsheet guidance, and personal-tax-analysis skill.
- Actions taken: Added the spreadsheet and Notion-comment rules to durable memory, process docs, handoff, import log, and the personal tax analysis skill.
- Files changed: `memory/file-uploads.md`, `processes/file-uploads.md`, `skills/rb-personal-tax-analysis-de/SKILL.md`, `processes/notion-operations.md`, `memory/notion-database-standards.md`, `memory/handoff.md`, `sources/import-log.md`, and memory ledgers.
- Verification: pending `git diff --check`.

## 2026-05-06 - Nathan Workbook VAT And 2025 Audit Updates

- User request: Continue the remaining Nathan VAT and 2025 personal tax analysis steps after the Drive/correspondence process updates.
- Context read: Nathan 2023/2024 VAT workbook, 2025 personal tax workbook, copied Drive evidence, and local spreadsheet/process rules.
- Actions taken: Downloaded both Office-mode `.xlsx` workbooks, added formula-backed Codex tabs, uploaded the revised workbooks back to Drive, and verified the tabs by Drive read-back.
- Files changed: Nathan individual tax/source/Drive pointers, import log, memory ledgers, and the local Drive helper support already added earlier for workbook download/update.
- Decisions made: Keep source tabs untouched; use abbreviated Codex sheet names because Excel limits sheet names to 31 characters.
- Verification: Drive read-back confirmed `codex - VAT rev - 2026-05-06`, `codex - miss inv - 2026-05-06`, `codex - audit - 2026-05-06`, and `codex - miss inv - 2026-05-06`. The 2023/2024 VAT workbook was later superseded by annual Codex tabs.
- Limitations or gaps: Full-year 2025 bank-statement coverage, missing `INV-00013`, 2025 no-invoice revenue rows, expense receipts, Vandy UN bank receipts, investment tie-out, and prepayment amounts still need final evidence.

## 2026-05-06 - Nathan 2023/2024 Annual VAT Revenue Tabs

- User request: Replace the earlier 2023/2024 VAT Codex tabs with one tab per year, keep formula-backed summary figures at the top, put the income breakdown below row 10, exclude January 2024, and treat potential `INV-00013` as EU reverse.
- Context read: Current 2023/2024 Office-mode workbook, existing `Income 2023`, `Income 2024`, and `Summary` tabs, user instructions, and copied UAB evidence pointers.
- Actions taken: Removed the earlier Codex VAT/missing-invoice tabs, added `codex - 2023 - 2026-05-06` and `codex - 2024 - 2026-05-06`, updated summary formulas, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: 2023 included revenue is EUR 86,521.60 EU reverse; 2024 included revenue is EUR 68,436.94, split between EUR 22,865.60 EU reverse and EUR 45,571.34 non-EU; January 2024 EUR 1,855.77 is excluded/uncollectible.
- Verification: Drive read-back confirmed the annual tabs, the January 2024 exclusion, potential `INV-00013` EU reverse treatment, and revision md5 `d509d0cf400d14f87e7c7a1a83b63559`.
- Limitations or gaps: Potential `INV-00013` invoice evidence and final invoice-by-invoice tie-out remain open before filing.

## 2026-05-06 - Nathan 2025 Annual And Discrepancy Tabs

- User request: Follow the same annual-tab format for 2025 and split the audit into one revenue discrepancy tab and one expense discrepancy tab.
- Context read: Current 2025 Office-mode workbook, existing Summary, Revenue Summary, Expenses Summary, Investments Summary, Prepayments, and prior mixed Codex audit tabs.
- Actions taken: Removed the earlier mixed `codex - audit - 2026-05-06` and `codex - miss inv - 2026-05-06` tabs, added `codex - 2025 - 2026-05-06`, `codex - rev disc - 2026-05-06`, and `codex - exp disc - 2026-05-06`, updated Summary formulas, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep revenue discrepancies and expense receipt/non-deductible tracking separate; keep investment, prepayment, full-year bank coverage, and Kraken notes visible on the annual 2025 tab.
- Verification: Drive read-back confirmed the new 2025 tabs, `Summary!B6:B7` formula links, removal of the earlier mixed Codex tabs, and revision md5 `7b44e8da45af1ad90b3dfc6562a3a475`.
- Limitations or gaps: Full-year 2025 bank statements, revenue invoice tie-outs, Vandy UN bank receipts, expense receipts, investment tie-out, and prepayment amounts remain open before final filing.

## 2026-05-06 - Nathan 2025 Investment Breakdown

- User request: Add the missing 2025 investment breakdown, identify purchases/acquisitions and sales, split transfers from purchases, and classify gains by holding period where evidence supports it.
- Context read: Coinbase 2025 transaction-history PDF, Kraken 2025 monthly statements, current 2025 personal tax workbook, and existing Nathan evidence pointers.
- Actions taken: Decoded the Coinbase PDF font mapping, extracted Coinbase/Kraken 2025 investment activity, added `codex - invest - 2026-05-06`, updated the annual investment row, uploaded the workbook to Drive, and verified by read-back.
- Decisions made: Treat Coinbase/Kraken EUR withdrawals as broker-bank transfers, not purchases; treat USDC deposits/receives as transfers from external wallets/brokerages unless original purchase evidence is supplied; exclude missing-basis rows from formula-based short-term income and long-held gain totals until basis is known.
- Verification: Drive read-back confirmed the investment tab and annual row link; latest 2025 workbook md5 is `2494180a7a13f98e88bcf6b34d6a9557`, modified `2026-05-06T13:02:22.269Z`.
- Limitations or gaps: Prior-year Coinbase lots, external wallet/broker USDC lots, and Kraken XRP acquisition cost/date remain needed before final capital-gains vs income treatment.

## 2026-05-06 - Nathan 2025 DappRadar Revenue Correction And Formatting

- User request: Rectify the 2025 revenue tab because DappRadar UAB invoices were provided, determine what was actually unpaid, and format the Codex tabs with widths, wrapped text, and existing heading colors.
- Context read: Current 2025 Office-mode workbook, DappRadar/UAB Drive invoice folder, local extracted PDF evidence, and existing workbook styles.
- Actions taken: Reclassified the four EUR 1,500 source bank rows from generic no-invoice revenue to DappRadar/UAB EU reverse charge, separated the seven DappRadar invoice PDFs in `codex - rev disc - 2026-05-06`, marked four invoices as matched by amount and three as unpaid/unmatched, and formatted all Codex tabs with column widths, wrap-friendly styles, and frozen table headers.
- Decisions made: Treat the DappRadar/UAB invoice pack as provided evidence; keep three unmatched invoices, May-July 2025 service / June-August payment timing, outside cash-basis revenue until bank receipt is located.
- Verification: Uploaded the 2025 workbook to Drive and read it back with matching md5 `dbbe241d1498e517a712bdb2dab29ffc`; workbook zip validation passed.
- Limitations or gaps: Source bank rows still lack DappRadar payment dates/refs, `Revenue Summary!A7:D10` needs separate non-EU evidence verification, and full-year bank coverage remains open.

## 2026-05-06 - Nathan 2025 Vandy UN Invoice Evidence Correction

- User request: Adapt the 2025 workbook because the pending Vandy UN invoices were shared and uploaded in the Vandy UN July-December folder.
- Context read: Current 2025 Office-mode workbook, Vandy UN Drive invoice folder, downloaded July-December invoice PDFs, and existing Codex annual/revenue-discrepancy tabs.
- Actions taken: Replaced `PENDING VANDY UN INVOICES` wording in the Codex annual tab with invoice-provided/payment-reconciliation status, added `codex - invoices - 2026-05-06` as the formula-driven invoice evidence index, added file-level Vandy UN invoice links and formula-pulled net/gross invoice columns to the revenue discrepancy tab, and uploaded the workbook revision to Drive.
- Decisions made: Treat the six Vandy UN PDFs as provided invoice evidence but keep cash-basis revenue tied to source-populated amounts; only July EUR 3,200 is source-populated, while August-December EUR 16,000 net remains excluded until payment/source evidence is located.
- Verification: Drive upload/read-back md5 matched `b16ae3e2eec49f9bc06a19efdd79e068`; workbook zip validation passed.
- Limitations or gaps: Vandy UN payment/source evidence for August-December and final company-to-Nathan categorisation remain open.

## 2026-05-06 - Nathan 2025 Revenue Tab Style And Expense Reference Cleanup

- User request: Preserve the user-adjusted compact/thicker revenue table style for the then-active legacy workbook flow and remove expense references from the revenue tab.
- Context read: Latest Drive revision of the 2025 Office-mode workbook after the user's style edits, current `codex - 2025 - 2026-05-06` formulas, Summary formulas, and Codex tab frozen-pane/width settings.
- Actions taken: Cleared expense references from `codex - 2025 - 2026-05-06`, updated `Summary!B7` to point directly to `Expenses Summary!C11`, preserved existing table widths/heights/frozen panes, uploaded the workbook revision to Drive, and added the style/routing rule to `skills/rb-personal-tax-analysis-de/SKILL.md`.
- Decisions made: Keep revenue tabs revenue-focused; keep expense review in `codex - exp disc - 2026-05-06` and workbook Summary/source tabs, not routed through revenue tabs.
- Verification: Drive upload/read-back md5 matched `1f1a17167ea6d6605db30264204d38a4`; workbook zip validation passed; no `Expenses Summary` or expense text remains in the revenue review tab.
- Limitations or gaps: This legacy workbook style note is superseded for future personal-tax work by the machine-readable template workflow.

## 2026-05-06 - Nathan 2025 Income Breakdown Year Row Cleanup

- User request: Put the year in the income breakdown row and delete the standalone year row.
- Context read: Latest Drive revision of the 2025 Office-mode workbook and current `codex - 2025 - 2026-05-06` income breakdown/header rows.
- Actions taken: Changed row 10 to `INCOME Breakdown - 2025`, deleted the standalone year row, moved income table headers to row 11, moved the frozen pane to row 11, adjusted top revenue summary formulas to the shifted table range, uploaded the workbook revision to Drive, and recorded the legacy layout note later superseded by the machine-readable template workflow.
- Decisions made: Annual revenue sections should use the section title for the year rather than adding a separate year row above headers.
- Verification: Drive upload/read-back md5 matched `8db4f4b801b38eb1cb7e7be694bac333`; workbook zip validation passed.
- Limitations or gaps: This cleanup was applied to the 2025 legacy workbook; future personal-tax work should use the machine-readable template instead.

## 2026-05-06 - Nathan 2025 VAT Rate Percentage Formatting

- User request: Reformat the VAT rate column as percentage because 19% was formatted as Euro.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, `codex - 2025 - 2026-05-06` VAT Rate column, `codex - invoices - 2026-05-06` VAT rate column, and workbook styles.
- Actions taken: Reformatted annual VAT Rate cells `C3:C6` and invoice-evidence VAT rate cells `H5:H17` using percentage number format while preserving existing compact layout, borders, fonts, and formulas.
- Decisions made: VAT/rate columns should be percentage fields; VAT amount columns remain amount/currency fields.
- Verification: Drive upload/read-back md5 matched `5e46f2a60ae01938d5fa3c1f7ef94195`; workbook zip validation passed; target cells use Excel percent number format id `9`.
- Limitations or gaps: No calculation logic changed.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy Review Layout

- User request: Remove the revenue discrepancy tab's breakdown framing because every revenue line needs review.
- Context read: Latest Drive revision of the 2025 Office-mode workbook and current `codex - rev disc - 2026-05-06` section/header rows and formulas.
- Actions taken: Changed the section title to `REVENUE DISCREPANCY REVIEW - 2025`, removed the standalone year row, moved headers to row 16, shifted review lines up one row, adjusted summary formulas/freeze pane, uploaded the workbook revision to Drive, and added the future layout rule to `skills/rb-personal-tax-analysis-de/SKILL.md`.
- Decisions made: Revenue discrepancy tabs should be line-by-line review tables, not breakdown sections.
- Verification: Drive upload/read-back md5 matched `3157c989fa89b7dd02673180f3647397`; workbook zip validation passed.
- Limitations or gaps: No revenue classification logic changed in this pass.

## 2026-05-06 - Nathan 2025 Bank-Derived Expense Rebuild

- User request: Redo the 2025 Codex expenses tab without using the user's Jan-May reference and add a tab for each bank account covering Jan-Dec 2025 with categorised transactions.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, 2025 personal bank statement Drive folder, ABN AMRO statement ZIPs, Revolut 2025 statement PDF, and N26 statement ZIP from the solvency evidence folder.
- Actions taken: Parsed bank statement evidence, rebuilt `codex - exp disc - 2026-05-06` around bank-derived formulas, added `codex - exp rules - 2026-05-06`, `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06`, updated `Summary!B7`, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep each account tab as raw statement rows plus formula-based categorisation, deductible status, tax treatment, evidence action, and review flags; treat transfers between bank/brokerage accounts as transfers rather than expenses.
- Verification: Drive upload/read-back md5 matched `3c6a5debaa06124956fed8c035c51142`; workbook zip validation passed; parsed rows were ABN 250, Revolut 1,383, and N26 86.

## 2026-05-06 - Nathan 2025 Bank Reconciliation Business Expense Reclassification

- User request: Make the bank reconciliation summaries less bulky, enlarge the rows for reviewing open items, and actually categorise business expenses from the bank statements: London/Dubai business-location travel including food/accommodation/travel/taxi, no supermarkets, and sensible electronics/telecom/business subscriptions.
- Context read: Latest 2025 Office-mode workbook from Drive, local ABN/Revolut/N26 statement parsers, existing Codex expense tabs/rules, and personal-tax-analysis spreadsheet rules.
- Actions taken: Rebuilt the expense discrepancy/rules/account tabs with compact summary rows, 42px account transaction rows, compact wrapped column widths, visible rule key/category/status/tax/evidence/review columns, cached formula results, and corrected Revolut GBP rows to use statement EUR conversions where available.
- Decisions made: Count London and Dubai business-location spend as business travel unless the merchant is a supermarket/convenience store; exclude Iceland/Icelandair/Reykjavik unless separately confirmed; count sensible electronics, telecom, software, subscriptions, professional fees, and bank fees as business expenses subject to support.
- Verification: Uploaded the workbook to Drive and downloaded it back; md5 matched `629dd8a72be498e8fab26cc6e667a969`, modified `2026-05-06T15:11:52.312Z`, size `495500`; zip validation passed and cached sample classifications survived read-back.

- Limitations or gaps: N26 October 2025 is still missing; final filing still needs receipts/business-purpose support for claimed rows and review of uncategorised/non-business review flags.
- Limitations or gaps: N26 October 2025 was not present in the provided ZIP. Revolut GBP-statement rows with no EUR amount are flagged for FX/EUR review before amounts are claimed.

## 2026-05-06 - Nathan 2025 USDC Investment Reclassification

- User request: Treat USDC as bank/stablecoin transfers rather than investments, count other currencies as investments split by currency, and use the 2023/2024 analysis for purchase-date context where ETH, DOT, MATIC, and similar assets already existed.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, the 2023/2024 analysis workbook, Coinbase 2025 PDF-derived rows, Kraken 2025 statement-derived rows, and the existing `codex - invest - 2026-05-06` tab.
- Actions taken: Rebuilt `codex - invest - 2026-05-06`, reclassified USDC rows as `Transfer / stablecoin bridge`, added a non-USDC currency summary for DOT, ETH, ARB, MATIC, XRP, and POL, added prior-year purchase evidence rows from the 2023/2024 workbook, updated the annual 2025 investment audit row, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep USDC visible for reconciliation but exclude it from investment purchase, disposal-proceeds, and gain formulas. Use the visible 2023/2024 workbook notes as purchase-date support for DOT/ETH/ARB/MATIC, while keeping cost basis and exact lot split open.
- Verification: Drive upload/read-back md5 matched `8a056c58a52257f4c999298e32d6c37a`; workbook zip validation passed.
- Limitations or gaps: Final gain/tax treatment still needs detailed non-USDC cost-basis lots, especially DOT, ETH, ARB, MATIC, and Kraken XRP. The visible 2023/2024 workbook does not identify XRP purchase details.

## 2026-05-06 - Nathan 2025 DappRadar Full Statement Recheck

- User request: Recheck the bank statements because the DappRadar/UAB payments previously marked missing might be there.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, formula-backed `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06` tabs, plus the parsed ABN/Revolut/N26 source statement rows.
- Actions taken: Searched all 1,719 parsed 2025 statement rows by DappRadar/Deppradar/UAB terms, amount, date window, and the known DappRadar IBAN; found ABN EUR 1,500 receipts on 2025-06-10 and 2025-07-10; updated `codex - invoices - 2026-05-06`, `codex - rev disc - 2026-05-06`, and `codex - 2025 - 2026-05-06` with formula-linked bank-statement matches; uploaded the workbook revision to Drive and verified by read-back.
- Decisions made: Treat the June 10 and July 10 ABN receipts as DappRadar/UAB matches because they use the same Estonian IBAN and EUR 1,500 payment pattern as the named DappRadar receipts. Keep the July 2025 [August] invoice unpaid/unmatched because no matching ABN/Revolut/N26 2025 receipt was found.
- Verification: Drive upload/read-back md5 matched `2ff337b5e57d9605e6eba1dee5168309`; workbook zip validation passed.
- Limitations or gaps: Remaining DappRadar/UAB unpaid/unmatched amount is EUR 1,500; source-matched rows 14:17 still need exact bank receipt date/ref confirmation if the preparer wants a row-level tie-out to the original source workbook entries.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy No-Summary Cleanup

- User request: Remove the summary from the 2025 revenue discrepancy tab and do not wrap the note columns.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, existing `codex - rev disc - 2026-05-06` rows/formulas/styles, and personal-tax-analysis spreadsheet rules.
- Actions taken: Removed the summary/metric block, shifted `REVENUE DISCREPANCY REVIEW - 2025` to row 4, shifted headers to row 5 and review rows to row 6, reduced the frozen pane to row 5, disabled wrapping on status/save-location/action columns, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Revenue discrepancy tabs should remain direct line-by-line review surfaces without a summary block above the table.
- Verification: Drive upload/read-back md5 matched `2b998fd39e580b9feedbbcbc842e5f2a`; workbook zip validation passed; read-back confirmed no wrapped note cells and no summary rows.
- Limitations or gaps: No revenue classification logic changed; open revenue evidence/payment tie-outs remain unchanged.

## 2026-05-06 - Nathan 2025 Investment In/Out Summary Restore

- User request: Restore the investment in/out summary in the 2025 investment tab because the staking income total was missing.
- Context read: Latest Drive workbook revision, `codex - invest - 2026-05-06`, annual `codex - 2025 - 2026-05-06` link, and the German personal tax analysis skill.
- Actions taken: Restored the formula-backed top summary block in `codex - invest - 2026-05-06` for investment out, staking income, net movement excluding transfers, transfer exclusions, and missing-basis metrics; kept annual `B31` linked to investment-out proceeds.
- Files changed: Nathan individual Drive/tax/source pointers, personal tax skill guidance, source/import logs, and memory ledgers.
- Verification: Uploaded the workbook to Drive, downloaded it back, matched md5 `abc2335acaf669d2946c88bc934d792c`, and validated the XLSX archive.
- Limitations or gaps: Final non-USDC gain treatment still needs detailed cost-basis lots.

## 2026-05-06 - Personal Tax Machine-Readable Template Workflow

- User request: Move the work into a new stacked branch, create a proper native Google Sheets personal-tax template, and remove active VUN/Nathan-era rules that clash with it.
- Context read: Current Office-mode personal-tax template, Nathan workbook audit trail, DATEV SKR04 source material, repo personal-tax/file-upload skills, Drive helper scripts, and active memory/process guidance.
- Actions taken: Created `codex/personal-tax-ledger-template`, created `RB German Personal Tax Analysis - Machine-Readable Template v1` as a native Google Sheet in the old template folder, and replaced active separated-Codex-tab guidance with the new raw-export/category-rules/journal/PNL/balance-sheet/checks workflow. After PR review, the active workflow was corrected so the maintained native Sheet is copied through the Google Drive/Sheets connector rather than regenerated from a local XLSX builder.
- Decisions made: Keep 2026-05-06 Nathan Codex workbook tabs as historical audit trail only.
- Verification: Drive metadata confirmed native Sheets and parent folder `1Zn2QvYXmRkf4lKD7grX_Q43ZBTvhweRe`; Sheets helper read-back confirmed frozen row 1, filters, category rules, raw bank formulas, and check formulas.
- Limitations or gaps: SKR04 seed rows are conservative and reviewable before filing; blank templates deliberately flag missing prior-year opening links until prior-year closing balances or explicit provisional plugs are entered.

## 2026-05-07 - Selin 2025 Personal Tax Setup

- User request: Test the German personal-tax template again by setting up Selin (CLV) for 2025, link Drive payslips that were missing in Notion, and add a process rule to notify the triggering person in Slack when analysis is ready for review.
- Context read: Selin individual and employment Notion records, 2025 personal-tax filing page, employment-linked payroll run pages, CLV Drive external folder structure, 2025 payslip folder, maintained native German personal-tax template, and current communications process.
- Actions taken: Copied the maintained native template into Selin's 2025 personal-tax Drive folder, linked January-June 2025 Drive payslips into the corresponding Notion payroll `Payslip` file fields, populated the workbook `Revenue` rows from all twelve 2025 payslips, set the Notion filing to in progress with the Drive folder URL, added a Notion page comment with the setup summary, and added the Slack completion-notification rule to the personal-tax and communications processes.
- Decisions made: Keep net salary formula-driven from payslip gross/tax/social/health source fields; leave expenses, investments, deductibles, credits, and prior-year tie-out as explicit review flags rather than implied claims.
- Verification: Workbook read-back shows EUR 28,800 gross employment income, EUR 3,096.96 wage tax withheld, twelve `Ready` revenue rows, OK journal/revenue checks, and expected fails for prior-year opening, expense review, investment confirmation, deductibles, and tax credits.
- Limitations or gaps: The Google Sheets connector returned `403` on the helper-created workbook while the Drive helper could read/write it; resolve connector access before requiring connector-only workbook edits. Slack send was not performed because no triggering Slack recipient was available in this Codex-triggered test.

## 2026-05-07 - Personal Tax Filing Status Sync Rule

- User request: Add a process rule so personal-tax analysis status changes update the corresponding Notion filing `Status`, document gathering moves to the right field status when the client has shared evidence, and newly created Drive folders are attached to the respective filing entry.
- Context read: German personal-tax skill, handoff/current-state memory, source registers, and the live Personal Tax Filings database fields/options.
- Actions taken: Added the filing-field sync rule to `skills/rb-personal-tax-analysis-de/SKILL.md`, durable handoff/current-state memory, skill runs, source register, and import log.
- Decisions made: Use the live database option spelling exactly: `In progress` while evidence is being uploaded/reviewed/reconciled, and `Attached in Drive` once all currently required evidence for the filing stage is in Drive and linked.
- Verification: Process-only edit; external field names/options were verified before updating the workflow.
- Limitations or gaps: Individual filings still need case-by-case factual review before status fields are changed.

## 2026-05-07 - Personal Tax Filing Task Pair Rule

- User request: If a personal-tax filing record has no attached task, add a process to create an analysis task assigned to Ioana from the annual personal-tax template, create a filing task assigned to Johnpaul that depends on the analysis, attach the correct client project to both, and comment on the filing task with the spreadsheet once analysis is ready.
- Context read: German personal-tax skill, live Personal Tax Filings schema, Tasks schema, `[Annually] Personal Tax Filing` task template, and Notion user records for Ioana Surdu-Bob and Johnpaul Okolie.
- Actions taken: Added the task-pair process to the German personal-tax workflow and mirrored it in handoff/current-state memory, skill runs, source register, and import log.
- Decisions made: Use `Preparation Task` for the analysis task and `Filing Task` for the filing task; set the filing task's `Dependent on` relation to the analysis task; use actual Notion comments for the filing-task handoff note and spreadsheet URL.
- Verification: Notion fetch verified `Preparation Task`, `Filing Task`, `Project`, `Dependent on`, and the template URL before editing process docs.
- Limitations or gaps: This was a process-only update; no live task pair was created in Notion during this step.

## 2026-05-13 - Future Personal Tax Prompt

- User request: Prepare a prompt that gets ideal results for future personal-tax returns, then publish the changes as a PR.
- Context read: Mark 2024 correction history, active German personal-tax skill, process index, and task-PR guidance.
- Actions taken: Added `processes/personal-tax-return-prompt.md` with a fill-in operator prompt covering source intake, fresh template-copy use, formula protection, evidence-backed expense rows, Notion filing/task synchronization, notifications, and read-back verification.
- Files changed: `processes/personal-tax-return-prompt.md`, `processes/index.md`, `skills/rb-personal-tax-analysis-de/SKILL.md`, and memory/source ledgers.
- Decisions made: Keep the prompt generic and reusable; do not encode Mark-only facts except as lessons in workflow form.
- Verification: The prompt reflects the current maintained-template workflow and asks future runs to verify tax-year-specific rules rather than assuming future statutory caps.

## 2026-05-13 - Mark 2024 Personal Tax Analysis Update

- User request: Prepare an updated personal-tax filing for Mark from the supplied Drive folder, excluding lower home costs/non-mobile Telekom and naturalization/non-business invoices, claiming home-office allowance, and adding EUR 15,000 GbR profit on top of EUR 7,000 stated revenue.
- Context read: User-provided Drive folder, V2 Office-mode workbook, receipts and TK certificate PDFs, Notion individual/filing/task context, and German personal-tax/home-office/business-meal source rules.
- Actions taken: Created and verified a V3 Office-mode workbook with revised income, expenses, home-office allowance, health/care insurance, and review notes; uploaded the workbook through the Google Drive connector; added Notion comments to the filing record and linked task; created Mark individual routing files and a minimal WEW linked-individual pointer.
- Files changed: `clients/Individuals/Mark James Frederick Wilshin/`, `clients/Companies/WEW/`, `memory/skill-runs.md`, `memory/open-questions.md`, `sources/source-register.md`, and `sources/import-log.md`.
- Decisions made: Keep raw receipt evidence in Drive; store only source pointers, analysis numbers, and blockers in git. The EUR 180 Catalanglish language-learning line was initially marked provisional, then confirmed in the same session as business language learning for the translation business.
- Verification: Local XLSX zip/import/read-back checks passed; key summary values are income EUR 22,000, expenses EUR 3,219.24, home-office EUR 1,260, gross income after expenses EUR 17,520.76, and health/care insurance EUR 6,232.81.
- Limitations or gaps: The uploaded V3 workbook exists in Drive but is not yet in the supplied Mark folder because the helper gcloud token lacks Drive scope and the connector upload path did not expose parent-folder placement.

## 2026-05-13 - Mark Language-Learning Expense Confirmation

- User request: Clarified that language learning is a business expense for Mark because the business is translation.
- Context read: Existing Mark V3 workbook and Mark individual routing notes from the same-day personal-tax update.
- Actions taken: Rebuilt and uploaded a corrected V3 Office-mode workbook marking the EUR 180 Catalanglish language-learning item as included business language learning; added Notion follow-up comments to the filing record and task; removed the language-learning business-purpose open question from local memory.
- Files changed: Mark individual files plus memory/source ledgers.
- Decisions made: Keep the expense amount unchanged at EUR 180; update only classification/review notes.
- Verification: Local XLSX file/zip/import read-back passed and still shows total business expenses EUR 3,219.24.
- Limitations or gaps: Corrected workbook upload still landed under connector parent `0APO_eChhDoQPUk9PVA`, not the supplied Mark folder.

## 2026-05-13 - Mark Template-Basis Correction

- User request: Asked why the current rule to create from the maintained machine-readable template was not followed.
- Context read: Active German personal-tax skill/template rules, Mark Office-mode V3 outputs, maintained RB German Personal Tax Analysis template, Drive helper auth state, and Google Drive/Notion connector capabilities.
- Actions taken: Acknowledged the earlier mistake, created a corrected machine-readable native Google Sheets artifact from the maintained template export, added Notion correction comments on the filing record and linked task, and marked the earlier Office-mode V3 workbooks as superseded in Mark's repo files.
- Files changed: Mark individual files plus global memory/source ledgers.
- Decisions made: Treat the earlier Office-mode V3 workbooks as historical/superseded; use `https://docs.google.com/spreadsheets/d/1vg2gcux923SDZi1RDKlowSf-dguLrSqMVv7HTCCScYk/edit` as the current review artifact.
- Verification: Local workbook import/read-back confirmed the machine-readable workbook figures: revenue EUR 22,000, business expenses incl. home-office EUR 4,479.24, business/freelance net PNL EUR 17,520.76, and health/care EUR 6,232.81. The initial income-after-deductions read-back was later superseded by the formula-tab repair entry. Google Drive metadata confirmed the uploaded artifact is a native Google Sheet with 28 tabs.
- Limitations or gaps: A true Drive-native template copy into Mark's supplied folder remains blocked because gcloud account auth lacks Drive scope and non-interactive reauthentication failed; the connector import path created the native Sheet but did not expose folder placement.

## 2026-05-13 - Mark Calculation-Tab Formula Repair

- User request: Reported that Mark's calculation tabs appeared to use hardcoded values instead of the template formulas and instructed that client-specific edits should stay out of formula cells.
- Context read: Google Sheets edit/formula workflow, RB German personal-tax skill, Mark source/client files, and the current Mark machine-readable workbook.
- Actions taken: Restored formula-driven calculation tabs and formula columns in the current Mark workbook, confined Mark-specific values to source/input cells, corrected the Mark workbook's `Tax Analysis` other-deductions formula so the business home-office route is not double-counted, applied the same deductible-group formula repair to the maintained template, added an explicit formula-tab guardrail to the German personal-tax skill, and updated Mark/repo records.
- Files changed: Mark individual files, German personal-tax skill, and global memory/source ledgers.
- Decisions made: Treat the earlier hardcoded calculation-tab figures as superseded. Current formula-driven figures are revenue EUR 22,000, business expenses incl. home-office EUR 4,479.24, net business PNL EUR 17,520.76, other personal deductions EUR 6,268.81, and income after deductions before tax-rate calculation EUR 11,251.95.
- Verification: Sheets range read-back confirmed formulas are present on the key Mark calculation outputs, maintained-template read-back confirmed the `Tax Analysis!B12` deductible-group formula, `git diff --check` passed, and `npm run typecheck` passed.

## 2026-05-13 - Mark Fresh Template Copy Invoice Rebuild

- User request: Instructed Codex to copy the template and fill it in again, only on the tabs actually populated, and questioned why the prior pass used Mark's doc rather than the actual invoices.
- Context read: Supplied Mark Drive folder, actual receipt PDFs where OCR was available, maintained native German personal-tax template, previous corrected workbook, and Drive helper auth state.
- Actions taken: Reauthenticated the Drive helper with Drive scope, created a true Drive-native copy of the maintained template in Mark's supplied folder, populated only `Setup`, `Revenue`, `Expenses`, and `Deductibles`, and rebuilt the inputs from actual invoice/receipt PDFs plus the explicit EUR 15,000 GbR-profit instruction.
- Decisions made: Supersede the intermediate corrected workbook `https://docs.google.com/spreadsheets/d/1vg2gcux923SDZi1RDKlowSf-dguLrSqMVv7HTCCScYk/edit`; the current workbook is `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit`. Exclude home costs/non-mobile Telekom, naturalization/non-business invoices, the second Catalanglish ticket, the missing M1-3 iCloud invoice, and unclaimed receipt rows.
- Verification: Sheets read-back confirmed formula-driven summary outputs: revenue EUR 22,000, business expenses incl. home-office EUR 4,466.18, net business PNL EUR 17,533.82, health/care EUR 6,232.81, other personal deductions EUR 6,268.81, and income after deductions EUR 11,265.01. The Mark-specific review checks noted at that point were later resolved on 2026-05-13.

## 2026-05-13 - Mark Expense Receipt Evidence Correction

- User request: Reported that the expense rows still were not backed by the individual receipts.
- Context read: Current fresh template-copy workbook, receipts folder `https://drive.google.com/drive/folders/1uAhkg_wsKd_GA1ABy_s5m5J0J81eF7sN`, existing Mark source/register files, and Google Sheets edit workflow.
- Actions taken: Rewrote only non-formula `Expenses` input cells into receipt-level rows with exact receipt-file URLs, split iCloud, Telekom mobile, EE mobile, and business meals into individual invoice/receipt rows, rendered scanned meal receipts where Drive OCR was empty, and added Notion correction comments to the filing record and linked task.
- Decisions made: Keep formulas untouched in `Expenses` and calculation tabs. Correct the business-meal claim from the prior aggregate to EUR 506.59, representing 70 percent of EUR 723.70 receipt-backed gross/tip-supported meal amounts.
- Verification: Sheets read-back found no receipts-folder URL remaining in `Expenses!A1:Q80`, confirmed formula cells remain present in key `Expenses` formula columns and `Tax Analysis!B3:B14`, and confirmed current formula-driven values: revenue EUR 22,000, business expenses incl. home-office EUR 4,479.95, net business PNL EUR 17,520.05, other personal deductions EUR 6,268.81, and income after deductions EUR 11,251.24.

## 2026-05-13 - Mark Final Open Questions Resolved

- User request: Resolved the Mark/WEW open questions: confirmed the EUR 15,000 GbR profit support, approved Telekom/EE mobile business-use treatment, instructed trust in the client for missing M1-3 iCloud and business-meal support, and asked whether the MacBook can legally be fully deducted.
- Context read: Mark individual open questions and tax-return notes, global memory questions/tasks, and BMF EStH 2024 computer-hardware/software useful-life guidance.
- Actions taken: Recorded the resolved decisions in Mark's individual files, global memory, source registers, and import log; moved the Mark finalisation task to done; added Notion comments to the filing record and filing task for filer visibility.
- Decisions made: Retain the full 2024 MacBook deduction route as a provisional tax-law analysis point because BMF guidance supports one-year useful-life treatment for notebook/computer hardware and does not require monthly acquisition-year pro-rating.
- Verification: Notion comments were created on the filing record and filing task. Repo records now show no active Mark/WEW personal-tax open questions from the 2026-05-13 list.

## 2026-05-11 - Communications-First Inbound Triage Review

- User request: Adjust the inbound triage workflow to remove slow global indexing and broad channel reads, prioritizing Gmail inbox and WhatsApp topic extraction instead.
- Context read: `AGENTS.md`, `skills/index.md`, inbound triage process/skill, process maintenance skill, memory capture skill, memory ledgers, handoff, source logs, and people-role defaults.
- Actions taken: Reworked inbound triage to capture communications first, split invoices/expenses before other work, query Business Partners/contracts/contract-linked Invoicing for contractor/business-partner invoices, check existing paid/completed records before creating Expenses, group remaining items by company/topic, require correspondence translations to feed task content, and use one assignee-tagged Slack closeout per triage when requested.
- Files changed: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, process/skill indexes, source logs, and memory files.
- Decisions made: Slack, signatures, files, Drive, Notion, and status systems are supporting systems for this workflow, not inbound channels to be queried just because access exists.
- Verification: `git diff --check` passed.
- Limitations or gaps: Next live run must verify Business Partners, Contract, and Invoicing field names plus Slack user mappings for assignee tags.
- Next step: Validate the workflow on the next supervised live triage.

## 2026-05-11 - RBL Invoice Validation And RB Commitment Task Rule

- User request: Address diff comments that Workhub validation is not an edge case, and add a rule that actionable RB-team statements should create tasks.
- Context read: RBL invoice files, inbound triage process/skill, communications process, source registers, import log, and existing memory ledgers.
- Actions taken: Moved Workhub invoice validation into `clients/Companies/RBL/invoices-payments-expenses.md`, deleted `clients/Companies/RBL/edge-cases.md`, renamed the general triage hook to client validation rules, and added task triggers for RB-side commitments such as “we will do/look/check/tell/update/send” or “I will”.
- Files changed: RBL client files, inbound triage process/skill, communications process, source logs, and memory files.
- Decisions made: Workhub validation is normal invoice validation inside the RBL finance domain, not a separate edge-case file.
- Verification: `git diff --check` passed.
- Limitations or gaps: User review still needed before running the senior-review/commit/push sequence.
- Next step: Ask the user to review.

## 2026-05-13 - RB Calling Bot Live Runtime Sync

- User request: Check n8n and ElevenLabs, update the repo with all new manual calling-bot changes, and create a PR for review.
- Context read: Live n8n workflow readbacks, live ElevenLabs agent/tool readbacks, existing calling-bot automation helpers, setup docs, and RB task PR workflow.
- Actions taken: Added `automation/sync-rb-calls-live-state.mjs`, `npm run calls:sync-live-state`, source-controlled readbacks under `automation/live-readbacks/`, the RB authority call setup skill, calling-bot setup guide, implementation map, test plan, and memory/source-log updates.
- Decisions made: Live readbacks are configuration evidence only; do not store API keys, MCP tokens, phone numbers, recordings, transcripts, or client call payloads in git.
- Verification: `npm run calls:sync-live-state`, `npm run calls:check-automation`, `npm run typecheck`, and `git diff --check` passed before commit. A targeted readback scan found only policy text, header/variable names, and `shareable_token: null`.
- Limitations or gaps: `RB Calls ElevenLabs Events` has active version `29dc070e-2951-4f7f-931b-6b24ea793fc5` and draft version `48d12009-db89-4c75-8df1-6e48564f12ed`; review before publishing or deploying over it.

## 2026-05-13 - RB Calling Bot API Language Override

- User request: Fix German calls starting in English, specifically by changing the ElevenLabs outbound API call to use the right language.
- Context read: Live n8n/ElevenLabs readbacks, ElevenLabs override settings, official ElevenLabs override documentation, and the current n8n voice payload source.
- Actions taken: Updated `RB Calls Voice Execution` so the outbound call payload sends `conversation_initiation_client_data.conversation_config_override.agent.language` as `de` for German contacts and `en` otherwise, while retaining prompt variables `language` and `language_code`. Updated the ElevenLabs agent to keep the user's default English opener and to set the German language-preset opener to a German equivalent.
- Decisions made: Prompt-only `{{language}}` is insufficient for call language selection; the n8n outbound API payload must set the ElevenLabs language override.
- Verification: n8n workflow `3xJh7hNK0Zl9T4zS` was validated, updated, and published at active version `360489d3-02da-4a84-bfbd-0a0d168054e9`; ElevenLabs `RB Call Bot` verified at version `agtvrsn_2001krh88kp2f49sq04f81qemvb3`; live readbacks confirm the API override payload and German preset first message.
- Limitations or gaps: A real German test call is still needed to verify ElevenLabs selects the `de` preset and speaks German from the opening.

## 2026-05-13 - RB Calling Bot Language-Specific Identifier Pronunciation

- User request: Fix German calls saying numbers in English because English prompt examples were leaking into non-English calls, or find a translated system-prompt approach.
- Context read: Live ElevenLabs prompt readback, slow-identifier patch helper, language-opening patch helpers, calling-bot implementation map, setup guide, and live-state readbacks.
- Actions taken: Updated the ElevenLabs prompt patch so `Pronunciation And Spelling` and `Identifier Pronunciation - Prompt Controlled` require spoken digits, letters, abbreviations, and identifiers to match the current call language. German calls must use German digit words and German letter names, must not use English digit words or NATO spelling words unless requested, and use `Ich sage das langsam` before important identifiers. Removed the stale public-disclosure example that still used `Delta ... Echo`. Mirrored the German-number guard into language-control patch helpers so future opening/stability patches do not remove it.
- Decisions made: Keep one canonical prompt with language-specific pronunciation rules rather than separate translated full system prompts, because separate full prompts would be harder to keep aligned across workflow, live-help, lookup, and disclosure-boundary changes.
- Verification: ElevenLabs `RB Call Bot` was updated and read back at version `agtvrsn_9801krh941ypfwt9me281gafr9ws`; readback verified German digit words, no default NATO spelling instruction, no stale `Delta ... Echo` example, slow identifier rules, and the German language-preset opener.
- Limitations or gaps: A real German test call is still needed to confirm TTS delivery follows the prompt during an authority-style conversation.

## 2026-05-13 - RB Calling Bot ElevenLabs Automation Boundary

- User request: Keep only actually reusable helpers under `automation/elevenlabs`; move one-off patch scripts into a private folder and remember that boundary.
- Context read: Current automation source tree, npm helper registry, setup guide, automation README, and calling-bot memory.
- Actions taken: Copied the existing one-off `patch-agent-*` scripts into ignored `.codex-local/automation/elevenlabs/rb-calls/`, removed those patchers from source-controlled `automation/elevenlabs/rb-calls/`, removed shared npm patch commands, and updated docs/memory to reserve source-controlled ElevenLabs automation for reusable read-only diagnostics/utilities.
- Decisions made: One-off ElevenLabs live mutators, prompt patchers, and emergency migration scripts are private operational scratch files. Commit only reusable helpers, documentation, and non-secret live readbacks.
- Verification: `npm run calls:check-automation`, `npm run typecheck`, and `git diff --check` passed after cleanup. `git ls-files .codex-local automation/elevenlabs/rb-calls package.json` confirmed `.codex-local` private patchers are not tracked and source-controlled `automation/elevenlabs/rb-calls/` contains only inspectors.
- Limitations or gaps: Future reusable ElevenLabs deploy/edit tooling may be added to source control only if it is generic and not a one-off patch for the current live agent state.

## 2026-05-13 - RB Calling Bot Abbreviation And Timing Pronunciation

- User request: Use NATO or the language-equivalent spelling alphabet when the authority is confused by letters; remove literal `pause` wording and ellipses from identifier delivery; use commas and periods for timing; use hyphens, not commas, for abbreviations; make abbreviation handling work in all languages, with English as important as German.
- Context read: Private ignored ElevenLabs prompt patcher, live ElevenLabs readbacks, setup guide, implementation map, and memory files.
- Actions taken: Updated the live ElevenLabs prompt so abbreviations are hyphenated letter runs in every language (`V-A-T`, `P-O-A`, `U-B-O`, `R-B-O`, `E-O-R-I`, `P-P-S-N`, `U-T-R`, `T-A-I-N`, `R-O-S`, `H-M-R-C`, `C-R-O`, `I-D`, `R-B`) and never pronounced as words. Added confusion-triggered spelling alphabet fallback: NATO for English, German Buchstabiertafel for German, closest recognized spelling alphabet for other call languages. Replaced identifier examples with comma-separated short numeric groups and periods for longer breaks, removing literal `pause` words and ellipses from the prompt.
- Decisions made: Keep n8n sending exact raw identifiers; pronunciation and delivery remain prompt-controlled in ElevenLabs. Private prompt patchers remain under ignored `.codex-local/automation/elevenlabs/`.
- Verification: ElevenLabs `RB Call Bot` was updated and read back at version `agtvrsn_0701krha08p6ewwv0fygbnjv0k6p`; readback showed zero ellipses and zero `pause` words in the prompt, confirmed the all-language abbreviation rule, confirmed hyphenated abbreviation examples, and confirmed NATO/Buchstabiertafel fallback.
- Limitations or gaps: A real German and English test call is still needed to confirm TTS timing and spelling behavior in actual audio.

## 2026-05-13 - CBMAX Client Context Load

- User request: Load CBMAX client context the same way other clients were loaded.
- Context read: `AGENTS.md`, storage/current-state/handoff memory, skill index, `rb-source-research`, `rb-client-file`, `rb-memory-capture`, Notion research skill, Gmail skill, existing VUN/CLV/RBL client folders, Notion Companies schema, CBMAX company/project/filing/contract/employment/correspondence/task records, Drive folder/search results, and Gmail CBMAX search results.
- Actions taken: Created `clients/Companies/CBMAX/` using the exact Notion `Reference`, added company history, linked individuals, tax/VAT, contracts, payroll/accounting, communications, invoices/payments, project, Drive, Notion backup, source register, backup locations, open questions, and no-op client process/skill placeholder files.
- Decisions made: Treat Simon as Semen based on the user's clarification; keep personal identifiers out of the company folder until individual folders are created; treat old `clients/cbmax/` Notion backup wording as superseded by the reference-based folder.
- Verification: Notion, Drive, and Gmail reads succeeded; Notion SQL query tool was unavailable, so relation-filtered exports remain pending; `git diff --check` passed before the CBMAX context commit.
- Limitations or gaps: No Notion writes or Slack closeout were sent; outbound Slack closeout would need user approval. Full invoice/expense/task backfill still needs direct relation-filtered export or targeted fetches.

## 2026-05-13 - CBMAX WhatsApp Tax Residence Refresh And Correction

- User request: Load the CBMAX WhatsApp chat and read the latest decisions, specifically keeping tax residence up to date; then corrected that the 2026-03-30 Irish-VAT/no-German-VAT guidance was not yet accepted retroactively.
- Context read: `rb-whatsapp-comms`, `rb-client-file`, `rb-memory-capture`, CBMAX client files, WhatsApp contact search for Claudio, and targeted WhatsApp message searches in `Brivio, Claudio | Richmond Blackwood`.
- Actions taken: Recorded the reviewed WhatsApp chat pointer, updated CBMAX tax/VAT files so the 2025 treatment stays in limbo pending ROS retroactive acceptance, and moved the older Germany/Ireland wording into Notion cleanup/review rather than the live answer.
- Decisions made: Keep CBMAX 2025 tax/VAT in limbo until ROS confirms the Irish VAT backdate from January 2025; Irish VAT `4388950KH` is issued, but the 2026-03-30 Irish-VAT/no-German-VAT guidance is pending, not settled.
- Verification: WhatsApp bridge was listening on `127.0.0.1:8080`; WhatsApp contact/message MCP reads succeeded after using targeted searches. `list_chats` still returned the known MCP response-type error, so direct chat search was avoided.
- Limitations or gaps: ROS final backdate/filing status is still unverified; older Notion tax-history wording still needs cleanup; no WhatsApp messages were sent.

## 2026-05-13 - Claudio Brivio Individual Context Load

- User request: After committing CBMAX context, create a separate commit for Claudio's personal-tax individual context, same as the other individual clients.
- Context read: `AGENTS.md`, `skills/index.md`, `rb-personal-tax-analysis-de`, Notion individual/employment/filing/task records, Drive 2024 personal-tax folder and tracker/notes, WhatsApp personal-tax decisions in `Brivio, Claudio | Richmond Blackwood`, Gmail searches, CBMAX linked-individuals, client folder standards, and durable memory ledgers.
- Actions taken: Created `clients/Individuals/Claudio Brivio/` using the legal name from Notion, routed personal-tax/private facts into individual files, wired CBMAX `linked-individuals.md` back to the new folder, and recorded source/open-question/memory pointers.
- Decisions made: Treat the existing 2024 evidence package as present but not filing-ready; keep Notion/Drive/task sync questions open rather than creating new tasks or changing live filing fields during a context-only load.
- Verification: Notion comments for the individual and filing records returned no comment threads; Drive folder listings and file fetches succeeded; Gmail search found no dedicated personal-tax email thread.
- Limitations or gaps: No Notion fields, Drive files, or outbound communications were changed. The 2024 filing still needs payroll, health-insurance, Section 138 AO, Joblift travel, and workbook-template review.

## 2026-05-13 - CBMAX PR Review Corrections

- User request: Apply review clarifications for CBMAX fee billing, Claudio individual-folder routing, and the canonical Drive folder.
- Context read: CBMAX company README, accounting/payroll, history, Drive locations, open questions, memory, source logs, and Claudio individual routing files.
- Actions taken: Clarified that EUR 950 is the discounted monthly RB fee because CBMAX pays in six-month H1/H2 bulk periods, with H1 already paid and recorded in Richmond Blackwood invoices; marked the CBMAX Drive folder as canonical; removed resolved Claudio individual-folder questions from company open questions; preserved only company-side pointers to Claudio's individual folder.
- Decisions made: Keep Claudio personal-tax/private detail only under `clients/Individuals/Claudio Brivio/` and avoid duplicating it in CBMAX company files.
- Verification: `git diff --check` passed after review corrections.
- Limitations or gaps: Exact Richmond Blackwood invoice IDs for H1/H2 billing still need invoice-record backfill.

## 2026-05-13 - CBMAX Drive Folder Review Follow-up

- User request: Confirm two remaining CBMAX Drive review points: whether `05. CBMAX Forgemate Ventures Limited (CBMAX)` supersedes the older 2026-05-04 pending question, and whether sibling folders should be linked or organized under the canonical folder.
- Context read: CBMAX Drive locations, open questions, backup locations, source registers, and durable memory.
- Actions taken: Marked the canonical Drive folder as superseding the older pending Drive-folder question, kept sibling folders linked from the CBMAX client file, and recorded that they should be organized under the canonical folder when Drive cleanup is in scope.
- Decisions made: Do not treat `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, or `CBMAX-payslips` as competing roots; treat them as CBMAX-related folders attached to the canonical folder decision.
- Verification: Repo-only edit; `git diff --check` passed.
- Limitations or gaps: No live Drive move/organization was performed during this repo update.

## 2026-05-13 - CBMAX Client Notes Review Cleanup

- User request: Resolve the CBMAX Client Notes & Updates backup question and clarify why the Slack closeout rule appeared in CBMAX-specific notes.
- Context read: CBMAX Notion backup files, backup locations, open questions, source logs, general client backup process, `rb-client-file`, and the existing `Codex provisional import - CBMAX` Client Notes & Updates page.
- Actions taken: Removed the CBMAX-specific open question about backing up the repo summary to Client Notes & Updates, recorded that no new/update page is needed for the 2026-05-13 repo summary, read back the existing internal Client Notes entry, and moved the Client Notes & Updates usage guidance into the general backup process/skill.
- Decisions made: Treat Client Notes & Updates as a client-facing context/update table, not a generic Codex repo-summary backup; keep the Slack closeout limitation as a general client-backfill rule rather than CBMAX-specific context.
- Verification: Notion fetch read the existing internal Client Notes page; `git diff --check` passed.
- Limitations or gaps: No live Notion Client Notes & Updates page was changed during this cleanup.

## 2026-05-19 - RB Calls Review PoA Node Fix

- User request: Fix n8n error `Problem in node 'If (PoA Required AND Missing) OR (PoA not required)': Referenced node doesn't exist`.
- Context read: Live n8n `RB Calls Review`, `RB Calls Slack Replies`, source-controlled RB calls workflows, implementation map, and calling-bot open questions.
- Actions taken: Patched and published the live n8n `RB Calls Review` workflow through n8n MCP. The two PoA gate expressions now reference `Loop Over Calls`, choose `Company PoA` for company-subject calls and `Individual PoA` for individual-subject calls, and treat one relevant file as sufficient. The related PoA Slack messages were updated to avoid the stale node reference and describe the subject-specific PoA field.
- Decisions made: Keep this as a live-workflow patch helper under ignored `.codex-local/automation/n8n/` because this older review workflow is not one of the source-controlled reusable n8n workflows.
- Verification: n8n MCP validation passed; the patched workflow was published; live readback confirmed no `Loop Over Not Started Calls` reference remains in draft or active version.
- Limitations or gaps: The active `RB Calls Slack Replies` PoA file-upload branch still needs a synthetic file-upload test before production reliance.

## 2026-05-19 - RB Calls Voice Blocked Context Limit Fix

- User request: Fix n8n `RB Calls Voice Execution` error in `Mark Blocked`: Notion rejected `Context Pack` because one rich-text item exceeded 2000 characters.
- Context read: Source and live n8n `RB Calls Voice Execution` workflow, including `Mark Blocked`, `Limit Startup Context`, and Notion update payloads.
- Actions taken: Updated `Mark Blocked` so `Context Pack` is written with a 1900-character cap, deployed and published the workflow through n8n MCP, and refreshed live readback snapshots.
- Decisions made: Preserve the full startup context for ElevenLabs; only cap the Notion blocked-call audit field to stay inside Notion rich-text limits.
- Verification: `npm run calls:check-automation` passed; n8n MCP validation passed; live workflow active version is `ad82d55c-9f6e-4127-97d2-2162d079af93`; readback shows `String($json.context_pack_text || "").slice(0, 1900)` in `Mark Blocked`.
- Limitations or gaps: Old failed n8n execution views still show the earlier Notion validation error.

## 2026-05-19 - RB Calls Review Approval Gate Fix

- User request: Correct that PoA validation should happen before a call is approved for review, not later in voice execution.
- Context read: Live n8n `RB Calls Review` and `RB Calls Slack Replies` workflows, existing PoA gate patch, and implementation map.
- Actions taken: Patched and published `RB Calls Review` so the `Reviewing` + `Approved` path re-fetches Individual, Company, and Contact, then validates Individual/Company relation and subject-specific PoA before setting `Reviewed`. If validation fails, it resets `Approved` to false, sets `Rejected`, and leaves owner notification to the existing rejected-call branch. Patched and published `RB Calls Slack Replies` so the Slack approve button sets `Approved` true but keeps `Call Status` as `Reviewing`.
- Decisions made: Keep voice workflow PoA checks as a final safety net, but make review approval the primary gate.
- Verification: Private n8n MCP patch helper passed `node --check`; n8n MCP validation and publish succeeded for both workflows; live readback confirmed `RB Calls Review` approval now routes to `[Reviewing Approved] Get Individual` and Slack approve status is `Reviewing`.
- Limitations or gaps: The Slack PoA file-upload branch still needs a synthetic upload test.

## 2026-05-13 - AGL And Byron Context Import

- User request: Load AGL context the same way as the other clients, route Byron's personal tax, record weekly Syntentia invoicing, and start from fresh `origin/main` after the Claudio branch merge.
- Context read: Notion company/project/employment/contracts/tax filings/personal-tax records, Google Drive AGL folders, Gmail Syntentia/ELSTER/SteuerGo threads, repo client templates, inbound triage process/skill, and memory/source logs.
- Actions taken: Created `clients/Companies/AGL/` and `clients/Individuals/Byron Jarvis Frasier/`, routed company facts and Byron personal-tax facts separately, captured the active Syntentia weekly service/expense invoicing format, and added a general recurring outbound invoicing rule plus AGL client hook to inbound triage.
- Decisions made: Treat AGL's Irish tax-residence/German PE/80-20 profit attribution as the current user-instructed operating position while marking Notion tax residence for review; record Ioana as the only director and Byron as UBO/board observer; keep Byron's US apartment, Roth/IRA, and brokerage context in the individual folder.
- Verification: Connector reads completed for Notion, Drive, and Gmail; no live Notion/Drive/Gmail records were modified during the import.
- Limitations or gaps: Needs user review, Notion reconciliation for stale company fields, Finanzamt feedback, next Dublin board meeting confirmation, and active Byron personal-tax workbook setup.

## 2026-05-13 - AGL WhatsApp Context Export

- User request: Export WhatsApp context for AGL as well.
- Context read: Repo WhatsApp skill and targeted WhatsApp MCP searches for Byron, AGL, Syntentia, tax, holidays, expenses, Dublin, remote, salary, and bond context in `Frasier, Byron | Richmond Blackwood`.
- Actions taken: Added the WhatsApp chat pointer to AGL communications/source files; added Syntentia day-count, delayed-expense, monthly holiday-check, Week 16 correction, Week 18/19 delayed-expense, AGL bond, 2026-02-24 Dublin/remote, and Byron personal-tax/payroll evidence pointers to the relevant AGL and Byron files.
- Decisions made: Store only source pointers and business-relevant summaries; do not copy passwords, raw transcripts, or media into git.
- Verification: Targeted WhatsApp MCP reads succeeded for the RB group chat. A second Byron contact lookup returned the known response-type error, but the relevant named RB group chat was resolved through `search_contacts` and `get_contact_chats`.
- Limitations or gaps: Board-meeting attendance/minutes still need Drive/source verification; payroll and personal-tax evidence still need workbook/source-document review.

## 2026-05-13 - WhatsApp Chat ID Export Rule

- User request: Make sure client exports/backfills that use WhatsApp also store the client chat ID, because future approved sends or communication reads often need that route.
- Context read: AGENTS, client backup process, communications process, source/client/WhatsApp skills, company and individual communication templates, client README, source register, and durable memory.
- Actions taken: Added the rule to file resolved WhatsApp contact/group JIDs in the owning company or individual `communications.md` and `source-register.md` during client exports/backfills when the route is clear.
- Decisions made: Treat saved WhatsApp IDs as route/source pointers only. They help future approved communication find the right route, but do not authorize monitoring, historical backfill, media downloads, or outbound messages.
- Verification: Repo-only process/template update; no live WhatsApp read or send was needed.
- Limitations or gaps: Ambiguous WhatsApp search results still require operator choice before filing.

## 2026-05-13 - AGL Review Follow-up And Notion Updates

- User request: Apply review decisions on AGL tax residence, open Finanzamt/IE filing items, Syntentia sender identity, the stale payroll-only tax task, and the monthly Byron vacation/off-days check.
- Context read: AGL repo files, Notion company record/schema, AGL project, Tasks schema, old AGL tax-registration task, PE task, and existing AGL/Syntentia task search results.
- Actions taken: Updated live Notion company `Tax Residence` from Germany to Ireland, added a company comment explaining Ireland is primary while German PE/filings remain active, archived the stale payroll-only tax-registration task with a supersession comment, and created monthly Notion task `https://www.notion.so/35fe41301314814096b2cdc5beb780fa` assigned to Simoneta with first due date 2026-05-25.
- Decisions made: Keep Finanzamt feedback and IE 2024 corporation-tax timing open because user confirmed there is no feedback yet. Future Syntentia sends should use `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- Verification: Notion read-back confirmed `Tax Residence` = Ireland, old task `Status` = Archived, and the new monthly task fields.
- Limitations or gaps: Board-meeting minutes/attendance evidence still needs review, and Finanzamt feedback is still pending.
## 2026-05-13 - Claudio 2024 German Personal Tax Analysis

- User request: Prepare Claudio Brivio's 2024 German personal-tax analysis using the repo-local German personal-tax workflow, the user-provided filing folder, and a fresh native copy of the maintained template.
- Context read: `rb-personal-tax-analysis-de`, Claudio individual files, Notion individual/filing/employment/task records, Drive filing folder/package/tracker/evidence files, maintained template metadata, and old workbook pointer.
- Actions taken: Copied the maintained native template into `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe`, populated only source/input tabs in workbook `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit`, created linked Notion preparation and filing tasks, updated the filing row, added Notion comments, and refreshed Claudio repo/memory pointers.
- Decisions made: Treat `1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe` as the canonical current filing folder and the old `.xlsx` workbook as superseded source/history. Keep the filing in progress because evidence and operator-review flags remain.
- Verification: Drive copy returned a native Google Sheets file in the target folder; workbook read-back confirmed summary figures and exact evidence URLs; Notion read-back confirmed task links/dependency/comments and filing `Document gathering status = In progress`.
- Limitations or gaps: Requested `processes/personal-tax-return-prompt.md` was not present in this worktree. Workbook checks still show 9 failed checks and 34 open missing-info items before filing.

## 2026-05-14 - Claudio 2024 Operator Review Applied

- User request: Apply approved healthcare and deduction/exclusion decisions, explain N26 location, and include Section 138 AO handling for CBMAX and Job Guardian.
- Context read: Claudio individual repo files, live workbook revenue/deductibles/sources tabs, Hallesche Drive folder, home-office/phone evidence pointers, and Notion filing/preparation/filing tasks.
- Actions taken: Updated the live workbook source/input tabs only, claimed approved health/care, home-office, Pixel Buds, and mobile-phone rows, excluded CBMAX February payroll, commute, Telekom internet, and Hallesche non-basic rows, corrected the Hallesche certificate URL, added Notion comments, and refreshed Claudio repo/memory/source pointers.
- Decisions made: CBMAX February is excluded rather than changed retroactively; N26 remains in workbook `Sources`, not `Investment Lots`, until Anlage KAP/KAP-AUS classification is complete; Section 138 AO notifications should be included for CBMAX and Job Guardian.
- Verification: Workbook read-back confirmed gross employment income EUR 31,666.66, employment work expenses EUR 1,456.86, health/care EUR 5,470.32, other personal deductions EUR 5,506.32, known withholding EUR 4,326.21, income after deductions before tax-rate calculation EUR 24,703.48, 8 failed checks, and 27 open missing-info items. Notion comments succeeded on the filing, preparation task, and filing task.
- Limitations or gaps: N26 classification, CBMAX 2024 Lohnsteuerbescheinigung, Section 138 AO late/proactive wording and foreign-company risk review, and optional Freenet invoice extraction remain before filing.

## 2026-05-14 - Personal Tax Filing Task Unblock Slack Rule

- User request: Add the process step to share in `#rb-client-updates` that Claudio's filing task is unblocked, tagging/linking the filing task.
- Context read: Personal-tax workflow skill, communications process, Slack outgoing-message skill, durable handoff/current-state memory, and Claudio filing task/workbook links.
- Actions taken: Added a rule that when analysis or operator review unblocks a personal-tax `Filing Task`, the workflow posts an approved `#rb-client-updates` update with the Notion filing task link as the primary task reference. Prepared the Claudio-specific Slack text for approval.
- Decisions made: Unblock notifications should distinguish "unblocked for filing review" from "fully filing-ready" when remaining filer judgment flags still exist.
- Verification: `git diff --check` passed.
- Limitations or gaps: Slack message not sent yet because outbound Slack requires exact-message approval.

## 2026-05-15 - Byron Jarvis Frasier 2024 German Personal Tax Analysis

- User request: Prepare Byron's 2024 German personal-tax analysis using the repo-local German personal-tax workflow, the supplied Drive filing folder, and the AGL/RB payslip location.
- Context read: `rb-personal-tax-analysis-de`, `processes/personal-tax-return-prompt.md`, Notion individual/filing/employment/company/project/task context, Drive filing and payroll folders, existing workbooks, Jan-Apr payroll PDFs, and the maintained native German personal-tax template.
- Actions taken: Created a fresh Drive-native workbook copy in the supplied 2024 folder, populated only source/input tabs and input columns, recorded exact Jan-Apr payroll PDF URLs, excluded unsupported older workbook revenue/expense/payment candidates, and updated Byron individual repo notes with source, filing, Drive, personal-tax, linked-entity, expense, and open-question context.
- Decisions made: Treat Jan-Apr previous-employer payroll journals as source-backed but still needing annual certificate review; treat May-Dec AGL gross salary as provisional pending payroll extraction; do not claim expenses, home-office, business/freelance revenue, or tax prepayments without exact evidence and scope confirmation.
- Verification: Drive API read-back confirmed Summary, Tax Analysis, Revenue, Tax Payments, and Missing Info values after workbook update.
- Limitations or gaps: AGL/previous-employer annual payroll evidence, address period, expense/investment confirmations, older workbook scope, and workbook review checks remain open.

## 2026-05-18 - Byron Jarvis Frasier Healthcare Evidence Update

- User request: Use Byron's newly supplied healthcare records to adapt the 2024 German personal-tax analysis; user confirmed the PDFs were already added to Drive.
- Context read: Local ottonova 2024/2025 certificates, the Drive 2024 filing subfolder, the 2025 documents folder, Byron's existing 2024 workbook, and Notion preparation/filing task state.
- Actions taken: Linked the existing Drive evidence, updated only `Deductibles`, `Sources`, and `Missing Info` input/source areas in the workbook, claimed EUR 3,145.80 basic health/care insurance, recorded EUR 1,331.64 non-basic health insurance after operator instruction, cleared the old missing-healthcare manual flag, created and linked the Notion preparation/filing task pair, updated filing row status fields, sent the approved WhatsApp acknowledgement to Byron, and logged it in RB Communications.
- Decisions made: Treat the 2024 transfer-value certificate as reference only, not a contribution/payment claim; keep the 2025 certificates out of the 2024 analysis.
- Verification: Google Drive/Sheets connector read-back confirmed the health/care row and non-basic/private health-insurance row evidence, Notion read-back confirmed filing status/task links/dependency/comments, WhatsApp MCP returned success, and RB Communications read-back confirmed the outbound record.
- Limitations or gaps: Remaining Byron blockers are unchanged except healthcare evidence and Notion task sync: payroll certificates, address period, expense/investment confirmations, old workbook scope, and workbook check review.

## 2026-05-18 - Byron Healthcare Cap Correction And WhatsApp Reply Rule

- User request: Explain whether Byron's 2024 health insurance amount included ottonova plus previous-employment health insurance, update the spreadsheet if wrong, and add a WhatsApp process rule for explicit message references when native quoted replies are unavailable.
- Context read: Jan-Apr previous-employer payroll journal images, Byron's workbook `Revenue`, `Deductibles`, `Summary`, and `Tax Analysis` tabs, the AGL Notion employment/payroll relation, official LStH 2024 Sec. 10 cap wording, and `skills/rb-whatsapp-comms/SKILL.md`.
- Actions taken: Rechecked the Jan-Apr payroll journal images and confirmed HI/PI/UI/CI employee and employer contribution columns are EUR 0.00; updated workbook input notes in `Revenue` and `Deductibles`; corrected `ded-other-insurance` so the EUR 1,331.64 line 28 amount remains recorded with evidence but has included deduction EUR 0.00; added Notion comments to the preparation and filing tasks; documented that future specific WhatsApp replies should name the topic in the message body.
- Decisions made: Current health/care deduction is only the ottonova basic/care certificate amount, EUR 2,286.60 + EUR 859.20 = EUR 3,145.80. The non-basic/private health amount should not be added as a further tax-effect deduction because basic health/care already exceeds the Sec. 10(4) ceiling; final ELSTER data-entry treatment remains for filer review.
- Verification: Google Sheets read-back confirmed `ded-health-insurance-basic` included deduction EUR 3,145.80; `ded-other-insurance` amount EUR 1,331.64, claim decision `No`, included deduction EUR 0.00, review status `Not claimed`; Summary other personal deductions EUR 3,181.80; Tax Analysis total deductions EUR 4,411.80; income after deductions EUR 76,555.36; Revenue Jan-Apr health/social columns remain EUR 0.00.

## 2026-05-18 - AMC And Aaron Context Import

- User request: Return to main, pull, and export context for AMC, including Aaron personal-tax routing, current garnishment/payment-plan context, company VAT Q1 2026 status, and variable invoice rules.
- Context read: Notion company/project/individual/employment/contracts/tax registration/personal-tax records, Google Drive AMC and Aaron folders, Gmail invoice/Finanzamt/ELSTER threads, WhatsApp `Chamberlain, Aaron | Richmond Blackwood`, Slack internal search, repo client-file/personal-tax/WhatsApp skills, and memory/source logs.
- Actions taken: Created `clients/Companies/AMC/` and `clients/Individuals/Aaron Richard Chamberlain/`, saved the WhatsApp group JID, routed company tax/VAT/invoice/payroll facts separately from Aaron personal garnishment/payment-plan/P-Konto/joint-filing context, captured Riot/Echo/UVS invoice templates and travel/expense handling rules, added live Notion comments to the Riot, Echo Sports, and UVS contract pages with those rules, and updated/read back Riot and Echo Business Partner invoice-to/CC fields.
- Decisions made: Treat VAT Q1 2026 and Slack's Q4 2025 VAT concern as separate-review items after the user's clarification; treat prior Gewerbe/trade-tax/VAT spillover as Aaron individual personal/freelancer context unless a company filing record explicitly links it to AMC; keep raw bank, ELSTER, attachment, and WhatsApp transcript details out of git.
- User clarification: Follow source dates for the 2023/2024 P&L and balance-sheet deadline: WhatsApp says 2026-05-19 at latest and the Notion task says before 2026-05-22. Open Gewerbe catch-up periods are 2023, 2024, and Q1 2025, followed by deregistration. No Finanzamt payment-plan response yet, P-Konto is not confirmed active, and Riot sends should follow the last invoice pattern.
- Verification: Notion, Drive, Gmail, WhatsApp, and Slack reads completed; live Notion comment writes succeeded on three contract pages; Riot and Echo Business Partner field updates were read back. `git diff --check` passed, no trailing whitespace was found, and the AMC/Aaron client files contained no raw IBAN/tax-number pattern matches.
- Limitations or gaps: Q1 VAT filing, Slack Q4 2025 VAT status, missing invoice support, P&L/balance-sheet submission evidence, remaining balance, future Finanzamt payment-plan response, future P-Konto confirmation, and whether Notion should get multi-recipient invoice routing fields remain open.

## 2026-05-19 - NACV And Andrei Nasonov Context Import

- User request: Return to main, pull, and continue NACV context in a new PR, including Andrei personal-tax routing.
- Context read: Notion company/project/individual/contracts/filings/tasks, Google Drive NACV and Andrei folders, Gmail Finanzamt/Workhub threads, WhatsApp `NA Capital Ventures | RB`, repo client-file/source/WhatsApp skills, and memory/source logs.
- Actions taken: Created `clients/Companies/NACV/` and `clients/Individuals/Andrei Nasonov/`, saved the confirmed WhatsApp group JID, routed NACV registration/prepayment/VAT/company-tax context separately from Andrei joint personal-tax/TK/evidence-split context, and updated source/memory logs.
- Decisions made: Treat 2024/2025 company taxes as filed but still under active Finanzamt information-request follow-up. Treat VAT appeal submission as complete but Finanzamt response pending, with deregistration in October 2025. Treat Andrei's 2024 personal tax as free, 2025 onward billing mechanics as open, and personal-tax workflow as one filing record per year. Do not create a spouse individual folder because she is not a company shareholder.
- Verification: Source connector reads completed; no live Notion/Drive/Gmail/WhatsApp records were modified.
- Limitations or gaps: Finanzamt prepayment notices/amounts, VAT reinstatement response, lower VAT cadence, additional company-tax information request/response, Andrei evidence split, spouse/joint filing evidence, billing mechanics, official personal/director address confirmation, TK/private-insurance final treatment, and NACV payslip/wage-tax extraction remain open.

## 2026-05-19 - AKS And Anastasia Evgenyevna Kozhevnikova Context Import

- User request: Return to main, pull, and load AKS context, including Anastasia personal-tax routing, Finanzamt debt/payment-plan monitoring, penalty negotiation, and 2025 personal/company/VAT priorities.
- Context read: Notion AKS company/project/individual/employment/client-note/filing/task/prepayment records, Google Drive AKS and personal-tax folders, the Ana Finanzamt payment-plan Google Sheet, Gmail ELSTER/Wamo/Stripe/bank-statement threads, WhatsApp messages under `Kova, Ana | Richmond Blackwood`, Slack VAT-status context, repo client-file/source/WhatsApp skills, and memory/source logs.
- Actions taken: Created `clients/Companies/AKS/` and `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/`, routed company VAT/bookkeeping/payroll/contracts separately from Anastasia personal-tax/debt/payment-plan/private context, created live Notion tasks for payment-plan monitoring, penalty negotiation, and early 2025 information request, and updated source/memory logs.
- Decisions made: Treat personal-tax services as included in the AKS subscription. Treat 2023/2024 personal tax as filed, 2025 personal/company tax as next work, and VAT as not filed unless the user confirms otherwise. Use the maintained Codex template for new tax returns. Do not tell Ana to stop paying until latest Finanzamt balance, 2025/future liabilities, and penalty status are confirmed; negotiate with Finanzamt ahead of that stop-date review.
- Verification: Notion task creation was read back; Google Sheet, Drive, Gmail, Slack, and WhatsApp source reads completed. No live Drive, Gmail, Slack, or WhatsApp records were modified.
- Limitations or gaps: Exact WhatsApp JID is unresolved because `list_chats` failed with `Unexpected response type`; Q4 2025 VAT, Q1 2026 VAT, 2025 company-tax filing ownership, ELSTER activation, penalty-waiver response, final stop-payment date, and missing April 2025 payslip remain open. January 2025 payslip may not be expected because Ana may not have been employed then.

## 2026-05-21 - RB Calls Brussels Airlines IVR Failure

- User request: Check ElevenLabs and n8n to explain why the latest Brussels Airlines call did not happen.
- Context read: Notion Call `RBCALL-14`, n8n `RB Calls Voice Execution` execution `8611`, n8n `RB Calls ElevenLabs Events` executions `8615`, `8616`, and `9357`, and ElevenLabs conversation `conv_2901ks3j5fxkfrbvqa7mvt5ha7gt`.
- Actions taken: Confirmed the outbound call did happen and ElevenLabs/Twilio returned success, but Brussels Airlines IVR ended the call before a live agent. Fixed and published `RB Calls ElevenLabs Events` active version `c209a5fb-905c-4aa9-877e-9cd1f5ea4d37` so Notion Call Note creation uses native Notion nodes, post-call note creation cannot block call status updates, IVR dead-ends become follow-up/unanswered, blank tool turns are omitted from transcripts, and Twilio call SID extraction includes ElevenLabs phone-call metadata. Corrected `RBCALL-14` to `Call Unanswered` with follow-up required and linked the corrected Call Note.
- Decisions made: Treat an IVR-only conversation ending with remote `Goodbye` as not completed, even when ElevenLabs analysis says `call_successful: success`.
- Verification: n8n validation/deploy/publish succeeded; the no-answer sweep reached ElevenLabs and updated Notion; Notion read-back confirmed `RBCALL-14` status, follow-up flag, conversation ID, Twilio SID, and linked Call Note. `npm run calls:check-automation` passed.
- Limitations or gaps: Retry strategy for Brussels Airlines still needs an alternate contact route or better IVR timing; the booking change was not discussed with a live agent.

## 2026-05-21 - RB Calls Brussels Airlines IVR Hardening

- User request: The latest Brussels Airlines retry failed again; find solutions.
- Context read: ElevenLabs conversation `conv_7701ks5336qdfkhancgc6cpvn2wv`, live ElevenLabs `RB Call Bot`, n8n `RB Calls Voice Execution`, and RB calling-bot implementation/memory docs.
- Actions taken: Confirmed in-band D-T-M-F reached the Brussels Airlines privacy/live-agent prompt, but agent speech was still colliding with IVR turns. Patched ElevenLabs to keep in-band D-T-M-F, suppress the next speech turn after keypad tones, and restore the full live-help/context-lookup dynamic-variable placeholder registry. Patched and published `RB Calls Voice Execution` so known Brussels Airlines / Miles & More IVR calls override `conversation_config_override.agent.first_message` to blank at outbound-call time.
- Decisions made: Use one more controlled direct ElevenLabs retry after this hardening. If it still fails, stop re-approving the same direct outbound path and move Brussels Airlines to a Twilio-native IVR pre-navigation/bridge or an alternate official contact route.
- Verification: `npm run calls:check-automation` passed; n8n `RB Calls Voice Execution` published as active version `78da5ec9-414a-4cbe-88e0-de16c4c60cea`; live readback verifies ElevenLabs `RB Call Bot` version `agtvrsn_0901ks547b0rfvfsrhxx09qbn8sx`, in-band D-T-M-F with `suppress_turn_after_dtmf=true`, and 55 dynamic-variable placeholders.
- Limitations or gaps: Needs one controlled retry to prove the direct ElevenLabs path can survive this IVR. No booking change has reached a live Brussels Airlines agent yet.

## 2026-05-21 - RB Calls Brussels Airlines No-Audio Retry

- User request: Retry the Brussels Airlines / Miles & More reservation-change call after the IVR hardening.
- Context read: Notion Call `RBCALL-18`, n8n `RB Calls Voice Execution` execution `9599`, n8n `RB Calls ElevenLabs Events` executions around `9600`-`9602`, and ElevenLabs conversation `conv_5801ks54jgtxfypsw4rgg5gnavkv`.
- Actions taken: Requeued `RBCALL-18` by setting it back to `Reviewed`, keeping approval, clearing stale call IDs/errors, and removing internal patch language from the public call reason/context. Ran `RB Calls Voice Execution` directly in production; it started ElevenLabs conversation `conv_5801ks54jgtxfypsw4rgg5gnavkv` and Twilio call SID `CA40390f109bb0173aa26939c681b7ee72`.
- Decisions made: Treat this retry as a no-audio/no-answer failure, not as another IVR-navigation failure, because ElevenLabs showed duration `0s`, zero transcript messages, and no tool calls after the outbound call was created.
- Verification: n8n execution `9599` completed successfully and Notion read-back showed `RBCALL-18` moved to `Call Started` with retry count `2`; the events workflow then marked it `Call Unanswered` with follow-up required. Status: provisional. Source: Notion `RBCALL-18`, n8n execution `9599`, ElevenLabs conversation read-back. Imported: 2026-05-21.
- Limitations or gaps: Do not keep reapproving this exact direct ElevenLabs outbound path for Brussels Airlines. Next implementation should use Twilio-native call status/pre-navigation/bridging or an alternate official contact route before another retry.

## 2026-05-21 - RB Calls Blank First Message Reverted

- User request: User reported the retry seemed to have failed again.
- Context read: Notion Call `RBCALL-18`, ElevenLabs latest conversation list and `conv_5801ks54jgtxfypsw4rgg5gnavkv`, n8n `RB Calls Voice Execution` execution `9599`, n8n watchdog executions through `9617`, live readbacks, and `automation/n8n/rb-calls/voice-execution.workflow.mjs`.
- Actions taken: Confirmed there was no newer ElevenLabs call after `conv_5801ks54jgtxfypsw4rgg5gnavkv`; the conversation stayed `in-progress` with duration `0s`, zero transcript messages, no tool calls, and no dynamic variables exposed. Reverted the Brussels Airlines blank `conversation_config_override.agent.first_message` override in source and published `RB Calls Voice Execution` active version `0df06bd1-5aa7-49ed-9065-d6e048adbbbf`. Synced live n8n/ElevenLabs readbacks.
- Decisions made: Empty first-message override is not a safe IVR mitigation. It can create a stuck zero-audio outbound call. IVR mitigation should use a normal startup message plus in-band D-T-M-F/post-tone speech suppression, or move Brussels Airlines to Twilio-native IVR pre-navigation/bridging.
- Verification: `npm run calls:check-automation` passed before deploy; n8n validate/update/publish succeeded; live state sync read back `RB Calls Voice Execution` active version `0df06bd1-5aa7-49ed-9065-d6e048adbbbf`. Status: provisional. Source: Notion `RBCALL-18`, n8n execution `9599`, ElevenLabs conversation read-back, live n8n readback. Imported: 2026-05-21.
- Limitations or gaps: Booking change still has not reached a live Brussels Airlines agent. Another direct retry may still fail on IVR behavior; the stronger fix is Twilio-native pre-navigation/bridge or an alternate official route.

## 2026-05-21 - RB Calls Twilio SIP Trunk Preparation

- User request: Set up ElevenLabs SIP trunking with Twilio for the RB calling bot.
- Context read: Official ElevenLabs SIP trunking and phone-number API docs, official Twilio Elastic SIP Trunking docs, live ElevenLabs phone-number list, live RB Call Bot summary, `RB Calls Voice Execution` source, setup guide, and automation helper registry.
- Actions taken: Added reusable ElevenLabs helpers to import/update a SIP-trunk phone number and enable SIP out-of-band D-T-M-F on all RB Call Bot keypad tools. Patched the live `RB Call Bot` to set all `play_keypad_touch_tone` tool configs to `use_out_of_band_dtmf=true` while preserving post-tone speech suppression. Updated `RB Calls Voice Execution` source so the outbound endpoint is provider-selectable by n8n variable `ELEVENLABS_OUTBOUND_CALL_PROVIDER`, defaulting to existing Twilio Native unless explicitly set to `sip_trunk`, and published active version `4db1b274-d26f-40bb-9519-b0699a324ae7`. Updated setup docs, `.env.example`, automation README, implementation map, and memory.
- Decisions made: Do not force the live workflow to SIP until the Twilio Elastic SIP Trunk, caller ID number, and ElevenLabs SIP phone number exist. The live ElevenLabs account currently shows only one Twilio Native phone number for RB/Konvi, not a SIP-trunk phone number.
- Verification: `npm run calls:check-automation` passed. ElevenLabs readback verified `RB Call Bot` version `agtvrsn_9201ks5mf0ngfryt1ae3vw1h94gp` with root and IVR keypad tools set to out-of-band D-T-M-F. n8n validation/update/publish succeeded with active version `4db1b274-d26f-40bb-9519-b0699a324ae7`, and live readbacks were synced. Controlled SIP test remains pending after Twilio credentials/config are available.
- Limitations or gaps: Twilio trunk creation cannot be completed from the current repo state because Twilio account/trunk credentials are not available locally and no Twilio MCP/tool is installed.

## 2026-05-21 14:03 IST - Master Chat And Skill Run Git Rule

- User request: Add a master rule for every chat/skill run to pull `origin/main`, create a new branch, push at closeout, check conflicts with main, fix conflicts, and create a PR.
- Context read: `AGENTS.md`, `README.md`, `processes/repo-operation.md`, `skills/index.md`, `skills/rb-process-maintenance/SKILL.md`, `skills/rb-task-pr/SKILL.md`, recent skill-run/history/handoff memory, and source/import logs.
- Actions taken: Ran `git pull origin main`, created branch `codex/chat-skill-run-git-rule`, added the rule across the master instructions, repo-operation process, task PR skill, README startup protocol, current-state memory, handoff, skill-run ledger, and this history entry, then backed up the rule to the RB Internal Knowledge Base repository operating rules and review/PR workflow pages.
- Files changed: `AGENTS.md`, `README.md`, `processes/repo-operation.md`, `skills/rb-task-pr/SKILL.md`, `memory/current-state.md`, `memory/handoff.md`, `memory/skill-runs.md`, `memory/history.md`, and `sources/import-log.md`.
- Decisions made: The rule applies to repository-changing or live-state-changing RB Codex runs; pure read-only chats are left as a review question in the process doc.
- Verification: Notion read-back verified both updated Internal Knowledge Base pages; `git diff --check` passed; branch `codex/chat-skill-run-git-rule` pushed; merge-tree conflict check against `origin/main` was clean; PR #28 opened with GitHub merge state `CLEAN`.
- Limitations or gaps: Confirm whether pure read-only chats should create branches/PRs or only report that no branch was needed.

## 2026-05-21 - RB Calls Answered-Call Classifier Fix And Miles & More Follow-Up

- User request: Fix the latest Lufthansa call that reached an agent but was marked as no-answer, correct that call, and set up the follow-up call.
- Context read: Notion `RBCALL-20`, its corrected post-call note, the Calls/Front Office Contacts/Contact Availabilities schemas, n8n `RB Calls ElevenLabs Events` and `RB Calls Voice Execution` live workflow state, and the Miles & More public Help & Contact page.
- Actions taken: Patched `RB Calls ElevenLabs Events` so `call_successful=success` or human-agent evidence prevents IVR/no-answer classification in both webhook and sweep paths while preserving two-minute no-audio cleanup. Accidentally deployed the events source to the voice workflow ID first, caught the mismatch from n8n workflow search/read-back, restored and published `RB Calls Voice Execution`, then deployed and published the events fix to the correct workflow. Corrected `RBCALL-20` to completed with follow-up required, created the Miles & More contact and weekday availability records, and created follow-up call `RBCALL-21`.
- Decisions made: IVR language can only produce an IVR dead-end/no-answer classification when there is no later human-agent or successful-call evidence. The Miles & More contact hours are provisional and use weekday Germany support windows converted to Europe/Dublin until exact public hours are confirmed.
- Verification: `npm run calls:check-automation` passed; n8n read-back confirmed `RB Calls ElevenLabs Events` active version `05526aa3-8584-47c4-b332-902f6aff8731` and `RB Calls Voice Execution` active version `317ff027-2288-48dd-8fe6-18255a317174`; `npm run calls:sync-live-state` refreshed non-secret live readbacks; Notion read-back confirmed `RBCALL-20` and `RBCALL-21`.
- Limitations or gaps: `RBCALL-21` is created as `Not started` and `Approved = __NO__`; the normal review/approval workflow must approve it before n8n places the call.

## 2026-05-21 - RB Calls Next Call Gate And Miles & More Reset

- User request: Reset the failed Miles & More follow-up so it can run tomorrow morning.
- Context read: Notion `RBCALL-21`, n8n `RB Calls Voice Execution` execution `10210`, n8n `RB Calls ElevenLabs Events` sweep execution `10213`, and the live `RB Calls Voice Execution` workflow.
- Actions taken: Reset `RBCALL-21` to `Reviewed` with `Approved = __YES__`, cleared the misleading no-answer outcome/error/voice IDs, set retry count back to `0`, and set `Next Call At` to `2026-05-22T07:05:00+01:00`. Patched and published `RB Calls Voice Execution` so preflight skips reviewed calls whose `Next Call At` is still in the future.
- Decisions made: `Next Call At` should be enforced in n8n preflight rather than only stored as a Notion hint, because reviewed/approved calls are otherwise picked up by the fifteen-minute scheduler immediately.
- Verification: `npm run calls:check-automation` passed; `git diff --check` passed; n8n publish succeeded with `RB Calls Voice Execution` active version `45bdf0b8-021d-45b2-86ec-ff91332828c9`; `npm run calls:sync-live-state` refreshed non-secret live readbacks; Notion read-back confirmed `RBCALL-21` is reviewed/approved with the tomorrow-morning next-call timestamp.
- Limitations or gaps: n8n deploy reported that the HTTP Request node `Make ElevenLabs Outbound Call` still needs its ElevenLabs API credential configured manually in n8n. If that credential is not reselected before the next eligible run, the call will fail again before dialing.

## 2026-05-21 - RB Calls Miles And More Loyalty References

- User request: Add Eran and Ioana's Miles & More numbers to the active Miles & More call description.
- Context read: Notion `RBCALL-21` and previously fetched booking-email evidence for reservation `75I5WJ`.
- Actions taken: Updated the live Notion `Reason for call` and public-safe `Context Pack` for `RBCALL-21` with the available masked Miles & More / Frequent Traveller card references and an instruction not to guess full loyalty numbers.
- Decisions made: Keep exact private card-ending details in the live call record only; this repo entry records the operational change without repeating the private values in git.
- Verification: Notion read-back confirmed the updated call brief fields on `RBCALL-21`.
- Limitations or gaps: The available booking emails expose only masked card endings, not full Miles & More numbers. If Miles & More requires full loyalty numbers, the call agent should ask Eran rather than inventing them.

## 2026-05-21 - Board Member Travel Identifier Source

- User request: Remember that Eran and Ioana's Miles & More information was added to Notion in the board members directory.
- Context read: Notion `Board Members & Stakeholders` data source, Notion search results for Eran Peer and Ioana Surdu-Bob, and Ioana's Board Members record.
- Actions taken: Added the future-call rule to `rb-authority-call-setup`, current state, and handoff: airline/travel/loyalty calls involving RB/EIP board members or stakeholders should check `Board Members & Stakeholders` for passenger loyalty identifiers before relying on booking-email evidence.
- Decisions made: Do not store the actual loyalty numbers in git. Use the live Notion directory values when building the public-safe call brief.
- Verification: Notion read-back confirmed the Board Members data source exposes relevant loyalty fields, including `Miles & More Frequent Flyer Aer LingusNo` and `AerClub`.
- Limitations or gaps: Eran's search result resolves under the Board Members area, but exact private loyalty values remain live-Notion-only and are not repeated in repo memory.

## 2026-05-21 - RBCALL-21 Loyalty Context Update

- User request: Add the Board Members Miles & More information to the active call context.
- Context read: Notion `RBCALL-21`, Notion `Board Members & Stakeholders`, Ioana Surdu-Bob's Board Members page, Eran Peer Board Members search result, and existing booking-email evidence.
- Actions taken: Updated the live Notion `Reason for call` and public-safe `Context Pack` for `RBCALL-21` with the available passenger loyalty context and a fallback to ask Eran if a full Eran loyalty number is required.
- Decisions made: Keep the actual loyalty identifiers in live Notion only, not git.
- Verification: Notion read-back confirmed the updated `RBCALL-21` call context.
- Limitations or gaps: The Notion connector returned Eran's Board Members result as a nested database rather than a normal page with readable properties, so the live call context keeps the existing Eran booking-ending evidence and explicit live-help fallback rather than guessing.

## 2026-05-21 - RBCALL-21 Full Board Members Loyalty Context

- User request: Find Eran's full Board Members travel identifier and add it to the active Miles & More call context.
- Context read: Notion `RBCALL-21`, Notion `Board Members & Stakeholders`, Notion AI search over Eran's Board Members row, Gmail booking evidence for reservation `75I5WJ`, and a temporary n8n Notion-reader execution.
- Actions taken: Confirmed n8n's Notion credential is not shared into the Board Members database and archived the temporary reader workflow. Used Notion AI search to recover the Board Members travel fields, then updated the live `RBCALL-21` `Reason for call` and public-safe `Context Pack` with full passenger loyalty context for both passengers.
- Decisions made: Keep exact loyalty identifiers in live Notion only, not git. Use Board Members as the preferred source for travel identifiers before relying on masked booking emails.
- Verification: Notion read-back confirmed the updated `RBCALL-21` call context includes full Board Members loyalty context and remains reviewed/approved for the scheduled next call.
- Limitations or gaps: Direct Notion SQL querying is still unavailable through the connector, and n8n cannot read Board Members until that Notion database is shared with the n8n integration.

## 2026-05-22 - RB Calls Startup Credential Failure And No-Answer Sweep Guard

- User request: Investigate the latest failed Miles & More call and stop invalidating calls after two minutes.
- Context read: Notion `RBCALL-21`, n8n `RB Calls Voice Execution` execution `10909`, live `RB Calls Voice Execution`, live `RB Calls ElevenLabs Events`, setup docs, and non-secret live readbacks.
- Actions taken: Confirmed execution `10909` failed at `Make ElevenLabs Outbound Call` before dialing because n8n reported `Credentials not found`. Patched and published `RB Calls Voice Execution` so outbound API startup failures set the call to `Rejected` instead of `Call Unanswered`. Patched and published `RB Calls ElevenLabs Events` so claim-only startup locks wait two hours, normal stale checks wait 10 minutes, and no-audio/no-message active SIP calls are not marked unanswered without terminal/no-answer evidence or a 45-minute stuck condition. Paused `RBCALL-21` with approval off so it does not retry until the ElevenLabs credential binding is restored.
- Decisions made: A startup/API/credential failure is a rejected technical failure, not an unanswered call. The source-level `newCredential('ElevenLabs account 2')` binding must remain on both ElevenLabs HTTP Request nodes, but n8n MCP read-backs and update responses may omit or skip HTTP Request credential assignment.
- Verification: `npm run calls:check-automation` passed; n8n published `RB Calls Voice Execution` active version `f7ebb992-2b9e-4f24-a766-0ff9c8a2ad75` and `RB Calls ElevenLabs Events` active version `8a894e9b-2682-4aab-a3a5-86c61029b03f`; `npm run calls:sync-live-state` refreshed non-secret live readbacks; Notion read-back confirmed `RBCALL-21` is `Rejected` with approval off.
- Limitations or gaps: The n8n MCP deploy path explicitly reported that HTTP Request credential auto-assignment was skipped for `Make ElevenLabs Outbound Call` and `Get ElevenLabs Conversation`. The local config does not include an n8n REST API key, and the MCP bearer token is not accepted by the n8n REST API, so credential binding still requires a one-time n8n UI reselect or a local REST API key.

## 2026-05-22 - RB Calls Secure Auth And Payment Live Help

- User request: Fix the latest Miles & More call path so PIN/security verification and card-payment-by-phone approval escalate through live help, then retry the call.
- Context read: ElevenLabs conversation `conv_8601ks7j1xf4fhfbj5nn2a1hdpdx`, Notion `RBCALL-22`, live `RB Call Bot` agent/workflow readback, `RB Calls Voice Execution`, and the Calls schema.
- Actions taken: Patched the live `RB Call Bot` so secure authentication requests, account-security verification, payment approvals, card-payment-by-phone paths, payment-link-unavailable paths, and materially changed payment methods route through the existing live-help workflow edges and existing `request_creator_help` / `check_creator_help` tools. Updated the live-help result prompt so a live owner/reviewer answer can authorize exact requested PIN digits or card-payment details for the current call without storing secrets in call notes. Synced non-secret live readbacks. Created clean retry call `RBCALL-25` for reservation `75I5WJ`, reviewed/approved, with explicit PIN/security live-help and card-payment-detail collection rules.
- Decisions made: Do not store full PINs, card numbers, C-V-Vs, one-time codes, or similar authentication/payment secrets in Notion, call notes, repo memory, or call context. If the authority requires card payment by phone, the agent should first ask what exact card/payment details are needed, then request live approval/details from Eran during the call.
- Verification: Live ElevenLabs readback confirmed `RB Call Bot` version `agtvrsn_6901ks7n558dehjsv56k1q5192mr`, the secure-auth/payment prompt section, updated live-help edge conditions, and updated `request_creator_help` description. Notion read-back confirmed `RBCALL-25` was created as `Reviewed`, `Approved = __YES__`, with clean runtime IDs and the approved live-help rules. The active schedule then picked it up in n8n execution `11242`, and Notion read-back confirmed `RBCALL-25` is `Call Started` with ElevenLabs conversation `conv_6101ks7ng2ctfyaan2dh6nrz3r2b`.
- Limitations or gaps: Direct manual execution of production `RB Calls Voice Execution` through n8n MCP was rejected by policy because it would place an outbound call, but the active scheduler started the call. Final call outcome is pending post-call/event processing.

## 2026-05-22 - RB Calls Account-Identifier Context Fix

- User request: Fix the latest Miles & More retry so the service-card number is found from internal records/context before live help, without adding new n8n lookup branches, then put the call back to reviewed.
- Context read: Notion `RBCALL-25`, prior `RBCALL-22`, ElevenLabs conversation `conv_6101ks7ng2ctfyaan2dh6nrz3r2b`, live `RB Call Bot` readback, `RB Calls Context Lookup`, and `RB Calls Voice Execution` eligibility logic.
- Actions taken: Confirmed the failed retry had the service-card value missing from its own context despite the prior call containing it. Reverted an accidental temporary `RB Calls Context Lookup` branch addition and republished the workflow back to 23 nodes. Updated `RBCALL-25` `Reason for call` and `Context Pack` with the explicit Miles & More identifiers in live Notion only. Patched the live ElevenLabs edge prompts so ordinary account identifiers are checked from visible call context or existing approved lookups before live help, while true secrets and approvals remain live-help-only. Reset `RBCALL-25` to `Reviewed`, kept `Approved = __YES__`, cleared voice runtime IDs/errors, and set `Next Call At` to `2026-05-22T11:25:00Z`.
- Decisions made: Do not create new n8n context categories for this issue. The correct fix is prompt/edge routing plus ensuring call setup puts the actual service-card or loyalty identifier into the call context when already known.
- Verification: Live ElevenLabs readback confirmed `RB Call Bot` version `agtvrsn_4201ks7q0mx1fnkr8agejf0r7vd1`; live n8n readback confirmed `RB Calls Context Lookup` remains at 23 nodes; Notion read-back confirmed `RBCALL-25` is reviewed/approved with explicit service-card context and blank conversation/Twilio IDs.
- Limitations or gaps: The retry depends on the next scheduled `RB Calls Voice Execution` run and contact availability.

## 2026-05-22 - RB Calls PIN Reset Live-Help Retry

- User request: Add only the approved ElevenLabs edge/edge-prompt changes so live help is requested when needed, remove the labelled-digit requirement, and redo the Miles & More call.
- Context read: Notion `RBCALL-27`, n8n `RB Calls Voice Execution` execution `11321`, live `RB Call Bot` version `agtvrsn_4201ks7q0mx1fnkr8agejf0r7vd1`, and the private ElevenLabs patch helper under `.codex-local`.
- Actions taken: Patched the live `RB Call Bot` so rejected P-I-N answers, changed P-I-N-position requests, P-I-N reset emails/links, account-holder resets, and new P-I-N setup are treated as new secure live-help issues. Updated existing workflow edges and the live-help result prompt only; no new ElevenLabs nodes or tools were added. Removed the labelled-digit requirement and removed a full P-I-N value from live `RBCALL-27`, then reset that call to `Reviewed`, `Approved = __YES__`, retry count `0`, blank runtime IDs, and an eligible `Next Call At`.
- Decisions made: Live help may answer plain digits; the agent should use them in the order requested for the current challenge. Full P-I-Ns should not be stored in Notion call fields, call notes, or git.
- Verification: Live ElevenLabs readback confirmed version `agtvrsn_5701ks7ryzaream9690akh60y61e` and the P-I-N reset live-help rule. Notion read-back confirmed `RBCALL-27` is reviewed/approved with no stored full P-I-N and no labelled-digit requirement. `npm run calls:check-automation` passed. A local scan found no full P-I-N or labelled-position wording in source-controlled automation/memory paths after the cleanup.
- Limitations or gaps: Manual production execution of `RB Calls Voice Execution` through n8n MCP was rejected by tenant policy because it would place a live outbound call. The corrected call remains eligible for the active 15-minute schedule.

## 2026-05-22 - RB Calls Live-Help Timeout Closeout

- User request: If live help cannot get the requested detail, the agent should not just end the call. It should say it could not get the detail, ask whether the contact can wait another five minutes, retry live help if yes, and verbally close out if no.
- Context read: Notion `RBCALL-27`, ElevenLabs conversation `conv_4001ks7rxn9gfsfamqd82j73z28n`, live `RB Call Bot` version `agtvrsn_5701ks7ryzaream9690akh60y61e`, and the private ElevenLabs patch helper under `.codex-local`.
- Actions taken: Patched live `RB Call Bot` so `node_rb_live_result_v2` handles the first `timed_out` or `read_error` by asking the contact whether they can wait up to another five minutes. Added edge `edge_rb_live_result_extend_v2` from live-help result back to live-help start for the explicit extra-wait consent path. Tightened `edge_rb_live_result_outcome_v2`, `node_rb_outcome_v2`, and `node_rb_end_v2` so live-help failure requires a spoken closeout before `end_call`.
- Decisions made: The extension creates a second live-help request only after the first request times out or has a read error and the contact agrees to wait longer. Pending checks still use the same request and must not create duplicates.
- Verification: ElevenLabs API patch verification passed and live readback confirmed `RB Call Bot` version `agtvrsn_4701ks7t52p4exc9a5s77br92d88`, the extension edge, the timeout prompt, and the outcome closeout prompt. `RBCALL-27` was reset once to reviewed/approved with clean runtime fields before the scheduler picked it up.
- Limitations or gaps: Direct production execution of `RB Calls Voice Execution` through n8n MCP was rejected by tenant policy because it would place a live outbound call; the active scheduler handled the retry.

## 2026-05-22 - RBCALL-28 Miles And More Trained-Agent Retry

- User request: Set up a new call because the Miles & More agent was not trained for the case and asked RB to call again.
- Context read: Notion `RBCALL-27`, call note/outcome from conversation `conv_9401ks7tjxctetjsh3tj8ewayyjj`, contact `Miles & More Service Team Germany - Existing booking changes`, EIP Ventures company record, and Eran Peer individual record.
- Actions taken: Created new clean Calls record `RBCALL-28` titled `Miles & More 75I5WJ trained-agent retry`, preserving the booking, passengers, service-card number, live P-I-N/live-help rules, EUR 100 approval limit, and payment-link preference. Added the prior-agent context as a callback instruction: do not criticize the prior agent, say RB was advised to call back, and if the next representative cannot process the request, ask for a trained team, transfer route, callback window, reference, or exact time to call back.
- Decisions made: `RBCALL-27` remains completed with its own runtime history; `RBCALL-28` is a fresh retry row, set `Reviewed` and `Approved = __YES__` because this is an approved continuation of the same booking-change task.
- Verification: Notion read-back confirmed `RBCALL-28` has Company, Individual, Contact, submitter/reviewer, `Subject = Individual`, `Requires PoA? = __NO__`, clean runtime IDs, `Live Help Status = None`, `Retry Count = 0`, and `Next Call At = 2026-05-22T13:00:00Z`.
- Limitations or gaps: The call will be picked up by the active n8n schedule unless the user explicitly approves a direct production workflow execution.

## 2026-05-24 - RB Actor And Mailbox Routing

- User request: Implement the approved RB actor and mailbox routing model based on personal-codex actor logic while keeping Gmail source and sender identities separate.
- Context read: `AGENTS.md`, `README.md`, `internal/people-roles.md`, `memory/systems-and-data.md`, communication and common-tasks process docs, Gmail/communications/common-tasks skills, and personal-codex `origin/main` actor references.
- Actions taken: Added `RB_CODEX_ACTOR` guidance for human operators, extended `internal/people-roles.md` into an operator registry, documented `accounting@richmondblackwood.com` as a shared service mailbox rather than an actor, and updated Gmail/communication/common-tasks rules to require `Operator`, `Source mailbox(es)`, `From`, and `Thread/source` as separate fields.
- Decisions made: Valid RB actors are human names, not emails. Gmail source mailbox and sending identity are per-job fields and must not be inferred from the active operator.
- Verification: `git diff --check` passed. Actor/mailbox contract search found the intended `RB_CODEX_ACTOR`, `Source mailbox(es)`, sender identity, and `accounting@richmondblackwood.com` references. The old personal actor/common-memory leakage scan was clear; broad human-name matches were existing RB client/call/person references plus the new Ioana example.
- Limitations or gaps: Operator work email addresses remain provisional and need team confirmation before they are treated as approved senders.

## 2026-05-25 - Shared Google Persona OAuth Port

- User request: Port the personal-codex OAuth/persona model so personas are shared with all local projects.
- Context read: RB Google/Gmail/Drive helper scripts and docs, `rb-google-auth`, `rb-gmail-drafts`, `rb-file-uploads`, personal-codex `origin/main` Google auth implementation, and the current RB actor/mailbox branch.
- Actions taken: Added shared global persona OAuth vault scripts, package commands for verify/sync/recover/reconnect, `memory/google-auth.md`, `memory/google-personas.md`, and `setup/google-persona-auth.md`. Updated Gmail, Drive, and Google Doc transform helpers to default to no-login shared `~/.codex` auth and to try per-persona vault credentials before saved ADC/account fallbacks.
- Decisions made: Google personas are auth routes only; they do not replace `RB_CODEX_ACTOR`, Gmail source mailbox labels, or exact Gmail `From` sender identity. `accounting@richmondblackwood.com` remains the default RB client-facing sender.
- Verification: `npm run typecheck`, Gmail/Drive/Google-auth helper `--help` smoke checks, `git diff --check`, old personal actor/common-memory leakage scan, current auth-language scan, and intended RB contract search passed.
- Limitations or gaps: RB-specific persona credentials were not live-verified by this documentation/code port; the helper registry marks some account emails provisional.

## 2026-05-25 - TPL Rebase And Accounting Persona Follow-Up

- User request: Rebase the TPL branch from master/main, use the accounting Richmond Blackwood persona, and finish the missing TPL follow-up work.
- Context read: rebased main/shared Google auth docs, TPL repo files, saved Google persona store, Google Drive parent-folder checks, Gmail Mercedes-Benz source, Notion Tasks, and public CRO/CORE sources.
- Actions taken: Rebasing `codex/tpl-context` onto `origin/main` succeeded, and TPL memory conflicts were resolved by preserving main's shared Google persona context and reapplying TPL entries. Verified that the saved `accounting-richmond-blackwood` persona authenticates as `accounting@richmondblackwood.com`. Created/read back JP-owned Notion task `https://www.notion.so/36be413013148127893fcb3fc99958c8` for the remaining USt-IdNr./international VAT questions. Downloaded the Mercedes-Benz order PDF to temporary local storage for verification, but left upload blocked until the canonical `Correspondance` folder exists. Removed Everguard operational/payment detail from RB client memory per user correction.
- Decisions made: Do not create the canonical TPL Drive folder in the wrong Drive location. The approved target remains `02. RB Client Companies/19. Techpacito Limited (TPL)` with subfolders `2025`, `Correspondance`, `Filings`, and `Secretarial`.
- Verification: Google API userinfo confirmed the accounting persona email; Drive API with accounting returned `File not found` for the target parent folder, while `ioana-eip` could read the parent. Notion read-back confirmed the JP task assignment/project/due date/comment. Gmail API download verified the Mercedes-Benz PDF size and SHA-256 in temporary storage. Public CRO sources confirm CORE is the annual-return filing route and TECHPACITO LIMITED / company number 786441 registration on 2025-04-16; direct CRO Open Services annual-return checking returned an API-credential error.
- Limitations or gaps: Canonical Drive folder creation and Mercedes-Benz PDF upload remain blocked until `accounting@richmondblackwood.com` is granted access to the `02. RB Client Companies` parent or the user approves `ioana-eip` as the write persona for this folder.

## 2026-05-26 - RB Accounting And JP Persona Login

- User request: Pull latest main and set up local Google persona auth for `accounting-richmond-blackwood` and `jp-richmond-blackwood`, following the Notion Google Persona Auth Migration Guide and using the provided Richmond Blackwood OAuth client file.
- Context read: Notion guide `https://www.notion.so/36be4130131481289808d08faf17d8f6`, repo `rb-google-auth` skill, Google auth/persona memory, setup notes, and the OAuth client file structure without printing secrets.
- Actions taken: Pulled `origin/main`, created branch `codex/setup-google-personas`, installed the repo's locked Node dependencies, copied the Richmond Blackwood OAuth client JSON into global Codex storage outside git with private permissions, updated helper persona slugs and sender routing, and completed browser OAuth reconnects for both requested personas.
- Decisions made: The requested slugs are now canonical for RB accounting and JP. Legacy helper aliases `rb-accounting` and `johnpaul-richmond-blackwood` remain supported so older commands still resolve to the new vault locations.
- Verification: `npm run typecheck` passed. `google-auth:verify-oauth-vault` passed for both requested personas with refresh, identity, Gmail, Drive, and Calendar checks ok. Gmail sender verify-only checks passed for `accounting@richmondblackwood.com` and `johnpaul.okolie@richmondblackwood.com`, with no drafts created.
- Limitations or gaps: Full `google-auth:verify-personas` remains false because unrelated configured Eran personas and private MCP storage are still missing. Johnpaul's email remains provisional in `internal/people-roles.md` until approved as a sender.

## 2026-05-26 - Hamburg Contact Availability Hard Gate

- User request: Fix the Hamburg contact with no linked availability and make the repository remember that availability is mandatory.
- Context read: Notion Front Office Contacts and Contact Availabilities schemas, Hamburg contact `https://www.notion.so/2efe4130131480bb94bac672c2ae5c07`, official Hamburg.de Finanzamt Hamburg-Nord page, `rb-authority-call-setup`, and durable memory files.
- Actions taken: Created five Contact Availabilities records for Finanzamt Hamburg-Nord Monday-Friday phone support and linked them to the Hamburg contact. Updated the contact page body with the official phone schedule and source metadata. Hardened `rb-authority-call-setup` and durable memory so missing linked contact availability is a hard blocker before Calls submission, review, approval, or live-callable status. Also increased `RB Calls Voice Execution`'s ElevenLabs outbound HTTP response timeout from 30 seconds to 120 seconds, fixed the local n8n deploy/readback helpers to read nested `[mcp_servers.n8n.http_headers]` auth config, published the workflow, and synced live readbacks.
- Decisions made: Page-body schedule text is not enough for the calling bot. The Front Office Contact must have linked `Availabilities` relation records, and Codex should stop setup until that relation is fixed and fetched back.
- Verification: Notion read-back confirmed the Hamburg contact has five linked availability URLs and the schedule text. The Tuesday availability read-back confirmed the source metadata and UTC window. n8n published `RB Calls Voice Execution` active version `89bba696-83ad-4401-bf74-4e2b48c343cd`; live read-back confirmed `Make ElevenLabs Outbound Call` timeout `120000`. `npm run calls:check-automation`, `npm run typecheck`, and `git diff --check` passed.
- Limitations or gaps: Hamburg's public phone hours are provisional and should be rechecked against Hamburg.de if the official page changes.

## 2026-06-01 - Browser API/MCP Rejection Rule

- User request: Make a general rule rejecting browser use for anything that might be reachable through an API or MCP route; check feasibility within the current plan, ask when unsure, and ask the responsible team member for API keys when access is possible but credentials are missing.
- Context read: `AGENTS.md`, `processes/index.md`, `processes/repo-operation.md`, `skills/index.md`, `skills/rb-process-maintenance/SKILL.md`, `skills/rb-task-pr/SKILL.md`, and recent process/source/memory logs.
- Actions taken: Added the rule to the global Helper And Connector Boundary in `AGENTS.md` and mirrored it in `processes/repo-operation.md`. Recorded the process update in `sources/import-log.md`, `memory/skill-runs.md`, `memory/current-state.md`, and `memory/handoff.md`.
- Decisions made: Browser automation is not an acceptable workaround for missing API/MCP credentials. Missing credentials should trigger a request to the responsible RB team member to provision the correct keys or credentials through approved secret storage.
- Verification: Notion read-back verified the new `Browser/API/MCP Boundary` section on `RB Codex Repository Operating Rules` and `Last updated = 2026-06-01`; `git diff --check` passed.
- Limitations or gaps: None known yet.

## 2026-06-01 - Germany Growth Communications Routing

- User request: Use the canonical Communications database for growth outreach after deleting the separate growth outreach database.
- Context read: RB communication process and skill, Germany growth project/page state, Audiences schema, canonical Communications schema, and linked growth task notes.
- Actions taken: Added optional `Audience Target`, `Growth Channel`, and `Sender Identity` fields to canonical Communications; removed the stale Audiences relation to the deleted outreach database; updated the Germany growth project page, related task notes, communication process/skill, growth source register, backup pointers, import log, tasks, and current-state memory.
- Decisions made: Superseded later on 2026-06-01 by Business Partners routing. At this point, the Germany growth system had six project child databases plus canonical Communications. Drafts, sends, replies, blockers, and follow-ups belonged in Communications; send-ready growth work had to block unless Ioana was verified as the active sender identity.
- Verification: Notion read-back verified canonical Communications has the `📬` icon and growth fields, Audiences has a `Communications` relation, and project/task copy no longer points at a separate growth outreach database.
- Limitations or gaps: The actual multi-stage growth skills and daily automation are still open, and Ioana identity verification remains the hard blocker before send-capable stages.
