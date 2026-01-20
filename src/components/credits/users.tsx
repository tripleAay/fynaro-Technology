// src/components/account/AccountSecurityPanel.tsx
"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Pencil,
  Lock,
  Shield,
  Bell,
  LogOut,
  ChevronRight,
  Home,
} from "lucide-react";

type Props = {
  inviteCode?: string;
  email?: string;
};

export default function AccountSecurityPanel({
  inviteCode = "Xasss169600",
  email = "adeshina93@yahoo.com",
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent fail – you can toast here later
    }
  };

  return (
    <div className="w-full flex justify-center px-3 py-4 sm:px-4">
      <div
        className="
          w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          rounded-3xl
          
          
          
          px-4 pt-4 pb-5
        "
      >
        {/* 🔹 BREADCRUMB */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
          <Home className="h-3.5 w-3.5 text-white" />

          <span className="mx-1 text-slate-400">/</span>

          <span className="text-white">Account</span>

          <span className="mx-1 text-white">/</span>

          <span className="font-semibold text-white">Security</span>
        </div>

        {/* Invitation card – gold themed */}
        <div className="mb-4 rounded-3xl bg-white px-4 py-3.5 border border-[#e4dac4] shadow-[0_10px_28px_rgba(200,169,106,0.18)]">
          <p className="text-[12px] font-semibold text-slate-900">
            My invitation code
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-[22px] font-semibold text-black tracking-wide">
              {inviteCode}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="
                inline-flex items-center gap-1 rounded-full 
                bg-white/90 px-2.5 py-1 text-[10px] font-semibold 
                text-[#a38242] shadow-sm hover:bg-white
                border border-[#e7dec9]
                transition-colors
              "
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-slate-900">Email</p>
              <p className="text-[11px] text-slate-700">{email}</p>
            </div>

            <button
              type="button"
              className="
                inline-flex items-center gap-1 rounded-full 
                bg-white/90 px-2 py-1 text-[10px] text-slate-800 
                shadow-sm hover:bg-white transition-colors
                border border-[#e4dac4]
              "
            >
              <Pencil className="h-3.5 w-3.5 text-[#c8a96a]" />
              Edit
            </button>
          </div>
        </div>

        {/* Tiles */}
        <div className="space-y-3 text-slate-900">
          <Tile
            icon={
              <Lock
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            title="CHANGE PASSWORD"
          />

          <Tile
            icon={
              <Shield
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            title="GOOGLE AUTHENTICATOR"
            subtitle="Link"
          />

          <Tile
            icon={
              <Bell
                className="h-5 w-5 text-[#c8a96a]"
                strokeWidth={1.8}
              />
            }
            title="EMAIL NOTIFICATION SETTINGS"
          />

          {/* Logout tile – still red for destructive action */}
          <LogoutTile
            icon={
              <LogOut
                className="h-5 w-5 text-red-500"
                strokeWidth={1.8}
              />
            }
            title="LOG OUT"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- TILES -------------------------------- */

function Tile({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      className="
        w-full flex items-center justify-between
        rounded-2xl bg-white
        px-4 py-3.5
        shadow-[0_10px_25px_rgba(200,169,106,0.12)]
        border border-[#e4dac4]
        hover:-translate-y-[1px] 
        hover:shadow-[0_16px_35px_rgba(200,169,106,0.28)]
        transition-transform transition-shadow
      "
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3ec]">
          {icon}
        </span>

        <div className="flex flex-col items-start">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.08em] text-slate-900">
            {title}
          </span>

          {subtitle && (
            <span className="text-[11px] text-slate-500 mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-[#c8a96a]" />
    </button>
  );
}

function LogoutTile({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      className="
        w-full flex items-center justify-between
        rounded-2xl bg-white
        px-4 py-3.5
        shadow-[0_10px_25px_rgba(248,113,113,0.16)]
        border border-red-200
        hover:-translate-y-[1px] 
        hover:shadow-[0_16px_35px_rgba(248,113,113,0.28)]
        transition-transform transition-shadow
      "
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
          {icon}
        </span>

        <span className="text-xs sm:text-sm font-semibold tracking-[0.08em] text-red-600">
          {title}
        </span>
      </div>

      <ChevronRight className="h-4 w-4 text-red-300" />
    </button>
  );
}
