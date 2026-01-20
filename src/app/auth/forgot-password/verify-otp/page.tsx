// app/auth/forgot-password/verify-otp/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

const OTP_LENGTH = 6;

export default function VerifyResetOtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // seconds

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // TODO: replace with real email from your flow (query param / context)
  const email = "you@example.com";

  const code = otp.join("");
  const canSubmit = code.length === OTP_LENGTH && !loading;

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(
      () => setResendTimer((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only digits, max 1 char
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevIndex = index - 1;
      inputRefs.current[prevIndex]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    const next = text.split("");
    while (next.length < OTP_LENGTH) next.push("");
    setOtp(next);
    const lastIndex = text.length - 1;
    if (lastIndex >= 0 && lastIndex < OTP_LENGTH) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // 🔐 Call your backend to verify OTP before allowing password reset
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, otp: code }),
      // });

      console.log("Verifying OTP", { email, otp: code });
      // On success, route to actual reset-password page
      // router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      setResendTimer(30);
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-reset-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      console.log("Resend OTP to", email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_50%,#020205_100%)] flex flex-col">
      {/* Top header */}
      <div className="w-full">
        <HomeHeader />
      </div>

      {/* Centered Fynaro card */}
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
                Enter verification code
              </h1>
              <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-500">
                We&apos;ve sent a 6-digit code to{" "}
                <span className="font-medium text-neutral-800">
                  {email}
                </span>
                . Enter it below to continue resetting your password.
              </p>
            </header>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-4 sm:space-y-5"
            >
              {/* OTP inputs */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-neutral-600 text-center block">
                  6-digit verification code
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={idx === 0 ? handlePaste : undefined}
                      className="h-10 w-9 sm:h-11 sm:w-10 text-center text-sm sm:text-base font-semibold tracking-[0.16em] rounded-2xl border border-neutral-200 bg-white/90 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-center text-neutral-400 mt-1">
                  It may take a few seconds to arrive. Check your spam folder if
                  you don&apos;t see it.
                </p>
              </div>

              {/* Resend + back to login */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] sm:text-xs text-neutral-600">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={`inline-flex items-center gap-1 font-medium ${
                    resendTimer > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-neutral-900 hover:text-black underline underline-offset-2"
                  }`}
                >
                  {resendTimer > 0 ? (
                    <>
                      Resend code in
                      <span className="tabular-nums">
                        0:{resendTimer.toString().padStart(2, "0")}
                      </span>
                    </>
                  ) : (
                    "Resend code"
                  )}
                </button>

                <div className="flex items-center justify-center sm:justify-end gap-1">
                  <FiLock className="w-3 h-3 text-neutral-400" />
                  <Link
                    href="/auth/forgot-password"
                    className="text-neutral-600 hover:text-neutral-900 hover:underline"
                  >
                    Use a different email
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.98 } : undefined}
                className={`mt-1 w-full rounded-2xl py-2.5 text-sm sm:text-[0.95rem] font-medium tracking-tight transition-all ${
                  canSubmit
                    ? "bg-[#111014] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:bg-black"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                }`}
              >
                {loading ? "Verifying code..." : "Verify & continue"}
              </motion.button>

              <p className="pt-1.5 text-[9px] sm:text-[10px] text-center text-neutral-400">
                This one-time code helps us confirm it&apos;s really you.
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
