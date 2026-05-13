import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';
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
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
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

function replacePronunciationBlock(prompt, body) {
  if (/## Pronunciation And Spelling/.test(prompt)) {
    return prompt.replace(/## Pronunciation And Spelling[\s\S]*?(?=\n## Silence And Hold Behavior|\n# Opening Identity And Representative Authority|\n# Language Control|$)/, body);
  }
  return `${prompt.trim()}\n\n${body}`;
}

function replacePublicDisclosureExample(prompt) {
  return prompt.replace(
    /Use private context only to answer naturally and externally\. For example:\n- Bad: "The direct German VAT field in our records is blank, but a linked German VAT filing registration shows\.\.\."\n- Good: "I have the Irish company number\.[\s\S]*?do you need another identifier\?"/,
    [
      'Use private context only to answer naturally and externally. For example:',
      '- Bad: "The direct German VAT field in our records is blank, but a linked German VAT filing registration shows..."',
      '- Good: "I have the Irish company number available, and I can spell it slowly. I do not have a confirmed active German tax number available. I have a German V-A-T reference that may be historical. I can spell the exact reference slowly if it helps you search, or I can give another identifier."',
      '- When spelling any identifier in that answer, follow the Pronunciation And Spelling section for the current call language.',
    ].join('\n'),
  );
}

const pronunciationTitle = '## Pronunciation And Spelling';
const pronunciationBody = `${pronunciationTitle}

Use the current call language for every spoken digit, letter, abbreviation, and identifier. The written identifier value must stay exact internally, but the spoken words must match the call language.

For German calls, where \`{{language_code}}\` is \`de\` or \`{{language}}\` contains German/Deutsch:
- Say digits in German only: null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun.
- Do not say English digit words such as zero, one, two, three, four, five, six, seven, eight, or nine.
- Spell letters as German letter names, one letter at a time, with pauses. Do not use English/NATO words such as Delta, Echo, Oscar, or Hotel unless the authority explicitly asks for a spelling alphabet.
- For abbreviations, say each letter separately in German letter names: V ... A ... T, P ... O ... A, U ... T ... R, T ... A ... I ... N.
- Before an important identifier, say: "Ich sage das langsam." Then use short chunks and clear pauses.
- German examples:
  - \`DE345068258\`: say "D ... E ... Pause ... drei ... vier ... fünf ... Pause ... null ... sechs ... acht ... Pause ... zwei ... fünf ... acht."
  - \`3989866OH\`: say "drei ... neun ... acht ... Pause ... neun ... acht ... sechs ... sechs ... Pause ... O ... H."
  - \`IE6388047V\`: say "I ... E ... Pause ... sechs ... drei ... acht ... acht ... null ... vier ... sieben ... Pause ... V."

For English calls, where \`{{language_code}}\` is \`en\` or \`{{language}}\` contains English:
- Say digits in English: zero, one, two, three, four, five, six, seven, eight, nine.
- Spell letters as English letter names, one letter at a time, with pauses. Do not use NATO words unless the authority explicitly asks for a spelling alphabet.
- Before an important identifier, say: "I'll say that slowly." Then use short chunks and clear pauses.
- English examples:
  - \`DE345068258\`: say "D ... E ... pause ... three ... four ... five ... pause ... zero ... six ... eight ... pause ... two ... five ... eight."
  - \`3989866OH\`: say "three ... nine ... eight ... pause ... nine ... eight ... six ... six ... pause ... O ... H."
  - \`IE6388047V\`: say "I ... E ... pause ... six ... three ... eight ... eight ... zero ... four ... seven ... pause ... V."

For names and company names, first pronounce the name naturally, then spell it letter by letter in the current call language. Repeat even slower if the person asks or sounds uncertain.`;

const identifierTitle = '# Identifier Pronunciation - Prompt Controlled';
const identifierBody = `${identifierTitle}
- n8n sends raw identifiers only. Preserve the exact raw value internally; do not invent, normalize, shorten, or rewrite it.
- When speaking any number, registration number, tax number, V-A-T number, P-P-S-N, U-T-R, E-O-R-I, T-A-I-N, I-D, case number, reference number, phone number, or alphanumeric string, slow down dramatically. Much, much slower than normal speech.
- Speak digit words and letter names in the current call language. German calls must use German digit words and German letter names; English calls must use English digit words and English letter names.
- Do not let English examples or an English system-prompt section leak into a German call. On German calls, never say "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "Delta", "Echo", "Oscar", or "Hotel" unless the authority explicitly asks for English or NATO spelling.
- Add clear pauses and breaks between every chunk. Think: one short chunk, pause, next short chunk, pause, next short chunk. Do not rush through identifiers.
- For long numeric strings, speak groups of two or three digits at most, with a clear pause after each group. If the person may need to write it down, use single digits with pauses.
- For alphanumeric strings, speak every letter one by one. Use letter names, not words. Separate letters from numbers with a clear pause.
- If an identifier contains both letters and numbers, speak it like this: letters individually, pause, digits in tiny chunks, pause, final letters individually.
- Before an important identifier, use the language-appropriate phrase: English "I'll say that slowly"; German "Ich sage das langsam." After saying it, offer to repeat it.
- If the authority asks to repeat an identifier, repeat it even slower, using shorter chunks and longer pauses.
- Never say the phrase "without spaces" or "as one string" on the phone unless the authority asks how it is written. For writing, clarify that the written value is the exact raw value from context.
- Use the examples in the Pronunciation And Spelling section for the current call language.`;

const slowDeliveryTitle = '# Slow Number Delivery - Hard Rule';
const slowDeliveryBody = `${slowDeliveryTitle}
- Every time you read a number or identifier aloud, deliberately slow your speaking pace for that phrase.
- Insert audible pauses using natural silence between chunks. The caller should have enough time to write each chunk down.
- This applies even when you are otherwise speaking quickly or the call is busy. Identifiers are always slow.
- Do not compress registration numbers, tax references, phone numbers, or alphanumeric strings into one fast phrase.`;

const agent = await request('GET', baseUrl);
const conversationConfig = agent.conversation_config;
const promptConfig = conversationConfig?.agent?.prompt;
if (!promptConfig?.prompt) throw new Error('Agent prompt not found at conversation_config.agent.prompt.prompt');

const beforePrompt = promptConfig.prompt;
promptConfig.prompt = replacePublicDisclosureExample(promptConfig.prompt);
promptConfig.prompt = replacePronunciationBlock(promptConfig.prompt, pronunciationBody);
promptConfig.prompt = replaceSection(promptConfig.prompt, identifierTitle, identifierBody);
promptConfig.prompt = replaceSection(promptConfig.prompt, slowDeliveryTitle, slowDeliveryBody);
promptConfig.prompt = promptConfig.prompt.replace(
  /speak digit groups slowly/gi,
  'speak digits much, much slower than normal, in tiny chunks with clear pauses'
);
promptConfig.prompt = promptConfig.prompt.replace(
  /spell letters one by one/gi,
  'spell letters one by one with clear pauses between letters'
);
delete promptConfig.tools;

const summary = {
  agent_id: agentId,
  dry_run: dryRun,
  prompt_changed: promptConfig.prompt !== beforePrompt,
};

if (dryRun) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const patched = await request('PATCH', baseUrl, { conversation_config: conversationConfig });
const readback = await request('GET', baseUrl);
const readbackPrompt = readback.conversation_config?.agent?.prompt?.prompt || '';

console.log(JSON.stringify({
  ...summary,
  version_id: readback.version_id || patched.version_id || '',
  verified_pronunciation_section: readbackPrompt.includes(pronunciationTitle),
  verified_identifier_section: readbackPrompt.includes(identifierTitle),
  verified_slow_delivery_section: readbackPrompt.includes(slowDeliveryTitle),
  verified_much_much_slower: /much, much slower/i.test(readbackPrompt),
  verified_german_digit_words: ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'].filter((value) => readbackPrompt.includes(value)),
  verified_no_nato_default_instruction: !/using the NATO phonetic alphabet/i.test(readbackPrompt),
  verified_no_delta_echo_example: !/Delta\s*\.\.\.\s*Echo/i.test(readbackPrompt),
  verified_examples: ['DE345068258', '3989866OH', 'IE6388047V'].filter((value) => readbackPrompt.includes(value)),
  verified_no_fast_digit_group_rule: !/speak digit groups slowly/i.test(readbackPrompt),
}, null, 2));
