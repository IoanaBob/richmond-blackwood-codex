# Finanzamt Response Plan - May 2026 Packet

Status: provisional.
Source: User instruction in Codex chat on 2026-05-25; local PDFs downloaded by the user; Notion task `https://www.notion.so/35ce4130131481fbb755c6bce3ff7ef2`; Notion company `https://www.notion.so/2719f60f2f8c40128ec93d9758336f9e`; Notion German corporation filing `https://www.notion.so/311e4130131481d49734d2b64b83b265`; Google Drive AGL folder reads; Gmail thread/message `19e2263aa4379938`; ELSTER public guidance at `https://www.elster.de/eportal/infoseite/rechtliches`.
Imported: 2026-05-25.
Review: Needs operator/accountant review before any ELSTER submission, Einspruch, Aussetzung der Vollziehung request, or payroll-tax response is sent. The ELSTER certificate/password are live credentials and are not stored here.

## Source Packet

| Source item | Local filename or live source | Working read |
| --- | --- | --- |
| KSt / E-Bilanz request | `SD79-26003 AGILE LINCS LIMITED 信件1.pdf` in the user Downloads folder | Finanzamt letter dated 2026-05-19 asks for the 2024 E-Bilanz Datensatz by 2026-06-02. |
| Annual VAT request | `SD79-26003 AGILE LINCS LIMITED 信件2（重复扫描？？）.pdf` in the user Downloads folder | Finanzamt letter dated 2026-05-19 asks for the 2024 Umsatzsteuererklaerung by 2026-06-02. This is not the same as the quarterly UStVA protocols. |
| Mahnung / account statement | `SD79-26003 AGILE LINCS LIMITED 信件3.pdf` and `SD79-26003 AGILE LINCS LIMITED 信件4.pdf` in the user Downloads folder | Scanned account statement dated 2026-05-19 shows an enforcement-facing balance of EUR 5,781.25 and visible Lohnsteuer credits for May 2024 through April 2025. Original assessment notices behind the balance were not in the packet. |
| 2024 quarterly UStVA protocols | `2024-Q1-UStVa-Protokoll.pdf` through `2024-Q4-UStVa-Protokoll.pdf` | Q1-Q4 2024 UStVA transmissions were made on 2025-06-27 and each shows line 83 as EUR 0.00. These support a zero annual-VAT position but do not replace the annual VAT return. |
| 2024 financial statements | `Agile LinCS Limited FS Abridged Jan 10 2024 - Dec 31 2025.pdf`; Drive copy `https://drive.google.com/file/d/1jBoStq1KZRTQUXjB1SEjlGiZCSvvwBil` | Financial statements are for 2024-01-10 to 2024-12-31 and show loss for the year of EUR 14,447. |
| Payroll query task | `https://www.notion.so/35ce4130131481fbb755c6bce3ff7ef2` | Task contains payslips and monthly tax-payment proof attachments for May 2024-April 2025. It does not yet prove that Lohnsteuer-Anmeldungen were submitted or processed. |
| Unrelated user packet files | `4c55f975-9f13-4df2-ab11-c118db334078.pdf`; `SD79-26002-AARON MEDIC CHAMBERLAIN LIMITED-2026年税单 (1).pdf` | These appear to relate to AARON MEDIC CHAMBERLAIN LIMITED, not AGL. Do not use for the AGL response. |

## Priority Actions

