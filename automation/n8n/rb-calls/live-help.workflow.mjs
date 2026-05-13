import {
  expr,
  ifElse,
  newCredential,
  node,
  sticky,
  trigger,
  workflow,
} from '@n8n/workflow-sdk';

const CALL_NOTES_DATABASE_ID = '342e4130-1314-8016-8ced-d60cbf9fe9bf';
const RB_CALLS_CHANNEL_ID = 'C0ASXSTFSVA';
const ELEVENLABS_WEBHOOK_IPS = '34.67.146.145,34.59.11.47,35.204.38.71,34.147.113.54,35.185.187.110,35.247.157.189,34.77.234.246,34.140.184.144,34.93.26.174,34.93.252.69';

const liveHelpWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'ElevenLabs Live Help Webhook',
    position: [-1400, 0],
    parameters: {
      httpMethod: 'POST',
      path: 'rb-calls-live-help',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {
        ipWhitelist: ELEVENLABS_WEBHOOK_IPS,
      },
    },
  },
  output: [
    {
      headers: {},
      body: {
        action: 'start',
        call_id: 'call_page_id',
        call_public_id: 'RBCALL-1',
        call_url: 'https://www.notion.so/example-call',
        conversation_id: 'conversation_id',
        owner_slack_member_id: 'U123',
        owner_mention: '<@U123>',
        message_topic: 'Call execution',
        question: 'What is the filing reference?',
        transcript_excerpt: '{"entries":[{"role":"user","message":"Authority asks for a reference."}]}',
        context_pack: '{}',
      },
    },
  ],
});

const normalizeHelpRequest = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Help Request',
    position: [-1120, 0],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const body = $json.body || {};
