#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const binPath = process.argv[2];

if (!binPath) {
  throw new Error("Usage: setup/mcp/patch-xero-mcp-tenant.mjs /path/to/xero-mcp-server");
}

const realBinPath = fs.realpathSync(binPath);
const packageRoot = path.resolve(path.dirname(realBinPath), "..");
const clientPath = path.join(packageRoot, "dist/clients/xero-client.js");
const marker = "RB_XERO_TENANT_PIN_PATCH";

let source = fs.readFileSync(clientPath, "utf8");
if (source.includes(marker)) {
  process.exit(0);
}

source = source.replace(
  `        if (this.tenants && this.tenants.length > 0) {
            this.tenantId = this.tenants[0].tenantId;
        }`,
  `        if (this.tenants && this.tenants.length > 0) {
            // ${marker}: prefer the RB-selected tenant when a token has multiple Xero connections.
            const requestedTenantId = process.env.XERO_TENANT_ID;
            const selectedTenant = requestedTenantId
                ? this.tenants.find((tenant) => tenant.tenantId === requestedTenantId)
                : this.tenants[0];
            if (requestedTenantId && !selectedTenant) {
                throw new Error(\`Requested Xero tenant \${requestedTenantId} is not available to this token\`);
            }
            this.tenantId = selectedTenant.tenantId;
        }`,
);

source = source.replace(
  `        if (connectionsResponse.data && connectionsResponse.data.length > 0) {
            this.tenantId = connectionsResponse.data[0].tenantId;
        }`,
  `        if (connectionsResponse.data && connectionsResponse.data.length > 0) {
            // ${marker}: prefer the RB-selected tenant when a token has multiple Xero connections.
            const requestedTenantId = process.env.XERO_TENANT_ID;
            const selectedTenant = requestedTenantId
                ? connectionsResponse.data.find((tenant) => tenant.tenantId === requestedTenantId)
                : connectionsResponse.data[0];
            if (requestedTenantId && !selectedTenant) {
                throw new Error(\`Requested Xero tenant \${requestedTenantId} is not available to this token\`);
            }
            this.tenantId = selectedTenant.tenantId;
        }`,
);

if (!source.includes(marker)) {
  throw new Error(`Could not patch tenant selection in ${clientPath}`);
}

fs.writeFileSync(clientPath, source);
