"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import {
  useSearchParams,
} from "next/navigation";

import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  motion,
} from "framer-motion";

import Turnstile from "react-turnstile";

import HomeHeader from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

export default function LoginPage() {
  const searchParams =
    useSearchParams();

  // ============================================================
  // SAFE REDIRECT
  // ============================================================

  const nextPath =
    searchParams.get("next");

  const safeNextPath =
    nextPath &&
    nextPath.startsWith("/") &&
    !nextPath.startsWith("//")
      ? nextPath
      : "/shop";

  // ============================================================
  // HYDRATION
  // ============================================================

  const [
    mounted,
    setMounted,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================================================
  // FORM STATE
  // ============================================================

  const [
    emailOrUsername,
    setEmailOrUsername,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    rememberMe,
    setRememberMe,
  ] = useState(true);

  // ============================================================
  // TURNSTILE
  // ============================================================

  const [
    turnstileToken,
    setTurnstileToken,
  ] = useState<string | null>(
    null
  );

  const isProduction =
    process.env.NODE_ENV ===
    "production";

  const siteKey =
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    "";

  // ============================================================
  // REQUEST STATE
  // ============================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    errorMsg,
    setErrorMsg,
  ] = useState<string | null>(
    null
  );

  // ============================================================
  // VALIDATION
  // ============================================================

  const canSubmit =
    emailOrUsername
      .trim()
      .length > 0 &&
    password
      .trim()
      .length > 0 &&
    (
      !isProduction ||
      Boolean(
        turnstileToken
      )
    ) &&
    !loading;

  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit =
    async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (!canSubmit) {
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        // ======================================================
        // LOGIN THROUGH NEXT.JS
        //
        // Browser -> Next.js -> Express
        // ======================================================

        const response =
          await fetch(
            "/api/auth/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    emailOrUsername:
                      emailOrUsername.trim(),

                    password,

                    rememberMe,

                    turnstileToken:
                      isProduction
                        ? turnstileToken
                        : null,
                  }
                ),
            }
          );

        const data =
          await response
            .json()
            .catch(
              () => ({})
            );

        console.log(
          "FYNARO LOGIN:",
          data
        );

        // ======================================================
        // LOGIN FAILED
        // ======================================================

        if (!response.ok) {
          console.error(
            "Fynaro login failed:",
            {
              status:
                response.status,

              data,
            }
          );

          setErrorMsg(
            data?.message ||
              "Login failed. Please try again."
          );

          if (
            isProduction
          ) {
            setTurnstileToken(
              null
            );
          }

          return;
        }

        // ======================================================
        // CONFIRM NEXT.JS PROXY
        // ======================================================

        if (
          data?.source !==
          "next-proxy"
        ) {
          console.error(
            "Wrong authentication endpoint:",
            data
          );

          setErrorMsg(
            "Fynaro authentication is still using the old login endpoint."
          );

          return;
        }

        // ======================================================
        // VERIFY SESSION
        //
        // Confirms Next.js successfully created fynaro_token.
        // ======================================================

        const meResponse =
          await fetch(
            "/api/auth/me",
            {
              method:
                "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache:
                "no-store",
            }
          );

        const meData =
          await meResponse
            .json()
            .catch(
              () => ({})
            );

        console.log(
          "FYNARO SESSION:",
          meData
        );

        // ======================================================
        // SESSION FAILED
        // ======================================================

        if (
          !meResponse.ok ||
          !meData?.user
        ) {
          console.error(
            "Fynaro session verification failed:",
            {
              status:
                meResponse.status,

              data:
                meData,
            }
          );

          setErrorMsg(
            meData?.message ||
              "Login succeeded, but Fynaro could not create your session."
          );

          if (
            isProduction
          ) {
            setTurnstileToken(
              null
            );
          }

          return;
        }

        // ======================================================
        // SESSION CONFIRMED
        // ======================================================

        if (
          meData.user
            .fullName
        ) {
          localStorage.setItem(
            "fynaro_name",
            meData.user
              .fullName
          );
        }

        // ======================================================
        // REDIRECT
        //
        // /auth/login
        //       -> /shop
        //
        // /auth/login?next=/admin
        //       -> /admin
        //
        // AdminLayout performs the final admin role check.
        // ======================================================

        window.location.href =
          safeNextPath;
      } catch (
        error
      ) {
        console.error(
          "Fynaro login request error:",
          error
        );

        setErrorMsg(
          "Unable to connect to Fynaro. Please try again."
        );

        if (
          isProduction
        ) {
          setTurnstileToken(
            null
          );
        }
      } finally {
        setLoading(false);
      }
    };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <div className="fixed inset-0 pointer-events-none -z-10">
        <img
          src="/images/paul-earle-wVjd0eWNqI8-unsplash.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.08]"
        />
      </div>

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="relative z-20 w-full">
        <HomeHeader />
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10 py-20 md:py-24 lg:py-28">
        {!mounted ? (
          <LoginSkeleton />
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
              scale: 0.99,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.45,
              ease:
                "easeOut",
            }}
            className="w-full max-w-sm sm:max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_60px_rgba(0,0,0,0.5)] border border-neutral-200/80 px-5 sm:px-7 py-4 sm:py-5">
              {/* Decorative glows */}

              <div className="pointer-events-none absolute -top-14 -right-14 h-24 w-24 rounded-full bg-[#F5B400]/25 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-16 -left-10 h-24 w-24 rounded-full bg-[#111014]/10 blur-3xl" />

              {/* ================================================== */}
              {/* HEADER */}
              {/* ================================================== */}

              <header className="relative mb-4 sm:mb-5 text-center">
                <span className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-500 mx-auto mb-2">
                  Fynaro Studio
                </span>

                <h1 className="text-xl sm:text-[1.4rem] font-semibold text-neutral-900 tracking-tight">
                  Access your
                  account
                </h1>

                <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-500">
                  Don&apos;t have an
                  account?{" "}

                  <Link
                    href="/auth/signup"
                    className="font-medium text-neutral-900 hover:text-black hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </header>

              {/* ================================================== */}
              {/* ERROR */}
              {/* ================================================== */}

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700"
                >
                  {errorMsg}
                </div>
              )}

              {/* ================================================== */}
              {/* FORM */}
              {/* ================================================== */}

              <form
                onSubmit={
                  handleSubmit
                }
                className="relative space-y-3.5 sm:space-y-4"
                noValidate
              >
                {/* ================================================ */}
                {/* EMAIL / USERNAME */}
                {/* ================================================ */}

                <div className="space-y-1">
                  <label
                    htmlFor="emailOrUsername"
                    className="text-[11px] font-medium text-neutral-600"
                  >
                    Username
                    or email
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none">
                      <FiUser
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </span>

                    <input
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type="text"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={
                        false
                      }
                      value={
                        emailOrUsername
                      }
                      onChange={(
                        event
                      ) => {
                        setEmailOrUsername(
                          event
                            .target
                            .value
                        );

                        if (
                          errorMsg
                        ) {
                          setErrorMsg(
                            null
                          );
                        }
                      }}
                      placeholder="Enter your username or email"
                      className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-9 pr-8 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                    />

                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-300 pointer-events-none">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-300" />
                    </span>
                  </div>
                </div>

                {/* ================================================ */}
                {/* PASSWORD */}
                {/* ================================================ */}

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-medium text-neutral-600"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none">
                      <FiLock
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </span>

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={
                        password
                      }
                      onChange={(
                        event
                      ) => {
                        setPassword(
                          event
                            .target
                            .value
                        );

                        if (
                          errorMsg
                        ) {
                          setErrorMsg(
                            null
                          );
                        }
                      }}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-9 pr-10 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#111014] focus:border-[#111014] transition-all"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      aria-pressed={
                        showPassword
                      }
                      onClick={() =>
                        setShowPassword(
                          (
                            previous
                          ) =>
                            !previous
                        )
                      }
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

                {/* ================================================ */}
                {/* REMEMBER ME / FORGOT PASSWORD */}
                {/* ================================================ */}

                <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs">
                  <label className="flex items-center gap-2 text-neutral-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={
                        rememberMe
                      }
                      onChange={(
                        event
                      ) =>
                        setRememberMe(
                          event
                            .target
                            .checked
                        )
                      }
                      className="sr-only peer"
                    />

                    <span
                      className={`relative inline-flex h-4 w-7 items-center rounded-full border transition-colors ${
                        rememberMe
                          ? "bg-[#111014] border-[#111014]"
                          : "bg-neutral-200 border-neutral-300"
                      }`}
                    >
                      <span
                        className={`absolute h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
                          rememberMe
                            ? "translate-x-[14px]"
                            : "translate-x-[2px]"
                        }`}
                      />
                    </span>

                    <span>
                      Remember me
                    </span>
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-neutral-600 hover:text-neutral-900 hover:underline"
                  >
                    Forgot
                    password?
                  </Link>
                </div>

                {/* ================================================ */}
                {/* TURNSTILE */}
                {/* ================================================ */}

                {isProduction && (
                  <div className="mt-1 rounded-2xl px-3.5 py-2.5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-center">
                      {siteKey ? (
                        <Turnstile
                          sitekey={
                            siteKey
                          }
                          onSuccess={(
                            token
                          ) => {
                            setTurnstileToken(
                              token
                            );

                            setErrorMsg(
                              null
                            );
                          }}
                          onError={() => {
                            setTurnstileToken(
                              null
                            );

                            setErrorMsg(
                              "Human verification could not be completed. Please try again."
                            );
                          }}
                          onExpire={() => {
                            setTurnstileToken(
                              null
                            );
                          }}
                        />
                      ) : (
                        <p className="text-[10px] text-red-500 text-center">
                          Security
                          verification
                          is temporarily
                          unavailable.
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-neutral-400 mt-0.5">
                      <span className="font-semibold text-neutral-500">
                        Fynaro Shield
                      </span>

                      {turnstileToken && (
                        <span>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* ================================================ */}
                {/* SUBMIT */}
                {/* ================================================ */}

                <motion.button
                  type="submit"
                  disabled={
                    !canSubmit
                  }
                  whileHover={
                    canSubmit
                      ? {
                          scale:
                            1.01,
                        }
                      : undefined
                  }
                  whileTap={
                    canSubmit
                      ? {
                          scale:
                            0.98,
                        }
                      : undefined
                  }
                  className={`mt-3 w-full rounded-2xl py-2.5 text-sm sm:text-[0.95rem] font-medium tracking-tight transition-all ${
                    canSubmit
                      ? "bg-[#111014] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:bg-black"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  {loading
                    ? "Accessing..."
                    : "Access My Account"}
                </motion.button>

                <p className="pt-1.5 text-[9px] sm:text-[10px] text-center text-neutral-400">
                  Secure login
                  for Fynaro
                  clients and
                  collaborators.
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <div className="relative z-10">
        {mounted && (
          <Footer />
        )}
      </div>
    </main>
  );
}

// ============================================================
// HYDRATION-SAFE SKELETON
// ============================================================

function LoginSkeleton() {
  return (
    <div className="w-full max-w-sm sm:max-w-md">
      <div className="relative overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_60px_rgba(0,0,0,0.5)] border border-neutral-200/80 px-5 sm:px-7 py-4 sm:py-5">
        <header className="mb-4 sm:mb-5 text-center">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-[10px] font-medium tracking-[0.16em] uppercase text-neutral-500 mb-2">
            Fynaro Studio
          </span>

          <div className="mx-auto h-6 w-44 rounded-lg bg-neutral-200 animate-pulse" />

          <div className="mx-auto mt-2 h-3 w-40 rounded bg-neutral-100 animate-pulse" />
        </header>

        <div className="space-y-4">
          <div>
            <div className="mb-1 h-3 w-24 rounded bg-neutral-100 animate-pulse" />

            <div className="h-10 w-full rounded-2xl bg-neutral-100 animate-pulse" />
          </div>

          <div>
            <div className="mb-1 h-3 w-16 rounded bg-neutral-100 animate-pulse" />

            <div className="h-10 w-full rounded-2xl bg-neutral-100 animate-pulse" />
          </div>

          <div className="h-10 w-full rounded-2xl bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}