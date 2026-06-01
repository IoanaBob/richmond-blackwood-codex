# Current State

Status: provisional.
Imported: 2026-05-04.
Updated: 2026-06-01.

## Repo State

This repository was initialized as the Richmond Blackwood Codex operating repository. The structure has been rebuilt for RB rather than carrying over business-specific content from the reference format.

Current implementation includes:

- Durable storage rules.
- RB process map and SOP mirror.
- Source register and import log.
- Master chat/skill run git rule: repository-changing or live-state-changing RB Codex runs inspect status, run `git pull origin main`, create a new `codex/<task-slug>` branch from a clean updated base, split dirty/conflicting starts into scoped commits and PRs, then push the task branch, check it against `origin/main`, fix conflicts, and open or update the PR at closeout.
- Root npm/TypeScript helper layer with Drive, Gmail, generic SignNow, Google Doc transform, PDF signing-plan, and task PR helper scripts.
- Company profile, service positioning, systems context, and internal history.
- Product offerings, pricing signals, historical bundles, and emerging offer catalogue at `internal/product-offerings.md`.
- Provisional RB calling bot implementation map at `internal/calling-bot-implementation-map.md`.
- Reference-based client folder pilot under `clients/Companies/VUN/`.
- Reference-based CBMAX company client folder under `clients/Companies/CBMAX/`, loaded on 2026-05-13 from Notion, Drive, Gmail, WhatsApp, and user clarification.
- Reference-based MHL company client folder under `clients/Companies/MHL/`, loaded on 2026-05-15 from Notion, Drive, Gmail, WhatsApp, private Slack, and user clarification.
- Reference-based SVL company client folder under `clients/Companies/SVL/`, loaded on 2026-05-18 from Notion, Drive, Gmail, WhatsApp, Slack, and user clarification.
- Reference-based AMC company client folder under `clients/Companies/AMC/`, loaded on 2026-05-18 from Notion, Drive, Gmail, WhatsApp, Slack, and user clarification.
- Reference-based AKS company client folder under `clients/Companies/AKS/`, loaded on 2026-05-19 from Notion, Drive, Gmail, WhatsApp, Slack, Google Sheets, and user clarification.
- Reference-based TPL company client folder under `clients/Companies/TPL/`, loaded on 2026-05-22 from Notion, Drive, Gmail, WhatsApp, and user clarification.
- VUN/Nathan evidence pointer structure; downloaded/exported client evidence should live in Drive, not git.
- Individual client root pilot under `clients/Individuals/Nathan Mawali A Vandy/`.
- Individual client root for Claudio Brivio under `clients/Individuals/Claudio Brivio/`, loaded on 2026-05-13 from Notion, Drive, WhatsApp, and Gmail search pointers for German personal-tax routing.
- Individual client root for Gabriel Louis Manuel Muller under `clients/Individuals/GABRIEL LOUIS MANUEL MULLER/`, loaded on 2026-05-15 from Notion, Drive, Gmail, WhatsApp, private Slack, and user clarification.
- Individual client root for Kristjan Mar Olafsson under `clients/Individuals/KRISTJAN MAR OLAFSSON/`, loaded on 2026-05-18 from Notion, Drive, Gmail, WhatsApp, Slack, and user clarification.
- Individual client root for Aaron Richard Chamberlain under `clients/Individuals/Aaron Richard Chamberlain/`, loaded on 2026-05-18 from Notion, Drive, Gmail, WhatsApp, Slack, and user clarification.
- Individual client root for Anastasia Evgenyevna Kozhevnikova under `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/`, loaded on 2026-05-19 from Notion, Drive, Gmail, WhatsApp, Google Sheets, and user clarification.
- Repo-local skills for RB source research, memory capture, process maintenance, file uploads, shared global Google persona auth, Gmail drafts, generic signing helpers, signature status sync, task PR, Germany growth, and handoff.
- Optional WhatsApp MCP setup with a pinned `third_party/whatsapp-mcp` submodule, background bridge helper, setup guide, and `rb-whatsapp-comms` skill.
- Communications rule: draft outbound communication in chat, always show sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly after approval, and log to canonical Communications (`https://www.notion.so/1b5e4130131480ab84f3cca356736807`).
- Germany growth communications rule: the `RB Germany Growth System` project is `https://www.notion.so/372e41301314817bb344fbb0a11d9ae8` and is for Tasks only; the growth operating databases live under `RB Client Databases` (`https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`) in the Richmond Blackwood teamspace. American tech workers in Germany / relocating to Germany is the first audience target, not the system boundary. Growth drafts, sends, replies, blockers, and follow-ups use canonical Communications with `Audience Target`, `Growth Channel`, and `Sender Identity` fields. Partnership prospects use existing Business Partners (`https://www.notion.so/a179e21f0e014f4db65bbe59135c9d0f`) with optional `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`; non-partner LinkedIn/Reddit/direct research targets use Growth Targets. Reddit is direct community engagement only for now: no moderator outreach, sponsorship, paid-post, DM, modmail, commercial-counterparty, or Business Partner route from Reddit unless explicitly re-enabled. LinkedIn planning for the first audience uses an internal target of 320 blank connection requests/month, calculated as a 16-request planning baseline across 20 business days, with a normal send range of 15-20 blank requests/business day; personalized invite notes are off by default. The LinkedIn skill may run several times per business day for invite batches, acceptance checks, first-message packets, reply triage, follow-up sweeps, and metrics; first messages must be short, non-salesy, profile-relevant, and conducive to a short call. There is no separate growth outreach database, and the superseded Growth Partnerships source is trashed. Send-ready growth work must block unless Ioana identity is verified.
- Active human operator rule: use ignored `.env.local` key `RB_CODEX_ACTOR="<human name>"` only for operator-specific approval, authorship, source-access attribution, or closeout context. Valid operator names live in `internal/people-roles.md`. A shared mailbox such as `accounting@richmondblackwood.com` is not an actor.
- Common tasks follow-through rule: use `skills/rb-common-tasks-follow-through/SKILL.md` for Gmail/WhatsApp-triggered task follow-through. Inventory open task-capable rows across RB Client Databases first, then discover/read communications, ledger them in canonical Communications, route finance and operational items to the owning task-capable data source, close or advance open work, handle reply plans, and prepare Slack closeout only after task closeout. Stage 1 starts by running `git pull origin main` from the active repo/worktree. Stages 1, 2, 10, and 11 are standing auto-approved within normal scope; after the operator approves the exact Stage 12 Slack closeout text for sending, Stages 13 and 14 are auto-approved. Ioana-authored or Ioana-approved Slack templates are final; for client follow-through, use the latest available Ioana `#rb-client-updates` template exactly, currently `New Correspondence`, `Received invoices`, and `Updated tasks`, and stop if the template or required links/mentions cannot be resolved.
- Common tasks WhatsApp coverage: Stage 3 must use the roster in `skills/rb-common-tasks-follow-through/references/whatsapp-source-roster.md`. The next run must include unresolved/missed Monochromatic, Aaron Chamberlain, PCL/Ricardo, CLV/Celine, and AKS/Ana routes, and must not advance checkpoints for them until they are discovered, read, and backed by approved persistent checkpoint storage.
- Accounting Team Updates triage rule: keep the weekday 11:00 Accounting Team Updates pass separate from inbound communication follow-through; process the current working day's blockers/action points only, treat `New client inbounds` as observed / out of scope, and run the mandatory packet workflow from `skills/rb-accounting-team-updates-triage/SKILL.md`. Stage 1 auto-continues only from clean/no-conflict git state. Stage 3 applies `skills/rb-accounting-team-updates-routing/SKILL.md` to split source rows into atomic create/update/comment/skip/unresolved items, resolve owning operational rows and client projects before Central Tasks, verify target schema/write-back method, and keep unclear rows unresolved until Stage 4 approved write-back. The Stage 5 `#rb-client-updates` closeout is built only from verified Stage 4 results and includes task hyperlinks plus verified assignee Slack tags for each created/updated/commented task; unresolved assignee mentions block Stage 5 unless the operator approves a plain-name no-notification fallback.

