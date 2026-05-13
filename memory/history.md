# History

Status: active.
Source: local repo.
Imported: 2026-05-05.
Review: operational ledger structure ported from neutral repo infrastructure; entries remain provisional until reviewed.

This file is the append-only chronological ledger for meaningful Richmond Blackwood Codex sessions.

## 2026-05-05 - Initial RB Repository Build

- User request: Build the RB Codex operating repository and keep facts provisional.
- Context read: User instructions, RB Notion destinations, local RB source repos, Slack/Gmail/Drive search summaries.
- Actions taken: Created initial RB memory, source, process, client, and skill structure.
- Files changed: Initial repository structure.
- Decisions made: Keep unsanitised operational context in repo except secrets/credentials; route client-specific private detail under `clients/Companies/<client-reference>/`.
- Verification: `git diff --check` and source keyword scans were clean in the initial pass.
- Limitations or gaps: Full Slack, Gmail, Drive, and Notion client imports remain partial.
- Next step: Continue source-backed imports and resolve open routing questions before external filing.

## 2026-05-05 - Port Neutral Operating Infrastructure

- User request: Port neutral decisions and helper infrastructure from `everguard-research-codex`, excluding company-specific workflows.
- Context read: source package/helper/process/memory structure and current RB repo rules.
- Actions taken: Added RB npm/TypeScript helper layer, RB-neutral helper skills, process docs, and memory ledger scaffolding.
- Files changed: Package metadata, helper scripts under `skills/rb-*`, memory/process/setup/source documentation.
- Decisions made: Gmail drafts default to `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`; SignNow helpers remain generic mechanics only.
- Verification: `npm install`, `npm run typecheck`, helper `--help` smoke checks, `git diff --check`, and forbidden carryover scans passed.
- Limitations or gaps: `npm install` still reports an `@signnow/api-client` engine warning on Node 18.7.0; RB signing policy, signer identity, template catalog, and Drive group/external classifications remain open unless already confirmed elsewhere.
- Next step: User review before any senior-review/commit/push workflow.

## 2026-05-05 - Port WhatsApp MCP Setup

- User request: Port the newly merged WhatsApp MCP server work from `everguard-research-codex` into the currently open RB PR.
- Context read: Source WhatsApp MCP setup guide, persistent bridge helper, WhatsApp communications skill, memory/process rules, and pinned submodule state.
- Actions taken: Added optional RB WhatsApp MCP submodule, setup guide, background bridge helper, WhatsApp communications skill, communication process, and memory/source records.
- Files changed: `.gitmodules`, `third_party/whatsapp-mcp`, `setup/mcp/`, `skills/rb-whatsapp-comms/`, process docs, memory docs, and source logs.
- Decisions made: WhatsApp work should use the MCP tools for normal reads/sends, keep QR/session/media/transcripts local-only, and require explicit send approval.
- Verification: Submodule status, bridge shell syntax, Go bridge test, Python compile check, TypeScript check, `git diff --check`, and source-specific business keyword scan passed.
- Limitations or gaps: RB WhatsApp account and operator rollout remain unconfirmed.
- Next step: Run validation, commit, push, and update PR #1.

## 2026-05-05 - Recover VUN Client Backup And Individual Routing

