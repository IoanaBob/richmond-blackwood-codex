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
const transcript = Array.isArray(data.transcript) ? data.transcript : [];
const transcriptText = transcript
  .map((turn) => [turn.role || 'unknown', turn.message || turn.text || ''].filter(Boolean).join(': '))
  .filter(Boolean)
  .join(String.fromCharCode(10));
const messageCount = transcript.length;
const summaryFromEvent = String(analysis.transcript_summary || body.summary || '').trim();
const noAnswerReason = [failureReason, status, disconnectionReason].join(' ').toLowerCase();
const noAnswerPattern = /(no[-_ ]?answer|not[-_ ]?answered|busy|cancel+ed|failed|unreachable|timeout|timed[-_ ]?out|voicemail|machine)/i;
const isExplicitFailure = eventType === 'call_initiation_failure' || Boolean(failureReason);
const postCallNoPickup = /post[-_ ]?call|transcription|ended|completed|done/i.test(eventType) && messageCount === 0 && duration === 0 && ['initiated', 'queued', 'ringing', ''].includes(status);
const isNoAnswer = isExplicitFailure ||
  postCallNoPickup ||
  (messageCount === 0 && noAnswerPattern.test(noAnswerReason)) ||
  (messageCount === 0 && analysis.call_successful && analysis.call_successful !== 'success') ||
  (messageCount === 0 && ['failed', 'done', 'ended', 'completed'].includes(status) && analysis.call_successful !== 'success');
