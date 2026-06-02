import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const apply = process.argv.includes('--apply');

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

function isKeypadTool(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      (value.name === 'play_keypad_touch_tone' || value.params?.system_tool_type === 'play_keypad_touch_tone'),
  );
}

function patchKeypadTool(tool, pathParts, changes) {
  tool.params ||= {};
  const before = {
    use_out_of_band_dtmf: tool.params.use_out_of_band_dtmf,
    suppress_turn_after_dtmf: tool.params.suppress_turn_after_dtmf,
    disable_interruptions: tool.disable_interruptions,
  };

  tool.params.system_tool_type = 'play_keypad_touch_tone';
  tool.params.use_out_of_band_dtmf = true;
  tool.params.suppress_turn_after_dtmf = true;
  tool.disable_interruptions = true;
  tool.force_pre_tool_speech = false;
  tool.pre_tool_speech = 'auto';

  const after = {
    use_out_of_band_dtmf: tool.params.use_out_of_band_dtmf,
    suppress_turn_after_dtmf: tool.params.suppress_turn_after_dtmf,
    disable_interruptions: tool.disable_interruptions,
  };

  if (JSON.stringify(before) !== JSON.stringify(after)) changes.push({ path: pathParts.join('.'), before, after });
}

function patchAllKeypadTools(value, pathParts = [], changes = []) {
  if (!value || typeof value !== 'object') return changes;
  if (Array.isArray(value)) {
    value.forEach((child, index) => patchAllKeypadTools(child, [...pathParts, String(index)], changes));
    return changes;
  }
  if (isKeypadTool(value)) patchKeypadTool(value, pathParts, changes);
  for (const [key, child] of Object.entries(value)) {
    if (child && typeof child === 'object') patchAllKeypadTools(child, [...pathParts, key], changes);
  }
  return changes;
}

function summarizeKeypadConfig(agent) {
  const prompt = agent.conversation_config?.agent?.prompt || {};
  return {
    root_built_in: prompt.built_in_tools?.play_keypad_touch_tone?.params || null,
    root_tool: (prompt.tools || []).find((tool) => tool?.name === 'play_keypad_touch_tone')?.params || null,
    ivr_override: agent.workflow?.nodes?.node_rb_ivr_v1?.conversation_config?.agent?.prompt?.built_in_tools?.play_keypad_touch_tone?.params || null,
  };
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const agent = await request('GET', baseUrl, apiKey);
const conversationConfig = structuredClone(agent.conversation_config || {});
const workflow = structuredClone(agent.workflow || {});
const changes = [];

patchAllKeypadTools(conversationConfig, ['conversation_config'], changes);
patchAllKeypadTools(workflow, ['workflow'], changes);

const summary = {
  agent_id: agentId,
  apply,
  before_version_id: agent.version_id || '',
  before_keypad: summarizeKeypadConfig(agent),
  changes,
};

if (!apply) {
  console.log(JSON.stringify({ ...summary, note: 'Dry run only. Re-run with --apply to patch the live ElevenLabs agent.' }, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, apiKey, { conversation_config: conversationConfig, workflow });
const readback = await request('GET', baseUrl, apiKey);

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_keypad: summarizeKeypadConfig(readback),
}, null, 2));
