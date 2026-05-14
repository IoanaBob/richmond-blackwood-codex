# Source Register

Status: provisional.
Imported: 2026-05-04.

## Local Sources

| Source | Scope | Import status |
| --- | --- | --- |
| `my-memory/memory/companies/richmond-blackwood` | Prior company memory, profile, services, operations, systems, strategy, communications | Partial import complete |
| `richmond-blackwood-landing` | Public landing app, DatoCMS, lead form, HubSpot booking, Stripe/API flow | Partial import complete |
| `richmond_blackwood_backend` | Rails API, leads, companies, accounting integrations, document ingestion | Partial import complete |
| `everguard-research-codex` | Neutral Codex operating infrastructure, npm helper patterns, memory/process/skill standards, optional WhatsApp MCP setup patterns | Neutral infrastructure and WhatsApp MCP setup ported; company-specific workflows excluded |

## Notion Sources

| Source | URL | Status |
| --- | --- | --- |
| RB Internal Knowledge Base | `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc` | Schema fetched, general backup target confirmed |
| Client Databases | `https://www.notion.so/f272baa16c3b45069cbd896624e04b5c` | Hub fetched |
| Client Notes & Updates | `https://www.notion.so/5147c93c526f48e9848cb7a2b49e526b` | Schema fetched |
| Companies | `https://www.notion.so/39b8a3066e0b481c99087d7a0fd9e1b2` | Schema fetched |
| Personal Tax Filings | `https://www.notion.so/206e41301314800493d2e00f69621528` | Schema fetched; used for filing `Status`, `Document gathering status`, and `GDrive Docs` sync rules |
| Tasks | `collection://25de4130-1314-8158-af69-000b6c9fb49e` | Schema fetched; used for personal-tax analysis/filing task-pair rules |
| `[Annually] Personal Tax Filing` task template | `https://www.notion.so/32ee413013148090a435e5858b918f25` | Template fetched; used for personal-tax analysis task creation when a filing has no preparation task |
| Claudio Brivio individual and filing records | `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`; `https://www.notion.so/2cae413013148064bf7ae889ec16af5c`; `https://www.notion.so/342e41301314803eb579c68638fb3fb0` | Used for 2026-05-13 individual context routing under `clients/Individuals/Claudio Brivio/` |

## Slack Sources

Provisional channels found during search:

- `#all-richmond-blackwood`
- `#rb-operations`
- `#rb-calls`
- `#rb-structuring`
- `#rb-accounting-and-finance`
- `#rb-management`

Themes observed:

- Internal Knowledge Base links.
- Payroll process references.
- Authority liaison and POA themes.
- Revenue, liquidity, payments, accounting aliases, and operational tasks.

## Gmail Sources

Searches found accounting and invoice operation threads for RB and client aliases. Specific private client fragments were routed into the matching `clients/Companies/<client-reference>/` folders.

## User Instruction Sources