## Helper State

The root `package.json` is the local helper registry. Helper scripts are low-level support for connector gaps and verification, not business workflow engines.

Available helper areas:

- Drive organize/upload/export: `skills/rb-file-uploads/scripts/`.
- Gmail sender/thread/signoff rules and verified draft fallback: `skills/rb-gmail-drafts/`.
- Google auth: `skills/rb-google-auth/scripts/`.
- Generic SignNow upload/field/review/status: `skills/rb-signature-workflow/scripts/` and `skills/rb-signature-status-sync/scripts/`.
- Google Doc and PDF mechanical transforms: `drive:transform-google-doc` and `pdf:prepare-signing-plan`.
- Task PR helper: `skills/rb-task-pr/scripts/task_pr.sh`.
- Optional WhatsApp MCP bridge: `setup/mcp/start-whatsapp-bridge.sh`.

Google auth now uses the shared global Codex persona model. Durable Google persona caches, OAuth client files, and MCP credentials belong under `~/.codex`, especially `~/.codex/google-personas/`, not worktree-local `.codex-local`. Gmail and Drive helpers default to no-login/no-reauth: per-persona OAuth vault first, then saved ADC/account-token fallback. `memory/google-auth.md`, `memory/google-personas.md`, and `setup/google-persona-auth.md` are the RB auth references.

Gmail drafts default to `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`, use the repo-local Gmail API helper path with shared global Codex auth storage, and fail closed if Gmail stores another sender. Gmail jobs must keep `Operator`, `Source mailbox(es)`, `From`, `Thread/source`, and Google auth persona/account separate; do not assume all Gmail reads come from accounting or infer the sender/auth route from the active operator.

SignNow helpers are generic mechanics only. RB signer identity, routing order, template catalog, and signing policy are not approved by this port.

WhatsApp MCP is optional and local-only. QR/session state, SQLite databases, downloaded media, transcripts, and personal Codex config must not be committed. Normal WhatsApp reads/sends should use the `whatsapp` MCP tools, not direct REST or SQLite access.

When a client export/backfill uses WhatsApp, resolve and store the selected client contact/group JID in the owning company or individual `communications.md` plus `source-register.md`. The saved JID is a route/source pointer for future approved communication; it does not authorize monitoring, history backfill, media downloads, or outbound messages.

