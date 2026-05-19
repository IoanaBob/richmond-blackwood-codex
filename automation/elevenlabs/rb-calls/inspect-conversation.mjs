import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

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

function byteLength(value) {
  return Buffer.byteLength(typeof value === 'string' ? value : JSON.stringify(value ?? null), 'utf8');
}

function summarizeValue(value) {
  if (Array.isArray(value)) return { type: 'array', count: value.length, bytes: byteLength(value) };
  if (value && typeof value === 'object') return { type: 'object', keys: Object.keys(value).sort(), bytes: byteLength(value) };
  if (typeof value === 'string') return { type: 'string', chars: value.length, bytes: byteLength(value) };
  return { type: typeof value, value };
}

function collectDiagnosticFields(value, pathParts = [], out = {}) {
  if (!value || typeof value !== 'object') return out;
  for (const [key, child] of Object.entries(value)) {
    const nextPath = [...pathParts, key];
    if (/status|error|fail|reason|disconnect|termination|success|duration/i.test(key)) {
      out[nextPath.join('.')] = child;
    }
    if (child && typeof child === 'object' && nextPath.length < 5) collectDiagnosticFields(child, nextPath, out);
  }
  return out;
}

function summarizeDynamicVariables(dynamicVariables = {}) {
  const entries = Object.entries(dynamicVariables).sort(([a], [b]) => a.localeCompare(b));
  return {
    key_count: entries.length,
    total_bytes: byteLength(dynamicVariables),
    keys: entries.map(([key, value]) => ({ key, ...summarizeValue(value) })),
  };
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

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const args = process.argv.slice(2);
const latestIndex = args.indexOf('--latest');
const latestCount = latestIndex === -1 ? 0 : Number(args[latestIndex + 1] || 10);
let conversationIds = args.filter((arg, index) => !arg.startsWith('-') && index !== latestIndex + 1);
if (latestIndex === -1) conversationIds = args.filter((arg) => !arg.startsWith('-'));

if (latestIndex !== -1) {
  const conversations = await request(apiKey, `https://api.elevenlabs.io/v1/convai/conversations?page_size=${Number.isFinite(latestCount) && latestCount > 0 ? Math.min(latestCount, 100) : 10}`);
  conversationIds = (conversations.conversations || conversations.items || [])
    .map((conversation) => conversation.conversation_id || conversation.id)
    .filter(Boolean);
  console.log(JSON.stringify({
    latest_conversation_count: conversationIds.length,
    latest_conversation_ids: conversationIds,
  }, null, 2));
}

if (!conversationIds.length) throw new Error('Usage: node automation/elevenlabs/rb-calls/inspect-conversation.mjs <conversation_id> [...] or --latest [count]');

for (const conversationId of conversationIds) {
  const conversation = await request(apiKey, `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`);
  const dynamicVariables =
    conversation.conversation_initiation_client_data?.dynamic_variables
    || conversation.client_data?.dynamic_variables
    || {};
  const transcript = Array.isArray(conversation.transcript) ? conversation.transcript : [];
  const output = {
    conversation_id: conversationId,
    top_level_keys: Object.keys(conversation).sort(),
    agent_id: conversation.agent_id,
    version_id: conversation.version_id,
    branch_id: conversation.branch_id,
    environment: conversation.environment,
    status: conversation.status,
    call_successful: conversation.analysis?.call_successful,
    diagnostic_fields: collectDiagnosticFields(conversation),
    metadata: conversation.metadata ? summarizeValue(conversation.metadata) : null,
    metadata_phone_call: conversation.metadata?.phone_call || null,
    metadata_warnings: conversation.metadata?.warnings || null,
    transcript_summary: {
      count: transcript.length,
      first_messages: transcript.slice(0, 5).map((entry) => ({
        role: entry.role,
        message_chars: typeof entry.message === 'string' ? entry.message.length : null,
        message_preview: typeof entry.message === 'string' ? entry.message.slice(0, 120) : entry.message,
        tool_calls: Array.isArray(entry.tool_calls) ? entry.tool_calls.map((tool) => tool.name || tool.tool_name || tool.tool_id || 'tool') : [],
      })),
    },
    dynamic_variables: summarizeDynamicVariables(dynamicVariables),
    client_data_bytes: byteLength(conversation.conversation_initiation_client_data || conversation.client_data || {}),
  };
  console.log(JSON.stringify(output, null, 2));
}
