# Drive Locations

Status: provisional.
Source: Notion company/filing/task records, repo Drive-routing rules, and Google Drive search/list-folder read-back on 2026-06-05.
Imported: 2026-06-03; updated 2026-06-05.
Review: Confirm whether the found `06. Richmond Blackwood Limited` folder is the approved canonical RBL folder/category for new raw evidence.

Current RBL Drive folder candidate found by connector search:

`06. Richmond Blackwood Limited` - `https://drive.google.com/drive/folders/1A9nWQRuknj8bgk-6R41Vs7TktnUr-KRy`.

Search evidence on 2026-06-05:

- Google Drive folder search for `Richmond Blackwood` and `RICHMOND` returned `06. Richmond Blackwood Limited`.
- Google Drive folder search for `RBL` returned no results.
- Folder metadata read-back: folder id `1A9nWQRuknj8bgk-6R41Vs7TktnUr-KRy`, parent id `1Qwjwz9ZdRGm9z-gRHTkCgldhwXUBMI55`.
- Folder listing included RBL-specific finance, filing, and registration material including `Client Companies Bookkeeping & Filing Status`, year folders `2024`, `2025`, `2026`, `RB - AR 2025`, `Client subscription expenses through RB`, `CRO Filings`, `TAIN Registration`, `RB TCSP LICENSE.pdf`, and `RB VAT REGISTRATION QUERY.pdf`.

Raw evidence, signed documents, payroll submissions, card/bank setup evidence, filing attachments, TCSP licence files, and large exports should be stored in Drive or the owning live source, not in git. This repo should keep only Drive URLs, source filenames, and routing notes once the canonical folder is confirmed.

Because the RBL folder remains unconfirmed for new uploads, the 2026-06-11 Department of Foreign Affairs receipt was uploaded to the approved general archive pending any later move decision:

| File | Drive URL | Notes |
| --- | --- | --- |
| `2026-06-11_Department_of_Foreign_Affairs_receipt_022369.pdf` | `https://drive.google.com/file/d/1yBI1eqEfKFq7U2AKctWiHItk5FIxGIVH/view?usp=drivesdk` | User-provided PDF `/Users/jp/Downloads/IMG_1173.pdf`; linked to Notion Expense `https://www.notion.so/37ce41301314815f9acdeff55a2ffb1f`; uploaded to the general archive folder because the RBL folder candidate still needs confirmation. |

## Known Document / Evidence Pointers From Notion

| Pointer | Source | Notes |
| --- | --- | --- |
| TCSP licence file `RB_TCSP_LICENSE.pdf` | Filing registration `https://www.notion.so/177e4130131480c5b014ed7909610ef0` | Verify Drive/file storage before relying on repo pointer. |
| Annual returns registration document `B83` | Filing registration `https://www.notion.so/175e413013148003b532ce53fc152fe3` | Use the live Notion attachment/source record for filing work. |
| April 2026 payroll submission | Filing `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Submission document is linked on the filing row. |
| April 2026 PAYE payment document | Tax payment `https://www.notion.so/365e413013148122813cd9da7e6530c4` | Document is linked on the tax-payment row. Do not copy bank/payment details into git. |

## Routing Boundary

Use Drive for raw client/company documents and source evidence. Use Notion for operational rows. Use this repo only for pointers, source registers, and durable rules.
