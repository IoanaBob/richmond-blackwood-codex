import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const CONTEXT_LOOKUP_URL = 'https://eipventures.app.n8n.cloud/webhook/rb-calls-context-lookup';
const OLD_REQUEST_HELP_TOOL_ID = 'tool_0001kqfd5skhfn3vnpww2s6fnt6r';
const OLD_CHECK_HELP_TOOL_ID = 'tool_5801krbamtebe6zvs5qfa023x9eh';
const LOOKUP_SOURCE_NODE_IDS = [
  'node_rb_authority_v2',
  'node_rb_main_v2',
  'node_rb_routing_v2',
  'node_rb_route_return_v3',
  'node_rb_ivr_v1',
];
const LOOKUP_TOOL_NODE_ID = 'node_rb_lookup_tool_v1';
const LOOKUP_RESULT_NODE_ID = 'node_rb_lookup_result_v1';
const LIVE_HELP_START_NODE_ID = 'node_rb_live_start_v2';
const LIVE_HELP_CHECK_NODE_ID = 'node_rb_live_check_v2';
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

loadLocalEnv();
const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in a local ignored .env file or ~/.codex/config.toml.');

const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const headers = { 'xi-api-key': apiKey, 'Content-Type': 'application/json' };
const allowedCategories = ['tax_registrations', 'tax_filings', 'contracts', 'correspondence', 'bank_accounts', 'tax_payments_prepayments', 'assets', 'call_notes'];

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
  if (!response.ok) throw new Error(`${method} ${url} failed ${response.status}: ${text.slice(0, 1000)}`);
  return json;
}

async function listTools() {
  const response = await request('GET', 'https://api.elevenlabs.io/v1/convai/tools?page_size=100');
  return Array.isArray(response.tools) ? response.tools : [];
}

async function getTool(toolId) {
  return request('GET', `https://api.elevenlabs.io/v1/convai/tools/${toolId}`);
}

async function createTool(toolConfig) {
  return request('POST', 'https://api.elevenlabs.io/v1/convai/tools', { tool_config: toolConfig });
}

async function patchTool(toolId, toolConfig) {
  return request('PATCH', `https://api.elevenlabs.io/v1/convai/tools/${toolId}`, { tool_config: toolConfig });
}

function replaceSection(prompt, title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (prompt.includes(title)) return prompt.replace(new RegExp(`${escaped}[\\s\\S]*?(?=\\n# |$)`), body);
  return `${prompt.trim()}\n\n${body}`;
}

function ensureAgentPlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name)) placeholders[name] = value;
}

function ensureToolPlaceholder(tool, name) {
  if (!name) return;
  tool.dynamic_variables ||= {};
  tool.dynamic_variables.dynamic_variable_placeholders ||= {};
  tool.dynamic_variables.dynamic_variable_placeholders[name] ??= '';
}

