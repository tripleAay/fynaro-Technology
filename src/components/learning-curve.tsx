// components/LearningCurve.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LearningCurve() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">
      
      {/* Full-bleed subtle background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_120px)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-32">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 lg:gap-24 mb-28">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <div className="font-mono text-xs tracking-[4px] text-white/50 mb-4">
              03 — LEARNING CURVE
            </div>
            <h2 className="heading-font text-6xl md:text-7xl font-semibold leading-[1.05] tracking-[-1.8px] text-white">
              Learning Curve
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md lg:text-right"
          >
            <p className="text-[22px] leading-tight text-white/80 font-light">
              Fynaro doesn’t assume.<br />
              It observes.<br />
              Breaks things down.<br />
              Rebuilds them cleaner.
            </p>
          </motion.div>
        </div>

        {/* Core Statement - With generous breathing room */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto border-t border-white/10 pt-20 pb-24 text-center"
        >
          <p className="text-4xl md:text-5xl leading-[1.15] tracking-[-1px] font-light text-white/90">
            No attachment to first ideas.<br />
            <span className="text-[#00d4ff] font-medium">Only to what works.</span>
          </p>
        </motion.div>

        {/* Three Steps - Clean Apple-style cards with lots of air */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {[
            { 
              number: "01", 
              label: "Observe", 
              desc: "Watch how things actually behave under real pressure" 
            },
            { 
              number: "02", 
              label: "Deconstruct", 
              desc: "Break until only the essential remains visible" 
            },
            { 
              number: "03", 
              label: "Rebuild", 
              desc: "Make it cleaner, faster, and undeniably truer" 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300"
            >
              <div className="font-mono text-xs text-white/40 mb-6 tracking-widest">
                {item.number}
              </div>
              
              <div className="text-2xl font-medium text-white mb-6 group-hover:text-[#00d4ff] transition-colors">
                {item.label}
              </div>
              
              <p className="text-white/70 leading-relaxed text-[15.5px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}