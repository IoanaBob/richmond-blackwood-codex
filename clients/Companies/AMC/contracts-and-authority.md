# Contracts And Authority

Status: provisional.
Source: Notion company, employment, and contract records; WhatsApp invoice discussions; Gmail sent invoice messages reviewed on 2026-05-18.
Imported: 2026-05-18.
Review: Riot and Echo Business Partner invoice-to/CC fields were updated on 2026-05-18. Notion contract comments were also added; keep using comments/notes for routing details the single-email fields cannot express.

## Authority And Governance

Aaron Richard Chamberlain is listed in Notion as AMC's director, UBO, shareholder, and employee. Richmond Blackwood Limited is listed as company secretary.

Employment record: `https://www.notion.so/198e4130131480aba2c3d68f3f33ad80`.

## Active / Current Revenue Contracts

| Contract | Status | Client/counterparty | Currency | Frequency | Source | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Riot Games | Active | Riot Games Services GmbH | EUR | Monthly | `https://www.notion.so/1a1e4130131480b9859de06e1ffc98e9` | Variable monthly billing. Notion says Aaron needs to tell RB what to bill. WhatsApp confirms RB asks Aaron for the period's services and expense/travel details, prepares invoice(s), gets Aaron approval, then sends where needed. |
| Echo Sports LLC | Active | Echo Sports LLC / Echo Esports | EUR | One-off / on-off | `https://www.notion.so/246e4130131480aa9b05cb0b9adb2f96` | Client lets RB know when a new invoice is needed. Expense support can include flights, Uber, and per diem; aggregate totals rather than line-iteming every receipt unless required. |
| AMC -> UVS Games LLC | Active | UVS Games LLC | EUR with USD note | One-off | `https://www.notion.so/349e41301314809a805ad295f9ad2e05` | One-off April 2026 event. Aaron sent the invoice himself; use EUR with USD conversion note if compliance requires both. |

## Historical / One-Off Contracts

| Contract | Counterparty | Currency | Frequency | Source | Notes |
| --- | --- | --- | --- | --- | --- |
| RedBull | RED BULL MEDIA HOUSE GMBH | EUR | One-off | `https://www.notion.so/1a1e4130131480ab9d8eed7adf18f0b7` | Production for Red Bull Faster 2025. |
| Echo | Echo Esports LLC | USD | One-off | `https://www.notion.so/1a1e4130131480a58d40c90e5c6be314` | Earlier Echo contract with invoice relation. |

## Invoice Authority Rule

AMC is not a fixed-equal-month billing client. Aaron may have different work and travel costs each month. The general rule is:

1. Ask Aaron what should be invoiced for the period and which client/counterparty should receive it.
2. Include exact work description, rate, travel, per diem, and expense totals from Aaron's instructions and supporting invoices/receipts.
3. Prepare the invoice and send the PDF/preview to Aaron for approval.
4. After Aaron approves, send from the accounting email using the Business Partner invoice-to/CC fields plus any Business Partner notes needed to preserve the last sent pattern.
5. Store the invoice in the contract-linked invoice record and attach/support expense evidence in Drive or Notion, not git.

This rule should live on the actual contract records too if the contract record lacks the message template or invoice instructions.

## Notion Contract Comments Added

Status: provisional.
Source: Notion comments added by Codex on 2026-05-18.
Imported: 2026-05-18.
Review: Comments make the workflow and message templates visible on the live contract records. Riot and Echo Business Partner email/CC fields were updated separately on 2026-05-18; the Riot Nicole recipient remains in Business Partner notes because the current schema has only one invoice email and one CC email.

| Contract | Notion record | Comment added |
| --- | --- | --- |
| Riot Games | `https://www.notion.so/1a1e4130131480b9859de06e1ffc98e9` | Variable-billing workflow, Aaron approval step, accounting sender, Riot subject/body template, and note to follow the last invoice recipient pattern. |
| Echo Sports LLC | `https://www.notion.so/246e4130131480aa9b05cb0b9adb2f96` | On-off billing workflow, travel/per diem/Uber aggregation rule, accounting sender, Echo template and USD/EUR note. |
| AMC -> UVS Games LLC | `https://www.notion.so/349e41301314809a805ad295f9ad2e05` | One-off handling, Aaron-sends-vs-RB-sends check, and EUR/USD note. |

## Business Partner Routing Updates

Status: provisional.
Source: Business Partner schema/readback and user answer on 2026-05-18.
Imported: 2026-05-18.
Review: If Notion later adds multi-recipient invoice fields, migrate Riot's Nicole recipient out of notes.

| Business Partner | Record | Structured update |
| --- | --- | --- |
| Riot Games GmbH | `https://www.notion.so/208e41301314805c8591f9b2576720be` | Set `Invoicing Email` to the Riot invoice mailbox and `Invoicing Email Cc` to Aaron. Notes preserve the last-pattern Nicole recipient because the schema is single-email. |
| Echo Sports LLC | `https://www.notion.so/360e4130131480b09475e824f7e4bac1` | Set `Invoicing Email` to Echo Payments and `Invoicing Email Cc` to Aaron. Notes preserve the USD/EUR and attachment wording. |
