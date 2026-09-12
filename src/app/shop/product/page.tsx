"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Building2,
  Check,
  ChevronDown,
  Database,
  LayoutDashboard,
  LockKeyhole,
  Network,
  PanelsTopLeft,
  ShoppingCart,
  UsersRound,
  Workflow,
} from "lucide-react";
import { useState } from "react";

const productTypes = [
  {
    number: "01",
    title: "SaaS Platforms",
    description:
      "Subscription-based software products designed around users, recurring workflows and scalable product architecture.",
    icon: PanelsTopLeft,
  },
  {
    number: "02",
    title: "Marketplaces",
    description:
      "Multi-sided platforms that connect buyers, sellers, providers or communities inside one structured digital experience.",
    icon: ShoppingCart,
  },
  {
    number: "03",
    title: "Dashboards",
    description:
      "Operational, client or administrative dashboards that bring data, actions and workflows into one interface.",
    icon: LayoutDashboard,
  },
  {
    number: "04",
    title: "Client Portals",
    description:
      "Secure digital spaces where customers can access information, manage requests, communicate and complete tasks.",
    icon: UsersRound,
  },
  {
    number: "05",
    title: "Internal Systems",
    description:
      "Business software designed to replace fragmented manual processes and improve how teams operate.",
    icon: Building2,
  },
  {
    number: "06",
    title: "Custom Platforms",
    description:
      "Digital products that do not fit neatly into a standard category and require custom architecture around the business.",
    icon: Blocks,
  },
];

const capabilities = [
  {
    title: "Authentication",
    description:
      "Secure login, account creation, password recovery and identity flows.",
    icon: LockKeyhole,
  },
  {
    title: "User Roles",
    description:
      "Different permissions and experiences for customers, admins, vendors, staff or other user groups.",
    icon: UsersRound,
  },
  {
    title: "Databases",
    description:
      "Structured storage and retrieval for users, transactions, products, content and operational data.",
    icon: Database,
  },
  {
    title: "Dashboards",
    description:
      "Interfaces for monitoring, managing and acting on important information.",
    icon: LayoutDashboard,
  },
  {
    title: "Integrations",
    description:
      "Payments, third-party APIs, email, analytics and external business services.",
    icon: Network,
  },
  {
    title: "Automation",
    description:
      "Custom workflows that reduce repetitive work and connect actions across the product.",
    icon: Workflow,
  },
];

const process = [
  {
    number: "01",
    title: "Product Discovery",
    description:
      "We define the problem, users, business model, product goals and what the first version actually needs to accomplish.",
  },
  {
    number: "02",
    title: "Product Architecture",
    description:
      "Core features, user roles, data structure, workflows and technical requirements are mapped before development begins.",
  },
  {
    number: "03",
    title: "UX & Interface",
    description:
      "The product experience is designed around the key user journeys and the actions people need to complete.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Frontend, backend, database and integrations are developed into a working product.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Critical flows are reviewed across functionality, responsiveness, permissions and product behaviour.",
  },
  {
    number: "06",
    title: "Launch & Iteration",
    description:
      "The first production version is deployed and the product can continue evolving through future releases.",
  },
];

const faqItems = [
  {
    question: "How much does a custom digital product cost?",
    answer:
      "Projects typically start from ₦1,500,000, but the final investment depends heavily on features, user roles, integrations, backend requirements and overall product complexity.",
  },
  {
    question: "Can Fynaro build an MVP?",
    answer:
      "Yes. An MVP can be scoped around the smallest useful version of the product so the core idea can be launched and validated before additional features are developed.",
  },
  {
    question: "Do I need a complete technical specification?",
    answer:
      "No. You can begin with the business idea, problem or workflow. Product discovery is used to translate that into a clearer scope and technical direction.",
  },
  {
    question: "Can an existing product be improved instead of rebuilt?",
    answer:
      "Yes. Existing systems can be reviewed for redesign, feature expansion, frontend improvement, backend work or architecture changes depending on the current product.",
  },
];

