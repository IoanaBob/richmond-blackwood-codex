import { createSign, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  config,
  getEntityBankConfig,
  parseMaybeJson,
  relativeToRepo,
  requireApproval,
  truncate,
} from "./config.mjs";

export function enableBankingStatus() {
  const store = loadStore({ tolerateInvalid: true });
  return {
    apiBaseUrl: config.enableBanking.apiBaseUrl,
    appIdConfigured: Boolean(config.enableBanking.appId),
    privateKeyFile: relativeToRepo(config.enableBanking.privateKeyFile),
    privateKeyFileExists: fs.existsSync(config.enableBanking.privateKeyFile),
    redirectUrlConfigured: Boolean(config.enableBanking.redirectUrl),
    storeFile: relativeToRepo(config.enableBanking.storeFile),
    localSessionCount: store.sessions.length,
    localAuthorizationCount: store.authorizations.length,
    readyForApiReads: Boolean(config.enableBanking.appId && fs.existsSync(config.enableBanking.privateKeyFile)),
    paymentInitiationEnabled: false,
  };
}

export async function getApplication(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking application metadata read");
  return enableBankingFetch("/application");
}

export async function listAspsps(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking ASPSP lookup");
  const country = String(input.country || "IE").toUpperCase();
  const query = new URLSearchParams({ country });
  const data = await enableBankingFetch(`/aspsps?${query.toString()}`);
  const aspsps = Array.isArray(data.aspsps) ? data.aspsps : [];
  const needle = input.nameContains?.trim().toLowerCase();
  const filtered = needle
    ? aspsps.filter((aspsp) => String(aspsp.name || "").toLowerCase().includes(needle))
    : aspsps;
  const limit = Math.min(Math.max(Number(input.limit || 50), 1), 200);

  return {
    country,
    count: filtered.length,
    returned: filtered.slice(0, limit),
  };
}

export async function startAuthorization(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking authorization start");
  const entity = input.entityRef ? getEntityBankConfig(input.entityRef) : null;
  const bankRail = input.bankRail || "boi_business";
  const defaultBank = bankRail === "wamo" ? entity?.wamo : entity?.boiBusiness;
  const redirectUrl = input.redirectUrl || config.enableBanking.redirectUrl;
  const aspspName = input.aspspName || defaultBank?.aspspName;
  const country = String(input.country || defaultBank?.country || "IE").toUpperCase();

  if (!redirectUrl) {
    throw new Error("RB_BANK_ENABLE_BANKING_REDIRECT_URL is missing. Add a redirect URL registered in Enable Banking.");
  }
  if (!aspspName) {
    throw new Error("Provide aspspName or configure the entity bank ASPSP name in .env.local.");
  }

  const state = input.state || randomUUID();
  const validDays = Math.min(Math.max(Number(input.validDays || 90), 1), 180);
  const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString();
  const body = {
    access: { valid_until: validUntil },
    aspsp: { name: aspspName, country },
    state,
    redirect_url: redirectUrl,
    psu_type: input.psuType || "business",
  };

  if (input.language) body.language = input.language;
  if (input.psuId) body.psu_id = input.psuId;

  const data = await enableBankingFetch("/auth", {
    method: "POST",
    body,
    headers: psuHeaders(input),
  });

  const store = loadStore();
  store.authorizations.push({
    authorization_id: data.authorization_id || null,
    entity_ref: input.entityRef || null,
    bank_rail: bankRail,
    state,
    aspsp: body.aspsp,
    psu_type: body.psu_type,
    redirect_url: redirectUrl,
    valid_until: validUntil,
    created_at: new Date().toISOString(),
    status: "started",
  });
  saveStore(store);

  return {
    authorization_id: data.authorization_id || null,
    entity_ref: input.entityRef || null,
    bank_rail: bankRail,
    state,
    url: data.url,
    redirect_url: redirectUrl,
    valid_until: validUntil,
    next_step: "Open the URL yourself, complete bank consent/account selection, then call rb_open_banking_enable_banking_create_session with the redirected URL or code.",
  };
}