const now = new Date();
const nowIso = now.toISOString();
const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const TAB = String.fromCharCode(9);
function parse(value) {
  if (!value) return {};
  if (typeof value === 'object') return value;
  try { return JSON.parse(String(value)); } catch (error) { return {}; }
}
function clean(value) {
  return String(value || '').replaceAll(CR, ' ').replaceAll(LF, ' ').replaceAll(TAB, ' ').split(' ').filter(Boolean).join(' ').trim();
}
function normalizeSlackUserId(value) {
  let text = String(value || '').trim();
  if (text.startsWith('<@')) text = text.slice(2);
  if (text.endsWith('>')) text = text.slice(0, -1);
  const pipeAt = text.indexOf('|');
  if (pipeAt >= 0) text = text.slice(0, pipeAt);
  return text.replaceAll('<', '').replaceAll('@', '').replaceAll('>', '').trim();
}
function isUsableThreadTs(value) {
  const text = String(value || '').trim();
  return /^[0-9]{10}[.][0-9]{6}$/.test(text);
}
function transcript(value) {
  if (!value) return '';
  const parsed = parse(value);
  const entries = Array.isArray(parsed.entries) ? parsed.entries : [];
  if (entries.length) {
    return entries.slice(-12).map((entry) => {
      const role = String(entry.role || '').toLowerCase() === 'agent' ? 'Agent' : 'Authority/contact';
      return '- ' + role + ': ' + (clean(entry.message || entry.text).slice(0, 520) || '(no transcript text)');
    }).join(LF).slice(0, 1900);
  }
  return String(value).replaceAll(CR, '').split(LF).map(clean).filter(Boolean).slice(-18).join(LF).slice(0, 1900);
}
const dynamic = body.dynamic_variables || body.conversation_initiation_client_data?.dynamic_variables || {};
const rawContextPack = body.context_pack ?? body.context ?? body.context_pack_json ?? dynamic.context_pack ?? {};
const parsedContextPack = parse(rawContextPack);
const contextPackText = typeof rawContextPack === 'string' ? rawContextPack : JSON.stringify(rawContextPack || {});
const actionRaw = String(body.action || body.mode || '').trim().toLowerCase();
const isCheck = actionRaw === 'check' || Boolean(body.help_request_id && !body.question);
const startedAt = String(body.started_at || nowIso).trim();
const startedAtMs = Date.parse(startedAt);
const safeStartedAtMs = Number.isFinite(startedAtMs) ? startedAtMs : now.getTime();
const expiresDefault = new Date(safeStartedAtMs + 300000).toISOString();
const expiresRawInput = String(body.expires_at || '').trim();
const expiresRawMs = Date.parse(expiresRawInput);
const isPlaceholderExpiresAt = !Number.isFinite(expiresRawMs) || expiresRawMs < Date.parse('2021-01-01T00:00:00.000Z');
const expiresAt = isPlaceholderExpiresAt ? expiresDefault : expiresRawInput;
const helpRequestId = String(body.help_request_id || ['help', body.call_public_id || body.call_id || 'call', Date.now()].join('-')).trim();
const question = String(body.question || body.help_question || '').trim();
const rawTranscript = String(body.transcript_excerpt || body.transcript || '').trim();
const formattedTranscript = transcript(rawTranscript);
const callId = String(body.call_id || body.call_page_id || dynamic.call_id || '').trim();
const callUrl = String(body.call_url || dynamic.call_url || parsedContextPack.call?.url || '').trim();
const callPublicId = String(body.call_public_id || dynamic.call_public_id || callId || 'unknown-call').trim();
const conversationId = String(body.conversation_id || body.system__conversation_id || dynamic.system__conversation_id || '').trim();
const slackThreadTs = String(body.slack_thread_ts || '').trim();
const notePageId = String(body.note_page_id || '').trim();
const ownerSlackId = normalizeSlackUserId(body.owner_slack_member_id || dynamic.owner_slack_member_id || parsedContextPack.owner?.slack_member_id || '');
const ownerName = String(body.owner_name || dynamic.owner_name || parsedContextPack.owner?.name || '').trim();
const ownerMentionRaw = String(body.owner_mention || dynamic.owner_mention || parsedContextPack.owner?.mention || '').trim();
const ownerMention = ownerSlackId ? '<@' + ownerSlackId + '>' : (ownerMentionRaw || ownerName || 'owner not resolved');
const messageTopic = String(body.message_topic || dynamic.message_topic || parsedContextPack.message_topic || parsedContextPack.call?.properties?.['Short reason'] || parsedContextPack.call?.properties?.['Reason for call'] || parsedContextPack.call?.properties?.['Main question'] || question || 'Live help request').trim().slice(0, 240);
const errors = [];
if (isCheck) {
  if (!helpRequestId) errors.push('help_request_id is required for check requests.');
  if (!notePageId) errors.push('note_page_id is required for check requests.');
  if (!callId) errors.push('call_id is required for check requests.');
} else {
  if (!callId) errors.push('call_id is required for start requests.');
  if (!question) errors.push('question is required for start requests.');
}
const slackText = [
  '[' + callPublicId + '] [live-help] Owner: ' + ownerMention,
  'Topic: ' + messageTopic,
  'Call: ' + (callUrl || callPublicId),
  conversationId ? 'ElevenLabs conversation: ' + conversationId : '',
  'Help request ID: ' + helpRequestId,
  '',
  '*Question from the agent*',
  question || '(No question provided)',
  formattedTranscript ? ['', '*Current transcript excerpt (latest turns)*', formattedTranscript].join(LF) : '',
  '',
  '*How to answer*',
  '- Preferred: reply in this thread with answer: <what the agent should say>.',
  '- Plain replies are accepted from the owner, approved helpers, or any human if the owner could not be resolved.',
  '- Keep discussion out of the answer text; the bot may pass it directly to the caller.',
  '',
  'The caller can be held for up to 5 minutes. Bot checks reuse this same thread every 30 seconds and will not post duplicate Slack messages.',
].filter(Boolean).join(LF);
return {
  action: isCheck ? 'check' : 'start',
  is_check: isCheck,
  valid_request: errors.length === 0,
  validation_error: errors.join(' '),
  received_at: nowIso,
  started_at: startedAt,
  expires_at: expiresAt,
  ignored_placeholder_expires_at: isPlaceholderExpiresAt && Boolean(expiresRawInput),
  help_request_id: helpRequestId,
  call_page_id: callId,
  call_url: callUrl,
  call_public_id: callPublicId,
  conversation_id: conversationId,
  owner_mention: ownerMention,
  owner_name: ownerName,
  owner_slack_member_id: ownerSlackId,
  message_topic: messageTopic,
  question,
  transcript_excerpt: formattedTranscript || rawTranscript.slice(0, 1800),
  transcript_raw: rawTranscript.slice(0, 2500),
  context_pack: contextPackText.slice(0, 3500),
  slack_thread_ts: slackThreadTs,
  has_valid_slack_thread_ts: isUsableThreadTs(slackThreadTs),
  note_page_id: notePageId,
  max_wait_seconds: 300,
  check_after_seconds: 30,
  slack_text: slackText,
};`,
    },
  },
  output: [
    {
      action: 'start',
      is_check: false,
      valid_request: true,
      help_request_id: 'help-RBCALL-1',
      call_page_id: 'call_page_id',
      call_url: 'https://www.notion.so/example-call',
      call_public_id: 'RBCALL-1',
      conversation_id: 'conversation_id',
      owner_mention: '<@U123>',
      owner_slack_member_id: 'U123',
      message_topic: 'Call execution',
      question: 'What is the filing reference?',
      transcript_excerpt: '- Authority/contact: Authority asks for a reference.',
      slack_thread_ts: '',
      has_valid_slack_thread_ts: false,
      note_page_id: '',
      slack_text: '[RBCALL-1] [live-help] Owner: <@U123>',
    },
  ],
});

const isValidRequest = ifElse({
  version: 2.3,
  config: {
    name: 'Is Valid Request?',
    position: [-840, 0],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'valid-request',
            leftValue: expr('{{ $json.valid_request }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const isCheckRequest = ifElse({
  version: 2.3,
  config: {
    name: 'Is Check Request?',
    position: [-560, 0],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'is-check',
            leftValue: expr('{{ $json.is_check }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const hasSuppliedThreadTs = ifElse({
  version: 2.3,
  config: {
    name: 'Has Supplied Thread TS?',
    position: [-280, -420],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'has-supplied-thread-ts',
            leftValue: expr('{{ $json.has_valid_slack_thread_ts }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const getRecentHelpThreads = node({
  type: 'n8n-nodes-base.slack',
  version: 2.4,
  config: {
    name: 'Get Recent Help Threads',
    position: [-280, -640],
    credentials: { slackApi: newCredential('Slack') },
    parameters: {
      resource: 'channel',
      operation: 'history',
      channelId: { __rl: true, value: RB_CALLS_CHANNEL_ID, mode: 'id', cachedResultName: 'rb-calls' },
      returnAll: false,
      limit: 100,
      filters: {},
    },
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
  output: [
    {
      ts: '1770000000.000000',
      text: '[RBCALL-1] [live-help] Owner: <@U123>\nElevenLabs conversation: conversation_id\nHelp request ID: help-RBCALL-1',
      bot_id: 'B123',
      user: 'U0ALM4U5WN9',
    },
  ],
  alwaysOutputData: true,
  onError: 'continueRegularOutput',
});

const resolveHelpThread = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Resolve Help Thread',
    position: [0, -420],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const request = $('Normalize Help Request').item.json;
function isUsableThreadTs(value) { return /^[0-9]{10}[.][0-9]{6}$/.test(String(value || '').trim()); }
function score(message) {
  const text = String(message.text || '');
  if (!text.includes('[live-help]')) return 0;
  let value = 1;
  if (request.help_request_id && text.includes(request.help_request_id)) value += 100;
  if (request.conversation_id && text.includes(request.conversation_id)) value += 50;
  if (request.call_public_id && text.includes(request.call_public_id)) value += 25;
  if (request.call_page_id && text.includes(request.call_page_id)) value += 10;
  return value;
}
const supplied = isUsableThreadTs(request.slack_thread_ts) ? request.slack_thread_ts : '';
const messages = $input.all().map((item) => item.json || {});
const ranked = messages
  .map((message) => ({ message, score: score(message) }))
  .filter((entry) => entry.score > 1 && isUsableThreadTs(entry.message.ts))
  .sort((a, b) => b.score - a.score || String(b.message.ts).localeCompare(String(a.message.ts)));
const recovered = ranked[0]?.message?.ts || '';
const slackThreadTs = supplied || recovered;
return [{
  json: {
    ...request,
    slack_thread_ts: slackThreadTs,
    has_help_thread: Boolean(slackThreadTs),
    recovered_thread_ts: Boolean(!supplied && recovered),
    thread_recovery_source: supplied ? 'supplied' : (recovered ? 'channel_history' : 'not_found'),
  },
}];`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      conversation_id: 'conversation_id',
      help_request_id: 'help-RBCALL-1',
      slack_thread_ts: '1770000000.000000',
      has_help_thread: true,
      recovered_thread_ts: true,
      thread_recovery_source: 'channel_history',
    },
  ],
});

