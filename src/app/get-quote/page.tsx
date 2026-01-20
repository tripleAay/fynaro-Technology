// app/get-quote/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/contexts/cartContext"; // ✅ adjust path if needed

const parsePrice = (price: string): number => {
  const numeric = price.replace(/[^\d.]/g, "");
  return Number.parseFloat(numeric || "0");
};

const formatNGN = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function GetQuotePage() {
  const { items } = useCart();
  const [includeCart, setIncludeCart] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { subtotal, itemCount } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + parsePrice(item.price) * (item.quantity ?? 1),
      0
    );
    const countValue = items.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );
    return { subtotal: subtotalValue, itemCount: countValue };
  }, [items]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);

    // 🔐 Hook this into your backend later
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const hasCart = items.length > 0;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Link
            href="/account"
            className="hidden sm:inline-flex text-[11px] sm:text-xs text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            Already a client? Login
          </Link>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Get a project quote
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl">
              Tell us what you want to build — web, brand, print or AutoTech.
              We’ll review and reply with a tailored quote and next steps.
            </p>
          </div>

          <div className="text-right text-[11px] sm:text-xs text-neutral-400">
            <p>Response window</p>
            <p className="font-semibold text-neutral-100">Within 24 hours</p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6 lg:gap-8">
          {/* Left: form */}
          <section className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#101010] to-[#050505] p-4 sm:p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Full name
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="Bam Sun"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@brand.com"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    placeholder="+234 ..."
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Company / Brand (optional)
                  </label>
                  <input
                    name="company"
                    placeholder="Brand or project name"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              {/* Project type / budget / timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Project type
                  </label>
                  <select
                    name="projectType"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                    defaultValue="web"
                  >
                    <option value="web">Web Services</option>
                    <option value="brand">Brand Design</option>
                    <option value="print">Printed Products</option>
                    <option value="autotech">AutoTech</option>
                    <option value="mixed">Mix of services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Budget range
                  </label>
                  <select
                    name="budget"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                    defaultValue="not-sure"
                  >
                    <option value="below-200k">Below ₦200k</option>
                    <option value="200-500k">₦200k – ₦500k</option>
                    <option value="500-1m">₦500k – ₦1m</option>
                    <option value="1m-plus">₦1m and above</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">
                    Ideal timeline
                  </label>
                  <select
                    name="timeline"
                    className="w-full rounded-xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40"
                    defaultValue="flexible"
                  >
                    <option value="asap">ASAP (rush project)</option>
                    <option value="2-4-weeks">2–4 weeks</option>
                    <option value="1-3-months">1–3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Project details */}
              <div>
                <label className="block text-xs text-neutral-300 mb-1.5">
                  Project details
                </label>
                <textarea
                  required
                  name="details"
                  rows={5}
                  placeholder="Share what you have in mind: goals, references, pages, number of items, or specific AutoTech issues..."
                  className="w-full rounded-2xl border border-neutral-700 bg-[#0b0b0c] px-3.5 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 resize-none"
                />
              </div>

              {/* Extra options */}
              <div className="space-y-3">
                <label className="block text-xs text-neutral-300">
                  Extras
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-[11px] sm:text-xs text-neutral-300">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="strategyCall"
                      className="h-3.5 w-3.5 rounded border-neutral-600 bg-[#0b0b0c]"
                    />
                    <span>Include a 30–45 min strategy call</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="maintenance"
                      className="h-3.5 w-3.5 rounded border-neutral-600 bg-[#0b0b0c]"
                    />
                    <span>I’m interested in ongoing support</span>
                  </label>
                </div>

                {hasCart && (
                  <label className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300">
                    <input
                      type="checkbox"
                      checked={includeCart}
                      onChange={(e) => setIncludeCart(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-neutral-600 bg-[#0b0b0c]"
                    />
                    <span>
                      Attach my current cart items to this quote request
                    </span>
                  </label>
                )}
              </div>

              {/* Submit & status */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-white text-black text-sm sm:text-base font-medium px-7 py-2.5 sm:py-3 shadow-lg hover:bg-neutral-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit quote request
                    </>
                  )}
                </motion.button>

                {submitted && !submitting && (
                  <p className="flex items-center gap-2 text-[11px] sm:text-xs text-emerald-300">
                    <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Request received. We’ll review your details and reply via
                    email/WhatsApp.
                  </p>
                )}
              </div>
            </form>
          </section>

          {/* Right: cart + summary */}
          <section className="space-y-4 lg:space-y-5">
            {/* Cart snapshot */}
            <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#151515] to-[#050505] p-4 sm:p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-neutral-300" />
                  <h2 className="text-sm sm:text-base font-medium">
                    Cart snapshot
                  </h2>
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400">
                  {hasCart
                    ? `${itemCount} item${itemCount === 1 ? "" : "s"} in cart`
                    : "No items yet"}
                </span>
              </div>

              {hasCart ? (
                <>
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {items.map((item) => {
                      const lineTotal =
                        parsePrice(item.price) * (item.quantity ?? 1);
                      return (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-3 text-[11px] sm:text-xs text-neutral-200 border-b border-neutral-800/70 pb-2 last:border-b-0 last:pb-0"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-neutral-500">
                              Qty:{" "}
                              <span className="font-medium">
                                {item.quantity ?? 1}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatNGN(lineTotal)}
                            </p>
                            <p className="text-[10px] text-neutral-500">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] sm:text-xs text-neutral-300">
                    <span>Estimated cart value</span>
                    <span className="font-semibold">
                      {formatNGN(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] sm:text-[11px] text-neutral-500">
                    We’ll use your cart as a reference for specs and quantity,
                    then confirm final pricing in your quote.
                  </p>
                </>
              ) : (
                <p className="text-[11px] sm:text-xs text-neutral-400">
                  You haven’t added anything yet. You can still request a quote,
                  or{" "}
                  <Link
                    href="/shop"
                    className="text-neutral-100 underline underline-offset-2"
                  >
                    browse products
                  </Link>{" "}
                  and come back.
                </p>
              )}
            </div>

            {/* Small help box */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0b0b0c] p-4 sm:p-5 text-[11px] sm:text-xs text-neutral-300">
              <p className="font-medium text-neutral-100 mb-1.5">
                How quotes work
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-neutral-400">
                <li>We review your details and any cart items.</li>
                <li>
                  You get a clear breakdown – scope, timeline, and pricing.
                </li>
                <li>
                  If it’s a fit, we move to invoice and kickoff via email or
                  WhatsApp.
                </li>
              </ul>
            </div>

            {/* Login / signup hint */}
            <div className="text-[11px] sm:text-xs text-neutral-400">
              <span className="mr-1">New here?</span>
              <Link
                href="/signup"
                className="text-neutral-100 underline underline-offset-2"
              >
                Create an account
              </Link>
              <span className="mx-1">or</span>
              <Link
                href="/login"
                className="text-neutral-100 underline underline-offset-2"
              >
                login
              </Link>
              <span> to track all your quotes and orders.</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
