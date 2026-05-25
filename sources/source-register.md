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
| Codex thread instruction, 2026-05-19 | AKS/ANA KOVA STUDIO LIMITED context import; Anastasia Evgenyevna Kozhevnikova individual routing; user clarified the subscription includes all personal-tax matters, missed 2023/2024 personal taxes were filed, 2025 personal and company filings are next, AKS is not overdue except VAT, VAT should be assumed not filed unless the user says otherwise, Ana replies slowly, RB must monitor the Finanzamt payment plan before telling Ana when to stop paying, RB needs to negotiate penalty reduction ahead of the stop-date review, and any new tax return should use the maintained Codex template | Routed to `clients/Companies/AKS/`, `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/`, source logs, memory, and live Notion tasks for payment-plan monitoring, penalty negotiation, and early 2025 information request |
| Codex thread instruction/answers, 2026-05-18 | AMC/AARON MEDIC CHAMBERLAIN LIMITED context import; Aaron Richard Chamberlain individual routing; user clarified RB does Aaron's personal returns, prior accountant did not file 2023/2024, RB filed both, prior Gewerbe registration created trade-tax/VAT catch-up exposure for 2023, 2024, and Q1 2025 followed by deregistration, Finanzamt P&L deadlines should follow WhatsApp 2026-05-19 and Notion before-2026-05-22 source dates, VAT Q1 2026 and Slack Q4 2025 VAT need a separate review, payment-plan response is not yet received, P-Konto is not confirmed, and Aaron's variable invoicing requires WhatsApp approval and accounting-email sends following the updated Business Partner fields plus last-pattern notes | Routed to `clients/Companies/AMC/`, `clients/Individuals/Aaron Richard Chamberlain/`, source logs, memory, live Notion comments on the Riot/Echo Sports/UVS contract pages, and live Riot/Echo Business Partner field updates |
| Codex thread instruction/answers, 2026-05-19 | NACV/NA CAPITAL VENTURES LIMITED context import; Andrei Nasonov individual routing; user clarified Andrei was/is RB's first client, 2024 personal tax is free, 2025 onward normal-fee billing mechanics are unclear, filings are joint because he is married, 2024 personal tax is pending but RB wants to coordinate 2024 and 2025 together with one filing record per year, NACV had registration/prepayment issues, VAT was deregistered in October 2025 with appeal submitted and no response, and 2024/2025 company taxes were filed but Finanzamt asked for more information | Routed to `clients/Companies/NACV/`, `clients/Individuals/Andrei Nasonov/`, source logs, and memory; no live Notion records were modified |
| Codex thread instruction, 2026-05-18 | SVL/SOLINOVA LIMITED context import; Kristjan Mar Olafsson individual routing; user clarified SVL is the newest client, Kristjan was a freelancer before, tax registration is still pending, and RB will do Kristjan personal tax returns from 2026 onward | Routed to `clients/Companies/SVL/`, `clients/Individuals/KRISTJAN MAR OLAFSSON/`, source logs, and memory |
| Codex thread answers, 2026-05-18 | SVL/Kristjan review answers: still waiting for tax registration; no tax-registration chase task in this context; registrations are overdue with Finanzamt as blocker; Simoneta owns retroactive payroll tax; Kristjan was probably created in Lexware; Lexware and WAMO costs are RB-side; Mediainvesting hours/bonus sheet is canonical; personal-tax Drive folder should be 2026 and was renamed/verified; tax identifiers should come from the Individuals table; freelancer deregistration pending through open task; RB should set up individual/freelancer ELSTER; AI GreenBytes completed but JP needs to upload; apartment amount about EUR 750k with partner-company-sale hurdle | Routed to `clients/Companies/SVL/`, `clients/Individuals/KRISTJAN MAR OLAFSSON/`, source logs, and memory |
| Codex thread instruction/review, 2026-05-13 | AGL/AGILE LINCS context import, Byron personal-tax routing, weekly Syntentia service/expense invoice process, monthly vacation/off-days check, IE tax residence with German PE and 80/20 profit attribution, 2024 German filings awaiting Finanzamt feedback, pending 2024 IE corporation tax, Ioana as sole director, Byron as UBO/board observer, and Dublin quarterly board-meeting requirement | Routed to `clients/Companies/AGL/`, `clients/Individuals/Byron Jarvis Frasier/`, `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, source logs, and memory; later review updated live Notion `Tax Residence` to Ireland while keeping German PE/filings active |
| WhatsApp chat `Frasier, Byron \| Richmond Blackwood`, 2026-05-13 | AGL/Byron WhatsApp context export: Syntentia day counts, delayed expenses, holiday checks, AGL bond review, 2026-02-24 Dublin/remote board-meeting evidence issue, personal-tax document gathering, and payroll/bank-transfer evidence pointers | Routed to `clients/Companies/AGL/`, `clients/Individuals/Byron Jarvis Frasier/`, source logs, and memory; passwords/raw transcripts/media were not copied into git |
| Codex thread AGL review follow-up, 2026-05-13 | AGL is mainly Ireland for Tax Residence with German PE/filings still active; no Finanzamt feedback yet; Syntentia sender is `Richmond Blackwood Accounting Team`; payroll-only task superseded; create monthly Byron vacation/off-days task | Routed to AGL company files, memory/source logs, live Notion company `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e`, archived task `https://www.notion.so/332e41301314818d8e09ea455a3d61b2`, and new monthly task `https://www.notion.so/35fe41301314814096b2cdc5beb780fa`; provisional for remaining open feedback/board evidence |
| Codex thread AGL Finanzamt packet, 2026-05-25 | User supplied AGL May 2026 Finanzamt letters, 2024 UStVA protocols, 2024 FS PDF, and linked payroll-tax query task; user asked for query response priorities, annual VAT filing start, and draft Finanzamt communications for review | Routed to `clients/Companies/AGL/finanzamt-2026-05-response-plan.md`, `tax-vat-filings.md`, `accounting-bookkeeping-payroll.md`, `drive-locations.md`, `source-register.md`, and `open-questions.md`; no live Finanzamt/ELSTER submissions were sent and the supplied credential was not stored |
| Codex thread AGL skill extraction, 2026-05-25 | User asked that any reusable skill from the AGL Finanzamt task be saved to the repository | Routed to new repo-local skill `skills/rb-finanzamt-response/SKILL.md`, skill index, source/import logs, and durable memory; no live app records were modified |
| Codex thread AGL ELSTER payroll-tax submissions, 2026-05-25 | User explicitly approved submitting the prepared May 2024 Lohnsteuer-Anmeldung and using the same reviewed pattern for matching months | Submitted AGL Lohnsteuer-Anmeldungen for 2024-05 through 2025-04 in live ELSTER, recorded transfer tickets in `clients/Companies/AGL/accounting-bookkeeping-payroll.md` and `finanzamt-2026-05-response-plan.md`, and preserved the no-credential rule; evidence/supporting-message follow-up remains pending |
| Codex thread AGL E-Bilanz final review pack, 2026-05-25 | User asked where the E-Bilanz balance-sheet/P&L workpaper was saved and to make it final, clean, local, and ready for submission work | Built `/Users/jp/Downloads/AGL_2024_E-Bilanz_Final_Review_Pack.xlsx`, updated AGL client records and durable memory, and added an E-Bilanz workpaper guardrail to `skills/rb-finanzamt-response/SKILL.md`; the workbook is not the official XBRL/datensatz and no E-Bilanz transmission was submitted |
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