const hasHelpThread = ifElse({
  version: 2.3,
  config: {
    name: 'Has Help Thread?',
    position: [280, -420],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'has-help-thread',
            leftValue: expr('{{ $json.has_help_thread }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const getThreadReplies = node({
  type: 'n8n-nodes-base.slack',
  version: 2.4,
  config: {
    name: 'Get Help Thread Replies',
    position: [560, -520],
    credentials: { slackApi: newCredential('Slack') },
    parameters: {
      resource: 'channel',
      operation: 'replies',
      channelId: { __rl: true, value: RB_CALLS_CHANNEL_ID, mode: 'id', cachedResultName: 'rb-calls' },
      ts: expr('{{ $("Resolve Help Thread").item.json.slack_thread_ts }}'),
      returnAll: true,
      filters: {},
    },
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
  output: [
    { ts: '1770000000.000000', text: '[RBCALL-1] [live-help] Owner: owner not resolved', bot_id: 'B123', user: 'U0ALM4U5WN9' },
    { ts: '1770000030.000000', text: '12th of February', user: 'U123' },
  ],
  alwaysOutputData: true,
  onError: 'continueRegularOutput',
});

const extractCheckStatus = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract Check Status',
    position: [840, -520],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const request = $('Resolve Help Thread').item.json;
const parentTs = String(request.slack_thread_ts || '');
const replies = $input.all().map((item) => item.json || {});
const readErrors = replies.map((reply) => String(reply.error || reply.message || '')).filter((message) => message.includes('Slack credential') || message.includes('Oauth Scopes') || message.includes('missing required'));
const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const TAB = String.fromCharCode(9);
function normalizeSlackUserId(value) {
  let text = String(value || '').trim();
  if (text.startsWith('<@')) text = text.slice(2);
  if (text.endsWith('>')) text = text.slice(0, -1);
  const pipeAt = text.indexOf('|');
  if (pipeAt >= 0) text = text.slice(0, pipeAt);
  return text.replaceAll('<', '').replaceAll('@', '').replaceAll('>', '').trim();
}
function ownerIdFromText(text) {
  const source = String(text || '');
  const labelAt = source.indexOf('Owner:');
  if (labelAt < 0) return '';
  const mentionAt = source.indexOf('<@', labelAt);
  if (mentionAt < 0) return '';
  const end = source.indexOf('>', mentionAt);
  if (end < 0) return '';
  return normalizeSlackUserId(source.slice(mentionAt, end + 1));
}
function stripMentions(text) {
  let out = String(text || '');
  while (out.includes('<@')) {
    const start = out.indexOf('<@');
    const end = out.indexOf('>', start);
    if (end < 0) break;
    out = out.slice(0, start) + out.slice(end + 1);
  }
  return out.replaceAll(CR, ' ').replaceAll(LF, ' ').replaceAll(TAB, ' ').split(' ').filter(Boolean).join(' ').trim();
}
function tsToMs(ts) {
  const parts = String(ts || '0').split('.');
  const seconds = Number(parts[0]);
  const millis = Number((parts[1] || '0').slice(0, 3).padEnd(3, '0'));
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 + (Number.isFinite(millis) ? millis : 0) : 0;
}
const parent = replies.find((reply) => String(reply.ts || '') === parentTs) || {};
const ownerFromParent = ownerIdFromText(parent.text || '');
const ownerSlackId = normalizeSlackUserId(request.owner_slack_member_id || ownerFromParent || '');
const approvedRaw = typeof $vars !== 'undefined' && $vars.RB_CALLS_LIVE_HELP_APPROVED_SLACK_USERS ? String($vars.RB_CALLS_LIVE_HELP_APPROVED_SLACK_USERS) : '';
const approved = new Set(approvedRaw.split(',').map(normalizeSlackUserId).filter(Boolean));
function isHuman(reply) {
  const user = normalizeSlackUserId(reply.user || '');
  if (!user || reply.bot_id || String(reply.ts || '') === parentTs) return false;
  if (reply.subtype && reply.subtype !== 'thread_broadcast') return false;
  return true;
}
function isPlainAllowed(reply) {
  if (!ownerSlackId) return true;
  if (reply.user === ownerSlackId) return true;
  if (approved.size === 0) return true;
  return approved.has(reply.user);
}
const human = replies
  .map((reply) => ({ ...reply, user: normalizeSlackUserId(reply.user || ''), text: stripMentions(reply.text || ''), ts: String(reply.ts || '') }))
  .filter(isHuman)
  .filter((reply) => reply.text)
  .sort((a, b) => tsToMs(b.ts) - tsToMs(a.ts));
const explicit = human.find((reply) => reply.text.toLowerCase().startsWith('answer:'));
const plain = human.find((reply) => !reply.text.toLowerCase().startsWith('answer:') && isPlainAllowed(reply));
const selected = explicit || plain || null;
const usedPlainReply = Boolean(selected && !selected.text.toLowerCase().startsWith('answer:'));
const answerText = selected ? (usedPlainReply ? selected.text.trim() : selected.text.replace(/^answer:/i, '').trim()) : '';
const nowMs = Date.now();
const expiresAtMs = Date.parse(request.expires_at);
const safeExpiresAtMs = Number.isFinite(expiresAtMs) ? expiresAtMs : nowMs;
const secondsRemaining = Math.max(0, Math.ceil((safeExpiresAtMs - nowMs) / 1000));
const answerWasLate = Boolean(selected && tsToMs(selected.ts) > safeExpiresAtMs + 30000);
const hasUsableAnswer = Boolean(answerText && !answerWasLate);
const hasReadError = readErrors.length > 0;
const status = hasUsableAnswer ? 'answered' : (secondsRemaining <= 0 ? (hasReadError ? 'read_error' : 'timed_out') : 'pending');
const fallback = 'I am not able to confirm that reference right now. Please tell me what exact reference, document, or submission route you need, and our team will follow up if needed.';
return [{
  json: {
    ...request,
    owner_slack_member_id: ownerSlackId,
    answer: hasUsableAnswer ? answerText : (status === 'timed_out' || status === 'read_error' ? fallback : ''),
    answer_user: hasUsableAnswer ? selected.user : '',
    answer_ts: hasUsableAnswer ? selected.ts : '',
    answer_source: hasUsableAnswer ? (usedPlainReply ? 'plain_human_reply' : 'answer_prefix_reply') : '',
    accepted_without_answer_prefix: Boolean(hasUsableAnswer && usedPlainReply),
    status,
    done: status !== 'pending',
    should_record_terminal_status: status !== 'pending',
    live_help_status: status === 'answered' ? 'Answered' : (status === 'timed_out' || status === 'read_error' ? 'Timed out' : 'Requested'),
    outcome_status: status === 'answered' ? 'Resolved' : 'Unanswered',
    note_title: 'Live help - ' + request.call_public_id,
    summary: status === 'answered' ? 'Live help answer returned to the agent.' : (status === 'read_error' ? 'Live help could not read Slack thread replies before the five-minute timeout: ' + readErrors.join('; ') : (status === 'timed_out' ? 'Live help timed out after five minutes before a team answer was posted.' : (hasReadError ? 'Live help still waiting for a team answer; the latest Slack read attempt had an error and will be retried.' : 'Live help still waiting for a team answer.'))),
    seconds_remaining: secondsRemaining,
    check_again_in_seconds: status === 'pending' ? 30 : 0,
    late_answer_ignored: answerWasLate,
    replies_seen: human.length,
    newest_reply_ts_seen: human[0]?.ts || '',
    thread_recovery_source: request.thread_recovery_source,
    slack_read_error: readErrors.join('; '),
  },
}];`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      status: 'answered',
      answer: '12th of February',
      answer_source: 'plain_human_reply',
      accepted_without_answer_prefix: true,
      should_record_terminal_status: true,
      live_help_status: 'Answered',
      outcome_status: 'Resolved',
      seconds_remaining: 260,
      check_again_in_seconds: 0,
      replies_seen: 1,
    },
  ],
});

const extractMissingThreadStatus = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract Missing Thread Status',
    position: [560, -260],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const request = $json;
const nowMs = Date.now();
const expiresAtMs = Date.parse(request.expires_at);
const safeExpiresAtMs = Number.isFinite(expiresAtMs) ? expiresAtMs : nowMs;
const secondsRemaining = Math.max(0, Math.ceil((safeExpiresAtMs - nowMs) / 1000));
const status = secondsRemaining <= 0 ? 'timed_out' : 'pending';
const fallback = 'No live team answer could be read because the Slack help thread was not resolved. Continue conservatively and collect the authority request for manual follow-up.';
return {
  ...request,
  answer: status === 'timed_out' ? fallback : '',
  status,
  done: status !== 'pending',
  should_record_terminal_status: status !== 'pending',
  live_help_status: status === 'timed_out' ? 'Timed out' : 'Requested',
  outcome_status: 'Unanswered',
  note_title: 'Live help - ' + request.call_public_id,
  summary: status === 'timed_out' ? 'Live help timed out because the Slack thread could not be resolved.' : 'Live help Slack thread not resolved yet.',
  seconds_remaining: secondsRemaining,
  check_again_in_seconds: status === 'pending' ? 30 : 0,
  thread_recovery_source: 'not_found',
};`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      status: 'pending',
      should_record_terminal_status: false,
      seconds_remaining: 260,
      check_again_in_seconds: 30,
    },
  ],
});

