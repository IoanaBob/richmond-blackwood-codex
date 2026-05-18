---
name: rb-inbound-classify
description: Classify captured Richmond Blackwood inbound ledger items before any business writes. Use from rb-inbound-operating-triage to decide ignore/no-op, finance, task/correspondence, blocker, or out-of-scope routing, with approval-required actions flagged separately.
---

# RB Inbound Classify

Classify every captured ledger item before routing. This phase decides the handler; it does not perform business writes.

## Output Classes

Each item gets exactly one primary route class:

- `verified-no-op`: no Notion, Drive, Slack, supplier/client, or source action is required after verification.
- `finance`: invoice, receipt, expense, payment notice, payment failure, supplier invoice, contractor invoice, recurring client invoicing, or finance evidence handling.
- `task-correspondence`: correspondence/document filing, client/counterparty request, RB-owned commitment, or task update/creation.
- `blocker`: destination, owner, entity, supplier, contract, evidence, or source content is unclear.
- `out-of-scope`: outside the approved capture window or outside client-speaking inbound scope.

Approval is not a primary route class. Mark `approval_required: true` separately when an item needs outbound communication, a Slack closeout, an app/software draft, a signature action, an irreversible/sensitive move, or another operator-gated action. The underlying item must still route as finance, task/correspondence, blocker, verified no-op, or out-of-scope.

## Verified No-Op / Ignore Rules

Use `verified-no-op` only when the reason is explicit and recorded. Examples:

- ELSTER/BZSt W-IdNr availability notices (`Mitteilung der Wirtschafts-Identifikationsnummer`, `W-IdNr.`): RB does not save W-IdNr values, does not retrieve/download merely to save them, and does not create tasks, Correspondence, Drive evidence, or client records for the notice itself.
- Automated SteuerGo registration/login confirmations with no separate RB action.
- Marketing/system noise with no client, finance, compliance, or operational action.
- Suspicious/phishing messages after verification that they should not be acted on.
- Duplicates already fully handled in an existing task/record.
- Finance items matched to complete paid/booked records with no missing evidence or action.
- Items outside the approved capture window.

If the same source contains a separate explicit RB action, blocker, client request, deadline, or non-finance operational request, classify that separate item instead of ignoring the whole source.

## Routing Hints

- Finance-like items always route to `rb-inbound-finance-routing` first. Do not send them to task/correspondence unless there is a separate non-finance request.
- Correspondence/task items route to `rb-inbound-task-correspondence`.
- Unclear items become `blocker`; do not guess.
- Approval-required actions go into the batch approval packet and must not be executed in this phase.

## Classification Output

For each ledger item, return:

- `item_id`
- `primary_class`
- `reason`
- `handler_skill`
- `approval_required`
- `approval_packet_item` when applicable
- `company_or_client`
- `dedupe_keys`
- `owner_candidate`
- `completion_marker_rule`
- `blocker` when applicable
