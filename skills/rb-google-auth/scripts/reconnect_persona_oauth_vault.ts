import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import { createServer, Server } from "node:http";
import { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";

import { google } from "googleapis";

import {
  AuthorizedUserCredentials,
  GooglePersonaDefinition,
  PERSONA_OAUTH_SCOPES,
  personaDefinitionForSlug,
  personaOauthCredentialFile,
  personaOauthSafeStatus,
  refreshPersonaOauthAccessToken,
  writePersonaOauthCredentials,
} from "./persona_oauth_vault";

interface CliOptions {
  personaSlug: string;
  interactive: boolean;
}

interface OAuthTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface OAuthClientConfig {
  client_id: string;
  client_secret: string;
}

const PERSONA_RECONNECT_SCOPES = PERSONA_OAUTH_SCOPES;

async function main(argv: string[]): Promise<number> {
  const options = parseOptions(argv);
  if (!options.personaSlug) {
    process.stdout.write(`${usage()}\n`);
    return 2;
  }
  if (!options.interactive) {
    throw new Error(
      "Refusing to start OAuth without --interactive. " +
        `To reconnect this exact persona, run: ${reconnectCommand(options.personaSlug)}`,
    );
  }

  const persona = personaForSlug(options.personaSlug);
  if (!persona.configured) {
    throw new Error(`Persona is not configured for reconnect: ${persona.slug}`);
  }
  if (!persona.accountEmail || !persona.expectedEmail) {
    throw new Error(`Persona ${persona.slug} is missing an expected account email.`);
  }

  const oauthClientFile = personaOAuthClientFile(persona);
  if (!oauthClientFile || !fs.existsSync(oauthClientFile)) {
    throw new Error(
      `Missing sender-matched OAuth client file for ${persona.slug}. ` +
        "Run google-auth:recover-oauth-clients if an ADC source still exists, or create the matching local client file first.",
    );
  }

  const vaultFile = personaOauthCredentialFile(persona.slug);
  const previousVault = fs.existsSync(vaultFile) ? fs.readFileSync(vaultFile) : undefined;

  try {
    const credentials = await runInstalledAppOAuth(
      persona,
      readOAuthClient(oauthClientFile),
      PERSONA_RECONNECT_SCOPES,
    );
    const actualEmail = await refreshedAccountEmail(credentials);
    if (actualEmail.toLowerCase() !== persona.expectedEmail.toLowerCase()) {
      throw new Error(
        `Reconnected Google account mismatch for ${persona.slug}: expected ${persona.expectedEmail}, got ${actualEmail}. ` +
          "The OAuth vault was not updated.",
      );
    }

    writePersonaOauthCredentials(persona.slug, {
      type: "authorized_user",
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      refresh_token: credentials.refresh_token,
      quota_project_id: credentials.quota_project_id,
      account_email: persona.accountEmail,
      scopes: PERSONA_RECONNECT_SCOPES,
      source: "persona-oauth-reconnect",
      updated_at: new Date().toISOString(),
    });

    await refreshPersonaOauthAccessToken({
      serviceName: `${persona.label} OAuth vault reconnect verification`,
      personaSlug: persona.slug,
      accountEmail: persona.accountEmail,
      updateStatus: true,
    });

    process.stdout.write(`${JSON.stringify({
      ok: true,
      persona_slug: persona.slug,
      account_email: persona.accountEmail,
      vault: personaOauthSafeStatus(persona.slug),
      credential_file: personaOauthCredentialFile(persona.slug),
      message: "OAuth vault refresh token updated for the exact persona.",
    }, null, 2)}\n`);
    return 0;
  } catch (error) {
    restoreVault(vaultFile, previousVault);
    throw error;
  }
}

function parseOptions(argv: string[]): CliOptions {
  const options: CliOptions = { personaSlug: "", interactive: false };
  for (let index = 0; index < argv.length; index += 1) {
    const [arg, inlineValue] = argv[index].split("=", 2);
    if (arg === "--help") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    }
    if (arg === "--interactive") {
      options.interactive = true;
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
  return `Usage: reconnect_persona_oauth_vault.ts --persona SLUG --interactive

Starts an explicit Google OAuth reconnect for one persona, then updates only
that persona's vault file after the returned account email matches the expected
persona email. It never prints access tokens, refresh tokens, or client secrets.`;
}

function reconnectCommand(personaSlug: string): string {
  return `npm run google-auth:reconnect-oauth-vault -- --persona ${personaSlug} --interactive`;
}

function requiredValue(argv: string[], index: number, option: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}.`);
  }
  return value;
}

function personaForSlug(personaSlug: string): GooglePersonaDefinition {
  const persona = personaDefinitionForSlug(personaSlug);
  if (!persona) {
    throw new Error(`Unknown persona slug: ${personaSlug}`);
  }
  return persona;
}

function personaOAuthClientFile(persona: GooglePersonaDefinition): string {
  const domain = (persona.accountEmail || "").toLowerCase().split("@")[1] || "";
  if (domain === "eip.ventures") {
    return globalCodexPath("google-oauth-client.eip.json");
  }
  if (domain === "konvi.app") {
    return globalCodexPath("google-oauth-client.konvi.json");
  }
  if (domain === "richmondblackwood.com") {
    return globalCodexPath("google-oauth-client.richmondblackwood.json");
  }
  return globalCodexPath("google-oauth-client.json");
}

async function refreshedAccountEmail(credentials: AuthorizedUserCredentials): Promise<string> {
  const params = new URLSearchParams({
    client_id: credentials.client_id || "",
    client_secret: credentials.client_secret || "",
    refresh_token: credentials.refresh_token || "",
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
    throw new Error(`Failed to verify the reconnected refresh token: ${details}`);
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: body.access_token });
  const result = await google.oauth2({ version: "v2", auth }).userinfo.get();
  const email = result.data.email || "";
  if (!email) {
    throw new Error("Google did not return an account email for the reconnected token.");
  }
  return email;
}

function readOAuthClient(oauthClientFile: string): OAuthClientConfig {
  const parsed = JSON.parse(fs.readFileSync(oauthClientFile, "utf8")) as {
    installed?: Partial<OAuthClientConfig>;
    web?: Partial<OAuthClientConfig>;
  };
  const client = parsed.installed || parsed.web;
  if (!client?.client_id || !client.client_secret) {
    throw new Error(`OAuth client file is missing client_id or client_secret: ${oauthClientFile}`);
  }
  return {
    client_id: client.client_id,
    client_secret: client.client_secret,
  };
}

async function runInstalledAppOAuth(
  persona: GooglePersonaDefinition,
  client: OAuthClientConfig,
  scopes: string[],
): Promise<AuthorizedUserCredentials> {
  const state = randomBytes(18).toString("hex");
  const callback = await startOAuthCallbackServer(state);
  try {
    const oauth = new google.auth.OAuth2(client.client_id, client.client_secret, callback.redirectUri);
    const authUrl = oauth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
      state,
    });
    process.stderr.write(
      `Open this URL to reconnect ${persona.label} (${persona.expectedEmail}):\n${authUrl}\n`,
    );
    openBrowser(authUrl);
    const code = await callback.code;
    const result = await oauth.getToken(code);
    const refreshToken = result.tokens.refresh_token || "";
    if (!refreshToken) {
      throw new Error(
        "Google did not return a refresh token. Re-run the reconnect and make sure the consent prompt is completed for the expected account.",
      );
    }
    return {
      type: "authorized_user",
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: refreshToken,
      account_email: persona.accountEmail,
      scopes,
      source: "persona-oauth-direct-reconnect",
      updated_at: new Date().toISOString(),
    };
  } finally {
    callback.close();
  }
}

async function startOAuthCallbackServer(expectedState: string): Promise<{
  redirectUri: string;
  code: Promise<string>;
  close: () => void;
}> {
  let server: Server | undefined;
  let settled = false;
  let timeout: NodeJS.Timeout | undefined;
  let resolveCode: (code: string) => void = () => undefined;
  let rejectCode: (error: Error) => void = () => undefined;
  const code = new Promise<string>((resolve, reject) => {
    resolveCode = resolve;
    rejectCode = reject;
  });

  server = createServer((req, res) => {
    const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const error = requestUrl.searchParams.get("error");
    const state = requestUrl.searchParams.get("state") || "";
    const authCode = requestUrl.searchParams.get("code") || "";
    if (settled) {
      res.writeHead(409, { "Content-Type": "text/plain" });
      res.end("OAuth callback already handled.");
      return;
    }
    if (error) {
      settled = true;
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Google OAuth returned an error. You can close this tab.");
      rejectCode(new Error(`Google OAuth returned error: ${error}`));
      return;
    }
    if (state !== expectedState) {
      settled = true;
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("OAuth state mismatch. You can close this tab.");
      rejectCode(new Error("OAuth state mismatch during reconnect."));
      return;
    }
    if (!authCode) {
      settled = true;
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("OAuth callback did not include a code. You can close this tab.");
      rejectCode(new Error("OAuth callback did not include an authorization code."));
      return;
    }
    settled = true;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Google OAuth reconnect complete. You can close this tab and return to Codex.");
    resolveCode(authCode);
  });

  const redirectUri = await new Promise<string>((resolve, reject) => {
    server?.once("error", reject);
    server?.listen(0, "localhost", () => {
      const address = server?.address() as AddressInfo;
      resolve(`http://localhost:${address.port}`);
    });
  });
  timeout = setTimeout(() => {
    if (!settled) {
      settled = true;
      rejectCode(new Error("Timed out waiting for Google OAuth callback."));
      server?.close();
    }
  }, 10 * 60 * 1000);
  timeout.unref();

  return {
    redirectUri,
    code,
    close: () => {
      if (timeout) clearTimeout(timeout);
      server?.close();
      server?.closeAllConnections();
    },
  };
}

function openBrowser(url: string): void {
  const command = process.platform === "darwin"
    ? "open"
    : process.platform === "win32"
      ? "cmd"
      : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  try {
    const child = spawn(command, args, { detached: true, stdio: "ignore" });
    child.unref();
  } catch {
    // The URL is printed above; the caller can open it manually.
  }
}

function restoreVault(vaultFile: string, previousVault?: Buffer): void {
  if (previousVault) {
    fs.mkdirSync(path.dirname(vaultFile), { recursive: true, mode: 0o700 });
    fs.writeFileSync(vaultFile, previousVault, { mode: 0o600 });
    fs.chmodSync(vaultFile, 0o600);
    return;
  }
  fs.rmSync(vaultFile, { force: true });
}

function globalCodexPath(...segments: string[]): string {
  return path.join(os.homedir(), ".codex", ...segments);
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
