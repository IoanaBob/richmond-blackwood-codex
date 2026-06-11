# Drive Locations

Status: provisional.
Source: Google Drive connector folder listings and metadata lookups on 2026-05-13 and 2026-06-11.
Imported: 2026-05-13.
Review: Raw files stay in Drive. Repo should keep pointers, folder maps, workbook URLs, and review notes only. 2025 work used a fresh Drive-native template copy and populated source/input tabs only.

## Main Personal Tax Folder

Status: provisional.
Source: Drive metadata for `Personal Tax Filings / Claudio Brivio / 2024` and the 2025 client-shared package.
Imported: 2026-05-13.
Review: User-provided folder `1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe` is the canonical 2024 filing folder for the 2024 analysis. Older folder `1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv` is retained as a source/history pointer only. For 2025, the default `Claudio Brivio` root was not reachable by the helper personas on 2026-06-11, so the fresh filing workspace was created under the 2025 submitted-documents wrapper.

| Folder | URL | Notes |
| --- | --- | --- |
| CBMAX company Drive root | `https://drive.google.com/drive/folders/1QhfuwpdncQdGx6bymJv29rD3K_3yyqjn` | Parent of `Personal Tax Filings`. |
| Personal Tax Filings | `https://drive.google.com/drive/folders/1dJ9hh490R5n8RJuYJbTF6dFy4P-QZ2vX` | Parent folder under CBMAX. |
| Claudio Brivio | `https://drive.google.com/drive/folders/1O-IHicLnRmmXg4Wv5iMJkWMHOLZxAC_6` | Individual personal-tax folder. |
| 2025 submitted-docs wrapper | `https://drive.google.com/drive/folders/14-NlQyJYUjhOYoPDF_mBpCjqEnv8Fw5i` | Parent of the user-shared 2025 package and the fresh 2025 filing workspace. |
| 2025 - Personal Tax Filing | `https://drive.google.com/drive/folders/1OVx_u0u8dpGZ6sm_vhc20ItMrnMXz0GJ` | Fresh 2025 filing workspace created on 2026-06-11 and linked in the live Notion filing record. |
| `_2025-tax-filings` | `https://drive.google.com/drive/folders/1Mj6ZqOLXKOvKRnjDDjOgqDriLodkBEiY` | Main 2025 evidence package supplied by Claudio. |
| 2025 helper-created child folder | `https://drive.google.com/drive/folders/12ufnXOW3fLKpJn6gyjGXKt12dIV83wX0` | Empty `_2025-tax-filings` child created by the folder-setup helper under the fresh workspace; not the source evidence package. |
| 2024 prior/history folder | `https://drive.google.com/drive/folders/1Yp65vQdd3rKJrSj1gV24b1hTrovihJHv` | Contains the superseded Office workbook; not the canonical folder for the 2026-05-13 analysis run. |
| 2024 - Personal Tax Filing | `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe` | User-provided canonical filing folder; contains the client document package and fresh native workbook. |
| Documents from Client - 2024 - Claudio | `https://drive.google.com/drive/folders/1GpjMwLVHPKyJ1XR8t2YIrchl23auowv3` | Contains `_2024-tax-filings`. |
| `_2024-tax-filings` | `https://drive.google.com/drive/folders/1MK0WqJJ1VOnrO-Gnjax3au_qVjBznYwC` | Main uploaded evidence package. |
| Notion filing GDrive Docs folder | `https://drive.google.com/drive/folders/1olQVsG8iAOF5BACqwIYABuwIXCjnxHfe` | Verified live on 2026-05-13 and linked in Notion filing `https://www.notion.so/2cae413013148064bf7ae889ec16af5c`. |

## Workbooks And Trackers

Status: provisional.
Source: Drive search/listing results and workbook read-back.
Imported: 2026-05-13.
Review: The fresh workbooks are native Google Sheets copied from the maintained template. They are preparation workbooks, not filing-ready until open flags are resolved or accepted.

