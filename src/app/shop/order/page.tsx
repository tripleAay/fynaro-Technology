"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  Truck,
  XCircle,
  Search,
} from "lucide-react";

type OrderStatus = "Processing" | "In-Transit" | "Delivered" | "Cancelled" | "Pending";
type PaymentStatus = "Paid" | "Pending" | "Failed";

type OrderItem = {
  id: number;
  name: string;
  specs: string;
  image: string;
  qty: number;
};

type OrderSummary = {
  id: string;
  shortId: string;
  date: string;
  time: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  itemsCount: number;
  itemsPreview: OrderItem[];
  eta?: string;
  stage: "placed" | "processing" | "in-transit" | "delivered" | "cancelled";
};

// Sample orders data
const ORDERS: OrderSummary[] = [
  {
    id: "ORD-8847-229",
    shortId: "#8847-229",
    date: "10 February 2025",
    time: "12:51 PM",
    status: "In-Transit",
    paymentStatus: "Paid",
    total: 125000,
    itemsCount: 3,
    itemsPreview: [
      { id: 1, name: "Fynaro Classic White Tee", specs: "Size L • 100% Cotton", image: "/images/fynaro-white-tee.jpg", qty: 2 },
      { id: 2, name: "Fynaro Urban Cap (Black)", specs: "Matte Black • Adjustable", image: "/images/fynaro-urban-cap-black.jpg", qty: 1 },
    ],
    eta: "Tomorrow, 4–6pm",
    stage: "in-transit",
  },
  {
    id: "ORD-7719-104",
    shortId: "#7719-104",
    date: "02 February 2025",
    time: "4:09 PM",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 89000,
    itemsCount: 2,
    itemsPreview: [
      { id: 3, name: "Fynaro Studio Hoodie", specs: "Size M • Ash Grey", image: "/images/fynaro-hoodie-grey.jpg", qty: 1 },
      { id: 4, name: "Fynaro Socks Pack", specs: "3 Pairs • Mixed", image: "/images/fynaro-socks-pack.jpg", qty: 1 },
    ],
    eta: "Delivered on 4 February",
    stage: "delivered",
  },
  {
    id: "ORD-6623-918",
    shortId: "#6623-918",
    date: "20 January 2025",
    time: "11:27 AM",
    status: "Cancelled",
    paymentStatus: "Failed",
    total: 45000,
    itemsCount: 1,
    itemsPreview: [
      { id: 5, name: "Fynaro AutoTech Tee", specs: "Size XL • Jet Black", image: "/images/fynaro-autotech-tee.jpg", qty: 1 },
    ],
    eta: "—",
    stage: "cancelled",
  },
  {
    id: "ORD-5511-003",
    shortId: "#5511-003",
    date: "10 January 2025",
    time: "9:02 AM",
    status: "Processing",
    paymentStatus: "Pending",
    total: 62000,
    itemsCount: 2,
    itemsPreview: [
      { id: 6, name: "Fynaro PrintHub Tote", specs: "Cream • Heavy Canvas", image: "/images/fynaro-tote-bag.jpg", qty: 1 },
      { id: 7, name: "Fynaro Studio Cap", specs: "Stone • Minimal Logo", image: "/images/fynaro-cap-stone.jpg", qty: 1 },
    ],
    eta: "Awaiting payment",
    stage: "processing",
  },
];

// Status color mapping
const statusColorClasses: Record<OrderStatus, { chip: string; dot: string; text: string; cardGlow: string }> = {
  "In-Transit": { chip: "bg-amber-50 border-amber-200 text-amber-700", dot: "bg-amber-500", text: "text-amber-400", cardGlow: "shadow-[0_0_0_1px_rgba(245,158,11,0.12)]" },
  Processing: { chip: "bg-blue-50 border-blue-200 text-blue-700", dot: "bg-blue-500", text: "text-blue-400", cardGlow: "shadow-[0_0_0_1px_rgba(59,130,246,0.12)]" },
  Delivered: { chip: "bg-emerald-50 border-emerald-200 text-emerald-700", dot: "bg-emerald-500", text: "text-emerald-300", cardGlow: "shadow-[0_0_0_1px_rgba(16,185,129,0.12)]" },
  Cancelled: { chip: "bg-rose-50 border-rose-200 text-rose-700", dot: "bg-rose-500", text: "text-rose-300", cardGlow: "shadow-[0_0_0_1px_rgba(244,63,94,0.12)]" },
  Pending: { chip: "bg-neutral-50 border-neutral-200 text-neutral-700", dot: "bg-neutral-400", text: "text-neutral-300", cardGlow: "shadow-[0_0_0_1px_rgba(107,114,128,0.12)]" },
};

const stagesOrder = ["placed", "processing", "in-transit", "delivered"] as const;
type FilterTab = "All" | "Active" | "Delivered" | "Cancelled";
const FILTER_TABS: FilterTab[] = ["All", "Active", "Delivered", "Cancelled"];

