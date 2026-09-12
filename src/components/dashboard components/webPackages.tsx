"use client";

import { motion } from "framer-motion";
import {
ArrowUpRight,
Check,
Globe2,
Layers3,
Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";

type WebPackage = {
id: string;
number: string;
name: string;
description: string;
price: string;
icon: ElementType;
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
return ( <section className="px-4 py-10 sm:px-6 sm:py-14"> <div className="mx-auto max-w-6xl">
{/* Compact section header */} <div className="mb-7 flex items-end justify-between gap-6 sm:mb-9"> <div> <div className="mb-2 flex items-center gap-2"> <span className="h-1.5 w-1.5 rounded-full bg-[#F5B400]" />

```
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-500">
            Packages
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
          Choose your starting point.
        </h2>

        <p className="mt-1.5 max-w-lg text-xs leading-5 text-neutral-500 sm:text-sm">
          Start with what you need now. Build into something bigger when
          you&apos;re ready.
        </p>
      </div>
    </div>

    {/* Package grid */}
    <div className="grid gap-3 lg:grid-cols-3">
      {webPackages.map((pkg, index) => {
        const Icon = pkg.icon;

        return (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
          >
            <Link
              href={pkg.href}
              className={`group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[1.35rem] border p-5 transition-all duration-300 sm:p-5 ${
                pkg.featured
                  ? "border-[#F5B400]/30 bg-[#151416] shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
                  : "border-white/[0.07] bg-[#101012] hover:border-white/[0.13] hover:bg-[#121214]"
              }`}
            >
              {/* Featured ambient light */}
              {pkg.featured && (
                <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#F5B400]/[0.07] blur-[70px]" />
              )}

              {/* Top */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    pkg.featured
                      ? "bg-[#F5B400]/10 text-[#F5B400]"
                      : "bg-white/[0.045] text-neutral-400"
                  }`}
                >
                  <Icon className="h-[15px] w-[15px]" strokeWidth={1.7} />
                </div>

                <div className="flex items-center gap-2">
                  {pkg.featured && (
                    <span className="rounded-full border border-[#F5B400]/20 bg-[#F5B400]/[0.07] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#F5B400]">
                      Recommended
                    </span>
                  )}

                  <span className="text-[9px] font-medium tracking-[0.16em] text-white/20">
                    {pkg.number}
                  </span>
                </div>
              </div>

              {/* Main content */}
              <div className="relative z-10 mt-8">
                <h3 className="text-[22px] font-semibold tracking-[-0.045em] text-white">
                  {pkg.name}
                </h3>

                <p className="mt-2 max-w-[270px] text-[11px] leading-[1.65] text-neutral-500">
                  {pkg.description}
                </p>
              </div>

              {/* Features */}
              <div className="relative z-10 mt-7 space-y-2.5">
                {pkg.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        pkg.featured
                          ? "bg-[#F5B400]/10 text-[#F5B400]"
                          : "bg-white/[0.045] text-neutral-500"
                      }`}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={2.2} />
                    </span>

                    <span className="text-[10px] leading-4 text-neutral-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="relative z-10 mt-auto pt-7">
                <div className="mb-4 h-px bg-white/[0.07]" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-neutral-600">
                      Starting from
                    </p>

                    <p className="mt-1 text-sm font-semibold tracking-[-0.02em] text-white">
                      {pkg.price.replace("From ", "")}
                    </p>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      pkg.featured
                        ? "bg-[#F5B400] text-[#111014] group-hover:translate-x-1"
                        : "bg-white/[0.06] text-neutral-400 group-hover:translate-x-1 group-hover:bg-white/[0.1] group-hover:text-white"
                    }`}
                  >
                    <ArrowUpRight
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
              </div>

              {/* Hover line */}
              <div
                className={`absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  pkg.featured
                    ? "bg-[#F5B400]/60"
                    : "bg-white/20"
                }`}
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


);
}
