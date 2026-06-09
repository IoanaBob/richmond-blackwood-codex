# Contracts And Authority

Status: provisional.
Source: EXV Notion company record, communication/document rows, RBO records, and XVault risk/task records fetched on 2026-06-09.
Imported: 2026-06-09.
Review: Fetch the underlying contract/agreement records before treating any document pointer as an active contract or external authority position.

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
| XVault / MiCA / CASP risk review | `https://app.notion.com/p/2b1e4130131480df9b26fe24faec0862` | Task remains In Progress. It records concern that Konvi Limited being developer/custodian of XVault could affect the current license and that CBI suggested liaising with the CASP team. |
| Launch first XVAULT Vault | `https://app.notion.com/p/25be4130131480c68b61c372a560230b` | Product project remains In Progress. Keep product build detail in Notion/Konvi project docs. |
| Workhub Camden address compliance / Plus Plan decision | `https://app.notion.com/p/36fe413013148168ba61c8607fa237e6` | Open operational/legal follow-up: verify/remedy address use and decide Plus Plan treatment before reply. |
