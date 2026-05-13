import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
const STABLE_FIRST_MESSAGE = 'Hello, my name is Alexander Gulin. I am calling regarding an administrative matter for a client and would like to make sure I am speaking with the right department.';
const GERMAN_FIRST_MESSAGE = 'Hallo, mein Name ist Alexander Gulin. Ich rufe wegen einer administrativen Angelegenheit für einen Mandanten an und möchte sicherstellen, dass ich mit der richtigen Abteilung spreche.';
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

function ensureOpeningWorkflowPrompt(workflow, additionalPrompt) {
  workflow.nodes ||= {};
  if (!workflow.nodes.node_rb_opening_v2) return false;
  workflow.nodes.node_rb_opening_v2.additional_prompt = additionalPrompt;
  return true;
}

const openingPromptTitle = '# Opening Identity And Representative Authority';
const openingPromptBody = `${openingPromptTitle}
- Your caller name is \`{{caller_name}}\`. If it is unavailable, use Alexander Gulin.
- The configured default first audible message is intentionally static and contains no dynamic-variable placeholders: "${STABLE_FIRST_MESSAGE}"
- German calls use the ElevenLabs German language preset first message: "${GERMAN_FIRST_MESSAGE}"
- Treat the first audible message only as a generic audio connection opener. The first substantive sentence after it must follow the Language Control section and identify the represented subject when available.
- Immediately after that greeting, if \`{{represented_subject}}\` is available and not the generic fallback "the represented client", identify yourself and the represented subject in the call language. For German calls, say: "Guten Tag, mein Name ist Alexander Gulin. Ich rufe im Namen von {{represented_subject}} an." For English calls, say: "My name is Alexander Gulin. I'm calling on behalf of {{represented_subject}}." Do not mention Richmond Blackwood Limited before the represented company or individual is clear.
- If the represented subject is missing because this is a direct/manual test, continue safely. Ask for or infer the represented company or individual from the conversation; do not end the call or expose internal setup details because a variable is blank.
- For company-subject calls, after the represented company is clear, your representative position is: Richmond Blackwood Limited is the company secretary, which is a representative position for the company. Use that before relying on a Power of Attorney or Vollmacht.
- For individual-subject calls, say you are calling on behalf of the individual. Use a Power of Attorney or Vollmacht only if the call is marked as requiring it or the authority specifically requires it.
- If \`{{poa_required}}\` is false, do not lead with PoA, Power of Attorney, or Vollmacht. Treat it as a last resort: first explain the representative position and ask whether the authority requires a PoA for this specific request.
- If \`{{poa_required}}\` is true, or the authority explicitly requires a PoA before continuing, use the available subject-specific PoA context if validated. If you cannot safely answer, ask the call creator for help.
- Do not overstate legal authority. Be factual: caller name, represented subject, representative position, then the call reason.
- Never mention placeholders, dynamic variables, missing variables, n8n, ElevenLabs, Slack, tools, workflow state, or internal setup details to the authority.`;

const languagePromptTitle = '# Language Control';
const languagePromptBody = `${languagePromptTitle}
- The intended call language is \`{{language}}\`. n8n sends "German (Deutsch)" for German contacts and "English" for English contacts.
- If \`{{language}}\` is \`de\`, \`German\`, \`Deutsch\`, or contains "German" or "Deutsch", conduct the call in German. n8n also sends an ElevenLabs language override of \`de\`, so German calls should use the German language preset and not the English default first message. Do not continue in English unless the contact switches to English or explicitly asks for English.
- For German calls, use standard Hochdeutsch. Use Finanzamt, Steuernummer, Umsatzsteuer, Vollmacht, Frist, Aktenzeichen, and Unternehmenssekretär where those terms fit naturally. Do not translate German authority terms into English unless asked.
- For English calls, conduct the call in English unless the contact switches language.
- The first message is intentionally placeholder-free. Do not treat it as the full real opening; follow immediately with the language-specific represented-subject sentence.`;

const openingWorkflowAdditionalPrompt = `${openingPromptBody.replace(`${openingPromptTitle}\n`, '')}

${languagePromptBody}`;

const agent = await request('GET', baseUrl);
const conversationConfig = agent.conversation_config;
const workflow = agent.workflow || {};
const promptConfig = conversationConfig?.agent?.prompt;
if (!promptConfig?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const beforePrompt = promptConfig.prompt;
const beforeFirstMessage = conversationConfig.agent?.first_message || '';

const placeholderDefaults = {
  language: 'English',
  language_code: 'en',
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
conversationConfig.language_presets ||= {};
conversationConfig.language_presets.de ||= {};
conversationConfig.language_presets.de.overrides ||= {};
conversationConfig.language_presets.de.overrides.agent ||= {};
conversationConfig.language_presets.de.overrides.agent.first_message = GERMAN_FIRST_MESSAGE;
conversationConfig.language_presets.de.first_message_translation ||= {};
conversationConfig.language_presets.de.first_message_translation.source_hash = JSON.stringify({ firstMessage: STABLE_FIRST_MESSAGE, language: 'en' });
conversationConfig.language_presets.de.first_message_translation.text = GERMAN_FIRST_MESSAGE;
const workflowOpeningUpdated = ensureOpeningWorkflowPrompt(workflow, openingWorkflowAdditionalPrompt);

promptConfig.prompt = replaceSection(promptConfig.prompt, openingPromptTitle, openingPromptBody);
promptConfig.prompt = replaceSection(promptConfig.prompt, languagePromptTitle, languagePromptBody);
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
  workflow_opening_updated: workflowOpeningUpdated,
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, { conversation_config: conversationConfig, workflow });
const readback = await request('GET', baseUrl);
const readbackPrompt = readback.conversation_config?.agent?.prompt?.prompt || '';
const readbackFirstMessage = readback.conversation_config?.agent?.first_message || '';
const readbackOpeningPrompt = readback.workflow?.nodes?.node_rb_opening_v2?.additional_prompt || '';
const placeholders = readback.conversation_config?.agent?.dynamic_variables?.dynamic_variable_placeholders || {};

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_prompt_section: readbackPrompt.includes(openingPromptTitle),
  verified_language_section: readbackPrompt.includes(languagePromptTitle),
  verified_first_message: readbackFirstMessage,
  verified_default_first_message_matches_user_text: readbackFirstMessage === STABLE_FIRST_MESSAGE,
  verified_german_first_message: readback.conversation_config?.language_presets?.de?.overrides?.agent?.first_message || '',
  verified_first_message_is_static: !/{{[^}]+}}/.test(readbackFirstMessage),
  verified_first_message_omits_representative_entity: !/Richmond Blackwood/i.test(readbackFirstMessage),
  verified_workflow_opening_prompt_updated: readbackOpeningPrompt.includes(STABLE_FIRST_MESSAGE) && readbackOpeningPrompt.includes(GERMAN_FIRST_MESSAGE),
  verified_workflow_opening_prompt_uses_api_language_override: /language override of `de`/.test(readbackOpeningPrompt),
  verified_no_conflicting_direct_representation_text: !/not as a separate company/i.test(readbackPrompt),
  verified_placeholder_count: Object.keys(placeholders).length,
  verified_placeholders: Object.keys(placeholderDefaults).filter((name) => Object.prototype.hasOwnProperty.call(placeholders, name)),
}, null, 2));
