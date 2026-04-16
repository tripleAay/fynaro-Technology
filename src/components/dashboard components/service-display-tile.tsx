"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers3,
  WalletCards,
} from "lucide-react";
import PayNowButton from "@/components//dashboard components/PayNowButton";

export type ServiceDisplayItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  pricing: string | number;
  delivery: string;
  status: "Active" | "Draft" | "Paused";
  description?: string;
  features?: string[];
  link?: string;
};

type ServiceDisplayTileProps = {
  service?: ServiceDisplayItem | null;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  showDetailsButton?: boolean;
};

function formatPrice(price: string | number) {
  if (typeof price === "number") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  const raw = String(price).trim();
  const numeric = Number(raw.replace(/[^0-9.]/g, ""));

  if (!Number.isNaN(numeric) && numeric > 0) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(numeric);
  }

  return raw;
}

function numericAmount(price: string | number) {
  if (typeof price === "number") return price;

  const numeric = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function statusClasses(status?: ServiceDisplayItem["status"]) {
  switch (status) {
    case "Active":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    case "Paused":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200";
    case "Draft":
    default:
      return "border-white/10 bg-white/[0.05] text-white/70";
  }
}

export default function ServiceDisplayTile({
  service,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  showDetailsButton = true,
}: ServiceDisplayTileProps) {
  if (!service) {
    return (
      <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.22)]">
        <div className="animate-pulse space-y-4">
          <div className="h-56 rounded-[24px] bg-white/5" />
          <div className="h-5 w-1/2 rounded bg-white/5" />
          <div className="h-4 w-2/3 rounded bg-white/5" />
          <div className="h-4 w-1/3 rounded bg-white/5" />
          <div className="h-12 rounded-full bg-white/5" />
        </div>
      </article>
    );
  }

  const amount = numericAmount(service.pricing);
  const displayPrice = formatPrice(service.pricing);

  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-[0_18px_70px_rgba(0,0,0,0.22)] transition duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,204,109,0.10),transparent_35%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="relative h-64 overflow-hidden sm:h-72">
          <Image
            src={service.image || "/images/placeholder-service.jpg"}
            alt={service.title || "Service image"}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              {service.category || "Service"}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-md ${statusClasses(
                service.status
              )}`}
            >
              {service.status || "Draft"}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              Starting at
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#eadb97] sm:text-3xl">
              {displayPrice}
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {service.title || "Untitled Service"}
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/65">
              {service.description ||
                "A premium Fynaro service designed for serious brands that want refined execution and clear delivery."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35">
                <Clock3 className="h-4 w-4" />
                Delivery
              </p>
              <p className="mt-2 text-sm font-medium text-white/82">
                {service.delivery || "Timeline on request"}
              </p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35">
                <WalletCards className="h-4 w-4" />
                Pricing
              </p>
              <p className="mt-2 text-sm font-medium text-white/82">
                {displayPrice}
              </p>
            </div>
          </div>

          {service.features && service.features.length > 0 ? (
            <div>
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35">
                <Layers3 className="h-4 w-4" />
                What’s Included
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {service.features.map((feature, index) => (
                  <span
                    key={`${feature}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/78"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#eadb97]" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <div className="flex-1">
              <PayNowButton
                serviceId={service.id}
                serviceTitle={service.title}
                amount={amount}
                customerName={customerName}
                customerEmail={customerEmail}
                customerPhone={customerPhone}
                redirectUrl="/shop/success"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d6cc6d] px-6 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {showDetailsButton ? (
              <Link
                href={service.link || `/shop/services/${service.id}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}