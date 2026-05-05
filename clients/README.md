# Client History

Status: provisional.

This directory is the unsanitised client-specific memory area. Do not repeat private client detail in broad docs. Link here instead.

## Client Reference Standard

Client folders must use the value in Notion Companies -> `Reference`.

Do not invent slugs from company names. The reference is also used in Drive files and client projects, so it is the stable join key across systems.

For now this rule applies to company clients only, because each client has a company record.

Active reviewed pilot:

- `clients/VUN/` for VANDY UN LIMITED.

Earlier provisional name-derived folders remain pending explicit deletion review because the broad delete was blocked by the sandbox safety reviewer.

## Folder Pattern

Each client folder should follow:

```text
clients/<client-reference>/
  README.md
  history.md
  source-register.md
  notion-backup.md
  drive-locations.md
  people-and-contacts.md
  contracts-and-authority.md
  accounting-bookkeeping-payroll.md
  tax-vat-filings.md
  invoices-payments-expenses.md
  communications.md
  client-project.md
  personal-tax-returns.md
  Client export - <client-reference>/
  open-questions.md
```

Personal tax files are included when the company-linked individual has personal tax filings associated with the client.

## Backup Rule

Every client folder must have:

- A Notion backup target or blocker in `notion-backup.md`.
- A Drive destination or blocker in `drive-locations.md`.
- Source pointers in `source-register.md`.
- Any private fact marked provisional until reviewed.

## Client Export Packages

Key client export/offboarding packages should live inside each client folder as:

```text
clients/<client-reference>/Client export - <client-reference>/
```

These folders are allowed to contain actual downloaded/exported client files, not only pointers. They must include `export-manifest.json` and `download-log.md`.

Do not store live credentials, private keys, tokens, certificate bundles, or credential exports in a client export package.
