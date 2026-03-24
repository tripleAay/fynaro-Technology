// components/Code.tsx
'use client';

import { motion } from 'framer-motion';

export default function Code() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">
      
      {/* Full-bleed background with subtle texture */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Subtle horizontal rhythm lines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff04_0px,#ffffff04_1px,transparent_1px,transparent_90px)]" />
        
        {/* Deep vertical gradient for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="space-y-20"
        >
          {/* Section Label */}
          <div className="uppercase tracking-[5px] text-xs font-mono text-white/40">
            06 — CODE
          </div>

          {/* Main Heavy Typography - Centered & Dramatic */}
          <h2 className="heading-font text-[62px] md:text-[78px] lg:text-[92px] leading-[0.94] tracking-[-3.5px] font-medium text-white/95 max-w-4xl mx-auto">
            The influence is embedded.<br />
            In the timing.<br />
            In the instinct.<br />
            In the way it moves before it speaks.
          </h2>

          {/* Punchline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-12 border-t border-white/10 inline-block"
          >
            <p className="text-4xl md:text-5xl leading-tight text-white/80">
              Culture isn’t added.<br />
              <span className="text-[#00d4ff] font-medium">It’s already there.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}