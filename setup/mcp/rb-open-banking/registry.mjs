import fs from "node:fs";
import path from "node:path";
import { bankRails, getEntityConfigStatus, repoRoot } from "./config.mjs";

const registryPath = path.join(repoRoot, "internal/bank-connectivity-registry.md");
const companiesRoot = path.join(repoRoot, "clients/Companies");

export function registryStatus() {
  const entityRefs = listCompanyRefs();
  const rows = readRegistryRows();
  const missing = [];
  const byStatus = {};

  for (const row of rows) {
    const status = row.status || "unknown";
    byStatus[status] = (byStatus[status] || 0) + 1;
  }

  for (const entityRef of entityRefs) {
    for (const bankRail of bankRails) {
      if (!rows.some((row) => row.entityReference === entityRef && row.bankRail === bankRail)) {
        missing.push({ entityReference: entityRef, bankRail });
      }
    }
  }

  return {
    registryFile: path.relative(repoRoot, registryPath),
    registryFileExists: fs.existsSync(registryPath),
    companyEntityCount: entityRefs.length,
    registryRowCount: rows.length,
    expectedRowCount: entityRefs.length * bankRails.length,
    missingRowCount: missing.length,
    missing,
    byStatus,
  };
}

export function entitySetupStatus(entityRef) {
  const rows = readRegistryRows().filter((row) => row.entityReference === entityRef);
  return {
    entityRef,
    registryRows: rows,
    missingRails: bankRails.filter((bankRail) => !rows.some((row) => row.bankRail === bankRail)),
    envStatus: getEntityConfigStatus(entityRef),
  };
}

export function readRegistryRows() {
  if (!fs.existsSync(registryPath)) return [];
  const lines = fs.readFileSync(registryPath, "utf8").split(/\r?\n/);
  const rows = [];
  let inTable = false;

  for (const line of lines) {
    if (!line.trim().startsWith("|")) {
      if (inTable) break;
      continue;
    }
    const cells = line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((cell) => cell.trim());
    if (cells.length < 8) continue;
    if (cells[0] === "Entity Reference") {
      inTable = true;
      continue;
    }
    if (cells.every((cell) => /^-+$/.test(cell.replace(/:/g, "")))) continue;
    if (!inTable) continue;
    rows.push({
      entityReference: cells[0],
      legalEntity: cells[1],
      bankRail: cells[2],
      providerRoute: cells[3],
      status: cells[4],
      safeAlias: cells[5],
      notionBankAccountPage: cells[6],
      lastVerified: cells[7],
      blocker: cells[8] || "",
    });
  }

  return rows;
}

function listCompanyRefs() {
  if (!fs.existsSync(companiesRoot)) return [];
  return fs
    .readdirSync(companiesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}
