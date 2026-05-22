import {
  expr,
  ifElse,
  newCredential,
  nextBatch,
  node,
  splitInBatches,
  sticky,
  trigger,
  workflow,
} from '@n8n/workflow-sdk';

const CALLS_DATABASE_ID = '342e4130-1314-8012-964a-d969a860dd93';
const CALL_NOTES_DATABASE_ID = '342e4130-1314-8016-8ced-d60cbf9fe9bf';
const RB_CALLS_CHANNEL_ID = 'C0ASXSTFSVA';
const ELEVENLABS_WEBHOOK_IPS = '34.67.146.145,34.59.11.47,35.204.38.71,34.147.113.54,35.185.187.110,35.247.157.189,34.77.234.246,34.140.184.144,34.93.26.174,34.93.252.69';

const transcriptBlocks = [
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(0, 1800) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(1800, 3600) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(3600, 5400) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(5400, 7200) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(7200, 9000) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(9000, 10800) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(10800, 12600) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(12600, 14400) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(14400, 16200) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(16200, 18000) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(18000, 19800) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(19800, 21600) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(21600, 23400) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(23400, 25200) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(25200, 27000) || " ") }}') },
  { type: 'paragraph', textContent: expr('{{ (($json.full_transcript || $json.raw_event_excerpt || "No transcript available.").slice(27000, 28800) || " ") }}') },
];

const eventsWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'ElevenLabs Events Webhook',
    position: [-720, -160],
    parameters: {
      httpMethod: 'POST',
      path: 'rb-calls-elevenlabs-events',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {
        ipWhitelist: ELEVENLABS_WEBHOOK_IPS,
      },
    },
  },
  output: [
    {
      headers: { 'elevenlabs-signature': 't=1770000000,v0=signature' },
      body: {
        type: 'post_call_transcription',
        data: {
          conversation_id: 'conversation_id',
          status: 'done',
          transcript: [{ role: 'agent', message: 'Hello' }],
          analysis: { call_successful: 'success', transcript_summary: 'Call completed.' },
          conversation_initiation_client_data: {
            dynamic_variables: {
              call_id: 'call_page_id',
              call_public_id: 'RBCALL-1',
              owner_slack_member_id: 'U123',
              message_topic: 'Call execution',
            },
          },
        },
      },
    },
  ],
});

const sweepSchedule = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Every minute - no-answer watchdog',
    position: [-720, 360],
    parameters: {
      rule: {
        interval: [{ field: 'minutes', minutesInterval: 1 }],
      },
    },
  },
  output: [{}],
});

const normalizeEvent = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize ElevenLabs Event',
    position: [-460, -160],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const body = $json.body || {};
const data = body.data || body;
const dynamic = data.conversation_initiation_client_data?.dynamic_variables || body.dynamic_variables || {};
const eventType = String(body.type || data.type || 'unknown');
const conversationId = String(data.conversation_id || body.conversation_id || dynamic.system__conversation_id || '').trim();
const callPageId = String(dynamic.call_id || body.call_id || data.call_id || '').trim();
const callPublicId = String(dynamic.call_public_id || callPageId || conversationId || 'unknown-call').trim();
const ownerSlackId = String(dynamic.owner_slack_member_id || body.owner_slack_member_id || '').replace(/[<@>]/g, '').trim();
const explicitOwnerMention = String(dynamic.owner_mention || body.owner_mention || '').trim();
const ownerName = String(dynamic.owner_name || body.owner_name || '').trim();
const ownerMention = ownerSlackId ? '<@' + ownerSlackId + '>' : (explicitOwnerMention || ownerName || 'owner not resolved');
const messageTopic = String(dynamic.message_topic || body.message_topic || dynamic.reason_for_call || dynamic.main_question || eventType || 'ElevenLabs event').trim();
const analysis = data.analysis || {};
const metadata = data.metadata || {};
const failureReason = String(data.failure_reason || body.failure_reason || data.error || body.error || '').trim();
const status = String(data.status || body.status || data.call_status || body.call_status || metadata.status || '').toLowerCase().trim();
const duration = Number(metadata.call_duration_secs || metadata.duration_seconds || metadata.duration_secs || metadata.duration || data.duration_seconds || data.duration || 0);
const disconnectionReason = String(
  data.disconnection_reason ||
  body.disconnection_reason ||
  data.termination_reason ||
  body.termination_reason ||
  metadata.disconnection_reason ||
  metadata.termination_reason ||
  metadata.twilio_status ||
  ''
).toLowerCase().trim();
const LF = String.fromCharCode(10);
const transcript = Array.isArray(data.transcript) ? data.transcript : [];
function turnToTranscriptLine(turn) {
  const role = String(turn.role || turn.speaker || 'unknown').trim() || 'unknown';
  const rawMessage = turn.message !== undefined && turn.message !== null ? turn.message : turn.text;
  if (rawMessage === undefined || rawMessage === null || !String(rawMessage).trim()) return '';
  const message = String(rawMessage).trim();
  return role + ': ' + message;
}
const transcriptText = transcript.map(turnToTranscriptLine).filter(Boolean).join(LF);
const messageCount = transcript.length;
const summaryFromEvent = String(analysis.transcript_summary || body.summary || '').trim();
const transcriptLower = transcriptText.toLowerCase();
const summaryLower = summaryFromEvent.toLowerCase();
const conversationLower = [summaryLower, transcriptLower].filter(Boolean).join('\\n');
const callSuccessful = String(analysis.call_successful || data.call_successful || body.call_successful || '').toLowerCase().trim();
const humanConversationEvidence =
  callSuccessful === 'success' ||
  /\\b(human agent|live agent|customer service|representative|speaking with|speaking to|booking open|reservation|passenger|email address|phone number|miles & more|fare difference|change fee|rebook|provided .*contact number)\\b/i.test(conversationLower);
