import {
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
const PEOPLE_DIRECTORY_DATABASE_ID = 'af0b9bfa-93c2-4689-b588-fe87fe4ff79e';
const FILING_REGISTRATIONS_DATABASE_ID = 'ecaf96a4-cf77-409a-b481-aaf317442b74';
const TAX_PAYMENTS_DATABASE_ID = '1fae4130-1314-8099-907c-f544585f1b5b';
const TAX_PREPAYMENTS_DATABASE_ID = '162e4130-1314-803d-800a-cef0a0719d01';
const RB_CALLS_CHANNEL_ID = 'C0ASXSTFSVA';
const RB_AGENT_ID = 'agent_2001kq39ea0hf5yb86c4a7hj9gp1';

const every15Minutes = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Every 15 minutes',
    position: [-1120, 0],
    parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 15 }] } },
  },
  output: [{}],
});

const getReviewedCalls = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Reviewed Calls',
    position: [-880, 0],
    credentials: { notionApi: newCredential('Notion') },
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
          { key: 'Call Status|status', condition: 'equals', statusValue: 'Reviewed' },
          { key: 'Approved|checkbox', condition: 'equals', checkboxValue: true },
        ],
      },
      options: {},
    },
    alwaysOutputData: true,
  },
});

const loopReviewedCalls = splitInBatches({
  version: 3,
  config: { name: 'Loop Reviewed Calls', position: [-624, 0], parameters: { options: {} } },
});

const done = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'Done', position: [-368, -256], parameters: {} },
});

const preflightCallLock = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Preflight Call Lock',
    position: [-368, 0],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const call = $json || {};
function prop(page, name) { return page?.properties?.[name] || {}; }
function relationIds(page, name) { return (prop(page, name).relation || []).map((rel) => rel.id).filter(Boolean); }
function checkbox(page, name) { return Boolean(prop(page, name).checkbox); }
function select(page, name) { const value = prop(page, name); return value.status?.name || value.select?.name || ''; }
function uniqueId(page) { const value = prop(page, 'ID').unique_id; return value ? [value.prefix, value.number].filter((part) => part !== undefined && part !== null && String(part) !== '').join('-') : page.id; }
function dateValue(page, name) { return prop(page, name).date?.start || ''; }
function richText(value) { return (value.title || value.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function text(page, name) { return richText(prop(page, name)); }
function people(page, name) { return prop(page, name).people || []; }
function personName(person) { return person?.name || person?.person?.email || person?.id || ''; }
const reviewer = people(call, 'Reviewer')[0];
const submitter = people(call, 'Submitter')[0];
const owner = reviewer || submitter || null;
const ownerRole = reviewer ? 'Reviewer' : (submitter ? 'Submitter' : 'Unresolved');
const ownerName = personName(owner);
const messageTopic = text(call, 'Short reason') || text(call, 'Reason for call') || text(call, 'Main question') || 'Call execution';
const status = select(call, 'Call Status');
const approved = checkbox(call, 'Approved');
const companyIds = relationIds(call, 'Company');
const individualIds = relationIds(call, 'Individual');
const contactIds = relationIds(call, 'Contact');
const now = new Date();
const nowIso = now.toISOString();
const lastAttemptAt = dateValue(call, 'Last Call Attempt At');
const lastAttemptMs = Date.parse(lastAttemptAt);
const freshLock = status === 'Call Started' && Number.isFinite(lastAttemptMs) && now.getTime() - lastAttemptMs < 20 * 60 * 1000;
const blockedReasons = [];
if (companyIds.length === 0) blockedReasons.push('Missing Company relation.');
if (individualIds.length === 0) blockedReasons.push('Missing Individual relation.');
if (contactIds.length === 0) blockedReasons.push('Missing Contact relation.');
let action = 'claim';
let reason = '';
if (freshLock) { action = 'skip'; reason = 'Fresh Call Started lock exists from ' + lastAttemptAt + '.'; }
else if (status !== 'Reviewed' || !approved) { action = 'skip'; reason = 'Call is no longer eligible. Current status=' + (status || 'unknown') + ', approved=' + approved + '.'; }
else if (blockedReasons.length > 0) { action = 'blocked'; reason = blockedReasons.join(' '); }
const retryCount = Number(prop(call, 'Retry Count').number || 0) + 1;
const executionId = typeof $execution !== 'undefined' && $execution.id ? String($execution.id) : 'manual';
const lockToken = ['rb-call-lock', call.id || 'call', now.getTime(), executionId].join(':');
return { call_page_id: call.id || '', call_url: call.url || '', call_public_id: uniqueId(call), message_topic: messageTopic, owner_role: ownerRole, owner_name: ownerName, owner_notion_user_id: owner?.id || '', preflight_action: action, preflight_ready: action === 'claim', skip_call: action === 'skip', preflight_blocked: action === 'blocked', preflight_reason: reason, preflight_blocked_status: 'Rejected', company_page_id: companyIds[0] || '', individual_page_id: individualIds[0] || '', contact_page_id: contactIds[0] || '', retry_count: retryCount, attempt_started_at: nowIso, attempt_lock_token: lockToken };`,
    },
  },
});

const getCallOwner = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Call Owner',
    position: [-112, 0],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: PEOPLE_DIRECTORY_DATABASE_ID, mode: 'id', cachedResultName: 'People Directory' },
      returnAll: false,
      limit: 1,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Full Name|title', condition: 'equals', titleValue: '={{ $("Preflight Call Lock").item.json.owner_name || "__owner_not_resolved__" }}' }] },
      options: {},
    },
    alwaysOutputData: true,
  },
});

const attachOwnerRouting = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Attach Owner Routing',
    position: [144, 0],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const lock = $('Preflight Call Lock').item.json;
const ownerPage = $json || {};
function text(page, name) { const value = page?.properties?.[name] || {}; return (value.title || value.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
const ownerDirectoryName = text(ownerPage, 'Full Name');
const rawSlackId = text(ownerPage, 'Slack Member ID');
const slackId = rawSlackId.replace(/[<@>]/g, '').trim();
const ownerLabel = lock.owner_name || ownerDirectoryName || 'owner not resolved';
const ownerMention = slackId ? '<@' + slackId + '>' : (ownerLabel ? ownerLabel + ' (Slack ID not resolved)' : 'owner not resolved');
return { ...lock, owner_label: ownerLabel, owner_slack_member_id: slackId, owner_mention: ownerMention, owner_routing_source: slackId ? 'People Directory' : 'Notion person fallback' };`,
    },
  },
});

const preflightReady = ifElse({
  version: 2.3,
  config: {
    name: 'Preflight Ready To Claim?',
    position: [400, 0],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'preflight-ready', leftValue: '={{ $json.preflight_ready }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const claimCallAttemptLock = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Claim Call Attempt Lock',
    position: [672, -128],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: '={{ $json.call_page_id }}', mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: 'Call Started' },
          { key: 'Last Call Attempt At|date', date: '={{ $json.attempt_started_at }}' },
          { key: 'Retry Count|number', numberValue: '={{ $json.retry_count }}' },
          { key: 'Live Help Status|select', selectValue: 'None' },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: '' },
          { key: 'Twilio Call SID|rich_text', textContent: '' },
          { key: 'Voice Error|rich_text', textContent: '={{ $json.attempt_lock_token }}' },
        ],
      },
      options: {},
    },
  },
});

const rereadCallLock = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Re-read Call Lock',
    position: [960, -128],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: '={{ $("Attach Owner Routing").item.json.call_page_id }}', mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const verifyClaimedLock = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Verify Claimed Lock',
    position: [1232, -128],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const lock = $('Attach Owner Routing').item.json;
