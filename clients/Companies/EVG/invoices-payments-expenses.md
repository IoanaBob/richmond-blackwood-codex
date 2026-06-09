# Invoices, Payments, Expenses, And Cashflows

Status: provisional.
Source: EVG contract/invoice records, bond subscription/cashflow records, task records, and Drive folders fetched/searched on 2026-06-08.
Imported: 2026-06-08.
Review: Reconcile debt-register sync and any payment-proof requirements in live Notion before acting. May invoice company relation and Techpacito downstream review were resolved on 2026-06-09.

## Debt Contract Payments

Active contract: `Loan Agreement - Luiza Surdu-Bob <> EVG` / `https://www.notion.so/309e41301314802584dddfb3f54f61c7`.

| Due date | Invoice row | Currency | Status | Notes |
| --- | --- | --- | --- | --- |
| 2026-02-28 | `https://app.notion.com/p/30be4130131481f3a97de90f3caf0554` | USD | Paid | First/prorated fetched invoice. |
| 2026-03-31 | `https://app.notion.com/p/317e41301314810fa6d4c70f4b56ebf5` | USD | Paid | Extra details point to debt-register alignment. |
| 2026-04-28 | `https://app.notion.com/p/333e4130131481c89fc8f3589da76a46` | USD | Paid | Paid confirmation sent 2026-04-30 per fetched row. |
| 2026-05-28 | `https://app.notion.com/p/360e4130131481c78f6ceb1d23056c7a` | USD | Paid | Live Notion `Company` relation was corrected from KONVI to EVG on 2026-06-09 and read back through the EVG company invoice relation. |

## Bond Subscriptions / Cashflows

| Item | Status | Source | Notes |
| --- | --- | --- | --- |
| Fixed Income Bond - 3 Month Buyback | Active product | `https://app.notion.com/p/355e4130131481bcb269df94405a2eb5` | Product terms fetched: fixed-income bond, 3-month buyback period, 8% p.a. coupon paid monthly, EUR/USD currencies, active liquidity-provisioning income source. |
| Techpacito subscription | Active | `https://app.notion.com/p/357e4130131481588cfbf94786e3c497` | EUR 30,000 subscription; settlement marked complete effective 2026-05-31 from user confirmation. User confirmed on 2026-06-09 that the downstream register/coupon/referral schedule review is complete. Bank details and SignNow IDs intentionally excluded. |
| Techpacito subscription payment | Cleared | `https://app.notion.com/p/368e413013148143bb99f0761fa7c3c0` | EUR 30,000 incoming cashflow marked cleared on 2026-06-02 based on user confirmation; no payment was executed by Codex. |
| Remaining EVG balance task | Archived/completed | `https://app.notion.com/p/36fe41301314811fbecddc4143768051` | Task says two EUR 10k EVG payments were sent and remaining EUR 5k was to be tracked; archived complete on 2026-06-01. Confirm evidence location before closing any related finance row. |

## Expenses / Payables

| Item | Status | Source | Notes |
| --- | --- | --- | --- |
| Phillips invoice/payment status and asset/payable booking | To Do | `https://app.notion.com/p/36ce413013148166a211c2af21542d29` | Task is assigned to Eran Peer. User said Eran owns it and payment status is not known; keep payment verification open before booking payable/asset evidence. Bank transfer details intentionally excluded. |

## Evidence Discipline

- Use the EVG internal Drive folder and live Notion source rows for payment/evidence files.
- Do not store bank transfer details, account numbers, payment method fragments, payment proof images, SignNow IDs, raw Slack message IDs, or Notion-hosted file attachment URLs in git.
