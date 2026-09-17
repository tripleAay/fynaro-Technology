import Link from "next/link";
import {
  ArrowRight,
  Package,
  ReceiptText,
} from "lucide-react";

import {
  getClientOrders,
  type ClientOrder,
} from "@/lib/client/orders";

// ======================================================
// HELPERS
// ======================================================

function formatMoney(
  amount?: number | null,
  currency = "NGN"
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function formatDate(
  value?: string | null
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatStatus(
  value?: string | null
) {
  if (!value) {
    return "—";
  }

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

// ======================================================
// PAGE
// ======================================================

export default async function OrdersPage() {
  const orders = await getClientOrders();

  const totalValue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  const unpaidOrders = orders.filter(
    (order) =>
      order.payment_status === "unpaid" ||
      order.payment_status === "partially_paid"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "completed" &&
      order.status !== "cancelled"
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="border-b border-black/[0.08] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Client workspace
            </p>

            <h1 className="mt-3 text-[40px] font-semibold leading-none tracking-[-0.05em] sm:text-[52px]">
              Orders
            </h1>

            <p className="mt-4 max-w-[620px] text-[11px] leading-5 text-black/42">
              Track your accepted services,
              purchases, payment status and
              order progress from one place.
            </p>
          </div>

          <Link
            href="/shop/requests/new"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-black px-5 text-[9px] font-semibold text-white transition hover:bg-black/80"
          >
            Start a new request

            <ArrowRight size={11} />
          </Link>
        </div>
      </section>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <section className="grid gap-px border-b border-black/[0.08] bg-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Orders"
          value={String(orders.length)}
        />

        <Metric
          label="Order value"
          value={formatMoney(totalValue)}
        />

        <Metric
          label="Payment due"
          value={String(unpaidOrders)}
        />

        <Metric
          label="Active"
          value={String(activeOrders)}
        />
      </section>

      {/* ================================================= */}
      {/* ORDERS */}
      {/* ================================================= */}

      <section className="py-7">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Purchases
            </p>

            <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.03em]">
              Your orders
            </h2>
          </div>

          {orders.length > 0 && (
            <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-black/25">
              {orders.length}{" "}
              {orders.length === 1
                ? "order"
                : "orders"}
            </p>
          )}
        </div>

        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
            {/* DESKTOP TABLE HEADER */}

            <div className="hidden grid-cols-[minmax(0,1.6fr)_120px_140px_130px_44px] gap-5 border-b border-black/[0.07] bg-[#fafaf8] px-6 py-3 lg:grid">
              <TableLabel>
                Order
              </TableLabel>

              <TableLabel>
                Type
              </TableLabel>

              <TableLabel>
                Status
              </TableLabel>

              <TableLabel align="right">
                Total
              </TableLabel>

              <span />
            </div>

            {/* ORDER ROWS */}

            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ======================================================
// ORDER ROW
// ======================================================

function OrderRow({
  order,
}: {
  order: ClientOrder;
}) {
  return (
    <Link
      href={`/shop/orders/${order.id}`}
      className="group block border-b border-black/[0.07] last:border-b-0 transition hover:bg-[#fafaf8]"
    >
      <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_120px_140px_130px_44px] lg:items-center">
        {/* ORDER */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
              {order.reference}
            </span>

            <PaymentBadge
              status={order.payment_status}
            />
          </div>

          <h3 className="mt-2 truncate text-[13px] font-semibold tracking-[-0.02em] text-black">
            {order.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] text-black/30">
            <span>
              {formatStatus(order.service)}
            </span>

            <span className="h-1 w-1 rounded-full bg-black/15" />

            <span>
              {formatDate(
                order.placed_at ||
                  order.accepted_at ||
                  order.created_at
              )}
            </span>

            {order.proposal_reference && (
              <>
                <span className="h-1 w-1 rounded-full bg-black/15" />

                <span>
                  {order.proposal_reference}
                </span>
              </>
            )}
          </div>
        </div>

        {/* TYPE */}

        <div>
          <MobileLabel>
            Type
          </MobileLabel>

          <p className="mt-1 text-[9px] font-semibold text-black/55 lg:mt-0">
            {formatStatus(
              order.order_type
            )}
          </p>
        </div>

        {/* STATUS */}

        <div>
          <MobileLabel>
            Status
          </MobileLabel>

          <div className="mt-1 lg:mt-0">
            <OrderStatusBadge
              status={order.status}
            />
          </div>
        </div>

        {/* TOTAL */}

        <div className="lg:text-right">
          <MobileLabel>
            Total
          </MobileLabel>

          <p className="mt-1 text-[11px] font-semibold tracking-[-0.02em] lg:mt-0">
            {formatMoney(
              order.total,
              order.currency
            )}
          </p>
        </div>

        {/* ARROW */}

        <div className="hidden justify-end lg:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] transition group-hover:border-black group-hover:bg-black group-hover:text-white">
            <ArrowRight
              size={11}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ======================================================
// EMPTY STATE
// ======================================================

function EmptyOrders() {
  return (
    <div className="rounded-[20px] border border-dashed border-black/[0.12] bg-[#fafaf8] px-6 py-16 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <Package
          size={17}
          className="text-black/45"
        />
      </span>

      <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.03em]">
        No orders yet
      </h3>

      <p className="mx-auto mt-2 max-w-[420px] text-[10px] leading-5 text-black/38">
        Accepted service proposals and
        completed product checkouts will
        appear here.
      </p>

      <Link
        href="/shop/requests/new"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-black px-5 text-[9px] font-semibold text-white transition hover:bg-black/80"
      >
        Start a project request

        <ArrowRight size={11} />
      </Link>
    </div>
  );
}

// ======================================================
// METRIC
// ======================================================

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#fafaf8] px-5 py-5 sm:px-6">
      <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
        {label}
      </p>

      <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// TABLE LABEL
// ======================================================

function TableLabel({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <span
      className={[
        "text-[7px] font-semibold uppercase tracking-[0.14em] text-black/25",
        align === "right"
          ? "text-right"
          : "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

// ======================================================
// MOBILE LABEL
// ======================================================

function MobileLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[7px] font-semibold uppercase tracking-[0.13em] text-black/25 lg:hidden">
      {children}
    </p>
  );
}

// ======================================================
// PAYMENT BADGE
// ======================================================

function PaymentBadge({
  status,
}: {
  status?: string | null;
}) {
  const value =
    status || "unpaid";

  const paid =
    value === "paid";

  const partial =
    value === "partially_paid";

  return (
    <span
      className={[
        "rounded-full px-2 py-1 text-[6px] font-semibold uppercase tracking-[0.1em]",
        paid
          ? "bg-[#e7eee8] text-[#45604b]"
          : partial
            ? "bg-[#eee9df] text-[#6d6047]"
            : "bg-[#f3ece5] text-[#765a45]",
      ].join(" ")}
    >
      {formatStatus(value)}
    </span>
  );
}

// ======================================================
// ORDER STATUS BADGE
// ======================================================

function OrderStatusBadge({
  status,
}: {
  status?: string | null;
}) {
  const value =
    status || "pending";

  const positive =
    value === "confirmed" ||
    value === "processing" ||
    value === "completed";

  const cancelled =
    value === "cancelled";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.1em]",
        cancelled
          ? "bg-red-50 text-red-600"
          : positive
            ? "bg-[#e7eee8] text-[#45604b]"
            : "bg-[#eee9df] text-[#6d6047]",
      ].join(" ")}
    >
      {formatStatus(value)}
    </span>
  );
}