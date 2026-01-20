"use client";

import { useSearchParams } from "next/navigation";   // ← add this
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

// 💸 Helpers
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

// ... (keep all your types, constants, helpers exactly the same)

export default function OrderDetailsPage() {           // ← no props anymore
  const searchParams = useSearchParams();              // ← hook instead

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
        {/* Breadcrumb – update the last part */}
        <div className="mb-4 flex flex-col gap-2">
          <nav aria-label="Breadcrumb" className="text-[11px] text-neutral-500 sm:text-xs">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <li><Link href="/shop" className="hover:text-neutral-900">Shop</Link></li>
              <li className="text-neutral-400">/</li>
              <li><Link href="/shop/order" className="hover:text-neutral-900">Order</Link></li>
              <li className="text-neutral-400">/</li>
              <li><Link href="/shop/order/order-details" className="hover:text-neutral-900">Order Details</Link></li>
              <li className="text-neutral-400">/</li>
              <li className="text-neutral-900 font-medium">{displayOrderId}</li>
            </ol>
          </nav>

          <Link
            href="/order"   // ← assuming this is correct (maybe /shop/order ?)
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
        </div>
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
                <span className="font-medium text-neutral-900">
                  {ORDER_DATE}
                </span>{" "}
                at{" "}
                <span className="font-medium text-neutral-900">
                  {ORDER_TIME}
                </span>
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

        {/* The rest of your JSX stays 100% identical */}
        {/* ... Overview strip, Page header, Grid layout, Timeline, Delivery details, Summary, Items ... */}

      </div>
    </main>
  );
}
