"use client";

import Image from "next/image";
import { ChevronDown, TrendingUp } from "lucide-react";

type GiftCardOfferProps = {
  sellerName?: string;
  faceValue?: number | string;
  waitTimeMinutes?: number | string;
  isPhysicalSelected?: boolean;
  isFastSelected?: boolean;
  requisite?: string;
  priceNGN?: number | string;
  changeValue?: number | string;
  rateText?: string;
};

export default function GiftCardOfferCard({
  sellerName = "X–TEAM–2",
  faceValue = 500,
  waitTimeMinutes = 6,
  isPhysicalSelected = true,
  isFastSelected = false,
  requisite = "1. multiple of 50...",
  priceNGN = "1169.97",
  changeValue = "5.82",
  rateText = "1 USD = 1169.97 NGN",
}: GiftCardOfferProps) {
  return (
    <div
      className="
        w-full  min-h-screen
        px-3 pt-4                  /* mobile padding */
        md:px-0                   /* 🔥 remove padding on desktop */
      "
    >
      {/* CARD */}
      <div className="w-full">
        <div
          className="
            mx-auto 
            max-w-md              /* mobile: exact original look */
            md:max-w-none         /* desktop: full width */
            md:w-full
            md:rounded-none       /* optional: full-width panel look */
            rounded-2xl bg-white 
            shadow-[0_8px_30px_rgba(15,23,42,0.09)] 
            border border-slate-100 
            px-4 py-3.5 
            sm:px-5 sm:py-4
            md:px-8 lg:px-10      /* nicer inner padding on desktop */
          "
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src="/credit/sunflower-avatar.png"
                  alt={sellerName}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[13px] sm:text-sm font-semibold text-slate-900">
                {sellerName}
              </p>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:bg-slate-100/70 transition"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Face value & wait time */}
          <div className="mt-3 space-y-1.5 text-[11px] sm:text-xs text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Face Value:</span>{" "}
              {faceValue}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Wait time:</span>{" "}
              {waitTimeMinutes} min
            </p>
          </div>

          {/* Card type pills */}
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
            <button
              type="button"
              className={`rounded-md px-3 py-1 border ${
                isPhysicalSelected
                  ? "bg-sky-50 border-sky-300 text-sky-600"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              Physical Card
            </button>
            <button
              type="button"
              className={`rounded-md px-3 py-1 border ${
                isFastSelected
                  ? "bg-sky-50 border-sky-300 text-sky-600"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              Fast Card
            </button>
          </div>

          {/* Requisite */}
          <p className="mt-2 text-[11px] sm:text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Requisite:</span>{" "}
            {requisite}
          </p>

          {/* Price + SELL */}
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] sm:text-lg font-semibold text-[#f59e0b]">
                  ₦{priceNGN}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7e6] text-[#f59e0b] border border-[#fcd68a] px-1.5 py-[1px] text-[10px]">
                  <TrendingUp className="h-3 w-3" />
                  {changeValue}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">{rateText}</p>
            </div>

            <button
              type="button"
              className="
                inline-flex items-center justify-center 
                rounded-full bg-[#02a8ff] 
                px-4 py-1.5 
                md:px-6 md:py-2 
                text-[11px] sm:text-xs font-semibold text-white 
                shadow-[0_8px_18px_rgba(0,160,255,0.45)] 
                hover:bg-[#0093e0] 
                transition-colors whitespace-nowrap
              "
            >
              SELL NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
