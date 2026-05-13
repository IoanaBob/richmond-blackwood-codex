import fs from 'node:fs';
import os from 'node:os';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const LIVE_HELP_START_NODE_ID = 'node_rb_live_start_v2';
const LIVE_HELP_CHECK_NODE_ID = 'node_rb_live_check_v2';
const LIVE_HELP_HOLD_NODE_ID = 'node_rb_live_hold_v2';
const LIVE_HELP_RESULT_NODE_ID = 'node_rb_live_result_v2';
const dryRun = process.argv.includes('--dry-run');

const staleHoldPatterns = [
  '8-12',
  '8 to 12',
  'roughly 8',
  '12 seconds',
  'short reassurance',
  'configured background tune',
  'hold tune',
  'with the tune',
  'quietly on hold',
  'hold quietly',
  'quiet hold',
  'holding quietly',
  'stay quiet during',
];

function loadLocalEnv() {
  const envPath = new URL('../../../.env', import.meta.url);
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalsAt = trimmed.indexOf('=');
    if (equalsAt < 1) continue;
    const key = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] ||= value;
  }
}

function readCodexElevenLabsKey() {
  const configPath = `${os.homedir()}/.codex/config.toml`;
  if (!fs.existsSync(configPath)) return '';
  const config = fs.readFileSync(configPath, 'utf8');
  return config.match(/ELEVENLABS_API_KEY\s*=\s*"([^"]+)"/)?.[1] || '';
}

loadLocalEnv();
const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) {
  throw new Error('Missing ELEVENLABS_API_KEY. Put it in a local ignored .env file or ~/.codex/config.toml.');
}

const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const headers = { 'xi-api-key': apiKey, 'Content-Type': 'application/json' };

async function request(method, url, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!response.ok) {
    throw new Error(`${method} ${url} failed ${response.status}: ${text.slice(0, 1000)}`);
  }
  return json;
}

async function listTools() {
  const response = await request('GET', 'https://api.elevenlabs.io/v1/convai/tools?page_size=100');
  return Array.isArray(response.tools) ? response.tools : [];
}

async function getTool(toolId) {
  return request('GET', `https://api.elevenlabs.io/v1/convai/tools/${toolId}`);
}

async function patchTool(toolId, toolConfig) {
  return request('PATCH', `https://api.elevenlabs.io/v1/convai/tools/${toolId}`, { tool_config: toolConfig });
}

function replaceSection(prompt, title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (prompt.includes(title)) {
    return prompt.replace(new RegExp(`${escaped}[\\s\\S]*?(?=\\n# |$)`), body);
  }
  return `${prompt.trim()}\n\n${body}`;
}

function replaceFirstKnownSection(prompt, titles, body) {
  for (const title of titles) {
    if (prompt.includes(title)) return replaceSection(prompt, title, body);
  }
  return replaceSection(prompt, titles[titles.length - 1], body);
}

function replaceStaleHoldText(text) {
  return text
    .replace(
      /After roughly 8 to 12 seconds, or sooner if the contact asks for an update, move to check_creator_help with the same returned IDs\./gi,
      'After the 30-second hold/check period, move to check_creator_help with the same returned IDs.'
    )
    .replace(
      /Never leave the caller without a short reassurance for more than about 12 seconds unless the contact is actively speaking\./gi,
      'Do not reassure every few seconds; do not speak during the 30-second check period unless the contact speaks or asks for an update.'
    )
    .replace(/before checking again in roughly 8 to 12 seconds/gi, 'before checking again after the 30-second hold/check period')
    .replace(/check with check_creator_help every 8-12 seconds while pending/gi, 'check with check_creator_help while pending without narrating each poll')
    .replace(/call it again every 8-12 seconds, with a five-minute hard cap enforced by n8n/gi, 'call it again after each pending response, with a five-minute hard cap enforced by n8n')
    .replace(/tell the authority briefly that you are still checking and call `check_creator_help` again after roughly 8 to 12 seconds/gi, 'keep the line open unless the caller asks and call `check_creator_help` again only after each 30-second pending response')
    .replace(/with the configured background tune/gi, 'with the line open')
    .replace(/let the configured background tune play/gi, 'keep the line open')
    .replace(/configured background tune/gi, 'hold period')
    .replace(/hold tune/gi, 'hold')
    .replace(/with the tune/gi, 'while waiting')
    .replace(/keep the authority quietly on hold/gi, 'keep the line open')
    .replace(/keep the caller quietly on hold/gi, 'keep the caller on the line')
    .replace(/quietly on hold/gi, 'on the line')
    .replace(/hold quietly/gi, 'wait without speaking')
    .replace(/quiet hold/gi, 'silent hold')
    .replace(/holding quietly/gi, 'waiting')
    .replace(/stay quiet during/gi, 'do not speak during');
}

