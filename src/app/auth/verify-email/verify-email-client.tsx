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

  // Safe access — handle null case
  const emailParam = searchParams?.get("email") ?? "";
  const email = emailParam.toLowerCase();

  const [otpValues, setOtpValues] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMsg(data?.message || "Could not verify email.");
        return;
      }

      setSuccessMsg("Email verified. Redirecting...");
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        setErrorMsg("Could not resend code.");
        return;
      }

      setSuccessMsg("A new code has been sent.");
    } catch {
      setErrorMsg("Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a1a25,#020205)] flex flex-col">
      <HomeHeader />

      <div className="flex-1 flex items-center justify-center px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-white px-6 py-6 shadow-xl">
            <header className="text-center mb-4">
              <h1 className="text-lg font-semibold">Verify your email</h1>
              <p className="text-xs text-neutral-500 mt-1">
                We&apos;ve sent a code to{" "}
                <span className="font-medium">{maskedEmail}</span>
              </p>
            </header>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex justify-between gap-1.5">
                {otpValues.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el; // fixed: void return
                    }}
                    value={v}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className="w-10 h-11 text-center border rounded-xl font-semibold"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 text-center">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-xs text-emerald-600 text-center">
                  {successMsg}
                </p>
              )}

              <button
                disabled={!canSubmit}
                className={`w-full py-2.5 rounded-xl text-sm font-medium ${
                  canSubmit
                    ? "bg-black text-white"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {submitting ? "Verifying..." : "Verify email"}
              </button>

              <div className="text-center text-xs text-neutral-500">
                Didn&apos;t get it?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="underline font-medium"
                >
                  {resending ? "Resending..." : "Resend"}
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