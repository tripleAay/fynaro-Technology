// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit =
    fullName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(email) &&
    password.trim().length >= 6 &&
    confirmPassword === password &&
    agree &&
    !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            agree,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMsg(data?.message || "Could not create your account.");
        return;
      }

      // ✅ Success – backend created user & sent OTP to email
      // Redirect to your email verification page with the email in the query
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(email.toLowerCase())}`
      );
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: connect to your Google OAuth flow
    console.log("Sign up with Google clicked");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_50%,#020205_100%)] flex flex-col">
      {/* Top header */}
      <div className="w-full">
        <HomeHeader />
      </div>

      {/* Centered, compact card (same layout as login) */}
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

            {/* Header – mirrored from login */}
            <header className="relative mb-4 sm:mb-5 text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-500 mx-auto mb-2">
                Fynaro Studio
              </span>
              <h1 className="text-xl sm:text-[1.4rem] font-semibold text-neutral-900 tracking-tight">
                Create your account
              </h1>
              <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-neutral-900 hover:text-black hover:underline"
                >
                  Log in
                </Link>
              </p>
            </header>

            {/* Google signup – tightened to match card style */}
            <motion.button
              type="button"
              onClick={handleGoogleSignup}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-[12px] sm:text-sm font-medium text-neutral-800 shadow-sm hover:border-neutral-300 hover:bg-neutral-50 transition-all"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-neutral-300 text-[11px] font-semibold">
                G
              </span>
              <span>Sign up with Google</span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px flex-1 bg-neutral-200" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                Or continue with email
              </span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Form – compact like login */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-3.5 sm:space-y-4"
            >
              {/* Full name */}
              <div className="space-y-1">
                <label
                  htmlFor="fullName"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Full name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-9 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-9 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                  />
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
                    placeholder="Create a password"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-9 pr-10 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
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
                <p className="text-[10px] text-neutral-400">
                  Minimum 6 characters. Use a mix of letters and numbers.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiLock className="w-4 h-4" />
                  </span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-9 pr-10 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms / consent */}
              <button
                type="button"
                onClick={() => setAgree((prev) => !prev)}
                className="flex items-start gap-2 text-[10px] sm:text-[11px] text-neutral-700 text-left"
              >
                <span
                  className={`mt-[2px] flex h-4 w-4 items-center justify-center rounded-[6px] border transition-colors ${
                    agree
                      ? "bg-[#111014] border-[#111014]"
                      : "bg-white border-neutral-300"
                  }`}
                >
                  {agree && (
                    <span className="h-2.5 w-2.5 rounded-[4px] bg-white" />
                  )}
                </span>
                <span>
                  I agree to the{" "}
                  <span className="underline underline-offset-2">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="underline underline-offset-2">
                    Privacy Policy
                  </span>
                  .
                </span>
              </button>

              {/* Error message from backend */}
              {errorMsg && (
                <p className="text-[11px] text-red-500 text-center">
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.98 } : undefined}
                className={`mt-2 w-full rounded-2xl py-2.5 text-sm sm:text-[0.95rem] font-medium tracking-tight transition-all ${
                  canSubmit
                    ? "bg-[#111014] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:bg-black"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                }`}
              >
                {loading
                  ? "Creating your account..."
                  : "Create my Fynaro account"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer – same as login layout */}
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
