import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type GooglePersonaService = "gmail" | "drive" | "calendar";

export interface GooglePersonaDefinition {
  slug: string;
  aliases?: string[];
  label: string;
  expectedEmail?: string;
  accountEmail?: string;
  configured: boolean;
  services: GooglePersonaService[];
}

export interface PersonaOAuthTokenRequest {
  serviceName: string;
  personaSlug?: string;
  accountEmail?: string;
  gcloudConfigDir?: string;
  updateStatus?: boolean;
}

export interface AuthorizedUserCredentials {
  type?: string;
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
  quota_project_id?: string;
  account_email?: string;
  scopes?: string[];
  source?: string;
  updated_at?: string;
}

interface OAuthTokenResponse {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

export interface PersonaOAuthRefreshResult {
  personaSlug: string;
  accountEmail: string;
  accessToken: string;
  expiresIn?: number;
  scope?: string;
  tokenType?: string;
}

export const GOOGLE_IDENTITY_SCOPES = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
];

export const PERSONA_GMAIL_SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.settings.basic",
];

export const PERSONA_DRIVE_SCOPES = [
  "https://www.googleapis.com/auth/drive",
];

export const PERSONA_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar",
];

export const PERSONA_OAUTH_SCOPES = [
  ...GOOGLE_IDENTITY_SCOPES,
  ...PERSONA_GMAIL_SCOPES,
  ...PERSONA_DRIVE_SCOPES,
  ...PERSONA_CALENDAR_SCOPES,
];

