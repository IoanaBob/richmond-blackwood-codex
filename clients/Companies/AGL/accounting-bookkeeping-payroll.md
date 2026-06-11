# Accounting, Bookkeeping, And Payroll

Status: provisional.
Source: Notion company and employment records fetched 2026-05-13; Drive and Gmail context.
Imported: 2026-05-13.
Review: Payroll-tax query submissions were verified on 2026-06-11; monitor only for any later Finanzamt allocation/outcome response.

## Accounting Setup

| Field | Value | Source |
| --- | --- | --- |
| Accounting software | Lexoffice | Notion company `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e` |
| Company email | `contact+agilelincs@richmondblackwood.com` | Notion company |
| Accounting software email | `contact+agl@richmondblackwood.com` | Notion company |
| Managed-services fee | EUR 1,000 monthly | Notion company |

## Payroll And Employment

| Item | Value | Source |
| --- | --- | --- |
| Employment record | `Byron - AGILE LINCS LIMITED` | `https://www.notion.so/aabd97548dab4747b3369cb0a9da0389` |
| Employee | Byron Jarvis Frasier | Notion employment/individual records |
| Employment country | DE | Notion employment |
| Employment status | Active | Notion employment |
| Employment start | 2024-05-01 | Notion employment |
| First payroll date | 2024-06-27 | Notion employment |
| Monthly gross salary | EUR 6,500 | Notion employment |
| German payroll tax registration | `AGL - 73070183 - Payroll Tax` | `https://www.notion.so/175e413013148084b982d3bb2a66d745` |

## Payroll Query

Status: provisional.
Source: Notion task `https://www.notion.so/35ce4130131481fbb755c6bce3ff7ef2`; correspondence `https://www.notion.so/35ce41301314811c81a0eeeb67d4d32b`.
Imported: 2026-05-13.
Review: ELSTER and accounting Gmail verification on 2026-06-11 support treating the RB submission work as complete; no separate Finanzamt allocation/acceptance response was verified in that pass.

Berlin Finanzamt queried AGL about missing payroll-tax returns for May 2024 through April 2025 while payments were received, creating a credit balance. The incoming letter record says the tax office requested confirmation by 2026-04-28 about whether employees were employed and why payroll-tax returns were not filed.

The source attachment from Gmail message `19dcef9e06c9b05a` was filed in Drive as `AGILE LINCS LIMITED.pdf` at `https://drive.google.com/file/d/1tqR347KxBiN8NUVGLnxqezx2D6bTHfvK/view?usp=drivesdk`; translated/read note at `https://drive.google.com/file/d/1HD-_Q4u5RY0Wp_svDNoWN3vH-bug3GWj/view?usp=drivesdk`.

## Payroll Query Verification

Status: provisional.
Source: ELSTER visible log read on 2026-06-11; accounting Gmail helper search of `accounting@richmondblackwood.com` on 2026-06-11; Notion task comment thread `https://www.notion.so/35ce4130131481fbb755c6bce3ff7ef2`.
Imported: 2026-06-11.
Review: The ELSTER Belegnachreichung detail page was not reopened after the browser connector lost the tab handle; the ELSTER transmitted-form list and Gmail confirmation prove successful transmission, but do not prove a later Finanzamt allocation/acceptance outcome.

On 2026-06-11, ELSTER `Meine Formulare -> Übermittelte Formulare` showed all 12 Lohnsteuer-Anmeldungen for May 2024 through April 2025 under `29/628/00250` / profile `Frasier`, each with status `Erfolgreich übermittelt` and submitted on 2026-05-25.

The accounting mailbox search `from:portal@elster.de Lohnsteuer after:2026/5/24 before:2026/5/28` returned 12 matching ELSTER confirmation emails for:

- 2024: Mai, Juni, Juli, August, September, Oktober, November, Dezember.
- 2025: Januar, Februar, März, April.

Accounting Gmail message IDs for those confirmations: `19e609b523db553b`, `19e609e8255d82cf`, `19e60a05f655cc82`, `19e60a141dac026c`, `19e60a145715154b`, `19e60a1b6c72e187`, `19e60a1b8ea79c26`, `19e60a38d3f514d3`, `19e60a7ad0042f18`, `19e60a821b2faa09`, `19e60a8948a83d0b`, `19e60a909b9f31fa`.

The accounting mailbox search `from:portal@elster.de Belegnachreichung after:2026/5/25 before:2026/5/28` returned Gmail message `19e641469fee5d37`, confirming a successful ELSTER Belegnachreichung transmission on 2026-05-26 at 13:38 under username `agl`.

The June 10 no-surcharge letter recorded in the Notion task comments appears to relate to the March 2026 Lohnsteuer filing being late but not surcharged. Treat it as payroll-status context, not as proof that the May 2024-April 2025 catch-up was accepted by Finanzamt.

## Retroactive Payroll Note

Status: provisional.
Source: Notion company page discussion and Drive spreadsheet `https://docs.google.com/spreadsheets/d/1LPnmWt6ri_MNZ00sQGZvFXgwDW0MsZmzx_iSnGWqT3o/edit?gid=0#gid=0`.
Imported: 2026-05-13.
Review: Confirm whether this has been fully reflected in payroll and bookkeeping records.

Notion company discussion says AGL owed Byron an additional EUR 2,508.97 for retroactive payroll, and the payment was processed apart from his regular salary on 2025-04-30.