export default function OrderPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [query, setQuery] = useState("");
  const [showOrders, setShowOrders] = useState(true);

  const stats = useMemo(() => {
    const delivered = ORDERS.filter((o) => o.status === "Delivered").length;
    const cancelled = ORDERS.filter((o) => o.status === "Cancelled").length;
    const active = ORDERS.filter((o) => ["Processing", "In-Transit", "Pending"].includes(o.status)).length;
    const total = ORDERS.length;
    const totalValue = ORDERS.reduce((sum, o) => sum + o.total, 0);

    return { delivered, cancelled, active, total, totalValue };
  }, []);

  const filteredOrders = useMemo(() => {
    let result = [...ORDERS];

    if (activeFilter === "Active") {
      result = result.filter((o) => ["Processing", "In-Transit", "Pending"].includes(o.status));
    } else if (activeFilter === "Delivered") {
      result = result.filter((o) => o.status === "Delivered");
    } else if (activeFilter === "Cancelled") {
      result = result.filter((o) => o.status === "Cancelled");
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.shortId.toLowerCase().includes(q) ||
          o.itemsPreview.some((item) => item.name.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeFilter, query]);

  const visibleCount = filteredOrders.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-50">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-8 max-w-6xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50 text-xs font-bold text-neutral-950">
              F
            </div>
            <span className="text-sm font-semibold tracking-tight sm:text-base">Fynaro</span>
          </Link>

          <div className="hidden sm:flex flex-col items-end text-right">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400">
              <Link href="/shop" className="hover:text-neutral-100">Home</Link>
              <span>/</span>
              <span className="hover:text-neutral-100">Account</span>
              <span>/</span>
              <span className="text-neutral-100">Orders</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-500">
              {stats.total} order{stats.total === 1 ? "" : "s"} in your history
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-8 sm:pt-24">
        {/* Filter + search bar */}
        <section className="sticky top-[4.2rem] z-30 mb-4 flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-3 shadow-[0_22px_45px_rgba(0,0,0,0.65)] backdrop-blur-lg sm:top-[4.8rem] sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900/70 p-1 text-xs sm:text-sm">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeFilter === tab
                      ? "bg-neutral-100 text-neutral-950 shadow-sm"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-neutral-500 sm:text-xs">
              {showOrders ? `Showing ${visibleCount} order${visibleCount === 1 ? "" : "s"}` : "Orders list is hidden"}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search orders by ID or item…"
                className="w-full rounded-full border border-neutral-800 bg-neutral-900/80 py-2 pl-9 pr-3 text-xs text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200/80 focus:border-neutral-200/80 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowOrders((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-neutral-100 hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showOrders ? "rotate-180" : "rotate-0"}`} />
              {showOrders ? "Hide all orders" : "Show all orders"}
            </button>
          </div>
        </section>

        {/* Orders list with animation */}
        <AnimatePresence initial={false}>
          {showOrders && (
            <motion.section
              key="orders-list"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-3 overflow-hidden"
            >
              {filteredOrders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/60 p-6 text-center text-sm text-neutral-400">
                  No orders found for this filter/search. Try switching tabs or clearing your search.
                </div>
              ) : (
                filteredOrders.map((order, i) => {
                  const colors = statusColorClasses[order.status];
                  const isCancelled = order.status === "Cancelled";
                  const stageIndex = order.stage === "cancelled" ? -1 : stagesOrder.findIndex((s) => s === order.stage);
                  const progressWidth = stageIndex >= 0 ? `${Math.max(10, ((stageIndex + 1) / stagesOrder.length) * 100)}%` : "0%";

                  return (
                    <motion.article
                      key={order.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.04 }}
                      className={`rounded-2xl border border-neutral-850 bg-gradient-to-br from-neutral-950/95 via-neutral-950/80 to-neutral-900/90 p-3.5 shadow-sm backdrop-blur-md sm:p-4 ${colors.cardGlow}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-semibold text-neutral-100">{order.shortId}</span>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.chip}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-neutral-400">
                            {order.date} • {order.time}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-neutral-50">
                            {order.total.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {order.itemsCount} item{order.itemsCount !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Mini tracking timeline */}
                      <div className="mt-4 border-t border-neutral-850 pt-3">
                        {!isCancelled ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-neutral-400">
                              <span>Order progress</span>
                              <span className={colors.text}>
                                {stageIndex >= 0 ? stageIndex + 1 : "—"} / {stagesOrder.length}
                              </span>
                            </div>

                            <div className="relative h-1.5 w-full rounded-full bg-neutral-800">
                              <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-neutral-400 to-neutral-50 transition-all"
                                style={{ width: progressWidth }}
                              />
                            </div>

                            <div className="flex items-center gap-2 text-xs text-neutral-300">
                              <Truck className="h-3.5 w-3.5" />
                              <span className="capitalize">{order.stage.replace("-", " ")}</span>
                              {order.eta && <span className="text-neutral-400">• {order.eta}</span>}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-rose-300">
                            <XCircle className="h-4 w-4" />
                            <span>
                              This order was cancelled. Contact support with your order ID if you believe this is an error.
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  );
                })
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}