"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  ReceiptText,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type OrderStatus =
  | "pending_payment"
  | "processing"
  | "active"
  | "completed"
  | "cancelled";

type PaymentStatus =
  | "unpaid"
  | "part_paid"
  | "paid";

type FynaroOrder = {
  id: string;
  proposalId?: string;
  projectId?: string;

  title: string;
  service: string;
  package?: string;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  createdAt: string;

  total: number;
  paid: number;
  balance: number;
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const orders: FynaroOrder[] = [
  {
    id: "ORD-0042",
    proposalId: "PRP-0042",
    projectId: "FYN-PRJ-0042",

    title: "Marketplace Platform",
    service: "Digital Product",
    package: "Custom Product Development",

    status: "active",
    paymentStatus: "part_paid",

    createdAt: "Sep 10, 2026",

    total: 2450000,
    paid: 1225000,
    balance: 1225000,
  },
  {
    id: "ORD-0034",
    proposalId: "PRP-0034",
    projectId: "FYN-PRJ-0034",

    title: "Business Website",
    service: "Web Development",
    package: "Launch",

    status: "completed",
    paymentStatus: "paid",

    createdAt: "Aug 13, 2026",

    total: 350000,
    paid: 350000,
    balance: 0,
  },
  {
    id: "ORD-0031",
    proposalId: "PRP-0031",

    title: "Brand Identity System",
    service: "Design",
    package: "Brand Identity",

    status: "pending_payment",
    paymentStatus: "unpaid",

    createdAt: "Aug 4, 2026",

    total: 350000,
    paid: 0,
    balance: 350000,
  },
];

/* -------------------------------------------------------------------------- */
/*                                   FILTERS                                  */
/* -------------------------------------------------------------------------- */

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
] as const;

