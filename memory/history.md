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

## 2026-05-13 - RB Calling Bot Live Runtime Sync

- User request: Check n8n and ElevenLabs, update the repo with all new manual calling-bot changes, and create a PR for review.
- Context read: Live n8n workflow readbacks, live ElevenLabs agent/tool readbacks, existing calling-bot automation helpers, setup docs, and RB task PR workflow.
- Actions taken: Added `automation/sync-rb-calls-live-state.mjs`, `npm run calls:sync-live-state`, source-controlled readbacks under `automation/live-readbacks/`, the RB authority call setup skill, calling-bot setup guide, implementation map, test plan, and memory/source-log updates.
- Decisions made: Live readbacks are configuration evidence only; do not store API keys, MCP tokens, phone numbers, recordings, transcripts, or client call payloads in git.
- Verification: `npm run calls:sync-live-state`, `npm run calls:check-automation`, `npm run typecheck`, and `git diff --check` passed before commit. A targeted readback scan found only policy text, header/variable names, and `shareable_token: null`.
- Limitations or gaps: `RB Calls ElevenLabs Events` has active version `29dc070e-2951-4f7f-931b-6b24ea793fc5` and draft version `48d12009-db89-4c75-8df1-6e48564f12ed`; review before publishing or deploying over it.

## 2026-05-13 - RB Calling Bot API Language Override

- User request: Fix German calls starting in English, specifically by changing the ElevenLabs outbound API call to use the right language.
- Context read: Live n8n/ElevenLabs readbacks, ElevenLabs override settings, official ElevenLabs override documentation, and the current n8n voice payload source.
- Actions taken: Updated `RB Calls Voice Execution` so the outbound call payload sends `conversation_initiation_client_data.conversation_config_override.agent.language` as `de` for German contacts and `en` otherwise, while retaining prompt variables `language` and `language_code`. Updated the ElevenLabs agent to keep the user's default English opener and to set the German language-preset opener to a German equivalent.
- Decisions made: Prompt-only `{{language}}` is insufficient for call language selection; the n8n outbound API payload must set the ElevenLabs language override.
- Verification: n8n workflow `3xJh7hNK0Zl9T4zS` was validated, updated, and published at active version `360489d3-02da-4a84-bfbd-0a0d168054e9`; ElevenLabs `RB Call Bot` verified at version `agtvrsn_2001krh88kp2f49sq04f81qemvb3`; live readbacks confirm the API override payload and German preset first message.
- Limitations or gaps: A real German test call is still needed to verify ElevenLabs selects the `de` preset and speaks German from the opening.
