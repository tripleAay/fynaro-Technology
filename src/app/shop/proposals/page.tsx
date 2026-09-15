"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

type ProposalStatus =
  | "ready"
  | "accepted"
  | "expired"
  | "declined";

type Proposal = {
  id: string;
  requestId: string;
  title: string;
  service: string;
  scope: string;
  status: ProposalStatus;
  createdAt: string;
  validUntil: string;
  investment: string;
};

const proposals: Proposal[] = [
  {
    id: "PRP-0042",
    requestId: "FYN-0042",
    title: "Marketplace Platform",
    service: "Digital Product",
    scope: "Custom Product Development",
    status: "ready",
    createdAt: "Sep 9, 2026",
    validUntil: "Sep 23, 2026",
    investment: "₦2,450,000",
  },
  {
    id: "PRP-0039",
    requestId: "FYN-0039",
    title: "NewJersey.ng Ecommerce",
    service: "Web Development",
    scope: "Growth Web Development",
    status: "ready",
    createdAt: "Aug 31, 2026",
    validUntil: "Sep 14, 2026",
    investment: "₦850,000",
  },
  {
    id: "PRP-0034",
    requestId: "FYN-0034",
    title: "Business Website",
    service: "Web Development",
    scope: "Launch Web Development",
    status: "accepted",
    createdAt: "Aug 12, 2026",
    validUntil: "Aug 26, 2026",
    investment: "₦350,000",
  },
];

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Ready",
    value: "ready",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Expired",
    value: "expired",
  },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export default function ProposalsPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const filteredProposals = useMemo(() => {
    if (activeFilter === "all") {
      return proposals;
    }

    return proposals.filter(
      (proposal) =>
        proposal.status === activeFilter,
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

          <span>Proposals</span>
        </div>

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Proposals
            </p>

            <h1 className="mt-3 text-[38px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[48px]">
              Review what&apos;s ready.
            </h1>

            <p className="mt-3 max-w-[510px] text-[11px] leading-5 text-black/42">
              Review project scope, investment and delivery
              terms before work begins.
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

      {/* FILTER */}
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
          {filteredProposals.length}{" "}
          {filteredProposals.length === 1
            ? "proposal"
            : "proposals"}
        </p>
      </section>

      {/* LIST */}
      <section className="py-5">
        {filteredProposals.length > 0 ? (
          <div className="overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            {filteredProposals.map(
              (proposal) => (
                <ProposalRow
                  key={proposal.id}
                  proposal={proposal}
                />
              ),
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}

function ProposalRow({
  proposal,
}: {
  proposal: Proposal;
}) {
  const ready = proposal.status === "ready";
  const accepted =
    proposal.status === "accepted";

  return (
    <article
      className={[
        "group relative border-b border-black/[0.07] last:border-b-0",
        "transition-colors duration-200",
        ready
          ? "bg-[#f4f4ef]/70 hover:bg-[#efefe8]"
          : "bg-white hover:bg-[#fafaf7]",
      ].join(" ")}
    >
      {ready && (
        <span className="absolute inset-y-0 left-0 w-[2px] bg-[#c7c7bb]" />
      )}

      <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_160px_160px_auto] lg:items-center">
        {/* MAIN */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/25">
              {proposal.id}
            </span>

            <ProposalStatusBadge
              status={proposal.status}
            />
          </div>

          <h2 className="mt-3 text-[16px] font-semibold tracking-[-0.025em] sm:text-[18px]">
            {proposal.title}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[9px] text-black/32">
            <span>{proposal.service}</span>

            <span className="h-[3px] w-[3px] rounded-full bg-black/15" />

            <span>{proposal.scope}</span>
          </div>
        </div>

        {/* INVESTMENT */}
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            Investment
          </p>

          <p className="mt-1.5 text-[11px] font-semibold">
            {proposal.investment}
          </p>
        </div>

        {/* VALIDITY */}
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            {accepted
              ? "Created"
              : "Valid until"}
          </p>

          <p className="mt-1.5 text-[9px] font-medium text-black/50">
            {accepted
              ? proposal.createdAt
              : proposal.validUntil}
          </p>
        </div>

        {/* ACTION */}
        <Link
          href={`/shop/proposals/${proposal.id}`}
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
            transition
            hover:border-black/15
            hover:text-black
          "
        >
          {ready
            ? "Review"
            : "View"}

          <ArrowRight
            size={10}
            className="transition-transform group-hover/action:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

function ProposalStatusBadge({
  status,
}: {
  status: ProposalStatus;
}) {
  const config: Record<
    ProposalStatus,
    {
      label: string;
      className: string;
    }
  > = {
    ready: {
      label: "Ready",
      className:
        "bg-[#e9e9e3] text-black/60",
    },

    accepted: {
      label: "Accepted",
      className:
        "bg-[#e5eee7] text-[#45604b]",
    },

    expired: {
      label: "Expired",
      className:
        "bg-black/[0.04] text-black/35",
    },

    declined: {
      label: "Declined",
      className:
        "bg-[#f2e7e3] text-[#7a5040]",
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
        No proposals here.
      </h3>

      <p className="mt-2 max-w-[320px] text-[9px] leading-5 text-black/35">
        Proposals will appear here when a project
        scope is ready for review.
      </p>
    </div>
  );
}