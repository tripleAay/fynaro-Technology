"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";

export default function ProjectsFinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-8 md:py-44">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* top line */}
        <div className="mx-auto mb-12 h-px w-20 bg-white/10" />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-[11px] tracking-[0.4em] text-[#d6cc6d]"
        >
          START SOMETHING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
        >
          Have a project that needs
          <br className="hidden md:block" />
          to be built properly?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg"
        >
          Whether it starts as a product idea, a brand shift, a website, or a
          mobile app, the goal stays the same — clarity, quality, and execution
          that holds up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#d6cc6d] px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e4d97a]"
          >
            Start a Project <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6cc6d]/40 hover:bg-white/[0.05]"
          >
            Discuss Your Idea <MoveRight size={16} />
          </Link>
        </motion.div>

        {/* bottom line */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-16 bg-white/10" />
        </div>
      </div>
    </section>
  );
}