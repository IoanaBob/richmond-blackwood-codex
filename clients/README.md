# Client History

Status: provisional.

This directory is the unsanitised client-specific memory area. Do not repeat private client detail in broad docs. Link here instead.

Client records are split into company and individual roots:

- Company clients: `clients/Companies/<client-reference>/`
- Individual clients/people: `clients/Individuals/<legal-name>/`

## Client Reference Standard

Company client folders must use the value in Notion Companies -> `Reference`.

Do not invent slugs from company names. The reference is also used in Drive files and client projects, so it is the stable join key across systems.

Active company pilot:

- `clients/Companies/VUN/` for VANDY UN LIMITED.

Active individual pilot:

- `clients/Individuals/Nathan Mawali A Vandy/` for Nathan Mawali A Vandy.

Templates:

- Company template: `clients/Companies/_template/`.
- Individual template: `clients/Individuals/_template/`.

Earlier flat client folders are superseded by this company/individual split.

## Company Folder Pattern

Each company client folder should follow:

```text
clients/Companies/<client-reference>/
  README.md
  history.md
  source-register.md
  notion-backup.md
  drive-locations.md
  backup-locations.md
  linked-individuals.md
  people-and-contacts.md
  contracts-and-authority.md
  accounting-bookkeeping-payroll.md
  tax-vat-filings.md
  invoices-payments-expenses.md
  communications.md
  client-project.md
  processes/
    README.md
    process-overrides.md
  skills/
    README.md
  Client export - <client-reference>/
  open-questions.md
```

Personal tax files belong in the relevant individual folder when the company-linked individual has personal tax filings associated with the client. The company folder should point to that individual file instead of duplicating full private detail.

## Individual Folder Pattern

Each individual client/person folder should follow:

```text
clients/Individuals/<legal-name>/
  README.md
  linked-companies.md
  linked-entities.md
  notes-and-updates.md
  communications.md
  correspondence.md
  drive-locations.md
  bank-accounts.md
  tax-filings.md
  personal-tax-returns.md
  assets.md
  expenses.md
  source-register.md
  open-questions.md
```

The folder name should use the legal name as recorded in Notion. If the Notion legal name includes middle names or initials, keep them unless the user approves a shorter folder name.

## Backup Rule

Every company client folder must have:

- A Notion backup target or blocker in `notion-backup.md`.
- A Drive destination or blocker in `drive-locations.md`.
- A structured individual relationship map in `linked-individuals.md` when any person is a director, UBO, shareholder, POC, payroll employee, personal-tax client, or personal-service client.
- Source pointers in `source-register.md`.
- Any private fact marked provisional until reviewed.

Every individual folder must have:

- A linked company pointer in `README.md` when the individual is tied to a company relationship.
- A structured company relationship map in `linked-companies.md`.
- A structured linked-entity routing map in `linked-entities.md` for bank accounts, tax filings, assets, correspondence, and expenses.
- Source pointers in `source-register.md`.
- Open questions in `open-questions.md`.
- Any private fact marked provisional until reviewed.

## Company And Individual Linking

When Richmond Blackwood serves a company and also serves a connected individual personally, such as for personal tax returns:

1. Keep the company client under `clients/Companies/<client-reference>/`.
2. Keep the individual under `clients/Individuals/<legal-name>/`.
3. Add the person to the company `linked-individuals.md`.
4. Add the company to the individual `linked-companies.md`.
5. Route personal correspondence, personal tax, individual KYC, personal identifiers, personal assets, personal tax payments/prepayments, and individual insolvency/solvency context to the individual folder.
6. Keep only pointers in the company folder unless the detail is genuinely company-level.

Individual-linked entities should land in these files:

- Bank accounts: `bank-accounts.md`.
- Tax filings: `tax-filings.md`, with return-level detail in `personal-tax-returns.md` when needed.
- Assets: `assets.md`.
- Correspondence: `correspondence.md`.
- Expenses: `expenses.md`.

When correspondence is linked to the wrong entity in Notion, correct Notion too:

- Individual correspondence linked to a company: add the individual relation, then remove the company relation.
- Company correspondence linked to an individual: add the company relation, then remove the individual relation.
- Genuinely shared correspondence can keep both relations, but the reason must be documented.

## Client Backup Packages

Recurring client backup packages should live inside each company client folder as:

```text
clients/Companies/<client-reference>/Client export - <client-reference>/
```

These folders are allowed to contain actual downloaded/exported client files, not only pointers. They must include `backup-manifest.json` and `download-log.md`.

Do not store live credentials, private keys, tokens, certificate bundles, or credential exports in a client backup package.
