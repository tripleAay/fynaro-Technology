"use client";

import React, { useEffect, useState } from "react";
import { Lightbulb, Target, Brain, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/header";

const cards = [
  {
    id: "creative-tech",
    Icon: Lightbulb,
    title: "Creative Tech Solutions",
    text: "We design experiences that merge aesthetics with function — bridging art and technology seamlessly.",
  },
  {
    id: "branding",
    Icon: Target,
    title: "Branding That Sells",
    text: "Your brand should speak, sell, and stay remembered. We craft clarity that converts curiosity into loyalty.",
  },
  {
    id: "innovative",
    Icon: Brain,
    title: "Innovative Design Approach",
    text: "We stay ahead of trends — blending UX intuition, motion, and storytelling to create designs that feel alive.",
  },
  {
    id: "results",
    Icon: BarChart2,
    title: "Proven Results",
    text: "Over 50 brands scaled in 2 years, achieving measurable design and digital growth impact.",
  },
];

const stats = [
  { id: "brands", value: 50, label: "Brands Scaled" },
  { id: "projects", value: 200, label: "Projects Completed" },
  { id: "satisfaction", value: 98, label: "Client Satisfaction", suffix: "%" },
];

export default function WhyFynaro() {
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const durations = [1000, 1200, 1100];
    const timers: number[] = [];

    stats.forEach((s, i) => {
      const end = s.value;
      const stepTime = Math.max(10, Math.floor((durations[i] || 1000) / (end || 1)));
      let current = 0;

      const id = window.setInterval(() => {
        current++;
        if (current >= end) {
          current = end;
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
    <section
      id="why-fynaro"
      className="relative py-20 md:py-28 bg-[linear-gradient(180deg,#0f0f10_0%,#141313_100%)] text-white"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <Header />

        {/* Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
            Why Fynaro?
          </h2>
          <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            We merge creativity with precision — delivering design, tech, and strategy that move people.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group rounded-2xl bg-white/10 border border-white/10 p-6 sm:p-7 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-white/10 flex items-center justify-center">
                  <c.Icon className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {counts[i]}
                  {s.suffix || "+"}
                </span>
              </div>
              <div className="mt-3 text-sm sm:text-base text-gray-300 font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col lg:flex-row items-center gap-8"
        >
          <blockquote className="flex-1 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm text-gray-200">
            <p className="text-base sm:text-lg md:text-xl italic leading-relaxed">
              “Working with Fynaro redefined how we see our brand — they don’t just design, they translate vision into impact.”
            </p>
            <cite className="mt-4 block text-sm text-gray-400">
              — Tolulope A., Brand Manager
            </cite>
          </blockquote>
          <div className="w-full lg:w-64 flex items-center justify-center">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-medium shadow-md hover:scale-[1.03] transition-transform duration-300"
            >
              Let’s Build Together →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
