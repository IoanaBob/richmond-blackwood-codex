# Open Questions

Status: active.
Imported: 2026-05-04.
Updated: 2026-05-13.

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

## Mark / WEW Personal Tax Questions

No active Mark / WEW personal-tax questions remain after the 2026-05-13 operator decisions. Detailed resolved decisions are recorded in `clients/Individuals/Mark James Frederick Wilshin/open-questions.md`.

## CBMAX Client Questions

- Sync the Notion company record/tax-history callout with the corrected pending status: Irish VAT `4388950KH` issued and ROS backdate requested from January 2025, but retroactive acceptance is not confirmed, so 2025 VAT/tax-residence treatment remains in limbo.
- Confirm ROS's final response to the Irish VAT backdate request and the filing/payment status of the seven pending VAT filings referenced in WhatsApp on 2026-03-09.
- Confirm whether German VAT number `DE451021099` or USt-IdNr. `DE455085802` should be retained as historical German VAT identifiers, written back to the company record's blank German VAT field, or left out of the active company field.
- Confirm whether Hamburg tax number `17/070/40128` belongs to CBMAX and how it relates to Berlin tax number `29/648/60019`.
- Confirm Semen's full legal name before creating an individual folder or importing personal payroll/bank identifiers.
- Decide whether Eran Peer, Semen, and Viktor need individual folders now, or only when personal-tax/KYC/private individual details are imported. Claudio Brivio now has `clients/Individuals/Claudio Brivio/`.

## Claudio Brivio Personal Tax Questions

- Review fresh 2024 workbook `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit`; it was copied from the maintained native template and populated on 2026-05-13, then updated from operator review on 2026-05-14. Current read-back shows 8 failed checks and 27 open missing-info items.
- Resolved 2026-05-14: CBMAX February 2024 payroll is excluded from the workbook and should not be retroactively changed.
- Obtain or verify the CBMAX 2024 Lohnsteuerbescheinigung.
- Resolved 2026-05-14: Health/care EUR 5,470.32 is claimed; Hallesche non-basic/supplemental EUR 1,050.69 is excluded.
- Resolved 2026-05-14: Home-office daily allowance, Pixel Buds, and mobile-phone professional share are claimed; commute and Telekom internet are excluded.
- Final-review point: Freenet mobile-phone support is the exact Drive ZIP plus tracker summary; extract individual invoice PDFs only if the filer wants invoice-level files separated.
- Resolved 2026-05-14: CBMAX and Job Guardian Section 138 AO notifications should be included in the 2024 filing package.
- Review how Section 138 AO late/proactive filing should be framed for CBMAX and Job Guardian.
- Verify the N26 file in the investment folder is not a capital-income tax certificate before clearing Anlage KAP/KAP-AUS.

## Byron Jarvis Frasier Personal Tax Questions

- Obtain/extract AGL May-Dec 2024 wage-tax, social, health, solidarity, and net-pay details from AGL payslips or the 2024 Lohnsteuerbescheinigung.
- Confirm May 2024 AGL payroll treatment, because the employment start is 2024-05-01 and first payroll date found was 2024-06-27.
- Review the November/December 2024 payroll relation mismatch on payroll page `https://www.notion.so/131e4130131481f68790cfb5fe5e8c42`.
- Obtain the previous-employer 2024 annual wage-tax certificate; Jan-Apr payroll journals are source-backed but should be reconciled to the annual certificate before filing.
- Confirm Byron's 2024 residence address periods, because Notion current address and Jan-Apr payroll address differ.
- Confirm no additional 2024 expenses or provide receipt/invoice evidence with exact URLs before claiming expenses.
- Confirm no 2024 investments or provide investment evidence before clearing the investment checks.
- Confirm whether older workbook business/freelance revenue belongs in the 2024 personal return; do not add it without invoices/bank evidence and scope confirmation.
- Filer should review final ELSTER data-entry treatment for the ottonova line 28 EUR 1,331.64 amount. It is recorded with evidence but excluded from included deduction because basic health/care already exceeds the Sec. 10(4) ceiling.

## SVL / Kristjan Questions

- Monitor for Finanzamt response issuing SVL German tax/VAT numbers; user confirmed on 2026-05-18 that tax registration is still pending.
- Do not create a tax-registration chase task in this context; user will handle the registration chase in a separate skill.
- Treat SVL filing-registration records as overdue with Finanzamt/tax registration as the blocker.
- After tax/Betriebsnummer registration arrives, Simoneta owns retroactive payroll-tax filings and payments for Kristjan's 2026 payroll.
- Confirm only if operationally needed whether Kristjan is fully created in Lexware; user says probably yes because RB needs it to create invoices.
- Use the Individuals table as source of truth for Kristjan tax identifiers; do not ask the operator to classify WhatsApp-provided values unless the table is missing or contradictory.
- Freelancer deregistration is pending through an open task; RB should set up individual/freelancer ELSTER access.
- The Drive personal-tax year folder was renamed from `2025` to `2026` and verified; Notion 2026 filing still needs the Drive folder linked when personal-tax work starts.
- Track TK final response for insurance/retroactive contribution treatment.
- AI GreenBytes update is completed, but JP needs to upload evidence.
- Apartment amount is about EUR 750k; final ownership/loan/security route remains open because there was a hurdle with the partner selling his company.

## AMC / Aaron Questions