export async function createSession(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking session creation");
  const authCode = input.code || extractCodeFromRedirect(input.redirectedUrl);
  if (!authCode) throw new Error("Provide either code or redirectedUrl containing a code query parameter.");

  const data = await enableBankingFetch("/sessions", {
    method: "POST",
    body: { code: authCode },
    headers: psuHeaders(input),
  });

  if (!data.session_id) {
    throw new Error(`Enable Banking did not return a session_id: ${JSON.stringify(data)}`);
  }

  const label = input.label || defaultSessionLabel(input);
  const sessionRecord = {
    label,
    entity_ref: input.entityRef || null,
    bank_rail: input.bankRail || null,
    session_id: data.session_id,
    accounts: data.accounts || [],
    created_at: new Date().toISOString(),
    last_checked_at: null,
  };

  const store = loadStore();
  store.sessions = store.sessions.filter((session) => session.label !== label && session.session_id !== sessionRecord.session_id);
  store.sessions.push(sessionRecord);
  saveStore(store);

  return {
    saved: {
      label: sessionRecord.label,
      entity_ref: sessionRecord.entity_ref,
      bank_rail: sessionRecord.bank_rail,
      account_count: sessionRecord.accounts.length,
      created_at: sessionRecord.created_at,
    },
    next_step: "Use the saved label for balances or transactions only after explicit approval for the entity and bank rail.",
  };
}

export function listLocalSessions() {
  return {
    sessions: loadStore().sessions.map((session) => ({
      label: session.label,
      entity_ref: session.entity_ref || null,
      bank_rail: session.bank_rail || null,
      account_count: Array.isArray(session.accounts) ? session.accounts.length : 0,
      created_at: session.created_at || null,
      last_checked_at: session.last_checked_at || null,
    })),
  };
}

export async function getSession(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking session refresh");
  const record = resolveSession(input.label, input.sessionId);
  const data = await enableBankingFetch(`/sessions/${encodeURIComponent(record.session_id)}`);

  const store = loadStore();
  store.sessions = store.sessions.map((session) =>
    session.session_id === record.session_id
      ? {
          ...session,
          accounts: data.accounts || session.accounts || [],
          last_checked_at: new Date().toISOString(),
        }
      : session,
  );
  saveStore(store);

  return data;
}

export async function getBalances(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking balance read");
  const accountId = input.accountId || resolveAccountId(input.sessionLabel, input.sessionId, input.accountIndex || 0);
  return enableBankingFetch(`/accounts/${encodeURIComponent(accountId)}/balances`, {
    headers: psuHeaders(input),
  });
}

export async function getTransactions(input = {}) {
  requireApproval(input.approvalPurpose, "Enable Banking transaction read");
  const accountId = input.accountId || resolveAccountId(input.sessionLabel, input.sessionId, input.accountIndex || 0);
  const params = new URLSearchParams();
  if (input.dateFrom) params.set("date_from", input.dateFrom);
  if (input.dateTo) params.set("date_to", input.dateTo);
  if (input.continuationKey) params.set("continuation_key", input.continuationKey);
  if (input.transactionStatus) params.set("transaction_status", input.transactionStatus);
  if (input.strategy) params.set("strategy", input.strategy);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return enableBankingFetch(`/accounts/${encodeURIComponent(accountId)}/transactions${suffix}`, {
    headers: psuHeaders(input),
  });
}

