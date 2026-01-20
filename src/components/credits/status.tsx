"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  RefreshCw,
  ChevronRight,
  Home,
} from "lucide-react";

type StatusType = "ALL" | "PENDING" | "DOING" | "CANCELLED";

type OrderStatus = "DONE" | "PENDING" | "DOING" | "CANCELLED";

type OrderStatusCardProps = {
  sellerName: string;
  status: OrderStatus;
  cardBrand: string;
  cardImageSrc: string;
  orderId: string;
  createdAt: string;
  sentAmount: string;
  successAmount: string;
  totalNGN: string;
};

const TABS: StatusType[] = ["ALL", "PENDING", "DOING", "CANCELLED"];

const MOCK_ORDERS: OrderStatusCardProps[] = [
  {
    sellerName: "X–TEAM–1",
    status: "DONE",
    cardBrand: "Steam",
    cardImageSrc: "/credit/steam.png",
    orderId: "2025112609270263268",
    createdAt: "2025-11-26 02:27:03",
    sentAmount: "30 USD",
    successAmount: "30 USD",
    totalNGN: "₦ 30,780.44",
  },
  {
    sellerName: "X–TEAM–2",
    status: "PENDING",
    cardBrand: "iTunes",
    cardImageSrc: "/credit/itunes.png",
    orderId: "202511260945112233",
    createdAt: "2025-11-26 03:02:11",
    sentAmount: "100 USD",
    successAmount: "—",
    totalNGN: "Waiting…",
  },
  {
    sellerName: "X–TEAM–3",
    status: "DOING",
    cardBrand: "Amazon",
    cardImageSrc: "/credit/amazon.png",
    orderId: "202511260955778899",
    createdAt: "2025-11-26 03:14:52",
    sentAmount: "50 USD",
    successAmount: "—",
    totalNGN: "Calculating…",
  },
  {
    sellerName: "X–TEAM–4",
    status: "CANCELLED",
    cardBrand: "Google Play",
    cardImageSrc: "/credit/google.png",
    orderId: "202511260900000001",
    createdAt: "2025-11-26 01:58:09",
    sentAmount: "25 USD",
    successAmount: "0 USD",
    totalNGN: "₦ 0.00",
  },
];

const STATUS_STYLES: Record<
  OrderStatus,
  { dot: string; text: string; label: string }
> = {
  DONE: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    label: "DONE",
  },
  PENDING: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    label: "PENDING",
  },
  DOING: {
    dot: "bg-sky-400",
    text: "text-sky-300",
    label: "DOING",
  },
  CANCELLED: {
    dot: "bg-rose-500",
    text: "text-rose-300",
    label: "CANCELLED",
  },
};

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState<StatusType>("ALL");
  const [timeFilter] = useState("Last week"); // removed unused setTimeFilter

  const orders = MOCK_ORDERS.filter((order) =>
    activeTab === "ALL" ? true : order.status === activeTab
  );

  return (
    <main className="w-full flex justify-center px-3 py-4 sm:py-6">
      <div className="w-full max-w-3xl space-y-3 sm:space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
          <Home className="h-3.5 w-3.5 text-slate-400" />
          <span className="mx-1 text-slate-500">/</span>
          <span className="text-slate-400">Trades</span>
          <span className="mx-1 text-slate-500">/</span>
          <span className="font-semibold text-slate-100">Status</span>
        </div>

        {/* HEADER TABS */}
        <header className="border-b border-white/10 pb-2">
          <div className="flex items-center gap-4 text-[11px] font-medium">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-1.5 tracking-[0.14em] uppercase transition-colors ${
                    isActive ? "text-sky-400" : "text-slate-400"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-0.5 mx-auto h-[2px] w-6 rounded-full bg-sky-400" />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* FILTER ROW */}
        <section className="flex items-center justify-between gap-3 text-[11px]">
          <button
            type="button"
            className="flex items-center justify-between w-32 rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-slate-100 border border-white/15"
          >
            <span>{timeFilter}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-300" />
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </section>

        {/* ORDER LIST */}
        <section className="space-y-2.5 sm:space-y-3">
          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {orders.map((order, index) => (
                <OrderStatusCard key={index} {...order} />
              ))}
              <p className="pt-2 pb-1 text-center text-[11px] text-slate-500">
                no more data
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

/* ORDER CARD */
function OrderStatusCard(props: OrderStatusCardProps) {
  const {
    sellerName,
    status,
    cardBrand,
    cardImageSrc,
    orderId,
    createdAt,
    sentAmount,
    successAmount,
    totalNGN,
  } = props;

  const style = STATUS_STYLES[status];

  return (
    <article className="rounded-2xl bg-white/98 shadow-[0_14px_40px_rgba(0,0,0,0.45)] border border-slate-200/80 px-3.5 py-3 sm:px-4 sm:py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-slate-200">
            <Image
              src="/avatars/default-seller.png"
              alt={sellerName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-slate-900">{sellerName}</span>
            <div className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              <span className={`text-[11px] font-semibold ${style.text}`}>{style.label}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </div>

      <div className="mt-2.5 flex gap-3">
        <div className="relative h-14 w-20 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
          <Image src={cardImageSrc} alt={cardBrand} fill className="object-cover" />
        </div>
        <div className="flex-1 text-[11px] text-slate-600">
          <p className="text-[14px] font-semibold text-slate-900 leading-tight">{cardBrand}</p>
          <p className="mt-1 text-[10px] text-slate-500">
            Order ID:
            <span className="block text-[10px] text-slate-500">{orderId}</span>
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400">{createdAt}</p>
        </div>
      </div>

      <div className="my-2.5 h-px w-full bg-slate-100" />

      <div className="text-[11px] text-slate-700 space-y-1">
        <Row label="Sent Amount" value={sentAmount} />
        <Row label="Success Amount" value={successAmount} />
        <div className="h-px w-full bg-slate-100 my-1" />
        <Row label="Total" value={totalNGN} accent />
      </div>
    </article>
  );
}

/* ROW COMPONENT */
function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${accent ? "text-sky-500" : "text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

/* EMPTY STATE */
function EmptyState() {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center">
      <p className="text-xs text-slate-500">no more data</p>
    </div>
  );
}
