import {
  cookies,
} from "next/headers";

export type ClientProposalStatus =
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export type ClientProposalDeliverable = {
  id: string;
  proposal_id: string;
  title: string;
  description: string | null;
  position: number;
};

export type ClientProposalExclusion = {
  id: string;
  proposal_id: string;
  description: string;
  position: number;
};

export type ClientProposalPaymentStage = {
  id: string;
  proposal_id: string;
  position: number;
  percentage: number;
  amount: number;
  trigger_label: string;
  stage: string;
};

export type ClientProposal = {
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

  status: ClientProposalStatus;

  sent_at: string | null;
  viewed_at: string | null;

  accepted_at: string | null;
  rejected_at: string | null;

  expires_at: string | null;

  decision_note: string | null;

  created_at: string;
  updated_at: string;

  deliverables?: ClientProposalDeliverable[];

  exclusions?: ClientProposalExclusion[];

  paymentStages?: ClientProposalPaymentStage[];
};

async function clientFetch(
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

export async function getClientProposals():
Promise<ClientProposal[]> {
  const data =
    await clientFetch(
      "/api/client/proposals"
    );

  return (
    (data?.proposals ??
      []) as ClientProposal[]
  );
}

export async function getClientProposal(
  proposalId: string
): Promise<ClientProposal | null> {
  if (!proposalId) {
    return null;
  }

  const data =
    await clientFetch(
      `/api/client/proposals/${encodeURIComponent(
        proposalId
      )}`
    );

  return (
    (data?.proposal as
      | ClientProposal
      | undefined) ?? null
  );
}