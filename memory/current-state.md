# Current State

Status: provisional.
Imported: 2026-05-04.
Updated: 2026-05-13.

## Repo State

This repository was initialized as the Richmond Blackwood Codex operating repository. The structure has been rebuilt for RB rather than carrying over business-specific content from the reference format.

Current implementation includes:

- Durable storage rules.
- RB process map and SOP mirror.
- Source register and import log.
- Root npm/TypeScript helper layer with Drive, Gmail, generic SignNow, Google Doc transform, PDF signing-plan, and task PR helper scripts.
- Company profile, service positioning, systems context, and internal history.
- Product offerings, pricing signals, historical bundles, and emerging offer catalogue at `internal/product-offerings.md`.
- Provisional RB calling bot implementation map at `internal/calling-bot-implementation-map.md`.
- Reference-based client folder pilot under `clients/Companies/VUN/`.
- VUN/Nathan evidence pointer structure; downloaded/exported client evidence should live in Drive, not git.
- Individual client root pilot under `clients/Individuals/Nathan Mawali A Vandy/`.
- Repo-local skills for RB source research, memory capture, process maintenance, file uploads, Google auth, Gmail drafts, generic signing helpers, signature status sync, task PR, and handoff.
- Optional WhatsApp MCP setup with a pinned `third_party/whatsapp-mcp` submodule, background bridge helper, setup guide, and `rb-whatsapp-comms` skill.
- Communications rule: draft outbound communication in chat, always show sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly after approval, and log to RB Communications.
- Inbound operating triage rule: process client-speaking communications first, prioritizing Gmail inbox and WhatsApp topic extraction; split finance items before other work; create tasks for actionable RB-side commitments; use supporting systems only when needed to save, verify, route, or notify.

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

Gmail drafts default to `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`, always use the repo-local gcloud-managed Gmail API helper path for Gmail drafting actions, and fail closed if Gmail stores another sender.

SignNow helpers are generic mechanics only. RB signer identity, routing order, template catalog, and signing policy are not approved by this port.

WhatsApp MCP is optional and local-only. QR/session state, SQLite databases, downloaded media, transcripts, and personal Codex config must not be committed. Normal WhatsApp reads/sends should use the `whatsapp` MCP tools, not direct REST or SQLite access.

Normal outbound communication should not use software drafts. Compose in chat, show the sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly through the supported connector/MCP tool after approval, and store the sent communication in RB Communications (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`, data source `collection://3b849ad0-96b7-4972-a1ac-1a0203300e7b`). Do not use the Everguard/research Communications table for RB records.

RB calling bot build state is mapped in `internal/calling-bot-implementation-map.md`, with a full test plan in `internal/calling-bot-test-plan.md`, and the setup guide at `setup/mcp/elevenlabs-n8n.md`. Latest source-controlled live readbacks are under `automation/live-readbacks/`. As of the latest 2026-05-13 readback, current active n8n calling workflow versions are `RB Calls Voice Execution` `360489d3-02da-4a84-bfbd-0a0d168054e9`, `RB Calls Live Help` `9d2ea23e-ffaa-451e-b98a-8628fa9a9ac1`, `RB Calls ElevenLabs Events` `29dc070e-2951-4f7f-931b-6b24ea793fc5`, and `RB Calls Context Lookup` `b8b439eb-0587-4600-a93a-89a27ca2e8fc`. `RB Calls ElevenLabs Events` also has current draft version `48d12009-db89-4c75-8df1-6e48564f12ed`, so review draft-versus-active behavior before publishing or assuming production changed. The live `RB Call Bot` is version `agtvrsn_0701krha08p6ewwv0fygbnjv0k6p`, has no custom root `tool_ids`, and uses dedicated workflow tool nodes for `lookup_call_context`, `request_creator_help`, and `check_creator_help`. German calls depend on n8n sending the ElevenLabs outbound API override `conversation_config_override.agent.language = de`; prompt variables alone are not sufficient. Identifier pronunciation is language-specific across all languages: abbreviations are hyphenated letter runs such as `V-A-T` and `P-O-A`, English remains first-class, commas separate short number groups, periods create longer breaks, and the prompt must not use literal `pause` words or ellipses for spoken timing. If the authority is confused by letters, the agent switches to NATO for English, German Buchstabiertafel for German, or the closest recognized spelling alphabet for the call language. Keep source-controlled `automation/elevenlabs/` limited to reusable read-only diagnostics/utilities; one-off prompt patchers and live mutators belong under ignored `.codex-local/automation/elevenlabs/`.

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

Communication workflow update:

- For Slack messages requiring review, put the proposed text in Codex chat first as a rendered, readable preview with clickable named links, not as a fenced raw Markdown/code block. When the runtime exposes a working Codex approval prompt/notification, use it for Slack send approval instead of typed chat approval, especially when the operator requests notification-based approval. Do not claim a notification was sent unless the prompt tool succeeds. If the native prompt is unavailable and the operator approves a popup fallback, use a local macOS approval dialog: the sandbox prompt only authorizes showing the dialog, and Slack may be sent only after the dialog returns the explicit Send choice. After approval, send the approved text directly in Slack; do not create Slack drafts as the default review step.
- 2026-05-12 inbound-triage closeout correction: Slack closeouts for `#rb-client-updates` must follow the repo/task-oriented template and include the full actual work completed, including any corrective work after a rejected draft. For the May 8-12 triage, the approval packet must include the created/updated task sections, assignees, one-by-one finance invoice records, Gmail `Triaged` labels applied, remaining blockers, and any rejected/corrected Slack draft context. Do not send without explicit approval of the exact corrected text.
- For workflow completion notifications, capture the triggering Slack user/channel/thread at intake when available. If a task is triggered outside Slack and no Slack identity is available, ask the operator for the Slack recipient before sending the ready-for-review message.
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
