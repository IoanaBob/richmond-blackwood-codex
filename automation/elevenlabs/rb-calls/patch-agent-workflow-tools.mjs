import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const OLD_REQUEST_HELP_TOOL_ID = 'tool_0001kqfd5skhfn3vnpww2s6fnt6r';
const OLD_CHECK_HELP_TOOL_ID = 'tool_5801krbamtebe6zvs5qfa023x9eh';
const LIVE_HELP_START_NODE_ID = 'node_rb_live_start_v2';
const LIVE_HELP_CHECK_NODE_ID = 'node_rb_live_check_v2';
const LOOKUP_SOURCE_NODE_IDS = [
  'node_rb_authority_v2',
  'node_rb_main_v2',
  'node_rb_routing_v2',
  'node_rb_route_return_v3',
  'node_rb_ivr_v1',
];
const LOOKUP_TOOL_NODE_ID = 'node_rb_lookup_tool_v1';
const LOOKUP_RESULT_NODE_ID = 'node_rb_lookup_result_v1';
const dryRun = process.argv.includes('--dry-run');

function loadLocalEnv() {
  const candidates = [path.resolve(process.cwd(), '.env'), new URL('../../../../.env', import.meta.url)];
  for (const candidate of candidates) {
    const fsPath = candidate instanceof URL ? candidate : candidate;
    if (!fs.existsSync(fsPath)) continue;
    const text = fs.readFileSync(fsPath, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const equalsAt = trimmed.indexOf('=');
      if (equalsAt < 1) continue;
      const key = trimmed.slice(0, equalsAt).trim();
      let value = trimmed.slice(equalsAt + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      process.env[key] ||= value;
    }
  }
}

function readCodexElevenLabsKey() {
  const configPath = `${os.homedir()}/.codex/config.toml`;
  if (!fs.existsSync(configPath)) return '';
  const config = fs.readFileSync(configPath, 'utf8');
  return config.match(/ELEVENLABS_API_KEY\s*=\s*"([^"]+)"/)?.[1] || '';
}

async function request(method, url, apiKey, body) {
  const response = await fetch(url, {
    method,
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!response.ok) throw new Error(`${method} ${url} failed ${response.status}: ${text.slice(0, 1000)}`);
  return json;
}

async function listTools(apiKey) {
  const response = await request('GET', 'https://api.elevenlabs.io/v1/convai/tools?page_size=100', apiKey);
  return Array.isArray(response.tools) ? response.tools : [];
}

function countToolIdReferences(value, toolId) {
  return (JSON.stringify(value).match(new RegExp(toolId, 'g')) || []).length;
}

function clearPromptTools(conversationConfig) {
  conversationConfig.agent ||= {};
  conversationConfig.agent.prompt ||= {};
  const promptConfig = conversationConfig.agent.prompt;
  const previous = Array.isArray(promptConfig.tool_ids) ? [...promptConfig.tool_ids] : [];
  promptConfig.tool_ids = [];
  delete promptConfig.tools;
  return previous;
}

function clearOverridePromptTools(platformSettings) {
  const promptConfig = platformSettings?.overrides?.conversation_config_override?.agent?.prompt;
  if (!promptConfig) return [];
  if (!Array.isArray(promptConfig.tool_ids)) return [];
  const previous = [...promptConfig.tool_ids];
  promptConfig.tool_ids = [];
  delete promptConfig.tools;
  return previous;
}

function ensureAgentPlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name)) placeholders[name] = value;
}

function updateToolReference(existing, toolId) {
  if (!existing || typeof existing !== 'object' || Array.isArray(existing)) return { tool_id: toolId };
  const next = { ...existing };
  if (Object.prototype.hasOwnProperty.call(next, 'tool_id')) next.tool_id = toolId;
  else if (Object.prototype.hasOwnProperty.call(next, 'id')) {
    delete next.id;
    next.tool_id = toolId;
  }
  else if (Object.prototype.hasOwnProperty.call(next, 'toolId')) next.toolId = toolId;
  else next.tool_id = toolId;
  if (Object.prototype.hasOwnProperty.call(next, 'name')) delete next.name;
  if (Object.prototype.hasOwnProperty.call(next, 'tool_name')) delete next.tool_name;
  return next;
}

