import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { google } from "googleapis";

import { GcloudAuthManager } from "./gcloud_auth";
import {
  GOOGLE_PERSONAS,
  GooglePersonaDefinition,
  GooglePersonaService,
  hasPersonaOauthCredentials,
  refreshPersonaOauthAccessToken,
  tokenHasGmailReadWriteScope,
} from "./persona_oauth_vault";

type ServiceName = GooglePersonaService;
type PersonaStatus = "ok" | "partial" | "blocked" | "missing" | "not-configured";
type CheckStatus = "ok" | "failed" | "mismatch" | "skipped";
type PersonaDefinition = GooglePersonaDefinition;

interface CliOptions {
  strict: boolean;
  keepLogs: boolean;
}

interface TokenAttempt {
  source: "oauth-vault" | "application-default" | "account";
  status: "ok" | "failed" | "skipped";
  reason?: string;
}

interface TokenResult {
  token: string;
  source: "oauth-vault" | "application-default" | "account";
  attempts: TokenAttempt[];
  scope?: string;
}

interface CheckResult {
  status: CheckStatus;
  emailMatch?: boolean;
  detail?: string;
}

interface ReconnectCandidate {
  persona_slug: string;
  label: string;
  expected_email?: string;
  reason: string;
  command: string;
}

interface PersonaReport {
  persona_slug: string;
  label: string;
  expected_email?: string;
  status: PersonaStatus;
  token_source?: string;
  token_attempts: TokenAttempt[];
  checks: Partial<Record<ServiceName | "identity", CheckResult>>;
  reconnect?: ReconnectCandidate;
}

interface PrivateMcpReport {
  route: "google_workspace_private";
  status: "ok" | "partial" | "missing";
  client_credentials_present: boolean;
  env_credentials_present: boolean;
  accounts: Array<{
    email: string;
    credential_present: boolean;
  }>;
}

const PERSONAS: PersonaDefinition[] = GOOGLE_PERSONAS;

async function main(argv: string[]): Promise<number> {
  const options = parseOptions(argv);
  const personaReports: PersonaReport[] = [];

  for (const persona of PERSONAS) {
    personaReports.push(await verifyPersona(persona, options));
  }

  const privateMcp = privateMcpStorageReport();
  const summary = summarize(personaReports, privateMcp);
  const reconnectCandidates = personaReports
    .map((report) => report.reconnect)
    .filter((candidate): candidate is ReconnectCandidate => Boolean(candidate));
  const report = {
    ok: summary.required_blocked === 0 && summary.required_partial === 0 && summary.required_missing === 0,
    summary,
    reconnect_candidates: reconnectCandidates,
    personas: personaReports,
    private_mcp_storage: privateMcp,
  };

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return options.strict && !report.ok ? 1 : 0;
}

function parseOptions(argv: string[]): CliOptions {
  const options: CliOptions = { strict: false, keepLogs: false };
  for (const arg of argv) {
    if (arg === "--strict") {
      options.strict = true;
    } else if (arg === "--keep-logs") {
      options.keepLogs = true;
    } else if (arg === "--help") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function usage(): string {
  return `Usage: verify_global_google_personas.ts [--strict] [--keep-logs]

Verifies registered Google personas against global Codex storage without
starting OAuth or printing tokens. It reloads per-persona OAuth vault refresh
credentials first, then checks saved gcloud ADC/account-token caches for Gmail,
Drive, and Calendar, and reports private MCP credential presence separately.`;
}

async function verifyPersona(persona: PersonaDefinition, options: CliOptions): Promise<PersonaReport> {
  const checks: PersonaReport["checks"] = {};
  const configDir = personaGcloudConfigDir(persona.slug);

  if (!persona.configured) {
    return reportFor(persona, "not-configured", [], checks);
  }

  if (!hasPersonaOauthCredentials(persona.slug) && !hasSavedGcloudAuth(configDir)) {
    return reportFor(persona, "missing", [
      { source: "oauth-vault", status: "skipped", reason: "missing persona OAuth vault credentials" },
      { source: "application-default", status: "skipped", reason: "no saved global gcloud auth files" },
    ], checks);
  }

  try {
    const token = await getSavedToken(persona, configDir);
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token.token });
    checks.identity = await checkIdentity(auth, persona.expectedEmail);

    if (persona.services.includes("gmail")) {
      checks.gmail = await checkGmail(auth, persona.expectedEmail, token.scope);
    }
    if (persona.services.includes("drive")) {
      checks.drive = await checkDrive(auth, persona.expectedEmail);
    }
    if (persona.services.includes("calendar")) {
      checks.calendar = await checkCalendar(auth, persona.expectedEmail);
    }

    const status = personaStatus(checks);
    return {
      ...reportFor(persona, status, token.attempts, checks),
      token_source: token.source,
    };
  } catch (error) {
    const detail = sanitizeError(error);
    const attempts: TokenAttempt[] = isTokenAttempts(error)
      ? error.attempts
      : [{ source: "application-default", status: "failed", reason: detail }];
    return reportFor(persona, blockedOrMissing(detail, attempts), attempts, checks, reconnectIfNeeded(persona, attempts, detail));
  } finally {
    if (!options.keepLogs) {
      removeGeneratedGcloudLogs(configDir);
    }
  }
}

