"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-[#0b0b0c] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d6cc6d]">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white md:text-5xl">
            Start a conversation
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/55">
            Tell me what you need.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          onSubmit={handleSubmit}
          className="mt-14 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#d6cc6d]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#d6cc6d]"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white placeholder:text-white/30 outline-none resize-none transition focus:border-[#d6cc6d]"
          />

          <div className="flex justify-center md:justify-start">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#d6cc6d] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Send message
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}