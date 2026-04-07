"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Strategy",
    text: "Defines what matters and where the work should go.",
  },
  {
    title: "Design",
    text: "Shapes how the direction is seen, felt, and understood.",
  },
  {
    title: "Code",
    text: "Turns the idea into something usable, functional, and real.",
  },
];

export default function WhyFynaroStrip() {
  return (
    <section className="relative px-6 py-20 md:px-8 md:py-28">
      {/* top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* bottom line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid justify-center gap-16 md:grid-cols-3 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* ambient glow */}
              <div className="pointer-events-none absolute -inset-6 rounded-2xl bg-[#d6cc6d]/0 blur-2xl transition duration-500 group-hover:bg-[#d6cc6d]/10" />

              {/* index */}
              <span className="text-[10px] tracking-[0.35em] text-white/30">
                0{i + 1}
              </span>

              <motion.h2
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl"
              >
                {item.title}
              </motion.h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/55 md:text-base">
                {item.text}
              </p>

              {/* divider */}
              <div className="mt-10 h-px w-12 bg-white/10 transition-all duration-300 group-hover:w-20 group-hover:bg-[#d6cc6d]/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}