"use client";

import { Suspense } from "react"; // ← Add this for Suspense boundary
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/dashboard components/mainheader";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Truck,
  Home,
  Clock,
  Info,
} from "lucide-react";

type OrderItem = {
  id: number;
  name: string;
  variant?: string;
  qty: number;
  price: string; // "₦25,000.00"
};

const orderItems: OrderItem[] = [
  {
    id: 1,
    name: "Fynaro Classic White Tee",
    variant: "Size L • 100% Cotton",
    qty: 2,
    price: "₦25,000.00",
  },
  {
    id: 2,
    name: "Fynaro Urban Cap (Black)",
    variant: "Matte Black • Adjustable",
    qty: 1,
    price: "₦15,000.00",
  },
];

const FALLBACK_ORDER_ID = "ORD-8847-229";
const ORDER_STATUS = "In transit"; // Processing | In transit | Delivered | Cancelled
const ORDER_DATE = "10 February 2025";
const ORDER_TIME = "12:51 PM";
const PAYMENT_STATUS = "Paid";

// timeline steps
const ORDER_STEPS = [
  {
    key: "placed",
    label: "Order placed",
    description: "We’ve received your order.",
    done: true,
  },
  {
    key: "processing",
    label: "Processing",
    description: "Items are being prepared.",
    done: true,
  },
  {
    key: "shipped",
    label: "On the way",
    description: "Your order has left the hub.",
    done: true,
  },
  {
    key: "delivered",
    label: "Delivery",
    description: "Package will arrive soon.",
    done: false,
  },
];

// Helpers
const parsePrice = (price: string): number => {
  const numeric = price.replace(/[^\d.]/g, "");
  return Number.parseFloat(numeric || "0");
};

const formatNGN = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// compute totals from the items
const itemsTotalRaw = orderItems.reduce(
  (sum, item) => sum + parsePrice(item.price) * item.qty,
  0
);
const deliveryFeeRaw = 3500;
const serviceFeeRaw = 1000;
const grandTotalRaw = itemsTotalRaw + deliveryFeeRaw + serviceFeeRaw;

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading order details...</div>}>
      <OrderDetailsContent />
    </Suspense>
  );
}

