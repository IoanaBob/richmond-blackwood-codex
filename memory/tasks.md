# Tasks

Status: active.
Imported: 2026-05-04.

## Active

| Task | Created |
| --- | --- |
| Ask user to review the VUN client-reference pilot. | 2026-05-05 |
| Confirm whether VUN domain details should also be entered in specific databases such as Invoicing, Filings, Payroll, Employment, Tax Payments, Bank Accounts, or Client Notes & Updates. | 2026-05-05 |
| Confirm VUN Drive folder access and group/external classification. | 2026-05-05 |
| Backfill missing VUN relation-filtered Notion tables, including Assets, Tax Payments, Tax Prepayments, filings, invoice/payment records, correspondence, contracts, payroll, employment, and task history. | 2026-05-05 |
| Audit VUN and Nathan correspondence records for entity-routing mistakes; when found, link the correct individual/company first and then unlink the incorrect entity in Notion. | 2026-05-05 |
| Create company and individual Client Notes & Updates backup pages for VUN/Nathan after user review. | 2026-05-05 |
| Analyse Meta, Reddit, and Google ads accounts when the user asks for a specific account-analysis task. | 2026-05-04 |
| Resolve access to the video creative Drive folder. | 2026-05-04 |
| Review static creative batches in Figma in more depth, using a new tab for each batch. | 2026-05-04 |
| Evolve tax-savings creatives into Authority Calling / Authority Liaison positioning after claim review. | 2026-05-04 |
| Review `internal/product-offerings.md` and classify products as active, paused, historical, or experimental. | 2026-05-05 |
| Find the original Q3 2025 pricing draft and import actual prices if available. | 2026-05-05 |
| Confirm whether DatoCMS EUR 99 / EUR 19 consult pricing and "Free Forever" language are active or legacy. | 2026-05-05 |
| After user review confirmation, run senior team-member review, apply findings, commit, push, then run architecture review. | 2026-05-05 |
| Confirm RB signing policy, signer identity, routing order, and whether SignNow is an active standard signing tool. | 2026-05-05 |
| Confirm whether RB should enable optional WhatsApp MCP for all operators or only this local Codex setup. | 2026-05-05 |
| Confirm which WhatsApp account/number should be linked for RB work. | 2026-05-05 |
| Finalise Nathan 2025 personal tax audit after the missing N26 October 2025 statement, invoice/receipt evidence, Revolut GBP FX review, prepayment amounts, and non-USDC investment cost-basis lots are supplied or confirmed in Drive. | 2026-05-06 |
| Monitor AKS Finanzamt payment plan and confirm stop date before telling Ana to stop paying: `https://www.notion.so/365e4130131481eb8580f224d0be5adf`. | 2026-05-19 |
| Negotiate AKS Finanzamt penalty reduction or waiver ahead of the stop-date review: `https://www.notion.so/365e413013148157b952c94c04d72d90`. | 2026-05-19 |
| Request AKS/Anastasia 2025 tax and VAT information early because Ana replies slowly: `https://www.notion.so/365e41301314818fbf0fe2dc9edf3cba`. | 2026-05-19 |
| Monitor HardSoft Mac quote follow-up call `RBCALL-43` and update the EIP computer-order trail once HardSoft confirms the right order email/contact and quote process. | 2026-06-08 |

## Done

