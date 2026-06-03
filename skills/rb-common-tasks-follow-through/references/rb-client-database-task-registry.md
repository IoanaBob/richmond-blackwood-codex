# RB Client Database Task Registry

Status: provisional.
Source: RB Client Databases page `https://www.notion.so/f272baa16c3b45069cbd896624e04b5c` fetched 2026-05-19.
Imported: 2026-05-19.
Review: Fetch each database/data source at run time and update this registry when schema changes are approved.

## Standard Task Capability

Every live data source under RB Client Databases is task-capable. If a database lacks one of the standard fields, the run packet must map the nearest field and propose a schema/update blocker.

For communication triage, task-capable does not mean every table is a primary destination. The primary triage destination must be one of:

- `Communications`
- `Invoicing`
- `Expenses`
- `Central Tasks`

Other task-capable tables should be loaded for context and later closeout analysis, then filled opportunistically only when a communication directly affects that entity or when the primary task requires the dependent table to be updated.

Standard fields:

- `Status` or `Stage`
- `Owner` or `Assignee`
- `Priority`
- `Due Date`, `Deadline`, or task-specific date
- `Next Action`
- `Closeout Condition`
- `Snooze Until`
- `Related Communications`
- `Related Task`
- `Company`
- `Individual`
- `Project` where applicable

Default open states: any non-terminal status, empty status, active status, due/overdue state, needs review, needs reply, pending, drafting, waiting, blocked, in progress, or not started.

Default terminal states: done, archived, complete, paid, booked, rejected, cancelled, inactive, resolved, sent-and-logged, or explicitly no-action complete.

## Canonical Communications

- Database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`
- Canonical for all RB communication logs after the redesign.
- Old `RB Communications` (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`) is migration source only. Do not write new records there.

Communications must support:

- `Status`: current values are `Captured`, `Drafting`, `Needs Triage`, `Follow-Up`, `Needs Reply`, `Archived`, and `Done`
- `Source Channel`
- `Source Message ID`
- `Source Thread ID`
- `Source URL`
- `Direction`
- `From`
- `To`
- `Communication Time`
- `Contains Letter`
- `Letter Source`
- `Letter Date`
- `Document(s)`
- `Translated Doc(s)`
- `Reply Required`
- `Reply Status`
- `Reply Snoozed Until`
- `Relevance`: one of `Ignore`, `Short Living`, or `Long Living`
- `Company`
- `Individual`
- task fields from the standard capability list

If a field is missing in live Notion, include it in the schema blocker packet and use `Notes` only as a temporary readback field when the operator approves.

Communication relation rules:

- Choose one primary client subject relation: `Company` or `Individual`, not both, unless the operator explicitly approves an exception.
- Use `Company` for company operations and durable company evidence.
- Use `Individual` for personal tax, insurance, individual evidence, or individual-specific authority/client matters.
- Leave both empty for internal, system, spam, no-scope, and churned-client no-action logs.
- Use `Assigned To` only for an internal owner of the Communication row itself; action ownership should normally sit on the linked task or operational row.

## Data Sources Under RB Client Databases

