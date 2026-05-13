# Handoff

Status: active.
Imported: 2026-05-04.

## Next Session

1. Read `AGENTS.md`, `memory/storage-rules.md`, and `memory/current-state.md`.
2. Skim `memory/history.md` and `memory/skill-runs.md`.
3. Check `skills/index.md` before using repo-local helpers.
4. Review the active VUN company pilot in `clients/Companies/VUN/` and the linked individual pilot in `clients/Individuals/Nathan Mawali A Vandy/`.
5. Resolve `memory/open-questions.md` before creating client Notion pages or Drive folders.
6. Use Notion Companies `Reference` for company folders and Notion legal names for individual folders; do not invent slugs.
7. For growth work, use `internal/growth-sales-marketing.md` and `internal/marketing-creative-review.md`; HubSpot/API account analysis is on-demand only.
8. For WhatsApp work, read `setup/mcp/whatsapp.md` and `skills/rb-whatsapp-comms/SKILL.md` first. If a client export/backfill uses WhatsApp, file the resolved client contact/group JID in the owning entity's `communications.md` and `source-register.md`.
9. For outbound communications, use `skills/rb-communications/SKILL.md`.
10. For client history refreshes, use `skills/rb-client-file/SKILL.md`; after changing repo files, send `#rb-client-updates` a Notion-facing closeout listing only what was added or modified in Notion.
11. For German personal-tax spreadsheet work, start from the native machine-readable template `RB German Personal Tax Analysis - Machine-Readable Template v1` (`https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`) and use formula-driven revenue, expenses, raw exports, category rules, journal, PNL, balance sheet, checks, and missing-info tabs. Do not create new analyses through ad hoc `codex - ...` tabs in legacy workbooks.
12. For Notion database pages with actual comments, write comment/update notes in the page comments section rather than a database `Comments` field; if the connector cannot write the actual comment, stop and report the blocker.
13. For Slack messages requiring review, paste the proposed text in the Codex chat first. After user approval, send the approved text directly in Slack; do not create Slack drafts as the default review step.
14. For personal-tax analysis completion notifications, capture the triggering Slack user/channel/thread at intake when available. If the trigger comes from Codex/Notion/Drive without a Slack identity, ask the operator for the Slack recipient before sending the ready-for-review message.
15. For personal-tax filings, keep the live Notion Personal Tax Filings fields in sync whenever analysis, evidence, or Drive state changes: update `Status`, `Document gathering status`, and `GDrive Docs`, and verify by read-back. Use exact document-gathering options such as `In progress` and `Attached in Drive`.
16. For personal-tax filings without task relations, create a `Preparation Task` analysis task assigned to Ioana Surdu-Bob and a separate `Filing Task` assigned to Johnpaul Okolie, both attached to the correct client project. Set the filing task's `Dependent on` relation to the analysis task, and comment on the filing task with the analysis spreadsheet URL once it is ready for filing.
17. CBMAX context now lives in `clients/Companies/CBMAX/`. Before acting on tax/VAT items, review `tax-vat-filings.md`; latest WhatsApp plus user-correction context keeps the 2025 position in limbo until ROS accepts or rejects the retroactive Irish VAT backdate from January 2025. The 2026-03-30 Irish-VAT/no-German-VAT guidance is pending, not settled. The Hamburg tax-office task and old German/Ireland Notion wording remain cleanup/review items. User clarified that Simon is Semen, an employee through the Employment relation. User also confirmed the canonical Drive folder supersedes the older 2026-05-04 Drive-folder question, and the related folders `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, and `CBMAX-payslips` should stay linked from the client folder and be organized under the canonical folder when Drive cleanup is in scope.
18. Claudio Brivio personal-tax/private context now lives in `clients/Individuals/Claudio Brivio/`. Before doing Claudio German personal-tax work, review `personal-tax-returns.md`, `drive-locations.md`, and `open-questions.md`. Key blockers are February 2024 CBMAX payroll, CBMAX 2024 Lohnsteuerbescheinigung, TK/Hallesche reconciliation, Section 138 AO treatment for CBMAX and Job Guardian, Joblift travel classification, and whether to migrate the existing `.xlsx` analysis to the maintained native machine-readable template.
19. For AGL work, use `clients/Companies/AGL/` and `clients/Individuals/Byron Jarvis Frasier/`; keep company tax/invoicing/payroll in AGL and Byron personal-tax/US asset/investment context in the individual folder. Ioana is the only director; Byron is UBO and board observer. Notion company `Tax Residence` is now Ireland because user confirmed AGL is mainly Ireland with German PE/filings tracked through registrations. WhatsApp chat `Frasier, Byron | Richmond Blackwood` is recorded as a source pointer; never copy chat passwords/raw transcripts into git.
20. For AGL Syntentia weekly invoicing, load `clients/Companies/AGL/invoices-payments-expenses.md` and route through the general recurring invoice process. Do not create a bespoke recurring task named "make invoices for AGL"; create/update separate service and expense records, handle late expenses through the general evidence-aging/reminder process, and use the live monthly Notion task `https://www.notion.so/35fe41301314814096b2cdc5beb780fa` to ask Byron about planned vacation/off days for the next month. WhatsApp confirms this day-count/late-expense pattern. Future Syntentia emails should show `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.