async function getSavedToken(persona: PersonaDefinition, configDir: string): Promise<TokenResult> {
  const manager = new GcloudAuthManager();
  const attempts: TokenAttempt[] = [];

  if (hasPersonaOauthCredentials(persona.slug)) {
    try {
      const token = await refreshPersonaOauthAccessToken({
        serviceName: `${persona.label} verifier`,
        personaSlug: persona.slug,
        accountEmail: persona.accountEmail,
        gcloudConfigDir: configDir,
        updateStatus: true,
      });
      attempts.push({ source: "oauth-vault", status: "ok" });
      return { token: token.accessToken, source: "oauth-vault", attempts, scope: token.scope };
    } catch (error) {
      attempts.push({ source: "oauth-vault", status: "failed", reason: sanitizeError(error) });
    }
  } else {
    attempts.push({ source: "oauth-vault", status: "skipped", reason: "missing persona OAuth vault credentials" });
  }

  if (fs.existsSync(path.join(configDir, "application_default_credentials.json"))) {
    try {
      const token = manager.getAccessToken({
        serviceName: `${persona.label} verifier`,
        tokenCommand: "application-default",
        loginCommand: "application-default",
        loginMode: "never",
        gcloudConfigDir: configDir,
      });
      attempts.push({ source: "application-default", status: "ok" });
      return { token, source: "application-default", attempts };
    } catch (error) {
      attempts.push({ source: "application-default", status: "failed", reason: sanitizeError(error) });
    }
  } else {
    attempts.push({ source: "application-default", status: "skipped", reason: "missing application_default_credentials.json" });
  }

  if (persona.accountEmail && (fs.existsSync(path.join(configDir, "credentials.db")) || fs.existsSync(path.join(configDir, "access_tokens.db")))) {
    try {
      const token = manager.getAccessToken({
        serviceName: `${persona.label} verifier`,
        tokenCommand: "account",
        loginCommand: "account",
        loginMode: "never",
        accountEmail: persona.accountEmail,
        gcloudConfigDir: configDir,
      });
      attempts.push({ source: "account", status: "ok" });
      return { token, source: "account", attempts };
    } catch (error) {
      attempts.push({ source: "account", status: "failed", reason: sanitizeError(error) });
    }
  } else {
    attempts.push({ source: "account", status: "skipped", reason: "no saved account-token cache" });
  }

  throw Object.assign(new Error("No saved gcloud token source worked."), { attempts });
}

async function checkIdentity(auth: InstanceType<typeof google.auth.OAuth2>, expectedEmail?: string): Promise<CheckResult> {
  try {
    const result = await google.oauth2({ version: "v2", auth }).userinfo.get();
    return emailCheck(result.data.email || "", expectedEmail);
  } catch (error) {
    return { status: "failed", detail: sanitizeError(error) };
  }
}

