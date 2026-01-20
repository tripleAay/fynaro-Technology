"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "../../components/header";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#191716] to-[#0f0f10] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <Header />

        {/* ✅ Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-56 h-80 bg-[#1f1e1d] rounded-2xl flex items-center justify-center text-gray-500 text-sm border border-gray-700">
            Human Figure
          </div>
        </motion.div>

        {/* ✅ Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 bg-[#22201E]/70 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Let’s Build Something Amazing Together
          </h2>
          <p className="mb-6 text-gray-400 text-center text-sm">
            We respond within 24 hours — tell us about your project.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg bg-[#191716] text-white border border-gray-700 
              focus:border-green-500 focus:ring-1 focus:ring-green-400 outline-none text-sm transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg bg-[#191716] text-white border border-gray-700 
              focus:border-green-500 focus:ring-1 focus:ring-green-400 outline-none text-sm transition-all"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg bg-[#191716] text-white border border-gray-700 
              focus:border-green-500 focus:ring-1 focus:ring-green-400 outline-none text-sm transition-all resize-none h-28"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="mt-3 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#191716] font-medium 
              px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
            >
              Send Message →
            </motion.button>
          </form>

          {/* ✅ Contact Info */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-500" />
              <span>hello@fynaro.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>Ibadan, Nigeria</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ Floating Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1/3 h-1/3 absolute top-10 left-10 border-l border-t border-green-500/30 rounded-full animate-pulse"></div>
        <div className="w-1/4 h-1/4 absolute bottom-10 right-10 border-r border-b border-green-500/30 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
}