function makeLlmEdge(source, target, condition) {
  return {
    source,
    target,
    forward_condition: { label: null, type: 'llm', condition },
    backward_condition: null,
  };
}

function makeResultEdge(source, target, successful) {
  return {
    source,
    target,
    forward_condition: { label: null, type: 'result', successful },
    backward_condition: null,
  };
}

function collectStaleTextMatches(value, pathParts = [], matches = []) {
  if (typeof value === 'string') {
    const normalized = value.replace(/\s+/g, ' ');
    for (const pattern of staleHoldPatterns) {
      const index = normalized.toLowerCase().indexOf(pattern.toLowerCase());
      if (index < 0) continue;
      matches.push({
        path: pathParts.join('.'),
        pattern,
        excerpt: normalized.slice(Math.max(0, index - 80), Math.min(normalized.length, index + pattern.length + 140)),
      });
    }
    return matches;
  }
  if (!value || typeof value !== 'object') return matches;
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectStaleTextMatches(child, [...pathParts, String(index)], matches));
    return matches;
  }
  for (const [key, child] of Object.entries(value)) {
    collectStaleTextMatches(child, [...pathParts, key], matches);
  }
  return matches;
}

function updateToolReference(existing, toolId) {
  if (!existing || typeof existing !== 'object' || Array.isArray(existing)) return { tool_id: toolId };
  const next = { ...existing };
  if (Object.prototype.hasOwnProperty.call(next, 'tool_id')) next.tool_id = toolId;
  else if (Object.prototype.hasOwnProperty.call(next, 'id')) {
    delete next.id;
    next.tool_id = toolId;
  } else if (Object.prototype.hasOwnProperty.call(next, 'toolId')) next.toolId = toolId;
  else next.tool_id = toolId;
  delete next.name;
  delete next.tool_name;
  return next;
}

