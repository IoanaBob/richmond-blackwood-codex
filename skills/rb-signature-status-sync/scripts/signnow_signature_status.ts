import type { DocumentGetResponse } from "@signnow/api-client/api/document";

import {
  CliArguments,
  printJson,
  runCli,
  SignNowClient,
  SignNowEnvironment,
} from "../../rb-signature-workflow/scripts/signnow_common";

type OverallStatus =
  | "fully_signed"
  | "partially_signed"
  | "pending"
  | "declined"
  | "expired"
  | "canceled"
  | "no_invites"
  | "unknown";

interface RoleStatus {
  role_name: string;
  role_id: string;
  required: boolean;
  signing_order: string;
  status: OverallStatus;
  signed: boolean;
  invite_ids: string[];
  invite_emails: string[];
  invite_statuses: string[];
  signature_ids: string[];
}

interface DocumentStatus {
  document_id: string;
  document_name: string;
  checked_at: string;
  overall_status: OverallStatus;
  all_required_roles_signed: boolean;
  required_roles: string[];
  missing_required_roles: string[];
  roles: RoleStatus[];
  pending_roles: string[];
  signed_roles: string[];
  declined_roles: string[];
  expired_roles: string[];
  canceled_roles: string[];
  invite_count: number;
  signature_field_count: number;
  recommendation: {
    notion_pipeline_action: string;
    signed_file_required_before_stage_completion: boolean;
  };
}

type Role = DocumentGetResponse["roles"][number];
type FieldInvite = NonNullable<DocumentGetResponse["field_invites"]>[number];
type SignatureField = DocumentGetResponse["signatures"][number];

class SignatureStatusCommand {
  private readonly cli = new CliArguments();
  private readonly env = new SignNowEnvironment();

  public async run(argv: string[]): Promise<number> {
    const { positionals, options } = this.cli.parse(argv);
    if (options.help || positionals.length === 0) {
      process.stdout.write(`${this.usage()}\n`);
      return options.help ? 0 : 2;
    }

    this.env.load(this.cli.stringOption(options, "envFile", ".env"));
    const requiredRoles = this.parseRequiredRoles(this.cli.stringOption(options, "requiredRoles", ""));
    const client = await SignNowClient.create(this.env.readConfig(options));
    const documents: DocumentStatus[] = [];

    for (const documentId of positionals) {
      const document = await client.getDocument(documentId);
      documents.push(this.summarizeDocument(document, requiredRoles));
    }

    printJson({
      checked_at: new Date().toISOString(),
      documents,
    });
    return 0;
  }

  private usage(): string {
    return `Usage: signnow_signature_status.ts [--env-file .env] [--api-base URL] [--required-roles "Client Signatory,Company Signatory"] <document-id> [document-id...]

Fetch SignNow document metadata and summarize whether required signer roles are pending, partially signed, fully signed, declined, expired, canceled, or unknown.

This helper does not create links, send invites, or download signed documents.`;
  }

  private parseRequiredRoles(raw: string): string[] {
    return raw
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
  }

  private summarizeDocument(document: DocumentGetResponse, requiredRoleNames: string[]): DocumentStatus {
    const roles = document.roles || [];
    const fieldInvites = document.field_invites || [];
    const signatures = document.signatures || [];
    const effectiveRequiredRoles = requiredRoleNames.length > 0 ? requiredRoleNames : roles.map((role) => role.name);
    const missingRequiredRoles = effectiveRequiredRoles.filter(
      (requiredRole) => !roles.some((role) => role.name === requiredRole),
    );
    const roleStatuses = roles.map((role) =>
      this.summarizeRole(role, effectiveRequiredRoles, fieldInvites, signatures),
    );
    const requiredStatuses = roleStatuses.filter((role) => role.required);
    const overallStatus = missingRequiredRoles.length > 0
      ? "unknown"
      : this.overallStatus(requiredStatuses, fieldInvites, signatures);

    return {
      document_id: document.id,
      document_name: document.document_name,
      checked_at: new Date().toISOString(),
      overall_status: overallStatus,
      all_required_roles_signed: overallStatus === "fully_signed",
      required_roles: effectiveRequiredRoles,
      missing_required_roles: missingRequiredRoles,
      roles: roleStatuses,
      pending_roles: this.rolesWithStatus(requiredStatuses, ["pending", "partially_signed", "unknown", "no_invites"]),
      signed_roles: requiredStatuses.filter((role) => role.signed).map((role) => role.role_name),
      declined_roles: this.rolesWithStatus(requiredStatuses, ["declined"]),
      expired_roles: this.rolesWithStatus(requiredStatuses, ["expired"]),
      canceled_roles: this.rolesWithStatus(requiredStatuses, ["canceled"]),
      invite_count: fieldInvites.length,
      signature_field_count: signatures.length,
      recommendation: this.recommendation(overallStatus),
    };
  }

