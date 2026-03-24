"use client";

import { motion } from "framer-motion";

export default function Form() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_110px)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-32">
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-24"
        >
          {/* Header */}
          <div>
            <div className="font-mono text-xs tracking-[4px] text-white/50 mb-6">
              04 — FORM
            </div>

            <h2 className="heading-font text-5xl md:text-6xl font-semibold leading-[1.1] tracking-[-1.2px] text-white">
              What starts as movement<br />
              becomes structure.
            </h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-12 gap-x-16 gap-y-16">
            
            {/* Left */}
            <div className="md:col-span-5">
              <div className="space-y-8 text-xl leading-tight text-white/80 font-light">
                <p>Clear decisions.</p>
                <p>Precise execution.</p>
                <p>No wasted effort.</p>
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-7">
              <p className="text-3xl md:text-4xl leading-[1.2] tracking-[-0.5px] font-light text-white/90 max-w-xl">
                Nothing happens by luck.<br />
                <span className="text-[#d6cc6d] font-medium">
                  Everything is designed.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}