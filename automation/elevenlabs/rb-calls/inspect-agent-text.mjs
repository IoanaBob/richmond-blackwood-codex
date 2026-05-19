import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';

const defaultPatterns = [
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

function collectStringMatches(value, patterns, pathParts = [], matches = []) {
  if (typeof value === 'string') {
    const normalized = value.replace(/\s+/g, ' ');
    for (const pattern of patterns) {
      const index = normalized.toLowerCase().indexOf(pattern.toLowerCase());
      if (index < 0) continue;
      const start = Math.max(0, index - 90);
      const end = Math.min(normalized.length, index + pattern.length + 160);
      matches.push({
        path: pathParts.join('.'),
        pattern,
        excerpt: normalized.slice(start, end),
      });
    }
    return matches;
  }
  if (!value || typeof value !== 'object') return matches;
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectStringMatches(child, patterns, [...pathParts, String(index)], matches));
    return matches;
  }
  for (const [key, child] of Object.entries(value)) {
    collectStringMatches(child, patterns, [...pathParts, key], matches);
  }
  return matches;
}

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const patternArgIndex = process.argv.indexOf('--patterns');
const patterns = patternArgIndex >= 0 && process.argv[patternArgIndex + 1]
  ? process.argv[patternArgIndex + 1].split(',').map((pattern) => pattern.trim()).filter(Boolean)
  : defaultPatterns;

const agent = await request(apiKey, `https://api.elevenlabs.io/v1/convai/agents/${agentId}`);
const toolList = await request(apiKey, 'https://api.elevenlabs.io/v1/convai/tools?page_size=100');
const relevantToolIds = (toolList.tools || [])
  .filter((tool) => ['request_creator_help', 'check_creator_help', 'lookup_call_context'].includes(tool.tool_config?.name))
  .map((tool) => tool.id);
const tools = [];
for (const toolId of relevantToolIds) {
  tools.push(await request(apiKey, `https://api.elevenlabs.io/v1/convai/tools/${toolId}`));
}

console.log(JSON.stringify({
  agent_id: agentId,
  version_id: agent.version_id || '',
  patterns,
  agent_matches: collectStringMatches({
    conversation_config: agent.conversation_config,
    workflow: agent.workflow,
    platform_settings: agent.platform_settings,
  }, patterns),
  tool_matches: collectStringMatches(tools, patterns),
}, null, 2));
