// lib/fynaro/data/dashboard.ts

import { getActiveProjects } from "./projects";
import {
  getOpenRequests,
  getRequestsByStatus,
} from "./requests";
import {
  getProposalReadyForReview,
} from "./proposals";
import {
  getPaymentsByStatus,
} from "./payments";

export type DashboardData = {
  activeProjects: Awaited<
    ReturnType<typeof getActiveProjects>
  >;

  openRequests: Awaited<
    ReturnType<typeof getOpenRequests>
  >;

  needsInfoRequests: Awaited<
    ReturnType<typeof getRequestsByStatus>
  >;

  proposalsReady: Awaited<
    ReturnType<typeof getProposalReadyForReview>
  >;

  pendingPayments: Awaited<
    ReturnType<typeof getPaymentsByStatus>
  >;

  attentionCount: number;
};

export async function getDashboardData(
  userId: string
): Promise<DashboardData> {
  const [
    activeProjects,
    openRequests,
    needsInfoRequests,
    proposalsReady,
    pendingPayments,
  ] = await Promise.all([
    getActiveProjects(userId),

    getOpenRequests(userId),

    getRequestsByStatus(userId, [
      "needs_info",
    ]),

    getProposalReadyForReview(userId),

    getPaymentsByStatus(userId, [
      "pending",
      "failed",
    ]),
  ]);

  const waitingProjects = activeProjects.filter(
    (project) =>
      project.status === "waiting_on_client"
  );

  const attentionCount =
    needsInfoRequests.length +
    proposalsReady.length +
    pendingPayments.length +
    waitingProjects.length;

  return {
    activeProjects,
    openRequests,
    needsInfoRequests,
    proposalsReady,
    pendingPayments,
    attentionCount,
  };
}