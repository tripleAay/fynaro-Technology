"use client";

import { useState } from "react";
import {
  ChevronRight,
  Banknote,
  WalletCards,
  ReceiptText,
  Clock3,
  Home,
} from "lucide-react";

export default function NairaWalletPanel() {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="w-full flex justify-center px-3 py-4 sm:px-4">
      <div
        className="
          w-full
          max-w-sm
          sm:max-w-md
          md:max-w-lg
          lg:max-w-xl
          xl:max-w-2xl
           rounded-3xl
          
          
          px-4 pt-4 pb-5
        "
      >
        {/* 🔹 Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
          <Home className="h-3.5 w-3.5 text-[#c8a96a]" />
          <span className="mx-1 text-slate-400">/</span>
          <span className="text-white">Wallet</span>
          <span className="mx-1 text-white">/</span>
          <span className="font-semibold text-white">Naira</span>
        </div>

        {/* Title row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-4 w-6 items-center rounded-sm bg-[#c8a96a]" />
          <span className="text-sm font-semibold text-white">
            Naira wallet
          </span>
        </div>

        {/* Gold balance card */}
        <div className="relative rounded-3xl overflow-hidden bg-white px-5 py-4 mb-4 shadow-[0_20px_40px_rgba(200,169,106,0.55)]">
          {/* soft glows */}
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-[-30px] h-28 w-28 rounded-full bg-white blur-3xl" />

          <div className="relative z-10">
            <p className="text-[13px] font-semibold text-black">Naira</p>
            <p className="mt-3 text-[12px] text-black">Balance:</p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-[18px] tracking-[0.18em] text-black font-semibold">
                {hidden ? "**********" : "₦ 307,800.44"}
              </span>

              <button
                type="button"
                onClick={() => setHidden((v) => !v)}
                className="text-[11px] text-black underline-offset-2 hover:underline"
              >
                {hidden ? "Show" : "Hide"}
              </button>
            </div>

            <p className="mt-1 text-[10px] text-black">tap Show to view</p>
          </div>
        </div>

        {/* Action tiles */}
        <div className="space-y-3">
          <TileRow
            icon={
              <WalletCards
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            label="BANK ACCOUNT"
          />

          <TileRow
            icon={
              <Banknote
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            label="WITHDRAW"
          />

          <TileRow
            icon={
              <ReceiptText
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            label="WITHDRAWAL HISTORY"
          />

          <TileRow
            icon={
              <Clock3
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            label="TRANSACTION HISTORY"
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Small tile component -------------------------- */
function TileRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="
        w-full flex items-center justify-between
        rounded-2xl bg-white
        px-4 py-3
        shadow-[0_10px_25px_rgba(200,169,106,0.12)]
        border border-[#e4dac4]
        transition-all
        hover:-translate-y-[1px]
        hover:shadow-[0_16px_35px_rgba(200,169,106,0.28)]
      "
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3ec]">
          {icon}
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-[0.08em] text-slate-800">
          {label}
        </span>
      </div>

      <ChevronRight className="h-4 w-4 text-[#c8a96a]" />
    </button>
  );
}
