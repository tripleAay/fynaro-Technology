// app/who-we-are/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiCpu,
  FiPenTool,
  FiGift,
  FiPrinter,
  FiTool,
  FiTarget,
  FiActivity,
} from "react-icons/fi";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_50%,#020205_100%)] flex flex-col text-white">
      {/* Top header */}
      <div className="w-full">
        <HomeHeader />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-16 pt-10 sm:pt-14 flex justify-center">
        <div className="w-full max-w-5xl">
          {/* Hero / Intro */}
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
                Who We Are — Fynaro
              </span>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-semibold tracking-tight text-white">
                  A modern tech, design & auto innovation studio with intention.
                </h1>
                <p className="text-sm sm:text-base text-neutral-200 max-w-3xl">
                  Fynaro is a modern tech, design, and automotive innovation
                  studio built for people, businesses, and ideas that want to
                  grow with intention. We combine technology, creativity, and
                  real-world experience to build solutions that are functional,
                  beautiful, and future-ready.
                </p>
                <p className="text-sm sm:text-base text-neutral-300 max-w-3xl">
                  We&apos;re not just a tech agency — we&apos;re a
                  multidisciplinary powerhouse connecting digital, brand, and
                  autotech into one seamless ecosystem.
                </p>
              </div>

            </div>
          </motion.section>

          {/* Philosophy / Story */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="grid gap-5 sm:gap-6 md:grid-cols-[1.4fr,1fr] mb-8 sm:mb-10"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 px-5 sm:px-7 py-5 sm:py-6">
              <div className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-[#F5B400]/20 blur-3xl" />
              <div className="relative space-y-3">
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  At Fynaro, creativity meets discipline.
                </h2>
                <p className="text-sm sm:text-[15px] text-neutral-200">
                  Every project starts with understanding your story, your
                  goals, and the people you&apos;re trying to reach. From there,
                  we design solutions that move with clarity and purpose.
                </p>
                <p className="text-sm sm:text-[15px] text-neutral-300">
                  We care about how things work, how they look, and how they
                  feel — and we build with the future in mind, not just the
                  moment.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white/0 border border-white/10 px-5 sm:px-6 py-5 sm:py-6">
              <div className="relative space-y-3">
                <h3 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  <FiTarget className="w-4 h-4 text-[#F5B400]" />
                  Built for intentional growth.
                </h3>
                <p className="text-sm text-neutral-300">
                  Whether it&apos;s a brand starting out, a business evolving,
                  or an idea looking for structure, Fynaro is where strategy,
                  design, and technology move as one.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Focus */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="text-sm sm:text-base font-semibold text-neutral-50">
                Our Focus
              </h2>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.16em]">
                Tech · Brand · Autotech
              </span>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {/* Web Development */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
                    <FiCpu className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Web Development
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Digital foundations that grow with you.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-200">
                  Clean, modern, fast, and scalable websites built to help your
                  business stand strong in the digital space.
                </p>
              </div>

              {/* Brand Design */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-400/30">
                    <FiPenTool className="w-4 h-4 text-pink-200" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Brand Design
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      How people see, feel, and trust you.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-200">
                  Identity systems and visuals that elevate how people see,
                  trust, and experience your business.
                </p>
              </div>

              {/* Giftcard Trade Solutions */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-400/30">
                    <FiGift className="w-4 h-4 text-amber-200" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Giftcard Trade Solutions
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Built for speed, safety, and ease.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-200">
                  Secure, fast, and user-focused digital giftcard services that
                  keep your value moving without friction.
                </p>
              </div>

              {/* Print & Brand Materials */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30">
                    <FiPrinter className="w-4 h-4 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Print & Brand Materials
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Leave something people can hold onto.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-200">
                  Premium business cards and brand collateral designed to leave
                  a lasting impression in the real world.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Auto Tech focus */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="mb-8 sm:mb-10"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 px-5 sm:px-7 py-5 sm:py-6">
              <div className="pointer-events-none absolute -top-20 -left-8 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />
              <div className="relative flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 border border-white/15">
                      <FiTool className="w-4 h-4 text-sky-200" />
                    </div>
                    <h2 className="text-sm sm:text-base font-semibold text-white">
                      Auto Tech — where machines meet modern systems.
                    </h2>
                  </div>
                  <p className="text-sm sm:text-[15px] text-neutral-200">
                    A growing arm of Fynaro dedicated to bringing innovation
                    into the automotive space — leveraging diagnostics, modern
                    tools, technical understanding, and digital systems to
                    support how people and businesses interact with their
                    vehicles.
                  </p>
                  <p className="text-sm sm:text-[15px] text-neutral-200">
                    From maintenance insights to auto-related digital solutions,
                    we bridge technology with the automobile world.
                  </p>
                </div>

                <div className="mt-1 md:mt-0 md:min-w-[210px] space-y-2 rounded-2xl bg-black/30 border border-white/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                    How we think about autotech
                  </p>
                  <div className="space-y-1.5 text-[12px] text-neutral-200">
                    <div className="flex items-center gap-2">
                      <FiActivity className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Diagnostics informed by real data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCpu className="w-3.5 h-3.5 text-sky-300" />
                      <span>Digital tools layered on physical systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiTarget className="w-3.5 h-3.5 text-amber-300" />
                      <span>Human-friendly experiences around complex tech</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Belief / Mission / Edge */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            className="mb-10"
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              {/* Our Belief */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 mb-1.5">
                  Our Belief
                </p>
                <p className="text-sm sm:text-[15px] text-neutral-100">
                  Great work isn&apos;t about noise — it&apos;s about clarity,
                  consistency, and solving real problems.
                </p>
              </div>

              {/* Our Mission */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 mb-1.5">
                  Our Mission
                </p>
                <p className="text-sm sm:text-[15px] text-neutral-100">
                  To empower individuals and businesses with technology and
                  creativity that help them show up confidently, operate
                  smarter, and grow faster.
                </p>
              </div>

              {/* Our Edge */}
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 mb-1.5">
                  Our Edge
                </p>
                <p className="text-sm sm:text-[15px] text-neutral-100">
                  We don&apos;t chase trends. We build timeless, strategic,
                  functional solutions — across both tech and auto — anchored in
                  real human value.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Closing statement */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
            className="mb-4 sm:mb-2"
          >
            <div className="rounded-3xl border border-white/10 bg-white/0 px-5 sm:px-7 py-4 sm:py-5 text-center">
              <p className="text-sm sm:text-[15px] text-neutral-100 max-w-3xl mx-auto">
                Fynaro is where ideas grow into brands, brands grow into
                businesses, and businesses step into their next chapter.
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
