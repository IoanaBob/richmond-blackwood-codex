# Tax, VAT, And Filings

Status: provisional.
Imported: 2026-05-05.
Source: Notion company and filing records.
Notion backup: `notion-backup.md`.

## Company Tax Context

| Field | Value |
| --- | --- |
| Tax residence | Germany |
| German VAT No | blank in company record |
| TAIN | blank in company record |
| Unique Taxpayer Reference | blank in company record |

## Filing Registrations

Fetched 2026-05-05 from linked Notion filing-registration records.

| Registration | Type | Jurisdiction | Status | Cadence | Number / detail | Due / first filing | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VUN - SR744841 - RBO | RBO | IE | Registered | One-off | `SR744841`; UBO filed with RBO. | Due 2025-03-08; first filing 2025-03-24. | `https://www.notion.so/1bde4130131481bcac03eb618f03337b` |
| VUN - 784365 - Annual Returns | Annual Returns | IE | Overdue | Yearly | `784365`. | First filing 2025-09-21. | `https://www.notion.so/1bde4130131481ef92c6e2112d4c7fde` |
| VUN - 014/247/51521 - Corporation Tax | Corporation Tax | DE | Registered | Yearly | `014 247 51521`; requires tax payments marked NO. | Due 2025-04-21; first filing 2027-02-12; first period 2025-03-21 to 2026-01-20. | `https://www.notion.so/1bde4130131481ea886ae824b287bbc0` |
| VUN - 014/247/51521 - Trade Tax | Trade Tax | DE | Registered | Yearly | `014 247 51521`; requires tax payments marked NO. | Due 2025-04-21; first filing 2027-02-12; first period 2025-03-21 to 2026-01-20. | `https://www.notion.so/1bde413013148190b0e3fd664d6edee1` |
| VUN - PENDING_Betriebsnummer - Payroll | Payroll Tax | DE | Overdue | Monthly | Betriebsnummer pending; requires tax payments marked NO. | Due 2026-01-01; first filing 2027-02-26; first period 2027-02-01 to 2027-02-28. | `https://www.notion.so/1c8e41301314808a8d2fd10a9ea2ee47` |
| VUN - DE460151151 - VAT Tax | VAT | DE | Registered | Quarterly | `DE460151151`; requires tax payments marked NO. | Due 2025-04-21; first filing 2027-02-12; first period 2025-03-21 to 2026-01-20. | `https://www.notion.so/1c8e4130131480dab1adca091b7dca3b` |
| VUN annual German VAT registration | VAT | DE | Registered | Yearly | Annual VAT Filing Registration layer created 2026-06-06. | Due / first filing 2025-06-02 for 2023 annual period. | `https://www.notion.so/377e4130131481a59a98c7e31e2eee56` |
| VUN - DE460151151 - ZM/VIES DE | VIES | DE | Registered | Quarterly | German ZM/VIES tracking registration created 2026-06-06. | First filing period Q1 2023; due / first filing 2023-04-25. | `https://www.notion.so/377e41301314815c9572f5a59dea01b3` |
| VUN - Pending_Gewerbeanmeldung - Business Registration (Gewerbeanmeldung) | Local Business Registration | DE | Overdue | One-off | Must upload certificate when received. | Due 2025-03-11. | `https://www.notion.so/1e9e41301314816cafccceedcf3c56af` |
| VUN - 704423150999001 - Unternehmensnummer | Accident Insurance | DE | Registered | One-off | Accident insurance number / Unternehmensnummer VBG `704423150999001`; PIN `16253`. Both number and PIN are needed for Betriebsnummer application. | Due 2025-05-11. | `https://www.notion.so/1e9e413013148191aa6ff0a21033f23b` |

## Filings

Fetched 2026-05-05 from linked Notion filing records.

