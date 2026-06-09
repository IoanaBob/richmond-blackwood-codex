# Personal Tax Returns

Status: approved.
Source: Notion 2024 personal tax filing `https://www.notion.so/2cae413013148010823aedea9376e6a5`; Notion employment record `https://www.notion.so/19eb44945e544186baf7be0d9fb3612d`; Drive payslip folder `https://drive.google.com/drive/folders/1IUAeKdp8IOcuwVYWIty2ykjxsOw9Ofwr`; workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-06.
Review: Payroll gross, wage-tax withholding, social/health deductions, and net pay have been extracted from the payslips and annual wage-tax certificate; final filing still needs review of optional deductions, expenses, investments, and prior-year/opening-balance items.
Approval: User approved the current workbook/process state for commit on 2026-05-07; this does not mean the 2024 filing is complete.

## 2024 German Personal Tax Pilot

Filing page: `https://www.notion.so/2cae413013148010823aedea9376e6a5`.
Filing period: 2024-01-01 to 2024-12-31.
Jurisdiction: Germany.
Status in Notion: In progress.

Workbook: `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Template used: `RB German Personal Tax Analysis - Machine-Readable Template v1`.

Revenue status: 12 payroll-led revenue rows were added. The employment record shows employment started 2023-09-01, before the 2024 filing period. The matching 2024 payslips were found in Drive and attached to the linked Notion payroll run `Payslip` file fields. Payslip extraction now ties to EUR 28,800 gross employment income, EUR 2,656 wage tax withheld, EUR 0 payroll social/health deductions, and EUR 26,144 net paid.

Payslip folder: `https://drive.google.com/drive/folders/1IUAeKdp8IOcuwVYWIty2ykjxsOw9Ofwr`.
Jan-Feb 2024: the associated payroll entries include both original and March correction payslip PDFs in `Payslip`.
Annual wage-tax certificate: `https://drive.google.com/file/d/1OZw7NIlnSFeXkGQ8T6UJfRKgJw3mROPh/view?usp=drivesdk`.

Open workbook checks after payslip attachment:

| Check | Status |
| --- | --- |
| Journal balances | OK |
| Revenue rows needing review | FAIL - January/February zero wage-tax withholding explanation still needed |
| Prior-year opening links | FAIL - opening balance source still needed |
| Missing expense confirmation | FAIL - no expense evidence or no-expense confirmation found |
| Missing investment confirmation | FAIL - no investment evidence or no-investment confirmation found |
| Missing direct tax payment/prepayment confirmation | FAIL - no bank extract/direct payment review completed |

## 2026-05-07 Template Update Status

Status: approved.
Source: User instruction on 2026-05-07; maintained native Google Sheets template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.
Imported: 2026-05-07.
Review: Final deductible eligibility still needs review before filing; Selin's home-office daily allowance is filled at the maximum day count per operator instruction and should be reviewed against the no-external-office/workplace assumption if needed.

The live German personal-tax template and Selin workbook now include source-backed `Deductibles`, `Tax Credits`, `Tax Payments`, `Tax Analysis`, and ELSTER-style `Summary` tabs. Selin worked from home in 2024 per user instruction, and the workbook now uses the daily home-office allowance / `Tagespauschale` rather than the dedicated-room route. Per operator instruction on 2026-05-08, Selin's 2024 and 2025 workbooks claim the maximum 210 days on the daily row, producing EUR 1,260 included deduction in each year; the dedicated-room row is inactive, has no potential amount, and contributes EUR 0.

## 2026-05-07 Summary Formula Repair

Status: approved.
Source: User screenshot/report on 2026-05-07; Selin workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-07.
Review: Remaining failed checks are expected review items, not formula parse errors.

The Selin `Summary` tab showed `#REF!` on rows referencing `Tax Analysis` because formulas had been written in the same batch as newly created tabs. The repair rewrote the affected formula-driven tabs after all referenced tabs existed and cleared true blanks before writing values, so blank template rows do not count as populated. Read-back confirmed `Summary!C5:C20` now shows calculated values, including gross employment income EUR 28,800 and no `#REF!`/`#ERROR!` in the Summary value column.

## 2026-05-07 Tax Analysis Logic Repair

Status: approved.
Source: User review on 2026-05-07; Selin workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-07.
Review: Final filing still needs payslip/tax certificate extraction and review of optional deductions.