const noAnswerReason = [failureReason, status, disconnectionReason].join(' ').toLowerCase();
const noAnswerPattern = /(no[-_ ]?answer|not[-_ ]?answered|busy|cancel+ed|failed|unreachable|timeout|timed[-_ ]?out|voicemail|machine)/i;
const ivrDeadEnd =
  !humanConversationEvidence &&
  (summaryLower.includes('ivr') || summaryLower.includes('language menu') || /for english, press|press one|press 1/.test(transcriptLower)) &&
  (/goodbye|ended by remote party/.test(summaryLower) || disconnectionReason.includes('remote party') || transcriptLower.includes('goodbye'));
const isExplicitFailure = !humanConversationEvidence && (eventType === 'call_initiation_failure' || Boolean(failureReason));
const postCallNoPickup = /post[-_ ]?call|transcription|ended|completed|done/i.test(eventType) && messageCount === 0 && duration === 0 && ['initiated', 'queued', 'ringing', ''].includes(status);
const isNoAnswer = !humanConversationEvidence && (isExplicitFailure ||
  ivrDeadEnd ||
  postCallNoPickup ||
  (messageCount === 0 && noAnswerPattern.test(noAnswerReason)) ||
  (messageCount === 0 && callSuccessful && callSuccessful !== 'success') ||
  (messageCount === 0 && ['failed', 'done', 'ended', 'completed'].includes(status) && callSuccessful !== 'success'));
