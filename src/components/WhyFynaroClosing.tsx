"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyFynaroClosing() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-8 md:py-44">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/luca-bravo-9l_326FISzk-unsplash.jpg" 
          alt="Fynaro closing background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

        {/* subtle gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,204,109,0.12),transparent_60%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto max-w-5xl text-center">
        
        {/* line */}
        <div className="mx-auto mb-16 h-px w-24 bg-white/10" />

        {/* main statement */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-semibold leading-[1.4] tracking-tight text-white/90 sm:text-4xl md:text-5xl"
        >
          Strategy gives the work direction.
          <br />
          Design gives it presence.
          <br />
          <span className="text-[#d6cc6d]">Code gives it life.</span>
        </motion.h2>

        {/* supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-10 max-w-2xl text-base leading-8 text-white/55 md:text-lg"
        >
          Fynaro does not operate from one angle. Strong brands and digital
          products are built when thinking, design, and execution work together
          as one system.
        </motion.p>

        {/* bottom spacing */}
        <div className="mt-20 flex justify-center">
          <div className="h-px w-16 bg-white/10" />
        </div>
      </div>
    </section>
  );
}