---
name: rb-client-file
description: Route unsanitised Richmond Blackwood client knowledge into per-client folders with Notion and Drive backup tracking.
---

# RB Client File

Use this whenever source context contains private client-specific information.

## Required Files

Use the pattern in `clients/_template/`.

## Routing

- Before creating a client folder, fetch the Notion Companies record and use its exact `Reference` value.
- Do not invent slugs from legal names.
- History and chronology: `history.md`.
- People and contacts: `people-and-contacts.md`.
- Contracts and authority: `contracts-and-authority.md`.
- Accounting, bookkeeping, payroll: `accounting-bookkeeping-payroll.md`.
- Tax, VAT, filings: `tax-vat-filings.md`.
- Invoices, payments, expenses: `invoices-payments-expenses.md`.
- Emails, Slack, calls: `communications.md`.
- Client project context: `client-project.md`.
- Personal tax returns linked to the company client: `personal-tax-returns.md`.
- Sources: `source-register.md`.
- Notion target or blocker: `notion-backup.md`.
- Drive target or blocker: `drive-locations.md`.

## External Backup

Do not create Notion or Drive client entries when the company relation, target database, or group/external folder is unclear.
