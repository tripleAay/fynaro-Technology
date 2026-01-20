"use client";

import { motion } from "framer-motion";
import { Cpu, PenTool, Package, Gift } from "lucide-react";

const features = [
  {
    icon: <Cpu size={32} />,
    title: "Creative Tech Solutions",
    description: "We combine innovation and technology to build digital experiences that wow and perform.",
  },
  {
    icon: <PenTool size={32} />,
    title: "Branding That Sells",
    description: "We craft visual identities and brand stories that captivate and convert audiences.",
  },
  {
    icon: <Package size={32} />,
    title: "Luxury Web Design",
    description: "Our websites are sleek, modern, and optimized for both performance and aesthetics.",
  },
  {
    icon: <Gift size={32} />,
    title: "Custom Digital Products",
    description: "From giftcards to digital assets, we create premium products tailored to your brand.",
  },
];

export default function WhyFynaro() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Why Fynaro?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16"
        >
          Fynaro exists to push the boundaries of creativity and technology. Here’s why we stand out:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl cursor-pointer"
            >
              <div className="text-indigo-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