- User request: Rebase/recover the VUN work after important teammate changes landed on main, favouring the upstream workflow/memory/skills conventions.
- Context read: `origin/main` PR #1 commit, `AGENTS.md`, `processes/repo-operation.md`, `skills/rb-task-pr/SKILL.md`, memory standards, current stashes, and VUN/Nathan client files.
- Actions taken: Created branch `codex/vun-client-routing-backup` from `origin/main`, reapplied the task-owned VUN/Nathan work, migrated client roots to `clients/Companies/` and `clients/Individuals/`, removed stale non-VUN backup references, and left newly created process files stashed.
- Files changed: Client company/individual records, client templates, routing docs, source/memory logs, and the German personal tax analysis skill.
- Decisions made: Treat upstream main as authoritative for repo workflow; keep evidence files in Drive with repo pointers; keep offboarding/delivery separate; route personal correspondence and personal tax material to the individual root.
- Verification: `git diff --check`, `git diff --cached --check`, and `npm run typecheck` passed; branch pushed and draft PR opened at `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.
- Limitations or gaps: VUN relation-filtered Notion table backfill and Nathan personal tax analysis creation remain active tasks.
- Next step: Validate, commit in scoped commits, push the recovery branch, then continue review from the PR workflow.

## 2026-05-05 - Revert Client Evidence Storage To Drive

- User request: Treat downloading all VUN client export files into git as a mistake and return to the Drive-folder procedure.
- Context read: Current VUN/Nathan repo pointers, client storage rules, PR branch history, and evidence package references.
- Actions taken: Rewrote the PR branch to drop the mistaken binary evidence commit, removed the `Client export - VUN/` package from the branch, and updated procedures so Drive stores downloaded/exported client evidence while git stores pointers and blockers only.
- Files changed: Storage rules, VUN/Nathan location files, source/memory logs, and client routing docs.
- Decisions made: Use find-or-create for Drive backup/export folders; do not store downloaded/exported client binaries in git unless the user explicitly approves a narrow exception.
- Verification: `git diff --check` passed, typecheck passed with installed Node 18.17.1, and no `Client export - VUN`, `backup-manifest`, or `download-log` paths remain tracked.
- Next step: Validate, force-push the rewritten PR branch, and update PR #2 notes.

## 2026-05-06 - Direct-Send Communications Rule

- User request: Create a new PR adding the rule that communication drafts should happen in chat, email drafts always show sender, `Subject`, and source thread, email replies prefer existing threads, sends happen directly, and sent communications are stored in RB Communications.
- Context read: `AGENTS.md`, communications process, Gmail/WhatsApp skills, and memory decisions.
- Actions taken: Added central `rb-communications` skill and updated AGENTS, README, communications, Gmail, WhatsApp, and memory docs. After user correction, kept `rb-gmail-drafts` as the email-specific skill for sender/`Subject`/source-thread/signoff and verified draft fallback behavior.
- Files changed: `AGENTS.md`, `README.md`, `processes/communications.md`, `processes/signature-and-gmail.md`, `skills/rb-communications/SKILL.md`, `skills/rb-gmail-drafts/SKILL.md`, `skills/rb-whatsapp-comms/SKILL.md`, `skills/index.md`, and memory files.
- Decisions made: Normal outbound communications are chat-drafted, sender-visible, direct-sent after approval, and logged to Communications; email previews always show `Subject` and source/reply thread when available; existing email threads are preferred; software drafts are exception-only. Email communications still use `rb-gmail-drafts` for Gmail-specific rules.
- Verification: `npm run typecheck`, `git diff --check`, and source-specific/conflicting-rule scan passed.
- Later update: On 2026-05-07, RB Communications was created under RB Client Databases and the VUN Slack closeout record was moved there from the Everguard/research table.
- Next step: Commit, push, and open a new PR.

## 2026-05-06 - Gcloud Gmail Drafting Rule

- User request: Update PR #4 so Gmail email drafting always uses gcloud.
- Context read: Gmail communication skill, Google auth skill, Gmail helper scripts, AGENTS, README, process docs, and memory.
- Actions taken: Made Gmail draft/delete helper defaults run `gcloud auth application-default login` by default and documented that Gmail drafting actions touching Gmail must always use the repo-local gcloud-managed Gmail API helper path.
- Files changed: `skills/rb-gmail-drafts/`, `skills/rb-google-auth/`, `AGENTS.md`, `README.md`, `processes/signature-and-gmail.md`, and memory files.
- Decisions made: Gmail draft fallback, sender verification, helper reply-context reads, and unsafe-draft deletion must not use IMAP, app passwords, stored mailbox credentials, or connector-created Gmail drafts.
- Verification: `npm run typecheck`, Gmail draft/delete helper `--help` smoke checks, `git diff --check`, and stale auth-default scan passed.
- Next step: Commit, push, and update PR #4.

## 2026-05-06 - Nathan VAT And 2025 Personal Tax Evidence Triage

- User request: Upload Nathan's WhatsApp evidence, review 2023/2024 VAT missing invoices, and audit the 2025 personal tax analysis against bank statements and invoices.
- Context read: Nathan individual client files, Personal Tax Filing Notion records, user-provided Drive/sheet links, Drive evidence folders, WhatsApp group context, and relevant repo-local skills.
- Actions taken: Uploaded the downloaded WhatsApp invoice pack to the user-provided 2025 Drive folder and recorded repo pointers/source notes under Nathan's individual folder.
- Files changed: Nathan individual Drive/tax/source pointers plus source and memory logs.
- Decisions made: Do not edit the supplied spreadsheets until the user has reviewed the proposed modifications; treat the uploaded invoice pack as provisional evidence pending bank-statement reconciliation.
- Verification: Drive helper upload returned file metadata; Google Sheets/Drive connector access to the workbook links remained blocked because they behaved as Office-mode spreadsheets or inaccessible Drive files.
- Limitations or gaps: 2023/2024 VAT categorisation and 2025 bank-statement audit are waiting on native Sheets/local XLSX access and readable bank-statement extracts.
- Next step: User review of proposed workbook changes, then update the workbook(s) once access is available.

## 2026-05-06 - Nathan Corrected Customer Drive Evidence

- User request: Delete the superseded `vandy_invoice_pack_polished_jul_dec_2025.pdf` and copy the corrected customer-created Drive folder evidence.
- Context read: Nathan source Drive folder, target 2023/2024 and 2025 evidence folder structure, existing repo/Notion pointers.
- Actions taken: Moved the superseded PDF to Drive trash, copied UAB 2024 invoices, UAB 2025 invoices, Vandy UN 2025 invoices, DappRadar August 2025 invoice, Coinbase summaries, and Kraken summary into the existing destination folders.
- Files changed: Nathan individual Drive/tax/source pointers, source and memory logs, and the Drive helper/skill workflow.
- Decisions made: When a customer creates a Drive evidence folder, access that folder and copy its files into RB destinations rather than relying on prior local/WhatsApp copies.
- Verification: Drive helper listings confirmed the copied destinations and that the superseded PDF no longer appears in the target root.
- Limitations or gaps: Workbook categorisation and cash-basis reconciliation still require editable/readable workbook access.
- Next step: Use the corrected copied evidence for the 2023/2024 VAT and 2025 personal-tax audit once workbook access is resolved.

## 2026-05-06 - Spreadsheet And Notion Comment Operating Rules

- User request: Historical/superseded spreadsheet rule: use formula-driven separated Codex tabs named `codex - [sheet name] - [update date]` and never hardcode derived values. The Notion database page rule remains active: use actual page comments for comment updates instead of database fields.
- Context read: repo-local memory/process skills, Notion operations standards, file-upload/spreadsheet guidance, and personal-tax-analysis skill.
- Actions taken: Added the spreadsheet and Notion-comment rules to durable memory, process docs, handoff, import log, and the personal tax analysis skill.
- Files changed: `memory/file-uploads.md`, `processes/file-uploads.md`, `skills/rb-personal-tax-analysis-de/SKILL.md`, `processes/notion-operations.md`, `memory/notion-database-standards.md`, `memory/handoff.md`, `sources/import-log.md`, and memory ledgers.
- Verification: pending `git diff --check`.

## 2026-05-06 - Nathan Workbook VAT And 2025 Audit Updates

- User request: Continue the remaining Nathan VAT and 2025 personal tax analysis steps after the Drive/correspondence process updates.
- Context read: Nathan 2023/2024 VAT workbook, 2025 personal tax workbook, copied Drive evidence, and local spreadsheet/process rules.
- Actions taken: Downloaded both Office-mode `.xlsx` workbooks, added formula-backed Codex tabs, uploaded the revised workbooks back to Drive, and verified the tabs by Drive read-back.
- Files changed: Nathan individual tax/source/Drive pointers, import log, memory ledgers, and the local Drive helper support already added earlier for workbook download/update.
- Decisions made: Keep source tabs untouched; use abbreviated Codex sheet names because Excel limits sheet names to 31 characters.
- Verification: Drive read-back confirmed `codex - VAT rev - 2026-05-06`, `codex - miss inv - 2026-05-06`, `codex - audit - 2026-05-06`, and `codex - miss inv - 2026-05-06`. The 2023/2024 VAT workbook was later superseded by annual Codex tabs.
- Limitations or gaps: Full-year 2025 bank-statement coverage, missing `INV-00013`, 2025 no-invoice revenue rows, expense receipts, Vandy UN bank receipts, investment tie-out, and prepayment amounts still need final evidence.

## 2026-05-06 - Nathan 2023/2024 Annual VAT Revenue Tabs

- User request: Replace the earlier 2023/2024 VAT Codex tabs with one tab per year, keep formula-backed summary figures at the top, put the income breakdown below row 10, exclude January 2024, and treat potential `INV-00013` as EU reverse.
- Context read: Current 2023/2024 Office-mode workbook, existing `Income 2023`, `Income 2024`, and `Summary` tabs, user instructions, and copied UAB evidence pointers.
- Actions taken: Removed the earlier Codex VAT/missing-invoice tabs, added `codex - 2023 - 2026-05-06` and `codex - 2024 - 2026-05-06`, updated summary formulas, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: 2023 included revenue is EUR 86,521.60 EU reverse; 2024 included revenue is EUR 68,436.94, split between EUR 22,865.60 EU reverse and EUR 45,571.34 non-EU; January 2024 EUR 1,855.77 is excluded/uncollectible.
- Verification: Drive read-back confirmed the annual tabs, the January 2024 exclusion, potential `INV-00013` EU reverse treatment, and revision md5 `d509d0cf400d14f87e7c7a1a83b63559`.
- Limitations or gaps: Potential `INV-00013` invoice evidence and final invoice-by-invoice tie-out remain open before filing.

## 2026-05-06 - Nathan 2025 Annual And Discrepancy Tabs

- User request: Follow the same annual-tab format for 2025 and split the audit into one revenue discrepancy tab and one expense discrepancy tab.
- Context read: Current 2025 Office-mode workbook, existing Summary, Revenue Summary, Expenses Summary, Investments Summary, Prepayments, and prior mixed Codex audit tabs.
- Actions taken: Removed the earlier mixed `codex - audit - 2026-05-06` and `codex - miss inv - 2026-05-06` tabs, added `codex - 2025 - 2026-05-06`, `codex - rev disc - 2026-05-06`, and `codex - exp disc - 2026-05-06`, updated Summary formulas, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep revenue discrepancies and expense receipt/non-deductible tracking separate; keep investment, prepayment, full-year bank coverage, and Kraken notes visible on the annual 2025 tab.
- Verification: Drive read-back confirmed the new 2025 tabs, `Summary!B6:B7` formula links, removal of the earlier mixed Codex tabs, and revision md5 `7b44e8da45af1ad90b3dfc6562a3a475`.
- Limitations or gaps: Full-year 2025 bank statements, revenue invoice tie-outs, Vandy UN bank receipts, expense receipts, investment tie-out, and prepayment amounts remain open before final filing.

## 2026-05-06 - Nathan 2025 Investment Breakdown

- User request: Add the missing 2025 investment breakdown, identify purchases/acquisitions and sales, split transfers from purchases, and classify gains by holding period where evidence supports it.
- Context read: Coinbase 2025 transaction-history PDF, Kraken 2025 monthly statements, current 2025 personal tax workbook, and existing Nathan evidence pointers.
- Actions taken: Decoded the Coinbase PDF font mapping, extracted Coinbase/Kraken 2025 investment activity, added `codex - invest - 2026-05-06`, updated the annual investment row, uploaded the workbook to Drive, and verified by read-back.
- Decisions made: Treat Coinbase/Kraken EUR withdrawals as broker-bank transfers, not purchases; treat USDC deposits/receives as transfers from external wallets/brokerages unless original purchase evidence is supplied; exclude missing-basis rows from formula-based short-term income and long-held gain totals until basis is known.
- Verification: Drive read-back confirmed the investment tab and annual row link; latest 2025 workbook md5 is `2494180a7a13f98e88bcf6b34d6a9557`, modified `2026-05-06T13:02:22.269Z`.
- Limitations or gaps: Prior-year Coinbase lots, external wallet/broker USDC lots, and Kraken XRP acquisition cost/date remain needed before final capital-gains vs income treatment.

## 2026-05-06 - Nathan 2025 DappRadar Revenue Correction And Formatting

- User request: Rectify the 2025 revenue tab because DappRadar UAB invoices were provided, determine what was actually unpaid, and format the Codex tabs with widths, wrapped text, and existing heading colors.
- Context read: Current 2025 Office-mode workbook, DappRadar/UAB Drive invoice folder, local extracted PDF evidence, and existing workbook styles.
- Actions taken: Reclassified the four EUR 1,500 source bank rows from generic no-invoice revenue to DappRadar/UAB EU reverse charge, separated the seven DappRadar invoice PDFs in `codex - rev disc - 2026-05-06`, marked four invoices as matched by amount and three as unpaid/unmatched, and formatted all Codex tabs with column widths, wrap-friendly styles, and frozen table headers.
- Decisions made: Treat the DappRadar/UAB invoice pack as provided evidence; keep three unmatched invoices, May-July 2025 service / June-August payment timing, outside cash-basis revenue until bank receipt is located.
- Verification: Uploaded the 2025 workbook to Drive and read it back with matching md5 `dbbe241d1498e517a712bdb2dab29ffc`; workbook zip validation passed.
- Limitations or gaps: Source bank rows still lack DappRadar payment dates/refs, `Revenue Summary!A7:D10` needs separate non-EU evidence verification, and full-year bank coverage remains open.

## 2026-05-06 - Nathan 2025 Vandy UN Invoice Evidence Correction

- User request: Adapt the 2025 workbook because the pending Vandy UN invoices were shared and uploaded in the Vandy UN July-December folder.
- Context read: Current 2025 Office-mode workbook, Vandy UN Drive invoice folder, downloaded July-December invoice PDFs, and existing Codex annual/revenue-discrepancy tabs.
- Actions taken: Replaced `PENDING VANDY UN INVOICES` wording in the Codex annual tab with invoice-provided/payment-reconciliation status, added `codex - invoices - 2026-05-06` as the formula-driven invoice evidence index, added file-level Vandy UN invoice links and formula-pulled net/gross invoice columns to the revenue discrepancy tab, and uploaded the workbook revision to Drive.
- Decisions made: Treat the six Vandy UN PDFs as provided invoice evidence but keep cash-basis revenue tied to source-populated amounts; only July EUR 3,200 is source-populated, while August-December EUR 16,000 net remains excluded until payment/source evidence is located.
- Verification: Drive upload/read-back md5 matched `b16ae3e2eec49f9bc06a19efdd79e068`; workbook zip validation passed.
- Limitations or gaps: Vandy UN payment/source evidence for August-December and final company-to-Nathan categorisation remain open.

## 2026-05-06 - Nathan 2025 Revenue Tab Style And Expense Reference Cleanup

- User request: Preserve the user-adjusted compact/thicker revenue table style for the then-active legacy workbook flow and remove expense references from the revenue tab.
- Context read: Latest Drive revision of the 2025 Office-mode workbook after the user's style edits, current `codex - 2025 - 2026-05-06` formulas, Summary formulas, and Codex tab frozen-pane/width settings.
- Actions taken: Cleared expense references from `codex - 2025 - 2026-05-06`, updated `Summary!B7` to point directly to `Expenses Summary!C11`, preserved existing table widths/heights/frozen panes, uploaded the workbook revision to Drive, and added the style/routing rule to `skills/rb-personal-tax-analysis-de/SKILL.md`.
- Decisions made: Keep revenue tabs revenue-focused; keep expense review in `codex - exp disc - 2026-05-06` and workbook Summary/source tabs, not routed through revenue tabs.
- Verification: Drive upload/read-back md5 matched `1f1a17167ea6d6605db30264204d38a4`; workbook zip validation passed; no `Expenses Summary` or expense text remains in the revenue review tab.
- Limitations or gaps: This legacy workbook style note is superseded for future personal-tax work by the machine-readable template workflow.

## 2026-05-06 - Nathan 2025 Income Breakdown Year Row Cleanup

- User request: Put the year in the income breakdown row and delete the standalone year row.
- Context read: Latest Drive revision of the 2025 Office-mode workbook and current `codex - 2025 - 2026-05-06` income breakdown/header rows.
- Actions taken: Changed row 10 to `INCOME Breakdown - 2025`, deleted the standalone year row, moved income table headers to row 11, moved the frozen pane to row 11, adjusted top revenue summary formulas to the shifted table range, uploaded the workbook revision to Drive, and recorded the legacy layout note later superseded by the machine-readable template workflow.
- Decisions made: Annual revenue sections should use the section title for the year rather than adding a separate year row above headers.
- Verification: Drive upload/read-back md5 matched `8db4f4b801b38eb1cb7e7be694bac333`; workbook zip validation passed.
- Limitations or gaps: This cleanup was applied to the 2025 legacy workbook; future personal-tax work should use the machine-readable template instead.

## 2026-05-06 - Nathan 2025 VAT Rate Percentage Formatting

- User request: Reformat the VAT rate column as percentage because 19% was formatted as Euro.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, `codex - 2025 - 2026-05-06` VAT Rate column, `codex - invoices - 2026-05-06` VAT rate column, and workbook styles.
- Actions taken: Reformatted annual VAT Rate cells `C3:C6` and invoice-evidence VAT rate cells `H5:H17` using percentage number format while preserving existing compact layout, borders, fonts, and formulas.
- Decisions made: VAT/rate columns should be percentage fields; VAT amount columns remain amount/currency fields.
- Verification: Drive upload/read-back md5 matched `5e46f2a60ae01938d5fa3c1f7ef94195`; workbook zip validation passed; target cells use Excel percent number format id `9`.
- Limitations or gaps: No calculation logic changed.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy Review Layout

- User request: Remove the revenue discrepancy tab's breakdown framing because every revenue line needs review.
- Context read: Latest Drive revision of the 2025 Office-mode workbook and current `codex - rev disc - 2026-05-06` section/header rows and formulas.
- Actions taken: Changed the section title to `REVENUE DISCREPANCY REVIEW - 2025`, removed the standalone year row, moved headers to row 16, shifted review lines up one row, adjusted summary formulas/freeze pane, uploaded the workbook revision to Drive, and added the future layout rule to `skills/rb-personal-tax-analysis-de/SKILL.md`.
- Decisions made: Revenue discrepancy tabs should be line-by-line review tables, not breakdown sections.
- Verification: Drive upload/read-back md5 matched `3157c989fa89b7dd02673180f3647397`; workbook zip validation passed.
- Limitations or gaps: No revenue classification logic changed in this pass.

## 2026-05-06 - Nathan 2025 Bank-Derived Expense Rebuild

- User request: Redo the 2025 Codex expenses tab without using the user's Jan-May reference and add a tab for each bank account covering Jan-Dec 2025 with categorised transactions.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, 2025 personal bank statement Drive folder, ABN AMRO statement ZIPs, Revolut 2025 statement PDF, and N26 statement ZIP from the solvency evidence folder.
- Actions taken: Parsed bank statement evidence, rebuilt `codex - exp disc - 2026-05-06` around bank-derived formulas, added `codex - exp rules - 2026-05-06`, `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06`, updated `Summary!B7`, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep each account tab as raw statement rows plus formula-based categorisation, deductible status, tax treatment, evidence action, and review flags; treat transfers between bank/brokerage accounts as transfers rather than expenses.
- Verification: Drive upload/read-back md5 matched `3c6a5debaa06124956fed8c035c51142`; workbook zip validation passed; parsed rows were ABN 250, Revolut 1,383, and N26 86.

## 2026-05-06 - Nathan 2025 Bank Reconciliation Business Expense Reclassification

- User request: Make the bank reconciliation summaries less bulky, enlarge the rows for reviewing open items, and actually categorise business expenses from the bank statements: London/Dubai business-location travel including food/accommodation/travel/taxi, no supermarkets, and sensible electronics/telecom/business subscriptions.
- Context read: Latest 2025 Office-mode workbook from Drive, local ABN/Revolut/N26 statement parsers, existing Codex expense tabs/rules, and personal-tax-analysis spreadsheet rules.
- Actions taken: Rebuilt the expense discrepancy/rules/account tabs with compact summary rows, 42px account transaction rows, compact wrapped column widths, visible rule key/category/status/tax/evidence/review columns, cached formula results, and corrected Revolut GBP rows to use statement EUR conversions where available.
- Decisions made: Count London and Dubai business-location spend as business travel unless the merchant is a supermarket/convenience store; exclude Iceland/Icelandair/Reykjavik unless separately confirmed; count sensible electronics, telecom, software, subscriptions, professional fees, and bank fees as business expenses subject to support.
- Verification: Uploaded the workbook to Drive and downloaded it back; md5 matched `629dd8a72be498e8fab26cc6e667a969`, modified `2026-05-06T15:11:52.312Z`, size `495500`; zip validation passed and cached sample classifications survived read-back.

- Limitations or gaps: N26 October 2025 is still missing; final filing still needs receipts/business-purpose support for claimed rows and review of uncategorised/non-business review flags.
- Limitations or gaps: N26 October 2025 was not present in the provided ZIP. Revolut GBP-statement rows with no EUR amount are flagged for FX/EUR review before amounts are claimed.

## 2026-05-06 - Nathan 2025 USDC Investment Reclassification

- User request: Treat USDC as bank/stablecoin transfers rather than investments, count other currencies as investments split by currency, and use the 2023/2024 analysis for purchase-date context where ETH, DOT, MATIC, and similar assets already existed.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, the 2023/2024 analysis workbook, Coinbase 2025 PDF-derived rows, Kraken 2025 statement-derived rows, and the existing `codex - invest - 2026-05-06` tab.
- Actions taken: Rebuilt `codex - invest - 2026-05-06`, reclassified USDC rows as `Transfer / stablecoin bridge`, added a non-USDC currency summary for DOT, ETH, ARB, MATIC, XRP, and POL, added prior-year purchase evidence rows from the 2023/2024 workbook, updated the annual 2025 investment audit row, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Keep USDC visible for reconciliation but exclude it from investment purchase, disposal-proceeds, and gain formulas. Use the visible 2023/2024 workbook notes as purchase-date support for DOT/ETH/ARB/MATIC, while keeping cost basis and exact lot split open.
- Verification: Drive upload/read-back md5 matched `8a056c58a52257f4c999298e32d6c37a`; workbook zip validation passed.
- Limitations or gaps: Final gain/tax treatment still needs detailed non-USDC cost-basis lots, especially DOT, ETH, ARB, MATIC, and Kraken XRP. The visible 2023/2024 workbook does not identify XRP purchase details.

## 2026-05-06 - Nathan 2025 DappRadar Full Statement Recheck

- User request: Recheck the bank statements because the DappRadar/UAB payments previously marked missing might be there.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, formula-backed `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06` tabs, plus the parsed ABN/Revolut/N26 source statement rows.
- Actions taken: Searched all 1,719 parsed 2025 statement rows by DappRadar/Deppradar/UAB terms, amount, date window, and the known DappRadar IBAN; found ABN EUR 1,500 receipts on 2025-06-10 and 2025-07-10; updated `codex - invoices - 2026-05-06`, `codex - rev disc - 2026-05-06`, and `codex - 2025 - 2026-05-06` with formula-linked bank-statement matches; uploaded the workbook revision to Drive and verified by read-back.
- Decisions made: Treat the June 10 and July 10 ABN receipts as DappRadar/UAB matches because they use the same Estonian IBAN and EUR 1,500 payment pattern as the named DappRadar receipts. Keep the July 2025 [August] invoice unpaid/unmatched because no matching ABN/Revolut/N26 2025 receipt was found.
- Verification: Drive upload/read-back md5 matched `2ff337b5e57d9605e6eba1dee5168309`; workbook zip validation passed.
- Limitations or gaps: Remaining DappRadar/UAB unpaid/unmatched amount is EUR 1,500; source-matched rows 14:17 still need exact bank receipt date/ref confirmation if the preparer wants a row-level tie-out to the original source workbook entries.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy No-Summary Cleanup

- User request: Remove the summary from the 2025 revenue discrepancy tab and do not wrap the note columns.
- Context read: Latest Drive revision of the 2025 Office-mode workbook, existing `codex - rev disc - 2026-05-06` rows/formulas/styles, and personal-tax-analysis spreadsheet rules.
- Actions taken: Removed the summary/metric block, shifted `REVENUE DISCREPANCY REVIEW - 2025` to row 4, shifted headers to row 5 and review rows to row 6, reduced the frozen pane to row 5, disabled wrapping on status/save-location/action columns, uploaded the workbook revision to Drive, and verified by read-back.
- Decisions made: Revenue discrepancy tabs should remain direct line-by-line review surfaces without a summary block above the table.
- Verification: Drive upload/read-back md5 matched `2b998fd39e580b9feedbbcbc842e5f2a`; workbook zip validation passed; read-back confirmed no wrapped note cells and no summary rows.
- Limitations or gaps: No revenue classification logic changed; open revenue evidence/payment tie-outs remain unchanged.

## 2026-05-06 - Nathan 2025 Investment In/Out Summary Restore

- User request: Restore the investment in/out summary in the 2025 investment tab because the staking income total was missing.
- Context read: Latest Drive workbook revision, `codex - invest - 2026-05-06`, annual `codex - 2025 - 2026-05-06` link, and the German personal tax analysis skill.
- Actions taken: Restored the formula-backed top summary block in `codex - invest - 2026-05-06` for investment out, staking income, net movement excluding transfers, transfer exclusions, and missing-basis metrics; kept annual `B31` linked to investment-out proceeds.
- Files changed: Nathan individual Drive/tax/source pointers, personal tax skill guidance, source/import logs, and memory ledgers.
- Verification: Uploaded the workbook to Drive, downloaded it back, matched md5 `abc2335acaf669d2946c88bc934d792c`, and validated the XLSX archive.
- Limitations or gaps: Final non-USDC gain treatment still needs detailed cost-basis lots.

## 2026-05-06 - Personal Tax Machine-Readable Template Workflow

- User request: Move the work into a new stacked branch, create a proper native Google Sheets personal-tax template, and remove active VUN/Nathan-era rules that clash with it.
- Context read: Current Office-mode personal-tax template, Nathan workbook audit trail, DATEV SKR04 source material, repo personal-tax/file-upload skills, Drive helper scripts, and active memory/process guidance.
- Actions taken: Created `codex/personal-tax-ledger-template`, created `RB German Personal Tax Analysis - Machine-Readable Template v1` as a native Google Sheet in the old template folder, and replaced active separated-Codex-tab guidance with the new raw-export/category-rules/journal/PNL/balance-sheet/checks workflow. After PR review, the active workflow was corrected so the maintained native Sheet is copied through the Google Drive/Sheets connector rather than regenerated from a local XLSX builder.
- Decisions made: Keep 2026-05-06 Nathan Codex workbook tabs as historical audit trail only.
- Verification: Drive metadata confirmed native Sheets and parent folder `1Zn2QvYXmRkf4lKD7grX_Q43ZBTvhweRe`; Sheets helper read-back confirmed frozen row 1, filters, category rules, raw bank formulas, and check formulas.
- Limitations or gaps: SKR04 seed rows are conservative and reviewable before filing; blank templates deliberately flag missing prior-year opening links until prior-year closing balances or explicit provisional plugs are entered.

## 2026-05-07 - Selin 2025 Personal Tax Setup

- User request: Test the German personal-tax template again by setting up Selin (CLV) for 2025, link Drive payslips that were missing in Notion, and add a process rule to notify the triggering person in Slack when analysis is ready for review.
- Context read: Selin individual and employment Notion records, 2025 personal-tax filing page, employment-linked payroll run pages, CLV Drive external folder structure, 2025 payslip folder, maintained native German personal-tax template, and current communications process.
- Actions taken: Copied the maintained native template into Selin's 2025 personal-tax Drive folder, linked January-June 2025 Drive payslips into the corresponding Notion payroll `Payslip` file fields, populated the workbook `Revenue` rows from all twelve 2025 payslips, set the Notion filing to in progress with the Drive folder URL, added a Notion page comment with the setup summary, and added the Slack completion-notification rule to the personal-tax and communications processes.
- Decisions made: Keep net salary formula-driven from payslip gross/tax/social/health source fields; leave expenses, investments, deductibles, credits, and prior-year tie-out as explicit review flags rather than implied claims.
- Verification: Workbook read-back shows EUR 28,800 gross employment income, EUR 3,096.96 wage tax withheld, twelve `Ready` revenue rows, OK journal/revenue checks, and expected fails for prior-year opening, expense review, investment confirmation, deductibles, and tax credits.
- Limitations or gaps: The Google Sheets connector returned `403` on the helper-created workbook while the Drive helper could read/write it; resolve connector access before requiring connector-only workbook edits. Slack send was not performed because no triggering Slack recipient was available in this Codex-triggered test.

## 2026-05-07 - Personal Tax Filing Status Sync Rule

- User request: Add a process rule so personal-tax analysis status changes update the corresponding Notion filing `Status`, document gathering moves to the right field status when the client has shared evidence, and newly created Drive folders are attached to the respective filing entry.
- Context read: German personal-tax skill, handoff/current-state memory, source registers, and the live Personal Tax Filings database fields/options.
- Actions taken: Added the filing-field sync rule to `skills/rb-personal-tax-analysis-de/SKILL.md`, durable handoff/current-state memory, skill runs, source register, and import log.
- Decisions made: Use the live database option spelling exactly: `In progress` while evidence is being uploaded/reviewed/reconciled, and `Attached in Drive` once all currently required evidence for the filing stage is in Drive and linked.
- Verification: Process-only edit; external field names/options were verified before updating the workflow.
- Limitations or gaps: Individual filings still need case-by-case factual review before status fields are changed.

## 2026-05-07 - Personal Tax Filing Task Pair Rule

- User request: If a personal-tax filing record has no attached task, add a process to create an analysis task assigned to Ioana from the annual personal-tax template, create a filing task assigned to Johnpaul that depends on the analysis, attach the correct client project to both, and comment on the filing task with the spreadsheet once analysis is ready.
- Context read: German personal-tax skill, live Personal Tax Filings schema, Tasks schema, `[Annually] Personal Tax Filing` task template, and Notion user records for Ioana Surdu-Bob and Johnpaul Okolie.
- Actions taken: Added the task-pair process to the German personal-tax workflow and mirrored it in handoff/current-state memory, skill runs, source register, and import log.
- Decisions made: Use `Preparation Task` for the analysis task and `Filing Task` for the filing task; set the filing task's `Dependent on` relation to the analysis task; use actual Notion comments for the filing-task handoff note and spreadsheet URL.
- Verification: Notion fetch verified `Preparation Task`, `Filing Task`, `Project`, `Dependent on`, and the template URL before editing process docs.
- Limitations or gaps: This was a process-only update; no live task pair was created in Notion during this step.

## 2026-05-13 - Future Personal Tax Prompt

- User request: Prepare a prompt that gets ideal results for future personal-tax returns, then publish the changes as a PR.
- Context read: Mark 2024 correction history, active German personal-tax skill, process index, and task-PR guidance.
- Actions taken: Added `processes/personal-tax-return-prompt.md` with a fill-in operator prompt covering source intake, fresh template-copy use, formula protection, evidence-backed expense rows, Notion filing/task synchronization, notifications, and read-back verification.
- Files changed: `processes/personal-tax-return-prompt.md`, `processes/index.md`, `skills/rb-personal-tax-analysis-de/SKILL.md`, and memory/source ledgers.
- Decisions made: Keep the prompt generic and reusable; do not encode Mark-only facts except as lessons in workflow form.
- Verification: The prompt reflects the current maintained-template workflow and asks future runs to verify tax-year-specific rules rather than assuming future statutory caps.

## 2026-05-13 - Mark 2024 Personal Tax Analysis Update

- User request: Prepare an updated personal-tax filing for Mark from the supplied Drive folder, excluding lower home costs/non-mobile Telekom and naturalization/non-business invoices, claiming home-office allowance, and adding EUR 15,000 GbR profit on top of EUR 7,000 stated revenue.
- Context read: User-provided Drive folder, V2 Office-mode workbook, receipts and TK certificate PDFs, Notion individual/filing/task context, and German personal-tax/home-office/business-meal source rules.
- Actions taken: Created and verified a V3 Office-mode workbook with revised income, expenses, home-office allowance, health/care insurance, and review notes; uploaded the workbook through the Google Drive connector; added Notion comments to the filing record and linked task; created Mark individual routing files and a minimal WEW linked-individual pointer.
- Files changed: `clients/Individuals/Mark James Frederick Wilshin/`, `clients/Companies/WEW/`, `memory/skill-runs.md`, `memory/open-questions.md`, `sources/source-register.md`, and `sources/import-log.md`.
- Decisions made: Keep raw receipt evidence in Drive; store only source pointers, analysis numbers, and blockers in git. The EUR 180 Catalanglish language-learning line was initially marked provisional, then confirmed in the same session as business language learning for the translation business.
- Verification: Local XLSX zip/import/read-back checks passed; key summary values are income EUR 22,000, expenses EUR 3,219.24, home-office EUR 1,260, gross income after expenses EUR 17,520.76, and health/care insurance EUR 6,232.81.
- Limitations or gaps: The uploaded V3 workbook exists in Drive but is not yet in the supplied Mark folder because the helper gcloud token lacks Drive scope and the connector upload path did not expose parent-folder placement.

## 2026-05-13 - Mark Language-Learning Expense Confirmation

- User request: Clarified that language learning is a business expense for Mark because the business is translation.
- Context read: Existing Mark V3 workbook and Mark individual routing notes from the same-day personal-tax update.
- Actions taken: Rebuilt and uploaded a corrected V3 Office-mode workbook marking the EUR 180 Catalanglish language-learning item as included business language learning; added Notion follow-up comments to the filing record and task; removed the language-learning business-purpose open question from local memory.
- Files changed: Mark individual files plus memory/source ledgers.
- Decisions made: Keep the expense amount unchanged at EUR 180; update only classification/review notes.
- Verification: Local XLSX file/zip/import read-back passed and still shows total business expenses EUR 3,219.24.
- Limitations or gaps: Corrected workbook upload still landed under connector parent `0APO_eChhDoQPUk9PVA`, not the supplied Mark folder.

## 2026-05-13 - Mark Template-Basis Correction

- User request: Asked why the current rule to create from the maintained machine-readable template was not followed.
- Context read: Active German personal-tax skill/template rules, Mark Office-mode V3 outputs, maintained RB German Personal Tax Analysis template, Drive helper auth state, and Google Drive/Notion connector capabilities.
- Actions taken: Acknowledged the earlier mistake, created a corrected machine-readable native Google Sheets artifact from the maintained template export, added Notion correction comments on the filing record and linked task, and marked the earlier Office-mode V3 workbooks as superseded in Mark's repo files.
- Files changed: Mark individual files plus global memory/source ledgers.
- Decisions made: Treat the earlier Office-mode V3 workbooks as historical/superseded; use `https://docs.google.com/spreadsheets/d/1vg2gcux923SDZi1RDKlowSf-dguLrSqMVv7HTCCScYk/edit` as the current review artifact.
- Verification: Local workbook import/read-back confirmed the machine-readable workbook figures: revenue EUR 22,000, business expenses incl. home-office EUR 4,479.24, business/freelance net PNL EUR 17,520.76, and health/care EUR 6,232.81. The initial income-after-deductions read-back was later superseded by the formula-tab repair entry. Google Drive metadata confirmed the uploaded artifact is a native Google Sheet with 28 tabs.
- Limitations or gaps: A true Drive-native template copy into Mark's supplied folder remains blocked because gcloud account auth lacks Drive scope and non-interactive reauthentication failed; the connector import path created the native Sheet but did not expose folder placement.

