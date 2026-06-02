# Drive Locations

Status: provisional.
Source: Drive export folder `https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`; Notion WEW company record `https://www.notion.so/26774b3bf39c4874af7a938d462278bf`; user offboarding-export instruction; Notion REST API and Drive API readback on 2026-06-01.
Imported: 2026-06-01.
Review: Current offboarding file list is complete by Drive exact-name readback. The initial Richmond Blackwood engagement agreement is intentionally out of scope per user instruction on 2026-06-01.

## WEW Offboarding Export Root

Status: provisional.
Source: user-provided Drive folder.
Imported: 2026-06-01.
Review: Use as the current WEW offboarding package root unless the user replaces it.

- Drive folder: `https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`

## Access Readback

Status: provisional.
Source: user instruction on 2026-06-02; accounting Google persona Drive API readback.
Imported: 2026-06-02.
Review: Confirm access should remain active after the handover is complete.

| Date | Folder | Principal | Role | Notification | Review |
| --- | --- | --- | --- | --- | --- |
| 2026-06-02 | `WeWrite Creative Limited  - Handover - Richmond Blackwood` (`https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`) | `info@cllm.de` | `reader` | Google notification email disabled; bespoke email drafted in chat. | Permission creation and readback succeeded through `accounting@richmondblackwood.com` persona. |
| 2026-06-02 | `WeWrite Creative Limited  - Handover - Richmond Blackwood` (`https://drive.google.com/drive/folders/1C3RnMZsxGWc8ZprC8V7C251ldtyROhT3`) | `teresa@we-write.de` | `reader` | Google invite notification enabled because Drive rejected a silent share for this non-Google-account address. | Permission creation and readback succeeded through `accounting@richmondblackwood.com` persona. |

## Export File Readback

Status: provisional.
Source: Drive API readback after Notion REST API/Gmail/Drive recovery runs on 2026-06-01.
Imported: 2026-06-01.
Review: Files listed here were found in the target export folder by exact filename after upload/copy/readback. The first annual-return pair and VBG PDF include earlier recovery notes below. The initial Richmond Blackwood engagement agreement is excluded from the offboarding export scope.