| Filing | Registration | Status | Due date | Filing period / filed on | Source |
| --- | --- | --- | --- | --- | --- |
| VUN - 2025-09-21 - First Annual Returns | Annual Returns | Filed | 2025-09-21 | Filed 2025-10-31; submission attachment handle `VUN_First_return.pdf`. | `https://www.notion.so/1c8e413013148040be83caa52f87b5ae` |
| VUN - Annual Returns -21 Sep 2026 | Annual Returns | Overdue | 2026-09-21 | Period 2025-03-21 to 2026-03-31. | `https://www.notion.so/311e4130131481d281f5eb8c92de503c` |
| VUN - Annual Returns -21 Sep 2027 | Annual Returns | Overdue | 2027-09-21 | Period 2026-03-21 to 2027-03-31. | `https://www.notion.so/311e4130131481c0b087d943fd1d7184` |
| VUN - 2023 Annual VAT return | Annual VAT | Existing Notion row | 2025-06-02 | Relinked on 2026-06-06 to annual German VAT registration; annual period 2023. | `https://www.notion.so/373e4130131481a1b7ebd1a9b9e5cae9` |
| VUN - 2024 Annual VAT return | Annual VAT | Existing Notion row | 2026-04-30 | Relinked on 2026-06-06 to annual German VAT registration; annual period 2024. | `https://www.notion.so/373e4130131481d6982bd278d33d3d83` |
| VUN - PENDING_Betriebsnummer - Payroll-2027-02-12 | Payroll Tax | Pending | 2027-02-12 | Notion page is deleted. | `https://www.notion.so/348e4130131481a9a165ef9f96e0b978` |
| -2027-02-26 - | Payroll Tax | Pending | 2027-02-26 | Period 2025-03-21 to 2026-01-20; Notion page is deleted. | `https://www.notion.so/348e4130131481fb8305dfbcc879e8ab` |
| VUN -2027-02-26 - Payroll Tax | Payroll Tax | Pending | 2027-02-26 | Period 2027-02-01 to 2027-02-28; Notion page is deleted. | `https://www.notion.so/348e4130131481f9b53bd0c7a862181c` |

## Payroll Tax Rows Created 2026-06-06

Status: provisional.
Source: live Notion payroll registration read-back on 2026-06-06 and local VUN payroll/employment records.
Imported: 2026-06-06.
Review: Confirm payroll months and submitted values against Lexware/payroll evidence before filing or marking complete.

Dedicated monthly Payroll Tax Filings rows were created because the live registration surfaced no equivalent active linked Filings rows, while local records support payroll from July 2025 onward.

| Filing | Status | Filing period | Due date | Source |
| --- | --- | --- | --- | --- |
| VUN - Payroll Tax - 2025-07 | Overdue | 2025-07-01 to 2025-07-31 | 2025-08-11 | `https://www.notion.so/377e4130131481ec8f6fffbea26ef0e7` |
| VUN - Payroll Tax - 2025-08 | Overdue | 2025-08-01 to 2025-08-31 | 2025-09-10 | `https://www.notion.so/377e41301314810dbeeeda43f97cf176` |
| VUN - Payroll Tax - 2025-09 | Overdue | 2025-09-01 to 2025-09-30 | 2025-10-10 | `https://www.notion.so/377e4130131481c685cfd0fadc333731` |
| VUN - Payroll Tax - 2025-10 | Overdue | 2025-10-01 to 2025-10-31 | 2025-11-10 | `https://www.notion.so/377e413013148173a463c29ef0e29d44` |
| VUN - Payroll Tax - 2025-11 | Overdue | 2025-11-01 to 2025-11-30 | 2025-12-10 | `https://www.notion.so/377e41301314819090c9de51050e8a76` |
| VUN - Payroll Tax - 2025-12 | Overdue | 2025-12-01 to 2025-12-31 | 2026-01-12 | `https://www.notion.so/377e4130131481a0858cf25a5a3c287d` |
| VUN - Payroll Tax - 2026-01 | Overdue | 2026-01-01 to 2026-01-31 | 2026-02-10 | `https://www.notion.so/377e4130131481269d2eeffd1b72931e` |
| VUN - Payroll Tax - 2026-02 | Overdue | 2026-02-01 to 2026-02-28 | 2026-03-10 | `https://www.notion.so/377e4130131481b69d8fccecfdb9276b` |
| VUN - Payroll Tax - 2026-03 | Overdue | 2026-03-01 to 2026-03-31 | 2026-04-10 | `https://www.notion.so/377e41301314817e9f53d3a06ae7410a` |

## German ZM / VIES Rows Created 2026-06-06

Status: provisional.
Source: live Notion and repo filing review on 2026-06-06; VUN VAT/insolvency context showing intra-EU B2B reverse-charge services.
Imported: 2026-06-06.
Review: Confirm active quarters and reported values against invoices before filing.

German ZM/VIES rows were created under the new `VUN - DE460151151 - ZM/VIES DE` registration because current records support intra-EU B2B reverse-charge exposure.