## 2026-05-13 - Mark Calculation-Tab Formula Repair

- User request: Reported that Mark's calculation tabs appeared to use hardcoded values instead of the template formulas and instructed that client-specific edits should stay out of formula cells.
- Context read: Google Sheets edit/formula workflow, RB German personal-tax skill, Mark source/client files, and the current Mark machine-readable workbook.
- Actions taken: Restored formula-driven calculation tabs and formula columns in the current Mark workbook, confined Mark-specific values to source/input cells, corrected the Mark workbook's `Tax Analysis` other-deductions formula so the business home-office route is not double-counted, applied the same deductible-group formula repair to the maintained template, added an explicit formula-tab guardrail to the German personal-tax skill, and updated Mark/repo records.
- Files changed: Mark individual files, German personal-tax skill, and global memory/source ledgers.
- Decisions made: Treat the earlier hardcoded calculation-tab figures as superseded. Current formula-driven figures are revenue EUR 22,000, business expenses incl. home-office EUR 4,479.24, net business PNL EUR 17,520.76, other personal deductions EUR 6,268.81, and income after deductions before tax-rate calculation EUR 11,251.95.
- Verification: Sheets range read-back confirmed formulas are present on the key Mark calculation outputs, maintained-template read-back confirmed the `Tax Analysis!B12` deductible-group formula, `git diff --check` passed, and `npm run typecheck` passed.