const summary = String(
  summaryFromEvent ||
  (isNoAnswer ? 'Outbound call did not reach a human conversation. ElevenLabs status: ' + (status || eventType) + (failureReason ? '. Reason: ' + failureReason : '') : '') ||
  (failureReason ? 'Call initiation failed: ' + failureReason : '')
).trim();
const twilioSid = String(
  data.callSid ||
  data.call_sid ||
  metadata.callSid ||
  metadata.call_sid ||
  metadata.body?.CallSid ||
  metadata.body?.call_sid ||
  ''
).trim();
const callStatus = isNoAnswer ? 'Call Unanswered' : 'Call Completed';
const outcomeStatus = isNoAnswer ? 'No answer' : (analysis.call_successful === 'success' ? 'Resolved' : 'Follow-up needed');
const requiresFollowUp = isNoAnswer || (analysis.call_successful && analysis.call_successful !== 'success');
const noteEventType = isNoAnswer ? 'Error' : 'Post-call';
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
  transcript: transcriptText.slice(0, 1900),
  raw_event_excerpt: JSON.stringify(body).slice(0, 1800),
  call_status: callStatus,
  outcome_status: outcomeStatus,
  requires_follow_up: Boolean(requiresFollowUp),
  failure_reason: failureReason || disconnectionReason,
  note_title: (isNoAnswer ? 'No answer - ' : 'Post-call - ') + callPublicId,
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
    parameters: {
      resource: 'databasePage',
      operation: 'create',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      title: expr('{{ $json.note_title }}'),
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary || $json.failure_reason || "" }}') },
          { key: 'Transcript|rich_text', textContent: expr('{{ $json.transcript || $json.raw_event_excerpt }}') },
          { key: 'Event Type|select', selectValue: expr('{{ $json.note_event_type }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $json.conversation_id }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $json.twilio_call_sid }}') },
          { key: 'Call|relation', relationValue: expr('{{ [$json.call_page_id] }}') },
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
const normalStaleAfterMinutes = 2;
const claimOnlyStaleAfterMinutes = 2;
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
    parameters: {
      method: 'GET',
      url: expr('https://api.elevenlabs.io/v1/convai/conversations/{{ $json.conversation_id }}'),
      sendHeaders: true,
      headerParameters: {
        parameters: [
          { name: 'Accept', value: 'application/json' },
          { name: 'xi-api-key', value: expr('{{ $vars.ELEVENLABS_API_KEY || "" }}') },
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
  ? 'Outbound call lock was claimed ' + candidate.attempt_age_minutes + ' minutes ago, but the workflow did not store a new ElevenLabs conversation ID. Treating as a canceled/failed start for manual follow-up.'
  : 'Outbound call stayed Call Started for ' + candidate.attempt_age_minutes + ' minutes, but n8n has no ElevenLabs conversation ID to verify. Treating as unanswered for manual follow-up.';
return {
  ...candidate,
  source: 'status_sweep_missing_conversation_id',
  should_update: true,
  call_status: 'Call Unanswered',
  outcome_status: 'No answer',
  requires_follow_up: true,
  note_event_type: 'Error',
  note_title: 'No answer sweep - ' + (candidate.call_public_id || candidate.call_page_id),
  summary,
  transcript: 'No transcript available.',
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
      call_status: 'Call Unanswered',
      outcome_status: 'No answer',
      requires_follow_up: true,
      note_event_type: 'Error',
      summary: 'Outbound call stayed Call Started with no conversation ID.',
      transcript: 'No transcript available.',
      voice_error: 'Outbound call stayed Call Started with no conversation ID.',
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
const transcriptText = transcript
  .map((turn) => [turn.role || turn.speaker || 'unknown', turn.message || turn.text || ''].filter(Boolean).join(': '))
  .filter(Boolean)
  .join(String.fromCharCode(10));
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
const staleInitiatedNoMessages = status === 'initiated' && messageCount === 0 && candidate.attempt_age_minutes >= 2;
const noPickupNoAudio = messageCount === 0 && duration === 0 && candidate.attempt_age_minutes >= 2 && ['initiated', 'queued', 'ringing', ''].includes(status);
const ringingInProgressNoAudio = status === 'in-progress' && messageCount === 0 && duration === 0 && candidate.attempt_age_minutes >= 2;
const stuckInProgressNoMessages = status === 'in-progress' && messageCount === 0 && candidate.attempt_age_minutes >= 25;
const terminalNoMessages = ['failed', 'done', 'ended', 'completed'].includes(status) && messageCount === 0 && callSuccessful !== 'success';
const explicitNoAnswer = messageCount === 0 && noAnswerPattern.test(reasonText);
const isUnanswered = !authFailed && (httpFailed || staleInitiatedNoMessages || noPickupNoAudio || ringingInProgressNoAudio || stuckInProgressNoMessages || terminalNoMessages || explicitNoAnswer);
const isCompleted = !isUnanswered && ['done', 'ended', 'completed'].includes(status);
const shouldUpdate = !authFailed && (isUnanswered || isCompleted);
const summaryFromElevenLabs = String(analysis.transcript_summary || data.summary || '').trim();
const statusSummary = authFailed
  ? 'ElevenLabs conversation lookup was not authorized. Configure n8n variable ELEVENLABS_API_KEY before relying on the no-answer watchdog.'
  : 'ElevenLabs status=' + (status || 'unknown') + ', messages=' + messageCount + ', duration=' + duration + 's, age=' + candidate.attempt_age_minutes + 'm' + (reason ? ', reason=' + reason : '') + '.';
const summary = isUnanswered
  ? 'Outbound call did not reach a human conversation. ' + statusSummary
  : (summaryFromElevenLabs || 'Recovered completed call status from ElevenLabs status sweep. ' + statusSummary);
return {
  ...candidate,
  source: 'status_sweep',
  should_update: shouldUpdate,
  call_status: isUnanswered ? 'Call Unanswered' : (isCompleted ? 'Call Completed' : 'Call Started'),
  outcome_status: isUnanswered ? 'No answer' : (callSuccessful === 'success' ? 'Resolved' : 'Follow-up needed'),
  requires_follow_up: isUnanswered || (callSuccessful && callSuccessful !== 'success'),
  note_event_type: isUnanswered ? 'Error' : 'Post-call',
  note_title: (isUnanswered ? 'No answer sweep - ' : 'Status sweep - ') + (candidate.call_public_id || candidate.call_page_id),
  summary: summary.slice(0, 1900),
  transcript: (transcriptText || 'No transcript available.').slice(0, 1900),
  raw_event_excerpt: JSON.stringify(body).slice(0, 1800),
  twilio_call_sid: String(data.callSid || data.call_sid || metadata.callSid || metadata.call_sid || '').trim(),
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
    parameters: {
      resource: 'databasePage',
      operation: 'create',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      title: expr('{{ $json.note_title }}'),
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Summary|rich_text', textContent: expr('{{ $json.summary || "" }}') },
          { key: 'Transcript|rich_text', textContent: expr('{{ $json.transcript || $json.raw_event_excerpt || "" }}') },
          { key: 'Event Type|select', selectValue: expr('{{ $json.note_event_type }}') },
          { key: 'Outcome Status|select', selectValue: expr('{{ $json.outcome_status }}') },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: expr('{{ $json.conversation_id }}') },
          { key: 'Twilio Call SID|rich_text', textContent: expr('{{ $json.twilio_call_sid }}') },
          { key: 'Call|relation', relationValue: expr('{{ [$json.call_page_id] }}') },
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
  .add(sticky('Receives ElevenLabs post-call and failure webhooks, plus runs a one-minute no-answer watchdog so accepted outbound calls that never start a human conversation do not remain locked. Routine post-call and sweep state changes update Notion only; Slack is reserved for live human-help requests. Uses ElevenLabs static egress IP allowlist; add HMAC validation before production if n8n raw-body support is available.', [eventsWebhook, respondSuccess, sweepSchedule, updateSweptCallOutcome], { color: 6, width: 2920, height: 980 }))
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
