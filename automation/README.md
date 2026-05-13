# Automation Source

Status: provisional.
Source: user instruction during RB calling-bot build.
Imported: 2026-05-12.
Review: confirm whether the local n8n MCP deploy helper should become the default publish path.

This folder stores source-controlled automation definitions and patch helpers for RB systems.

Runtime state remains in the live tools:

- n8n workflows run in n8n.
- ElevenLabs agents and tools run in ElevenLabs.
- Notion remains the source of truth for call records.

The files here are development accelerators only. Do not store API keys, MCP tokens, webhook secrets, phone numbers, full call transcripts, or live client payloads here.

## RB Calls Fast Edit Loop

1. Edit the relevant source file under `automation/n8n/rb-calls/` or `automation/elevenlabs/rb-calls/`.
2. Run `npm run calls:check-automation`.
3. Use n8n MCP to validate, update, and publish changed workflow source. For large workflow files, use `npm run calls:deploy-n8n-workflow -- --workflow-id <workflow-id> --file <workflow-file> --publish`; the wrapper reads local MCP auth from `~/.codex/config.toml` and does not print tokens.
4. Use `npm run calls:patch-elevenlabs-live-help`, `npm run calls:patch-elevenlabs-representation-opening`, `npm run calls:patch-elevenlabs-slow-identifiers`, `npm run calls:patch-elevenlabs-context-lookup`, or `npm run calls:patch-elevenlabs-startup-stability` only when ElevenLabs MCP cannot make the needed live agent/tool edit and the user has approved the exact live change.
5. Re-read the live n8n workflow or ElevenLabs agent after each deploy and record only non-secret IDs and behavior summaries in repo memory.

The local source files prevent repeated reconstruction of large workflow payloads. They are not a local runtime and they do not replace n8n or ElevenLabs.

To snapshot the current live state after manual n8n or ElevenLabs edits, run:

```bash
npm run calls:sync-live-state
```

This reads n8n through the local MCP connection and ElevenLabs through the local API key, then writes reviewable readbacks under `automation/live-readbacks/`. The helper must not print or store tokens. The snapshots are source-control evidence of live configuration, not client call payload logs.

Current source-controlled calling-bot workflow files:

- `automation/n8n/deploy-workflow-mcp.mjs`: local n8n MCP deploy wrapper for validating, updating, and publishing checked-in workflow source without manually pasting large files into a tool call.
- `automation/sync-rb-calls-live-state.mjs`: local readback wrapper for syncing live n8n and ElevenLabs calling-bot configuration into reviewable snapshots.
- `automation/n8n/rb-calls/voice-execution.workflow.mjs`: `RB Calls Voice Execution`; includes call locking, direct Company/Individual/Contact and tax-registration startup context, minimal ElevenLabs outbound-call payload construction, and on-demand lookup guidance.
- `automation/n8n/rb-calls/live-help.workflow.mjs`: `RB Calls Live Help`; handles the five-minute Slack live-help loop.
- `automation/n8n/rb-calls/elevenlabs-events.workflow.mjs`: `RB Calls ElevenLabs Events`; handles post-call events and no-answer sweeps.
- `automation/n8n/rb-calls/context-lookup.workflow.mjs`: `RB Calls Context Lookup`; serves the ElevenLabs `lookup_call_context` webhook and queries only the pre-approved Notion context categories on demand.
- `automation/elevenlabs/rb-calls/patch-agent-context-lookup.mjs`: creates/updates the ElevenLabs `lookup_call_context` shared webhook tool and routes it through the dedicated `Context Lookup Tool` workflow node before live-help escalation.
- `automation/elevenlabs/rb-calls/patch-agent-representation-opening.mjs`: patches the RB Call Bot opening identity, default English first message, German language-preset first message, per-call language control, caller/representative placeholders, and PoA/Vollmacht fallback rules.
- `automation/elevenlabs/rb-calls/patch-agent-slow-identifiers.mjs`: patches the RB Call Bot prompt so numbers, registration numbers, tax references, and alphanumeric identifiers are spoken much, much slower with explicit pauses.
- `automation/elevenlabs/rb-calls/patch-agent-startup-stability.mjs`: restores the known-stable short first message `Hello`, disables global background music at call startup, and keeps identity/representative wording in the first substantive response after the contact answers.
- `automation/elevenlabs/rb-calls/inspect-agent.mjs`, `automation/elevenlabs/rb-calls/inspect-agent-text.mjs`, `automation/elevenlabs/rb-calls/inspect-conversation.mjs`, and `automation/elevenlabs/rb-calls/inspect-conversation-detail.mjs`: read-only diagnostics for live agent config, prompt/tool text, conversation dynamic variables, and conversation failures without printing API keys.
- `automation/live-readbacks/`: latest non-secret readbacks from live n8n workflows and the ElevenLabs agent/tool configuration.