async function checkGmail(
  auth: InstanceType<typeof google.auth.OAuth2>,
  expectedEmail?: string,
  grantedScope = "",
): Promise<CheckResult> {
  try {
    const gmail = google.gmail({ version: "v1", auth });
    const result = await gmail.users.getProfile({ userId: "me" });
    const profileCheck = emailCheck(result.data.emailAddress || "", expectedEmail);
    if (profileCheck.status !== "ok") {
      return profileCheck;
    }
    if (grantedScope && !tokenHasGmailReadWriteScope(grantedScope)) {
      return {
        status: "failed",
        detail: "Access token lacks Gmail read/write scope; reconnect this persona with the current full Gmail scope set.",
      };
    }
    const list = await gmail.users.messages.list({ userId: "me", maxResults: 1 });
    const messageId = list.data.messages?.[0]?.id || "";
    if (!messageId) {
      return { status: "ok", detail: "Gmail read/write scope present; no message available for full-format read probe." };
    }
    await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
      fields: "id,payload(mimeType,partId)",
    });
    return { status: "ok" };
  } catch (error) {
    return { status: "failed", detail: sanitizeError(error) };
  }
}

async function checkDrive(auth: InstanceType<typeof google.auth.OAuth2>, expectedEmail?: string): Promise<CheckResult> {
  try {
    const result = await google.drive({ version: "v3", auth }).about.get({ fields: "user(emailAddress)" });
    return emailCheck(result.data.user?.emailAddress || "", expectedEmail);
  } catch (error) {
    return { status: "failed", detail: sanitizeError(error) };
  }
}

async function checkCalendar(auth: InstanceType<typeof google.auth.OAuth2>, expectedEmail?: string): Promise<CheckResult> {
  try {
    const result = await google.calendar({ version: "v3", auth }).calendarList.get({ calendarId: "primary" });
    const calendarId = result.data.id || "";
    if (!calendarId || !calendarId.includes("@")) {
      return { status: "ok" };
    }
    return emailCheck(calendarId, expectedEmail);
  } catch (error) {
    return { status: "failed", detail: sanitizeError(error) };
  }
}

function emailCheck(actualEmail: string, expectedEmail?: string): CheckResult {
  if (!actualEmail) {
    return { status: "failed", detail: "Google did not return an account email." };
  }
  if (!expectedEmail) {
    return { status: "ok" };
  }
  const emailMatch = actualEmail.toLowerCase() === expectedEmail.toLowerCase();
  return {
    status: emailMatch ? "ok" : "mismatch",
    emailMatch,
    detail: emailMatch ? undefined : "returned account did not match expected persona email",
  };
}

function personaStatus(checks: PersonaReport["checks"]): PersonaStatus {
  const values = Object.values(checks);
  if (values.length === 0) {
    return "partial";
  }
  return values.every((check) => check.status === "ok") ? "ok" : "partial";
}

function reportFor(
  persona: PersonaDefinition,
  status: PersonaStatus,
  tokenAttempts: TokenAttempt[],
  checks: PersonaReport["checks"],
  reconnect?: ReconnectCandidate,
): PersonaReport {
  return {
    persona_slug: persona.slug,
    label: persona.label,
    expected_email: persona.expectedEmail,
    status,
    token_attempts: tokenAttempts,
    checks,
    ...(reconnect ? { reconnect } : {}),
  };
}

function blockedOrMissing(detail: string, attempts: TokenAttempt[] = []): PersonaStatus {
  const lower = [detail, ...attempts.map((attempt) => attempt.reason || "")].join("\n").toLowerCase();
  if (
    lower.includes("reauthentication") ||
    lower.includes("cannot prompt during non-interactive execution") ||
    lower.includes("no valid credentials") ||
    lower.includes("invalid_rapt")
  ) {
    return "blocked";
  }
  return lower.includes("no saved") || lower.includes("missing application_default_credentials") ? "missing" : "blocked";
}

function hasSavedGcloudAuth(configDir: string): boolean {
  return fs.existsSync(path.join(configDir, "application_default_credentials.json")) ||
    fs.existsSync(path.join(configDir, "credentials.db")) ||
    fs.existsSync(path.join(configDir, "access_tokens.db"));
}

function personaGcloudConfigDir(slug: string): string {
  return globalCodexPath("google-personas", slug, "gcloud");
}

