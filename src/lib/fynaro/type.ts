// lib/fynaro/types.ts

export type RequestStatus =
  | "draft"
  | "submitted"
  | "reviewing"
  | "needs_info"
  | "proposal_ready"
  | "closed";

export type ProposalStatus =
  | "draft"
  | "ready"
  | "accepted"
  | "declined"
  | "expired";

export type ProjectStatus =
  | "preparing"
  | "active"
  | "waiting_on_client"
  | "paused"
  | "completed";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "refunded";

export type PaymentStage =
  | "deposit"
  | "milestone"
  | "final";

export type ProjectService =
  | "web-development"
  | "mobile-app"
  | "digital-product"
  | "brand-design"
  | "ui-ux-design"
  | "other";

export type ProjectRequest = {
  id: string;
  userId: string;

  title: string;
  businessName: string;
  service: ProjectService;

  businessDescription: string;
  projectDescription: string;

  requirements: string[];

  budgetMin?: number;
  budgetMax?: number;

  timeline: string;

  existingUrl?: string;

  status: RequestStatus;

  createdAt: string;
  updatedAt: string;
};

export type ProposalDeliverable = {
  id: string;
  title: string;
  description: string;
};

export type ProposalPaymentStage = {
  id: string;
  percentage: number;
  amount: number;
  trigger: string;
};

export type Proposal = {
  id: string;

  requestId: string;
  userId: string;

  title: string;
  service: ProjectService;

  version: number;
  status: ProposalStatus;

  scope: string;
  summary: string;

  deliverables: ProposalDeliverable[];
  exclusions: string[];

  investment: number;
  currency: "NGN";

  estimatedWeeksMin: number;
  estimatedWeeksMax: number;

  paymentSchedule: ProposalPaymentStage[];

  validUntil: string;

  createdAt: string;
  updatedAt: string;

  acceptedAt?: string;
};

export type Payment = {
  id: string;

  userId: string;
  proposalId: string;

  projectId?: string;

  amount: number;
  currency: "NGN";

  stage: PaymentStage;

  provider:
    | "paystack"
    | "flutterwave"
    | "bank_transfer";

  providerReference?: string;

  status: PaymentStatus;

  createdAt: string;
  paidAt?: string;
};

export type ProjectPhaseStatus =
  | "complete"
  | "current"
  | "upcoming";

export type ProjectPhase = {
  id: string;
  number: string;

  title: string;
  description: string;

  status: ProjectPhaseStatus;

  startedAt?: string;
  completedAt?: string;
};

export type ProjectFile = {
  id: string;

  projectId: string;

  name: string;
  category: string;
  type: string;
  size: number;

  url: string;

  uploadedBy: string;
  createdAt: string;
};

export type ProjectActivity = {
  id: string;

  projectId: string;

  type:
    | "project"
    | "milestone"
    | "file"
    | "payment"
    | "approval"
    | "message";

  title: string;
  description: string;

  createdAt: string;
};

export type Project = {
  id: string;

  userId: string;
  requestId: string;
  proposalId: string;

  title: string;
  service: ProjectService;

  status: ProjectStatus;

  totalInvestment: number;
  amountPaid: number;
  balance: number;

  progress: number;

  currentPhaseId?: string;
  nextMilestone?: string;

  startedAt: string;
  estimatedDelivery?: string;

  phases: ProjectPhase[];

  createdAt: string;
  updatedAt: string;
};