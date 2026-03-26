"use client";

import Link from "next/link";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050506]/95 backdrop-blur-xl border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        
        {/* 🔥 LOGO - Small & fits perfectly on both desktop and mobile */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/fynaro-tech logo.png"           
            alt="Fynaro Tech Logo"
            width={200}
            height={80}
            className="h-9 w-auto"    // Makes it small, responsive and well-fitted
            priority
          />
        </Link>

        {/* 🔥 DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-[#d6cc6d] transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-[#d6cc6d] transition-colors">
            Services
          </Link>
          <Link href="/projects" className="hover:text-[#d6cc6d] transition-colors">
            Projects
          </Link>
          <Link href="/why-fynaro" className="hover:text-[#d6cc6d] transition-colors">
            Why Fynaro
          </Link>
        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-6">
          
          {/* Login Button */}
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-white/70 hover:text-[#d6cc6d] text-sm font-medium transition"
          >
            <FiUser className="text-xl" /> 
            Login
          </Link>

          {/* Hamburger Button - Mobile Only */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-3xl text-white/70 hover:text-[#d6cc6d] transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#050506]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
            
            <Link
              href="/about"
              onClick={closeMenu}
              className="hover:text-[#d6cc6d] transition-colors"
            >
              About
            </Link>

            <Link
              href="/services"
              onClick={closeMenu}
              className="hover:text-[#d6cc6d] transition-colors"
            >
              Services
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className="hover:text-[#d6cc6d] transition-colors"
            >
              Projects
            </Link>

            <Link
              href="/why-fynaro"
              onClick={closeMenu}
              className="hover:text-[#d6cc6d] transition-colors"
            >
              Why Fynaro
            </Link>

            <Link
              href="/auth/login"
              onClick={closeMenu}
              className="flex items-center gap-3 text-white/70 hover:text-[#d6cc6d] pt-6 border-t border-white/10 text-lg"
            >
              <FiUser className="text-2xl" /> Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}