import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(serverDir, "../../..");
export const localEnvPath = path.join(repoRoot, ".env.local");

loadLocalEnv(localEnvPath);

const DEFAULT_ENABLE_BANKING_API_BASE_URL = "https://api.enablebanking.com";
const DEFAULT_ENABLE_BANKING_STORE_FILE = ".codex-local/rb-open-banking/enable-banking-sessions.json";
const DEFAULT_ENABLE_BANKING_PRIVATE_KEY_FILE = ".codex-local/rb-open-banking/enable-banking-private.pem";
const DEFAULT_WISE_API_BASE_URL = "https://api.wise.com";
const DEFAULT_WISE_TOKEN_FILE = ".codex-local/rb-open-banking/wise-token.txt";

export const bankRails = ["wamo", "boi_business", "wise"];

export const config = {
  enableBanking: {
    appId: process.env.RB_BANK_ENABLE_BANKING_APP_ID || "",
    apiBaseUrl: (process.env.RB_BANK_ENABLE_BANKING_API_BASE_URL || DEFAULT_ENABLE_BANKING_API_BASE_URL).replace(/\/$/, ""),
    privateKeyFile: resolveRepoPath(process.env.RB_BANK_ENABLE_BANKING_PRIVATE_KEY_FILE || DEFAULT_ENABLE_BANKING_PRIVATE_KEY_FILE),
    redirectUrl: process.env.RB_BANK_ENABLE_BANKING_REDIRECT_URL || "",
    storeFile: resolveRepoPath(process.env.RB_BANK_ENABLE_BANKING_STORE_FILE || DEFAULT_ENABLE_BANKING_STORE_FILE),
    psuIpAddress: process.env.RB_BANK_ENABLE_BANKING_PSU_IP_ADDRESS || "",
    psuUserAgent: process.env.RB_BANK_ENABLE_BANKING_PSU_USER_AGENT || "",
  },
  wise: {
    apiBaseUrl: (process.env.RB_BANK_WISE_API_BASE_URL || DEFAULT_WISE_API_BASE_URL).replace(/\/$/, ""),
    token: process.env.RB_BANK_WISE_TOKEN || "",
    tokenFile: resolveRepoPath(process.env.RB_BANK_WISE_TOKEN_FILE || DEFAULT_WISE_TOKEN_FILE),
  },
};

export function entityEnvKey(entityRef) {
  return String(entityRef || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getEntityBankConfig(entityRef) {
  const key = entityEnvKey(entityRef);
  if (!key) throw new Error("entityRef is required.");
  const prefix = `RB_BANK_ENTITY_${key}_`;

  return {
    entityRef: String(entityRef).trim(),
    envPrefix: prefix,
    boiBusiness: {
      aspspName: env(`${prefix}BOI_ASPSP_NAME`),
      country: env(`${prefix}BOI_COUNTRY`) || "IE",
      sessionLabel: env(`${prefix}BOI_SESSION_LABEL`),
      safeAlias: env(`${prefix}BOI_SAFE_ALIAS`),
    },
    wamo: {
      route: env(`${prefix}WAMO_ROUTE`) || "enable_banking",
      aspspName: env(`${prefix}WAMO_ASPSP_NAME`),
      country: env(`${prefix}WAMO_COUNTRY`) || "IE",
      sessionLabel: env(`${prefix}WAMO_SESSION_LABEL`),
      safeAlias: env(`${prefix}WAMO_SAFE_ALIAS`),
    },
    wise: {
      profileId: env(`${prefix}WISE_PROFILE_ID`),
      token: env(`${prefix}WISE_TOKEN`),
      tokenFile: env(`${prefix}WISE_TOKEN_FILE`) ? resolveRepoPath(env(`${prefix}WISE_TOKEN_FILE`)) : "",
      safeAlias: env(`${prefix}WISE_SAFE_ALIAS`),
    },
  };
}

export function getEntityConfigStatus(entityRef) {
  const entity = getEntityBankConfig(entityRef);
  return {
    entityRef: entity.entityRef,
    envPrefix: entity.envPrefix,
    boiBusiness: {
      aspspNameConfigured: Boolean(entity.boiBusiness.aspspName),
      country: entity.boiBusiness.country,
      sessionLabelConfigured: Boolean(entity.boiBusiness.sessionLabel),
      safeAliasConfigured: Boolean(entity.boiBusiness.safeAlias),
    },
    wamo: {
      route: entity.wamo.route,
      aspspNameConfigured: Boolean(entity.wamo.aspspName),
      country: entity.wamo.country,
      sessionLabelConfigured: Boolean(entity.wamo.sessionLabel),
      safeAliasConfigured: Boolean(entity.wamo.safeAlias),
    },
    wise: {
      profileIdConfigured: Boolean(entity.wise.profileId),
      tokenConfigured: Boolean(entity.wise.token || entity.wise.tokenFile || config.wise.token || fs.existsSync(config.wise.tokenFile)),
      entityTokenFile: entity.wise.tokenFile ? relativeToRepo(entity.wise.tokenFile) : null,
      entityTokenFileExists: entity.wise.tokenFile ? fs.existsSync(entity.wise.tokenFile) : false,
      safeAliasConfigured: Boolean(entity.wise.safeAlias),
    },
  };
}

export function resolveWiseProfileId(input = {}) {
  if (input.profileId) return String(input.profileId);
  if (!input.entityRef) throw new Error("Provide profileId or entityRef.");
  const entity = getEntityBankConfig(input.entityRef);
  if (!entity.wise.profileId) {
    throw new Error(`No Wise profile ID configured for entity ${input.entityRef}. Set ${entity.envPrefix}WISE_PROFILE_ID or pass profileId.`);
  }
  return entity.wise.profileId;
}

export function resolveWiseToken(entityRef) {
  if (entityRef) {
    const entity = getEntityBankConfig(entityRef);
    if (entity.wise.token) return { token: entity.wise.token, source: "entity_env" };
    if (entity.wise.tokenFile && fs.existsSync(entity.wise.tokenFile)) {
      return { token: readSecretFile(entity.wise.tokenFile), source: "entity_token_file", tokenFile: entity.wise.tokenFile };
    }
  }

  if (config.wise.token) return { token: config.wise.token, source: "shared_env" };
  if (fs.existsSync(config.wise.tokenFile)) {
    return { token: readSecretFile(config.wise.tokenFile), source: "shared_token_file", tokenFile: config.wise.tokenFile };
  }
  return { token: "", source: "missing" };
}

export function resolveRepoPath(value) {
  return path.isAbsolute(value) ? value : path.resolve(repoRoot, value);
}

export function relativeToRepo(value) {
  return path.relative(repoRoot, value);
}

export function requireApproval(approvalPurpose, action) {
  const normalized = String(approvalPurpose || "").trim();
  if (normalized.length < 12) {
    throw new Error(`${action} requires explicit approvalPurpose describing the approved live bank/API action.`);
  }
  return normalized;
}

export function truncate(value, maxLength) {
  const text = String(value || "");
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function parseMaybeJson(text) {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function readSecretFile(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

function env(key) {
  return process.env[key] || "";
}

function loadLocalEnv(envPath) {
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (process.env[key]) continue;
    process.env[key] = unquoteEnvValue(rest.join("="));
  }
}

function unquoteEnvValue(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
