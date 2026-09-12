"use client";

import Link from "next/link";

import {
  Bell,
  CircleHelp,
  Search,
  ShoppingBag,
} from "lucide-react";

type DashboardProfile = {
  id?: string;

  external_auth_id?: string;

  email: string;

  full_name?: string | null;

  role?: string | null;

  avatar_url?: string | null;
};

type DashboardTopbarProps = {
  profile: DashboardProfile;
};

export default function DashboardTopbar({
  profile,
}: DashboardTopbarProps) {
  // ============================================================
  // PROFILE DISPLAY
  // ============================================================

  const displayName =
    profile.full_name?.trim() ||
    profile.email?.split("@")[0] ||
    "Fynaro Client";

  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center border-b border-black/[0.08] bg-[#f5f5f2]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* =======================================================
          MOBILE SIDEBAR SPACING
      ======================================================= */}

      <div className="w-12 lg:hidden" />

      {/* =======================================================
          SEARCH
      ======================================================= */}

      <div className="hidden max-w-[360px] flex-1 md:block">
        <div className="flex h-10 items-center gap-3 rounded-xl border border-black/[0.08] bg-white/60 px-3">
          <Search
            size={16}
            strokeWidth={1.7}
            className="text-black/35"
          />

          <input
            type="search"
            placeholder="Search Fynaro..."
            aria-label="Search Fynaro"
            className="w-full bg-transparent text-[13px] text-black outline-none placeholder:text-black/30"
          />
        </div>
      </div>

      {/* =======================================================
          RIGHT ACTIONS
      ======================================================= */}

      <div className="ml-auto flex items-center gap-1">
        {/* HELP */}

        <Link
          href="/contact"
          className="hidden h-10 items-center gap-2 rounded-xl px-3 text-[12px] font-medium text-black/50 transition hover:bg-black/[0.04] hover:text-black sm:flex"
        >
          <CircleHelp
            size={16}
            strokeWidth={1.7}
          />

          Help
        </Link>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black"
        >
          <Bell
            size={17}
            strokeWidth={1.7}
          />

          <span className="absolute right-[9px] top-[8px] h-[5px] w-[5px] rounded-full bg-black" />
        </button>

        {/* CART */}

        <Link
          href="/shop/cart"
          aria-label="Shopping cart"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black"
        >
          <ShoppingBag
            size={17}
            strokeWidth={1.7}
          />
        </Link>

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <Link
          href="/shop/account"
          className="group ml-2 flex items-center gap-3"
        >
          {/* User details */}

          <div className="hidden text-right sm:block">
            <p className="max-w-[150px] truncate text-[11px] font-semibold text-black">
              {displayName}
            </p>

            <p className="mt-[1px] max-w-[150px] truncate text-[9px] capitalize text-black/35">
              {profile.role || "client"}
            </p>
          </div>

          {/* Avatar */}

          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-black/[0.08]"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111] text-[10px] font-semibold uppercase tracking-[0.04em] text-white transition group-hover:bg-black/75">
              {initials}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

// ============================================================
// INITIALS HELPER
// ============================================================

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "FC";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}