const summary = String(
  (ivrDeadEnd ? 'Outbound call reached an IVR, but did not reach a live agent. The remote party ended the call before the booking change could be discussed.' : '') ||
  summaryFromEvent ||
  (isNoAnswer ? 'Outbound call did not reach a human conversation. ElevenLabs status: ' + (status || eventType) + (failureReason ? '. Reason: ' + failureReason : '') : '') ||
  (failureReason ? 'Call initiation failed: ' + failureReason : '')
).trim();
const twilioSid = String(
  data.callSid ||
  data.call_sid ||
  data.phone_call?.call_sid ||
  metadata.callSid ||
  metadata.call_sid ||
  metadata.phone_call?.call_sid ||
  metadata.body?.CallSid ||
  metadata.body?.call_sid ||
  ''
).trim();
const callStatus = isNoAnswer ? 'Call Unanswered' : 'Call Completed';
const outcomeStatus = isNoAnswer ? 'No answer' : (callSuccessful === 'success' ? 'Resolved' : 'Follow-up needed');
const requiresFollowUp = isNoAnswer || (callSuccessful && callSuccessful !== 'success');
const noteEventType = isNoAnswer ? 'Error' : 'Post-call';
const noteTitle = (isNoAnswer ? 'No answer - ' : 'Post-call - ') + callPublicId;
function truncate(value, maxLength) {
  const text = String(value || '');
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
function richText(value) {
  return [{ type: 'text', text: { content: truncate(value, 1900) || ' ' } }];
}
function chunkText(value, size) {
  const text = String(value || '');
  if (!text) return [''];
  const chunks = [];
  for (let index = 0; index < text.length; index += size) chunks.push(text.slice(index, index + size));
  return chunks;
}
function block(type, value) {
  const output = { object: 'block', type };
  output[type] = { rich_text: richText(value) };
  return output;
}
const rawEventExcerpt = JSON.stringify(body).slice(0, 1800);
const transcriptProperty = transcriptText
  ? ('Full transcript is in the page body. This property is a searchable excerpt only.' + LF + LF + truncate(transcriptText, 1750))
  : (rawEventExcerpt || 'No transcript available.').slice(0, 1900);
const transcriptBody = transcriptText || rawEventExcerpt || 'No transcript available.';
const importedAt = new Date().toISOString();
const children = [
  block('paragraph', [
    'Status: provisional',
    'Source: ElevenLabs event ' + eventType + (conversationId ? ' for conversation ' + conversationId : ''),
    'Imported: ' + importedAt,
    'Review: Full transcript is stored in this page body. The Transcript property is only an excerpt because Notion rich-text properties are capped.',
  ].join(LF)),
  block('heading_2', 'Summary'),
  ...chunkText(summary || failureReason || 'No summary available.', 1800).map((chunk) => block('paragraph', chunk)),
  block('heading_2', 'Full transcript'),
  ...chunkText(transcriptBody, 1800).map((chunk) => block('paragraph', chunk)),
];
const notionPageBody = {
  parent: { database_id: '342e4130-1314-8016-8ced-d60cbf9fe9bf' },
  properties: {
    Subject: { title: richText(noteTitle) },
    Summary: { rich_text: richText(summary || failureReason || '') },
    Transcript: { rich_text: richText(transcriptProperty) },
    'Event Type': { select: { name: noteEventType } },
    'Outcome Status': { select: { name: outcomeStatus } },
    'ElevenLabs Conversation ID': { rich_text: richText(conversationId) },
    'Twilio Call SID': { rich_text: richText(twilioSid) },
    Call: { relation: callPageId ? [{ id: callPageId }] : [] },
  },
  children,
};
return {
  event_type: eventType,
  note_event_type: noteEventType,
  call_page_id: callPageId,
  has_call_page: Boolean(callPageId),
  call_public_id: callPublicId,
  conversation_id: conversationId,
  twilio_call_sid: twilioSid,
  owner_mention: ownerMention,
  owner_name: ownerName,
  owner_slack_member_id: ownerSlackId,
  message_topic: messageTopic,
  summary: summary.slice(0, 1900),
  transcript: transcriptProperty,
  full_transcript: transcriptText,
  transcript_message_count: messageCount,
  notion_page_body: notionPageBody,
  raw_event_excerpt: rawEventExcerpt,
  call_status: callStatus,
  outcome_status: outcomeStatus,
  requires_follow_up: Boolean(requiresFollowUp),
  failure_reason: failureReason || disconnectionReason,
  note_title: noteTitle,
};`,
    },
  },
  output: [
    {
      event_type: 'post_call_transcription',
      note_event_type: 'Post-call',
      call_page_id: 'call_page_id',
      has_call_page: true,
      call_public_id: 'RBCALL-1',
      conversation_id: 'conversation_id',
      twilio_call_sid: 'call_sid',
      owner_mention: '<@U123>',
      message_topic: 'Call execution',
      summary: 'Call completed.',
      transcript: 'agent: Hello',
      raw_event_excerpt: '{}',
      call_status: 'Call Completed',
      outcome_status: 'Resolved',
      requires_follow_up: false,
      failure_reason: '',
      note_title: 'Post-call - RBCALL-1',
    },
  ],
});

const hasCallPage = ifElse({
  version: 2.3,
  config: {
    name: 'Has Call Page?',
    position: [-200, -160],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'has-call-page',
            leftValue: expr('{{ $json.has_call_page }}'),
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

const createPostCallNote = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Create Post-Call Note',
    position: [80, -300],
    credentials: { notionApi: newCredential('Notion') },
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'databasePage',
      operation: 'create',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      title: expr('{{ $json.note_title }}'),
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary || $json.failure_reason || "" }}') },
          { key: 'Transcript|rich_text', textContent: expr('{{ $json.transcript || "" }}') },
          { key: 'Event Type|select', selectValue: expr('{{ $json.note_event_type }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $json.conversation_id }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $json.twilio_call_sid || "" }}') },
          { key: 'Call|relation', relationValue: [expr('{{ $json.call_page_id }}')] },
        ],
      },
      blockUi: {
        blockValues: [
          {
            type: 'paragraph',
            textContent: expr('{{ ["Status: provisional", "Source: ElevenLabs event " + $json.event_type + ($json.conversation_id ? " for conversation " + $json.conversation_id : ""), "Imported: " + $now.toISO(), "Review: Full transcript is stored in this page body. The Transcript property is only an excerpt because Notion rich-text properties are capped."].join("\\n") }}'),
          },
          { type: 'heading_2', textContent: 'Summary' },
          { type: 'paragraph', textContent: expr('{{ $json.summary || $json.failure_reason || "No summary available." }}') },
          { type: 'heading_2', textContent: 'Full transcript' },
          ...transcriptBlocks,
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Post-call note' }],
});

const updateCallOutcome = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Call Outcome',
    position: [360, -300],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Normalize ElevenLabs Event").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: expr('{{ $("Normalize ElevenLabs Event").item.json.call_status }}') },
          { key: 'Outcome|rich_text', textContent: expr('{{ $("Normalize ElevenLabs Event").item.json.summary || $("Normalize ElevenLabs Event").item.json.failure_reason }}') },
          { key: 'Requires follow-up?|checkbox', checkboxValue: expr('{{ $("Normalize ElevenLabs Event").item.json.requires_follow_up }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $("Normalize ElevenLabs Event").item.json.conversation_id }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $("Normalize ElevenLabs Event").item.json.twilio_call_sid }}') },
          { key: 'Voice Error|rich_text', textContent: expr('{{ $("Normalize ElevenLabs Event").item.json.call_status === "Call Unanswered" ? $("Normalize ElevenLabs Event").item.json.summary : "" }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated call outcome' }],
});

const respondSuccess = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Success',
    position: [640, -300],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "received", call_id: $("Normalize ElevenLabs Event").item.json.call_page_id, conversation_id: $("Normalize ElevenLabs Event").item.json.conversation_id } }}'),
      options: { responseCode: 200 },
    },
  },
  output: [{ status: 'received' }],
});

const respondMissingCallId = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Missing Call ID',
    position: [360, 20],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "received_missing_call_id", conversation_id: $("Normalize ElevenLabs Event").item.json.conversation_id } }}'),
      options: { responseCode: 200 },
    },
  },
  output: [{ status: 'received_missing_call_id' }],
});

const getStartedCalls = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Started Calls',
    position: [-460, 360],
    credentials: { notionApi: newCredential('Notion') },
    alwaysOutputData: true,
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: CALLS_DATABASE_ID, mode: 'id', cachedResultName: 'Calls' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: {
        conditions: [
          { key: 'Call Status|status', condition: 'equals', statusValue: 'Call Started' },
        ],
      },
      options: {},
    },
  },
  output: [
    {
      id: 'call_page_id',
      url: 'https://www.notion.so/call_page_id',
      properties: {
        ID: { unique_id: { prefix: 'RBCALL', number: 1 } },
        'Call Status': { status: { name: 'Call Started' } },
        'ElevenLabs Conversation ID': { rich_text: [{ plain_text: 'conversation_id' }] },
        'Last Call Attempt At': { date: { start: '2026-05-12T00:00:00.000Z' } },
        'Short reason': { title: [{ plain_text: 'Test call' }] },
      },
    },
  ],
});

const prepareStatusSweep = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Prepare Status Sweep',
    position: [-200, 360],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `function prop(page, name) { return page?.properties?.[name] || {}; }
function richText(value) { return (value?.title || value?.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function text(page, name) { return richText(prop(page, name)); }
function uniqueId(page) {
  const value = prop(page, 'ID').unique_id;
  return value ? [value.prefix, value.number].filter((part) => part !== undefined && part !== null && String(part) !== '').join('-') : page.id;
}
function dateValue(page, name) { return prop(page, name).date?.start || ''; }
function statusValue(page, name) { return prop(page, name).status?.name || prop(page, name).select?.name || ''; }
const now = Date.now();
const normalStaleAfterMinutes = 10;
const claimOnlyStaleAfterMinutes = 60;
return $input.all()
  .map((item) => item.json || {})
  .filter((page) => page.id && statusValue(page, 'Call Status') === 'Call Started')
  .map((page) => {
    const lastAttemptAt = dateValue(page, 'Last Call Attempt At');
    const lastAttemptMs = Date.parse(lastAttemptAt);
    const ageMinutes = Number.isFinite(lastAttemptMs) ? Math.floor((now - lastAttemptMs) / 60000) : 9999;
    const conversationId = text(page, 'ElevenLabs Conversation ID');
    const voiceError = text(page, 'Voice Error');
    const claimOnlyLock = /^rb-call-lock:/.test(voiceError) && !conversationId;
    const staleAfterMinutes = claimOnlyLock ? claimOnlyStaleAfterMinutes : normalStaleAfterMinutes;
    const callPublicId = uniqueId(page);
    const messageTopic = text(page, 'Short reason') || text(page, 'Reason for call') || text(page, 'Main question') || 'Call execution';
    return {
      json: {
        call_page_id: page.id,
        call_url: page.url || '',
        call_public_id: callPublicId,
        conversation_id: conversationId,
        has_conversation_id: Boolean(conversationId),
        last_attempt_at: lastAttemptAt,
        attempt_age_minutes: ageMinutes,
        claim_only_lock: claimOnlyLock,
        stale_after_minutes: staleAfterMinutes,
        stale_enough: ageMinutes >= staleAfterMinutes,
        message_topic: messageTopic,
      },
    };
  })
  .filter((item) => item.json.stale_enough);`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_url: 'https://www.notion.so/call_page_id',
      call_public_id: 'RBCALL-1',
      conversation_id: 'conversation_id',
      has_conversation_id: true,
      last_attempt_at: '2026-05-12T00:00:00.000Z',
      attempt_age_minutes: 10,
      claim_only_lock: false,
      stale_after_minutes: 8,
      stale_enough: true,
      message_topic: 'Test call',
    },
  ],
});

const loopStartedCalls = splitInBatches({
  version: 3,
  config: {
    name: 'Loop Started Calls',
    position: [60, 360],
    parameters: {
      batchSize: 1,
      options: {},
    },
  },
});

const sweepDone = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: {
    name: 'Sweep Done',
    position: [360, 220],
    parameters: {},
  },
});

const hasConversationId = ifElse({
  version: 2.3,
  config: {
    name: 'Has Conversation ID?',
    position: [360, 460],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'has-conversation-id',
            leftValue: expr('{{ $json.has_conversation_id }}'),
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

const getElevenLabsConversation = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Get ElevenLabs Conversation',
    position: [640, 360],
    credentials: { elevenLabsApi: newCredential('ElevenLabs account 2') },
    parameters: {
      method: 'GET',
      url: expr('https://api.elevenlabs.io/v1/convai/conversations/{{ $json.conversation_id }}'),
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'elevenLabsApi',
      sendHeaders: true,
      headerParameters: {
        parameters: [
          { name: 'Accept', value: 'application/json' },
        ],
      },
      options: { response: { response: { fullResponse: true, neverError: true, responseFormat: 'json' } }, timeout: 30000 },
    },
  },
  output: [
    {
      statusCode: 200,
      body: {
        conversation_id: 'conversation_id',
        status: 'initiated',
        transcript: [],
        analysis: { call_successful: 'unknown' },
        metadata: { duration_seconds: 0 },
      },
    },
  ],
});

const normalizeMissingConversation = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Missing Conversation',
    position: [640, 620],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const candidate = $json;
const summary = candidate.claim_only_lock
  ? 'Outbound call lock was claimed ' + candidate.attempt_age_minutes + ' minutes ago, but the workflow did not store a new ElevenLabs conversation ID. Keeping the call eligible for retry instead of classifying it as no-answer.'
  : 'Outbound call stayed Call Started for ' + candidate.attempt_age_minutes + ' minutes, but n8n has no ElevenLabs conversation ID to verify. Keeping the call eligible for retry instead of classifying it as no-answer.';
const LF = String.fromCharCode(10);
function truncate(value, maxLength) {
  const text = String(value || '');
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
function richText(value) {
  return [{ type: 'text', text: { content: truncate(value, 1900) || ' ' } }];
}
function block(type, value) {
  const output = { object: 'block', type };
  output[type] = { rich_text: richText(value) };
  return output;
}
const noteTitle = 'Startup retry sweep - ' + (candidate.call_public_id || candidate.call_page_id);
const importedAt = new Date().toISOString();
const transcriptProperty = 'No transcript available.';
const notionPageBody = {
  parent: { database_id: '342e4130-1314-8016-8ced-d60cbf9fe9bf' },
  properties: {
    Subject: { title: richText(noteTitle) },
    Summary: { rich_text: richText(summary) },
    Transcript: { rich_text: richText(transcriptProperty) },
    'Event Type': { select: { name: 'Error' } },
    'Outcome Status': { select: { name: 'Follow-up needed' } },
    'ElevenLabs Conversation ID': { rich_text: richText(candidate.conversation_id || '') },
    'Twilio Call SID': { rich_text: richText('') },
    Call: { relation: candidate.call_page_id ? [{ id: candidate.call_page_id }] : [] },
  },
  children: [
    block('paragraph', [
      'Status: provisional',
      'Source: n8n ElevenLabs status sweep without a stored conversation ID.',
      'Imported: ' + importedAt,
      'Review: No transcript was available because no ElevenLabs conversation ID was stored.',
    ].join(LF)),
    block('heading_2', 'Summary'),
    block('paragraph', summary),
  ],
};
return {
  ...candidate,
  source: 'status_sweep_missing_conversation_id',
  should_update: true,
  call_status: 'Reviewed',
  outcome_status: 'Follow-up needed',
  requires_follow_up: false,
  note_event_type: 'Error',
  note_title: noteTitle,
  summary,
  transcript: transcriptProperty,
  full_transcript: '',
  transcript_message_count: 0,
  notion_page_body: notionPageBody,
  twilio_call_sid: '',
  voice_error: summary,
};`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      should_update: true,
      call_status: 'Reviewed',
      outcome_status: 'Follow-up needed',
      requires_follow_up: false,
      note_event_type: 'Error',
      summary: 'Outbound call startup did not store a conversation ID.',
      transcript: 'No transcript available.',
      voice_error: 'Outbound call startup did not store a conversation ID.',
    },
  ],
});

