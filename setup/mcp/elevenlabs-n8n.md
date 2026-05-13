# ElevenLabs And n8n MCP Setup

Status: provisional.
Source: user instruction, official ElevenLabs MCP README at `https://github.com/elevenlabs/elevenlabs-mcp`, official n8n instance-level MCP docs at `https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/`, local Codex setup performed on 2026-05-08, and Internal Knowledge Base mirror at `https://www.notion.so/35ae413013148134a466d9c13e2b6ee3`.
Imported: 2026-05-08.
Review: confirm which RB operators should have ElevenLabs/n8n MCP access, which n8n workflows should be exposed, and whether ElevenLabs credit-spending actions require a stricter local approval policy.

This guide sets up local Codex access to ElevenLabs and n8n through MCP.

Use this for RB automation work where Codex needs to inspect or build voice-agent assets in ElevenLabs and workflow orchestration in n8n. Do not store live API keys, MCP tokens, webhook secrets, phone numbers, client call transcripts, or client payload examples in git.

## What This Enables

- ElevenLabs MCP: Codex can use the official local ElevenLabs MCP server to inspect or manage ElevenLabs resources such as voices, audio, transcription, and agents.
- n8n instance-level MCP: Codex can connect to an n8n instance, search workflows, inspect workflows explicitly exposed to MCP, run/test exposed workflows, and, on supported n8n versions, create or edit workflows.

These are separate connections. ElevenLabs MCP does not connect n8n to ElevenLabs by itself; n8n still needs workflow nodes or HTTP requests to call ElevenLabs APIs.

As of 2026-05-11, the exposed ElevenLabs MCP can inspect agent state but may not expose every live editing action needed for tool schema or agent workflow updates. If a required ElevenLabs edit is unavailable through MCP, use the ElevenLabs API only after the user explicitly approves the concrete live change. Keep the API key in local config or a local secret store, never in git.

## RB Calling Bot Runtime Credentials

MCP access lets Codex inspect and publish workflows, but the live n8n workflows also need their own runtime credentials.

For `RB Calls Live Help`, the n8n Slack credential used on the RB calls channel must be able to post messages and read private-channel threads. For a private Slack channel this requires `groups:history`; keep `chat:write` for posting, and add `channels:history` as well if the channel is public or may move. After changing Slack app scopes, reinstall the Slack app to the workspace and reconnect or refresh the n8n credential.

If `check_creator_help` returns no answer even though a reply exists in the Slack thread, test the live-help workflow and look for `Your Slack credential is missing required Oauth Scopes`. That means the bot cannot read thread replies until the Slack credential has the required history scope.

## What Lives In Git

- This setup guide.
- Placeholder Codex config snippets.
- General setup and verification instructions.

## What Must Stay Local

Do not commit or paste into chat:

- ElevenLabs API keys.
- n8n MCP server tokens.
- n8n REST API keys.
- n8n webhook secrets.
- ElevenLabs webhook signing secrets.
- Live n8n instance URLs if the user treats them as private.
- Client call payloads, call recordings, transcripts, or phone numbers.
- Personal Codex config in `~/.codex/config.toml`.

## Prerequisites

Confirm `uvx` exists:

```bash
which uvx
```

If missing, install `uv` first. Example output on one RB workstation:

```text
/Users/eranpeer/.local/bin/uvx
```

Use the path returned by `which uvx` in the local Codex config.

## Add ElevenLabs MCP To Codex

Add this to `~/.codex/config.toml`, replacing the `command` path if needed:

```toml
[mcp_servers.elevenlabs]
command = "PUT_ABSOLUTE_UVX_PATH_HERE"
args = ["elevenlabs-mcp"]
env = { ELEVENLABS_API_KEY = "PUT_ELEVENLABS_API_KEY_HERE" }
startup_timeout_sec = 30
tool_timeout_sec = 300
default_tools_approval_mode = "prompt"
```

Where to get the token:

1. Open ElevenLabs.
2. Generate or copy a scoped API key for the account Codex should use.
3. Replace `PUT_ABSOLUTE_UVX_PATH_HERE` locally with the output of `which uvx`.
4. Replace `PUT_ELEVENLABS_API_KEY_HERE` locally in `~/.codex/config.toml`.

The approval mode should stay `prompt` unless the user explicitly changes it. ElevenLabs MCP actions may spend credits or create/update live voice-agent resources.

## Add n8n Instance-Level MCP To Codex

In n8n:

1. Navigate to `Settings > Instance-level MCP`.
2. Toggle `Enable MCP access`.
3. Open `Connection details`.
4. Use the `Access Token` tab.
5. Copy the instance MCP server URL and the personal MCP access token.
6. Enable MCP access for the specific workflows Codex should inspect or edit.

Add this to `~/.codex/config.toml`:

```toml
[mcp_servers.n8n]
url = "PUT_N8N_MCP_SERVER_URL_HERE"
http_headers = { "authorization" = "Bearer PUT_N8N_MCP_TOKEN_HERE" }
```

Replace:

- `PUT_N8N_MCP_SERVER_URL_HERE` with the server URL from n8n, usually `https://<your-n8n-domain>/mcp-server/http`.
- `PUT_N8N_MCP_TOKEN_HERE` with the personal MCP access token.

n8n does not expose every workflow automatically. The user must enable MCP per workflow. If workflows are not exposed, Codex may only be able to search workflow previews.

## Optional n8n REST API Key

The n8n MCP connection is the preferred development control path. For export/import or mechanical API work, the user may also provide a separate n8n REST API key.

Store that only in local config, a local password manager, or a local ignored `.env` file. Do not commit it.

When using the REST API directly, n8n API keys are sent with:

```text
X-N8N-API-KEY: <token>
```

## Optional ElevenLabs API Fallback

The ElevenLabs MCP connection is the preferred control path. Use direct ElevenLabs API calls only for gaps the current MCP tools do not expose, such as updating an existing webhook tool schema, creating a webhook tool, or patching agent prompt/workflow configuration.

Rules:

1. Get explicit user approval for the exact live ElevenLabs change before writing.
2. Read current agent/tool state first and patch only the required fields.
3. Do not print or store the API key.
4. Re-read the agent/tool after the update and record only non-secret IDs, configuration summaries, and remaining blockers.
5. Keep production calls disabled until the synthetic test plan passes.

For the RB calling bot, the current shared live-help tools are:

- `request_creator_help` (`tool_0701krd392jge1z9q058dvh25kn7`) for `action: start`.
- `check_creator_help` (`tool_7901krd392jhefv9x4btx1jmxfdb`) for `action: check`.

The earlier 2026-05-11 tool IDs `tool_0001kqfd5skhfn3vnpww2s6fnt6r` and `tool_5801krbamtebe6zvs5qfa023x9eh` were superseded/deleted and must not be reattached to the agent.

As of 2026-05-12, the live `RB Call Bot` root prompt has no custom `tool_ids`. Live-help tool calls are routed only through the relevant ElevenLabs workflow tool nodes:

- `node_rb_live_start_v2` calls `request_creator_help`.
- `node_rb_live_check_v2` calls `check_creator_help`.

Override-agent workflow nodes, including the opening agent, should not carry live-help tools in `additional_tool_ids`.

## Faster Calling-Bot Edit Loop

Status: provisional.
Source: user instruction on 2026-05-12 after slow n8n and ElevenLabs iteration.
Imported: 2026-05-12.
Review: confirm whether the local n8n MCP deploy helper should become the default for all workflow publishes.

The live runtime must remain in n8n and ElevenLabs, but source-controlled patch files now live under `automation/` so future edits do not need to be reconstructed from scratch.

Use:

```bash
npm run calls:check-automation
```

This syntax-checks the checked-in n8n workflow source and ElevenLabs patch helper.

After manual n8n or ElevenLabs UI edits, sync the live runtime back into reviewable repo snapshots:

```bash
npm run calls:sync-live-state
```

This writes `automation/live-readbacks/rb-calls-live-state.json` plus per-workflow and per-agent readbacks. It reads local n8n MCP and ElevenLabs credentials but must not print or commit tokens. Use these readbacks to review manual changes before translating them into source edits or publishing future workflow versions.

For n8n changes:

1. Edit `automation/n8n/rb-calls/live-help.workflow.mjs` or `automation/n8n/rb-calls/elevenlabs-events.workflow.mjs`.
2. Run `npm run calls:check-automation`.
3. Ask Codex to validate, update, and publish the changed workflow through n8n MCP. For large workflow files, Codex can run the local wrapper:

```bash
npm run calls:deploy-n8n-workflow -- --workflow-id <workflow-id> --file automation/n8n/rb-calls/<workflow>.workflow.mjs --name "<workflow name>" --description "<short description>" --publish
```

The wrapper reads the n8n MCP URL/auth header from local `~/.codex/config.toml`, does not print the token, calls MCP `validate_workflow`, `update_workflow`, and optionally `publish_workflow`, then prints only non-secret workflow IDs/version summaries.