| Priority | Action | Owner / route | Current status | Review before sending |
| --- | --- | --- | --- | --- |
| 1 | File the 2024 Umsatzsteuererklaerung electronically, likely as zero if the books confirm no German VATable output/input VAT. | ELSTER / AGL certificate or filing software. | Filing basis prepared from the four zero UStVA protocols and 2024 financial statements. Not submitted yet. | Confirm annual VAT figures and submit via ELSTER. |
| 2 | Generate and submit the 2024 E-Bilanz Datensatz. | Lexoffice, tax software, or an E-Bilanz/XBRL tool; ordinary PDF accounts are not enough. | Finanzamt requested the dataset by 2026-06-02. Existing KSt/GewSt filings were submitted, but this separate dataset remains missing. | Confirm dataset production route and final values. |
| 3 | Respond to the 2026-05-19 Mahnung before enforcement pressure escalates. | ELSTER form/message, ideally with the annual VAT filing and E-Bilanz timing referenced. | Account statement shows EUR 5,781.25 total, including estimated-looking 2024 USt/KSt/GewSt/soli amounts and surcharges. | Ask for suspension of collection/enforcement while the missing filings are processed; request the underlying Bescheide if not already in records. |
| 4 | Resolve the payroll-tax query for May 2024-April 2025. | Simoneta / payroll owner, then ELSTER Lohnsteuer-Anmeldung correction or response. | AGL had German employment from 2024-05-01. Payment proof and visible credits exist, but return-submission status is not justified yet. | Confirm whether Lohnsteuer-Anmeldungen were missing, late, rejected, or misallocated. |
| 5 | File the new May 2026 Finanzamt letters and 2024 UStVA protocols into Drive. | AGL Drive. | FS PDF is already in Drive. New letters/protocols were local only in this run; repo helper upload was blocked by missing `ts-node/register`. | Upload to the existing AGL folders when Drive helper/dependency is available. |

## Working Position

Status: provisional.
Source: 2026-05-25 packet, AGL repo records, Notion filing/task records, and official ELSTER public guidance.
Imported: 2026-05-25.
Review: Confirm through the original ELSTER account/filing software before relying on this as final filing advice.

The Finanzamt issues should be handled as related but separate defects:

- Annual VAT: quarterly UStVA protocols exist, but the annual 2024 Umsatzsteuererklaerung is still requested. The four quarterly protocols all show EUR 0.00, so the annual return can be prepared as a zero/near-zero annual return if the bookkeeping confirms no German VATable activity.
- E-Bilanz: the German KSt/GewSt returns were recorded as filed on 2026-04-30, but the separate E-Bilanz/XBRL dataset is still requested. The 2024 accounts show a EUR 14,447 loss, supporting the no-profit/no-tax operating position, but the Finanzamt wants the electronic dataset.
- Mahnung: the EUR 5,781.25 balance appears inconsistent with AGL records and may be based on estimates or unprocessed/missing annual filings. Do not treat the Mahnung alone as proof that the tax is finally due. Get the underlying assessment notices and request suspension/collection pause while missing filings are cured.
- Payroll tax: do not tell Finanzamt there were no employees. AGL had German employment from 2024-05-01. The open issue is why payments/credits exist without matching processed Lohnsteuer-Anmeldungen.

## Draft ELSTER Message - Annual VAT, E-Bilanz, And Mahnung

Status: draft for review only.
Source: 2026-05-25 packet and repo/Notion records.
Imported: 2026-05-25.
Review: Send only after the filing path, exact sender/representative, and figures are confirmed.

Sending channel: ELSTER under AGL certificate or authorised representative account, not email.
Operator: not available from `.env.local` in this worktree.

