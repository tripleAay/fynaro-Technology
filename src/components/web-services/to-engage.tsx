"use client";

import { motion } from "framer-motion";

const modes = [
  {
    id: "one-off",
    label: "Mode 1",
    title: "One-Off Project",
    body: "For launches, rebrands, and redesigns when you need to look serious now.",
    meta: "Perfect for: new launches, major visual upgrades, or campaign sites.",
  },
  {
    id: "partner",
    label: "Mode 2",
    title: "Design & Web Partner",
    body: "Ongoing support for teams who want a dedicated design–web brain without a full-time hire.",
    meta: "Perfect for: product teams, studios, or founders shipping often.",
  },
  {
    id: "sprint",
    label: "Mode 3",
    title: "Product / Concept Sprint",
    body: "1–2 week rapid sprint to shape, prototype, and present a new idea with clarity.",
    meta: "Perfect for: new product ideas, MVPs, decks, or investor-facing visuals.",
  },
];

export default function PhaseSevenHowToEngage() {
  return (
    <section className="relative w-full bg-[#050507] text-white py-16 sm:py-20">
      {/* Background effects */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 7 — How to Work Together</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Three clear ways to{" "}
            <span className="text-[#f5e4b5]">plug Fynaro into your world.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            No endless retainers you don’t understand. Just clear modes that match how you like to build.
          </p>
        </div>

        {/* Modes Grid */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {modes.map((mode) => (
            <motion.div
              key={mode.id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#171720,#050508_80%)] px-5 py-5 sm:px-6 sm:py-6"
              whileHover={{
                scale: 1.03,
                y: -4,
                boxShadow: "0 26px 80px rgba(0,0,0,0.85), 0 0 26px rgba(200,169,106,0.45)",
                borderColor: "rgba(245, 228, 181, 0.35)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              {/* Glow ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-[#f5e4b5]/15 via-transparent to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                  {mode.label}
                </p>
                <span className="h-[1px] w-10 bg-gradient-to-r from-[#c8a96a] to-transparent opacity-70" />
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                {mode.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-3">
                {mode.body}
              </p>

              {mode.meta && (
                <p className="mt-auto text-[11px] sm:text-xs text-white/45">
                  {mode.meta}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/75">
            We work on fixed-scope projects with clear timelines — so you know exactly what’s happening and when.
          </p>
          <span className="mt-1 flex items-center gap-2 text-[10px] sm:text-xs text-white/45">
            <span className="h-px w-10 bg-white/25" />
            <span>No surprise hours. No vague deliverables.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
