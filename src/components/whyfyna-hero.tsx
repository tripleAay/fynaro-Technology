"use client";

import { motion } from "framer-motion";

export default function WhyFynaroHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-black px-6 pb-20 pt-32 text-white md:px-8 md:pb-24 md:pt-40">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,204,109,0.10),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-6 text-[10px] font-medium tracking-[0.42em] text-[#d6cc6d]">
            WHY FYNARO
          </p>

          <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Fynaro operates where
            <span className="text-[#d6cc6d]"> strategy</span>,
            <span className="text-[#d6cc6d]"> design</span>, and
            <span className="text-[#d6cc6d]"> code</span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/50 md:text-base">
            work together as one system.
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Strong brands and digital products are not built from one angle.
            They need clear direction, clear expression, and clear execution.
            That is the ground Fynaro works on.
          </p>

          <div className="mt-10 flex justify-center flex-wrap gap-3">
            {["Direction", "Clarity", "Execution"].map((item) => (
              <motion.span
                key={item}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  rotate: [0, -1, 1, -1, 0], // subtle shake
                  boxShadow: "0px 0px 25px rgba(214,204,109,0.25)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                }}
                className="cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] tracking-[0.2em] text-white/60 hover:text-white"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}