Byron Jarvis Frasier 2024 German personal-tax sources are routed to `clients/Individuals/Byron Jarvis Frasier/source-register.md`. The 2026-05-15 analysis used Byron's Notion individual, filing, AGL employment, AGL company/project, and related task records; the user-provided Drive 2024 filing folder; the client-provided Jan-Apr previous-employer payroll PDFs; the existing V2 and older workbook files; and a fresh Drive-native copy of the maintained German personal-tax template at `https://docs.google.com/spreadsheets/d/1_V8CzcZiQfxrIi4zTwVBsvwhvKAxxAaN901bxRm0JHk/edit`. The 2026-05-18 healthcare update used the Drive-filed 2024 ottonova Jahresvorsorgeaufwandsbescheinigung and Übertragungswertbescheinigung, recorded the non-basic/private health insurance line after operator instruction but excluded it from included deductions after Sec. 10(4) cap review, logged the 2025 ottonova certificates as future-year evidence, sent/logged the WhatsApp acknowledgement in RB Communications, and completed Notion task/status sync with preparation task `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e` and filing task `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`.

Personal-tax filing-task unblock Slack rule added on 2026-05-14 from user instruction: when analysis/operator review unblocks a `Filing Task`, post an approved `#rb-client-updates` update with the Notion filing task link as the primary task reference, plus workbook, filing record, changed blockers, and remaining flags.

