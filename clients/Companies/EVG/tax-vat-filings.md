# Tax, VAT, And Filings

Status: provisional.
Source: EVG Notion company record, filing registrations, filing rows, and change-of-name/director filings fetched on 2026-06-08.
Imported: 2026-06-08.
Review: Reconcile stale or contradictory Notion registration statuses before relying on any overdue flag.

## Tax Snapshot

| Item | Value / status | Source | Review |
| --- | --- | --- | --- |
| Tax residence | Ireland | Company record `https://www.notion.so/15fe4130131480079a95fd029aef3511` | Confirm tax-registration status because CT/Annual Tax rows are still marked Overdue/Pending. |
| German VAT number | Blank | Company record | No German VAT registration was observed in fetched source. |
| VAT | Not Applicable; IE; bi-monthly row exists | `https://app.notion.com/p/199e413013148149ad5ce5c9b00cc457` | Confirm whether VAT should remain Not Applicable given EVG operations. |
| Corporation Tax | Overdue / Pending | `https://app.notion.com/p/199e4130131481e9b8abd5ee4c83215a` | Likely setup/status cleanup item; no tax number captured in fetched row. |
| Annual Tax Filing | Overdue / Pending | `https://app.notion.com/p/199e413013148129b3b0e75e5124f38b` | Needs review. |
| RTD | Overdue / Pending | `https://app.notion.com/p/199e4130131481bdad90dd3922f4a0f9` | Needs review. |
| VIES | Overdue; title says `Pending - VEIS` | `https://app.notion.com/p/199e4130131481b9be16d8f785b35128` | Typo and status need cleanup. |
| RBO | Registered | `https://app.notion.com/p/199e4130131481aeb29ecc61b82b094e` | Linked RBO filing is marked Filed. |

## Annual Returns

| Filing / registration | Status | Due / filed date | Source | Notes |
| --- | --- | --- | --- | --- |
| EVG - 779181 - Annual Returns registration | Overdue | First filing due 2025-07-09 | `https://app.notion.com/p/199e4130131481a0b936c3b49cf2e867` | Registration status conflicts with filed first annual return below. |
| 779181 - First Annual Returns-2025-06-17 | Filed | Due 2025-07-09; filed 2025-07-13 | `https://app.notion.com/p/199e4130131481c08516ee8ea782e0f4` | Treat registration overdue status as stale/contradictory unless other evidence shows another missed item. |
| 779181 - Annual Returns-2025-06-17 | Pending | Due 2026-07-09; filing period 2025-01-01 to 2025-12-31 | `https://app.notion.com/p/1c8e41301314808c8b54e74db9478622` | Title reuses 2025-06-17 even though due date is 2026-07-09. |
| EVG - Annual Returns -09 Jul 2027 | Pending | Due 2027-07-09; filing period 2026 | `https://app.notion.com/p/311e41301314819eb669d84325e4c96b` | Future row appears reasonable; review only if automation treats it overdue. |

## Other Filed Company Changes

| Filing | Status | Filed on | Source | Notes |
| --- | --- | --- | --- | --- |
| EVG-RBO | Filed | Not captured in fetched filed-date field | `https://app.notion.com/p/1a4e413013148014b18ac7c828c88d8a` | Filing row has submission files in Notion. |
| Everguard - Change of Director | Filed | 2026-04-22 | `https://app.notion.com/p/34ae4130131480d1867ecf71cbd16b2b` | One of multiple director-change filings. |
| EVR DIRECTOR CHANGE | Filed | 2026-04-23 | `https://app.notion.com/p/353e41301314806ebf1aeba7adb5c456` | Title typo/abbreviation should be normalized if cleanup is in scope. |
| EVG - B10 - Change of Directors | Filed | 2026-04-22 | `https://app.notion.com/p/36ce413013148057899dc4631c2d1258` | Filed after director-change sequence. |
| EVG Name change | Filed | 2025-11-07 | `https://app.notion.com/p/373e4130131480a5b34ceb36f49ac29d` | Name-change certificate is also attached to the company record. |
