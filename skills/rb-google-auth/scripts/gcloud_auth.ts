import { spawnSync } from "node:child_process";

export type GcloudAccessTokenCommand = "account" | "application-default";
export type GcloudLoginCommand = "account" | "application-default";
export type GcloudLoginMode = "auto" | "always" | "never";

export interface GcloudTokenRequest {
  serviceName: string;
  tokenCommand: GcloudAccessTokenCommand;
  loginCommand: GcloudLoginCommand;
  loginMode?: GcloudLoginMode;
  forceLogin?: boolean;
  enableDriveAccess?: boolean;
  disableQuotaProject?: boolean;
  scopes?: string[];
  oauthClientFile?: string;
}

interface CommandResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  status: number | null;
}

export class GcloudAuthManager {
  public getAccessToken(request: GcloudTokenRequest): string {
    const loginMode = request.loginMode || "always";
    if (loginMode === "always") {
      this.ensureLogin(request);
    }

    const firstAttempt = this.printAccessToken(request);
    if (firstAttempt.ok && firstAttempt.stdout.trim()) {
      return firstAttempt.stdout.trim();
    }

    if (loginMode === "auto") {
      this.ensureLogin(request);
      const secondAttempt = this.printAccessToken(request);
      if (secondAttempt.ok && secondAttempt.stdout.trim()) {
        return secondAttempt.stdout.trim();
      }
      throw this.tokenError(request, [firstAttempt, secondAttempt]);
    }

    throw this.tokenError(request, [firstAttempt]);
  }

  public ensureLogin(request: GcloudTokenRequest): void {
    const args = this.loginArgs(request);
    process.stderr.write(`Ensuring ${request.serviceName} gcloud auth with: gcloud ${args.join(" ")}\n`);
    const result = spawnSync("gcloud", args, { stdio: "inherit", env: this.gcloudEnv() });
    if (result.status !== 0) {
      throw new Error(
        `gcloud auth failed for ${request.serviceName}. The helper attempted:\n` +
          `  gcloud ${args.join(" ")}\n\n` +
          (request.oauthClientFile
            ? "The helper used the provided OAuth client file. Check Google Workspace Admin app access controls if Google still blocks it."
            : "For Gmail scopes, gcloud needs an OAuth Client ID. Pass it with --oauth-client-file."),
      );
    }
  }

  private printAccessToken(request: GcloudTokenRequest): CommandResult {
    const args =
      request.tokenCommand === "application-default"
        ? ["auth", "application-default", "print-access-token"]
        : ["auth", "print-access-token"];
    const result = spawnSync("gcloud", args, { encoding: "utf8", env: this.gcloudEnv() });
    return {
      ok: result.status === 0,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      status: result.status,
    };
  }

  private loginArgs(request: GcloudTokenRequest): string[] {
    if (request.loginCommand === "application-default") {
      const args = ["auth", "application-default", "login"];
      if (request.scopes && request.scopes.length > 0) {
        args.push(`--scopes=${request.scopes.join(",")}`);
      }
      if (request.oauthClientFile) {
        args.push(`--client-id-file=${request.oauthClientFile}`);
      }
      if (request.disableQuotaProject) {
        args.push("--disable-quota-project");
      }
      return args;
    }

    const args = ["auth", "login", "--brief"];
    if (request.enableDriveAccess) {
      args.push("--enable-gdrive-access");
    }
    if (request.forceLogin) {
      args.push("--force");
    }
    return args;
  }

  private tokenError(request: GcloudTokenRequest, attempts: CommandResult[]): Error {
    const details = attempts
      .map((attempt, index) => {
        const output = [attempt.stderr.trim(), attempt.stdout.trim()].filter(Boolean).join("\n");
        return `Attempt ${index + 1} status ${attempt.status ?? "unknown"}:\n${output || "(no output)"}`;
      })
      .join("\n\n");
    return new Error(
      `Failed to get a ${request.serviceName} gcloud access token after the helper-managed auth step.\n\n` +
        `${details}\n\n` +
        (request.oauthClientFile
          ? "The helper used the provided OAuth client file. If Google still blocks the app, trust/allow that OAuth client in Google Workspace Admin app access controls."
          : "For Gmail scopes, gcloud needs an OAuth Client ID passed with --oauth-client-file. Do not use auth environment variables or the wrong Gmail sender as a workaround."),
    );
  }

  private gcloudEnv(): NodeJS.ProcessEnv {
    const env = { ...process.env };
    delete env.GOOGLE_APPLICATION_CREDENTIALS;
    delete env.CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE;
    return env;
  }
}

export function parseGcloudLoginMode(value: string, defaultValue: GcloudLoginMode = "always"): GcloudLoginMode {
  const normalized = value || defaultValue;
  if (normalized === "auto" || normalized === "always" || normalized === "never") {
    return normalized;
  }
  throw new Error("--auth-login must be one of: auto, always, never.");
}