function workflowToolIds(node) {
  return Array.isArray(node?.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [];
}

function ensureToolNode(nodes, nodeId, toolId, changes) {
  const node = nodes[nodeId];
  if (!node || !toolId) return;
  const previous = workflowToolIds(node);
  const existing = Array.isArray(node.tools) ? node.tools[0] : null;
  node.tools = [updateToolReference(existing, toolId)];
  const next = workflowToolIds(node);
  if (JSON.stringify(previous) !== JSON.stringify(next)) {
    changes.push({ node_id: nodeId, action: 'attach_workflow_tool', previous_tool_ids: previous, next_tool_ids: next });
  }
}

function ensureOverrideToolAccess(nodes, nodeId, toolId, changes) {
  const node = nodes[nodeId];
  if (!node || !toolId) return;
  const previous = Array.isArray(node.additional_tool_ids) ? node.additional_tool_ids : [];
  const next = [toolId];
  node.additional_tool_ids = next;
  const nestedPrompt = node.conversation_config?.agent?.prompt;
  if (nestedPrompt && typeof nestedPrompt === 'object') {
    nestedPrompt.tool_ids = [];
    delete nestedPrompt.tools;
  }
  if (JSON.stringify(previous) !== JSON.stringify(next)) {
    changes.push({ node_id: nodeId, action: 'attach_live_help_check_access', previous_tool_ids: previous, next_tool_ids: next });
  }
}

function patchWorkflowLiveHelp(workflow, liveHelpToolIds) {
  const nodes = workflow?.nodes || {};
  const edges = workflow?.edges || {};
  const changes = [];

  const liveHelpHoldPrompt = 'Live-help check bridge. A live-help request is already in progress. Do not call request_creator_help again. Use check_creator_help with the same returned IDs. The check tool and n8n control the 30-second wait and play the configured hold music during the check. If the contact asks what is happening, give one short natural acknowledgement and continue the same check. Do not narrate tool/status values, and do not mention Slack, n8n, tools, dynamic variables, workflow state, or internal notes.';
  const liveHelpResultPrompt = 'Live-help result stage. If check_creator_help returns answered, use the answer immediately and return to the authority conversation. If it returns pending, this is not a failure or timeout: do not say pending, None, still checking, checking now, or any tool/status value aloud; use check_creator_help again with the same IDs so n8n controls the next 30-second wait and hold music. Never move to fallback or outcome on a pending result. Only move to conservative manual follow-up if check_creator_help explicitly returns timed_out, read_error, or the contact explicitly refuses to keep holding. Never create a second live-help request for the same issue.';

  for (const [nodeId, replacement] of Object.entries({
    [LIVE_HELP_HOLD_NODE_ID]: liveHelpHoldPrompt,
    [LIVE_HELP_RESULT_NODE_ID]: liveHelpResultPrompt,
  })) {
    const node = nodes[nodeId];
    if (!node || typeof node !== 'object') continue;
    const before = node.additional_prompt || '';
    const next = replaceStaleHoldText(replacement);
    if (before !== next) {
      changes.push({ node_id: nodeId, label: node.label || '', changed: true });
      node.additional_prompt = next;
    }
  }

  for (const [nodeId, node] of Object.entries(nodes)) {
    if (!node || typeof node !== 'object') continue;
    if (typeof node.additional_prompt !== 'string') continue;
    const before = node.additional_prompt;
    const next = replaceStaleHoldText(before);
    if (before !== next) {
      changes.push({ node_id: nodeId, label: node.label || '', changed: true, stale_text_replaced: true });
      node.additional_prompt = next;
    }
  }

  const edgeTargets = {
    edge_rb_live_start_ok_v2: makeResultEdge(LIVE_HELP_START_NODE_ID, LIVE_HELP_CHECK_NODE_ID, true),
    edge_rb_live_hold_check_v2: makeLlmEdge(
      LIVE_HELP_HOLD_NODE_ID,
      LIVE_HELP_CHECK_NODE_ID,
      'Always move immediately to check_creator_help with the same IDs. Do not wait in this node and do not describe the hold.'
    ),
    edge_rb_live_result_main_v2: makeLlmEdge(
      LIVE_HELP_RESULT_NODE_ID,
      'node_rb_main_v2',
      'The latest check returned answered and the answer allows the main authority conversation to continue safely.'
    ),
    edge_rb_live_result_hold_v2: makeLlmEdge(
      LIVE_HELP_RESULT_NODE_ID,
      LIVE_HELP_HOLD_NODE_ID,
      'The latest check returned pending and the five-minute expiry has not passed. Pending is not a failure, timeout, or reason to end; route back to the check bridge with the same IDs.'
    ),
    edge_rb_live_result_outcome_v2: makeLlmEdge(
      LIVE_HELP_RESULT_NODE_ID,
      'node_rb_outcome_v2',
      'Only use this when the latest check explicitly returned timed_out or read_error, or when the contact explicitly refuses to keep holding. Do not use this edge for pending.'
    ),
  };
  for (const [edgeId, nextEdge] of Object.entries(edgeTargets)) {
    const before = JSON.stringify(edges[edgeId] || null);
    edges[edgeId] = nextEdge;
    if (JSON.stringify(edges[edgeId]) !== before) changes.push({ edge_id: edgeId, action: 'route_live_help_check_loop' });
  }
  if (nodes[LIVE_HELP_START_NODE_ID]) nodes[LIVE_HELP_START_NODE_ID].edge_order = ['edge_rb_live_start_ok_v2', 'edge_rb_live_start_fail_v2'];
  if (nodes[LIVE_HELP_RESULT_NODE_ID]) nodes[LIVE_HELP_RESULT_NODE_ID].edge_order = ['edge_rb_live_result_main_v2', 'edge_rb_live_result_hold_v2', 'edge_rb_live_result_outcome_v2'];
  if (nodes[LIVE_HELP_HOLD_NODE_ID]) nodes[LIVE_HELP_HOLD_NODE_ID].edge_order = ['edge_rb_live_hold_check_v2'];
  ensureToolNode(nodes, LIVE_HELP_START_NODE_ID, liveHelpToolIds.request_creator_help, changes);
  ensureToolNode(nodes, LIVE_HELP_CHECK_NODE_ID, liveHelpToolIds.check_creator_help, changes);
  ensureOverrideToolAccess(nodes, LIVE_HELP_HOLD_NODE_ID, liveHelpToolIds.check_creator_help, changes);
  ensureOverrideToolAccess(nodes, LIVE_HELP_RESULT_NODE_ID, liveHelpToolIds.check_creator_help, changes);

  workflow.nodes = nodes;
  workflow.edges = edges;
  return changes;
}

function ensureDynamicPlaceholder(tool, name) {
  if (!name) return;
  tool.dynamic_variables ||= {};
  tool.dynamic_variables.dynamic_variable_placeholders ||= {};
  tool.dynamic_variables.dynamic_variable_placeholders[name] ??= '';
}

function ensureBodyProperty(tool, name, dynamicVariable, description) {
  const schema = tool.api_schema?.request_body_schema;
  if (!schema?.properties) return false;
  schema.properties[name] = {
    type: 'string',
    description: dynamicVariable ? '' : description,
    enum: null,
    is_system_provided: false,
    dynamic_variable: dynamicVariable,
    constant_value: '',
  };
  ensureDynamicPlaceholder(tool, dynamicVariable);
  return true;
}

function sanitizeToolSchemaForPatch(tool) {
  const properties = tool.api_schema?.request_body_schema?.properties || {};
  for (const value of Object.values(properties)) {
    if (!value || typeof value !== 'object') continue;
    if (value.dynamic_variable) {
      value.description = '';
      delete value.is_system_provided;
      delete value.constant_value;
      continue;
    }
    if (value.constant_value !== undefined && value.constant_value !== '') {
      value.description = '';
      delete value.is_system_provided;
      delete value.dynamic_variable;
      continue;
    }
    if (value.description) {
      delete value.is_system_provided;
      delete value.dynamic_variable;
      delete value.constant_value;
    }
  }
}

function patchLiveHelpTool(tool) {
  if (!['request_creator_help', 'check_creator_help'].includes(tool.name)) return false;

  const isStart = tool.name === 'request_creator_help';
  tool.description = isStart
    ? 'Start exactly one Richmond Blackwood live-help request during an authority call. n8n posts one structured Slack thread and returns IDs for check_creator_help. Do not repeat this tool for the same issue. After this starts, route into check_creator_help with the same IDs; n8n performs each 30-second wait before returning pending.'
    : 'Check the existing Richmond Blackwood live-help Slack thread through n8n. n8n waits 30 seconds before returning pending, can recover the thread from recent channel history if the thread timestamp is missing or invalid, ignores placeholder expiry values, and enforces the five-minute timeout. Pending is not final. Do not post a new help request.';
  tool.execution_mode = 'immediate';
  tool.disable_interruptions = false;
  tool.response_timeout_secs = Math.max(Number(tool.response_timeout_secs || 0), 60);
  tool.force_pre_tool_speech = false;
  tool.pre_tool_speech = 'auto';
  tool.tool_call_sound = isStart ? null : 'elevator2';
  tool.tool_call_sound_behavior = isStart ? 'auto' : 'always';

  const requestSchema = tool.api_schema?.request_body_schema;
  if (requestSchema) {
    requestSchema.description = isStart
      ? 'Start one RB live-help request. Include owner/topic context so Slack messages follow RB standards. Do not use this for polling.'
      : 'Check the existing RB live-help request. Reuse IDs returned by request_creator_help or populated dynamic variables. n8n can recover the Slack thread if slack_thread_ts is missing or invalid.';
  }

  ensureBodyProperty(tool, 'owner_slack_member_id', 'owner_slack_member_id', 'Slack member ID for the call owner, if available.');
  ensureBodyProperty(tool, 'owner_mention', 'owner_mention', 'Slack mention for the call owner, if available.');
  ensureBodyProperty(tool, 'owner_name', 'owner_name', 'Human-readable owner name, if available.');
  ensureBodyProperty(tool, 'message_topic', 'message_topic', 'Short call topic used in RB Slack messages.');
  ensureDynamicPlaceholder(tool, 'call_id');
  ensureDynamicPlaceholder(tool, 'call_public_id');
  ensureDynamicPlaceholder(tool, 'system__conversation_id');
  ensureDynamicPlaceholder(tool, 'system__conversation_history');

  return true;
}

const liveHelpPromptOldTitles = ['# Live Help Hold Loop - Quiet Mode', '# Live Help Hold Loop - 30 Second Music Hold', '# Live Help Hold Loop - 30 Second Quiet Hold', '# Live Help Check Loop - 30 Second n8n Wait'];
const liveHelpPromptTitle = '# Live Help Check Loop - 30 Second Music Wait';
const liveHelpPromptBody = `${liveHelpPromptTitle}
- When the authority asks a question you cannot answer confidently, call \`request_creator_help\` once with a precise question, the latest caller context, and owner/topic fields.
- After starting live help, use \`check_creator_help\` with the same returned IDs. n8n performs each 30-second wait, rereads the same Slack thread, and the check tool plays hold music while waiting.
- If \`check_creator_help\` returns \`pending\`, do not say "pending", "still checking", "checking now", "still here", "I am checking", or "None". Use \`check_creator_help\` again with the same IDs; do not narrate every poll.
- A single \`pending\` result is never a timeout and never means you should give up. Stay in the check loop until \`answered\`, \`timed_out\`, \`read_error\`, or the contact explicitly refuses to continue holding.
- If the contact asks what is happening while waiting, say one short natural line such as "I am waiting for the team answer and will continue as soon as I have it." Then continue the same \`check_creator_help\` loop.
- If \`check_creator_help\` returns \`answered\`, use the returned answer immediately. Do not mention Slack, n8n, tools, dynamic variables, workflow state, or internal notes.
- If \`check_creator_help\` returns \`timed_out\`, use the fallback instruction conservatively and collect what the authority needs for manual follow-up.
- The live-help hold lasts up to five minutes total, with 30-second check periods. That means at most ten pending check periods before giving up. Do not create a second Slack help request for the same question.`;

const tools = await listTools();
const liveHelpToolIds = {
  request_creator_help: tools.find((tool) => tool.tool_config?.name === 'request_creator_help')?.id || '',
  check_creator_help: tools.find((tool) => tool.tool_config?.name === 'check_creator_help')?.id || '',
  lookup_call_context: tools.find((tool) => tool.tool_config?.name === 'lookup_call_context')?.id || '',
};
if (!liveHelpToolIds.request_creator_help || !liveHelpToolIds.check_creator_help) {
  throw new Error(`Missing live-help shared tools. Found: ${tools.map((tool) => `${tool.id}:${tool.tool_config?.name}`).join(', ')}`);
}

const sharedToolSummaries = [];
for (const [name, toolId] of Object.entries(liveHelpToolIds).filter(([name, toolId]) => name !== 'lookup_call_context' && toolId)) {
  const toolDocument = await getTool(toolId);
  const toolConfig = toolDocument.tool_config;
  if (!toolConfig) throw new Error(`Tool ${toolId} did not return tool_config`);
  const before = JSON.stringify(toolConfig);
  patchLiveHelpTool(toolConfig);
  const changed = JSON.stringify(toolConfig) !== before;
  if (changed) {
    sanitizeToolSchemaForPatch(toolConfig);
    if (!dryRun) await patchTool(toolId, toolConfig);
  }
  sharedToolSummaries.push({ name, tool_id: toolId, changed });
}

const agent = await request('GET', baseUrl);
const conversationConfig = agent.conversation_config;
const workflow = structuredClone(agent.workflow || {});
const promptConfig = conversationConfig?.agent?.prompt;
if (!promptConfig?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const beforePrompt = promptConfig.prompt;
promptConfig.prompt = replaceFirstKnownSection(promptConfig.prompt, [...liveHelpPromptOldTitles, liveHelpPromptTitle], liveHelpPromptBody);
promptConfig.prompt = replaceStaleHoldText(promptConfig.prompt)
  .replace(/n8n deliberately waits before returning pending/gi, 'n8n deliberately waits 30 seconds before returning pending')
  .replace(/call `check_creator_help` again after the response without narrating every poll/gi, 'call `check_creator_help` again only after the response and without narrating every poll');
const workflowPromptChanges = patchWorkflowLiveHelp(workflow, liveHelpToolIds);

conversationConfig.conversation ||= {};
conversationConfig.conversation.background_music = {
  source_type: null,
  source_id: null,
  volume: 0.01,
  crossfade_loop: false,
};

const previousToolIds = Array.isArray(promptConfig.tool_ids) ? promptConfig.tool_ids : [];
promptConfig.tool_ids = [];
delete promptConfig.tools;

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  prompt_changed: promptConfig.prompt !== beforePrompt,
  previous_tool_ids: previousToolIds,
  root_tool_ids: promptConfig.tool_ids,
  live_help_tool_routing: 'Use ElevenLabs workflow tool nodes for start/check, and expose check_creator_help to live-help hold/result subagents so caller interruptions can continue the same check.',
  workflow_prompt_changes: workflowPromptChanges,
  shared_tools: sharedToolSummaries,
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, { conversation_config: conversationConfig, workflow });
const readback = await request('GET', baseUrl);
const readbackPrompt = readback.conversation_config?.agent?.prompt?.prompt || '';
const readbackPromptConfig = readback.conversation_config?.agent?.prompt || {};
const readbackToolIds = readbackPromptConfig.tool_ids || [];
const readbackToolDocs = [];
for (const toolId of [liveHelpToolIds.request_creator_help, liveHelpToolIds.check_creator_help].filter(Boolean)) {
  const toolDocument = await getTool(toolId);
  readbackToolDocs.push(toolDocument.tool_config);
}
const staleHoldMatches = collectStaleTextMatches({
  prompt: readbackPrompt,
  workflow: readback.workflow || {},
  tools: readbackToolDocs,
});
if (staleHoldMatches.length) {
  throw new Error(`Stale live-help hold text remains after patch: ${JSON.stringify(staleHoldMatches, null, 2)}`);
}

function hasPlaceholder(tool, name) {
  return Object.prototype.hasOwnProperty.call(
    tool.dynamic_variables?.dynamic_variable_placeholders || {},
    name
  );
}

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_prompt_section: readbackPrompt.includes(liveHelpPromptTitle),
  verified_no_stale_hold_text: staleHoldMatches.length === 0,
  verified_stale_hold_matches: staleHoldMatches,
  verified_30_second_hold_text: /30 seconds|30-second check periods/i.test(readbackPrompt),
  verified_background_music: readback.conversation_config?.conversation?.background_music || null,
  verified_tool_ids: readbackToolIds,
  verified_root_custom_tools_empty: readbackToolIds.length === 0,
  verified_live_help_workflow_nodes: [LIVE_HELP_START_NODE_ID, LIVE_HELP_CHECK_NODE_ID, LIVE_HELP_HOLD_NODE_ID, LIVE_HELP_RESULT_NODE_ID].map((nodeId) => {
    const node = readback.workflow?.nodes?.[nodeId] || {};
    return {
      node_id: nodeId,
      type: node.type || '',
      tools: workflowToolIds(node),
      additional_tool_ids: node.additional_tool_ids || [],
    };
  }),
  verified_tools: readbackToolDocs.map((tool) => ({
    name: tool.name,
    execution_mode: tool.execution_mode,
    disable_interruptions: tool.disable_interruptions,
    force_pre_tool_speech: tool.force_pre_tool_speech,
    pre_tool_speech: tool.pre_tool_speech,
    tool_call_sound: tool.tool_call_sound,
    tool_call_sound_behavior: tool.tool_call_sound_behavior,
    has_owner_slack_member_id: Boolean(tool.api_schema?.request_body_schema?.properties?.owner_slack_member_id),
    has_message_topic: Boolean(tool.api_schema?.request_body_schema?.properties?.message_topic),
    has_system_conversation_placeholders:
      hasPlaceholder(tool, 'system__conversation_id')
      && hasPlaceholder(tool, 'system__conversation_history'),
  })),
}, null, 2));
