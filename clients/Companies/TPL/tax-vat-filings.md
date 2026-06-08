# Tax, VAT, And Filing Registrations

Status: provisional.
Source: Notion company/filing-registration/task records, Gmail, WhatsApp, user instruction reviewed on 2026-05-22, user answers on 2026-05-24, and CRO/CRO Open Services public documentation.
Imported: 2026-05-22.
Review: International VAT identification number / USt-IdNr. remains pending; follow up through the open Finanzamt call/task before treating international VAT registration as complete.

## Current Position

Notion lists TPL tax residence as Germany. User instruction on 2026-05-22 says RB has received all registrations except international VAT and needs to follow up to get that information.

User clarified on 2026-05-24 that the German tax number should be treated as the local German tax/VAT registration for 2025, while international VAT / USt-IdNr. remains pending because there are still questions to submit.

WhatsApp on 2026-05-19 records RB telling Pradeep that Germany accepts the tax number as the VAT number in some contexts and that the international VAT number was not always issued automatically.

## Registration Summary

| Registration / filing | Status | Source | Notes |
| --- | --- | --- | --- |
| Irish company / annual returns | Registered | `https://www.notion.so/1e9e4130131481099265c96960b24128`; user answer 2026-05-24 and 2026-05-25; CRO public sources/API check | Notion read-back on 2026-05-24 shows Status `Registered`; earlier repo note that it showed overdue is superseded. CRO public sources confirm CORE is the official filing route and the CRO Gazette confirms TECHPACITO LIMITED / company number 786441 was registered on 2025-04-16. Direct CRO Open Services API annual-return checking returned an API-credential error. |
| RBO | Registered | `https://www.notion.so/1e9e41301314812cb4e8f544049c0d9c` | UBO registered. |
| German corporation tax | Registered | `https://www.notion.so/1e9e4130131481d5bbd5f47b81f4b21f` | German tax registration received. |
| German trade tax | Registered | `https://www.notion.so/1e9e4130131481e6b928f67e7eac9de9`; task `https://www.notion.so/35de4130131480e4a557d037de5fbb6e` | Trade-tax form task is marked Done. |
| German VAT / local VAT filing | Registered | `https://www.notion.so/1e9e413013148108af4dd5788940476a`; user answer 2026-05-24; WhatsApp 2026-05-19 | Notion row was updated on 2026-05-24 from `Overdue` / `TPL - Pending_TaxNo - VAT` to `Registered` / `TPL - DE VAT`; live comment records that the German tax number covers local 2025 registration while USt-IdNr. remains pending. |
| International VAT identification / USt-IdNr. | Missing / follow-up needed | User instruction 2026-05-22, 2026-05-24, and 2026-05-25; call `https://www.notion.so/368e4130131481d48a11e42782fc533e`; JP task `https://www.notion.so/36be413013148127893fcb3fc99958c8`; Gmail `19e4147bc3500e2d` | ELSTER message was submitted 2026-05-19; user says further questions still need to be submitted. JP owns the follow-up task, due 2026-05-29. |
| Payroll tax / employer registration | Registered | `https://www.notion.so/1e9e4130131481369f4de058fb0e8fb8` | Keep raw employer/customer identifiers in Notion, not git. |
| Local business registration / Gewerbeanmeldung | Registered | `https://www.notion.so/1e9e41301314810e8b28f89e47631893` | Required for the car transaction and requested by the dealer/lender. |
| Accident insurance / VBG | Registered | `https://www.notion.so/1e9e4130131481b2b788cf97d61be56c` | Do not copy PIN/password material into git. |

## Annual German E-Balance Sheet / eBilanz Filing Setup

Status: provisional.
Source: user follow-up in Codex chat on 2026-06-08; live Notion company, Filing Registration, and Filings read-backs.
Imported: 2026-06-08.
Review: Attach eBilanz transmission proof/protocol or blocker when processed.

TPL now has a dedicated eBilanz Filing Registration in Notion:

- eBilanz registration: `https://www.notion.so/379e41301314814db496e4fbe15b6f91`
- 2025 eBilanz placeholder filing: `https://www.notion.so/379e413013148170902df6640ace8aae`; period 2025-04-16 to 2025-12-31; due 2027-03-01; status Pending.

No 2024 eBilanz row was created because TPL was registered on 2025-04-16.

## Current Follow-Up

Open call/task `https://www.notion.so/368e4130131481d48a11e42782fc533e` is prepared to follow up the 2026-05-19 ELSTER message and confirm VAT number/status, employer registration, employee-registration status, and correspondence address. JP-owned task `https://www.notion.so/36be413013148127893fcb3fc99958c8` now tracks submitting the remaining USt-IdNr. questions and confirming the VAT number.