const normalizeSweptConversation = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Swept Conversation',
    position: [900, 360],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const candidate = $('Prepare Status Sweep').item.json;
const response = $json || {};
let body = response.body !== undefined ? response.body : response;
if (typeof body === 'string') {
  try { body = JSON.parse(body); } catch (error) { body = { raw: body }; }
}
const data = body.data || body.conversation || body;
const metadata = data.metadata || {};
const analysis = data.analysis || {};
const transcript = Array.isArray(data.transcript) ? data.transcript : (Array.isArray(data.messages) ? data.messages : []);
const LF = String.fromCharCode(10);
function turnToTranscriptLine(turn) {
  const role = String(turn.role || turn.speaker || 'unknown').trim() || 'unknown';
  const rawMessage = turn.message !== undefined && turn.message !== null ? turn.message : turn.text;
  if (rawMessage === undefined || rawMessage === null || !String(rawMessage).trim()) return '';
  const message = String(rawMessage).trim();
  return role + ': ' + message;
}
const transcriptText = transcript.map(turnToTranscriptLine).filter(Boolean).join(LF);
const messageCount = Number(data.message_count || data.messages_count || metadata.message_count || transcript.length || 0);
const status = String(data.status || body.status || metadata.status || '').toLowerCase().trim();
const callSuccessful = String(analysis.call_successful || data.call_successful || '').toLowerCase().trim();
const duration = Number(metadata.duration_seconds || metadata.duration_secs || metadata.duration || data.duration_seconds || data.duration || 0);
const reason = String(
  data.failure_reason ||
  data.error ||
  data.disconnection_reason ||
  data.termination_reason ||
  metadata.disconnection_reason ||
  metadata.termination_reason ||
  metadata.twilio_status ||
  ''
).toLowerCase().trim();
const httpFailed = Number(response.statusCode || response.status || 0) >= 400;
const reasonText = [status, callSuccessful, reason].filter(Boolean).join(' ');
const noAnswerPattern = /(no[-_ ]?answer|not[-_ ]?answered|busy|cancel+ed|failed|unreachable|timeout|timed[-_ ]?out|voicemail|machine)/i;
const authFailed = [401, 403].includes(Number(response.statusCode || response.status || 0));
const longStuckNoMessages = messageCount === 0 && duration === 0 && candidate.attempt_age_minutes >= 45 && ['initiated', 'queued', 'ringing', 'in-progress', ''].includes(status);
const terminalNoMessages = ['failed', 'done', 'ended', 'completed'].includes(status) && messageCount === 0 && callSuccessful !== 'success';
const explicitNoAnswer = messageCount === 0 && noAnswerPattern.test(reasonText);
const summaryFromElevenLabs = String(analysis.transcript_summary || data.summary || '').trim();
const transcriptLower = transcriptText.toLowerCase();
const summaryLower = summaryFromElevenLabs.toLowerCase();
const conversationLower = [summaryLower, transcriptLower].filter(Boolean).join('\\n');
const humanConversationEvidence =
  callSuccessful === 'success' ||
  /\\b(human agent|live agent|customer service|representative|speaking with|speaking to|booking open|reservation|passenger|email address|phone number|miles & more|fare difference|change fee|rebook|provided .*contact number)\\b/i.test(conversationLower);
