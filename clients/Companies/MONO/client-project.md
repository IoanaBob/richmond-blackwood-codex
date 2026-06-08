# Client Project

Status: provisional.
Source: Notion MONO client project, Notion product project, Notion company record, and targeted Notion task searches/fetches on 2026-06-07.
Imported: 2026-06-07.
Review: Reconcile project `Companies` relation mismatch before relying on project-company rollups.

## Main Client Project

| Field | Value |
| --- | --- |
| Project | MONO - Monochromatic - Client Project |
| Project URL | `https://app.notion.com/p/32fe41301314808f9e21c973b262e925` |
| Project ID | PROJ-205 |
| Status | In Progress |
| Owner | Ioana, per Notion user relation |
| Parent project | `https://app.notion.com/p/327e4130131480ceb3f9d757a8286559` |

## Project Data-Quality Issue

The MONO company record points to the MONO client project, but the MONO client project's `Companies` relation points to a Project Management company page titled `Richmond Blackwood` (`https://app.notion.com/p/2d9e4130131480e68232ce1b2c7c313b`) rather than the Client Databases MONO company record. Treat project-company rollups as unreliable until this is fixed or explained.

## Active Task Pointers

| Task / project | Status | Source | Notes |
| --- | --- | --- | --- |
| Monochromatic now VAT registered - change all internal invoices to add VAT | To Do | `https://app.notion.com/p/332e4130131481f88e7ce69725f1dbd5` | Bookkeeping task; change internal automatic invoices to include VAT for regular MONO/group transactions. |
| [By-monthly] Monochromatic Ltd VAT Filing | To Do | `https://app.notion.com/p/332e4130131481478688ee4c424f650d` | Accounting task; review Xero bookkeeping, booked expenses, and filing evidence. |
| MONO duplicate annual VAT task | Archived | `https://app.notion.com/p/373e4130131481b1ad0bdc26d0024d12` | Archived as superseded by consolidated RB Clients VAT task, but consolidated checklist does not include MONO. |
| File annual VAT for affected RB clients | To Do | `https://app.notion.com/p/373e4130131481e495f1e2d22008e4ed` | Consolidated task; verify if MONO should be included or if it was intentionally excluded. |

## Product Project

| Field | Value |
| --- | --- |
| Project | Monochromatic Coloring Book Go-To-Market |
| Project URL | `https://app.notion.com/p/373e413013148095b29ed5d55cb28dfa` |
| Project ID | PROJ-271 |
| Status | In Progress |
| Parent project | `https://app.notion.com/p/335e4130131480bd8a73cdd2167cd2cc` |

Operating summary for the coloring-book project:

- Launch product: personalized hardcover coloring book from exactly 30 customer photos.
- Format: Gelato hardcover photo book, 21 x 28 cm.
- Launch geographies: Germany and USA.
- Pricing under review: EUR 59 standard, EUR 69 priority, optional 25% launch discount if margins allow.
- Positioning: design-led keepsake reviewed by real Monochromatic designers; avoid making `AI generator` the customer-facing headline.
- Workflow: customer uploads photos, pays, receives PDF draft by email, approves before print, then Gelato fulfillment.
- Privacy/rights requirements: limited processing for fulfillment/support, no sale/reuse/model-training/marketing use of customer photos without direct approval.

Open product decisions include final product/sub-brand name, whether `color.monochromatic.io` is the launch subdomain, final Figma-derived text fields, revision policy, priority guarantee after Gelato timing test, launch discount mechanics, acceptable gross margin, and product mockup/sample assets.
