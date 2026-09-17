import Link from "next/link";

import {
  ArrowUpRight,
  FileText,
} from "lucide-react";

import {
  getAdminProposals,
} from "@/lib/admin/proposals";

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

export default async function AdminProposalsPage() {
  const proposals =
    await getAdminProposals();

  const totalValue =
    proposals.reduce(
      (total, proposal) =>
        total +
        Number(
          proposal.investment ||
            0
        ),
      0
    );

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="flex flex-col gap-5 border-b border-black/5 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
            Sales
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
            Proposals
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
            Review project scope,
            pricing, deliverables and
            payment structures before
            client approval.
          </p>
        </div>

        <div className="flex gap-3">
          <Metric
            label="Proposals"
            value={String(
              proposals.length
            )}
          />

          <Metric
            label="Pipeline value"
            value={formatMoney(
              totalValue
            )}
          />
        </div>
      </div>

      {!proposals.length ? (
        <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-black/6 bg-white px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f4ef]">
            <FileText
              className="h-5 w-5 text-black/45"
              strokeWidth={1.8}
            />
          </div>

          <h2 className="mt-4 text-sm font-semibold">
            No proposals yet
          </h2>

          <p className="mt-2 max-w-md text-xs leading-5 text-black/40">
            Review a project request
            and create its proposal.
            It will automatically
            appear here.
          </p>

          <Link
            href="/admin/requests"
            className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#111111] px-4 text-sm font-medium text-white"
          >
            Review requests
          </Link>
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-2xl border border-black/6 bg-white">
          <div className="hidden grid-cols-[1.25fr_1fr_0.75fr_0.55fr_0.7fr_40px] gap-5 border-b border-black/5 bg-[#fafaf8] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-black/35 lg:grid">
            <span>
              Proposal
            </span>

            <span>
              Client
            </span>

            <span>
              Investment
            </span>

            <span>
              Version
            </span>

            <span>
              Service
            </span>

            <span />
          </div>

          <div className="divide-y divide-black/5">
            {proposals.map(
              (proposal) => (
                <Link
                  key={
                    proposal.id
                  }
                  href={`/admin/proposals/${proposal.id}`}
                  className="grid gap-4 px-5 py-5 transition hover:bg-[#fafaf8] lg:grid-cols-[1.25fr_1fr_0.75fr_0.55fr_0.7fr_40px] lg:items-center lg:gap-5"
                >
                  <div>
                    <p className="text-sm font-semibold">
                      {
                        proposal.title
                      }
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {
                        proposal.reference
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/65">
                      {proposal.client
                        ?.full_name ||
                        "Unknown client"}
                    </p>

                    <p className="mt-1 truncate text-xs text-black/40">
                      {proposal.client
                        ?.company_name ||
                        proposal.client
                          ?.email ||
                        "—"}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    {formatMoney(
                      proposal.investment,
                      proposal.currency
                    )}
                  </p>

                  <p className="text-sm text-black/55">
                    v
                    {
                      proposal.version
                    }
                  </p>

                  <p className="truncate text-sm text-black/55">
                    {
                      proposal.service
                    }
                  </p>

                  <div className="flex justify-end">
                    <ArrowUpRight
                      className="h-4 w-4 text-black/30"
                      strokeWidth={
                        1.8
                      }
                    />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[130px] rounded-xl border border-black/6 bg-white px-4 py-3">
      <p className="text-[11px] text-black/40">
        {label}
      </p>

      <p className="mt-1 text-base font-semibold tracking-[-0.02em]">
        {value}
      </p>
    </div>
  );
}