# Linked Individuals

Status: provisional.
Imported: 2026-05-05.
Source: Notion company and individual records, user routing instruction.

This file is the structured link between the VUN company client and individuals connected to the client relationship.

## Individuals

| Individual | Individual folder | Relationship to company | Personal service scope | Routing rule |
| --- | --- | --- | --- | --- |
| Nathan Mawali A Vandy | `../../Individuals/Nathan Mawali A Vandy/` | Director, UBO, shareholder individual, client POC | Personal tax returns; individual insolvency/solvency evidence; individual KYC/contact/identity context | Store personal correspondence and personal tax material in the individual folder. Keep only pointers here and in company files. |

## Personal Service Link Rule

When Richmond Blackwood serves a company and also serves an individual connected to that company for personal tax or another personal scope:

1. Keep the company client root under `clients/Companies/<client-reference>/`.
2. Keep the individual root under `clients/Individuals/<legal-name>/`.
3. Add the person to this file in the company folder.
4. Add the company to `clients/Individuals/<legal-name>/linked-companies.md`.
5. Route personal correspondence, personal tax, KYC, personal identifiers, personal assets, and individual insolvency/solvency details to the individual folder.
6. Put only pointers in the company folder unless the fact is genuinely company-level.

## Review Needed

- Confirm whether Nathan's folder should preserve the Notion legal name `Nathan Mawali A Vandy` or use a shortened first-name + last-name folder later.
