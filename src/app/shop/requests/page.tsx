"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  { label: "Reviewing", value: "reviewing" },
  { label: "Proposal Ready", value: "proposal_ready" },
  { label: "Closed", value: "closed" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export default function RequestsPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") return requests;

    if (activeFilter === "reviewing") {
      return requests.filter((request) =>
        ["submitted", "reviewing", "needs_info"].includes(
          request.status
        )
      );
    }

    return requests.filter(
      (request) => request.status === activeFilter
    );
  }, [activeFilter]);

  const proposalCount = requests.filter(
    (request) => request.status === "proposal_ready"
  ).length;

  const attentionCount = requests.filter(
    (request) => request.status === "needs_info"
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/shop" className="transition hover:text-black">
          Dashboard
        </Link>

        <span>/</span>
        <span>Requests</span>
      </div>

      {/* HEADER */}
      <section className="mt-8 border-b border-black/[0.09] pb-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Project Requests
            </p>

            <h1 className="mt-3 text-[42px] font-semibold leading-none tracking-[-0.05em] sm:text-[54px]">
              Start here.
              <br />
              Build from here.
            </h1>

            <p className="mt-5 max-w-[620px] text-[13px] leading-6 text-black/48">
              Track ideas you&apos;ve submitted to Fynaro, review
              requests under consideration and move into a proposal
              when the scope is ready.
            </p>
          </div>

          <Link
            href="/shop/requests/new"
            className="inline-flex h-12 w-fit items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
          >
            <Plus size={15} />
            Start New Project
          </Link>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-px overflow-hidden border-b border-black/[0.09] bg-black/[0.08] sm:grid-cols-3">
        <SummaryStat
          value={requests.length.toString()}
          label="Total requests"
        />

        <SummaryStat
          value={proposalCount.toString()}
          label="Proposal ready"
        />

        <SummaryStat
          value={attentionCount.toString()}
          label="Needs your attention"
        />
      </section>

      {/* FILTER */}
      <section className="py-7">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const active = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={[
                  "min-w-fit rounded-full px-4 py-2.5 text-[11px] font-semibold transition",
                  active
                    ? "bg-[#111] text-white"
                    : "border border-black/[0.09] bg-white text-black/45 hover:text-black",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* REQUEST LIST */}
      <section>
        {filteredRequests.length ? (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* GUIDANCE */}
      <section className="mt-12 rounded-[22px] bg-[#e9e9e3] p-7 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Have another idea?
            </p>

            <h2 className="mt-3 max-w-[650px] text-[28px] font-semibold leading-[1.05] tracking-[-0.04em]">
              You don&apos;t need to wait for one project to finish
              before discussing another.
            </h2>

            <p className="mt-4 max-w-[560px] text-[12px] leading-6 text-black/45">
              Submit a new request and Fynaro can review it separately
              from your current projects.
            </p>
          </div>

          <Link
            href="/shop/requests/new"
            className="inline-flex h-11 items-center gap-3 rounded-full bg-white px-5 text-[11px] font-semibold"
          >
            Start another request
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function RequestCard({
  request,
}: {
  request: ProjectRequest;
}) {
  const isProposalReady =
    request.status === "proposal_ready";

  const needsInfo =
    request.status === "needs_info";

  return (
    <div
      className={[
        "overflow-hidden rounded-[20px] border",
        isProposalReady
          ? "border-black bg-[#111] text-white"
          : "border-black/[0.09] bg-white",
      ].join(" ")}
    >
      <div className="grid lg:grid-cols-[1fr_260px]">
        <div className="p-6 sm:p-8">
          {/* TOP */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={[
                    "text-[10px] font-semibold uppercase tracking-[0.16em]",
                    isProposalReady
                      ? "text-white/30"
                      : "text-black/30",
                  ].join(" ")}
                >
                  {request.id}
                </span>

                <StatusBadge
                  status={request.status}
                  inverse={isProposalReady}
                />
              </div>

              <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.035em] sm:text-[28px]">
                {request.title}
              </h2>

              <p
                className={[
                  "mt-2 text-[11px]",
                  isProposalReady
                    ? "text-white/40"
                    : "text-black/40",
                ].join(" ")}
              >
                {request.service}
              </p>
            </div>
          </div>

          <p
            className={[
              "mt-8 max-w-[640px] text-[12px] leading-6",
              isProposalReady
                ? "text-white/50"
                : "text-black/47",
            ].join(" ")}
          >
            {request.description}
          </p>

          {isProposalReady && (
            <div className="mt-8 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                  Recommended scope
                </p>

                <p className="mt-2 text-[13px] font-medium">
                  {request.proposedScope}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                  Proposed investment
                </p>

                <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">
                  {request.proposedInvestment}
                </p>
              </div>
            </div>
          )}

          {needsInfo && (
            <div className="mt-7 flex items-start gap-3 rounded-[14px] bg-[#f4f4ef] p-4">
              <MessageSquareText
                size={15}
                className="mt-0.5 shrink-0 text-black/40"
              />

              <p className="text-[11px] leading-5 text-black/50">
                Fynaro needs more information from you before this
                request can move forward.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div
          className={[
            "flex flex-col justify-between border-t p-6 lg:border-l lg:border-t-0",
            isProposalReady
              ? "border-white/10"
              : "border-black/[0.08]",
          ].join(" ")}
        >
          <div>
            <p
              className={[
                "text-[9px] font-semibold uppercase tracking-[0.15em]",
                isProposalReady
                  ? "text-white/30"
                  : "text-black/30",
              ].join(" ")}
            >
              Submitted
            </p>

            <p
              className={[
                "mt-2 text-[12px]",
                isProposalReady
                  ? "text-white/60"
                  : "text-black/55",
              ].join(" ")}
            >
              {request.submittedAt}
            </p>
          </div>

          <Link
            href={
              isProposalReady
                ? `/shop/proposals/${request.id}`
                : `/shop/requests/${request.id}`
            }
            className={[
              "mt-10 inline-flex h-11 items-center justify-between rounded-full px-4 text-[11px] font-semibold",
              isProposalReady
                ? "bg-white text-black"
                : "bg-[#111] text-white",
            ].join(" ")}
          >
            {isProposalReady
              ? "Review Proposal"
              : "View Request"}

            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  inverse = false,
}: {
  status: RequestStatus;
  inverse?: boolean;
}) {
  const labels: Record<RequestStatus, string> = {
    submitted: "Submitted",
    reviewing: "Reviewing",
    needs_info: "Needs Info",
    proposal_ready: "Proposal Ready",
    closed: "Closed",
  };

  if (inverse) {
    return (
      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70">
        {labels[status]}
      </span>
    );
  }

  const className: Record<RequestStatus, string> = {
    submitted: "bg-black/[0.05] text-black/50",
    reviewing: "bg-[#eee9da] text-[#645c39]",
    needs_info: "bg-[#f3e8e3] text-[#85533e]",
    proposal_ready: "bg-[#111] text-white",
    closed: "bg-black/[0.04] text-black/35",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${className[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function SummaryStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#f5f5f2] px-6 py-7">
      <p className="text-[30px] font-semibold tracking-[-0.045em]">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-medium text-black/35">
        {label}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-dashed border-black/[0.12] bg-white px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
        <FileText size={17} />
      </div>

      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.03em]">
        Nothing here yet.
      </h3>

      <p className="mt-2 max-w-[380px] text-[11px] leading-5 text-black/40">
        Requests matching this filter will appear here.
      </p>
    </div>
  );
}