const isTerminalStatus = ifElse({
  version: 2.3,
  config: {
    name: 'Is Terminal Status?',
    position: [1120, -420],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'terminal',
            leftValue: expr('{{ $json.should_record_terminal_status }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const isMissingThreadTerminalStatus = ifElse({
  version: 2.3,
  config: {
    name: 'Is Missing Thread Terminal Status?',
    position: [840, -260],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'missing-thread-terminal',
            leftValue: expr('{{ $json.should_record_terminal_status }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const updateHelpNoteTerminal = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Help Note Terminal',
    position: [1400, -560],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $json.note_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary }}') },
          { key: 'Help Answer|rich_text', textContent: expr('{{ $json.answer }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Updated live help note' }],
});

const updateCallHelpTerminal = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Call Help Terminal',
    position: [1680, -560],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Is Terminal Status?").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Live Help Status|select', selectValue: expr('{{ $("Is Terminal Status?").item.json.live_help_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated call help status' }],
});

const updateMissingThreadHelpNoteTerminal = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Missing Thread Help Note Terminal',
    position: [1120, -80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $json.note_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary }}') },
          { key: 'Help Answer|rich_text', textContent: expr('{{ $json.answer }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Updated missing-thread live help note' }],
});

const updateMissingThreadCallHelpTerminal = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Missing Thread Call Help Terminal',
    position: [1400, -80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Is Missing Thread Terminal Status?").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Live Help Status|select', selectValue: expr('{{ $("Is Missing Thread Terminal Status?").item.json.live_help_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated missing-thread call help status' }],
});

