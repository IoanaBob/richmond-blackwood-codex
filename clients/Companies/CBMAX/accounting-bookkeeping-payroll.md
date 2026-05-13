# Accounting, Bookkeeping, And Payroll

Status: provisional.
Source: Notion company record; Notion employment records; Notion filing-registration records; Gmail search on 2026-05-13; user clarification on 2026-05-13; user review on 2026-05-13.
Imported: 2026-05-13.
Review: Fetch payroll-run records before recording run-level amounts, payslip evidence, or filing completion status. Fetch Richmond Blackwood invoice records before linking exact invoice IDs for H1/H2 billing.

## Accounting Setup

| Field | Value |
| --- | --- |
| Accounting software | Lexoffice |
| Accounting software email in company property | `contact+cbmaxforgemateventures@richmondblackwood.com` |
| Company email | `contact+cbmaxforgemateventures@richmondblackwood.com` |
| Betriebsnummer email note | Company-page comment says `accounts+cbmax@richmondblackwood.com` was used for the Betriebsnummer. |
| Monthly fee to RB | EUR 950 discounted bulk-prepaid rate |
| Fee billing cadence | Paid in bulk every six months, for H1 and H2 |
| Current payment note | H1 has already been paid and is recorded in Richmond Blackwood invoices |
| Company revenue monthly | EUR 8,000 |
| Expected net salary of UBO | EUR 2,203.67 |

## RB Fee Billing

Status: provisional.
Source: User review on 2026-05-13; Richmond Blackwood invoices referenced by the user but not fetched during this pass.
Imported: 2026-05-13.
Review: Link exact RB invoice records during the invoice backfill.

The EUR 950 monthly fee is the discounted rate after the client pays in six-month bulk periods. The billing pattern is H1 and H2, and the client has already paid H1 according to the user review. Evidence should be available in Richmond Blackwood invoice records.

Gmail search on 2026-05-13 found recent Lexware emails to `contact+cbmaxforgemateventures@richmondblackwood.com`, including a May 2026 Lexware invoice email and several low-signal Lexware product/news messages.

## Employment

Fetched linked Notion employment records on 2026-05-13.

| Employee label | Status | Country | Start | First payroll | Last payroll | Gross salary monthly | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claudio | Active | DE | 2024-03-01 | 2024-02-26 | Not set | EUR 2,500 | `https://www.notion.so/7d77ff003f1a4f1c8799bdd2e477025b` |
| Semen | Active | DE | 2024-08-01 | 2024-08-27 | Not set | EUR 4,000 | `https://www.notion.so/e044a16ea7c34411bddc98b341e4d981` |
| Viktor | Inactive | DE | 2024-12-01 | 2024-12-27 | 2025-03-10 | EUR 2,208 | `https://www.notion.so/14be41301314803fb320eaf48da52cce` |

User clarification on 2026-05-13: "Simon" is an employee; the relation is employment; the legal first-name spelling is Semen.

## Payroll Registration

| Registration | Jurisdiction | Status | Cadence | Number / detail | Due / first filing | Source |
| --- | --- | --- | --- | --- | --- | --- |
| CBMAX - 72878688 - Payroll | DE | Registered | Monthly | Betriebsnummer `72878688`; Notion `Company/Tax/Filing Number` field is blank but comments record the Betriebsnummer. | Due 2025-01-31; first filing 2024-06-26; first period 2024-06-01 to 2024-06-30. | `https://www.notion.so/d1b69930f1cb4280a2d946c5d6a46b12` |

## Payroll Evidence Notes

- The Claudio employment record links 27 payroll-run records.
- The Semen employment record links 22 payroll-run records.
- The Viktor employment record links 6 payroll-run records.
- Drive search found folder `CBMAX-payslips` at `https://drive.google.com/drive/folders/1sV3OXjguY9N-5LQ7fKjPWOZ3JwblzscT`. User confirmed on 2026-05-13 that this is a CBMAX-related sibling folder to link from the client file and organize under the canonical folder when Drive cleanup is in scope; contents have not been listed during this pass.

## Review Needed

- Fetch payroll-run records before claiming individual payroll periods are filed or paid.
- Confirm Semen's full legal name before creating an individual folder or importing personal payroll/bank identifiers.
- Review whether the company-page comment with Semen payroll/bank details should be moved to an Employment record or individual folder in Notion.
