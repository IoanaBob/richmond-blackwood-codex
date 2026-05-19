# Tax, VAT, And Filing Registrations

Status: provisional.
Source: Notion filing-registration records, Gmail, WhatsApp, Slack, and user instruction reviewed on 2026-05-18.
Imported: 2026-05-18.
Review: Tax registration is still pending; filings are overdue with Finanzamt/tax registration as the blocker.

## Current Position

Notion lists SVL tax residence as Germany. The user confirmed on 2026-05-18 that the company is still waiting for tax registration and that no separate chase task should be created here because the user will handle this through a separate skill.

Gmail has an ELSTER transmission confirmation from 2026-02-23, but this import did not find a Finanzamt response issuing the company tax number or VAT number. WhatsApp on 2026-05-13 confirms SVL did not yet have a VAT number at that time. User review on 2026-05-18 confirmed the current status is still waiting.

The Notion company page has credential/certificate-related attachment context. Raw credential/certificate files and attachment identifiers are not copied into git.

## Registration Records

| Registration | Jurisdiction | Status in Notion | Filing cadence | Source | Notes |
| --- | --- | --- | --- | --- | --- |
| RBO | IE | Registered | One-off | `https://www.notion.so/2f5e4130131481f2a71ff174db43d0af` | First filing 2026-01-28, due 2026-02-18. |
| Annual Returns | IE | Overdue | Yearly | `https://www.notion.so/2f5e41301314811193cfe5c2475fa29d` | Company number 806985; user confirmed on 2026-05-18 that registrations should be treated as overdue, with Finanzamt/tax-registration blocker where applicable. |
| Corporation Tax | DE | Overdue / Pending_TaxNo | Yearly | `https://www.notion.so/2f5e4130131481049184ddb7e44f0233` | Number field empty; Finanzamt/tax registration is the blocker. |
| Trade Tax | DE | Overdue / Pending_TaxNo | Yearly | `https://www.notion.so/2f5e4130131481c9b717da99cef8c469` | Number field empty; Finanzamt/tax registration is the blocker. |
| VAT | DE | Overdue / Pending_TaxNo | Quarterly | `https://www.notion.so/2f5e413013148117b08fff476d20f04d` | Number field empty; first filing date 2026-05-05; WhatsApp says no VAT number yet as of 2026-05-13. |
| Payroll Tax | DE | Overdue / Pending_Betriebsnummer | Monthly | `https://www.notion.so/2f5e413013148102b8aad07ceb102597` | Notion comment says monthly payroll tax must be performed retroactively once registered. User confirmed Simoneta should own this. |
| Unternehmensnummer / Accident Insurance | DE | Overdue / Pending | One-off | `https://www.notion.so/2f5e41301314811db647eedbba972106` | Number and PIN needed for Betriebsnummer application. |
| Local Business Registration / Gewerbeanmeldung | DE | Overdue / Pending_Gewerbeanmeldung | One-off | `https://www.notion.so/2f5e413013148114b079d1a253f0acb4` | Comment says certificate should be uploaded when received. |

## Company Tax Registration Evidence

| Evidence | Source | Note |
| --- | --- | --- |
| ELSTER transmission confirmation | Gmail `19c8ba56699381bb` | Confirms a form transmission in SVL context on 2026-02-23, but not issuance of tax number. |
| No VAT number yet | WhatsApp group `120363409060100858@g.us`, 2026-05-13 | RB told Kristjan no Solinova VAT number yet. |
| Missing tax number blocker | Slack Simoneta DM thread 2026-04-27 | Internal context said Kristjan employee setup in Lexware/payroll was blocked by missing tax number. |

## Ownership

Simoneta owns the retroactive payroll-tax filings/payments once the tax/Betriebsnummer registration blocker clears, per user answer on 2026-05-18.

## Freelancer Deregistration Boundary

Kristjan's prior freelancer deregistration, personal/freelancer tax identifiers, and individual ELSTER access issue belong under `../../Individuals/KRISTJAN MAR OLAFSSON/tax-filings.md`.
