// components/OriginField.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function OriginField() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      
      {/* Layer 1: Deep dark base with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a]" />

      {/* Layer 2: Subtle grain texture using SVG filter (pure CSS, no extra files) */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Layer 3: Very faint vertical pressure lines (rhythm) */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_80px)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Small origin label */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-xs tracking-[6px] font-mono text-white/40"
        >
          ORIGIN FIELD
        </motion.div>

        {/* Heavy layered typography */}
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-[12vw] md:text-[9.5vw] leading-[0.78] font-bold tracking-[-3.5px] text-white heading-font"
          >
            BUILT IN<br />
            ENVIRONMENTS
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-2xl mx-auto text-[21px] md:text-2xl leading-tight text-white/75 font-light tracking-[-0.3px]"
          >
            Where nothing stays still.<br />
            Where pressure sharpens thinking.<br />
            Where speed decides what survives.
          </motion.p>
        </div>

        {/* The punchline — rhythm */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16"
        >
          <p className="inline-block text-2xl md:text-3xl font-medium text-white/90 border-t border-b border-white/10 py-4 px-10 tracking-tight">
            Not noise.<br />
            <span className="text-[#d6cc6d]">Rhythm.</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 text-[10px] tracking-[3px]"
      >
        <span>ENTER THE FIELD</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}