```text
Betreff: AGILE LINCS LIMITED, StNr. 29/628/00250 - USt 2024 / E-Bilanz 2024 / Mahnung vom 19.05.2026

Sehr geehrte Damen und Herren,

wir haben Ihre Schreiben vom 19.05.2026 zur Umsatzsteuererklaerung 2024 und zur E-Bilanz 2024 sowie die Mahnung / Kontoauszuege vom 19.05.2026 erhalten.

Die Umsatzsteuer-Voranmeldungen fuer das 1. bis 4. Kalendervierteljahr 2024 wurden am 27.06.2025 elektronisch uebermittelt und weisen jeweils EUR 0,00 verbleibende Umsatzsteuer-Vorauszahlung / Ueberschuss aus. Die Umsatzsteuer-Jahreserklaerung 2024 wird nun elektronisch nachgereicht.

Die Koerperschaftsteuer- und Gewerbesteuererklaerungen 2024 wurden am 30.04.2026 elektronisch uebermittelt. Der E-Bilanz-Datensatz wird derzeit aus den Jahresabschlussdaten 2024 vorbereitet und ebenfalls elektronisch nachgereicht. Der Jahresabschluss fuer den Zeitraum 10.01.2024 bis 31.12.2024 weist einen Jahresfehlbetrag von EUR 14.447 aus.

Da die angemahnten Betraege offenbar auf geschaetzten oder noch nicht vollstaendig verarbeiteten Grundlagen beruhen, bitten wir bis zur Verarbeitung der nachgereichten Umsatzsteuererklaerung und der E-Bilanz um Aussetzung weiterer Vollstreckungsmassnahmen bzw. um Stundung der Vollziehung. Hilfsweise bitten wir um Mitteilung, welche Bescheide den angemahnten Betraegen zugrunde liegen und ob hierzu aus Ihrer Sicht noch Einspruch und/oder ein Antrag auf Aussetzung der Vollziehung erforderlich ist.

Zu den Lohnsteuerbetraegen: Fuer den Zeitraum ab Mai 2024 bestand eine Beschaeftigung in Deutschland. Zahlungen wurden geleistet; wir gleichen derzeit die Lohnsteuer-Anmeldungen und die Zuordnung der Zahlungen je Anmeldungszeitraum ab. Bitte buchen Sie vorhandene Guthaben bis zur Klaerung nicht aus bzw. nicht gegen andere Steuerarten um. Eine separate Rueckmeldung zu den Lohnsteuer-Anmeldungen folgt kurzfristig.

Mit freundlichen Gruessen

[authorised sender / representative]
```

## Draft Payroll-Tax Response

Status: draft for review only.
Source: Notion payroll query task and repo payroll records.
Imported: 2026-05-25.
Review: Send only after Simoneta/payroll owner confirms whether returns were never filed, filed late, rejected, or merely misallocated.

Sending channel: ELSTER or Finanzamt-approved response route.
Operator: not available from `.env.local` in this worktree.

```text
Betreff: AGILE LINCS LIMITED, StNr. 29/628/00250 - Lohnsteuer-Anmeldungen Mai 2024 bis April 2025

Sehr geehrte Damen und Herren,

zu Ihrem Schreiben vom 17.04.2026 teilen wir mit, dass AGILE LINCS LIMITED im angefragten Zeitraum einen in Deutschland lohnsteuerpflichtigen Arbeitnehmer beschaeftigt hatte.

Nach unserer Pruefung wurden monatliche Zahlungen geleistet. Die Anmeldungen bzw. deren Verarbeitung und Zuordnung sind jedoch nicht vollstaendig nachvollziehbar. Wir bereiten deshalb die fehlenden bzw. berichtigten Lohnsteuer-Anmeldungen fuer Mai 2024 bis April 2025 vor und reichen diese elektronisch nach bzw. stellen die korrekte Zuordnung der bereits geleisteten Zahlungen je Zeitraum dar.

Bitte beruecksichtigen Sie die bereits vorhandenen Guthaben auf dem Lohnsteuerkonto und teilen Sie uns mit, falls einzelne Zahlungsnachweise oder Anmeldungszeitraeume nicht zugeordnet werden koennen.

Mit freundlichen Gruessen

[authorised sender / representative]
```

## Filing Blockers

| Blocker | Why it matters | Next step |
| --- | --- | --- |
| ELSTER access not used in this run | The user supplied an ELSTER password in chat and said the certificate is in Notion. These are live credentials and must not be copied into git. | Use the live ELSTER account only in a reviewed filing session and keep the certificate outside the repo. |
| E-Bilanz tooling not identified | The requested artifact is an electronic dataset, not just a PDF financial statement. | Confirm whether Lexoffice, AMD, or another E-Bilanz tool should generate the XBRL/taxonomy dataset. |
| Payroll filing status unresolved | Finanzamt's payroll question needs a factual explanation; payment proof alone does not explain missing returns. | Ask Simoneta/payroll owner for submission receipts or permission to file/correct missing Lohnsteuer-Anmeldungen. |
| Original Bescheide behind Mahnung missing | The Mahnung lists amounts but not the legal basis/deadline for objections. | Retrieve the 2024 USt/KSt/GewSt/soli assessment notices from ELSTER, mail, AMD, or Drive. |
| Drive upload helper blocked | The repo helper failed because `ts-node/register` is missing in the worktree. | Re-run after dependencies are available, or use another approved Drive upload route. |