  private summarizeRole(
    role: Role,
    requiredRoleNames: string[],
    fieldInvites: FieldInvite[],
    signatures: SignatureField[],
  ): RoleStatus {
    const roleInvites = fieldInvites.filter((invite) => invite.role_id === role.unique_id || invite.role === role.name);
    const roleSignatures = this.matchingSignatures(roleInvites, signatures);
    const status = this.roleStatus(roleInvites, roleSignatures);

    return {
      role_name: role.name,
      role_id: role.unique_id,
      required: requiredRoleNames.includes(role.name),
      signing_order: role.signing_order,
      status,
      signed: status === "fully_signed",
      invite_ids: roleInvites.map((invite) => invite.id),
      invite_emails: [...new Set(roleInvites.map((invite) => invite.email).filter(Boolean))],
      invite_statuses: [...new Set(roleInvites.map((invite) => this.cleanStatus(invite.status)).filter(Boolean))],
      signature_ids: roleSignatures.map((signature) => signature.id),
    };
  }

  private matchingSignatures(fieldInvites: FieldInvite[], signatures: SignatureField[]): SignatureField[] {
    const inviteIds = new Set(fieldInvites.map((invite) => invite.id));
    const inviteEmails = new Set(fieldInvites.map((invite) => invite.email).filter(Boolean));
    return signatures.filter((signature) => {
      const hasSignatureData = typeof signature.data === "string" && signature.data.length > 0;
      if (!hasSignatureData) return false;
      if (signature.signature_request_id && inviteIds.has(signature.signature_request_id)) return true;
      return Boolean(signature.email && inviteEmails.has(signature.email));
    });
  }

  private roleStatus(fieldInvites: FieldInvite[], signatures: SignatureField[]): OverallStatus {
    if (fieldInvites.some((invite) => this.isDeclined(invite))) return "declined";
    if (fieldInvites.some((invite) => this.isCanceled(invite))) return "canceled";
    if (fieldInvites.some((invite) => this.isExpired(invite))) return "expired";
    if (fieldInvites.some((invite) => this.isComplete(invite.status)) || signatures.length > 0) {
      return "fully_signed";
    }
    if (fieldInvites.length > 0) return "pending";
    return "no_invites";
  }

  private overallStatus(
    requiredStatuses: RoleStatus[],
    fieldInvites: FieldInvite[],
    signatures: SignatureField[],
  ): OverallStatus {
    if (requiredStatuses.length === 0) {
      if (fieldInvites.length === 0 && signatures.length === 0) return "no_invites";
      return "unknown";
    }
    if (requiredStatuses.some((role) => role.status === "declined")) return "declined";
    if (requiredStatuses.some((role) => role.status === "canceled")) return "canceled";
    if (requiredStatuses.some((role) => role.status === "expired")) return "expired";
    if (requiredStatuses.every((role) => role.signed)) return "fully_signed";
    if (requiredStatuses.some((role) => role.signed)) return "partially_signed";
    if (requiredStatuses.some((role) => role.status === "pending")) return "pending";
    if (requiredStatuses.every((role) => role.status === "no_invites")) return "no_invites";
    return "unknown";
  }

  private rolesWithStatus(roleStatuses: RoleStatus[], statuses: OverallStatus[]): string[] {
    const statusSet = new Set(statuses);
    return roleStatuses.filter((role) => statusSet.has(role.status)).map((role) => role.role_name);
  }

  private recommendation(status: OverallStatus): DocumentStatus["recommendation"] {
    switch (status) {
      case "fully_signed":
        return {
          notion_pipeline_action: "Attach the completed signed file, then advance the relevant Notion stage.",
          signed_file_required_before_stage_completion: true,
        };
      case "partially_signed":
      case "pending":
        return {
          notion_pipeline_action: "Keep the relevant Notion stage in signature-pending work.",
          signed_file_required_before_stage_completion: true,
        };
      case "declined":
      case "expired":
      case "canceled":
        return {
          notion_pipeline_action: "Review the current invite/document. Move the relevant Notion stage to Blocked only if no replacement document exists.",
          signed_file_required_before_stage_completion: true,
        };
      case "no_invites":
      case "unknown":
        return {
          notion_pipeline_action: "Do not change Notion stage. Fetch SignNow/Notion context and resolve missing status evidence.",
          signed_file_required_before_stage_completion: true,
        };
    }
  }

  private isComplete(status: string): boolean {
    return ["complete", "completed", "done", "fulfilled", "signed", "finished"].includes(this.cleanStatus(status));
  }

  private isDeclined(invite: FieldInvite): boolean {
    return (
      invite.is_full_declined ||
      this.cleanStatus(invite.status).includes("declin") ||
      (Array.isArray(invite.declined) && invite.declined.length > 0)
    );
  }

  private isCanceled(invite: FieldInvite): boolean {
    const status = this.cleanStatus(invite.status);
    return status.includes("cancel") || status.includes("void");
  }

  private isExpired(invite: FieldInvite): boolean {
    const status = this.cleanStatus(invite.status);
    if (status.includes("expir")) return true;
    if (!invite.expiration_time) return false;
    const expiration = Number(invite.expiration_time);
    if (!Number.isFinite(expiration) || expiration <= 0) return false;
    return expiration * 1000 < Date.now();
  }

  private cleanStatus(status: string): string {
    return status.trim().toLowerCase();
  }
}

void runCli(() => new SignatureStatusCommand().run(process.argv.slice(2)));
