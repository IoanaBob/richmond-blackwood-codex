# Personal Tax Returns

Status: provisional.
Source: User instruction on 2026-05-13; Notion personal-tax filings; Gmail SteuerGo message; Client Notes & Updates brokerage analysis; WhatsApp chat `120363222065866778@g.us`.
Imported: 2026-05-13.
Review: The 2024 workbook analysis is source-backed but not filing-ready; see the 2024 analysis section and open questions before filing.

## Filing Records

| Filing | Jurisdiction | Period | Due date | Status | Document gathering | Drive |
| --- | --- | --- | --- | --- | --- | --- |
| 2024 - Personal Tax - Byron | Germany | 2024-01-01 to 2024-12-31 | 2026-04-30 | In progress | In progress | `https://drive.google.com/drive/folders/1ajVVFLGIGfTjNLrjH8ELj1sW0YdPuHlj` |
| 2025 - Personal Tax - Byron Germany | Germany | 2025-01-01 to 2025-12-31 | 2026-07-31 | Pending | Not provided | Not set in Notion at fetch time |

Notion filing pages:

- 2024: `https://www.notion.so/2cae41301314808bb952d50c6934b092`
- 2025: `https://www.notion.so/342e41301314800197bad5f6b9c7330e`

## Current Setup / Evidence

| Item | Source | Notes |
| --- | --- | --- |
| Personal tax Drive root under AGL | `https://drive.google.com/drive/folders/10cRRxdwQOCKY0VDbijns5zCAUtaZy34m` | Contains Byron personal-tax folder. |
| Byron Jarvis personal folder | `https://drive.google.com/drive/folders/1T5Zwu1bM5NsXgtKl7rBwZN4X0oyvdt6i` | Contains 2024 folder. |
| Byron 2024 folder | `https://drive.google.com/drive/folders/1ajVVFLGIGfTjNLrjH8ELj1sW0YdPuHlj` | Contains analysis templates and 2024 personal filing folder. |
| 2024 filing folder | `https://drive.google.com/drive/folders/1fgG_DTQ7uy2akUekM6aV2cmkGp7iWEXJ` | Contains payroll subfolder. |
| 2024 payroll evidence | `https://drive.google.com/drive/folders/1htafA6oTpZe3EhP2_6CsLHYOiM5NCyLl` | Contains 2024 payroll PDFs and a `Document Password` file. Do not copy passwords into git. |
| SteuerGo data retrieval request | Gmail message `19e20f06924b8d7b` | SteuerGo requested data retrieval for Byron Jarvis Frasier on 2026-05-13; activation/data-retrieval completion may need follow-up. |
| WhatsApp document-gathering request | WhatsApp chat `Frasier, Byron \| Richmond Blackwood`, 2026-04-15 | RB asked Byron to upload personal-tax documents, invoices, expense receipts, and relevant records to the shared Drive folder. |
| 2024 payroll/expense follow-up | WhatsApp chat `Frasier, Byron \| Richmond Blackwood`, 2026-04-23 to 2026-05-03 | RB asked for Jan-May 2024 contractor payslips and 2024 expenses. Byron indicated files/folders would be added. A password was shared in WhatsApp for protected payroll evidence; do not copy that password into git. |

## 2024 German Personal Tax Analysis

Status: provisional.
Source: Workbook `https://docs.google.com/spreadsheets/d/1_V8CzcZiQfxrIi4zTwVBsvwhvKAxxAaN901bxRm0JHk/edit`; Notion individual, filing, and employment records; Drive payroll PDFs; ottonova 2024 healthcare certificates.
Imported: 2026-05-15; healthcare cap correction imported 2026-05-18.
Review: This is a source-backed preparation workbook, not a final tax computation or filing-ready return.

Filing page: `https://www.notion.so/2cae41301314808bb952d50c6934b092`.
Preparation task: `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e`.
Filing task: `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`.
Filing period: 2024-01-01 to 2024-12-31.
Jurisdiction: Germany.
Workbook: `https://docs.google.com/spreadsheets/d/1_V8CzcZiQfxrIi4zTwVBsvwhvKAxxAaN901bxRm0JHk/edit`.
Template used: `RB German Personal Tax Analysis - Machine-Readable Template v1` copied fresh from the maintained native template.

Read-back summary from the workbook:

| Output | Amount/status | Review |
| --- | --- | --- |
| Gross employment income | EUR 80,967.16 | Jan-Apr previous employment source-backed; May-Dec AGL gross is provisional from Notion salary records |
| Wage tax withheld | EUR 8,188.64 | Jan-Apr only; AGL withholding not extracted |
| Solidarity surcharge withheld | EUR 100.12 | Jan-Apr only; entered from payroll journals |
| Church tax withheld | EUR 0.00 | Needs religion/church-tax review |
| Employment work expenses used | EUR 1,230.00 | Template employee lump-sum baseline |
| Home-office daily allowance included | EUR 0.00 | Days/eligibility not confirmed |
| Health/care insurance included | EUR 3,145.80 | 2024 ottonova certificate confirms EUR 2,286.60 basic health insurance and EUR 859.20 care insurance |
| Other personal deductions included | EUR 3,181.80 | Health/care insurance plus EUR 36 special-expense baseline; non-basic/private health is recorded but not included after cap review |
| Total deductions used | EUR 4,411.80 | Employment lump-sum plus personal deductions |
| Income after deductions before tax-rate calculation | EUR 76,555.36 | Not a final tax liability |
| Business/freelance net PNL included | EUR 0.00 | Older workbook business rows excluded pending evidence/scope confirmation |
| Tax credits/reductions included | EUR 0.00 | No evidence found |
| Workbook failed checks | 7 | Includes revenue review, confirmations, deductibles/credits, prior-year links, and a EUR 100.12 journal gap matching Jan-Apr payroll solidarity surcharge |
| Workbook open missing-info count | 38 | Healthcare evidence flag cleared; remaining flags still include payroll extraction, confirmations, deductibles, credits, and manual flags |

