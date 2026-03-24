"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CallToAction() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (Math.random() > 0.1) {
      setStatus("success");
      setFormData({ name: "", email: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section 
      className="relative w-full py-28 md:py-36 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/desk office.jpg')`, 
      }}
    >
      {/* Dark overlay + your existing gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Subtle emerald radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.08)_0%,transparent_60%)] mix-blend-soft-light pointer-events-none" />

      {/* Noise/grain texture (optional) */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
        >
          Let’s Build Something Exceptional
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Ready to transform your vision into a powerful digital presence? Share your details — let’s create something extraordinary together.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-3xl mx-auto"
        >
          {/* Name & Email inputs stay exactly the same */}
          <div className="w-full sm:flex-1">
            <label htmlFor="name" className="sr-only">Your name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 text-gray-100 placeholder-gray-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
            />
          </div>

          <div className="w-full sm:flex-1">
            <label htmlFor="email" className="sr-only">Your email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-700/60 text-gray-100 placeholder-gray-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(5,150,105,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg overflow-hidden ${
              status === "success"
                ? "bg-emerald-600/90 cursor-default"
                : status === "error"
                ? "bg-red-600/90"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            }`}
          >
            {status === "loading" ? (
              <span className="animate-pulse">Sending...</span>
            ) : status === "success" ? (
              <>
                Sent <CheckCircle size={20} className="group-hover:rotate-12 transition-transform" />
              </>
            ) : status === "error" ? (
              "Try again"
            ) : (
              <>
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}

            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-sm text-gray-500"
        >
          We respect your privacy — your info stays safe with us.
        </motion.p>
      </div>
    </section>
  );
}