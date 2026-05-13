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
- Reference-based client folder pilot under `clients/Companies/VUN/`.
- Reference-based CBMAX company client folder under `clients/Companies/CBMAX/`, loaded on 2026-05-13 from Notion, Drive, Gmail, WhatsApp, and user clarification.
- VUN/Nathan evidence pointer structure; downloaded/exported client evidence should live in Drive, not git.
- Individual client root pilot under `clients/Individuals/Nathan Mawali A Vandy/`.
- Individual client root for Claudio Brivio under `clients/Individuals/Claudio Brivio/`, loaded on 2026-05-13 from Notion, Drive, WhatsApp, and Gmail search pointers for German personal-tax routing.
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

When a client export/backfill uses WhatsApp, resolve and store the selected client contact/group JID in the owning company or individual `communications.md` plus `source-register.md`. The saved JID is a route/source pointer for future approved communication; it does not authorize monitoring, history backfill, media downloads, or outbound messages.

Normal outbound communication should not use software drafts. Compose in chat, show the sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly through the supported connector/MCP tool after approval, and store the sent communication in RB Communications (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`, data source `collection://3b849ad0-96b7-4972-a1ac-1a0203300e7b`). Do not use the Everguard/research Communications table for RB records.

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
- 2024 Drive folder: `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv`
- Client documents folder: `https://drive.google.com/drive/folders/1GpjMwLVHPKyJ1XR8t2YIrchl23auowv3`
- Uploaded `_2024-tax-filings` package: `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC`
- Analysis spreadsheet file: `https://docs.google.com/spreadsheets/d/1u6pS1K9MfBDn35o96iPgqQ27zxbZ1DG0/edit`
- Status: personal-tax/private context loaded on 2026-05-13. The former company-side question about whether Claudio needs an individual folder is resolved; avoid duplicating Claudio personal-tax detail in CBMAX company files. 2024 is in progress in Notion and evidence exists in Drive, but review remains open for February 2024 CBMAX payroll, CBMAX 2024 Lohnsteuerbescheinigung, TK/Hallesche reconciliation, Section 138 AO filing approach for CBMAX and Job Guardian, Joblift Reisekosten vs Pendlerpauschale, and whether the existing `.xlsx` analysis should be migrated to the maintained native machine-readable template. 2025 filing is pending with no Drive docs recorded in Notion.

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
