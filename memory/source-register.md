# Memory Source Register

Status: provisional.
Imported: 2026-05-04.

This is the high-level source map. Detailed imports live in [sources/import-log.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/sources/import-log.md).

| Source | Type | Status | Notes |
| --- | --- | --- | --- |
| `my-memory/memory/companies/richmond-blackwood` | Local repo | Imported partially | Company profile, services, systems, communications, strategy, open questions. |
| `richmond-blackwood-landing` | Local repo | Imported partially | Public landing app, lead form, HubSpot, DatoCMS, Stripe/API flows. |
| `richmond_blackwood_backend` | Local repo | Imported partially | Rails API, lead/company/accounting integrations, document ingestion. |
| `everguard-research-codex` | Local repo | Neutral operating infrastructure ported | Source for reusable helper/process/skill patterns and optional WhatsApp MCP setup; company-specific workflows excluded. |
| RB Internal Knowledge Base | Notion | Schema fetched | General SOP/process backup target. |
| Client Databases | Notion | Hub and schemas fetched | Client Notes & Updates and Companies schemas fetched. |
| RB Slack channels | Slack | Searched partially | Channel names and sample operational themes recorded. |
| Gmail RB/accounting searches | Gmail | Searched partially | Client accounting/invoice threads recorded in relevant client folders where specific. |
| Google Drive RB searches | Drive | Searched partially | Finance/accounting documents and archive target observed; client folder routing pending review. |
| `www.richmondblackwood.com` | Public website | Public source identified | Direct extraction was limited by JS rendering; local landing repo provided source context. |

## Source Priority

When sources conflict:

1. User instruction in current conversation.
2. Approved Notion data or explicit approval in `memory/decisions.md`.
3. Current local production repos.
4. Current Slack/Gmail/Drive evidence.
5. Prior local memory.
6. Public web sources.
