import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function loadLocalEnv() {
  const candidates = [path.resolve(process.cwd(), '.env'), new URL('../../../../.env', import.meta.url)];
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    const text = fs.readFileSync(candidate, 'utf8');
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

function short(value, max = 1200) {
  if (value === undefined || value === null) return value;
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return text.length > max ? `${text.slice(0, max)}... [truncated ${text.length - max} chars]` : text;
}

function summarizeToolCall(tool = {}) {
  return {
    name: tool.name || tool.tool_name || tool.tool_id || tool.id || '',
    tool_id: tool.tool_id || tool.id || '',
    parameters: tool.parameters || tool.input || tool.arguments || tool.request_body || null,
  };
}

function summarizeToolResult(result = {}) {
  return {
    tool_name: result.tool_name || result.name || result.tool_id || '',
    tool_id: result.tool_id || result.id || '',
    is_error: result.is_error,
    error_type: result.error_type || '',
    raw_error_message: result.raw_error_message || '',
    result: short(result.result || result.output || result.response || result, 2200),
  };
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const conversationId = process.argv[2];
if (!conversationId) throw new Error('Usage: node automation/elevenlabs/rb-calls/inspect-conversation-detail.mjs <conversation_id>');

const conversation = await request(apiKey, `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`);
const dynamic = conversation.conversation_initiation_client_data?.dynamic_variables || conversation.client_data?.dynamic_variables || {};
const selectedDynamicVariables = {};
for (const key of [
  'tax_reference_summary',
  'context_pack',
  'company_context_json',
  'individual_context_json',
  'contact_context_json',
  'tax_registration_context_json',
  'lookup_allowed_categories',
  'call_id',
  'call_public_id',
  'live_help_request_id',
  'live_help_slack_thread_ts',
  'live_help_note_page_id',
  'live_help_expires_at',
  'live_help_status',
  'live_help_answer',
]) {
  selectedDynamicVariables[key] = short(dynamic[key], key === 'context_pack' ? 5000 : 2000);
}

const transcript = (conversation.transcript || []).map((entry, index) => ({
  index,
  role: entry.role,
  message: short(entry.message || '', 1600),
  tool_calls: (entry.tool_calls || []).map(summarizeToolCall),
  tool_results: (entry.tool_results || []).map(summarizeToolResult),
}));

console.log(JSON.stringify({
  conversation_id: conversationId,
  version_id: conversation.version_id,
  status: conversation.status,
  duration_secs: conversation.metadata?.call_duration_secs,
  termination_reason: conversation.metadata?.termination_reason,
  selected_dynamic_variables: selectedDynamicVariables,
  tool_call_names: transcript.flatMap((entry) => entry.tool_calls.map((tool) => tool.name)).filter(Boolean),
  transcript,
}, null, 2));
