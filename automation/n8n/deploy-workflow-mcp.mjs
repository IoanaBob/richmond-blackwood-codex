#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);

function readArg(name, fallback = '') {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${name}`);
  return value;
}

function hasFlag(name) {
  return args.includes(name);
}

function usage() {
  return [
    'Usage:',
    '  node automation/n8n/deploy-workflow-mcp.mjs --workflow-id <id> --file <workflow.mjs> [--name <name>] [--description <text>] [--publish]',
    '  node automation/n8n/deploy-workflow-mcp.mjs --create --file <workflow.mjs> [--name <name>] [--description <text>] [--publish]',
    '',
    'Reads n8n MCP URL/auth headers from ~/.codex/config.toml. Tokens are never printed.',
  ].join('\n');
}

const workflowId = readArg('--workflow-id');
const file = readArg('--file');
const workflowName = readArg('--name', '');
const description = readArg('--description', '');
const shouldPublish = hasFlag('--publish');
const shouldCreate = hasFlag('--create');

if ((!workflowId && !shouldCreate) || !file) {
  console.error(usage());
  process.exit(2);
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

function readN8nConfig() {
  const configPath = path.join(os.homedir(), '.codex', 'config.toml');
  const text = fs.readFileSync(configPath, 'utf8');
  const lines = text.split(/\r?\n/);
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

let rpcId = 1;
let sessionId = '';
const { url, headers: configuredHeaders } = readN8nConfig();

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

function summarizeToolPayload(payload) {
  const text = (payload.content || []).map((item) => item.text || '').filter(Boolean).join('\n');
  if (!text) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2).slice(0, 1200);
  } catch {
    return text.slice(0, 1200);
  }
}

function parseToolPayload(payload) {
  const text = (payload.content || []).map((item) => item.text || '').filter(Boolean).join('\n');
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function findWorkflowId(value) {
  if (!value || typeof value !== 'object') return '';
  if (typeof value.workflowId === 'string') return value.workflowId;
  if (typeof value.id === 'string' && /^[A-Za-z0-9_-]{8,}$/.test(value.id)) return value.id;
  for (const child of Object.values(value)) {
    const found = findWorkflowId(child);
    if (found) return found;
  }
  return '';
}

async function callTool(name, toolArgs) {
  const response = await rpc('tools/call', { name, arguments: toolArgs });
  return assertToolResult(response, name);
}

const code = fs.readFileSync(path.resolve(file), 'utf8');

await rpc('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'rb-codex-n8n-deploy-helper', version: '0.1.0' },
});
await rpc('notifications/initialized', {}, { notification: true });

const validatePayload = await callTool('validate_workflow', { code });
console.log(`Validated ${path.basename(file)}.`);
const validateSummary = summarizeToolPayload(validatePayload);
if (validateSummary) console.log(validateSummary);

let targetWorkflowId = workflowId;
if (shouldCreate) {
  const createPayload = await callTool('create_workflow_from_code', {
    code,
    ...(workflowName ? { name: workflowName } : {}),
    ...(description ? { description } : {}),
  });
  const createSummary = summarizeToolPayload(createPayload);
  const parsed = parseToolPayload(createPayload);
  targetWorkflowId = findWorkflowId(parsed) || targetWorkflowId;
  console.log(targetWorkflowId ? `Created workflow ${targetWorkflowId}.` : 'Created workflow.');
  if (createSummary) console.log(createSummary);
} else {
  const updatePayload = await callTool('update_workflow', {
    workflowId,
    code,
    ...(workflowName ? { name: workflowName } : {}),
    ...(description ? { description } : {}),
  });
  console.log(`Updated workflow ${workflowId}.`);
  const updateSummary = summarizeToolPayload(updatePayload);
  if (updateSummary) console.log(updateSummary);
}

if (shouldPublish) {
  if (!targetWorkflowId) throw new Error('Cannot publish because workflow ID could not be resolved.');
  const publishPayload = await callTool('publish_workflow', { workflowId: targetWorkflowId });
  console.log(`Published workflow ${targetWorkflowId}.`);
  const publishSummary = summarizeToolPayload(publishPayload);
  if (publishSummary) console.log(publishSummary);
}
