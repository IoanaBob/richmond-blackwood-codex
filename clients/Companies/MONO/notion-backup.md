# Notion Backup

Status: provisional.
Source: Notion company/client project/client notes records fetched on 2026-06-07.
Imported: 2026-06-07.
Review: Confirm whether to update the old Client Notes & Updates page after this canonical repo import.

Client Databases hub: `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`

## Official Records

| Record | URL | Notes |
| --- | --- | --- |
| Official company record | `https://www.notion.so/7d2d1876a3024ee0a3e5a3d1825485e0` | Legal name MONOCHROMATIC LIMITED; Reference `MONO`. |
| Main client project | `https://app.notion.com/p/32fe41301314808f9e21c973b262e925` | `MONO - Monochromatic - Client Project`, PROJ-205. |
| Client dashboard | `https://www.notion.so/b8f076a7abfa4740b68e22ec2c5a9b72?v=75ea329734f846ceb6d34f31fa86ab94&source=copy_link` | URL from company record. |
| Existing Client Notes provisional import | `https://app.notion.com/p/356e4130131481ae908df5ad201b9082` | Internal page from 2026-05-04 pointing to old `clients/monochromatic/` path. |

## Backup Decision

No Notion write-back was performed in this pass.

The old Client Notes page appears superseded for repo-routing purposes because this import uses the canonical company folder `clients/Companies/MONO/` based on the Notion `Reference`. If live Notion cleanup is approved later, update the existing page rather than creating a duplicate generic Codex import page.

## Data-Quality Notes

- The main MONO client project's `Companies` relation points to a Project Management company page titled `Richmond Blackwood` rather than the Client Databases MONO company record.
- The company page body contains Notion-hosted image links and attachment URLs. Those were not copied to git.
