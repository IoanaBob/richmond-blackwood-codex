# Communications

Status: provisional.
Source: Notion TPL company record, related Communications/Tasks, and user instruction on 2026-05-22.
Imported: 2026-05-22.
Review: TPL call `RBCALL-26` was activated first in the 2026-05-25 requested sequence; verify final call note after the call runs.

## Recent Authority Follow-Ups

| Source | Date | Summary |
| --- | --- | --- |
| ELSTER outbound proof | 2026-05-19 | Notion communication `https://www.notion.so/367e4130131481308976fac41639e4a8` records proof that TPL outbound ELSTER transmission was sent. The current Gmail connector could not read referenced Gmail ID `19e4147bc3500e2d`; treat the Notion log as the usable proof until mailbox access is resolved. |
| Prior German Finanzamt/ELSTER draft | 2026-05-19 | Local Codex session `019e400d-033b-7671-851c-f9207a10acb5` contains the draft message asking Finanzamt to clarify complete VAT, corporation-tax, trade-tax, and ELSTER access status. It states TPL was incorporated in Ireland on 16.04.2025, gives Irish register number 786441, asks which registrations/numbers are complete or outstanding, asks for the missing ELSTER activation/access code, and cautions not to say no tax number exists because Finanzamt correspondence already showed a Steuernummer. |
| Employer/employee query | 2026-05-19 | Task `https://www.notion.so/343e41301314806f907bfb8fd564168e` contains the drafted query asking whether Techpacito Limited is registered as an employer and whether Pradeep is registered as an employee. |
| VAT/direct-contract discussion | 2026-05-17 to 2026-05-19 | Communication `https://www.notion.so/365e4130131481a38f21ebdf1e3a5856` covers employer registration, Barden direct-contract transition, Irish vs German VAT route, retroactive German VAT filing, and explanation already sent to Pradeep. |
| Address and tax-number follow-up | Open as of 2026-05-22 | Task `https://www.notion.so/332e41301314819e9cc2deb9f225b2ab` asks Finanzamt to use the Walter-Paetzmann-Str. 40 address and check whether the tax number was issued. |
| Activated Finanzamt call | 2026-05-25 | `RBCALL-26` `https://www.notion.so/368e4130131481d48a11e42782fc533e` is structured as a follow-up to the 2026-05-19 Finanzamt/ELSTER message and asks about receipt/processing, complete VAT/corporation-tax/trade-tax registration status, which Steuernummer applies to each filing type, VAT number/status, ELSTER activation/access-code delivery, employer/payroll registration, Pradeep employee registration, and correspondence address. It was activated first in the user-requested call order: TPL, then CB MAX, then MHL. |
| Internal communication log | 2026-05-22 | `https://www.notion.so/368e41301314819cbeaedd685cb3029c` records the queued-call setup and automation sequence, and was updated after checking local Codex session `019e400d-033b-7671-851c-f9207a10acb5`. |

## Call Sequencing

As of 2026-05-25, heartbeat automation `start-cb-max-after-tpl-call` manages the requested order. TPL `RBCALL-26` is active first. After TPL reaches a terminal state, the heartbeat should activate CB MAX `RBCALL-13`; after CB MAX reaches a terminal state, it should activate MHL/ZENA `RBCALL-24`.
