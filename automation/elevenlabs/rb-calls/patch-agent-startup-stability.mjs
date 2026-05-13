import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
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

function replaceSection(prompt, title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (prompt.includes(title)) return prompt.replace(new RegExp(`${escaped}[\\s\\S]*?(?=\\n# |$)`), body);
  return `${prompt.trim()}\n\n${body}`;
}

function ensureAgentPlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name)) placeholders[name] = value;
}

const promptTitle = '# Startup Stability And Opening Identity';
const promptBody = `${promptTitle}
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
- For English calls, conduct the call in English unless the contact switches language.
- The first message is intentionally placeholder-free. Do not treat it as the full real opening; follow immediately with the language-specific represented-subject sentence.`;

loadLocalEnv();
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) throw new Error('Missing ELEVENLABS_API_KEY. Put it in local .env or ~/.codex/config.toml.');

const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const agent = await request('GET', baseUrl, apiKey);
const conversationConfig = agent.conversation_config;
if (!conversationConfig?.agent?.prompt?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const before = {
  version_id: agent.version_id || '',
  first_message: conversationConfig.agent.first_message || '',
  background_music: conversationConfig.conversation?.background_music || null,
  prompt_chars: conversationConfig.agent.prompt.prompt.length,
};

conversationConfig.agent.first_message = STABLE_FIRST_MESSAGE;
conversationConfig.language_presets ||= {};
conversationConfig.language_presets.de ||= {};
conversationConfig.language_presets.de.overrides ||= {};
conversationConfig.language_presets.de.overrides.agent ||= {};
conversationConfig.language_presets.de.overrides.agent.first_message = GERMAN_FIRST_MESSAGE;
conversationConfig.language_presets.de.first_message_translation ||= {};
conversationConfig.language_presets.de.first_message_translation.source_hash = JSON.stringify({ firstMessage: STABLE_FIRST_MESSAGE, language: 'en' });
conversationConfig.language_presets.de.first_message_translation.text = GERMAN_FIRST_MESSAGE;
conversationConfig.agent.prompt.prompt = replaceSection(conversationConfig.agent.prompt.prompt, promptTitle, promptBody);
conversationConfig.agent.prompt.prompt = replaceSection(conversationConfig.agent.prompt.prompt, languagePromptTitle, languagePromptBody);
delete conversationConfig.agent.prompt.tools;
conversationConfig.conversation ||= {};
conversationConfig.conversation.background_music = {
  source_type: null,
  source_id: null,
  volume: 0.01,
  crossfade_loop: false,
};

for (const name of ['language', 'language_code', 'represented_subject', 'caller_name', 'representative_entity', 'representative_role', 'representation_authority', 'poa_required', 'poa_speech_rule']) {
  ensureAgentPlaceholder(conversationConfig, name, name === 'caller_name' ? 'Alexander Gulin' : name === 'language' ? 'English' : name === 'language_code' ? 'en' : '');
}

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  before,
  after: {
    first_message: conversationConfig.agent.first_message,
    german_first_message: conversationConfig.language_presets?.de?.overrides?.agent?.first_message || '',
    background_music: conversationConfig.conversation.background_music,
    prompt_chars: conversationConfig.agent.prompt.prompt.length,
    prompt_section_present: conversationConfig.agent.prompt.prompt.includes(promptTitle),
    language_section_present: conversationConfig.agent.prompt.prompt.includes(languagePromptTitle),
  },
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, apiKey, { conversation_config: conversationConfig });
const readback = await request('GET', baseUrl, apiKey);
const readbackPrompt = readback.conversation_config?.agent?.prompt?.prompt || '';

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_first_message: readback.conversation_config?.agent?.first_message || '',
  verified_german_first_message: readback.conversation_config?.language_presets?.de?.overrides?.agent?.first_message || '',
  verified_background_music: readback.conversation_config?.conversation?.background_music || null,
  verified_prompt_section: readbackPrompt.includes(promptTitle),
  verified_language_section: readbackPrompt.includes(languagePromptTitle),
}, null, 2));