SVL company Drive sources are routed to `clients/Companies/SVL/source-register.md`; Kristjan personal-tax Drive sources are routed to `clients/Individuals/KRISTJAN MAR OLAFSSON/source-register.md`. Canonical company folder: `https://drive.google.com/drive/folders/19IHrClZjr58Bt15cx9h0KV9RiVzzAC1G`. Personal-tax folder: `https://drive.google.com/drive/folders/1zwxIVHdi_2ZFPYOV3-OwQmmsU9S30_7t`, with Kristjan folder `https://drive.google.com/drive/folders/1WL5xpq3-yGHX6b8YWomfpQcLuofUyyqf` and year folder `https://drive.google.com/drive/folders/1kFFLOyVHNAyM6suLQmGO6C4GOio_WHGQ`; user confirmed on 2026-05-18 that the year should be 2026, and the folder was renamed/verified.

NACV company Drive sources are routed to `clients/Companies/NACV/source-register.md`; Andrei personal-tax Drive sources are routed to `clients/Individuals/Andrei Nasonov/source-register.md`. Canonical company folder: `https://drive.google.com/drive/folders/1z36VoEjY6jkbqAjxGyRBZD7b323rMd_c`. Andrei personal-tax parent folder: `https://drive.google.com/drive/folders/1wAXb-4HYg8QjOXUWTAGHN6pYu-lcc3Ir`, with 2024 folder `https://drive.google.com/drive/folders/15UuDjh6pEEXy1oPmhazpaEET6OXS2rH_`, 2025 folder `https://drive.google.com/drive/folders/1ipt8yms6ULNb3pmsvX_vypQt3tlg5-ny`, current 2024 workbook `https://docs.google.com/spreadsheets/d/1MXFMamxILiqEE9tkVRCxx5dVSeC2-5yh-lIdbAzn-c0`, and NACV payslips folder `https://drive.google.com/drive/folders/1hUs5jWfkGlpiLNRXB0anpYfdH8x_5Lfn`.

## WhatsApp Sources

Client WhatsApp evidence should be routed into the relevant company or individual client folder as pointers only. Nathan/VUN WhatsApp evidence imported on 2026-05-06 is registered in `clients/Individuals/Nathan Mawali A Vandy/source-register.md`.

CBMAX WhatsApp evidence reviewed on 2026-05-13 is registered in `clients/Companies/CBMAX/source-register.md`. Corrected current status: limbo for 2025, Irish VAT number `4388950KH`, ROS backdate requested from January 2025, but retroactive acceptance not confirmed; do not treat the 2026-03-30 Irish-VAT/no-German-VAT guidance as settled until ROS confirms.

Claudio Brivio personal-tax WhatsApp evidence reviewed on 2026-05-13 is registered in `clients/Individuals/Claudio Brivio/source-register.md`; the repo stores only source pointers and summarized decisions, not WhatsApp transcripts or media.

MHL/Gabriel WhatsApp evidence reviewed on 2026-05-15 is registered in `clients/Companies/MHL/source-register.md` and `clients/Individuals/GABRIEL LOUIS MANUEL MULLER/source-register.md`. Main route: `Grey Desk Restructuring` / `120363419842553151@g.us`; Gabriel contact search returned `Gabriel Muller` / `33626223154@s.whatsapp.net`, but direct chat lookup errored and user later confirmed the group chat should be preferred. The repo stores only source pointers and summaries, not raw transcripts, audio, or media.

User follow-up on 2026-05-15 confirmed MHL/Gabriel communications should aim to stay in the `Grey Desk Restructuring` group chat. The direct Gabriel WhatsApp contact remains a route pointer only.

