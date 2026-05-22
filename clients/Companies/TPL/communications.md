# Communications

Status: provisional.
Source: Notion TPL company record, related Communications/Tasks, and user instruction on 2026-05-22.
Imported: 2026-05-22.
Review: TPL call `RBCALL-26` is queued inactive until MHL/ZENA call `RBCALL-24` completes; verify final call note after activation.

## Recent Authority Follow-Ups

| Source | Date | Summary |
| --- | --- | --- |
| ELSTER outbound proof | 2026-05-19 | Notion communication `https://www.notion.so/367e4130131481308976fac41639e4a8` records proof that TPL outbound ELSTER transmission was sent. The current Gmail connector could not read referenced Gmail ID `19e4147bc3500e2d`; treat the Notion log as the usable proof until mailbox access is resolved. |
| Employer/employee query | 2026-05-19 | Task `https://www.notion.so/343e41301314806f907bfb8fd564168e` contains the drafted query asking whether Techpacito Limited is registered as an employer and whether Pradeep is registered as an employee. |
| VAT/direct-contract discussion | 2026-05-17 to 2026-05-19 | Communication `https://www.notion.so/365e4130131481a38f21ebdf1e3a5856` covers employer registration, Barden direct-contract transition, Irish vs German VAT route, retroactive German VAT filing, and explanation already sent to Pradeep. |
| Address and tax-number follow-up | Open as of 2026-05-22 | Task `https://www.notion.so/332e41301314819e9cc2deb9f225b2ab` asks Finanzamt to use the Walter-Paetzmann-Str. 40 address and check whether the tax number was issued. |
| Queued Finanzamt call | 2026-05-22 | `RBCALL-26` `https://www.notion.so/368e4130131481d48a11e42782fc533e` is structured as a follow-up to the 2026-05-19 ELSTER message and asks about ELSTER receipt/processing, VAT number/status, employer/payroll registration, Pradeep employee registration, and correspondence address. It remains inactive until MHL/ZENA `RBCALL-24` completes. |
| Internal communication log | 2026-05-22 | `https://www.notion.so/368e41301314819cbeaedd685cb3029c` records the queued-call setup and automation sequence. |

## Call Sequencing

The heartbeat automation `check-mhl-zena-call` will first check MHL/ZENA `RBCALL-24`. If that call is completed, it should activate TPL `RBCALL-26` for the next valid Finanzamt München phone window. If MHL/ZENA is failed, stuck, or missing real call identifiers, TPL remains inactive and the blocker should be reported.
