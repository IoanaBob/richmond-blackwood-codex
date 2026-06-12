# Contracts And Authority

Status: provisional.
Source: EXV Notion company record, communication/document rows, RBO records, XVault risk/task records, Notion legal analysis pages, and user review/live write-back through 2026-06-12.
Imported: 2026-06-09; updated 2026-06-12.
Review: Fetch the underlying contract/agreement records and latest external legal opinion before treating any document pointer as an active contract or external authority position.

## Authority And Governance

EXV is recorded as an Irish CLG with Richmond Blackwood Limited as secretary. Eran and Ioana are recorded as directors and UBOs. KONVI HOLDINGS LIMITED is recorded as shareholder company.

The RBO registration is marked `Registered`, with comments saying Eran and Ioana were registered as UBOs.

## Agreement / Document Pointers

These records were fetched through EXV-linked Communications rows. They are pointers to source documents, not full contract summaries.

| Record | Type/status in Notion | Sent/received | Source | Notes |
| --- | --- | --- | --- | --- |
| Corporation Tax Application | Outgoing / Done | 2025-05-01 | `https://app.notion.com/p/1e6e413013148061b540d5bc571a3da7` | Communication row includes application and approval-letter attachments in Notion. Attachment URLs are not stored in git. |
| Advisory Agreement | Incoming / Done | 2025-06-10 | `https://app.notion.com/p/20ee413013148034a7d0fa70b0b5053f` | Signed advisory agreement pointer. Fetch underlying document before using terms. |
| Avalanche Agreement | Internal / Done | 2025-06-24 | `https://app.notion.com/p/21ce41301314809ab473db16c615f720` | Grant/agreement and SAFT-summary document pointers exist in Notion. |
| Bank of Ireland | Incoming / Done | 2025-07-03 | `https://app.notion.com/p/225e413013148070ac97e883a39491f5` | BOI guarantee/account document pointers exist in Notion; bank details are excluded. |
| Dracoon Agreement | Internal / Done | 2025-08-12 | `https://app.notion.com/p/24de4130131480e1ae92c71a3844f2b9` | SAFT agreement pointer exists in Notion. |

## Legal / Regulatory Issues

| Issue | Source | Review needed |
| --- | --- | --- |
| XVault / MiCA / CASP risk review | `https://app.notion.com/p/2b1e4130131480df9b26fe24faec0862` | Task remains In Progress. It records concern that Konvi Limited being developer/custodian of XVault could affect the current license and that CBI suggested liaising with the CASP team. A 2026-06-12 comment records that internal legal pages exist but no external/latest legal-opinion file was found in Drive. |
| Legal & Compliance hub | `https://app.notion.com/p/2c6e4130131480738e1fde4816e23d71` | Points to internal MiCA and MiFID analysis pages. Treat as source context, not final external counsel advice. |
| Compliance Under MiCA | `https://app.notion.com/p/2c6e4130131480c9a3f2dbe9630cf367` | Internal framework page says the analysis is not legal advice and is based on EU rules/guidance as of 2026-01-23. |
| Applicability of MiFID II to Exotic Vaults | `https://app.notion.com/p/2c6e4130131480c3b4a1ca1482b690fd` | Internal analysis classifies the current design as MiCA Title II rather than MiFID II financial instruments, subject to design-dependent risk triggers. |
| Launch first XVAULT Vault | `https://app.notion.com/p/25be4130131480c68b61c372a560230b` | Product project remains In Progress. Keep product build detail in Notion/Konvi project docs. |
| Workhub Camden address compliance / Plus Plan decision | `https://app.notion.com/p/36fe413013148168ba61c8607fa237e6` | Closed as Done on 2026-06-12 after user confirmed the address was removed, the plan change was rejected, and Workhub charges route to Richmond Blackwood. |