SVL/Kristjan WhatsApp evidence reviewed on 2026-05-18 is registered in `clients/Companies/SVL/source-register.md` and `clients/Individuals/KRISTJAN MAR OLAFSSON/source-register.md`. Route: `Olafsson, Kristjan | Richmond Blackwood` / `120363409060100858@g.us`. The repo stores only source pointers and summaries, not raw transcripts or media.

NACV/Andrei WhatsApp evidence reviewed on 2026-05-19 is registered in `clients/Companies/NACV/source-register.md` and `clients/Individuals/Andrei Nasonov/source-register.md`. Route confirmed by user: `NA Capital Ventures | RB` / `120363399321589278@g.us`. The repo stores only source pointers and summaries, not raw transcripts, identifiers, or media.

AMC/Aaron WhatsApp evidence reviewed on 2026-05-18 is registered in `clients/Companies/AMC/source-register.md` and `clients/Individuals/Aaron Richard Chamberlain/source-register.md`. Route: `Chamberlain, Aaron | Richmond Blackwood` / `120363378578862576@g.us`. The repo stores only source pointers and summaries, not raw transcripts, media, bank details, or tax identifiers.

AKS/Anastasia WhatsApp evidence reviewed on 2026-05-19 is registered in `clients/Companies/AKS/source-register.md` and `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/source-register.md`. Messages were found under `Kova, Ana | Richmond Blackwood`, but no JID was saved because `list_chats` failed with `Unexpected response type`. The repo stores only source pointers and summaries, not raw transcripts, media, bank details, payment references, or tax identifiers.

## AKS / Anastasia Sources

AKS company sources are routed to `clients/Companies/AKS/source-register.md`. The 2026-05-19 load used the Notion company record `https://www.notion.so/e2fc16cc8be141fdb495231ebdaaddb4`, project `https://www.notion.so/32fe4130131480bf8690f7201d195d82`, Anastasia individual record, employment, client notes, filings, prepayment records, the canonical Drive folder candidate `https://drive.google.com/drive/folders/1h39LjFSNSqlX2INkVJmTfay163L42U4W`, the payment-plan Google Sheet `https://docs.google.com/spreadsheets/d/1igtrASzoRrV7Oc1E8tpeczK0PEX1PDP-NmkUYBqEkJU/edit`, Gmail ELSTER/Wamo/Stripe/bank-statement threads, WhatsApp `Kova, Ana | Richmond Blackwood`, and Slack VAT-status context. Live Notion tasks were created for payment-plan monitoring, penalty negotiation, and early 2025 information request.

Anastasia personal sources are routed to `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/source-register.md`. The import uses Anastasia's Notion individual record, 2023/2024/2025 personal-tax filings, AKS employment/payroll context, Drive personal-tax folders, the payment-plan sheet, Gmail ELSTER/payment context, and WhatsApp bookkeeping/tax-message pointers.

AGL company Finanzamt May 2026 sources are routed to `clients/Companies/AGL/source-register.md`. The 2026-05-25 follow-up used the live user-reviewed ELSTER annual VAT draft, local source PDFs in Downloads, Notion payroll task `https://www.notion.so/35ce4130131481fbb755c6bce3ff7ef2`, Google Drive source/correspondence files, and the local staging packet `/private/tmp/agl_finanzamt_ready_packet/`. The repo stores source pointers and provisional readings, not ELSTER credentials or raw private evidence files.

## AMC / Aaron Sources

AMC company sources are routed to `clients/Companies/AMC/source-register.md`. The 2026-05-18 load used the Notion company record `https://www.notion.so/165e41301314804baeead148b54263de`, project `https://www.notion.so/328e41301314802993b3f5136bf74a2c`, Aaron individual record, employment record, contracts, filing registrations, VAT tasks, tax prepayment records, Google Drive folder `https://drive.google.com/drive/folders/1a_m5ASzsGDnaViTjeSvawroRVr6cQ-oG`, Gmail invoice/Finanzamt/ELSTER threads, WhatsApp `Chamberlain, Aaron | Richmond Blackwood`, and Slack internal context. Live Notion comments were added to the Riot, Echo Sports, and UVS contract pages with the captured variable-invoice workflow and message-template notes.

