"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, Brain, BarChart2, Compass } from "lucide-react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const services = [
  {
    id: "creative-tech",
    title: "Creative Tech Solutions",
    text: "We build digital experiences that feel alive — where design meets seamless functionality.",
    Icon: Lightbulb,
  },
  {
    id: "branding",
    title: "Branding That Sells",
    text: "Your brand speaks, converts, and stays remembered.",
    Icon: Target,
  },
  {
    id: "innovative",
    title: "Innovative Design",
    text: "Blending UX, motion, and storytelling to wow your audience.",
    Icon: Brain,
  },
  {
    id: "results",
    title: "Results & Growth",
    text: "Over 50 brands scaled in 2 years — tangible results.",
    Icon: BarChart2,
  },
  {
    id: "strategy",
    title: "Strategy & Consulting",
    text: "We plan and execute unstoppable brand strategies.",
    Icon: Compass,
  },
];

export default function HumanizedServices() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#191716] via-[#141414] to-[#0f0f10] text-white overflow-hidden">
      <Header />

      {/* Floating Glow Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-green-500/10 rounded-full blur-3xl top-24 left-1/4"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-green-400/5 rounded-full blur-3xl bottom-20 right-1/4"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Title */}
      <div className="text-center mt-20 mb-16 px-6 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-2"
        >
          We don’t just build brands.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold leading-tight text-green-500"
        >
          We bring them to life.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-400 mt-4"
        >
          Fynaro merges creativity, tech, and strategy to craft experiences that
          convert and delight.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className="relative bg-[#1b1a19]/90 border border-white/10 rounded-2xl p-6 text-center shadow-lg 
            hover:shadow-[0_0_20px_#22C55E33] hover:border-green-400/40 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center items-center mb-4">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <service.Icon className="w-10 h-10 text-green-400" />
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href="/get-started"
          className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#191716] px-8 py-3 rounded-full font-semibold shadow-xl 
          hover:shadow-[0_0_25px_#22C55E66] hover:scale-105 transition-all text-sm"
        >
          Let’s Build Your Brand →
        </a>
      </motion.div>

      <Footer />
    </section>
  );
}
