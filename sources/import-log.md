# Import Log

Status: active.

## 2026-06-01 - Germany Growth Notion Operating System

Applied:

- Created central Notion project `RB Germany Growth System`: `https://www.notion.so/372e41301314817bb344fbb0a11d9ae8`.
- Created live operating databases for the campaign: Audiences, Channels, Targets, and Compliance Checks. The initially-created separate growth outreach database was deleted by the user and superseded by canonical Communications. The initially-created summary table was later superseded by timestamp-based reporting and trashed.
- Seeded the first audience target, initially `Americans in Germany / relocating to Germany`, while keeping the overall system broader than that audience.
- Refined the first active audience target on 2026-06-01 to `American tech workers in Germany / relocating to Germany` and updated its Notion row with tech-worker qualification signals.
- Added `Audience Target` relations to Channels, Targets, and Compliance Checks so each item can target a specific group.
- Added optional Germany growth fields to existing Business Partners - Original (`https://www.notion.so/a179e21f0e014f4db65bbe59135c9d0f`): `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`.
- Trashed the superseded `RB DE Growth Partnerships` data source after search found no existing rows to migrate.
- Removed the stale Growth Partnerships relation from Audiences and updated the project page to point partnership prospects to Business Partners.
- Wired canonical Communications (`https://www.notion.so/1b5e4130131480ab84f3cca356736807`) into the growth system with optional `Audience Target`, `Growth Channel`, and `Sender Identity` fields for growth drafts, sends, replies, blockers, and follow-ups.
- Removed the stale growth-audience relation to the deleted outreach database; Audiences now has a relation back to canonical Communications.
- Linked the initial channel and compliance seed rows to the Americans audience target.
- Seeded channel rows for master orchestration, LinkedIn direct connect/message flow, Facebook group sponsorships, relocation-agent partnerships, and Reddit community presence for the first audience target.
- Split the Facebook group channel into separate live channel rows and skills for Facebook group partnerships/sponsorships and Facebook group posting/commenting after user clarified partnership acquisition and posting should not be mixed.
- Seeded compliance checks for Ioana identity verification across LinkedIn, Facebook, Reddit, and personal email, plus approved public-claim review.
- Created linked Tasks database rows for identity registry setup, multi-stage skill creation, daily run setup, and first research batches for LinkedIn, Facebook partnerships/posting, relocation agents, and Reddit.
- Added repo-local Germany growth skills for the master daily run, LinkedIn, Facebook partnerships, Facebook posting, relocation partners, and Reddit.
- Updated Reddit to direct community engagement after user removed moderator/sponsorship/commercial-counterparty Reddit routing; Reddit now uses Growth Targets and Communications only unless explicitly re-enabled.
- Added a limited Reddit DM route after user clarified DMs should be allowed when someone engages with our public post/comment or sends an inbound DM first. Cold/proactive DMs, modmail, sponsorships, paid posts, commercial counterparties, and Business Partner routing remain blocked.
- Recorded the hard outbound rule that send-ready stages must use Ioana and must block if the active connector or browser session is not verified as Ioana.
- Added icons to the live Germany growth operating databases after user clarified that databases should always include icons; canonical Communications already has the `📬` icon.
- Moved the five Germany growth operating databases out of the Germany Growth task project and into `RB Client Databases` (`https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`) after user clarified the project should be for tasks only.
- Added the LinkedIn internal operating target for the first audience: 320 blank connection requests/month, calculated as a 16-request planning baseline across 20 business days, with a normal send range of 15-20 blank requests/business day. This supersedes the earlier conservative 80/month quota.
- Added LinkedIn intra-day run modes for invite batches, acceptance checks, first-message packets, follow-up sweeps, reply triage, and reporting-only closeout.
- Added explicit reply-drafting and follow-up-drafting packet stages across the growth channel skills.
- Rewrote LinkedIn first-message, reply, and follow-up guidance so outreach is about who the person is and what they do, not RB services, tax/admin offerings, savings claims, sales paths, or booking a call. The Germany tax/admin pain opener is allowed only as shared human context before pivoting to the person's work.
- Tightened LinkedIn examples so founder outreach must sound natural and specific: name the company/product/work and a real public detail, avoid "saw the founder angle" and generic "what are you focused on" prompts, and ask a targeted question that proves the sender is actually connected into the person's work.
- Replaced self-labeling phrases like "as a fellow tech founder" and "I am a tech founder too" with a US-vs-Germany contrast pattern: tax/admin as one shared difference, plus one topic-specific difference tied to the prospect's work.
- Tightened the contrast pattern again so admin/taxes appears only as a passing joke, preferably "Admin and taxes I'm sure were much easier in the States", and broad prompts like "How are you thinking about that?" are blocked in favor of highly pointed decision/tradeoff questions.
- Blocked the broad opener "saw your work"; LinkedIn drafts must name a specific project, system, product, post, launch, or other concrete public signal instead.
- Added the relocation partner daily target: at least 5 new first-time email conversations with distinct Business Partner prospects per business day. Replies and follow-ups are tracked separately and do not count toward the target; first-time emails still require exact approval and immediate Ioana sender-session verification.
- Replaced the dedicated summary table with timestamp-based reporting: added timestamp fields to Audiences, Channels, Targets, Business Partners, Communications, and Compliance Checks; removed the stale Audiences relation to the summary table; and trashed `RB DE Growth Metrics` (`https://www.notion.so/0fa79723d1e74fb7a7eb2c491e517a53`).

Verification:

- Live Notion connector returned project, database, seed-row, task, and view URLs during create/read-back operations.
- Live Notion connector accepted icon updates for the growth operating databases and read-back verified canonical Communications has growth fields and the `📬` icon.
- Live Notion connector read-back verified the project page and linked Tasks rows no longer refer to a separate growth outreach database.
- Live Notion connector read-back verified Business Partners retained icon `🤝` and has the new optional growth fields.
- Live Notion connector move/read-back verified the five Germany growth operating databases now sit under `RB Client Databases`, while the Germany Growth project page has task-only scope copy and no child database blocks.
- Live Notion connector read-back verified the first audience row title is `American tech workers in Germany / relocating to Germany` and its messaging notes include the 320/month blank LinkedIn invite target, intra-day LinkedIn run modes, and first-message guidance.
- Live Notion connector read-back verified timestamp fields exist on Audiences, Channels, Growth Targets, Business Partners, Communications, and Compliance Checks, and the old summary table is trashed.
- Live Notion connector read-back verified the Reddit channel and Reddit identity check now allow reactive DMs only after public engagement or inbound DMs.
- Search of the superseded Growth Partnerships data source returned no rows before it was trashed, so no row migration was needed.
- Prospect PII was not imported into git; the repo stores operating pointers and provisional process notes only.

Open:

- Confirm whether the task project, teamspace-hosted growth databases, Business Partners growth fields, and canonical Communications fields are the canonical operating surface before enabling daily automation.
- Confirm future Germany growth audience targets beyond the first American tech workers audience.
- Confirm Ioana identity/session verification routes per channel before any send-capable stage runs.
- Clarify whether the user's "Refund" item is a separate channel, a campaign angle, or out of scope.

## 2026-05-22 - TPL / Techpacito Context Import

Applied:

- Created `clients/Companies/TPL/` from the Notion Companies `Reference` value and populated company-side context for TECHPACITO LIMITED.
- Captured user instruction that TPL is company-only, with no personal-tax scope.
- Saved the resolved WhatsApp route `Gupta, Pradeep | Richmond Blackwood` / `120363399422225301@g.us` as a route/source pointer only.
- Captured the contractor-on-record structure: Barden pays Richmond Blackwood, Richmond Blackwood forwards funds to TPL, and Richmond Blackwood charges an additional EUR 70/month.
- Captured the two contract routes to track: Barden/Richmond Blackwood and Richmond Blackwood/Techpacito.
- Captured the open registration point that all registrations have been received except international VAT.
- Captured the electric-car planning point, including user instruction that 75 percent accelerated depreciation should apply in 2025 after final acquisition details are confirmed.
- Captured the boundary that non-RB operational details should remain in their owning source systems; this was tightened on 2026-05-25 for Everguard details.

Verification:

- Notion, Drive, Gmail, WhatsApp, and Slack source context was reviewed from available connectors and local summaries.
- No live Notion, Drive, Gmail, Slack, or WhatsApp records were modified during this import.

Follow-up:

- 2026-05-24 user answers resolved the local/international VAT split: German tax number covers local 2025 registration, while USt-IdNr. remains pending. Notion VAT filing registration was updated to `Registered` / `TPL - DE VAT`.
- 2026-05-24 Notion employment rows for Pradeep and Sangita were updated from EUR 550 to EUR 600/month and verified by read-back.
- 2026-05-24 Gmail search found the car source: Mercedes-Benz VLE 300 electric order email `19dbf3b04574dbd8`.
- 2026-05-25 JP-owned Notion task `https://www.notion.so/36be413013148127893fcb3fc99958c8` was created/read back for submitting the remaining USt-IdNr./international VAT questions and confirming the VAT number. Existing direct Barden/VAT task `https://www.notion.so/365e4130131481a486b1d8f4f7e710d2` received a clarification comment that route changes should wait for the USt-IdNr./international VAT number.
- 2026-05-25 Drive creation follow-up: the saved `accounting-richmond-blackwood` persona authenticates as `accounting@richmondblackwood.com` but cannot access the target parent folder `02. RB Client Companies`; `ioana-eip` can access the parent but needs approval before being used for creation. The Mercedes-Benz order PDF was downloaded to temporary local storage for verification but could not be uploaded until the canonical `Correspondance` folder exists.
- 2026-05-25 CORE/CRO check: public CRO sources confirm CORE is the annual-return filing route and the CRO Gazette confirms TECHPACITO LIMITED / company number 786441 registration on 2025-04-16; direct CRO Open Services annual-return checking returned an API-credential error.
- Still open: submit remaining USt-IdNr. questions, confirm whether Barden can work with German VAT after USt-IdNr./international VAT is available, create/verify canonical Drive folder after resolving approved write-persona access, upload the Mercedes-Benz order PDF to `Correspondance`, and confirm final car acquisition/BIK/payroll treatment.

## 2026-05-21 - Accounting Team Updates Slack Closeout Process

Imported:

- User instruction in Codex conversation to add a process step that sends a Slack message when Accounting Team Updates follow-up tasks have been created and links the Team Updates page.
- Sibling-worktree Accounting Team Updates triage process and skill structure, with the 2026-05-21 Slack closeout rule added in this worktree.

Actions:

- Added `processes/accounting-team-updates-triage.md` and `skills/rb-accounting-team-updates-triage/SKILL.md` to the active worktree.
- Registered the process and skill in their indexes.
- Standardized the `#rb-client-updates` completion notice to run only after Notion task writes and Team Updates write-back are read back successfully.
- Mirrored the SOP into the RB Internal Knowledge Base at `https://www.notion.so/367e413013148175b709e35f31d37821` and read it back.

Unresolved:

- Validate the Slack closeout wording and message link capture on the next weekday automation run.

## 2026-05-19 - AKS And Anastasia Evgenyevna Kozhevnikova Context Import

Applied:

- Created `clients/Companies/AKS/` from the Notion Companies `Reference` value and populated company-side context for ANA KOVA STUDIO LIMITED.
- Created `clients/Individuals/Anastasia Evgenyevna Kozhevnikova/` after user confirmed full legal-name folder routing and routed personal-tax, payment-plan, penalty, ELSTER, and private correspondence context there.
- Captured user instruction that the AKS subscription includes all Anastasia personal-tax matters, that missed 2023 and 2024 personal taxes were filed, that 2025 personal and company filings are next, that AKS is not overdue except VAT, that VAT should be assumed not filed unless the user says otherwise, and that Ana replies slowly so information should be requested early.
- Captured the Finanzamt payment-plan sheet as the monitoring source and recorded that the stop-payment instruction depends on a fresh balance, 2025/future liabilities, and penalty status.
- Created live Notion tasks for payment-plan monitoring, penalty negotiation, and early 2025 information request, linked to the AKS project and assigned to the relevant owner. User clarified that negotiation with Finanzamt must happen ahead of the payment-plan stop-date review.
- Recorded WhatsApp chat name `Kova, Ana | Richmond Blackwood` as unresolved because messages were readable but chat-list/JID resolution failed.

Verification:

- Notion, Drive, Google Sheets, Gmail, WhatsApp, and Slack sources were read directly through connectors/MCP.
- Live Notion task creation was read back for `https://www.notion.so/365e4130131481eb8580f224d0be5adf`, `https://www.notion.so/365e413013148157b952c94c04d72d90`, and `https://www.notion.so/365e41301314818fbf0fe2dc9edf3cba`.
- No live Drive, Gmail, Slack, or WhatsApp records were modified during this import.

Follow-up:

- Resolve the exact WhatsApp JID before future approved sends or monitoring.
- File or confirm AKS Q4 2025 VAT and Q1 2026 VAT; assume not filed unless the user confirms otherwise.
- Confirm the 2025 company-tax filing record and owner.
- Confirm ELSTER activation before 2026-05-28.
- Confirm penalty-waiver response and final payment-plan stop date before advising Ana to stop paying.
- Use the maintained Codex template for new tax returns.
- Confirm whether April 2025 payslip evidence is stored elsewhere. January may not be expected because Ana may not have been employed then.

## 2026-05-18 - AMC And Aaron Context Import

Applied:

- Created `clients/Companies/AMC/` from the Notion Companies `Reference` value and populated company-side context for AARON MEDIC CHAMBERLAIN LIMITED.
- Created `clients/Individuals/Aaron Richard Chamberlain/` from Aaron's Notion first-name and last-name fields and routed personal-tax, garnishment, P-Konto/payment-plan, prior Gewerbe, and joint-filing context there.
- Captured user instruction that RB does Aaron's personal returns, that the prior accountant did not file 2023/2024, that RB filed those years, and that prior Gewerbe registration created trade-tax/VAT catch-up exposure for 2023, 2024, and Q1 2025 before deregistration.
- Stored the resolved WhatsApp route `Chamberlain, Aaron | Richmond Blackwood` / `120363378578862576@g.us` in the company and individual communication/source files.
- Captured the initial company filing status, then updated it after user clarification: VAT Q1 2026 and Slack's Q4 2025 VAT concern both need a separate VAT review, with Q1 bookkeeping still tied to missing invoice support.
- Captured AMC variable invoice rules: ask Aaron for exact billable work and travel/expense details, prepare invoice/expense support, get Aaron approval, then send from the accounting email using the historical counterparty template.
- Added live Notion comments to the Riot, Echo Sports LLC, and UVS contract pages with the captured invoice workflow/message-template rules.
- Updated and read back Riot and Echo Business Partner `Invoicing Email`, `Invoicing Email Cc`, and `Notes` fields.

Verification:

- Notion, Drive, Gmail, WhatsApp, and Slack sources were read directly through connectors/MCP.
- Live Notion comments were added to three AMC contract pages, and Riot/Echo Business Partner routing fields were updated and read back. No live Drive, Gmail, Slack, or WhatsApp records were modified during this import.
- Repo verification: `git diff --check` passed; trailing-whitespace scan was clean; AMC/Aaron client-file raw identifier scan found no IBAN/tax-number pattern matches.

Follow-up:

