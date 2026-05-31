import fs from "node:fs";
import {
  config,
  parseMaybeJson,
  relativeToRepo,
  requireApproval,
  resolveWiseProfileId,
  resolveWiseToken,
  truncate,
} from "./config.mjs";

export function wiseStatus(input = {}) {
  const tokenInfo = resolveWiseToken(input.entityRef);
  return {
    apiBaseUrl: config.wise.apiBaseUrl,
    sharedTokenConfigured: Boolean(config.wise.token || fs.existsSync(config.wise.tokenFile)),
    sharedTokenFile: relativeToRepo(config.wise.tokenFile),
    sharedTokenFileExists: fs.existsSync(config.wise.tokenFile),
    entityRef: input.entityRef || null,
    tokenSource: tokenInfo.source,
    tokenConfigured: Boolean(tokenInfo.token),
    entityTokenFile: tokenInfo.tokenFile ? relativeToRepo(tokenInfo.tokenFile) : null,
  };
}

export async function listProfiles(input = {}) {
  requireApproval(input.approvalPurpose, "Wise profile list read");
  return wiseFetch("/v2/profiles", input);
}

export async function getProfile(input = {}) {
  requireApproval(input.approvalPurpose, "Wise profile read");
  const profileId = resolveWiseProfileId(input);
  return wiseFetch(`/v2/profiles/${encodeURIComponent(profileId)}`, input);
}

export async function listBalances(input = {}) {
  requireApproval(input.approvalPurpose, "Wise balance list read");
  const profileId = resolveWiseProfileId(input);
  const params = new URLSearchParams();
  if (input.types) params.set("types", input.types);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return wiseFetch(`/v4/profiles/${encodeURIComponent(profileId)}/balances${suffix}`, input);
}

export async function listAccountDetails(input = {}) {
  requireApproval(input.approvalPurpose, "Wise account details read");
  const profileId = resolveWiseProfileId(input);
  return wiseFetch(`/v1/profiles/${encodeURIComponent(profileId)}/account-details`, input);
}

export async function getBalanceStatement(input = {}) {
  requireApproval(input.approvalPurpose, "Wise balance statement read");
  const profileId = resolveWiseProfileId(input);
  if (!input.balanceId) throw new Error("balanceId is required.");
  if (!input.currency) throw new Error("currency is required.");
  if (!input.intervalStart) throw new Error("intervalStart is required.");
  if (!input.intervalEnd) throw new Error("intervalEnd is required.");

  const params = new URLSearchParams({
    currency: String(input.currency).toUpperCase(),
    intervalStart: input.intervalStart,
    intervalEnd: input.intervalEnd,
    type: input.type || "COMPACT",
  });
  if (input.statementLocale) params.set("statementLocale", input.statementLocale);

  return wiseFetch(
    `/v1/profiles/${encodeURIComponent(profileId)}/balance-statements/${encodeURIComponent(input.balanceId)}/statement.json?${params.toString()}`,
    input,
  );
}

async function wiseFetch(endpoint, input = {}) {
  const tokenInfo = resolveWiseToken(input.entityRef);
  if (!tokenInfo.token) {
    throw new Error("Wise token is missing. Set RB_BANK_WISE_TOKEN_FILE, RB_BANK_WISE_TOKEN, or the entity-specific Wise token route.");
  }

  const response = await fetch(`${config.wise.apiBaseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenInfo.token}`,
      Accept: "application/json",
    },
  });
  const text = await response.text();
  const data = parseMaybeJson(text);
  if (!response.ok) {
    throw new Error(`Wise GET ${endpoint} failed with ${response.status}: ${truncate(text, 1200)}`);
  }
  return data;
}
