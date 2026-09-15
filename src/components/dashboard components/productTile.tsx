"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Sparkles,
} from "lucide-react";

type WebPackage = {
  id: "launch" | "growth" | "custom";
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  price: string;
  timeline: string;
  icon: React.ElementType;
  href: string;
  featured?: boolean;
  features: string[];
};

const webPackages: WebPackage[] = [
  {
    id: "launch",
    number: "01",
    name: "Launch",
    eyebrow: "Business Website",
    description:
      "For businesses that need a credible, professional digital presence built around clarity and enquiries.",
    price: "₦350,000",
    timeline: "3–5 weeks",
    icon: Globe2,
    href: "/shop/web-development/launch",
    features: [
      "Custom business website",
      "Up to 5 core pages",
      "Responsive experience",
      "WhatsApp & inquiry flows",
      "SEO foundations",
      "Analytics setup",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth",
    eyebrow: "Commerce & Growth",
    description:
      "For businesses ready to sell, automate and operate more seriously through the web.",
    price: "₦750,000",
    timeline: "5–8 weeks",
    icon: Sparkles,
    href: "/shop/web-development/growth",
    featured: true,
    features: [
      "Advanced custom website",
      "Up to 10 core pages",
      "Ecommerce & payments",
      "Customer workflows",
      "Order functionality",
      "Conversion-focused UX",
    ],
  },
  {
    id: "custom",
    number: "03",
    name: "Custom",
    eyebrow: "Platforms & Systems",
    description:
      "For products and systems that need custom architecture, workflows and deeper functionality.",
    price: "₦1,500,000",
    timeline: "8+ weeks",
    icon: Layers3,
    href: "/shop/web-development/custom",
    features: [
      "Custom architecture",
      "Bespoke functionality",
      "Dashboards & portals",
      "API integrations",
      "Workflow-driven systems",
      "Scoped product proposal",
    ],
  },
];

export default function FynaroWebPackages() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-[1180px]">
        {/* HEADER */}
        <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6cc6d]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                Web Development
              </p>
            </div>

            <h2 className="mt-3 max-w-[620px] text-[28px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#111] sm:text-[34px]">
              Choose the level
              <br className="hidden sm:block" />
              your business needs.
            </h2>

            <p className="mt-3 max-w-[520px] text-[11px] leading-5 text-black/42">
              Three clear starting points for professional websites,
              commerce experiences and custom web products.
            </p>
          </div>

          <Link
            href="/shop/web-development"
            className="group inline-flex w-fit items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
          >
            Explore Web Development

            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* PACKAGE GRID */}
        <div className="grid gap-3 lg:grid-cols-3">
          {webPackages.map((pkg, index) => {
            const Icon = pkg.icon;

            return (
              <motion.div
                key={pkg.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <Link
                  href={pkg.href}
                  className={[
                    "group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[19px] border p-6 transition-all duration-300",
                    pkg.featured
                      ? "border-[#111] bg-[#111] text-white hover:-translate-y-1"
                      : "border-black/[0.08] bg-white text-[#111] hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]",
                  ].join(" ")}
                >
                  {/* FEATURED SIGNATURE */}
                  {pkg.featured && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#d6cc6d]" />
                  )}

                  {/* TOP */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        pkg.featured
                          ? "bg-white/10 text-[#d6cc6d]"
                          : "bg-black/[0.035] text-black/55",
                      ].join(" ")}
                    >
                      <Icon size={14} strokeWidth={1.6} />
                    </div>

                    <div className="text-right">
                      <span
                        className={[
                          "text-[9px] font-semibold",
                          pkg.featured
                            ? "text-white/25"
                            : "text-black/20",
                        ].join(" ")}
                      >
                        {pkg.number}
                      </span>

                      {pkg.featured && (
                        <div className="mt-2">
                          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/55">
                            Recommended
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PACKAGE IDENTITY */}
                  <div className="relative z-10 mt-7">
                    <p
                      className={[
                        "text-[8px] font-semibold uppercase tracking-[0.17em]",
                        pkg.featured
                          ? "text-[#d6cc6d]"
                          : "text-black/30",
                      ].join(" ")}
                    >
                      {pkg.eyebrow}
                    </p>

                    <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                      {pkg.name}
                    </h3>

                    <p
                      className={[
                        "mt-3 max-w-[320px] text-[10px] leading-5",
                        pkg.featured
                          ? "text-white/48"
                          : "text-black/43",
                      ].join(" ")}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* FEATURES */}
                  <div
                    className={[
                      "relative z-10 mt-6 border-t pt-5",
                      pkg.featured
                        ? "border-white/10"
                        : "border-black/[0.07]",
                    ].join(" ")}
                  >
                    <div className="space-y-2.5">
                      {pkg.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5"
                        >
                          <span
                            className={[
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              pkg.featured
                                ? "bg-white/10 text-white/70"
                                : "bg-black/[0.04] text-black/45",
                            ].join(" ")}
                          >
                            <Check size={10} />
                          </span>

                          <span
                            className={[
                              "text-[10px]",
                              pkg.featured
                                ? "text-white/58"
                                : "text-black/50",
                            ].join(" ")}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div
                    className={[
                      "relative z-10 mt-auto flex items-end justify-between gap-5 border-t pt-5",
                      pkg.featured
                        ? "border-white/10"
                        : "border-black/[0.07]",
                    ].join(" ")}
                  >
                    <div>
                      <p
                        className={[
                          "text-[8px] font-semibold uppercase tracking-[0.14em]",
                          pkg.featured
                            ? "text-white/28"
                            : "text-black/28",
                        ].join(" ")}
                      >
                        Starting from
                      </p>

                      <p className="mt-1.5 text-[21px] font-semibold tracking-[-0.035em]">
                        {pkg.price}
                      </p>

                      <p
                        className={[
                          "mt-1 text-[8px]",
                          pkg.featured
                            ? "text-white/28"
                            : "text-black/30",
                        ].join(" ")}
                      >
                        Typical delivery {pkg.timeline}
                      </p>
                    </div>

                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        pkg.featured
                          ? "bg-white text-black"
                          : "bg-[#111] text-white",
                      ].join(" ")}
                    >
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTNOTE */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[700px] text-[9px] leading-4 text-black/30">
            Pricing represents starting scopes. Final investment depends on
            functionality, integrations, content and delivery requirements.
          </p>

          <Link
            href="/shop/requests/new?service=web-development"
            className="group inline-flex items-center gap-1.5 text-[9px] font-semibold text-black/40 transition hover:text-black"
          >
            Need help choosing?

            <ArrowRight
              size={10}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}