## 2026-05-13 - Mark Fresh Template Copy Invoice Rebuild

- User request: Instructed Codex to copy the template and fill it in again, only on the tabs actually populated, and questioned why the prior pass used Mark's doc rather than the actual invoices.
- Context read: Supplied Mark Drive folder, actual receipt PDFs where OCR was available, maintained native German personal-tax template, previous corrected workbook, and Drive helper auth state.
- Actions taken: Reauthenticated the Drive helper with Drive scope, created a true Drive-native copy of the maintained template in Mark's supplied folder, populated only `Setup`, `Revenue`, `Expenses`, and `Deductibles`, and rebuilt the inputs from actual invoice/receipt PDFs plus the explicit EUR 15,000 GbR-profit instruction.
- Decisions made: Supersede the intermediate corrected workbook `https://docs.google.com/spreadsheets/d/1vg2gcux923SDZi1RDKlowSf-dguLrSqMVv7HTCCScYk/edit`; the current workbook is `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit`. Exclude home costs/non-mobile Telekom, naturalization/non-business invoices, the second Catalanglish ticket, the missing M1-3 iCloud invoice, and unclaimed receipt rows.
- Verification: Sheets read-back confirmed formula-driven summary outputs: revenue EUR 22,000, business expenses incl. home-office EUR 4,466.18, net business PNL EUR 17,533.82, health/care EUR 6,232.81, other personal deductions EUR 6,268.81, and income after deductions EUR 11,265.01. The Mark-specific review checks noted at that point were later resolved on 2026-05-13.

