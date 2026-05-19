# RB Calls Live Readbacks

Status: provisional.
Source: `npm run calls:sync-live-state` using n8n MCP and ElevenLabs API readbacks.
Imported: 2026-05-13.
Review: compare these snapshots before publishing future workflow or agent edits; do not treat them as client payload logs.

This folder stores reviewable snapshots of the live RB calling-bot runtime after manual changes in n8n and ElevenLabs.

The snapshots intentionally exclude API keys and MCP tokens. They may include non-secret runtime identifiers such as workflow IDs, version IDs, node names, credential names, webhook paths, and tool IDs.

## Latest Sync

Latest registry: `automation/live-readbacks/rb-calls-live-state.json`.

As of the 2026-05-13 readback:

- `RB Calls Voice Execution` is active at `c7d84f52-ae58-4073-889f-89eb2000a937` with 28 nodes. Startup context is limited to Company, Individual, Contact, and tax-registration context before the ElevenLabs call.
- `RB Calls Live Help` is active at `9d2ea23e-ffaa-451e-b98a-8628fa9a9ac1` with 34 nodes. It includes the separate delayed re-read path for resolved Slack threads and the separate missing-thread pending path.
- `RB Calls ElevenLabs Events` has active version `29dc070e-2951-4f7f-931b-6b24ea793fc5` and current draft version `48d12009-db89-4c75-8df1-6e48564f12ed`. Review this draft/active mismatch before publishing or assuming production behavior changed.
- `RB Calls Context Lookup` is active at `b8b439eb-0587-4600-a93a-89a27ca2e8fc` with the single `Route Lookup Category` switch and separate category lanes.
- ElevenLabs `RB Call Bot` is version `agtvrsn_9501krh4qjm7e6n9jy079k5tgea5`. Root custom `tool_ids` are empty; `lookup_call_context`, `request_creator_help`, and `check_creator_help` are attached only through the dedicated workflow tool nodes.

## Files

- `rb-calls-live-state.json`: compact registry and review summary.
- `n8n/*.workflow.json`: raw n8n MCP `get_workflow_details` readbacks.
- `elevenlabs/rb-call-bot.agent.json`: raw ElevenLabs agent readback.
- `elevenlabs/rb-call-bot.tools.json`: raw ElevenLabs tool readbacks.

Run the sync again after manual UI edits:

```bash
npm run calls:sync-live-state
```