`Tax Analysis!B7` now uses the employee lump-sum potential amount as the baseline when employment income exists, rather than waiting for the `Deductibles` row to be marked `Yes`. `Tax Analysis!B19` now excludes tax credits from payments/withholding, and row 20 separately totals known credits, payments, and withholding before final tax calculation. Later home-office and healthcare updates changed Selin's current 2024 read-back to EUR 1,260 employment work expenses used and EUR 17,718.70 income after deductions before tax-rate calculation.

## 2026-05-07 Deductible Review Process Correction

Status: approved.
Source: User review on 2026-05-07; Selin workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-07.
Review: Operator must answer the deductible/tax-credit question list before any optional row is marked as claimed.

The `Deductibles` and `Tax Credits` tabs now use `Needs operator review` by default rather than `Candidate`, so the workbook does not imply those items are planned claims. The employee lump sum remains `Baseline only` as a formula comparator for employment income. The applicability questions are recorded in `open-questions.md`.

## 2026-05-07 Payroll Withholding Repair

Status: approved.
Source: User review on 2026-05-07; Drive payslip folder `https://drive.google.com/drive/folders/1IUAeKdp8IOcuwVYWIty2ykjxsOw9Ofwr`; annual wage-tax certificate `https://drive.google.com/file/d/1OZw7NIlnSFeXkGQ8T6UJfRKgJw3mROPh/view?usp=drivesdk`; Selin workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-07.
Review: Confirm no additional payroll certificate fields beyond wage tax, solidarity surcharge, church tax, and statutory/social deductions are needed for the filing summary.

The earlier revenue rows were wrong because net pay was still calculated as gross while payroll withholding columns were blank. Payslip extraction shows January and February gross EUR 2,400 with EUR 0 wage tax each; March through November gross EUR 2,400 with EUR 269 wage tax each; December gross EUR 2,400 with EUR 235 wage tax. Social/health payroll deduction rows on the payslips are EUR 0 throughout. The annual wage-tax certificate ties to gross employment income EUR 28,800 and wage tax withheld EUR 2,656.

The Selin workbook now shows wage tax withheld in `Revenue!F2:F13`, net paid in `Revenue!I2:I13`, and `Tax Analysis!B16` / `Summary!C6` at EUR 2,656. The master template was updated so salary rows with blank payroll tax/social extraction fields are flagged as needing extraction rather than marked ready.

January and February 2024 remain a payroll review point: both the original payslips and March correction payslips show EUR 0 wage tax withheld on EUR 2,400 monthly gross, and the annual wage-tax certificate total of EUR 2,656 ties to March-December only. The workbook flags those two revenue rows as `Needs payroll withholding explanation`.

## 2026-05-07 Healthcare Deduction Added

Status: approved.
Source: User instruction on 2026-05-07 reporting Selin's client information; Selin workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`.
Imported: 2026-05-07.
Review: Need insurer bill and personal payment evidence before final filing.

Selin reportedly had a 2024 healthcare bill of EUR 9,785.30, paid personally because she is a controlling director. The workbook now records this on `Deductibles!A11:W11` as `health-insurance-basic` / `Anlage Vorsorgeaufwand`, with `Claim Decision = Yes`, `Included Deduction EUR = 9,785.30`, and review status `Needs evidence URL`. `Summary` now shows health/care insurance included at EUR 9,785.30, and `Tax Analysis` includes this in other personal deductions.

The master template deductible review formula now requires an evidence URL for claimed deductible rows unless evidence is marked `Not required`, so client-reported claims remain visible as evidence gaps.

## 2026-05-07 Special Expense Baseline Correction

Status: approved.
Source: User instruction on 2026-05-07; maintained German template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`; Selin 2024 workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`; Selin 2025 workbook `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`.
Imported: 2026-05-07.
Review: Joint assessment would double the statutory baseline; final filing still needs professional/operator review before submission.

The German special expense lump sum / `Sonderausgaben-Pauschbetrag` is now included in the maintained template and in Selin's 2024 and 2025 workbooks as `ded-special-expense-lump-sum`, with `Claim Decision = Baseline only` and `Evidence Status = Not required`. The formula includes EUR 36 automatically for single assessment, but zeros the row if higher covered special expenses in the workbook are claimed, so it is not double-counted. `Deductibles!B2:B18` now reads the tax year from `Setup!B3` so copied workbooks do not keep stale allowance years.

Current read-back after the later home-office daily max-day update shows 2024 other personal deductions at EUR 9,821.30, employment work expenses used at EUR 1,260, and income after deductions at EUR 17,718.70. Selin 2025 now includes the EUR 36 baseline, employment work expenses used at EUR 1,260, and income after deductions at EUR 27,504.00.