function OrderDetailsContent() {
  const searchParams = useSearchParams();

  // Safely read values (they are strings | null)
  const orderIdRaw = searchParams?.get("orderId");
  const displayOrderId = orderIdRaw
    ? decodeURIComponent(orderIdRaw)
    : FALLBACK_ORDER_ID;

  const totalItems = orderItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="min-h-screen bg-neutral-50 pt-20 pb-16 text-neutral-900">
      <Header />

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex flex-col gap-2">
          <nav aria-label="Breadcrumb" className="text-[11px] text-neutral-500 sm:text-xs">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <li>
                <Link href="/shop" className="hover:text-neutral-900">
                  Shop
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li>
                <Link href="/shop/order" className="hover:text-neutral-900">
                  Order
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li>
                <Link href="/shop/order/order-details" className="hover:text-neutral-900">
                  Order Details
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li className="text-neutral-900 font-medium">{displayOrderId}</li>
            </ol>
          </nav>

          <Link
            href="/shop/order"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
        </div>

        {/* Overview strip */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-8 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-neutral-900 sm:text-xs">
                  {displayOrderId}
                </span>
                <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white">
                  {ORDER_STATUS}
                </span>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  Payment: {PAYMENT_STATUS}
                </span>
              </div>

              <p className="text-[11px] text-neutral-500 sm:text-xs">
                Placed on{" "}
                <span className="font-medium text-neutral-900">{ORDER_DATE}</span>{" "}
                at{" "}
                <span className="font-medium text-neutral-900">{ORDER_TIME}</span>
              </p>
            </div>

            <div className="text-right text-xs sm:text-sm">
              <p className="text-neutral-500">Order total</p>
              <p className="text-base font-semibold text-neutral-900 sm:text-xl">
                {formatNGN(grandTotalRaw)}
              </p>
              <p className="mt-1 text-[11px] text-neutral-500 sm:text-xs">
                {totalItems} item{totalItems === 1 ? "" : "s"} in this order
              </p>
            </div>
          </div>
        </motion.section>

        {/* Page header */}
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Order details
            </h1>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              Follow the delivery steps, review your items and download your invoice in one place.
            </p>
          </div>
        </div>

        {/* Layout: left timeline + delivery, right summary + items */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
          {/* Left: timeline + delivery info */}
          <section className="space-y-6">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-neutral-700" />
                  <h2 className="text-sm font-semibold text-neutral-900 sm:text-base">
                    Delivery progress
                  </h2>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-neutral-500 sm:text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  Estimated:{" "}
                  <span className="font-medium text-neutral-800">
                    Tomorrow, 4–6pm
                  </span>
                </span>
              </div>

              <ol className="relative space-y-4 border-l border-neutral-200 pl-4 sm:space-y-5">
                {ORDER_STEPS.map((step, index) => {
                  const isLast = index === ORDER_STEPS.length - 1;
                  const Icon =
                    index === 0
                      ? CheckCircle2
                      : index === ORDER_STEPS.length - 1
                        ? Home
                        : index === 2
                          ? Truck
                          : Package;

                  return (
                    <li key={step.key} className="relative flex gap-3 sm:gap-4">
                      <div className="absolute -left-[29px] flex flex-col items-center sm:-left-[31px]">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] sm:h-6 sm:w-6 sm:text-[11px] ${
                            step.done
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 bg-white text-neutral-400"
                          }`}
                        >
                          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                        {!isLast && (
                          <span className="mt-1 h-8 w-px flex-1 bg-neutral-200" />
                        )}
                      </div>

                      <div className="pl-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {step.label}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </motion.div>

            {/* Delivery & contact */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <Home className="h-4 w-4 text-neutral-700" />
                <h2 className="text-sm font-semibold text-neutral-900 sm:text-base">
                  Delivery details
                </h2>
              </div>

              <div className="grid gap-4 text-xs text-neutral-700 sm:grid-cols-2 sm:text-sm">
                <div>
                  <p className="mb-1 font-medium text-neutral-900">Ship to</p>
                  <p className="font-medium">Bam Sun</p>
                  <p className="text-neutral-500">
                    Lekki Phase 1, Lagos, Nigeria
                  </p>
                  <p className="mt-1 text-neutral-500">+234 800 000 0000</p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-neutral-900">
                    Delivery method
                  </p>
                  <p>Standard door delivery</p>
                  <p className="mt-1 text-neutral-500">
                    Tracking ID:{" "}
                    <span className="font-mono text-[11px]">TRK-9921834</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-neutral-500 sm:text-xs">
                <Info className="mt-[2px] h-3.5 w-3.5" />
                <p>
                  If your order is delayed or delivered to the wrong address,
                  contact support with your Order ID and Tracking ID.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Right: order summary + items */}
          <section className="space-y-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="mb-4 text-sm font-semibold text-neutral-900 sm:text-base">
                Order summary
              </h2>

              <div className="space-y-2 text-xs text-neutral-700 sm:text-sm">
                <div className="flex justify-between">
                  <span>Items total</span>
                  <span>{formatNGN(itemsTotalRaw)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatNGN(deliveryFeeRaw)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>{formatNGN(serviceFeeRaw)}</span>
                </div>
                <div className="mt-2 border-t border-neutral-200 pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{formatNGN(grandTotalRaw)}</span>
                  </div>
                </div>
              </div>

              <button className="mt-5 w-full rounded-full border border-neutral-900 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white sm:text-sm">
                Download invoice
              </button>
            </motion.div>

            {/* Items */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="mb-4 text-sm font-semibold text-neutral-900 sm:text-base">
                Items in this order
              </h2>

              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-xs sm:gap-4 sm:text-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-[11px] font-medium text-neutral-500 sm:h-14 sm:w-14">
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-neutral-900">
                        {item.name}
                      </p>
                      {item.variant && (
                        <p className="mt-0.5 text-[11px] text-neutral-500 sm:text-xs">
                          {item.variant}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] text-neutral-500 sm:text-xs">
                        Qty:{" "}
                        <span className="font-medium text-neutral-900">
                          {item.qty}
                        </span>
                      </p>
                    </div>

                    <div className="text-right text-xs font-medium text-neutral-900 sm:text-sm">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}