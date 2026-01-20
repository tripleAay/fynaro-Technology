"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    brand: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f10] to-[#141313] text-white flex flex-col">
      {/* ✅ Navigation */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-5 backdrop-blur-md bg-black/10 z-10">
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-400 hover:text-green-500 transition-all"
        >
          Fynaro
        </Link>
        <div className="flex gap-4 text-sm sm:text-base">
          <Link href="/" className="text-gray-300 hover:text-green-400 transition">
            Home
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-green-400 transition">
            Services
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-green-400 transition">
            Contact
          </Link>
        </div>
      </nav>

      {/* ✅ Hero */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 mt-24 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4"
        >
          Start Your Journey with Fynaro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-lg text-gray-300 max-w-2xl mb-10"
        >
          Whether you’re a new visionary or returning partner, let’s collaborate to shape your success.
        </motion.p>

        {/* ✅ Sign In Link First */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/signin"
            className="inline-block px-6 py-3 border border-green-400 text-green-400 rounded-xl hover:bg-green-400 hover:text-black font-medium transition-all"
          >
            Already have an account? Sign In
          </Link>
        </motion.div>

        {/* ✅ Create Account Form */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-3xl bg-[#191716] p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-5"
          >
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              Create Your Account
            </h2>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
              />
            </div>

            {/* Passwords */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
              />
            </div>

            {/* Extra Info */}
            <input
              type="text"
              name="brand"
              placeholder="Brand or Business Name (optional)"
              value={formData.brand}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all"
            >
              <option value="" disabled>Select Service of Interest</option>
              <option value="creative-tech">Creative Tech Solutions</option>
              <option value="branding">Branding That Sells</option>
              <option value="design">Innovative Design</option>
              <option value="growth">Results & Growth</option>
              <option value="strategy">Strategy & Consulting</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us briefly about your project or goals..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="px-4 py-4 rounded-xl bg-[#22201E] border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all resize-none"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] px-6 py-4 rounded-xl text-black font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Create Account & Get Started
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-10 bg-[#191716] p-10 rounded-2xl shadow-2xl max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-400">Thank You!</h2>
            <p className="text-gray-300 mb-6">
              Your account has been created successfully. We’ll reach out shortly to onboard you.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-xl text-black font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