| Filing | Status | Filing period | Due date | Source |
| --- | --- | --- | --- | --- |
| VUN - ZM/VIES DE - 2023 Q1 | Overdue | 2023-01-01 to 2023-03-31 | 2023-04-25 | `https://www.notion.so/377e4130131481bf96d3eb1922cb68cb` |
| VUN - ZM/VIES DE - 2023 Q2 | Overdue | 2023-04-01 to 2023-06-30 | 2023-07-25 | `https://www.notion.so/377e4130131481d28c19e6cfff715690` |
| VUN - ZM/VIES DE - 2023 Q3 | Overdue | 2023-07-01 to 2023-09-30 | 2023-10-25 | `https://www.notion.so/377e4130131481fda6f7c3eb71d4d859` |
| VUN - ZM/VIES DE - 2023 Q4 | Overdue | 2023-10-01 to 2023-12-31 | 2024-01-25 | `https://www.notion.so/377e41301314812f8883d1f7691f4138` |
| VUN - ZM/VIES DE - 2024 Q1 | Overdue | 2024-01-01 to 2024-03-31 | 2024-04-25 | `https://www.notion.so/377e4130131481ae8a0ef55aa8a9dbb4` |
| VUN - ZM/VIES DE - 2024 Q2 | Overdue | 2024-04-01 to 2024-06-30 | 2024-07-25 | `https://www.notion.so/377e413013148113a512ebba900a8167` |
| VUN - ZM/VIES DE - 2024 Q3 | Overdue | 2024-07-01 to 2024-09-30 | 2024-10-25 | `https://www.notion.so/377e413013148132b6e7db578154f31f` |
| VUN - ZM/VIES DE - 2024 Q4 | Overdue | 2024-10-01 to 2024-12-31 | 2025-01-27 | `https://www.notion.so/377e41301314813784fccd736194a4f5` |
| VUN - ZM/VIES DE - 2025 Q4 | Overdue | 2025-10-01 to 2025-12-31 | 2026-01-26 | `https://www.notion.so/377e4130131481a78475cc0779b89dc0` |

## Tax Payments, Tax Prepayments, And Assets Backfill

Fetched database schemas and searched the relevant Notion data sources on 2026-05-05:

| Table | Search result | Current backup state |
| --- | --- | --- |
| Assets | No VUN, VANDY, or Nathan Vandy records surfaced by workspace/data-source search. | Record Drive evidence pointers here or in the linked individual asset file when found. |
| Tax Payments | No VUN or VANDY records surfaced by workspace/data-source search. | Record Drive evidence pointers here or in the linked individual tax payment file when found. |
| Tax Prepayments | No VUN or VANDY records surfaced by workspace/data-source search. | Record Drive evidence pointers here or in the linked individual tax prepayment file when found. |

Review: A complete Notion export was not available in this session, so this is search-backed evidence only. A filtered table export by Company relation should still be run when an authoritative Notion inventory/export path is available.

## VAT Search Note

Notion search returned `VUN - DE460151151 - VAT Tax` at `https://www.notion.so/1c8e4130131480dab1adca091b7dca3b`.

## Personal Tax

Personal tax filings associated with Nathan Mawali A Vandy are recorded in `../../Individuals/Nathan Mawali A Vandy/personal-tax-returns.md`.

## Insolvency / Tax Account Context From Gmail And Drive

Gmail thread `19d258b6fa8d6b99` / `19dafa9a6e6bfccb` records a German insolvency-opening matter involving Finanzamt Frankfurt am Main and Schultze & Braun.

Private detailed history: `../../Individuals/Nathan Mawali A Vandy/legal-insolvency-and-solvency.md`.

Provisional tax details extracted from that source:

- German tax number in Nathan's correspondence: `014/877/05499`.
- 2023 income tax return submitted on 2026-01-15 at 17:44:06; transfer ticket `eh01522ax7opsh055hbdt9s0791sghn5`.
- 2024 income tax return submitted on 2026-01-15 at 17:52:06; transfer ticket `eh0153xr5hzydx41y4fiedgciyrv4ypk`.
- 2024 assessment notice dated 2026-02-03 described as assessing EUR 8,369.00 income tax plus EUR 375.00 late payment surcharge, with EUR 18,344.00 credited as settled and EUR 9,975.00 shown as overpaid/offset.
- Finanzamt Frankfurt am Main asserted claim in solvency evidence summary: EUR 15,705.58, based on tax and ancillary claims according to claim schedule dated 2026-02-13.
- VAT issue described in the Financial Summary: services provided in 2023 to DappRadar UAB, Lithuania, were treated as intra-EU B2B reverse-charge services and not invoiced with German VAT; VAT-related elements of the claim remain under clarification.

## Review Needed

- Confirm whether VAT number `DE460151151` should be written back to the company record because the company record's German VAT field is blank.
- Confirm whether the VBG PIN should remain in this file or move into a narrower registration-only file under the VUN client folder.
