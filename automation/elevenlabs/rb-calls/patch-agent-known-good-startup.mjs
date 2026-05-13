import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const KNOWN_GOOD_VERSION_ID = 'agtvrsn_2701krcvbpgmewmasrvyhjt1cx58';
const STABLE_FIRST_MESSAGE = 'Hello, my name is Alexander Gulin. I am calling about an administrative matter for a client, and I would like to make sure I am speaking with the right department.';
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

function ensurePlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name)) placeholders[name] = value;
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const knownGoodUrl = new URL(baseUrl);
knownGoodUrl.searchParams.set('version_id', KNOWN_GOOD_VERSION_ID);

const [currentAgent, knownGoodAgent, tools] = await Promise.all([
  request('GET', baseUrl, apiKey),
  request('GET', knownGoodUrl.toString(), apiKey),
  listTools(apiKey),
]);

const requestHelpId = tools.find((tool) => tool.tool_config?.name === 'request_creator_help')?.id || '';
const checkHelpId = tools.find((tool) => tool.tool_config?.name === 'check_creator_help')?.id || '';
if (!requestHelpId || !checkHelpId) throw new Error('Could not resolve current live-help tool IDs.');

const conversationConfig = structuredClone(knownGoodAgent.conversation_config);
conversationConfig.agent ||= {};
conversationConfig.agent.first_message = STABLE_FIRST_MESSAGE;
conversationConfig.agent.prompt ||= {};
conversationConfig.agent.prompt.tool_ids = [];
delete conversationConfig.agent.prompt.tools;
conversationConfig.conversation ||= {};
conversationConfig.conversation.background_music = {
  source_type: null,
  source_id: null,
  volume: 0.01,
  crossfade_loop: false,
};

const existingCurrentPlaceholders = currentAgent.conversation_config?.agent?.dynamic_variables?.dynamic_variable_placeholders || {};
for (const [name, value] of Object.entries(existingCurrentPlaceholders)) ensurePlaceholder(conversationConfig, name, value);
for (const [name, value] of Object.entries({
  caller_name: 'Alexander Gulin',
  representative_entity: 'Richmond Blackwood Limited',
  represented_subject: '',
  representative_role: '',
  representation_authority: '',
  poa_speech_rule: '',
  message_topic: '',
  owner_mention: '',
  owner_name: '',
  owner_slack_member_id: '',
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
})) ensurePlaceholder(conversationConfig, name, value);

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  base_version_id: KNOWN_GOOD_VERSION_ID,
  current_version_id: currentAgent.version_id || '',
  known_good_prompt_chars: knownGoodAgent.conversation_config?.agent?.prompt?.prompt?.length || 0,
  target_first_message: conversationConfig.agent.first_message,
  target_root_tool_ids: conversationConfig.agent.prompt.tool_ids,
  target_prompt_chars: conversationConfig.agent.prompt.prompt?.length || 0,
  live_help_tool_routing: `Use workflow tool nodes only: ${requestHelpId} on node_rb_live_start_v2 and ${checkHelpId} on node_rb_live_check_v2.`,
  lookup_tool_detached: !(conversationConfig.agent.prompt.tool_ids || []).some((toolId) => tools.find((tool) => tool.id === toolId)?.tool_config?.name === 'lookup_call_context'),
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, apiKey, { conversation_config: conversationConfig });
const readback = await request('GET', baseUrl, apiKey);

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_first_message: readback.conversation_config?.agent?.first_message || '',
  verified_tool_ids: readback.conversation_config?.agent?.prompt?.tool_ids || [],
  verified_prompt_chars: readback.conversation_config?.agent?.prompt?.prompt?.length || 0,
  verified_background_music: readback.conversation_config?.conversation?.background_music || null,
}, null, 2));
