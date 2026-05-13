import {
  expr,
  ifElse,
  newCredential,
  node,
  sticky,
  switchCase,
  trigger,
  workflow,
} from '@n8n/workflow-sdk';

const CALLS_DATABASE_ID = '342e4130-1314-8012-964a-d969a860dd93';
const CALL_NOTES_DATABASE_ID = '342e4130-1314-8016-8ced-d60cbf9fe9bf';
const FILING_REGISTRATIONS_DATABASE_ID = 'ecaf96a4-cf77-409a-b481-aaf317442b74';
const FILINGS_DATABASE_ID = 'f9af3b86-b2a3-430d-8c48-c8b0567091e7';
const PERSONAL_TAX_FILINGS_DATABASE_ID = '206e4130-1314-8004-93d2-e00f69621528';
const CONTRACTS_DATABASE_ID = 'bb3139d0-a505-44bd-9ad0-7ed497112be6';
const CORRESPONDENCE_DATABASE_ID = '1b5e4130-1314-80ab-84f3-cca356736807';
const BANK_ACCOUNTS_DATABASE_ID = '73fd1c70-bd2a-41a9-a70f-ee539d4d4add';
const TAX_PAYMENTS_DATABASE_ID = '1fae4130-1314-8099-907c-f544585f1b5b';
const TAX_PREPAYMENTS_DATABASE_ID = '162e4130-1314-803d-800a-cef0a0719d01';
const ASSETS_DATABASE_ID = '353e4130-1314-80b3-9c78-ff7c8219c247';
const ELEVENLABS_WEBHOOK_IPS = '34.67.146.145,34.59.11.47,35.204.38.71,34.147.113.54,35.185.187.110,35.247.157.189,34.77.234.246,34.140.184.144,34.93.26.174,34.93.252.69';

const lookupWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'ElevenLabs Context Lookup Webhook',
    position: [-1120, 0],
    parameters: {
      httpMethod: 'POST',
      path: 'rb-calls-context-lookup',
      authentication: 'none',
      responseMode: 'responseNode',
      options: {
        ipWhitelist: ELEVENLABS_WEBHOOK_IPS,
      },
    },
  },
  output: [{
    body: {
      category: 'correspondence',
      query: 'latest Finanzamt letter',
      call_id: 'call_page_id',
      call_public_id: 'RBCALL-1',
      limit: 5,
    },
  }],
});

const normalizeLookupRequest = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Lookup Request',
    position: [-864, 0],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const body = $json.body || {};
