"use client";

import Link from "next/link";
import { FiSearch, FiUser } from "react-icons/fi";

export default function HomeHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050506]/95 backdrop-blur-xl border-b border-white/5 text-white">
      
      {/* 🔥 CONTAINER (better alignment + right padding fix) */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* 🔥 BRAND (premium balance — not screaming) */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold tracking-[0.12em]"
        >
          FYNARO
          <span className="ml-1 text-[#d6cc6d] font-medium">TECH</span>
        </Link>

        {/* 🔥 NAV (balanced + meaningful) */}
        <nav className="flex items-center gap-6 text-sm font-medium">

          <Link href="/about" className="hover:text-[#d6cc6d] transition-colors">
            About
          </Link>

          <Link href="/services" className="hover:text-[#d6cc6d] transition-colors">
            Services
          </Link>

          <Link href="/projects" className="hover:text-[#d6cc6d] transition-colors">
            Projects
          </Link>

          {/* 🔥 REPLACEMENT (THIS WAS MISSING) */}
          <Link href="/why-fynaro" className="hover:text-[#d6cc6d] transition-colors">
            Why Fynaro
          </Link>

        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-4">

          <button className="text-lg text-white/70 hover:text-[#d6cc6d] transition">
            <FiSearch />
          </button>

          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-1 text-white/60 hover:text-[#d6cc6d] text-sm transition"
          >
            <FiUser /> Login
          </Link>
        </div>
      </div>
    </header>
  );
}