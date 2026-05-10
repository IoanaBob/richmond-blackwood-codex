---
title: RBL edge cases
status: provisional
source: user instruction in Codex thread, 2026-05-08 and 2026-05-10
imported: 2026-05-10
review: Confirm whether the Workhub plan amounts are VAT-exclusive and whether any additional companies have upgraded plans.
---

# RBL Edge Cases

## Workhub Invoice Validation

- Status: provisional.
- Source: user instruction in Codex thread, 2026-05-08 and 2026-05-10.
- Imported: 2026-05-10.
- Review: Confirm whether Workhub plan amounts are VAT-exclusive and whether any additional companies have upgraded plans.

### Trigger

Use this edge case only when an item is an invoice, renewal notice, payment notice, invoice correction request, or matched Notion invoice/expense record and one of these fields indicates Workhub, Stein Commercial, or Camden Street:

- sender;
- subject;
- body snippet;
- attachment filename;
- parsed invoice text;
- matched Notion record title or supplier.

### Applies Before

- Creating or updating an Expense.
- Creating or updating an Invoicing record.
- Applying Gmail `Triaged`.
- Writing the final Slack overview.

### Rule

All Workhub / Stein Commercial / Camden Street invoices should be issued and addressed to **RICHMOND BLACKWOOD LIMITED**.

Approved Workhub plan schedule:

- CBMAX, Pacheco Cruz Limited (PCL), NA Capital Ventures Limited (NACV), and Konvi are on the upgraded/non-essential plan at **€199**.
- All other companies are on the essential plan at **€99**.

### Handling

- If the invoice matches the addressee and plan schedule, process it through the normal Expense/Invoicing path and report it normally.
- If Workhub sends an invoice addressed to a client company, with the wrong plan, or otherwise inconsistent with this schedule, do not process it as a payable expense.
- For an incorrect Workhub invoice, request or prepare a request for a corrected invoice, and keep any existing Notion Expense row only as a rejected/correction-required audit pointer.
- Leave Gmail unlabelled until the correction/review path required for that item is complete.
- If the user has already reviewed and approved a Workhub item as correct, do not reverse it during automation cleanup; report it as human-reviewed/approved.

### Current Human-Reviewed State

- Status: approved for CC-INV-19364; provisional for broader rule.
- Source: user instruction in Codex thread, 2026-05-08.
- Imported: 2026-05-10.
- Review: Keep checking future Workhub invoices against the addressee and plan rules.

The user confirmed `Workhub renewals May 2026 (CC-INV-19364)` is the only correct Workhub expense from the May 2026 batch and marked it approved in Notion. Automation should not reverse or relabel that human-reviewed approval.

The Workhub `CC-INV-19339` and `CC-INV-18370` records remain correction-required unless Workhub sends corrected invoices addressed to RICHMOND BLACKWOOD LIMITED and priced according to the approved plan schedule.
