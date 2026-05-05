# Systems And Data

Status: provisional.
Imported: 2026-05-04.
Sources: local `richmond-blackwood-landing`, local `richmond_blackwood_backend`, `my-memory` RB files, Slack/Gmail/Drive search summaries.

## Local Repositories

`richmond-blackwood-landing`:

- Next.js / React Native web landing application.
- Uses DatoCMS for content.
- Includes lead generation form, HubSpot booking embed, and Stripe product/price flows.
- Calls an RB backend API for lead creation, update, and order creation.

`richmond_blackwood_backend`:

- Rails API.
- Includes authentication, lead management, HubSpot webhook, QuickBooks auth, company expense documents, admin leads/documents/companies, payment and order flows.
- Models observed include Company, Lead, LeadCalculation, Document, WiseLexofficeSync, Lexoffice/Wise/Invoice/User-related objects.
- Company model connects invoice email, expense document ingestion, QuickBooks/Lexoffice/Wise, invoices, Stripe customer/payment method, and Mailjet parseroute behavior.

## Operational Tools

Provisional tools and systems observed:

- HubSpot for leads, deals, bookings, and webhook sync.
- DatoCMS for landing content.
- Stripe for payment flow.
- Xero and Lexoffice for accounting contexts.
- Wise and QuickBooks integrations in backend code.
- Mailjet parseroute and invoice ingestion.
- Dropscan referenced in cost/tooling memory.
- Slack channels for RB operations, calls, structuring, accounting/finance, and management.
- Gmail threads for accounting and invoice operations.
- Notion Client Databases and Internal Knowledge Base for process and client data.
- Google Drive for source documents and finance/accounting folders.

## Data Boundary

Secrets and credentials may be referenced by name but must not be committed. `.env`, `.env.*`, node modules, and `.codex-local/` are ignored.

## Review Needed

- Confirm active production systems and owners.
- Confirm whether backend integrations are all live or partly historical.
- Confirm where current operational runbooks live in Notion.
