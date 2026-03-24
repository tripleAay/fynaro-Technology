"use client";

import { motion } from "framer-motion";

export default function Code() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff04_0px,#ffffff04_1px,transparent_1px,transparent_100px)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 py-28 md:py-36 text-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-14"
        >

          {/* Label */}
          <div className="uppercase tracking-[4px] text-[11px] font-mono text-white/40">
            06 — CODE
          </div>

          {/* 🔥 HEADLINE (FIXED) */}
          <h2 className="
            heading-font
            text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px]
            leading-[1.05]
            tracking-[-1.5px]
            font-medium
            text-white/95
          ">
            The influence is embedded.<br />
            In the timing.
            In the instinct.<br />
            In the way it moves before it speaks.
          </h2>

          {/* 🔥 PUNCHLINE (MORE AIR) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pt-10 border-t border-white/10 max-w-md mx-auto"
          >
            <p className="text-xl sm:text-2xl md:text-3xl leading-snug text-white/80">
              Culture isn’t added.<br />
              <span className="text-[#d6cc6d] font-medium">
                It’s already there.
              </span>
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}