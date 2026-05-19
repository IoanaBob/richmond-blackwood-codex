# Open Questions

Status: active.
Imported: 2026-05-04.
Updated: 2026-05-12.

## Notion Backup Questions

- Create company and individual Client Notes & Updates backup pages for VUN/Nathan at the root-level client records after user review.
- Backfill those VUN/Nathan backup pages from all available sources after the repo records are reviewed.
- Confirm whether VUN-linked personal insolvency and personal tax task/correspondence summaries should remain in the VUN company folder as pointers or be fully routed only under `clients/Individuals/Nathan Mawali A Vandy/`.
- Redo non-VUN client imports directly from Notion Companies `Reference` records; earlier non-VUN backup references were incorrect and have been removed.

## Drive Filing Questions

- Confirm whether the supplied VUN Drive folder is shared with the connected Drive account; connector listed no files and metadata lookup returned not found.
- Confirm VUN group/external Drive classification.
- Confirm whether the general Drive archive folder is intentionally empty or whether the connector search failed to list contents.

## Client Folder Cleanup Questions

- Confirm whether any remaining old flat client folders outside `clients/Companies/` and `clients/Individuals/` are user-owned local work before deleting them.

## Business Truth Questions

- Locate and link the RB TCSP authorisation letter or official register entry before using current-authorisation wording in external copy.
- Confirm active versus historical service categories.
- Confirm current RB pricing, monthly fees, and public savings claims.
- Review `internal/product-offerings.md` and classify each product/bundle as active, paused, historical, or experimental.
- Confirm whether DatoCMS consult pricing is current or legacy:
  - EUR 99 initial consult only.
  - EUR 19 full-service consult.
  - "Free Forever" / never-charge-more-than-savings language.
- Confirm whether backend EUR 1,000 / EUR 1,500 monthly fee assumptions match current pricing.
- Find the original Q3 2025 pricing draft and import actual package prices if available.
- Confirm whether investment management, debt consolidation, residency/immigration, and nominee director/shareholder services are still offerable.
- Confirm public marketing claims one by one:
  - EUR 10,500 average yearly savings.
  - EUR 80k income/revenue threshold.
  - Up to 14% lower tax.
  - All-in-one administration.
  - No hidden costs/full service.
  - Liability/bottom-line protection.
  - Investment compounding examples based on tax savings.
- Confirm whether the approx. EUR 10.4k monthly revenue snapshot is still useful, and whether it should remain in internal history.
- Confirm final title/role wording for Ioana in RB docs and public communications.

## Growth And Marketing Questions

- Analyse Meta, Reddit, and Google ads accounts on demand when the user asks for a specific account-analysis task.
- Review static creative batches in Figma in more depth, using a new tab for each batch.
- Resolve access to the video creative Drive folder, which did not list through the connector.
- Decide which older tax-savings angles should evolve into Authority Calling / Authority Liaison messaging.

## Process Questions

- Confirm the owner for German filings and VAT cleanup.
- Confirm the canonical payroll runbook source, especially for external clients on Lexware.
- Confirm the authority liaison / POA process owner and current escalation process.
- For Slack completion notifications, confirm the integration source for the triggering person: Slack user ID/channel/thread from the intake event, Notion requester-to-Slack mapping, or an operator-provided recipient when the trigger comes from Codex.
- During the next live inbound triage, confirm the exact Business Partners, Contract, and Invoicing field names used for business-partner invoice routing.
- Confirm Slack user mappings for assignee tags in one-message-per-triage Slack closeouts.

## Selin / CLV Personal Tax Questions

- For Selin's 2025 German personal tax workbook, review the `Documents from client - 2025 - Selin` folder before claiming expenses; it contains files with 2024 filenames and needs date/year/category review.
- Confirm whether Selin had any private investments in 2025, or confirm no private investments, before clearing the investment check.
- Confirm whether Selin had any direct Finanzamt tax payments/prepayments in 2025 outside payroll withholding, or confirm none, before clearing the tax-payment confirmation check.
- Review deductible and tax-credit applicability for Selin 2025 before marking any optional rows as claimed, including the days-based home-office allowance, commuting, equipment/training, health/care insurance, pension/retirement, donations, childcare, household services, and foreign/investment withholding credits.
- Tie the 2025 opening balance sheet to the 2024 workbook closing balances or add an explicit provisional opening baseline note.

## CBMAX Client Questions

- Sync the Notion company record/tax-history callout with the corrected pending status: Irish VAT `4388950KH` issued and ROS backdate requested from January 2025, but retroactive acceptance is not confirmed, so 2025 VAT/tax-residence treatment remains in limbo.
- Confirm ROS's final response to the Irish VAT backdate request and the filing/payment status of the seven pending VAT filings referenced in WhatsApp on 2026-03-09.
- Confirm whether German VAT number `DE451021099` or USt-IdNr. `DE455085802` should be retained as historical German VAT identifiers, written back to the company record's blank German VAT field, or left out of the active company field.
- Confirm whether Hamburg tax number `17/070/40128` belongs to CBMAX and how it relates to Berlin tax number `29/648/60019`.
- Confirm Semen's full legal name before creating an individual folder or importing personal payroll/bank identifiers.
- Decide whether Eran Peer, Semen, and Viktor need individual folders now, or only when personal-tax/KYC/private individual details are imported. Claudio Brivio now has `clients/Individuals/Claudio Brivio/`.