async function enableBankingFetch(endpoint, options = {}) {
  assertConfigured();

  const headers = {
    Authorization: `Bearer ${buildJwt()}`,
    Accept: "application/json",
    ...options.headers,
  };

  let body;
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const response = await fetch(`${config.enableBanking.apiBaseUrl}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body,
  });

  const text = await response.text();
  const data = parseMaybeJson(text);
  if (!response.ok) {
    throw new Error(`Enable Banking ${options.method || "GET"} ${endpoint} failed with ${response.status}: ${truncate(text, 1200)}`);
  }
  return data;
}

function assertConfigured() {
  if (!config.enableBanking.appId) throw new Error("RB_BANK_ENABLE_BANKING_APP_ID is missing.");
  if (!fs.existsSync(config.enableBanking.privateKeyFile)) {
    throw new Error(`Enable Banking private key file is missing: ${relativeToRepo(config.enableBanking.privateKeyFile)}`);
  }
}

function buildJwt(expSeconds = 3600) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlJson({
    typ: "JWT",
    alg: "RS256",
    kid: config.enableBanking.appId,
  });
  const payload = base64UrlJson({
    iss: "enablebanking.com",
    aud: "api.enablebanking.com",
    iat: now,
    exp: now + expSeconds,
  });
  const signed = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signed);
  signer.end();
  const signature = base64UrlBuffer(signer.sign(fs.readFileSync(config.enableBanking.privateKeyFile, "utf8")));
  return `${signed}.${signature}`;
}

function psuHeaders(input = {}) {
  const headers = {};
  const psuIpAddress = input.psuIpAddress || config.enableBanking.psuIpAddress;
  const psuUserAgent = input.psuUserAgent || config.enableBanking.psuUserAgent;
  if (psuIpAddress) headers["Psu-Ip-Address"] = psuIpAddress;
  if (psuUserAgent) headers["Psu-User-Agent"] = psuUserAgent;
  return headers;
}

function resolveSession(label, sessionId) {
  const sessions = loadStore().sessions;
  if (sessionId) {
    const byId = sessions.find((session) => session.session_id === sessionId);
    if (byId) return byId;
    return { session_id: sessionId, accounts: [] };
  }
  if (!label) {
    if (sessions.length === 1) return sessions[0];
    throw new Error("Provide label or sessionId. There is not exactly one local Enable Banking session to choose from.");
  }
  const byLabel = sessions.find((session) => session.label === label);
  if (!byLabel) throw new Error(`No local Enable Banking session found for label: ${label}`);
  return byLabel;
}

function resolveAccountId(label, sessionId, accountIndex = 0) {
  const session = resolveSession(label, sessionId);
  const account = session.accounts?.[accountIndex];
  if (!account) throw new Error(`No account at index ${accountIndex} for session ${session.label || session.session_id}.`);
  if (typeof account === "string") return account;
  if (account.uid) return account.uid;
  if (account.account_id) return account.account_id;
  if (account.id) return account.id;
  throw new Error(`Could not resolve account ID from account entry: ${JSON.stringify(account)}`);
}

function loadStore({ tolerateInvalid = false } = {}) {
  if (!fs.existsSync(config.enableBanking.storeFile)) return { sessions: [], authorizations: [] };
  try {
    const raw = fs.readFileSync(config.enableBanking.storeFile, "utf8").trim();
    if (!raw) return { sessions: [], authorizations: [] };
    const parsed = JSON.parse(raw);
    return {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      authorizations: Array.isArray(parsed.authorizations) ? parsed.authorizations : [],
    };
  } catch (error) {
    if (tolerateInvalid) return { sessions: [], authorizations: [] };
    throw error;
  }
}

function saveStore(store) {
  fs.mkdirSync(path.dirname(config.enableBanking.storeFile), { recursive: true, mode: 0o700 });
  const tmpFile = `${config.enableBanking.storeFile}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(store, null, 2), { mode: 0o600 });
  fs.renameSync(tmpFile, config.enableBanking.storeFile);
}

function extractCodeFromRedirect(redirectedUrl) {
  if (!redirectedUrl) return "";
  const parsed = new URL(redirectedUrl);
  return parsed.searchParams.get("code") || "";
}

function defaultSessionLabel(input) {
  const parts = [input.entityRef, input.bankRail, new Date().toISOString().slice(0, 10)].filter(Boolean);
  return parts.length ? parts.join("-").toLowerCase() : `enable-banking-${new Date().toISOString()}`;
}

function base64UrlJson(value) {
  return base64UrlBuffer(Buffer.from(JSON.stringify(value)));
}

function base64UrlBuffer(buffer) {
  return buffer.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
