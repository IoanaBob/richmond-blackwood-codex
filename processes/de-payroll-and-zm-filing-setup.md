# German Payroll Tax And ZM/VIES Filing Setup

Status: provisional.
Source: user instruction in Codex chat on 2026-06-06; live Notion Filing Registrations, Filings, Companies, Employment, Contracts, and Business Partner records read on 2026-06-06; official German filing deadline sources.
Imported: 2026-06-06.
Review: Confirm company-by-company filing exposure with the responsible filer before marking any placeholder filed or complete.

Use this process when auditing German-tax-resident or German-registered RB clients for missing payroll-tax or ZM/VIES filing rows in Notion.

## Payroll Tax

Check whether the company has active German payroll evidence before creating rows:

- German Payroll Tax Filing Registration, Betriebsnummer, or payroll-tax registration in Notion.
- Employment or payroll records showing active German employees and payroll months.
- Existing payroll filing rows linked to the registration.

Do not duplicate existing payroll filings. If the payroll registration already has equivalent monthly or annual Filings rows linked, leave it and record the read-back evidence. If active payroll evidence exists but there are no equivalent Filings rows, create rows on the Payroll Tax registration so filing evidence can be attached later.

Deadline rule:

- Monthly payroll-tax filings are due on the 10th day after the filing period, shifted to the next working day where needed.
- If the live registration is set to yearly and RB is intentionally tracking a yearly payroll-tax placeholder, use 10 January after the calendar year, shifted to the next working day.

Public source pointer: German EStG section 41a, `https://www.gesetze-im-internet.de/estg/__41a.html`.

## ZM / VIES

In RB shorthand, treat "CM" in this filing-audit context as German ZM (`Zusammenfassende Meldung`) / VIES unless the user says otherwise.

Create ZM/VIES rows only where records support an intra-EU B2B reporting need, for example:

- An EU customer outside Germany with a VAT number or VAT-registered status.
- Invoices or insolvency/tax evidence showing intra-EU reverse-charge B2B services.
- An existing VIES registration or ZM/VIES workflow for the company.

If the company has only German clients, non-EU clients, or EU business partners marked not VAT registered, do not create ZM rows from that evidence. Record the reason and leave a review note if the company's client base is broad enough that invoice-level review could still change the answer.

Notion implementation:

- Filing Registration `Type`: use `VIES`, because the live Filing Registrations data source exposes `VIES` but not a separate `ZM` type.
- Filing Registration `Jurisdiction`: `DE`.
- Filing Registration `Filing Cadence`: usually `Quarterly` unless live filing history or statutory threshold evidence supports monthly.
- Filings rows: one row per active reporting quarter, with `Status` set to `Pending` or `Overdue` depending on the due date and confidence.
- Comments: state the evidence and whether invoice-level values still need review before filing.

Deadline rule:

- Quarterly ZM/VIES filings are due by the 25th day after the reporting period, shifted to the next working day where needed.

Public source pointers:

- German UStG section 18a: `https://www.gesetze-im-internet.de/ustg_1980/__18a.html`
- BZSt ZM filing information: `https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/ZusammenfassendeMeldung/zusammenfassendemeldung_node.html`

## 2026-06-06 Audit Result

Status: provisional.
Source: live Notion targeted fetch/search/read-back on 2026-06-06.
Imported: 2026-06-06.
Review: Re-run from an authoritative Notion export or full data-source inventory when available.

Payroll rows:

- Existing equivalent payroll Filings rows were found for AGL, AMC, CLV, and PCL, so no duplicate rows were created.
- WEW had a Payroll Tax registration and German employment evidence but only broad tax-return rows linked. A dedicated `WEW - Payroll Tax - 2025` Filing row was created.
- VUN had a German Payroll Tax registration and local records showing payroll from July 2025 onward, but no live equivalent Filings relation surfaced. Monthly rows from July 2025 through March 2026 were created.

ZM/VIES rows:

- VUN had supported intra-EU reverse-charge evidence and German VAT context. A German ZM/VIES registration and quarterly rows were created for supported quarters.
- CBMAX had German VAT context plus EU client evidence, but the 2025 IE-vs-DE VAT position is unresolved. A German ZM/VIES registration and review rows were created as `Pending`.
- No ZM rows were created for AGL, NACV, WEW, PCL, AMC, or CLV from the current evidence. The records reviewed showed German/non-EU clients, EU counterparties not marked VAT registered, or insufficient invoice-level EU VAT evidence.
