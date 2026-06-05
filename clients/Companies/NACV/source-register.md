# Source Register

Status: provisional.
Source: NACV context import on 2026-05-19.
Imported: 2026-05-19.
Review: This register stores source pointers and summaries only; raw evidence stays in the source system.

## User Instructions

| Date | Source | Scope |
| --- | --- | --- |
| 2026-05-19 | Codex thread | Continue NACV in a new PR from main. Andrei was/is the first client. RB does Andrei's 2024 personal tax returns for free; from 2025 onward normal-fee treatment is expected, but billing mechanics are not decided yet. Andrei is married and should file jointly. |
| 2026-05-19 | Codex thread | NACV had registration problems and never received German prepayments; RB needs Finanzamt notices for 2024/2025 tax amounts and prepayment amounts, then populate the Tax Prepayments database. |
| 2026-05-19 | Codex thread | NACV was VAT-deregistered in October 2025; RB submitted the fix/appeal but has no response yet. |
| 2026-05-19 | Codex thread | User says 2024 and 2025 company taxes were filed, but Finanzamt asked for more information and RB is handling it. Personal taxes are still pending for 2024, but RB wants to coordinate 2024 and 2025 together while keeping one filing record per year. |
| 2026-05-19 | Codex thread | User confirmed the WhatsApp chat is `NA Capital Ventures`. |
| 2026-06-05 | Codex thread and live eBilanz-Online | User instructed Codex to create/import NACV after CBMAX and PCL. NACV 2024 eBilanz period `625488` was imported from a GL-only legacy `.xls`, corrected in taxonomy schedules, and pre-validated cleanly. No transmission was performed. |

## Notion

| Source | URL | Scope |
| --- | --- | --- |
| Company | `https://www.notion.so/d97abab7377f4d29b7fb11d4262906c8` | Company facts, reference, registrations, linked records. |
| Client project | `https://www.notion.so/32fe413013148083a7d0fa4f8d94c3e9` | NACV project and tasks. |
| Andrei individual | `https://www.notion.so/e275d80810824aa7bcc7cf7b7b6fd072` | Individual role and personal-tax records; private details routed to individual folder. |
| Eran individual | `https://www.notion.so/59b94a27de954b50b34e0818601b7eac` | Director relation only in this import. |
| Active Monochromatic contract | `https://www.notion.so/2d2e4130131480459094c9c026186447` | Active monthly contract. |
| Historical Monochromatic contract | `https://www.notion.so/199e227446e84b0ab2bfbde646dec54e` | Inactive prior contract. |
| Corporation tax registration | `https://www.notion.so/175e4130131480759b01f373ef022a99` | German corporation-tax registration and prepayment schedule links. |
| Trade tax registration | `https://www.notion.so/175e41301314807ca1d6f974a4d41b34` | German trade-tax registration and prepayment schedule links. |
| Prepayments/cadence task | `https://www.notion.so/35fe413013148110859afa228ae41b6b` | Open critical task for 2024/2025 amounts and VAT cadence. |
| VAT cadence task | `https://www.notion.so/35fe413013148134a46ae7e1bab9b897` | Open task to reduce monthly German VAT cadence. |
| VAT deregistration appeal task | `https://www.notion.so/359e4130131480858625d56338c18971` | Appeal submission done; response pending. |
| Company tax filing task | `https://www.notion.so/34fe4130131480d8ba78e43cececfc42` | Marked Done; filing uploaded, electronic balance-sheet review remains. |

## Google Drive

| Source | URL | Scope |
| --- | --- | --- |
| Canonical NACV company folder | `https://drive.google.com/drive/folders/1z36VoEjY6jkbqAjxGyRBZD7b323rMd_c` | Company evidence root. |
| Correspondence folder | `https://drive.google.com/drive/folders/1BYrwwy-vpbyqW5srUe7U63EatJCPXcES` | Company correspondence. |
| Personal Tax Filings parent | `https://drive.google.com/drive/folders/1gxlZ32FDLLPsWKbVXYnpA_1ky4tzJsbU` | Andrei personal-tax folders under company Drive tree. |
| NACV Payslips | `https://drive.google.com/drive/folders/1hUs5jWfkGlpiLNRXB0anpYfdH8x_5Lfn` | Payslip evidence. |
| 2024 German Personal Tax Analysis - Andrei Nasonov | `https://docs.google.com/spreadsheets/d/1MXFMamxILiqEE9tkVRCxx5dVSeC2-5yh-lIdbAzn-c0` | Current 2024 personal-tax analysis workbook. |
| May 2026 VAT/Finanzamt correspondence files | See `communications.md` and `tax-vat-filings.md` | Drive search found May 2026 Finanzamt/VAT PDF pointers. |

## Gmail

| Source | Scope |
| --- | --- |
| Gmail search `(NACV OR "NA Capital" OR "NA CAPITAL" OR "Andrei Nasonov" OR Andrei) newer_than:18m -in:spam -in:trash` | General NACV/Andrei context. |
| Gmail message `19e2263140d34830` | AMD Accountants / Eran forwarded a May 2026 Finanzamt letter for NA CAPITAL VENTURES LIMITED. |
| Gmail message `19e1bfd8b15ef654` | AMD Accountants / Eran forwarded a May 2026 Finanzamt letter for NA CAPITAL VENTURES LIMITED. |
| Gmail message `19df74762c292e64` | Johnpaul forwarded a new NA Finanzamt letter to accounting. |
| Gmail message `19dce290e1944696` | Workhub letter for NA Capital. |
| Gmail Workhub March/April renewal thread | Workhub renewal/payment context, including NA Capital Ventures Limited. |

## WhatsApp

| Chat | JID | Scope |
| --- | --- | --- |
| NA Capital Ventures \| RB | `120363399321589278@g.us` | Selected client group route confirmed by user. Used for NACV operations, Finanzamt/address topics, Andrei personal-tax evidence, payroll/TK/VBG follow-up. Raw transcript/media not copied. |

## Boundary

Credential/certificate attachments, identity documents, raw WhatsApp transcripts/media, Gmail attachment identifiers, ELSTER material, bank-account details, exact tax identifiers, and tax-payment bank details were not copied into git.