- Confirm VAT Q1 2026 and Slack Q4 2025 VAT through the separate VAT review, plus missing Q1 invoice list/evidence.
- Confirm whether the 2023/2024 P&L and balance-sheet package was submitted by the source deadlines: WhatsApp 2026-05-19 at latest and Notion before 2026-05-22.
- Confirm remaining balance after the garnishment transfer, monitor for future Finanzamt payment-plan response, and confirm whether P-Konto later becomes active.
- Before future Riot/Echo sends, use the updated Business Partner invoice-to/CC fields plus Business Partner notes; decide whether Notion should add multi-recipient invoice-routing fields.

## 2026-05-18 - SVL And Kristjan Context Import

Applied:

- Created `clients/Companies/SVL/` from the Notion Companies `Reference` value and populated company-side context for SOLINOVA LIMITED.
- Created `clients/Individuals/KRISTJAN MAR OLAFSSON/` from Kristjan's Notion first-name and last-name fields and routed personal-tax, prior freelancer, individual ELSTER, insurance, and personal Drive context there.
- Captured user instruction that SVL is the newest client, tax registration is still pending, Kristjan was previously a freelancer, and RB will do Kristjan's personal tax returns from 2026 onward.
- Stored the resolved WhatsApp route `Olafsson, Kristjan | Richmond Blackwood` / `120363409060100858@g.us` in the company and individual communication/source files.
- Captured SVL registration blockers, payroll-tax retroactivity, Lexware setup context, Mediainvesting monthly invoicing inputs, AI GreenBytes shareholder-register follow-up, and apartment-purchase structuring notes.
- Applied user answers from 2026-05-18: still waiting for tax registration; no registration-chase task here; filings are overdue with Finanzamt as blocker; Simoneta owns retroactive payroll tax; hours/bonus sheet is canonical; Lexware and WAMO costs are RB-side; personal-tax Drive year should be 2026; freelancer deregistration is pending via an open task; RB should set up Kristjan's individual/freelancer ELSTER; AI GreenBytes update is completed but JP needs to upload; apartment amount is about EUR 750k with a partner-company-sale hurdle.
- Renamed the mistaken Drive year folder from `2025` to `2026` and verified the Drive metadata title after update.

Verification:

- Notion, Drive, Gmail, WhatsApp, and Slack sources were read directly through connectors/MCP.
- No live Notion, Gmail, Slack, or WhatsApp records were modified during this import.
- Live Drive change after user answer: renamed Kristjan's mistaken personal-tax year folder from `2025` to `2026` and verified metadata.

Follow-up:

- Still open: Finanzamt/tax-number and VAT-number response, retroactive payroll-tax filings once registered, Kristjan freelancer deregistration task completion, individual/freelancer ELSTER setup, TK insurance response, linking the 2026 Drive folder to the Notion filing when personal-tax work starts, JP evidence upload for AI GreenBytes, and final real-estate loan/ownership/security structure.

## 2026-05-15 - MHL And Gabriel Context Import

Applied:

- Created `clients/Companies/MHL/` from the Notion Companies `Reference` value and populated company-side context for MINDHARBOUR LIMITED.
- Created `clients/Individuals/GABRIEL LOUIS MANUEL MULLER/` from Gabriel's Notion first/last-name fields and routed personal-tax, residency, and asset context there.
- Added Grey Desk Inc. context into the MHL/Gabriel files because Gabriel owns both and current funding/structuring decisions depend on separating or deliberately linking Grey Desk and MHL.
- Captured the Ferrari/company-car purchase, vehicle tax, Herzenssache insurance payment, MHL liquidity/funding route, and the Ltd & Co KG / Berlin apartment restructuring plan.
- Stored WhatsApp route pointers for `Grey Desk Restructuring` and Gabriel's contact search result. Raw transcripts, audio, media, credential files, ELSTER certificates, and Notion attachments were not copied into git.

Verification:

- Notion, Drive, Gmail, WhatsApp, and Slack sources were read directly through connectors/MCP.
- No live Notion, Drive, Gmail, Slack, or WhatsApp records were modified during this import.

Follow-up:

- User follow-up on 2026-05-15 resolved the billing route: MHL pays EUR 1k/month by Stripe for the European entity, and Grey Desk pays approximately USD 10.5k/month for international support.
- User follow-up resolved Co-KG status: the notary appointment was never booked; the service has been requested and is waiting on Byron signing availability and Gabriel's signature route.
- User confirmed the Kastanienallee apartment is intended to move under MHL/Co-KG on a flexible timeline, MMG is 100% personal and untouched since Gabriel moved to Germany, and future communication should aim to stay in the `Grey Desk Restructuring` WhatsApp group.
- Still open: Zoll-Portal rejection response, VAT registration response/tax number, future-dated filing status cleanup, and the Notion 2025 Gabriel personal-tax filing marked filed against the user instruction that personal taxes are done up to 2024.

## 2026-05-13 - Future Personal Tax Prompt

Applied:

- Added `processes/personal-tax-return-prompt.md` as a reusable operator prompt for future German personal-tax analysis requests.
- Linked the prompt from `processes/index.md` and `skills/rb-personal-tax-analysis-de/SKILL.md`.

Verification:

- Prompt incorporates the Mark correction lessons: fresh maintained-template copies, formula-tab protection, invoice/receipt-backed rows, exact evidence URLs, Notion preparation/filing task links, and read-back checks.

## 2026-05-13 - Mark 2024 Personal Tax Analysis Update

Applied:

- Reviewed the user-provided Mark Drive folder and V2 Office-mode workbook for the 2024 German personal-tax analysis.
- Initially prepared `Mark V3 Personal Tax Analysis Template - updated 2026-05-13.xlsx` from the V2 workbook, preserving Office-mode `.xlsx` format. This was later identified as the wrong template basis and is superseded.
- Updated the analysis to include EUR 22,000 income: EUR 7,000 TorUG revenue plus EUR 15,000 GbR profit per operator instruction.
- Excluded home costs and non-mobile Telekom/internet items from expenses and claimed the EUR 1,260 home-office daily allowance instead.
- Excluded naturalization/non-business invoices and the entertainment ticket line; included the narrower EUR 180 Catalanglish language-learning expense, later confirmed by the operator as business language learning for the translation business.
- Updated included business expenses to EUR 3,219.24 and health/care insurance to EUR 6,232.81.
- Uploaded the prepared V3 workbook through the Google Drive connector and added Notion page comments on the filing record and linked task. These comments were superseded by later correction comments.
- After operator clarification, rebuilt and uploaded a corrected V3 workbook marking the EUR 180 Catalanglish language-learning item as a confirmed business expense because Mark's business is translation. This Office-mode workbook is also superseded by the machine-readable correction.
- After operator review of the template-basis rule, created a corrected native Google Sheets artifact from the maintained RB German Personal Tax Analysis machine-readable template export: `https://docs.google.com/spreadsheets/d/1vg2gcux923SDZi1RDKlowSf-dguLrSqMVv7HTCCScYk/edit`.
- Added Notion correction comments on the filing record and linked task stating that both Office-mode V3 workbooks are superseded.
- After operator review of hardcoded calculation-tab values, repaired the current machine-readable workbook so calculation tabs are formula-driven again and Mark-specific data is confined to input/source cells.
- Applied the same `Tax Analysis` deductible-group formula repair to the maintained machine-readable template so future business-home-office workbooks do not double-count `business-betriebsausgaben` as personal deductions.
- After the operator instructed a clean rebuild, reauthenticated the Drive helper with Drive scope and created a true Drive-native copy of the maintained template in Mark's supplied folder: `https://docs.google.com/spreadsheets/d/1JtxaRuqQZv_2JhvPBND6R6uQkWN2xahokg0q24Rt5iw/edit`.
- Refilled only `Setup`, `Revenue`, `Expenses`, and `Deductibles` from actual invoice/receipt evidence where available and the explicit EUR 15,000 GbR-profit instruction. The intermediate corrected machine-readable workbook is superseded.
- After operator review of folder-level expense evidence links, rewrote `Expenses` receipt-backed rows so claimed expense entries point to exact receipt-file URLs. The business-meal row was split into F100-F107 receipt rows, correcting the claimed 70 percent meal share to EUR 506.59 from receipt-backed gross/tip-supported amounts.
- Added fresh Notion comments to the filing record and linked task with the new workbook URL, formula-driven read-back values, supersession note, and remaining review points.
- Added correction comments to the Notion filing record and linked task after the receipt-level `Expenses` repair.
- Created Mark's individual client routing folder and a minimal WEW linked-individuals pointer.
- After operator review of the final open questions, recorded confirmed EUR 15,000 GbR support, approved mobile business-use percentages, client-trusted missing M1-3 iCloud and business-meal support, and full 2024 MacBook treatment under BMF one-year computer-hardware useful-life guidance. Added matching Notion comments to the filing record and filing task.

Verification:

- Local XLSX zip validation and spreadsheet-tool import/read-back passed.
- Read-back confirmed summary values in the corrected machine-readable workbook: revenue EUR 22,000, business expenses before home-office EUR 3,219.24, business home-office allowance EUR 1,260, business expenses including home-office EUR 4,479.24, business/freelance net PNL EUR 17,520.76, health/care insurance EUR 6,232.81, special expense lump-sum baseline EUR 36, other personal deductions EUR 6,268.81, and formula-driven income after deductions before tax-rate calculation EUR 11,251.95.
- Google Drive metadata confirmed the corrected artifact exists as a native Google Sheet with 28 tabs. A later Sheets range read-back confirmed formula-driven `Tax Analysis` values for revenue EUR 22,000, business expenses EUR 4,479.24, net PNL EUR 17,520.76, other personal deductions EUR 6,268.81, and income after deductions EUR 11,251.95. Maintained-template read-back confirmed `Tax Analysis!B12` now excludes both `employment-werbungskosten` and `business-betriebsausgaben`.
- Fresh template-copy read-back confirmed formula-driven summary values: revenue EUR 22,000, business expenses before home-office EUR 3,206.18, business home-office allowance EUR 1,260, business expenses including home-office EUR 4,466.18, business/freelance net PNL EUR 17,533.82, health/care insurance EUR 6,232.81, other personal deductions EUR 6,268.81, and formula-driven income after deductions before tax-rate calculation EUR 11,265.01.
- Receipt-level expense correction read-back confirmed no receipts-folder URL remains in `Expenses!A1:Q80`, formula cells remain present in key `Expenses` formula columns and `Tax Analysis!B3:B14`, and current formula-driven values are business expenses before home-office EUR 3,219.95, business expenses including home-office EUR 4,479.95, net business PNL EUR 17,520.05, and income after deductions EUR 11,251.24.
- BMF EStH 2024 source review supports the provisional analysis route for full 2024 MacBook treatment through one-year computer-hardware useful-life guidance.

Follow-up:

- The fresh template-copy workbook is in the supplied Mark folder. The prior Mark open questions were resolved by operator review on 2026-05-13; final filing still needs normal professional/operator review before submission.
## 2026-05-14 - Personal Tax Filing Task Unblock Slack Rule

Imported:

- User instruction in Codex conversation to add a process step for sharing a `#rb-client-updates` Slack update when Claudio's filing task is unblocked, tagging/linking the filing task.

Actions:

- Updated `skills/rb-personal-tax-analysis-de/SKILL.md` so an unblocked personal-tax `Filing Task` requires an approved `#rb-client-updates` update with the Notion filing task link as the primary task reference.
- Updated `processes/communications.md` and durable memory with the same rule.
- Prepared a Slack-ready Claudio unblock message for approval.

Unresolved:

- Send/log the Slack message only after the exact message is approved.

## 2026-05-14 - Claudio Brivio 2024 Operator Review Applied

Imported:

- User review instruction in Codex conversation approving the healthcare treatment and selecting which deductions/exclusions to apply.
- Hallesche folder `https://drive.google.com/drive/folders/15eI6Owgh5SXh8Z_6_728EWFYCeocxPNr`, including exact tax certificate `https://drive.google.com/file/d/1armzvPsmWw21VkH0q3TYJEG-78Wa3Aw9/view` and policy/employer certificate `https://drive.google.com/file/d/1Z7pLPaQ23p2xANC_6MsjpcEflN38j0d3/view`.
- Live workbook read-back from `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit`.

Actions:

- Updated workbook source/input tabs only: claimed health/care, 206 home-office days, Pixel Buds, and mobile-phone professional share; excluded CBMAX February payroll, commute, Telekom internet, and Hallesche non-basic/supplemental amount.
- Corrected the Hallesche workbook evidence URL from an inaccessible file ID to the exact valid certificate URL.
- Added workbook source notes that N26 sits in `Sources`, not `Investment Lots`, until Anlage KAP/KAP-AUS classification is completed.
- Added actual Notion comments to the 2024 filing record, preparation task, and filing task with the operator decisions and remaining flags.
- Updated Claudio individual repo files and durable memory.

Unresolved:

- N26 investment statement classification before clearing Anlage KAP/KAP-AUS.
- CBMAX 2024 annual Lohnsteuerbescheinigung verification or documented unavailability.
- Section 138 AO late/proactive wording and foreign-company risk review for CBMAX and Job Guardian.
- Optional extraction of Freenet individual invoice PDFs from the Drive ZIP if the filer wants invoice-level evidence separated.

## 2026-05-13 - Claudio Brivio 2024 German Personal Tax Analysis

Imported:

- Repo-local workflow `skills/rb-personal-tax-analysis-de/SKILL.md`; requested process prompt path `processes/personal-tax-return-prompt.md` was not present in this worktree.
- Notion filing `https://www.notion.so/2cae413013148064bf7ae889ec16af5c` and individual `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`.
- User-provided canonical Drive filing folder `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe`.
- Maintained German personal-tax template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.
- Key evidence rows from the 2024 Drive package: Joblift payroll/tax certificate, CBMAX March-December payslips and employment contract, Hallesche section 10 certificate, Pixel Buds receipt, home-office/commute tracker, phone/internet ZIP pointers, foreign-company evidence, and N26 tax-statement pointer.

Actions:

- Created fresh native workbook `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit` in the canonical filing folder.
- Populated source/input tabs only and preserved formula/calculation tabs.
- Created Notion preparation task `https://www.notion.so/35fe41301314813ea514ed9b61092962` and dependent filing task `https://www.notion.so/35fe41301314817b879cc3ab8c4160dc`.
- Updated the 2024 filing record with `Preparation Task`, `Filing Task`, canonical `GDrive Docs`, `Status = In progress`, and `Document gathering status = In progress`.
- Added actual Notion comments to the filing and task pages with workbook link, summary figures, and filing blockers.
- Updated Claudio individual repo files and durable memory with the workbook/task pointers and remaining review flags.

Unresolved:

- CBMAX February payroll and 2024 annual Lohnsteuerbescheinigung.
- TK annual/termination evidence and Hallesche overlap reconciliation.
- Home-office/commute day and first-workplace review.
- Telekom/Freenet invoice ZIP review and individual invoice extraction if claimed.
- N26 investment statement content review/reclassification.
- Section 138 AO notification handling and foreign-company risk review.
- Workbook read-back shows 9 failed checks and 34 open missing-info items before filing.

## 2026-05-13 - CBMAX WhatsApp Tax Residence Refresh And Correction

Imported:

- WhatsApp chat `Brivio, Claudio | Richmond Blackwood` / `120363203209263793@g.us`.
- Contact search for `Claudio`, followed by targeted WhatsApp message searches for CBMAX tax/VAT terms and recent messages after 2026-03-01.
- User correction that the 2026-03-30 Irish-VAT/no-German-VAT guidance was not yet accepted retroactively and should stay in limbo until ROS accepts the backdate.

Actions:

- Updated CBMAX `tax-vat-filings.md` to keep 2025 VAT/tax-residence treatment in limbo pending ROS retroactive Irish VAT acceptance.
- Recorded WhatsApp support for Irish VAT number `4388950KH`, intended retroactive VAT handling from January 2025, ROS backdate follow-up after the board meeting, and user correction that the 2026-03-30 Irish-VAT/no-German-VAT guidance is pending rather than settled.
- Updated CBMAX communications, source register, open questions, memory current state, and handoff.

Unresolved:

- Confirm ROS's final response to the Irish VAT backdate request and the status/payment outcome of the seven pending VAT filings.
- Sync the older Notion tax-history callout so it reflects the pending/limbo position.
- Confirm whether German VAT identifiers should remain historical-only, be written back to Notion, or remain outside the active company field.

## 2026-05-13 - CBMAX Client Context Load

Imported:

- Notion company record `https://www.notion.so/c71b32a86f424e63b63945fe63d7b45b`, confirming exact company `Reference` value `CBMAX`.
- Notion client project `https://www.notion.so/32fe413013148034830cf9a1281b2f10`.
- Notion individual records for Claudio Brivio and Eran Peer, used only for company-side relationship mapping.
- Notion employment records for Claudio, Semen, and Viktor.
- Notion filing-registration, contract, correspondence, and task records for high-signal CBMAX context.
- Drive folder `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn` and selected top-level contents; user later confirmed this is the relevant CBMAX Drive folder.
- Gmail search results for CBMAX invoice correction, May 2026 letter, WeBuild invoice, and Lexware messages.
- User clarification that Simon is Semen and Semen is an employee through the Employment relation.

Actions:

- Created `clients/Companies/CBMAX/` and routed company facts into domain files.
- Recorded the old `clients/cbmax/` Notion import note as superseded by the reference-based folder.
- Recorded open questions for tax-house status, Hamburg/Berlin VAT number mismatch, invoice correction backfill, and private individual-folder routing.

Unresolved:

- Notion SQL/data-source query errored, so full relation-filtered invoice/expense/task backfill remains pending.
- No Notion update page or Slack closeout was sent; any outbound closeout needs review/approval first.

Review update on 2026-05-13:

- User clarified the EUR 950 monthly RB fee is after discount because CBMAX pays six-month H1/H2 periods in bulk; H1 has already been paid and is recorded in Richmond Blackwood invoices.
- User confirmed Claudio's individual folder question is resolved because Claudio's personal-tax context was imported separately; avoid duplicate personal-tax detail in the company folder.
- User confirmed Drive folder `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn` as the CBMAX folder.

Follow-up confirmation on 2026-05-13:

- User confirmed `05. CBMAX Forgemate Ventures Limited (CBMAX)` supersedes the older pending Drive-folder question from the 2026-05-04 provisional import.
- User confirmed `02.2_CBMAX_Feb-Dec`, `03.1_CBMAX_Ireland`, and `CBMAX-payslips` are valid CBMAX-related sibling folders to link from the client folder and organize under the canonical folder when Drive cleanup is in scope.
- Repo pointers were updated; no live Drive move/organization was performed during this update.

Client Notes & Updates review on 2026-05-13:

- User confirmed the 2026-05-13 CBMAX repo summary does not need to be backed up as a new Client Notes & Updates page or used to update the existing `Codex provisional import - CBMAX` page.
- User clarified that Client Notes & Updates is used for important client-facing information and can be read as context during future client work.
- User noted that the Slack closeout rule about listing only Notion records actually added or modified is a general process rule, not CBMAX-specific.
- Read the existing `Codex provisional import - CBMAX` Client Notes & Updates page; it is an internal record with the old `clients/cbmax/` path and fragments for invoice correction, `CBMAX Financial Analysis`, and possible employment/accounting context.
- Updated CBMAX backup/open-question files and the general client backup process/skill; no live Notion Client Notes & Updates page was changed.

## 2026-05-13 - AGL And Byron Context Import

Applied:

- Created `clients/Companies/AGL/` from the Notion company `Reference` and populated company-side context from Notion, Drive, Gmail, and user instruction.
- Created `clients/Individuals/Byron Jarvis Frasier/` for Byron-specific personal-tax, US asset/investment, bank-account, and filing context.
- Recorded AGL's current tax position: Irish tax resident, Ioana as sole director, German PE for Byron/staff, filings in IE and DE, 80%/20% IE/DE profit attribution, 2024 German filings submitted and awaiting Finanzamt feedback, and 2024 IE corporation tax still pending.
- Captured the weekly Syntentia billing rule, monthly planned vacation/off-days check, and exact future email format in `clients/Companies/AGL/invoices-payments-expenses.md`.
- Added the general recurring outbound invoicing rule and AGL Syntentia hook to inbound operating triage process/skill so this does not become a bespoke AGL task.

Verification:

- Notion, Drive, and Gmail sources were read directly through connectors; no Notion, Drive, Gmail, Slack, or WhatsApp records were modified.
- Canonical Drive folder `04. Agile Lincs Limited (AGL)` was found under the external client root.

Follow-up:

- Wait for Finanzamt feedback before treating the 2024 German PE allocation as accepted; user confirmed no feedback yet on 2026-05-13.
- Confirm next Dublin quarterly board meeting and complete the 2024 IE corporation tax filing once the use-case handling is settled.
- Set up Byron personal-tax analysis from the maintained native German personal-tax template when active work begins.

WhatsApp export update on 2026-05-13:

- Resolved WhatsApp chat `Frasier, Byron | Richmond Blackwood` / `120363222065866778@g.us` through Byron contact search and contact-chat lookup.
- Searched targeted terms for AGL/Syntentia/tax/holiday/expense/Dublin/remote/salary/bond context.
- Added source pointers and summarized context to AGL communications, source register, contracts/authority, invoicing, open questions, and Byron individual personal-tax, tax-filings, bank-account, expense, and source-register files.
- Recorded that passwords/raw transcript/media were not copied into git.
- Open follow-ups: verify 2026-02-24 board-meeting attendance/minutes, confirm payroll/personal-tax evidence against Drive/source files, and keep using source invoices/Gmail/Notion records as evidence of amounts billed.

Review follow-up and Notion writes on 2026-05-13:

- User confirmed AGL is both Ireland/Germany operationally but mainly Ireland for the company `Tax Residence` field.
- Updated live Notion company `Tax Residence` from Germany to Ireland and added a page comment explaining German PE/filings remain active.
- User confirmed there is no Finanzamt feedback yet, so German PE allocation acceptance and 2024 IE corporation tax timing remain open.
- User confirmed future Syntentia sends should use `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- User confirmed the old payroll-only task is superseded by the file-in-both position and live registrations; archived task `https://www.notion.so/332e41301314818d8e09ea455a3d61b2` with a comment.
- Created monthly task `https://www.notion.so/35fe41301314814096b2cdc5beb780fa` assigned to Simoneta to ask Byron about planned vacation/off days for the next month.

Process update on 2026-05-13:

- Source: user instruction that exports/backfills using WhatsApp must store the client chat ID because future approved sends or communication reads often need that route.
- Imported to: `AGENTS.md`, `processes/knowledge-backup-and-source-control.md`, `processes/communications.md`, `skills/rb-source-research/SKILL.md`, `skills/rb-client-file/SKILL.md`, `skills/rb-whatsapp-comms/SKILL.md`, company/individual communication templates, `clients/README.md`, `sources/source-register.md`, and durable memory.
- Status: provisional.
- Unresolved: future exports must still ask the operator to choose before filing if multiple WhatsApp contacts or groups are plausible.

## 2026-05-08 - Company Client File Routing Cleanup

Applied:

- Removed duplicated Selin personal-tax details from CLV company records.
- Merged company people/contact routing into `linked-individuals.md` and removed separate company `people-and-contacts.md` files from CLV, VUN, and the company template.
- Moved shared Drive root navigation into the company Drive template and removed the external root URL from CLV's client file.
- Cleared CLV payroll naming open questions after user said no action was needed.

Verification:

- Search confirmed no `people-and-contacts.md` files remain under `clients/Companies`.
- `git diff --check` passed.

## 2026-05-08 - German Personal Tax PR Review Cleanup

Applied:

- Reorganized the German personal-tax skill so the main workflow is shorter and detailed workbook controls live in a separate `Template Control Rules` section.
- Kept the local XLSX/template-builder deletion active; the maintained native Google Sheet remains the template source of truth.
- Updated the maintained template and Selin 2024/2025 workbooks so the home-office daily row notes say no receipt is required, but the 210-day/no-external-office assumption still needs final filing review.
- Added `Direct tax payment/prepayment status` to `Setup` and direct tax payment/prepayment confirmation rows to `Missing Info` and `Checks`.

Verification:

- Drive helper read-back confirmed direct tax payment/prepayment confirmation now flags `1` / `FAIL` in the maintained template and both Selin workbooks until reviewed, provided, or confirmed none.
- Drive helper read-back confirmed Selin 2024/2025 home-office daily rows still include 210 days / EUR 1,260 and now carry the controller-review note.

## 2026-05-07 - Selin Home-Office Daily-Allowance Clarification

Applied:

- Updated the maintained native German personal-tax template and Selin 2024/2025 workbooks so the normal home-office route is `home-office-daily`, not the dedicated-room row.
- Per 2026-05-08 operator instruction, Selin 2024/2025 claim the maximum daily allowance: 210 days x EUR 6, capped at EUR 1,260.
- Corrected the `Summary` outcome to show `Home-office daily allowance included` and sum only `home-office-daily`.
- Updated Selin open questions and workflow notes so final review focuses on the no-external-office/workplace assumption rather than room eligibility.

Verification:

- Drive helper read-back confirmed the template and both Selin workbooks use the daily row for home office, keep the room row inactive, and use `=SUMIFS(Deductibles!$R:$R,Deductibles!$C:$C,"home-office-daily")` in Summary.
- Drive helper read-back confirmed income after deductions at EUR 17,718.70 for 2024 and EUR 27,504.00 for 2025 after the daily allowance update.

## 2026-05-07 - Selin Special Expense Baseline And 2025 Filing Tasks

Applied:

- Updated the maintained native German personal-tax template so the `ded-special-expense-lump-sum` row is treated as an automatic `Baseline only` deductible with evidence `Not required`.
- Applied the same correction to Selin's 2024 and 2025 workbooks, including formula-driven tax-year references from `Setup`.
- Created Selin's 2025 personal tax analysis task assigned to Ioana Surdu-Bob and linked it to the 2025 filing record through `Preparation Task`.
- Created Selin's 2025 personal tax filing task assigned to Johnpaul Okolie, linked it to the same CLV client project, made it dependent on the analysis task, and linked it to the filing record through `Filing Task`.
- Added an actual Notion page comment on the filing task pointing the filer to the analysis workbook, filing row, Drive folder, and remaining review flags.

Verification:

- Current Drive helper read-back after the later home-office update confirms Selin 2024 other personal deductions are EUR 9,821.30, employment work expenses used are EUR 1,260, and income after deductions is EUR 17,718.70.
- Current Drive helper read-back after the later home-office update confirms Selin 2025 other personal deductions are EUR 36, employment work expenses used are EUR 1,260, and income after deductions is EUR 27,504.00.
- Notion read-back confirmed the 2025 filing row has both `Preparation Task` and `Filing Task`, the filing task is dependent on the analysis task, and the filing-task comment was created.

## 2026-05-07 - Richmond Blackwood Follow-Up Task Rule

Applied:

- Added the rule that Richmond Blackwood action follow-ups must be created in the Notion Tasks database and linked to the relevant company project.
- Recorded `Richmond Blackwood Backlog` as the default project for this repository: `https://www.notion.so/25de4130131481769758f5f2d465a141`.
- Updated the communications process, client backup process, Notion operations process, communications skill, client filing skill, Notion database standards, AGENTS instructions, and handoff memory.

Verification:

- Fetched the Richmond Blackwood Backlog project and an existing linked task to confirm the Tasks data source and core task fields.

## 2026-05-07 - Entity Ownership Rule For Client Records

Applied:

- Corrected the VUN Slack closeout record in RB Communications so it is linked to VANDY UN LIMITED only.
- Updated RB Communications database guidance so each communication belongs to either a company or an individual, not both.
- Added the same either/or ownership rule for communications, bank accounts, assets, and expenses to the client backup process, client filing skill, communications process, communications skill, Notion database standards, storage rules, and client templates.

Verification:

- Directly fetched the VUN Slack closeout record to confirm it is company-only in RB Communications.

## 2026-05-07 - RB Communications Database Correction

Applied:

- Created the canonical `RB Communications` database under RB Client Databases: `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.
- Added company and individual relation fields so each communication record can belong to either a company or an individual, not both.
- Added table views for all communications, by company, by individual, and follow-ups.
- Moved the VUN Slack closeout communication record out of the Everguard/research Communications table and into RB Communications.
- Linked the moved VUN Slack closeout record to VANDY UN LIMITED only because it is a company-operational closeout.
- Updated communication process rules so future RB communication logging uses RB Communications only, with a single owning entity relation.

Verification:

- Directly fetched the new RB Communications database and moved VUN Slack closeout record.
- Directly fetched the moved record to confirm its new RB Communications parent and company-only relation.

## 2026-05-07 - VUN Personal Tax Task Split And Filing Follow-Ups

Applied:

- Narrowed the VUN 2023 + 2024 VAT/tax analysis task in Notion.
- Kept the 2025 personal tax analysis as a separate Notion task because it has a separate spreadsheet/source set.
- Added review comments to the Notion analysis tasks so progress is visible inside Notion.
- Created separate 2023 + 2024 and 2025 personal tax filing follow-up tasks in Notion, assigned to Johnpaul Okolie.
- Set `Dependent on` on each filing follow-up task to the relevant analysis task and added dependency comments.
- Added task-comment and filing-follow-up standards to the client backfill and personal tax process rules.
- Updated VUN and Nathan local routing files to reflect the Notion task changes.

Verification:

- Fetched the updated Notion analysis tasks and new filing tasks to confirm comments, assignment, labels, and VUN project relation.

Follow-up:

- Filing task completion still needs filing evidence before any filed status is recorded.

## 2026-05-07 - VUN Task And Correspondence History Refresh

Applied:

- Fetched the VUN company record, client project, linked task records, and linked correspondence records from Notion.
- Updated VUN task history in `clients/Companies/VUN/client-project.md`, separating active/review tasks, completed/historical tasks, and deleted task records.
- Updated VUN correspondence history in `clients/Companies/VUN/communications.md`, replacing the unresolved link list with dated summaries.
- Added a task/correspondence timeline to `clients/Companies/VUN/history.md`.
- Registered the source pass in `clients/Companies/VUN/source-register.md`.
- Added standard Slack closeout reporting to `processes/knowledge-backup-and-source-control.md` and `skills/rb-client-file/SKILL.md`.
- Sent and corrected the requested closeout in `#rb-client-updates`: `https://eipventuresworkspace.slack.com/archives/C0B1UTJJDLJ/p1778160684561399`.
- Logged the closeout in RB Communications: `https://www.notion.so/359e4130131481c2aa5aed36559669d0`.

Verification:

- Direct Notion page fetches completed for all linked VUN project tasks and company correspondence records.
- `git diff --check` passed.

Follow-up:

- Future task/correspondence refreshes should use the most reliable available Notion read path and keep Slack closeouts Notion-facing.
- Individual-specific personal insolvency and personal tax details may need further routing under `clients/Individuals/Nathan Mawali A Vandy/`.

## 2026-05-07 - German Personal Tax Deductibles/Credits Template Iteration

