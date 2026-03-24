// components/ForwardState.tsx
'use client';

import { motion } from 'framer-motion';

export default function ForwardState() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">
      
      {/* Full-bleed background with deep texture */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Subtle horizontal rhythm lines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_100px)]" />
        
        {/* Stronger vertical depth gradient for a clean exit */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-20"
        >
          {/* Section Label */}
          <div className="uppercase tracking-[6px] text-xs font-mono text-white/40">
            07 — FORWARD STATE
          </div>

          {/* Main Statement - Clean & Powerful */}
          <h2 className="heading-font text-[68px] md:text-[92px] lg:text-[108px] leading-[0.90] tracking-[-4px] font-semibold text-white">
            Fynaro keeps moving.
          </h2>

          {/* Supporting Lines */}
          <div className="space-y-6 text-3xl md:text-4xl leading-tight text-white/75 font-light max-w-2xl mx-auto">
            <p>Learning. Adjusting. Refining.</p>
            <p className="text-white">No fixed version.</p>
            <p className="text-[#d6cc6d] font-medium">Only progression.</p>
          </div>

          {/* Final Call */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pt-16"
          >
            <div className="inline-flex items-center gap-3 text-xs tracking-[4px] text-white/30 hover:text-white/60 transition-colors">
              THE JOURNEY CONTINUES 
              <span className="text-base">↓</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade - extra smooth exit */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}