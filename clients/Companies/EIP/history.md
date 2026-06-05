# EIP History

Status: provisional.
Source: Notion company, linked records, internal Notion documents, local repo process memory, and user instruction on 2026-06-05.
Imported: 2026-06-05.
Review: Keep history entries factual and source-routed; update when user approves or Notion live statuses are corrected.

## 2026-06-05 - Initial EIP Context Import

Imported:

- User instruction that EIP is the holding company of the venture-builder companies and that EIP context should be pulled from Notion.
- Notion company record `EIP VENTURES LIMITED`, canonical reference `EIP`.
- EIP client project and parent project.
- Linked directors/UBOs/shareholders/employment relation pointers for Ioana Surdu-Bob and Eran Peer, with personal identifiers excluded.
- Direct Notion subsidiary/shareholder-of relations for MONO, EVG, and RBL.
- Active and inactive EIP contracts, including intercompany charges, contractor/outgoing rows, AIB hire-purchase, and debt/mortgage row.
- Filing registrations, current filing/payment rows, historical tax-status document, BOI lending/debt-register tasks, and intercompany tool-charge task.

Decisions / routing:

- Created `clients/Companies/EIP/` because the Notion company `Reference` value is `EIP`.
- Treated subsidiary operating details as pointers only; direct operating context stays in each subsidiary folder or live Notion records.
- Did not create individual folders or copy personal records because the current task is EIP company context, not personal-tax work.
- Did not store WhatsApp JID because WhatsApp was not used for the EIP import.

Open items:

- Confirm broader holding structure beyond the direct Notion subsidiary relations.
- Confirm EIP communication route because Notion says WhatsApp but no WhatsApp route was used.
- Reconcile annual-return, RTD, VIES, payroll-registration, VAT payment, and PAYE payment statuses.
- Review historical DE/IE tax cleanup before external reporting.
- Confirm BOI loan/debt-register readiness before any external application submission.
