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
- Optional local WhatsApp MCP for user-controlled WhatsApp reads/sends/media once explicitly enabled.

## Workspace Actor And Mailbox Routing

Status: provisional.
Source: user instruction in Codex chat and current RB communication-helper rules.
Imported: 2026-05-24.
Review: confirm valid RB operator names, approved operator work email addresses, and any non-accounting sender identities.

`RB_WORKSPACE_ACTOR` identifies the active human workspace actor for a Codex run. The value is a human name from `internal/people-roles.md`, for example `Ioana Surdu-Bob`. It is used when operator-specific approval, authorship, source-access attribution, Notion assignment, Slack/WhatsApp routing attribution, or closeout context matters. `RB_CODEX_ACTOR` is a legacy compatibility alias for the same value.

Shared service mailboxes are not actors. `accounting@richmondblackwood.com` is the shared RB accounting/client-facing service mailbox and default client-facing sender:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

Gmail source mailbox and Gmail sending identity are per-job fields, not actor fields. Every Gmail job, packet, or preview should record:

- `Operator`: human workspace actor from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR` when operator-specific context is needed.
- `Source mailbox(es)`: exact mailbox(es) searched/read, such as `accounting@richmondblackwood.com` or a named operator mailbox.
- `From`: exact sender for drafts, sends, and replies.
- `Thread/source`: Gmail thread/message ID, Gmail link, or source summary.

Do not assume all Gmail reads come from accounting. A day can include jobs reading `accounting@richmondblackwood.com` and jobs reading personal/operator mailboxes, provided each source is explicitly scoped and labelled. Do not infer the `From` sender from the operator; confirm or use the workflow default.

Ioana RB send-as signature:

- Status: approved.
- Source: user instruction in Codex chat on 2026-06-10 and Gmail settings read-back for `ioana@richmondblackwood.com`.
- Imported: 2026-06-10.
- Review: re-read Gmail settings if the user says the saved signature changed.

When the exact approved Gmail sender is `ioana@richmondblackwood.com`, use Ioana's saved Gmail signature `ioana general`, not a manual `Best, Ioana` or typed-name-only signoff. Plain-text equivalent for review: Ioana Surdu-Bob / Partner / Richmond Blackwood Limited / Office 2, 12a Lower Main Street, Lucan Co Dublin, K78 X5P8, Ireland / +353 1 230 8051 / `ioana@richmondblackwood.com` / `www.richmondblackwood.com`.

## Google Auth And Personas

Status: provisional.
Source: user instruction in Codex chat and personal-codex global persona auth model.
Imported: 2026-05-25.
Review: confirm which RB-specific persona slugs are credentialed and approved.

Google personas are credential routes for helper access to Gmail, Drive, and Calendar. They are separate from:

- `RB_WORKSPACE_ACTOR`: active human workspace actor, with `RB_CODEX_ACTOR` as a legacy alias.
- `Source mailbox(es)`: Gmail mailbox searched/read.
- `From`: exact Gmail send-as identity.

Durable Google auth state belongs under shared global Codex storage, not this worktree:

```text
~/.codex/google-personas/<persona-slug>/
~/.codex/google-oauth-client.richmondblackwood.json
```

Routine helpers should run in no-login/no-reauth mode and try the per-persona OAuth vault before saved ADC/account-token fallback. Interactive OAuth reconnect requires exact user approval for the persona/action.

## Data Boundary

Secrets and credentials may be referenced by name but must not be committed. `.env`, `.env.*`, node modules, and `.codex-local/` are ignored. Global Google persona vault files under `~/.codex` must not be printed or copied into git. WhatsApp QR/session state, SQLite databases, downloaded media, and transcripts must also stay out of git.

## Review Needed

- Confirm active production systems and owners.
- Confirm whether backend integrations are all live or partly historical.
- Confirm where current operational runbooks live in Notion.
- Confirm whether optional WhatsApp MCP should be enabled and which account/number should be linked.
