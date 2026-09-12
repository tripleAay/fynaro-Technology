
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type WebPackage = {
  id: string;
  number: string;
  name: string;
  description: string;
  price: string;
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
    description:
      "For businesses that need a serious online presence.",
    price: "From ₦350,000",
    icon: Globe2,
    href: "/shop/web-services/launch",
    features: [
      "Custom business website",
      "Up to 5 core pages",
      "Responsive design",
      "WhatsApp & inquiry forms",
      "SEO & analytics setup",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth",
    description:
      "For businesses ready to sell, scale and operate online.",
    price: "From ₦750,000",
    icon: Sparkles,
    href: "/shop/web-services/growth",
    featured: true,
    features: [
      "Advanced custom website",
      "Ecommerce & payments",
      "Up to 10 pages",
      "Customer & order functionality",
      "Conversion-focused experience",
    ],
  },
  {
    id: "custom",
    number: "03",
    name: "Custom",
    description:
      "For products that require something beyond a standard website.",
    price: "From ₦1,500,000",
    icon: Layers3,
    href: "/shop/web-services/custom",
    features: [
      "Custom product architecture",
      "Bespoke functionality",
      "Dashboards & integrations",
      "Built around your workflow",
      "Scoped project proposal",
    ],
  },
];

export default function FynaroWebPackages() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B400]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                Web & Mobile
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#111014] sm:text-3xl">
              Fynaro Web Packages
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
              Choose the level that fits what you&apos;re building.
            </p>
          </div>

          <Link
            href="/shop/web-services"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-1.5
              text-xs
              font-medium
              text-neutral-500
              transition-colors
              hover:text-[#111014]
            "
          >
            View all web packages
            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* Packages */}
        <div className="grid gap-4 md:grid-cols-3">
          {webPackages.map((pkg, index) => {
            const Icon = pkg.icon;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                }}
                className="h-full"
              >
                <Link
                  href={pkg.href}
                  className={`
                    group
                    relative
                    flex
                    h-full
                    min-h-[275px]
                    flex-col
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    p-5
                    transition-all
                    duration-300
                    sm:p-6
                    ${
                      pkg.featured
                        ? "border-[#F5B400]/35 bg-[#111014] text-white shadow-[0_18px_45px_rgba(17,16,20,0.13)]"
                        : "border-black/[0.07] bg-white text-[#111014] hover:border-black/[0.13] hover:shadow-[0_16px_38px_rgba(17,16,20,0.07)]"
                    }
                  `}
                >
                  {/* Featured glow */}
                  {pkg.featured && (
                    <>
                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F5B400]/10 blur-[60px]" />

                      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-white/5 blur-[60px]" />
                    </>
                  )}

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          pkg.featured
                            ? "bg-white/10 text-[#F5B400]"
                            : "bg-black/[0.035] text-neutral-500"
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span
                      className={`
                        text-[9px]
                        font-medium
                        tracking-[0.15em]
                        ${
                          pkg.featured
                            ? "text-white/30"
                            : "text-neutral-300"
                        }
                      `}
                    >
                      {pkg.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="relative z-10 mt-7">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`
                          text-xl
                          font-semibold
                          tracking-[-0.035em]
                          ${
                            pkg.featured
                              ? "text-white"
                              : "text-[#111014]"
                          }
                        `}
                      >
                        {pkg.name}
                      </h3>

                      {pkg.featured && (
                        <span className="rounded-full bg-[#F5B400]/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#F5B400]">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p
                      className={`
                        mt-2
                        max-w-xs
                        text-[12px]
                        leading-5
                        ${
                          pkg.featured
                            ? "text-white/55"
                            : "text-neutral-500"
                        }
                      `}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10 mt-6 space-y-2">
                    {pkg.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={`
                            flex
                            h-4
                            w-4
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${
                              pkg.featured
                                ? "bg-[#F5B400]/10 text-[#F5B400]"
                                : "bg-black/[0.035] text-neutral-400"
                            }
                          `}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </span>

                        <span
                          className={`
                            text-[10px]
                            ${
                              pkg.featured
                                ? "text-white/55"
                                : "text-neutral-500"
                            }
                          `}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom */}
                  <div
                    className={`
                      relative
                      z-10
                      mt-auto
                      flex
                      items-end
                      justify-between
                      border-t
                      pt-5
                      ${
                        pkg.featured
                          ? "border-white/10"
                          : "border-black/[0.06]"
                      }
                    `}
                  >
                    <div>
                      <p
                        className={`
                          text-[9px]
                          uppercase
                          tracking-[0.16em]
                          ${
                            pkg.featured
                              ? "text-white/30"
                              : "text-neutral-300"
                          }
                        `}
                      >
                        Starting
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          font-semibold
                          ${
                            pkg.featured
                              ? "text-white"
                              : "text-[#111014]"
                          }
                        `}
                      >
                        {pkg.price}
                      </p>
                    </div>

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          pkg.featured
                            ? "bg-[#F5B400] text-[#111014] group-hover:translate-x-1"
                            : "bg-black/[0.04] text-neutral-500 group-hover:translate-x-1 group-hover:bg-[#111014] group-hover:text-white"
                        }
                      `}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

