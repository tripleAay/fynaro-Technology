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
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const serviceTypes = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "High-trust business websites designed to communicate clearly and convert attention into enquiries.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Ecommerce",
    description:
      "Modern commerce experiences built around product discovery, payments, orders and conversion.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Web Platforms",
    description:
      "Advanced digital products with dashboards, accounts, workflows and custom functionality.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Landing Pages",
    description:
      "Focused campaign and launch experiences designed around one clear commercial objective.",
    icon: MonitorSmartphone,
  },
];

const packages = [
  {
    number: "01",
    name: "Launch",
    description:
      "A professional foundation for businesses that need a credible digital presence.",
    price: "₦350,000",
    href: "/shop/web-development/launch",
    features: [
      "Custom business website",
      "Up to 5 core pages",
      "Responsive experience",
      "Inquiry & WhatsApp flows",
      "SEO & analytics foundations",
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
      "Customer & order workflows",
      "Conversion-focused experience",
    ],
  },
  {
    number: "03",
    name: "Custom",
    description:
      "For digital systems that go beyond the limits of a conventional website.",
    price: "₦1,500,000",
    href: "/shop/web-development/custom",
    features: [
      "Custom architecture",
      "Bespoke functionality",
      "Dashboards & integrations",
      "Workflow-driven development",
      "Scoped project proposal",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Business goals, users, requirements and project priorities are defined.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Content hierarchy, page architecture and user journeys are mapped.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "The interface is designed around clarity, trust and usability.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Approved designs are translated into a responsive production build.",
  },
  {
    number: "05",
    title: "Review",
    description:
      "Core flows, responsiveness and agreed requirements are tested and refined.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Deployment, analytics and final checks are completed before handoff.",
  },
];

const faqs = [
  {
    question: "How long does a website project take?",
    answer:
      "Timelines depend on scope. Business websites typically move faster than ecommerce or custom platforms. Your proposal will include an estimated delivery schedule.",
  },
  {
    question: "Do I need all my content before we begin?",
    answer:
      "No. Discovery, structure and design can begin while content is being prepared. Content support can also be scoped separately where required.",
  },
  {
    question: "Can Fynaro redesign an existing website?",
    answer:
      "Yes. Existing websites can be redesigned, restructured or rebuilt where the current system no longer supports the business effectively.",
  },
  {
    question: "Can I request features outside a package?",
    answer:
      "Yes. Packages are starting points. Additional functionality can be scoped into the project or moved into a Custom engagement where complexity requires it.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[1460px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/[0.08] pb-12 pt-5 lg:pb-16 lg:pt-8">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#d6cc6d]/[0.08] blur-3xl" />

        <div className="relative grid gap-9 xl:grid-cols-[1.25fr_.75fr] xl:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#a59036]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/38">
                Fynaro Web Studio
              </p>
            </div>

            <h1 className="max-w-[850px] text-[46px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[62px] lg:text-[78px]">
  <span className="block">
    Digital presence,
  </span>

  <span className="mt-3 block sm:mt-4">
    built with intent.
  </span>
</h1>
          </div>

          <div className="xl:pb-1">
            <p className="max-w-[430px] text-[12px] leading-6 text-black/48">
              Strategy, interface and engineering shaped into one clear web
              experience for your business.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/shop/requests/new?service=web-development"
                className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/80"
              >
                Start a project
                <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="#packages"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.09] bg-white px-4 text-[10px] font-semibold text-black/50 transition hover:border-black/20 hover:text-black"
              >
                View packages
                <ChevronDown size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="py-10 lg:py-14">
        <SectionHeading
          eyebrow="What we build"
          title="Choose the kind of web experience you need."
          description="Different businesses require different levels of functionality, complexity and commercial focus."
        />

        <div className="mt-7 grid overflow-hidden rounded-[18px] border border-black/[0.08] bg-white sm:grid-cols-2 xl:grid-cols-4">
          {serviceTypes.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative flex min-h-[190px] cursor-default flex-col border-b border-black/[0.07] p-5 transition-colors duration-300 hover:bg-[#f6f4e8] sm:border-r xl:border-b-0 last:border-b-0 xl:last:border-r-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2ed] text-black/55 transition-all duration-300 group-hover:bg-[#111] group-hover:text-white">
                    <Icon
                      size={14}
                      strokeWidth={1.6}
                    />
                  </div>

                  <span className="text-[8px] font-semibold text-black/22">
                    {service.number}
                  </span>
                </div>

                <div className="mt-auto pt-8">
                  <h3 className="text-[16px] font-semibold tracking-[-0.025em]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-[9.5px] leading-5 text-black/42">
                    {service.description}
                  </p>

                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PACKAGES */}
      <section
        id="packages"
        className="border-t border-black/[0.08] py-10 lg:py-12"
      >
        <SectionHeading
          eyebrow="Packages"
          title="Three clear starting points."
          description="Start with the level that matches your business today. Final scope is confirmed after discovery."
        />

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.name}
              href={pkg.href}
              className={[
                "group relative flex min-h-[470px] flex-col rounded-[18px] border p-6 transition-all duration-300",
                pkg.recommended
                  ? "border-[#111] bg-[#111] text-white hover:-translate-y-1"
                  : "border-black/[0.08] bg-white hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`text-[9px] font-semibold ${
                    pkg.recommended ? "text-white/30" : "text-black/25"
                  }`}
                >
                  {pkg.number}
                </span>

                {pkg.recommended && (
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-[28px] font-semibold tracking-[-0.04em]">
                  {pkg.name}
                </h3>

                <p
                  className={`mt-3 max-w-[320px] text-[11px] leading-5 ${
                    pkg.recommended ? "text-white/48" : "text-black/45"
                  }`}
                >
                  {pkg.description}
                </p>
              </div>

              <div
                className={`mt-7 border-t pt-5 ${
                  pkg.recommended
                    ? "border-white/10"
                    : "border-black/[0.07]"
                }`}
              >
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2.5 text-[10px] ${
                        pkg.recommended ? "text-white/60" : "text-black/52"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.recommended ? "bg-white/10" : "bg-black/[0.04]"
                        }`}
                      >
                        <Check size={10} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <p
                  className={`text-[8px] font-semibold uppercase tracking-[0.15em] ${
                    pkg.recommended ? "text-white/30" : "text-black/30"
                  }`}
                >
                  Starting from
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="text-[25px] font-semibold tracking-[-0.035em]">
                    {pkg.price}
                  </p>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      pkg.recommended
                        ? "bg-white text-black"
                        : "bg-[#111] text-white"
                    }`}
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-4 max-w-[700px] text-[10px] leading-5 text-black/32">
          Starting prices provide a planning baseline. Final investment depends
          on functionality, integrations, content and delivery requirements.
        </p>
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <SectionHeading
          eyebrow="Process"
          title="A disciplined path from idea to launch."
          description="Clear stages keep the work focused and reduce unnecessary complexity."
        />

        <div className="mt-6 border-y border-black/[0.08]">
          {process.map((item) => (
            <div
              key={item.number}
              className="group grid gap-3 border-b border-black/[0.07] py-5 last:border-b-0 transition-colors hover:bg-[#f8f8f4] sm:grid-cols-[70px_200px_1fr] sm:px-3"
            >
              <span className="text-[9px] font-semibold text-black/25">
                {item.number}
              </span>

              <h3 className="text-[13px] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>

              <p className="max-w-[600px] text-[10px] leading-5 text-black/42">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY FYNARO */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid overflow-hidden rounded-[20px] bg-[#111] text-white lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Why Fynaro
            </p>

            <h2 className="mt-5 max-w-[560px] text-[32px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[40px]">
              Strategy, design and engineering in one system.
            </h2>

            <p className="mt-5 max-w-[500px] text-[11px] leading-5 text-white/45">
              We treat your website as part of the business itself. Structure,
              brand, performance and functionality are considered together.
            </p>
          </div>

          <div className="border-t border-white/10 px-7 py-5 lg:border-l lg:border-t-0 lg:px-8 lg:py-8">
            {[
              ["01", "Business-led structure"],
              ["02", "Custom design, never templates"],
              ["03", "Engineering ready to scale"],
            ].map(([number, item]) => (
              <div key={number} className="flex items-center gap-5 border-b border-white/10 py-5 last:border-b-0">
                <span className="text-[8px] font-semibold text-[#d6cc6d]/70">{number}</span>
                <p className="text-[10px] font-medium text-white/60">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid gap-7 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Questions
            </p>

            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.035em]">
              Before you start.
            </h2>
          </div>

          <div className="border-t border-black/[0.08]">
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
      <section className="pb-5 pt-2">
        <div className="relative overflow-hidden rounded-[20px] border border-black/[0.08] bg-white p-7 sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d6cc6d]/10 blur-3xl" />
          <div className="relative grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Start a web project
              </p>

              <h2 className="mt-4 max-w-[650px] text-[34px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[44px]">
                Tell us what the website needs to achieve.
              </h2>
            </div>

            <div>
              <p className="max-w-[400px] text-[11px] leading-5 text-black/45">
                Whether you already know the right package or only know the
                problem, Fynaro will help shape the scope.
              </p>

              <Link
                href="/shop/requests/new?service=web-development"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Web Project
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
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
    <div className="grid gap-3 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          {eyebrow}
        </p>

        <h2 className="mt-2 max-w-[620px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[32px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[420px] text-[10px] leading-5 text-black/42 lg:justify-self-end">
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
    <div className="border-b border-black/[0.08]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="text-[12px] font-semibold transition group-hover:text-black/65">
          {question}
        </span>

        <span
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.09] transition-all duration-300",
            open
              ? "rotate-180 bg-[#111] text-white"
              : "group-hover:border-black/20",
          ].join(" ")}
        >
          <ChevronDown size={12} />
        </span>
      </button>

      <div
        className={[
          "grid transition-all duration-300 ease-out",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="max-w-[650px] pb-5 pr-10 text-[10px] leading-5 text-black/45">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