4. Re-read the live workflow and record the active version ID in the implementation map and memory.

For ElevenLabs changes that MCP cannot perform:

1. Confirm the exact live change with the user.
2. Put `ELEVENLABS_API_KEY` and, if needed, `RB_ELEVENLABS_AGENT_ID` in local ignored `.env` or `~/.codex/config.toml`.
3. Create or reuse a private one-off patch script under `.codex-local/automation/elevenlabs/`.
4. Run a dry run from that private folder when the script supports it, then apply after approval.
5. Verify by re-reading the live agent through MCP or API readback. Do not commit or print the API key.
6. Commit only reusable shared helpers, docs, and non-secret live readbacks. Do not commit one-off ElevenLabs mutators or add npm scripts that call them.

The source-controlled `automation/elevenlabs/` folder is reserved for reusable read-only diagnostics and reusable utilities. Prompt patchers, migration scripts, and emergency live mutators belong in the private ignored `.codex-local/automation/elevenlabs/` folder.

This is a development accelerator only. It does not add local runtime functions to the calling bot.

Current RB live-help patch target as of 2026-05-13:

- n8n `RB Calls Live Help` enforces a five-minute hold as ten 30-second pending periods.
- n8n ignores placeholder/ancient `expires_at` values such as `1970-01-01T00:00:00.000Z` and computes the live-help expiry from the start time.
- Slack read errors retry as pending until the five-minute cap instead of immediately returning terminal fallback.
- ElevenLabs `request_creator_help` should ask for help once, then the agent may say one short hold phrase and keep the caller on the line.
- ElevenLabs `check_creator_help` should be called after each 30-second period; n8n also waits 30 seconds before returning a pending result, so accidental early checks do not create a tight speech loop.
- ElevenLabs workflow routing must treat `pending` as non-terminal. Pending routes back to the live-help check bridge; only explicit `timed_out`, `read_error`, or caller refusal routes to outcome/fallback.
- ElevenLabs global background music is currently disabled because the `elevator2` startup setting correlated with one-second/two-second technical-failure calls and played immediately on opening. Reintroduce hold audio only after a stable startup retry, and preferably through a hold-only mechanism rather than global call music.
- The live-help tools should have `response_timeout_secs` of at least 60 seconds so a 30-second n8n Wait has margin.

Current RB call-opening and language patch target as of 2026-05-13:

- Default English first audible message: `Hello, my name is Alexander Gulin. I am calling regarding an administrative matter for a client and would like to make sure I am speaking with the right department.`
- German first audible message lives in the ElevenLabs `de` language preset and is the German equivalent of the default opener.
- The first message is intentionally static and contains no `{{...}}` placeholders because direct/manual ElevenLabs tests may start without n8n client data.
- n8n must set `conversation_initiation_client_data.conversation_config_override.agent.language` on the outbound-call API payload: `de` for German contacts and `en` otherwise. The prompt variables `language` and `language_code` are only support context; the API override is what selects the actual call language.
- Immediately after the authority/contact answers, identify Alexander Gulin and the represented subject in the call language if available.
- n8n `RB Calls Voice Execution` must send `caller_name`, `represented_subject`, `representative_entity`, `representative_role`, `representation_authority`, and `poa_speech_rule`.
- The ElevenLabs agent-level placeholder registry must include safe defaults for every n8n dynamic variable used by the agent/tools, including live-help IDs and full context JSON variables, so missing direct-test client data degrades into fallback wording rather than a technical failure.
- Richmond Blackwood Limited is not mentioned in the first substantive sentence.
- For company-subject calls, Richmond Blackwood Limited is introduced after the opener as the company secretary, which is the representative position.
- Power of Attorney / Vollmacht is not the default opening authority. Use it only when `Requires PoA?` is true or the authority specifically requires it.

Current RB slow-identifier and startup-payload patch target as of 2026-05-13:

- Current ElevenLabs prompt version `agtvrsn_0701krha08p6ewwv0fygbnjv0k6p` contains `Pronunciation And Spelling`, `Identifier Pronunciation - Prompt Controlled`, `Slow Number Delivery - Hard Rule`, the startup-safe static first-message rule, no root custom `tool_ids`, Notion lookup-before-live-help rules, lookup routing through the dedicated `node_rb_lookup_tool_v1` and `node_rb_lookup_result_v1` workflow nodes, and live-help routing through `node_rb_live_start_v2` and `node_rb_live_check_v2`.
- Identifier pronunciation is language-specific in all languages, and English is as important as German. Abbreviations are hyphenated letter runs, not comma-separated letters and not words: `V-A-T`, `P-O-A`, `U-B-O`, `R-B-O`, `E-O-R-I`, `P-P-S-N`, `U-T-R`, `T-A-I-N`, `R-O-S`, `H-M-R-C`, `C-R-O`, `I-D`, and `R-B`. English calls use English digit and letter names; German calls use German digit words (`null`, `eins`, `zwei`, `drei`, `vier`, `fünf`, `sechs`, `sieben`, `acht`, `neun`) and German letter names. If the authority is confused by letters, use NATO for English calls, German Buchstabiertafel for German calls, and the closest recognized spelling alphabet for other call languages. Do not use literal `pause` words or ellipses for timing; use commas for short numeric separation and periods for longer breaks. Do not implement pronunciation normalization in n8n; keep n8n sending exact raw identifiers and enforce spoken delivery in the ElevenLabs prompt.

## Current RB Context Lookup Target

Status: provisional.
Source: user instruction and live n8n/ElevenLabs updates on 2026-05-12.
Imported: 2026-05-12.
Review: grant the Notion integration access to the Contracts database or confirm contract lookups may remain partial.

The calling bot now keeps ElevenLabs startup context small and plain text. `RB Calls Voice Execution` strips raw JSON blobs before calling ElevenLabs and sends only a startup brief containing:

- tax registration/reference context for the linked Company and Individual fields
- direct Contact summary
- direct Company summary
- direct Individual summary
- call objective, representative authority, PoA handling, owner/routing metadata, and live-help sentinels

For all other approved categories, ElevenLabs uses shared webhook tool `lookup_call_context` (`tool_4501kremgshnej7rtqftyxxgd3jb`) against n8n workflow `RB Calls Context Lookup` (`i3rv4G6FmfosQm5j`). The tool is not attached directly to override-agent `additional_tool_ids`; `Authority / PoA Handling`, `Main Authority Conversation`, `Routing / Callback Details`, `Continue via Correct Route`, and `IVR / Menu Navigation` route into the concrete `Context Lookup Tool` workflow node (`node_rb_lookup_tool_v1`), then through `Context Lookup Result` (`node_rb_lookup_result_v1`). The lookup tool uses immediate execution mode with interruptions disabled, so the agent can briefly keep the contact on the line while the lookup runs and still use the result when it arrives. The agent must try this Notion lookup before using Slack live help whenever the missing fact fits an allowed category. The allowed categories are `tax_registrations`, `tax_filings`, `contracts`, `correspondence`, `bank_accounts`, `tax_payments_prepayments`, `assets`, and `call_notes`. The n8n lookup workflow routes by requested category before querying Notion, excludes Notion file properties, redacts inline URLs in lookup text, and returns `status: partial` if a permitted source is unavailable.
- n8n sends raw identifiers only; it does not add `spoken` fields, `Say as:` lines, or local pronunciation transforms.
- The prompt tells the agent to preserve exact raw values and say numbers, registration numbers, tax references, phone numbers, and alphanumeric strings much, much slower than normal speech.
- The prompt requires tiny chunks, commas for short numeric grouping, periods for longer breaks, hyphenated abbreviation/letter runs, letter-by-letter spelling, and slower repeat delivery when the contact asks.
- Agent-level dynamic-variable placeholders must keep defaults for `call_id`, `call_public_id`, `call_url`, the `live_help_*` sentinels, `system__conversation_id`, `system__conversation_history`, `lookup_allowed_categories`, and `tax_registration_context_json`. ElevenLabs may fail conversation startup before any webhook runs if workflow tools reference variables that are missing from this registry.
- Current n8n `RB Calls Voice Execution` active version `239b8ddf-4528-44dc-945d-2646ad49fa85` sends plain-text startup context and strips raw JSON blobs before the ElevenLabs outbound call. Detailed non-startup records are fetched through `lookup_call_context` during the call. `Build Voice Payload` reads upstream nodes through raw n8n `$items(...)` access rather than `$()` helpers, so it does not depend on paired-item ancestry from `Build Linked Record Queue`.
- Full normalized JSON is not sent at call startup because that correlated with ElevenLabs technical-failure calls. Detailed Company/Individual/Contact/tax/correspondence/filing/payment/asset/call-note facts should be returned through the on-demand lookup workflow as focused plain-text/tool results. Notion file objects, file URLs, file names, and file bodies remain excluded; only file-property counts may be retained for coverage.

## Calling Bot Runtime Secrets And Variables