function bodyProperty({ description = '', dynamicVariable = '', constantValue = '' } = {}) {
  return {
    type: 'string',
    description: dynamicVariable || constantValue ? '' : description,
    enum: null,
    is_system_provided: false,
    dynamic_variable: dynamicVariable,
    constant_value: constantValue,
  };
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

function countToolIdReferences(value, toolId) {
  return (JSON.stringify(value).match(new RegExp(toolId, 'g')) || []).length;
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
  const nodes = workflow?.nodes || {};
  const edges = workflow?.edges || {};
  const changes = [];

  const lookupToolNode = {
    type: 'tool',
    position: { x: -1480, y: -120 },
    edge_order: ['edge_rb_lookup_success_v1', 'edge_rb_lookup_fail_v1'],
    tools: [{ tool_id: lookupToolId }],
  };
  const beforeLookupTool = JSON.stringify(nodes[LOOKUP_TOOL_NODE_ID] || null);
  nodes[LOOKUP_TOOL_NODE_ID] = {
    ...(nodes[LOOKUP_TOOL_NODE_ID] || {}),
    ...lookupToolNode,
    tools: [updateToolReference(Array.isArray(nodes[LOOKUP_TOOL_NODE_ID]?.tools) ? nodes[LOOKUP_TOOL_NODE_ID].tools[0] : null, lookupToolId)],
  };
  if (JSON.stringify(nodes[LOOKUP_TOOL_NODE_ID]) !== beforeLookupTool) changes.push({ node_id: LOOKUP_TOOL_NODE_ID, action: 'upsert_lookup_tool_node' });

  const lookupResultPrompt = [
    'Context lookup result stage. A concrete lookup_call_context workflow tool step just ran; do not ignore or abandon that result because the contact spoke during the lookup.',
    'If the contact asked multiple questions in one turn, split them into concrete missing facts. Use lookup results for any part that fits an allowed lookup category before considering live help for the remaining part.',
    'If the lookup returned usable records or a usable answer, use that information privately and return to the main authority conversation. Do not mention Notion, n8n, tools, JSON, workflow state, Slack, or internal notes.',
    'If the contact speaks while lookup is still in progress or immediately after it, give one brief line such as "I am just checking that detail" and continue using the tool result when it arrives. Do not restart the same lookup unless the tool actually failed.',
    'If the lookup returned partial, not_found, unavailable, error, warnings, or no usable answer and the missing fact is needed to continue, move to live help. If the missing fact is no longer needed, continue routing, collect callback/submission details, or capture the outcome conservatively.',
    'Never ask live help for a fact that fits an allowed lookup category until this concrete lookup stage has failed, returned no usable result, or proved irrelevant.',
  ].join(' ');
  const resultNode = {
    type: 'override_agent',
    label: '3b. Context Lookup Result',
    position: { x: -1060, y: -120 },
    edge_order: ['edge_rb_lookup_result_main_v1', 'edge_rb_lookup_result_live_v1', 'edge_rb_lookup_result_outcome_v1'],
    additional_prompt: lookupResultPrompt,
    additional_tool_ids: [],
    additional_knowledge_base: [],
    auto_advance_after_first_response: false,
    conversation_config: nodes.node_rb_main_v2?.conversation_config || nodes.node_rb_authority_v2?.conversation_config || {},
  };
  const beforeResult = JSON.stringify(nodes[LOOKUP_RESULT_NODE_ID] || null);
  nodes[LOOKUP_RESULT_NODE_ID] = { ...(nodes[LOOKUP_RESULT_NODE_ID] || {}), ...resultNode };
  if (JSON.stringify(nodes[LOOKUP_RESULT_NODE_ID]) !== beforeResult) changes.push({ node_id: LOOKUP_RESULT_NODE_ID, action: 'upsert_lookup_result_node' });

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
  edges.edge_rb_lookup_result_main_v1 = makeLlmEdge(
    LOOKUP_RESULT_NODE_ID,
    'node_rb_main_v2',
    'The lookup returned a usable answer or usable context and the substantive authority conversation can continue safely.'
  );
  edges.edge_rb_lookup_result_live_v1 = makeLlmEdge(
    LOOKUP_RESULT_NODE_ID,
    LIVE_HELP_START_NODE_ID,
    'The lookup returned no usable result, partial/unavailable/error/warnings, or the needed fact is outside the allowed lookup categories, and RB team input is still needed before proceeding.'
  );
  edges.edge_rb_lookup_result_outcome_v1 = makeLlmEdge(
    LOOKUP_RESULT_NODE_ID,
    'node_rb_outcome_v2',
    'The lookup result or failed lookup means the safest next step is to capture requirements, references, deadlines, callback details, or manual follow-up and close the call.'
  );

  for (const edgeId of ['edge_rb_lookup_success_v1', 'edge_rb_lookup_fail_v1']) addEdgeOrder(nodes[LOOKUP_TOOL_NODE_ID], edgeId);
  for (const edgeId of ['edge_rb_lookup_result_main_v1', 'edge_rb_lookup_result_live_v1', 'edge_rb_lookup_result_outcome_v1']) addEdgeOrder(nodes[LOOKUP_RESULT_NODE_ID], edgeId);

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

function patchWorkflowToolRouting(workflow, lookupToolId, liveHelpToolIds) {
  const changes = [];
  const nodes = workflow?.nodes || {};

  for (const [nodeId, node] of Object.entries(nodes)) {
    if (!node || typeof node !== 'object') continue;

    if (node.type === 'override_agent') {
      const previous = Array.isArray(node.additional_tool_ids) ? node.additional_tool_ids : [];
      const next = [];
      node.additional_tool_ids = next;

      const nestedPrompt = node.conversation_config?.agent?.prompt;
      if (nestedPrompt && typeof nestedPrompt === 'object') {
        nestedPrompt.tool_ids = [];
        delete nestedPrompt.tools;
      }

      if (JSON.stringify(previous) !== JSON.stringify(next)) {
        changes.push({ node_id: nodeId, label: node.label || '', previous_tool_ids: previous, next_tool_ids: next });
      }
    }

    if (nodeId === LIVE_HELP_START_NODE_ID) {
      const previous = Array.isArray(node.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [];
      const existing = Array.isArray(node.tools) ? node.tools[0] : null;
      node.tools = [updateToolReference(existing, liveHelpToolIds.request_creator_help)];
      const next = node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool);
      if (JSON.stringify(previous) !== JSON.stringify(next)) changes.push({ node_id: nodeId, previous_tool_ids: previous, next_tool_ids: next });
    }

    if (nodeId === LIVE_HELP_CHECK_NODE_ID) {
      const previous = Array.isArray(node.tools) ? node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool) : [];
      const existing = Array.isArray(node.tools) ? node.tools[0] : null;
      node.tools = [updateToolReference(existing, liveHelpToolIds.check_creator_help)];
      const next = node.tools.map((tool) => tool?.id || tool?.tool_id || tool?.toolId || tool);
      if (JSON.stringify(previous) !== JSON.stringify(next)) changes.push({ node_id: nodeId, previous_tool_ids: previous, next_tool_ids: next });
    }
  }

  changes.push(...ensureWorkflowLookupStages(workflow, lookupToolId));
  return changes;
}

function buildLookupToolConfig(existing = {}) {
  const tool = {
    ...existing,
    type: 'webhook',
    name: 'lookup_call_context',
    description: 'Fetch approved Richmond Blackwood call context from Notion through n8n on demand. Use this only for the allowed categories and only with the current call_id. If one caller turn asks multiple factual questions, make focused lookup calls for the allowed-category facts before live help. Do not use it as a general search tool.',
    response_timeout_secs: Math.max(Number(existing.response_timeout_secs || 0), 60),
    execution_mode: 'immediate',
    disable_interruptions: true,
    force_pre_tool_speech: false,
    pre_tool_speech: 'auto',
    tool_call_sound: null,
    tool_call_sound_behavior: 'auto',
    api_schema: {
      ...(existing.api_schema || {}),
      url: CONTEXT_LOOKUP_URL,
      method: 'POST',
      request_body_schema: {
        type: 'object',
        required: ['category', 'call_id'],
        description: 'Look up one approved context category for the current RB call. Keep query focused. For multi-part caller questions, use one focused lookup per allowed-category fact before escalating. Do not request categories outside the allowed list.',
        properties: {
          category: bodyProperty({ description: `One exact category only: ${allowedCategories.join(', ')}.` }),
          query: bodyProperty({ description: 'Focused natural-language search text for the missing fact, for example latest Finanzamt correspondence date or Irish corporation tax number. If the caller asked multiple questions, query only one missing fact at a time.' }),
          limit: bodyProperty({ description: 'Optional number of records to return, between 1 and 12. Prefer 3 to 5.' }),
          call_id: bodyProperty({ dynamicVariable: 'call_id' }),
          call_public_id: bodyProperty({ dynamicVariable: 'call_public_id' }),
          call_url: bodyProperty({ dynamicVariable: 'call_url' }),
          conversation_id: bodyProperty({ dynamicVariable: 'system__conversation_id' }),
          transcript_excerpt: bodyProperty({ dynamicVariable: 'system__conversation_history' }),
        },
      },
    },
  };
  for (const name of ['call_id', 'call_public_id', 'call_url', 'system__conversation_id', 'system__conversation_history']) ensureToolPlaceholder(tool, name);
  return tool;
}

const promptTitle = '# On-Demand Notion Context Lookup';
const promptBody = `${promptTitle}
- Startup context begins with \`context_pack\`, plus direct Company, Individual, Contact, and tax-registration JSON variables when the call is launched. Use those startup records before any lookup or live-help request.
- Direct Company JSON: \`{{company_context_json}}\`
- Direct Individual JSON: \`{{individual_context_json}}\`
- Direct Contact JSON: \`{{contact_context_json}}\`
- Direct tax-registration JSON: \`{{tax_registration_context_json}}\`
- For company identity, directors, beneficial owners/U-B-Os, registration fields, contact details, or individual details, first inspect the startup Company/Individual/Contact JSON and \`context_pack\`. If the needed fact is not present there and does not fit an allowed lookup category, then live help is appropriate.
- Before asking the call creator for manual Slack help, route through the concrete Context Lookup workflow step first for any missing fact that fits an allowed category. Manual live help is the fallback, not the first step.
- If the contact asks two or more questions in a row or in one turn, split the turn into concrete facts. Run focused \`lookup_call_context\` checks for every missing fact that fits an allowed category before escalating any remaining part to live help.
- The only allowed lookup categories are: \`${allowedCategories.join('`, `')}\`.
- For German Steuernummer, German V-A-T, tax identifier, registration-number, or authority-reference questions, the first lookup category is \`tax_registrations\`.
- Use exact category names. Ask focused lookups with a short \`query\`; do not run broad fishing searches.
- Do not use \`lookup_call_context\` for categories outside the allowed list. If the missing fact does not fit an allowed category, then use live help or collect the authority's callback/document-submission details.
- \`lookup_call_context\` runs in immediate execution mode, so the short acknowledgement and lookup can overlap. If the contact speaks while the lookup is running, answer briefly that you are checking the detail and continue using the lookup result when it arrives. Do not abandon the lookup just because the contact spoke.
- If a \`lookup_call_context\` call actually fails or returns a tool-abandoned error, retry the same focused lookup once through the concrete lookup step before escalating to live help.
- If lookup returns \`status: partial\`, \`not_found\`, \`unavailable\`, \`error\`, or any \`lookup_warnings\`, treat that category as uncertain, not empty. Escalate to live help only if that missing context is needed to continue the call.
- If lookup returns no usable answer, say one short hold phrase, then use the live-help path. Do not ask Slack/live help until after the lookup has failed or proved irrelevant.
- If lookup returns a usable answer, use it directly and do not create a Slack help request.
- Use lookup results privately. Never mention Notion, n8n, tools, JSON, database names, source labels, workflow state, Slack, internal notes, or debug details to the authority.
- Tax registration context is already in startup variables. Only look up \`tax_registrations\` if the startup context is incomplete or you need to confirm a specific registration detail.`;

const tools = await listTools();
const existingLookupSummary = tools.find((tool) => tool.tool_config?.name === 'lookup_call_context');
const liveHelpToolIds = {
  request_creator_help: tools.find((tool) => tool.tool_config?.name === 'request_creator_help')?.id || '',
  check_creator_help: tools.find((tool) => tool.tool_config?.name === 'check_creator_help')?.id || '',
};
if (!liveHelpToolIds.request_creator_help || !liveHelpToolIds.check_creator_help) {
  throw new Error(`Missing live-help shared tools. Found: ${tools.map((tool) => `${tool.id}:${tool.tool_config?.name}`).join(', ')}`);
}

let lookupToolId = existingLookupSummary?.id || '';
let lookupToolChanged = false;
let lookupToolCreated = false;
let lookupToolConfig = buildLookupToolConfig();
if (lookupToolId) {
  const toolDocument = await getTool(lookupToolId);
  const existingConfig = toolDocument.tool_config || {};
  lookupToolConfig = buildLookupToolConfig(existingConfig);
  lookupToolChanged = JSON.stringify(existingConfig) !== JSON.stringify(lookupToolConfig);
  if (lookupToolChanged) {
    sanitizeToolSchemaForPatch(lookupToolConfig);
    if (!dryRun) await patchTool(lookupToolId, lookupToolConfig);
  }
} else {
  sanitizeToolSchemaForPatch(lookupToolConfig);
  lookupToolCreated = true;
  if (!dryRun) {
    const created = await createTool(lookupToolConfig);
    lookupToolId = created.id || created.tool_id || created.tool?.id || '';
    if (!lookupToolId) {
      const refreshed = await listTools();
      lookupToolId = refreshed.find((tool) => tool.tool_config?.name === 'lookup_call_context')?.id || '';
    }
    if (!lookupToolId) throw new Error('Created lookup_call_context but could not resolve the new tool id.');
  } else {
    lookupToolId = 'dry_run_new_lookup_tool';
  }
}

const agent = await request('GET', baseUrl);
const conversationConfig = agent.conversation_config;
const workflow = structuredClone(agent.workflow || {});
const promptConfig = conversationConfig?.agent?.prompt;
if (!promptConfig?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const beforePrompt = promptConfig.prompt;
const previousToolIds = Array.isArray(promptConfig.tool_ids) ? promptConfig.tool_ids : [];
promptConfig.prompt = replaceSection(promptConfig.prompt, promptTitle, promptBody);
promptConfig.tool_ids = [];
delete promptConfig.tools;
const workflowChanges = patchWorkflowToolRouting(workflow, lookupToolId, liveHelpToolIds);

for (const [name, value] of Object.entries({
  lookup_allowed_categories: allowedCategories.join(', '),
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

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  lookup_tool_created: lookupToolCreated,
  lookup_tool_changed: lookupToolChanged,
  lookup_tool_id: lookupToolId,
  previous_tool_ids: previousToolIds,
  desired_root_tool_ids: promptConfig.tool_ids,
  lookup_source_node_ids: LOOKUP_SOURCE_NODE_IDS,
  lookup_tool_node_id: LOOKUP_TOOL_NODE_ID,
  lookup_result_node_id: LOOKUP_RESULT_NODE_ID,
  tool_routing_note: 'lookup_call_context is routed through a dedicated workflow tool node before live help; live help remains only on the dedicated start/check workflow tool nodes.',
  workflow_changes: workflowChanges,
  target_stale_tool_references: {
    [OLD_REQUEST_HELP_TOOL_ID]: countToolIdReferences({ conversationConfig, workflow }, OLD_REQUEST_HELP_TOOL_ID),
    [OLD_CHECK_HELP_TOOL_ID]: countToolIdReferences({ conversationConfig, workflow }, OLD_CHECK_HELP_TOOL_ID),
  },
  target_workflow_summary: summarizeWorkflow(workflow),
  prompt_changed: promptConfig.prompt !== beforePrompt,
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, { conversation_config: conversationConfig, workflow });
const readback = await request('GET', baseUrl);
const readbackPromptConfig = readback.conversation_config?.agent?.prompt || {};
const readbackPrompt = readbackPromptConfig.prompt || '';
const placeholders = readback.conversation_config?.agent?.dynamic_variables?.dynamic_variable_placeholders || {};
const readbackLookupTool = await getTool(lookupToolId);
const readbackToolConfig = readbackLookupTool.tool_config || {};
const readbackWorkflowSummary = summarizeWorkflow(readback.workflow || {});
const staleReferences = {
  [OLD_REQUEST_HELP_TOOL_ID]: countToolIdReferences(readback, OLD_REQUEST_HELP_TOOL_ID),
  [OLD_CHECK_HELP_TOOL_ID]: countToolIdReferences(readback, OLD_CHECK_HELP_TOOL_ID),
};
const readbackLookupNodes = readbackWorkflowSummary
  .filter((node) => node.node_id === LOOKUP_TOOL_NODE_ID || node.node_id === LOOKUP_RESULT_NODE_ID)
  .map((node) => ({ node_id: node.node_id, additional_tool_ids: node.additional_tool_ids }));
const readbackUnexpectedLookupNodes = readbackWorkflowSummary
  .filter((node) => node.type === 'override_agent' && node.additional_tool_ids.includes(lookupToolId))
  .map((node) => node.node_id);
if (Object.values(staleReferences).some((count) => count > 0)) {
  throw new Error(`Stale ElevenLabs workflow tool references remain after lookup patch: ${JSON.stringify(staleReferences)}`);
}

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_prompt_section: readbackPrompt.includes(promptTitle),
  verified_tool_ids: readbackPromptConfig.tool_ids || [],
  verified_root_custom_tools_empty: (readbackPromptConfig.tool_ids || []).length === 0,
  verified_lookup_tool_available: Boolean(lookupToolId),
  verified_live_help_tools_not_root_attached: [liveHelpToolIds.request_creator_help, liveHelpToolIds.check_creator_help].every((toolId) => !(readbackPromptConfig.tool_ids || []).includes(toolId)),
  verified_lookup_nodes: readbackLookupNodes,
  verified_lookup_tool_node_present: readbackWorkflowSummary.some((node) => node.node_id === LOOKUP_TOOL_NODE_ID && node.tools.includes(lookupToolId)),
  verified_lookup_result_node_present: readbackWorkflowSummary.some((node) => node.node_id === LOOKUP_RESULT_NODE_ID),
  verified_no_unexpected_lookup_nodes: readbackUnexpectedLookupNodes.length === 0,
  verified_stale_tool_references: staleReferences,
  verified_workflow_summary: readbackWorkflowSummary,
  verified_lookup_url: readbackToolConfig.api_schema?.url || '',
  verified_lookup_execution_mode: readbackToolConfig.execution_mode || '',
  verified_lookup_disable_interruptions: readbackToolConfig.disable_interruptions,
  verified_lookup_required: readbackToolConfig.api_schema?.request_body_schema?.required || [],
  verified_lookup_category_description: readbackToolConfig.api_schema?.request_body_schema?.properties?.category?.description || '',
  verified_agent_placeholders: ['lookup_allowed_categories', 'tax_registration_context_json', 'company_context_json', 'individual_context_json', 'contact_context_json', 'call_id', 'call_public_id', 'call_url', 'live_help_request_id', 'live_help_slack_thread_ts', 'live_help_note_page_id', 'live_help_expires_at', 'live_help_status', 'live_help_answer', 'system__conversation_id', 'system__conversation_history']
    .filter((name) => Object.prototype.hasOwnProperty.call(placeholders, name)),
}, null, 2));
