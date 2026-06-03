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
| VUN - Pending_Gewerbeanmeldung - Business Registration (Gewerbeanmeldung) | Local Business Registration | DE | Overdue | One-off | Must upload certificate when received. | Due 2025-03-11. | `https://www.notion.so/1e9e41301314816cafccceedcf3c56af` |
| VUN - 704423150999001 - Unternehmensnummer | Accident Insurance | DE | Registered | One-off | Accident insurance number / Unternehmensnummer VBG `704423150999001`; PIN `16253`. Both number and PIN are needed for Betriebsnummer application. | Due 2025-05-11. | `https://www.notion.so/1e9e413013148191aa6ff0a21033f23b` |

## Filings

Fetched 2026-05-05 from linked Notion filing records.

| Filing | Registration | Status | Due date | Filing period / filed on | Source |
| --- | --- | --- | --- | --- | --- |
| VUN - 2025-09-21 - First Annual Returns | Annual Returns | Filed | 2025-09-21 | Filed 2025-10-31; submission attachment handle `VUN_First_return.pdf`. | `https://www.notion.so/1c8e413013148040be83caa52f87b5ae` |
| VUN - Annual Returns -21 Sep 2026 | Annual Returns | Overdue | 2026-09-21 | Period 2025-03-21 to 2026-03-31. | `https://www.notion.so/311e4130131481d281f5eb8c92de503c` |
| VUN - Annual Returns -21 Sep 2027 | Annual Returns | Overdue | 2027-09-21 | Period 2026-03-21 to 2027-03-31. | `https://www.notion.so/311e4130131481c0b087d943fd1d7184` |
| VUN - PENDING_Betriebsnummer - Payroll-2027-02-12 | Payroll Tax | Pending | 2027-02-12 | Notion page is deleted. | `https://www.notion.so/348e4130131481a9a165ef9f96e0b978` |
| -2027-02-26 - | Payroll Tax | Pending | 2027-02-26 | Period 2025-03-21 to 2026-01-20; Notion page is deleted. | `https://www.notion.so/348e4130131481fb8305dfbcc879e8ab` |
| VUN -2027-02-26 - Payroll Tax | Payroll Tax | Pending | 2027-02-26 | Period 2027-02-01 to 2027-02-28; Notion page is deleted. | `https://www.notion.so/348e4130131481f9b53bd0c7a862181c` |

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
