import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Package,
  ReceiptText,
} from "lucide-react";

import {
  getClientOrder,
  type ClientOrderPaymentStage,
} from "@/lib/client/orders";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ======================================================
// HELPERS
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
  ).format(
    Number(amount || 0)
  );
}

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
    }
  ).format(date);
}

// ======================================================
// PAGE
// ======================================================

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  const {
    id,
  } = await params;

  const order =
    await getClientOrder(
      id
    );

  if (!order) {
    notFound();
  }

  const items =
    order.items || [];

  const paymentStages =
    order.paymentStages ||
    [];

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
              stage.amount ||
                0
            )
          );
        }

        return total;
      },
      0
    );

  const outstanding =
    Math.max(
      Number(
        order.total || 0
      ) - paidAmount,
      0
    );

  const nextPaymentStage =
    paymentStages.find(
      (stage) =>
        stage.payment_status !==
        "paid"
    );

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* BACK */}

      <Link
        href="/shop/orders"
        className="inline-flex items-center gap-2 text-[9px] font-semibold text-black/35 transition hover:text-black"
      >
        <ArrowLeft
          size={12}
        />

        Back to orders
      </Link>

      {/* HEADER */}

      <section className="mt-6 border-b border-black/[0.08] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
                {
                  order.reference
                }
              </span>

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
            </div>

            <h1 className="mt-4 text-[32px] font-semibold leading-none tracking-[-0.045em] sm:text-[42px]">
              {order.title}
            </h1>

            <p className="mt-3 text-[10px] text-black/40">
              {formatStatus(
                order.service
              )}{" "}
              ·{" "}
              {formatStatus(
                order.order_type
              )}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
              Order total
            </p>

            <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
              {formatMoney(
                order.total,
                order.currency
              )}
            </p>
          </div>
        </div>
      </section>

      {/* FINANCIAL OVERVIEW */}

      <section className="grid gap-px border-b border-black/[0.08] bg-black/[0.08] md:grid-cols-3">
        <Metric
          icon={
            <ReceiptText
              size={14}
            />
          }
          label="Order value"
          value={formatMoney(
            order.total,
            order.currency
          )}
        />

        <Metric
          icon={
            <CheckCircle2
              size={14}
            />
          }
          label="Paid"
          value={formatMoney(
            paidAmount,
            order.currency
          )}
        />

        <Metric
          icon={
            <CircleDollarSign
              size={14}
            />
          }
          label="Outstanding"
          value={formatMoney(
            outstanding,
            order.currency
          )}
        />
      </section>

      {/* PAYMENT CTA */}

      {nextPaymentStage && (
        <section className="mt-7 rounded-[20px] bg-[#111] p-6 text-white sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Next payment
              </p>

              <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em]">
                {formatStatus(
                  nextPaymentStage.stage
                )}
              </h2>

              <p className="mt-2 text-[10px] text-white/45">
                {
                  nextPaymentStage.trigger_label
                }
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-[24px] font-semibold tracking-[-0.04em]">
                {formatMoney(
                  nextPaymentStage.amount,
                  order.currency
                )}
              </p>

              <p className="mt-1 text-[9px] text-white/40">
                {
                  nextPaymentStage.percentage
                }
                % of order
              </p>

              <Link
                href={`/shop/billing?order=${order.id}&stage=${nextPaymentStage.id}`}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[9px] font-semibold text-black transition hover:bg-white/90"
              >
                Make payment

                <ArrowRight
                  size={11}
                />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-7">
          {/* SUMMARY */}

          <Section
            title="Order summary"
            description="Summary captured from your accepted proposal."
          >
            <p className="whitespace-pre-wrap text-[11px] leading-6 text-black/55">
              {order.summary_snapshot ||
                "No summary provided."}
            </p>
          </Section>

          {/* SCOPE */}

          <Section
            title="Scope"
            description="The agreed scope attached to this order."
          >
            <p className="whitespace-pre-wrap text-[11px] leading-6 text-black/55">
              {order.scope_snapshot ||
                "No scope provided."}
            </p>
          </Section>

          {/* ITEMS */}

          <Section
            title="Order items"
            description="Services and products included in your order."
          >
            {items.length ? (
              <div className="divide-y divide-black/[0.07]">
                {items.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-[11px] font-semibold">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-[8px] text-black/30">
                          {formatStatus(
                            item.item_type
                          )}{" "}
                          · Qty{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <p className="text-[11px] font-semibold">
                        {formatMoney(
                          item.subtotal,
                          order.currency
                        )}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-[10px] text-black/35">
                No items found.
              </p>
            )}
          </Section>

          {/* PAYMENT SCHEDULE */}

          <Section
            title="Payment schedule"
            description="Your agreed payment milestones."
          >
            {paymentStages.length ? (
              <div className="space-y-3">
                {paymentStages.map(
                  (stage) => (
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
              <p className="text-[10px] text-black/35">
                No payment
                schedule found.
              </p>
            )}
          </Section>
        </div>

        {/* SIDEBAR */}

        <aside className="space-y-7">
          <Section
            title="Order information"
            icon={
              <Package
                size={13}
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
              label="Service"
              value={formatStatus(
                order.service
              )}
            />

            <InfoRow
              label="Type"
              value={formatStatus(
                order.order_type
              )}
            />

            <InfoRow
              label="Status"
              value={formatStatus(
                order.status
              )}
            />

            <InfoRow
              label="Payment"
              value={formatStatus(
                order.payment_status
              )}
            />

            <InfoRow
              label="Created"
              value={formatDate(
                order.created_at
              )}
            />
          </Section>

          {order.proposal_reference && (
            <Section
              title="Proposal"
              icon={
                <FileText
                  size={13}
                />
              }
            >
              <InfoRow
                label="Reference"
                value={
                  order.proposal_reference
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
                  href={`/shop/proposals/${order.proposal_id}`}
                  className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-full border border-black/[0.09] text-[9px] font-semibold text-black/55 transition hover:bg-black hover:text-white"
                >
                  View proposal

                  <ArrowRight
                    size={10}
                  />
                </Link>
              )}
            </Section>
          )}

          <Section
            title="Financial summary"
            icon={
              <CircleDollarSign
                size={13}
              />
            }
          >
            <InfoRow
              label="Subtotal"
              value={formatMoney(
                order.subtotal,
                order.currency
              )}
            />

            <InfoRow
              label="Discount"
              value={formatMoney(
                order.discounts,
                order.currency
              )}
            />

            <InfoRow
              label="Delivery"
              value={formatMoney(
                order.delivery,
                order.currency
              )}
            />

            <InfoRow
              label="Tax"
              value={formatMoney(
                order.tax,
                order.currency
              )}
            />

            <div className="mt-3 border-t border-black/[0.07] pt-3">
              <InfoRow
                label="Total"
                value={formatMoney(
                  order.total,
                  order.currency
                )}
                strong
              />
            </div>
          </Section>
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
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-black/[0.08] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-black/35">
            {icon}
          </span>
        )}

        <h2 className="text-[12px] font-semibold">
          {title}
        </h2>
      </div>

      {description && (
        <p className="mt-1.5 text-[9px] leading-5 text-black/35">
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

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#fafaf8] px-5 py-5 sm:px-6">
      <div className="flex items-center gap-2 text-black/30">
        {icon}

        <p className="text-[8px] font-semibold uppercase tracking-[0.14em]">
          {label}
        </p>
      </div>

      <p className="mt-3 text-[17px] font-semibold tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// INFO
// ======================================================

function InfoRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] py-3 first:pt-0 last:border-0 last:pb-0">
      <span className="text-[9px] text-black/35">
        {label}
      </span>

      <span
        className={[
          "max-w-[190px] text-right text-[9px]",
          strong
            ? "font-semibold text-black"
            : "font-medium text-black/65",
        ].join(" ")}
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
    ClientOrderPaymentStage;
  currency: string;
}) {
  const paid =
    stage.payment_status ===
    "paid";

  return (
    <div className="rounded-[14px] border border-black/[0.07] bg-[#fafaf8] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111] text-[8px] font-semibold text-white">
              {
                stage.position
              }
            </span>

            <p className="text-[11px] font-semibold">
              {formatStatus(
                stage.stage
              )}
            </p>

            <span
              className={[
                "rounded-full px-2 py-1 text-[7px] font-semibold uppercase",
                paid
                  ? "bg-[#e7eee8] text-[#45604b]"
                  : "bg-[#eee9df] text-[#6d6047]",
              ].join(" ")}
            >
              {formatStatus(
                stage.payment_status
              )}
            </span>
          </div>

          <p className="mt-2 text-[9px] text-black/35">
            {
              stage.trigger_label
            }
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[14px] font-semibold">
            {formatMoney(
              stage.amount,
              currency
            )}
          </p>

          <p className="mt-1 text-[8px] text-black/30">
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
// STATUS
// ======================================================

function StatusBadge({
  value,
}: {
  value: string;
}) {
  const positive =
    value === "paid" ||
    value === "completed";

  const pending =
    value === "unpaid" ||
    value ===
      "awaiting_payment";

  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.1em]",
        positive
          ? "bg-[#e7eee8] text-[#45604b]"
          : pending
            ? "bg-[#eee9df] text-[#6d6047]"
            : "bg-black/[0.04] text-black/40",
      ].join(" ")}
    >
      {formatStatus(
        value
      )}
    </span>
  );
}