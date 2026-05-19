# Tax Filings

Status: provisional.
Source: Notion individual and personal-tax filing records fetched 2026-05-13; WhatsApp chat `120363222065866778@g.us`.
Imported: 2026-05-13.
Review: The 2024 German filing is in preparation and not filing-ready; confirm whether US filing obligations or US information reporting need to be tracked separately from the German returns.

## Identity And German Tax Details

| Field | Value | Source |
| --- | --- | --- |
| Tax residence | Germany | Notion individual `https://www.notion.so/203647f1b74743a09fc8a408a3318b30` |
| Tax ID | `20473015680` | Notion individual |
| Tax number | `14/051/07097` | Notion individual |
| IPN / PPSN | `5015189` | Notion individual |
| Date of birth | 1983-11-19 | Notion individual |
| Nationality | United States | Notion individual |

## Personal Tax Filing Records

| Filing | Jurisdiction | Period | Due date | Status | Source |
| --- | --- | --- | --- | --- | --- |
| 2024 - Personal Tax - Byron | Germany | 2024-01-01 to 2024-12-31 | 2026-04-30 | In progress; document gathering In progress | `https://www.notion.so/2cae41301314808bb952d50c6934b092` |
| 2025 - Personal Tax - Byron Germany | Germany | 2025-01-01 to 2025-12-31 | 2026-07-31 | Pending; document gathering Not provided | `https://www.notion.so/342e41301314800197bad5f6b9c7330e` |

## 2024 Task Routing

Status: provisional.
Source: Filing schema and task routing rule in `skills/rb-personal-tax-analysis-de/SKILL.md`; Notion connector writes on 2026-05-18.
Imported: 2026-05-18.
Review: Tasks are linked to the AGL project and filing record; filing task should wait on the preparation dependency.

Workbook: `https://docs.google.com/spreadsheets/d/1_V8CzcZiQfxrIi4zTwVBsvwhvKAxxAaN901bxRm0JHk/edit`.

Created task pair:

| Task | Assignee | Project | Status | Review |
| --- | --- | --- | --- | --- |
| `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e` | Ioana Surdu-Bob | AGL client project `https://www.notion.so/32fe41301314809fa77bf2f0d497de5b` | In Review | Linked in filing `Preparation Task`; filing task has dependency relation |
| `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a` | Johnpaul Okolie | AGL client project `https://www.notion.so/32fe41301314809fa77bf2f0d497de5b` | To Do | Linked in filing `Filing Task`; comment added with workbook URL, filing row, Drive folder, summary figures, and remaining flags |

Filing record fields updated on 2026-05-18:

- `Status`: `In progress`.
- `Document gathering status`: `In progress`.
- `GDrive Docs`: `https://drive.google.com/drive/folders/1ajVVFLGIGfTjNLrjH8ELj1sW0YdPuHlj`.
- `Preparation Task`: `https://www.notion.so/364e4130131481bc9b91c60b0ab7c03e`.
- `Filing Task`: `https://www.notion.so/364e4130131481d8985cc8d2d8bf5b4a`.

## US Context To Review

Status: provisional.
Source: User instruction on 2026-05-13.
Imported: 2026-05-13.
Review: Determine exact filing treatment and evidence needed.

Byron was a US resident, owns an apartment in the US, and has US investment accounts including Roth and IRA accounts. The German return should review worldwide income and whether US retirement-account activity is taxable/reportable in Germany.

## WhatsApp Tax Context

Status: provisional.
Source: WhatsApp chat `Frasier, Byron | Richmond Blackwood` / `120363222065866778@g.us`, searched on 2026-05-13.
Imported: 2026-05-13.
Review: Use source documents and official notices before filing; WhatsApp is support context only.

- WhatsApp confirms RB asked for Byron's German Steuernummer in February/April 2026 and Byron supplied the tax number now also recorded in Notion.
- WhatsApp confirms personal-tax document gathering was started on 2026-04-15 and that RB requested 2024 payslips and expense evidence later in April.
- WhatsApp contains a password for protected payroll evidence; do not store that password in git.
