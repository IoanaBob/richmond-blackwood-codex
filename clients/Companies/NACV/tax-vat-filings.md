# Tax And VAT Filings

Status: provisional.
Source: Notion filing registrations, tax prepayment records, tax/VAT tasks, Gmail Finanzamt-letter threads, Drive correspondence folders, WhatsApp `NA Capital Ventures | RB`, and user instruction on 2026-05-19.
Imported: 2026-05-19.
Review: Obtain Finanzamt notices/response for 2024/2025 tax amounts, prepayment amounts, VAT reinstatement, filing cadence reduction, and the additional company-tax information request before treating these items as settled.

## Company Tax Position

NACV is recorded in Notion as tax resident in Germany. The company has German registration records for corporation tax, trade tax, VAT-related filings, and tax prepayment schedules.

Do not copy exact tax numbers, Finanzamt bank details, payment references, certificate filenames, ELSTER credential material, or attachment identifiers into git. Use live Notion filing registration and prepayment records when exact details are needed.

## High-Signal Registration Records

| Registration | Notion record | Status | Notes |
| --- | --- | --- | --- |
| Corporation tax | `https://www.notion.so/175e4130131480759b01f373ef022a99` | Registered | Active quarterly prepayments are recorded in Notion, but user says the amounts/notices were not properly decided/received. |
| Trade tax | `https://www.notion.so/175e41301314807ca1d6f974a4d41b34` | Registered | Active quarterly prepayments are recorded in Notion, but user says not all prepayments were paid because Finanzamt had not decided the amounts. |
| Tax prepayments schedule | `https://www.notion.so/1fce41301314807dba22d7504a250947` | Pending | Exact payment details remain in Notion only. Use the Tax Prepayments database linked to NACV to populate dates and amounts once Finanzamt confirms. |

## Prepayment Problem

Status: provisional.
Source: user instruction on 2026-05-19; Notion task `https://www.notion.so/35fe413013148110859afa228ae41b6b`.
Imported: 2026-05-19.
Review: Close only after the 2024 and 2025 tax notices/prepayment amounts are received and the Tax Prepayments database is populated.

NACV had registration problems and never received clear German prepayment amounts. The company did not pay all prepayments because Finanzamt had not decided the amounts to be paid.

Current next action:

- Get the Finanzamt notice/response for 2024 and 2025 tax amounts.
- Get the go-forward prepayment amounts.
- Populate the Tax Prepayments schedule linked to NACV.
- Then NACV can resume normal prepayments.

Open Notion task:

- `NACV - Confirm 2024/2025 German prepayments and VAT filing cadence`: `https://www.notion.so/35fe413013148110859afa228ae41b6b`

Task comments as of 2026-05-18 say there is a letter that VAT prepayment is zero, but RB still needs a filing response to get the needed information and set dates with JP. Treat that as partial context, not final resolution.

## Company Taxes

Status: provisional.
Source: user instruction on 2026-05-19; Notion task `https://www.notion.so/34fe4130131480d8ba78e43cececfc42`; Notion search/fetch of corporation/trade tax tasks.
Imported: 2026-05-19.
Review: Confirm the additional information requested by Finanzamt has been provided and accepted before marking the filed company-tax work fully closed.

User instruction on 2026-05-19 says 2024 and 2025 company taxes were filed. User review on 2026-05-19 clarified that they are filed, but Finanzamt asked for more information and RB is handling that follow-up. Notion task `File Trade and corporation Tax` is marked Done and has a 2026-05-15 comment saying the filing was uploaded to the related filing record. Do not mark the full company-tax closeout complete until the additional information request and final Finanzamt response are resolved.

## VAT Deregistration / Reinstatement

Status: provisional.
Source: user instruction on 2026-05-19; Notion VAT appeal task `https://www.notion.so/359e4130131480858625d56338c18971`; Gmail Finanzamt-letter threads; Drive correspondence listing.
Imported: 2026-05-19.
Review: Confirm Finanzamt response to the VAT appeal/reinstatement request.

User instruction says NACV was deregistered from VAT in October 2025, RB submitted the fix/appeal, and there has been no response yet.

