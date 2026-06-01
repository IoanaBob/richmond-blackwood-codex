# Notion Operations

Status: provisional.
Source: neutral operating decisions ported from local `everguard-research-codex`, adapted to RB Notion routing.
Imported: 2026-05-05.
Review: confirm which RB Notion databases are backup-only versus operational source of truth.

## Purpose

Maintain Notion as Richmond Blackwood's structured backup and operating reference without creating replacement structures or misrouting client detail.

## Placement

- General SOPs and process docs: RB Internal Knowledge Base.
- Client-specific facts: relevant database/page under Client Databases.
- Client folder names: exact Notion Companies `Reference`.

Do not create client-specific Notion pages when the company relation or target database is unclear.

## Page And Database Rules

- Fetch schemas before creating or updating pages.
- For complete table inventory, use the Notion REST API data-source query endpoint and page until `has_more` is false. Do not use MCP search for full inventory.
- Treat MCP `_notion_query_data_sources` as unavailable for inventory unless the exact connector path is proven reliable again in a future run.
- Use MCP fetch for schema and known page/readback checks; use MCP search only to discover likely candidate pages or databases.
- Keep page/database titles plain.
- Use icon metadata where supported.
- `Notes` fields describe the record itself, not connector/debug history.
- When a database page has actual Notion comments and the work is a comment/update note, write into the page's comments section rather than a database text field such as `Comments`. If the connector cannot create the actual page comment, stop and report the blocker instead of falling back to the database field.
- Use file/files properties for Drive-backed documents where possible.
- Create useful filtered views for new databases.
- Use `WRAP CELLS true` for table views when view DSL is available.
- Use one-way relations by default unless the reverse relation is an operational surface.
- Avoid duplicating private client details into broad process pages.

## Task-Ready Databases

When a Notion database is intended to track ongoing RB work, include:

- `Stage`
- a Notion people owner/assignee field
- `Deadline`

The connector does not expose native `Turn into Tasks`. If native task visibility is needed, tell the user to complete conversion in the Notion UI.

## Tasks Database

Use the owning task-capable RB Client Databases row first for Richmond Blackwood action items. Use the existing central Notion Tasks database for extra action work or when the owning operational row cannot represent the action.

- Tasks data source: `collection://25de4130-1314-8158-af69-000b6c9fb49e`
- Create follow-up tasks with `Name`, `Status`, `Assigned To`, and `Project`.
- Link client tasks to the client project stored on the responsible Company record's project relation/attribute. Use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) only for truly RB-internal work.
- Use explicit user instructions, existing row owner, owner of the project linked on the responsible Company record, established process rules, or `internal/people-roles.md` to choose the assignee. If none is clear, ask before creating the task.
- Keep `Assigned To` for the person doing the work. Treat approvals as review: when Ioana or another team member needs to approve, check, or sign off, add that person to `Review By` on the owning operational or recurring task instead of assigning them the work.
- Do not create a standalone approval task when the approval belongs inside an existing operational task. For invoice/payment approvals, prefer the existing invoice-payables/payables task and add a page comment with the specific payment/invoice context.
- Communication records, client notes, and repo files can be source context, but they are not substitutes for updating the owning task-capable row when RB action is required.

## Known Connector Limits

- Existing view tabs may not be reorderable or deletable through the connector.
- Page-property groups may require manual Notion UI work.
- Native task conversion is a UI handoff.
- Some file display names may need verification after URL-based attachment.
- MCP search is not a reliable exhaustive list of all accessible rows.
- Full data-source paging, Notion file downloads, and private image/file uploads require an approved Notion API token stored outside git.

## Data Source Query

Status: provisional.
Source: Notion developer documentation for data sources, search limitations, file/media APIs, and request limits; user instruction in Codex chat on 2026-06-01.
Imported: 2026-06-01.
Review: Confirm the RB Notion API connection is shared with RB Client Databases before relying on it for production inventory.

- Tables: use `POST /v1/data_sources/{data_source_id}/query` with cursor pagination. `page_size` is at most `100`; there is no one-call all-rows endpoint.
- Put all query parameters on the URL, for example `filter_properties[]`. Put all filters, sorts, and `page_size` in the JSON body.
- First run the plain curl request and save page 1. If page 1 has `has_more: false`, the query is complete and no helper is needed.
- If page 1 has `has_more: true`, continue with the exact same URL and JSON body. Add only `start_cursor` from the previous response when fetching page 2, page 3, and later pages.
- Stop only when `has_more` is false. Keep the results from every page together, and dedupe by page ID/URL during analysis if the table may have changed during the run.

Example first-page request:

```sh
curl -sS -X POST \
  "https://api.notion.com/v1/data_sources/<data-source-id>/query?filter_properties[]=Title&filter_properties[]=Status" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2026-03-11" \
  -H "Content-Type: application/json" \
  --data @/private/tmp/<run-id>/query-body.json \
  > /private/tmp/<run-id>/page-1.json
```

Example body:

```json
{
  "page_size": 100,
  "filter": {
    "property": "Status",
    "status": {
      "does_not_equal": "Logged"
    }
  },
  "sorts": [
    {
      "timestamp": "created_time",
      "direction": "ascending"
    }
  ]
}
```

Example later page body:

```json
{
  "page_size": 100,
  "filter": {
    "property": "Status",
    "status": {
      "does_not_equal": "Logged"
    }
  },
  "sorts": [
    {
      "timestamp": "created_time",
      "direction": "ascending"
    }
  ],
  "start_cursor": "<previous next_cursor>"
}
```

Optional minimal loop helper:

```sh
npm run notion:query-data-source -- \
  "https://api.notion.com/v1/data_sources/<data-source-id>/query?filter_properties[]=Title&filter_properties[]=Status" \
  --body /private/tmp/<run-id>/query-body.json \
  --first-response /private/tmp/<run-id>/page-1.json \
  --out /private/tmp/<run-id>/all-results.json
```

Use the helper only after checking that page 1 has `has_more: true`. The helper starts with page 1's `results`, changes only `start_cursor` for later requests, and appends every response's `results` array.

- Downloads: retrieve the page or block through the API and download the returned `file.url` or `external.url`. Notion-hosted URLs are temporary, so re-fetch before downloading.
- Uploads: use the File Upload API. Single-part upload is for files up to 20 MiB; larger files use multi-part upload. Attach the resulting `file_upload` ID to a `files` property, media block, icon, or cover before it expires.
- Rate limits: keep REST API calls paced for Notion's API limits. Do not switch to browser automation for missing credentials or connector gaps.
