import Link from "next/link";

import {
  ArrowUpRight,
  Package,
} from "lucide-react";

import {
  getAdminOrders,
} from "@/lib/admin/orders";

// ======================================================
// MONEY
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

// ======================================================
// STATUS LABEL
// ======================================================

function formatStatus(
  value: string
) {
  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

// ======================================================
// PAGE
// ======================================================

export default async function AdminOrdersPage() {
  const orders =
    await getAdminOrders();

  const totalValue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        Number(
          order.total || 0
        ),
      0
    );

  const unpaidOrders =
    orders.filter(
      (order) =>
        order.payment_status ===
        "unpaid"
    ).length;

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* HEADER */}

      <div className="flex flex-col gap-5 border-b border-black/5 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
            Sales
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
            Orders
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
            Manage accepted
            service proposals,
            product purchases,
            payments and
            fulfillment from one
            workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Metric
            label="Orders"
            value={String(
              orders.length
            )}
          />

          <Metric
            label="Order value"
            value={formatMoney(
              totalValue
            )}
          />

          <Metric
            label="Unpaid"
            value={String(
              unpaidOrders
            )}
          />
        </div>
      </div>

      {/* EMPTY */}

      {!orders.length ? (
        <div className="mt-7 flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-black/6 bg-white px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f4ef]">
            <Package
              className="h-5 w-5 text-black/45"
              strokeWidth={
                1.8
              }
            />
          </div>

          <h2 className="mt-4 text-sm font-semibold">
            No orders yet
          </h2>

          <p className="mt-2 max-w-md text-xs leading-5 text-black/40">
            Accepted service
            proposals and completed
            product checkouts will
            automatically create
            orders here.
          </p>

          <Link
            href="/admin/proposals"
            className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#111111] px-4 text-sm font-medium text-white"
          >
            View proposals
          </Link>
        </div>
      ) : (
        /* ORDERS TABLE */

        <div className="mt-7 overflow-hidden rounded-2xl border border-black/6 bg-white">
          {/* DESKTOP HEADER */}

          <div className="hidden grid-cols-[1.15fr_1fr_0.75fr_0.75fr_0.75fr_40px] gap-5 border-b border-black/5 bg-[#fafaf8] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-black/35 lg:grid">
            <span>
              Order
            </span>

            <span>
              Client
            </span>

            <span>
              Total
            </span>

            <span>
              Order status
            </span>

            <span>
              Payment
            </span>

            <span />
          </div>

          {/* ROWS */}

          <div className="divide-y divide-black/5">
            {orders.map(
              (order) => (
                <Link
                  key={
                    order.id
                  }
                  href={`/admin/orders/${order.id}`}
                  className="grid gap-4 px-5 py-5 transition hover:bg-[#fafaf8] lg:grid-cols-[1.15fr_1fr_0.75fr_0.75fr_0.75fr_40px] lg:items-center lg:gap-5"
                >
                  {/* ORDER */}

                  <div>
                    <p className="text-sm font-semibold">
                      {
                        order.title
                      }
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-xs text-black/40">
                        {
                          order.reference
                        }
                      </p>

                      <span className="text-black/15">
                        •
                      </span>

                      <p className="text-xs capitalize text-black/40">
                        {
                          order.order_type
                        }
                      </p>
                    </div>
                  </div>

                  {/* CLIENT */}

                  <div>
                    <p className="text-sm text-black/65">
                      {order.client
                        ?.full_name ||
                        "Unknown client"}
                    </p>

                    <p className="mt-1 truncate text-xs text-black/40">
                      {order.client
                        ?.company_name ||
                        order.client
                          ?.email ||
                        "—"}
                    </p>
                  </div>

                  {/* TOTAL */}

                  <p className="text-sm font-semibold">
                    {formatMoney(
                      order.total,
                      order.currency
                    )}
                  </p>

                  {/* ORDER STATUS */}

                  <div>
                    <StatusBadge
                      value={
                        order.status
                      }
                    />
                  </div>

                  {/* PAYMENT STATUS */}

                  <div>
                    <StatusBadge
                      value={
                        order.payment_status
                      }
                    />
                  </div>

                  {/* OPEN */}

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

// ======================================================
// STATUS
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