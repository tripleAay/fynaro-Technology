"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Building2,
  Check,
  ChevronDown,
  LayoutDashboard,
  PanelsTopLeft,
  ShoppingCart,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

import PremiumProductsShowcase from "@/components/dashboard components/hotstuffSections";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const productTypes = [
  {
    number: "01",
    title: "SaaS Platforms",
    description:
      "Subscription software built around recurring users, workflows and scalable product architecture.",
    icon: PanelsTopLeft,
  },
  {
    number: "02",
    title: "Marketplaces",
    description:
      "Platforms connecting customers, sellers, providers or communities inside one structured system.",
    icon: ShoppingCart,
  },
  {
    number: "03",
    title: "Dashboards",
    description:
      "Operational environments that bring business data, actions and decisions into one interface.",
    icon: LayoutDashboard,
  },
  {
    number: "04",
    title: "Client Portals",
    description:
      "Secure spaces where customers can manage accounts, requests, payments and activity.",
    icon: UsersRound,
  },
  {
    number: "05",
    title: "Internal Systems",
    description:
      "Software that replaces fragmented tools and improves the way teams operate.",
    icon: Building2,
  },
  {
    number: "06",
    title: "Custom Platforms",
    description:
      "Purpose-built products designed around workflows that standard software cannot handle.",
    icon: Blocks,
  },
];

const engagementTypes = [
  {
    number: "01",
    label: "Focused MVP",
    title: "Start with what matters.",
    description:
      "For founders and businesses launching the smallest useful version of a product.",
    price: "₦1,500,000+",
    meta: "Focused first release",
  },
  {
    number: "02",
    label: "Growth Product",
    title: "Build the operating product.",
    description:
      "For products with users, dashboards, payments, integrations and deeper workflows.",
    price: "Scoped",
    meta: "Business-ready system",
    featured: true,
  },
  {
    number: "03",
    label: "Custom Platform",
    title: "Engineer the larger system.",
    description:
      "For SaaS, marketplaces and business-critical software with custom architecture.",
    price: "Custom",
    meta: "Complex digital products",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "Define the problem, users, product goals and the first useful release.",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "Map features, workflows, data relationships and technical requirements.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Create the core journeys and interfaces around real user actions.",
  },
  {
    number: "04",
    title: "Engineer",
    description:
      "Build the frontend, backend, database logic and required integrations.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Test the critical workflows, deploy the product and prepare for iteration.",
  },
];