const respondCheckFinal = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Check Final',
    position: [1960, -560],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: $("Is Terminal Status?").item.json.status, done: true, answer: $("Is Terminal Status?").item.json.answer, help_request_id: $("Is Terminal Status?").item.json.help_request_id, seconds_remaining: $("Is Terminal Status?").item.json.seconds_remaining, check_again_in_seconds: 0, late_answer_ignored: $("Is Terminal Status?").item.json.late_answer_ignored, accepted_without_answer_prefix: $("Is Terminal Status?").item.json.accepted_without_answer_prefix, answer_source: $("Is Terminal Status?").item.json.answer_source, thread_recovery_source: $("Is Terminal Status?").item.json.thread_recovery_source, speech_instruction: "Use this answer now. Do not say the word None. Do not mention Slack, tools, workflow state, or internal notes. Do not keep the caller on hold after an answer is available." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'answered', done: true, answer: '12th of February' }],
});

const respondMissingThreadFinal = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Missing Thread Final',
    position: [1680, -80],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: $("Is Missing Thread Terminal Status?").item.json.status, done: true, answer: $("Is Missing Thread Terminal Status?").item.json.answer, help_request_id: $("Is Missing Thread Terminal Status?").item.json.help_request_id, seconds_remaining: $("Is Missing Thread Terminal Status?").item.json.seconds_remaining, check_again_in_seconds: 0, late_answer_ignored: $("Is Missing Thread Terminal Status?").item.json.late_answer_ignored, accepted_without_answer_prefix: $("Is Missing Thread Terminal Status?").item.json.accepted_without_answer_prefix, answer_source: $("Is Missing Thread Terminal Status?").item.json.answer_source, thread_recovery_source: $("Is Missing Thread Terminal Status?").item.json.thread_recovery_source, speech_instruction: "Use this answer now if one exists. Do not say the word None. Do not mention Slack, tools, workflow state, or internal notes. If no answer was recoverable, collect the exact follow-up requirement and close conservatively." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'timed_out', done: true }],
});

