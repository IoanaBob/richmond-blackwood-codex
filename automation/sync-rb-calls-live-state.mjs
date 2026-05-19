#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const OUT_DIR = path.resolve('automation/live-readbacks');

const workflows = [
  {
    id: '3xJh7hNK0Zl9T4zS',
    slug: 'rb-calls-voice-execution',
    source: 'automation/n8n/rb-calls/voice-execution.workflow.mjs',
  },
  {
    id: 'qtwbaCjt8lqqjS6o',
    slug: 'rb-calls-live-help',
    source: 'automation/n8n/rb-calls/live-help.workflow.mjs',
  },
  {
    id: 'uBEMuAtKiJQzJAWw',
    slug: 'rb-calls-elevenlabs-events',
    source: 'automation/n8n/rb-calls/elevenlabs-events.workflow.mjs',
  },
  {
    id: 'i3rv4G6FmfosQm5j',
    slug: 'rb-calls-context-lookup',
    source: 'automation/n8n/rb-calls/context-lookup.workflow.mjs',
  },
];

function loadLocalEnv() {
  const envPath = path.resolve('.env');
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

function unquote(value) {
  const trimmed = value.trim().replace(/,$/, '');
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) return JSON.parse(trimmed);
  return trimmed;
}

function parseInlineHeaders(value) {
  const headers = {};
  const body = value.trim().replace(/^\{/, '').replace(/\}$/, '');
  const pairs = body.match(/"[^"]+"\s*=\s*"[^"]*"/g) || [];
  for (const pair of pairs) {
    const match = pair.match(/^"([^"]+)"\s*=\s*"([^"]*)"$/);
    if (match) headers[match[1]] = match[2];
  }
  return headers;
}

function readConfigSections() {
  const configPath = path.join(os.homedir(), '.codex', 'config.toml');
  if (!fs.existsSync(configPath)) return { text: '', lines: [] };
  const text = fs.readFileSync(configPath, 'utf8');
  return { text, lines: text.split(/\r?\n/) };
}

function readN8nConfig() {
  const { lines } = readConfigSections();
  let inN8n = false;
  let url = '';
  let headers = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\[/.test(trimmed)) {
      inN8n = trimmed === '[mcp_servers.n8n]';
      continue;
    }
    if (!inN8n || !trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (key === 'url') url = unquote(value);
    if (key === 'http_headers') headers = parseInlineHeaders(value);
  }

  if (!url) throw new Error('n8n MCP url not found in ~/.codex/config.toml');
  return { url, headers };
}

function readCodexElevenLabsKey() {
  const { text } = readConfigSections();
  if (!text) return '';
  return text.match(/ELEVENLABS_API_KEY\s*=\s*"([^"]+)"/)?.[1] || '';
}

function parseEventStream(text) {
  const events = [];
  let current = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) {
      if (current.length) events.push(current.join('\n'));
      current = [];
      continue;
    }
    if (line.startsWith('data:')) current.push(line.slice(5).trimStart());
  }
  if (current.length) events.push(current.join('\n'));
  for (const event of events) {
    if (!event || event === '[DONE]') continue;
    try {
      return JSON.parse(event);
    } catch {
      // Continue to the next event.
    }
  }
  throw new Error('Could not parse MCP event-stream response');
}

function parseRpcResponse(responseText, contentType) {
  if (!responseText.trim()) return null;
  if ((contentType || '').includes('text/event-stream')) return parseEventStream(responseText);
  return JSON.parse(responseText);
}