## Caution

Do not mark provisional facts approved without explicit user review.

Do not move or create Drive client documents until group/external classification and company folder are confirmed.

Always ask the user to review the diff before committing, even when the environment/tooling is set to auto-review.

Do not resurrect earlier incorrect non-VUN client backup references. Redo each non-VUN client from the Notion Companies `Reference` property.

New process files from the pre-rebase work are intentionally stashed and should be restored only after review.

Repo-local helpers now exist. Use `rb-gmail-drafts` for email-specific sender, thread, signoff, and verified Gmail draft fallback rules. Gmail email drafting actions that touch Gmail must always use the repo-local gcloud-managed Gmail API helper path. SignNow helpers are generic only; do not infer RB signer identity or signing policy.

Optional WhatsApp MCP is ported but provisional. Use `setup/mcp/start-whatsapp-bridge.sh` only to manage the local bridge and use the `whatsapp` MCP tools for normal WhatsApp reads/sends. Do not commit QR/session state, SQLite databases, downloaded media, transcripts, or personal Codex config. Do not send WhatsApp messages/files without explicit user instruction and tool approval.

Outbound communication drafting happens in chat. Always show the sender identity before approval, including exact `From` name, email address, `Subject`, and source/reply thread for email when thread context exists. Prefer replying in the existing email thread whenever email context exists. After approval, send directly through the supported connector/MCP tool and log the sent communication in RB Communications (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`, data source `collection://3b849ad0-96b7-4972-a1ac-1a0203300e7b`). Do not use the Everguard/research Communications table for RB records. Software drafts are exception-only.

WhatsApp chat IDs should be saved as client communication pointers when a user asks or when a client export/backfill uses WhatsApp. Resolve the contact or group through the MCP tools and disambiguate any multiple matches with the user before filing. File company-operational pointers under `clients/Companies/<client-reference>/communications.md`, individual-owned pointers under `clients/Individuals/<legal-name>/communications.md`, add a matching source-register row, and keep the pointer provisional until the contact relationship and preferred-contact status are confirmed. A saved ID is not approval to monitor, backfill history, download media, or send messages.

Manual WhatsApp inbound monitoring now has a provisional process and skill. Use `skills/rb-whatsapp-inbound-monitor/SKILL.md` only when the user explicitly asks to check a saved client chat. For VUN, the saved Eran Peer chat checkpoint starts at 2026-05-05 23:41 IST with no historical backfill; first live run should inspect only messages after that checkpoint and store the latest inspected message ID after successful handling.

Inbound operating triage is now communication-first for client-speaking channels. Use `skills/rb-inbound-operating-triage/SKILL.md` for this workflow: read Gmail inbox first, then query WhatsApp by topic; do not query Slack, signatures, files, Drive, Notion, or status systems as inbound channels. Split invoices/expenses out before other work, route business-partner invoices through Business Partners/contracts/contract-linked Invoicing, check existing paid/completed records before creating Expenses, group the remaining chunks by company/topic, and send one assignee-tagged Slack closeout per triage only when requested/pre-authorized or approved.

AGL is imported provisionally. Current user-instructed tax position is mainly Irish tax residence with German PE, 80% IE / 20% DE profit attribution, 2024 German filing submitted and waiting for Finanzamt feedback, and 2024 IE corporation tax still pending. Ioana is the only director; Byron is UBO and board observer. Notion company `Tax Residence` was updated to Ireland on 2026-05-13; the superseded payroll-only tax-registration task was archived. Byron's personal tax includes Germany filings plus US apartment, Roth/IRA/brokerage review, WhatsApp payroll/evidence pointers, and Wamo-to-Wise salary-payment notes, all under `clients/Individuals/Byron Jarvis Frasier/`.

When reviewing client communications, create or update tasks for actionable Richmond Blackwood commitments even if the source message was sent by RB. Wording like "we will do", "we will look", "we will check", "we will tell/update/send", or "I will" should be treated as RB-owned action unless already complete or clearly owned elsewhere. RBL Workhub validation now lives directly in `clients/Companies/RBL/invoices-payments-expenses.md`; there is no separate RBL edge-case file.

VUN task and correspondence history was refreshed on 2026-05-07 from direct Notion page fetches. Future per-client backfills may need direct fetches when bulk Notion export is unavailable.

Connected follow-up tasks should use `Dependent on` on the follow-up task when the follow-up cannot start until the initial task is complete. Use `Is blocking` on the initial task only when that direction is clearer in the existing workflow.

Richmond Blackwood action follow-ups should be created in the Notion Tasks database and linked to the responsible company project. In this repository, use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required. Assign the task to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`; ask if ownership is unclear.

Selin Ozkohen / CLV is the active German personal-tax pilot. Local folders are `clients/Individuals/Selin Ozkohen/` and `clients/Companies/CLV/`. 2024 workbook: `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`. 2025 workbook: `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`. The 2025 setup linked January-June Drive payslips into Notion payroll `Payslip` fields and populated payroll revenue at EUR 28,800 gross and EUR 3,096.96 wage tax. Remaining 2025 checks are prior-year opening balance, expense document review, investment/no-investment confirmation, deductible review, and tax-credit review. The Google Sheets connector returned `403` on the helper-created 2025 workbook during setup; the Drive helper could read/write it.

Mark James Frederick Wilshin / WEW has a 2024 German personal-tax correction in `clients/Individuals/Mark James Frederick Wilshin/`. The current fresh template-copy workbook is `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit`; it is a true Drive-native copy of the maintained template in Mark's supplied folder. Earlier Office-mode V3 uploads and the intermediate corrected machine-readable workbook are superseded. Only `Setup`, `Revenue`, `Expenses`, and `Deductibles` were populated from invoice/receipt evidence and operator instruction; calculation tabs and formula cells remain template-driven. After operator review, `Expenses` was corrected to receipt-level rows with exact receipt-file URLs rather than folder-level evidence links. Current key figures are revenue EUR 22,000, business expenses including home-office EUR 4,479.95, net business PNL EUR 17,520.05, TK health/care EUR 6,232.81, other personal deductions EUR 6,268.81, and income after deductions before tax-rate calculation EUR 11,251.24. The 2026-05-13 operator review resolved the former blockers: GbR profit support confirmed, full 2024 MacBook treatment retained under BMF one-year computer-hardware guidance, mobile business-use percentages approved, missing M1-3 iCloud support trusted to the client and unclaimed, and business-meal formality support trusted to the client with the 70 percent limitation already applied. Normal final filing/professional review is still required before submission.

CBMAX company context was loaded on 2026-05-13. Company folder: `clients/Companies/CBMAX/`. Canonical Notion record: `https://www.notion.so/c71b32a86f424e63b63945fe63d7b45b`. Project: `https://www.notion.so/32fe413013148034830cf9a1281b2f10`. Canonical Drive folder confirmed by user review: `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn`; this supersedes the older 2026-05-04 pending Drive-folder question. Related folders `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, and `CBMAX-payslips` should remain linked from the repo client folder and be organized under the canonical folder when Drive cleanup is in scope. No new or updated Client Notes & Updates page is needed just to back up the 2026-05-13 repo summary; read Client Notes & Updates as client-facing context when relevant. WhatsApp chat reviewed: `Brivio, Claudio | Richmond Blackwood` / `120363203209263793@g.us`. Current tax/VAT status from WhatsApp plus user correction: limbo for 2025, Irish VAT number `4388950KH`, ROS backdate requested from January 2025, but retroactive acceptance not confirmed; do not treat the 2026-03-30 Irish-VAT/no-German-VAT guidance as settled until ROS confirms. Fee note: EUR 950 is the discounted monthly rate because the client pays six-month H1/H2 periods in bulk; H1 has already been paid and is recorded in Richmond Blackwood invoices. Open questions: sync old Notion tax-house wording with this pending position, confirm ROS final backdate/filing status, check Hamburg tax number `17/070/40128` against Berlin `29/648/60019`, and decide whether to create individual folders before importing Eran/Semen/Viktor private personal detail.

Claudio Brivio individual context was loaded on 2026-05-13. Individual folder: `clients/Individuals/Claudio Brivio/`. Notion individual: `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`. 2024 filing: `https://www.notion.so/2cae413013148064bf7ae889ec16af5c`; 2025 filing: `https://www.notion.so/342e41301314803eb579c68638fb3fb0`. 2024 Drive folder: `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv`; uploaded evidence package: `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC`; analysis spreadsheet: `https://docs.google.com/spreadsheets/d/1u6pS1K9MfBDn35o96iPgqQ27zxbZ1DG0/edit`. Existing Notion tasks found: `Claudio Personal Tax Filing` (`https://www.notion.so/352e4130131480e0b6f4deb6917c972b`, Done) and `Personal Tax Filing query` (`https://www.notion.so/358e413013148053bb73e0bc8e7247b3`, To Do). No Notion fields were changed during the context load. Do not duplicate Claudio personal-tax/private details in the CBMAX company folder.

## Verification

Last checked 2026-05-04:

- `git diff --check` passed.
- Markdown trailing whitespace scan passed.
- Prior-template business keyword scans passed.

Neutral infrastructure port verification on 2026-05-05:

- `npm install` completed with an `@signnow/api-client` engine warning on Node 18.7.0 and four high-severity npm audit findings.
- `npm run typecheck` passed.
- Helper smoke checks passed.
- `git diff --check` passed.
- Forbidden source carryover scans passed.

WhatsApp MCP port verification on 2026-05-05:

- Submodule status confirmed the pinned compatibility commit.
- `bash -n setup/mcp/start-whatsapp-bridge.sh` passed.
- `go test ./...` passed in `third_party/whatsapp-mcp/whatsapp-bridge` after sandbox escalation for Go build-cache writes.
- `python3 -m py_compile main.py whatsapp.py audio.py` passed in the MCP server.
- `npm run typecheck` passed.
- `git diff --check` passed.
- Source-specific business keyword scan passed.
