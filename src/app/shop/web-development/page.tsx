"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  Layers3,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const serviceTypes = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Professional websites built to establish trust, explain your offer clearly and turn visitors into real enquiries.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Ecommerce",
    description:
      "Online stores built around product discovery, payments, orders and a clean buying experience.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Web Platforms",
    description:
      "More advanced web experiences with user accounts, dashboards, workflows and custom functionality.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Landing Pages",
    description:
      "Focused pages for campaigns, launches, offers and products where conversion matters most.",
    icon: MonitorSmartphone,
  },
];

const packages = [
  {
    number: "01",
    name: "Launch",
    description:
      "For businesses that need a credible and professional online presence.",
    price: "₦350,000",
    href: "/shop/web-development/launch",
    features: [
      "Custom business website",
      "Up to 5 core pages",
      "Responsive design",
      "WhatsApp & inquiry forms",
      "SEO & analytics setup",
    ],
  },
  {
    number: "02",
    name: "Growth",
    description:
      "For businesses ready to sell, automate and operate more seriously online.",
    price: "₦750,000",
    href: "/shop/web-development/growth",
    recommended: true,
    features: [
      "Advanced custom website",
      "Ecommerce & payments",
      "Up to 10 core pages",
      "Customer & order functionality",
      "Conversion-focused experience",
    ],
  },
  {
    number: "03",
    name: "Custom",
    description:
      "For projects that require something beyond a conventional business website.",
    price: "₦1,500,000",
    href: "/shop/web-development/custom",
    features: [
      "Custom architecture",
      "Bespoke functionality",
      "Dashboards & integrations",
      "Built around your workflow",
      "Scoped project proposal",
    ],
  },
];

const comparisonRows = [
  {
    label: "Custom interface",
    launch: "Included",
    growth: "Included",
    custom: "Included",
  },
  {
    label: "Core pages",
    launch: "Up to 5",
    growth: "Up to 10",
    custom: "Project based",
  },
  {
    label: "Responsive design",
    launch: "Included",
    growth: "Included",
    custom: "Included",
  },
  {
    label: "SEO foundations",
    launch: "Included",
    growth: "Included",
    custom: "Included",
  },
  {
    label: "Analytics",
    launch: "Included",
    growth: "Included",
    custom: "Included",
  },
  {
    label: "Ecommerce",
    launch: "—",
    growth: "Included",
    custom: "Optional",
  },
  {
    label: "Online payments",
    launch: "—",
    growth: "Included",
    custom: "Optional",
  },
  {
    label: "Customer accounts",
    launch: "—",
    growth: "Optional",
    custom: "Included where required",
  },
  {
    label: "Custom dashboards",
    launch: "—",
    growth: "—",
    custom: "Included where required",
  },
  {
    label: "API integrations",
    launch: "Basic",
    growth: "Standard",
    custom: "Advanced",
  },
];

const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We understand the business, goals, audience, requirements and what the website actually needs to achieve.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "We define content hierarchy, page structure, user journeys and the scope of the build.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "The interface is designed around clarity, brand positioning, responsiveness and usability.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "We turn the approved direction into a responsive, functional and production-ready website.",
  },
  {
    number: "05",
    title: "Review",
    description:
      "The build is tested, refined and reviewed against the agreed project scope.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Deployment, final checks, analytics and essential documentation are completed before handoff.",
  },
];

