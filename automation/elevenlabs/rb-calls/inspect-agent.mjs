import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';

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

function extractPromptVariables(text = '') {
  return [...text.matchAll(/{{\s*([a-zA-Z0-9_.-]+)\s*}}/g)].map((match) => match[1]).sort();
}

async function request(apiKey, url) {
  const response = await fetch(url, { headers: { 'xi-api-key': apiKey } });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!response.ok) throw new Error(`GET ${url} failed ${response.status}: ${text.slice(0, 1000)}`);
  return json;
}

function summarizeTool(toolDocument) {
  const config = toolDocument.tool_config || {};
  const properties = config.api_schema?.request_body_schema?.properties || {};
  const dynamicProperties = Object.entries(properties)
    .filter(([, value]) => value?.dynamic_variable)
    .map(([name, value]) => ({ body_property: name, dynamic_variable: value.dynamic_variable }))
    .sort((a, b) => a.body_property.localeCompare(b.body_property));
  return {
    id: toolDocument.id,
    name: config.name,
    type: config.type,
    response_timeout_secs: config.response_timeout_secs,
    execution_mode: config.execution_mode,
    force_pre_tool_speech: config.force_pre_tool_speech,
    pre_tool_speech: config.pre_tool_speech,
    required: config.api_schema?.request_body_schema?.required || [],
    dynamic_properties: dynamicProperties,
    tool_placeholder_keys: Object.keys(config.dynamic_variables?.dynamic_variable_placeholders || {}).sort(),
    url_host: (() => {
      try {
        return new URL(config.api_schema?.url || '').host;
      } catch {
        return config.api_schema?.url || '';
      }
    })(),
  };
}

function collectToolLikeReferences(value, pathParts = [], out = []) {
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectToolLikeReferences(child, [...pathParts, String(index)], out));
    return out;
  }
  const keys = Object.keys(value);
  const hasToolSignal = keys.some((key) => /tool/i.test(key)) || value.type === 'tool' || value.node_type === 'tool';
  if (hasToolSignal) {
    out.push({
      path: pathParts.join('.'),
      keys: keys.sort(),
      name: value.name || value.tool_name || value.tool?.name || '',
      id: value.id || value.tool_id || value.toolId || value.tool?.id || '',
      type: value.type || value.node_type || value.tool_type || '',
    });
  }
  for (const [key, child] of Object.entries(value)) {
    if (child && typeof child === 'object' && pathParts.length < 8) collectToolLikeReferences(child, [...pathParts, key], out);
  }
  return out;
}

function collectWorkflowLikeReferences(value, pathParts = [], out = []) {
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectWorkflowLikeReferences(child, [...pathParts, String(index)], out));
    return out;
  }
  const keys = Object.keys(value);
  const hasWorkflowSignal = keys.some((key) => /workflow|subagent|node|edge|transfer|agent/i.test(key));
  if (hasWorkflowSignal) {
    out.push({
      path: pathParts.join('.'),
      keys: keys.sort(),
      id: value.id || value.node_id || value.agent_id || value.subagent_id || '',
      name: value.name || value.label || value.agent_name || '',
      type: value.type || value.node_type || '',
    });
  }
  for (const [key, child] of Object.entries(value)) {
    if (child && typeof child === 'object' && pathParts.length < 8) collectWorkflowLikeReferences(child, [...pathParts, key], out);
  }
  return out;
}

function summarizeWorkflow(workflow = {}, toolDocs = []) {
  const toolById = new Map(toolDocs.map((tool) => [tool.id, tool.name || tool.error || 'unknown']));
  const nodes = workflow.nodes || {};
  return Object.entries(nodes).map(([nodeId, node]) => {
    const inlineTools = Array.isArray(node.tools) ? node.tools : [];
    return {
      node_id: nodeId,
      label: node.label || '',
      type: node.type || '',
      additional_tool_ids: Array.isArray(node.additional_tool_ids)
        ? node.additional_tool_ids.map((toolId) => ({ tool_id: toolId, name: toolById.get(toolId) || 'unknown' }))
        : [],
      tools: inlineTools.map((tool) => ({
        name: tool.name || tool.tool_name || tool.tool?.name || '',
        id: tool.id || tool.tool_id || tool.toolId || tool.tool?.id || '',
        type: tool.type || tool.tool_type || '',
      })),
    };
  });
}

function summarizeEdges(workflow = {}) {
  const edges = workflow.edges || {};
  return Object.entries(edges).map(([edgeId, edge]) => ({
    edge_id: edgeId,
    source_node_id: edge.source_node_id || edge.source || '',
    target_node_id: edge.target_node_id || edge.target || '',
    condition: edge.condition || edge.conditions || edge.label || '',
    forward_condition: edge.forward_condition || '',
    backward_condition: edge.backward_condition || '',
    keys: Object.keys(edge || {}).sort(),
  }));
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const versionArgIndex = process.argv.indexOf('--version-id');
const versionId = versionArgIndex >= 0 ? process.argv[versionArgIndex + 1] : '';
const agentUrl = new URL(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`);
if (versionId) agentUrl.searchParams.set('version_id', versionId);
const agent = await request(apiKey, agentUrl.toString());
const conversationConfig = agent.conversation_config || {};
const agentConfig = conversationConfig.agent || {};
const promptConfig = agentConfig.prompt || {};
const promptVariables = extractPromptVariables(`${agentConfig.first_message || ''}\n${promptConfig.prompt || ''}`);
const placeholderKeys = Object.keys(agentConfig.dynamic_variables?.dynamic_variable_placeholders || {}).sort();
const toolIds = Array.isArray(promptConfig.tool_ids) ? promptConfig.tool_ids : [];
const tools = [];
for (const toolId of toolIds) {
  try {
    tools.push(summarizeTool(await request(apiKey, `https://api.elevenlabs.io/v1/convai/tools/${toolId}`)));
  } catch (error) {
    tools.push({ id: toolId, error: String(error.message || error) });
  }
}

console.log(JSON.stringify({
  agent_id: agentId,
  requested_version_id: versionId || null,
  version_id: agent.version_id,
  top_level_keys: Object.keys(agent).sort(),
  name: agent.name,
  first_message: agentConfig.first_message,
  prompt_chars: typeof promptConfig.prompt === 'string' ? promptConfig.prompt.length : 0,
  prompt_variables: [...new Set(promptVariables)],
  placeholder_key_count: placeholderKeys.length,
  placeholder_keys: placeholderKeys,
  prompt_variables_missing_placeholders: [...new Set(promptVariables)].filter((key) => !placeholderKeys.includes(key)),
  tool_ids: toolIds,
  tools,
  conversation: {
    max_duration_seconds: conversationConfig.conversation?.max_duration_seconds,
    turn_timeout: conversationConfig.conversation?.turn_timeout,
    turn_eagerness: conversationConfig.conversation?.turn_eagerness,
    background_music: conversationConfig.conversation?.background_music || null,
  },
  llm: {
    model: promptConfig.llm,
    temperature: promptConfig.temperature,
    max_tokens: promptConfig.max_tokens,
  },
  tool_like_references: collectToolLikeReferences(conversationConfig),
  workflow_like_references: collectWorkflowLikeReferences(conversationConfig),
  top_level_workflow_like_references: collectWorkflowLikeReferences(agent),
  workflow_summary: summarizeWorkflow(agent.workflow || {}, tools),
  workflow_edges: summarizeEdges(agent.workflow || {}),
}, null, 2));
