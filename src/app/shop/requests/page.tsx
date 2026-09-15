"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type RequestStatus =
  | "submitted"
  | "reviewing"
  | "needs_info"
  | "proposal_ready"
  | "closed";

type ProjectRequest = {
  id: string;
  title: string;
  service: string;
  status: RequestStatus;
  submittedAt: string;
  description: string;
  proposedInvestment?: string;
  proposedScope?: string;
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const requests: ProjectRequest[] = [
  {
    id: "FYN-0042",
    title: "Marketplace Platform",
    service: "Digital Product",
    status: "reviewing",
    submittedAt: "Sep 7, 2026",
    description:
      "We're reviewing your requirements and shaping the right product scope.",
  },
  {
    id: "FYN-0039",
    title: "NewJersey.ng Ecommerce",
    service: "Web Development",
    status: "proposal_ready",
    submittedAt: "Aug 29, 2026",
    description:
      "Your recommended scope and project proposal are ready to review.",
    proposedInvestment: "₦850,000",
    proposedScope: "Growth Web Development",
  },
  {
    id: "FYN-0035",
    title: "Brand Identity Refresh",
    service: "Design",
    status: "needs_info",
    submittedAt: "Aug 22, 2026",
    description:
      "We need a little more information before we can complete the scope.",
  },
  {
    id: "FYN-0028",
    title: "Corporate Website",
    service: "Web Development",
    status: "closed",
    submittedAt: "Jul 18, 2026",
    description: "This request has been closed.",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "In Review", value: "reviewing" },
  { label: "Proposal Ready", value: "proposal_ready" },
  { label: "Closed", value: "closed" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function RequestsPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") {
      return requests;
    }

    if (activeFilter === "reviewing") {
      return requests.filter((request) =>
        ["submitted", "reviewing", "needs_info"].includes(
          request.status,
        ),
      );
    }

    return requests.filter(
      (request) => request.status === activeFilter,
    );
  }, [activeFilter]);

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* HEADER */}
      <section className="border-b border-black/[0.08] pb-8">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <span>Requests</span>
        </div>

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Project Requests
            </p>

            <h1 className="mt-3 text-[38px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[48px]">
              Requests
            </h1>

            <p className="mt-3 max-w-[500px] text-[11px] leading-5 text-black/42">
              Follow submitted ideas from review through proposal.
            </p>
          </div>

          <Link
            href="/shop/requests/new"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#111] px-4 text-[10px] font-semibold text-white transition hover:bg-black/80"
          >
            <Plus size={12} />
            New Request
          </Link>
        </div>
      </section>

      {/* FILTERS */}
      <section className="flex items-center justify-between gap-4 border-b border-black/[0.08] py-4">
        <div className="flex gap-1 overflow-x-auto">
          {filters.map((filter) => {
            const active =
              activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.value)
                }
                className={[
                  "min-w-fit rounded-full px-3 py-2 text-[9px] font-semibold transition",
                  active
                    ? "bg-[#111] text-white"
                    : "text-black/35 hover:bg-[#f4f4ef] hover:text-black",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="hidden text-[9px] text-black/25 sm:block">
          {filteredRequests.length}{" "}
          {filteredRequests.length === 1
            ? "request"
            : "requests"}
        </p>
      </section>

      {/* REQUESTS */}
      <section className="py-5">
        {filteredRequests.length > 0 ? (
          <div className="overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            {filteredRequests.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                REQUEST ROW                                 */
/* -------------------------------------------------------------------------- */

function RequestRow({
  request,
}: {
  request: ProjectRequest;
}) {
  const proposalReady =
    request.status === "proposal_ready";

  const needsInfo =
    request.status === "needs_info";

  const href = proposalReady
    ? `/shop/proposals/${request.id}`
    : `/shop/requests/${request.id}`;

  return (
    <article
      className={[
        "group relative border-b border-black/[0.07] last:border-b-0",
        "transition-colors duration-200",
        proposalReady
          ? "bg-[#f4f4ef]/70 hover:bg-[#efefe8]"
          : "bg-white hover:bg-[#fafaf7]",
      ].join(" ")}
    >
      {/* SMALL ACCENT FOR PROPOSAL READY */}
      {proposalReady && (
        <span className="absolute inset-y-0 left-0 w-[2px] bg-[#c7c7bb]" />
      )}

      <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_170px_auto] lg:items-center">
        {/* MAIN */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/25">
              {request.id}
            </span>

            <StatusBadge status={request.status} />
          </div>

          <div className="mt-3">
            <h2 className="text-[16px] font-semibold tracking-[-0.025em] sm:text-[18px]">
              {request.title}
            </h2>

            <p className="mt-1 text-[9px] font-medium text-black/30">
              {request.service}
            </p>
          </div>

          <p className="mt-3 max-w-[620px] text-[10px] leading-5 text-black/42">
            {request.description}
          </p>

          {/* ONLY SHOW EXTRA INFO WHEN IT MATTERS */}
          {proposalReady && (
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
              {request.proposedScope && (
                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
                    Scope
                  </p>

                  <p className="mt-1 text-[9px] font-medium text-black/60">
                    {request.proposedScope}
                  </p>
                </div>
              )}

              {request.proposedInvestment && (
                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
                    Investment
                  </p>

                  <p className="mt-1 text-[10px] font-semibold">
                    {request.proposedInvestment}
                  </p>
                </div>
              )}
            </div>
          )}

          {needsInfo && (
            <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-[#f3ece8] px-3 py-1.5">
              <MessageSquareText
                size={10}
                className="text-[#7d5b4c]"
              />

              <span className="text-[8px] font-medium text-[#7d5b4c]">
                More information needed
              </span>
            </div>
          )}
        </div>

        {/* DATE */}
        <div className="lg:text-right">
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            Submitted
          </p>

          <p className="mt-1.5 text-[9px] font-medium text-black/50">
            {request.submittedAt}
          </p>
        </div>

        {/* ACTION */}
        <Link
          href={href}
          className="
            group/action
            inline-flex
            h-9
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-black/[0.09]
            bg-white
            px-3.5
            text-[9px]
            font-semibold
            text-black/55
            transition-all
            hover:border-black/15
            hover:text-black
          "
        >
          {proposalReady
            ? "Review Proposal"
            : "Open"}

          <ArrowRight
            size={10}
            className="transition-transform group-hover/action:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STATUS                                   */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: RequestStatus;
}) {
  const config: Record<
    RequestStatus,
    {
      label: string;
      className: string;
    }
  > = {
    submitted: {
      label: "Submitted",
      className:
        "bg-black/[0.04] text-black/45",
    },

    reviewing: {
      label: "Reviewing",
      className:
        "bg-[#eeeeea] text-black/50",
    },

    needs_info: {
      label: "Needs Info",
      className:
        "bg-[#f3e8e3] text-[#7d5b4c]",
    },

    proposal_ready: {
      label: "Proposal Ready",
      className:
        "bg-[#e9e9e3] text-black/65",
    },

    closed: {
      label: "Closed",
      className:
        "bg-black/[0.035] text-black/30",
    },
  };

  const item = config[status];

  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.11em]",
        item.className,
      ].join(" ")}
    >
      {item.label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                EMPTY STATE                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[16px] border border-dashed border-black/[0.1] px-6 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4ef]">
        <FileText
          size={14}
          strokeWidth={1.6}
          className="text-black/45"
        />
      </span>

      <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.025em]">
        No requests here.
      </h3>

      <p className="mt-2 max-w-[320px] text-[9px] leading-5 text-black/35">
        Requests matching this view will appear here.
      </p>
    </div>
  );
}