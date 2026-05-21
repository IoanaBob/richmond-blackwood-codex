# Automation Source

Status: provisional.
Source: user instruction during RB calling-bot build.
Imported: 2026-05-12.
Review: confirm whether the local n8n MCP deploy helper should become the default publish path.

This folder stores source-controlled automation definitions, reusable deploy/readback helpers, and reusable read-only diagnostics for RB systems.

Runtime state remains in the live tools:

- n8n workflows run in n8n.
- ElevenLabs agents and tools run in ElevenLabs.
- Notion remains the source of truth for call records.

The files here are development accelerators only. Do not store API keys, MCP tokens, webhook secrets, phone numbers, full call transcripts, or live client payloads here.

## RB Calls Fast Edit Loop

1. Edit the relevant reusable source file under `automation/n8n/rb-calls/` or reusable read-only diagnostic under `automation/elevenlabs/rb-calls/`.
2. Run `npm run calls:check-automation`.
3. Use n8n MCP to validate, update, and publish changed workflow source. For large workflow files, use `npm run calls:deploy-n8n-workflow -- --workflow-id <workflow-id> --file <workflow-file> --publish`; the wrapper reads local MCP auth from `~/.codex/config.toml` and does not print tokens.
4. Keep one-off ElevenLabs live patch scripts out of git under `.codex-local/automation/elevenlabs/`. Create or reuse private patch scripts there only when ElevenLabs MCP cannot make the needed live agent/tool edit and the user has approved the exact live change.
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
- `automation/elevenlabs/rb-calls/inspect-agent.mjs`, `automation/elevenlabs/rb-calls/inspect-agent-text.mjs`, `automation/elevenlabs/rb-calls/inspect-conversation.mjs`, and `automation/elevenlabs/rb-calls/inspect-conversation-detail.mjs`: read-only diagnostics for live agent config, prompt/tool text, conversation dynamic variables, and conversation failures without printing API keys.
- `automation/elevenlabs/rb-calls/configure-sip-trunk-phone.mjs`: reusable setup helper for importing/updating an ElevenLabs SIP-trunk phone number backed by Twilio Elastic SIP Trunking.
- `automation/elevenlabs/rb-calls/enable-sip-out-of-band-dtmf.mjs`: reusable setup helper for enabling RFC 4733 out-of-band D-T-M-F on the RB Call Bot keypad tools for SIP trunk calls.
- `automation/live-readbacks/`: latest non-secret readbacks from live n8n workflows and the ElevenLabs agent/tool configuration.

One-off ElevenLabs mutators, prompt patchers, and migration scripts are private operational scratch files. Store them under `.codex-local/automation/elevenlabs/`, keep them out of npm scripts, and commit only the resulting non-secret live readback plus reusable process documentation.