export default function DigitalProductsPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="border-b border-black/[0.09] pb-14 lg:pb-20">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link href="/shop" className="transition hover:text-black">
            Dashboard
          </Link>

          <span>/</span>

          <span>Digital Products</span>
        </div>

        <div className="mt-10 grid gap-12 xl:grid-cols-[1.35fr_.65fr] xl:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white">
                <PanelsTopLeft size={17} strokeWidth={1.6} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Digital Products / 03
              </p>
            </div>

            <h1 className="max-w-[900px] text-[48px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[82px]">
              Build something
              <br />
              beyond a website.
            </h1>
          </div>

          <div className="xl:pb-2">
            <p className="max-w-[460px] text-[14px] leading-7 text-black/50">
              We design and engineer platforms, systems and software
              around your users, workflows and business model.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop/requests/new?service=digital-product"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
              >
                Discuss Your Product
                <ArrowUpRight size={14} />
              </Link>

              <a
                href="#product-types"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-black/[0.1] bg-white px-5 text-[12px] font-semibold text-black/60 transition hover:text-black"
              >
                Explore what we build
                <ChevronDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT TYPES */}
      <section
        id="product-types"
        className="py-14 lg:py-20"
      >
        <SectionHeading
          eyebrow="What we build"
          title="Products built around real workflows."
          description="Choose the closest starting point. The final product can be shaped around your exact business model and users."
        />

        <div className="mt-10 grid overflow-hidden rounded-[22px] border border-black/[0.09] bg-white md:grid-cols-2 xl:grid-cols-3">
          {productTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={[
                  "min-h-[300px] p-7 sm:p-9",
                  "border-b border-black/[0.08]",
                  index % 3 !== 2 ? "xl:border-r" : "",
                  index % 2 === 0 ? "md:border-r xl:border-r" : "",
                  index >= 4 ? "md:border-b-0" : "",
                  index >= 3 ? "xl:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.09]">
                    <Icon size={16} strokeWidth={1.6} />
                  </div>

                  <span className="text-[11px] font-semibold text-black/25">
                    {item.number}
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="text-[25px] font-semibold tracking-[-0.035em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[420px] text-[13px] leading-6 text-black/48">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#111] text-white lg:grid-cols-[1.2fr_.8fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Project investment
            </p>

            <h2 className="mt-6 max-w-[630px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[52px]">
              Custom products are scoped around what they need to become.
            </h2>

            <p className="mt-6 max-w-[560px] text-[13px] leading-6 text-white/50">
              Product builds can vary significantly depending on users,
              workflows, backend complexity, integrations and the size
              of the first release.
            </p>
          </div>

          <div className="flex flex-col justify-between border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Projects typically start from
              </p>

              <p className="mt-4 text-[44px] font-semibold tracking-[-0.055em] sm:text-[54px]">
                ₦1,500,000
              </p>

              <p className="mt-4 max-w-[360px] text-[12px] leading-6 text-white/45">
                Final pricing is provided after the first product scope
                has been reviewed.
              </p>
            </div>

            <Link
              href="/shop/requests/new?service=digital-product"
              className="mt-10 inline-flex h-12 w-fit items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black"
            >
              Request Product Scope
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="The systems behind the interface."
          description="Digital products often need more than screens. These are some of the underlying capabilities Fynaro can scope into a build."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-black/[0.09] bg-black/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="min-h-[245px] bg-white p-7 sm:p-8"
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-black/40"
                />

                <h3 className="mt-10 text-[20px] font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[330px] text-[12px] leading-6 text-black/45">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FIT */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Good fit
            </p>

            <h2 className="mt-4 max-w-[420px] text-[34px] font-semibold leading-[1.02] tracking-[-0.04em]">
              You may need a digital product if...
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[20px] border border-black/[0.09] bg-black/[0.08] sm:grid-cols-2">
            {[
              "Different users need different accounts or permissions.",
              "Customers need their own dashboard or portal.",
              "Your business relies on recurring digital workflows.",
              "You need to manage data inside a custom interface.",
              "Several tools need to work together through integrations.",
              "A normal website cannot handle the core functionality.",
              "You are creating a SaaS or subscription product.",
              "Manual business processes need to become software.",
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-[130px] gap-4 bg-white p-6"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                  <Check size={12} />
                </div>

                <p className="text-[12px] leading-6 text-black/55">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Product process"
          title="From idea to working product."
          description="The goal is to reduce uncertainty before heavy development begins, then build in a structured sequence."
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

              <p className="max-w-[650px] text-[12px] leading-6 text-black/45">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MVP */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#e9e9e3] lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Start smaller
            </p>

            <h2 className="mt-6 max-w-[560px] text-[38px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[48px]">
              You don't always need to build everything at once.
            </h2>

            <p className="mt-6 max-w-[500px] text-[13px] leading-6 text-black/50">
              Complex products can begin with a focused first version.
              We can define the minimum useful product, build the core
              experience and create room for future releases.
            </p>
          </div>

          <div className="border-t border-black/[0.08] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
              MVP approach
            </p>

            <div className="mt-8 space-y-6">
              {[
                ["01", "Identify the core problem"],
                ["02", "Prioritize essential workflows"],
                ["03", "Build the first usable release"],
                ["04", "Launch and learn"],
                ["05", "Expand based on real needs"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="flex items-center gap-5 border-b border-black/[0.08] pb-5"
                >
                  <span className="text-[10px] font-semibold text-black/25">
                    {number}
                  </span>

                  <p className="text-[13px] font-medium">
                    {title}
                  </p>
                </div>
              ))}
            </div>
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
              Before we scope it.
            </h2>
          </div>

          <div className="border-t border-black/[0.09]">
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

      {/* CTA */}
      <section className="pb-6 pt-4 lg:pb-10">
        <div className="rounded-[24px] bg-[#111] p-8 text-white sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Build with Fynaro
              </p>

              <h2 className="mt-5 max-w-[720px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[54px]">
                Bring the idea.
                <br />
                We'll help shape the product.
              </h2>
            </div>

            <div>
              <p className="max-w-[420px] text-[13px] leading-6 text-white/50">
                You do not need to arrive with architecture diagrams or
                a technical specification. Tell us the problem, users
                and business you're trying to build around.
              </p>

              <Link
                href="/shop/requests/new?service=digital-product"
                className="mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black"
              >
                Discuss Your Product
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

        <h2 className="mt-3 max-w-[680px] text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[40px]">
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
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[14px] font-semibold">
          {question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.1] transition-transform ${
            open ? "rotate-180" : ""
          }`}
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