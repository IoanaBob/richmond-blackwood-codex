# Drive Locations

Status: provisional.
Source: Google Drive search/list-folder/metadata on 2026-06-07, Notion expense search result, and user instruction on 2026-06-07.
Imported: 2026-06-07.
Review: Confirm whether the existing Drive folder should remain under the external-client root or be moved/organized under a group/internal root.

## Candidate Canonical Folder

| Folder | URL | Evidence | Review |
| --- | --- | --- | --- |
| `01. Monochromatic Limited (MONO)` | `https://drive.google.com/drive/folders/11LwHCgff0Cb-yDpQnC07WYQGGmINBXPY` | Exact RB-style company folder name; contains year folders, `VAT DOCS`, invoices, bank, CRO filings, and registration letters. Notion expense search result references this folder's `Invoices` subfolder as verified. | Strongest folder candidate. Confirm destination before moving/creating new files. |

Parent metadata on 2026-06-07 showed the folder under `02. RB Client Companies` / `https://drive.google.com/drive/folders/1QsXdHqqBc5Qj5vyoDD3k0VhLsEzyU_ro`, whose parent is the external-client root `https://drive.google.com/drive/folders/1Gsuk22nHrqAytDb37i41w7dfK9O1h4oy`.

This conflicts with the company being internal group managed services and user instruction that MONO is part of the EIP group. Do not move the folder without explicit approval.

## Subfolders Listed

| Folder | URL | Notes |
| --- | --- | --- |
| 2026 | `https://drive.google.com/drive/folders/1syAo4DuZGFvZIkHUBplgK6FyqSlExgnw` | Year folder. |
| 2025 | `https://drive.google.com/drive/folders/1NZ9kVrPJIwV0NwU4Em_IdiHFNjjbwVYK` | Year folder. |
| 2024 | `https://drive.google.com/drive/folders/1lSjtSVZRI13u5nhp7DjR-3eMEvNfzEOQ` | Year folder. |
| 2023 | `https://drive.google.com/drive/folders/1hC8mtzsyFwiJmTUa5NVfHow4wQIgdVAC` | Year folder. |
| VAT DOCS | `https://drive.google.com/drive/folders/1QdIbzQj9bRrRM-1dt5oUIqAzd9DutONd` | Contains `Monochromatic Renewal Apr 17 2025` PDFs. |
| Invoices | `https://drive.google.com/drive/folders/1OUSBbHBhBBJU94iCmOSdx_fFWecj1y0c` | Verified MONO invoices folder per Notion expense search result. |
| Bank | `https://drive.google.com/drive/folders/1hm690CSsSI3GYCc6-8AtPeyfMwElosRB` | Do not store bank details in git. |
| CRO Filings | `https://drive.google.com/drive/folders/1StWnL8Va-Jy7eNgdFFYYyIQQjUZTxYyG` | Company statutory filings. |

## Other Drive Search Results

Drive search returned additional folders titled `Monochromatic`. They were not selected as canonical because the exact RB-style folder `01. Monochromatic Limited (MONO)` has stronger naming and contents. Re-check if missing evidence cannot be found there.