export const GOOGLE_PERSONAS: GooglePersonaDefinition[] = [
  {
    slug: "accounting-richmond-blackwood",
    aliases: ["rb-accounting"],
    label: "RB Accounting shared mailbox",
    expectedEmail: "accounting@richmondblackwood.com",
    accountEmail: "accounting@richmondblackwood.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "compliance-richmond-blackwood",
    aliases: ["rb-compliance"],
    label: "RB Compliance shared mailbox",
    expectedEmail: "compliance@richmondblackwood.com",
    accountEmail: "compliance@richmondblackwood.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "ioana-richmond-blackwood",
    label: "Ioana Richmond Blackwood",
    expectedEmail: "ioana@richmondblackwood.com",
    accountEmail: "ioana@richmondblackwood.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "jp-richmond-blackwood",
    aliases: ["johnpaul-richmond-blackwood"],
    label: "JP Richmond Blackwood",
    expectedEmail: "johnpaul.okolie@richmondblackwood.com",
    accountEmail: "johnpaul.okolie@richmondblackwood.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "simoneta-richmond-blackwood",
    label: "Simoneta Richmond Blackwood",
    configured: false,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "ioana-private",
    label: "Ioana Private",
    expectedEmail: "ioana.sbob@gmail.com",
    accountEmail: "ioana.sbob@gmail.com",
    configured: false,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "ioana-eip",
    label: "Ioana EIP",
    expectedEmail: "ioana@eip.ventures",
    accountEmail: "ioana@eip.ventures",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "ioana-konvi",
    label: "Ioana Konvi",
    configured: false,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "ioana-everguard",
    label: "Ioana Everguard",
    configured: false,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "eran-konvi",
    label: "Eran Konvi",
    expectedEmail: "eran@konvi.app",
    accountEmail: "eran@konvi.app",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "eran-exotic-vaults",
    label: "Eran Exotic Vaults",
    expectedEmail: "eran@konvi.app",
    accountEmail: "eran@konvi.app",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "eran-everguard",
    label: "Eran Everguard",
    expectedEmail: "eran@eip.ventures",
    accountEmail: "eran@eip.ventures",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "eran-richmond-blackwood",
    label: "Eran Richmond Blackwood",
    expectedEmail: "eran@richmondblackwood.com",
    accountEmail: "eran@richmondblackwood.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
  {
    slug: "eran-private",
    label: "Eran Private gcloud",
    expectedEmail: "eran.peer79@gmail.com",
    accountEmail: "eran.peer79@gmail.com",
    configured: true,
    services: ["gmail", "drive", "calendar"],
  },
];

export function personaOauthCredentialFile(personaSlug: string): string {
  return globalCodexPath("google-personas", canonicalPersonaSlug(personaSlug), "oauth", "authorized_user.json");
}

export function personaOauthStatusFile(personaSlug: string): string {
  return globalCodexPath("google-personas", canonicalPersonaSlug(personaSlug), "oauth", "status.json");
}

export function hasPersonaOauthCredentials(personaSlug: string): boolean {
  return fs.existsSync(personaOauthCredentialFile(personaSlug));
}

export function personaDefinitionForSlug(personaSlug: string): GooglePersonaDefinition | undefined {
  const normalized = personaSlug.trim().toLowerCase();
  return GOOGLE_PERSONAS.find((persona) =>
    persona.slug === normalized || persona.aliases?.some((alias) => alias === normalized),
  );
}

export function canonicalPersonaSlug(personaSlug: string): string {
  return personaDefinitionForSlug(personaSlug)?.slug || personaSlug;
}

export function personaSlugForOAuth(accountEmail = "", gcloudConfigDir = "", explicitPersonaSlug = ""): string {
  if (explicitPersonaSlug) {
    return canonicalPersonaSlug(explicitPersonaSlug);
  }

  const slugFromConfig = personaSlugFromGcloudConfigDir(gcloudConfigDir);
  if (slugFromConfig) {
    return canonicalPersonaSlug(slugFromConfig);
  }

  const normalizedEmail = accountEmail.trim().toLowerCase();
  if (!normalizedEmail) {
    return "";
  }

  const exactPersona = GOOGLE_PERSONAS.find((persona) => persona.accountEmail?.toLowerCase() === normalizedEmail);
  return exactPersona?.slug || "";
}

export function personaSlugFromGcloudConfigDir(gcloudConfigDir = ""): string {
  const normalized = gcloudConfigDir.replace(/\\/g, "/");
  const match = normalized.match(/\/google-personas\/([^/]+)\/gcloud\/?$/);
  return match ? match[1] : "";
}

export async function getPersonaOauthAccessToken(request: PersonaOAuthTokenRequest): Promise<string> {
  const result = await refreshPersonaOauthAccessToken(request);
  return result.accessToken;
}

export async function refreshPersonaOauthAccessToken(
  request: PersonaOAuthTokenRequest,
): Promise<PersonaOAuthRefreshResult> {
  const personaSlug = personaSlugForOAuth(request.accountEmail, request.gcloudConfigDir, request.personaSlug);
  if (!personaSlug) {
    throw new Error(`Missing persona slug for ${request.serviceName} OAuth vault refresh.`);
  }

  const persona = personaDefinitionForSlug(personaSlug);
  const credentials = readPersonaOauthCredentials(personaSlug);
  const accountEmail = credentials.account_email || persona?.accountEmail || request.accountEmail || "";
  if (!credentials.client_id || !credentials.client_secret || !credentials.refresh_token) {
    throw new Error(`Persona OAuth vault credentials are incomplete for ${personaSlug}.`);
  }

  const params = new URLSearchParams({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    refresh_token: credentials.refresh_token,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const body = (await response.json()) as OAuthTokenResponse;
  if (!response.ok || !body.access_token) {
    const details = [body.error, body.error_description].filter(Boolean).join(": ") || response.statusText;
    if (request.updateStatus) {
      writePersonaOauthStatus(personaSlug, {
        account_email: accountEmail,
        last_refresh_status: "failed",
        last_refresh_at: new Date().toISOString(),
        last_refresh_error: details,
      });
    }
    throw new Error(`Failed to refresh persona OAuth vault token for ${personaSlug}: ${details}`);
  }

  if (request.updateStatus) {
    writePersonaOauthStatus(personaSlug, {
      account_email: accountEmail,
      last_refresh_status: "ok",
      last_refresh_at: new Date().toISOString(),
      token_type: body.token_type || "",
      expires_in_seconds: body.expires_in || 0,
      scope_present: Boolean(body.scope),
    });
  }

  return {
    personaSlug,
    accountEmail,
    accessToken: body.access_token,
    expiresIn: body.expires_in,
    scope: body.scope,
    tokenType: body.token_type,
  };
}

export function personaOauthSafeStatus(personaSlug: string): Record<string, string | boolean | number> {
  const credentialFile = personaOauthCredentialFile(personaSlug);
  const credentials = fs.existsSync(credentialFile) ? readPersonaOauthCredentials(personaSlug) : {};
  const statusFile = personaOauthStatusFile(personaSlug);
  const status = fs.existsSync(statusFile)
    ? JSON.parse(fs.readFileSync(statusFile, "utf8")) as Record<string, string | boolean | number>
    : {};
  return {
    persona_slug: personaSlug,
    credential_file: credentialFile,
    credential_present: fs.existsSync(credentialFile),
    account_email: String(credentials.account_email || ""),
    client_id_present: Boolean(credentials.client_id),
    client_secret_present: Boolean(credentials.client_secret),
    refresh_token_present: Boolean(credentials.refresh_token),
    scopes_count: Array.isArray(credentials.scopes) ? credentials.scopes.length : 0,
    last_refresh_status: String(status.last_refresh_status || ""),
    last_refresh_at: String(status.last_refresh_at || ""),
  };
}

export function tokenHasGmailReadWriteScope(scope = ""): boolean {
  const scopes = parseScope(scope);
  return scopes.has("https://mail.google.com/") ||
    scopes.has("https://www.googleapis.com/auth/gmail.modify");
}

export function writePersonaOauthCredentials(personaSlug: string, credentials: AuthorizedUserCredentials): void {
  const credentialFile = personaOauthCredentialFile(personaSlug);
  fs.mkdirSync(path.dirname(credentialFile), { recursive: true, mode: 0o700 });
  fs.writeFileSync(credentialFile, `${JSON.stringify(credentials, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(credentialFile, 0o600);
}

function readPersonaOauthCredentials(personaSlug: string): AuthorizedUserCredentials {
  const credentialFile = personaOauthCredentialFile(personaSlug);
  if (!fs.existsSync(credentialFile)) {
    throw new Error(`Persona OAuth vault credentials are missing: ${credentialFile}`);
  }
  return JSON.parse(fs.readFileSync(credentialFile, "utf8")) as AuthorizedUserCredentials;
}

function writePersonaOauthStatus(personaSlug: string, status: Record<string, string | boolean | number>): void {
  const statusFile = personaOauthStatusFile(personaSlug);
  fs.mkdirSync(path.dirname(statusFile), { recursive: true, mode: 0o700 });
  fs.writeFileSync(statusFile, `${JSON.stringify(status, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(statusFile, 0o600);
}

function parseScope(scope = ""): Set<string> {
  return new Set(scope.split(/\s+/).map((value) => value.trim()).filter(Boolean));
}

function globalCodexPath(...segments: string[]): string {
  return path.join(os.homedir(), ".codex", ...segments);
}
