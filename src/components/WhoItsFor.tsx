"use client";

import { motion } from "framer-motion";

export default function WhoItsFor() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-8 md:py-44">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* top line */}
        <div className="mx-auto mb-12 h-px w-20 bg-white/10" />

        {/* label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-[11px] tracking-[0.4em] text-[#d6cc6d]"
        >
          WHO THIS IS FOR
        </motion.p>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl"
        >
          Built for brands and products
          <br className="hidden md:block" />
          that need more than surface-level design.
        </motion.h2>

        {/* supporting */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg"
        >
          Fynaro Tech works with businesses, founders, and ideas that require
          clearer structure, stronger presentation, and digital execution that
          actually holds up in real use.
        </motion.p>

        {/* subtle divider bottom */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-16 bg-white/10" />
        </div>
      </div>
    </section>
  );
}