const waitBeforePendingResponse = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: {
    name: 'Wait Before Pending Response',
    position: [1400, -300],
    parameters: {
      resume: 'timeInterval',
      amount: 30,
      unit: 'seconds',
    },
  },
  output: [{ status: 'pending' }],
});

const waitBeforeRecheck = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: {
    name: 'Wait Before Re-reading Help Thread',
    position: [1400, -300],
    parameters: {
      resume: 'timeInterval',
      amount: 30,
      unit: 'seconds',
    },
  },
  output: [{ status: 'pending' }],
});

const getThreadRepliesAfterWait = node({
  type: 'n8n-nodes-base.slack',
  version: 2.4,
  config: {
    name: 'Get Help Thread Replies After Wait',
    position: [1680, -300],
    credentials: { slackApi: newCredential('Slack') },
    parameters: {
      resource: 'channel',
      operation: 'replies',
      channelId: { __rl: true, value: RB_CALLS_CHANNEL_ID, mode: 'id', cachedResultName: 'rb-calls' },
      ts: expr('{{ $("Resolve Help Thread").item.json.slack_thread_ts }}'),
      returnAll: true,
      filters: {},
    },
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
  output: [
    { ts: '1770000000.000000', text: '[RBCALL-1] [live-help] Owner: owner not resolved', bot_id: 'B123', user: 'U0ALM4U5WN9' },
    { ts: '1770000030.000000', text: '12th of February', user: 'U123' },
  ],
  alwaysOutputData: true,
  onError: 'continueRegularOutput',
});

const extractCheckStatusAfterWait = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract Check Status After Wait',
    position: [1960, -300],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: extractCheckStatus.config && extractCheckStatus.config.parameters ? extractCheckStatus.config.parameters.jsCode : extractCheckStatus.parameters.jsCode,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      status: 'answered',
      answer: '12th of February',
      answer_source: 'plain_human_reply',
      accepted_without_answer_prefix: true,
      should_record_terminal_status: true,
      live_help_status: 'Answered',
      outcome_status: 'Resolved',
      seconds_remaining: 230,
      check_again_in_seconds: 0,
      replies_seen: 1,
    },
  ],
});

const isTerminalStatusAfterWait = ifElse({
  version: 2.3,
  config: {
    name: 'Is Terminal Status After Wait?',
    position: [2240, -300],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'terminal-after-wait',
            leftValue: expr('{{ $json.should_record_terminal_status }}'),
            rightValue: '',
            operator: { type: 'boolean', operation: 'true', singleValue: true },
          },
        ],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const updateHelpNoteTerminalAfterWait = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Help Note Terminal After Wait',
    position: [2520, -420],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $json.note_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary }}') },
          { key: 'Help Answer|rich_text', textContent: expr('{{ $json.answer }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Updated live help note after wait' }],
});

const updateCallHelpTerminalAfterWait = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Call Help Terminal After Wait',
    position: [2800, -420],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Is Terminal Status After Wait?").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Live Help Status|select', selectValue: expr('{{ $("Is Terminal Status After Wait?").item.json.live_help_status }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated call help status after wait' }],
});

const respondCheckFinalAfterWait = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Check Final After Wait',
    position: [3080, -420],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: $("Is Terminal Status After Wait?").item.json.status, done: true, answer: $("Is Terminal Status After Wait?").item.json.answer, help_request_id: $("Is Terminal Status After Wait?").item.json.help_request_id, seconds_remaining: $("Is Terminal Status After Wait?").item.json.seconds_remaining, check_again_in_seconds: 0, late_answer_ignored: $("Is Terminal Status After Wait?").item.json.late_answer_ignored, accepted_without_answer_prefix: $("Is Terminal Status After Wait?").item.json.accepted_without_answer_prefix, answer_source: $("Is Terminal Status After Wait?").item.json.answer_source, thread_recovery_source: $("Is Terminal Status After Wait?").item.json.thread_recovery_source, speech_instruction: "Use this answer now. Do not say the word None. Do not mention Slack, tools, workflow state, or internal notes. Do not keep the caller on hold after an answer is available." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'answered', done: true, answer: '12th of February' }],
});