const page = $json || {};
function prop(page, name) { return page?.properties?.[name] || {}; }
function text(page, name) { const value = prop(page, name); return (value.rich_text || value.title || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function select(page, name) { const value = prop(page, name); return value.status?.name || value.select?.name || ''; }
const currentStatus = select(page, 'Call Status');
const voiceError = text(page, 'Voice Error');
const verified = currentStatus === 'Call Started' && voiceError.includes(lock.attempt_lock_token);
return { ...lock, lock_verified: verified, lock_skip_reason: verified ? '' : 'Attempt lock was lost before dialing. Current status=' + (currentStatus || 'unknown') + '.', current_call_status: currentStatus };`,
    },
  },
});

const lockStillOurs = ifElse({
  version: 2.3,
  config: {
    name: 'Lock Still Ours?',
    position: [1488, -128],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'lock-verified', leftValue: '={{ $json.lock_verified }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const getCompany = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Company',
    position: [1776, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: '={{ $("Attach Owner Routing").item.json.company_page_id }}', mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const getIndividual = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Individual',
    position: [2032, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: '={{ $("Attach Owner Routing").item.json.individual_page_id }}', mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const getContact = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Contact',
    position: [2288, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: '={{ $("Attach Owner Routing").item.json.contact_page_id }}', mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const getFilingRegistrations = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Filing Registrations',
    position: [2544, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: FILING_REGISTRATIONS_DATABASE_ID, mode: 'id', cachedResultName: 'Filing Registrations' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: '💼 Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Attach Owner Routing").item.json.company_page_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
  },
});

const getTaxPayments = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Tax Payments',
    position: [2800, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: TAX_PAYMENTS_DATABASE_ID, mode: 'id', cachedResultName: 'Tax payments' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Attach Owner Routing").item.json.company_page_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
  },
});

const getTaxPrepayments = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Tax Prepayments',
    position: [3056, -416],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: TAX_PREPAYMENTS_DATABASE_ID, mode: 'id', cachedResultName: 'Tax prepayments' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: '💼 Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Attach Owner Routing").item.json.company_page_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
  },
});

const buildLinkedRecordQueue = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Build Linked Record Queue',
    position: [3312, -416],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `function pageItems(nodeName) { try { return $(nodeName).all().map((item) => item.json).filter((page) => page && page.id && page.properties); } catch (error) { return []; } }
function propTitle(page) {
  for (const value of Object.values(page?.properties || {})) {
    if (value?.title) {
      const title = value.title.map((part) => part.plain_text || part.text?.content || '').join('').trim();
      if (title) return title;
    }
  }
  return page?.id || '';
}
function contextCategory(propertyName, sourceLabel, sourceTitle) {
  const hay = String(propertyName || '').toLowerCase();
  if (/call notes?/.test(hay)) return 'call_notes';
  if (/correspond|letter|mail|finanzamt/.test(hay)) return 'correspondence';
  if (/contract|agreement|engagement/.test(hay)) return 'contracts';
  if (/bank account|bank details|iban/.test(hay)) return 'bank_accounts';
  if (/tax payment|tax payments|prepayment|prepayments/.test(hay)) return 'tax_payments_prepayments';
  if (/tax registration|filing registration|registration/.test(hay)) return 'tax_registrations';
  if (/tax filing|tax filings|filings|filing|return|returns/.test(hay)) return 'tax_filings';
  if (/asset|assets/.test(hay)) return 'assets';
  return '';
}
function collectRelations(page, sourceLabel, queue, seen, exclude) {
  if (!page?.properties) return;
  const sourceTitle = propTitle(page);
  for (const [propertyName, property] of Object.entries(page.properties)) {
    const relations = property?.relation || [];
    if (!Array.isArray(relations) || relations.length === 0) continue;
    const category = contextCategory(propertyName, sourceLabel, sourceTitle);
    if (!category) continue;
    for (const relation of relations) {
      const id = relation?.id;
      if (!id || exclude.has(id) || seen.has(id)) continue;
      seen.add(id);
      queue.push({ json: { has_linked_record: true, linked_page_id: id, context_category: category, source_page_id: page.id || '', source_page_title: sourceTitle, source_page_label: sourceLabel, source_relation_property: propertyName } });
    }
  }
}
const call = $('Re-read Call Lock').item.json;
const company = $('Get Company').item.json;
const individual = $('Get Individual').item.json;
const contact = $('Get Contact').item.json;
const filingRegistrations = pageItems('Get Filing Registrations');
const taxPayments = pageItems('Get Tax Payments');
const taxPrepayments = pageItems('Get Tax Prepayments');
const sourcePages = [
  { page: call, label: 'Call' },
  { page: company, label: 'Company' },
  { page: individual, label: 'Individual' },
  { page: contact, label: 'Contact' },
  ...filingRegistrations.map((page) => ({ page, label: 'Filing Registration' })),
  ...taxPayments.map((page) => ({ page, label: 'Tax Payment' })),
  ...taxPrepayments.map((page) => ({ page, label: 'Tax Prepayment' })),
];
const exclude = new Set(sourcePages.map((entry) => entry.page?.id).filter(Boolean));
const seen = new Set();
const queue = [];
for (const entry of sourcePages) collectRelations(entry.page, entry.label, queue, seen, exclude);
if (queue.length === 0) return [{ json: { has_linked_record: false, linked_record_count: 0, allowed_context_categories: ['tax_registrations', 'tax_filings', 'contracts', 'correspondence', 'bank_accounts', 'tax_payments_prepayments', 'assets', 'call_notes'] } }];
return queue.map((item, index) => ({ json: { ...item.json, linked_record_index: index + 1, linked_record_count: queue.length } }));`,
    },
    output: [{ has_linked_record: true, linked_page_id: 'page_id', context_category: 'correspondence', source_relation_property: 'Correspondence' }],
  },
});

const hasLinkedRecords = ifElse({
  version: 2.3,
  config: {
    name: 'Has Linked Records?',
    position: [3568, -416],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'has-linked', leftValue: '={{ $json.has_linked_record }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const loopLinkedRecords = splitInBatches({
  version: 3,
  config: { name: 'Loop Linked Records', position: [3824, -544], parameters: { batchSize: 1, options: {} } },
});

const getLinkedRecord = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Linked Record',
    position: [4080, -544],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: '={{ $json.linked_page_id }}', mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const normalizeLinkedRecord = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Linked Record',
    position: [4336, -544],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const page = $json || {};
function rawNodeItems(nodeName) {
  const output = [];
  if (typeof $items !== 'function') return output;
  for (let runIndex = 0; runIndex < 1000; runIndex += 1) {
    try {
      const items = $items(nodeName, 0, runIndex);
      if (!Array.isArray(items) || items.length === 0) {
        if (runIndex > 0) break;
        continue;
      }
      output.push(...items.map((item) => item.json || {}).filter(Boolean));
    } catch (error) {
      break;
    }
  }
  return output;
}
const queueItems = rawNodeItems('Build Linked Record Queue');
const queueItem = queueItems.find((item) => item.linked_page_id === page.id) || {};
function richTextValue(value) { return (value?.title || value?.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function formulaValue(formula) { if (!formula || typeof formula !== 'object') return ''; if (formula.string !== undefined && formula.string !== null) return String(formula.string); if (formula.number !== undefined && formula.number !== null) return formula.number; if (formula.boolean !== undefined && formula.boolean !== null) return formula.boolean; if (formula.date?.start) return formula.date.start; return ''; }
function simplifyProperty(value) {
  if (!value || typeof value !== 'object') return undefined;
  if (value.title || value.rich_text) return richTextValue(value);
  if (value.select) return value.select.name;
  if (value.status) return value.status.name;
  if (value.multi_select) return value.multi_select.map((item) => item.name);
  if (typeof value.checkbox === 'boolean') return value.checkbox;
  if (typeof value.number === 'number') return value.number;
  if (value.date) return value.date?.start || '';
  if (value.phone_number) return value.phone_number;
  if (value.email) return value.email;
  if (value.url) return value.url;
  if (value.files) return undefined;
  if (value.relation) return value.relation.map((rel) => rel.id);
  if (value.people) return value.people.map((person) => ({ id: person.id, name: person.name || '', email: person.person?.email || '' }));
  if (value.unique_id) return value.unique_id;
  if (value.formula) return formulaValue(value.formula);
  if (value.rollup) {
    if (Array.isArray(value.rollup.array)) return value.rollup.array.map((entry) => simplifyProperty(entry)).filter((entry) => entry !== undefined && entry !== '');
    if (value.rollup.number !== undefined && value.rollup.number !== null) return value.rollup.number;
    if (value.rollup.date?.start) return value.rollup.date.start;
  }
  return undefined;
}
function compact(input) {
  const output = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    output[key] = value;
  }
  return output;
}
let title = '';
const properties = {};
let filePropertyCount = 0;
let relationPropertyCount = 0;
for (const [key, value] of Object.entries(page.properties || {})) {
  if (value?.title) title = richTextValue(value) || title;
  if (value?.files) filePropertyCount += value.files.length;
  if (value?.relation) relationPropertyCount += value.relation.length;
  const simplified = simplifyProperty(value);
  if (simplified !== undefined && simplified !== '') properties[key] = simplified;
}
return {
  linked_record: compact({
    page_id: page.id || queueItem.linked_page_id,
    url: page.url || '',
    title: title || page.id || queueItem.linked_page_id,
    source_page_id: queueItem.source_page_id || '',
    source_page_title: queueItem.source_page_title || '',
    source_page_label: queueItem.source_page_label || '',
    source_relation_property: queueItem.source_relation_property || '',
    context_category: queueItem.context_category || '',
    created_time: page.created_time || '',
    last_edited_time: page.last_edited_time || '',
    file_property_count: filePropertyCount,
    relation_property_count: relationPropertyCount,
    properties,
  }),
};`,
    },
    output: [{ linked_record: { title: 'Example correspondence', source_relation_property: 'Correspondence' } }],
  },
});

