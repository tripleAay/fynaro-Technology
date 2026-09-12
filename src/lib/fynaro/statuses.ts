// lib/fynaro/statuses.ts

import type {
  PaymentStatus,
  ProjectStatus,
  ProposalStatus,
  RequestStatus,
} from "./types";

type StatusStyle = {
  label: string;
  className: string;
};

export const requestStatusMap: Record<
  RequestStatus,
  StatusStyle
> = {
  draft: {
    label: "Draft",
    className: "bg-black/[0.05] text-black/40",
  },

  submitted: {
    label: "Submitted",
    className: "bg-black/[0.05] text-black/50",
  },

  reviewing: {
    label: "Reviewing",
    className: "bg-[#eee9da] text-[#645c39]",
  },

  needs_info: {
    label: "Needs Info",
    className: "bg-[#f3e8e3] text-[#85533e]",
  },

  proposal_ready: {
    label: "Proposal Ready",
    className: "bg-[#111] text-white",
  },

  closed: {
    label: "Closed",
    className: "bg-black/[0.04] text-black/35",
  },
};

export const proposalStatusMap: Record<
  ProposalStatus,
  StatusStyle
> = {
  draft: {
    label: "Draft",
    className: "bg-black/[0.05] text-black/40",
  },

  ready: {
    label: "Ready for Review",
    className: "bg-[#111] text-white",
  },

  accepted: {
    label: "Accepted",
    className: "bg-[#e4eee7] text-[#42614a]",
  },

  declined: {
    label: "Declined",
    className: "bg-[#f2e7e3] text-[#7a5040]",
  },

  expired: {
    label: "Expired",
    className: "bg-black/[0.05] text-black/35",
  },
};

export const projectStatusMap: Record<
  ProjectStatus,
  StatusStyle
> = {
  preparing: {
    label: "Preparing",
    className: "bg-black/[0.05] text-black/50",
  },

  active: {
    label: "Active",
    className: "bg-[#e3ede6] text-[#42604a]",
  },

  waiting_on_client: {
    label: "Waiting on You",
    className: "bg-[#f3e8e3] text-[#85533e]",
  },

  paused: {
    label: "Paused",
    className: "bg-[#eee9da] text-[#645c39]",
  },

  completed: {
    label: "Completed",
    className: "bg-[#111] text-white",
  },
};

export const paymentStatusMap: Record<
  PaymentStatus,
  StatusStyle
> = {
  pending: {
    label: "Pending",
    className: "bg-black/[0.05] text-black/45",
  },

  processing: {
    label: "Processing",
    className: "bg-[#eee9da] text-[#645c39]",
  },

  paid: {
    label: "Paid",
    className: "bg-[#e3ede6] text-[#42604a]",
  },

  failed: {
    label: "Failed",
    className: "bg-[#f2e7e3] text-[#7a5040]",
  },

  refunded: {
    label: "Refunded",
    className: "bg-black/[0.05] text-black/45",
  },
};