- Confirm whether VAT Q1 2026 was filed after the current missing-invoice review; user clarified this belongs in a separate VAT skill/review.
- Confirm whether the missing Q1 invoice list was shared with Aaron and whether Aaron supplied the missing expense invoices.
- Confirm whether the 2023/2024 P&L and balance-sheet package was submitted by the actual Finanzamt deadline; follow source dates of WhatsApp 2026-05-19 at latest and Notion before 2026-05-22.
- Confirm remaining balance after the garnished account transfer; user says Finanzamt has not yet responded to the payment-plan proposal.
- Confirm later whether Aaron's P-Konto becomes active; user says it is not confirmed now.
- Confirm submission evidence and exposure for the prior Gewerbe trade-tax/VAT catch-up periods 2023, 2024, and Q1 2025; user says Aaron was deregistered after Q1 2025.
- For Aaron's 2025 joint German personal-tax filing, obtain or extract Aaron's annual wage-tax certificate/payslips and verify April/May payroll tax, June correction, October offset, and December wage-tax treatment before filing.
- For Aaron's 2025 joint German personal-tax filing, obtain or extract wife/Antje's annual wage-tax certificate and verify spouse details from the available payslip source before filing.
- For Aaron's 2025 joint German personal-tax filing, collect exact receipt/invoice URLs and business-purpose support before claiming the excluded EUR 621.97 Uber/travel candidates and EUR 181.30 net bookkeeping candidate.
- For Aaron's 2025 joint German personal-tax filing, confirm Hallescher annual private health-insurance certificate/covered months, investments/no-investments, home-office days, direct income-tax prepayments, and final Student Finance treatment.
- Move or copy Aaron's 2025 German personal-tax workbook into the correct Drive filing folder after shared Google persona Drive copy auth is restored; the connector-created workbook currently exists as a native Sheet but was not placed in the target folder.
- File or confirm Aaron's separate final-freelancer-year VAT and trade-tax wrap-up for the 2025 months worked, then confirm full deregistration evidence.
- For future Riot/Echo sends, use the updated Business Partner invoice-to/CC fields plus Business Partner notes; Riot's Nicole recipient remains in notes because the current schema is single-email.
- Decide whether Notion should get multi-recipient invoice-routing fields so Riot-style routes do not need to keep secondary To recipients in notes.
- Reconcile Slack's Q4 2025 VAT filing concern through the separate VAT skill/review.
- Confirm whether the Notion accounting-software email alias should be `accounts+amc` or `account+amc`.

## NACV / Andrei Questions

- Obtain Finanzamt response/notice for NACV 2024 and 2025 tax amounts and go-forward prepayment amounts.
- Populate the NACV Tax Prepayments database once the amounts and dates are known.
- Confirm Finanzamt response to the VAT deregistration appeal/reinstatement request; user says there is no response yet.
- Request or confirm lower German VAT filing cadence after the VAT/compliance position is clear.
- Confirm the additional information requested by Finanzamt for the filed NACV 2024/2025 company taxes and whether RB's response has been accepted.
- Complete the split of misrouted 2024 personal-tax documents from Andrei's 2025 folder.
- Confirm spouse-related evidence completeness for Andrei's joint returns.
- Confirm billing mechanics for normal-fee treatment from Andrei's 2025 personal-tax filing onward.
- Confirm Andrei's official personal/director address with him; user says it is not 100 percent clear.
- Confirm all NACV payslips and wage-tax records are uploaded or retrieve/upload from Lexoffice.
- Confirm TK/private-health-insurance outcome and final social-insurance treatment before filing.

## AKS / Anastasia Questions

- Resolve the exact WhatsApp JID for `Kova, Ana | Richmond Blackwood`; message search worked but `list_chats` failed with `Unexpected response type`.
- File or confirm AKS Q4 2025 VAT; user says to assume VAT is not filed unless they say otherwise.
- File or confirm AKS Q1 2026 VAT after the Q1 bookkeeping review; user says to assume VAT is not filed unless they say otherwise.
- Confirm which Notion filing/task should represent 2025 company tax beyond the pending annual return.
- Negotiate with Finanzamt ahead of the AKS payment-plan stop-date review, then confirm latest balance, 2025/future liabilities, and penalty status before telling Ana to stop paying.
- Confirm whether Finanzamt accepts any penalty reduction or waiver after RB negotiates.
- Confirm whether the ELSTER activation expiring 2026-05-28 was completed.
- Confirm whether April 2025 payslip evidence is missing or stored outside the listed Drive payslip folder. January 2025 may not be expected because Ana may not have been employed then.

## Nathan VAT And Personal Tax Questions

- Confirm full-year 2025 bank-statement coverage for Nathan before finalising the 2025 personal tax analysis; the current workbook extract appears to show detailed rows through January-April 2025 only.
- Confirm and collect the missing evidence identified in the 2026-05-06 Nathan workbook audit trail, including potential `INV-00013`, 2025 non-EU invoice evidence, the remaining unmatched DappRadar July 2025 [August] payment, expense receipts, Vandy UN bank receipt/payment evidence, blank prepayment amounts, and non-USDC investment cost-basis lots. Future continuation should use the machine-readable personal-tax template rather than extending separated Codex tabs.
- Obtain prior-year Coinbase acquisition lots for DOT, ETH, ARB, and MATIC, plus the Kraken XRP acquisition lot, before finalising 2025 capital-gains vs income treatment. USDC should be reconciled as a transfer/stablecoin bridge rather than an investment lot.
- Confirm whether the copied 2025 Vandy UN Limited invoices are sales-invoice evidence, employment compensation evidence, or a corrected intercompany/related-party invoice trail before final categorisation.

## Calling Bot Questions

- Verify the user-configured ElevenLabs phone number, n8n variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID`, and the selected n8n ElevenLabs credential on `Make ElevenLabs Outbound Call` and `Get ElevenLabs Conversation` through a controlled post-fix retry; do not record the phone number or phone ID in git. The 2026-05-22 n8n MCP deploy path preserved the source-level credential names but skipped HTTP Request credential auto-assignment, so either reselect those credentials in the n8n UI or provide a local n8n REST API key for an explicit credential patch before approving `RBCALL-21` again.
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