function parseToolPayload(payload) {
  const text = (payload.content || []).map((item) => item.text || '').filter(Boolean).join('\n');
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function assertToolResult(result, toolName) {
  if (!result) return {};
  if (result.error) throw new Error(`${toolName} RPC error: ${JSON.stringify(result.error)}`);
  const payload = result.result || result;
  if (payload.isError) {
    const text = (payload.content || []).map((item) => item.text || '').join('\n');
    throw new Error(`${toolName} tool error: ${text || JSON.stringify(payload)}`);
  }
  return payload;
}

function ensureDirectory(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDirectory(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function workflowDocument(mcpPayload) {
  return mcpPayload?.workflow || mcpPayload;
}

function workflowSummary(slug, source, mcpPayload) {
  const workflow = workflowDocument(mcpPayload);
  const nodes = Array.isArray(workflow?.nodes) ? workflow.nodes : [];
  const connectionCount = Object.values(workflow?.connections || {}).reduce((count, groups) => {
    if (!groups || typeof groups !== 'object') return count;
    return count + Object.values(groups).reduce((innerCount, edges) => {
      if (!Array.isArray(edges)) return innerCount;
      return innerCount + edges.length;
    }, 0);
  }, 0);
  return {
    slug,
    source,
    id: workflow?.id || '',
    name: workflow?.name || '',
    active: Boolean(workflow?.active),
    active_version_id: workflow?.activeVersionId || workflow?.active_version_id || null,
    version_id: workflow?.versionId || workflow?.version_id || null,
    updated_at: workflow?.updatedAt || workflow?.updated_at || null,
    node_count: nodes.length,
    connection_count: connectionCount,
    node_names: nodes.map((node) => node.name).filter(Boolean),
  };
}

function toolIdsFromAgent(value, out = new Set()) {
  if (typeof value === 'string') {
    if (/^tool_[a-z0-9]+$/i.test(value)) out.add(value);
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value)) {
    value.forEach((child) => toolIdsFromAgent(child, out));
    return out;
  }
  for (const child of Object.values(value)) toolIdsFromAgent(child, out);
  return out;
}

function elevenlabsAgentSummary(agent, tools) {
  const conversationConfig = agent.conversation_config || {};
  const agentConfig = conversationConfig.agent || {};
  const promptConfig = agentConfig.prompt || {};
  const workflow = agent.workflow || {};
  const nodes = workflow.nodes || {};
  const edges = workflow.edges || {};
  return {
    agent_id: agent.agent_id || agent.agentId || agent.id || DEFAULT_AGENT_ID,
    name: agent.name || '',
    version_id: agent.version_id || null,
    first_message: agentConfig.first_message || '',
    prompt_chars: typeof promptConfig.prompt === 'string' ? promptConfig.prompt.length : 0,
    root_tool_ids: Array.isArray(promptConfig.tool_ids) ? promptConfig.tool_ids : [],
    workflow_node_count: Object.keys(nodes).length,
    workflow_edge_count: Object.keys(edges).length,
    workflow_nodes: Object.entries(nodes).map(([nodeId, node]) => ({
      node_id: nodeId,
      label: node?.label || '',
      type: node?.type || '',
      tool_ids: [
        ...(Array.isArray(node?.additional_tool_ids) ? node.additional_tool_ids : []),
        ...(Array.isArray(node?.tools)
          ? node.tools.map((tool) => tool?.tool_id || tool?.id || tool?.toolId || '').filter(Boolean)
          : []),
      ],
    })),
    tools: tools.map((tool) => ({
      id: tool.id || '',
      name: tool.tool_config?.name || '',
      type: tool.tool_config?.type || '',
      execution_mode: tool.tool_config?.execution_mode || null,
      response_timeout_secs: tool.tool_config?.response_timeout_secs || null,
      force_pre_tool_speech: tool.tool_config?.force_pre_tool_speech || null,
      tool_call_sound: tool.tool_config?.tool_call_sound || null,
      tool_call_sound_behavior: tool.tool_config?.tool_call_sound_behavior || null,
    })),
  };
}

async function syncN8n(syncedAt) {
  const { url, headers: configuredHeaders } = readN8nConfig();
  let rpcId = 1;
  let sessionId = '';

  async function rpc(method, params, { notification = false } = {}) {
    const body = notification
      ? { jsonrpc: '2.0', method, params }
      : { jsonrpc: '2.0', id: rpcId++, method, params };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...configuredHeaders,
        ...(sessionId ? { 'mcp-session-id': sessionId } : {}),
        accept: 'application/json, text/event-stream',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const returnedSession = response.headers.get('mcp-session-id');
    if (returnedSession) sessionId = returnedSession;
    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`MCP ${method} failed with HTTP ${response.status}: ${responseText.slice(0, 500)}`);
    }
    return parseRpcResponse(responseText, response.headers.get('content-type'));
  }

  async function callTool(name, toolArgs) {
    const response = await rpc('tools/call', { name, arguments: toolArgs });
    return assertToolResult(response, name);
  }

  await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'rb-codex-live-readback-helper', version: '0.1.0' },
  });
  await rpc('notifications/initialized', {}, { notification: true });

  const summaries = [];
  for (const target of workflows) {
    const payload = await callTool('get_workflow_details', { workflowId: target.id });
    const workflow = parseToolPayload(payload);
    const snapshot = {
      synced_at: syncedAt,
      status: 'provisional',
      source: 'n8n MCP get_workflow_details',
      review: 'Compare with source-controlled workflow and publish intentionally after review.',
      workflow,
    };
    const file = path.join(OUT_DIR, 'n8n', `${target.slug}.workflow.json`);
    writeJson(file, snapshot);
    summaries.push(workflowSummary(target.slug, target.source, workflow));
    console.log(`wrote ${file}`);
  }
  return summaries;
}

async function elevenlabsGet(apiKey, url) {
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

async function syncElevenLabs(syncedAt) {
  const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
  if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');
  const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
  const agent = await elevenlabsGet(apiKey, `https://api.elevenlabs.io/v1/convai/agents/${agentId}`);
  const toolIds = [...toolIdsFromAgent(agent)].sort();
  const tools = [];
  for (const toolId of toolIds) {
    tools.push(await elevenlabsGet(apiKey, `https://api.elevenlabs.io/v1/convai/tools/${toolId}`));
  }

  const agentFile = path.join(OUT_DIR, 'elevenlabs', 'rb-call-bot.agent.json');
  const toolsFile = path.join(OUT_DIR, 'elevenlabs', 'rb-call-bot.tools.json');
  writeJson(agentFile, {
    synced_at: syncedAt,
    status: 'provisional',
    source: 'ElevenLabs API readback',
    review: 'Compare with source-controlled patch helpers and apply future edits intentionally after review.',
    agent,
  });
  writeJson(toolsFile, {
    synced_at: syncedAt,
    status: 'provisional',
    source: 'ElevenLabs API readback',
    review: 'Tool documents only; no API keys are stored.',
    tools,
  });
  console.log(`wrote ${agentFile}`);
  console.log(`wrote ${toolsFile}`);
  return elevenlabsAgentSummary(agent, tools);
}

loadLocalEnv();
const syncedAt = new Date().toISOString();
const n8n = await syncN8n(syncedAt);
const elevenlabs = await syncElevenLabs(syncedAt);

writeJson(path.join(OUT_DIR, 'rb-calls-live-state.json'), {
  status: 'provisional',
  source: 'local live readback sync helper using n8n MCP and ElevenLabs API',
  imported: syncedAt.slice(0, 10),
  synced_at: syncedAt,
  review: 'Use this registry to review manual live changes before publishing future workflow or agent edits.',
  n8n,
  elevenlabs,
});

console.log(`wrote ${path.join(OUT_DIR, 'rb-calls-live-state.json')}`);
