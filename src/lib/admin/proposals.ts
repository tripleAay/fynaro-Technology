import {
  cookies,
} from "next/headers";

// ======================================================
// PROPOSAL STATUS
// ======================================================

export type ProposalStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

// ======================================================
// CLIENT
// ======================================================

export type ProposalClient = {
  id: string;

  full_name: string | null;

  email: string;

  company_name: string | null;

  phone: string | null;

  avatar_url: string | null;
};

// ======================================================
// DELIVERABLE
// ======================================================

export type ProposalDeliverable = {
  id: string;

  proposal_id: string;

  title: string;

  description: string | null;

  position: number;

  created_at: string;
};

// ======================================================
// EXCLUSION
// ======================================================

export type ProposalExclusion = {
  id: string;

  proposal_id: string;

  description: string;

  position: number;

  created_at: string;
};

// ======================================================
// PAYMENT STAGE
// ======================================================

export type ProposalPaymentStage = {
  id: string;

  proposal_id: string;

  position: number;

  percentage: number;

  amount: number;

  trigger_label: string;

  stage: string;

  created_at: string;
};

// ======================================================
// SOURCE PROJECT REQUEST
// ======================================================

export type ProposalRequest = {
  id: string;

  reference: string;

  title: string | null;

  business_name: string | null;

  service: string | null;

  status: string;

  submitted_at: string | null;

  created_at: string;
};

// ======================================================
// ADMIN PROPOSAL
// ======================================================

export type AdminProposal = {
  id: string;

  reference: string;

  request_id: string;

  client_id: string;

  version: number;

  title: string;

  service: string;

  scope: string;

  summary: string | null;

  investment: number;

  currency: string;

  // ----------------------------------------------------
  // Lifecycle
  // ----------------------------------------------------

  status: ProposalStatus;

  sent_at: string | null;

  viewed_at: string | null;

  accepted_at: string | null;

  rejected_at: string | null;

  expires_at: string | null;

  decision_note: string | null;

  created_at: string;

  updated_at: string;

  // ----------------------------------------------------
  // Relationships
  // ----------------------------------------------------

  client: ProposalClient | null;

  deliverables?: ProposalDeliverable[];

  exclusions?: ProposalExclusion[];

  paymentStages?: ProposalPaymentStage[];

  request?: ProposalRequest | null;
};

// ======================================================
// SERVER-SIDE ADMIN FETCH
// ======================================================

async function adminFetch(
  path: string
) {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "fynaro_token"
    )?.value;

  if (!token) {
    return null;
  }

  const apiUrl =
    process.env.FYNARO_API_URL;

  if (!apiUrl) {
    throw new Error(
      "FYNARO_API_URL is not configured."
    );
  }

  const backendUrl =
    apiUrl.replace(/\/$/, "");

  const response =
    await fetch(
      `${backendUrl}${path}`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// ======================================================
// GET ALL PROPOSALS
// ======================================================

export async function getAdminProposals(
  status?: ProposalStatus | "all"
): Promise<AdminProposal[]> {
  const params =
    new URLSearchParams();

  if (
    status &&
    status !== "all"
  ) {
    params.set(
      "status",
      status
    );
  }

  const query =
    params.toString();

  const data =
    await adminFetch(
      `/api/admin/proposals${
        query
          ? `?${query}`
          : ""
      }`
    );

  return (
    (data?.proposals ??
      []) as AdminProposal[]
  );
}

// ======================================================
// GET ONE PROPOSAL
// ======================================================

export async function getAdminProposal(
  proposalId: string
): Promise<AdminProposal | null> {
  if (!proposalId) {
    return null;
  }

  const data =
    await adminFetch(
      `/api/admin/proposals/${encodeURIComponent(
        proposalId
      )}`
    );

  return (
    (data?.proposal as
      | AdminProposal
      | undefined) ?? null
  );
}