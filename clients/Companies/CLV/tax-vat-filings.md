# Tax, VAT, And Filings

Status: provisional.
Source: Local import on 2026-05-06; cleanup instruction on 2026-05-08.
Imported: 2026-05-06.
Review: Confirm native ELSTER PDFs are retained in Drive/Notion if required; in-app browser native PDF download was unavailable during filing.

## German Annual VAT Returns

Status: provisional.
Source: ELSTER transmitted forms for CLV; Lexoffice UStVA review during live filing session; user instruction to ship both returns.
Imported: 2026-06-10.
Review: File native ELSTER PDF protocols to Drive/Notion if available outside the in-app browser.

| Year | ELSTER status | Tax number | Transfer ticket | Server receipt time | Key filing result | Local protocol note |
| --- | --- | --- | --- | --- | --- | --- |
| 2024 | Successfully transmitted | `29/648/30002` | `ep1617p3pui1s06hfvbjqzce4qapz5di` | 2026-06-10 19:38:09 | Line 75 `39.311`; input VAT `89,20`; Vorauszahlungssoll `-89,20`; final balance `0,00` | `elster-ust-2024-transmission-protocol.md` |
| 2025 | Successfully transmitted | `29/648/30002` | `ep16157khoaekf2kody6gnc4mjwkizc7` | 2026-06-10 19:40:37 | Line 22 `6.000` / VAT `1.140,00`; line 75 `34.887`; Vorauszahlungssoll `950,00`; final payable `190,00` | `elster-ust-2025-transmission-protocol.md` |

### 2025 Annual VAT True-Up

Status: provisional.
Source: ELSTER USt 2025 transmission protocol; Lexoffice UStVA pages for Q1-Q4 2025; German UStG § 18(4) at `https://www.gesetze-im-internet.de/ustg_1980/__18.html`.
Imported: 2026-06-10.
Review: Confirm payment execution with the responsible finance owner.

The 2025 annual true-up is:

`1.140,00` annual VAT less `950,00` already filed in 2025 UStVAs = `190,00` payable.

Lexoffice UStVA support:

| Period | UStVA VAT / Zahllast |
| --- | ---: |
| Q1 2025 | `0,00` |
| Q2 2025 | `0,00` |
| Q3 2025 | `380,00` |
| Q4 2025 | `570,00` |
| Total already filed | `950,00` |

Payment timing note: ELSTER displayed the statutory note that an Abschlusszahlung is payable within one month after submission. UStG § 18(4) also states that a positive annual difference is due one month after receipt of the tax return. For the 2025 return submitted on 2026-06-10, the expected due date is 2026-07-10 unless Finanzamt issues a different payment notice or offset.