Normal outbound communication should not use software drafts. Compose in chat, show the sender identity, always show `Subject`, source mailbox, and source/reply thread for email, prefer replying in existing email threads, send directly through the supported connector/MCP tool after approval, and store the sent communication in canonical Communications (`https://www.notion.so/1b5e4130131480ab84f3cca356736807`, data source `collection://1b5e4130-1314-8183-afd8-000b6f4da982`). The old RB Communications database (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`) is migration source only.

RB calling bot build state is mapped in `internal/calling-bot-implementation-map.md`, with a full test plan in `internal/calling-bot-test-plan.md`, and the setup guide at `setup/mcp/elevenlabs-n8n.md`. Latest source-controlled live readbacks are under `automation/live-readbacks/`. As of the 2026-05-21 readback, `RB Calls ElevenLabs Events` active version is `c209a5fb-905c-4aa9-877e-9cd1f5ea4d37`; it uses native Notion Call Note creation, treats IVR dead-ends as follow-up/unanswered, and restores Twilio SID extraction from ElevenLabs phone-call metadata. `RB Calls Voice Execution` active version is `4db1b274-d26f-40bb-9519-b0699a324ae7`; it sends `conversation_config_override.agent.language` per call, no longer sends blank `conversation_config_override.agent.first_message` for known Brussels Airlines / Miles & More IVR contacts, and defaults to the ElevenLabs SIP-trunk outbound endpoint now that the Twilio Elastic SIP Trunking phone number is outbound-capable. Set n8n variable `ELEVENLABS_OUTBOUND_CALL_PROVIDER=twilio` only for rollback to the older Twilio Native endpoint. Twilio SIP trunking is documented in `setup/mcp/elevenlabs-n8n.md`, and reusable local helpers exist to import/update an ElevenLabs SIP-trunk phone number and enable SIP out-of-band D-T-M-F. The live `RB Call Bot` is version `agtvrsn_9201ks5mf0ngfryt1ae3vw1h94gp`, has no custom root `tool_ids`, uses dedicated workflow tool nodes for `lookup_call_context`, `request_creator_help`, and `check_creator_help`, and has all root and IVR `play_keypad_touch_tone` tool configs set to `use_out_of_band_dtmf=true` with post-tone speech suppression. German calls depend on n8n sending the ElevenLabs outbound API override `conversation_config_override.agent.language = de`; prompt variables alone are not sufficient. Identifier pronunciation is language-specific across all languages: abbreviations are hyphenated letter runs such as `V-A-T` and `P-O-A`, English remains first-class, commas separate short number groups, periods create longer breaks, and the prompt must not use literal `pause` words or ellipses for spoken timing. If the authority is confused by letters, the agent switches to NATO for English, German Buchstabiertafel for German, or the closest recognized spelling alphabet for the call language. Keep source-controlled `automation/elevenlabs/` limited to reusable diagnostics/utilities; one-off prompt patchers and live mutators belong under ignored `.codex-local/automation/elevenlabs/`.

For airline, travel, booking-change, loyalty-program, Miles & More, AerClub, or frequent-flyer calls involving RB/EIP board members or stakeholders, check the Notion `Board Members & Stakeholders` directory before relying on email evidence. The directory can hold passenger-specific loyalty identifiers, including `Miles & More Frequent Flyer Aer LingusNo` and `AerClub`. Do not copy those private identifiers into git; use the live Notion values when building the call brief.

RB authority call setup has a hard contact-availability gate. Status: provisional. Source: user instruction and live Hamburg contact fix on 2026-05-26. Imported: 2026-05-26. Review: every Front Office Contact selected for a Calls record must have at least one linked `Availabilities` relation before the call is submitted, reviewed, approved, or made live-callable. Page-body schedule notes are not enough. If a Contact lacks linked availability, create or link Contact Availabilities on the Contact, fetch it back, and verify the relation before proceeding. The Hamburg contact `https://www.notion.so/2efe4130131480bb94bac672c2ae5c07` now has Monday-Friday 08:00-12:00 Europe/Berlin phone-support availability records linked from the official Hamburg.de source.

As of the 2026-05-26 live readback, `RB Calls Voice Execution` active version is `89bba696-83ad-4401-bf74-4e2b48c343cd`. The ElevenLabs outbound HTTP node now has a 120-second response timeout so slower SIP startup attempts are not aborted by n8n after 30 seconds. The repo deploy/readback helpers now support n8n MCP authorization headers stored under `[mcp_servers.n8n.http_headers]` in `~/.codex/config.toml`; helpers must still not print tokens.

As of the 2026-05-22 readback, the live `RB Call Bot` is version `agtvrsn_4701ks7t52p4exc9a5s77br92d88`. Its live-help edge prompts distinguish ordinary account identifiers from secrets: service-card, loyalty/frequent-flyer, booking-reference, reservation email/phone, tax-reference, and public registration values should be checked from visible call context or existing approved lookups before live help; P-I-Ns, passwords, one-time codes, security answers, C-V-V/card details, payment authorization, and account-holder/reviewer approvals remain live-help-only. Rejected P-I-N answers, changed P-I-N-position challenges, P-I-N reset emails/links, account-holder resets, and new P-I-N setup are separate live-help issues and must trigger a fresh live-help request rather than reusing a previous answered request. If live help times out or has a read error, the agent must not silently end: it asks whether the contact can wait up to another five minutes, starts one extra live-help request if they agree, and only verbally closes out/end-calls after the contact cannot wait or the extra wait also fails.

## Notion State

Notion is connected.

Fetched and confirmed:

- RB Internal Knowledge Base database.
- Client Databases hub.
- Client Notes & Updates database.
- Companies database.

General SOP/process backup pages created in the RB Internal Knowledge Base:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`
- RB Client Reference Folder Standard: `https://www.notion.so/357e41301314812e9e8fdfd53073359e`
- RB Review And PR Workflow: `https://www.notion.so/357e4130131481029be3d17a8ec2eb8b`
- RB Growth Channels And Creative Review: `https://www.notion.so/357e413013148193ab2ff5a48d9aeb8a`
- RB Authority Calling Service Positioning: `https://www.notion.so/357e4130131481d182d9c138fc228e1e`
- RB Client Offboarding Export Package Rule: `https://www.notion.so/357e41301314810a8be3e30267c35ea6`
- RB Product Offerings Pricing And Bundles - Provisional: `https://www.notion.so/357e4130131481618a54c0346ebfd300`
- RB TCSP Authorisation Grant Date: `https://www.notion.so/357e41301314818eb78fe5bd228e7533`

Client-specific backups use the company `Reference` from Notion Companies. Do not invent client folder slugs.

Earlier non-VUN provisional client backup references were removed because the referenced pages/folders were incorrect. Redo non-VUN client imports only after reading the Notion Companies `Reference` property and confirming the correct destination.

VUN active pilot source records:

- Company: `https://www.notion.so/175e41301314801eaa61ce1977979936`
- Individual / UBO / director: `https://www.notion.so/182e4130131480cead22dd69fd3f2dc7`
- Client project: `https://www.notion.so/32fe41301314802fb985c5fc39d9e3eb`
- Client dashboard: `https://www.notion.so/1c1e41301314811fb006f5721365780d?v=1c1e41301314816abda0000ca16f7f3e`
- Supplied Drive folder: `https://drive.google.com/drive/folders/1R93FDUsJ6WH2U1Bi_G5TdywAW5xFaFbR`

VUN client evidence storage:

- Repo pointers: `clients/Companies/VUN/backup-locations.md` and `clients/Companies/VUN/drive-locations.md`
- Status: the mistaken git-held export package was removed from the PR branch history. Actual downloaded/exported evidence should be uploaded to or located in Drive and linked from repo files.

Nathan Mawali A Vandy individual root:

- Repo folder: `clients/Individuals/Nathan Mawali A Vandy/`
- Linked company: `clients/Companies/VUN/linked-individuals.md`
- Status: personal correspondence, bank account, assets, expenses, legal/solvency, and personal tax filing context found during the VUN pass has been routed into the individual folder.
- 2026-05-06 German personal-tax template status: future German personal-tax work should use the native machine-readable Google Sheets template `RB German Personal Tax Analysis - Machine-Readable Template v1` at `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`. The template supersedes the Nathan/VUN-era separate `codex - ...` workbook-tab workflow for new analyses.
- 2026-05-06 Nathan workbook audit trail: the 2023/2024 VAT workbook and 2025 personal tax workbook still contain the formula-backed Codex annual/discrepancy/investment tabs in Drive as historical audit work. The latest 2025 revision adds `codex - invoices - 2026-05-06` as an invoice evidence index, corrects DappRadar/UAB and Vandy UN as provided invoice evidence, formula-tracks the remaining DappRadar EUR 1,500 as unpaid/unmatched after full bank-statement recheck, classifies USDC as a transfer/stablecoin bridge rather than an investment, restores investment in/out with staking income, and revises bank-reconciliation expense tabs with business-expense rules. Remaining Nathan tax work is payment/source reconciliation, other missing evidence, non-USDC investment cost-basis, N26 October 2025, and receipt/business-purpose support for claimed expenses. New work should be migrated into/copy from the machine-readable template rather than extending the legacy tab pattern.

Selin Ozkohen / CLV German personal-tax pilot:

- Individual folder: `clients/Individuals/Selin Ozkohen/`
- Company folder: `clients/Companies/CLV/`
- 2024 workbook: `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`
- 2024 payslip folder: `https://drive.google.com/drive/folders/1IUAeKdp8IOcuwVYWIty2ykjxsOw9Ofwr`
- Status: revenue rows are populated and linked to Notion payroll pages and Drive payslip evidence. Payslips were attached to the employment-linked payroll-run `Payslip` fields. Remaining workbook failures are prior-year opening balances, expense confirmation, and investment confirmation.
- 2026-05-07 template iteration: the maintained native master template now includes `Deductibles`, `Tax Credits`, `Tax Payments`, `Tax Analysis`, and ELSTER-style `Summary` tabs. Active workflow: copy the maintained native Sheet through the Google Drive/Sheets connector; do not use local TypeScript/XLSX generation. Selin 2024/2025 use the daily home-office allowance / `Tagespauschale` at 210 days x EUR 6 = EUR 1,260, with the room route inactive and `Summary` summing only `home-office-daily`.
- 2026-05-07 approval: user approved the current template/process and Selin pilot state for commit. Payroll revenue now reflects payslip wage-tax withholding/net pay, January/February zero withholding is flagged for explanation, the EUR 9,785.30 healthcare deduction is included pending evidence URL, the Section 10c/Sonderausgaben-Pauschbetrag baseline is included as `Baseline only`, and false-positive tax-payment review counts were repaired. Filing remains incomplete until open questions are resolved.
- 2026-05-07 2025 setup: Notion 2025 filing `https://www.notion.so/342e4130131480eab03dd8498d24d23e` was set to in progress and linked to Drive folder `https://drive.google.com/drive/folders/127-k82-g8Ix3eUGEjLVhbA_1OAglGI7Z`. The copied 2025 workbook is `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`; the payslip folder is `https://drive.google.com/drive/folders/1ustYGqTraDcaqv0LwQSqa1lk6M-vYIMq`. January-June 2025 payroll run `Payslip` fields were linked to Drive PDFs; July-December already had payslips. Revenue read-back is EUR 28,800 gross employment income and EUR 3,096.96 wage tax withheld. The special expense lump-sum baseline read-back is EUR 36, and the home-office daily allowance is EUR 1,260, making 2025 income after deductions EUR 27,504.00. Remaining checks are prior-year opening balance, expense document review, investment/no-investment confirmation, direct tax payment/prepayment confirmation, deductible review, and tax-credit review.
- 2026-05-07 2025 task links: the filing record now links an analysis task assigned to Ioana Surdu-Bob (`https://www.notion.so/359e4130131481dbbb2cecfdf5534d4f`) through `Preparation Task` and a filing task assigned to Johnpaul Okolie (`https://www.notion.so/359e4130131481d88a99df5939bbe6ed`) through `Filing Task`. The filing task is dependent on the analysis task and has an actual Notion comment with the workbook and filing context.

Mark James Frederick Wilshin / WEW German personal-tax update:

- Individual folder: `clients/Individuals/Mark James Frederick Wilshin/`
- Company pointer folder: `clients/Companies/WEW/`
- 2024 source folder: `https://drive.google.com/drive/folders/1muPUJMt8AT3pIf2dGesb6yTfrOBSL83l`
- Current fresh template-copy workbook: `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit`
- Status: earlier Office-mode V3 workbooks and the intermediate corrected machine-readable workbook are superseded. The current workbook is a true Drive-native copy of the maintained template in Mark's supplied folder. Only `Setup`, `Revenue`, `Expenses`, and `Deductibles` were populated from invoice/receipt evidence and operator instruction; calculation tabs and formula cells were left template-driven. After operator review, `Expenses` was corrected to receipt-level rows with exact receipt-file URLs rather than folder-level evidence links. Key read-back values are revenue EUR 22,000, business expenses including business home-office allowance EUR 4,479.95, business/freelance net PNL EUR 17,520.05, TK health/care EUR 6,232.81, other personal deductions EUR 6,268.81, and formula-driven income after deductions before tax-rate calculation EUR 11,251.24.
- Resolved 2026-05-13 operator decisions: EUR 15,000 GbR profit support confirmed; full 2024 MacBook treatment retained under BMF one-year computer-hardware useful-life guidance; 80 percent Telekom mobile and full EE mobile business-use treatments approved; missing M1-3 iCloud support trusted to the client and remains unclaimed; business-meal formality support trusted to the client with the 70 percent limitation already applied. Analysis still needs normal final filing/professional review before submission.

CBMAX client folder:

- Company folder: `clients/Companies/CBMAX/`
- Company Notion record: `https://www.notion.so/c71b32a86f424e63b63945fe63d7b45b`
- Client project: `https://www.notion.so/32fe413013148034830cf9a1281b2f10`
- Client dashboard: `https://www.notion.so/67a175a2d9f44c55853a64f106b44752?v=f446b59bf86e4c469e5eae001bd9222c`
- Canonical Drive folder: `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn`
- Related Drive folders: `02.2_CBMAX_Feb-Dec` (`https://drive.google.com/drive/folders/1VVBKPe3ay_imAejRvxXBhtd9OYMNtxfi`), `03.1_CBMAX_Ireland` (`https://drive.google.com/drive/folders/1qQazvNAgFWuno38GOLAh4lhpzX1_3dCE`), and `CBMAX-payslips` (`https://drive.google.com/drive/folders/1sV3OXjguY9N-5LQ7fKjPWOZ3JwblzscT`) should stay linked from the client folder and be organized under the canonical folder when Drive cleanup is in scope. User confirmed on 2026-05-13 that the canonical folder supersedes the older 2026-05-04 Drive-folder question.
- Client Notes & Updates: no new or updated page is needed just to back up the 2026-05-13 repo summary. Read Client Notes & Updates as context during future CBMAX work, and use it for important client-facing information rather than generic Codex repo-summary backup.
- Fee note: EUR 950 is the discounted monthly rate after six-month bulk payment discount; the client pays H1/H2 in bulk, and H1 has already been paid according to user review, with evidence in Richmond Blackwood invoices.
- Status: first reference-based company context loaded on 2026-05-13. Latest WhatsApp plus user-correction context keeps the 2025 tax/VAT position in limbo: IE VAT `4388950KH` issued and ROS backdate requested from January 2025, but retroactive acceptance is not confirmed, so the 2026-03-30 Irish-VAT/no-German-VAT guidance must not be treated as settled. High-signal open items are Notion tax-history cleanup, ROS final backdate/filing status, Hamburg/Berlin VAT tax-number mismatch, May 2026 letter review, invoice 28 correction trail, and whether to split Eran/Semen/Viktor individual folders before importing private individual detail.
- User clarification: Simon is the employee Semen, and the CBMAX relationship is Employment.

Claudio Brivio individual context:

- Individual folder: `clients/Individuals/Claudio Brivio/`
- Notion individual record: `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`
- 2024 personal tax filing: `https://www.notion.so/2cae413013148064bf7ae889ec16af5c`
- 2025 personal tax filing: `https://www.notion.so/342e41301314803eb579c68638fb3fb0`
- 2024 canonical filing folder: `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe`
- 2024 prior/history folder: `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv`
- Client documents folder: `https://drive.google.com/drive/folders/1GpjMwLVHPKyJ1XR8t2YIrchl23auowv3`
- Uploaded `_2024-tax-filings` package: `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC`
- Fresh 2024 analysis workbook: `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit`
- Preparation task: `https://www.notion.so/35fe41301314813ea514ed9b61092962`
- Filing task: `https://www.notion.so/35fe41301314817b879cc3ab8c4160dc`
- Superseded Office workbook: `https://docs.google.com/spreadsheets/d/1u6pS1K9MfBDn35o96iPgqQ27zxbZ1DG0/edit`
- Status: personal-tax/private context loaded on 2026-05-13; fresh 2024 workbook prepared later the same day from the maintained native template and linked to the live filing via preparation/filing tasks. Operator review on 2026-05-14 approved health/care, home-office, Pixel Buds, and phone; excluded CBMAX February payroll, commute, Telekom internet, and Hallesche non-basic; and instructed that Section 138 AO notifications should be filed for CBMAX and Job Guardian. Current workbook read-back shows 8 failed checks and 27 open missing-info items, mainly CBMAX 2024 Lohnsteuerbescheinigung, N26 investment statement classification, Section 138 late/proactive wording and foreign-company risk review, and optional Freenet invoice extraction. The former company-side question about whether Claudio needs an individual folder is resolved; avoid duplicating Claudio personal-tax detail in CBMAX company files. 2025 filing is pending with no Drive docs recorded in Notion.

AGL / Byron Jarvis Frasier context import:

- Company folder: `clients/Companies/AGL/`.
- Individual folder: `clients/Individuals/Byron Jarvis Frasier/`.
- Notion company: `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e`; `Reference` is `AGL`.
- Canonical Drive folder: `https://drive.google.com/drive/folders/1QnVBrQ0lgDe8UVqZyW9B7zdBMCC_LgAE`, under the external client root.
- Current user-instructed tax position: AGL is mainly Irish tax resident for the company tax-residence field, with an Irish tax number and Ioana as Irish director from inception. It also has a German permanent establishment for Byron/staff, files in IE and DE, attributes 80% of profits to IE and 20% to the German PE, and has filed 2024 in Germany while awaiting Finanzamt feedback. 2024 IE corporation tax remains to be filed after the treatment is settled.
- Current roles: Ioana is the only director; Byron is UBO and board observer.
- Notion update on 2026-05-13: company `Tax Residence` changed from Germany to Ireland after user review; German PE/filings remain tracked through registrations and filing records. The stale payroll-only tax registration task was archived as superseded.
- Weekly Syntentia invoicing: AGL uses a recurring weekly process with separate service and expense invoices for the same week. Byron may provide expenses late; handle reminders through the general recurring finance evidence-aging/reminder process, not a special AGL task. Because services are day-based, ask Byron monthly whether he plans vacation/off days for the next month so weekly service invoices use the correct day count. Live monthly Notion task: `https://www.notion.so/35fe41301314814096b2cdc5beb780fa`. WhatsApp confirms this pattern across Weeks 7, 12-16, 18, and 19. Email format, recipients, and confirmed sender `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` are captured in `clients/Companies/AGL/invoices-payments-expenses.md`.
- Governance: Byron needs quarterly Dublin board meetings as UBO and board observer for the Irish tax-residence position. Drive board-meeting folders currently listed: 2025-08-05, 2025-11-03, 2026-02-24. WhatsApp on 2026-02-24 suggests Byron needed to be remote that week, so check minutes/attendance evidence before treating that folder as in-person attendance proof.
- Byron personal-tax context is routed to the individual folder: Germany personal tax filings for 2024 and 2025, US apartment, US Roth/IRA/brokerage context, personal Wise account, WhatsApp personal-tax/payroll evidence pointers, and SteuerGo data retrieval request from Gmail message `19e20f06924b8d7b`.

SVL / Kristjan Mar Olafsson context import:

- Company folder: `clients/Companies/SVL/`.
- Individual folder: `clients/Individuals/KRISTJAN MAR OLAFSSON/`.
- Notion company: `https://www.notion.so/2cde4130131480b89185d9ba4487a3b3`; `Reference` is `SVL`.
- Notion individual: `https://www.notion.so/2d1e41301314810ca6bbf526246222e5`; folder uses Notion first-name and last-name fields.
- Canonical Drive folder: `https://drive.google.com/drive/folders/19IHrClZjr58Bt15cx9h0KV9RiVzzAC1G`.
- WhatsApp route: `Olafsson, Kristjan | Richmond Blackwood` / `120363409060100858@g.us`; saved as source/route pointer only.
- Current user-instructed position: SVL is the newest client, Kristjan was previously a freelancer, German tax registration is still pending, and RB will do Kristjan's personal tax returns from 2026 onward.
- Current company state: Irish company number 806985, tax residence in Notion Germany, Kristjan is director/UBO/shareholder/employee, active monthly Mediainvesting contract at EUR 93/hour, and company German corporation/trade/VAT/payroll registrations are overdue with Finanzamt/tax registration as blocker.
- High-signal blockers and decisions from user answers on 2026-05-18: no SVL VAT number confirmed and still waiting for Finanzamt; no separate tax-registration chase task should be created in this context because the user will handle it through a separate skill; registrations are overdue with Finanzamt as blocker; Simoneta owns retroactive payroll-tax filings/payments once registration clears; Kristjan was probably already set up in Lexware because RB needs it for invoices; Lexware and WAMO costs are RB-side; Mediainvesting hours/bonus sheet is the canonical monthly source; freelancer deregistration is pending through an open task; RB should set up Kristjan's individual/freelancer ELSTER; the personal-tax Drive year folder was renamed from `2025` to `2026` and verified; AI GreenBytes update is completed but JP needs to upload evidence; apartment amount is about EUR 750k and there was a hurdle with the partner selling his company.

AMC / Aaron Richard Chamberlain context import:

- Company folder: `clients/Companies/AMC/`.
- Individual folder: `clients/Individuals/Aaron Richard Chamberlain/`.
- Notion company: `https://www.notion.so/165e41301314804baeead148b54263de`; `Reference` is `AMC`.
- Notion individual: `https://www.notion.so/165e4130131480c98ea9d9ae497ab5ca`; folder uses Notion first-name and last-name fields.
- Canonical Drive folder: `https://drive.google.com/drive/folders/1a_m5ASzsGDnaViTjeSvawroRVr6cQ-oG`.
- WhatsApp route: `Chamberlain, Aaron | Richmond Blackwood` / `120363378578862576@g.us`; saved as source/route pointer only.
- Current user-instructed position: RB does Aaron's personal returns; previous accountant did not file 2023/2024; RB filed both years and found prior Gewerbe registration created trade-tax/VAT catch-up exposure. Open catch-up periods are 2023, 2024, and Q1 2025; Aaron was deregistered after Q1 2025. Finanzamt requested P&L/balance-sheet support; follow source dates of WhatsApp 2026-05-19 at latest and Notion before 2026-05-22.
- Current company state: Irish company number 781302, tax residence in Notion Germany, Aaron is director/UBO/shareholder/employee, active variable Riot and Echo revenue invoicing, and UVS one-off invoice context. VAT Q1 2026 and the Slack Q4 2025 VAT concern need a separate VAT review rather than being treated as settled in this import.
- High-signal workflow: invoices are not fixed equal-month invoices. Ask Aaron through WhatsApp what to bill and which travel/expense items to include, prepare invoice/expense support, get Aaron approval, then send through accounting email using the historical Riot/Echo formats. Riot and Echo Business Partner invoice-to/CC fields were updated on 2026-05-18 and read back; Riot's Nicole recipient remains in Business Partner notes because the schema has only one invoice email and one CC email. Future previews should use `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`. Live Notion comments with these invoice/template rules were added to the Riot, Echo Sports, and UVS contract pages on 2026-05-18.
- High-signal open items: confirm Q1 2026 VAT filing and Slack Q4 2025 VAT through the separate VAT review, confirm missing invoice support, confirm actual P&L/balance-sheet submission date, confirm remaining balance after garnishment transfer, monitor for Finanzamt payment-plan response, confirm whether P-Konto later becomes active, and decide whether Notion should get multi-recipient invoice routing fields.

NACV / Andrei Nasonov context import:

- Company folder: `clients/Companies/NACV/`.
- Individual folder: `clients/Individuals/Andrei Nasonov/`.
- Notion company: `https://www.notion.so/d97abab7377f4d29b7fb11d4262906c8`; `Reference` is `NACV`.
- Notion individual: `https://www.notion.so/e275d80810824aa7bcc7cf7b7b6fd072`.
- Canonical Drive folder: `https://drive.google.com/drive/folders/1z36VoEjY6jkbqAjxGyRBZD7b323rMd_c`.
- WhatsApp route: `NA Capital Ventures | RB` / `120363399321589278@g.us`; saved as source/route pointer only after user confirmation.
- Current user-instructed position: Andrei was/is RB's first client. RB does his 2024 German personal-tax return for free; from 2025 onward normal-fee treatment is expected but billing mechanics are not decided. He is married, so filings should be joint. 2024 personal tax is pending, and RB wants to coordinate 2024 and 2025 in one workstream while keeping one Notion filing record for each year. No spouse individual folder is needed because she is not a company shareholder.
- Current company state: NACV had registration/prepayment problems and never received clear German prepayment amounts. RB needs Finanzamt notices for 2024/2025 taxes and prepayment amounts, then populate the Tax Prepayments database. VAT was deregistered in October 2025, RB submitted the fix/appeal, and there is no response yet. User says 2024/2025 company taxes were filed, but Finanzamt asked for more information and RB is handling that follow-up.
- High-signal open items: Finanzamt prepayment notices/amounts, VAT reinstatement response, lower VAT cadence, additional company-tax information request/response, Andrei 2024/2025 evidence split, spouse/joint filing evidence, billing mechanics, official personal/director address confirmation, TK/private-insurance treatment, and NACV payslip/wage-tax extraction from Notion/Drive/Lexoffice.

AKS / Anastasia Evgenyevna Kozhevnikova context import:

- Company folder: `clients/Companies/AKS/`.
- Individual folder: `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/`.
- Notion company: `https://www.notion.so/e2fc16cc8be141fdb495231ebdaaddb4`; `Reference` is `AKS`.
- Notion individual: `https://www.notion.so/14de4130131480abb06cdce8ae2e9680`; user confirmed full legal-name folder routing on 2026-05-19, so the individual folder includes `Evgenyevna`.
- Canonical Drive folder candidate: `https://drive.google.com/drive/folders/1h39LjFSNSqlX2INkVJmTfay163L42U4W`.
- WhatsApp route is unresolved: messages were found under `Kova, Ana | Richmond Blackwood`, but `list_chats` failed with `Unexpected response type`, so no JID was saved.
- Current user-instructed position: the AKS subscription includes all Anastasia personal-tax matters; missed 2023 and 2024 personal taxes were filed; 2025 personal and company filings are next; AKS is not overdue except VAT; assume AKS VAT is not filed unless the user says otherwise; Ana replies slowly, so information requests should go out early; any new tax return should use the maintained Codex template.
- Payment-plan and penalties: Ana had Finanzamt debt, RB negotiated a payment plan, and RB must negotiate with Finanzamt ahead of the stop-date review before telling her when to stop paying. The payment-plan sheet is `https://docs.google.com/spreadsheets/d/1igtrASzoRrV7Oc1E8tpeczK0PEX1PDP-NmkUYBqEkJU/edit`. The sheet shows different payoff markers depending on whether 2025/future liabilities and penalties are included, so no stop instruction should be sent without a fresh balance and penalty-status check.
- Live Notion tasks created on 2026-05-19: monitor payment plan and confirm stop date `https://www.notion.so/365e4130131481eb8580f224d0be5adf`; negotiate penalty reduction `https://www.notion.so/365e413013148157b952c94c04d72d90`; request 2025 tax and VAT information early `https://www.notion.so/365e41301314818fbf0fe2dc9edf3cba`.
- High-signal open items: exact WhatsApp JID, Q4 2025 and Q1 2026 VAT filing completion, 2025 company-tax filing record/owner, ELSTER activation before 2026-05-28, penalty-waiver response, final payment-plan stop date, and April 2025 payslip location. January 2025 payslip may not be expected because Ana may not have been employed then.

TPL / Techpacito Limited context import:

- Company folder: `clients/Companies/TPL/`.
- No individual folder was created because user instruction says RB does only the company, not personal taxes.
- Notion company: `https://www.notion.so/1afe41301314801ba185cabd85971769`; `Reference` is `TPL`.
- Notion client project: `https://www.notion.so/32fe413013148053858de308234f56e9`.
- WhatsApp route: `Gupta, Pradeep | Richmond Blackwood` / `120363399422225301@g.us`; saved as source/route pointer only.
- Current user-instructed position: TPL is a new company-only client. Richmond Blackwood is contractor-on-record because Barden cannot contract TPL directly; Barden pays RB, RB forwards money to TPL, and RB charges an additional EUR 70/month for this route. If Barden can work with German VAT after the USt-IdNr./international VAT position is available, the target is to move TPL away from RB contractor-on-record.
- Registrations: user says all registrations have been received except international VAT/USt-IdNr. User clarified on 2026-05-24 that the German tax number acts as the local German tax/VAT registration for 2025, while USt-IdNr. still needs questions submitted. Notion VAT row `https://www.notion.so/1e9e413013148108af4dd5788940476a` was updated to `Registered` / `TPL - DE VAT`; annual-return row `https://www.notion.so/1e9e4130131481099265c96960b24128` reads back as `Registered`. JP-owned Notion task `https://www.notion.so/36be413013148127893fcb3fc99958c8` was created/read back on 2026-05-25 for the remaining USt-IdNr. questions, due 2026-05-29. Public CRO sources confirm CORE is the annual-return filing route and TECHPACITO LIMITED / company number 786441 was registered on 2025-04-16; direct CRO Open Services annual-return checking returned an API-credential error.
- Assets and structuring: Gmail `19dbf3b04574dbd8` shows Pradeep forwarded a Mercedes-Benz eSigning completion email for a Mercedes-Benz VLE 300 electric order. User instruction still expects 75 percent accelerated depreciation in 2025 after final acquisition details are confirmed. The Mercedes-Benz order PDF was downloaded to temporary local storage for verification on 2026-05-25, but the upload to Drive `Correspondance` is blocked until the canonical TPL folder exists. User clarified on 2026-05-25 that Everguard operational/payment detail belongs in Everguard records, not RB client memory.
- Payroll: user confirmed the registered minijob amount is EUR 600/month; Pradeep and Sangita Notion employment rows were updated from EUR 550 to EUR 600 and read back on 2026-05-24.
- Drive folder status: target canonical folder is `02. RB Client Companies/19. Techpacito Limited (TPL)`. The saved `accounting-richmond-blackwood` persona authenticates as `accounting@richmondblackwood.com` but cannot access the parent folder; `ioana-eip` can access it but needs explicit approval before being used for folder creation.
- High-signal open items: JP USt-IdNr. follow-up, deciding whether Barden can work with German VAT after the USt-IdNr./international VAT number is available, canonical Drive folder creation/verification after write-persona access is resolved, Mercedes-Benz order PDF upload to `Correspondance`, car invoice/delivery/financing and BIK/payroll treatment, and payroll worked-hour support.

Communication workflow update:

- Browser/API/MCP boundary from 2026-06-01 user instruction: reject browser use for live workspace or business-system workflows when an API, app connector, MCP tool, or repo-approved helper could support the current plan. Before using browser automation, check whether the current plan can use one of those routes; if unclear, ask the responsible RB team member whether an API/MCP path exists. If possible access is blocked by missing credentials, stop and ask the responsible team member to provision the right keys or credentials through approved secret storage. Do not use browser as a workaround for missing API/MCP access.
- For Slack messages requiring review, put the proposed text in Codex chat first as a rendered, readable preview with clickable named links, not as a fenced raw Markdown/code block. When the runtime exposes a working Codex approval prompt/notification, use it for Slack send approval instead of typed chat approval, especially when the operator requests notification-based approval. Do not claim a notification was sent unless the prompt tool succeeds. If the native prompt is unavailable and the operator approves a popup fallback, use a local macOS approval dialog: the sandbox prompt only authorizes showing the dialog, and Slack may be sent only after the dialog returns the explicit Send choice. After approval, send the approved text directly in Slack; do not create Slack drafts as the default review step.
- For Slack closeouts and manual-post fallbacks, every operational row reference must be a named link, and every responsible-person action/update line must use a resolved Slack mention (`<@USERID>`). Bare responsible-person names are a format failure unless the operator explicitly approves a no-notification fallback for that exact person/message.
- 2026-05-12 inbound-triage closeout correction: Slack closeouts for `#rb-client-updates` must follow the repo/task-oriented template and include the full actual work completed, including any follow-up work after a rejected preview. For the May 8-12 triage, the approval packet must include the created/updated task sections, assignees, one-by-one finance invoice records, Gmail `Triaged` labels applied, remaining blockers, and any material rejected-preview context. Do not call a Slack closeout `corrected` unless replacing or superseding a message that was actually sent, and do not send without explicit approval of the exact rendered message.
- For workflow completion notifications, capture the triggering Slack user/channel/thread at intake when available. If a task is triggered outside Slack and no Slack identity is available, ask the operator for the Slack recipient before sending the ready-for-review message. When personal-tax analysis/operator review unblocks a `Filing Task`, post an approved `#rb-client-updates` update with the filing task as the primary Notion task link, plus workbook, filing record, what changed, and remaining flags.
- For personal-tax filings, the live Notion Personal Tax Filings entry is a required sync point: update `Status` whenever analysis status changes, update `Document gathering status` as evidence moves from `In progress` to `Attached in Drive`, and attach any newly created/discovered Drive filing folder in `GDrive Docs`.
- For personal-tax filings with no task relation, create a preparation/analysis task assigned to Ioana Surdu-Bob and a separate filing task assigned to Johnpaul Okolie. Link both to the correct client project, set filing `Dependent on` to the analysis task, link them back through `Preparation Task` and `Filing Task`, and comment on the filing task with the spreadsheet URL once the analysis is ready.

## Drive State

General Drive archive folder URL is known. The VUN folder supplied by the user listed no files through the connector, and metadata lookup returned not found. Drive writes remain blocked pending review of access and group/external classification.

The Notion offboarding export task is treated as a historical source for the backup/offboarding split. Recurring backup/export evidence belongs in Drive; offboarding zips are created only when explicitly requested for external handover.

## Review State

All imported RB facts are provisional. Review questions are tracked in [open-questions.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/open-questions.md).

The VUN client-reference pass is awaiting user review before senior review, commit, and push workflow starts.

## Verification State

Checks run 2026-05-04:

- `git diff --check`: clean.
- Markdown trailing whitespace scan: clean.
- Prior-template business keyword scans: no remaining matches.
- Client files include Notion backup markers.
- Secret keyword scan only found policy text saying live secrets/tokens/private keys must not be committed.
- TypeScript check skipped because no TypeScript helpers or `package.json` were retained at that time.

Checks run for the 2026-05-05 neutral infrastructure port:

- `npm install`: completed; the final install after removing IMAP/mail-composer dependencies reported zero vulnerabilities and still reported an `@signnow/api-client` engine warning on Node 18.7.0.
- `npm run typecheck`: passed.
- Helper smoke checks passed for Drive organize/upload/export, Gmail alias draft, SignNow upload/get/update/review/status, Google Doc transform, and PDF signing plan.
- `git diff --check`: clean.
- Forbidden source carryover scans found no matches for source company/client/asset names, source sender addresses, source Notion/Drive IDs, or controlled-sharing terminology.

Checks run for the 2026-05-05 WhatsApp MCP port:

- `git submodule status third_party/whatsapp-mcp`: confirmed the pinned compatibility commit.
- `bash -n setup/mcp/start-whatsapp-bridge.sh`: passed.
- `go test ./...` in `third_party/whatsapp-mcp/whatsapp-bridge`: passed after rerunning outside the sandbox so Go could write to its build cache.
- `python3 -m py_compile main.py whatsapp.py audio.py` in the MCP server: passed.
- `npm run typecheck`: passed.
- `git diff --check`: clean.
- Source-specific business keyword scan found no matches outside intentional source-repo references.

Checks run for the 2026-05-06 direct-send communications rule:

- `npm run typecheck`: passed.
- `git diff --check`: clean.
- Gmail draft/delete helper `--help` smoke checks passed.
- Source-specific/conflicting-rule and stale auth-default scans found no problematic matches; remaining IMAP/app-password mentions are intentional prohibitions.

Checks run for the 2026-05-05 VUN recovery branch:

- `git diff --check`: clean.
- `git diff --cached --check`: clean.
- The mistaken VUN git-held evidence commit was removed from the PR branch history before force-push.
- `npm run typecheck`: passed using installed Node 18.17.1 because the repo-pinned Node 18.7.0 is not installed locally.
- Branch pushed and draft PR opened: `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.