Applied:

- Updated the maintained native German machine-readable template and Selin pilot workbook to add `Summary`, `Tax Analysis`, `Deductibles`, `Tax Credits`, and `Tax Payments` tabs.
- Seeded German personal deduction and tax-credit rows with source URLs for home-office allowance, employee lump sum, commuting, pension/insurance, childcare, donations, household/handyman credits, political-party credits, energetic renovation credits, and tax payments/prepayments.
- Updated the German personal-tax-analysis skill so future work treats deductibles, credits, and tax payments as separate formula-driven workflow areas.
- Recorded Selin's home-office deductible question in her open questions because the user confirmed she worked from home; this was later superseded by the 2026-05-08 operator instruction to claim the maximum 210 daily-allowance days.
- Retried Google Drive helper access after browser re-auth, updated the live master template, and migrated Selin's live workbook to include the new tabs while preserving the existing Revenue rows.
- Repaired a live Google Sheets formula-display issue reported from Selin's `Summary` tab: formulas were syntactically correct but had been parsed before referenced tabs existed in the same migration batch. Rewrote affected formulas after tab creation and fixed `Summary!C20` to quote `'Missing Info'`.
- Repaired `Tax Analysis` logic in the live master template and Selin workbook: employee lump-sum baseline now uses the potential baseline when employment income exists, known payments/withholding excludes tax credits, and credits/payments/withholding are shown separately before final tax calculation.
- Corrected the deductible/tax-credit review posture in the live master template and Selin workbook: possible allowances now default to `Needs operator review`, not `Candidate`; employee lump sum is `Baseline only`; and the operator question list is recorded before any optional row should be marked `Yes` or `No`.
- Corrected Selin's payroll revenue after user review: payslip extraction now records wage tax withheld and net pay in `Revenue`, with January/February zero-withholding flagged for payroll explanation.
- Added Selin's client-reported 2024 healthcare bill of EUR 9,785.30 as a health/care insurance deduction, with the row kept open as `Needs evidence URL`.
- Repaired tax-payment review formulas so formula blanks in the `Tax Payments` tab do not count as 120 false-positive missing-payment rows.
- User approved the current template/process and Selin pilot state for commit on 2026-05-07; unresolved filing questions remain tracked in Selin's `open-questions.md`.

Verification:

- `npm run typecheck` passed.
- `git diff --check` passed.
- Drive helper read-back confirmed the master template is native Google Sheets with `Summary`, `Tax Analysis`, `Deductibles`, `Tax Credits`, and `Tax Payments` tabs.
- Drive helper read-back confirmed Selin's workbook now has the same new tabs, row 1 frozen on the new tabs, existing 12 Revenue rows preserved, and home-office later updated to the daily max-day claim per operator instruction.
- Drive helper formatted-value read-back confirmed the master and Selin `Summary!C5:C20` ranges no longer show `#REF!` or `#ERROR!`; Selin `Summary!C5` shows EUR 28,800 gross employment income and `Summary!C20` uses `=SUM('Missing Info'!$C$5:$C$15)`.
- Drive helper read-back confirmed Selin `Tax Analysis!B7` is EUR 1,230, `B9` is EUR 1,230, `B12` is EUR 27,570, and the live master template has the corrected formulas in `Tax Analysis!B7:B20`.
- Drive helper read-back confirmed Selin `Deductibles!Q2` is `Baseline only`, optional deductible rows use `Needs operator review`, and `Tax Credits!M2:M8` uses `Needs operator review`.
- Drive helper read-back confirmed Selin `Revenue` totals gross EUR 28,800, wage tax withheld EUR 2,656, and net pay EUR 26,144; `Summary` and `Tax Analysis` now show wage tax withheld EUR 2,656.
- Drive helper read-back confirmed Selin `Deductibles!A11:W11` includes health/care insurance EUR 9,785.30 with review status `Needs evidence URL`; `Summary` and `Tax Analysis` include the amount as a personal deduction.
- Drive helper read-back confirmed `Missing Info` and `Checks` tax-payment review counts are now zero when no tax-payment rows are populated.

## 2026-05-06 - Personal Tax Machine-Readable Template Workflow

Applied:

- Created branch `codex/personal-tax-ledger-template` from `codex/whatsapp-chat-id-process`.
- Created a new flat personal-tax workbook as a native Google Sheet in the same Drive folder as the old Office-mode `Personal Tax Analysis Template.xlsx`.
- Replaced active separated-Codex-tab guidance with the new workflow: raw bank/investment exports, `Category Rules`, `Journal`, `Bank Summary`, `Investment Lots`, `PNL`, `Balance Sheet`, `Missing Info`, and `Checks`.
- Marked the 2026-05-06 Nathan/VUN Codex workbook tabs as historical audit trail, superseded for future personal-tax work.
- After PR review, removed the local TypeScript/XLSX template-builder path from the active workflow. The live native Google Sheet is now the maintained template source of truth and should be copied through the Google Drive/Sheets connector.

Template:

- `RB German Personal Tax Analysis - Machine-Readable Template v1`: `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.

Verification:

- Drive metadata confirmed native `application/vnd.google-apps.spreadsheet` in parent folder `1Zn2QvYXmRkf4lKD7grX_Q43ZBTvhweRe`.
- Sheets read-back through the Drive helper confirmed frozen row 1 on all tabs, filters on table ranges, SKR04 category-rule values, raw bank formulas, and `Checks` formulas.

Review:

- SKR04 rows are seeded conservatively from DATEV sources and marked reviewable where the exact filing account treatment needs accountant review.
- The template starts with failed prior-year-opening checks until prior-year closing balances or explicit provisional opening plugs are entered.

## 2026-05-06 - Nathan 2025 Investment In/Out Summary Restore

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Restored the top `codex - invest - 2026-05-06` investment in/out summary using formulas.
- Kept `B8` as non-USDC investment out/disposal proceeds so the annual investment audit row remains linked correctly.
- Added `B9` as formula-backed staking income/acquisition value and `B10` as net investment out/(in), excluding transfers.
- Kept USDC and broker-bank transfer exclusion metrics plus missing-basis/tax-bucket review metrics visible below the movement summary.
- Updated the personal-tax-analysis skill so future crypto investment tabs preserve the investment in/out movement summary.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `abc2335acaf669d2946c88bc934d792c`; modified time `2026-05-06T16:45:23.238Z`; size `369998`.
- XLSX zip validation passed after the Drive round-trip.
- Read-back checks confirmed `codex - invest - 2026-05-06!B8:B10` and annual `codex - 2025 - 2026-05-06!B31`.

Review:

- Final investment gain classification still needs detailed non-USDC cost-basis lots, including DOT, ETH, ARB, MATIC, and XRP.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy No-Summary Cleanup

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Removed the summary/metric block from `codex - rev disc - 2026-05-06`.
- Shifted `REVENUE DISCREPANCY REVIEW - 2025` to row 4, review headers to row 5, and review lines to row 6 onward.
- Set the frozen pane to row 5 so the review header remains visible without occupying the screen.
- Kept the status, save-location, and action/note columns unwrapped.
- Historical note: this pass updated the legacy skill guidance for revenue discrepancy tab layout. That legacy tab-layout guidance is now superseded for future personal-tax work by the machine-readable template workflow.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `2b998fd39e580b9feedbbcbc842e5f2a`; modified time `2026-05-06T16:37:27.461Z`; size `369024`.
- XLSX zip validation passed after the Drive round-trip.
- Read-back checks confirmed the revenue discrepancy tab has no summary block, row 5 is the header row, formulas shifted to the new row numbers, and the note/status/action cells are not wrapped.

Review:

- No revenue classification logic changed in this pass.
- Remaining 2025 revenue work is unchanged: DappRadar July 2025 [August] payment evidence, Vandy UN August-December source/payment evidence, and non-EU invoice tie-out still need final review.

## 2026-05-06 - Nathan 2025 Bank Reconciliation Business Expense Reclassification

Applied:

- Downloaded and used the latest 2025 personal tax analysis workbook from Drive.
- Rebuilt `codex - exp disc - 2026-05-06`, `codex - exp rules - 2026-05-06`, `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06`.
- Removed the visible `Rows parsed` summary metric from the bank-reconciliation review summaries.
- Enlarged account transaction rows to 42px and kept compact wrapped column widths for reviewing uncategorised/support rows.
- Changed the account tabs to visible formula-backed rule key, category, business expense status, tax treatment, evidence action, and review flag columns, with cached formula results so classifications are visible immediately after Drive upload.
- Added rules to count London/Dubai business-location spend as business travel, including food/accommodation/travel/taxi, while excluding supermarkets/convenience stores and Iceland/Icelandair/Reykjavik unless separately confirmed.
- Added rules to count sensible electronics, telecom, software, subscriptions, professional fees, and bank fees as business expenses subject to evidence/business-purpose support.
- Updated the Revolut parser so GBP statement rows use parsed EUR conversion where the statement text provides it; only business-claim rows lacking EUR support are flagged for FX/EUR review.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `629dd8a72be498e8fab26cc6e667a969`; modified time `2026-05-06T15:11:52.312Z`; size `495500`.
- XLSX zip validation passed after the Drive round-trip.
- Read-back spot checks confirmed Uber/TFL London rows classify as `Business travel - London` / `Yes`, Sainsbury's classifies as `Personal / groceries` / `No`, and transaction rows retain 42px height.

Review:

- Summary cached total for business expenses counted + candidates is EUR 11,039.35.
- N26 October 2025 remains missing.
- Final filing still needs receipts/business-purpose support for claimed expense rows and review of remaining uncategorised/non-business review flags.

## 2026-05-06 - Nathan 2025 DappRadar Full Statement Recheck

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Rechecked all parsed 2025 bank-statement rows: ABN AMRO 250 rows, Revolut 1,383 rows, and N26 86 rows.
- Searched DappRadar/Deppradar/UAB terms, EUR 1,500 incoming/review rows, May-August incoming rows, and the known DappRadar IBAN `EE527777000135135802`.
- Found ABN EUR 1,500 receipts on 2025-06-10 and 2025-07-10 from the DappRadar IBAN.
- Updated `codex - invoices - 2026-05-06`, `codex - rev disc - 2026-05-06`, and `codex - 2025 - 2026-05-06` so the May 2025 [June] and June 2025 [July] DappRadar invoices pull cash-basis amounts from the ABN statement tab by formula.
- Updated repo notes and the personal-tax-analysis skill to require full-statement search by payer variants, amount, timing, and IBAN/BIC before marking provided invoices unpaid.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `2ff337b5e57d9605e6eba1dee5168309`; modified time `2026-05-06T14:48:19.398Z`; size `380902`.
- XLSX zip validation passed after the Drive round-trip.

Review:

- Remaining DappRadar/UAB unpaid/unmatched amount is EUR 1,500 for the July 2025 [August] invoice.
- The four older source-matched DappRadar rows in `Revenue Summary!B14:B17` still need exact bank receipt date/ref confirmation if row-level source tie-out is required.

## 2026-05-06 - Nathan 2025 USDC Investment Reclassification

Applied:

- Downloaded the latest 2025 personal tax analysis workbook and the 2023/2024 analysis workbook from Drive.
- Reviewed the visible 2023/2024 investment context: `Summary!E11` notes 2023 crypto purchases of ETH, OP, AVAX, MATIC, ARB, and DOT; `Summary!E26` notes small 2024 ETH/MATIC top-up buys.
- Rebuilt `codex - invest - 2026-05-06` so USDC rows are classified as `Transfer / stablecoin bridge` rather than investment disposals.
- Added a formula-backed non-USDC currency summary for DOT, ETH, ARB, MATIC, XRP, and POL.
- Updated the annual 2025 investment audit row to point to non-USDC investment disposal proceeds and note the USDC exclusion.
- Updated repo notes and the personal-tax-analysis skill with the stablecoin/currency-split rule.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `8a056c58a52257f4c999298e32d6c37a`; modified time `2026-05-06T14:32:57.780Z`; size `388338`.
- XLSX zip validation passed after the Drive round-trip.

Review:

- Final gain treatment still needs detailed non-USDC cost-basis lots for DOT, ETH, ARB, MATIC, and XRP.
- USDC should be reconciled as a transfer/stablecoin bridge, not as an investment purchase or sale.

## 2026-05-06 - Nathan 2025 Bank-Derived Expense Rebuild

Applied:

- Downloaded and used the latest 2025 personal tax analysis workbook from Drive.
- Parsed ABN AMRO Jan-Dec 2025 statement ZIP evidence, Revolut Jan-Dec 2025 statement PDF evidence, and the N26 statement ZIP available from the solvency evidence folder.
- Rebuilt `codex - exp disc - 2026-05-06` without the user's earlier Jan-May expense reference.
- Added formula-backed `codex - exp rules - 2026-05-06`, `codex - ABN - 2026-05-06`, `codex - Revolut - 2026-05-06`, and `codex - N26 - 2026-05-06` tabs.
- Updated `Summary!B7` to point to the bank-derived expense discrepancy total in `codex - exp disc - 2026-05-06!B7`.
- Recorded the evidence coverage and remaining gaps in Nathan's individual repo files.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `3c6a5debaa06124956fed8c035c51142`; modified time `2026-05-06T14:22:24.823Z`; size `386399`.
- XLSX zip validation passed after the Drive round-trip.
- Parsed row counts were ABN 250, Revolut 1,383, and N26 86.

Review:

- N26 October 2025 was not present in the supplied N26 ZIP.
- Revolut GBP-statement rows with no EUR amount are flagged for FX/EUR review before amounts are claimed.

## 2026-05-06 - Nathan 2025 Revenue Discrepancy Review Layout

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Updated `codex - rev disc - 2026-05-06!A15` from a breakdown label to `REVENUE DISCREPANCY REVIEW - 2025`.
- Removed the standalone year row and moved the revenue discrepancy headers to row 16.
- Shifted all review lines up one row and adjusted the affected review-range formulas and frozen pane to match the new layout.
- Historical note: this pass updated the legacy skill guidance for revenue discrepancy tab layout. That legacy tab-layout guidance is now superseded for future personal-tax work by the machine-readable template workflow.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `3157c989fa89b7dd02673180f3647397`; modified time `2026-05-06T13:57:32.999Z`; size `140156`.
- XLSX zip validation passed after the Drive round-trip.
- Verified row 15 is `REVENUE DISCREPANCY REVIEW - 2025`, row 16 contains the review headers, and row 17 starts the review lines.

## 2026-05-06 - Nathan 2025 VAT Rate Percentage Formatting

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Reformatted `codex - 2025 - 2026-05-06!C3:C6` from amount/currency styling to percentage styling.
- Reformatted `codex - invoices - 2026-05-06!H5:H17` from amount/currency styling to percentage styling.
- Preserved the existing compact table layout, borders, fonts, formulas, and VAT amount formatting.
- Updated `skills/rb-personal-tax-analysis-de/SKILL.md` so future VAT/rate columns are formatted as percentages rather than currency amounts.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `5e46f2a60ae01938d5fa3c1f7ef94195`; modified time `2026-05-06T13:49:10.208Z`; size `140245`.
- XLSX zip validation passed after the Drive round-trip.
- Verified the updated cells use Excel built-in percent number format id `9`.

## 2026-05-06 - Nathan 2025 Income Breakdown Year Row Cleanup

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive.
- Updated `codex - 2025 - 2026-05-06` so row 10 reads `INCOME Breakdown - 2025`.
- Deleted the standalone year row and moved the income table headers from row 12 to row 11.
- Updated the revenue summary formulas at the top of the tab from `F13:F26` / `D13:D26` to `F12:F25` / `D12:D25`.
- Moved the frozen pane from row 12 to row 11 so the compact layout remains visible.
- Historical note: this pass updated the legacy skill guidance for annual revenue tab layout. That legacy tab-layout guidance is now superseded for future personal-tax work by the machine-readable template workflow.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `8db4f4b801b38eb1cb7e7be694bac333`; modified time `2026-05-06T13:44:47.657Z`; size `140396`.
- XLSX zip validation passed after the Drive round-trip.

## 2026-05-06 - Nathan 2025 Revenue Tab Style And Expense Reference Cleanup

Applied:

- Downloaded the latest user-adjusted 2025 personal tax analysis workbook from Drive.
- Preserved the compact/thicker Codex table layout, wrapped table style, and existing frozen-pane settings.
- Cleared expense and expense-source references from `codex - 2025 - 2026-05-06`.
- Updated `Summary!B7` to point directly to `Expenses Summary!C11` instead of routing the expense total through the revenue review tab.
- Historical note: this pass updated the legacy skill guidance for compact revenue tab styling. That legacy tab-style guidance is now superseded for future personal-tax work by the machine-readable template workflow.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `1f1a17167ea6d6605db30264204d38a4`; modified time `2026-05-06T13:39:16.998Z`; size `140359`.
- XLSX zip validation passed after the Drive round-trip.
- `codex - 2025 - 2026-05-06` no longer contains `Expenses Summary` or expense text; `Summary!B7` is `='Expenses Summary'!C11`.

Review:

- Keep the expense detail/review workflow in `codex - exp disc - 2026-05-06`; do not reintroduce expense totals into revenue tabs during future updates.

## 2026-05-06 - Nathan 2025 Vandy UN Invoice Evidence Correction

Applied:

- Listed the copied Vandy UN July-December 2025 invoice folder in Drive.
- Downloaded the six Vandy UN invoice PDFs and checked extracted text/filenames for invoice period and amounts.
- Updated `codex - 2025 - 2026-05-06` so Vandy UN rows are marked `Vandy UN invoice provided - payment reconciliation`, not pending invoices.
- Added `codex - invoices - 2026-05-06` as the invoice evidence index for DappRadar/UAB and Vandy UN PDFs.
- Updated `codex - rev disc - 2026-05-06` with file-level Vandy UN invoice links plus formula-pulled invoice net and gross amount columns.
- Kept source/cash-basis inclusion formula-driven from `Revenue Summary!B21:B26`; invoice evidence totals are tracked in the invoice evidence index separately from source-populated cash-basis revenue.

Observed:

- Vandy UN invoice evidence provided: six invoice PDFs for July-December 2025.
- Invoice amount per PDF: EUR 3,200 net, EUR 608 VAT, EUR 3,808 gross.
- Total Vandy UN invoice evidence: EUR 19,200 net / EUR 22,848 gross.
- Source-populated amount in the workbook: July EUR 3,200 only.
- Invoice-provided but not source-populated: August-December, EUR 16,000 net.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `b16ae3e2eec49f9bc06a19efdd79e068`; modified time `2026-05-06T13:32:43.883Z`; size `118761`.
- XLSX zip validation passed after the Drive round-trip.

Review:

- Locate bank/source payment evidence for Vandy UN August-December before cash-basis inclusion.
- Confirm whether these invoices represent Nathan personal revenue, VUN-company revenue, employment-related re-invoicing, or another payment trail.

## 2026-05-06 - Nathan 2025 DappRadar Revenue Correction And Formatting

Applied:

- Downloaded the latest 2025 personal tax analysis workbook from Drive and inspected `Revenue Summary`, `codex - 2025 - 2026-05-06`, and `codex - rev disc - 2026-05-06`.
- Listed and downloaded the corrected `UAB 25 Invoice` folder from Drive to confirm seven DappRadar/UAB invoice PDFs for January-July 2025 service/payment periods.
- Updated `codex - 2025 - 2026-05-06` so the four EUR 1,500 source bank rows in `Revenue Summary!B14:B17` are DappRadar/UAB EU reverse charge, not missing-invoice revenue.
- Updated `codex - rev disc - 2026-05-06` with a DappRadar/UAB invoice block, file-level Drive links, formula totals, and separate matched vs unpaid/unmatched statuses.
- Applied workbook-style formatting to the Codex tabs: column widths, wrapped text via existing workbook styles, table heading colors, and frozen table headers.

Observed:

- DappRadar/UAB invoice evidence provided: seven invoice PDFs, EUR 10,500 total.
- Matched by amount to visible source bank rows: four EUR 1,500 rows, EUR 6,000 total.
- Initial source-only view, later superseded by the full-statement recheck above: the current workbook source data showed a EUR 4,500 DappRadar gap before ABN 2025-06-10 and 2025-07-10 receipts were located.
- `Revenue Summary!A7:D10` should no longer be treated as DappRadar/UAB evidence; those larger non-EU rows need separate evidence verification.
- A separate August 2025 `RE0003` PDF exists under 2025 Sales, but extracted text shows it as a Vandy UN Limited invoice to DappRadar UAB; it was not included in the DappRadar/UAB personal unpaid total and should be reconciled through the Vandy UN/company-to-Nathan payment trail.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back md5 matched local md5 `dbbe241d1498e517a712bdb2dab29ffc`; modified time `2026-05-06T13:15:11.663Z`; size `115101`.
- XLSX zip validation passed after the Drive round-trip.

Review:

- Confirm source bank dates/refs for the four DappRadar/UAB EUR 1,500 matched rows.
- Superseded by the full-statement recheck above: remaining DappRadar/UAB follow-up is the July 2025 [August] invoice/payment only.
- Verify separate evidence for the other non-EU source rows in `Revenue Summary!A7:D10`.

## 2026-05-06 - Nathan 2025 Investment Breakdown

Applied:

- Parsed the copied Coinbase 2025 transaction-history PDF and Kraken 2025 monthly account statements.
- Added `codex - invest - 2026-05-06` to the 2025 personal tax workbook.
- Kept the investment tab formula-backed for summary totals, unit prices, holding-bucket classification, gain/loss, and tax-treatment flags.
- Updated the annual 2025 Codex tab investment row to link to the new investment breakdown.

Observed:

- The visible source workbook investment rows for January-April 2025 match Coinbase EUR withdrawals, so they should be treated as broker-bank transfers rather than purchases.
- Coinbase statement-backed 2025 acquisitions are staking income for DOT, ETH, MATIC, and POL.
- Coinbase/Kraken USDC movements into brokerages are transfers from external wallets/brokerages, not bank purchases.
- Sold assets with missing prior-year or external-wallet basis include Coinbase DOT, ETH, ARB, MATIC, and Kraken XRP. USDC was later superseded to transfer/stablecoin-bridge treatment and excluded from investment gain formulas.

Verification:

- Uploaded the revised workbook to Drive and downloaded it back.
- Drive read-back confirmed `codex - invest - 2026-05-06`, the annual investment-row link, modified time `2026-05-06T13:02:22.269Z`, md5 `2494180a7a13f98e88bcf6b34d6a9557`, and size `112814`.

Review:

- Obtain prior-year Coinbase acquisition lots for DOT, ETH, ARB, and MATIC, plus Kraken XRP acquisition cost/date, before final capital-gains vs income treatment. Reconcile USDC movements as transfers/stablecoin bridge activity.
- Confirm full-year 2025 bank coverage, especially May-December Coinbase/Kraken withdrawals that are visible in broker statements but not in the current detailed bank extract.

## 2026-05-06 - Nathan 2025 Annual And Discrepancy Tabs

Applied:

- Replaced the earlier mixed 2025 Codex audit/missing-evidence tabs with:
  - `codex - 2025 - 2026-05-06`.
  - `codex - rev disc - 2026-05-06`.
  - `codex - exp disc - 2026-05-06`.
- Followed the 2023/2024 annual-tab format: formula totals at the top and income breakdown starting below row 10.
- Split the 2025 discrepancy tracking into revenue discrepancies and expense discrepancies so the open items can be worked separately.
- Updated `Summary!B6` and `Summary!B7` to point to the annual Codex revenue and expense totals.

Observed:

- The 2025 annual tab now formula-summarises non-EU/third-country revenue, domestic 19% VAT revenue, revenue/no-invoice bank receipts, total cash-basis revenue for review, and business expenses per source summary.
- The revenue discrepancy tab tracks invoice-to-bank tie-out, bank receipts with no invoice, and Vandy UN payment/bank reconciliation.
- The expense discrepancy tab tracks detailed `Expenses Summary!A30:G124` rows for receipt collection or non-deductible marking.
- Investments, prepayments, full-year bank coverage, Coinbase/Kraken, and Kraken ZIP notes remain visible in the annual 2025 tab.

Verification:

- Drive read-back confirmed the annual/discrepancy tabs, confirmed `Summary!B6:B7` point to the annual Codex tab, and confirmed the earlier mixed Codex audit/missing-invoice tabs were removed.
- 2025 workbook revision: `https://docs.google.com/spreadsheets/d/1qbv6dAMYaSJFeSp8L0kj16K_tjzKF6_g/edit`, md5 `7b44e8da45af1ad90b3dfc6562a3a475`.

