"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    console.log("Sign in attempted:", formData);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f10] to-[#141313] text-white flex flex-col">
      {/* ✅ Navigation */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-5 bg-transparent z-10">
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-400 hover:text-green-500 transition-all"
        >
          Fynaro
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-300 hover:text-green-400 transition-all">
            Home
          </Link>
          <Link
            href="/services"
            className="text-gray-300 hover:text-green-400 transition-all"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-green-400 transition-all"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* ✅ Sign-In Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 mt-24 py-16">
        {!submitted ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3"
            >
              Welcome Back to Fynaro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center text-base sm:text-lg text-gray-300 max-w-md mb-6"
            >
              Continue your journey with confidence. Sign in to access your dashboard.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full max-w-sm bg-[#191716] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-4"
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 text-white 
                focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all text-sm"
              />

              {/* 🔒 Password Input with Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#22201E] border border-gray-700 text-white 
                  focus:border-green-500 focus:ring-2 focus:ring-green-400 transition-all pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-all"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className={`mt-2 px-5 py-3 rounded-xl text-black font-semibold shadow-lg transition-all text-base flex items-center justify-center ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <motion.span
                    className="flex items-center gap-2 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Signing In...
                  </motion.span>
                ) : (
                  "Sign In"
                )}
              </motion.button>

              <p className="text-center text-gray-400 mt-4 text-xs sm:text-sm">
                Don’t have an account?{" "}
                <Link
                  href="/get-started"
                  className="text-green-400 hover:underline hover:text-green-300 transition-all"
                >
                  Get Started
                </Link>
              </p>
            </motion.form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-10 bg-[#191716] p-8 rounded-2xl shadow-2xl max-w-sm"
          >
            <h2 className="text-xl font-bold mb-3 text-green-400">Welcome Back!</h2>
            <p className="text-gray-300 mb-5 text-sm">
              You’ve successfully signed in. Redirecting to your dashboard...
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-3 bg-gradient-to-r from-[#22C55E] to-[#16A34A] 
              rounded-xl text-black font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
