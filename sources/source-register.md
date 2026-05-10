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
| Codex thread instruction, 2026-05-08 | General Gmail triage process should reference company-specific exception files instead of duplicating volatile exception details | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; approved |
| Codex thread instruction, 2026-05-08 | Workhub exception lookup should be targeted by invoice/supplier signal rather than broad exception scanning | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; approved |
| Codex thread instruction, 2026-05-10 | Gmail triage edge cases should use a per-client edge-case file and the skill should point to the exact entry to load | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, `clients/Companies/RBL/edge-cases.md`, and `clients/Companies/RBL/invoices-payments-expenses.md`; approved |
| Codex thread review, 2026-05-08 | Verified no-op Gmail messages should be labelled `Triaged` without creating Notion/Drive/Slack artifacts, and no-action runs should not post Slack | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, and `memory/skill-runs.md`; provisional pending next live run validation |
| Codex thread instruction, 2026-05-08 | Whole-branch Gmail triage performance review without functionality changes | Routed to process/skill performance rules, process/skill indexes, automation memory, and skill-run log; provisional pending next live run validation |
| Codex thread instruction, 2026-05-08 | Remove old incorrect Gmail triage process/memory paths after accepted final Slack update | Routed to `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, automation memory, and RBL Workhub memory; approved for current canonical run |
| Codex thread instruction, 2026-05-08 | Gmail triage Slack overview must use New Correspondence, New Expenses, and Received Invoices sections with row-level links/tasks/owners | Routed to `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`; provisional pending next run validation |
| Codex thread instruction, 2026-05-08 | RBL Workhub addressee and plan schedule rule | Routed to `clients/Companies/RBL/edge-cases.md`; `clients/Companies/RBL/invoices-payments-expenses.md` keeps only a pointer; provisional pending VAT and upgraded-company review |

## Google Drive Sources

Searches found RB finance/accounting materials, employment contracts, financial analysis docs, task spreadsheets, invoices, and the general archive folder. Client Drive folder routing remains pending review where group/external classification was unclear.

Nathan/VUN personal-tax and VAT evidence found through Drive, WhatsApp, and user-provided workbook links is routed to `clients/Individuals/Nathan Mawali A Vandy/`; raw evidence remains in Drive.

The active machine-readable German personal-tax template is the native Google Sheet `RB German Personal Tax Analysis - Machine-Readable Template v1`: `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`. It supersedes the separate Codex-tab pattern for future German personal-tax analyses. The maintained native Sheet is the source of truth and should be copied through the Google Drive/Sheets connector for client files; local template-builder scripts are not part of the active workflow.

Selin Ozkohen / CLV personal-tax pilot sources are routed to `clients/Individuals/Selin Ozkohen/source-register.md`. CLV company records keep only company-level service, Drive, employment, and payroll context.

## WhatsApp Sources

Client WhatsApp evidence should be routed into the relevant company or individual client folder as pointers only. Nathan/VUN WhatsApp evidence imported on 2026-05-06 is registered in `clients/Individuals/Nathan Mawali A Vandy/source-register.md`.

## Public Sources

| Source | Status |
| --- | --- |
| `https://www.richmondblackwood.com/en` | Public website identified; direct extraction limited by JS rendering |
| Public company/web references | Not yet imported as truth |