Review:

- Full-year 2025 bank statement coverage still needs confirmation/import before final filing.
- Missing revenue invoices and expense receipts should be saved into the Drive destinations proposed in the new discrepancy tabs.

## 2026-05-06 - Nathan 2023/2024 Annual VAT Revenue Tabs

Applied:

- Replaced the earlier Codex 2023/2024 VAT review tabs with one annual formula-backed tab per year:
  - `codex - 2023 - 2026-05-06`.
  - `codex - 2024 - 2026-05-06`.
- Kept the revenue source breakdown in each annual tab, with formulas for category totals at the top and the income breakdown starting below row 10.
- Updated `Summary!B6` and `Summary!B21` to point to the annual Codex included-revenue totals.
- Treated January 2024 EUR 1,855.77 as excluded/uncollectible because the user said the client lost the contract and cannot recover it.
- Treated potential `INV-00013` as included 2024 EU reverse charge, per user confirmation.

Observed:

- 2023 included revenue: EUR 86,521.60, EU reverse charge.
- 2024 included revenue: EUR 68,436.94, consisting of EUR 22,865.60 EU reverse charge and EUR 45,571.34 non-EU B2B / no German VAT.
- January 2024 excluded/uncollectible amount: EUR 1,855.77.
- Potential `INV-00013` invoice evidence remains missing even though the revenue categorisation is now EU reverse charge.

Verification:

- Drive read-back confirmed the annual tabs, confirmed the earlier Codex VAT/missing-invoice tabs were removed, and confirmed the January 2024 exclusion plus potential `INV-00013` EU reverse treatment.
- 2023/2024 workbook revision: `https://docs.google.com/spreadsheets/d/16TQCSfTsyE31o-fvT9HBTm3yvUuGaIbz/edit`, md5 `d509d0cf400d14f87e7c7a1a83b63559`.

Review:

- Final filing should still tie the missing `INV-00013` evidence and non-EU 2024 invoice support to the underlying PDFs before filing.

## 2026-05-06 - Nathan Workbook VAT And 2025 Audit Updates

Applied:

- Downloaded the Office-mode 2023/2024 VAT workbook and 2025 personal tax analysis workbook through the Drive helper.
- Added separated formula-backed tabs following the user rule:
  - 2023/2024 VAT workbook, initial pass: `codex - VAT rev - 2026-05-06` and `codex - miss inv - 2026-05-06`; later superseded by annual tabs recorded above.
  - 2025 personal tax workbook, initial pass: `codex - audit - 2026-05-06` and `codex - miss inv - 2026-05-06`; later superseded by the annual/discrepancy tabs recorded above.
- Used formulas to point back to source tabs and evidence URLs; the original source tabs were not overwritten.
- Uploaded both workbooks back to Drive as revised `.xlsx` files and verified the tabs by downloading the revised files from Drive.

Observed:

- 2023 paid DappRadar/UAB rows are categorised as EU B2B reverse charge / 0% German VAT.
- 2024 rows are categorised between non-EU B2B / no German VAT and EU B2B reverse charge / 0% German VAT.
- Potential `INV-00013` was identified as a 2024 bank/payment row with missing invoice evidence; later user confirmation classified it as EU reverse charge.
- January 2024 EUR 1,855.77 was identified as excluded; later user confirmation classified it as excluded/uncollectible because the client lost the contract.
- 2025 audit tab covered revenue, expenses, investments, and prepayments; the missing-evidence tab logged no-invoice revenue rows, Vandy UN payment reconciliation, expense receipts, investment reconciliation, and blank prepayment amounts. This was later superseded by separated annual/revenue-discrepancy/expense-discrepancy tabs recorded above.

Verification:

- 2023/2024 workbook initial revision: `https://docs.google.com/spreadsheets/d/16TQCSfTsyE31o-fvT9HBTm3yvUuGaIbz/edit`, md5 `b424e9666e941c4ad1bc2cedd945452b`; superseded by the annual-tab revision recorded above.
- 2025 workbook initial revision: `https://docs.google.com/spreadsheets/d/1qbv6dAMYaSJFeSp8L0kj16K_tjzKF6_g/edit`, md5 `c1a3acee92c90401bcd3099092c03266`; superseded by the annual/discrepancy revision recorded above.

Review:

- Full-year 2025 bank statement coverage still needs confirmation/import before final filing.
- Missing evidence should be saved into the destinations proposed in the new revenue and expense discrepancy tabs.

## 2026-05-06 - Superseded Spreadsheet And Active Notion Comment Operating Rules

Applied:

- Superseded: earlier user instruction said spreadsheet work should use formula-driven separated tabs named `codex - [sheet name] - [update date]`. The 2026-05-06 machine-readable personal-tax template workflow now replaces that approach for future personal-tax analyses.
- Added user instruction that Codex should not hardcode derived spreadsheet outputs.
- Added user instruction that Notion page comment/update notes should use the actual Notion comments section when a database page has comments, rather than a database text field.

Review:

- For personal-tax analysis, use the native machine-readable template workflow instead of new separated Codex tabs. Keep the Notion actual-comments rule active.

## 2026-05-06 - Nathan Corrected Customer Drive Evidence

Applied:

- Followed the user correction that `vandy_invoice_pack_polished_jul_dec_2025.pdf` should not be used.
- Moved the superseded uploaded PDF to Drive trash.
- Accessed Nathan's customer-created Drive folder and copied the evidence into the existing RB destination folders.
- Added helper support for listing folders, copying files/folder contents, and trashing superseded Drive files.
- Added the operating learning to `rb-file-uploads`: when a customer creates a Drive folder, access it and copy its files rather than re-uploading stale local copies.

Copied:

- `UAB 24` copied to `2023 and 2024 / 2024 Sales / UAB 24`: `https://drive.google.com/drive/folders/153PVTtVCMs1Wa7se6KVy2DemvYIEJ2jL`.
- `UAB 25 Invoice` copied to `2025 / Documents from client - 2025 - Nathan / 2025 Sales / UAB 25 Invoice`: `https://drive.google.com/drive/folders/105rhUMudr7QwhYBmxRXp_TrSWmzrPxCe`.
- `Vandy Un Limited Invoices July - Dec 25` copied to `2025 / Documents from client - 2025 - Nathan / 2025 Sales / Vandy Un Limited Invoices July - Dec 25`: `https://drive.google.com/drive/folders/1R6ot_IHyWuRo-xDlAHxBBIX-Xalk27Xz`.
- `Dappradar UAB - Inv RE0003 - August 2025.pdf` copied to 2025 Sales: `https://drive.google.com/file/d/1lrSugdwxQi7WHE93B3Ld9ImnFzme95WV/view?usp=drivesdk`.
- Coinbase 2025/2026 summaries copied to `https://drive.google.com/drive/folders/17Az7jYRma43-RPzQRR1ICR2rhX7q4WAm`.
- Kraken account summary ZIP copied to `https://drive.google.com/file/d/1OboSu49R3aBCqK2qcNmyfyo2_X6_WSnX/view?usp=drivesdk`.