Aaron personal sources are routed to `clients/Individuals/Aaron Richard Chamberlain/source-register.md`. The import uses Aaron's Notion individual record, 2023/2024/2025 personal-tax filings, garnishment meeting notes, payment-plan/P&L tasks, Drive personal-tax and previous-accountant folders, Gmail action-points email, and WhatsApp garnishment/P-Konto/joint-filing context.

## SVL / Kristjan Sources

SVL company sources are routed to `clients/Companies/SVL/source-register.md`. The 2026-05-18 load used the Notion company record `https://www.notion.so/2cde4130131480b89185d9ba4487a3b3`, project `https://www.notion.so/32fe4130131480abafdfd5d80e907c29`, Kristjan individual record, employment, contract, filing-registration, payroll, task and Client Notes records, Google Drive folder `https://drive.google.com/drive/folders/19IHrClZjr58Bt15cx9h0KV9RiVzzAC1G`, Gmail ELSTER/Stripe/Lexware/TK threads, WhatsApp `Olafsson, Kristjan | Richmond Blackwood`, and Slack internal context.

Kristjan personal sources are routed to `clients/Individuals/KRISTJAN MAR OLAFSSON/source-register.md`. The import uses Kristjan's Notion individual record, 2026 personal-tax filing, linked personal-tax Drive folders, WhatsApp freelancer deregistration and ELSTER-access context, Gmail TK context, and the SVL company context needed for payroll/personal-tax routing.

## MHL / Gabriel Sources

MHL company sources are routed to `clients/Companies/MHL/source-register.md`. The 2026-05-15 load used the Notion company record `https://www.notion.so/216e413013148051990ae627cf935879`, project `https://www.notion.so/32fe41301314803fa22efa50a08756f3`, director/UBO/shareholder records, filing registrations, contracts, asset records, Google Drive folder `https://drive.google.com/drive/folders/17gpcVLGtX3dhwSaLYelvw6m-dSVCHiQs`, Gmail notary/Zoll/SteuerGo/payment threads, WhatsApp `Grey Desk Restructuring`, and private Slack channels `#rb-structuring` and `#rb-operations`.

Gabriel personal sources are routed to `clients/Individuals/GABRIEL LOUIS MANUEL MULLER/source-register.md`. The import uses Gabriel's Notion individual record, 2024 and 2025 personal-tax filing records, Notion residency/document review, the Notion assets relation, and the MHL/Grey Desk private-channel context needed for personal tax-residence and asset planning.

User follow-up on 2026-05-15 resolved several MHL/Gabriel review points: MHL pays EUR 1k/month by Stripe for the European entity; Grey Desk pays approximately USD 10.5k/month for international support; the Co-KG service is requested but no notary appointment was booked and the current blockers are Byron signing availability plus Gabriel's signature route; the Kastanienallee apartment is intended to move under MHL/Co-KG on a flexible timeline; Zoll remains an open task; future-dated `Overdue` filing statuses are errors; and the MMG investment account is 100% personal and untouched since Gabriel moved to Germany.

## Public Sources

| Source | Status |
| --- | --- |
| `https://www.richmondblackwood.com/en` | Public website identified; direct extraction limited by JS rendering |
| Public company/web references | Not yet imported as truth |

## Automation Platform Sources

| Source | Scope | Import status |
| --- | --- | --- |
| n8n cloud workspace `eipventures.app.n8n.cloud` | RB calling bot validation/review, voice execution, live help, and ElevenLabs event workflows | Provisional map, live workflow updates, and pinned synthetic execution results recorded; credentials and live execution logs excluded |
| ElevenLabs workspace agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1` | RB Call Bot prompt, workflow, tools, phone numbers, and conversations | Provisional map, live-help/IVR workflow updates, and readback results recorded; API keys, call recordings, transcripts, and private phone details excluded |
| Notion Calls database `342e413013148012964ad969a860dd93` | RB authority call request form and linked Company, Individual, Contact schemas | Used as provisional source context for `rb-authority-call-setup`; no client call payloads imported |
