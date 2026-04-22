"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/fynaro", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/fynaro", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/fynaro", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/fynaro", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-black text-gray-300">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[200px] w-[200px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 pb-8 pt-14 md:pt-16 lg:pt-18">
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[1.25fr_0.8fr_0.95fr] lg:gap-10 lg:items-start">
          {/* Brand / intro / newsletter */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
              Strategy • Design • Code
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Fynaro <span className="text-[#d6cc6d]">Tech</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base lg:mx-0 lg:max-w-md">
              Premium digital products, brand systems, and modern web experiences
              crafted with intent, precision, and taste.
            </p>

            <div className="mt-7">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/40 lg:text-xs">
                Stay in the loop
              </p>

              <form className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#0b0b0c] px-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#d6cc6d]/50 focus:bg-[#111112]"
                />

                <button
                  type="submit"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#d6cc6d] px-5 text-sm font-medium text-black transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#cbbf5f]"
                >
                  Subscribe
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center lg:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Navigation
            </h3>

            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-sm sm:mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-[1px] w-0 bg-[#d6cc6d] transition-all duration-300 group-hover:w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / social / location */}
          <div className="text-center lg:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Mail size={16} className="text-[#d6cc6d]" />
                </div>

                <a
                  href="mailto:hello@fynaro.com"
                  className="text-sm text-gray-300 transition-colors hover:text-[#d6cc6d]"
                >
                  hello@fynaro.com
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-300">Ibadan, Nigeria</p>
                <p className="mt-1 text-sm text-gray-500">
                  Building with a global standard mindset.
                </p>
              </div>

              <div className="pt-1">
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Socials
                </p>

                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6cc6d]/30 hover:bg-[#d6cc6d]/10 hover:text-[#d6cc6d]"
                    >
                      <Icon size={17} strokeWidth={1.7} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center lg:flex-row lg:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Fynaro Tech. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 lg:justify-end">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#d6cc6d]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[#d6cc6d]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}