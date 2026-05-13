import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const STABLE_FIRST_MESSAGE = 'Hello, my name is Alexander Gulin. I am calling about an administrative matter for a client, and I would like to make sure I am speaking with the right department.';
const dryRun = process.argv.includes('--dry-run');

function loadLocalEnv() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    new URL('../../../../.env', import.meta.url),
  ];
  for (const candidate of candidates) {
    const envPath = candidate instanceof URL ? candidate : pathToUrlPath(candidate);
    const fsPath = candidate instanceof URL ? candidate : candidate;
    if (!fs.existsSync(fsPath)) continue;
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
}

function pathToUrlPath(filePath) {
  return filePath;
}

function readCodexElevenLabsKey() {
  const configPath = `${os.homedir()}/.codex/config.toml`;
  if (!fs.existsSync(configPath)) return '';
  const config = fs.readFileSync(configPath, 'utf8');
  return config.match(/ELEVENLABS_API_KEY\s*=\s*"([^"]+)"/)?.[1] || '';
}

loadLocalEnv();
const agentId = process.env.RB_ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;
const apiKey = process.env.ELEVENLABS_API_KEY || readCodexElevenLabsKey();
if (!apiKey) {
  throw new Error('Missing ELEVENLABS_API_KEY. Put it in a local ignored .env file or ~/.codex/config.toml.');
}

const baseUrl = `https://api.elevenlabs.io/v1/convai/agents/${agentId}`;
const headers = { 'xi-api-key': apiKey, 'Content-Type': 'application/json' };

async function request(method, url, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!response.ok) {
    throw new Error(`${method} ${url} failed ${response.status}: ${text.slice(0, 1000)}`);
  }
  return json;
}

function replaceSection(prompt, title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (prompt.includes(title)) {
    return prompt.replace(new RegExp(`${escaped}[\\s\\S]*?(?=\\n# |$)`), body);
  }
  return `${prompt.trim()}\n\n${body}`;
}

function ensureAgentPlaceholder(conversationConfig, name, value = '') {
  conversationConfig.agent ||= {};
  conversationConfig.agent.dynamic_variables ||= {};
  conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders ||= {};
  const placeholders = conversationConfig.agent.dynamic_variables.dynamic_variable_placeholders;
  if (!Object.prototype.hasOwnProperty.call(placeholders, name) || placeholders[name] === '') {
    placeholders[name] = value;
  }
}

const openingPromptTitle = '# Opening Identity And Representative Authority';
const openingPromptBody = `${openingPromptTitle}
- Your caller name is \`{{caller_name}}\`. If it is unavailable, use Alexander Gulin.
- The configured first audible message is intentionally static: "${STABLE_FIRST_MESSAGE}" It must not contain dynamic-variable placeholders, because direct/manual ElevenLabs tests may start without n8n client data.
- Immediately after that greeting, if \`{{represented_subject}}\` is available and not the generic fallback "the represented client", say: "I'm calling on behalf of {{represented_subject}}." Do not mention Richmond Blackwood Limited before the represented company or individual is clear.
- If the represented subject is missing because this is a direct/manual test, continue safely. Ask for or infer the represented company or individual from the conversation; do not end the call or expose internal setup details because a variable is blank.
- For company-subject calls, after the represented company is clear, your representative position is: Richmond Blackwood Limited is the company secretary, which is a representative position for the company. Use that before relying on a Power of Attorney or Vollmacht.
- For individual-subject calls, say you are calling on behalf of the individual. Use a Power of Attorney or Vollmacht only if the call is marked as requiring it or the authority specifically requires it.
- If \`{{poa_required}}\` is false, do not lead with PoA, Power of Attorney, or Vollmacht. Treat it as a last resort: first explain the representative position and ask whether the authority requires a PoA for this specific request.
- If \`{{poa_required}}\` is true, or the authority explicitly requires a PoA before continuing, use the available subject-specific PoA context if validated. If you cannot safely answer, ask the call creator for help.
- Do not overstate legal authority. Be factual: caller name, represented subject, representative position, then the call reason.
- Never mention placeholders, dynamic variables, missing variables, n8n, ElevenLabs, Slack, tools, workflow state, or internal setup details to the authority.`;