const buildVoicePayload = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Build Voice Payload',
    position: [4592, -256],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `function rawNodeItems(nodeName) {
  const output = [];
  if (typeof $items !== 'function') return output;
  for (let runIndex = 0; runIndex < 1000; runIndex += 1) {
    try {
      const items = $items(nodeName, 0, runIndex);
      if (!Array.isArray(items) || items.length === 0) {
        if (runIndex > 0) break;
        continue;
      }
      output.push(...items.map((item) => item.json).filter(Boolean));
    } catch (error) {
      break;
    }
  }
  return output;
}
function firstNodeItem(nodeName) { return rawNodeItems(nodeName)[0] || {}; }
const lock = firstNodeItem('Attach Owner Routing');
const call = firstNodeItem('Re-read Call Lock');
const company = firstNodeItem('Get Company');
const individual = firstNodeItem('Get Individual');
const contact = firstNodeItem('Get Contact');
function pageItems(nodeName) { return rawNodeItems(nodeName).filter((page) => page && page.id && page.properties); }
function nodeItems(nodeName) { return rawNodeItems(nodeName); }
const filingRegistrations = pageItems('Get Filing Registrations');
const taxPayments = pageItems('Get Tax Payments');
const taxPrepayments = pageItems('Get Tax Prepayments');
function inferRecordCategory(record) {
  const hay = String(record?.source_relation_property || '').toLowerCase();
  if (/call notes?/.test(hay)) return 'call_notes';
  if (/correspond|letter|mail|finanzamt/.test(hay)) return 'correspondence';
  if (/contract|agreement|engagement/.test(hay)) return 'contracts';
  if (/bank account|bank details|iban/.test(hay)) return 'bank_accounts';
  if (/tax payment|tax payments|prepayment|prepayments/.test(hay)) return 'tax_payments_prepayments';
  if (/tax registration|filing registration|registration/.test(hay)) return 'tax_registrations';
  if (/tax filing|tax filings|filings|filing|return|returns/.test(hay)) return 'tax_filings';
  if (/asset|assets/.test(hay)) return 'assets';
  return '';
}
const allowedLinkedCategories = new Set(['tax_registrations', 'tax_filings', 'contracts', 'correspondence', 'bank_accounts', 'tax_payments_prepayments', 'assets', 'call_notes']);
function dedupeRecords(records) {
  const seen = new Set();
  return records.filter((record) => {
    const key = [record.context_category || '', record.page_id || '', record.title || ''].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const linkedRecords = dedupeRecords(nodeItems('Normalize Linked Record')
  .map((item) => item.linked_record)
  .filter(Boolean)
  .map((record) => ({ ...record, context_category: record.context_category || inferRecordCategory(record) }))
  .filter((record) => allowedLinkedCategories.has(record.context_category)));
function prop(page, name) { return page?.properties?.[name] || {}; }
function richTextValue(value) { return (value?.title || value?.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function title(page, name) { return richTextValue(prop(page, name)); }
function formulaValue(formula) { if (!formula || typeof formula !== 'object') return ''; if (formula.string !== undefined && formula.string !== null) return String(formula.string); if (formula.number !== undefined && formula.number !== null) return String(formula.number); if (formula.boolean !== undefined && formula.boolean !== null) return String(formula.boolean); if (formula.date?.start) return formula.date.start; return ''; }
function simplifyProperty(value) { if (!value || typeof value !== 'object') return value; if (value.title) return richTextValue(value); if (value.rich_text) return richTextValue(value); if (value.select) return value.select.name; if (value.status) return value.status.name; if (value.multi_select) return value.multi_select.map((item) => item.name); if (typeof value.checkbox === 'boolean') return value.checkbox; if (typeof value.number === 'number') return value.number; if (value.date) return value.date?.start || value.date; if (value.phone_number) return value.phone_number; if (value.email) return value.email; if (value.url) return value.url; if (value.files) return undefined; if (value.relation) return value.relation.map((rel) => rel.id); if (value.people) return value.people.map((person) => ({ id: person.id, name: person.name || '', email: person.person?.email || '' })); if (value.unique_id) return value.unique_id; if (value.formula) return formulaValue(value.formula); if (value.rollup) return rollupValue(value.rollup); return undefined; }
function rollupValue(rollup) { if (!rollup || typeof rollup !== 'object') return ''; if (Array.isArray(rollup.array)) return rollup.array.map((entry) => simplifyProperty(entry)).filter((value) => value !== undefined && value !== '').flat().join(', '); if (rollup.number !== undefined && rollup.number !== null) return String(rollup.number); if (rollup.date?.start) return rollup.date.start; return ''; }
function text(page, name) { const value = prop(page, name); if (!value || typeof value !== 'object') return ''; if (value.type === 'title' || value.title) return richTextValue(value); if (value.type === 'rich_text' || value.rich_text) return richTextValue(value); if (value.type === 'phone_number' || value.phone_number) return value.phone_number || ''; if (value.type === 'email' || value.email) return value.email || ''; if (value.type === 'url' || value.url) return value.url || ''; if (value.type === 'formula' || value.formula) return formulaValue(value.formula); if (value.type === 'rollup' || value.rollup) return rollupValue(value.rollup); return ''; }
function checkbox(page, name) { return Boolean(prop(page, name).checkbox); }
function number(page, name) { const value = prop(page, name); return typeof value.number === 'number' ? value.number : null; }
function select(page, name) { const value = prop(page, name); return value.select?.name || value.status?.name || ''; }
function multiSelect(page, name) { return (prop(page, name).multi_select || []).map((item) => item.name); }
function files(page, name) { return (prop(page, name).files || []).map((file) => ({ name: file.name || '', type: file.type || '' })); }
function relationIds(page, name) { return (prop(page, name).relation || []).map((rel) => rel.id); }
function dateText(page, name) { return prop(page, name).date?.start || ''; }
function compactObject(input) { const output = {}; for (const [key, value] of Object.entries(input)) { if (value === undefined || value === null || value === '') continue; if (Array.isArray(value) && value.length === 0) continue; output[key] = value; } return output; }
function pageTitleFromProperties(page) {
  for (const value of Object.values(page?.properties || {})) {
    if (value?.title) {
      const valueText = richTextValue(value);
      if (valueText) return valueText;
    }
  }
  return page?.id || '';
}
function normalizedPageJson(page, label) {
  const properties = {};
  let filePropertyCount = 0;
  let relationPropertyCount = 0;
  for (const [key, value] of Object.entries(page?.properties || {})) {
    if (value?.files) filePropertyCount += value.files.length;
    if (value?.relation) relationPropertyCount += value.relation.length;
    const simplified = simplifyProperty(value);
    if (simplified !== undefined && simplified !== '') properties[key] = simplified;
  }
  return compactObject({
    page_id: page?.id || '',
    url: page?.url || '',
    title: pageTitleFromProperties(page),
    label,
    created_time: page?.created_time || '',
    last_edited_time: page?.last_edited_time || '',
    file_property_count: filePropertyCount,
    relation_property_count: relationPropertyCount,
    properties,
  });
}
function publicCompanyContext(page) { return compactObject({ legal_name: title(page, 'Legal Name') || title(page, 'Name'), reference: text(page, 'Reference'), register_number: text(page, 'Register Number'), incorporated_in: text(page, 'Incorporated in'), tax_residence: text(page, 'Tax Residence'), company_email: text(page, 'Company Email'), german_vat_number: text(page, 'German VAT No ') || text(page, 'German VAT No'), unique_taxpayer_reference: text(page, 'Unique Taxpayer Reference (UTR)'), tain: text(page, 'TAIN') }); }
function publicIndividualContext(page) { return compactObject({ name: [title(page, 'First name'), text(page, 'Last Name')].filter(Boolean).join(' ').trim() || title(page, 'Name'), email: text(page, 'Email'), phone: text(page, 'Phone'), tax_residence: text(page, 'Tax Residence'), nationality: text(page, 'Nationality') }); }
function publicContactContext(page) { return compactObject({ name: title(page, 'Name'), phone: text(page, 'Phone'), email: text(page, 'Email'), website: text(page, 'Website'), location: text(page, 'Location'), languages: multiSelect(page, 'Language(s)'), purpose: text(page, 'Purpose') }); }
function referenceFromRegistrationTitle(value) {
  const matches = String(value || '').match(/[A-Z]{0,4}[0-9][A-Z0-9]{4,}/gi) || [];
  return matches[0] || '';
}
function registrationSummary(page) {
  const name = title(page, 'Name');
  return compactObject({ name, type: select(page, 'Type'), jurisdiction: select(page, 'Jurisdiction'), status: select(page, 'Status'), reference_number: text(page, 'Company/Tax/Filing Number') || referenceFromRegistrationTitle(name), tax_payment_reference: text(page, 'Tax Payment Reference'), prepayment_payment_reference: text(page, 'Prepayment Payment Reference'), filing_cadence: select(page, 'Filing Cadence'), tax_payment_cadence: select(page, 'Tax Payment Cadence'), first_filing_date: dateText(page, 'First Filing Date'), due_date: dateText(page, 'Due Date'), transfer_payment_to: text(page, 'Transfer Prepayment / Payment To'), comments: text(page, 'Comments'), registration_file_count: files(page, 'Registration').length, deregistration_file_count: files(page, 'Deregistration').length });
}
function paymentSummary(page) { return compactObject({ name: title(page, 'Name'), status: select(page, 'Status (Do not touch!)'), amount: number(page, 'Payment'), due_date: dateText(page, 'Due Date'), payment_reference: text(page, 'Payment Refrence'), related_company: text(page, 'Related Company'), transfer_to_bank_details: text(page, 'Transfer to bank details'), document_count: files(page, 'Document').length, proof_count: files(page, 'Proof of payment').length }); }
function prepaymentSummary(page) { return compactObject({ name: title(page, 'Name'), status: select(page, 'Status'), amount: number(page, 'Payment'), due_date: dateText(page, 'Due Date'), payment_reference: text(page, 'Payment Refrence') || text(page, 'Base payment reference'), cadence: text(page, 'Cadence'), transfer_payment_to: text(page, 'Transfer payment to'), document_count: files(page, 'Document').length, proof_count: files(page, 'Proof of payment').length }); }
function relationCoverage(records) {
  const byRelation = {};
  const bySource = {};
  for (const record of records) {
    const relation = record.source_relation_property || 'unknown';
    const source = record.source_page_label || 'unknown';
    byRelation[relation] = (byRelation[relation] || 0) + 1;
    bySource[source] = (bySource[source] || 0) + 1;
  }
  return { by_relation_property: byRelation, by_source_page_label: bySource };
}
function findDateInRecord(record) {
  const candidates = [];
  for (const [key, value] of Object.entries(record.properties || {})) {
    const keyLower = key.toLowerCase();
    const maybeDate = typeof value === 'string' ? value : '';
    if ((keyLower.includes('date') || keyLower.includes('received') || keyLower.includes('sent') || keyLower.includes('created')) && maybeDate) candidates.push(maybeDate);
  }
  candidates.push(record.created_time || '', record.last_edited_time || '');
  return candidates.find((value) => Number.isFinite(Date.parse(value))) || '';
}
function isCorrespondence(record) {
  const hay = [record.title, record.source_relation_property, record.source_page_title, Object.keys(record.properties || {}).join(' ')].join(' ').toLowerCase();
  return hay.includes('correspond') || hay.includes('letter') || hay.includes('mail') || hay.includes('finanzamt');
}
function valueContainsId(value, id) {
  if (!id || value === undefined || value === null) return false;
  if (typeof value === 'string') return value === id;
  if (Array.isArray(value)) return value.some((entry) => valueContainsId(entry, id));
  if (typeof value === 'object') return Object.values(value).some((entry) => valueContainsId(entry, id));
  return false;
}
function valueHasUuid(value) {
  const textValue = typeof value === 'string' ? value : JSON.stringify(value || '');
  return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(textValue);
}
function recordMatchesSubjectCompany(record) {
  if (record.context_category === 'call_notes') return true;
  const companyId = lock.company_page_id || '';
  if (!companyId) return true;
  let sawCompanyRelation = false;
  for (const [key, value] of Object.entries(record.properties || {})) {
    const keyLower = key.toLowerCase();
    if (!keyLower.includes('company') && !key.includes('💼')) continue;
    if (!valueHasUuid(value)) continue;
    sawCompanyRelation = true;
    if (valueContainsId(value, companyId)) return true;
  }
  return !sawCompanyRelation;
}
function limitLinkedRecords(records) {
  const limits = { tax_registrations: 20, tax_filings: 24, contracts: 12, correspondence: 12, bank_accounts: 10, tax_payments_prepayments: 24, assets: 12, call_notes: 8 };
  const counts = {};
  const sorted = records
    .filter(recordMatchesSubjectCompany)
    .sort((a, b) => Date.parse(findDateInRecord(b) || 0) - Date.parse(findDateInRecord(a) || 0));
  return sorted.filter((record) => {
    const category = record.context_category || 'other';
    const limit = limits[category] || 8;
    counts[category] = counts[category] || 0;
    if (counts[category] >= limit) return false;
    counts[category] += 1;
    return true;
  });
}
const subjectLinkedRecords = limitLinkedRecords(linkedRecords);
const companyContext = publicCompanyContext(company);
const individualContext = publicIndividualContext(individual);
const contactContext = publicContactContext(contact);
const companyFullJson = normalizedPageJson(company, 'Company');
const individualFullJson = normalizedPageJson(individual, 'Individual');
const contactFullJson = normalizedPageJson(contact, 'Contact');
const registrationSummaries = filingRegistrations.map(registrationSummary).filter((item) => Object.keys(item).length);
const paymentSummaries = taxPayments.map(paymentSummary).filter((item) => Object.keys(item).length);
const prepaymentSummaries = taxPrepayments.map(prepaymentSummary).filter((item) => Object.keys(item).length);
const taxReferences = [];
function addTaxReference(input) { const value = String(input.value || '').trim(); if (!value) return; const key = [input.kind || '', input.jurisdiction || '', input.type || '', value].join('|').toLowerCase(); if (taxReferences.some((entry) => entry.key === key)) return; taxReferences.push(compactObject({ key, kind: input.kind, type: input.type, jurisdiction: input.jurisdiction, value, status: input.status, label: input.label, caution: input.caution })); }
addTaxReference({ kind: 'company_register', type: 'Company registration number', jurisdiction: companyContext.incorporated_in, value: companyContext.register_number, status: 'public company identifier' });
addTaxReference({ kind: 'company_tax', type: 'German V-A-T number', jurisdiction: 'DE', value: companyContext.german_vat_number, status: 'direct company field' });
addTaxReference({ kind: 'company_tax', type: 'Unique Taxpayer Reference', jurisdiction: companyContext.tax_residence, value: companyContext.unique_taxpayer_reference, status: 'direct company field' });
addTaxReference({ kind: 'company_tax', type: 'T-A-I-N', jurisdiction: companyContext.tax_residence, value: companyContext.tain, status: 'direct company field' });
for (const item of registrationSummaries) { addTaxReference({ kind: 'registration', type: item.type, jurisdiction: item.jurisdiction, value: item.reference_number, status: item.status, label: item.name, caution: item.jurisdiction === 'DE' && item.status !== 'Registered' ? 'Do not describe as active unless the authority confirms it.' : '' }); addTaxReference({ kind: 'payment_reference', type: item.type + ' payment reference', jurisdiction: item.jurisdiction, value: item.tax_payment_reference, status: item.status, label: item.name }); addTaxReference({ kind: 'prepayment_reference', type: item.type + ' prepayment reference', jurisdiction: item.jurisdiction, value: item.prepayment_payment_reference, status: item.status, label: item.name }); }
for (const item of paymentSummaries) addTaxReference({ kind: 'payment_reference', type: 'Tax payment reference', jurisdiction: '', value: item.payment_reference, status: item.status, label: item.name });
for (const item of prepaymentSummaries) addTaxReference({ kind: 'prepayment_reference', type: 'Tax prepayment reference', jurisdiction: '', value: item.payment_reference, status: item.status, label: item.name });
const cleanTaxReferences = taxReferences.map(({ key, ...rest }) => rest);
const taxReferenceSummaryText = cleanTaxReferences.length ? cleanTaxReferences.map((entry) => [entry.jurisdiction, entry.type, entry.value, entry.status ? '(' + entry.status + ')' : '', entry.caution || ''].filter(Boolean).join(' - ')).join(String.fromCharCode(10)) : 'No tax or authority reference number was found in the company, registration, payment, or prepayment records. Ask the call creator for the missing reference before guessing.';
const correspondenceRecords = subjectLinkedRecords.map((record) => ({ ...record, correspondence_date: findDateInRecord(record) })).filter((record) => record.context_category === 'correspondence' || isCorrespondence(record)).sort((a, b) => Date.parse(b.correspondence_date || 0) - Date.parse(a.correspondence_date || 0));
const latestCorrespondence = correspondenceRecords[0] || null;
const correspondenceContext = { count: correspondenceRecords.length, latest: latestCorrespondence, records: correspondenceRecords };
const latestCorrespondenceText = latestCorrespondence ? ['Latest correspondence/background date: ' + latestCorrespondence.correspondence_date, 'Record: ' + latestCorrespondence.title, 'From context: ' + [latestCorrespondence.source_page_label, latestCorrespondence.source_relation_property].filter(Boolean).join(' / ')].filter(Boolean).join(' - ') : 'No correspondence metadata was found in fetched background records.';
function stringValue(value, maxLength) {
  if (value === undefined || value === null || value === '') return '';
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}
function summarizeCallNote(record) {
  const properties = record.properties || {};
  return compactObject({
    date: findDateInRecord(record),
    title: record.title || '',
    event_type: stringValue(properties['Event Type'], 120),
    outcome_status: stringValue(properties['Outcome Status'], 120),
    summary: stringValue(properties.Summary || properties.Outcome, 1200),
    help_question: stringValue(properties['Help Question'], 800),
    help_answer: stringValue(properties['Help Answer'], 800),
    conversation_id: stringValue(properties['ElevenLabs Conversation ID'], 160),
    transcript_excerpt: stringValue(properties.Transcript, 1200),
  });
}
const callNoteRecords = subjectLinkedRecords.filter((record) => record.context_category === 'call_notes');
const callNoteSummaries = callNoteRecords.map(summarizeCallNote);
const callNotesText = callNoteSummaries.length
  ? callNoteSummaries.map((note, index) => {
    const lines = ['Call note ' + (index + 1) + ': ' + (note.title || 'Untitled')];
    if (note.date) lines.push('Date: ' + note.date);
    if (note.event_type) lines.push('Type: ' + note.event_type);
    if (note.outcome_status) lines.push('Outcome: ' + note.outcome_status);
    if (note.summary) lines.push('Summary: ' + note.summary);
    if (note.help_question) lines.push('Help question: ' + note.help_question);
    if (note.help_answer) lines.push('Help answer: ' + note.help_answer);
    if (note.transcript_excerpt) lines.push('Transcript excerpt: ' + note.transcript_excerpt);
    return lines.join(String.fromCharCode(10));
  }).join(String.fromCharCode(10) + String.fromCharCode(10))
  : 'No attached call notes were fetched.';
const linkedRecordLines = subjectLinkedRecords.filter((record) => record.context_category !== 'call_notes').map((record) => {
  const date = findDateInRecord(record);
  return [record.context_category, date, record.title, record.source_relation_property ? 'via ' + record.source_relation_property : '', record.source_page_title ? 'from ' + record.source_page_title : ''].filter(Boolean).join(' - ');
}).join(String.fromCharCode(10));
const subjectRaw = select(call, 'Subject');
const subject = subjectRaw === 'Company' ? 'Company' : 'Individual';
const poaRequired = checkbox(call, 'Requires PoA?');
const companyPoa = files(company, 'Company PoA');
const individualPoa = files(individual, 'Individual PoA');
const poaFiles = subject === 'Company' ? companyPoa : individualPoa;
const poaValid = !poaRequired || poaFiles.length > 0;
const relationValid = !company?.id || !individual?.id || JSON.stringify(company.properties || {}).includes(individual.id);
const phoneNumber = text(contact, 'Phone').replace(/[^+0-9]/g, '');
const languages = multiSelect(contact, 'Language(s)');
const language = languages.includes('German') ? 'de' : 'en';
const agentPhoneNumberId = (typeof $vars !== 'undefined' && $vars.ELEVENLABS_AGENT_PHONE_NUMBER_ID ? String($vars.ELEVENLABS_AGENT_PHONE_NUMBER_ID) : '').trim();
const companyName = companyContext.legal_name || title(company, 'Legal Name') || title(company, 'Name');
const individualName = individualContext.name || [title(individual, 'First name'), text(individual, 'Last Name')].filter(Boolean).join(' ').trim();
const contactName = contactContext.name || title(contact, 'Name');
const callerName = 'Alexander Gulin';
const representativeEntity = 'Richmond Blackwood Limited';
const representedSubject = subject === 'Company' ? companyName : individualName;
const representativeRole = subject === 'Company' ? 'Company secretary' : 'Representative caller';
const representationAuthority = subject === 'Company'
  ? representativeEntity + ' is the company secretary, which is a representative position for the company. Use this representative position before relying on a Power of Attorney or Vollmacht.'
  : representativeEntity + ' is assisting with the call on behalf of the individual. Use a Power of Attorney or Vollmacht only when the call is marked as requiring it or the authority specifically requires it.';
const poaSpeechRule = poaRequired
  ? 'Power of Attorney or Vollmacht is marked as required for this call. Use the validated subject-specific PoA context if the authority asks.'
  : 'Do not lead with Power of Attorney or Vollmacht. Use PoA only as a last resort if the authority specifically requires it for this request.';
const callPublicId = lock.call_public_id || call.id;
const messageTopic = lock.message_topic || text(call, 'Short reason') || text(call, 'Reason for call') || text(call, 'Main question') || 'Call execution';
const reasonForCall = text(call, 'Reason for call');
const mainQuestion = text(call, 'Main question');
const desiredOutcome = text(call, 'Desired outcome');
const owner = { role: lock.owner_role || '', name: lock.owner_label || lock.owner_name || '', slack_member_id: lock.owner_slack_member_id || '', mention: lock.owner_mention || 'owner not resolved', routing_source: lock.owner_routing_source || '' };
const relatedContext = { company: companyFullJson, individual: individualFullJson, contact: contactFullJson, allowed_linked_record_categories: Array.from(allowedLinkedCategories), tax_references: cleanTaxReferences, registrations: registrationSummaries.slice(0, 50), tax_payments: paymentSummaries.slice(0, 50), tax_prepayments: prepaymentSummaries.slice(0, 50), call_notes: callNoteSummaries, linked_records: subjectLinkedRecords, correspondence: correspondenceContext, correspondence_records: correspondenceRecords, latest_correspondence: latestCorrespondence, relation_coverage: relationCoverage(subjectLinkedRecords), counts: { registrations: filingRegistrations.length, tax_payments: taxPayments.length, tax_prepayments: taxPrepayments.length, linked_records_raw: linkedRecords.length, linked_records_sent: subjectLinkedRecords.length, correspondence_records: correspondenceRecords.length, call_notes_relation_count: relationIds(call, 'Call Notes').length, call_notes_fetched: callNoteSummaries.length } };
const structuredContextJson = JSON.stringify({ company: companyFullJson, individual: individualFullJson, contact: contactFullJson, correspondence: correspondenceContext });
const publicSafeBrief = ['Caller name: ' + callerName, representedSubject ? 'After the static greeting, say: I am calling on behalf of ' + representedSubject + '. Do not mention ' + representativeEntity + ' before the represented subject is clear.' : '', 'Represented subject: ' + [representedSubject, subject === 'Company' && companyContext.register_number ? 'company number ' + companyContext.register_number : ''].filter(Boolean).join(', '), 'Representative role: ' + representativeRole + '. ' + representationAuthority, 'Power of Attorney handling: ' + poaSpeechRule, subject === 'Company' && individualName ? 'Relevant person: ' + individualName : '', contactName ? 'Calling: ' + contactName : '', reasonForCall ? 'Reason for call: ' + reasonForCall : '', mainQuestion ? 'Main question: ' + mainQuestion : '', desiredOutcome ? 'Desired outcome: ' + desiredOutcome : '', 'Tax and authority references available if asked:', taxReferenceSummaryText, callNoteSummaries.length ? 'Attached call notes for private background. Use them to avoid repeating past mistakes, but do not mention internal systems, tools, Slack, n8n, ElevenLabs, or workflow/debug details to the authority:' + String.fromCharCode(10) + callNotesText : '', linkedRecordLines ? 'Additional allowed background records:' + String.fromCharCode(10) + linkedRecordLines : '', 'Full direct Company, Individual, Contact, correspondence, and linked-record JSON is available in focused dynamic variables. Use those fields for private reasoning only; do not read JSON keys aloud and do not mention internal source labels.', 'Call handling: spell abbreviations letter by letter. When speaking raw numbers, registration numbers, tax references, or alphanumeric identifiers, preserve the exact value and say it much, much slower than normal speech. Use tiny chunks, clear pauses, and breaks between every chunk. Spell letters one by one with pauses. Do not invent, rewrite, or publicly mention internal formatting rules.', 'Do not describe a German registration as currently active unless the authority confirms it during the call. If a required detail is missing or uncertain, ask the call creator for help instead of guessing.', 'Do not mention internal systems, workflow state, tools, database names, source labels, or private operator notes.'].filter(Boolean).join(String.fromCharCode(10));
const privateContext = { generated_at: new Date().toISOString(), call: { id: call.id || '', url: call.url || '', public_id: callPublicId, subject, reason_for_call: reasonForCall, main_question: mainQuestion, desired_outcome: desiredOutcome }, caller: { name: callerName, representative_entity: representativeEntity, represented_subject: representedSubject, representative_role: representativeRole, representation_authority: representationAuthority, poa_speech_rule: poaSpeechRule }, owner, company: companyFullJson, individual: individualFullJson, contact: contactFullJson, company_summary: companyContext, individual_summary: individualContext, contact_summary: contactContext, poa: { required: poaRequired, subject, company_poa_file_count: companyPoa.length, individual_poa_file_count: individualPoa.length, selected_poa_file_count: poaFiles.length, one_file_required: true }, related_context: relatedContext, attempt_lock: { token: lock.attempt_lock_token, started_at: lock.attempt_started_at, retry_count: lock.retry_count } };
const linkedContextJson = JSON.stringify(relatedContext);
const allLinkedRecordsJson = JSON.stringify(subjectLinkedRecords);
const contextPackForVoice = publicSafeBrief.slice(0, 12000);
const pastCallNotesForVoice = callNotesText.slice(0, 6000);
const blockedReasons = [];
if (!phoneNumber || !phoneNumber.startsWith('+')) blockedReasons.push('Contact phone number must be present in E.164 format.');
if (!agentPhoneNumberId) blockedReasons.push('n8n variable ELEVENLABS_AGENT_PHONE_NUMBER_ID is missing.');
if (!poaValid) blockedReasons.push(subject === 'Company' ? 'Company PoA is required and no Company PoA file is present.' : 'Individual PoA is required and no Individual PoA file is present.');
if (!relationValid) blockedReasons.push('Individual is not linked to the selected Company.');
return [{ json: { ...lock, ready: blockedReasons.length === 0, blocked_reason: blockedReasons.join(' '), blocked_status: blockedReasons.some((reason) => reason.includes('PoA') || reason.includes('not linked')) ? 'Rejected' : 'Reviewed', retry_count: lock.retry_count, to_number: phoneNumber, message_topic: messageTopic, owner_mention: owner.mention, owner_slack_member_id: owner.slack_member_id, owner_label: owner.name, tax_reference_summary: taxReferenceSummaryText, latest_correspondence_summary: latestCorrespondenceText, correspondence_context_json: JSON.stringify(correspondenceContext), latest_correspondence_json: JSON.stringify(latestCorrespondence || {}), call_notes_summary: callNotesText, related_context_json: linkedContextJson, private_context_json: JSON.stringify(privateContext), context_pack_text: publicSafeBrief.slice(0, 1900), linked_records_raw_count: linkedRecords.length, linked_records_sent_count: subjectLinkedRecords.length, elevenlabs_body: { agent_id: '${RB_AGENT_ID}', agent_phone_number_id: agentPhoneNumberId || 'MISSING_ELEVENLABS_AGENT_PHONE_NUMBER_ID', to_number: phoneNumber || 'MISSING_CONTACT_PHONE', call_recording_enabled: false, conversation_initiation_client_data: { type: 'conversation_initiation_client_data', dynamic_variables: { language, caller_name: callerName, representative_entity: representativeEntity, represented_subject: representedSubject, representative_role: representativeRole, representation_authority: representationAuthority, poa_speech_rule: poaSpeechRule, company: companyName, individual: individualName, contact: contactName, reason_for_call: reasonForCall, main_question: mainQuestion, desired_outcome: desiredOutcome, message_topic: messageTopic, owner_name: owner.name, owner_role: owner.role, owner_mention: owner.mention, owner_slack_member_id: owner.slack_member_id, poa_required: poaRequired, poa_validated: poaValid, poa_subject: subject, subject, call_url: call.url, call_id: call.id, call_public_id: callPublicId, live_help_request_id: 'not_started', live_help_slack_thread_ts: 'not_started', live_help_note_page_id: 'not_started', live_help_expires_at: '1970-01-01T00:00:00.000Z', live_help_status: 'not_requested', live_help_answer: 'not_answered', tax_reference_summary: taxReferenceSummaryText, latest_correspondence_summary: latestCorrespondenceText, correspondence_context_json: JSON.stringify(correspondenceContext), latest_correspondence_json: JSON.stringify(latestCorrespondence || {}), call_notes_summary: callNotesText, call_notes_context_json: JSON.stringify(callNoteSummaries), allowed_linked_record_categories: Array.from(allowedLinkedCategories).join(', '), relation_coverage_json: JSON.stringify(relatedContext.relation_coverage), company_context_json: JSON.stringify(companyFullJson), individual_context_json: JSON.stringify(individualFullJson), contact_context_json: JSON.stringify(contactFullJson), company_summary_json: JSON.stringify(companyContext), individual_summary_json: JSON.stringify(individualContext), contact_summary_json: JSON.stringify(contactContext), structured_context_json: structuredContextJson, linked_context_json: linkedContextJson, all_linked_records_json: allLinkedRecordsJson, context_pack: contextPackForVoice, past_call_notes: pastCallNotesForVoice } } } } }];`,
    },
    output: [{
      ready: true,
      call_public_id: 'RBCALL-1',
      call_page_id: 'call_page_id',
      call_url: 'https://www.notion.so/example-call',
      owner_mention: '<@U123>',
      message_topic: 'Call execution',
      blocked_reason: '',
      blocked_status: 'Reviewed',
      latest_correspondence_summary: 'Latest correspondence/background date: 2026-05-01',
      elevenlabs_body: { agent_id: RB_AGENT_ID, to_number: '+353000000000' },
    }],
  },
});

