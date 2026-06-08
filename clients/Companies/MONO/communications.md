# Communications

Status: provisional.
Source: Notion company/communication records, WhatsApp MCP route/read, Gmail connector search/read, and user instruction on 2026-06-07.
Imported: 2026-06-07.
Review: Confirm whether WhatsApp remains the preferred operational route for all MONO company-side work and whether any product-only channels should be tracked separately.

Notion communication records should link to this company only when the communication is company/client-operational. Personal tax, personal KYC, personal identity, individual bank account, individual asset, or individual expense communications should link to the relevant individual instead.

## Communication Routes

| Route | Value | Status | Source | Imported | Review |
| --- | --- | --- | --- | --- | --- |
| Notion communication preference | WhatsApp | provisional | Notion company `https://www.notion.so/7d2d1876a3024ee0a3e5a3d1825485e0` | 2026-06-07 | Confirm if product launch/project communication uses the same route or a separate internal channel. |
| Company email | `accounts+mono@richmondblackwood.com` | provisional | Notion company record | 2026-06-07 | Old company email was noted as `hi@monochromatic.io`; Gmail still receives vendor mail at older MONO addresses. |
| Accounting email send route | Richmond Blackwood accounting email | provisional | Gmail connector read of historical sends | 2026-06-07 | Future emails should follow current contract/business-partner fields and show sender approval before sending. |

## WhatsApp Chat IDs

Saved WhatsApp IDs are route/source pointers only. They are not approval to monitor, backfill history, download media, or send messages.

| Contact / label | WhatsApp chat ID | Status | Source | Imported | Review |
| --- | --- | --- | --- | --- | --- |
| Monochromatic \| Richmond Blackwood | `120363405249757858@g.us` | provisional | Common-tasks WhatsApp roster; WhatsApp MCP `get_chat` and recent message read on 2026-06-07 | 2026-06-07 | Preferred company-operational group appears correct; no monitoring or sends are approved by this pointer alone. |

## Recent Communication Context

| Date / window | Channel | Summary | Source | Review |
| --- | --- | --- | --- | --- |
| 2026-05-01 to 2026-05-21 | WhatsApp group | Recent messages are mainly invoice/payment processing: Andrei asks whether invoices/payments are processed, RB confirms processing or asks for approval, and approvals are given in the group. Raw messages, media, and payment details were not stored. | WhatsApp MCP `list_messages` on `120363405249757858@g.us` | Use this as routing/process context only; fetch specific message/media only if needed for an action. |
| 2026-05-20 | Notion Communication | MONO/EIP/Arutur invoice payment processing confirmation, with recovered invoice evidence and linked tasks. | `https://app.notion.com/p/367e4130131481a59ccae87c32270fae` | Existing Notion row is the source of truth for this communication. |
| 2025-12-11 | Notion Communication | Revenue letter / VAT repayment and returns-outstanding/current-estimates context. | `https://app.notion.com/p/2c6e4130131480b3bc4bd8f6ebc62b08` | Relevant to VAT/RTD/VIES filing status reconciliation. |
| 2026-05 to 2026-06 | Gmail connector | Gmail search/read found Workhub mail and payment notices, Google Workspace invoice, Framer and Magnific vendor invoices, and external MONO invoice sends/corrections. | Gmail connector read on 2026-06-07 | Do not store portal tokens, payment profile IDs, card fragments, attachment IDs, or full email bodies in git. |

## Client Notes & Updates

Existing Notion page: `Codex provisional import - Monochromatic` / `https://app.notion.com/p/356e4130131481ae908df5ad201b9082`.

That page is an internal provisional import from 2026-05-04 and points to the old lowercase repo path `clients/monochromatic/`. This canonical import uses `clients/Companies/MONO/`. No Notion write-back was performed in this pass.
