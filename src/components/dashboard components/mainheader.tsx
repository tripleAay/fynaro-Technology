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

type CartItem = {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type HeaderProps = {
  userName?: string;
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

  const cartCount = useMemo(() => {
    return (
      items?.reduce((total: number, item: CartItem) => {
        return total + (item.quantity ?? 1);
      }, 0) ?? 0
    );
  }, [items]);

  const initials = useMemo(() => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }, [name]);

  const closeAllPanels = () => {
    setProfileOpen(false);
    setNotificationsOpen(false);
    setMessagesOpen(false);
  };

  if (loading) return <HeaderSkeleton />;

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* 🔥 BRAND */}
           <Link
          href="/"
          className="text-lg sm:text-xl font-semibold tracking-[0.12em]"
        >
          FYNARO
          <span className="ml-1 text-[#d6cc6d] font-medium">TECH</span>
        </Link>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Home */}
            <Link
              href="/shop"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#d6cc6d]/10 hover:border-[#d6cc6d]/40 transition"
            >
              <FiHome className="text-[17px]" />
            </Link>

            {/* Messages */}
            <button
              onClick={() => {
                closeAllPanels();
                setMessagesOpen(true);
              }}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#d6cc6d]/10 hover:border-[#d6cc6d]/40 transition"
            >
              <FiMessageSquare className="text-[17px]" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => {
                setProfileOpen(false);
                setMessagesOpen(false);
                setNotificationsOpen((prev) => !prev);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#d6cc6d]/10 transition"
            >
              <FiBell className="text-[17px]" />
              {hasUnreadNotifications && !notificationsOpen && (
                <span className="absolute -top-1 -right-1 h-[10px] w-[10px] rounded-full bg-[#d6cc6d] shadow-[0_0_6px_#d6cc6d]" />
              )}
            </button>

            {/* Cart */}
            <Link
              href="/shop/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#d6cc6d]/10 transition"
            >
              <FiShoppingBag className="text-[17px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#d6cc6d] text-[9px] font-semibold text-black flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <button
              onClick={() => {
                closeAllPanels();
                setProfileOpen(true);
              }}
              className="hidden sm:flex items-center gap-2 rounded-full border border-[#d6cc6d]/30 bg-[#d6cc6d]/10 px-2 py-1 hover:bg-[#d6cc6d]/20 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d6cc6d] text-[12px] font-semibold text-black">
                {initials}
              </div>
              <span className="text-xs font-medium max-w-[120px] truncate">
                {name}
              </span>
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => {
                closeAllPanels();
                setProfileOpen(true);
              }}
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#d6cc6d]/10 transition"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* PROFILE PANEL */}
      <SlideOver open={profileOpen} onClose={closeAllPanels}>
        <div className="flex h-full flex-col">

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6cc6d] text-black font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>

            <SpinningCloseButton onDone={closeAllPanels} />
          </div>

          <div className="space-y-2 flex-1">
            <RowLink href="/shop" icon={<FiHome />} label="Dashboard" />
            <RowLink href="/shop/order" icon={<FiPackage />} label="Orders" />
            <RowLink href="/shop/billing" icon={<FiCreditCard />} label="Payments" />
            <RowLink href="/addresses" icon={<FiMapPin />} label="Addresses" />
            <RowLink href="/shop/reviews" icon={<FiStar />} label="Reviews" />
          </div>

          <button
            onClick={() => (window.location.href = "/auth/logout")}
            className="mt-4 flex items-center gap-2 text-sm text-red-500 hover:text-[#d6cc6d] transition"
          >
            <FiLogOut />
            Log out
          </button>
        </div>
      </SlideOver>

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

/* ---------- SMALL COMPONENTS ---------- */

function SlideOver({ open, onClose, children }: any) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <button onClick={onClose} className="absolute inset-0 bg-black/40" />
      <aside className={`absolute right-0 top-0 h-full w-[78%] max-w-sm bg-white px-5 py-6 transition ${open ? "translate-x-0" : "translate-x-full"}`}>
        {children}
      </aside>
    </div>
  );
}

function SpinningCloseButton({ onDone }: any) {
  const [spin, setSpin] = useState(false);

  return (
    <button
      onClick={() => {
        setSpin(true);
        setTimeout(onDone, 200);
      }}
      className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white"
    >
      <FiX className={spin ? "animate-spin" : ""} />
    </button>
  );
}

function RowLink({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#d6cc6d]/10 transition"
    >
      {icon}
      {label}
    </Link>
  );
}

function HeaderSkeleton() {
  return (
    <div className="h-16 w-full bg-black border-b border-white/10" />
  );
}