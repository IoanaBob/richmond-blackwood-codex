import fetch from "node-fetch";

import {
  CliArguments,
  createDriveAccessTokenProvider,
  parseDriveAuthSource,
} from "./drive_common";

async function main(): Promise<void> {
  const args = new CliArguments();
  const parsed = args.parse(process.argv.slice(2));
  const [fileId, title] = parsed.positionals;
  if (!fileId || !title) {
    throw new Error(
      "Usage: rename_drive_file.ts <file-id> <new-title> [--fields FIELDS] [--auth-source auto|vault|adc|account|gcloud|direct-adc] [--auth-login always|auto|never] [--account-email EMAIL] [--gcloud-config-dir PATH] [--persona-slug SLUG] [--adc-file PATH]",
    );
  }

  const tokenProvider = createDriveAccessTokenProvider({
    authSource: parseDriveAuthSource(args.stringOption(parsed.options, "authSource", "auto")),
    loginMode: args.stringOption(parsed.options, "authLogin", "never") as "always" | "auto" | "never",
    accountEmail: args.stringOption(parsed.options, "accountEmail", ""),
    gcloudConfigDir: args.stringOption(parsed.options, "gcloudConfigDir", ""),
    personaSlug: args.stringOption(parsed.options, "personaSlug", ""),
    adcFile: args.stringOption(parsed.options, "adcFile", ""),
  });

  const fields = args.stringOption(parsed.options, "fields", "id,name,mimeType,webViewLink,parents");
  const params = new URLSearchParams({ fields, supportsAllDrives: "true" });
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?${params}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${await tokenProvider.getAccessToken(false)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: title }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Drive rename failed (${response.status}): ${text}`);
  }
  console.log(text);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