| Source | Scope | Status |
| --- | --- | --- |
| Codex thread instruction/review, 2026-05-13 | AGL/AGILE LINCS context import, Byron personal-tax routing, weekly Syntentia service/expense invoice process, monthly vacation/off-days check, IE tax residence with German PE and 80/20 profit attribution, 2024 German filings awaiting Finanzamt feedback, pending 2024 IE corporation tax, Ioana as sole director, Byron as UBO/board observer, and Dublin quarterly board-meeting requirement | Routed to `clients/Companies/AGL/`, `clients/Individuals/Byron Jarvis Frasier/`, `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, source logs, and memory; later review updated live Notion `Tax Residence` to Ireland while keeping German PE/filings active |
| WhatsApp chat `Frasier, Byron \| Richmond Blackwood`, 2026-05-13 | AGL/Byron WhatsApp context export: Syntentia day counts, delayed expenses, holiday checks, AGL bond review, 2026-02-24 Dublin/remote board-meeting evidence issue, personal-tax document gathering, and payroll/bank-transfer evidence pointers | Routed to `clients/Companies/AGL/`, `clients/Individuals/Byron Jarvis Frasier/`, source logs, and memory; passwords/raw transcripts/media were not copied into git |
| Codex thread AGL review follow-up, 2026-05-13 | AGL is mainly Ireland for Tax Residence with German PE/filings still active; no Finanzamt feedback yet; Syntentia sender is `Richmond Blackwood Accounting Team`; payroll-only task superseded; create monthly Byron vacation/off-days task | Routed to AGL company files, memory/source logs, live Notion company `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e`, archived task `https://www.notion.so/332e41301314818d8e09ea455a3d61b2`, and new monthly task `https://www.notion.so/35fe41301314814096b2cdc5beb780fa`; provisional for remaining open feedback/board evidence |
| Codex thread instruction, 2026-05-13 | Client exports/backfills that use WhatsApp should also store the resolved client chat/contact ID so future approved communication can find the route | Routed to `AGENTS.md`, `processes/knowledge-backup-and-source-control.md`, `processes/communications.md`, WhatsApp/source/client-file skills, client templates, and memory; provisional pending use in future client exports |
| Codex thread diff review, 2026-05-11 | Workhub invoice validation is not an edge case and should live directly in the RBL invoices/payments/expenses domain file; RB-side commitments such as “we will do/look/check/tell/update/send” should create or update tasks when actionable | Routed to `clients/Companies/RBL/invoices-payments-expenses.md`, removed `clients/Companies/RBL/edge-cases.md`, updated inbound triage and communications rules, and recorded memory/source logs; provisional pending review |
| Codex thread workflow review, 2026-05-11 | Inbound operating triage should prioritize Gmail inbox then WhatsApp topic extraction, ignore Slack/signatures/files as inbound channels, split invoices/expenses before other work, route contractor/business-partner invoices through Business Partners/contracts/contract-linked Invoicing with existing paid/completed records checked before Expenses, group remaining correspondence/tasks by company and topic, include translations in tasks, and send one assignee-tagged Slack closeout per triage when requested | Routed to `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, process/skill indexes, `memory/handoff.md`, `memory/open-questions.md`, and `memory/skill-runs.md`; provisional pending next live run validation |
| Codex thread PR review, 2026-05-11 | Generalized triage should support multiple tasks per inbound item when workstreams differ, internal-team-originated client tasks, related-record links on tasks, run change ledger reporting, and explicit WhatsApp checkpoint ordering | Routed to `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, and `memory/skill-runs.md`; approved |
| Codex thread review, 2026-05-11 | Generalized triage channel windows should be concrete per channel rather than described as “smallest useful window” | Routed to `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, and `memory/skill-runs.md`; approved |
| Codex thread PR review, 2026-05-11 | Gmail `Triaged` handling is a general accounting/client inbox rule, and Slack-originated task creation should be acknowledged in the source Slack thread with task URL and assignee | Routed to `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, and `memory/skill-runs.md`; Gmail rule remains approved; Slack-source handling is superseded for the Gmail/WhatsApp communication-first triage by the 2026-05-11 workflow review |
| Codex thread instruction, 2026-05-11 | Replace Gmail-specific inbound triage with generalized inbound operating triage across configured channels, active-work matching, safe direct writes, and batched approval packets | Routed to `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, process/skill indexes, and memory/import logs; provisional pending next live multi-channel run; later narrowed by communication-first review |
| Codex thread instruction, 2026-05-08 | General Gmail triage process should reference company-specific exception files instead of duplicating volatile exception details | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; approved |
| Codex thread instruction, 2026-05-08 | Workhub exception lookup should be targeted by invoice/supplier signal rather than broad exception scanning | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; approved |
| Codex thread instruction, 2026-05-10 | Gmail triage edge cases should use a per-client edge-case file and the skill should point to the exact entry to load | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, and `clients/Companies/RBL/invoices-payments-expenses.md`; superseded by 2026-05-11 review that Workhub is normal invoice validation, not an edge case |
| Codex thread review, 2026-05-08 | Verified no-op Gmail messages should be labelled `Triaged` without creating Notion/Drive/Slack artifacts, and no-action runs should not post Slack | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, and `memory/skill-runs.md`; provisional pending next live run validation |
| Codex thread instruction, 2026-05-08 | Whole-branch Gmail triage performance review without functionality changes | Routed to process/skill performance rules, process/skill indexes, automation memory, and skill-run log; provisional pending next live run validation |
| Codex thread instruction, 2026-05-08 | Remove old incorrect Gmail triage process/memory paths after accepted final Slack update | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, automation memory, and RBL Workhub memory; approved for current canonical run |
| Codex thread instruction, 2026-05-08 | Gmail triage Slack overview must use New Correspondence, New Expenses, and Received Invoices sections with row-level links/tasks/owners | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; provisional pending next run validation |
| Codex thread instruction, 2026-05-08 | RBL Workhub addressee and plan schedule rule | Routed to `clients/Companies/RBL/invoices-payments-expenses.md`; provisional pending VAT and upgraded-company review |

## Google Drive Sources

Searches found RB finance/accounting materials, employment contracts, financial analysis docs, task spreadsheets, invoices, and the general archive folder. Client Drive folder routing remains pending review where group/external classification was unclear.

Nathan/VUN personal-tax and VAT evidence found through Drive, WhatsApp, and user-provided workbook links is routed to `clients/Individuals/Nathan Mawali A Vandy/`; raw evidence remains in Drive.

The active machine-readable German personal-tax template is the native Google Sheet `RB German Personal Tax Analysis - Machine-Readable Template v1`: `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`. It supersedes the separate Codex-tab pattern for future German personal-tax analyses. The maintained native Sheet is the source of truth and should be copied through the Google Drive/Sheets connector for client files; local template-builder scripts are not part of the active workflow.

Future German personal-tax operator prompt is recorded in `processes/personal-tax-return-prompt.md`. It was added after the Mark/WEW correction on 2026-05-13 to make future requests explicit about fresh template copies, formula-tab protection, invoice/receipt-backed rows, exact evidence URLs, Notion task links, and read-back verification.

Selin Ozkohen / CLV personal-tax pilot sources are routed to `clients/Individuals/Selin Ozkohen/source-register.md`. CLV company records keep only company-level service, Drive, employment, and payroll context.

Mark James Frederick Wilshin / WEW 2024 personal-tax update sources are routed to `clients/Individuals/Mark James Frederick Wilshin/source-register.md`. The current workbook is the fresh true template-copy Google Sheet at `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit` in Mark's supplied Drive folder; earlier Office-mode V3 outputs and the intermediate corrected machine-readable workbook are superseded. Only `Setup`, `Revenue`, `Expenses`, and `Deductibles` were populated from invoice/receipt evidence and operator instruction; calculation tabs and formula cells remain template-driven. After operator review, `Expenses` was corrected to use receipt-level rows with exact receipt-file URLs rather than folder-level links. The 2026-05-13 operator review resolved the former GbR profit, MacBook, mobile business-use, missing M1-3 iCloud, and business-meal formality questions. Raw evidence remains in Drive; the repo keeps pointers, analysis notes, and resolved decision notes only.

CBMAX company sources are routed to `clients/Companies/CBMAX/source-register.md`. The 2026-05-13 load used the Notion company record, project, employment, filing-registration, contract, correspondence, and task records; Drive search/listing for the discovered CBMAX folder; Gmail search for invoice/correspondence threads; WhatsApp chat `Brivio, Claudio | Richmond Blackwood` for latest tax/VAT context; and user clarifications that Simon is Semen, an employee through the Employment relation, and that the 2026-03-30 Irish-VAT/no-German-VAT guidance remains pending retroactive acceptance.

User review on 2026-05-13 confirmed the CBMAX Drive folder `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn`, clarified the EUR 950 RB monthly fee as the discounted rate from six-month H1/H2 bulk billing with H1 already paid, and resolved the Claudio individual-folder question because Claudio personal-tax context was imported separately.

User follow-up confirmation on 2026-05-13 confirmed `05. CBMAX Forgemate Ventures Limited (CBMAX)` supersedes the older pending Drive-folder question from the 2026-05-04 provisional import, and confirmed related folders `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, and `CBMAX-payslips` should be linked from the CBMAX client folder and organized under the canonical folder when Drive cleanup is in scope.

