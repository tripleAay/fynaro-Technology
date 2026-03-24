// components/Form.tsx
'use client';

import { motion } from 'framer-motion';

export default function Form() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">
      
      {/* Full-bleed subtle background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_100px)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-32">
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-28"
        >
          {/* Section Header */}
          <div>
            <div className="font-mono text-xs tracking-[4px] text-white/50 mb-6">
              04 — FORM
            </div>
            <h2 className="heading-font text-6xl md:text-7xl font-semibold leading-[1.08] tracking-[-1.8px] text-white">
              What started as movement<br />
              became structure.
            </h2>
          </div>

          {/* Content Area with generous breathing room */}
          <div className="grid md:grid-cols-12 gap-x-20 gap-y-20">
            
            {/* Left Column - Clean list */}
            <div className="md:col-span-5">
              <div className="space-y-9 text-[22px] leading-tight text-white/80 font-light">
                <p>Clear decisions.</p>
                <p>Precise execution.</p>
                <p>Nothing wasted.</p>
              </div>
            </div>

            {/* Right Column - Powerful punchline with more air */}
            <div className="md:col-span-7">
              <p className="text-4xl leading-[1.15] tracking-[-0.8px] font-light text-white/90 max-w-2xl">
                Nothing <span className="line-through opacity-40">случайное</span>.<br />
                <span className="text-[#00d4ff] font-medium">Only intention.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}