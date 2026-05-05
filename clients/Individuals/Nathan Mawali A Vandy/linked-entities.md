# Linked Entities

Status: provisional.
Imported: 2026-05-05.
Source: user instruction, Notion individual/client relationship pattern.
Linked company reference: `VUN`.

This file maps Notion records and source-system records that attach directly to Nathan Mawali A Vandy as an individual.

## Entity Routing

| Entity type | Local file | Routing rule |
| --- | --- | --- |
| Bank accounts | `bank-accounts.md` | Use for bank account records, balances, statements, account restrictions, garnishments, and payment-source context attached to Nathan personally. |
| Tax filings | `tax-filings.md` | Use for personal tax filing records linked to Nathan; detailed return history may continue in `personal-tax-returns.md`. |
| Assets | `assets.md` | Use for individual-owned assets, crypto, shareholdings, personal liquidity, and supporting evidence. |
| Correspondence | `correspondence.md` | Use for Notion Correspondence records and Gmail/Drive correspondence linked to Nathan personally. |
| Expenses | `expenses.md` | Use for expenses, reimbursements, personal-service costs, or expense evidence attached to Nathan personally. |

## Notion Relationship Cleanup Rule

If a Notion record in one of these entity types is linked to VUN but actually belongs to Nathan personally:

1. Link the record to Nathan's Notion individual record.
2. Unlink the VUN company relation.
3. Mirror the corrected routing in this folder.
4. Keep a pointer in `../../Companies/VUN/` only if the record remains relevant to the company relationship.

Apply the same process in reverse when an individual-linked record is actually company-level.
