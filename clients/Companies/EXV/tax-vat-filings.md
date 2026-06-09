# Tax, VAT, And Filings

Status: provisional.
Source: EXV Notion company record, filing registrations, filing rows, communication records, and user/repo context reviewed on 2026-06-09.
Imported: 2026-06-09.
Review: RTD appears stale because VAT is Not Applicable; VIES title typo should be corrected if live Notion cleanup is approved.

## Tax Snapshot

| Item | Value / status | Source | Review |
| --- | --- | --- | --- |
| Tax residence | Ireland | Company record `https://www.notion.so/18ce41301314807ca520f40825c36054` | Keep as Irish unless updated by live source or user instruction. |
| Corporation Tax | Registered | `https://app.notion.com/p/192e413013148132a090e1c296e7d166` | CT registration number exists in Notion; source attachment not copied. |
| VAT | Not Applicable | `https://app.notion.com/p/192e4130131481fb93e4de1149b9f3db` | No VAT registration observed. |
| VIES | Not Applicable; title typo `Pending - VEIS` | `https://app.notion.com/p/192e41301314811aa1d7f56bc7191116` | Correct title to `Pending - VIES` if live cleanup is approved. |
| RTD | Overdue in Notion | `https://app.notion.com/p/192e4130131481a88ea3efc61c09e5dd` | Likely stale if VAT remains Not Applicable; confirm before changing live Notion. |
| RBO | Registered | `https://app.notion.com/p/192e41301314818d9ebfce5426f6a734` | Linked filing is marked Filed. |
| Annual Returns | Registered | `https://app.notion.com/p/192e413013148171b271cf6cb9cd02d8` | Linked first annual return is filed; future filings are pending. |

## Annual Returns

| Filing / registration | Status | Due / filed date | Source | Notes |
| --- | --- | --- | --- | --- |
| 781069 - Annual Returns registration | Registered | First filing due 2025-07-31 | `https://app.notion.com/p/192e413013148171b271cf6cb9cd02d8` | Registration row. |
| 781069 - First Annual Returns-2025-07-31 | Filed | Due 2025-07-31; filed 2025-08-11 | `https://app.notion.com/p/192e413013148178a825e7a3bc8d2863` | First annual return is filed. |
| 781069 - Annual Returns-2025-07-31 | Pending | Due 2026-08-08; period 2025-02-09 to 2025-12-31 | `https://app.notion.com/p/1c8e41301314802ca1b8e5f51abc9951` | Title still references 2025-07-31 though due date is 2026-08-08. Confirm whether title should be normalized. |
| EXV - Annual Returns -31 Jul 2027 | Pending | Due 2027-07-31; period 2026-04-01 to 2027-03-31 | `https://app.notion.com/p/311e4130131481978eb2d48c9d19654a` | Future row appears intentionally future-dated; monitor only if automation marks it overdue. |

## Other Filings

| Filing | Status | Due / filed date | Source | Notes |
| --- | --- | --- | --- | --- |
| Pending - RBO-2025-02-12 | Filed | Due 2025-02-12 | `https://app.notion.com/p/198e41301314819d96b4e2f01e24eef4` | RBO filing linked from the RBO registration. |

## Communications Evidence

| Record | Source | Notes |
| --- | --- | --- |
| Corporation Tax Application | `https://app.notion.com/p/1e6e413013148061b540d5bc571a3da7` | Communication row includes application and approval-letter attachments in Notion. Store source pointer only. |

## Boundary

Do not copy Notion-hosted filing attachments, tax payment bank details, bank account records, or private individual identifiers into git.