| Task | Created | Completed |
| --- | --- | --- |
| Fixed Hamburg Front Office Contact by linking Monday-Friday availability records, hardened RB authority-call setup so missing linked contact availability is a hard blocker, and increased n8n outbound-call startup timeout to 120 seconds. | 2026-05-26 | 2026-05-26 |
| Added RB active human operator and mailbox routing rules separating `RB_CODEX_ACTOR`, Gmail source mailbox, and Gmail sender identity. | 2026-05-24 | 2026-05-24 |
| Ported shared global Google persona/OAuth helper model from personal-codex into RB helpers and memory. | 2026-05-25 | 2026-05-25 |
| Synced live n8n and ElevenLabs RB calling-bot configuration into source-controlled readback snapshots and added the repeatable `calls:sync-live-state` helper. | 2026-05-13 | 2026-05-13 |
| Created RB Codex repository structure. | 2026-05-04 | 2026-05-04 |
| Added durable storage rules. | 2026-05-04 | 2026-05-04 |
| Fetched Notion schemas for Internal Knowledge Base, Client Databases, Client Notes & Updates, and Companies. | 2026-05-04 | 2026-05-04 |
| Built initial process map. | 2026-05-04 | 2026-05-04 |
| Added reference-based client folder rule. | 2026-05-05 | 2026-05-05 |
| Created active VUN pilot folder under `clients/Companies/VUN/`. | 2026-05-05 | 2026-05-05 |
| Split client roots into `clients/Companies/<client-reference>/` and `clients/Individuals/<legal-name>/`. | 2026-05-05 | 2026-05-05 |
| Added active Nathan Mawali A Vandy individual folder and linked it to VUN. | 2026-05-05 | 2026-05-05 |
| Added individual template files for bank accounts, tax filings, assets, correspondence, expenses, linked companies, and linked entities. | 2026-05-05 | 2026-05-05 |
| Removed the mistaken VUN git-held evidence package from PR branch history and reverted procedure to Drive-based evidence storage with repo pointers. | 2026-05-05 | 2026-05-05 |
| Removed invalid non-VUN backup references so those clients can be redone directly in the correct reference format. | 2026-05-05 | 2026-05-05 |
| Created repo-local German personal tax analysis skill from the Notion SOP. | 2026-05-05 | 2026-05-05 |
| Created general SOP/process backup pages in the RB Internal Knowledge Base. | 2026-05-04 | 2026-05-05 |
| Added review and PR workflow process. | 2026-05-05 | 2026-05-05 |
| Added growth channels, creative-source, and Authority Calling service positioning notes. | 2026-05-04 | 2026-05-05 |
| Added VUN Drive evidence pointer guidance. | 2026-05-05 | 2026-05-05 |
| Added product offerings, pricing signals, and bundle catalogue. | 2026-05-05 | 2026-05-05 |
| Ported neutral npm/TypeScript helper infrastructure and RB helper skills. | 2026-05-05 | 2026-05-05 |
| Ported optional WhatsApp MCP setup and RB WhatsApp communications skill into PR #1. | 2026-05-05 | 2026-05-05 |
| Added direct-send communications rule and chat-first drafting workflow. | 2026-05-06 | 2026-05-06 |
| Created canonical RB Communications database and moved VUN Slack closeout record out of the Everguard/research Communications table. | 2026-05-06 | 2026-05-07 |
| Resolved access to Nathan's Office-mode 2023/2024 VAT missing-invoices workbook and 2025 personal-tax analysis workbook, then added formula-backed Codex categorisation/audit tabs. | 2026-05-06 | 2026-05-06 |
| Created the machine-readable native Google Sheets personal-tax template and superseded the separated-Codex-tab workflow for future personal-tax work. | 2026-05-06 | 2026-05-06 |
| Created Mark's fresh 2024 machine-readable personal-tax workbook as a true Drive-native copy of the maintained template in the supplied Mark Drive folder. | 2026-05-13 | 2026-05-13 |
| Finalised Mark's 2024 personal-tax analysis open questions after operator confirmation of GbR profit support, MacBook treatment, mobile business-use percentages, missing M1-3 iCloud treatment, and business-meal formality support. | 2026-05-13 | 2026-05-13 |
| Set up Byron personal-tax analysis from the maintained native German personal-tax template and updated it for the ottonova healthcare evidence. | 2026-05-13 | 2026-05-18 |
| Received and applied AGL/Byron review follow-up, including Notion tax-residence reconciliation. | 2026-05-13 | 2026-05-13 |
| Created live monthly AGL task to ask Byron about planned vacation/off days for next-month Syntentia invoicing. | 2026-05-13 | 2026-05-13 |