## 2026-05-07 Home-Office Daily-Allowance Correction

Status: approved.
Source: User instruction on 2026-05-07; maintained German template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`; Selin 2024 workbook `https://docs.google.com/spreadsheets/d/1rmk2AMsVe1cpoBBJfTrvTEQ9XLyTIGQuosGk4FF_ITU/edit`; Selin 2025 workbook `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`.
Imported: 2026-05-07; updated 2026-05-08.
Review: Final filing review should confirm the 210 WFH-day/no-external-office assumption if required; the amount is now filled per operator instruction.

The home-office treatment was clarified as the days-based daily allowance / `Tagespauschale`, not the dedicated-room route. The maintained template now describes `ded-home-office-daily` as the default route: enter qualifying days in `Units / Days`, calculate EUR 6 per day, and cap at EUR 1,260. The dedicated-room row remains a separate non-default route and is inactive unless explicitly approved.

Follow-up correction after workbook review: Selin's 2024 and 2025 workbooks now claim the maximum 210 days on `ded-home-office-daily`, with `Rate EUR = 6`, cap EUR 1,260, `Claim Decision = Yes`, and `Included Deduction EUR = 1,260`. The dedicated-room row is `No`, has no potential amount, and contributes EUR 0.

Second follow-up correction: the `Summary` output previously summed both `home-office-daily` and `home-office-room`, which made the return outcome look like the room route was counted even though the room row was `No`. The 2024 and 2025 summaries now say `Home-office daily allowance included` and only sum `home-office-daily`. Read-back shows the home-office daily allowance included at EUR 1,260 in both years, with the room route inactive.

## 2025 German Personal Tax Setup

Status: provisional.
Source: Notion 2025 personal tax filing `https://www.notion.so/342e4130131480eab03dd8498d24d23e`; Notion employment record `https://www.notion.so/19eb44945e544186baf7be0d9fb3612d`; Drive payslip folder `https://drive.google.com/drive/folders/1ustYGqTraDcaqv0LwQSqa1lk6M-vYIMq`; workbook `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`.
Imported: 2026-05-07.
Review: This is setup/revenue pilot work only. Final filing still needs expense evidence review, investment/no-investment confirmation, deductible/tax-credit operator review, and prior-year balance-sheet tie-out.

Filing page: `https://www.notion.so/342e4130131480eab03dd8498d24d23e`.
Filing period: 2025-01-01 to 2025-12-31.
Jurisdiction: Germany.
Status in Notion after setup: In progress.

Workbook: `https://docs.google.com/spreadsheets/d/1Y54G6pHrWvkF13EzDe_n05ATarGpM20vxyqAIDiWN2c/edit`.
Template used: `RB German Personal Tax Analysis - Machine-Readable Template v1`.

Revenue status: 12 payroll-led revenue rows were added. The employment record shows employment started 2023-09-01, before the 2025 filing period. The 2025 payslips in Drive show EUR 2,400 gross, EUR 258.08 wage tax withheld, EUR 0 payroll social/health deductions, and EUR 2,141.92 formula-derived net pay for each month. Workbook totals read back as EUR 28,800 gross employment income, EUR 3,096.96 wage tax withheld, and EUR 25,703.04 net pay.

Payslip linking: January-June 2025 payroll run `Payslip` fields were blank in Notion and were linked to the matching Drive payslip PDFs. July-December 2025 already had payslip files in Notion and were left in place.

Drive folders:

| Folder | URL |
| --- | --- |
| 2025 filing folder | `https://drive.google.com/drive/folders/127-k82-g8Ix3eUGEjLVhbA_1OAglGI7Z` |
| 2025 payslips | `https://drive.google.com/drive/folders/1ustYGqTraDcaqv0LwQSqa1lk6M-vYIMq` |
| Documents from client | `https://drive.google.com/drive/folders/1CBoFCpdifCb1xP3HmWedTyLGEgNE_DO5` |

Open workbook checks after setup:

| Check | Status |
| --- | --- |
| Journal balances | OK |
| Revenue rows needing review | OK |
| Prior-year opening links | FAIL - opening balance tie-out still needed |
| Missing expense confirmation | FAIL - documents are present but need date/year/category review before claiming |
| Missing investment confirmation | FAIL - no investment evidence or no-investment confirmation found |
| Deductibles review | FAIL - operator must review applicability before claims |
| Tax credit review | FAIL - operator must review applicability before claims |
| Direct tax payment/prepayment confirmation | FAIL - review bank statements/notices or confirm none |

