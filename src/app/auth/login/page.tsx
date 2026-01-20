"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import Turnstile from "react-turnstile";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function LoginPage() {
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const canSubmit =
    emailOrUsername.trim().length > 0 &&
    password.trim().length > 0 &&
    !!turnstileToken &&
    !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 🔐 send everything backend needs
          body: JSON.stringify({
            emailOrUsername,
            password,
            rememberMe,
            turnstileToken,
          }),
          // if your backend sets httpOnly cookies for JWT/session
          credentials: "include",
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          data?.message ||
          (res.status === 401
            ? "Invalid credentials. Please check your details."
            : "Login failed. Please try again.");
        setErrorMsg(message);
        setTurnstileToken(null);
        return;
      }

      // ✅ optionally store token or user in localStorage if your API returns them
      if (data?.token) {
        localStorage.setItem("fynaro_token", data.token);
      }
      if (data?.user?.fullName) {
        localStorage.setItem("fynaro_name", data.user.fullName);
      }

      // redirect to your dashboard or home
      router.push("/shop"); // change if your route is different
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong. Please try again.");
      setTurnstileToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_50%,#020205_100%)] flex flex-col">
      {/* Top header */}
      <div className="w-full">
        <HomeHeader />
      </div>

      {/* Centered, smaller card */}
      <div className="flex-1 flex mt-26 items-center justify-center px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_60px_rgba(0,0,0,0.5)] border border-neutral-200/80 px-5 sm:px-7 py-4 sm:py-5">
            {/* subtle glows */}
            <div className="pointer-events-none absolute -top-14 -right-14 h-24 w-24 rounded-full bg-[#F5B400]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-24 w-24 rounded-full bg-[#111014]/10 blur-3xl" />

            {/* Header */}
            <header className="relative mb-4 sm:mb-5 text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-500 mx-auto mb-2">
                Fynaro Studio
              </span>
              <h1 className="text-xl sm:text-[1.4rem] font-semibold text-neutral-900 tracking-tight">
                Access your account
              </h1>
              <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-neutral-900 hover:text-black hover:underline"
                >
                  Register
                </Link>
              </p>
            </header>

            {/* Error message */}
            {errorMsg && (
              <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-3.5 sm:space-y-4"
            >
              {/* Username / email */}
              <div className="space-y-1">
                <label
                  htmlFor="emailOrUsername"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Username or email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <input
                    id="emailOrUsername"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="Enter your username or email"
                    className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-9 pr-8 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-300">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiLock className="w-4 h-4" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-9 pr-9 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setRememberMe((prev) => !prev)}
                  className="flex items-center gap-2 text-neutral-800"
                >
                  <span
                    className={`relative inline-flex h-4 w-7 items-center rounded-full border transition-colors ${
                      rememberMe
                        ? "bg-[#111014] border-[#111014]"
                        : "bg-neutral-200 border-neutral-300"
                    }`}
                  >
                    <span
                      className={`absolute h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
                        rememberMe ? "translate-x-[14px]" : "translate-x-[2px]"
                      }`}
                    />
                  </span>
                  <span>Remember me</span>
                </button>

                <Link
                  href="/auth/forgot-password"
                  className="text-neutral-600 hover:text-neutral-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Turnstile - tighter box */}
              <div className="mt-1 rounded-2xl px-3.5 py-2.5 flex flex-col gap-1.5">
                <div className="flex items-center justify-center">
                  {siteKey ? (
                    <Turnstile
                      sitekey={siteKey}
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                      }}
                      onError={() => {
                        setTurnstileToken(null);
                      }}
                      onExpire={() => {
                        setTurnstileToken(null);
                      }}
                    />
                  ) : (
                    <p className="text-[10px] text-red-500 text-center">
                      Missing Turnstile key. Set{" "}
                      <code className="px-1 bg-red-50 border border-red-100 rounded">
                        NEXT_PUBLIC_TURNSTILE_SITE_KEY
                      </code>{" "}
                      in your env.
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center text-[9px] text-neutral-400 mt-0.5">
                  <span className="font-semibold text-neutral-500">
                    Fynaro Shield
                  </span>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.98 } : undefined}
                className={`mt-3 w-full rounded-2xl py-2.5 text-sm sm:text-[0.95rem] font-medium tracking-tight transition-all ${
                  canSubmit
                    ? "bg-[#111014] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:bg-black"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                }`}
              >
                {loading ? "Accessing..." : "Access My Account"}
              </motion.button>

              <p className="pt-1.5 text-[9px] sm:text-[10px] text-center text-neutral-400">
                Secure login for Fynaro clients and collaborators.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}