type FilterValue =
  (typeof filters)[number]["value"];

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") {
      return orders;
    }

    if (activeFilter === "pending") {
      return orders.filter(
        (order) =>
          order.status === "pending_payment" ||
          order.paymentStatus === "unpaid",
      );
    }

    return orders.filter(
      (order) => order.status === activeFilter,
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

          <span>Orders</span>
        </div>

        <div className="mt-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
            Orders
          </p>

          <h1 className="mt-3 text-[38px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[48px]">
            Your purchases.
          </h1>

          <p className="mt-3 max-w-[510px] text-[11px] leading-5 text-black/42">
            View confirmed services, payment status
            and the projects connected to each order.
          </p>
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
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1
            ? "order"
            : "orders"}
        </p>
      </section>

      {/* ORDER LIST */}
      <section className="py-5">
        {filteredOrders.length > 0 ? (
          <div className="overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            {filteredOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
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
/*                                 ORDER ROW                                  */
/* -------------------------------------------------------------------------- */

function OrderRow({
  order,
}: {
  order: FynaroOrder;
}) {
  const pending =
    order.status === "pending_payment";

  const completed =
    order.status === "completed";

  return (
    <article
      className={[
        "group relative border-b border-black/[0.07] last:border-b-0",
        "transition-colors duration-200",
        pending
          ? "bg-[#f7f5f0] hover:bg-[#f3f0e9]"
          : "bg-white hover:bg-[#fafaf7]",
      ].join(" ")}
    >
      {pending && (
        <span className="absolute inset-y-0 left-0 w-[2px] bg-[#c7bda8]" />
      )}

      <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_150px_160px_auto] lg:items-center">
        {/* MAIN */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/25">
              {order.id}
            </span>

            <OrderStatusBadge
              status={order.status}
            />

            <PaymentBadge
              status={order.paymentStatus}
            />
          </div>

          <h2 className="mt-3 text-[16px] font-semibold tracking-[-0.025em] sm:text-[18px]">
            {order.title}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[9px] text-black/32">
            <span>{order.service}</span>

            {order.package && (
              <>
                <span className="h-[3px] w-[3px] rounded-full bg-black/15" />

                <span>{order.package}</span>
              </>
            )}
          </div>
        </div>

        {/* TOTAL */}
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            Order total
          </p>

          <p className="mt-1.5 text-[11px] font-semibold">
            {formatMoney(order.total)}
          </p>
        </div>

        {/* PAYMENT */}
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25">
            {order.balance > 0
              ? "Balance"
              : "Payment"}
          </p>

          <p
            className={[
              "mt-1.5 text-[10px] font-semibold",
              order.balance > 0
                ? "text-black/65"
                : "text-[#45604b]",
            ].join(" ")}
          >
            {order.balance > 0
              ? formatMoney(order.balance)
              : "Paid in full"}
          </p>

          <p className="mt-1 text-[8px] text-black/25">
            {order.createdAt}
          </p>
        </div>

        {/* ACTION */}
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {pending ? (
            <Link
              href={`/shop/billing?order=${order.id}`}
              className="group/action inline-flex h-9 items-center gap-2 rounded-full bg-[#111] px-3.5 text-[9px] font-semibold text-white transition hover:bg-black/80"
            >
              Make Payment

              <ArrowRight
                size={10}
                className="transition-transform group-hover/action:translate-x-0.5"
              />
            </Link>
          ) : (
            <Link
              href={`/shop/orders/${order.id}`}
              className="group/action inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.09] bg-white px-3.5 text-[9px] font-semibold text-black/55 transition hover:border-black/15 hover:text-black"
            >
              View Order

              <ArrowRight
                size={10}
                className="transition-transform group-hover/action:translate-x-0.5"
              />
            </Link>
          )}

          {order.projectId && !pending && (
            <Link
              href={`/shop/projects/${order.projectId}`}
              className="inline-flex h-9 items-center rounded-full px-3 text-[9px] font-semibold text-black/35 transition hover:bg-[#f4f4ef] hover:text-black"
            >
              Project
            </Link>
          )}
        </div>
      </div>

      {/* SUBTLE PAYMENT PROGRESS */}
      {!completed &&
        order.total > 0 &&
        order.paid > 0 && (
          <div className="px-5 pb-4 sm:px-6">
            <div className="h-[2px] overflow-hidden rounded-full bg-black/[0.05]">
              <div
                className="h-full rounded-full bg-black/35"
                style={{
                  width: `${Math.min(
                    (order.paid / order.total) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ORDER STATUS                                  */
/* -------------------------------------------------------------------------- */

function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const config: Record<
    OrderStatus,
    {
      label: string;
      className: string;
    }
  > = {
    pending_payment: {
      label: "Pending Payment",
      className:
        "bg-[#eee9df] text-[#6d6047]",
    },

    processing: {
      label: "Processing",
      className:
        "bg-[#ededeb] text-black/50",
    },

    active: {
      label: "Active",
      className:
        "bg-[#e7eee8] text-[#45604b]",
    },

    completed: {
      label: "Completed",
      className:
        "bg-[#e7eee8] text-[#45604b]",
    },

    cancelled: {
      label: "Cancelled",
      className:
        "bg-black/[0.04] text-black/30",
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
/*                             PAYMENT STATUS                                 */
/* -------------------------------------------------------------------------- */

function PaymentBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const config: Record<
    PaymentStatus,
    {
      label: string;
      className: string;
    }
  > = {
    unpaid: {
      label: "Unpaid",
      className:
        "bg-[#f3e8e3] text-[#7d5b4c]",
    },

    part_paid: {
      label: "Part Paid",
      className:
        "bg-[#eeeeea] text-black/50",
    },

    paid: {
      label: "Paid",
      className:
        "bg-black/[0.04] text-black/40",
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
        <ReceiptText
          size={14}
          strokeWidth={1.6}
          className="text-black/45"
        />
      </span>

      <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.025em]">
        No orders here.
      </h3>

      <p className="mt-2 max-w-[330px] text-[9px] leading-5 text-black/35">
        Confirmed Fynaro services and purchases
        will appear here.
      </p>
    </div>
  );
}