const limitStartupContext = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Limit Startup Context',
    position: [4848, -256],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const payload = { ...($json || {}) };
const body = { ...(payload.elevenlabs_body || {}) };
const clientData = { ...(body.conversation_initiation_client_data || {}) };
const vars = { ...(clientData.dynamic_variables || {}) };
function parseJson(value, fallback) {
  if (value && typeof value === 'object') return value;
  if (!value) return fallback;
  try { return JSON.parse(String(value)); } catch (error) { return fallback; }
}
function pickTaxFields(pageJson) {
  const properties = pageJson?.properties || {};
  const output = {};
  for (const [key, value] of Object.entries(properties)) {
    const hay = key.toLowerCase();
    if (!hay.includes('tax') && !hay.includes('vat') && !hay.includes('v-a-t') && !hay.includes('utr') && !hay.includes('tain') && !hay.includes('steuernummer') && !hay.includes('steuer') && !hay.includes('registration') && !hay.includes('register')) continue;
    output[key] = value;
  }
  return output;
}
function take(name) {
  if (Object.prototype.hasOwnProperty.call(vars, name)) return vars[name];
  return '';
}
const companyJson = parseJson(vars.company_context_json || payload.company_context_json, {});
const individualJson = parseJson(vars.individual_context_json || payload.individual_context_json, {});
const contactJson = parseJson(vars.contact_context_json || payload.contact_context_json, {});
const relatedContext = parseJson(payload.related_context_json || vars.linked_context_json, {});
const taxRegistrationContext = {
  company_tax_registrations: Array.isArray(relatedContext.registrations) ? relatedContext.registrations : [],
  company_tax_references: Array.isArray(relatedContext.tax_references) ? relatedContext.tax_references : [],
  company_tax_fields: pickTaxFields(companyJson),
  individual_tax_fields: pickTaxFields(individualJson),
};
const lookupAllowedCategories = ['tax_registrations', 'tax_filings', 'contracts', 'correspondence', 'bank_accounts', 'tax_payments_prepayments', 'assets', 'call_notes'];
function scalar(value) {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.map(scalar).filter(Boolean).join(', ');
  if (typeof value === 'object') return '';
  return String(value).replace(/[^\\x09\\x0A\\x0D\\x20-\\x7E]/g, '').replace(/[ \\t]+/g, ' ').trim();
}
function asciiText(value) { return String(value || '').replace(/[^\\x09\\x0A\\x0D\\x20-\\x7E]/g, '').replace(/[ \\t]+/g, ' ').trim(); }
function properties(pageJson) { return pageJson && typeof pageJson === 'object' ? (pageJson.properties || {}) : {}; }
function line(label, value) {
  const text = scalar(value);
  return text ? label + ': ' + text : '';
}
function pageLine(label, pageJson, keys) {
  const props = properties(pageJson);
  const lines = [line(label + ' name', pageJson.title)];
  for (const key of keys) lines.push(line(label + ' ' + key, props[key]));
  return lines.filter(Boolean);
}
function objectLines(prefix, input, limit = 20) {
  const output = [];
  for (const [key, value] of Object.entries(input || {})) {
    const text = scalar(value);
    if (!text) continue;
    output.push(prefix + ' ' + key + ': ' + text);
    if (output.length >= limit) break;
  }
  return output;
}
function registrationLines(items) {
  return (Array.isArray(items) ? items : []).slice(0, 12).map((item, index) => [
    'Tax registration ' + (index + 1),
    scalar(item.jurisdiction),
    scalar(item.type),
    scalar(item.reference_number),
    scalar(item.status),
  ].filter(Boolean).join(' - '));
}
const plainStartupLines = [
  ...pageLine('Company', companyJson, ['Legal Name', 'Reference', 'Register Number', 'Incorporated in', 'Tax Residence', 'German VAT No ', 'German VAT No', 'Unique Taxpayer Reference (UTR)', 'TAIN']),
  ...registrationLines(taxRegistrationContext.company_tax_registrations),
  ...objectLines('Company tax field', taxRegistrationContext.company_tax_fields, 16),
  ...objectLines('Individual tax field', taxRegistrationContext.individual_tax_fields, 16),
  ...pageLine('Individual', individualJson, ['First name', 'Last Name', 'Email', 'Phone', 'Tax Residence', 'Nationality']),
  ...pageLine('Contact', contactJson, ['Name', 'Phone', 'Email', 'Website', 'Location', 'Language(s)', 'Purpose']),
];
const startupBrief = [
  'Startup context includes this plain text summary plus direct Company, Individual, Contact, and tax-registration JSON variables for private reasoning.',
  'Caller name: ' + take('caller_name'),
  'Represented subject: ' + take('represented_subject'),
  'Representative role: ' + take('representative_role') + '. ' + take('representation_authority'),
  'Power of Attorney handling: ' + take('poa_speech_rule'),
  'Reason for call: ' + take('reason_for_call'),
  'Main question: ' + take('main_question'),
  'Desired outcome: ' + take('desired_outcome'),
  'Tax and authority references available if asked:',
  take('tax_reference_summary'),
  'Direct startup context:',
  plainStartupLines.join(String.fromCharCode(10)),
  'For tax registrations, tax filings, contracts, correspondence, bank accounts, tax payments/prepayments, assets, or call notes, use lookup_call_context with a specific allowed category and focused query before guessing.',
  'Use lookup results privately. Never mention Notion, n8n, tools, internal database names, source labels, Slack, workflow state, JSON, or debug details to the authority.',
  'Call handling: spell abbreviations letter by letter. Speak numbers, registration numbers, tax references, and alphanumeric identifiers much slower than normal speech, in tiny chunks with clear pauses.',
].filter(Boolean).map(asciiText).filter(Boolean).join(String.fromCharCode(10)).slice(0, 6000);
const keep = [
  'language',
  'caller_name',
  'representative_entity',
  'represented_subject',
  'representative_role',
  'representation_authority',
  'poa_speech_rule',
  'company',
  'individual',
  'contact',
  'reason_for_call',
  'main_question',
  'desired_outcome',
  'message_topic',
  'owner_name',
  'owner_role',
  'owner_mention',
  'owner_slack_member_id',
  'poa_required',
  'poa_validated',
  'poa_subject',
  'subject',
  'call_url',
  'call_id',
  'call_public_id',
  'live_help_request_id',
  'live_help_slack_thread_ts',
  'live_help_note_page_id',
  'live_help_expires_at',
  'live_help_status',
  'live_help_answer',
  'tax_reference_summary',
];
const minimal = {};
for (const name of keep) minimal[name] = take(name);
minimal.lookup_allowed_categories = lookupAllowedCategories.join(', ');
minimal.context_pack = startupBrief;
minimal.company_context_json = JSON.stringify(companyJson);
minimal.individual_context_json = JSON.stringify(individualJson);
minimal.contact_context_json = JSON.stringify(contactJson);
minimal.tax_registration_context_json = JSON.stringify(taxRegistrationContext);
clientData.dynamic_variables = minimal;
body.conversation_initiation_client_data = clientData;
payload.elevenlabs_body = body;
payload.context_pack_text = startupBrief.slice(0, 6000);
payload.startup_context_policy = 'direct_subject_json_with_on_demand_notion_lookup';
payload.startup_dynamic_variable_names = Object.keys(minimal).sort().join(', ');
payload.startup_dynamic_variable_count = Object.keys(minimal).length;
payload.linked_records_sent_count = 0;
payload.linked_records_raw_count = 0;
return payload;`,
    },
    output: [{
      ready: true,
      call_public_id: 'RBCALL-1',
      call_url: 'https://www.notion.so/example-call',
      call_page_id: 'call_page_id',
      blocked_reason: '',
      message_topic: 'Call execution',
      owner_mention: '<@U123>',
      elevenlabs_body: { agent_id: RB_AGENT_ID, to_number: '+353000000000' },
      startup_context_policy: 'direct_subject_json_with_on_demand_notion_lookup',
      startup_dynamic_variable_count: 46,
    }],
  },
});

const readyToCall = ifElse({
  version: 2.3,
  config: {
    name: 'Ready To Call?',
    position: [5104, -256],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'ready', leftValue: '={{ $json.ready }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const makeOutboundCall = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Make ElevenLabs Outbound Call',
    position: [5376, -400],
    credentials: { elevenLabsApi: newCredential('ElevenLabs account 2') },
    parameters: {
      method: 'POST',
      url: 'https://api.elevenlabs.io/v1/convai/twilio/outbound-call',
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'elevenLabsApi',
      sendHeaders: true,
      headerParameters: { parameters: [{ name: 'Content-Type', value: 'application/json' }] },
      sendBody: true,
      specifyBody: 'json',
      jsonBody: '={{ $("Limit Startup Context").item.json.elevenlabs_body }}',
      options: { response: { response: { fullResponse: true, neverError: true, responseFormat: 'json' } }, timeout: 30000 },
    },
  },
});

const normalizeElevenLabsResponse = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize ElevenLabs Response',
    position: [5664, -400],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const payload = $('Limit Startup Context').item.json;
const response = $json || {};
let body = response.body !== undefined ? response.body : response;
if (typeof body === 'string') { try { body = JSON.parse(body); } catch (error) { body = { raw: body }; } }
function firstString(paths) { for (const value of paths) { if (value !== undefined && value !== null && String(value).trim()) return String(value).trim(); } return ''; }
const statusCode = Number(response.statusCode || response.status || response.response?.statusCode || 0);
const conversationId = firstString([body.conversation_id, body.conversationId, body.conversation?.id, body.data?.conversation_id, body.data?.conversationId]);
const twilioCallSid = firstString([body.callSid, body.call_sid, body.twilio_call_sid, body.sip_call_id, body.sipCallId, body.data?.callSid, body.data?.call_sid]);
const httpFailed = statusCode >= 400;
const successFlag = body.success === true || body.status === 'success' || body.ok === true;
const returnedCallReference = Boolean(conversationId || twilioCallSid);
const callStarted = !httpFailed && (successFlag || returnedCallReference);
const errorSummary = callStarted ? '' : JSON.stringify({ statusCode: statusCode || 'unknown', body }).slice(0, 1900);
return { ...payload, elevenlabs_status_code: statusCode || '', elevenlabs_success: callStarted, call_status: callStarted ? 'Call Started' : 'Call Unanswered', elevenlabs_conversation_id: conversationId, twilio_call_sid: twilioCallSid, voice_error: errorSummary, response_body_excerpt: JSON.stringify(body).slice(0, 1900) };`,
    },
  },
});

