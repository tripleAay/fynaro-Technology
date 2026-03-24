// components/ArrivalHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ArrivalHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Subtle animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Very faint moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Tiny pre-text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-block text-xs tracking-[4px] font-mono text-white/40"
        >
          FYNARO
        </motion.div>

        {/* Main Massive Typography */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-[13vw] md:text-[11vw] lg:text-[9.5vw] leading-[0.82] font-bold tracking-[-4px] text-[#d6cc6d] heading-font"
          >
            IT<br />MOVED
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-white/70 font-light tracking-tight"
          >
            Fynaro didn’t start.<br />
            No signal. No announcement.<br />
            Just presence — already in motion.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        
      </div>

      {/* Bottom fade for seamless next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}