## Claudio Brivio Personal Tax Questions

- Reconcile Claudio's Notion 2024 filing `GDrive Docs` folder `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe`, which listed empty through the connector, with the active Drive folder `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv`.
- Confirm whether `Claudio - Personal Tax Analysis Template.xlsx` should be migrated/copied from the maintained native machine-readable German personal-tax template before continuing analysis.
- Confirm whether existing Notion tasks `https://www.notion.so/352e4130131480e0b6f4deb6917c972b` and `https://www.notion.so/358e413013148053bb73e0bc8e7247b3` are correctly linked to the 2024 filing's `Preparation Task` / `Filing Task` fields before creating any new task pair.
- Confirm how CBMAX February 2024 payroll was handled: missing February payslip, March back-pay, or no payment.
- Obtain or verify the CBMAX 2024 Lohnsteuerbescheinigung.
- Reconcile TK contribution/end-date evidence after Claudio's 2026-05-07 WhatsApp update that TK cannot provide a standalone tax certificate.
- Extract and review Hallesche Section 10 certificate figures for 2024-02-01 to 2024-12-31.
- Confirm the Joblift Feb-Sep 2024 travel treatment as Reisekosten vs Pendlerpauschale.
- Confirm CBMAX and Job Guardian Section 138 AO notifications are included in the 2024 filing package and how late/proactive filing should be framed.
- Verify the N26 file in the investment folder is not a capital-income tax certificate before clearing Anlage KAP/KAP-AUS.

## Nathan VAT And Personal Tax Questions

- Confirm full-year 2025 bank-statement coverage for Nathan before finalising the 2025 personal tax analysis; the current workbook extract appears to show detailed rows through January-April 2025 only.
- Confirm and collect the missing evidence identified in the 2026-05-06 Nathan workbook audit trail, including potential `INV-00013`, 2025 non-EU invoice evidence, the remaining unmatched DappRadar July 2025 [August] payment, expense receipts, Vandy UN bank receipt/payment evidence, blank prepayment amounts, and non-USDC investment cost-basis lots. Future continuation should use the machine-readable personal-tax template rather than extending separated Codex tabs.
- Obtain prior-year Coinbase acquisition lots for DOT, ETH, ARB, and MATIC, plus the Kraken XRP acquisition lot, before finalising 2025 capital-gains vs income treatment. USDC should be reconciled as a transfer/stablecoin bridge rather than an investment lot.
- Confirm whether the copied 2025 Vandy UN Limited invoices are sales-invoice evidence, employment compensation evidence, or a corrected intercompany/related-party invoice trail before final categorisation.

## Calling Bot Questions

- Verify the user-configured ElevenLabs phone number, n8n variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID`, the selected n8n ElevenLabs credential on `Make ElevenLabs Outbound Call`, and the selected n8n ElevenLabs credential on `Get ElevenLabs Conversation` through a controlled post-fix retry; do not record the phone number or phone ID in git.
- Confirm ElevenLabs privacy/retention settings before live calls; the inspected agent currently records voice, retains indefinitely, and does not delete transcript/PII or audio.
- Confirm the updated ElevenLabs live-help behavior in a synthetic call: agent-level dynamic-variable placeholders and the n8n outbound payload must include every required tool variable, `request_creator_help` should run once per issue, and `check_creator_help` should poll without duplicate Slack posts for up to five minutes.
- Test the active n8n `RB Calls Slack Replies` PoA file-upload branch with a synthetic file before production reliance.
- Confirm whether `Company` should remain optional for call requests; the new voice workflow still assumes Company, Individual, and Contact relations are present before it fetches related pages.
- Confirm Slack app interactivity URL/scopes for the RB calls workflow.
- Confirm whether n8n can validate ElevenLabs webhook HMAC signatures with raw request body support, or whether IP allowlisting plus a secondary header secret is the approved protection.
- Confirm detailed contact-availability timezone interpretation, retry windows, business-hour rules, and maximum pickup/contact-attempt limits before production activation. Availability presence itself is required for call-eligible Front Office Contacts.
- Confirm whether any call-critical Notion databases store records only as one-way backlinks rather than relation properties on the Call, Company, Individual, Contact, Filing Registration, Tax Payment, or Tax Prepayment pages. The 2026-05-12 voice workflow dereferences relation-property linked pages; one-way backlink-only data needs explicit n8n database query paths.
- Confirm whether the Notion integration should be granted access to the Contracts database for `lookup_call_context`. Production lookup execution `3776` returned `status: partial` because the permitted Contracts source is not accessible to the integration.
- Confirm legal/consent/disclosure rules before enabling automated outbound authority calls or call recording/transcription.
- Confirm whether all new authority call requests should use a default Notion reviewer, and if so which user.

## WhatsApp MCP Questions

- Confirm whether optional WhatsApp MCP should be enabled for all RB operators or only this local Codex setup.
- Confirm which WhatsApp account or number should be linked for RB work.
