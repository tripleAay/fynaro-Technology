"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiShoppingBag,
  FiBell,
  FiHome,
  FiMessageSquare,
  FiPackage,
  FiCreditCard,
  FiMapPin,
  FiLogOut,
  FiStar,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { useCart } from "../../contexts/cartContext";
import NotificationPanel from "@/components/dashboard components/notificationPanel";

// Assuming CartItem is defined in your cartContext like this:
type CartItem = {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type HeaderProps = {
  userName?: string;
  /** Set this to true right after a project request is created */
  projectRequestJustCreated?: boolean;
};

export default function Header({
  userName,
  projectRequestJustCreated = false,
}: HeaderProps) {
  const { items } = useCart();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // client name from prop → localStorage fallback
  useEffect(() => {
    if (userName) {
      setName(userName);
      setLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      const stored =
        localStorage.getItem("fullName") ||
        localStorage.getItem("userName") ||
        localStorage.getItem("name");

      if (stored && stored.trim().length > 0) {
        setName(stored);
      }
    }

    setLoading(false);
  }, [userName]);

  // Fixed: Explicit type for item — no any, TypeScript infers correctly from CartItem
  const cartCount = useMemo(() => {
    return (
      items?.reduce((total: number, item: CartItem) => {
        const qty = item.quantity ?? 1;
        return total + qty;
      }, 0) ?? 0
    );
  }, [items]);

  const initials = useMemo(() => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      (parts[0]?.[0] || "").toUpperCase() +
      (parts[1]?.[0] || "").toUpperCase()
    );
  }, [name]);

  const closeAllPanels = () => {
    setProfileOpen(false);
    setNotificationsOpen(false);
    setMessagesOpen(false);
  };

  // Full header skeleton while loading user info
  if (loading) {
    return <HeaderSkeleton />;
  }

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-semibold tracking-[0.22em] uppercase"
          >
            Fynaro
          </Link>

          {/* Icon strip */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop: Home */}
            <Link
              href="/shop"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <FiHome className="text-[17px]" />
            </Link>

            {/* Desktop: Messages – slide-over */}
            <button
              type="button"
              onClick={() => {
                closeAllPanels();
                setMessagesOpen(true);
              }}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <FiMessageSquare className="text-[17px]" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => {
                setProfileOpen(false);
                setMessagesOpen(false);
                setNotificationsOpen((prev) => !prev);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <FiBell className="text-[17px]" />
              {hasUnreadNotifications && !notificationsOpen && (
                <span className="absolute -top-0.5 -right-0.5 h-[10px] w-[10px] rounded-full bg-white" />
              )}
            </button>

            {/* Cart */}
            <Link
              href="/shop/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <FiShoppingBag className="text-[17px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-white text-[9px] font-semibold text-black flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Desktop: Profile trigger – avatar + name */}
            <button
              type="button"
              onClick={() => {
                closeAllPanels();
                setProfileOpen(true);
              }}
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 hover:bg-white/10 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[12px] font-semibold text-black">
                {initials}
              </div>
              {name && (
                <span className="text-xs font-medium max-w-[120px] truncate">
                  {name}
                </span>
              )}
            </button>

            {/* Mobile: Hamburger → profile slide-over */}
            <button
              type="button"
              onClick={() => {
                closeAllPanels();
                setProfileOpen(true);
              }}
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <FiMenu className="text-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* PROFILE SLIDE-OVER */}
      <SlideOver open={profileOpen} onClose={closeAllPanels}>
        <div className="flex h-full flex-col">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-[13px] font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium text-black">
                {name || "User"}
              </span>
            </div>

            <SpinningCloseButton onDone={closeAllPanels} />
          </div>

          {/* Nav */}
          <div className="space-y-2 text-sm text-black/80 flex-1">
            <RowLink href="/shop" icon={<FiHome />} label="Dashboard" />
            <RowLink href="/shop/order" icon={<FiPackage />} label="Orders" />
            <RowLink
              href="/shop/billing"
              icon={<FiCreditCard />}
              label="Payments"
            />
            <RowLink
              href="/addresses"
              icon={<FiMapPin />}
              label="Addresses"
            />
            <RowLink
              href="/shop/reviews"
              icon={<FiStar />}
              label="Reviews"
            />
          </div>

          {/* Logout pinned bottom-left */}
          <button
            type="button"
            onClick={() => {
              window.location.href = "/auth/logout";
            }}
            className="mt-4 self-start flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
          >
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </SlideOver>

      {/* MESSAGES SLIDE-OVER */}
      <SlideOver open={messagesOpen} onClose={closeAllPanels}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-black">Messages</span>
            <SpinningCloseButton onDone={closeAllPanels} />
          </div>
          <p className="text-xs text-black/50">
            Hook your inbox / chat UI here.
          </p>
        </div>
      </SlideOver>

      {/* NOTIFICATION PANEL */}
      <NotificationPanel
        open={notificationsOpen}
        onClose={closeAllPanels}
        userName={name || "Fynaro Client"}
        projectRequestJustCreated={projectRequestJustCreated}
        onUnreadChange={setHasUnreadNotifications}
      />
    </>
  );
}

/* ---------- Header skeleton ---------- */

function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo skeleton */}
        <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />

        {/* Right strip skeletons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop home icon */}
          <div className="hidden sm:flex h-9 w-9 rounded-full bg-white/10 animate-pulse" />
          {/* Desktop messages */}
          <div className="hidden sm:flex h-9 w-9 rounded-full bg-white/10 animate-pulse" />
          {/* Notifications */}
          <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
          {/* Cart */}
          <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
          {/* Desktop profile */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
            <div className="h-3 w-16 rounded-full bg-white/10 animate-pulse" />
          </div>
          {/* Mobile hamburger */}
          <div className="flex sm:hidden h-9 w-9 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </header>
  );
}

/* ---------- Slide-over shell ---------- */

function SlideOver({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-[78%] max-w-sm bg-white border-l border-black/10 shadow-2xl px-5 py-6 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </aside>
    </div>
  );
}

/* ---------- Close button with spin-on-click ---------- */

function SpinningCloseButton({ onDone }: { onDone: () => void }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (spinning) return;
    setSpinning(true);

    setTimeout(() => {
      onDone();
      setSpinning(false);
    }, 220);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-black/90 transition-colors"
    >
      <FiX className={`text-[16px] ${spinning ? "animate-spin" : ""}`} />
    </button>
  );
}

/* ---------- Row link ---------- */

function RowLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-black/5 transition"
    >
      <span className="text-[18px]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}