## 2026-05-13 - Mark Expense Receipt Evidence Correction

- User request: Reported that the expense rows still were not backed by the individual receipts.
- Context read: Current fresh template-copy workbook, receipts folder `https://drive.google.com/drive/folders/1uAhkg_wsKd_GA1ABy_s5m5J0J81eF7sN`, existing Mark source/register files, and Google Sheets edit workflow.
- Actions taken: Rewrote only non-formula `Expenses` input cells into receipt-level rows with exact receipt-file URLs, split iCloud, Telekom mobile, EE mobile, and business meals into individual invoice/receipt rows, rendered scanned meal receipts where Drive OCR was empty, and added Notion correction comments to the filing record and linked task.
- Decisions made: Keep formulas untouched in `Expenses` and calculation tabs. Correct the business-meal claim from the prior aggregate to EUR 506.59, representing 70 percent of EUR 723.70 receipt-backed gross/tip-supported meal amounts.
- Verification: Sheets read-back found no receipts-folder URL remaining in `Expenses!A1:Q80`, confirmed formula cells remain present in key `Expenses` formula columns and `Tax Analysis!B3:B14`, and confirmed current formula-driven values: revenue EUR 22,000, business expenses incl. home-office EUR 4,479.95, net business PNL EUR 17,520.05, other personal deductions EUR 6,268.81, and income after deductions EUR 11,251.24.