const storeVoiceIds = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Store Voice IDs',
    position: [5936, -400],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: '={{ $("Normalize ElevenLabs Response").item.json.call_page_id }}', mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: '={{ $("Normalize ElevenLabs Response").item.json.call_status }}' },
          { key: 'ElevenLabs Conversation ID|rich_text', textContent: '={{ $("Normalize ElevenLabs Response").item.json.elevenlabs_conversation_id }}' },
          { key: 'Twilio Call SID|rich_text', textContent: '={{ $("Normalize ElevenLabs Response").item.json.twilio_call_sid }}' },
          { key: 'Voice Error|rich_text', textContent: '={{ $("Normalize ElevenLabs Response").item.json.voice_error }}' },
        ],
      },
      options: {},
    },
  },
});

const markBlocked = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Mark Blocked',
    position: [5376, -80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: '={{ $json.call_page_id }}', mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: '={{ $json.blocked_status }}' },
          { key: 'Voice Error|rich_text', textContent: '={{ $json.blocked_reason }}' },
          { key: 'Context Pack|rich_text', textContent: '={{ $json.context_pack_text }}' },
        ],
      },
      options: {},
    },
  },
});

const skipLostLock = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'Skip Lost Lock', position: [1776, 80], parameters: {} },
});

const skipExistingOrIneligible = ifElse({
  version: 2.3,
  config: {
    name: 'Skip Existing Lock Or Ineligible?',
    position: [672, 272],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'skip-call', leftValue: '={{ $json.skip_call }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const skipLockedOrIneligible = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'Skip Locked Or Ineligible Call', position: [960, 160], parameters: {} },
});

const markPreflightBlocked = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Mark Preflight Blocked',
    position: [960, 368],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'update',
      pageId: { __rl: true, value: '={{ $json.call_page_id }}', mode: 'id' },
      simple: false,
      propertiesUi: {
        propertyValues: [
          { key: 'Call Status|status', statusValue: '={{ $json.preflight_blocked_status }}' },
          { key: 'Voice Error|rich_text', textContent: '={{ $json.preflight_reason }}' },
        ],
      },
      options: {},
    },
  },
});

