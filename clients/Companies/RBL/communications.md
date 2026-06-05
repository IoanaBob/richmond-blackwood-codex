# Communications

Status: provisional.
Source: Notion company record, internal RB communication rules, and user instruction on 2026-06-03.
Imported: 2026-06-03.
Review: Confirm RBL-specific Slack/channel routing if a future workflow needs a concrete channel or message thread.

## Routing

RBL is the internal Richmond Blackwood operating company. No client WhatsApp route was used or stored in this import.

Use Notion, internal Slack, Gmail/accounting email, and RB Client Databases as the normal source routes for RBL work. If a future export/backfill uses WhatsApp for an RBL-specific route, resolve the chat through the repo-pinned WhatsApp MCP and store only the selected JID as a route/source pointer.

## Email And Internal Channels

| Route | Source | Notes |
| --- | --- | --- |
| `invoices@richmondblackwood.com` | Notion company record | Company email on the RBL company page. |
| `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` | Repo communication rules | Default client-facing email sender for approved outgoing accounting/client emails. |
| `accounting@richmondblackwood.com` | Repo communication rules | Shared source/sender mailbox when explicitly scoped; not a human actor. |
| Internal Slack | User/repo operating context | Use for internal RBL coordination when a specific channel/thread is identified. |

## Outbound Boundary

Do not create Gmail, Slack, WhatsApp, or Notion drafts unless the user explicitly asks for that exception.

For future email previews, show:

- exact `From` display name and email address;
- `Subject`;
- source mailbox and source/reply thread;
- recipient and CC route.

Prefer replying in the existing email thread when source context exists. After approval and send, log the sent communication in canonical Communications: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`.