Superseded:

- `vandy_invoice_pack_polished_jul_dec_2025.pdf`: `https://drive.google.com/file/d/10VeKXKbKIfrucMHkMrvK_1JrUR3t08_B/view?usp=drivesdk`.

Verification:

- Drive helper listings confirmed the superseded PDF no longer appears in the target root folder.
- Drive helper listings confirmed 12 UAB 2024 PDFs, 7 UAB 2025 PDFs, 6 Vandy UN 2025 PDFs, the DappRadar August 2025 PDF, the Coinbase summaries, and the Kraken ZIP in the copied destinations.

## 2026-05-06 - Nathan VAT And 2025 Personal Tax Evidence

Applied:

- Reviewed Nathan/VUN source routing across repo pointers, Notion filing records, Drive folders, and WhatsApp context.
- Located Nathan's active WhatsApp evidence trail in group chat `Vandy, Nathan | Richmond Blackwood`.
- Uploaded WhatsApp file `vandy_invoice_pack_polished_jul_dec_2025.pdf` to the user-provided 2025 Drive folder.
- Recorded the uploaded file URL, WhatsApp source pointer, and 2025 personal-tax review status under Nathan's individual client folder.

Evidence uploaded:

- Drive file: `https://drive.google.com/file/d/10VeKXKbKIfrucMHkMrvK_1JrUR3t08_B/view?usp=drivesdk`
- Parent folder: `https://drive.google.com/drive/folders/1VEDfpcRJOQvnkJ0Y7M8wCQ9g-a4DU6eo`
- Drive helper metadata: md5 `8008fb822bcf241f7309a79f0afe2128`, size `10793`.

Observed:

- The uploaded PDF contains invoices 107-112 for July-December 2025, each EUR 3,200 net plus EUR 608 VAT.
- The 2023 merged DappRadar UAB invoice PDF in Drive supports 11 paid 2023 invoices as EU B2B reverse-charge / 0% German VAT, with June 2023 apparently unpaid and excluded from bank records.
- WhatsApp context says the January 2024 invoice for EUR 1,855.77 was also not paid.

Blocked:

- The two user-provided workbook links behaved as Office-mode spreadsheets; the Google Sheets connector returned `FAILED_PRECONDITION` and the Drive connector could not fetch/list them by file ID.
- The Google Drive connector could not list the user-provided 2025 folder even though the repo Drive helper uploaded to it successfully.

Review:

- Convert the workbooks to native Google Sheets or provide local XLSX exports before any spreadsheet edits.
- The 2025 Drive folder was later written back to the Personal Tax Filing Notion record; workbook access remains the main blocker.

## 2026-05-05 - WhatsApp Inbound Monitoring Process

Applied:

- Added a manual-run WhatsApp inbound monitoring process with checkpoint, correspondence, task, Slack notification, and blocker handling.
- Added `rb-whatsapp-inbound-monitor` as a repo-local skill and registered it in the skills index.
- Added the WhatsApp Monitoring Checkpoints pattern to VUN communications from setup time, without historical backfill.
- Recorded inbound task assignment defaults in `internal/people-roles.md`.
- Included the local WhatsApp bridge hardening patch in scope: localhost binding by default, configurable host/port, and local Go build caches under `.codex-local/`.

Verification:

- `bash -n setup/mcp/start-whatsapp-bridge.sh` passed.
- `git diff --check` passed.
- Submodule `git diff --check` passed.
- WhatsApp bridge `go test ./...` passed with repo-local Go caches.
- WhatsApp MCP server Python compile passed with repo-local pycache.
- Skill metadata and `skills/index.md` registration were inspected.
- Dry-run scenario coverage was checked in the process document.

Open questions:

- Confirm Eran Peer role/relationship to VUN and preferred-contact status.
- Confirm Notion file-property upload support before the first live run.
- Confirm assignment defaults with the team before approving automation.

## 2026-05-05 - Neutral Operating Infrastructure Port

Imported:

- Root npm/TypeScript helper structure from neutral source patterns.
- Generic Drive, Gmail, Google auth, SignNow, Google Doc transform, PDF signing-plan, and task PR helpers.
- Repo-local skills for helper workflows and memory/skill-run closeout.
- Memory/process docs for Notion standards, file uploads, repo operation, setup/access, and signatures/Gmail.

Adapted:

- Gmail sender defaults to `accounting@richmondblackwood.com`.
- Gmail display/signoff identity defaults to `Richmond Blackwood Accounting Team`.
- Drive docs point to RB general archive and existing RB finance/accounting client folder routing.
- SignNow helpers remain generic mechanics only; no RB signer identity or template policy was invented.

Excluded:

- Source-company auctions, bonds, physical/digital/financial workflows, client names, asset names, seller/buyer confidentiality rules, controlled-sharing rules, and source Notion/Drive IDs.

Verification:

- `npm install` completed with an `@signnow/api-client` engine warning on Node 18.7.0 and four high-severity npm audit findings.
- `npm run typecheck` passed.
- Helper `--help` smoke checks passed.
- `git diff --check` passed.
- Forbidden source carryover scans passed.

## 2026-05-05 - WhatsApp MCP Port

Imported:

- Optional `third_party/whatsapp-mcp` submodule pinned at compatibility commit `018ea770ca9524c43000910ada7611fa1a503fe6`.
- WhatsApp MCP setup guide under `setup/mcp/whatsapp.md`.
- Persistent local bridge helper under `setup/mcp/start-whatsapp-bridge.sh`.
- RB WhatsApp communications skill under `skills/rb-whatsapp-comms/`.
- Communication process/routing rules for WhatsApp reads, sends, media, voice notes, private-data handling, and follow-up capture.

Adapted:

- Removed source-company Communications database, client-record, controlled-sharing, and business-workflow assumptions.
- Replaced source repo paths with RB repo paths.
- Renamed LaunchAgent label to `com.richmondblackwood.whatsapp-bridge`.
- Kept WhatsApp logging destination provisional and routed facts to existing RB client/internal structures only when clear.

Excluded:

- WhatsApp QR/session state, SQLite databases, media, transcriptions, private chat content, test-message details, source company contacts, and source Notion/Drive IDs.

Verification:

- Submodule status confirmed the pinned compatibility commit.
- Bridge script shell syntax passed.
- Go bridge test passed after sandbox escalation for Go build-cache writes.
- Python compile check passed for the MCP server.
- TypeScript check passed.
- `git diff --check` passed.
- Source-specific business keyword scan passed.

Open questions:

- Confirm the RB WhatsApp account/number.
- Superseded on 2026-05-07 when RB Communications was created under RB Client Databases.
- Confirm whether optional WhatsApp MCP should be enabled for all operators or only local Codex workstations.

## 2026-05-05 - WhatsApp Chat ID Filing Process

Applied:

- Added a reusable process for saving WhatsApp chat IDs as client communication pointers.
- Mirrored the workflow into `skills/rb-whatsapp-comms/SKILL.md`.
- Filed the selected VUN WhatsApp chat ID pointer in `clients/Companies/VUN/communications.md`.

Verification:

- `git diff --check` passed.

Open questions:

- Confirm Eran Peer role/relationship to VUN and whether the selected chat ID is the preferred VUN WhatsApp contact.

## 2026-05-05 - VUN And Individual Routing Recovery

Applied:

- Adopted `origin/main` as the workflow/memory/skills authority after PR #1 merged.
- Created recovery branch `codex/vun-client-routing-backup` from `origin/main`.
- Migrated the client tree to `clients/Companies/<client-reference>/` and `clients/Individuals/<legal-name>/`.
- Kept VUN as the active company pilot and Nathan Mawali A Vandy as the active individual pilot.
- Left newly created process files stashed for later review, per user instruction not to commit new process files yet.

Verification:

- `git diff --check` passed.
- `git diff --cached --check` passed.
- `npm run typecheck` passed using installed Node 18.17.1 because the repo-pinned Node 18.7.0 is not installed locally.
- Branch pushed and draft PR opened: `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.

Correction:

- The VUN binary evidence commit was later removed from the PR branch history after user review. Downloaded/exported client evidence should live in Drive, with git retaining pointers and blockers only.

## 2026-05-05 - Review Prompt Application

Applied:

- Added client-reference rule: client folders use Notion Companies `Reference`.
- Created active VUN pilot folder at `clients/Companies/VUN/`.
- Imported VUN company, individual, project, dashboard, Drive, and personal tax filing context.
- Added review and PR workflow process from `setup/review-prompts.md`.

Notion general backup created:

- RB Client Reference Folder Standard: `https://www.notion.so/357e41301314812e9e8fdfd53073359e`
- RB Review And PR Workflow: `https://www.notion.so/357e4130131481029be3d17a8ec2eb8b`

Blocked:

- `setup/pending-prompts.md` was referenced by the review prompt but not present on disk.
- Broad deletion of `clients/` was blocked by the sandbox safety reviewer; older name-derived folders remain pending explicit deletion review.
- VUN supplied Drive folder listed no files and metadata lookup by ID returned not found.

## 2026-05-04 - Initial Repo Build

Imported:

- User-approved storage rules from current conversation.
- Existing Notion destination schemas.
- Prior RB memory from local `my-memory`.
- Local landing and backend architecture summaries.
- Slack, Gmail, and Drive search summaries from initial exploration.
- Initial private client fragments into `clients/Companies/<client-reference>/`.

Notion general backup created:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`

Correction:

- Earlier non-VUN provisional client backup references were removed because the referenced pages/folders were incorrect. Non-VUN client imports must be redone directly from Notion Companies `Reference` records.

Not imported yet:

- Full Slack channel histories.
- Full Gmail threads.
- Full Drive document contents.
- Full Notion client records.
- Raw credential or secret files.

Open routing blockers:

- Client company relation mapping in Notion.
- Client Drive group/external classification.
- Whether client notes should be backed up as one summary per client or per domain database.

## Verification Notes

All RB-specific imported facts remain provisional.

## 2026-05-11 Diff Review: RBL Invoice Validation And RB Commitments

- Source: user diff review in Codex thread.
- Scope: move Workhub invoice validation out of `clients/Companies/RBL/edge-cases.md` because it is normal RBL invoice validation, not an edge case; add a rule that actionable Richmond Blackwood team commitments such as “we will do/look/check/tell/update/send” or “I will” should create or update tasks.
- Imported to: `clients/Companies/RBL/invoices-payments-expenses.md`, `clients/Companies/RBL/source-register.md`, `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `processes/communications.md`, `sources/source-register.md`, `memory/history.md`, and `memory/skill-runs.md`.
- Removed: `clients/Companies/RBL/edge-cases.md`.
- Status: provisional pending user review.
- Unresolved questions: none.

## 2026-05-11 Communications-First Triage Review

- Source: user workflow review in Codex thread.
- Scope: make inbound operating triage communication-first instead of active-index-first; prioritize Gmail inbox and WhatsApp topic extraction; exclude Slack, signatures, files, and status systems as inbound channels; split expenses/invoices before other work; route contractor/business-partner invoices through Business Partners, associated contracts, and contract-linked Invoicing records, including existing paid/completed records before Expenses; group remaining work by company/topic; require correspondence translations to be usable in tasks; require one assignee-tagged Slack closeout per triage when requested.
- Imported to: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `processes/index.md`, `skills/index.md`, `sources/source-register.md`, `memory/handoff.md`, `memory/open-questions.md`, and `memory/skill-runs.md`.
- Status: provisional pending next live run validation.
- Unresolved questions: confirm live Business Partners/Contract/Invoicing field names during the next run and confirm Slack user mappings for assignee tags.

## 2026-05-11 Generalized Inbound Operating Triage

- Source: user-approved implementation plan in Codex thread.
- Scope: replace Gmail-specific triage with generalized inbound operating triage across configured channels.
- Imported to: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `processes/index.md`, `skills/index.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: provisional; later narrowed by communication-first review and RBL invoice validation routing review.
- Unresolved questions: validate channel windows, active-index matching, safe direct writes, and batched approval packets on the next live multi-channel run.

## 2026-05-11 Generalized Triage Review Comments

- Source: PR review comment and user instruction in Codex thread.
- Scope: keep Gmail completion handling as a general accounting/client inbox rule and add Slack source-thread acknowledgement when a task is created from a Slack message.
- Imported to: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: Gmail completion handling remains approved; Slack-source acknowledgement is superseded for the Gmail/WhatsApp communication-first workflow by the 2026-05-11 Communications-First Triage Review.
- Unresolved questions: none for Gmail completion handling.

## 2026-05-11 Concrete Channel Windows Review

- Source: user instruction in Codex thread.
- Scope: replace abstract channel-window wording with explicit default read windows and unavailable-connector handling.
- Imported to: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: approved.
- Unresolved questions: none.

## 2026-05-11 Task Splitting And Run Ledger Review

- Source: PR review comments and user instruction in Codex thread.
- Scope: support multiple tasks per inbound item when workstreams differ, handle internal-team-originated client tasks, link related created records from tasks, build reports from a run change ledger, and define WhatsApp checkpoint ordering.
- Imported to: `processes/inbound-operating-triage.md`, `skills/rb-inbound-operating-triage/SKILL.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: approved.
- Unresolved questions: none.

## 2026-05-08 Gmail Triage Slack Overview Rule Import

- Source: user instruction in Codex thread.
- Scope: required final Slack overview structure for Gmail inbound triage.
- Imported to: `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`.
- Status: provisional.
- Unresolved questions: none; continue validating against the next daily run.

## 2026-05-08 Gmail Triage Ambiguity Cleanup

- Source: user instruction in Codex thread.
- Scope: remove old incorrect process/memory paths after the final Slack message was accepted as correct.
- Imported to: `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, automation memory, and RBL company memory.
- Status: approved for current Slack canonical message and Workhub CC-INV-19364 approval; provisional for future Workhub invoice checks.
- Unresolved questions: confirm VAT treatment for future Workhub plan checks.

## 2026-05-08 Company-Specific Exception Routing Refactor

- Source: user instruction in Codex thread.
- Scope: avoid duplicating company-specific exceptions in the general Gmail triage process.
- Imported to: `processes/gmail-inbound-triage.md` and `skills/rb-gmail-inbound-triage/SKILL.md`.
- Status: approved.
- Unresolved questions: none.

## 2026-05-08 Gmail Triage Performance Review

- Source: user instruction in Codex thread.
- Scope: whole-branch review for future-run performance without changing triage functionality.
- Imported to: `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, `processes/index.md`, `skills/index.md`, and automation memory.
- Status: provisional.
- Unresolved questions: none; validate performance behavior on the next live run.

## 2026-05-08 RBL Workhub Rule Import

- Source: user instruction in Codex thread.
- Scope: RBL-specific Workhub invoice addressee and plan schedule rule.
- Imported to: `clients/Companies/RBL/invoices-payments-expenses.md` and `clients/Companies/RBL/source-register.md`.
- Status: provisional.
- Unresolved questions: confirm whether Workhub plan amounts are VAT-exclusive and whether any additional companies have upgraded plans.

