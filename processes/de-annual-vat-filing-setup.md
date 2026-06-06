# German Annual VAT Filing Setup

Status: provisional.
Source: user instruction in Codex chat on 2026-06-06; live Notion Filing Registrations, Filings, Companies, and Tasks schema read on 2026-06-06.
Imported: 2026-06-06.
Review: Confirm automation expectations and whether every annual VAT filing row should be created by year-end or only when annual VAT work starts.

Use this process when a German-tax-resident or German-VAT-registered client needs an annual VAT return tracked in Notion.

## Purpose

Annual German VAT returns must not be attached to quarterly/monthly VAT registrations or to corporation-tax registrations. Create or find a separate yearly VAT Filing Registration first, then link each annual VAT Filing row to that registration.

This keeps annual VAT evidence attachable in the same Notion Filings workflow as periodic VAT, without mixing annual-return submissions into the periodic cadence.

## Filing Registration Pattern

Create or find one Filing Registration per company and authority/tax-number context that needs annual German VAT tracking.

Required Notion fields:

| Field | Value |
| --- | --- |
| `Type` | `VAT` |
| `Jurisdiction` | `DE` |
| `Filing Cadence` | `Yearly` |
| `Status` | Mirror the source VAT registration when the annual obligation is confirmed. Use `Pending` or the existing problem status when the authority/tax-number context is unresolved. |
| `Company/Tax/Filing Number` | Use only the value already held in live Notion. Do not copy credential material, certificate bundles, payment references, or private authority attachments into git. |
| `Company` | Link the responsible company. |
| `First Filing Period` | Set only when the first annual period is supported by source records or user instruction. |
| `Comments` | Note the source periodic VAT registration, owning task, and any unresolved authority context. |

Keep separate annual registrations for separate German authority contexts. For example, if a Berlin VAT context and a Hamburg estimated-demand context both exist and the Hamburg number is not confirmed, create a distinct Hamburg annual VAT registration and mark the uncertainty in comments instead of merging it into the Berlin registration.

## Filing Row Pattern

Create or update one Filings row per annual VAT period.

Required Notion fields:

| Field | Value |
| --- | --- |
| `Company` | Link the same company. |
| `Filing Registration` | Link the annual VAT registration, not the periodic VAT row. |
| `Filing Period` | Use the exact annual period only when supported. Use a full calendar year only where source context supports a calendar-year annual VAT return. |
| `Status` | Keep `Pending` until there is filing proof, submission proof, or a verified live status. |
| `Submission` | Attach the annual VAT return or proof here when available. |
| `Payment Due` / tax-payment handling | Populate only from evidence or live payment rows. |
| `Filing Task` / `Preparation Task` | Link the owning operational task when one exists. |

For existing manual annual VAT Filing rows, preserve all proof, submission files, filed dates, payment values, and comments. Only correct the `Filing Registration` relation so the row points to the annual VAT registration.

## Deadline Rule

Status: provisional.
Source: BMF AO/AEAO section 149 deadline guidance and live Notion setup run on 2026-06-06.
Imported: 2026-06-06.
Review: Confirm with the responsible filer if a company is not tax-advised or if Finanzamt grants a different individual deadline.

For RB-managed German annual VAT/tax returns, use the tax-advised annual-return deadline unless the live record or Finanzamt notice gives a more specific date. Set the deadline on both the Filing Registration (`Due Date` and `First Filing Date` where it is the first supported period) and each annual Filing row (`Due Date`).

| Annual period | Deadline used in current Notion setup | Source basis |
| --- | --- | --- |
| 2023 | 2025-06-02 | Tax-advised deadline fell on 2025-05-31, shifted to the next working day. |
| 2024 | 2026-04-30 | Tax-advised deadline for 2024 returns. |
| 2025 | 2027-03-01 | Tax-advised deadline fell on 2027-02-28, shifted to the next working day. |

Public source pointers:

- BMF AO 2025 section 149: `https://ao.bundesfinanzministerium.de/ao/2025/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Zweiter-Unterabschnitt/Paragraf-149/inhalt.html`
- BMF AEAO 2024 section 149: `https://lsth.bundesfinanzministerium.de/ao/2024/Abgabenordnung/Vierter-Teil/Zweiter-Abschnitt/Zweiter-Unterabschnitt/Paragraf-149/ae-149.html`

## Closeout

After setup:

- Read back at least one registration relation and one filing relation.
- Add a comment to the owning task listing created registrations, linked existing filings, created placeholder filings, and blockers.
- Do not mark the task complete while placeholder rows still need submissions, payment/refund review, or authority confirmation.
- Record the reusable process in this repo and route client-specific caveats to the relevant `clients/Companies/<Reference>/` folder when that folder exists.

## Connector Limitation From Initial Setup

Status: provisional.
Source: live Notion connector run on 2026-06-06.
Imported: 2026-06-06.
Review: Re-run an authoritative inventory when Notion data-source SQL/query or REST pagination is available.

The initial setup used targeted Notion search/fetch/create/update/read-back because the Notion SQL query tool was unavailable in the session and no local REST token was available. Search-backed results are suitable for the created/updated rows named in the task comment, but not an exhaustive proof that no other annual VAT rows exist.
