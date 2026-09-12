// lib/fynaro/data/payments.ts

import { mockPayments } from "@/lib/fynaro/mock-data";
import type {
  Payment,
  PaymentStatus,
} from "@/lib/fynaro/types";

export async function getClientPayments(
  userId: string
): Promise<Payment[]> {
  return mockPayments
    .filter((payment) => payment.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
}

export async function getPaymentById(
  paymentId: string
): Promise<Payment | null> {
  return (
    mockPayments.find(
      (payment) => payment.id === paymentId
    ) ?? null
  );
}

export async function getProjectPayments(
  projectId: string
): Promise<Payment[]> {
  return mockPayments
    .filter(
      (payment) => payment.projectId === projectId
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );
}

export async function getProposalPayments(
  proposalId: string
): Promise<Payment[]> {
  return mockPayments.filter(
    (payment) => payment.proposalId === proposalId
  );
}

export async function getPaymentsByStatus(
  userId: string,
  statuses: PaymentStatus[]
): Promise<Payment[]> {
  return mockPayments.filter(
    (payment) =>
      payment.userId === userId &&
      statuses.includes(payment.status)
  );
}

export async function getTotalPaidForProject(
  projectId: string
): Promise<number> {
  const payments = await getProjectPayments(projectId);

  return payments
    .filter((payment) => payment.status === "paid")
    .reduce(
      (total, payment) => total + payment.amount,
      0
    );
}