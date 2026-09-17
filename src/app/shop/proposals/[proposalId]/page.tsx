import Link from "next/link";

import {
  ArrowLeft,
  Check,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  getClientProposal,
} from "@/lib/client/proposal";

import ProposalDecisionActions from "@/components/proposals/ProposalDecisionActions";

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
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function getStatusLabel(
  status: string
) {
  switch (status) {
    case "sent":
      return "Ready for review";

    case "accepted":
      return "Accepted";

    case "rejected":
      return "Declined";

    case "expired":
      return "Expired";

    default:
      return status;
  }
}

function getStatusClass(
  status: string
) {
  switch (status) {
    case "accepted":
      return "bg-[#e5eee7] text-[#45604b]";

    case "rejected":
      return "bg-[#f2e7e3] text-[#7a5040]";

    case "expired":
      return "bg-black/[0.04] text-black/35";

    default:
      return "bg-[#e9e9e3] text-black/60";
  }
}

export default async function ProposalPage({
  params,
}: PageProps) {
  const {
    proposalId,
  } = await params;

  const proposal =
    await getClientProposal(
      proposalId
    );

  if (!proposal) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* ==================================================
          BACK
      ================================================== */}

      <Link
        href="/shop/proposals"
        className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35 transition hover:text-black"
      >
        <ArrowLeft
          size={12}
          strokeWidth={1.8}
        />

        Back to proposals
      </Link>

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="mt-6 border-b border-black/[0.08] pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
            {proposal.reference}
          </span>

          <span
            className={[
              "rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.11em]",
              getStatusClass(
                proposal.status
              ),
            ].join(" ")}
          >
            {getStatusLabel(
              proposal.status
            )}
          </span>

          <span className="rounded-full bg-[#f4f4ef] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.11em] text-black/45">
            Version{" "}
            {proposal.version}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Proposal
            </p>

            <h1 className="mt-3 max-w-[850px] text-[38px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[48px]">
              {proposal.title}
            </h1>

            <p className="mt-3 text-[11px] text-black/40">
              {proposal.service}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/25">
              Total investment
            </p>

            <p className="mt-2 text-[24px] font-semibold tracking-[-0.04em]">
              {formatMoney(
                proposal.investment,
                proposal.currency
              )}
            </p>
          </div>
        </div>
      </header>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="space-y-5">
          <Section
            title="Proposal summary"
          >
            <LongText
              value={
                proposal.summary
              }
            />
          </Section>

          <Section
            title="Scope of work"
          >
            <LongText
              value={
                proposal.scope
              }
            />
          </Section>

          {/* DELIVERABLES */}

          <Section
            title="What we'll deliver"
          >
            {proposal
              .deliverables
              ?.length ? (
              <div className="space-y-2">
                {proposal.deliverables.map(
                  (
                    deliverable,
                    index
                  ) => (
                    <div
                      key={
                        deliverable.id
                      }
                      className="flex gap-4 rounded-[14px] bg-[#fafaf7] p-4"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.07] bg-white text-[8px] font-semibold text-black/45">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold tracking-[-0.015em]">
                          {
                            deliverable.title
                          }
                        </p>

                        {deliverable.description && (
                          <p className="mt-1.5 max-w-3xl text-[10px] leading-5 text-black/40">
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
                listed.
              </EmptyText>
            )}
          </Section>

          {/* EXCLUSIONS */}

          <Section
            title="Not included"
          >
            {proposal
              .exclusions
              ?.length ? (
              <div className="space-y-3">
                {proposal.exclusions.map(
                  (exclusion) => (
                    <div
                      key={
                        exclusion.id
                      }
                      className="flex items-start gap-3"
                    >
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-black/25" />

                      <p className="text-[10px] leading-5 text-black/45">
                        {
                          exclusion.description
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No exclusions
                listed.
              </EmptyText>
            )}
          </Section>

          {/* PAYMENT PLAN */}

          <Section
            title="Payment structure"
          >
            {proposal
              .paymentStages
              ?.length ? (
              <div className="overflow-hidden rounded-[14px] border border-black/[0.07]">
                {proposal.paymentStages.map(
                  (
                    stage,
                    index
                  ) => (
                    <div
                      key={
                        stage.id
                      }
                      className="grid gap-4 border-b border-black/[0.06] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f4ef] text-[8px] font-semibold">
                          {index + 1}
                        </span>

                        <div>
                          <p className="text-[11px] font-semibold capitalize">
                            {
                              stage.stage
                            }
                          </p>

                          <p className="mt-1 text-[9px] leading-4 text-black/35">
                            {
                              stage.trigger_label
                            }
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[11px] font-semibold">
                          {formatMoney(
                            stage.amount,
                            proposal.currency
                          )}
                        </p>

                        <p className="mt-1 text-[8px] text-black/30">
                          {
                            stage.percentage
                          }
                          % of total
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No payment structure
                listed.
              </EmptyText>
            )}
          </Section>
        </main>

        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="space-y-5">
          {/* INVESTMENT */}

          <section className="rounded-[18px] bg-[#111111] p-6 text-white">
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/35">
              Project investment
            </p>

            <p className="mt-4 text-[30px] font-semibold tracking-[-0.05em]">
              {formatMoney(
                proposal.investment,
                proposal.currency
              )}
            </p>

            <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.15em] text-white/30">
              {proposal.currency}
            </p>
          </section>

          {/* DECISION */}

          <Section
            title={
              proposal.status ===
              "sent"
                ? "Your decision"
                : "Decision"
            }
          >
            {proposal.status ===
              "sent" && (
              <p className="mb-5 text-[9px] leading-5 text-black/40">
                Review the complete
                proposal carefully.
                Acceptance confirms the
                scope, investment,
                deliverables and payment
                structure shown here.
              </p>
            )}

            <ProposalDecisionActions
              proposalId={
                proposal.id
              }
              status={
                proposal.status
              }
            />

            {proposal.decision_note && (
              <div className="mt-5 border-t border-black/[0.06] pt-4">
                <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-black/25">
                  Your note
                </p>

                <p className="mt-2 whitespace-pre-wrap text-[9px] leading-5 text-black/45">
                  {
                    proposal.decision_note
                  }
                </p>
              </div>
            )}
          </Section>

          {/* DETAILS */}

          <Section
            title="Proposal details"
          >
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
              label="Service"
              value={
                proposal.service
              }
            />

            <Field
              label="Status"
              value={getStatusLabel(
                proposal.status
              )}
            />

            <Field
              label="Sent"
              value={formatDate(
                proposal.sent_at
              )}
            />

            <Field
              label="Valid until"
              value={formatDate(
                proposal.expires_at
              )}
            />

            {proposal.accepted_at && (
              <Field
                label="Accepted"
                value={formatDate(
                  proposal.accepted_at
                )}
              />
            )}

            {proposal.rejected_at && (
              <Field
                label="Declined"
                value={formatDate(
                  proposal.rejected_at
                )}
              />
            )}
          </Section>

          {/* SECURITY NOTE */}

          <div className="rounded-[18px] border border-black/[0.07] bg-[#f4f4ef] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                <Check
                  size={12}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <p className="text-[10px] font-semibold">
                  Private proposal
                </p>

                <p className="mt-1.5 text-[9px] leading-5 text-black/40">
                  This proposal was
                  prepared for your
                  Fynaro account and is
                  available only inside
                  your authenticated
                  workspace.
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
    <section className="rounded-[18px] border border-black/[0.07] bg-white p-5 sm:p-6">
      <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
        {title}
      </p>

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
    <p className="whitespace-pre-wrap text-[11px] leading-6 text-black/50">
      {value ||
        "No information provided."}
    </p>
  );
}

// ======================================================
// EMPTY
// ======================================================

function EmptyText({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <p className="text-[10px] text-black/35">
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
    <div className="flex items-start justify-between gap-5 border-b border-black/[0.06] py-3 first:pt-0 last:border-b-0 last:pb-0">
      <span className="text-[8px] font-medium text-black/30">
        {label}
      </span>

      <span className="max-w-[65%] text-right text-[9px] font-semibold text-black/55">
        {value}
      </span>
    </div>
  );
}