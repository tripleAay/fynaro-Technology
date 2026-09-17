import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Package,
  UserRound,
} from "lucide-react";

import {
  getAdminOrder,
  type AdminOrderPaymentStage,
} from "@/lib/admin/orders";

// ======================================================
// TYPES
// ======================================================

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

// ======================================================
// FORMAT MONEY
// ======================================================

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
  ).format(Number(amount || 0));
}

// ======================================================
// FORMAT STATUS
// ======================================================

function formatStatus(
  value?: string | null
) {
  if (!value) {
    return "—";
  }

  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(
  value?: string | null
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
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(date);
}

// ======================================================
// PAGE
// ======================================================

export default async function AdminOrderDetailPage({
  params,
}: PageProps) {
  const {
    orderId,
  } = await params;

  const order =
    await getAdminOrder(
      orderId
    );

  if (!order) {
    notFound();
  }

  const items =
    order.items || [];

  const paymentStages =
    order.paymentStages || [];

  const paidAmount =
    paymentStages.reduce(
      (
        total,
        stage
      ) => {
        if (
          stage.payment_status ===
          "paid"
        ) {
          return (
            total +
            Number(
              stage.amount || 0
            )
          );
        }

        return total;
      },
      0
    );

  const outstandingAmount =
    Math.max(
      Number(
        order.total || 0
      ) - paidAmount,
      0
    );

  return (
    <div className="mx-auto max-w-[1500px] pb-16">
      {/* BACK */}

      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-xs font-medium text-black/45 transition hover:text-black"
      >
        <ArrowLeft
          className="h-4 w-4"
          strokeWidth={1.8}
        />

        Back to orders
      </Link>

      {/* HEADER */}

      <div className="mt-6 flex flex-col gap-6 border-b border-black/5 pb-7 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
              Order
            </p>

            <span className="text-black/15">
              /
            </span>

            <p className="text-xs font-semibold text-black/45">
              {order.reference}
            </p>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
            {order.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge
              value={
                order.status
              }
            />

            <StatusBadge
              value={
                order.payment_status
              }
            />

            <StatusBadge
              value={
                order.fulfillment_status
              }
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-black/40">
            Order total
          </p>

          <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            {formatMoney(
              order.total,
              order.currency
            )}
          </p>
        </div>
      </div>

      {/* METRICS */}

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={
            <Banknote
              className="h-5 w-5"
              strokeWidth={
                1.7
              }
            />
          }
          label="Order value"
          value={formatMoney(
            order.total,
            order.currency
          )}
        />

        <MetricCard
          icon={
            <CheckCircle2
              className="h-5 w-5"
              strokeWidth={
                1.7
              }
            />
          }
          label="Paid"
          value={formatMoney(
            paidAmount,
            order.currency
          )}
        />

        <MetricCard
          icon={
            <CircleDollarSign
              className="h-5 w-5"
              strokeWidth={
                1.7
              }
            />
          }
          label="Outstanding"
          value={formatMoney(
            outstandingAmount,
            order.currency
          )}
        />

        <MetricCard
          icon={
            <Package
              className="h-5 w-5"
              strokeWidth={
                1.7
              }
            />
          }
          label="Order type"
          value={formatStatus(
            order.order_type
          )}
        />
      </div>

      {/* CONTENT */}

      <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT */}

        <div className="space-y-7">
          {/* ORDER SUMMARY */}

          <Section
            title="Order summary"
            description="Snapshot of the service or products included in this order."
          >
            {order.summary_snapshot ? (
              <p className="whitespace-pre-wrap text-sm leading-7 text-black/60">
                {
                  order.summary_snapshot
                }
              </p>
            ) : (
              <EmptyText>
                No order summary
                provided.
              </EmptyText>
            )}
          </Section>

          {/* SCOPE */}

          {order.scope_snapshot && (
            <Section
              title="Scope"
              description="The agreed scope captured when the order was created."
            >
              <p className="whitespace-pre-wrap text-sm leading-7 text-black/60">
                {
                  order.scope_snapshot
                }
              </p>
            </Section>
          )}

          {/* ITEMS */}

          <Section
            title="Order items"
            description="Services and products included in the order."
          >
            {items.length ? (
              <div className="divide-y divide-black/5">
                {items.map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-xs capitalize text-black/40">
                          {
                            item.item_type
                          }{" "}
                          · Qty{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-semibold">
                          {formatMoney(
                            item.subtotal,
                            order.currency
                          )}
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          {formatMoney(
                            item.unit_price,
                            order.currency
                          )}{" "}
                          each
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No order items
                found.
              </EmptyText>
            )}
          </Section>

          {/* PAYMENT SCHEDULE */}

          <Section
            title="Payment schedule"
            description="Payment milestones copied from the accepted proposal."
          >
            {paymentStages.length ? (
              <div className="space-y-3">
                {paymentStages.map(
                  (
                    stage
                  ) => (
                    <PaymentStage
                      key={
                        stage.id
                      }
                      stage={
                        stage
                      }
                      currency={
                        order.currency
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyText>
                No payment stages
                found.
              </EmptyText>
            )}
          </Section>
        </div>

        {/* RIGHT */}

        <div className="space-y-7">
          {/* CLIENT */}

          <Section
            title="Client"
            icon={
              <UserRound
                className="h-4 w-4"
                strokeWidth={
                  1.8
                }
              />
            }
          >
            <InfoRow
              label="Name"
              value={
                order.client
                  ?.full_name ||
                "—"
              }
            />

            <InfoRow
              label="Company"
              value={
                order.client
                  ?.company_name ||
                "—"
              }
            />

            <InfoRow
              label="Email"
              value={
                order.client
                  ?.email ||
                "—"
              }
            />

            <InfoRow
              label="Phone"
              value={
                order.client
                  ?.phone ||
                "—"
              }
            />
          </Section>

          {/* ORDER INFO */}

          <Section
            title="Order information"
            icon={
              <Package
                className="h-4 w-4"
                strokeWidth={
                  1.8
                }
              />
            }
          >
            <InfoRow
              label="Reference"
              value={
                order.reference
              }
            />

            <InfoRow
              label="Type"
              value={formatStatus(
                order.order_type
              )}
            />

            <InfoRow
              label="Source"
              value={formatStatus(
                order.source_type
              )}
            />

            <InfoRow
              label="Service"
              value={formatStatus(
                order.service
              )}
            />

            <InfoRow
              label="Currency"
              value={
                order.currency
              }
            />

            <InfoRow
              label="Created"
              value={formatDate(
                order.created_at
              )}
            />

            <InfoRow
              label="Accepted"
              value={formatDate(
                order.accepted_at
              )}
            />
          </Section>

          {/* SOURCE */}

          <Section
            title="Source"
            icon={
              <FileText
                className="h-4 w-4"
                strokeWidth={
                  1.8
                }
              />
            }
          >
            <InfoRow
              label="Proposal"
              value={
                order.proposal_reference ||
                "—"
              }
            />

            <InfoRow
              label="Version"
              value={
                order.proposal_version
                  ? `Version ${order.proposal_version}`
                  : "—"
              }
            />

            {order.proposal_id && (
              <Link
                href={`/admin/proposals/${order.proposal_id}`}
                className="mt-4 inline-flex min-h-[40px] w-full items-center justify-center rounded-xl border border-black/8 px-4 text-xs font-semibold transition hover:bg-black hover:text-white"
              >
                View source
                proposal
              </Link>
            )}
          </Section>

          {/* FINANCIAL SUMMARY */}

          <Section
            title="Financial summary"
            icon={
              <CircleDollarSign
                className="h-4 w-4"
                strokeWidth={
                  1.8
                }
              />
            }
          >
            <MoneyRow
              label="Subtotal"
              value={formatMoney(
                order.subtotal,
                order.currency
              )}
            />

            <MoneyRow
              label="Discount"
              value={formatMoney(
                order.discounts,
                order.currency
              )}
            />

            <MoneyRow
              label="Delivery"
              value={formatMoney(
                order.delivery,
                order.currency
              )}
            />

            <MoneyRow
              label="Tax"
              value={formatMoney(
                order.tax,
                order.currency
              )}
            />

            <div className="mt-4 border-t border-black/5 pt-4">
              <MoneyRow
                label="Total"
                value={formatMoney(
                  order.total,
                  order.currency
                )}
                strong
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// SECTION
// ======================================================

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children:
    React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-black/35">
            {icon}
          </span>
        )}

        <h2 className="text-sm font-semibold">
          {title}
        </h2>
      </div>

      {description && (
        <p className="mt-1 text-xs leading-5 text-black/40">
          {description}
        </p>
      )}

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

// ======================================================
// METRIC
// ======================================================

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/6 bg-white p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4f4ef] text-black/45">
        {icon}
      </div>

      <p className="mt-5 text-xs text-black/40">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold tracking-[-0.025em]">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// INFO ROW
// ======================================================

function InfoRow({
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

      <span className="max-w-[210px] break-words text-right text-xs font-medium text-black/70">
        {value}
      </span>
    </div>
  );
}

// ======================================================
// MONEY ROW
// ======================================================

function MoneyRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-xs text-black/40">
        {label}
      </span>

      <span
        className={
          strong
            ? "text-sm font-semibold"
            : "text-xs font-medium text-black/70"
        }
      >
        {value}
      </span>
    </div>
  );
}

// ======================================================
// PAYMENT STAGE
// ======================================================

function PaymentStage({
  stage,
  currency,
}: {
  stage:
    AdminOrderPaymentStage;
  currency: string;
}) {
  return (
    <div className="rounded-xl border border-black/6 bg-[#fafaf8] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              {
                stage.position
              }
            </span>

            <p className="text-sm font-semibold">
              {formatStatus(
                stage.stage
              )}
            </p>

            <StatusBadge
              value={
                stage.payment_status
              }
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-black/45">
            {
              stage.trigger_label
            }
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-lg font-semibold tracking-[-0.025em]">
            {formatMoney(
              stage.amount,
              currency
            )}
          </p>

          <p className="mt-1 text-xs text-black/40">
            {
              stage.percentage
            }
            % of order
          </p>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function StatusBadge({
  value,
}: {
  value: string;
}) {
  return (
    <span className="inline-flex rounded-full border border-black/6 bg-[#f4f4ef] px-2.5 py-1 text-[11px] font-medium text-black/60">
      {formatStatus(
        value
      )}
    </span>
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