const ivrDeadEnd =
  !humanConversationEvidence &&
  (summaryLower.includes('ivr') || summaryLower.includes('language menu') || /for english, press|press one|press 1/.test(transcriptLower)) &&
  (/goodbye|ended by remote party/.test(summaryLower) || reason.includes('remote party') || transcriptLower.includes('goodbye'));
const isUnanswered = !authFailed && !humanConversationEvidence && (ivrDeadEnd || httpFailed || longStuckNoMessages || terminalNoMessages || explicitNoAnswer);
const isCompleted = !isUnanswered && ['done', 'ended', 'completed'].includes(status);
const shouldUpdate = !authFailed && (isUnanswered || isCompleted);
const statusSummary = authFailed
  ? 'ElevenLabs conversation lookup was not authorized. Check the ElevenLabs credential on RB Calls ElevenLabs Events -> Get ElevenLabs Conversation before relying on the no-answer watchdog.'
  : 'ElevenLabs status=' + (status || 'unknown') + ', messages=' + messageCount + ', duration=' + duration + 's, age=' + candidate.attempt_age_minutes + 'm' + (reason ? ', reason=' + reason : '') + '.';
const summary = isUnanswered
  ? (ivrDeadEnd ? 'Outbound call reached an IVR, but did not reach a live agent. The remote party ended the call before the booking change could be discussed.' : 'Outbound call did not reach a human conversation. ' + statusSummary)
  : (summaryFromElevenLabs || 'Recovered completed call status from ElevenLabs status sweep. ' + statusSummary);
