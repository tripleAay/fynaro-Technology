// lib/fynaro/mock-data.ts

import type {
  Payment,
  Project,
  ProjectRequest,
  Proposal,
} from "./types";

export const mockRequests: ProjectRequest[] = [
  {
    id: "FYN-0042",
    userId: "user-demo-001",

    title: "Marketplace Platform",
    businessName: "Marketplace Project",

    service: "digital-product",

    businessDescription:
      "A digital marketplace connecting customers with service providers.",

    projectDescription:
      "Build a multi-sided marketplace with customer accounts, provider accounts, payments and administrative functionality.",

    requirements: [
      "UI / UX Design",
      "Development",
      "User accounts",
      "Payments",
      "Admin dashboard",
      "Database",
      "Notifications",
      "Analytics",
    ],

    budgetMin: 1500000,
    budgetMax: 3000000,

    timeline: "1–3 months",

    status: "proposal_ready",

    createdAt: "2026-09-07T09:00:00.000Z",
    updatedAt: "2026-09-09T09:00:00.000Z",
  },
];

export const mockProposals: Proposal[] = [
  {
    id: "PRP-0042",

    requestId: "FYN-0042",
    userId: "user-demo-001",

    title: "Marketplace Platform",
    service: "digital-product",

    version: 1,
    status: "accepted",

    scope: "Custom Product Development",

    summary:
      "Design and development of a custom marketplace connecting customers with service providers.",

    deliverables: [
      {
        id: "deliverable-01",
        title: "Product Architecture",
        description:
          "Core workflows, roles and technical product structure.",
      },
      {
        id: "deliverable-02",
        title: "UI / UX Design",
        description:
          "Customer, provider and administrative interface design.",
      },
      {
        id: "deliverable-03",
        title: "Marketplace Development",
        description:
          "Core marketplace functionality and user experiences.",
      },
      {
        id: "deliverable-04",
        title: "Admin Dashboard",
        description:
          "Operational controls for managing platform activity.",
      },
    ],

    exclusions: [
      "Native mobile applications.",
      "Third-party service fees.",
      "Features introduced after scope approval.",
    ],

    investment: 2450000,
    currency: "NGN",

    estimatedWeeksMin: 10,
    estimatedWeeksMax: 12,

    paymentSchedule: [
      {
        id: "payment-stage-01",
        percentage: 50,
        amount: 1225000,
        trigger: "Project Start",
      },
      {
        id: "payment-stage-02",
        percentage: 30,
        amount: 735000,
        trigger: "Development Milestone",
      },
      {
        id: "payment-stage-03",
        percentage: 20,
        amount: 490000,
        trigger: "Final Delivery",
      },
    ],

    validUntil: "2026-09-23",

    createdAt: "2026-09-09T09:00:00.000Z",
    updatedAt: "2026-09-10T09:00:00.000Z",

    acceptedAt: "2026-09-10T09:00:00.000Z",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "PAY-0042-01",

    userId: "user-demo-001",
    proposalId: "PRP-0042",

    projectId: "FYN-PRJ-0042",

    amount: 1225000,
    currency: "NGN",

    stage: "deposit",

    provider: "paystack",

    providerReference: "demo-reference-0042",

    status: "paid",

    createdAt: "2026-09-10T10:00:00.000Z",
    paidAt: "2026-09-10T10:03:00.000Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "FYN-PRJ-0042",

    userId: "user-demo-001",

    requestId: "FYN-0042",
    proposalId: "PRP-0042",

    title: "Marketplace Platform",
    service: "digital-product",

    status: "active",

    totalInvestment: 2450000,
    amountPaid: 1225000,
    balance: 1225000,

    progress: 38,

    currentPhaseId: "phase-development",

    nextMilestone: "Customer marketplace experience",

    startedAt: "2026-09-10",

    estimatedDelivery: "2026-11",

    phases: [
      {
        id: "phase-discovery",
        number: "01",
        title: "Discovery",
        description:
          "Requirements and product direction confirmed.",
        status: "complete",
      },

      {
        id: "phase-architecture",
        number: "02",
        title: "Product Architecture",
        description:
          "Roles, workflows and product structure established.",
        status: "complete",
      },

      {
        id: "phase-development",
        number: "03",
        title: "Development",
        description:
          "Core application functionality is being built.",
        status: "current",
      },

      {
        id: "phase-qa",
        number: "04",
        title: "Quality Assurance",
        description:
          "Testing, refinement and launch preparation.",
        status: "upcoming",
      },

      {
        id: "phase-launch",
        number: "05",
        title: "Launch",
        description:
          "Production deployment and project handover.",
        status: "upcoming",
      },
    ],

    createdAt: "2026-09-10T10:03:00.000Z",
    updatedAt: "2026-09-19T08:00:00.000Z",
  },
];