| Export folder | Filename | Drive URL | Recovery source | Review |
| --- | --- | --- | --- | --- |
| `2.Filings` | `Wewrite_Annual_Return_-_BC7195305_Original.pdf` | `https://drive.google.com/file/d/1fAxlnvOsbeIbObcRwmwwZ0nBbf-qNuNa/view?usp=drivesdk` | Copied from existing Drive file `Wewrite Form B1 - First Annual Return.pdf` (`https://drive.google.com/file/d/1rZsehJ4qFjP_P5w19ZrSzDZYXEMOmCxE/view?usp=drivesdk`). PDF text identifies Form B1 First Annual Return for WEWRITE CREATIVE LIMITED, company number 763853. | Confirm against Notion source if needed. |
| `2.Filings` | `Wewrite_Corporation_tax.pdf` | `https://drive.google.com/file/d/1i-9uXC8P6hY9PTzTJkfjeWVPULCmoH1E/view?usp=drivesdk` | Downloaded from Notion page `File Trade and corporation Tax` via REST block file URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `2.Filings` | `wewrite_trade_tax_2024_Gewerbesteuererklarung_(GewSt_1_A).pdf` | `https://drive.google.com/file/d/1tGOMEiZcAhpNtrHEhBKO4bbk74oF4ytx/view?usp=drivesdk` | Downloaded from Notion page `File Trade and corporation Tax` via REST block file URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `2.Filings` | `2025-Q4-UStVa-Protokoll.pdf` | `https://drive.google.com/file/d/14D_oXjxuhFZ7CXm4eN638v0VHYoXfgwq/view?usp=drivesdk` | Downloaded from Notion filing row `WEW - 10/1/2026 - VAT DE` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `Enquiry_Output_Document_IN637739.pdf` | `https://drive.google.com/file/d/1Y2ZY5l4rUMOQGPn_lX1_AmmeqM2kspot/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW - SR673992 - RBO` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `BC7195305_Original_(1).pdf` | `https://drive.google.com/file/d/1jPmIHzE0M-9eJGeOwN83yQGMWDMYqYRV/view?usp=drivesdk` | Copied from existing Drive file `Wewrite Form B1 - First Annual Return.pdf` (`https://drive.google.com/file/d/1rZsehJ4qFjP_P5w19ZrSzDZYXEMOmCxE/view?usp=drivesdk`). | Confirm against Notion source if needed. |
| `8.Registrations` | `WEW-_corp_tax.pdf` | `https://drive.google.com/file/d/1xH9UFhA4QF2DC3lUTjI9Qbkbd0jW9WRo/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-29/627/30113-Corporation Tax` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `WEW-Trade_Tax.pdf` | `https://drive.google.com/file/d/1XFb5JhuFti8NsOT8vC20OiY3QOH5HuT5/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-29/627/30113-Trade Tax` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `Controlhippo_Document_(14).pdf` | `https://drive.google.com/file/d/1a3Dyw3JvGF_VVEKpPZgAiO9mORuWYBiw/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-DE452754087-VAT` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `Controlhippo_Document_(15).pdf` | `https://drive.google.com/file/d/1IZf-O2FzUH-neZAnCo_EPfjoEA1Dun0a/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-DE452754087-VAT` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `Controlhippo_Document_(16).pdf` | `https://drive.google.com/file/d/1tiMQkmJ2pvVoFCWRdep6GMdDB6lerUmb/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-DE452754087-VAT` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `bno_eingaben-_wewrite.pdf` | `https://drive.google.com/file/d/1Qzlarm832jyS4_cx0gWn7zul8d4Pe1dT/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-72951041-Payroll` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `Controlhippo_1745600169246.jpeg` | `https://drive.google.com/file/d/1p3fPuJgp_9rm1bFmGjtOUtrBQjFIvK3m/view?usp=drivesdk` | Downloaded from Notion filing-registration row `WEW-72951041-Payroll` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `8.Registrations` | `IMG_0101.jpg.pdf` | `https://drive.google.com/file/d/1MTFMcr3OTe1WDGgoLv_My3P77ORbTkn7/view?usp=drivesdk` | Accounting Gmail message `1961b3493115f9ea`, from Teresa Eriksson, subject `VBG`, attachment `IMG_0101.jpg`; converted locally from HEIF content to one-page PDF with `sips`. | Confirm against Notion accident-insurance source file if needed. |
| `7.Personal Tax Filings` | `Teresa_2024_personal_tax_return.pdf` | `https://drive.google.com/file/d/1g2cPCeOwU0N62Wqb85dqs-UWsY7q4wIG/view?usp=drivesdk` | Downloaded from Notion personal-tax filing row `2024 - Personal Tax - Teresa & Husband` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `4.Correspondence/Incoming` | `2ac8abbb-07a1-4ea8-9a8a-9caf14e3eda1.jfif` | `https://drive.google.com/file/d/1MkiqWQnA9Gv9Rez5CqVqy8qXjXkDOA_X/view?usp=drivesdk` | Downloaded from Notion correspondence row `Finanzamt letter` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `4.Correspondence/Incoming` | `WhatsApp_Image_2026-04-12_at_10.40.54.jpeg` | `https://drive.google.com/file/d/1wXv8KmgSNM3AREHZD7szVPp60dr2jryo/view?usp=drivesdk` | Downloaded from Notion correspondence row `Finanzamt letter` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `4.Correspondence/Incoming` | `WhatsApp_Image_2026-04-12_at_10.40.54_(2).jpeg` | `https://drive.google.com/file/d/174JuSXXzpVp8rPjG5E19joE1Le6dkPL-/view?usp=drivesdk` | Downloaded from Notion correspondence row `Finanzamt letter` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `4.Correspondence/Incoming` | `vat_notice_translation_en.pdf` | `https://drive.google.com/file/d/1NMoP4x4U5UGVMbB67-8poxRwcn0mf3Hq/view?usp=drivesdk` | Downloaded from Notion correspondence row `Finanzamt letter` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |
| `5.Contracts` | `Consultancy_Agreement_Signed_May_14.pdf` | `https://drive.google.com/file/d/1shmXJTl98VLnoIffUJ1_7WfBriL31M9U/view?usp=drivesdk` | Downloaded from Notion contract row `WEWRITE CREATIVE LIMITED - Mark` via REST file property URL, then uploaded to Drive. | Drive exact-name readback passed. |

## Excluded Source Attachments

Status: provisional.
Source: user instruction on 2026-06-01; Notion MCP page fetch; Drive/Gmail API checks.
Imported: 2026-06-01.
Review: Do not treat this as missing from the current WEW offboarding package unless the user expands the export scope.

| Source location | Filename | Scope decision |
| --- | --- | --- |
| WEW company page `Signed Initial Contracts` | `20240527155049-utc-c594094a-2ce2-4573-be10-321619d4345a-Signed-20240527-Richmond_Blackwood_Agreement_2024_-_Eran_Peer_-_Teresa_Eriksson_-_Mark_Wilshin.pdf` | Excluded. User clarified the initial Richmond Blackwood contract is not required for the client offboarding list in the company knowledge base. |
