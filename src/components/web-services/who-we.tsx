"use client";

import { motion } from "framer-motion";

const audiencePills = [
  {
    id: "new-brands",
    title: "New brands",
    body: "New brands that want to launch looking established from day one.",
  },
  {
    id: "existing-teams",
    title: "Existing teams",
    body: "Existing teams whose product feels better than their current website.",
  },
  {
    id: "creators-studios",
    title: "Creators & studios",
    body: "Creators and studios who need a digital home that actually feels like them.",
  },
];

// Container animation with automatic stagger
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.1,
    },
  },
};

// Each pill animation
const pillVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function PhaseSixWhoFynaroIsFor() {
  return (
    <section className="relative w-full bg-[#050507] text-white py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 6 — Who Fynaro Is For</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Built for people who actually{" "}
            <span className="text-[#f5e4b5]">care how it looks and works.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            Not everyone needs a premium digital identity. These are the people we do our best work with.
          </p>
        </div>

        {/* Pills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6"
        >
          {audiencePills.map((pill) => (
            <motion.div key={pill.id} className="relative">
              {/* Glow ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-[#f5e4b5]/15 via-transparent to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                variants={pillVariants}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow:
                    "0 28px 80px rgba(0,0,0,0.85), 0 0 26px rgba(200,169,106,0.45)",
                  borderColor: "rgba(245, 228, 181, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#171720,#050508_80%)] px-5 py-5 sm:px-6 sm:py-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                    {pill.title}
                  </p>
                  <span className="h-[1px] w-10 bg-gradient-to-r from-[#c8a96a] to-transparent opacity-70" />
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {pill.body}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/75">
            If you care how it looks and how it works, we&apos;re your people.
          </p>
          <span className="mt-1 flex items-center gap-2 text-[10px] sm:text-xs text-white/45">
            <span className="inline-flex h-px w-10 bg-white/25" />
            <span>Brand, product, or studio — if it&apos;s visual, we care.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
