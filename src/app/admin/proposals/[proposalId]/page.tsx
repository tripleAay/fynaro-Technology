import Link from "next/link";

import {
  ArrowLeft,
  Check,
  FileText,
  Mail,
} from "lucide-react";

import { notFound } from "next/navigation";

import { getAdminProposal } from "@/lib/admin/proposals";
import SendProposalButton from "@/components/admin/SendProposalButton";

type PageProps = {
  params: Promise<{
    proposalId: string;
  }>;
};

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

export default async function AdminProposalDetailPage({
  params,
}: PageProps) {
  const { proposalId } =
    await params;

  const proposal =
    await getAdminProposal(
      proposalId
    );

  if (!proposal) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* ==================================================
          BACK
      ================================================== */}

      <Link
        href="/admin/proposals"
        className="inline-flex items-center gap-2 text-xs font-medium text-black/50 transition hover:text-black"
      >
        <ArrowLeft
          className="h-4 w-4"
          strokeWidth={1.8}
        />

        Back to proposals
      </Link>

      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="mt-6 flex flex-col gap-5 border-b border-black/5 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
              {proposal.reference}
            </p>

            <span className="rounded-full bg-[#f4f4ef] px-2.5 py-1 text-[11px] font-medium text-black/55">
              Version{" "}
              {proposal.version}
            </span>

            <ProposalStatusBadge
              status={
                proposal.status
              }
            />
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.045em]">
            {proposal.title}
          </h1>

          <p className="mt-3 text-sm capitalize text-black/45">
            {proposal.service}
          </p>
        </div>

        {/* REAL SEND BUTTON */}

        <SendProposalButton
          proposalId={
            proposal.id
          }
          status={
            proposal.status
          }
        />
      </section>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="space-y-5">
          {/* EXECUTIVE SUMMARY */}

          <Section title="Executive summary">
            <LongText
              value={
                proposal.summary
              }
            />
          </Section>

          {/* SCOPE */}

          <Section title="Scope of work">
            <LongText
              value={
                proposal.scope
              }
            />
          </Section>

          {/* DELIVERABLES */}

          <Section title="Deliverables">
            {proposal
              .deliverables
              ?.length ? (
              <div className="space-y-3">
                {proposal.deliverables.map(
                  (
                    deliverable,
                    index
                  ) => (
                    <div
                      key={
                        deliverable.id
                      }
                      className="flex gap-4 rounded-xl bg-[#fafaf8] p-4"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-semibold">
                        {index +
                          1}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {
                            deliverable.title
                          }
                        </p>

                        {deliverable.description && (
                          <p className="mt-1.5 text-xs leading-5 text-black/45">
                            {
                              deliverable.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No deliverables
                recorded.
              </EmptyText>
            )}
          </Section>

          {/* EXCLUSIONS */}

          <Section title="Exclusions">
            {proposal
              .exclusions
              ?.length ? (
              <div className="space-y-3">
                {proposal.exclusions.map(
                  (
                    exclusion
                  ) => (
                    <div
                      key={
                        exclusion.id
                      }
                      className="flex items-start gap-3 text-sm text-black/60"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />

                      <span>
                        {
                          exclusion.description
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No exclusions
                recorded.
              </EmptyText>
            )}
          </Section>

          {/* PAYMENT STRUCTURE */}

          <Section title="Payment structure">
            <div className="space-y-3">
              {proposal
                .paymentStages
                ?.map(
                  (
                    stage,
                    index
                  ) => (
                    <div
                      key={
                        stage.id
                      }
                      className="grid gap-4 rounded-xl border border-black/6 p-4 sm:grid-cols-[1fr_auto]"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f4ef] text-xs font-semibold">
                          {index +
                            1}
                        </div>

                        <div>
                          <p className="text-sm font-semibold capitalize">
                            {
                              stage.stage
                            }
                          </p>

                          <p className="mt-1 text-xs text-black/40">
                            {
                              stage.trigger_label
                            }
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-semibold">
                          {formatMoney(
                            stage.amount,
                            proposal.currency
                          )}
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          {
                            stage.percentage
                          }
                          %
                        </p>
                      </div>
                    </div>
                  )
                )}

              {!proposal
                .paymentStages
                ?.length && (
                <EmptyText>
                  No payment
                  structure
                  recorded.
                </EmptyText>
              )}
            </div>
          </Section>
        </main>

        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="space-y-5">
          {/* INVESTMENT */}

          <section className="rounded-2xl bg-[#111111] p-6 text-white">
            <p className="text-xs font-medium text-white/45">
              Total investment
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
              {formatMoney(
                proposal.investment,
                proposal.currency
              )}
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/35">
              {proposal.currency}
            </p>
          </section>

          {/* CLIENT */}

          <Section title="Client">
            <p className="text-base font-semibold">
              {proposal.client
                ?.full_name ||
                "Unknown client"}
            </p>

            {proposal.client
              ?.company_name && (
              <p className="mt-1 text-sm text-black/45">
                {
                  proposal.client
                    .company_name
                }
              </p>
            )}

            {proposal.client
              ?.email && (
              <a
                href={`mailto:${proposal.client.email}`}
                className="mt-5 flex items-center gap-3 text-sm text-black/55 transition hover:text-black"
              >
                <Mail
                  className="h-4 w-4"
                  strokeWidth={
                    1.8
                  }
                />

                <span className="break-all">
                  {
                    proposal.client
                      .email
                  }
                </span>
              </a>
            )}
          </Section>

          {/* PROPOSAL INFO */}

          <Section title="Proposal">
            <Field
              label="Reference"
              value={
                proposal.reference
              }
            />

            <Field
              label="Version"
              value={`v${proposal.version}`}
            />

            <Field
              label="Status"
              value={
                proposal.status
              }
            />

            <Field
              label="Service"
              value={
                proposal.service
              }
            />

            <Field
              label="Currency"
              value={
                proposal.currency
              }
            />
          </Section>

          {/* SOURCE REQUEST */}

          {proposal.request && (
            <Section title="Source request">
              <p className="text-sm font-semibold">
                {
                  proposal.request
                    .reference
                }
              </p>

              <p className="mt-1 text-xs leading-5 text-black/40">
                {proposal.request
                  .title ||
                  proposal.request
                    .business_name ||
                  "Project request"}
              </p>

              <Link
                href={`/admin/requests/${proposal.request.id}`}
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold"
              >
                <FileText className="h-4 w-4" />

                View original
                request
              </Link>
            </Section>
          )}

          {/* STATUS INFORMATION */}

          <div className="rounded-2xl border border-black/6 bg-[#f4f4ef] p-5">
            <div className="flex gap-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={
                  1.8
                }
              />

              <div>
                <p className="text-xs font-semibold">
                  Proposal status
                </p>

                <p className="mt-1 text-xs leading-5 text-black/55">
                  {proposal.status ===
                  "draft"
                    ? "This proposal is saved as a draft. Send it when it is ready for the client."
                    : proposal.status ===
                        "sent"
                      ? "This proposal has been sent and is now available in the client's Fynaro workspace."
                      : proposal.status ===
                          "accepted"
                        ? "The client has accepted this proposal."
                        : proposal.status ===
                            "rejected"
                          ? "The client rejected this proposal."
                          : proposal.status ===
                              "expired"
                            ? "This proposal has expired."
                            : `Current status: ${proposal.status}.`}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function ProposalStatusBadge({
  status,
}: {
  status: string;
}) {
  const label =
    status === "draft"
      ? "Draft"
      : status === "sent"
        ? "Sent"
        : status ===
            "accepted"
          ? "Accepted"
          : status ===
              "rejected"
            ? "Rejected"
            : status ===
                "expired"
              ? "Expired"
              : status;

  return (
    <span className="rounded-full border border-black/6 bg-white px-2.5 py-1 text-[11px] font-medium capitalize text-black/55">
      {label}
    </span>
  );
}

// ======================================================
// SECTION
// ======================================================

function Section({
  title,
  children,
}: {
  title: string;
  children:
    React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6">
      <h2 className="text-sm font-semibold">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

// ======================================================
// LONG TEXT
// ======================================================

function LongText({
  value,
}: {
  value:
    | string
    | null;
}) {
  return (
    <p className="whitespace-pre-wrap text-sm leading-7 text-black/60">
      {value ||
        "No information provided."}
    </p>
  );
}

// ======================================================
// EMPTY TEXT
// ======================================================

function EmptyText({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <p className="text-sm text-black/40">
      {children}
    </p>
  );
}

// ======================================================
// FIELD
// ======================================================

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-black/5 py-3 first:pt-0 last:border-0 last:pb-0">
      <span className="text-xs text-black/40">
        {label}
      </span>

      <span className="max-w-[65%] text-right text-sm font-medium capitalize text-black/70">
        {value}
      </span>
    </div>
  );
}