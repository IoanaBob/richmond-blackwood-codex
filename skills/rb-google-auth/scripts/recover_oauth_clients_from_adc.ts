import fs from "node:fs";
import os from "node:os";
import path from "node:path";

interface PersonaMapping {
  sender: string;
  personaSlug: string;
  outputName: string;
}

interface AdcFile {
  client_id?: string;
  client_secret?: string;
}

interface CliOptions {
  force: boolean;
  dryRun: boolean;
}

const PERSONA_MAPPINGS: PersonaMapping[] = [
  {
    sender: "accounting@richmondblackwood.com",
    personaSlug: "rb-accounting",
    outputName: "google-oauth-client.richmondblackwood.json",
  },
  {
    sender: "johnpaul.okolie@richmondblackwood.com",
    personaSlug: "johnpaul-richmond-blackwood",
    outputName: "google-oauth-client.richmondblackwood.json",
  },
  {
    sender: "ioana@eip.ventures",
    personaSlug: "ioana-eip",
    outputName: "google-oauth-client.eip.json",
  },
  {
    sender: "eran@eip.ventures",
    personaSlug: "eran-everguard",
    outputName: "google-oauth-client.eip.json",
  },
  {
    sender: "eran@konvi.app",
    personaSlug: "eran-konvi",
    outputName: "google-oauth-client.konvi.json",
  },
  {
    sender: "eran@richmondblackwood.com",
    personaSlug: "eran-richmond-blackwood",
    outputName: "google-oauth-client.richmondblackwood.json",
  },
];

function main(argv: string[]): number {
  const options = parseOptions(argv);
  const rows = PERSONA_MAPPINGS.map((mapping) => recover(mapping, options));
  process.stdout.write(`${JSON.stringify({ ok: true, results: rows }, null, 2)}\n`);
  return 0;
}

function parseOptions(argv: string[]): CliOptions {
  const options: CliOptions = { force: false, dryRun: false };
  for (const arg of argv) {
    if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
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
  return `Usage: recover_oauth_clients_from_adc.ts [--dry-run] [--force]

Recreates sender-matched Google OAuth desktop-client JSON files in global Codex
storage from existing persona ADC metadata. It never prints OAuth client secrets
or refresh tokens. Existing output files are skipped unless --force is passed.`;
}

function recover(mapping: PersonaMapping, options: CliOptions): Record<string, string | boolean> {
  const adcPath = globalCodexPath(
    "google-personas",
    mapping.personaSlug,
    "gcloud",
    "application_default_credentials.json",
  );
  const outputPath = globalCodexPath(mapping.outputName);

  if (!fs.existsSync(adcPath)) {
    return result(mapping, adcPath, outputPath, "missing-adc", false);
  }

  if (fs.existsSync(outputPath) && !options.force) {
    return result(mapping, adcPath, outputPath, "skipped-existing-output", false);
  }

  const adc = readAdc(adcPath);
  if (!adc.client_id || !adc.client_secret) {
    return result(mapping, adcPath, outputPath, "missing-client-metadata", false);
  }

  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true, mode: 0o700 });
    fs.writeFileSync(outputPath, `${JSON.stringify(oauthClient(adc.client_id, adc.client_secret), null, 2)}\n`, { mode: 0o600 });
    fs.chmodSync(outputPath, 0o600);
  }

  return result(mapping, adcPath, outputPath, options.dryRun ? "would-write" : "written", !options.dryRun);
}

function readAdc(adcPath: string): AdcFile {
  return JSON.parse(fs.readFileSync(adcPath, "utf8")) as AdcFile;
}

function oauthClient(clientId: string, clientSecret: string): Record<string, Record<string, string | string[]>> {
  return {
    installed: {
      client_id: clientId,
      client_secret: clientSecret,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      redirect_uris: ["http://localhost"],
    },
  };
}

function result(
  mapping: PersonaMapping,
  adcPath: string,
  outputPath: string,
  status: string,
  changed: boolean,
): Record<string, string | boolean> {
  return {
    sender: mapping.sender,
    persona_slug: mapping.personaSlug,
    adc_path: adcPath,
    output_path: outputPath,
    status,
    changed,
  };
}

function globalCodexPath(...segments: string[]): string {
  return path.join(os.homedir(), ".codex", ...segments);
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
