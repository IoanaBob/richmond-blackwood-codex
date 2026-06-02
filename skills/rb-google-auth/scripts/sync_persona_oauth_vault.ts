import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  GOOGLE_PERSONAS,
  personaOauthSafeStatus,
  writePersonaOauthCredentials,
} from "./persona_oauth_vault";

interface CliOptions {
  dryRun: boolean;
  force: boolean;
  personaSlug: string;
}

interface AdcFile {
  type?: string;
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
  quota_project_id?: string;
  scopes?: string[];
}

function main(argv: string[]): number {
  const options = parseOptions(argv);
  const personas = options.personaSlug
    ? GOOGLE_PERSONAS.filter((persona) => persona.slug === options.personaSlug)
    : GOOGLE_PERSONAS.filter((persona) => persona.configured);
  if (options.personaSlug && personas.length === 0) {
    throw new Error(`Unknown persona slug: ${options.personaSlug}`);
  }

  const results = personas.map((persona) => {
    const adcFile = personaAdcFile(persona.slug);
    const before = personaOauthSafeStatus(persona.slug);
    if (!fs.existsSync(adcFile)) {
      return {
        persona_slug: persona.slug,
        account_email: persona.accountEmail || "",
        source_adc: adcFile,
        status: "missing-adc",
        changed: false,
        credential_present_before: before.credential_present,
      };
    }

    if (before.credential_present && !options.force) {
      return {
        persona_slug: persona.slug,
        account_email: persona.accountEmail || "",
        source_adc: adcFile,
        status: "skipped-existing-vault",
        changed: false,
        credential_present_before: true,
      };
    }

    const adc = readAdc(adcFile);
    if (adc.type !== "authorized_user" || !adc.client_id || !adc.client_secret || !adc.refresh_token) {
      return {
        persona_slug: persona.slug,
        account_email: persona.accountEmail || "",
        source_adc: adcFile,
        status: "unsupported-or-incomplete-adc",
        changed: false,
        credential_present_before: before.credential_present,
      };
    }

    if (!options.dryRun) {
      writePersonaOauthCredentials(persona.slug, {
        type: "authorized_user",
        client_id: adc.client_id,
        client_secret: adc.client_secret,
        refresh_token: adc.refresh_token,
        quota_project_id: adc.quota_project_id,
        account_email: persona.accountEmail || "",
        scopes: adc.scopes || [],
        source: "persona-adc-sync",
        updated_at: new Date().toISOString(),
      });
    }

    return {
      persona_slug: persona.slug,
      account_email: persona.accountEmail || "",
      source_adc: adcFile,
      status: options.dryRun ? "would-write" : "written",
      changed: !options.dryRun,
      credential_present_before: before.credential_present,
    };
  });

  process.stdout.write(`${JSON.stringify({ ok: true, dry_run: options.dryRun, results }, null, 2)}\n`);
  return 0;
}

function parseOptions(argv: string[]): CliOptions {
  const options: CliOptions = { dryRun: false, force: false, personaSlug: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const [arg, inlineValue] = argv[index].split("=", 2);
    if (arg === "--help") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
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
  return `Usage: sync_persona_oauth_vault.ts [--persona SLUG] [--dry-run] [--force]

Copies existing authorized_user ADC refresh credentials into the per-persona
OAuth vault under ~/.codex/google-personas/<slug>/oauth/authorized_user.json.
It never prints client secrets, refresh tokens, or access tokens.`;
}

function requiredValue(argv: string[], index: number, option: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}.`);
  }
  return value;
}

function readAdc(adcFile: string): AdcFile {
  return JSON.parse(fs.readFileSync(adcFile, "utf8")) as AdcFile;
}

function personaAdcFile(personaSlug: string): string {
  return path.join(os.homedir(), ".codex", "google-personas", personaSlug, "gcloud", "application_default_credentials.json");
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