| Area | URL / data source | Required handling |
| --- | --- | --- |
| Individuals | `https://www.notion.so/295d1e1ad2084f8f9bf1fa741fd9edb3` / `collection://40cfddcb-ad31-4425-be6a-345aa0f340b7` | Task-capable for individual-specific follow-through; company must be empty unless the row is company-owned. |
| Companies | `https://www.notion.so/6f0ec8c76694423b98659048029ae961` | Fetch page/database at run time; use the project relation/attribute on the responsible Company record to assign client tasks. |
| Business Partners | `https://www.notion.so/834796d901db48adb6273fb7db89eaf7` / `collection://f52ad152-d91f-4663-86f1-e63a18edd90a` | Ancillary to Contracts. Fill only when a dependent contract/invoice item receives information about the other party. Do not use as a primary communication triage destination. |
| Payable/Receivable Contracts | `https://www.notion.so/9cd962ea82d24c2d9573cfc30f22eb27` / `collection://5d9b4220-fdcf-4a56-bc9c-fd9f9ea91828` | Discussion/client-driven dependent table. Search before invoice routing. If a client requests an invoice and no contract can be found, create/propose the contract row and always link a primary task. |
| Invoicing | `https://www.notion.so/eb96e3e897df446c86624067efe9788d` / `collection://0f071f27-2ff1-4be4-9558-48f1641e77d0` | Primary triage destination for invoice items. Invoice rows may be created by automation, so create/update them only when a communication affects an invoice or a matching row exists. Attach communications/evidence here when contract-backed. |
| Expenses | `https://www.notion.so/3a4d858161af4519b42340242cb70351` / `collection://4648c99e-0e6e-4d17-a408-88a08017e5b0` | Primary triage destination for receipt/expense/payment-notification items. Use when no active contract/invoice route applies. If business scope is supported but final bookkeeping classification is unclear, create/update the Expense with review-required status rather than creating a Central Task. |
| Employment | `https://www.notion.so/e1af3f4dc3fe430d83fe913d45bd7ca9` / `collection://8d5109d2-9e83-4bad-8ad2-58d92a2b1b73` | Discussion/client-driven dependent table. Create draft/update when communication indicates employment setup/change, and always link a primary task. |
| Filing Registrations | `https://www.notion.so/ecaf96a4cf77409ab481aaf317442b74` / `collection://dbe90a0f-23a0-418c-988f-cdb80ccd5e5f` | Automation-backed table. Use only as a byproduct when a communication affects registration state, authority setup, or blockers. |
| Filings | `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7` / `collection://ee7ef5c8-6a29-43dd-b2aa-63eddaa98971` | Automation-backed table. Use only as a byproduct when a communication affects filing status, evidence, or closeout. |
| Personal Tax Filings | `https://www.notion.so/206e41301314800493d2e00f69621528` / `collection://206e4130-1314-8182-b513-000b0c0cc725` | Task-capable; individual relation normally owns subject matter. |
| Offices | `https://www.notion.so/5ca73b71d12049a18b08f8a9cfda28c3` / `collection://5174bf9f-8128-4990-a5ef-4d4653776ce4` | Task-capable for office/mail/admin work. |
| Investment Accounts | `https://www.notion.so/69311793987147e1b18194908c0ddd1f` / `collection://cedc0388-9e8e-4f66-817d-7d3c801f163c` | Discussion/client-driven dependent table. Create draft/update when seen in chats and always link a primary task. |
| Bank Accounts | `https://www.notion.so/b200c274df1546cf964523f53c3a9bf4` / `collection://4ceb760c-b25d-4043-b842-f691d59c9edc` | Discussion/client-driven dependent table. Create draft/update when seen in chats and always link a primary task. |
| Client Notes & Updates | `https://www.notion.so/5147c93c526f48e9848cb7a2b49e526b` / `collection://1eaa70f9-18e8-4d3e-9db1-961850935b73` | Ancillary table for intended client updates. Ignore for now during triage unless an approved closeout/client-update action explicitly depends on it. |
| Communications | `https://www.notion.so/1b5e4130131480ab84f3cca356736807` / `collection://1b5e4130-1314-8183-afd8-000b6f4da982` | Canonical communications task database. |
| AR Reminders | `https://www.notion.so/44ab53bc502440559aaf3b23d7622947` / `collection://f4011ace-7072-4ae7-b37b-53f2c89067a6` | Task-capable for receivable reminder follow-through. |
| Tax Prepayments Schedule | `https://www.notion.so/1a4e413013148024bc0fc58cdffdeeb3` / `collection://1a4e4130-1314-81ba-ae59-000bad7dfd7e` | Needs automation. If communication affects schedule/payment prediction, create a primary task and propose schedule update as byproduct. |
| Tax prepayments | `https://www.notion.so/162e41301314803d800acef0a0719d01` / `collection://162e4130-1314-814e-8e52-000beaf174b7` | Needs automation. If received/identified, always create a primary task; then propose the correct payment/prepayment row as byproduct. |
| Tax payments | `https://www.notion.so/1fae413013148099907cf544585f1b5b` / `collection://1fae4130-1314-81c1-b7dd-000b7ac91166` | Needs automation. If received/identified, always create a primary task; then propose the correct tax payment row as byproduct. |
| Assets | `https://www.notion.so/353e4130131480b39c78ff7c8219c247` / `collection://21ee4130-1314-8076-8628-000bc859e0ad` | Discussion/client-driven dependent table. Create draft/update when seen in chats and always link a primary task. |
| Payroll | `https://www.notion.so/2f5e4130131480c18bd0f6117baa5998` / `collection://f0de9873-1ef7-4cbb-bc89-33ddf244e333` | Automation-backed table. Use only as a byproduct when a communication affects payroll state, evidence, or closeout. |
| VAT Registration Requirements | `https://www.notion.so/18ae4130131480e6a7f1cf2efe3af01d` / `collection://18ae4130-1314-8095-a4ec-000b6ec24c20` | Task-capable for VAT registration readiness and blockers. |
| Wamo Subscriptions | `https://www.notion.so/318e41301314803c8c9ad994994d3c71` / `collection://318e4130-1314-806d-b562-000b62b84490` | Dependent subscription table. Use only when a communication affects a Wamo subscription and always link a primary task. |
| Empty Databases | `https://www.notion.so/83ac4e58cd4f4ec198eb18a36b9ba520` | Ignore. Do not inventory or route to this placeholder area. |
| Central Tasks | `collection://25de4130-1314-8158-af69-000b6c9fb49e` | Extra action tasks only; do not use as the only record for operational DB rows. |

## Default Owner Rule

Use this order:

1. Explicit assignee in the communication or row.
2. Existing owner/assignee on the matched row.
3. Owner of the project linked on the responsible Company record.
4. Established process/client rule.
5. `internal/people-roles.md`.
6. If still unclear, create a blocker packet row and do not create an unowned task.
