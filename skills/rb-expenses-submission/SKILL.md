---
name: rb-expenses-submission
description: Submit Richmond Blackwood expense, receipt, invoice, tax-payment, reimbursement, or payable evidence into the live Notion Expenses data source with direct Notion receipt attachments, optional Drive archive evidence, and repo pointer updates. Use when the user asks to submit, process, log, route, or upload an expense through the expenses form from a local file, Drive file, Notion attachment, Gmail/WhatsApp attachment, or pasted expense details.
---

# RB Expenses Submission

Use this skill for one-off operator-approved expense submissions and for finance items discovered during a broader follow-through run.

## Required Context

1. Read `skills/rb-file-uploads/SKILL.md`.
2. Read `skills/rb-client-file/SKILL.md` when a client company or individual is involved.
3. Read `skills/rb-common-tasks-follow-through/references/rb-client-database-task-registry.md` for the current Expenses data-source URL and owner rules.
4. Use `skills/rb-common-tasks-follow-through/SKILL.md` instead when the work is part of a multi-source Gmail/WhatsApp follow-through run that needs packet approval.
5. Use `internal/people-roles.md` when an assignee is not explicit.

## Preflight

- Follow the repo git rule before changing repo files or live workspace state: inspect status, pull `origin/main`, and work on a scoped `codex/<task>` branch from a clean base.
- Treat a direct user request such as "submit this via expenses" as approval for the exact live expense write and evidence upload needed for that item.
- Stop and ask when the company/individual owner, amount, currency, due date/payment state, recharge treatment, or destination folder is unclear and cannot be resolved from the source document plus existing Notion/repo records.
- Do not use browser automation for Notion, Drive, Gmail, or other live workspace actions when a connector, API, MCP, or repo helper can support the task.

## Evidence Intake

1. Confirm the file exists or the cloud URL is accessible.
2. Extract enough text/details to identify:
   - addressee or owner;
   - supplier/authority;
   - document date;
   - amount and currency;
   - due date or paid date;
   - invoice/order/tax/payment reference;
   - whether payment is pending, paid, direct debit, or reimbursement.
3. For PDFs, try embedded text extraction first. If the PDF is image-only, render/inspect locally. Do not copy raw credentials, full bank details, full IBANs, card numbers, or certificate material into git.
4. Record SHA-256, filename, file type, and size in repo memory when the evidence is operationally important.

## Entity And Route

Resolve the owner from strongest evidence first:

1. Document addressee or billed party.
2. Existing Notion Company, Individual, Filing Registration, Asset, Contract, Invoicing, or Expense row.
3. Source communication or mailbox routing.
4. Repo client files.

Use exactly one primary owner relation:

- `Company` for company-owned, company-operational, authority, vehicle, office, tax, subscription, or supplier expenses.
- `Individual` for personal expenses, director/shareholder reimbursements, personal-tax evidence, or individual-owned costs.
- Leave both empty only for truly RB-internal/unowned expenses.

If a company client is involved, fetch the Notion Company record and use its exact `Reference` for repo routing under `clients/Companies/<reference>/`. Do not invent client slugs.

Before creating an Expense row, decide whether another operational table owns the item:

- Use `Invoicing` when an active contract or existing invoice/payable row owns the payment.
- Use `Expenses` when no active contract/invoice route applies, including receipts, reimbursements, supplier costs, authority/tax notices submitted as payables, direct-debit notices, and operating expenses.
- For tax payments/prepayments, create or update the primary owning Expense/Task row first, then update tax-payment/prepayment tables only as a byproduct when clearly required.

## Evidence Attachment And Preservation

For `Receipt / Invoice`, prefer a direct Notion-hosted file attachment when a local source file is available:

1. Use the Notion REST File Upload API with the approved `NOTION_ACCESS_TOKEN` stored outside git.
2. For files up to 20 MiB, create a `single_part` file upload with the source filename and MIME type, send the file bytes with multipart form data, then attach the resulting `file_upload` ID to `Receipt / Invoice` before it expires.
3. Patch the Notion `files` property with only the intended current evidence file unless the user asks to preserve multiple visible attachments. Do not leave a Google Drive view in `Receipt / Invoice` when the user requested direct Notion attachment.
4. Fetch the row back and verify the property no longer points at the old external Drive URL.
5. If the Notion File Upload API token or target property access is unavailable, stop and report the blocker rather than using browser automation or silently falling back to Drive when the user asked for direct Notion attachment.