## 2026-05-13 - Mark Final Open Questions Resolved

- User request: Resolved the Mark/WEW open questions: confirmed the EUR 15,000 GbR profit support, approved Telekom/EE mobile business-use treatment, instructed trust in the client for missing M1-3 iCloud and business-meal support, and asked whether the MacBook can legally be fully deducted.
- Context read: Mark individual open questions and tax-return notes, global memory questions/tasks, and BMF EStH 2024 computer-hardware/software useful-life guidance.
- Actions taken: Recorded the resolved decisions in Mark's individual files, global memory, source registers, and import log; moved the Mark finalisation task to done; added Notion comments to the filing record and filing task for filer visibility.
- Decisions made: Retain the full 2024 MacBook deduction route as a provisional tax-law analysis point because BMF guidance supports one-year useful-life treatment for notebook/computer hardware and does not require monthly acquisition-year pro-rating.
- Verification: Notion comments were created on the filing record and filing task. Repo records now show no active Mark/WEW personal-tax open questions from the 2026-05-13 list.

## 2026-05-11 - Communications-First Inbound Triage Review

- User request: Adjust the inbound triage workflow to remove slow global indexing and broad channel reads, prioritizing Gmail inbox and WhatsApp topic extraction instead.
- Context read: `AGENTS.md`, `skills/index.md`, inbound triage process/skill, process maintenance skill, memory capture skill, memory ledgers, handoff, source logs, and people-role defaults.
- Actions taken: Reworked inbound triage to capture communications first, split invoices/expenses before other work, query Business Partners/contracts/contract-linked Invoicing for contractor/business-partner invoices, check existing paid/completed records before creating Expenses, group remaining items by company/topic, require correspondence translations to feed task content, and use one assignee-tagged Slack closeout per triage when requested.
- Files changed: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, process/skill indexes, source logs, and memory files.
- Decisions made: Slack, signatures, files, Drive, Notion, and status systems are supporting systems for this workflow, not inbound channels to be queried just because access exists.
- Verification: `git diff --check` passed.
- Limitations or gaps: Next live run must verify Business Partners, Contract, and Invoicing field names plus Slack user mappings for assignee tags.
- Next step: Validate the workflow on the next supervised live triage.