Status: provisional.
Source: Richmond Blackwood calling bot build on 2026-05-08.
Imported: 2026-05-08.
Review: confirm final operator ownership before activation.

The MCP tokens above let Codex inspect and build. They do not automatically give n8n permission to call ElevenLabs during a workflow run. For the RB calling bot, configure the runtime credential and variable inside n8n:

1. Preferred current setup: create or select an n8n predefined `ElevenLabs API` credential for the ElevenLabs account.
2. Open `RB Calls Voice Execution` and attach that credential to the `Make ElevenLabs Outbound Call` HTTP Request node.
3. Add n8n variable `ELEVENLABS_API_KEY`. `RB Calls ElevenLabs Events` reads this variable directly for the `Get ElevenLabs Conversation` status-check request because n8n MCP workflow updates do not reliably preserve HTTP Request credentials.
4. Add n8n variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID`.
5. Set that variable to the ElevenLabs phone-number ID after an ElevenLabs phone number is added or connected.
6. After any Codex/n8n MCP workflow update, visually recheck the `Make ElevenLabs Outbound Call` credential in n8n. The n8n MCP SDK update path may not auto-assign HTTP Request credentials.

Do not put either value in this repo, workflow descriptions, sticky notes, chat messages, or screenshots committed to git.

Current RB calling bot workflows:

- `RB Calls Voice Execution`: starts outbound calls for approved/reviewed Notion Calls.
- `RB Calls Live Help`: receives ElevenLabs mid-call help requests and returns Slack answers.
- `RB Calls ElevenLabs Events`: receives ElevenLabs post-call and failure events, and runs a one-minute no-answer watchdog that checks `Call Started` records older than two minutes.

Keep candidate Calls unapproved unless deliberately running a controlled synthetic test. The ElevenLabs events and live-help webhooks are currently protected by ElevenLabs static egress IP allowlisting. The ElevenLabs workspace webhook also has a signing secret, but n8n HMAC validation is not implemented yet; if HMAC validation is later added, rotate/recreate the secret and store it only in n8n credentials or variables.

## Reload Codex

After editing `~/.codex/config.toml`, restart or reload Codex so it discovers the new MCP servers.

Expected server names:

- `elevenlabs`
- `n8n`

## Verification

1. Confirm the local config has placeholder-free values:

```bash
rg -n "PUT_ELEVENLABS|PUT_N8N" ~/.codex/config.toml
```

Expected result after setup: no matches.

2. Restart or reload Codex.
3. Ask Codex to list available MCP tools for ElevenLabs and n8n.
4. For ElevenLabs, start with a read-only action before creating agents, voices, or audio.
5. For n8n, ask Codex to search workflows first, then inspect only the workflow relevant to the current task.
6. If Codex cannot see a workflow, enable `Available in MCP` for that workflow in n8n and reload the MCP connection.
7. For the calling bot, confirm the n8n `Make ElevenLabs Outbound Call` node has a selected ElevenLabs credential and `ELEVENLABS_AGENT_PHONE_NUMBER_ID` is set before approving a Call for dialing.

## Richmond Blackwood Operating Rules

- Keep API keys, MCP tokens, webhook secrets, and live credential screenshots out of git and chat.
- Use prompt approval for ElevenLabs and n8n MCP tools unless the user explicitly approves a narrower trusted automation pattern.
- For client-specific calling bot data, route durable facts to the correct `clients/Companies/<client-reference>/` or `clients/Individuals/<legal-name>/` file only after resolving the Notion identity.
- Do not store raw call recordings or full transcripts in git. Store pointers, status, source registers, and routing notes only.
- For n8n workflows connected to Notion, make sure the Notion integration has access to each required RB database and company/client page. If a company is missing from the Notion integration permissions, n8n may fail even when Codex can see the workflow.
- For calling-bot work, first inspect the existing Notion `Authority Liasion Bot`, `Automated calling bot for calling authorities`, and `Call Outbound Bot` records before creating replacement structures.

## Troubleshooting

- If ElevenLabs MCP fails with `spawn uvx ENOENT`, run `which uvx` and replace the `command` path in `~/.codex/config.toml` with the absolute path.
- If n8n MCP connects but cannot inspect workflows, enable MCP access for the workflow in n8n.
- If n8n can only search previews, confirm the workflow is exposed to MCP and the user account tied to the MCP token has access.
- If workflow editing is unavailable, confirm the n8n version and permissions. n8n's workflow building/editing support depends on the instance-level MCP feature set available in that version.
- If tokens were pasted into chat or committed by mistake, rotate them immediately in ElevenLabs or n8n.