User review on 2026-05-13 confirmed the CBMAX 2026-05-13 repo summary does not need a new or updated Client Notes & Updates page. Client Notes & Updates should be read as context and used for important client-facing information, not generic Codex repo-summary backup. The Slack closeout rule about listing only added/modified Notion records is a general client-backfill process rule, not a CBMAX-specific open question.

Claudio Brivio personal-tax/private individual sources are routed to `clients/Individuals/Claudio Brivio/source-register.md`. The 2026-05-13 load used Claudio's Notion individual/employment/personal-tax filing/task records, the Drive 2024 personal-tax folder and `_2024-tax-filings` package, the Drive tracker and notes for Steuerberater, WhatsApp personal-tax updates, and Gmail searches that found no dedicated personal-tax email thread.

Claudio Brivio 2024 operator review on 2026-05-14 is routed to `clients/Individuals/Claudio Brivio/source-register.md`. It approved the workbook health/care and deduction decisions, excluded CBMAX February payroll/commute/internet/Hallesche non-basic amounts, and instructed Section 138 AO notifications for CBMAX and Job Guardian.

Personal-tax filing-task unblock Slack rule added on 2026-05-14 from user instruction: when analysis/operator review unblocks a `Filing Task`, post an approved `#rb-client-updates` update with the Notion filing task link as the primary task reference, plus workbook, filing record, changed blockers, and remaining flags.

## WhatsApp Sources

Client WhatsApp evidence should be routed into the relevant company or individual client folder as pointers only. Nathan/VUN WhatsApp evidence imported on 2026-05-06 is registered in `clients/Individuals/Nathan Mawali A Vandy/source-register.md`.

CBMAX WhatsApp evidence reviewed on 2026-05-13 is registered in `clients/Companies/CBMAX/source-register.md`. Corrected current status: limbo for 2025, Irish VAT number `4388950KH`, ROS backdate requested from January 2025, but retroactive acceptance not confirmed; do not treat the 2026-03-30 Irish-VAT/no-German-VAT guidance as settled until ROS confirms.

Claudio Brivio personal-tax WhatsApp evidence reviewed on 2026-05-13 is registered in `clients/Individuals/Claudio Brivio/source-register.md`; the repo stores only source pointers and summarized decisions, not WhatsApp transcripts or media.

## Public Sources

| Source | Status |
| --- | --- |
| `https://www.richmondblackwood.com/en` | Public website identified; direct extraction limited by JS rendering |
| Public company/web references | Not yet imported as truth |