const noteEventType = isUnanswered ? 'Error' : 'Post-call';
const outcomeStatus = isUnanswered ? 'No answer' : (callSuccessful === 'success' ? 'Resolved' : 'Follow-up needed');
const noteTitle = (isUnanswered ? 'No answer sweep - ' : 'Status sweep - ') + (candidate.call_public_id || candidate.call_page_id);
function truncate(value, maxLength) {
  const text = String(value || '');
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
function richText(value) {
  return [{ type: 'text', text: { content: truncate(value, 1900) || ' ' } }];
}
function chunkText(value, size) {
  const text = String(value || '');
  if (!text) return [''];
  const chunks = [];
  for (let index = 0; index < text.length; index += size) chunks.push(text.slice(index, index + size));
  return chunks;
}
function block(type, value) {
  const output = { object: 'block', type };
  output[type] = { rich_text: richText(value) };
  return output;
}
const rawEventExcerpt = JSON.stringify(body).slice(0, 1800);
const transcriptProperty = transcriptText
  ? ('Full transcript is in the page body. This property is a searchable excerpt only.' + LF + LF + truncate(transcriptText, 1750))
  : (rawEventExcerpt || 'No transcript available.').slice(0, 1900);
const transcriptBody = transcriptText || rawEventExcerpt || 'No transcript available.';
const importedAt = new Date().toISOString();
const children = [
  block('paragraph', [
    'Status: provisional',
    'Source: ElevenLabs conversation status sweep' + (candidate.conversation_id ? ' for conversation ' + candidate.conversation_id : ''),
    'Imported: ' + importedAt,
    'Review: Full transcript is stored in this page body. The Transcript property is only an excerpt because Notion rich-text properties are capped.',
  ].join(LF)),
  block('heading_2', 'Summary'),
  ...chunkText(summary || 'No summary available.', 1800).map((chunk) => block('paragraph', chunk)),
  block('heading_2', 'Full transcript'),
  ...chunkText(transcriptBody, 1800).map((chunk) => block('paragraph', chunk)),
];
const notionPageBody = {
  parent: { database_id: '342e4130-1314-8016-8ced-d60cbf9fe9bf' },
  properties: {
    Subject: { title: richText(noteTitle) },
    Summary: { rich_text: richText(summary || '') },
    Transcript: { rich_text: richText(transcriptProperty) },
    'Event Type': { select: { name: noteEventType } },
    'Outcome Status': { select: { name: outcomeStatus } },
    'ElevenLabs Conversation ID': { rich_text: richText(candidate.conversation_id || '') },
    'Twilio Call SID': { rich_text: richText(String(data.callSid || data.call_sid || data.phone_call?.call_sid || metadata.callSid || metadata.call_sid || metadata.phone_call?.call_sid || '').trim()) },
    Call: { relation: candidate.call_page_id ? [{ id: candidate.call_page_id }] : [] },
  },
  children,
};
return {
  ...candidate,
  source: 'status_sweep',
  should_update: shouldUpdate,
  call_status: isUnanswered ? 'Call Unanswered' : (isCompleted ? 'Call Completed' : 'Call Started'),
  outcome_status: outcomeStatus,
  requires_follow_up: isUnanswered || (callSuccessful && callSuccessful !== 'success'),
  note_event_type: noteEventType,
  note_title: noteTitle,
  summary: summary.slice(0, 1900),
  transcript: transcriptProperty,
  full_transcript: transcriptText,
  transcript_message_count: messageCount,
  notion_page_body: notionPageBody,
  raw_event_excerpt: rawEventExcerpt,
  twilio_call_sid: String(data.callSid || data.call_sid || data.phone_call?.call_sid || metadata.callSid || metadata.call_sid || metadata.phone_call?.call_sid || '').trim(),
  voice_error: isUnanswered ? summary.slice(0, 1900) : '',
};`,
    },
  },
  output: [
    {
      call_page_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      should_update: true,
      call_status: 'Call Unanswered',
      outcome_status: 'No answer',
      requires_follow_up: true,
      note_event_type: 'Error',
      note_title: 'No answer sweep - RBCALL-1',
      summary: 'Outbound call did not reach a human conversation.',
      transcript: 'No transcript available.',
      twilio_call_sid: '',
      voice_error: 'Outbound call did not reach a human conversation.',
    },
  ],
});

const shouldUpdateSweptCall = ifElse({
  version: 2.3,
  config: {
    name: 'Should Update Swept Call?',
    position: [1160, 460],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [
          {
            id: 'should-update',
            leftValue: expr('{{ $json.should_update }}'),
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

const createSweptStatusNote = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Create Swept Status Note',
    position: [1440, 360],
    credentials: { notionApi: newCredential('Notion') },
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'databasePage',
      operation: 'create',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      title: expr('{{ $json.note_title }}'),
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary || "" }}') },
          { key: 'Transcript|rich_text', textContent: expr('{{ $json.transcript || "" }}') },
          { key: 'Event Type|select', selectValue: expr('{{ $json.note_event_type }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $json.conversation_id || "" }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $json.twilio_call_sid || "" }}') },
          { key: 'Call|relation', relationValue: [expr('{{ $json.call_page_id }}')] },
        ],
      },
      blockUi: {
        blockValues: [
          {
            type: 'paragraph',
            textContent: expr('{{ ["Status: provisional", "Source: ElevenLabs conversation status sweep" + ($json.conversation_id ? " for conversation " + $json.conversation_id : ""), "Imported: " + $now.toISO(), "Review: Full transcript is stored in this page body. The Transcript property is only an excerpt because Notion rich-text properties are capped."].join("\\n") }}'),
          },
          { type: 'heading_2', textContent: 'Summary' },
          { type: 'paragraph', textContent: expr('{{ $json.summary || "No summary available." }}') },
          { type: 'heading_2', textContent: 'Full transcript' },
          ...transcriptBlocks,
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'note_page_id', name: 'Swept status note' }],
});

const updateSweptCallOutcome = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Update Swept Call Outcome',
    position: [1720, 360],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: expr('{{ $("Should Update Swept Call?").item.json.call_page_id }}'), mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: expr('{{ $("Should Update Swept Call?").item.json.call_status }}') },
          { key: 'Outcome|rich_text', textContent: expr('{{ $("Should Update Swept Call?").item.json.summary || "" }}') },
          { key: 'Requires follow-up?|checkbox', checkboxValue: expr('{{ $("Should Update Swept Call?").item.json.requires_follow_up }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $("Should Update Swept Call?").item.json.conversation_id }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $("Should Update Swept Call?").item.json.twilio_call_sid }}') },
          { key: 'Voice Error|rich_text', textContent: expr('{{ $("Should Update Swept Call?").item.json.voice_error || "" }}') },
        ],
      },
      options: {},
    },
  },
  output: [{ id: 'call_page_id', name: 'Updated swept call outcome' }],
});

const skipSweptCall = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: {
    name: 'Skip Swept Call',
    position: [1440, 620],
    parameters: {},
  },
});

export default workflow('rb-calls-elevenlabs-events', 'RB Calls ElevenLabs Events')
  .add(sticky('Receives ElevenLabs post-call and failure webhooks, plus runs a one-minute no-answer watchdog so accepted outbound calls that never start a human conversation do not remain locked. Active SIP/in-progress calls are not marked unanswered just because ElevenLabs has no transcript yet; the sweep waits for terminal/no-answer evidence or a long stuck timeout. Routine post-call and sweep state changes update Notion only; Slack is reserved for live human-help requests. Uses ElevenLabs static egress IP allowlist; add HMAC validation before production if n8n raw-body support is available.', [eventsWebhook, respondSuccess, sweepSchedule, updateSweptCallOutcome], { color: 6, width: 2920, height: 980 }))
  .add(eventsWebhook)
  .to(normalizeEvent)
  .to(
    hasCallPage
      .onTrue(createPostCallNote.to(updateCallOutcome).to(respondSuccess))
      .onFalse(respondMissingCallId),
  )
  .add(sweepSchedule)
  .to(getStartedCalls)
  .to(prepareStatusSweep)
  .to(
    loopStartedCalls
      .onDone(sweepDone)
      .onEachBatch(
        hasConversationId
          .onTrue(getElevenLabsConversation.to(normalizeSweptConversation).to(
            shouldUpdateSweptCall
              .onTrue(createSweptStatusNote.to(updateSweptCallOutcome).to(nextBatch(loopStartedCalls)))
              .onFalse(skipSweptCall.to(nextBatch(loopStartedCalls))),
          ))
          .onFalse(normalizeMissingConversation.to(
            shouldUpdateSweptCall
              .onTrue(createSweptStatusNote.to(updateSweptCallOutcome).to(nextBatch(loopStartedCalls)))
              .onFalse(skipSweptCall.to(nextBatch(loopStartedCalls))),
          )),
      ),
  );