Notion task `Appeal NA's VAT de-registration` is marked Done as of 2026-05-07. Its comment says RB informed Finanzamt that the pending 2025 VATs were filed. Treat the appeal submission as complete, but the Finanzamt response as still pending.

Relevant source pointers:

- VAT appeal task: `https://www.notion.so/359e4130131480858625d56338c18971`
- Drive correspondence file `NACV SD79-26007 May 2026.pdf`: `https://drive.google.com/file/d/1rPsYbTYbp9NmefQ6C5Era0a3pruCTb_P`
- May 2026 NACV Finanzamt VAT signal response file: `https://drive.google.com/file/d/14hCSfblP6FQ3Hr4HFWpT5aaeFx9VgAcy`
- Gmail threads from AMD Accountants forwarding May 2026 Finanzamt letters: message ids `19df74762c292e64`, `19e1bfd8b15ef654`, `19e2263140d34830`

## VAT Filing Cadence

Status: provisional.
Source: user instruction on 2026-05-19; Notion task `https://www.notion.so/35fe413013148134a46ae7e1bab9b897`.
Imported: 2026-05-19.
Review: Complete only after Finanzamt confirms whether the monthly VAT filing cadence can be reduced.

NACV was asked to file German VAT monthly last year because of lack of responses. User says this is overkill for company size and RB should do something about it. The open Notion task says to request or follow up with Finanzamt about reducing the cadence once the VAT reinstatement/compliance position is clear.

Open Notion task:

- `NACV - Request lower German VAT filing cadence`: `https://www.notion.so/35fe413013148134a46ae7e1bab9b897`

## Annual German VAT Filing Setup

Status: provisional.
Source: live Notion annual VAT setup run on 2026-06-06; consolidated task `File annual VAT for affected RB clients`.
Imported: 2026-06-06.
Review: Keep the annual VAT placeholders pending until submission proof and payment/refund handling are verified.

Annual German VAT tracking now has its own yearly VAT Filing Registration row:

- Annual VAT registration: `https://www.notion.so/377e41301314819998b7d3cbcf661186`
- 2024 annual VAT placeholder filing: `https://www.notion.so/377e41301314815483fcefcc3866ce35`; due 2026-04-30.
- 2025 annual VAT placeholder filing: `https://www.notion.so/377e41301314818c9688e0d22059c0a9`; due 2027-03-01.

## Annual German E-Balance Sheet / eBilanz Filing Setup

Status: provisional.
Source: live Notion eBilanz setup run on 2026-06-08; consolidated task `Transmit eBilanz for affected RB clients`.
Imported: 2026-06-08.
Review: Attach eBilanz transmission proof/protocol or blocker to each filing row when processed. Confirm whether Notion should add a dedicated eBilanz registration `Type`; current schema uses `Annual Tax Filing`.

Annual German eBilanz tracking now has its own yearly Filing Registration row:

- eBilanz registration: `https://www.notion.so/379e41301314816596f7f9face52a010`
- 2024 eBilanz placeholder filing: `https://www.notion.so/379e4130131481eba5d3e73ba239dce7`; period 2024-01-01 to 2024-12-31; due 2026-04-30; status Overdue.
- 2025 eBilanz placeholder filing: `https://www.notion.so/379e4130131481499e19d52ac8cbfa16`; period 2025-01-01 to 2025-12-31; due 2027-03-01; status Pending.

NACV was registered before 2024, so the first eBilanz filing period uses the full 2024 calendar year.

## Payroll And ZM/VIES Audit Pass 2026-06-06

Status: provisional.
Source: live Notion company/business-partner review and repo memory on 2026-06-06.
Imported: 2026-06-06.
Review: Recheck invoice-level customer VAT data if NACV has VAT-numbered EU business customers for any filing period.

Payroll Tax: no payroll-tax filing rows were created in this pass because the records reviewed did not support an active German payroll-tax obligation for NACV.

ZM/VIES: no German ZM/VIES rows were created. The Monochromatic business-partner evidence reviewed in this pass points to Ireland but was not marked VAT registered and had no VAT number in the fetched record, so it does not support a German ZM row.