function privateMcpStorageReport(): PrivateMcpReport {
  const root = globalCodexPath("google-personas", "private-google-workspace-mcp");
  const envFile = globalCodexPath("google-workspace-private.env");
  const clientCredentialsPresent = fs.existsSync(path.join(root, "client_secret.json"));
  const envCredentialsPresent = fs.existsSync(envFile);
  const accounts = ["eran.peer79@gmail.com", "ioana.sbob@gmail.com"].map((email) => ({
    email,
    credential_present: fs.existsSync(path.join(root, "credentials", `${email}.json`)),
  }));
  const hasClient = clientCredentialsPresent || envCredentialsPresent;
  const hasAnyAccount = accounts.some((account) => account.credential_present);
  const status = hasClient && accounts.every((account) => account.credential_present)
    ? "ok"
    : hasClient && hasAnyAccount
      ? "partial"
      : "missing";
  return {
    route: "google_workspace_private",
    status,
    client_credentials_present: clientCredentialsPresent,
    env_credentials_present: envCredentialsPresent,
    accounts,
  };
}

function summarize(personas: PersonaReport[], privateMcp: PrivateMcpReport): Record<string, number | string> {
  const required = personas.filter((persona) => persona.status !== "not-configured");
  return {
    required_total: required.length,
    required_ok: required.filter((persona) => persona.status === "ok").length,
    required_partial: required.filter((persona) => persona.status === "partial").length,
    required_blocked: required.filter((persona) => persona.status === "blocked").length,
    required_missing: required.filter((persona) => persona.status === "missing").length,
    not_configured: personas.filter((persona) => persona.status === "not-configured").length,
    reconnect_candidates: personas.filter((persona) => persona.reconnect).length,
    private_mcp_storage_status: privateMcp.status,
  };
}

function reconnectIfNeeded(
  persona: PersonaDefinition,
  attempts: TokenAttempt[],
  detail: string,
): ReconnectCandidate | undefined {
  if (!needsReconnect([detail, ...attempts.map((attempt) => attempt.reason || "")].join("\n"))) {
    return undefined;
  }
  return {
    persona_slug: persona.slug,
    label: persona.label,
    expected_email: persona.expectedEmail,
    reason: "Saved persona refresh token requires interactive reconnect.",
    command: reconnectCommand(persona.slug),
  };
}

function needsReconnect(detail: string): boolean {
  const lower = detail.toLowerCase();
  return lower.includes("invalid_rapt") ||
    lower.includes("invalid_grant") ||
    lower.includes("reauth") ||
    lower.includes("refresh token");
}

function reconnectCommand(personaSlug: string): string {
  return `npm run google-auth:reconnect-oauth-vault -- --persona ${personaSlug} --interactive`;
}

function removeGeneratedGcloudLogs(configDir: string): void {
  fs.rmSync(path.join(configDir, "logs"), { recursive: true, force: true });
}

function globalCodexPath(...segments: string[]): string {
  return path.join(os.homedir(), ".codex", ...segments);
}

function isTokenAttempts(error: unknown): error is Error & { attempts: TokenAttempt[] } {
  return Boolean(error && typeof error === "object" && "attempts" in error && Array.isArray((error as { attempts?: unknown }).attempts));
}

function sanitizeError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  return raw
    .replace(
      /Please run:\n\n\s*\$ gcloud auth(?: application-default)? login[\s\S]*?to obtain new credentials\./g,
      "Interactive Google auth is required by the cached credential and was not attempted.",
    )
    .replace(
      /For service account, please activate it first:\n\n\s*\$ gcloud auth activate-service-account ACCOUNT\n/g,
      "Service-account activation was not attempted by this verifier.\n",
    )
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/g, "Bearer [REDACTED]")
    .replace(/access_token=([^&\s]+)/g, "access_token=[REDACTED]")
    .replace(/refresh_token=([^&\s]+)/g, "refresh_token=[REDACTED]")
    .replace(/"access_token"\s*:\s*"[^"]+"/g, "\"access_token\":\"[REDACTED]\"")
    .replace(/"refresh_token"\s*:\s*"[^"]+"/g, "\"refresh_token\":\"[REDACTED]\"")
    .replace(/"client_secret"\s*:\s*"[^"]+"/g, "\"client_secret\":\"[REDACTED]\"")
    .replace(/ya29\.[A-Za-z0-9._~+/=-]+/g, "ya29.[REDACTED]")
    .slice(0, 1200);
}

main(process.argv.slice(2)).then(
  (code) => {
    process.exitCode = code;
  },
  (error) => {
    process.stderr.write(`${sanitizeError(error)}\n`);
    process.exitCode = 1;
  },
);