const faqs = [
  {
    question: "How long does a website project take?",
    answer:
      "Timelines depend on scope. Smaller business websites are typically faster than ecommerce or custom platform builds. Your final proposal will include an estimated delivery timeline.",
  },
  {
    question: "Do I need to provide all my content before we begin?",
    answer:
      "Not necessarily. Existing content is useful, but the project can begin with discovery and structure while content is being prepared. Content creation can also be scoped separately where needed.",
  },
  {
    question: "Can Fynaro redesign an existing website?",
    answer:
      "Yes. Existing websites can be redesigned, restructured or rebuilt where the current system no longer supports the business properly.",
  },
  {
    question: "Can I request features that are not listed in a package?",
    answer:
      "Yes. Packages are starting points, not rigid templates. Additional functionality can be scoped into the project or moved into a Custom engagement when complexity requires it.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="border-b border-black/[0.09] pb-14 lg:pb-20">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link href="/shop" className="transition hover:text-black">
            Dashboard
          </Link>

          <span>/</span>

          <span>Web Development</span>
        </div>

        <div className="mt-10 grid gap-12 xl:grid-cols-[1.35fr_.65fr] xl:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white">
                <Globe2 size={17} strokeWidth={1.6} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Web Development / 01
              </p>
            </div>

            <h1 className="max-w-[850px] text-[48px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[82px]">
              Websites built
              <br />
              to move business.
            </h1>
          </div>

          <div className="xl:pb-2">
            <p className="max-w-[450px] text-[14px] leading-7 text-black/50">
              Strategy, interface design and development for businesses
              that need more than an online placeholder.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop/requests/new?service=web-development"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Web Project
                <ArrowUpRight size={14} />
              </Link>

              <a
                href="#packages"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-black/[0.1] bg-white px-5 text-[12px] font-semibold text-black/60 transition hover:text-black"
              >
                View packages
                <ChevronDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="What we build"
          title="Different businesses need different kinds of web."
          description="Start with the kind of experience you need. Fynaro will help determine the right scope beneath it."
        />

        <div className="mt-10 grid overflow-hidden rounded-[22px] border border-black/[0.09] bg-white md:grid-cols-2">
          {serviceTypes.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={[
                  "min-h-[300px] p-7 sm:p-9",
                  "border-b border-black/[0.08]",
                  index % 2 === 0 ? "md:border-r" : "",
                  index >= 2 ? "md:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.09]">
                    <Icon size={16} strokeWidth={1.6} />
                  </div>

                  <span className="text-[11px] font-semibold text-black/25">
                    {service.number}
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="text-[26px] font-semibold tracking-[-0.035em]">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-[420px] text-[13px] leading-6 text-black/48">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PACKAGES */}
      <section
        id="packages"
        className="border-t border-black/[0.09] py-14 lg:py-20"
      >
        <SectionHeading
          eyebrow="Packages"
          title="Choose your starting point."
          description="These are starting scopes. Final pricing depends on functionality, content, integrations and delivery requirements."
        />

        <div className="mt-10 grid overflow-hidden rounded-[22px] border border-black/[0.1] lg:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.name}
              href={pkg.href}
              className={[
                "group relative flex min-h-[610px] flex-col p-7 transition sm:p-9",
                "border-b border-black/[0.09] last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
                pkg.recommended
                  ? "bg-[#111] text-white"
                  : "bg-white hover:bg-[#f8f8f4]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-[11px] font-semibold ${
                    pkg.recommended
                      ? "text-white/30"
                      : "text-black/25"
                  }`}
                >
                  {pkg.number}
                </span>

                {pkg.recommended && (
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/55">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-12">
                <h3 className="text-[34px] font-semibold tracking-[-0.045em]">
                  {pkg.name}
                </h3>

                <p
                  className={`mt-4 max-w-[330px] text-[13px] leading-6 ${
                    pkg.recommended
                      ? "text-white/50"
                      : "text-black/48"
                  }`}
                >
                  {pkg.description}
                </p>
              </div>

              <div
                className={`mt-10 border-t pt-7 ${
                  pkg.recommended
                    ? "border-white/10"
                    : "border-black/[0.08]"
                }`}
              >
                <ul className="space-y-4">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-[12px] ${
                        pkg.recommended
                          ? "text-white/65"
                          : "text-black/55"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.recommended
                            ? "bg-white/10"
                            : "bg-black/[0.05]"
                        }`}
                      >
                        <Check size={11} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-12">
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${
                    pkg.recommended
                      ? "text-white/30"
                      : "text-black/30"
                  }`}
                >
                  Starting from
                </p>

                <div className="mt-2 flex items-end justify-between gap-5">
                  <p className="text-[31px] font-semibold tracking-[-0.04em]">
                    {pkg.price}
                  </p>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      pkg.recommended
                        ? "bg-white text-black"
                        : "bg-[#111] text-white"
                    }`}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-[11px] leading-5 text-black/35">
          Final pricing is confirmed after project scope, functionality,
          integrations and delivery expectations are reviewed.
        </p>
      </section>

      {/* COMPARISON */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Compare"
          title="See where each package starts."
          description="Use this as a guide. Custom requirements can always be added during scoping."
        />

        <div className="mt-10 overflow-x-auto rounded-[20px] border border-black/[0.09] bg-white">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.09]">
              <div className="p-5" />
              <div className="p-5 text-[12px] font-semibold">
                Launch
              </div>
              <div className="bg-[#111] p-5 text-[12px] font-semibold text-white">
                Growth
              </div>
              <div className="p-5 text-[12px] font-semibold">
                Custom
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.07] last:border-b-0"
              >
                <div className="p-5 text-[12px] font-medium text-black/60">
                  {row.label}
                </div>

                <div className="p-5 text-[12px] text-black/45">
                  {row.launch}
                </div>

                <div className="bg-[#111] p-5 text-[12px] text-white/65">
                  {row.growth}
                </div>

                <div className="p-5 text-[12px] text-black/45">
                  {row.custom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Process"
          title="From idea to launch."
          description="A clear process keeps the project focused and gives both sides a shared understanding of what happens next."
        />

        <div className="mt-10 border-y border-black/[0.09]">
          {process.map((item) => (
            <div
              key={item.number}
              className="grid gap-5 border-b border-black/[0.08] py-7 last:border-b-0 md:grid-cols-[100px_260px_1fr] md:items-start lg:py-8"
            >
              <span className="text-[11px] font-semibold text-black/25">
                {item.number}
              </span>

              <h3 className="text-[18px] font-semibold tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="max-w-[620px] text-[12px] leading-6 text-black/45">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY FYNARO */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#111] text-white lg:grid-cols-[1fr_1fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Why Fynaro
            </p>

            <h2 className="mt-6 max-w-[600px] text-[38px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[48px]">
              Design, strategy and code in one build.
            </h2>

            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-white/50">
              The website is treated as part of the business, not just
              a collection of pages. Structure, interface, performance
              and functionality are considered together.
            </p>
          </div>

          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:border-l lg:border-t-0">
            {[
              "Business-focused structure",
              "Custom interface design",
              "Responsive development",
              "Scalable architecture",
              "Analytics foundations",
              "Post-launch clarity",
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-[140px] items-end border-b border-r border-white/10 p-6 last:border-b-0"
              >
                <div>
                  <Sparkles
                    size={15}
                    strokeWidth={1.5}
                    className="mb-4 text-white/35"
                  />

                  <p className="text-[12px] font-medium text-white/70">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Questions
            </p>

            <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.04em]">
              Before you start.
            </h2>
          </div>

          <div className="border-t border-black/[0.09]">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-6 pt-4 lg:pb-10">
        <div className="rounded-[24px] bg-[#e9e9e3] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                Start a web project
              </p>

              <h2 className="mt-5 max-w-[680px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[52px]">
                Tell us what the website needs to do.
              </h2>
            </div>

            <div>
              <p className="max-w-[420px] text-[13px] leading-6 text-black/50">
                Whether you already know the right package or only know
                the problem you're trying to solve, start with a project
                request and Fynaro will help shape the scope.
              </p>

              <Link
                href="/shop/requests/new?service=web-development"
                className="mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white"
              >
                Start Web Project
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
          {eyebrow}
        </p>

        <h2 className="mt-3 max-w-[650px] text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[40px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[460px] text-[12px] leading-6 text-black/45 lg:justify-self-end">
        {description}
      </p>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/[0.09]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[14px] font-semibold">
          {question}
        </span>

        <span
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.1] transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <ChevronDown size={14} />
        </span>
      </button>

      {open && (
        <div className="pb-7 pr-10">
          <p className="max-w-[680px] text-[12px] leading-6 text-black/48">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}