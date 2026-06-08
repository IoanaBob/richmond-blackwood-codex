# German E-Balance Sheet Filing Setup

Status: provisional.
Source: user instruction in Codex chat on 2026-06-08; live Notion Filing Registrations, Filings, Companies, and Tasks schema read on 2026-06-08; BMF AO/AEAO section 149 deadline sources checked on 2026-06-08.
Imported: 2026-06-08.
Review: Confirm whether the Filing Registrations schema should gain a dedicated `E-Balance Sheet` or `eBilanz` type instead of using the current `Annual Tax Filing` option.

Notion backup: `https://www.notion.so/379e4130131481a386c3c335252d6384`.

Use this process when a German annual tax filing package needs a separate place to attach the electronic balance sheet / eBilanz transmission proof in Notion.

## Purpose

Do not attach eBilanz proof only to VAT, trade-tax, corporation-tax, or broad tax-return filing rows. Create or find a separate yearly eBilanz Filing Registration and link annual Filings rows to it, so the transmission proof/protocol or blocker can be attached directly to the relevant year.

The live Filing Registrations data source currently has no dedicated `E-Balance Sheet` or `eBilanz` `Type` option. Until the schema is reviewed, use `Type = Annual Tax Filing` and make the row title explicit, for example `CLV - E-Balance Sheet / eBilanz DE`.

## Incorporation Date Gate

Status: provisional.
Source: user correction in Codex chat on 2026-06-08 and live Notion company records.
Imported: 2026-06-08.
Review: Confirm edge cases where the balance-sheet filing belongs to a branch, predecessor business, or individual before the company incorporation date.

Before creating eBilanz company filing rows, fetch or otherwise confirm the company's `Registered on` / incorporation date.

- Do not create company eBilanz rows for periods before the company existed.
- For the first relevant year, set `Filing Period` / `First Filing Period` to start on the incorporation date, not on January 1, unless a live authority source explicitly requires a different company period.
- For later years, use the full supported accounting year, usually January 1 to December 31 for these RB annual German filings.
- If an existing manual row predates incorporation, preserve it as evidence but do not link it to the company eBilanz registration unless source records confirm it belongs to the company.
- If the incorporation date is missing or contradictory, record the blocker instead of creating speculative rows.

## Filing Registration Pattern

Create or find one Filing Registration per company and German annual eBilanz obligation.

Required Notion fields:

| Field | Value |
| --- | --- |
| `Name` | `<Reference> - E-Balance Sheet / eBilanz DE` |
| `Type` | `Annual Tax Filing` until the schema has a dedicated eBilanz option |
| `Jurisdiction` | `DE` |
| `Filing Cadence` | `Yearly` |
| `Status` | `Registered` when the obligation is confirmed. Use `Pending` only where authority context is unresolved. |
| `Requires Tax Payments` | `No`, unless a separate payment source proves otherwise. eBilanz itself is an evidence/transmission obligation. |
| `Due Date` / `First Filing Date` | First supported eBilanz filing deadline. |
| `First Filing Period` | First supported company period, respecting the incorporation-date gate. |
| `Company` | Link the responsible company. |
| `Comments` | Record source task, schema limitation, incorporation-date basis, and review note. |

## Filing Row Pattern

Create one Filings row per annual eBilanz period that RB expects to process or needs an attachment location for.

Required Notion fields:

| Field | Value |
| --- | --- |
| `Name` | `<Reference> - <Year> E-Balance Sheet / eBilanz DE` |
| `Company` | Link the same company. |
| `Filing Registration` | Link the eBilanz registration, not the VAT/trade-tax/corporation-tax registration. |
| `Filing Period` | Exact annual period. First year starts on incorporation date if incorporated during that year. |
| `Due Date` | Annual tax-advised deadline unless a live Finanzamt notice gives a different deadline. |
| `Status` | `Overdue` if the deadline has passed and no proof is attached; `Pending` if future. |
| `Filing Task` / `Preparation Task` | Link the owning eBilanz operational task when one exists. |
| `Comments` | Record source and evidence/blocker review note. |

Do not close setup unless every created Filings row has `Filing Period` populated and read back from Notion.

## Deadline Rule

Status: provisional.
Source: BMF AO 2025 section 149 and AEAO section 149 read on 2026-06-08.
Imported: 2026-06-08.
Review: Confirm with the responsible filer if a company is not tax-advised or if Finanzamt grants or demands a different individual deadline.

For RB-managed German annual tax/eBilanz work, use the tax-advised annual-return deadline unless a live record gives a more specific date.

| Annual period | Deadline used in current Notion setup | Source basis |
| --- | --- | --- |
| 2024 | 2026-04-30 | BMF AEAO section 149 special deadline table for tax-advised 2024 returns. |
| 2025 | 2027-03-01 | AO section 149 general tax-advised deadline is the last day of February in the second following year; 2027-02-28 is a Sunday, so the deadline shifts to the next working day under AO section 108. |

Public source pointers:

- BMF AO 2025 section 149: `https://ao.bundesfinanzministerium.de/ao/2025/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Zweiter-Unterabschnitt/Paragraf-149/inhalt.html`
- BMF AO 2025 section 108: `https://ao.bundesfinanzministerium.de/ao/2025/Abgabenordnung/Dritter-Teil/Erster-Abschnitt/Vierter-Unterabschnitt/Paragraf-108/inhalt.html`
- BMF AEAO 2024 section 149: `https://lsth.bundesfinanzministerium.de/ao/2024/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Zweiter-Unterabschnitt/Paragraf-149/ae-149.html`

## 2026-06-08 Setup Result

Status: provisional.
Source: live Notion create/read-back on 2026-06-08.
Imported: 2026-06-08.
Review: Attach eBilanz transmission proof/protocol or blocker to the created filing rows when processed.

Initial setup created or clarified eBilanz registrations and 2024/2025 filing placeholders for the affected eBilanz task checklist companies:

| Company | Registration | 2024 Filing Period | 2025 Filing Period |
| --- | --- | --- | --- |
| NACV | `https://www.notion.so/379e41301314816596f7f9face52a010` | 2024-01-01 to 2024-12-31 | 2025-01-01 to 2025-12-31 |
| CLV | `https://www.notion.so/379e41301314814bacccdba0856274ce` | 2024-01-01 to 2024-12-31 | 2025-01-01 to 2025-12-31 |
| AGL | `https://www.notion.so/379e4130131481c9a076f675c44a100a` | 2024-01-10 to 2024-12-31 | 2025-01-01 to 2025-12-31 |
| CBMAX | `https://www.notion.so/379e413013148115ae0fd3a398fcb17c` | 2024-01-04 to 2024-12-31 | 2025-01-01 to 2025-12-31 |
| WEW | `https://www.notion.so/379e4130131481f1966cc5ac49703640` | 2024-05-13 to 2024-12-31 | 2025-01-01 to 2025-12-31 |
| PCL | `https://www.notion.so/ff6eb2a312ce43beb9e0928a3077f9ff` | 2024-05-09 to 2024-12-31 | 2025-01-01 to 2025-12-31 |

PCL reused its existing `Annual Tax (Bilanz)` registration, renamed/clarified as `E-Balance Sheet / eBilanz DE`. CBMAX 2025 remains a review row because the live company context still records unresolved IE-vs-DE tax-position treatment.
