"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/contexts/cartContext";

export default function HomeHeader() {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = useMemo(() => {
    if (!items) return 0;
    return items.reduce((t, i) => t + (i.quantity ?? 1), 0);
  }, [items]);

  const toggleMobile = () => setMobileOpen((p) => !p);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/90 backdrop-blur-xl border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobile}
          className="text-xl sm:text-2xl font-medium tracking-[0.3em] uppercase hover:text-neutral-300 transition"
        >
          Fynaro
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-light">
          <Link href="/" className="hover:text-neutral-300">Home</Link>

          {/* About */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300">
              About <FiChevronDown className="text-xs" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex flex-col w-52 rounded-2xl bg-[#0f0f10] border border-neutral-800 shadow-xl py-2">
              {[
                ["Who We Are", "/about/who-we-are"],
                ["Our Mission", "/about/mission"],
                ["Our Team", "/about/team"],
                ["Why Fynaro", "/about/why-fynaro"],
              ].map(([l, h]) => (
                <Link key={l} href={h} className="px-5 py-2 hover:bg-neutral-800 rounded-md">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300">
              Services <FiChevronDown className="text-xs" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex w-[520px] max-w-[90vw] rounded-2xl bg-[#0f0f10] border border-neutral-800 shadow-2xl p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Web Services", [
                    ["Website Design", "/services/web/website-design"],
                    ["Web Development", "/services/web/development"],
                    ["Maintenance", "/services/web/maintenance"],
                  ]],
                  ["Brand Design", [
                    ["Logo", "/services/brand/logo"],
                    ["Identity Suite", "/services/brand/identity-suite"],
                    ["Rebranding", "/services/brand/rebranding"],
                  ]],
                  ["Printed Products", [
                    ["Business Cards", "/services/print/business-cards"],
                    ["Brochures", "/services/print/brochures"],
                    ["Flyers", "/services/print/flyers"],
                    ["Custom Prints", "/services/print/custom"],
                  ]],
                  ["AutoTech", [
                    ["Diagnostics", "/services/autotech/diagnostics"],
                    ["Wiring & Light", "/services/autotech/wiring-light"],
                    ["Reverse Camera", "/services/autotech/reverse-camera"],
                    ["Quick Fix", "/services/autotech/quick-fix"],
                  ]],
                ].map(([title, links]: any) => (
                  <div key={title}>
                    <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 mb-2">{title}</p>
                    {links.map(([l, h]: any) => (
                      <Link key={l} href={h} className="block px-2 py-1 rounded-md hover:bg-neutral-900">
                        {l}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300">
              Portfolio <FiChevronDown className="text-xs" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex flex-col w-52 rounded-2xl bg-[#0f0f10] border border-neutral-800 shadow-xl py-2">
              {[
                ["Web Projects", "/portfolio/web"],
                ["Branding Work", "/portfolio/branding"],
                ["Print Samples", "/portfolio/print"],
                ["AutoTech Jobs", "/portfolio/autotech"],
              ].map(([l, h]) => (
                <Link key={l} href={h} className="px-5 py-2 hover:bg-neutral-800 rounded-md">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/shop" className="hover:text-neutral-300">Shop</Link>
          <Link href="/contact" className="hover:text-neutral-300">Contact</Link>

          <Link
            href="/get-quote"
            className="ml-2 rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium hover:bg-neutral-200"
          >
            Get a Quote
          </Link>
        </nav>

        {/* ================= Desktop Right Actions ================= */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-lg hover:text-neutral-300"><FiSearch /></button>

          <Link href="/auth/login" className="flex items-center gap-1 text-neutral-300 hover:text-white">
            <FiUser /> Log in
          </Link>

          <Link href="/auth/signup" className="rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium">
            Sign up
          </Link>

          <Link href="/cart" className="relative text-lg">
            <FiShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#F5B400] text-black text-[11px] rounded-full flex items-center justify-center font-semibold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* ================= Mobile Actions ================= */}
        <div className="flex md:hidden items-center gap-3">
          <FiSearch />
          <Link href="/auth/login" className="flex items-center gap-1 text-sm">
            <FiUser /> Log in
          </Link>
          <Link href="/auth/signup" className="rounded-full bg-white text-black px-3 py-1 text-xs">
            Sign up
          </Link>
          <Link href="/cart" className="relative">
            <FiShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] bg-[#F5B400] text-black text-[10px] rounded-full flex items-center justify-center font-semibold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMobile} className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center">
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* ================= Mobile Hamburger ================= */}
      {/* ================= Mobile Hamburger ================= */}
      {mobileOpen && (
        <div
          className="
      md:hidden
      fixed
      inset-0
      top-16
      h-[calc(100dvh-4rem)]
      bg-[#050506]
      z-40
    "
        >
          {/* Inner scroll area */}
          <div className="h-full overflow-y-auto px-5 py-6 pb-24">
            <div className="grid gap-4">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["Shop", "/shop"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <Link
                  key={l}
                  href={h}
                  onClick={closeMobile}
                  className="
              flex items-center justify-between
              rounded-2xl
              border border-neutral-800
              px-5 py-4
              text-base
              hover:bg-neutral-900
              transition-colors
            "
                >
                  {l}
                  <FiChevronDown className="opacity-40" />
                </Link>
              ))}
            </div>

            <Link
              href="/get-quote"
              onClick={closeMobile}
              className="
          mt-10
          flex items-center justify-center
          rounded-full
          bg-white
          text-black
          px-6 py-4
          text-base
          font-medium
          hover:bg-neutral-200
          transition
        "
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