const dynamic = body.dynamic_variables || body.conversation_initiation_client_data?.dynamic_variables || {};
const allowed = ['tax_registrations', 'tax_filings', 'contracts', 'correspondence', 'bank_accounts', 'tax_payments_prepayments', 'assets', 'call_notes'];
const aliases = {
  tax_registration: 'tax_registrations',
  tax_registrations: 'tax_registrations',
  taxregistrations: 'tax_registrations',
  registrations: 'tax_registrations',
  registration: 'tax_registrations',
  tax_filing: 'tax_filings',
  tax_filings: 'tax_filings',
  filings: 'tax_filings',
  filing: 'tax_filings',
  returns: 'tax_filings',
  return: 'tax_filings',
  contracts: 'contracts',
  contract: 'contracts',
  agreements: 'contracts',
  agreement: 'contracts',
  correspondence: 'correspondence',
  correspondences: 'correspondence',
  correspondance: 'correspondence',
  letters: 'correspondence',
  letter: 'correspondence',
  mail: 'correspondence',
  bank_accounts: 'bank_accounts',
  bank_account: 'bank_accounts',
  bank: 'bank_accounts',
  iban: 'bank_accounts',
  tax_payments: 'tax_payments_prepayments',
  tax_payment: 'tax_payments_prepayments',
  prepayments: 'tax_payments_prepayments',
  prepayment: 'tax_payments_prepayments',
  payments: 'tax_payments_prepayments',
  payment: 'tax_payments_prepayments',
  assets: 'assets',
  asset: 'assets',
  call_notes: 'call_notes',
  call_note: 'call_notes',
  notes: 'call_notes',
  note: 'call_notes',
};
function normalizeCategory(value) {
  const key = String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return aliases[key] || '';
}
const category = normalizeCategory(body.category || body.allowed_category || body.kind || body.topic);
const callId = String(body.call_id || body.call_page_id || dynamic.call_id || '').trim();
const limitRaw = Number(body.limit || body.max_records || 5);
const limit = Math.max(1, Math.min(Number.isFinite(limitRaw) ? limitRaw : 5, 12));
const validation = [];
if (!callId) validation.push('Missing call_id.');
if (!category) validation.push('Category must be one of: ' + allowed.join(', ') + '.');
return {
  valid: validation.length === 0,
  validation_error: validation.join(' '),
  category,
  query: String(body.query || body.question || body.search || '').trim().slice(0, 500),
  call_id: callId,
  call_public_id: String(body.call_public_id || dynamic.call_public_id || '').trim(),
  call_url: String(body.call_url || dynamic.call_url || '').trim(),
  conversation_id: String(body.conversation_id || body.system__conversation_id || dynamic.system__conversation_id || '').trim(),
  limit,
  allowed_categories: allowed,
};`,
    },
    output: [{ valid: true, validation_error: '', category: 'correspondence', call_id: 'call_page_id', allowed_categories: ['correspondence'], limit: 5 }],
  },
});

const requestIsValid = ifElse({
  version: 2.3,
  config: {
    name: 'Request Is Valid?',
    position: [-608, 0],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
        conditions: [{ id: 'valid', leftValue: '={{ $json.valid }}', rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
      options: {},
    },
  },
});

const getCall = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Get Call',
    position: [-352, -160],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'get',
      pageId: { __rl: true, value: expr('{{ $("Normalize Lookup Request").item.json.call_id }}'), mode: 'id' },
      simple: false,
    },
    alwaysOutputData: true,
  },
});

const normalizeScope = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalize Scope',
    position: [-96, -160],
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: `const request = $('Normalize Lookup Request').item.json;
const call = $json || {};
const noPage = '00000000-0000-0000-0000-000000000000';
function prop(page, name) { return page?.properties?.[name] || {}; }
function relationId(page, name) { return (prop(page, name).relation || []).map((rel) => rel.id).filter(Boolean)[0] || ''; }
function richText(value) { return (value.title || value.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim(); }
function text(page, name) { return richText(prop(page, name)); }
function uniqueId(page) {
  const value = prop(page, 'ID').unique_id;
  return value ? [value.prefix, value.number].filter((part) => part !== undefined && part !== null && String(part) !== '').join('-') : page.id;
}
const companyPageId = relationId(call, 'Company');
const individualPageId = relationId(call, 'Individual');
return {
  ...request,
  call_page_id: call.id || request.call_id,
  call_url: call.url || request.call_url,
  call_public_id: request.call_public_id || uniqueId(call),
  company_page_id: companyPageId,
  individual_page_id: individualPageId,
  company_filter_id: companyPageId || noPage,
  individual_filter_id: individualPageId || noPage,
  message_topic: text(call, 'Short reason') || text(call, 'Reason for call') || text(call, 'Main question') || 'Call context lookup',
};`,
    },
    output: [{
      category: 'correspondence',
      call_page_id: 'call_page_id',
      company_filter_id: 'company_page_id',
      individual_filter_id: 'individual_page_id',
    }],
  },
});

const routeLookupCategory = switchCase({
  version: 3.2,
  config: {
    name: 'Route Lookup Category',
    position: [192, -160],
    parameters: {
      rules: {
        values: [
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'tax-registrations', leftValue: '={{ $json.category }}', rightValue: 'tax_registrations', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'tax_registrations',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'tax-filings', leftValue: '={{ $json.category }}', rightValue: 'tax_filings', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'tax_filings',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'contracts', leftValue: '={{ $json.category }}', rightValue: 'contracts', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'contracts',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'correspondence', leftValue: '={{ $json.category }}', rightValue: 'correspondence', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'correspondence',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'bank-accounts', leftValue: '={{ $json.category }}', rightValue: 'bank_accounts', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'bank_accounts',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'tax-payments-prepayments', leftValue: '={{ $json.category }}', rightValue: 'tax_payments_prepayments', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'tax_payments_prepayments',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'assets', leftValue: '={{ $json.category }}', rightValue: 'assets', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'assets',
          },
          {
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
              conditions: [{ id: 'call-notes', leftValue: '={{ $json.category }}', rightValue: 'call_notes', operator: { type: 'string', operation: 'equals' } }],
              combinator: 'and',
            },
            renameOutput: true,
            outputKey: 'call_notes',
          },
        ],
      },
      options: {},
    },
  },
});

const lookupTaxRegistrations = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Tax Registrations',
    position: [512, -720],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: FILING_REGISTRATIONS_DATABASE_ID, mode: 'id', cachedResultName: 'Filing Registrations' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: '💼 Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupCompanyFilings = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Company Filings',
    position: [512, -560],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: FILINGS_DATABASE_ID, mode: 'id', cachedResultName: 'Filings' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupPersonalTaxFilings = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Personal Tax Filings',
    position: [768, -560],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: PERSONAL_TAX_FILINGS_DATABASE_ID, mode: 'id', cachedResultName: 'Personal Tax Filings' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Person|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.individual_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupContracts = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Contracts',
    position: [512, -400],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: CONTRACTS_DATABASE_ID, mode: 'id', cachedResultName: 'Contracts' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupCorrespondenceCompany = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Correspondence Company',
    position: [512, -240],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: CORRESPONDENCE_DATABASE_ID, mode: 'id', cachedResultName: 'Correspondence' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupCorrespondenceIndividual = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Correspondence Individual',
    position: [768, -240],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: CORRESPONDENCE_DATABASE_ID, mode: 'id', cachedResultName: 'Correspondence' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Individual|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.individual_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupBankAccountsCompany = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Bank Accounts Company',
    position: [512, -80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: BANK_ACCOUNTS_DATABASE_ID, mode: 'id', cachedResultName: 'Bank Accounts' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company (if business)|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupBankAccountsIndividual = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Bank Accounts Individual',
    position: [768, -80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: BANK_ACCOUNTS_DATABASE_ID, mode: 'id', cachedResultName: 'Bank Accounts' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: ' Customer (if personal)|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.individual_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupTaxPayments = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Tax Payments',
    position: [512, 80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: TAX_PAYMENTS_DATABASE_ID, mode: 'id', cachedResultName: 'Tax payments' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupTaxPrepayments = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Tax Prepayments',
    position: [768, 80],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: TAX_PREPAYMENTS_DATABASE_ID, mode: 'id', cachedResultName: 'Tax prepayments' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: '💼 Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupAssetsCompany = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Assets Company',
    position: [512, 240],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: ASSETS_DATABASE_ID, mode: 'id', cachedResultName: 'Assets' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Company|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.company_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupAssetsIndividual = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Assets Individual',
    position: [768, 240],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: ASSETS_DATABASE_ID, mode: 'id', cachedResultName: 'Assets' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: '🧑🏻 Individuals|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.individual_filter_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const lookupCallNotes = node({
  type: 'n8n-nodes-base.notion',
  version: 2.2,
  config: {
    name: 'Lookup Call Notes',
    position: [512, 400],
    credentials: { notionApi: newCredential('Notion') },
    parameters: {
      resource: 'databasePage',
      operation: 'getAll',
      databaseId: { __rl: true, value: CALL_NOTES_DATABASE_ID, mode: 'id', cachedResultName: 'Call Notes' },
      returnAll: true,
      simple: false,
      filterType: 'manual',
      matchType: 'allFilters',
      filters: { conditions: [{ key: 'Call|relation', condition: '={{ "contains" }}', relationValue: '={{ $("Normalize Scope").item.json.call_page_id }}' }] },
      options: {},
    },
    executeOnce: true,
    alwaysOutputData: true,
    onError: 'continueRegularOutput',
  },
});

const buildLookupResponse = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Build Lookup Response',
    position: [1120, -160],
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
function pageItems(nodeName) { return rawNodeItems(nodeName).filter((page) => page && page.id && page.properties); }
function nodeWarnings(nodeName) {
  return rawNodeItems(nodeName)
    .filter((item) => item && item.error)
    .map(() => 'One permitted ' + nodeName.replace(/^Lookup /, '').toLowerCase() + ' source is unavailable to the Notion integration.');
}
function redactLinks(text) { return String(text || '').replace(/https?:\\/\\/\\S+/gi, '[link omitted]'); }
function richTextValue(value) { return redactLinks((value?.title || value?.rich_text || []).map((part) => part.plain_text || part.text?.content || '').join('').trim()); }
function formulaValue(formula) { if (!formula || typeof formula !== 'object') return ''; if (formula.string !== undefined && formula.string !== null) return String(formula.string); if (formula.number !== undefined && formula.number !== null) return String(formula.number); if (formula.boolean !== undefined && formula.boolean !== null) return String(formula.boolean); if (formula.date?.start) return formula.date.start; return ''; }
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
  if (value.url) return '[url omitted]';
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
function pageTitle(page) {
  for (const value of Object.values(page?.properties || {})) {
    if (value?.title) {
      const text = richTextValue(value);
      if (text) return text;
    }
  }
  return page?.id || '';
}
function bestDate(properties, page) {
  const candidates = [];
  for (const [key, value] of Object.entries(properties || {})) {
    const keyLower = key.toLowerCase();
    if (typeof value === 'string' && (keyLower.includes('date') || keyLower.includes('received') || keyLower.includes('sent') || keyLower.includes('due') || keyLower.includes('deadline'))) candidates.push(value);
  }
  candidates.push(page?.last_edited_time || '', page?.created_time || '');
  return candidates.find((value) => Number.isFinite(Date.parse(value))) || '';
}
function normalizePage(page, sourceDatabase) {
  const properties = {};
  let filePropertyCount = 0;
  let relationPropertyCount = 0;
  for (const [key, value] of Object.entries(page?.properties || {})) {
    if (value?.files) filePropertyCount += value.files.length;
    if (value?.relation) relationPropertyCount += value.relation.length;
    const simplified = simplifyProperty(value);
    if (simplified !== undefined && simplified !== '') properties[key] = simplified;
  }
  return compact({
    page_id: page?.id || '',
    url: page?.url || '',
    title: pageTitle(page),
    source_database: sourceDatabase,
    best_date: bestDate(properties, page),
    created_time: page?.created_time || '',
    last_edited_time: page?.last_edited_time || '',
    file_property_count: filePropertyCount,
    relation_property_count: relationPropertyCount,
    properties,
  });
}
function dedupe(records) {
  const seen = new Set();
  return records.filter((record) => {
    const key = record.page_id || record.source_database + ':' + record.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function searchTerms(query) {
  const stop = new Set(['latest', 'date', 'record', 'records', 'detail', 'details', 'info', 'information', 'find', 'show', 'please', 'about', 'the', 'and', 'for', 'with', 'from', 'call', 'context', 'correspondence', 'filing', 'filings', 'contract', 'contracts', 'asset', 'assets', 'bank', 'account', 'accounts', 'payment', 'payments', 'prepayment', 'prepayments', 'note', 'notes']);
  return String(query || '').toLowerCase().split(/[^a-z0-9äöüß]+/i).filter((term) => term.length > 2 && !stop.has(term));
}
function matchScore(record, terms) {
  if (!terms.length) return 0;
  const hay = JSON.stringify(record).toLowerCase();
  return terms.reduce((score, term) => score + (hay.includes(term) ? 1 : 0), 0);
}
const scope = $('Normalize Scope').item.json;
const map = {
  tax_registrations: [['Lookup Tax Registrations', 'Filing Registrations']],
  tax_filings: [['Lookup Company Filings', 'Company Tax Filings'], ['Lookup Personal Tax Filings', 'Personal Tax Filings']],
  contracts: [['Lookup Contracts', 'Contracts']],
  correspondence: [['Lookup Correspondence Company', 'Company Correspondence'], ['Lookup Correspondence Individual', 'Individual Correspondence']],
  bank_accounts: [['Lookup Bank Accounts Company', 'Company Bank Accounts'], ['Lookup Bank Accounts Individual', 'Individual Bank Accounts']],
  tax_payments_prepayments: [['Lookup Tax Payments', 'Tax Payments'], ['Lookup Tax Prepayments', 'Tax Prepayments']],
  assets: [['Lookup Assets Company', 'Company Assets'], ['Lookup Assets Individual', 'Individual Assets']],
  call_notes: [['Lookup Call Notes', 'Call Notes']],
};
const requestedNodes = map[scope.category] || [];
const lookupWarnings = requestedNodes.flatMap(([nodeName]) => nodeWarnings(nodeName));
const records = dedupe(requestedNodes.flatMap(([nodeName, sourceDatabase]) => pageItems(nodeName).map((page) => normalizePage(page, sourceDatabase))));
const terms = searchTerms(scope.query);
const scored = records.map((record) => ({ ...record, match_score: matchScore(record, terms) }));
const filtered = scored
  .filter((record) => terms.length === 0 || record.match_score > 0)
  .sort((a, b) => (b.match_score || 0) - (a.match_score || 0) || Date.parse(b.best_date || 0) - Date.parse(a.best_date || 0));
const selected = filtered.slice(0, scope.limit);
return [{
  json: {
    status: lookupWarnings.length ? 'partial' : 'ok',
    category: scope.category,
    query: scope.query,
    allowed_categories: scope.allowed_categories,
    count: records.length,
    matched_count: filtered.length,
    returned_count: selected.length,
    lookup_warnings: lookupWarnings,
    scope: {
      call_page_id: scope.call_page_id,
      call_public_id: scope.call_public_id,
      call_url: scope.call_url,
      company_page_id: scope.company_page_id,
      individual_page_id: scope.individual_page_id,
      message_topic: scope.message_topic,
    },
    records: selected,
    instruction: lookupWarnings.length
      ? 'Use returned records privately for the call. Some permitted context could not be read; do not assume absence of records in that category. Ask the call creator through live help if this category is important. Do not mention Notion, n8n, tools, JSON, database names, source labels, workflow state, or internal notes to the authority.'
      : 'Use these records privately for the call. Do not mention Notion, n8n, tools, JSON, database names, source labels, workflow state, or internal notes to the authority.',
  },
}];`,
    },
    output: [{ status: 'ok', category: 'correspondence', returned_count: 1 }],
  },
});

