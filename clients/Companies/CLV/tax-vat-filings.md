# Tax, VAT, And Filings

Status: provisional.
Source: Local import on 2026-05-06; cleanup instruction on 2026-05-08.
Imported: 2026-05-06.
Review: Native ELSTER PDFs were later provided by the operator and verified locally; actual native-PDF upload to Notion/Drive remains blocked until a supported PDF upload route is available.

## German Annual VAT Returns

Status: provisional.
Source: ELSTER transmitted forms for CLV; Lexoffice UStVA review during live filing session; user instruction to ship both returns.
Imported: 2026-06-10.
Review: Attach the native PDFs to the Notion `Submission` property once Notion File Upload API credentials or raw Drive PDF upload support are available.

| Year | ELSTER status | Tax number | Transfer ticket | Server receipt time | Key filing result | Local protocol note |
| --- | --- | --- | --- | --- | --- | --- |
| 2024 | Successfully transmitted | `29/648/30002` | `ep1617p3pui1s06hfvbjqzce4qapz5di` | 2026-06-10 19:38:09 | Line 75 `39.311`; input VAT `89,20`; Vorauszahlungssoll `-89,20`; final balance `0,00` | `elster-ust-2024-transmission-protocol.md` |
| 2025 | Successfully transmitted | `29/648/30002` | `ep16157khoaekf2kody6gnc4mjwkizc7` | 2026-06-10 19:40:37 | Line 22 `6.000` / VAT `1.140,00`; line 75 `34.887`; Vorauszahlungssoll `950,00`; final payable `190,00` | `elster-ust-2025-transmission-protocol.md` |

### Notion And Drive Evidence

Status: provisional.
Source: Notion filing rows and Google Drive evidence documents updated on 2026-06-10.
Imported: 2026-06-10.
Review: Connector import placed the evidence documents in Drive as Google Docs and attached their URLs to the Notion `Submission` property; direct local PDF attachment was rejected by the Notion connector, Google Drive connector rejected PDF import, and the approved Notion REST upload token was unavailable in this environment.

| Year | Notion filing row | Drive evidence document | Notion status |
| --- | --- | --- | --- |
| 2024 | `https://app.notion.com/p/377e41301314814a8876d30d28fd246d` | `https://docs.google.com/document/d/1K29wdLWyveMVxTsxo8WWSJniRMQAHUVfaep75oLX2Yk` | Filed; filed on 2026-06-10; payment due `0` |
| 2025 | `https://app.notion.com/p/377e41301314813d9347d2795143ac13` | `https://docs.google.com/document/d/1puZePo8kFIQFZ3Tu08KWxar8-3-JoONnfpBPgEjLXpM` | Filed; filed on 2026-06-10; payment due `-190` |

Native ELSTER PDF files later provided by the operator:

| Year | Local filename | SHA-256 | Verification |
| --- | --- | --- | --- |
| 2024 | `/Users/jp/Downloads/clv 2024 annual vat.pdf` | `b4603db3ca3fcbe0fd7bf2690c7b0f7e8f956b56ee229a9ae413b2fa67424615` | Matches CLV tax number, transfer ticket, server receipt, line 75 `39.311`, and final balance `0,00`. |
| 2025 | `/Users/jp/Downloads/clv 2025 annual vat.pdf` | `f80194938e23587ac36e3ea00c373340e61264b2d4d280d234031d66a34bbceb` | Matches CLV tax number, transfer ticket, server receipt, line 75 `34.887`, and final payable `190,00`. |

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
