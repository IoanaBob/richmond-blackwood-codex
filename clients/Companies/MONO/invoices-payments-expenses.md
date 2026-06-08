# Invoices, Payments, And Expenses

Status: provisional.
Source: Notion company/contract/task/communication records, Gmail connector search/read, WhatsApp MCP read, and Drive list-folder on 2026-06-07.
Imported: 2026-06-07.
Review: Confirm current invoice-recipient/business-partner fields before future sends; do not rely only on historical Gmail recipients.

## Invoice And Payment Rules

- Active MONO-to-Konvi intercompany invoices: save in Xero, no need to send externally, per contract `Monochromatic - Konvi Limited`.
- NACV invoices MONO under the active EUR 10,000/month contract; NACV-side invoice generation belongs in `../NACV/`.
- MONO uses the general weekly invoice/payable process. WhatsApp context shows Andrei may ask about invoice/payment timing and RB confirms processing or requests approvals in the MONO group.
- When sending external MONO invoices by email, follow the latest contract/business-partner invoice fields and the latest historical send pattern; do not send only because an older Gmail thread exists.

## Active / Recent Invoice Context

| Item | Context | Source | Notes |
| --- | --- | --- | --- |
| Monochromatic - Konvi Limited invoices | Active monthly intercompany contract at EUR 2,250 | `https://www.notion.so/27cb9fb6e7dc44b095e9aa7eb0ac08ee` | Extra detail: save in Xero, no external send needed. |
| NACV - Monochromatic invoices | Active NACV monthly contract at EUR 10,000 | `https://www.notion.so/2d2e4130131480459094c9c026186447` | MONO is the client/counterparty; operational owner is NACV. |
| Motley/Yann invoices | Gmail search found April 2026 `Monochromatic - Inv 92 - April` and May 2026 `Monochromatic - Inv 95 - May` sent from accounting email to Yann at Motley, cc Andrei | Gmail connector read on 2026-06-07 | Store as historical send pattern only; confirm live contract/business partner fields before future sends. |
| FirstMate/Dalton invoice error | Gmail thread shows March 2026 invoice `INV-0086` sent to Dalton/FirstMate contacts and later a disregard/correction email | Gmail connector read on 2026-06-07; old provisional Client Notes page `https://app.notion.com/p/356e4130131481ae908df5ad201b9082` | Future sends should check current intended recipient/contract before repeating this pattern. |
| EIP/Arutur payment processing | Notion Communication records WhatsApp source, recovered invoice, and EIP/Arutur payment processing confirmation | `https://app.notion.com/p/367e4130131481a59ccae87c32270fae` | Includes link to Drive evidence and linked tasks; payment credentials and security/login codes are intentionally excluded. |

## Expense / Vendor Context

| Vendor / expense | Source | Status / note |
| --- | --- | --- |
| Framer | Gmail receipt found; Notion expense search result `Framer receipt #2559-2884 (Invoice 97A706DA-2486920)` | Source PDFs were uploaded to verified MONO invoices folder and attached to expense per Notion search result `https://app.notion.com/p/364e41301314815a82c3d814a44bd08a`. |
| Google Workspace | Gmail invoice found for `monochromatic.io` | Invoice exists; payment profile IDs and account links excluded from git. See EIP/MONO tool allocation task before treating cost allocation as final. |
| Magnific | Gmail invoice found for MONO-related email | Amount/status observed in Gmail; verify Notion expense row before booking assumptions. |
| Workhub Camden Street | Gmail found invoice and failed-payment notices, plus mail notification for MONO | Verify payment status in Notion/Drive/Workhub records before action; portal tokens excluded from git. |

## Drive Pointers

- Main invoice folder: `https://drive.google.com/drive/folders/1OUSBbHBhBBJU94iCmOSdx_fFWecj1y0c`.
- Main MONO folder: `https://drive.google.com/drive/folders/11LwHCgff0Cb-yDpQnC07WYQGGmINBXPY`.

Do not download or store raw invoice PDFs in git.
