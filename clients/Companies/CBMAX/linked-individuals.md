# Linked Individuals

Status: provisional.
Source: Notion company record; Notion individual records for Claudio Brivio and Eran Peer; Notion employment records; user clarification on 2026-05-13.
Imported: 2026-05-13.
Review: Confirm whether to create individual folders for Claudio Brivio, Eran Peer, Semen, and Viktor before importing personal tax, KYC, or personal identifier detail.

This file maps people and contacts connected to the CBMAX company client. It does not store personal tax IDs, personal bank details, KYC files, or private individual evidence.

## People And Linked Individuals

| Person | Local folder | Relationship to company | Source | Notes |
| --- | --- | --- | --- | --- |
| Claudio Brivio | Not created | Director, UBO, shareholder individual, employee, client POC | `https://www.notion.so/2242215d7fdc4efe9f3a33693601fe7b`; company record | Store personal tax, KYC, and personal identifiers in an individual folder before importing. |
| Eran Peer | Not created | Director, UBO | `https://www.notion.so/59b94a27de954b50b34e0818601b7eac`; company record | Eran is linked to many other companies; keep only CBMAX-side context here. |
| Semen | Not created | Employee | Employment record `https://www.notion.so/e044a16ea7c34411bddc98b341e4d981`; user clarification | User confirmed "Simon" is an employee and the legal first-name spelling is Semen. Last name should be verified before creating an individual folder. |
| Viktor | Not created | Former employee | Employment record `https://www.notion.so/14be41301314803fb320eaf48da52cce` | Employment is inactive in Notion. Last name should be verified before creating an individual folder. |

## Routing Rule

Personal tax filings, personal KYC, private contact details, personal bank accounts, personal assets, personal expenses, and personal correspondence belong under `clients/Individuals/<legal-name>/`.

Company payroll and employment contract status can be summarized in `accounting-bookkeeping-payroll.md`, but personal identifiers from Notion comments should not be duplicated in this company folder.

## Review Needed

- The company page has a comment with payroll and bank details for "Simon"; user clarified this is Semen. The details are not copied here. If needed, create the correct individual folder and route them there after legal-name confirmation.
