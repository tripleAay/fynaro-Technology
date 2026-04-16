"use client";

import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  id: string;
  tx_ref: string;
  service_title: string;
  service_id: string;
  amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  payment_status: string;
  payment_provider: string;
  payment_method: string | null;
  status: string;
  verification_source: string | null;
  paid_at: string | null;
  created_at: string;
};

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchOrders() {
      try {
        const res = await fetch("/api/admin/orders", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch orders.");
        }

        if (mounted) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return orders;

    return orders.filter((order) => {
      return (
        order.tx_ref?.toLowerCase().includes(q) ||
        order.service_title?.toLowerCase().includes(q) ||
        order.customer_name?.toLowerCase().includes(q) ||
        order.customer_email?.toLowerCase().includes(q) ||
        order.payment_status?.toLowerCase().includes(q) ||
        order.status?.toLowerCase().includes(q)
      );
    });
  }, [orders, query]);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Admin</p>
          <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
        </div>

        <div className="w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search by customer, service, reference..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Service
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Amount
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Verification
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Reference
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">
                        {order.customer_name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.customer_email}
                      </p>
                      {order.customer_phone ? (
                        <p className="mt-1 text-sm text-slate-400">
                          {order.customer_phone}
                        </p>
                      ) : null}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">
                        {order.service_title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.service_id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">
                        {formatMoney(Number(order.amount), order.currency)}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.payment_method || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          order.payment_status === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : order.payment_status === "failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.payment_status}
                      </span>

                      <p className="mt-2 text-sm text-slate-500">
                        {order.status}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {order.verification_source || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[220px] break-all text-sm text-slate-700">
                        {order.tx_ref}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                      {order.paid_at ? (
                        <p className="mt-1 text-xs text-slate-400">
                          Paid: {new Date(order.paid_at).toLocaleString()}
                        </p>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}