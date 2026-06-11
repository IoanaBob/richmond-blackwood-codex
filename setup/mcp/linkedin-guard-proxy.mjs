#!/usr/bin/env node

import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";

const MODE = process.env.RB_LINKEDIN_MCP_MODE || "read_only";
const UPSTREAM_COMMAND = process.env.RB_LINKEDIN_MCP_UPSTREAM_COMMAND || "uvx";
const USER_DATA_DIR =
  process.env.RB_LINKEDIN_MCP_USER_DATA_DIR ||
  path.join(os.homedir(), ".linkedin-mcp", "eran-richmond-blackwood", "profile");
const TIMEOUT_MS = process.env.RB_LINKEDIN_MCP_TIMEOUT_MS || process.env.TIMEOUT || "10000";
const TOOL_TIMEOUT_SECONDS = process.env.RB_LINKEDIN_MCP_TOOL_TIMEOUT_SECONDS || process.env.TOOL_TIMEOUT || "300";
const WRITE_ENABLED_MODES = new Set(["approved_write", "unsafe_all"]);

const READ_ONLY_TOOLS = new Set([
  "rb_linkedin_guard_status",
  "get_person_profile",
  "get_my_profile",
  "get_sidebar_profiles",
  "get_inbox",
  "get_conversation",
  "search_conversations",
  "get_company_profile",
  "get_company_posts",
  "search_companies",
  "get_company_employees",
  "search_jobs",
  "search_people",
  "get_job_details",
  "get_feed",
  "close_session",
]);

const KNOWN_WRITE_TOOLS = new Set([
  "connect_with_person",
  "send_message",
]);

function defaultUpstreamArgs() {
  if (process.env.RB_LINKEDIN_MCP_UPSTREAM_ARGS_JSON) {
    const parsed = JSON.parse(process.env.RB_LINKEDIN_MCP_UPSTREAM_ARGS_JSON);
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
      throw new Error("RB_LINKEDIN_MCP_UPSTREAM_ARGS_JSON must be a JSON array of strings.");
    }
    return parsed;
  }

  return [
    "mcp-server-linkedin@latest",
    "--timeout",
    TIMEOUT_MS,
    "--tool-timeout",
    TOOL_TIMEOUT_SECONDS,
    "--user-data-dir",
    USER_DATA_DIR,
    ...process.argv.slice(2),
  ];
}

function modeAllowsTool(toolName) {
  if (WRITE_ENABLED_MODES.has(MODE)) {
    return true;
  }
  if (MODE !== "read_only") {
    return READ_ONLY_TOOLS.has(toolName);
  }
  return READ_ONLY_TOOLS.has(toolName);
}

function isClearlyWriteTool(toolName) {
  return (
    KNOWN_WRITE_TOOLS.has(toolName) ||
    /^(send|connect|accept|create|post|comment|react|like|share|follow|apply|save|delete|update|edit|withdraw|invite)_/i.test(
      toolName,
    )
  );
}

function guardStatusPayload() {
  return {
    mode: MODE,
    upstream: {
      command: UPSTREAM_COMMAND,
      package: "mcp-server-linkedin@latest",
      user_data_dir: USER_DATA_DIR,
      timeout_ms: TIMEOUT_MS,
      tool_timeout_seconds: TOOL_TIMEOUT_SECONDS,
    },
    safeguards: {
      default: "read-only",
      write_tools_blocked_unless_mode_is_approved_write: Array.from(KNOWN_WRITE_TOOLS).sort(),
      unknown_tools_blocked_in_read_only_mode: true,
      approved_write_mode:
        "Write tools are exposed only when RB_LINKEDIN_MCP_MODE=approved_write for an approved, time-bounded send run.",
      anti_ban_controls:
        "Enforced by the LinkedIn growth skill: exact packet approval, daily quota gate, pacing, warning stop, active-account verification, and Growth Messages logging.",
      linkedin_account_policy:
        "Eran Richmond Blackwood for LinkedIn; when a call is booked, hand off scheduling to Ioana.",
    },
  };
}

function writeMessage(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function blockedResponse(id, toolName) {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code: -32000,
      message: `Blocked by RB LinkedIn MCP guard: ${toolName} is not available while RB_LINKEDIN_MCP_MODE=${MODE}.`,
      data: {
        tool: toolName,
        mode: MODE,
        remediation:
          "Use read-only tools, or deliberately switch RB_LINKEDIN_MCP_MODE=approved_write only for an approved, time-bounded send run.",
      },
    },
  };
}

