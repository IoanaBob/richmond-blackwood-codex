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

Selin Ozkohen / CLV personal-tax pilot sources are routed to `clients/Individuals/Selin Ozkohen/source-register.md`. CLV company records keep only company-level service, Drive, employment, and payroll context.

CBMAX company sources are routed to `clients/Companies/CBMAX/source-register.md`. The 2026-05-13 load used the Notion company record, project, employment, filing-registration, contract, correspondence, and task records; Drive search/listing for the discovered CBMAX folder; Gmail search for invoice/correspondence threads; WhatsApp chat `Brivio, Claudio | Richmond Blackwood` for latest tax/VAT context; and user clarifications that Simon is Semen, an employee through the Employment relation, and that the 2026-03-30 Irish-VAT/no-German-VAT guidance remains pending retroactive acceptance.

## WhatsApp Sources

Client WhatsApp evidence should be routed into the relevant company or individual client folder as pointers only. Nathan/VUN WhatsApp evidence imported on 2026-05-06 is registered in `clients/Individuals/Nathan Mawali A Vandy/source-register.md`.

CBMAX WhatsApp evidence reviewed on 2026-05-13 is registered in `clients/Companies/CBMAX/source-register.md`. Corrected current status: limbo for 2025, Irish VAT number `4388950KH`, ROS backdate requested from January 2025, but retroactive acceptance not confirmed; do not treat the 2026-03-30 Irish-VAT/no-German-VAT guidance as settled until ROS confirms.

## Public Sources

| Source | Status |
| --- | --- |
| `https://www.richmondblackwood.com/en` | Public website identified; direct extraction limited by JS rendering |
| Public company/web references | Not yet imported as truth |