function summarizeWorkflow(workflow) {
  return Object.entries(workflow?.nodes || {}).map(([nodeId, node]) => ({
    node_id: nodeId,
    label: node.label || '',
    type: node.type || '',
    additional_tool_ids: Array.isArray(node.additional_tool_ids) ? node.additional_tool_ids : [],
    tools: Array.isArray(node.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [],
  }));
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

function addEdgeOrder(node, edgeId) {
  if (!node || !Array.isArray(node.edge_order)) return;
  node.edge_order = node.edge_order.filter((id) => id !== edgeId);
  node.edge_order.push(edgeId);
}

function prioritizeEdgeOrder(node, edgeId, beforeEdgeIds = []) {
  if (!node || !Array.isArray(node.edge_order)) return;
  node.edge_order = node.edge_order.filter((id) => id !== edgeId);
  const beforeIndex = node.edge_order.findIndex((id) => beforeEdgeIds.includes(id));
  if (beforeIndex >= 0) node.edge_order.splice(beforeIndex, 0, edgeId);
  else node.edge_order.push(edgeId);
}

function ensureWorkflowLookupStages(workflow, lookupToolId) {
  if (!lookupToolId) return [];
  const changes = [];
  const nodes = workflow?.nodes || {};
  const edges = workflow?.edges || {};

  const existingLookupTool = Array.isArray(nodes[LOOKUP_TOOL_NODE_ID]?.tools) ? nodes[LOOKUP_TOOL_NODE_ID].tools[0] : null;
  nodes[LOOKUP_TOOL_NODE_ID] = {
    ...(nodes[LOOKUP_TOOL_NODE_ID] || {}),
    type: 'tool',
    position: { x: -1480, y: -120 },
    edge_order: ['edge_rb_lookup_success_v1', 'edge_rb_lookup_fail_v1'],
    tools: [updateToolReference(existingLookupTool, lookupToolId)],
  };
  changes.push({ node_id: LOOKUP_TOOL_NODE_ID, next_tool_ids: [lookupToolId] });

  nodes[LOOKUP_RESULT_NODE_ID] = {
    ...(nodes[LOOKUP_RESULT_NODE_ID] || {}),
    type: 'override_agent',
    label: '3b. Context Lookup Result',
    position: { x: -1060, y: -120 },
    edge_order: ['edge_rb_lookup_result_main_v1', 'edge_rb_lookup_result_live_v1', 'edge_rb_lookup_result_outcome_v1'],
    additional_prompt: 'Context lookup result stage. A concrete lookup_call_context workflow tool step just ran; do not ignore or abandon that result because the contact spoke during the lookup. If the contact asked multiple questions in one turn, split them into concrete missing facts and use lookup results for every part that fits an allowed lookup category before considering live help for the remaining part. Use usable results privately and continue. If the lookup failed, returned partial/unavailable/error/no usable answer, or the fact is outside allowed lookup categories and the missing fact is needed, move to live help. Do not mention Notion, n8n, tools, workflow state, Slack, JSON, or internal notes.',
    additional_tool_ids: [],
    additional_knowledge_base: [],
    auto_advance_after_first_response: false,
    conversation_config: nodes.node_rb_main_v2?.conversation_config || nodes.node_rb_authority_v2?.conversation_config || {},
  };

  const lookupConditions = {
    node_rb_authority_v2: 'The contact asks one or more questions about authority, PoA, registration, identifier, reference, correspondence, filing, payment, bank, asset, contract, or prior-call information that is missing or uncertain and any part fits an approved lookup category. Multi-part questions still go to lookup first.',
    node_rb_main_v2: 'The authority asks one or more questions containing a missing or uncertain fact that fits an approved lookup category: tax registrations, tax filings, contracts, correspondence, bank accounts, tax payments/prepayments, assets, or call notes. Multi-part questions still go to lookup first.',
    node_rb_routing_v2: 'Routing, callback, reference, deadline, document-submission, or department details are missing or uncertain and any part fits an approved lookup category. Multi-part questions still go to lookup first.',
    node_rb_route_return_v3: 'Before continuing through the corrected route, one or more missing or uncertain facts fit an approved lookup category and should be checked through the context lookup step.',
    node_rb_ivr_v1: 'An IVR/menu/extension step asks for a reference or choice that may be available in approved call context and should be checked before asking live help.',
  };
  const liveEdgeBySource = {
    node_rb_authority_v2: 'edge_rb_authority_live_v2',
    node_rb_main_v2: 'edge_rb_main_live_v2',
    node_rb_routing_v2: 'edge_rb_routing_live_v2',
    node_rb_ivr_v1: 'edge_rb_ivr_live_v1',
  };
  for (const [sourceNodeId, condition] of Object.entries(lookupConditions)) {
    const edgeId = `edge_rb_${sourceNodeId.replace(/^node_rb_/, '').replace(/_v[0-9]+$/, '')}_lookup_v1`;
    edges[edgeId] = makeLlmEdge(sourceNodeId, LOOKUP_TOOL_NODE_ID, condition);
    prioritizeEdgeOrder(nodes[sourceNodeId], edgeId, [liveEdgeBySource[sourceNodeId]].filter(Boolean));
  }

  edges.edge_rb_lookup_success_v1 = makeResultEdge(LOOKUP_TOOL_NODE_ID, LOOKUP_RESULT_NODE_ID, true);
  edges.edge_rb_lookup_fail_v1 = makeResultEdge(LOOKUP_TOOL_NODE_ID, LIVE_HELP_START_NODE_ID, false);
  edges.edge_rb_lookup_result_main_v1 = makeLlmEdge(LOOKUP_RESULT_NODE_ID, 'node_rb_main_v2', 'The lookup returned usable context and the authority conversation can continue safely.');
  edges.edge_rb_lookup_result_live_v1 = makeLlmEdge(LOOKUP_RESULT_NODE_ID, LIVE_HELP_START_NODE_ID, 'The lookup returned no usable result, partial/unavailable/error/warnings, or the needed fact is outside the allowed lookup categories, and RB team input is still needed.');
  edges.edge_rb_lookup_result_outcome_v1 = makeLlmEdge(LOOKUP_RESULT_NODE_ID, 'node_rb_outcome_v2', 'The safest next step is to capture requirements, references, deadlines, callback details, or manual follow-up and close the call.');

  const liveHelpEdges = {
    edge_rb_authority_live_v2: 'Only use live help directly when the requested proof, permission, legal position, or missing detail is outside the approved lookup categories. If any part of a multi-part question fits tax registrations, tax filings, contracts, correspondence, bank accounts, tax payments/prepayments, assets, or call notes, route to context lookup first.',
    edge_rb_main_live_v2: 'Only use live help directly for a decision, commitment, permission, legal/tax position, or a missing fact outside the approved lookup categories. Do not use this edge for tax/reference/correspondence/filing/payment/bank/asset/contract/call-note facts, even when the authority asks several questions in a row; route to context lookup first.',
    edge_rb_routing_live_v2: 'Only use live help directly when routing requires a human decision, permission, or a missing detail outside approved lookup categories. For reference, deadline, callback, correspondence, filing, or submission details that fit an allowed category, route to context lookup first.',
    edge_rb_ivr_live_v1: 'Only use live help directly when the IVR asks for an unclear/risky human choice outside approved lookup categories. For reference or identifier choices that may exist in approved context, route to context lookup first.',
  };
  for (const [edgeId, condition] of Object.entries(liveHelpEdges)) {
    if (!edges[edgeId]) continue;
    edges[edgeId].forward_condition = { label: null, type: 'llm', condition };
  }

  workflow.nodes = nodes;
  workflow.edges = edges;
  return changes;
}

function patchWorkflowTools(workflow, requestHelpId, checkHelpId, lookupToolId = '') {
  const clearedOverrideNodes = [];
  const toolNodeChanges = [];
  const nodes = workflow?.nodes || {};

  for (const [nodeId, node] of Object.entries(nodes)) {
    if (!node || typeof node !== 'object') continue;

    if (node.type === 'override_agent') {
      const previous = Array.isArray(node.additional_tool_ids) ? node.additional_tool_ids : [];
      const next = [];
      if (JSON.stringify(previous) !== JSON.stringify(next)) {
        clearedOverrideNodes.push({ node_id: nodeId, label: node.label || '', previous_tool_ids: previous, next_tool_ids: next });
      }
      node.additional_tool_ids = next;

      const nestedPrompt = node.conversation_config?.agent?.prompt;
      if (nestedPrompt && typeof nestedPrompt === 'object') {
        nestedPrompt.tool_ids = [];
        delete nestedPrompt.tools;
      }
    }

    if (nodeId === LIVE_HELP_START_NODE_ID) {
      const previous = Array.isArray(node.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [];
      const existing = Array.isArray(node.tools) ? node.tools[0] : null;
      node.tools = [updateToolReference(existing, requestHelpId)];
      toolNodeChanges.push({ node_id: nodeId, previous_tool_ids: previous, next_tool_ids: [requestHelpId] });
    }

    if (nodeId === LIVE_HELP_CHECK_NODE_ID) {
      const previous = Array.isArray(node.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [];
      const existing = Array.isArray(node.tools) ? node.tools[0] : null;
      node.tools = [updateToolReference(existing, checkHelpId)];
      toolNodeChanges.push({ node_id: nodeId, previous_tool_ids: previous, next_tool_ids: [checkHelpId] });
    }
  }

  toolNodeChanges.push(...ensureWorkflowLookupStages(workflow, lookupToolId));
  return { clearedOverrideNodes, toolNodeChanges };
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const [agent, tools] = await Promise.all([request('GET', baseUrl, apiKey), listTools(apiKey)]);

const requestHelpId = tools.find((tool) => tool.tool_config?.name === 'request_creator_help')?.id || '';
const checkHelpId = tools.find((tool) => tool.tool_config?.name === 'check_creator_help')?.id || '';
const lookupToolId = tools.find((tool) => tool.tool_config?.name === 'lookup_call_context')?.id || '';
if (!requestHelpId || !checkHelpId) throw new Error('Could not resolve current request_creator_help and check_creator_help tool IDs.');

const conversationConfig = structuredClone(agent.conversation_config || {});
const workflow = structuredClone(agent.workflow || {});
const platformSettings = structuredClone(agent.platform_settings || {});
const previousRootToolIds = clearPromptTools(conversationConfig);
const previousOverrideToolIds = clearOverridePromptTools(platformSettings);
const workflowChanges = patchWorkflowTools(workflow, requestHelpId, checkHelpId, lookupToolId);
for (const [name, value] of Object.entries({
  lookup_allowed_categories: 'tax_registrations, tax_filings, contracts, correspondence, bank_accounts, tax_payments_prepayments, assets, call_notes',
  tax_registration_context_json: '{}',
  company_context_json: '{}',
  individual_context_json: '{}',
  contact_context_json: '{}',
  call_id: '',
  call_public_id: '',
  call_url: '',
  live_help_request_id: 'not_started',
  live_help_slack_thread_ts: 'not_started',
  live_help_note_page_id: 'not_started',
  live_help_expires_at: '1970-01-01T00:00:00.000Z',
  live_help_status: 'not_requested',
  live_help_answer: 'not_answered',
  system__conversation_id: '',
  system__conversation_history: '',
})) {
  ensureAgentPlaceholder(conversationConfig, name, value);
}

const beforeOldToolReferences = {
  [OLD_REQUEST_HELP_TOOL_ID]: countToolIdReferences(agent, OLD_REQUEST_HELP_TOOL_ID),
  [OLD_CHECK_HELP_TOOL_ID]: countToolIdReferences(agent, OLD_CHECK_HELP_TOOL_ID),
};
const targetOldToolReferences = {
  [OLD_REQUEST_HELP_TOOL_ID]: countToolIdReferences({ conversationConfig, workflow, platformSettings }, OLD_REQUEST_HELP_TOOL_ID),
  [OLD_CHECK_HELP_TOOL_ID]: countToolIdReferences({ conversationConfig, workflow, platformSettings }, OLD_CHECK_HELP_TOOL_ID),
};

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  current_version_id: agent.version_id || '',
  current_tool_ids: { request_creator_help: requestHelpId, check_creator_help: checkHelpId, lookup_call_context: lookupToolId || null },
  lookup_source_node_ids: lookupToolId ? LOOKUP_SOURCE_NODE_IDS : [],
  lookup_tool_node_id: lookupToolId ? LOOKUP_TOOL_NODE_ID : null,
  lookup_result_node_id: lookupToolId ? LOOKUP_RESULT_NODE_ID : null,
  previous_root_tool_ids: previousRootToolIds,
  previous_platform_override_tool_ids: previousOverrideToolIds,
  before_old_tool_references: beforeOldToolReferences,
  target_old_tool_references: targetOldToolReferences,
  workflow_changes: workflowChanges,
  target_workflow_summary: summarizeWorkflow(workflow),
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, apiKey, {
  conversation_config: conversationConfig,
  platform_settings: platformSettings,
  workflow,
});
const readback = await request('GET', baseUrl, apiKey);
const readbackOldToolReferences = {
  [OLD_REQUEST_HELP_TOOL_ID]: countToolIdReferences(readback, OLD_REQUEST_HELP_TOOL_ID),
  [OLD_CHECK_HELP_TOOL_ID]: countToolIdReferences(readback, OLD_CHECK_HELP_TOOL_ID),
};
const readbackWorkflowSummary = summarizeWorkflow(readback.workflow || {});
const staleReferencesRemaining = Object.values(readbackOldToolReferences).some((count) => count > 0);
if (staleReferencesRemaining) {
  throw new Error(`Stale ElevenLabs workflow tool references remain after patch: ${JSON.stringify(readbackOldToolReferences)}`);
}

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  readback_root_tool_ids: readback.conversation_config?.agent?.prompt?.tool_ids || [],
  readback_old_tool_references: readbackOldToolReferences,
  readback_workflow_summary: readbackWorkflowSummary,
}, null, 2));
