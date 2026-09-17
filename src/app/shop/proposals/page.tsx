import Link from "next/link";

import {
  ArrowRight,
  FileText,
  Plus,
} from "lucide-react";

import {
  getClientProposals,
  type ClientProposal,
  type ClientProposalStatus,
} from "@/lib/client/proposal";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Ready",
    value: "sent",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Declined",
    value: "rejected",
  },
  {
    label: "Expired",
    value: "expired",
  },
] as const;

function formatMoney(
  amount: number,
  currency = "NGN"
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(amount || 0);
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const params =
    await searchParams;

  const proposals =
    await getClientProposals();

  const requestedStatus =
    params.status || "all";

  const validFilter =
    filters.some(
      (filter) =>
        filter.value ===
        requestedStatus
    );

  const activeFilter =
    validFilter
      ? requestedStatus
      : "all";

  const filteredProposals =
    activeFilter === "all"
      ? proposals
      : proposals.filter(
          (proposal) =>
            proposal.status ===
            activeFilter
        );

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

          <span>
            Proposals
          </span>
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
              Review project scope,
              investment, deliverables
              and payment terms before
              work begins.
            </p>
          </div>

          <Link
            href="/shop/requests/new"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#111] px-4 text-[10px] font-semibold text-white transition hover:bg-black/80"
          >
            <Plus
              size={12}
            />

            New Request
          </Link>
        </div>
      </section>

      {/* FILTER */}

      <section className="flex items-center justify-between gap-4 border-b border-black/[0.08] py-4">
        <div className="flex gap-1 overflow-x-auto">
          {filters.map(
            (filter) => {
              const active =
                activeFilter ===
                filter.value;

              const href =
                filter.value ===
                "all"
                  ? "/shop/proposals"
                  : `/shop/proposals?status=${filter.value}`;

              return (
                <Link
                  key={
                    filter.value
                  }
                  href={href}
                  className={[
                    "min-w-fit rounded-full px-3 py-2 text-[9px] font-semibold transition",
                    active
                      ? "bg-[#111] text-white"
                      : "text-black/35 hover:bg-[#f4f4ef] hover:text-black",
                  ].join(" ")}
                >
                  {
                    filter.label
                  }
                </Link>
              );
            }
          )}
        </div>

        <p className="hidden text-[9px] text-black/25 sm:block">
          {
            filteredProposals.length
          }{" "}
          {filteredProposals.length ===
          1
            ? "proposal"
            : "proposals"}
        </p>
      </section>

      {/* LIST */}

      <section className="py-5">
        {filteredProposals.length >
        0 ? (
          <div className="overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            {filteredProposals.map(
              (proposal) => (
                <ProposalRow
                  key={
                    proposal.id
                  }
                  proposal={
                    proposal
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptyState
            filtered={
              activeFilter !==
              "all"
            }
          />
        )}
      </section>
    </div>
  );
}

function ProposalRow({
  proposal,
}: {
  proposal: ClientProposal;
}) {
  const ready =
    proposal.status ===
    "sent";

  const accepted =
    proposal.status ===
    "accepted";

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
              {
                proposal.reference
              }
            </span>

            <ProposalStatusBadge
              status={
                proposal.status
              }
            />
          </div>

          <h2 className="mt-3 text-[16px] font-semibold tracking-[-0.025em] sm:text-[18px]">
            {proposal.title}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[9px] text-black/32">
            <span>
              {proposal.service}
            </span>

            <span className="h-[3px] w-[3px] rounded-full bg-black/15" />

            <span>
              Version{" "}
              {proposal.version}
            </span>
          </div>
        </div>

        {/* INVESTMENT */}

        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            Investment
          </p>

          <p className="mt-1.5 text-[11px] font-semibold">
            {formatMoney(
              proposal.investment,
              proposal.currency
            )}
          </p>
        </div>

        {/* VALIDITY */}

        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            {ready
              ? "Valid until"
              : accepted
                ? "Accepted"
                : proposal.status ===
                    "rejected"
                  ? "Declined"
                  : "Expired"}
          </p>

          <p className="mt-1.5 text-[9px] font-medium text-black/50">
            {formatDate(
              ready
                ? proposal.expires_at
                : accepted
                  ? proposal.accepted_at
                  : proposal.status ===
                      "rejected"
                    ? proposal.rejected_at
                    : proposal.expires_at
            )}
          </p>
        </div>

        {/* ACTION */}

        <Link
          href={`/shop/proposals/${proposal.id}`}
          className="group/action inline-flex h-9 w-fit items-center gap-2 rounded-full border border-black/[0.09] bg-white px-3.5 text-[9px] font-semibold text-black/55 transition hover:border-black/15 hover:text-black"
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
  status: ClientProposalStatus;
}) {
  const config: Record<
    ClientProposalStatus,
    {
      label: string;
      className: string;
    }
  > = {
    sent: {
      label: "Ready",
      className:
        "bg-[#e9e9e3] text-black/60",
    },

    accepted: {
      label: "Accepted",
      className:
        "bg-[#e5eee7] text-[#45604b]",
    },

    rejected: {
      label: "Declined",
      className:
        "bg-[#f2e7e3] text-[#7a5040]",
    },

    expired: {
      label: "Expired",
      className:
        "bg-black/[0.04] text-black/35",
    },
  };

  const item =
    config[status];

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

function EmptyState({
  filtered,
}: {
  filtered: boolean;
}) {
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
        {filtered
          ? "No proposals in this category."
          : "No proposals yet."}
      </h3>

      <p className="mt-2 max-w-[320px] text-[9px] leading-5 text-black/35">
        {filtered
          ? "Try another filter to view your other proposals."
          : "Proposals will appear here when Fynaro sends a project scope for your review."}
      </p>
    </div>
  );
}