## 2026-05-08 Targeted Exception And No-Op Triage Review

- Source: user instruction and review in Codex thread.
- Scope: targeted Workhub exception lookup and recurring-run no-op handling.
- Imported to: `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: approved for targeted Workhub lookup; provisional for verified no-op Gmail labelling pending next live run validation.
- Unresolved questions: none.

## 2026-05-10 Gmail Triage Edge-Case File Structure

- Source: user instruction in Codex thread.
- Scope: make edge cases live in per-client files and make the skill point to the exact entry to load.
- Imported to: `processes/gmail-inbound-triage.md`, `skills/rb-gmail-inbound-triage/SKILL.md`, `clients/Companies/RBL/invoices-payments-expenses.md`, `clients/Companies/RBL/source-register.md`, `sources/source-register.md`, and `memory/skill-runs.md`.
- Status: superseded by 2026-05-11 review that Workhub is normal RBL invoice validation rather than an edge case.
- Unresolved questions: none.

Checks run 2026-05-04:

- `git diff --check`: clean.
- Markdown trailing whitespace scan: clean.
- Prior-template business keyword scans: clean.
- Client backup-marker scan: clean.
- TypeScript check skipped because no TypeScript helpers were retained.

## 2026-05-07 - Selin 2025 Personal Tax Setup

Imported:

- Notion 2025 personal tax filing `https://www.notion.so/342e4130131480eab03dd8498d24d23e`.
- Selin employment-linked 2025 payroll run pages from `https://www.notion.so/19eb44945e544186baf7be0d9fb3612d`.
- CLV Drive 2025 personal-tax folders, including payslips at `https://drive.google.com/drive/folders/1ustYGqTraDcaqv0LwQSqa1lk6M-vYIMq`.
- Copied workbook `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`.

Actions:

- Routed Selin 2025 personal-tax Drive/workbook pointers into `clients/Individuals/Selin Ozkohen/`; CLV company files retain only company-side employment/payroll context.
- Linked January-June 2025 Drive payslips into the corresponding Notion payroll `Payslip` file properties.
- Added a Notion page comment on the 2025 filing with the workbook link and review flags.
- Added process guidance for Slack completion notifications to the triggering person after analysis is ready for review.

Unresolved:

- Expense documents in the 2025 client folder need date/year/category review before claims.
- Investment/no-investment confirmation remains needed.
- Deductible and tax-credit applicability remains operator review.
- Prior-year opening balance tie-out remains open.
- Google Sheets connector access to the helper-created workbook returned `403`; helper access worked.

## 2026-05-07 - Personal Tax Filing Status Sync Rule

Imported:

- User instruction to keep Personal Tax Filings status fields synced when personal-tax analysis/evidence/Drive state changes.
- Personal Tax Filings database schema at `https://www.notion.so/206e41301314800493d2e00f69621528`.

Actions:

- Added the process rule that personal-tax work must update the live filing entry `Status`, `Document gathering status`, and `GDrive Docs` fields, with read-back verification.
- Recorded the exact document-gathering options used by the live database: `In progress` while evidence is being uploaded/reviewed/reconciled, and `Attached in Drive` once all currently required evidence for that stage is in Drive and linked.

Unresolved:

- None for the process rule. Individual filings still need their own factual review before status changes are made.

## 2026-05-07 - Personal Tax Filing Task Pair Rule

Imported:

- User instruction to create missing analysis and filing tasks from personal-tax filing records.
- Tasks data source `collection://25de4130-1314-8158-af69-000b6c9fb49e`.
- `[Annually] Personal Tax Filing` task template `https://www.notion.so/32ee413013148090a435e5858b918f25`.
- Personal Tax Filings schema fields `Preparation Task` and `Filing Task`.

Actions:

- Added the process rule that a filing without task relations needs a preparation/analysis task assigned to Ioana Surdu-Bob and a separate filing task assigned to Johnpaul Okolie.
- Added the dependency rule that the filing task must set `Dependent on` to the analysis task, both tasks must attach the correct client project, and the filing task must receive an actual Notion comment with the spreadsheet URL once the analysis is ready for filing.

Unresolved:

- No live filing tasks were created by this process update; each filing still needs its task/project relations checked before task creation.

## 2026-05-13 - RB Calls Live Runtime Readback Sync

Imported:

- n8n `RB Calls Voice Execution` workflow `3xJh7hNK0Zl9T4zS`, active version `c7d84f52-ae58-4073-889f-89eb2000a937`.
- n8n `RB Calls Live Help` workflow `qtwbaCjt8lqqjS6o`, active version `9d2ea23e-ffaa-451e-b98a-8628fa9a9ac1`.
- n8n `RB Calls ElevenLabs Events` workflow `uBEMuAtKiJQzJAWw`, active version `29dc070e-2951-4f7f-931b-6b24ea793fc5`, draft version `48d12009-db89-4c75-8df1-6e48564f12ed`.
- n8n `RB Calls Context Lookup` workflow `i3rv4G6FmfosQm5j`, active version `b8b439eb-0587-4600-a93a-89a27ca2e8fc`.
- ElevenLabs `RB Call Bot` agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1`, version `agtvrsn_9501krh4qjm7e6n9jy079k5tgea5`.

Source:

- User instruction in the current Codex thread on 2026-05-13.
- `npm run calls:sync-live-state` using local n8n MCP and ElevenLabs API readbacks.

Imported details:

- Added repeatable live readback helper `automation/sync-rb-calls-live-state.mjs`.
- Added compact registry and per-runtime snapshots under `automation/live-readbacks/`.
- Documented the readback workflow in `automation/README.md` and `setup/mcp/elevenlabs-n8n.md`.

Not imported:

- No API keys, MCP tokens, webhook secrets, call recordings, call transcripts, phone numbers, or client document files.

Verification:

- `npm run calls:sync-live-state` completed successfully and wrote all readback files.

Open questions:

- Review why `RB Calls ElevenLabs Events` has a current draft version different from the active version before publishing or deploying over it.

## 2026-05-13 - RB Calls API Language Override

Imported:

- User instruction that German calls were still starting in English and the outbound API call should set the right language.
- n8n `RB Calls Voice Execution` workflow `3xJh7hNK0Zl9T4zS`, published active version `360489d3-02da-4a84-bfbd-0a0d168054e9`.
- ElevenLabs `RB Call Bot` agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1`, version `agtvrsn_2001krh88kp2f49sq04f81qemvb3`.

Source:

- User instruction in the current Codex thread on 2026-05-13.
- Official ElevenLabs override documentation checked on 2026-05-13.
- `npm run calls:sync-live-state` using local n8n MCP and ElevenLabs API readbacks.

Imported details:

- The n8n outbound payload now includes `conversation_initiation_client_data.conversation_config_override.agent.language`.
- German contacts map to API language code `de`; non-German contacts map to `en`.
- The default ElevenLabs first message remains the user-provided English opener, and the German language preset contains the German opener.

Not imported:

- No API keys, MCP tokens, phone numbers, call recordings, transcripts, or client call payloads.

Verification:

- n8n validation/update/publish succeeded.
- ElevenLabs patch read-back verified the default and German-preset first messages.
- Live readback snapshots were refreshed.

Open questions:

- Run a German test call and confirm the first message uses the German preset.

## 2026-05-13 - RB Calls Language-Specific Identifier Pronunciation

Imported:

- User instruction that German calls were still saying numbers in English because of the system prompt, and that the prompt should be fixed or translated.
- ElevenLabs `RB Call Bot` agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1`, version `agtvrsn_9801krh941ypfwt9me281gafr9ws`.

Source:

- User instruction in the current Codex thread on 2026-05-13.
- `npm run calls:patch-elevenlabs-slow-identifiers` using the local ElevenLabs API configuration.
- `npm run calls:sync-live-state` using local n8n MCP and ElevenLabs API readbacks.

Imported details:

- The ElevenLabs prompt now has language-specific identifier pronunciation rules.
- German calls must use German digit words and German letter names for tax numbers, registration numbers, abbreviations, and alphanumeric identifiers.
- English digit words and NATO spelling words are disallowed in German calls unless the authority explicitly asks for them.
- The stale public-disclosure example that used `Delta ... Echo` was removed from the live prompt.

Not imported:

- No API keys, MCP tokens, phone numbers, call recordings, transcripts, or client call payloads.

Verification:

- ElevenLabs patch read-back verified the language-specific pronunciation section, German digit words, slow identifier rules, no default NATO spelling instruction, and no stale `Delta ... Echo` example.
- Live readback snapshots were refreshed.

Open questions:

- Run a German test call and confirm the agent says identifiers with German number words under real call conditions.

## 2026-05-13 - RB Calls ElevenLabs Automation Boundary

Imported:

- User instruction that `automation/elevenlabs` should keep only actually reusable files and that one-off patch scripts should remain in a private folder.

Source:

- User instruction in the current Codex thread on 2026-05-13.
- Local repository cleanup of `automation/elevenlabs/rb-calls/` and private ignored copy under `.codex-local/automation/elevenlabs/rb-calls/`.

Imported details:

- Source-controlled `automation/elevenlabs/` is now for reusable read-only diagnostics/utilities.
- One-off ElevenLabs prompt patchers, live mutators, and migration scripts belong under ignored `.codex-local/automation/elevenlabs/`.
- Shared npm scripts should not expose one-off ElevenLabs patchers.

Not imported:

- No API keys, MCP tokens, phone numbers, call recordings, transcripts, client call payloads, or private patch-script contents.

Verification:

- `npm run calls:check-automation`, `npm run typecheck`, and `git diff --check` passed after cleanup.
- `git ls-files .codex-local automation/elevenlabs/rb-calls package.json` confirmed `.codex-local` private patchers are not tracked and source-controlled `automation/elevenlabs/rb-calls/` contains only inspectors.

Open questions:

- None.

## 2026-05-13 - RB Calls Abbreviation And Timing Pronunciation

Imported:

- User instruction that spelling alphabets should be used when the authority is confused, that literal `pause` and ellipses should not be used for spoken timing, that commas and periods should be used for timing, that abbreviations should use hyphens rather than commas, and that abbreviation handling must work in all languages with English treated as important.
- ElevenLabs `RB Call Bot` agent `agent_2001kq39ea0hf5yb86c4a7hj9gp1`, version `agtvrsn_0701krha08p6ewwv0fygbnjv0k6p`.

Source:

- User instruction in the current Codex thread on 2026-05-13.
- Private ignored ElevenLabs patchers under `.codex-local/automation/elevenlabs/rb-calls/`.
- `npm run calls:sync-live-state` using local n8n MCP and ElevenLabs API readbacks.

Imported details:

- Abbreviations are now explicitly handled in all call languages, including English, as hyphenated letter runs.
- Confusion-triggered fallback uses NATO for English, German Buchstabiertafel for German, and the closest recognized spelling alphabet for other call languages.
- Identifier examples now use commas for short numeric grouping and periods for longer breaks.
- The live prompt no longer uses literal `pause` words or ellipses for spoken identifier timing.

Not imported:

- No API keys, MCP tokens, phone numbers, call recordings, transcripts, client call payloads, or private patch-script contents.

Verification:

- Live readback verified `agtvrsn_0701krha08p6ewwv0fygbnjv0k6p`.
- Prompt scan confirmed zero ellipses and zero `pause` words in the live prompt.
- Prompt scan confirmed the all-language abbreviation rule, hyphenated abbreviation examples, NATO fallback, and German Buchstabiertafel fallback.

Open questions:

- Run English and German test calls to verify real TTS timing and spelling behavior.

## 2026-05-13 - Claudio Brivio Individual Context Load

Imported:

- Notion individual record `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`.
- Notion 2024 personal tax filing `https://www.notion.so/2cae413013148064bf7ae889ec16af5c`.
- Notion 2025 personal tax filing `https://www.notion.so/342e41301314803eb579c68638fb3fb0`.
- Notion employment record `https://www.notion.so/7d77ff003f1a4f1c8799bdd2e477025b`.
- Notion tasks `https://www.notion.so/352e4130131480e0b6f4deb6917c972b` and `https://www.notion.so/358e413013148053bb73e0bc8e7247b3`.
- Drive 2024 personal-tax folder `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv`, client documents folder `https://drive.google.com/drive/folders/1GpjMwLVHPKyJ1XR8t2YIrchl23auowv3`, and uploaded `_2024-tax-filings` package `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC`.
- WhatsApp chat `Brivio, Claudio | Richmond Blackwood`.
- Gmail searches for Claudio personal-tax terms.

Actions:

- Created `clients/Individuals/Claudio Brivio/` using the legal name from Notion.
- Routed personal-tax/private evidence pointers into individual domain files.
- Updated `clients/Companies/CBMAX/linked-individuals.md` to point to the new individual folder.
- Added durable memory, source-register, skill-run, and open-question entries.

Unresolved:

- Reconcile the Notion 2024 filing Drive folder with the active Drive folder.
- Confirm whether Claudio's existing `.xlsx` workbook should be migrated to the maintained native machine-readable template.
- Confirm whether existing Notion tasks are linked to the filing before creating any new task pair.
- Resolve 2024 filing questions for February CBMAX payroll, CBMAX wage-tax certificate, TK/Hallesche reconciliation, Section 138 AO, Joblift travel classification, and the N26 investment-folder file.

## 2026-05-15 - Byron Jarvis Frasier 2024 Personal Tax Analysis

Imported:

- Notion individual record `https://www.notion.so/203647f1b74743a09fc8a408a3318b30`.
- Notion 2024 personal tax filing `https://www.notion.so/2cae41301314808bb952d50c6934b092`.
- AGL employment record `https://www.notion.so/aabd97548dab4747b3369cb0a9da0389`.
- AGL company record `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e`.
- AGL client project `https://www.notion.so/32fe41301314809fa77bf2f0d497de5b`.
- User-provided 2024 Drive filing folder `https://drive.google.com/drive/folders/1ajVVFLGIGfTjNLrjH8ELj1sW0YdPuHlj`.
- Client-provided Jan-Apr previous-employer payroll PDFs in `https://drive.google.com/drive/folders/1htafA6oTpZe3EhP2_6CsLHYOiM5NCyLl`.
- Existing V2 workbook `https://drive.google.com/file/d/1cPFvCjo1yOuRTJFAYM2NLSAtkgFMm6_F/view?usp=drivesdk` and older workbook `https://drive.google.com/file/d/1KIJlt_HX8hVHppXRpicUF30TD6GHL2-Q/view?usp=drivesdk`.
- Fresh Drive-native German personal-tax workbook `https://docs.google.com/spreadsheets/d/1_V8CzcZiQfxrIi4zTwVBsvwhvKAxxAaN901bxRm0JHk/edit`.

Actions:

- Copied the maintained German personal-tax template into the 2024 filing folder and populated input/source tabs only.
- Entered Jan-Apr previous-employer payroll journal figures and provisional May-Dec AGL gross salary rows.
- Recorded exact Drive PDF URLs for Jan-Apr payroll-derived rows and excluded old workbook expense/revenue/payment candidates without exact evidence URLs.
- Recorded Drive locations, source register, filing notes, personal-tax summary, linked-company pointers, open questions, and memory entries.

Unresolved:

- Obtain or extract AGL 2024 payslips/annual wage-tax certificate.
- Obtain previous-employer annual wage-tax certificate.
- Confirm address periods, expenses/no-expenses, investments/no-investments, and whether older workbook business activity belongs in scope.

