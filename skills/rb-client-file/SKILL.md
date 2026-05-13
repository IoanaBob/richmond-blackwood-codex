---
name: rb-client-file
description: Route unsanitised Richmond Blackwood client knowledge into per-client folders with Notion and Drive backup tracking.
---

# RB Client File

Use this whenever source context contains private client-specific information.

## Required Files

Use the pattern in `clients/Companies/_template/`.

## Routing

- Before creating a client folder, fetch the Notion Companies record and use its exact `Reference` value.
- Do not invent slugs from legal names.
- History and chronology: `history.md`.
- People, contacts, and linked individuals: `linked-individuals.md`.
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

Use Notion first for long-lived operational records that need frequent access and fit an existing table: company information, individual information, contracts, employment, payslips, invoices, expenses, correspondence, tasks, and filings.

Use Client Notes & Updates for important client-facing information or updates that should be communicated or visible to the client. Do not use it as a generic Codex repo-summary backup when the content is only internal routing or working memory.

Use Drive for source documents and evidence that do not fit cleanly in Notion or do not need frequent operational access. In git, record only pointers, routing notes, and blockers.

## Entity Ownership

Communications, bank accounts, assets, and expenses should belong to either a company or an individual, not both.

- Use the company relation for company-owned or company-operational records.
- Use the individual relation for personal or individual-owned records.
- If a record is discovered through one entity but belongs to the other, attach it to the owning entity and keep only a pointer in the other entity's repo file when useful.

## Closeout

When a client backfill or history refresh changes repo files, send a Slack closeout to `#rb-client-updates` with:

- Only what was added in Notion.
- Only what was modified in Notion.
- Named hyperlinks for Notion pages/records that were actually added or modified.
- Row-level sub-items for any Notion database rows actually added or modified.
- Human-readable page/database names; avoid repo paths unless the audience needs implementation detail.
- Blockers or follow-up review points.

Do not list Notion source records that were only read as if they were added or modified.

When reviewing or creating Notion tasks during the backfill, add task comments that explain the review decision, split, blocker, or next action so progress is visible inside Notion.

When a follow-up requires Richmond Blackwood action, create it in the Notion Tasks database and link it to the relevant company project. In this repository, use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required. Assign it to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`.

When creating connected follow-up tasks, set the follow-up task's `Dependent on` relation to the initial task whenever the follow-up cannot start until the initial task is complete. Use the initial task's `Is blocking` relation only when that direction is clearer in the existing workflow.

Before including a blocker in Slack, try to resolve it twice using distinct methods or queries. If it remains unresolved, phrase it in plain business language rather than exposing connector/helper errors.

Record the sent message or logging blocker using the communications process.