Use Drive as archive evidence or fallback only when direct Notion attachment is unavailable, when the source is already a Drive file, when long-term client archive evidence is required in addition to the Notion attachment, or when the user explicitly asks for Drive:

- Use the existing client Drive folder when known. Do not guess group/external classification or create replacement folder structures.
- Prefer the Google Drive connector when it supports the needed upload or metadata read.
- If generic upload is needed and connector upload is insufficient, use:

```bash
npm run drive:upload -- <local-file> <folder-id> --title "<source-preserving-title>"
```

- The helper must use shared global Codex persona auth and no-login mode unless the user approves a specific reauth. Do not print or store tokens.
- Verify the uploaded file with Drive metadata or the returned `webViewLink`.

## Notion Expenses Row

Fetch the live Expenses page/data source before writing:

- Page: `https://www.notion.so/3a4d858161af4519b42340242cb70351`
- Current data source: `collection://4648c99e-0e6e-4d17-a408-88a08017e5b0`

Search for duplicates before creating a row. Use exact references when available: invoice number, tax number/reference, order ID, supplier, amount, company, and due date. Fetch likely matches and update the existing row instead of duplicating it.

Current field conventions:

- `Description`: concise title with owner/reference and due or paid context.
- `Amount`: gross amount from the source document. If the document is not EUR and the schema has no currency field, write the currency in `Description` and `Comments`.
- `Payment/Due Date (Optional)`: due date for payables, paid date for paid receipts, or document date only when no better date exists.
- `Type`: `Payable` when money still needs payment, payment setup, approval, or processing; `Paid` only when the source shows payment was already made.
- `Status`: `Payment Requested` for finance action/payables; `Review Required` when a human decision is still needed; `Expense Approved` only with explicit approval; `Paid` or `Booked` only with evidence.
- `Is personal expense`: `__YES__` only for personal/director/shareholder reimbursements. Use `Refund To` when the refund recipient is known.
- `Company` or `Individual`: set only the owning relation, normally not both.
- `Assignee`: use explicit instruction, existing row owner, client project owner, established rule, then `internal/people-roles.md`. Routine bookkeeping/payment processing defaults to Simoneta; legal/banking/tax-route decisions default to Johnpaul.
- `Should be charged to`: fill only when recharge/client billing treatment is explicit. Do not infer.
- `Supplier`: link an existing supplier only when confidently resolved. Do not create suppliers casually during a quick expense submission.
- `Receipt / Invoice`: attach the direct Notion `file_upload` reference for local evidence when possible. Use a Drive URL only as archive/fallback or when the source is already a Drive file.
- `Categorisation`: use a short business category, for example `Company vehicle tax / Kraftfahrzeugsteuer`.
- `Comments`: include source summary, reference numbers needed for processing, related operational rows, and unresolved review points. Do not include full bank account details, credentials, or a Drive URL when the receipt is directly attached in Notion.

Connector notes:

- For relation/file properties through the Notion MCP, pass relation values in the format the fetched schema/tool requires and verify fetch-back. Existing successful patterns include JSON arrays of page URLs for relation properties and JSON arrays of Drive URLs for file properties.
- People fields may require the raw Notion user ID on update. If read-back shows the wrong assignee, search the Notion user directory and update the field with the correct user ID.

## Read-Back And Repo Pointers

After writing, fetch the Expense row and verify:

- title/description;
- amount;
- due or paid date;
- `Type`;
- `Status`;
- assignee;
- company or individual relation;
- receipt/evidence attachment;
- any recharge/refund fields used.

Then update repo memory with pointers only:

- `clients/Companies/<reference>/invoices-payments-expenses.md` or `clients/Individuals/<legal-name>/expenses.md`;
- the owning entity `drive-locations.md` when a Drive upload was made;
- the owning entity `source-register.md`;
- `memory/skill-runs.md` for meaningful live submissions.

Do not store raw PDFs, bank details, full IBANs, card numbers, private identifiers, credential files, or token material in git.

## Closeout

Tell the user:

- Expense row URL;
- direct Notion receipt attachment status, and Drive evidence URL only when a Drive upload was used;
- amount, due/paid date, status, and assignee;
- verification performed;
- blockers or fields intentionally left for review.

For repo-changing runs, commit, push, and open/update the PR according to the RB repo workflow, then include branch, PR URL, conflict status, and verification in the final response.
