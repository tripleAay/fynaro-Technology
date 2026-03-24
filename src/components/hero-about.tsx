"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FynaroAboutHero() {
  return (
    <section className="relative min-h-screen w-full bg-[#050506] flex items-center overflow-hidden">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* LEFT — TEXT BLOCK */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <p className="text-xs tracking-[0.125em] uppercase font-mono text-white/60">
              FYNARO TECH
            </p>
          </div>

          <h1 className="text-2xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-1.5px] text-white">
            We build clean,<br />
            powerful digital<br />
            experiences.
          </h1>

          <div className="max-w-lg space-y-6 text-[17px] leading-relaxed text-white/70">
            <p>
              Fynaro Tech is a modern digital studio crafting high-performance 
              websites, bold brand identities, and seamless user experiences.
            </p>
            <p>
              We combine design precision with technical excellence to deliver 
              products that don’t just look good — they <span className="text-white">perform</span>.
            </p>
          </div>

          <div className="pt-4">
            <a 
              href="#work" 
              className="inline-flex items-center gap-3 group text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              Explore Our Work 
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT — IMAGE BLOCK */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            
            <Image
              src="/images/schneider-TamMbr4okv4-unsplash.jpg"
              alt="Fynaro Tech Studio"
              fill
              className="object-cover grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
              priority
            />

            {/* Enhanced overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
            
            {/* Inner glow accent */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            {/* Floating label */}
            <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm border border-white/10">
              Lagos • 2026
            </div>
          </div>

          {/* Decorative ring */}
          <div className="absolute -inset-6 border border-white/5 rounded-[2.75rem] -z-10" />
        </motion.div>

      </div>

      {/* SCROLL PROMPT - Fixed with proper distance */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white/40 text-xs tracking-widest z-20">
        SCROLL TO DISCOVER
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-3 text-lg"
        >
          ↓
        </motion.div>
      </div>

    </section>
  );
}