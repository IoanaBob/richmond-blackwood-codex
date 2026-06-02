# Source Register

Status: provisional.
Source: SVL context import on 2026-05-18.
Imported: 2026-05-18.
Review: This register stores source pointers and summaries only; raw evidence stays in the source system.

## User Instructions

| Date | Source | Scope |
| --- | --- | --- |
| 2026-05-18 | Codex thread | Load SVL context from main; SVL is the newest client; Kristjan was a freelancer before; tax registration is still pending; RB will do Kristjan personal tax returns from 2026 onward. |
| 2026-05-18 | Codex thread answers | Still waiting for tax registration; no chase task in this context; registrations are overdue with Finanzamt as blocker; Simoneta owns retroactive payroll-tax filings; Mediainvesting hours/bonus sheet is canonical; Lexware and WAMO costs are RB-side; personal-tax Drive year should be 2026; freelancer deregistration pending through an open task; RB should set up individual/freelancer ELSTER; AI GreenBytes update completed but JP needs to upload evidence; apartment amount around EUR 750k with partner-company-sale hurdle. |
| 2026-05-18 | Google Drive metadata update/read-back | Renamed Kristjan personal-tax year folder from `2025` to `2026` and verified metadata title `2026`. |

## Notion

| Source | URL | Scope |
| --- | --- | --- |
| Company | `https://www.notion.so/2cde4130131480b89185d9ba4487a3b3` | Company facts, reference, service, tax residence, contact routes, linked records. |
| Individual | `https://www.notion.so/2d1e41301314810ca6bbf526246222e5` | Kristjan identity and personal-tax/freelancer routing; detailed personal facts routed to individual folder. |
| Client project | `https://www.notion.so/32fe4130131480abafdfd5d80e907c29` | Project status and linked task context. |
| Employment | `https://www.notion.so/306e4130131480888582de5a01224bc1` | Kristjan employment and payroll run links. |
| Active contract | `https://www.notion.so/313e4130131480cd836ccdfcd8177c83` | Mediainvesting monthly hourly contract. |
| Registration records | See `notion-backup.md` | RBO, annual returns, German corporation/trade/VAT/payroll/Unternehmensnummer/business registration. |
| Real estate Client Notes & Updates | `https://www.notion.so/32ee4130131480a5b1c9e9d2398ab53e` | Apartment purchase/loan/company-ownership structuring notes. |

## Google Drive

| Source | URL | Scope |
| --- | --- | --- |
| Canonical SVL folder | `https://drive.google.com/drive/folders/19IHrClZjr58Bt15cx9h0KV9RiVzzAC1G` | Company document/evidence root. |
| Personal Taxes folder | `https://drive.google.com/drive/folders/1zwxIVHdi_2ZFPYOV3-OwQmmsU9S30_7t` | Contains Kristjan folder; year folder was renamed to `2026` on 2026-05-18. |
| Liquidity 2026 Sheet | `https://docs.google.com/spreadsheets/d/1u-Jyv7NDYooJbz8TRkIwDb0AQ1QKciAGT61_AYsJv7I/edit` | Company liquidity support. |
| Secretarial folder | `https://drive.google.com/drive/folders/1pGnVsGXH6aOZPSujR1KMujT3kmrBB-U3` | Company secretarial evidence. |

## Gmail

| Source | Scope |
| --- | --- |
| Gmail search `(Solinova OR SVL OR accounting+svl OR kristur@pm.me OR Kristjan) newer_than:6m -in:trash -in:spam` | General company/personal client context. |
| Gmail search for SVL tax/Finanzamt/ELSTER terms after 2026-02-01 | Tax registration and ELSTER context. |
| Gmail `19c8ba56699381bb` | ELSTER transmission confirmation for SVL context; no German tax-number response found. |
| Gmail `19de0a3b4e502b27` | RB-issued Stripe receipt/invoice; not an inbound payable invoice. |
| Gmail `19df98fd8c531bae` and `19e000ffa7d36cba` | Lexware subscription invoice/reminder context. |
| Gmail `19e1c14874c798b2` | TK insurance-status follow-up; route individual insurance detail to Kristjan folder. |
| Gmail `19e466661c8d01c8` | Outgoing TK insurance-duty review bundle for SOLINOVA/Kristjan employment context. Source PDFs are in Drive; translation and raw OCR pointers are recorded in `drive-locations.md`. |

## OCR / Translation Cleanup

| Source | Date imported | Detail |
| --- | --- | --- |
| Drive OCR cleanup | 2026-05-22 | Google Drive connector text fetch returned empty for the image-only `TK POA.pdf`, so Drive API OCR working copies were used to produce a separate raw OCR export and a separate English translation/review file. |
| Notion Communication C5 | 2026-05-22 | `https://www.notion.so/367e4130131481ec97ddded1fda701a3` moved to `Logged` after the English translation/review file was attached to `Translated Doc(s)`. Raw OCR export remains a separate Drive audit file. |

## WhatsApp

| Chat | JID | Scope |
| --- | --- | --- |
| Olafsson, Kristjan \| Richmond Blackwood | `120363409060100858@g.us` | Client group route, no raw transcript/media copied. Used for freelancer deregistration, tax-number/VAT status, Mediainvesting monthly input, AI GreenBytes, and real-estate structuring pointers. |

## Slack

| Source | Scope |
| --- | --- |
| Simoneta DM thread 2026-04-27 | Missing tax number blocked Lexware employee setup and payroll registration context. |
| Johnpaul DM / `#rb-client-updates` search results | TK follow-up, RB-side Lexware subscription context, loan/structuring context. |

## Boundary

Credential/certificate attachments, identity documents, raw WhatsApp transcripts, WhatsApp media, Gmail attachment identifiers, and bank-account details were not copied into git.
