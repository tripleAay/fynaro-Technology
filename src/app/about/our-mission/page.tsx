// app/our-mission/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiTarget,
  FiActivity,
  FiLayers,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function OurMissionPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_50%,#020205_100%)] flex flex-col text-white">
      {/* Top header */}
      <div className="w-full">
        <HomeHeader />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-16 pt-10 sm:pt-14 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Hero / Mission Statement */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] px-6 sm:px-10 py-7 sm:py-10 mb-8 sm:mb-10"
          >
            {/* glows */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-44 w-44 rounded-full bg-[#F5B400]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative space-y-4 sm:space-y-5">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-200">
                Our Mission — Fynaro
              </span>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-[2.1rem] font-semibold tracking-tight text-white flex items-center gap-2">
                  <FiTarget className="w-6 h-6 text-[#F5B400]" />
                  Our Mission
                </h1>
                <p className="text-sm sm:text-base text-neutral-200 max-w-3xl">
                  Our mission is to deliver high-quality digital, brand, and
                  automotive solutions that strengthen operations, elevate
                  identity, and drive sustainable business growth.
                </p>
                <p className="text-sm sm:text-base text-neutral-300 max-w-3xl">
                  Through disciplined execution and user-centered design, we
                  create value that lasts.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Pillars of the Mission */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="text-sm sm:text-base font-semibold text-neutral-50">
                How our mission shows up in the work
              </h2>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.16em]">
                Operations · Identity · Growth
              </span>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              {/* Strengthen Operations */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
                    <FiActivity className="w-4 h-4 text-emerald-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Strengthen Operations
                  </h3>
                </div>
                <p className="text-sm text-neutral-200">
                  We design systems that make your day-to-day smoother:
                  workflows, platforms, and tools that actually support how you
                  work — not slow you down.
                </p>
              </div>

              {/* Elevate Identity */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-400/30">
                    <FiLayers className="w-4 h-4 text-pink-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Elevate Identity
                  </h3>
                </div>
                <p className="text-sm text-neutral-200">
                  From web to brand to print, we create visuals and experiences
                  that tell your story clearly and consistently — online and
                  offline.
                </p>
              </div>

              {/* Drive Sustainable Growth */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-400/30">
                    <FiTrendingUp className="w-4 h-4 text-amber-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Drive Sustainable Growth
                  </h3>
                </div>
                <p className="text-sm text-neutral-200">
                  We focus on long-term value — building solutions that scale,
                  adapt, and keep working for you as your business grows.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Execution & User-Centered Design */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.14 }}
            className="mb-10"
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-[1.3fr,1fr]">
              {/* Disciplined Execution */}
              <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 px-5 sm:px-7 py-5 sm:py-6">
                <div className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-[#F5B400]/20 blur-3xl" />
                <div className="relative space-y-3">
                  <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <FiTarget className="w-4 h-4 text-[#F5B400]" />
                    Disciplined execution, not guesswork.
                  </h2>
                  <p className="text-sm sm:text-[15px] text-neutral-200">
                    We approach every project with structure — clear phases,
                    clear responsibilities, and clear outcomes. From the first
                    brief to final delivery, we’re intentional about how we
                    move.
                  </p>
                  <p className="text-sm sm:text-[15px] text-neutral-300">
                    That discipline is what turns ideas into systems and
                    concepts into things your team and customers can actually
                    use.
                  </p>
                </div>
              </div>

              {/* User-Centred Design */}
              <div className="rounded-3xl bg-white/0 border border-white/10 px-5 sm:px-6 py-5 sm:py-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                    <FiUsers className="w-4 h-4 text-emerald-300" />
                    User-centered by default.
                  </h3>
                  <p className="text-sm text-neutral-200">
                    We design for the people who use your products and
                    services — the customer buying, the staff operating, the
                    partner interacting with your brand.
                  </p>
                  <p className="text-sm text-neutral-300">
                    When the experience works for them, it works for your
                    business.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Closing line */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="mb-4 sm:mb-2"
          >
            <div className="rounded-3xl border border-white/10 bg-white/0 px-5 sm:px-7 py-4 sm:py-5 text-center">
              <p className="text-sm sm:text-[15px] text-neutral-100 max-w-3xl mx-auto">
                At Fynaro, our mission isn&apos;t just a statement — it&apos;s
                the filter for every line of code, every brand mark, and every
                solution we ship.
              </p>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
