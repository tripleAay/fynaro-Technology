"use client";

import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  initials: string;
  name: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: "seyi",
    initials: "S",
    name: "Seyi",
    role: "Founder, Print & Merch Studio",
    quote:
      "Fynaro made our site feel like our actual product. Clients mention it on calls now.",
  },
  {
    id: "amara",
    initials: "A",
    name: "Amara",
    role: "Creative Director, Studio Lume",
    quote:
      "They took our scattered visuals and turned them into a brand system we’re proud to show anywhere.",
  },
  {
    id: "tolu",
    initials: "T",
    name: "Tolu",
    role: "Product Lead, SaaS Team",
    quote:
      "Our dashboard finally looks as premium as what it does. The before-and-after still surprises people.",
  },
];

export default function PhaseEightSocialProof() {
  return (
    <section className="relative w-full bg-[#050507] text-white py-16 sm:py-20">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 8 — Social Proof</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Proof that the work{" "}
            <span className="text-[#f5e4b5]">actually lands in real life.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            A few voices from people who trusted us with how they show up online.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{
                  y: -4,
                  rotateX: -3,
                  rotateY: 3,
                  boxShadow:
                    "0 26px 80px rgba(0,0,0,0.9), 0 0 22px rgba(200,169,106,0.35)",
                  borderColor: "rgba(245, 228, 181, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#171720,#050508_80%)] px-5 py-5 sm:px-6 sm:py-6"
              >
                {/* Initial + halo */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                    <span>{item.initials}</span>
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,228,181,0.22),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white/90">{item.name}</span>
                    <span className="text-[11px] text-white/55">{item.role}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                  “{item.quote}”
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-2 text-[10px] sm:text-xs text-white/40">
                  <span>Real client. Real project.</span>
                  <span className="inline-flex h-px w-10 bg-gradient-to-r from-[#c8a96a] to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
