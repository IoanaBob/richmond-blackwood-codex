# Drive Locations

Status: provisional.
Source: Drive export folder `https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`; Notion WEW company record `https://www.notion.so/26774b3bf39c4874af7a938d462278bf`; user offboarding-export instruction.
Imported: 2026-06-01.
Review: Remaining Notion-only attachments still need a connector/API route that returns signed attachment bytes or a user-provided export.

## WEW Offboarding Export Root

Status: provisional.
Source: user-provided Drive folder.
Imported: 2026-06-01.
Review: Use as the current WEW offboarding package root unless the user replaces it.

- Drive folder: `https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`

## Recovered Files

Status: provisional.
Source: Drive API, Gmail API, and Google Drive connector readback on 2026-06-01.
Imported: 2026-06-01.
Review: Two annual-return files were recovered by copying existing WEW Form B1 evidence already present in Drive, not by downloading the inaccessible Notion attachment URL directly. The VBG file was recovered from the accounting Gmail source attachment and converted to PDF to match the Notion filename.

| Export folder | Filename | Drive URL | Recovery source | Review |
| --- | --- | --- | --- | --- |
| `2.Filings` | `Wewrite_Annual_Return_-_BC7195305_Original.pdf` | `https://drive.google.com/file/d/1fAxlnvOsbeIbObcRwmwwZ0nBbf-qNuNa/view?usp=drivesdk` | Copied from existing Drive file `Wewrite Form B1 - First Annual Return.pdf` (`https://drive.google.com/file/d/1rZsehJ4qFjP_P5w19ZrSzDZYXEMOmCxE/view?usp=drivesdk`). PDF text identifies Form B1 First Annual Return for WEWRITE CREATIVE LIMITED, company number 763853. | Confirm with Notion source file if signed URL access becomes available. |
| `8.Registrations` | `BC7195305_Original_(1).pdf` | `https://drive.google.com/file/d/1jPmIHzE0M-9eJGeOwN83yQGMWDMYqYRV/view?usp=drivesdk` | Copied from existing Drive file `Wewrite Form B1 - First Annual Return.pdf` (`https://drive.google.com/file/d/1rZsehJ4qFjP_P5w19ZrSzDZYXEMOmCxE/view?usp=drivesdk`). | Confirm with Notion source file if signed URL access becomes available. |
| `8.Registrations` | `IMG_0101.jpg.pdf` | `https://drive.google.com/file/d/1MTFMcr3OTe1WDGgoLv_My3P77ORbTkn7/view?usp=drivesdk` | Accounting Gmail message `1961b3493115f9ea`, from Teresa Eriksson, subject `VBG`, attachment `IMG_0101.jpg`; converted locally from HEIF content to one-page PDF with `sips`. | Confirm against Notion accident-insurance source file if signed URL access becomes available. |

## Remaining Blocked Attachments

Status: provisional.
Source: Notion MCP fetches; Drive API exact and broad search; Gmail API exact attachment search; Slack file search.
Imported: 2026-06-01.
Review: These remain missing from the export because the current Notion MCP returns `file://` attachment descriptors, not downloadable signed URLs; no official Notion API token is available in the local environment; exact Drive/Gmail/Slack recovery found no safe source copy.

| Export folder | Filename | Current blocker |
| --- | --- | --- |
| `2.Filings` | `Wewrite_Corporation_tax.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `2.Filings` | `wewrite_trade_tax_2024_Gewerbesteuererklarung_(GewSt_1_A).pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `2.Filings` | `2025-Q4-UStVa-Protokoll.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `Enquiry_Output_Document_IN637739.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `WEW-_corp_tax.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `WEW-Trade_Tax.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `Controlhippo_Document_(14).pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `Controlhippo_Document_(15).pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `Controlhippo_Document_(16).pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `bno_eingaben-_wewrite.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `8.Registrations` | `Controlhippo_1745600169246.jpeg` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `7.Personal Tax Filings` | `Teresa_2024_personal_tax_return.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `4.Correspondence/Incoming` | `2ac8abbb-07a1-4ea8-9a8a-9caf14e3eda1.jfif` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `4.Correspondence/Incoming` | `WhatsApp_Image_2026-04-12_at_10.40.54.jpeg` | Notion attachment descriptor only; WhatsApp skipped per user instruction; no exact Drive/Gmail/Slack source found. |
| `4.Correspondence/Incoming` | `WhatsApp_Image_2026-04-12_at_10.40.54_(2).jpeg` | Notion attachment descriptor only; WhatsApp skipped per user instruction; no exact Drive/Gmail/Slack source found. |
| `4.Correspondence/Incoming` | `vat_notice_translation_en.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `5.Contracts` | `Consultancy_Agreement_Signed_May_14.pdf` | Notion attachment descriptor only; no exact Drive/Gmail/Slack source found. |
| `5.Contracts` | `20240527155049-utc-c594094a-2ce2-4573-be10-321619d4345a-Signed-20240527-Richmond_Blackwood_Agreement_2024_-_Eran_Peer_-_Teresa_Eriksson_-_Mark_Wilshin.pdf` | Notion S3-style URL returns forbidden without a signed URL; no exact Drive/Gmail/Slack source found. |

