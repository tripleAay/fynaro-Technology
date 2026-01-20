"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../../components/header";

const clientLogos = [
  "/clients/client1.png",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
];

const stats = [
  { id: "brands", value: 50, label: "Brands Scaled" },
  { id: "projects", value: 200, label: "Projects Completed" },
  { id: "satisfaction", value: 98, label: "Client Satisfaction", suffix: "%" },
];

const testimonials = [
  {
    id: "t1",
    quote:
      "Fynaro helped us grow with intention. Everything — from strategy to design — felt aligned and meaningful.",
    name: "Tolulope A.",
    role: "Brand Manager",
  },
  {
    id: "t2",
    quote:
      "The calm precision of their process gave us confidence. It wasn’t just design, it was clarity for our brand.",
    name: "Chinedu M.",
    role: "CEO",
  },
];

export default function ClientsSection() {
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const timers: number[] = [];
    stats.forEach((s, i) => {
      const duration = 1000;
      const stepTime = Math.max(10, Math.floor(duration / (s.value || 1)));
      let current = 0;
      const id = window.setInterval(() => {
        current++;
        if (current >= s.value) {
          current = s.value;
          clearInterval(id);
        }
        setCounts((prev) => {
          const copy = [...prev];
          copy[i] = current;
          return copy;
        });
      }, stepTime);
      timers.push(id);
    });
    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section className="relative py-24 bg-[#0e0e0f] text-white overflow-hidden">
      <Header />
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
        >
          Trusted by Ambitious Brands
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-gray-400 text-lg max-w-2xl mb-16"
        >
          We’ve helped visionary brands grow with clarity, creativity, and
          measurable impact.
        </motion.p>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-wrap justify-center items-center gap-10 mb-20"
        >
          {clientLogos.map((logo, idx) => (
            <div
              key={idx}
              className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-white/5 rounded-xl p-4 hover:scale-105 hover:bg-white/10 transition-all"
            >
              <Image
                src={logo}
                alt={`Client ${idx + 1}`}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-12 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-[#22C55E]">
                {counts[i]}
                {s.suffix || "+"}
              </div>
              <div className="text-gray-400 mt-2 text-sm uppercase tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl">
          {testimonials.map((t, idx) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx, duration: 0.7 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all"
            >
              <p className="text-gray-200 text-base leading-relaxed italic">
                “{t.quote}”
              </p>
              <cite className="mt-4 block text-sm text-gray-400 font-medium">
                — {t.name}, {t.role}
              </cite>
            </motion.blockquote>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          href="/get-started"
          className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#0e0e0f] font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Let’s Work Together →
        </motion.a>
      </div>
    </section>
  );
}