## 2026-06-09 ELSTER Draft Preparation

Status: provisional.
Source: User instruction on 2026-06-09; live Mein ELSTER drafts and validation screens; Selin 2024 and 2025 workbooks listed above; official ELSTER help for 2025 Anlage N home-office daily allowance.
Imported: 2026-06-09.
Review: Drafts are saved for filer/operator review only. Neither year has been submitted. Final submission needs review of the workbook flags, ELSTER prefill values, and 2025 name spelling.

### 2024 Draft

Saved ELSTER draft: `ESt unbeschränkt (ESt 1 A) 2024, Selin Özkohen Abuav`, saved in Mein ELSTER on 2026-06-09 at about 13:50 IST.

Draft data entered/reviewed:

| Item | Draft treatment | Review |
| --- | --- | --- |
| Tax number | `13/460/03405`, Finanzamt Charlottenburg | Matches current Notion tax number and prior ELSTER transfer context. |
| Wage-tax certificate | Official ELSTER prefill retained: tax class 1, gross EUR 28,800, wage tax EUR 2,656, SolZ EUR 0 | Matches the 2024 workbook payroll totals. |
| Home-office daily allowance | Entered 210 days in `Anlage N`, `Tagespauschale`, no-permanent-other-workplace day field | Per operator instruction and workbook. Confirm the no-external-office/workplace assumption before submission if needed. |
| Bankverbindung | User-provided domestic IBAN present; account holder set to Person A | Rechecked on 2026-06-09 after the user's IBAN instruction. |
| Private health/care insurance | Official ELSTER prefill retained: private health EUR 3,430 and care EUR 672 | This conflicts with the workbook's client-reported EUR 9,785.30 claim, which still lacks insurer bill/payment evidence. Resolve before final submission. |
| Self-employment schedule | Removed transferred stale `Anlage S` entry for `Translator` profit EUR 20,607 | Workbook has no current self-employment income source for 2024. |
| ELSTER check/calculation | Passed validation; preliminary calculation showed refund EUR 58 | Preliminary only; not submitted. |

### 2025 Draft

Saved ELSTER draft: `ESt unbeschränkt (ESt 1 A) 2025, Selin Oezkohen Abuav`, saved in Mein ELSTER on 2026-06-09 at about 14:01 IST.

Draft data entered/reviewed:

| Item | Draft treatment | Review |
| --- | --- | --- |
| Taxpayer identity | Person A entered as Selin `Oezkohen Abuav`, tax ID `16528647096`, tax number `13/460/03405` | ELSTER/browser input could not generate `Ö`; reviewer should correct to `Özkohen Abuav` if ELSTER permits before final submission. |
| Selected Anlagen | Main form, Anlage N, Anlage Vorsorgeaufwand, Anlage Sonderausgaben | `Anlage Sonderausgaben` is present because the workbook carries the EUR 36 statutory baseline; no manual EUR 36 expense line was entered. |
| Wage-tax certificate | Official ELSTER prefill retained: tax class 1, gross EUR 28,800, wage tax EUR 3,096.96, SolZ EUR 0 | Matches the 2025 workbook payroll totals. |
| Home-office daily allowance | Entered 210 days in `Anlage N`, `Tagespauschale`, no-permanent-other-workplace day field | Per operator instruction and workbook. Confirm the no-external-office/workplace assumption before submission if needed. |
| Bankverbindung | User-provided domestic IBAN entered; account holder set to Person A | Entered on 2026-06-09 after the user's IBAN instruction. |
| Private health/care insurance | Official ELSTER prefill retained: private health EUR 3,430 and care EUR 672 | Workbook setup did not have equivalent 2025 evidence review cleared; keep official prefill under filer review. |
| ELSTER check/calculation | Passed validation after the IBAN was entered; preliminary calculation showed refund EUR 591 | Preliminary only; not submitted. |

Connector gap during draft preparation: Google Sheets and Notion connector calls initially returned `token_revoked` / invalidated OAuth token errors on 2026-06-09. Follow-up live Notion read-back later the same day succeeded and confirmed the 2025 analysis task is `Done`, marked complete on 2026-05-11, while the filing task remains `To Do` and the 2025 filing record remains `In Progress`. Google Sheets live workbook read-back was not repeated in that Notion-only recheck.

