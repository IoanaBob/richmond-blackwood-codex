# File Upload Operations

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB Drive routing.
Imported: 2026-05-05.
Review: confirm exact RB Drive client group/external classifications before writing or moving client files.

## Purpose

Track durable operating rules for Richmond Blackwood files that need to be stored in Drive, attached to Notion, or referenced from repo memory.

## Standard Process

1. Identify the business context and target record.
2. For client-specific files, fetch the Notion Companies record and use its exact `Reference` for the repo folder.
3. Identify the exact Notion record and file/files property before updating Notion.
4. Confirm the source file exists or the cloud URL is accessible.
5. Record filename, type, size, and SHA-256 in memory when useful for audit.
6. Use RB Drive routing:
   - General archive: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
   - Client documents: existing `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>` tree.
7. If the file is already in Drive/Notion, attach the accessible URL and verify the record.
8. For local binary uploads when connector support is insufficient:
   - Resolve or create the final folder through the Google Drive connector.
   - `npm run drive:upload -- <local-file> <folder-id> --title "<filename>"` only when connector upload is insufficient.
9. For edited Google Docs that need a PDF in Drive:
   - `npm run drive:export-google-doc-to-drive -- <google-doc-id> <folder-id> --pdf-title "<filename>.pdf"`
10. Fetch the target Notion record and verify the intended file property is populated.

## Personal Tax Spreadsheet Templates

Status: approved.
Source: user instruction and native Drive template created on 2026-05-06; German-template pilot approval on 2026-05-06.
Imported: 2026-05-06.
Review: approved as the active German personal-tax spreadsheet workflow; final SKR04/tax treatment still requires professional review before filing.

Future German personal-tax analyses should start from the native Google Sheets template `RB German Personal Tax Analysis - Machine-Readable Template v1`:

- `https://docs.google.com/spreadsheets/d/1IYPZEdaigNLuEya2aPGBZwxVGX_eWr4LuHfUlmPdOJc/edit`

Active rules:

- Treat the live native Google Sheet as the maintained template source of truth. Copy that existing spreadsheet into the filing folder through the Google Drive/Sheets connector; do not regenerate the template from a local TypeScript or XLSX builder.
- Use raw bank and investment export tabs with one header row, frozen row 1 only, filters enabled, and compact widths/heights.
- Use `Revenue` for payroll, employment income, invoices, and other income evidence. Link payroll runs, payslips, invoices, and source records. Keep `Net Paid EUR` as the formula-driven EUR output and preserve source-currency detail in `Original Amount`, `Original Currency`, `FX Rate To EUR`, and `FX Date`.
- Use `Expenses` for personal deductions and expenses when no bank extract is available. If a bank extract is available, raw bank tabs remain source of truth. Keep `Amount EUR` as the formula-driven EUR output and preserve source-currency detail in `Original Amount`, `Original Currency`, `FX Rate To EUR`, and `FX Date`.
- Keep bank statements and investment statements as the source of truth. Do not hardcode derived categorisation, reconciliation, PNL, balance sheet, checks, or missing-info outputs.
- Drive summaries through formulas reading revenue rows, expense rows, raw export tabs, invoice/evidence register, investment lots, `FX Rates`, category rules, and journal rows.
- Place high-level review tabs first and helper tables such as `Category Rules` and `FX Rates` at the end.
- In `Tax Analysis`, show business/freelance total income and total expenses as separate lines, then calculate business/freelance net PNL as income less expenses.
- Cap the employee lump-sum baseline against gross employment income; for no-employment cases it should remain visible as a statutory baseline in `Deductibles` but contribute EUR 0 in `Tax Analysis`.
- For self-employed/freelance cases, use the business/EÜR home-office daily route (`home-office-daily-business`, group `business-betriebsausgaben`) rather than the employment `Anlage N` route. Show potential EUR 6/day capped at EUR 1,260, but do not include it until the qualifying business home-office day count is confirmed. If full-year home-office except business travel is approved, calculate units from tax-year days less unique `Expenses` rows categorised as `business-travel`, with the cap still limiting the included amount.
- Use `Category Rules` for SKR04 account number, account name, PNL/balance-sheet mapping, tax treatment, invoice requirement, VAT treatment, and review notes.
- Enforce double-entry through `Journal` and `Checks`; every generated transaction should net to zero and failed checks must surface in `Checks` and `Missing Info`.
- Link opening balance sheets to prior-year closing balances where available. If unavailable, use an explicit provisional opening balance plug and label it clearly.
- Track private pension explicitly as a German personal deduction. Do not bury it inside generic expenses.
- For expenses and investments, check Notion and Drive first. If the client confirmed none, record that in `Setup`; otherwise prepare an evidence request and ask for permission before sending.

The earlier rule to create future spreadsheet updates in separate `codex - [sheet name] - [update date]` tabs is superseded for personal-tax workflows. Historical Nathan/VUN Codex tabs remain audit trail only.

## Boundaries

- Do not infer missing Drive destinations.
- Do not upload into arbitrary personal Drive folders.
- Do not commit live credentials, private keys, certificate bundles, credential exports, or unsafe secret material.
- Client backup/export files belong in Drive. Git keeps pointers, source registers, and blockers only. External delivery is a separate offboarding/handover task and must only happen when the user explicitly asks.
