# Drive Locations

Status: provisional.
Source: Google Drive connector folder listings and metadata lookups on 2026-05-13.
Imported: 2026-05-13.
Review: Raw files stay in Drive. Repo should keep pointers, folder maps, and review notes only.

## Main Personal Tax Folder

Status: provisional.
Source: Drive metadata for `Personal Tax Filings / Claudio Brivio / 2024`.
Imported: 2026-05-13.
Review: Confirm this is the canonical Drive path to use for future Claudio personal-tax work.

| Folder | URL | Notes |
| --- | --- | --- |
| CBMAX company Drive root | `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn` | Parent of `Personal Tax Filings`. |
| Personal Tax Filings | `https://drive.google.com/drive/folders/1dJ9hh490R5n8RJuYJbTF6dFy4P-QZ2vX` | Parent folder under CBMAX. |
| Claudio Brivio | `https://drive.google.com/drive/folders/1O-IHicLnRmmXg4Wv5iMJkWMHOLZxAC_6` | Individual personal-tax folder. |
| 2024 | `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv` | Contains workbook and client document folder. |
| Documents from Client - 2024 - Claudio | `https://drive.google.com/drive/folders/1GpjMwLVHPKyJ1XR8t2YIrchl23auowv3` | Contains `_2024-tax-filings`. |
| `_2024-tax-filings` | `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC` | Main uploaded evidence package. |
| Notion filing GDrive Docs folder | `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe` | Listed empty through the connector on 2026-05-13; reconcile with actual 2024 folder above. |

## Workbooks And Trackers

Status: provisional.
Source: Drive search/listing results.
Imported: 2026-05-13.
Review: The workbook is an `.xlsx` file, not confirmed as the maintained native machine-readable template. Do not treat it as final filing analysis until reviewed.

| File | URL | Notes |
| --- | --- | --- |
| Claudio - Personal Tax Analysis Template.xlsx | `https://docs.google.com/spreadsheets/d/1u6pS1K9MfBDn35o96iPgqQ27zxbZ1DG0/edit` | Linked from Notion task `Claudio Personal Tax Filing`; modified 2026-04-30. |
| 00_MASTER_TRACKER.md | `https://drive.google.com/file/d/1tvQTKX4SJyHHYzS17tA8yuRj8CKZfqqH/view` | Master evidence tracker, last refreshed 2026-05-03. |
| homeoffice_commute_tracker_2024.xlsx | `https://docs.google.com/spreadsheets/d/1eqS4IaAkHujmv570MPvXUgt8exGjpAYw/edit` | Canonical home-office/commute tracker. |

## Evidence Package Map

Status: provisional.
Source: Drive folder listing for `_2024-tax-filings`.
Imported: 2026-05-13.
Review: Detailed file verification remains pending.

| Folder | URL | Contents / purpose |
| --- | --- | --- |
| `00_README` | `https://drive.google.com/drive/folders/1MMSRNNW5VFn8xMp0AbVYRv4HqGFzpIsS` | Tracker and notes for Steuerberater. |
| `01_Personal_Info` | `https://drive.google.com/drive/folders/1MuzvXCsyWA2BEkeKvrM5rRo83eBjoruh` | Cover sheet, Meldebestaetigung, N26 IBAN confirmation. |
| `02_Income_Employment` | `https://drive.google.com/drive/folders/1OPzd2-OntVxJtXmCDGJr0m0CmFSEWWDz` | Joblift and CBMAX employment evidence. |
| `03_Foreign_Companies_Section_138_AO` | `https://drive.google.com/drive/folders/1kr-PYryqRN-LT2Ls_L1oQ7QShppG4K9a` | CBMAX Ireland and Job Guardian Estonia foreign-company evidence. |
| `04_Health_Insurance` | `https://drive.google.com/drive/folders/13SQP8kw9xCdzOUrEwZu_ATT0wTK-pJKh` | TK/Hallesche evidence and N26 health-insurance transaction file. |
| `05_Other_Insurances` | `https://drive.google.com/drive/folders/14iZ3QLRlT_kjj18HA3Yq-Lo7JUHuZNa8` | Empty / not applicable per tracker. |
| `06_Pension` | `https://drive.google.com/drive/folders/1lCDgfJaYz5EhzRhti6FMM1U3-ICJVvE4` | Empty / not applicable per tracker. |
| `07_Investments` | `https://drive.google.com/drive/folders/1PRIlOVgdy3keLbEsbo-N1o3YgzkwIvRx` | Contains N26 file that needs classification review. |
| `08_Werbungskosten_Deductions` | `https://drive.google.com/drive/folders/1rIs-SH2gRqSTzPI72dr0vg40sy8RLVST` | Home-office/commute, phone/internet, work equipment. |
| `09_Other_Personal_Deductions` | `https://drive.google.com/drive/folders/1-QodpAO-IwOA8_3lBo0-nI2KS5mMVqOj` | Empty / not applicable per tracker. |
| `10_Prior_Year_Reference` | `https://drive.google.com/drive/folders/1zkxNG-j3zFoTnUehocPTqVxAr0mUwCZO` | Lower-priority 2023 reference area. |