## 2026-05-18 - Byron Jarvis Frasier Healthcare Evidence Update

Imported:

- 2024 ottonova Jahresvorsorgeaufwandsbescheinigung `https://drive.google.com/file/d/1FtUYBdq2qwL6v7AKWCP-_ra94HaGQT0w/view?usp=drivesdk`.
- 2024 ottonova Übertragungswertbescheinigung `https://drive.google.com/file/d/1UCHGupqpNW10N5y1gMYV_691-xZ-LUGd/view?usp=drivesdk`.
- 2025 ottonova Jahresvorsorgeaufwandsbescheinigung `https://drive.google.com/file/d/1koIJbBIdcmapEKBMR04XtN3ipFInC4Xb/view?usp=drivesdk`.
- 2025 ottonova Übertragungswertbescheinigung `https://drive.google.com/file/d/1IJWUkdpzx9qbESKAXGT2EvR-wUVW6UPs/view?usp=drivesdk`.
- BMF LStH 2024 Sec. 10 cap wording `https://esth.bundesfinanzministerium.de/lsth/2024/A-Einkommensteuergesetz/II-Einkommen/5-Sonderausgaben/Paragraf-10-Druck/inhalt.html`.
- RB Communications record `https://www.notion.so/364e413013148126afb0d72472a45ce2` for the outbound WhatsApp acknowledgement.

Actions:

- Updated Byron's 2024 workbook `Deductibles` input rows only.
- Claimed EUR 3,145.80 basic health/care insurance from the 2024 certificate.
- Recorded EUR 1,331.64 non-basic health insurance as provided but excluded from included deductions after Sec. 10(4) cap review.
- Rechecked Jan-Apr previous-employer payroll journal images and confirmed HI/PI/UI/CI employee/employer contribution columns show EUR 0.00, so no separate payroll health/care amount was added from those journals.
- Recorded the 2024 transfer-value certificate as reference only and cleared the old missing-healthcare manual flag from `Missing Info`.
- Updated Byron individual Drive/source/open-question notes and durable source memory.
- Created and linked the Notion preparation task `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e` and filing task `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`.
- Updated the filing row `Status`, `Document gathering status`, `GDrive Docs`, `Preparation Task`, and `Filing Task` fields, then verified by read-back.
- Added Notion task comments with the healthcare cap correction and revised workbook figures.
- Sent the approved WhatsApp acknowledgement to Byron's RB group and logged it in RB Communications.
- Read-back confirmed health/care insurance EUR 3,145.80, `ded-other-insurance` amount EUR 1,331.64 with included deduction EUR 0.00, other personal deductions EUR 3,181.80, total deductions EUR 4,411.80, and income after deductions EUR 76,555.36.

Unresolved:

- 2025 healthcare files are logged as future-year evidence only.
- Remaining Byron blockers are AGL/previous-employer annual payroll evidence, address-period confirmation, expense/investment confirmations, old workbook scope confirmation, and workbook check review.
- Filer should review final ELSTER data-entry treatment for the non-basic/private health insurance line 28 amount.

## 2026-05-19 - NACV And Andrei Nasonov Context Import

Imported:

- Notion company record `https://www.notion.so/d97abab7377f4d29b7fb11d4262906c8`.
- NACV client project `https://www.notion.so/32fe413013148083a7d0fa4f8d94c3e9`.
- Andrei individual record `https://www.notion.so/e275d80810824aa7bcc7cf7b7b6fd072`.
- Notion 2024 personal tax filing `https://www.notion.so/2cae4130131480358061f09398a4d71a`.
- Notion 2025 personal tax filing `https://www.notion.so/342e4130131480139e81d7f94450de8b`.
- Key NACV tax/VAT/prepayment tasks `https://www.notion.so/35fe413013148110859afa228ae41b6b`, `https://www.notion.so/35fe413013148134a46ae7e1bab9b897`, and `https://www.notion.so/359e4130131480858625d56338c18971`.
- Canonical NACV Drive folder `https://drive.google.com/drive/folders/1z36VoEjY6jkbqAjxGyRBZD7b323rMd_c`.
- Andrei personal-tax folders `https://drive.google.com/drive/folders/15UuDjh6pEEXy1oPmhazpaEET6OXS2rH_` and `https://drive.google.com/drive/folders/1ipt8yms6ULNb3pmsvX_vypQt3tlg5-ny`.
- WhatsApp route `NA Capital Ventures | RB` / `120363399321589278@g.us`.
- Gmail searches and selected May 2026 Finanzamt-letter threads.

Actions:

- Created `clients/Companies/NACV/` using the exact Notion `Reference`.
- Created `clients/Individuals/Andrei Nasonov/` using the Notion legal-name fields.
- Routed NACV company tax/VAT/prepayment/contract/Drive/communications context into company files.
- Routed Andrei personal-tax, joint-filing, TK/private-insurance, evidence-split, and Drive/workbook context into individual files.
- Saved the confirmed WhatsApp group JID as a route/source pointer only.
- Updated source and durable memory logs.

Unresolved:

- Obtain Finanzamt notices/response for 2024/2025 company tax amounts and prepayment amounts, then populate the Tax Prepayments database.
- Confirm Finanzamt response to VAT deregistration appeal/reinstatement and request lower VAT filing cadence when possible.
- Confirm Finanzamt's additional information request for the filed 2024/2025 company taxes and whether RB's response has been accepted.
- Complete the 2024/2025 personal-tax evidence split and confirm spouse/joint filing evidence; no spouse individual folder is needed because she is not a company shareholder.
- Confirm billing mechanics from Andrei's 2025 personal-tax filing onward.
- Confirm Andrei's official personal/director address with him.
- Confirm TK/private-health-insurance treatment and NACV payslip/wage-tax evidence before filing.

## 2026-05-21 - Master Chat And Skill Run Git Rule

Imported:

- User instruction in Codex chat on 2026-05-21 to make `git pull origin main`, new branch creation, branch push, conflict checking against main, and PR creation the default for every chat/skill run.
- Local process files `AGENTS.md`, `README.md`, `processes/repo-operation.md`, and `skills/rb-task-pr/SKILL.md`.

Actions:

- Added the new master git workflow to repo instructions, the repository operation process, the task PR skill, startup protocol, and durable memory.
- Recorded the rule as applying to repository-changing or live-state-changing RB Codex runs.
- Backed up the rule to the RB Internal Knowledge Base pages `RB Codex Repository Operating Rules` and `RB Review And PR Workflow`, then verified both pages by read-back.

Unresolved:

- Confirm whether pure read-only chats should create branches/PRs or only report that no branch was needed.

## 2026-05-26 - Hamburg Contact Availability Fix

Imported:

- Official Hamburg.de Finanzamt Hamburg-Nord page `https://www.hamburg.de/politik-und-verwaltung/behoerden/finanzbehoerde/einrichtungen/finanzaemter/nord-207130`.
- Notion Front Office Contact `https://www.notion.so/2efe4130131480bb94bac672c2ae5c07`.
- Contact Availabilities data source `collection://342e4130-1314-8051-8d67-000b937562b5`.

Actions:

- Created and linked Monday-Friday phone-support Contact Availabilities for Finanzamt Hamburg-Nord using the official telephone reachability window.
- Updated the Hamburg contact page with the schedule, source, imported date, and review note.
- Updated the authority-call setup skill and durable memory so missing linked contact availability is a hard blocker before Calls submission or review.

Unresolved:

- Recheck Hamburg.de if public phone hours change.

## 2026-05-26 - Accounting Task Review Routing Correction

Imported:

- User instruction in Codex chat on 2026-05-26 that routine tasks should not be assigned to Ioana as managing director.
- User instruction that approval should be treated as review by adding the reviewer to `Review By` on the owning task.
- User instruction that Accounting Team Updates Slack completion notices should list created and updated task hyperlinks and tag the assigned person for each task.
- Notion task corrections for Teamdash, EIP Circle / Mono contractor payment approval, weekly invoice payables, and Stripe invite.

Actions:

- Updated `processes/notion-operations.md`, `processes/accounting-team-updates-triage.md`, `skills/rb-accounting-team-updates-triage/SKILL.md`, `internal/people-roles.md`, `memory/skill-runs.md`, and `memory/handoff.md`.
- Backed up the Accounting Team Updates triage rule change to the existing RB Internal Knowledge Base page `https://www.notion.so/367e413013148175b709e35f31d37821`.
- Edited the 2026-05-26 Slack closeout message `https://eipventuresworkspace.slack.com/archives/C0B1UTJJDLJ/p1779800761798929` to include task hyperlinks and assigned-person Slack tags, then added Notion source/log comments.

Unresolved:

- Confirm whether broader non-accounting workflows should receive the same explicit `Review By` wording beyond the central Notion task rules.

## 2026-05-26 - Accounting Slack Context And Packet Plan

Imported:

- User instruction in Codex chat on 2026-05-26 to add bounded Slack channel reads to the Accounting Team Updates skill.
- Slack channel search results for `#rb-client-updates`, `#rb-operations`, `#rb-structuring`, and `#all-richmond-blackwood`.
- User instruction to plan a packet-based upgrade similar to the daily common tasks run-through.

Actions:

- Resolved channel IDs: `#rb-client-updates` `C0B1UTJJDLJ`, `#rb-operations` `C0AMJHHHAKY`, `#rb-structuring` `C0AMDDTNSFL`, and `#all-richmond-blackwood` `C0ALBMSLL5A`.
- Updated `skills/rb-accounting-team-updates-triage/SKILL.md` and `processes/accounting-team-updates-triage.md` so future runs read current-window human Slack messages and new thread context while excluding ChatGPT/Codex/OpenAI/bot-authored messages.
- Added a six-packet upgrade plan covering preflight, source context, routing plan, Notion write results, Slack closeout plan, and send/closeout results.
- Backed up the updated process to RB Internal Knowledge Base page `https://www.notion.so/367e413013148175b709e35f31d37821` and verified it by read-back.

Unresolved:

- Validate the Slack-context filter on the next weekday Accounting Team Updates run.

## 2026-05-26 - Accounting Packet Workflow Implementation

Imported:

- User instruction in Codex chat on 2026-05-26 to implement the packet-based Accounting Team Updates triage plan.
- User instruction to make Stage 1 auto-approved and clarify that `New client inbounds` are observed / out of scope rather than skipped.
- GitHub PR state for #53 and #56.

Actions:

- Reordered PR #56 history so #53's 2026-05-26 Accounting Team Updates run-log row is the first accounting-skill commit.
- Made packet mode mandatory in `skills/rb-accounting-team-updates-triage/SKILL.md` and `processes/accounting-team-updates-triage.md`.
- Added `skills/rb-accounting-team-updates-triage/references/stage-packet-protocol.md` with six packet stages, Stage 1 auto-approval, Stage 2 read-only continuation, mutation safety rules, and compaction recovery.
- Replaced ambiguous `skipped New client inbounds` wording in the active process/skill path with `New client inbounds observed / out of scope`.
- Backed up the packet workflow to RB Internal Knowledge Base page `https://www.notion.so/367e413013148175b709e35f31d37821` and verified it by read-back.

Unresolved:

- Validate the packet protocol on the next live weekday Accounting Team Updates run.

## 2026-05-26 - Accounting Packet Routing Skill

Imported:

- User instruction in Codex chat on 2026-05-26 that unclear ownership, project, or source meaning should be proposed in the Stage 3 packet rather than immediately written to Team Updates.
- User instruction that the packet workflow needs explicit per-stage execution detail so the machine knows what to do.
- User suggestion to place detailed task-routing strategy in a new skill and have the packet stage apply that skill.

Actions:

- Added planning-only skill `skills/rb-accounting-team-updates-routing/SKILL.md` with deterministic Stage 3 decisions: `create_task`, `update_task`, `comment_existing`, `skip_already_handled`, and `unresolved`.
- Updated `skills/rb-accounting-team-updates-triage/SKILL.md` and `processes/accounting-team-updates-triage.md` so Stage 3 applies the routing skill and unresolved rows stay in the packet until Stage 4 approved write-back.
- Expanded `skills/rb-accounting-team-updates-triage/references/stage-packet-protocol.md` with a stage execution contract and concrete execution steps for Stages 1-6.
- Updated durable memory to replace stale `skip New client inbounds` and no-task-detail Slack wording with the packet-gated closeout rule.

Unresolved:

- Validate the Stage 3 routing table output and unresolved-row guard on the next live weekday Accounting Team Updates run.

## 2026-05-26 - Accounting Packet Gap Hardening

Imported:

- User instruction in Codex chat on 2026-05-26 to fix all gaps from the critical review of the Accounting Team Updates skill.

Actions:

- Tightened Stage 1 so auto-continuation only applies to clean/no-conflict git state.
- Required exact Notion and Slack query bounds in Stage 2 packets.
- Updated Stage 3 routing to split multi-action source rows into atomic routing items, resolve owning operational rows and client projects before Central Tasks/RB Backlog, verify target schema/property names, and include exact write payloads, due dates, write-back methods, and Slack mention status.
- Updated Stage 4 to execute only the approved write payloads and read back owner/status/project/reviewer/due-date fields.
- Updated Stage 5 Slack closeout to include updated/commented tasks and to block on unresolved assignee Slack mentions unless the operator approves a plain-name no-notification fallback.
- Updated durable memory with the hardened packet rules.

Unresolved:

- Validate the hardened packet contract on the next live weekday Accounting Team Updates run, especially client-project routing, comment-only closeouts, and Slack mention blocking.

## 2026-05-27 - Accounting Routing Source Entity URL Rule

Imported:

- User instruction in Codex chat on 2026-05-27 that when telling people something is being routed, the message must include the URL of the entity it is being routed from.
- User correction in Codex chat on 2026-05-27 that Accounting Team Updates routing should find or create tasks instead of leaving clear action rows unresolved.

Actions:

- Updated the Accounting Team Updates process, triage skill, routing subskill, and stage-packet protocol so task comments, operational-row updates, Team Updates write-backs, Slack closeouts, and packet text that say an item was routed must include the source entity URL.
- Set the default source entity URL for Accounting Team Updates to the Team Updates page URL, with block/row URLs preferred when available and source section/exact line included when no block-level URL exists.
- Tightened the routing rule so unresolved rows must explain why creating a task is unsafe; if owner, project, action, and Tasks schema are clear, Stage 3 must propose `create_task` when no existing owner task is found.
- Added a Stage 4 packet gate that rejects unresolved rows before writing when they lack a concrete create-task unsafe reason or only say no existing task was found.
- Updated the active 2026-05-27 Stage 3 packet examples so proposed Team Updates write-backs and task comments include the source Team Updates page URL.

Unresolved:

- Internal Knowledge Base mirror is pending because the Notion connector returned `Auth required` for page `https://www.notion.so/367e413013148175b709e35f31d37821`.

## 2026-06-01 - Browser API/MCP Rejection Rule

Imported:

- User instruction in Codex chat on 2026-06-01 to reject browser use when an API or MCP route might be possible, check API/MCP feasibility within the current plan, and ask the responsible team member for the right API keys when access is possible but credentials are missing.

Actions:

- Added the rule to `AGENTS.md` under Helper And Connector Boundary.
- Mirrored the rule in `processes/repo-operation.md` under Connector And Helper Boundary.
- Updated skill-run, current-state, history, and handoff memory with the new operating rule.
- Backed up the rule to Internal Knowledge Base page `https://www.notion.so/356e41301314811383fff7212a56a0cd` (`RB Codex Repository Operating Rules`).

Unresolved:

- PR closeout pending.
