"use client";

import { motion } from "framer-motion";
import { Code2, Brush, Printer, CreditCard } from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Code2 className="w-10 h-10 text-green-400" />,
    title: "Web Development & Tech",
    desc: "Modern, fast, and scalable digital solutions built with precision — from portfolio sites to full platforms.",
  },
  {
    id: 2,
    icon: <Brush className="w-10 h-10 text-pink-400" />,
    title: "Branding & Visual Identity",
    desc: "We craft powerful brand systems — logos, colors, and design languages that make your business unforgettable.",
  },
  {
    id: 3,
    icon: <Printer className="w-10 h-10 text-yellow-400" />,
    title: "Print & Premium Packaging",
    desc: "From premium cards to custom packaging, we design print experiences that feel as bold as your vision.",
  },
  {
    id: 4,
    icon: <CreditCard className="w-10 h-10 text-blue-400" />,
    title: "Digital Trade / Giftcards",
    desc: "We simplify global digital trade through verified giftcard exchange and smart payment experiences.",
  },
];

export default function Services() {
  return (
    <section className="relative w-full py-20 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          What We Do
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-16"
        >
          Fynaro turns ideas into powerful experiences — blending design, technology, and culture to help brands grow with purpose.
        </motion.p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                transition: { type: "spring", stiffness: 200 },
              }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-4"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <a
            href="/services"
            className="inline-block bg-green-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-green-400 transition-all duration-300"
          >
            See Full Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
