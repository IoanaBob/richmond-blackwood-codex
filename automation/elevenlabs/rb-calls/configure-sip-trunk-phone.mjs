import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const API_BASE = 'https://api.elevenlabs.io/v1/convai';
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

function requiredEnv(name) {
  const value = String(process.env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name}. Put it in local .env or a local secret store; do not commit it.`);
  return value;
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

function compactObject(input) {
  const output = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    output[key] = value;
  }
  return output;
}

function maskCredential(value) {
  const text = String(value || '');
  if (!text) return '';
  return `${text.slice(0, 2)}***${text.slice(-2)}`;
}

loadLocalEnv();

const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const phoneNumber = requiredEnv('RB_ELEVENLABS_SIP_PHONE_NUMBER');
const label = process.env.RB_ELEVENLABS_SIP_PHONE_LABEL || 'RB Calls Twilio SIP';
const existingPhoneNumberId = String(process.env.RB_ELEVENLABS_SIP_PHONE_NUMBER_ID || '').trim();
const terminationDomain = requiredEnv('RB_TWILIO_SIP_TERMINATION_DOMAIN');
const username = requiredEnv('RB_TWILIO_SIP_USERNAME');
const password = requiredEnv('RB_TWILIO_SIP_PASSWORD');
const transport = process.env.RB_ELEVENLABS_SIP_TRANSPORT || 'tcp';
const mediaEncryption = process.env.RB_ELEVENLABS_SIP_MEDIA_ENCRYPTION || 'disabled';
const storeSipMessages = process.env.RB_ELEVENLABS_STORE_SIP_MESSAGES !== 'false';

const outboundTrunkConfig = compactObject({
  address: terminationDomain.replace(/^sips?:\/\//i, '').replace(/\/+$/, ''),
  transport,
  media_encryption: mediaEncryption,
  credentials: { username, password },
});

const createBody = compactObject({
  provider: 'sip_trunk',
  phone_number: phoneNumber,
  label,
  supports_inbound: false,
  supports_outbound: true,
  outbound_trunk_config: outboundTrunkConfig,
  store_sip_messages: storeSipMessages,
});

const patchBody = compactObject({
  agent_id: agentId,
  label,
  outbound_trunk_config: outboundTrunkConfig,
  store_sip_messages: storeSipMessages,
});

const phoneNumbers = await request('GET', `${API_BASE}/phone-numbers`, apiKey);
const existing = (Array.isArray(phoneNumbers) ? phoneNumbers : []).find((phone) => {
  if (existingPhoneNumberId && phone.phone_number_id === existingPhoneNumberId) return true;
  return phone.provider === 'sip_trunk' && phone.phone_number === phoneNumber;
});
const targetId = existing?.phone_number_id || existingPhoneNumberId;

const summary = {
  apply,
  action: targetId ? 'patch_existing_sip_phone_number' : 'create_sip_phone_number',
  agent_id: agentId,
  phone_number_present: Boolean(phoneNumber),
  label,
  provider: 'sip_trunk',
  existing_phone_number_id: targetId || '',
  outbound_trunk_config: {
    address: outboundTrunkConfig.address,
    transport: outboundTrunkConfig.transport,
    media_encryption: outboundTrunkConfig.media_encryption,
    credentials: { username: maskCredential(username), password: maskCredential(password) },
  },
  store_sip_messages: storeSipMessages,
};

if (!apply) {
  console.log(JSON.stringify({ ...summary, note: 'Dry run only. Re-run with --apply to create or patch the ElevenLabs SIP phone number.' }, null, 2));
  process.exit(0);
}

let phoneResult;
if (targetId) {
  phoneResult = await request('PATCH', `${API_BASE}/phone-numbers/${targetId}`, apiKey, patchBody);
} else {
  const created = await request('POST', `${API_BASE}/phone-numbers`, apiKey, createBody);
  phoneResult = await request('PATCH', `${API_BASE}/phone-numbers/${created.phone_number_id}`, apiKey, patchBody);
}

console.log(JSON.stringify({
  ...summary,
  phone_number_id: phoneResult.phone_number_id || targetId,
  assigned_agent: phoneResult.assigned_agent || null,
  provider_verified: phoneResult.provider || '',
  next_step: 'Set n8n variable ELEVENLABS_AGENT_PHONE_NUMBER_ID to this phone_number_id and ELEVENLABS_OUTBOUND_CALL_PROVIDER to sip_trunk.',
}, null, 2));
