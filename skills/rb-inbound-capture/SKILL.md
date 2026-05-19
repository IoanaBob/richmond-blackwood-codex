---
name: rb-inbound-capture
description: Capture Richmond Blackwood client-speaking inbound source items for triage. Use from rb-inbound-operating-triage to read Gmail inbox and WhatsApp topic/checkpoint sources and produce a source ledger without business writes.
---

# RB Inbound Capture

Use this phase to gather source items only. It produces the run source ledger consumed by classification.

## Inputs

- Run type: daily automation or ad hoc/manual.
- Approved capture window.
- Saved Gmail completion marker rule and WhatsApp checkpoints.
- Any explicitly named client chats/topics.

## Capture Rules

- For scheduled daily automation, use the master skill default window: `08:00 Europe/Dublin` on the previous working day through `08:00 Europe/Dublin` on the run day; Monday starts at the previous Friday `08:00`.
- Gmail is first: inbox only, RB/accounting/client-facing addresses, in-window, not labelled `Triaged`.
- Start with metadata/snippets/attachment filenames. Fetch full bodies and attachments only when a source plausibly contains finance, correspondence, or actionable client work.
- WhatsApp is second: use saved or explicitly identified client chats by date window and topic terms. Extract coherent topic chunks instead of one row per message when messages belong together.
- Do not read Slack as inbound.
- Do not query Notion, Drive, Business Partners, Tasks, Expenses, Invoicing, or client folders unless capture metadata is insufficient to identify a source item for classification.
- Do not write Notion, Drive, Gmail labels, WhatsApp checkpoints, Slack, or RB Communications during capture.

## Ledger Output

Return one ledger row per captured source/topic chunk:

- `item_id`
- `source_channel`
- `source_url` or message/chat ID
- `thread_id` / `message_id`
- `timestamp`
- `sender`
- `recipients`
- `subject_or_title`
- `attachment_names`
- `likely_company_or_client`
- `topic`
- `language`
- `snippet_or_short_body`
- `capture_status`
- `classification_hint`
- `verification_needed`

If a connector is unavailable, add a skipped-source ledger row with `capture_status: skipped` and the blocker. Do not infer missing messages.