## 2026-05-11 - RBL Invoice Validation And RB Commitment Task Rule

- User request: Address diff comments that Workhub validation is not an edge case, and add a rule that actionable RB-team statements should create tasks.
- Context read: RBL invoice files, inbound triage process/skill, communications process, source registers, import log, and existing memory ledgers.
- Actions taken: Moved Workhub invoice validation into `clients/Companies/RBL/invoices-payments-expenses.md`, deleted `clients/Companies/RBL/edge-cases.md`, renamed the general triage hook to client validation rules, and added task triggers for RB-side commitments such as “we will do/look/check/tell/update/send” or “I will”.
- Files changed: RBL client files, inbound triage process/skill, communications process, source logs, and memory files.
- Decisions made: Workhub validation is normal invoice validation inside the RBL finance domain, not a separate edge-case file.
- Verification: `git diff --check` passed.
- Limitations or gaps: User review still needed before running the senior-review/commit/push sequence.
- Next step: Ask the user to review.

## 2026-05-13 - CBMAX Client Context Load

- User request: Load CBMAX client context the same way other clients were loaded.
- Context read: `AGENTS.md`, storage/current-state/handoff memory, skill index, `rb-source-research`, `rb-client-file`, `rb-memory-capture`, Notion research skill, Gmail skill, existing VUN/CLV/RBL client folders, Notion Companies schema, CBMAX company/project/filing/contract/employment/correspondence/task records, Drive folder/search results, and Gmail CBMAX search results.
- Actions taken: Created `clients/Companies/CBMAX/` using the exact Notion `Reference`, added company history, linked individuals, tax/VAT, contracts, payroll/accounting, communications, invoices/payments, project, Drive, Notion backup, source register, backup locations, open questions, and no-op client process/skill placeholder files.
- Decisions made: Treat Simon as Semen based on the user's clarification; keep personal identifiers out of the company folder until individual folders are created; treat old `clients/cbmax/` Notion backup wording as superseded by the reference-based folder.
- Verification: Notion, Drive, and Gmail reads succeeded; Notion SQL query tool was unavailable, so relation-filtered exports remain pending; `git diff --check` passed before the CBMAX context commit.
- Limitations or gaps: No Notion writes or Slack closeout were sent; outbound Slack closeout would need user approval. Full invoice/expense/task backfill still needs direct relation-filtered export or targeted fetches.

