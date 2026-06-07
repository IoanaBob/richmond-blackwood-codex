# EIP History

Status: provisional.
Source: Notion company, linked records, internal Notion documents, local repo process memory, and user instruction on 2026-06-05.
Imported: 2026-06-05.
Review: Keep history entries factual and source-routed; update when user approves or Notion live statuses are corrected.

## 2026-06-07 - User Review Corrections And Live Notion Updates

Updated after user review:

- Confirmed EIP is internal and updated/read back the live Notion company `Communication preference` from WhatsApp to Slack.
- Recorded that 2023 was Ireland for the tax year, while EIP still traded in Germany for less than 180 days.
- Treated VAT3 Jan/Feb 2026 and April 2026 PAYE payment rows as unknown status with a direct-debit assumption to verify, not as confirmed unpaid.
- Updated/read back the Annual Returns registration row as Registered; the linked annual-return filing row is `EIP-28/07/2026- Annual Returns`, due 2026-08-06, and still needs filing-status review.
- Corrected/read back the VIES title typo from `VEIS` to `VIES`; status remains Overdue pending filing review.
- Created/read back live task `Create EIP group structure diagram` at `https://app.notion.com/p/378e41301314811f8e8edbfaa69afca0`.
- Searched Drive and recorded `04. EIP Ventures Limited` (`https://drive.google.com/drive/folders/13kUApp4sAVDjMwE_NFtKljqM8GQ_eex4`) as the strongest canonical folder candidate, pending confirmation before writes.
- Fetched the active EIP/Konvi intercompany contract and made the amount mismatch concrete: contract amount EUR 17,525 versus component line total EUR 36,204.

Open items:

- Confirm the EIP project/company relation mismatch.
- Verify VAT/PAYE direct-debit payment evidence before changing payment statuses.
- Review RTD and VIES filing backlog before changing Overdue statuses.
- Organize BOI debt data and identify missing support before external bank submission.
- Confirm the Drive folder candidate before upload or reorganization.

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
