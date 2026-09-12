"use client";

import { motion } from "framer-motion";
import {
ArrowUpRight,
Check,
Layers3,
PenTool,
Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";

type BrandService = {
id: string;
number: string;
name: string;
description: string;
icon: ElementType;
href: string;
featured?: boolean;
features: string[];
};

const brandServices: BrandService[] = [
{
id: "identity",
number: "01",
name: "Identity",
description:
"Build a brand that looks consistent, intentional and recognisable.",
icon: PenTool,
href: "/shop/brand-design/identity",
features: [
"Logo & visual identity",
"Colour & typography system",
"Brand direction",
"Social & digital assets",
"Brand guidelines",
],
},
{
id: "interface",
number: "02",
name: "Interface",
description:
"Design clear digital experiences that feel as good as they work.",
icon: Layers3,
href: "/shop/brand-design/interface",
featured: true,
features: [
"UI/UX design",
"Web & mobile interfaces",
"Design systems",
"Responsive layouts",
"Interactive prototypes",
],
},
{
id: "visual",
number: "03",
name: "Visual",
description:
"Create the visual layer that gives your product, campaign or brand presence.",
icon: Sparkles,
href: "/shop/brand-design/visual",
features: [
"Campaign visuals",
"Marketing graphics",
"Product visuals",
"Social media design",
"Presentation & launch assets",
],
},
];

export default function FynaroBrandDesign() {
return ( <section className="px-4 py-10 sm:px-6 sm:py-14"> <div className="mx-auto max-w-6xl">
{/* Section introduction */} <div className="mb-8 max-w-2xl sm:mb-10"> <div className="mb-3 flex items-center gap-2"> <span className="h-1.5 w-1.5 rounded-full bg-[#F5B400]" />

```
        <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-500">
          Brand & Design
        </span>
      </div>

      <h2 className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">
        Identity, interfaces & visual experiences.
      </h2>

      <p className="mt-3 max-w-xl text-xs leading-6 text-neutral-500 sm:text-sm">
        From the way your brand looks to the way your product feels,
        Fynaro creates thoughtful visual systems designed to work across
        every touchpoint.
      </p>
    </div>

    {/* Service cards */}
    <div className="grid gap-3 lg:grid-cols-3">
      {brandServices.map((service, index) => {
        const Icon = service.icon;

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 14 }}
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
              href={service.href}
              className={`group relative flex h-full min-h-[355px] flex-col overflow-hidden rounded-[1.35rem] border p-5 transition-all duration-300 ${
                service.featured
                  ? "border-[#F5B400]/30 bg-[#151416] shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
                  : "border-white/[0.07] bg-[#101012] hover:border-white/[0.13] hover:bg-[#121214]"
              }`}
            >
              {/* Featured glow */}
              {service.featured && (
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#F5B400]/[0.07] blur-[70px]" />
              )}

              {/* Top row */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    service.featured
                      ? "bg-[#F5B400]/10 text-[#F5B400]"
                      : "bg-white/[0.045] text-neutral-400"
                  }`}
                >
                  <Icon
                    className="h-[15px] w-[15px]"
                    strokeWidth={1.7}
                  />
                </div>

                <div className="flex items-center gap-2">
                  {service.featured && (
                    <span className="rounded-full border border-[#F5B400]/20 bg-[#F5B400]/[0.07] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#F5B400]">
                      Most requested
                    </span>
                  )}

                  <span className="text-[9px] font-medium tracking-[0.16em] text-white/20">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Service title */}
              <div className="relative z-10 mt-8">
                <h3 className="text-[22px] font-semibold tracking-[-0.045em] text-white">
                  {service.name}
                </h3>

                <p className="mt-2 max-w-[280px] text-[11px] leading-[1.65] text-neutral-500">
                  {service.description}
                </p>
              </div>

              {/* Included */}
              <div className="relative z-10 mt-7 space-y-2.5">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        service.featured
                          ? "bg-[#F5B400]/10 text-[#F5B400]"
                          : "bg-white/[0.045] text-neutral-500"
                      }`}
                    >
                      <Check
                        className="h-2.5 w-2.5"
                        strokeWidth={2.2}
                      />
                    </span>

                    <span className="text-[10px] leading-4 text-neutral-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom action */}
              <div className="relative z-10 mt-auto pt-7">
                <div className="mb-4 h-px bg-white/[0.07]" />

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                    Explore service
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                      service.featured
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

              {/* Hover accent */}
              <div
                className={`absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  service.featured
                    ? "bg-[#F5B400]/60"
                    : "bg-white/20"
                }`}
              />
            </Link>
          </motion.div>
        );
      })}
    </div>

    {/* Quiet supporting line */}
    <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] leading-5 text-neutral-600">
        Need a combination of services? We can shape the right creative
        scope around your project.
      </p>

      <Link
        href="/contact"
        className="group inline-flex w-fit items-center gap-1.5 text-[10px] font-medium text-neutral-400 transition-colors hover:text-white"
      >
        Start a conversation
        <ArrowUpRight
          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  </div>
</section>


);
}