const respondCheckPendingAfterWait = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Check Pending After Wait',
    position: [2520, -180],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "pending", done: false, answer: "", help_request_id: $("Is Terminal Status After Wait?").item.json.help_request_id, seconds_remaining: $("Is Terminal Status After Wait?").item.json.seconds_remaining, check_again_in_seconds: $("Is Terminal Status After Wait?").item.json.check_again_in_seconds, max_wait_seconds: 300, thread_recovery_source: $("Is Terminal Status After Wait?").item.json.thread_recovery_source, replies_seen: $("Is Terminal Status After Wait?").item.json.replies_seen, newest_reply_ts_seen: $("Is Terminal Status After Wait?").item.json.newest_reply_ts_seen, instruction: "n8n waited 30 seconds and re-read the same Slack thread before returning pending. Do not say None. Do not announce every poll. Keep the caller on the line unless they speak or ask for status. Call check_creator_help again with the same IDs after the returned delay. Do not post a new Slack request.", speech_instruction: "Keep the caller on the line. Do not speak unless the caller asks. Do not say still checking, still here, I am checking, or None. Do not narrate this check." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'pending', done: false, check_again_in_seconds: 30 }],
});

const respondCheckPending = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Missing Thread Pending',
    position: [1680, -300],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "pending", done: false, answer: "", help_request_id: $("Is Missing Thread Terminal Status?").item.json.help_request_id, seconds_remaining: $("Is Missing Thread Terminal Status?").item.json.seconds_remaining, check_again_in_seconds: $("Is Missing Thread Terminal Status?").item.json.check_again_in_seconds, max_wait_seconds: 300, thread_recovery_source: $("Is Missing Thread Terminal Status?").item.json.thread_recovery_source, instruction: "This response was deliberately delayed by n8n for 30 seconds before being returned because the Slack thread could not be resolved. Do not say None. Do not announce every poll. Keep the caller on the line unless they speak or ask for status. Call check_creator_help again with the same IDs after the returned delay. Do not post a new Slack request.", speech_instruction: "Keep the caller on the line. Do not speak unless the caller asks. Do not say still checking, still here, I am checking, or None. Do not narrate this check." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'pending', done: false, check_again_in_seconds: 30 }],
});

const postHelpRequest = node({
  type: 'n8n-nodes-base.slack',
  version: 2.4,
  config: {
    name: 'Post Help Request',
    position: [-280, 340],
    credentials: { slackApi: newCredential('Slack') },
    parameters: {
      resource: 'message',
      operation: 'post',
      select: 'channel',
      channelId: { __rl: true, value: RB_CALLS_CHANNEL_ID, mode: 'id', cachedResultName: 'rb-calls' },
      messageType: 'text',
      text: expr('{{ $json.slack_text }}'),
      otherOptions: { includeLinkToWorkflow: false },
    },
  },
  output: [
    {
      ok: true,
      channel: RB_CALLS_CHANNEL_ID,
      message: { ts: '1770000000.000000', text: '[RBCALL-1] [live-help] Owner: <@U123>' },
      message_timestamp: '1770000000.000000',
    },
  ],
});

const createPendingHelpNote = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Create Pending Help Note',
    position: [0, 340],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'create',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      title: expr('{{ "Live help - " + $("Normalize Help Request").item.json.call_public_id }}'),
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: 'Live help request sent to Slack. Waiting for team answer.' },
          { key: 'Transcript|rich_text', textContent: expr('{{ $("Normalize Help Request").item.json.transcript_excerpt || "" }}') },
          { key: 'Event Type|select', selectValue: 'Live help' },
          { key: 'Help Request ID|rich_text', textContent: expr('{{ $("Normalize Help Request").item.json.help_request_id }}') },
          { key: 'Help Question|rich_text', textContent: expr('{{ $("Normalize Help Request").item.json.question }}') },
          { key: 'Help Answer|rich_text', textContent: '' },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $("Normalize Help Request").item.json.conversation_id }}') },
          { key: 'Outcome Status|select', selectValue: 'Unanswered' },
          { key: 'Call|relation', relationValue: expr('{{ [$("Normalize Help Request").item.json.call_page_id] }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Live help note' }],
});

const updateCallHelpRequested = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Call Help Requested',
    position: [280, 340],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Normalize Help Request").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Live Help Status|select', selectValue: 'Requested' },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated call help status' }],
});

