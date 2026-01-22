"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

const OTP_LENGTH = 6;

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams?.get("email") ?? "";
  const email = emailParam.toLowerCase();

  const [otpValues, setOtpValues] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null));

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    const next = [...otpValues];
    next[index] = value;
    setOtpValues(next);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!digits.length) return;

    const next = Array(OTP_LENGTH).fill("");
    digits.forEach((d, i) => (next[i] = d));
    setOtpValues(next);

    inputsRef.current[Math.min(digits.length, OTP_LENGTH) - 1]?.focus();
  };

  const code = otpValues.join("");
  const canSubmit = code.length === OTP_LENGTH && !submitting && !!email;

  const maskedEmail = (() => {
    if (!email.includes("@")) return email;
    const [name, domain] = email.split("@");
    return name.length <= 2
      ? `${name[0]}***@${domain}`
      : `${name[0]}***${name.at(-1)}@${domain}`;
  })();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMsg(data?.message || "Could not verify email.");
        return;
      }

      setSuccessMsg("✅ Email verified! Redirecting...");
      setTimeout(() => router.push("/auth/login"), 1200);
    } catch {
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email || resending) return;

    setResending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setErrorMsg("Could not resend code.");
        return;
      }

      setSuccessMsg("✅ A new code has been sent.");
    } catch {
      setErrorMsg("Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#BFBDC1] flex flex-col">
      <HomeHeader />

      <div className="flex-1 flex items-center justify-center mt-30 mb-15 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-neutral-900 px-8 py-10 shadow-2xl border border-neutral-700">
            <header className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Verify your email</h1>
              <p className="text-sm text-neutral-400 mt-1">
                Enter the code sent to <span className="font-medium">{maskedEmail}</span>
              </p>
            </header>

            <form onSubmit={handleVerify} className="space-y-5">
              <div className="flex justify-between gap-3">
                {otpValues.map((v, i) => (
                  <input
                    key={i}
                    ref={(el: HTMLInputElement | null) => {
                      if (inputsRef.current) inputsRef.current[i] = el;
                    }}
                    value={v}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center border border-neutral-600 rounded-xl bg-neutral-800 text-white font-semibold text-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                ))}
              </div>

              {errorMsg && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}
              {successMsg && <p className="text-xs text-emerald-500 text-center">{successMsg}</p>}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-3 rounded-xl text-white font-medium text-sm transition ${
                  canSubmit ? "bg-indigo-600 hover:bg-indigo-700" : "bg-neutral-700 cursor-not-allowed"
                }`}
              >
                {submitting ? "Verifying..." : "Verify email"}
              </button>

              <div className="text-center text-xs text-neutral-400 mt-2">
                Didn&apos;t get it?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="underline font-medium hover:text-white transition"
                >
                  {resending ? "Resending..." : "Resend code"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
