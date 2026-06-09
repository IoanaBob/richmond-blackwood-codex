# Tax, VAT, And Filing Registrations

Status: provisional.
Source: Notion company, filings, filing-registration, Gmail, WhatsApp, and user instruction on 2026-05-15.
Imported: 2026-05-15.
Review: Confirm whether the German tax-residence position for MHL should stay as the live Notion company field after the Co-KG/Gabriel residency restructuring work proceeds.

## Current Position

MHL is incorporated in Ireland, while the Notion company `Tax Residence` field currently says Germany. User instruction on 2026-05-15 says RB is working on a Ltd & Co KG structure so Gabriel can move his Berlin apartment under MHL and deregister as German tax resident.

Treat the company tax-residence field as source data, not a final reviewed conclusion.

## Registrations

| Registration | Status | Jurisdiction | Number / note | Source |
| --- | --- | --- | --- | --- |
| RBO | Registered | IE | One-off RBO registration | `https://www.notion.so/27ae41301314813bbc16ed35dbd6d6b9` |
| Annual Returns | Registered | IE | Register number `798390`; yearly | `https://www.notion.so/27ae41301314812aba3ef2824afbc4e0` |
| Corporation Tax | Registered | DE | `29/621/01968`; yearly | `https://www.notion.so/27ae413013148181b720cc98d71a0046` |
| Trade Tax | Registered | DE | `29/621/01968`; yearly | `https://www.notion.so/27ae413013148144ba7ae68750b9a432` |
| VAT | Submitted | DE | Notion filing registration fetched on 2026-05-15: `Company/Tax/Filing Number` is empty; filing cadence is quarterly; first filing period 2025-09-25 to 2025-10-17 | `https://www.notion.so/27ae4130131481758289ec06bf61d505` |
| Payroll Tax | Not Applicable | DE | Pending Betriebsnummer placeholder remains in old registration record | `https://www.notion.so/27ae4130131481fcac3ade8195e40126` |
| Accident Insurance / Unternehmensnummer | Not Applicable | DE | Old pending record says number and PIN would be needed for Betriebsnummer if applicable | `https://www.notion.so/27ae41301314810d8114f5c24efe4002` |
| Local Business Registration / Gewerbeanmeldung | Registered | DE | Registration document exists in Notion; raw file not copied | `https://www.notion.so/27ae4130131481fcac39d317302b0acb` |
| Vehicle Tax / Kraftfahrzeugsteuerbescheid | Registered | DE | Payment reference `K126.1532.4692`; yearly tax payment cadence; first prepayment due 2026-06-08 | `https://www.notion.so/360e4130131480f2ba34e8eee9ce6729` |

## Filings

| Filing | Status | Period / due date | Source | Notes |
| --- | --- | --- | --- | --- |
| MHL First Annual Return | Filed | Due 2026-03-25; filed 2026-04-14 | `https://www.notion.so/342e413013148010b236c912ca7e0fd6` | Notion title contains typo `Retrun`. |
| MHL Annual Returns - 25 Mar 2027 | Overdue in Notion; data-quality error per user | Due 2027-03-25 | `https://www.notion.so/344e41301314812cad89db32179a0f5a` | User instruction on 2026-05-15: if the due date is future-dated, `Overdue` is an error. |
| MHL Trade Tax 2025 short period | Overdue in Notion; data-quality error per user | Period 2025-09-25 to 2025-12-31; due 2026-07-31 | `https://www.notion.so/344e4130131481bc9132f82d1e5f57f8` | User instruction on 2026-05-15: if the due date is future-dated, `Overdue` is an error. |
| MHL Corporation Tax - 31 Jul 2027 | Overdue in Notion; data-quality error per user | Due 2027-07-31 | `https://www.notion.so/348e4130131481e9b7a0d2f73d8afa07` | User instruction on 2026-05-15: if the due date is future-dated, `Overdue` is an error. |

## Zoll-Portal

Gmail sequence on 2026-05-14 to 2026-05-15 created/activated Zoll access, then rejected the business-customer account. Notion task `MHL - resolve Zoll-Portal business account rejection` is `To Do`: `https://www.notion.so/361e4130131481abbac1d61f14bbde78`.

The source rejection says branches cannot be stored as business customers because they are not legally/economically independent; only MHL's Dublin/Irish HQ is eligible. The attempted registration data was deleted. User instruction on 2026-05-15 confirmed this remains an open task.

## VAT Application Follow-Up Calls

Status: provisional.
Source: Notion Calls read-back and user instruction on 2026-06-08.
Imported: 2026-06-08.
Review: Update after the call outcome is written back to Notion.

| Date | Call | Status | Purpose |
| --- | --- | --- | --- |
| 2026-06-08 | `https://www.notion.so/379e4130131481c9b5f7d9cd05e6b09e` (`RBCALL-42`) | Queued / Reviewed / Approved | Follow up with Finanzamt fuer Koerperschaften III ZENA on whether the 2026-05-29 ELSTER response about Unternehmereigenschaft / Umsatzsteuersignal / USt-ID was received and processed, what is still missing, and when the VAT signal or VAT ID can be issued. |
| 2026-06-08 | `https://www.notion.so/379e4130131481c9b5f7d9cd05e6b09e` (`RBCALL-42`) | Requeued / Reviewed / Approved | First attempt did not reach a human conversation. Requeued the same Calls row at `2026-06-08T10:29:00Z` while the Monday Finanzamt phone-support window was still open; stale runtime IDs/errors were cleared and `Retry Count` remained `1` for the next scheduler claim. |
| 2026-06-09 | `https://www.notion.so/379e4130131481c9b5f7d9cd05e6b09e` (`RBCALL-42`) | Requeued / Reviewed / Approved | The prior retry also did not reach a human conversation. Requeued the same Calls row at `2026-06-09T11:24:00Z` while the Tuesday ZENA phone-support window was still open; stale runtime IDs/errors were cleared and `Retry Count` remained `2` for the next scheduler claim. |

## SteuerGo / Personal Tax Signal

SteuerGo emails to `accounts+mhl@richmondblackwood.com` show access/payment and data-retrieval activity for Gabriel. Company folder stores only routing pointers; Gabriel personal-tax filing detail lives in `../../Individuals/GABRIEL LOUIS MANUEL MULLER/personal-tax-returns.md`.
