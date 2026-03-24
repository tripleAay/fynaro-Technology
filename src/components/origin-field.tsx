"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OriginField() {

  // ✅ FIX: declare outside JSX
  const text = ["BUILT IN", "ENVIRONMENTS"];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">

      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a]" />

      {/* Layer 2: Grain texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Layer 3: Vertical rhythm lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#ffffff03_0px,#ffffff03_1px,transparent_1px,transparent_80px)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-xs tracking-[6px] font-mono text-white/40"
        >
          ORIGIN FIELD
        </motion.div>

        {/* 🔥 TYPE ANIMATED HEADING */}
        <div className="space-y-8 relative">

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="text-[12vw] md:text-[9.5vw] leading-[0.8] font-bold tracking-[-3px] text-white heading-font"
          >
            {text.map((line, lineIndex) => (
              <div key={lineIndex} className="block overflow-hidden">
                {line.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 90,
                        scaleY: 1.4,
                        filter: "blur(10px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        filter: "blur(0px)",
                        transition: {
                          delay: lineIndex * 0.5 + i * 0.04,
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    className="inline-block will-change-transform"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.h2>

          {/* 🔥 subtle glow pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
          />

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-white/70 font-light"
          >
            Where nothing stays still.<br />
            Where pressure sharpens thinking.<br />
            Where speed decides what survives.
          </motion.p>
        </div>

        {/* Punchline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-16"
        >
          <p className="inline-block text-xl md:text-2xl font-medium text-white/90 border-t border-b border-white/10 py-4 px-10 tracking-tight">
            Not noise.<br />
            <span className="text-[#d6cc6d]">Rhythm.</span>
          </p>
        </motion.div>
      </div>

    
      

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}