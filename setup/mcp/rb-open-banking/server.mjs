#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import {
  createSession,
  enableBankingStatus,
  getApplication,
  getBalances,
  getSession,
  getTransactions,
  listAspsps,
  listLocalSessions,
  startAuthorization,
} from "./enable-banking-client.mjs";
import { getEntityConfigStatus } from "./config.mjs";
import { entitySetupStatus, registryStatus } from "./registry.mjs";
import { wamoDirectStatus } from "./wamo-direct-client.mjs";
import {
  getBalanceStatement,
  getProfile,
  listAccountDetails,
  listBalances,
  listProfiles,
  wiseStatus,
} from "./wise-client.mjs";

if (process.argv.includes("--status")) {
  console.log(JSON.stringify(overallStatus(), null, 2));
  process.exit(0);
}

const mcp = new McpServer({
  name: "rb-open-banking",
  version: "0.1.0",
});

mcp.registerTool(
  "rb_open_banking_status",
  {
    description: "Show safe RB open-banking setup status without secrets, account IDs, balances, or transactions.",
    inputSchema: {},
  },
  async () => jsonResponse(overallStatus()),
);

mcp.registerTool(
  "rb_open_banking_entity_setup_status",
  {
    description: "Show safe registry and env setup status for one entity reference.",
    inputSchema: {
      entityRef: z.string().min(1).describe("Notion Company Reference, for example AKS or VUN."),
    },
  },
  async ({ entityRef }) => jsonResponse(entitySetupStatus(entityRef)),
);

mcp.registerTool(
  "rb_open_banking_entity_env_status",
  {
    description: "Show safe per-entity open-banking environment-variable readiness.",
    inputSchema: {
      entityRef: z.string().min(1).describe("Notion Company Reference, for example AKS or VUN."),
    },
  },
  async ({ entityRef }) => jsonResponse(getEntityConfigStatus(entityRef)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_status",
  {
    description: "Show safe Enable Banking configuration status.",
    inputSchema: {},
  },
  async () => jsonResponse(enableBankingStatus()),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_get_application",
  {
    description: "Verify Enable Banking application authentication. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
    },
  },
  async (input) => jsonResponse(await getApplication(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_list_aspsps",
  {
    description: "List Enable Banking ASPSPs/banks for a country. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      country: z.string().length(2).default("IE"),
      nameContains: z.string().optional(),
      limit: z.number().int().min(1).max(200).default(50),
    },
  },
  async (input) => jsonResponse(await listAspsps(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_start_authorization",
  {
    description: "Create a read-only Enable Banking consent URL for an entity bank rail. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
      bankRail: z.enum(["boi_business", "wamo"]).default("boi_business"),
      aspspName: z.string().optional(),
      country: z.string().length(2).optional(),
      psuType: z.enum(["personal", "business"]).default("business"),
      validDays: z.number().int().min(1).max(180).default(90),
      redirectUrl: z.string().url().optional(),
      state: z.string().optional(),
      language: z.string().optional(),
      psuId: z.string().optional(),
      psuIpAddress: z.string().optional(),
      psuUserAgent: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await startAuthorization(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_create_session",
  {
    description: "Exchange an Enable Banking authorization code for a local session. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      code: z.string().optional(),
      redirectedUrl: z.string().optional(),
      label: z.string().optional(),
      entityRef: z.string().optional(),
      bankRail: z.enum(["boi_business", "wamo"]).optional(),
      psuIpAddress: z.string().optional(),
      psuUserAgent: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await createSession(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_list_local_sessions",
  {
    description: "List locally saved Enable Banking session labels, entity refs, bank rails, and account counts without account IDs.",
    inputSchema: {},
  },
  async () => jsonResponse(listLocalSessions()),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_get_session",
  {
    description: "Refresh and return an Enable Banking session. Requires explicit approvalPurpose because account IDs may be returned.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      label: z.string().optional(),
      sessionId: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await getSession(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_get_balances",
  {
    description: "Fetch balances for an authorized Enable Banking account. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      accountId: z.string().optional(),
      sessionId: z.string().optional(),
      sessionLabel: z.string().optional(),
      accountIndex: z.number().int().min(0).default(0),
      psuIpAddress: z.string().optional(),
      psuUserAgent: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await getBalances(input)),
);

mcp.registerTool(
  "rb_open_banking_enable_banking_get_transactions",
  {
    description: "Fetch transactions for an authorized Enable Banking account. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      accountId: z.string().optional(),
      sessionId: z.string().optional(),
      sessionLabel: z.string().optional(),
      accountIndex: z.number().int().min(0).default(0),
      dateFrom: z.string().optional(),
      dateTo: z.string().optional(),
      continuationKey: z.string().optional(),
      transactionStatus: z.string().optional(),
      strategy: z.string().optional(),
      psuIpAddress: z.string().optional(),
      psuUserAgent: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await getTransactions(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_status",
  {
    description: "Show safe Wise API configuration status without printing tokens.",
    inputSchema: {
      entityRef: z.string().optional(),
    },
  },
  async (input) => jsonResponse(wiseStatus(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_list_profiles",
  {
    description: "List Wise profiles available to the token. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await listProfiles(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_get_profile",
  {
    description: "Read a Wise profile by profileId or entityRef. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
      profileId: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await getProfile(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_list_balances",
  {
    description: "List Wise balances for a profile. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
      profileId: z.string().optional(),
      types: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await listBalances(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_list_account_details",
  {
    description: "List Wise account details for a profile. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
      profileId: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await listAccountDetails(input)),
);

mcp.registerTool(
  "rb_open_banking_wise_get_balance_statement",
  {
    description: "Read a Wise balance statement in JSON. Requires explicit approvalPurpose.",
    inputSchema: {
      approvalPurpose: z.string().min(12),
      entityRef: z.string().optional(),
      profileId: z.string().optional(),
      balanceId: z.string().min(1),
      currency: z.string().length(3),
      intervalStart: z.string().min(1),
      intervalEnd: z.string().min(1),
      type: z.enum(["COMPACT", "FLAT"]).default("COMPACT"),
      statementLocale: z.string().optional(),
    },
  },
  async (input) => jsonResponse(await getBalanceStatement(input)),
);

mcp.registerTool(
  "rb_open_banking_wamo_direct_status",
  {
    description: "Show Wamo direct PSD2 fallback status. This does not make live Wamo calls.",
    inputSchema: {},
  },
  async () => jsonResponse(wamoDirectStatus()),
);

async function main() {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);
  console.error("RB Open Banking MCP server running on stdio.");
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});

function overallStatus() {
  return {
    registry: registryStatus(),
    enableBanking: enableBankingStatus(),
    wise: wiseStatus(),
    wamoDirect: wamoDirectStatus(),
  };
}

function jsonResponse(data) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: data,
  };
}
