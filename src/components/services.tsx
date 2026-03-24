"use client";

import { motion } from "framer-motion";
import { Code2, Brush, Printer } from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Code2 className="w-10 h-10 text-green-400" />,
    title: "Web Development & Tech",
    desc: "Modern, fast, and scalable digital solutions built with precision from portfolio sites to full platforms.",
  },
  {
    id: 2,
    icon: <Brush className="w-10 h-10 text-pink-400" />,
    title: "Branding & Visual Identity",
    desc: "We craft powerful brand systems logos, colors, and design languages that make your business unforgettable.",
  },
  {
    id: 3,
    icon: <Printer className="w-10 h-10 text-yellow-400" />,
    title: "Print & Premium Packaging",
    desc: "From premium cards to custom packaging, we design print experiences that feel as bold as your vision.",
  },
];

export default function Services() {
  return (
    <section  style={{backgroundImage: `url('/images/jonatan-pie-h8nxGssjQXs-unsplash.jpg')`}} className="relative w-full py-24 bg-[#04030F] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* 🔥 HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-4"
        >
          What We Do
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed"
        >
          Fynaro turns ideas into powerful experiences; blending design,
          technology, and culture to help brands grow with clarity and impact.
        </motion.p>

        {/* 🔥 PERFECTLY CENTERED GRID */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">

            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10"
              >
                {/* ICON */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  className="mb-5"
                >
                  {service.icon}
                </motion.div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold mb-3">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {service.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}