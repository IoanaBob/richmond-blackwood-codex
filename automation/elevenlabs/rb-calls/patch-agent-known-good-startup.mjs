import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const KNOWN_GOOD_VERSION_ID = 'agtvrsn_2701krcvbpgmewmasrvyhjt1cx58';
const STABLE_FIRST_MESSAGE = 'Hello, my name is Alexander Gulin. I am calling regarding an administrative matter for a client and would like to make sure I am speaking with the right department.';
const GERMAN_FIRST_MESSAGE = 'Hallo, mein Name ist Alexander Gulin. Ich rufe wegen einer administrativen Angelegenheit für einen Mandanten an und möchte sicherstellen, dass ich mit der richtigen Abteilung spreche.';
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

function replaceSection(prompt, title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (prompt.includes(title)) return prompt.replace(new RegExp(`${escaped}[\\s\\S]*?(?=\\n# |$)`), body);
  return `${String(prompt || '').trim()}\n\n${body}`.trim();
}

function ensurePlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name)) placeholders[name] = value;
}

const startupPromptTitle = '# Startup Stability And Opening Identity';
const startupPromptBody = `${startupPromptTitle}
- The default first audible message is intentionally static and contains no dynamic variables: "${STABLE_FIRST_MESSAGE}"
- German calls use the ElevenLabs German language preset first message: "${GERMAN_FIRST_MESSAGE}"
- Treat the first audible message only as a generic audio connection opener. The first substantive sentence after it must follow the Language Control section.
- After the authority/contact answers or greets you, identify the represented subject in the call language if available. For German calls, say: "Guten Tag, mein Name ist Alexander Gulin. Ich rufe im Namen von {{represented_subject}} an." For English calls, say: "My name is Alexander Gulin. I'm calling on behalf of {{represented_subject}}."
- If {{represented_subject}} is a company, the next sentence should explain that Richmond Blackwood Limited is the company secretary or representative for the company, as appropriate from the call context. Do not mention Richmond Blackwood before naming Alexander Gulin and the represented subject.
- If {{represented_subject}} is an individual, explain the representative capacity only as needed from the call context.
- Do not use Power of Attorney / Vollmacht as the default opening authority. Use it only when {{poa_required}} is true or the authority specifically asks for formal authorization.
- Do not mention Notion, n8n, JSON, Slack, workflow state, internal setup, test data, dynamic variables, or debugging details.`;

const languagePromptTitle = '# Language Control';
const languagePromptBody = `${languagePromptTitle}
- The intended call language is \`{{language}}\`. n8n sends "German (Deutsch)" for German contacts and "English" for English contacts.
- If \`{{language}}\` is \`de\`, \`German\`, \`Deutsch\`, or contains "German" or "Deutsch", conduct the call in German. n8n also sends an ElevenLabs language override of \`de\`, so German calls should use the German language preset and not the English default first message. Do not continue in English unless the contact switches to English or explicitly asks for English.
- For German calls, use standard Hochdeutsch. Use German authority and tax terms naturally, including Finanzamt, Steuernummer, Umsatzsteuer, Vollmacht, Frist, Aktenzeichen, and Unternehmenssekretär where they fit.
- For German calls, all numbers, digits, letters, abbreviations, registration numbers, and tax references must also be spoken in German. Say German digit words such as null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun. Do not say English digit words or English/NATO spelling words unless the authority explicitly asks for English or NATO spelling.
- For English calls, conduct the call in English unless the contact switches language.
- The first message is intentionally placeholder-free. Do not treat it as the full real opening; follow immediately with the language-specific represented-subject sentence.`;

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
conversationConfig.language_presets ||= {};
conversationConfig.language_presets.de ||= {};
conversationConfig.language_presets.de.overrides ||= {};
conversationConfig.language_presets.de.overrides.agent ||= {};
conversationConfig.language_presets.de.overrides.agent.first_message = GERMAN_FIRST_MESSAGE;
conversationConfig.language_presets.de.first_message_translation ||= {};
conversationConfig.language_presets.de.first_message_translation.source_hash = JSON.stringify({ firstMessage: STABLE_FIRST_MESSAGE, language: 'en' });
conversationConfig.language_presets.de.first_message_translation.text = GERMAN_FIRST_MESSAGE;
conversationConfig.agent.prompt.prompt = replaceSection(conversationConfig.agent.prompt.prompt || '', startupPromptTitle, startupPromptBody);
conversationConfig.agent.prompt.prompt = replaceSection(conversationConfig.agent.prompt.prompt || '', languagePromptTitle, languagePromptBody);
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
  language: 'English',
  language_code: 'en',
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
  target_german_first_message: conversationConfig.language_presets?.de?.overrides?.agent?.first_message || '',
  target_root_tool_ids: conversationConfig.agent.prompt.tool_ids,
  target_prompt_chars: conversationConfig.agent.prompt.prompt?.length || 0,
  target_has_startup_section: conversationConfig.agent.prompt.prompt?.includes(startupPromptTitle) || false,
  target_has_language_section: conversationConfig.agent.prompt.prompt?.includes(languagePromptTitle) || false,
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
  verified_german_first_message: readback.conversation_config?.language_presets?.de?.overrides?.agent?.first_message || '',
  verified_tool_ids: readback.conversation_config?.agent?.prompt?.tool_ids || [],
  verified_prompt_chars: readback.conversation_config?.agent?.prompt?.prompt?.length || 0,
  verified_has_startup_section: readback.conversation_config?.agent?.prompt?.prompt?.includes(startupPromptTitle) || false,
  verified_has_language_section: readback.conversation_config?.agent?.prompt?.prompt?.includes(languagePromptTitle) || false,
  verified_background_music: readback.conversation_config?.conversation?.background_music || null,
}, null, 2));