export default workflow('rb-calls-voice-execution', 'RB Calls Voice Execution')
  .add(sticky('Runs reviewed and approved Notion Calls through ElevenLabs. Startup context is rebuilt as a plain-text brief with direct Company/Individual/Contact summaries and tax registration/reference context; raw JSON blobs are stripped before the outbound call. Other approved context categories must be fetched on demand through the separate RB Calls Context Lookup webhook tool. Routine call starts, blockers, and state changes are recorded in Notion only; Slack is reserved for live human-help requests.', [every15Minutes, buildVoicePayload, storeVoiceIds], { color: 5, width: 7200, height: 900 }))
  .add(every15Minutes)
  .to(getReviewedCalls)
  .to(
    loopReviewedCalls
      .onDone(done)
      .onEachBatch(
        preflightCallLock
          .to(getCallOwner)
          .to(attachOwnerRouting)
          .to(
            preflightReady
              .onTrue(
                claimCallAttemptLock
                  .to(rereadCallLock)
                  .to(verifyClaimedLock)
                  .to(
                    lockStillOurs
                      .onTrue(
                        getCompany
                          .to(getIndividual)
                          .to(getContact)
                          .to(getFilingRegistrations)
                          .to(buildVoicePayload)
                          .to(limitStartupContext)
                          .to(
                            readyToCall
                              .onTrue(makeOutboundCall.to(normalizeElevenLabsResponse).to(storeVoiceIds).to(nextBatch(loopReviewedCalls)))
                              .onFalse(markBlocked.to(nextBatch(loopReviewedCalls))),
                          ),
                      )
                      .onFalse(skipLostLock.to(nextBatch(loopReviewedCalls))),
                  ),
              )
              .onFalse(
                skipExistingOrIneligible
                  .onTrue(skipLockedOrIneligible.to(nextBatch(loopReviewedCalls)))
                  .onFalse(markPreflightBlocked.to(nextBatch(loopReviewedCalls))),
              ),
          ),
      ),
  );
