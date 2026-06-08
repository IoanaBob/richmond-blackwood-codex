# Source Register

Status: provisional.
Source: AMC context import on 2026-05-18.
Imported: 2026-05-18.
Review: This register stores source pointers and summaries only; raw evidence stays in the source system.

## User Instructions

| Date | Source | Scope |
| --- | --- | --- |
| 2026-05-18 | Codex thread | Load AMC context from main; create a new client export; RB does Aaron's personal returns; personal bank account was garnished around two months ago; RB is working on a payment plan. |
| 2026-05-18 | Codex thread | Previous accountant did not file 2023/2024 personal returns; RB filed 2023 and 2024, then found Aaron was registered as Gewerbe and therefore trade tax and VAT were not filed. User clarified the open periods are 2023, 2024, and Q1 2025, after which Aaron was deregistered. |
| 2026-05-18 | Codex thread | Finanzamt requested P&L/balance-sheet support. User clarified to follow source dates: WhatsApp 2026-05-19 at latest and Notion before 2026-05-22. |
| 2026-05-18 | Codex thread | Initial instruction said AMC company filings are otherwise on time except VAT Q1 2026, booked and pending filing; user later clarified VAT Q1 2026 and Slack Q4 2025 VAT should be checked through a separate VAT skill. |
| 2026-05-18 | Codex thread | Aaron uses WhatsApp; invoices are variable, often include travel costs, should be generated when Aaron provides exact info, approved, and then sent to the client through accounting email using past format. |

## Notion

| Source | URL | Scope |
| --- | --- | --- |
| Company | `https://www.notion.so/165e41301314804baeead148b54263de` | Company facts, reference, registrations, routes, linked records. |
| Individual | `https://www.notion.so/165e4130131480c98ea9d9ae497ab5ca` | Aaron individual facts; detailed personal facts routed to individual folder. |
| Client project | `https://www.notion.so/328e41301314802993b3f5136bf74a2c` | AMC client project and tasks. |
| Employment | `https://www.notion.so/198e4130131480aba2c3d68f3f33ad80` | Payroll/employment relationship. |
| Contracts | See `contracts-and-authority.md` | Riot, Echo, UVS, RedBull, and historical Echo contract records. |
| Contract comments added on 2026-05-18 | Riot `https://www.notion.so/1a1e4130131480b9859de06e1ffc98e9`; Echo Sports `https://www.notion.so/246e4130131480aa9b05cb0b9adb2f96`; UVS `https://www.notion.so/349e41301314809a805ad295f9ad2e05` | Added invoice workflow/message-template comments to the live contract pages. |
| Business Partner routing fields updated on 2026-05-18 | Riot `https://www.notion.so/208e41301314805c8591f9b2576720be`; Echo Sports `https://www.notion.so/360e4130131480b09475e824f7e4bac1` | Updated `Invoicing Email`, `Invoicing Email Cc`, and `Notes`; Riot notes preserve the extra Nicole recipient because the schema is single-email. |
| Filing registrations and VAT tasks | See `tax-vat-filings.md` | German corporation, trade tax, VAT, VAT prepayment, VAT filing extension, and unpaid VAT task context. |
| Annual German VAT setup run | `https://www.notion.so/377e413013148169b64bf17b8f3206e3` | Yearly DE VAT Filing Registration created on 2026-06-06; existing annual VAT filing row renamed and linked. |
| German eBilanz setup run | `https://www.notion.so/379e41301314817d9fe1c25e8406a519` | eBilanz Filing Registration created on 2026-06-08; 2025 eBilanz filing row `https://www.notion.so/379e41301314818b86ebd3b2aaf4291e` created with period 2025-02-11 to 2025-12-31. No 2024 row because AMC was registered on 2025-02-11. |
| Personal tax/garnishment records | See `../../Individuals/Aaron Richard Chamberlain/source-register.md` | 2023/2024/2025 filings, garnishment meeting, payment-plan tasks, P&L/balance-sheet task. |

## Google Drive

| Source | URL | Scope |
| --- | --- | --- |
| Canonical AMC folder | `https://drive.google.com/drive/folders/1a_m5ASzsGDnaViTjeSvawroRVr6cQ-oG` | Company evidence root. |
| Aaron personal folder | `https://drive.google.com/drive/folders/1jlL1I2mxwscawqTN_aic9f-OZwPiPnHh` | Personal-tax letters and filing evidence; detailed in individual folder. |
| Previous Accountant Extracts | `https://drive.google.com/drive/folders/1aG4QRXDaIUNXSGi59fsPTWStfleDmdPg` | Source accounting material for prior-year personal/freelancer work. |
| 2023 and 2024 FS files | See `drive-locations.md` | Latest Drive search results for P&L/balance-sheet work. |

## Gmail

| Source | Scope |
| --- | --- |
| Gmail search `(AMC OR "Aaron Medic" OR Chamberlain OR aaronchamberlain91@gmail.com OR account+amc@richmondblackwood.com OR accounts+amc@richmondblackwood.com) newer_than:12m -in:spam -in:trash` | General AMC/Aaron context. |
| Gmail search for AMC invoice/travel/expense/accounting terms | Historical invoice-send templates and recipient routes. |
| Gmail `19e0813ffa76d29a` | Riot invoice RE0027 sent from accounting email. |
| Gmail `19e172959b5fc9e5` | Echo invoice RE0029 sent from accounting email. |
| Gmail `19d25d76d8b99a82` | Garnishment action-points email from Ioana to Aaron. |
| Gmail tax/Finanzamt/ELSTER search | VAT extension, ELSTER submissions, Wamo/Finanzamt payment notices, and personal-tax crisis support; raw payment details not stored. |

## WhatsApp

| Chat | JID | Scope |
| --- | --- | --- |
| Chamberlain, Aaron \| Richmond Blackwood | `120363378578862576@g.us` | Selected client group route. Used for invoices, travel/expense rules, VAT/Q1 books, personal-tax/garnishment, P&L, and joint filing pointers. Raw transcript/media not copied. |

## Slack

| Source | Scope |
| --- | --- |
| Slack search `AMC Aaron Chamberlain after:2026-03-01` | Internal UVS contract/database setup question. |
| Slack search `AMC P&L after:2026-05-01` | Internal P&L and Q4 VAT data-quality/backlog question; leave VAT status for the separate VAT review. |

## Boundary

Credential/certificate attachments, identity documents, raw WhatsApp transcripts/media, Gmail attachment identifiers, ELSTER material, bank-account details, and tax-payment bank details were not copied into git.