| File | URL | Notes |
| --- | --- | --- |
| Claudio Brivio - 2025 German Personal Tax Analysis | `https://docs.google.com/spreadsheets/d/1-hmXCtlh3RMSKzd10oRtpK5CZvmCuxwnCJ6ZoijM_m8/edit` | Fresh native Google Sheet copied from maintained template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit` into the 2025 filing workspace on 2026-06-11. Only source/input tabs were populated. |
| Claudio Brivio - 2024 German Personal Tax Analysis | `https://docs.google.com/spreadsheets/d/1ULWkB11f5ZiMzlEITOyEbJ_SQa_19aMsD8NXZmC-iHM/edit` | Fresh native Google Sheet copied from maintained template `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit` into the canonical 2024 filing folder on 2026-05-13. |
| 2025 00_MASTER_TRACKER.md | `https://drive.google.com/file/d/1VB4NIthXp_-yg6Ksty8ttbeF_UlFnzkY/view` | Master evidence tracker for the 2025 client package. |
| 2025 personal cover sheet | `https://drive.google.com/file/d/1Ft8tShZhWyJAEhrzpTweKgFxNgKB_yJY/view` | Personal facts/source cover sheet for 2025. |
| 2025 homeoffice / commute tracker | `https://docs.google.com/spreadsheets/d/1G4Kf53QWuMUXxVZpTc6oMWdr8AeXrRex/edit` | Source for 153 home-office days and 78 coworking days used in the 2025 workbook. |
| 2025 N26 deductions ledger | `https://docs.google.com/spreadsheets/d/1XpBzCMBU72gUxcA2cYek9BGorY2jzcVI/edit` | Source ledger for BVG, phone/internet, and Taxfix rows entered in the workbook source tabs. |
| Claudio - Personal Tax Analysis Template.xlsx | `https://docs.google.com/spreadsheets/d/1u6pS1K9MfBDn35o96iPgqQ27zxbZ1DG0/edit` | Superseded Office workbook linked from old Notion task `Claudio Personal Tax Filing`; retained as source/history only and not edited in the fresh run. |
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

## Reviewed Supporting Files

Status: provisional.
Source: Drive connector listings and workbook read-back on 2026-05-14.
Imported: 2026-05-14.
Review: These are source pointers only. Raw files stay in Drive.

| File / folder | URL | Notes |
| --- | --- | --- |
| Hallesche tax certificate 2024 | `https://drive.google.com/file/d/1armzvPsmWw21VkH0q3TYJEG-78Wa3Aw9/view` | Valid exact certificate URL used in the workbook for the approved basic health/care claim and excluded non-basic amount. |
| Hallesche policy and employer certificate | `https://drive.google.com/file/d/1Z7pLPaQ23p2xANC_6MsjpcEflN38j0d3/view` | Shows contract/contribution start from 2024-02-01 and monthly health/care amounts. |
| Freenet mobile invoices archive | `https://drive.google.com/file/d/1JfUuoYt1blXE5BjRv7Ze4d9GsGcCb7yS/view` | Exact Drive archive for the claimed mobile-phone professional share; individual invoice extraction remains a final-review option. |
| N26 tax statement | `https://drive.google.com/file/d/1rC6y8u9HypTXCo843fuTwYqR2cfA28RM/view` | Listed in the workbook `Sources` tab, not `Investment Lots`, until Anlage KAP/KAP-AUS classification is completed. |

## 2025 Reviewed Supporting Files

Status: provisional.
Source: Drive connector listings, Google Sheets read-back, and workbook read-back on 2026-06-11.
Imported: 2026-06-11.
Review: Exact evidence URLs for claimed rows were entered in the 2025 workbook. Repo keeps only source pointers and review notes.

| File / folder | URL | Notes |
| --- | --- | --- |
| 2025 source package | `https://drive.google.com/drive/folders/1Mj6ZqOLXKOvKRnjDDjOgqDriLodkBEiY` | User-shared evidence package named `_2025-tax-filings`. |
| 2025 CBMAX payslip folder | `https://drive.google.com/drive/folders/1yq0Y9eHVBAMk5sj7tRne1dPux3Gu2Ey0` | Monthly payslip evidence for all 12 months; workbook revenue rows link exact payroll records and payslip URLs. |
| Hallesche tax certificate 2025 | `https://drive.google.com/file/d/1W8f_PwvKKTYyeNlLv68wbGDNUltpyPjW/view` | Exact certificate URL used for the health/care claim; optional/non-basic amount is excluded. |
| N26 tax statement 2025 | `https://drive.google.com/file/d/13WupwbvO7fbEBaGA1dODICrlD2ZXEo4V/view` | Source for 2025 N26 interest and withholding; connector did not text-extract the PDF, so visual filer confirmation remains flagged. |
| Taxfix invoice 2025 | `https://drive.google.com/file/d/1pROw1CtT5k9YoOWdjJ2qjdgjBFDcU8sj/view` | Exact invoice URL used for the EUR 35 work-related tax-preparation share. |
| Dental ledger | `https://docs.google.com/spreadsheets/d/1qV3JfXpa-mhwCzjUk801rgc1bwRmU6SI/edit` | Dental/prophylaxis costs reviewed but not claimed. |
| Dental invoice | `https://drive.google.com/file/d/1biQXcQvoKeqo80RErKz1rT8NQklolfic/view` | One dental invoice located; second PDF missing, and costs were excluded from claimed deductions. |