const respondStart = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Start Pending',
    position: [560, 340],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "pending", answer: "", help_request_id: $("Normalize Help Request").item.json.help_request_id, slack_channel: "C0ASXSTFSVA", slack_thread_ts: $("Post Help Request").item.json.message?.ts || $("Post Help Request").item.json.message_timestamp, note_page_id: $("Create Pending Help Note").item.json.id, call_id: $("Normalize Help Request").item.json.call_page_id, call_public_id: $("Normalize Help Request").item.json.call_public_id, started_at: $("Normalize Help Request").item.json.started_at, expires_at: $("Normalize Help Request").item.json.expires_at, check_after_seconds: 30, max_wait_seconds: 300, instruction: "Do not call request_creator_help again for this question. If speaking is needed, say one short hold phrase once. Then call check_creator_help with these returned IDs; n8n performs the 30-second wait before returning pending. n8n can recover the Slack thread if ElevenLabs sends placeholder IDs. Do not say None. Do not narrate checks unless the caller speaks.", speech_instruction: "If needed, say one short hold phrase once. Then use check_creator_help with the same IDs. Do not say still checking, still here, I am checking, or None." } }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'pending', help_request_id: 'help-RBCALL-1', slack_thread_ts: '1770000000.000000', check_after_seconds: 30 }],
});

const respondInvalidRequest = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Invalid Request',
    position: [-560, 620],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "invalid_request", done: true, answer: "", error: $json.validation_error || "Invalid live-help request.", check_again_in_seconds: 0, speech_instruction: "Do not continue polling. Explain internally that the live-help request was invalid." } }}'),
      options: {
        responseCode: 400,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'invalid_request', done: true }],
});

export default workflow('rb-calls-live-help', 'RB Calls Live Help')
  .add(sticky('ElevenLabs server tool target. request_creator_help posts exactly one Slack thread. check_creator_help reads recent channel history to recover the thread if ElevenLabs sends placeholder IDs, then polls replies for up to 5 minutes without duplicate Slack messages. Secured with ElevenLabs static egress IP allowlist; add HMAC or header-secret auth before production if supported.', [liveHelpWebhook, respondStart, respondCheckFinal], { color: 4, width: 3500, height: 1120 }))
  .add(liveHelpWebhook)
  .to(normalizeHelpRequest)
  .to(
    isValidRequest
      .onTrue(
        isCheckRequest
          .onTrue(
            hasSuppliedThreadTs
              .onTrue(
                resolveHelpThread.to(
                  hasHelpThread
                    .onTrue(
                      getThreadReplies
                        .to(extractCheckStatus)
                        .to(
                          isTerminalStatus
                            .onTrue(updateHelpNoteTerminal.to(updateCallHelpTerminal).to(respondCheckFinal))
                            .onFalse(
                              waitBeforeRecheck
                                .to(getThreadRepliesAfterWait)
                                .to(extractCheckStatusAfterWait)
                                .to(
                                  isTerminalStatusAfterWait
                                    .onTrue(updateHelpNoteTerminalAfterWait.to(updateCallHelpTerminalAfterWait).to(respondCheckFinalAfterWait))
                                    .onFalse(respondCheckPendingAfterWait),
                                ),
                            ),
                        ),
                    )
                    .onFalse(
                      extractMissingThreadStatus
                        .to(
                          isMissingThreadTerminalStatus
                            .onTrue(updateMissingThreadHelpNoteTerminal.to(updateMissingThreadCallHelpTerminal).to(respondMissingThreadFinal))
                            .onFalse(waitBeforePendingResponse.to(respondCheckPending)),
                        ),
                    ),
                ),
              )
              .onFalse(
                getRecentHelpThreads
                  .to(resolveHelpThread)
                  .to(
                    hasHelpThread
                      .onTrue(
                        getThreadReplies
                          .to(extractCheckStatus)
                          .to(
                            isTerminalStatus
                              .onTrue(updateHelpNoteTerminal.to(updateCallHelpTerminal).to(respondCheckFinal))
                              .onFalse(
                                waitBeforeRecheck
                                  .to(getThreadRepliesAfterWait)
                                  .to(extractCheckStatusAfterWait)
                                  .to(
                                    isTerminalStatusAfterWait
                                      .onTrue(updateHelpNoteTerminalAfterWait.to(updateCallHelpTerminalAfterWait).to(respondCheckFinalAfterWait))
                                      .onFalse(respondCheckPendingAfterWait),
                                  ),
                              ),
                          ),
                      )
                      .onFalse(
                        extractMissingThreadStatus
                          .to(
                            isMissingThreadTerminalStatus
                              .onTrue(updateMissingThreadHelpNoteTerminal.to(updateMissingThreadCallHelpTerminal).to(respondMissingThreadFinal))
                              .onFalse(waitBeforePendingResponse.to(respondCheckPending)),
                          ),
                      ),
                  ),
              ),
          )
          .onFalse(postHelpRequest.to(createPendingHelpNote).to(updateCallHelpRequested).to(respondStart)),
      )
      .onFalse(respondInvalidRequest),
  );
