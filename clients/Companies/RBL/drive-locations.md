# Drive Locations

Status: provisional.
Source: Notion company/filing/task records and repo Drive-routing rules reviewed on 2026-06-03.
Imported: 2026-06-03.
Review: Confirm the canonical RBL Drive folder and whether RBL should be routed as internal group or another approved Drive category before storing new raw evidence.

No canonical RBL Drive folder was confirmed in this pass.

Raw evidence, signed documents, payroll submissions, card/bank setup evidence, filing attachments, TCSP licence files, and large exports should be stored in Drive or the owning live source, not in git. This repo should keep only Drive URLs, source filenames, and routing notes once the canonical folder is confirmed.

## Known Document / Evidence Pointers From Notion

| Pointer | Source | Notes |
| --- | --- | --- |
| TCSP licence file `RB_TCSP_LICENSE.pdf` | Filing registration `https://www.notion.so/177e4130131480c5b014ed7909610ef0` | Verify Drive/file storage before relying on repo pointer. |
| Annual returns registration document `B83` | Filing registration `https://www.notion.so/175e413013148003b532ce53fc152fe3` | Use the live Notion attachment/source record for filing work. |
| April 2026 payroll submission | Filing `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Submission document is linked on the filing row. |
| April 2026 PAYE payment document | Tax payment `https://www.notion.so/365e413013148122813cd9da7e6530c4` | Document is linked on the tax-payment row. Do not copy bank/payment details into git. |

## Routing Boundary

Use Drive for raw client/company documents and source evidence. Use Notion for operational rows. Use this repo only for pointers, source registers, and durable rules.
