"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PhaseNineFinalCTA() {
  return (
    <section className="relative w-full bg-[#050507] text-white py-20 sm:py-24">
      {/* Background – same cinematic Fynaro vibe */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center sm:px-8 md:px-10">
        {/* Phase label */}
        <div className="mb-6 flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
          <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
          <span>Phase 9 — Let&apos;s Start the Story</span>
        </div>

        {/* 3D Totem / Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="relative mb-10 flex items-center justify-center"
        >
          {/* Soft golden halo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,228,181,0.32),transparent_65%)] blur-2xl" />
          </div>

          {/* Totem */}
          <motion.div
            whileHover={{
              rotateX: -7,
              rotateY: 10,
              y: -6,
              boxShadow:
                "0 26px 90px rgba(0,0,0,0.95), 0 0 32px rgba(200,169,106,0.55)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-[26px] bg-[conic-gradient(from_220deg,rgba(245,228,181,0.1),rgba(200,169,106,0.7),rgba(15,15,20,1),rgba(245,228,181,0.4))] p-[2px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[radial-gradient(circle_at_top,#1c1a24,#050507_80%)]">
              {/* Simple F logo / mark placeholder */}
              <div className="relative flex h-10 w-7 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#f5e4b5] to-[#c8a96a]/40 opacity-90" />
                <div className="relative flex h-full w-full flex-col items-start justify-center px-[3px]">
                  <span className="h-[2px] w-4 rounded-full bg-black/80 mb-[3px]" />
                  <span className="h-[2px] w-3 rounded-full bg-black/75" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            You already have the story.{" "}
            <span className="block text-[#f5e4b5]">
              Let&apos;s give it a sharper frame.
            </span>
          </h2>

          <p className="max-w-xl text-sm sm:text-base text-white/70">
            Tell us what you&apos;re building. We&apos;ll show you what it could look like
            when the visuals, website, and story finally line up.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <Link
            href="/start-a-project" // change to your actual route
            className="inline-flex items-center justify-center rounded-full border border-[#f5e4b5]/70 bg-[#f5e4b5] px-6 py-2.5 text-sm font-medium text-black shadow-[0_16px_45px_rgba(0,0,0,0.75)] transition hover:-translate-y-[2px] hover:shadow-[0_22px_60px_rgba(0,0,0,0.9)]"
          >
            Start a project
          </Link>

          <Link
            href="/portfolio" // change to your actual route
            className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition hover:-translate-y-[2px] hover:border-[#f5e4b5]/50 hover:bg-white/8"
          >
            View full portfolio
          </Link>
        </motion.div>

        {/* Tiny reassurance line */}
        <div className="mt-6 text-[10px] sm:text-xs text-white/40">
          No pressure deck. Just a clear picture of what your brand could look like at
          full power.
        </div>
      </div>
    </section>
  );
}