function guardStatusResponse(id) {
  return {
    jsonrpc: "2.0",
    id,
    result: {
      content: [
        {
          type: "text",
          text: JSON.stringify(guardStatusPayload(), null, 2),
        },
      ],
      isError: false,
    },
  };
}

function filterToolsResponse(message) {
  if (!message?.result?.tools || !Array.isArray(message.result.tools)) {
    return message;
  }

  const filteredTools =
    WRITE_ENABLED_MODES.has(MODE)
      ? message.result.tools
      : message.result.tools.filter((tool) => {
          const name = String(tool?.name || "");
          return name && modeAllowsTool(name) && !isClearlyWriteTool(name);
        });

  const annotatedTools = filteredTools.map((tool) => ({
    ...tool,
    description: `${tool.description || ""}\n\nRB LinkedIn MCP guard: ${WRITE_ENABLED_MODES.has(MODE) ? "approved-write mode; Codex tool approval and growth-skill send gates still apply." : "read-only mode; LinkedIn write tools are hidden and blocked."}`.trim(),
  }));

  if (!annotatedTools.some((tool) => tool.name === "rb_linkedin_guard_status")) {
    annotatedTools.unshift({
      name: "rb_linkedin_guard_status",
      description: "Show the RB LinkedIn MCP guard mode, upstream command, and blocked write-tool policy.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    });
  }

  return {
    ...message,
    result: {
      ...message.result,
      tools: annotatedTools,
    },
  };
}

let upstream;
try {
  const upstreamArgs = defaultUpstreamArgs();
  upstream = spawn(UPSTREAM_COMMAND, upstreamArgs, {
    stdio: ["pipe", "pipe", "inherit"],
    env: {
      ...process.env,
      UV_HTTP_TIMEOUT: process.env.UV_HTTP_TIMEOUT || "300",
    },
  });

  process.stderr.write(
    `[rb-linkedin-mcp-guard] mode=${MODE}; upstream=${UPSTREAM_COMMAND} ${upstreamArgs.join(" ")}\n`,
  );
} catch (error) {
  process.stderr.write(`[rb-linkedin-mcp-guard] failed to start: ${error instanceof Error ? error.message : error}\n`);
  process.exit(1);
}

const pendingToolsListIds = new Set();

const clientLines = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
clientLines.on("line", (line) => {
  if (!line.trim()) {
    return;
  }

  let message;
  try {
    message = JSON.parse(line);
  } catch {
    upstream.stdin.write(`${line}\n`);
    return;
  }

  if (message.method === "tools/list" && message.id !== undefined) {
    pendingToolsListIds.add(message.id);
  }

  if (message.method === "tools/call") {
    const toolName = String(message.params?.name || "");
    if (toolName === "rb_linkedin_guard_status") {
      if (message.id !== undefined) {
        writeMessage(guardStatusResponse(message.id));
      }
      return;
    }

    if (!modeAllowsTool(toolName) || (!WRITE_ENABLED_MODES.has(MODE) && isClearlyWriteTool(toolName))) {
      if (message.id !== undefined) {
        writeMessage(blockedResponse(message.id, toolName || "<missing tool name>"));
      }
      return;
    }
  }

  upstream.stdin.write(`${JSON.stringify(message)}\n`);
});

const upstreamLines = readline.createInterface({ input: upstream.stdout, crlfDelay: Infinity });
upstreamLines.on("line", (line) => {
  if (!line.trim()) {
    return;
  }

  let message;
  try {
    message = JSON.parse(line);
  } catch {
    process.stdout.write(`${line}\n`);
    return;
  }

  if (pendingToolsListIds.has(message.id)) {
    pendingToolsListIds.delete(message.id);
    writeMessage(filterToolsResponse(message));
    return;
  }

  writeMessage(message);
});

upstream.on("exit", (code, signal) => {
  process.stderr.write(`[rb-linkedin-mcp-guard] upstream exited code=${code ?? "null"} signal=${signal ?? "null"}\n`);
  process.exit(code ?? 1);
});

process.on("SIGINT", () => upstream.kill("SIGINT"));
process.on("SIGTERM", () => upstream.kill("SIGTERM"));
