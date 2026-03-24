// components/Output.tsx
'use client';

import { motion } from 'framer-motion';

export default function Output() {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center">
      
      {/* Full-bleed subtle background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_110px)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-32">
        
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-center">
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-5/12 space-y-16"
          >
            <div>
              <div className="font-mono text-xs tracking-[4px] text-white/50 mb-6">
                05 — OUTPUT
              </div>
              <h2 className="heading-font text-6xl md:text-7xl font-semibold leading-[1.08] tracking-[-1.6px] text-white">
                Fynaro shows up<br />through what it builds.
              </h2>
            </div>

            <div className="space-y-8 text-[21px] leading-tight text-white/75 font-light max-w-md">
              <p>Interfaces that think.</p>
              <p>Systems that hold.</p>
              <p>Designed for real conditions, not controlled environments.</p>
            </div>
          </motion.div>

          {/* Right Visual Block - More refined and spacious */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:w-7/12 relative"
          >
            <div className="aspect-[16/10] bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              
              {/* Placeholder for your actual UI/product screenshots */}
              <div className="h-full w-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#d6cc6d] text-6xl mb-8 opacity-75">◉</div>
                  <p className="font-mono tracking-widest text-sm text-white/60">PRODUCT VISUALS GO HERE</p>
                  <p className="text-white/40 text-xs mt-4">High-fidelity interfaces • Real builds</p>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 border border-[#00d4ff]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>

            {/* Refined corner accents */}
            <div className="absolute -top-5 -right-5 w-9 h-9 border-t border-r border-white/20" />
            <div className="absolute -bottom-5 -left-5 w-9 h-9 border-b border-l border-white/20" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}