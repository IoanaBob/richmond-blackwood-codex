import { google } from "googleapis";

import {
  GOOGLE_PERSONAS,
  GooglePersonaDefinition,
  GooglePersonaService,
  hasPersonaOauthCredentials,
  personaOauthSafeStatus,
  refreshPersonaOauthAccessToken,
  tokenHasGmailReadWriteScope,
} from "./persona_oauth_vault";

type CheckStatus = "ok" | "failed" | "mismatch" | "skipped";

interface CliOptions {
  personaSlug: string;
  strict: boolean;
  refreshOnly: boolean;
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

interface PersonaVaultReport {
  persona_slug: string;
  label: string;
  expected_email?: string;
  status: "ok" | "partial" | "blocked" | "missing" | "not-configured";
  vault: Record<string, string | boolean | number>;
  checks: Partial<Record<GooglePersonaService | "identity" | "refresh", CheckResult>>;
  reconnect?: ReconnectCandidate;
}

async function main(argv: string[]): Promise<number> {
  const options = parseOptions(argv);
  const personas = options.personaSlug
    ? GOOGLE_PERSONAS.filter((persona) => persona.slug === options.personaSlug)
    : GOOGLE_PERSONAS.filter((persona) => persona.configured);
  if (options.personaSlug && personas.length === 0) {
    throw new Error(`Unknown persona slug: ${options.personaSlug}`);
  }

  const reports: PersonaVaultReport[] = [];
  for (const persona of personas) {
    reports.push(await verifyPersona(persona, options));
  }
  const summary = {
    total: reports.length,
    ok: reports.filter((report) => report.status === "ok").length,
    partial: reports.filter((report) => report.status === "partial").length,
    blocked: reports.filter((report) => report.status === "blocked").length,
    missing: reports.filter((report) => report.status === "missing").length,
    not_configured: reports.filter((report) => report.status === "not-configured").length,
    reconnect_candidates: reports.filter((report) => report.reconnect).length,
  };
  const reconnectCandidates = reports
    .map((report) => report.reconnect)
    .filter((candidate): candidate is ReconnectCandidate => Boolean(candidate));
  const ok = summary.blocked === 0 && summary.partial === 0 && summary.missing === 0;
  process.stdout.write(`${JSON.stringify({ ok, summary, reconnect_candidates: reconnectCandidates, personas: reports }, null, 2)}\n`);
  return options.strict && !ok ? 1 : 0;
}

function parseOptions(argv: string[]): CliOptions {
  const options: CliOptions = { personaSlug: "", strict: false, refreshOnly: false };
  for (let index = 0; index < argv.length; index += 1) {
    const [arg, inlineValue] = argv[index].split("=", 2);
    if (arg === "--help") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    }
    if (arg === "--strict") {
      options.strict = true;
      continue;
    }
    if (arg === "--refresh-only") {
      options.refreshOnly = true;
      continue;
    }
    if (arg === "--persona") {
      options.personaSlug = inlineValue !== undefined ? inlineValue : requiredValue(argv, index, arg);
      index += inlineValue === undefined ? 1 : 0;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function usage(): string {
  return `Usage: verify_persona_oauth_vault.ts [--persona SLUG] [--refresh-only] [--strict]

Reloads per-persona OAuth refresh credentials from ~/.codex and exchanges them
for a fresh access token without OAuth login. It never prints access tokens,
refresh tokens, or client secrets.`;
}

function requiredValue(argv: string[], index: number, option: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}.`);
  }
  return value;
}

async function verifyPersona(persona: GooglePersonaDefinition, options: CliOptions): Promise<PersonaVaultReport> {
  const vault = personaOauthSafeStatus(persona.slug);
  const checks: PersonaVaultReport["checks"] = {};

  if (!persona.configured) {
    return reportFor(persona, "not-configured", vault, checks);
  }
  if (!hasPersonaOauthCredentials(persona.slug)) {
    checks.refresh = { status: "skipped", detail: "missing persona OAuth vault credentials" };
    return reportFor(persona, "missing", vault, checks);
  }

  try {
    const token = await refreshPersonaOauthAccessToken({
      serviceName: `${persona.label} OAuth vault verifier`,
      personaSlug: persona.slug,
      accountEmail: persona.accountEmail,
      updateStatus: true,
    });
    checks.refresh = { status: "ok" };
    if (options.refreshOnly) {
      return reportFor(persona, "ok", personaOauthSafeStatus(persona.slug), checks);
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token.accessToken });
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
    return reportFor(persona, personaStatus(checks), personaOauthSafeStatus(persona.slug), checks);
  } catch (error) {
    const detail = sanitizeError(error);
    checks.refresh = { status: "failed", detail };
    return reportFor(
      persona,
      blockedOrMissing(detail),
      personaOauthSafeStatus(persona.slug),
      checks,
      reconnectIfNeeded(persona, detail),
    );
  }
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

function personaStatus(checks: PersonaVaultReport["checks"]): PersonaVaultReport["status"] {
  const values = Object.values(checks);
  if (values.length === 0) {
    return "partial";
  }
  return values.every((check) => check.status === "ok") ? "ok" : "partial";
}

function reportFor(
  persona: GooglePersonaDefinition,
  status: PersonaVaultReport["status"],
  vault: Record<string, string | boolean | number>,
  checks: PersonaVaultReport["checks"],
  reconnect?: ReconnectCandidate,
): PersonaVaultReport {
  return {
    persona_slug: persona.slug,
    label: persona.label,
    expected_email: persona.expectedEmail,
    status,
    vault,
    checks,
    ...(reconnect ? { reconnect } : {}),
  };
}

function blockedOrMissing(detail: string): PersonaVaultReport["status"] {
  const lower = detail.toLowerCase();
  return lower.includes("missing") ? "missing" : "blocked";
}

function reconnectIfNeeded(persona: GooglePersonaDefinition, detail: string): ReconnectCandidate | undefined {
  if (!needsReconnect(detail)) {
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

function sanitizeError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  return raw
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
