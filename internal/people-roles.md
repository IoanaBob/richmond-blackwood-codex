# People And Roles

Status: provisional.
Imported: 2026-05-04.
Sources: local RB memory files, Notion schema.

## Provisional Context

Ioana appears in prior memory as connected to RB as presenter, signatory, or managing director in some documents. Final public and operational title wording needs review before approval.

The Notion Companies schema includes people fields for operational approval, compliance approval, review of initial KYB and AML, directors, employees, shareholders, UBOs, and related individuals.

## Active Operator Registry

Status: provisional.
Source: user instruction in Codex chat, existing Notion user IDs in this file, and repo search for approved sender rules.
Imported: 2026-05-24.
Review: confirm the valid RB operator list and each person's approved work email addresses.

Use `RB_CODEX_ACTOR` only for the active human operator in a local Codex run. The value must be a human name from this registry, for example `RB_CODEX_ACTOR="Ioana Surdu-Bob"`. Do not use a shared service mailbox such as `accounting@richmondblackwood.com` as an actor.

The active operator is separate from task assignment, source mailbox access, and email sending identity. A Gmail job may read from a shared mailbox or a personal/operator mailbox, and an approved send may use `accounting@richmondblackwood.com`, without changing the human operator.

| Operator name | Notion user ID | Known work email address | Status | Notes |
| --- | --- | --- | --- | --- |
| Ioana Surdu-Bob | `3a46f87a-9bc2-408f-baff-b4c23326e0f2` | Needs confirmation | provisional | Valid active operator. Also default owner for sales, software/product, technical, structuring, and strategic client requests. |
| Johnpaul Okolie | `b85bb822-968a-4f79-809a-5ee2f3e6d828` | `johnpaul.okolie@richmondblackwood.com` | provisional | Valid active operator. Email appears in prior Gmail-search memory and should be confirmed before treating it as an approved sender. |
| Simoneta Vicente | `b5e3ee56-b550-4959-8ec2-301d6e69e111` | Needs confirmation | provisional | Valid active operator. Default owner for bookkeeping, routine document requests, and general operational follow-up. |

If `RB_CODEX_ACTOR` is missing or invalid, continue generic repo/client work when no human-operator identity is needed. Stop and ask for the active operator before operator-specific approval, authorship, source-access attribution, or per-operator closeout work.

Shared mailboxes:

| Mailbox | Role | Actor? | Notes |
| --- | --- | --- | --- |
| `accounting@richmondblackwood.com` | Shared RB accounting/client-facing sender and Gmail source when explicitly in scope. | No | Use as `Source mailbox` or `From`, never as `RB_CODEX_ACTOR`. Default client-facing sender remains `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`. |

## Inbound Responsibility Defaults

Status: provisional.
Source: user instruction in Codex chat.
Imported: 2026-05-05.
Review: confirm assignment defaults with the team before approving automation.

Use these defaults when creating client-inbound tasks from WhatsApp, Gmail, or similar correspondence workflows:

| Area | Default assignee | Notion user ID | Notes |
| --- | --- | --- | --- |
| Legal and banking | Johnpaul Okolie | `b85bb822-968a-4f79-809a-5ee2f3e6d828` | Use for legal notices, banking access, KYC/AML, bank account, and authority-facing issues unless another owner is clearer. |
| Bookkeeping and general client queries | Simoneta Vicente | `b5e3ee56-b550-4959-8ec2-301d6e69e111` | Use for bookkeeping, routine document requests, general operational follow-up, and unclassified inbound requests. |
| Sales, software engineering, product, and structuring | Ioana Surdu-Bob | `3a46f87a-9bc2-408f-baff-b4c23326e0f2` | Use for sales, software/product, technical, structuring, and strategic client requests. |

Edge-case owner rules:

- Legal contract/counterparty/VAT-route decisions are Johnpaul-owned unless the operator explicitly assigns another legal owner.
- TK/private-health-insurance/social-insurance transition tasks are Johnpaul-owned when Simoneta is not onboarded on the task.

## Review Needed

- Confirm Ioana's official RB role/title for public site, contracts, authority documents, and internal process docs.
- Confirm current process owners for accounting, payroll, VAT, filings, authority liaison, and client communications.