const respondLookup = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Lookup',
    position: [1376, -160],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ $json }}'),
      options: {
        responseCode: 200,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'ok' }],
});

const respondInvalid = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond Invalid Request',
    position: [-352, 192],
    parameters: {
      respondWith: 'json',
      responseBody: expr('{{ { status: "invalid_request", error: $("Normalize Lookup Request").item.json.validation_error, allowed_categories: $("Normalize Lookup Request").item.json.allowed_categories, instruction: "Use only allowed categories and include call_id." } }}'),
      options: {
        responseCode: 400,
        responseHeaders: { entries: [{ name: 'Content-Type', value: 'application/json' }] },
      },
    },
  },
  output: [{ status: 'invalid_request' }],
});

export default workflow('rb-calls-context-lookup', 'RB Calls Context Lookup')
  .add(sticky('ElevenLabs server-tool target for on-demand Notion context. It is scoped from the Call record and only searches pre-approved RB call databases: tax registrations, tax filings, contracts, correspondence, bank accounts, tax payments/prepayments, assets, and call notes. File contents and file URLs are excluded.', [lookupWebhook, buildLookupResponse, respondLookup], { color: 4, width: 5200, height: 900 }))
  .add(lookupWebhook)
  .to(normalizeLookupRequest)
  .to(
    requestIsValid
      .onTrue(
        getCall
          .to(normalizeScope)
          .to(
            routeLookupCategory
              .onCase(0, lookupTaxRegistrations.to(buildLookupResponse).to(respondLookup))
              .onCase(1, lookupCompanyFilings.to(lookupPersonalTaxFilings).to(buildLookupResponse).to(respondLookup))
              .onCase(2, lookupContracts.to(buildLookupResponse).to(respondLookup))
              .onCase(3, lookupCorrespondenceCompany.to(lookupCorrespondenceIndividual).to(buildLookupResponse).to(respondLookup))
              .onCase(4, lookupBankAccountsCompany.to(lookupBankAccountsIndividual).to(buildLookupResponse).to(respondLookup))
              .onCase(5, lookupTaxPayments.to(lookupTaxPrepayments).to(buildLookupResponse).to(respondLookup))
              .onCase(6, lookupAssetsCompany.to(lookupAssetsIndividual).to(buildLookupResponse).to(respondLookup))
              .onCase(7, lookupCallNotes.to(buildLookupResponse).to(respondLookup)),
          ),
      )
      .onFalse(respondInvalid),
  );