const agent = await request('GET', baseUrl);
const conversationConfig = agent.conversation_config;
const promptConfig = conversationConfig?.agent?.prompt;
if (!promptConfig?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const beforePrompt = promptConfig.prompt;
const beforeFirstMessage = conversationConfig.agent?.first_message || '';

const placeholderDefaults = {
  language: 'en',
  caller_name: 'Alexander Gulin',
  representative_entity: 'Richmond Blackwood Limited',
  represented_subject: 'the represented client',
  representative_role: 'representative caller',
  representation_authority: 'Use the available call context. For company calls, introduce Richmond Blackwood Limited as company secretary after the represented company is clear.',
  poa_speech_rule: 'Do not lead with Power of Attorney or Vollmacht unless the call is marked as requiring it or the authority specifically requires it.',
  company: '',
  individual: '',
  contact: '',
  reason_for_call: '',
  main_question: '',
  desired_outcome: '',
  message_topic: 'Authority call',
  owner_name: '',
  owner_role: '',
  owner_mention: '',
  owner_slack_member_id: '',
  poa_required: 'false',
  poa_validated: 'false',
  poa_subject: '',
  subject: '',
  call_url: '',
  call_id: '',
  call_public_id: '',
  live_help_request_id: 'not_started',
  live_help_slack_thread_ts: 'not_started',
  live_help_note_page_id: 'not_started',
  live_help_expires_at: '1970-01-01T00:00:00.000Z',
  live_help_status: 'not_requested',
  live_help_answer: 'not_answered',
  tax_reference_summary: '',
  latest_correspondence_summary: '',
  correspondence_context_json: '[]',
  latest_correspondence_json: '{}',
  call_notes_summary: '',
  call_notes_context_json: '[]',
  allowed_linked_record_categories: '',
  relation_coverage_json: '{}',
  company_context_json: '{}',
  individual_context_json: '{}',
  contact_context_json: '{}',
  company_summary_json: '{}',
  individual_summary_json: '{}',
  contact_summary_json: '{}',
  structured_context_json: '{}',
  linked_context_json: '{}',
  all_linked_records_json: '[]',
  context_pack: '',
  past_call_notes: '',
};

for (const [name, value] of Object.entries(placeholderDefaults)) {
  ensureAgentPlaceholder(conversationConfig, name, value);
}

conversationConfig.agent.first_message = STABLE_FIRST_MESSAGE;

promptConfig.prompt = replaceSection(promptConfig.prompt, openingPromptTitle, openingPromptBody);
promptConfig.prompt = promptConfig.prompt.replace(
  /You are representing the client directly, the authority should understand you as someone calling on the client's behalf, not as a separate company\./,
  'You are calling on behalf of the represented company or individual. For company-subject calls, the representative position is that Richmond Blackwood Limited is the company secretary; do not use Power of Attorney or Vollmacht as the default authority.'
);
promptConfig.prompt = promptConfig.prompt.replace(
  /identifies RB, the represented subject, the reason for call, and the main question/gi,
  'identifies Alexander Gulin, the represented subject, the reason for call, and the main question; Richmond Blackwood Limited is not mentioned in the first sentence'
);
delete promptConfig.tools;

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  first_message_before: beforeFirstMessage,
  first_message_after: conversationConfig.agent.first_message,
  prompt_changed: promptConfig.prompt !== beforePrompt,
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, { conversation_config: conversationConfig });
const readback = await request('GET', baseUrl);
const readbackPrompt = readback.conversation_config?.agent?.prompt?.prompt || '';
const readbackFirstMessage = readback.conversation_config?.agent?.first_message || '';
const placeholders = readback.conversation_config?.agent?.dynamic_variables?.dynamic_variable_placeholders || {};

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_prompt_section: readbackPrompt.includes(openingPromptTitle),
  verified_first_message: readbackFirstMessage,
  verified_first_message_has_alexander: /Alexander Gulin/i.test(readbackFirstMessage),
  verified_first_message_is_static: !/{{[^}]+}}/.test(readbackFirstMessage),
  verified_first_message_omits_representative_entity: !/Richmond Blackwood/i.test(readbackFirstMessage),
  verified_no_conflicting_direct_representation_text: !/not as a separate company/i.test(readbackPrompt),
  verified_placeholder_count: Object.keys(placeholders).length,
  verified_placeholders: Object.keys(placeholderDefaults).filter((name) => Object.prototype.hasOwnProperty.call(placeholders, name)),
}, null, 2));