## 2026-05-13 - CBMAX WhatsApp Tax Residence Refresh And Correction

- User request: Load the CBMAX WhatsApp chat and read the latest decisions, specifically keeping tax residence up to date; then corrected that the 2026-03-30 Irish-VAT/no-German-VAT guidance was not yet accepted retroactively.
- Context read: `rb-whatsapp-comms`, `rb-client-file`, `rb-memory-capture`, CBMAX client files, WhatsApp contact search for Claudio, and targeted WhatsApp message searches in `Brivio, Claudio | Richmond Blackwood`.
- Actions taken: Recorded the reviewed WhatsApp chat pointer, updated CBMAX tax/VAT files so the 2025 treatment stays in limbo pending ROS retroactive acceptance, and moved the older Germany/Ireland wording into Notion cleanup/review rather than the live answer.
- Decisions made: Keep CBMAX 2025 tax/VAT in limbo until ROS confirms the Irish VAT backdate from January 2025; Irish VAT `4388950KH` is issued, but the 2026-03-30 Irish-VAT/no-German-VAT guidance is pending, not settled.
- Verification: WhatsApp bridge was listening on `127.0.0.1:8080`; WhatsApp contact/message MCP reads succeeded after using targeted searches. `list_chats` still returned the known MCP response-type error, so direct chat search was avoided.
- Limitations or gaps: ROS final backdate/filing status is still unverified; older Notion tax-history wording still needs cleanup; no WhatsApp messages were sent.

## 2026-05-13 - Claudio Brivio Individual Context Load

- User request: After committing CBMAX context, create a separate commit for Claudio's personal-tax individual context, same as the other individual clients.
- Context read: `AGENTS.md`, `skills/index.md`, `rb-personal-tax-analysis-de`, Notion individual/employment/filing/task records, Drive 2024 personal-tax folder and tracker/notes, WhatsApp personal-tax decisions in `Brivio, Claudio | Richmond Blackwood`, Gmail searches, CBMAX linked-individuals, client folder standards, and durable memory ledgers.
- Actions taken: Created `clients/Individuals/Claudio Brivio/` using the legal name from Notion, routed personal-tax/private facts into individual files, wired CBMAX `linked-individuals.md` back to the new folder, and recorded source/open-question/memory pointers.
- Decisions made: Treat the existing 2024 evidence package as present but not filing-ready; keep Notion/Drive/task sync questions open rather than creating new tasks or changing live filing fields during a context-only load.
- Verification: Notion comments for the individual and filing records returned no comment threads; Drive folder listings and file fetches succeeded; Gmail search found no dedicated personal-tax email thread.
- Limitations or gaps: No Notion fields, Drive files, or outbound communications were changed. The 2024 filing still needs payroll, health-insurance, Section 138 AO, Joblift travel, and workbook-template review.

## 2026-05-13 - CBMAX PR Review Corrections

- User request: Apply review clarifications for CBMAX fee billing, Claudio individual-folder routing, and the canonical Drive folder.
- Context read: CBMAX company README, accounting/payroll, history, Drive locations, open questions, memory, source logs, and Claudio individual routing files.
- Actions taken: Clarified that EUR 950 is the discounted monthly RB fee because CBMAX pays in six-month H1/H2 bulk periods, with H1 already paid and recorded in Richmond Blackwood invoices; marked the CBMAX Drive folder as canonical; removed resolved Claudio individual-folder questions from company open questions; preserved only company-side pointers to Claudio's individual folder.
- Decisions made: Keep Claudio personal-tax/private detail only under `clients/Individuals/Claudio Brivio/` and avoid duplicating it in CBMAX company files.
- Verification: `git diff --check` passed after review corrections.
- Limitations or gaps: Exact Richmond Blackwood invoice IDs for H1/H2 billing still need invoice-record backfill.

## 2026-05-13 - CBMAX Drive Folder Review Follow-up

- User request: Confirm two remaining CBMAX Drive review points: whether `05. CBMAX Forgemate Ventures Limited (CBMAX)` supersedes the older 2026-05-04 pending question, and whether sibling folders should be linked or organized under the canonical folder.
- Context read: CBMAX Drive locations, open questions, backup locations, source registers, and durable memory.
- Actions taken: Marked the canonical Drive folder as superseding the older pending Drive-folder question, kept sibling folders linked from the CBMAX client file, and recorded that they should be organized under the canonical folder when Drive cleanup is in scope.
- Decisions made: Do not treat `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, or `CBMAX-payslips` as competing roots; treat them as CBMAX-related folders attached to the canonical folder decision.
- Verification: Repo-only edit; `git diff --check` passed.
- Limitations or gaps: No live Drive move/organization was performed during this repo update.

## 2026-05-13 - CBMAX Client Notes Review Cleanup

- User request: Resolve the CBMAX Client Notes & Updates backup question and clarify why the Slack closeout rule appeared in CBMAX-specific notes.
- Context read: CBMAX Notion backup files, backup locations, open questions, source logs, general client backup process, `rb-client-file`, and the existing `Codex provisional import - CBMAX` Client Notes & Updates page.
- Actions taken: Removed the CBMAX-specific open question about backing up the repo summary to Client Notes & Updates, recorded that no new/update page is needed for the 2026-05-13 repo summary, read back the existing internal Client Notes entry, and moved the Client Notes & Updates usage guidance into the general backup process/skill.
- Decisions made: Treat Client Notes & Updates as a client-facing context/update table, not a generic Codex repo-summary backup; keep the Slack closeout limitation as a general client-backfill rule rather than CBMAX-specific context.
- Verification: Notion fetch read the existing internal Client Notes page; `git diff --check` passed.
- Limitations or gaps: No live Notion Client Notes & Updates page was changed during this cleanup.

## 2026-05-13 - AGL And Byron Context Import

- User request: Load AGL context the same way as the other clients, route Byron's personal tax, record weekly Syntentia invoicing, and start from fresh `origin/main` after the Claudio branch merge.
- Context read: Notion company/project/employment/contracts/tax filings/personal-tax records, Google Drive AGL folders, Gmail Syntentia/ELSTER/SteuerGo threads, repo client templates, inbound triage process/skill, and memory/source logs.
- Actions taken: Created `clients/Companies/AGL/` and `clients/Individuals/Byron Jarvis Frasier/`, routed company facts and Byron personal-tax facts separately, captured the active Syntentia weekly service/expense invoicing format, and added a general recurring outbound invoicing rule plus AGL client hook to inbound triage.
- Decisions made: Treat AGL's Irish tax-residence/German PE/80-20 profit attribution as the current user-instructed operating position while marking Notion tax residence for review; record Ioana as the only director and Byron as UBO/board observer; keep Byron's US apartment, Roth/IRA, and brokerage context in the individual folder.
- Verification: Connector reads completed for Notion, Drive, and Gmail; no live Notion/Drive/Gmail records were modified during the import.
- Limitations or gaps: Needs user review, Notion reconciliation for stale company fields, Finanzamt feedback, next Dublin board meeting confirmation, and active Byron personal-tax workbook setup.
