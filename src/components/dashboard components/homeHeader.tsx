"use client";

import Link from "next/link";
import { FiSearch, FiUser } from "react-icons/fi";

export default function HomeHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050506]/95 backdrop-blur-xl border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* 🔥 BRAND (FIXED — TIGHT + PREMIUM) */}
        <Link
          href="/"
          className="text-lg text-[#d6cc6d] sm:text-xl font-semibold tracking-[0.12em]"
        >
          FYNARO<span className="ml-1 font-light text-white">TECH</span>
        </Link>

        {/* 🔥 NAV (VISIBLE ALWAYS — NO HAMBURGER) */}
        <nav className="flex items-center gap-5 text-sm font-medium overflow-x-auto no-scrollbar">

          <Link href="/about" className="whitespace-nowrap hover:text-neutral-300">
            About
          </Link>

          <Link href="/services" className="whitespace-nowrap hover:text-neutral-300">
            Services
          </Link>

          <Link href="/projects" className="whitespace-nowrap hover:text-neutral-300">
            Projects
          </Link>

          <Link href="/blog" className="whitespace-nowrap hover:text-neutral-300">
            Blog
          </Link>
        </nav>

        {/* ⚡ ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="text-lg hover:text-neutral-300">
            <FiSearch />
          </button>

          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-1 text-neutral-300 hover:text-white text-sm"
          >
            <FiUser /> Login
          </Link>
        </div>
      </div>
    </header>
  );
}