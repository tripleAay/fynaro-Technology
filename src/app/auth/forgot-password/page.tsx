// app/reset-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // later you can grab a token from the URL (e.g. /reset-password?token=...)
  // and send it with the request to your backend.
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");

  const passwordsValid =
    password.trim().length >= 6 &&
    confirmPassword.trim().length >= 6 &&
    password === confirmPassword;

  const canSubmit = passwordsValid && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: call your API:
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password }),
      // });

      console.log({
        password,
        confirmPassword,
      });
    } catch (err) {
      console.error(err);
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

      {/* Centered, compact card – same structure as login */}
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

            {/* Header – aligned with login/signup */}
            <header className="relative mb-4 sm:mb-5 text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-500 mx-auto mb-2">
                Fynaro Studio
              </span>
              <h1 className="text-xl sm:text-[1.4rem] font-semibold text-neutral-900 tracking-tight">
                Reset your password
              </h1>
              <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-500">
                Choose a new password to secure your account.{" "}
                <span className="hidden sm:inline">
                  Make sure it&apos;s something only you remember.
                </span>
              </p>
            </header>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-3.5 sm:space-y-4"
            >
              {/* New password */}
              <div className="space-y-1">
                <label
                  htmlFor="newPassword"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  New password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <FiLock className="w-4 h-4" />
                  </span>
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a new password"
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
                <p className="text-[10px] text-neutral-400">
                  Minimum 6 characters. Use a mix of letters and numbers.
                </p>
              </div>

              {/* Confirm password */}
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-[11px] font-medium text-neutral-600"
                >
                  Confirm new password
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
                    placeholder="Repeat your new password"
                    className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-9 pr-9 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
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
                {!passwordsValid && confirmPassword.length > 0 && (
                  <p className="text-[10px] text-red-500">
                    Passwords must match and be at least 6 characters.
                  </p>
                )}
              </div>

              {/* Back to login link */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-600">
                <span className="text-neutral-500">
                  Remember your password?
                </span>
                <Link
                  href="/auth/login"
                  className="font-medium text-neutral-800 hover:text-black hover:underline"
                >
                  Back to login
                </Link>
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
                {loading ? "Updating password..." : "Update my password"}
              </motion.button>

              <p className="pt-1.5 text-[9px] sm:text-[10px] text-center text-neutral-400">
                Your new password will secure all future access to Fynaro.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
