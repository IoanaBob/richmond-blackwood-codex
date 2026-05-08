# Linked Individuals

Status: provisional.
Imported: 2026-05-05.
Source: Notion company and individual records, user routing instruction.

This file maps people and contacts connected to the VUN company client. It replaces a separate `people-and-contacts.md` file for company-level people routing.

## People And Linked Individuals

| Person | Local folder | Relationship to company | Source | Notes |
| --- | --- | --- | --- | --- |
| Nathan Mawali A Vandy | `../../Individuals/Nathan Mawali A Vandy/` | Director, UBO, shareholder individual, client POC | `https://www.notion.so/182e4130131480cead22dd69fd3f2dc7` | Store personal correspondence, personal tax, KYC, and personal identifier details in the individual folder. Keep only company-side context here. |

## Personal Service Link Rule

When Richmond Blackwood serves a company and also serves an individual connected to that company for personal tax or another personal scope:

1. Keep the company client root under `clients/Companies/<client-reference>/`.
2. Keep the individual root under `clients/Individuals/<legal-name>/`.
3. Add the person/contact to this file in the company folder.
4. Add the company to `clients/Individuals/<legal-name>/linked-companies.md`.
5. Route personal correspondence, personal tax, KYC, personal identifiers, personal assets, and individual insolvency/solvency details to the individual folder.
6. Put only pointers in the company folder unless the fact is genuinely company-level.

## Review Needed

- Confirm whether Nathan's folder should preserve the Notion legal name `Nathan Mawali A Vandy` or use a shortened first-name + last-name folder later.