Source-backed revenue entered:

| Period | Employer/source | Gross | Wage tax | Solidarity | Evidence | Review |
| --- | --- | ---: | ---: | ---: | --- | --- |
| Jan-Apr 2024 | Lincs UG previous-employer payroll journals | EUR 28,967.16 | EUR 8,188.64 | EUR 100.12 | PDFs in `drive-locations.md` | Health/social contribution columns rechecked as EUR 0.00; formal annual wage-tax certificate still needed |
| May-Dec 2024 | AGILE LINCS LIMITED / RB employment record | EUR 52,000.00 | Not extracted | Not extracted | Notion employment/payroll relation | AGL payslips or 2024 Lohnsteuerbescheinigung needed |

Excluded from claimed rows:

- Older workbook business/freelance revenue of EUR 175,254.30 because no source invoices/bank evidence were found in the provided filing folder and the scope conflicts with the current employment-led evidence set.
- Older workbook expenses of EUR 4,737.26 because exact receipt/invoice URLs were not found.
- Older workbook tax prepayments/trade-tax/VAT payment candidates because bank/tax notice evidence and assessment-year mapping were not found.
- Existing V2 workbook healthcare candidate of EUR 1,266.64 is superseded by the 2024 ottonova certificate.
- 2024 ottonova transfer-value certificate is recorded as reference only; it is not a contribution/payment claim.
- Home-office daily allowance because qualifying days and no-external-workplace facts were not confirmed.

Operator-added rows:

- 2024 ottonova non-basic/private health insurance of EUR 1,331.64 is recorded in `Deductibles` from certificate line 28 after operator instruction on 2026-05-18, but the row was corrected to `Claim Decision` = `No` / included deduction EUR 0.00 after cap review. Basic health/care already totals EUR 3,145.80, which exceeds the EUR 2,800/1,900 Sec. 10(4) ceiling, so the workbook should not add line 28 as a further tax-effect deduction. Filer should still review final ELSTER data-entry treatment.

Verification performed:

- Fresh native Sheet copy created in the user-provided Drive folder.
- Populated only source/input tabs and input columns: `Setup`, `Revenue`, `Deductibles`, `Tax Payments`, `Sources`, and `Missing Info`.
- Preserved formula/calculation tabs and formula columns.
- Read back `Summary`, `Tax Analysis`, `Revenue`, `Tax Payments`, and `Missing Info` after update.
- Confirmed exact Drive PDF URLs are present for Jan-Apr payroll-derived rows.
- Read back `Deductibles` row `ded-health-insurance-basic` after the 2026-05-18 update: amount EUR 3,145.80, claim decision `Yes`, evidence status `Provided`, review status `Ready`, evidence URL `https://drive.google.com/file/d/1FtUYBdq2qwL6v7AKWCP-_ra94HaGQT0w/view?usp=drivesdk`.
- Read back `Deductibles` row `ded-other-insurance` after cap correction: amount EUR 1,331.64, claim decision `No`, included deduction EUR 0.00, review status `Not claimed`, evidence URL `https://drive.google.com/file/d/1FtUYBdq2qwL6v7AKWCP-_ra94HaGQT0w/view?usp=drivesdk`.
- Rechecked Jan-Apr previous-employer payroll journal images on 2026-05-18: HI/PI/UI/CI employee and employer contribution columns show EUR 0.00 for each month, so no separate payroll health/care amount was added from those journals.
- Read back recalculated `Summary` and `Tax Analysis` after removing the line 28 tax-effect deduction: health/care insurance EUR 3,145.80, other personal deductions EUR 3,181.80, total deductions EUR 4,411.80, income after deductions EUR 76,555.36.
- Notion read-back confirmed the filing row has `Status` = `In progress`, `Document gathering status` = `In progress`, `Preparation Task` = `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e`, and `Filing Task` = `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`.
- Notion preparation and filing task comments were updated with the healthcare cap correction and revised summary figures.

## Personal Tax Edge Cases

Status: provisional.
Source: User instruction on 2026-05-13; brokerage analysis note `https://www.notion.so/2a0e4130131480979a6fea007ccfdc49`.
Imported: 2026-05-13.
Review: Needs accountant/operator review before workbook conclusions.

- Byron was a US resident.
- Byron owns an apartment in the US.
- Byron has US investment accounts, including Roth and IRA accounts.
- Germany taxes worldwide income; US IRA/Roth treatment is not automatically German tax-free.
- German filings should track dividends, interest, realized gains, distributions, and retirement-account activity.
- If there were retirement-account distributions while German tax resident, budget for German tax review and US consequences.
- If funds moved between brokerage accounts, tax depends on realized income/gains rather than the withdrawal/deposit movement itself.

## Workflow Note

Future German personal-tax analysis should start from the maintained native Google Sheets template `RB German Personal Tax Analysis - Machine-Readable Template v1`: `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`.

Do not extend legacy ad hoc `codex - ...` tabs when creating Byron's active analysis workbook.
