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
import { useCart } from "@/contexts/cartContext"; // ✅ keep your cart context

export default function HomeHeader() {
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = useMemo(() => {
    if (!items) return 0;
    return items.reduce((total, item) => total + (item.quantity ?? 1), 0);
  }, [items]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0c]/90 backdrop-blur-xl border-b border-neutral-800 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-white hover:text-neutral-300 transition-all duration-300 whitespace-nowrap"
          onClick={closeMobile}
        >
          Fynaro
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-light">
          {/* Home */}
          <Link href="/" className="hover:text-neutral-300 transition-colors">
            Home
          </Link>

          {/* About dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
              <span>About</span>
              <FiChevronDown className="text-xs mt-[1px]" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex flex-col bg-[#0f0f10] border border-neutral-800 rounded-2xl shadow-xl py-3 w-52">
              {[
                { label: "Who We Are", href: "/about/who-we-are" },
                { label: "Our Mission", href: "/about/mission" },
                { label: "Our Team", href: "/about/team" },
                { label: "Why Fynaro", href: "/about/why-fynaro" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2.5 text-white hover:bg-neutral-800 rounded-md transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services mega dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
              <span>Services</span>
              <FiChevronDown className="text-xs mt-[1px]" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex bg-[#0f0f10] border border-neutral-800 rounded-2xl shadow-2xl p-4 w-[520px] max-w-[90vw]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {/* Web Services */}
                <div>
                  <p className="text-xs mb-1.5 text-neutral-400 uppercase tracking-[0.16em]">
                    Web Services
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/services/web/website-design"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Website Design
                    </Link>
                    <Link
                      href="/services/web/development"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Web Development
                    </Link>
                    <Link
                      href="/services/web/maintenance"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Maintenance
                    </Link>
                  </div>
                </div>

                {/* Brand Design */}
                <div>
                  <p className="text-xs mb-1.5 text-neutral-400 uppercase tracking-[0.16em]">
                    Brand Design
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/services/brand/logo"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Logo
                    </Link>
                    <Link
                      href="/services/brand/identity-suite"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Identity Suite
                    </Link>
                    <Link
                      href="/services/brand/rebranding"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Rebranding
                    </Link>
                  </div>
                </div>

                {/* Printed Products */}
                <div>
                  <p className="text-xs mb-1.5 text-neutral-400 uppercase tracking-[0.16em]">
                    Printed Products
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/services/print/business-cards"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Business Cards
                    </Link>
                    <Link
                      href="/services/print/brochures"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Brochures
                    </Link>
                    <Link
                      href="/services/print/flyers"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Flyers
                    </Link>
                    <Link
                      href="/services/print/custom"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Custom Prints
                    </Link>
                  </div>
                </div>

                {/* AutoTech */}
                <div>
                  <p className="text-xs mb-1.5 text-neutral-400 uppercase tracking-[0.16em]">
                    AutoTech
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/services/autotech/diagnostics"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Diagnostics
                    </Link>
                    <Link
                      href="/services/autotech/wiring-light"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Wiring & Light Installation
                    </Link>
                    <Link
                      href="/services/autotech/reverse-camera"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Reverse Camera/Light Setup
                    </Link>
                    <Link
                      href="/services/autotech/quick-fix"
                      className="text-white/90 hover:text-white hover:bg-neutral-900/60 rounded-md px-2 py-1 transition-colors"
                    >
                      Quick Fix Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
              <span>Portfolio</span>
              <FiChevronDown className="text-xs mt-[1px]" />
            </button>
            <div className="absolute left-0 mt-3 hidden group-hover:flex flex-col bg-[#0f0f10] border border-neutral-800 rounded-2xl shadow-xl py-3 w-52">
              {[
                { label: "Web Projects", href: "/portfolio/web" },
                { label: "Branding Work", href: "/portfolio/branding" },
                { label: "Print Samples", href: "/portfolio/print" },
                { label: "AutoTech Jobs", href: "/portfolio/autotech" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2.5 text-white hover:bg-neutral-800 rounded-md transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Optional Shop */}
          <Link href="/shop" className="hover:text-neutral-300 transition-colors">
            Shop
          </Link>

          {/* Contact */}
          <Link href="/contact" className="hover:text-neutral-300 transition-colors">
            Contact
          </Link>

          {/* Get a Quote button */}
          <Link
            href="/get-quote"
            className="ml-2 inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium hover:bg-neutral-200 transition-colors"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Right side: icons + auth + mobile hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop icons + auth */}
          <div className="hidden sm:flex items-center gap-4 text-lg">
            {/* Search icon */}
            <button
              type="button"
              className="cursor-pointer hover:text-neutral-300 transition-colors"
            >
              <FiSearch />
            </button>

            {/* Log in / Sign up with user icon */}
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/auth/login"
                className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
              >
                <FiUser className="text-base" />
                <span className="hidden lg:inline">Log in</span>
              </Link>
              <Link
                href="/auth/signup"
                className="hidden lg:inline-flex items-center rounded-full bg-white text-black px-3 py-1 text-xs font-medium hover:bg-neutral-200 transition-colors"
              >
                Sign up
              </Link>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <FiShoppingBag className="cursor-pointer hover:text-neutral-300 transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F5B400] text-[11px] font-semibold text-black flex items-center justify-center shadow-md"
                  aria-label={`Cart items: ${cartCount}`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile cart icon only (compact) */}
          <div className="flex sm:hidden items-center gap-3 text-lg">
            <Link href="/cart" className="relative">
              <FiShoppingBag className="cursor-pointer hover:text-neutral-300 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F5B400] text-[10px] font-semibold text-black flex items-center justify-center shadow-md">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-700 text-white hover:bg-neutral-900 transition-colors"
            onClick={toggleMobile}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050506] border-t border-neutral-800 px-4 pb-6 pt-3 space-y-4 text-sm">
          {/* Top-level links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={closeMobile}
              className="py-1.5 text-neutral-100 hover:text-white"
            >
              Home
            </Link>

            {/* About section */}
            <div>
              <p className="text-neutral-400 text-[11px] uppercase tracking-[0.16em] mb-1">
                About
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { label: "Who We Are", href: "/about/who-we-are" },
                  { label: "Our Mission", href: "/about/mission" },
                  { label: "Our Team", href: "/about/team" },
                  { label: "Why Fynaro", href: "/about/why-fynaro" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="py-1 text-neutral-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-neutral-400 text-[11px] uppercase tracking-[0.16em] mb-1">
                Services
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-neutral-400 mt-1">Web Services</p>
                <Link
                  href="/services/web/website-design"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Website Design
                </Link>
                <Link
                  href="/services/web/development"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Web Development
                </Link>
                <Link
                  href="/services/web/maintenance"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Maintenance
                </Link>

                <p className="text-[11px] text-neutral-400 mt-2">Brand Design</p>
                <Link
                  href="/services/brand/logo"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Logo
                </Link>
                <Link
                  href="/services/brand/identity-suite"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Identity Suite
                </Link>
                <Link
                  href="/services/brand/rebranding"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Rebranding
                </Link>

                <p className="text-[11px] text-neutral-400 mt-2">Printed Products</p>
                <Link
                  href="/services/print/business-cards"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Business Cards
                </Link>
                <Link
                  href="/services/print/brochures"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Brochures
                </Link>
                <Link
                  href="/services/print/flyers"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Flyers
                </Link>
                <Link
                  href="/services/print/custom"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Custom Prints
                </Link>

                <p className="text-[11px] text-neutral-400 mt-2">AutoTech</p>
                <Link
                  href="/services/autotech/diagnostics"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Diagnostics
                </Link>
                <Link
                  href="/services/autotech/wiring-light"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Wiring & Light Installation
                </Link>
                <Link
                  href="/services/autotech/reverse-camera"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Reverse Camera/Light Setup
                </Link>
                <Link
                  href="/services/autotech/quick-fix"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Quick Fix Services
                </Link>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <p className="text-neutral-400 text-[11px] uppercase tracking-[0.16em] mb-1">
                Portfolio
              </p>
              <div className="flex flex-col gap-1">
                <Link
                  href="/portfolio/web"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Web Projects
                </Link>
                <Link
                  href="/portfolio/branding"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Branding Work
                </Link>
                <Link
                  href="/portfolio/print"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  Print Samples
                </Link>
                <Link
                  href="/portfolio/autotech"
                  onClick={closeMobile}
                  className="py-1 text-neutral-200 hover:text-white"
                >
                  AutoTech Jobs
                </Link>
              </div>
            </div>

            {/* Shop + Contact */}
            <Link
              href="/shop"
              onClick={closeMobile}
              className="py-1.5 text-neutral-200 hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="py-1.5 text-neutral-200 hover:text-white"
            >
              Contact
            </Link>

            {/* Get a Quote button */}
            <Link
              href="/get-quote"
              onClick={closeMobile}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Get a Quote
            </Link>

            {/* Auth row on mobile */}
            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-200">
              <Link
                href="/auth/login"
                onClick={closeMobile}
                className="px-3 py-1 rounded-full border border-neutral-600 hover:border-white hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeMobile}
                className="px-3 py-1 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
              >
                Sign up
              </Link>
            </div>

            {/* Optional quick search */}
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-neutral-300 hover:text-white"
            >
              <FiSearch className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
