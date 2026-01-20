"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CallToAction() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <section className="relative w-full py-24 bg-black text-white overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('/digital.jpg')] bg-cover bg-center opacity-10 mix-blend-soft-light" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let’s Build Your Brand Together
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 text-lg mb-10"
        >
          Ready to elevate your online presence? Drop your details below and let’s craft
          something powerful.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-[#22201E] text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition-all"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-[#22201E] text-gray-100 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition-all"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            type="submit"
            className="bg-green-500 text-[#191716] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-green-400 transition-all"
          >
            Get Started
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