const faqItems = [
  {
    question: "How much does a digital product cost?",
    answer:
      "Focused product engagements typically begin from ₦1,500,000. Final investment depends on users, workflows, backend complexity, integrations and the size of the first release.",
  },
  {
    question: "Can Fynaro build an MVP?",
    answer:
      "Yes. We can identify the smallest useful version of the product, build the core experience and create a foundation for future releases.",
  },
  {
    question: "What are Fynaro Premium Products?",
    answer:
      "Premium Products are ready-made or pre-engineered Fynaro products that can be purchased directly instead of commissioned as a fully bespoke software engagement.",
  },
  {
    question: "Can a premium product be customised?",
    answer:
      "Where supported, branding, integrations, configuration and additional functionality can be scoped after purchase.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function DigitalProductsPage() {
  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* HERO */}
      <section className="border-b border-black/[0.08] pb-10 lg:pb-12">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <span>Digital Products</span>
        </div>

        <div className="mt-7 grid gap-8 xl:grid-cols-[1.3fr_.7fr] xl:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f4ef]">
                <PanelsTopLeft
                  size={15}
                  strokeWidth={1.6}
                />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
                Digital Products / 03
              </p>
            </div>

            <h1 className="max-w-[840px] text-[44px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]">
              Software shaped
              <br />
              around the business.
            </h1>
          </div>

          <div>
            <p className="max-w-[420px] text-[12px] leading-6 text-black/48">
              SaaS platforms, dashboards, portals and operational
              systems designed around the way your business actually works.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/shop/requests/new?service=digital-product"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
              >
                Discuss Your Product

                <ArrowUpRight size={12} />
              </Link>

              <a
                href="#premium-products"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.09] px-4 text-[10px] font-semibold text-black/45 transition hover:border-black/20 hover:text-black"
              >
                Shop ready-made

                <ChevronDown size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-10 lg:py-12">
        <SectionHeading
          eyebrow="What we build"
          title="Products for real workflows."
          description="Choose the closest direction. The final system is shaped around your exact business model and users."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {productTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex min-h-[190px] flex-col rounded-[16px] border border-black/[0.07] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:bg-[#111] hover:text-white"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.035] transition group-hover:bg-white/10">
                    <Icon
                      size={13}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="text-[8px] font-semibold text-black/20 transition group-hover:text-white/20">
                    {item.number}
                  </span>
                </div>

                <div className="mt-auto pt-7">
                  <h3 className="text-[16px] font-semibold tracking-[-0.025em]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[330px] text-[10px] leading-5 text-black/42 transition group-hover:text-white/45">
                    {item.description}
                  </p>

                  <div className="mt-3 flex translate-y-1 items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/35 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight size={9} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <SectionHeading
          eyebrow="Engagement"
          title="Start at the right level."
          description="Custom software should be scoped around complexity, not squeezed into rigid packages."
        />

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {engagementTypes.map((item) => (
            <article
              key={item.number}
              className={[
                "flex min-h-[270px] flex-col rounded-[17px] border p-5 transition",
                item.featured
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-black/[0.07] bg-white",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={[
                      "text-[8px] font-semibold",
                      item.featured
                        ? "text-white/25"
                        : "text-black/20",
                    ].join(" ")}
                  >
                    {item.number}
                  </span>

                  <p
                    className={[
                      "mt-2 text-[8px] font-semibold uppercase tracking-[0.14em]",
                      item.featured
                        ? "text-[#d6cc6d]"
                        : "text-black/30",
                    ].join(" ")}
                  >
                    {item.label}
                  </p>
                </div>

                {item.featured && (
                  <span className="rounded-full border border-white/12 px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    Recommended
                  </span>
                )}
              </div>

              <h3 className="mt-6 max-w-[300px] text-[20px] font-semibold leading-[1.05] tracking-[-0.03em]">
                {item.title}
              </h3>

              <p
                className={[
                  "mt-3 max-w-[320px] text-[10px] leading-5",
                  item.featured
                    ? "text-white/45"
                    : "text-black/42",
                ].join(" ")}
              >
                {item.description}
              </p>

              <div
                className={[
                  "mt-auto flex items-end justify-between border-t pt-5",
                  item.featured
                    ? "border-white/10"
                    : "border-black/[0.07]",
                ].join(" ")}
              >
                <div>
                  <p
                    className={[
                      "text-[7px] font-semibold uppercase tracking-[0.13em]",
                      item.featured
                        ? "text-white/28"
                        : "text-black/28",
                    ].join(" ")}
                  >
                    {item.meta}
                  </p>

                  <p className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em]">
                    {item.price}
                  </p>
                </div>

                <Link
                  href="/shop/requests/new?service=digital-product"
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full transition hover:-translate-y-0.5",
                    item.featured
                      ? "bg-white text-black"
                      : "bg-[#111] text-white",
                  ].join(" ")}
                >
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 max-w-[650px] text-[9px] leading-4 text-black/30">
          Final investment is confirmed after users, workflows,
          integrations, architecture and release requirements are reviewed.
        </p>
      </section>

      {/* PREMIUM PRODUCTS */}
      <section
        id="premium-products"
        className="border-t border-black/[0.08] py-10 lg:py-12"
      >
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6cc6d]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Fynaro Premium
              </p>
            </div>

            <h2 className="mt-3 max-w-[600px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[32px]">
              Built already.
              <br />
              Ready to own.
            </h2>
          </div>

          <p className="max-w-[390px] text-[10px] leading-5 text-black/42 lg:justify-self-end">
            Selected Fynaro products that are already designed,
            engineered and available to purchase.
          </p>
        </div>

        <PremiumProductsShowcase />
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Process
            </p>

            <h2 className="mt-3 max-w-[360px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em]">
              From problem to product.
            </h2>

            <p className="mt-3 max-w-[330px] text-[10px] leading-5 text-black/40">
              Enough structure to keep the work deliberate without turning
              the process itself into the product.
            </p>
          </div>

          <div className="border-y border-black/[0.08]">
            {process.map((item) => (
              <div
                key={item.number}
                className="grid gap-3 border-b border-black/[0.07] py-4 last:border-b-0 sm:grid-cols-[50px_150px_1fr]"
              >
                <span className="text-[8px] font-semibold text-[#9a8036]">
                  {item.number}
                </span>

                <h3 className="text-[11px] font-semibold">
                  {item.title}
                </h3>

                <p className="max-w-[520px] text-[9px] leading-5 text-black/42">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Questions
            </p>

            <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.035em]">
              Before we build.
            </h2>
          </div>

          <div className="border-t border-black/[0.08]">
            {faqItems.map((faq) => (
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
      <section className="pb-5">
        <div className="rounded-[18px] bg-[#111] p-7 text-white sm:p-9 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={10}
                  className="text-[#d6cc6d]"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-white/35">
                  Build with Fynaro
                </p>
              </div>

              <h2 className="mt-4 max-w-[680px] text-[32px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[42px]">
                Bring the problem.
                <br />
                We'll shape the product.
              </h2>
            </div>

            <div>
              <p className="max-w-[390px] text-[10px] leading-5 text-white/43">
                Start with the users, workflow and business problem.
                We will turn that into a clear product direction.
              </p>

              <Link
                href="/shop/requests/new?service=digital-product"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[10px] font-semibold text-black transition hover:bg-white/90"
              >
                Discuss Your Product
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SECTION HEADING                               */
/* -------------------------------------------------------------------------- */

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

        <h2 className="mt-2 max-w-[610px] text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[31px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[390px] text-[10px] leading-5 text-black/42 lg:justify-self-end">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FAQ                                      */
/* -------------------------------------------------------------------------- */

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
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="group flex w-full items-center justify-between gap-5 py-4 text-left"
      >
        <span className="text-[11px] font-semibold transition group-hover:text-black/65">
          {question}
        </span>

        <span
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.08] transition-all",
            open
              ? "rotate-180 bg-[#111] text-white"
              : "group-hover:border-black/20",
          ].join(" ")}
        >
          <ChevronDown size={11} />
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
          <p className="max-w-[640px] pb-4 pr-8 text-[9px] leading-5 text-black/43">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}