#!/usr/bin/env node
import crypto from "node:crypto";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fetchImpl = globalThis.fetch ?? (await import("node-fetch")).default;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const worktreeRoot = path.resolve(__dirname, "../..");
const commonGitDir = await resolveCommonGitDir(worktreeRoot);
const baseRepoRoot = commonGitDir ? path.dirname(commonGitDir) : worktreeRoot;
const envFile = process.env.RB_XERO_ENV_FILE || path.join(baseRepoRoot, ".env");
const activeFile =
  process.env.RB_XERO_ACTIVE_CLIENT_FILE ||
  path.join(baseRepoRoot, ".codex-local/xero-active-client");

const command = process.argv[2];
const clientArg = process.argv[3];

if (!command || !["login", "access-token", "connections"].includes(command)) {
  usage();
  process.exit(1);
}

const env = readEnv(envFile);
const clientKey = normalizeClientReference(
  clientArg ||
    process.env.RB_XERO_CLIENT_REFERENCE ||
    readActiveClient(activeFile) ||
    env.RB_XERO_ACTIVE_CLIENT_REFERENCE,
);

if (!clientKey) {
  throw new Error(
    "Missing Xero client reference. Pass one explicitly or select it with setup/mcp/select-xero-client.sh.",
  );
}

const clientId = env.RB_XERO_CLIENT_ID;
const clientSecret = env.RB_XERO_SECRET || env.RB_XERO_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error(
    `Missing RB Xero OAuth app credentials. Expected RB_XERO_CLIENT_ID and RB_XERO_SECRET in ${envFile}.`,
  );
}

const redirectUri =
  env.RB_XERO_REDIRECT_URI ||
  env[`RB_XERO_${clientKey}_REDIRECT_URI`] ||
  "http://localhost:36777/callback";
const scopes =
  env.RB_XERO_OAUTH_SCOPES ||
  env[`RB_XERO_${clientKey}_OAUTH_SCOPES`] ||
  "offline_access accounting.settings accounting.contacts accounting.transactions.read accounting.reports.read";
const tokenFile =
  env[`RB_XERO_${clientKey}_TOKEN_FILE`] ||
  path.join(baseRepoRoot, ".codex-local/xero", clientKey, "oauth-token.json");

if (command === "login") {
  await login();
} else if (command === "access-token") {
  const token = await getAccessToken();
  process.stdout.write(token);
} else if (command === "connections") {
  const token = await getAccessToken();
  const connections = await getConnections(token);
  console.log(JSON.stringify(redactConnections(connections), null, 2));
}

async function login() {
  const state = crypto.randomBytes(24).toString("hex");
  const callback = new URL(redirectUri);
  const authUrl = new URL("https://login.xero.com/identity/connect/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("state", state);

  const server = http.createServer();
  const codePromise = new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      const incoming = new URL(req.url || "/", redirectUri);
      if (incoming.pathname !== callback.pathname) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const error = incoming.searchParams.get("error");
      if (error) {
        const description = incoming.searchParams.get("error_description") || "";
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Xero authorization failed. You can close this tab.");
        reject(new Error(`${error}: ${description}`));
        server.close();
        return;
      }
      if (incoming.searchParams.get("state") !== state) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("State mismatch. You can close this tab.");
        reject(new Error("OAuth state mismatch"));
        server.close();
        return;
      }
      const code = incoming.searchParams.get("code");
      if (!code) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing authorization code. You can close this tab.");
        reject(new Error("Missing authorization code"));
        server.close();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Xero authorization complete. You can close this tab and return to Codex.");
      resolve(code);
      server.close();
    });
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(Number(callback.port || 80), callback.hostname, resolve);
  });

  if (process.env.RB_XERO_AUTH_URL_FILE) {
    fs.writeFileSync(process.env.RB_XERO_AUTH_URL_FILE, `${authUrl.toString()}\n`, {
      mode: 0o600,
    });
    fs.chmodSync(process.env.RB_XERO_AUTH_URL_FILE, 0o600);
    console.log(`XERO_AUTH_URL_FILE=${process.env.RB_XERO_AUTH_URL_FILE}`);
  } else {
    console.log(`XERO_AUTH_URL=${authUrl.toString()}`);
  }
  console.log(`Waiting for Xero OAuth callback on ${redirectUri}`);

  const code = await codePromise;
  const tokenSet = await tokenRequest({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  await writeToken(tokenSet);
  const connections = await getConnections(tokenSet.access_token);
  console.log(
    JSON.stringify(
      {
        clientReference: clientKey,
        tokenFile,
        connections: redactConnections(connections),
      },
      null,
      2,
    ),
  );
}

async function getAccessToken() {
  const tokenSet = readToken();
  if (!tokenSet.refresh_token && !tokenSet.access_token) {
    throw new Error(`No OAuth token stored for ${clientKey}. Run setup/mcp/xero-oauth.mjs login ${clientKey}.`);
  }
  const expiresAt = Number(tokenSet.expires_at || 0);
  if (tokenSet.access_token && expiresAt > Date.now() + 5 * 60 * 1000) {
    return tokenSet.access_token;
  }
  if (!tokenSet.refresh_token) {
    throw new Error(`Stored Xero token for ${clientKey} has no refresh_token. Run login again.`);
  }
  const refreshed = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token: tokenSet.refresh_token,
  });
  await writeToken(refreshed);
  return refreshed.access_token;
}

async function tokenRequest(params) {
  const body = new URLSearchParams(params);
  const response = await fetchImpl("https://identity.xero.com/connect/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  if (!response.ok) {
    throw new Error(`Xero token request failed: ${JSON.stringify(data)}`);
  }
  return {
    ...data,
    expires_at: Date.now() + Number(data.expires_in || 0) * 1000,
  };
}

async function getConnections(accessToken) {
  const response = await fetchImpl("https://api.xero.com/connections", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  if (!response.ok) {
    throw new Error(`Xero connections request failed: ${JSON.stringify(data)}`);
  }
  return Array.isArray(data) ? data : [];
}

function redactConnections(connections) {
  return connections.map((connection) => ({
    tenantId: connection.tenantId,
    tenantName: connection.tenantName,
    tenantType: connection.tenantType,
    createdDateUtc: connection.createdDateUtc,
    updatedDateUtc: connection.updatedDateUtc,
  }));
}

function readToken() {
  if (!fs.existsSync(tokenFile)) return {};
  return JSON.parse(fs.readFileSync(tokenFile, "utf8"));
}

async function writeToken(tokenSet) {
  fs.mkdirSync(path.dirname(tokenFile), { recursive: true, mode: 0o700 });
  fs.writeFileSync(tokenFile, JSON.stringify(tokenSet, null, 2) + "\n", {
    mode: 0o600,
  });
  fs.chmodSync(tokenFile, 0o600);
}

function readEnv(file) {
  if (!fs.existsSync(file)) return {};
  const result = {};
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const idx = rawLine.indexOf("=");
    const key = rawLine.slice(0, idx).trim();
    let value = rawLine.slice(idx + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function readActiveClient(file) {
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8").trim();
}

function normalizeClientReference(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "_");
}

async function resolveCommonGitDir(root) {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "git",
    ["-C", root, "rev-parse", "--path-format=absolute", "--git-common-dir"],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return "";
  return result.stdout.trim();
}

function usage() {
  console.error("Usage: setup/mcp/xero-oauth.mjs <login|access-token|connections> <CLIENT_REFERENCE>");
}
