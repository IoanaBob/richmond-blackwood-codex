# Open Questions

Status: provisional.
Source: Byron personal-tax import on 2026-05-13.
Imported: 2026-05-13.

| Question | Source | Review needed |
| --- | --- | --- |
| Confirm legal name/folder spelling. Notion title is `Byron Jarvis`, while properties read first name `Byron Jarvis` and last name `Frasier`. | Notion individual `https://www.notion.so/203647f1b74743a09fc8a408a3318b30` | Folder uses `Byron Jarvis Frasier` pending confirmation. |
| Confirm exact US residence period and whether US filings/information returns need to be tracked alongside German personal tax. | User instruction 2026-05-13 | Needed for US apartment, Roth, IRA, and brokerage treatment. |
| Confirm US apartment details: address, ownership dates, rental/personal use, income, expenses, mortgage interest, property tax, and source documents. | User instruction; Notion asset `https://www.notion.so/353e41301314800bb8b6fb29e690bb70` | Needed before filing. |
| Confirm Roth/IRA statements, contributions, distributions, rollovers, withholding, dividends/interest, and realized gains for German tax. | User instruction; brokerage analysis `https://www.notion.so/2a0e4130131480979a6fea007ccfdc49` | Needed before workbook conclusions. |
| Confirm whether the SteuerGo data retrieval activation code/action for Byron has been completed. | Gmail `19e20f06924b8d7b`; task `https://www.notion.so/35fe413013148127abdbca7305da03be` | SteuerGo email says activation/data retrieval needs completion depending on ELSTER setup. |
| Confirm whether 2025 personal-tax Drive folder should be created/linked in Notion now or only when active 2025 work begins. | Notion 2025 filing `https://www.notion.so/342e41301314800197bad5f6b9c7330e` | 2025 filing had no `GDrive Docs` value at fetch time. |
| Review the 2025 workbook-to-ELSTER wage-certificate difference before submission. | Corrected 2025 workbook and ELSTER final overview read-back on 2026-05-25 | Workbook shows EUR 68,984.94 gross wages, EUR 16,874.48 wage tax, and EUR 0.00 solidarity surcharge; ELSTER imports EUR 69,309.98 gross wages, EUR 16,977.29 wage tax, and EUR 22.52 solidarity surcharge from certificate data. Workbook says annual LStB remains final tie-out, so ELSTER has been left as the draft source pending review. |

## 2024 Analysis Open Questions

Status: provisional.
Source: 2024 personal-tax analysis run on 2026-05-15 and healthcare correction on 2026-05-18.
Imported: 2026-05-18.
Review: Resolve before treating the workbook as filing-ready.

| Question | Source | Status | Review / Next action |
| --- | --- | --- | --- |
| Obtain/extract AGL May-Dec 2024 wage-tax, social, health, solidarity, and net-pay details. | AGL employment and payroll relations | open | Use AGL payslips or 2024 Lohnsteuerbescheinigung before filing |
| Confirm May 2024 AGL payroll treatment. | Employment start 2024-05-01 and first payroll date 2024-06-27 | open | Determine whether May was paid in June or missing |
| Review November/December 2024 payroll relation mismatch. | Payroll page `https://www.notion.so/131e4130131481f68790cfb5fe5e8c42` | open | Page title references November while due date/attachment indicate December |
| Obtain previous-employer 2024 annual wage-tax certificate. | Jan-Apr payroll journals | open | Payroll journals support extraction but final filing should use/reconcile Lohnsteuerbescheinigung |
| Confirm 2024 residence address periods. | Notion current address and Jan-Apr payroll address differ | open | Confirm move date and filing address handling |
| Confirm no additional expenses or provide receipt/invoice evidence. | Drive folder contains no receipt/invoice files | open | Claim no expenses only after client/operator confirmation |
| Confirm no investments or provide investment evidence. | No investment files found in provided Drive folder | open | Needed because workbook setup remains `Needs request` |
| Confirm whether older workbook business/freelance revenue belongs in the 2024 personal return. | Older workbook source context | open | Do not add revenue without invoices/bank evidence and scope confirmation |
| Review final ELSTER data-entry treatment for the ottonova line 28 amount. | 2024 ottonova certificate and operator instruction to add EUR 1,331.64 | open | Amount is recorded with evidence but not included as a tax-effect deduction because basic health/care already exceeds the Sec. 10(4) ceiling; filer should decide whether/how to enter the informational line in ELSTER |

## Resolved During Preparation

| Question | Source | Status | Review / Resolution |
| --- | --- | --- | --- |
| Reauthenticate the Notion connector and create/link the preparation and filing tasks. | Notion connector write-back on 2026-05-18 | resolved 2026-05-18 | Created preparation task `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e`, filing task `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`, linked both to the filing, set filing status/document gathering to `In progress`, and added task comments |
| Confirm health/care insurance evidence. | 2024 ottonova Jahresvorsorgeaufwandsbescheinigung in Drive | resolved 2026-05-18 | Claimed EUR 3,145.80 basic health/care insurance from exact Drive evidence URL; recorded EUR 1,331.64 non-basic health insurance as source data but excluded it from included deductions after cap review; transfer-value certificate recorded as reference only |