## 2026-06-09 ELSTER Review Packet

Status: provisional.
Source: User-pasted ELSTER review text on 2026-06-09; live Google Sheets read-back of Selin 2024 and 2025 workbooks on 2026-06-09; BMF EStH 2025 Vorsorgeaufwendungen `https://esth.bundesfinanzministerium.de/esth/2025/tabellarische-Uebersicht/Vorsorgeaufwendunge.html`; ELSTER 2025 home-office daily allowance help `https://www.elster.de/eportal/helpGlobal?themaGlobal=help_elevermaessigung_2025`.
Imported: 2026-06-09.
Review: ELSTER is currently in use for another account. Apply changes only after the operator confirms Celine/Selin's ELSTER login is active and approves the health/care decision.

The pasted review is substantially in order. It does not require an immediate payroll, home-office, filing-status, or bank change. The only material ELSTER-value issue is `Anlage Vorsorgeaufwand` health/care insurance.

| Area | Current draft/workbook position | Assessment | Ready-to-apply action when ELSTER is available |
| --- | --- | --- | --- |
| 2024 health/care insurance | ELSTER retained official prefill EUR 3,430 health plus EUR 672 care. Workbook includes EUR 9,785.30 on `ded-health-insurance-basic` with evidence still missing. | Pasted concern is correct. Do not submit 2024 until the EUR 4,102 vs EUR 9,785.30 discrepancy is resolved or explicitly documented. | If insurer certificate/payment evidence supports EUR 9,785.30, split it correctly between basic private health insurance and mandatory care insurance before entering. If not, keep the official ELSTER prefill and mark the workbook EUR 9,785.30 claim as evidence-pending/not filed. |
| 2025 health/care insurance | ELSTER retained official prefill EUR 3,430 health plus EUR 672 care. Workbook currently shows health/care included as EUR 0. | Pasted concern is correct. The filing position and workbook should match. | Keep the official ELSTER prefill only if accepted as insurer/prefill evidence, then update workbook/review notes to match. If unsupported or copied forward incorrectly, remove/change ELSTER values and keep workbook at EUR 0. |
| 2024 payroll | ELSTER and workbook both use gross EUR 28,800, wage tax EUR 2,656, SolZ EUR 0. Workbook flags Jan/Feb zero wage-tax withholding. | No ELSTER change if the annual wage-tax certificate supports these totals. | Keep ELSTER payroll totals; record/confirm the Jan/Feb zero-withholding explanation internally. |
| 2025 payroll | ELSTER and workbook both use gross EUR 28,800, wage tax EUR 3,096.96, SolZ EUR 0. | No ELSTER change if the 2025 certificate supports these totals. | Keep as drafted. |
| Home-office daily allowance | Both drafts claim 210 days; workbook uses EUR 1,260 daily allowance, no dedicated-room route. | Defensible if the 210-day/no-other-workplace assumption is accepted. | Keep 210 days; do not add a separate home-office room claim. |
| Name spelling | 2024 draft uses `Selin Özkohen Abuav`; 2025 draft uses `Selin Oezkohen Abuav`. | The reviewer is right that filed name should match the Finanzamt/Steuer-ID record. | If ELSTER accepts copy/paste with `Ö`, change 2025 to `Özkohen Abuav`; if ELSTER requires ASCII, leave `Oezkohen Abuav` and document the transliteration. |
| Investment / Anlage KAP / Anlage SO | Workbooks show zero investment income/gains but still require no-investment confirmation. | No ELSTER change unless investment, broker, crypto, interest, dividend, or withholding evidence exists. | Leave Anlage KAP/SO absent/zero if no-investment confirmation is obtained. Add relevant Anlage only if evidence appears. |
| Expenses and tax credits | Workbooks still ask for expense and tax-credit applicability review; drafts currently claim only home-office employment expenses. | No ELSTER change unless additional facts/evidence exist. | Keep current home-office-only position unless commuting, equipment, training, travel, household services, handyman, foreign tax, donation, or other evidence is approved. |
| Direct Finanzamt payments/prepayments | Workbooks flag missing confirmation; drafts only include payroll withholding. | Usually not a manual ELSTER field change unless a prepayment/payment entry is expected from notices or bank review. | Confirm none or document payments/notices for final assessment review. |
| Filing status / children | Drafts assume single/tax class 1/no children. | No contrary evidence in the current file. | Keep as drafted unless new marital/child facts appear. |
