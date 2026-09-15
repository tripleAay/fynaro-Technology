"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CreditCard,
  Layers3,
  MapPin,
  MessageSquareText,
  PanelsTopLeft,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  UsersRound,
  Workflow,
} from "lucide-react";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const appTypes = [
  {
    number: "01",
    title: "Consumer Apps",
    description:
      "Customer-facing products designed around usability, engagement and repeat interaction.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Commerce Apps",
    description:
      "Mobile shopping and transaction experiences built around products, payments and customers.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Business Apps",
    description:
      "Operational tools that help teams manage customers, processes, data and internal workflows.",
    icon: BriefcaseBusiness,
  },
  {
    number: "04",
    title: "Booking Apps",
    description:
      "Appointment, reservation and service-booking products with scheduling and customer flows.",
    icon: PanelsTopLeft,
  },
  {
    number: "05",
    title: "Membership Apps",
    description:
      "Private mobile environments for communities, organisations, subscribers and recurring customers.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Custom Products",
    description:
      "Purpose-built mobile products for ideas, workflows and business models that need custom architecture.",
    icon: Layers3,
  },
];

const mobilePackages = [
  {
    number: "01",
    name: "Mobile Launch",
    eyebrow: "Focused MVP",
    description:
      "For founders and businesses launching a focused first version around one clear product idea.",
    price: "₦1,800,000",
    timeline: "6–10 weeks",
    href: "/shop/requests/new?service=mobile-app&package=mobile-launch",
    features: [
      "Cross-platform mobile app",
      "Up to 8 core screens",
      "Custom UI / UX",
      "User authentication",
      "Basic backend integration",
      "Core product workflow",
      "Push notification foundations",
      "Android or iOS release support",
    ],
  },

  {
    number: "02",
    name: "Mobile Growth",
    eyebrow: "Business Product",
    description:
      "For businesses that need a serious customer-facing product with transactions, data and administration.",
    price: "₦4,500,000",
    timeline: "10–16 weeks",
    recommended: true,
    href: "/shop/requests/new?service=mobile-app&package=mobile-growth",
    features: [
      "iOS + Android",
      "Advanced custom UI / UX",
      "User accounts & profiles",
      "Payments or subscriptions",
      "Push notifications",
      "Backend & database",
      "Business admin dashboard",
      "API integrations",
      "Analytics foundations",
      "Store release support",
    ],
  },

  {
    number: "03",
    name: "Custom Mobile",
    eyebrow: "Advanced Product",
    description:
      "For platforms requiring deeper architecture, multiple roles, real-time behaviour or business-critical workflows.",
    price: "₦8,500,000",
    timeline: "16+ weeks",
    href: "/shop/requests/new?service=mobile-app&package=custom-mobile",
    features: [
      "Custom product architecture",
      "Advanced mobile experience",
      "Multiple user roles",
      "Complex backend systems",
      "Advanced dashboards",
      "Custom APIs",
      "Real-time functionality",
      "Payments & integrations",
      "Location-based features",
      "Milestone-based delivery",
    ],
  },
];

const capabilities = [
  {
    title: "User Accounts",
    description:
      "Registration, authentication, profiles, verification and personalised user states.",
    icon: UsersRound,
  },
  {
    title: "Payments",
    description:
      "Purchases, subscriptions, bookings and transactional payment flows.",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    description:
      "Push alerts and product notifications designed around meaningful user events.",
    icon: BellRing,
  },
  {
    title: "Messaging",
    description:
      "Support, conversations and communication functionality where the product requires it.",
    icon: MessageSquareText,
  },
  {
    title: "Location",
    description:
      "Location-aware features for discovery, delivery, tracking and nearby services.",
    icon: MapPin,
  },
  {
    title: "Workflows",
    description:
      "Structured actions connecting users, data, approvals and operational processes.",
    icon: Workflow,
  },
];

const comparisonRows = [
  {
    label: "Cross-platform app",
    launch: "Included",
    growth: "Included",
    custom: "Included",
  },
  {
    label: "Core screens",
    launch: "Up to 8",
    growth: "Project based",
    custom: "Project based",
  },
  {
    label: "Custom UI / UX",
    launch: "Included",
    growth: "Advanced",
    custom: "Advanced",
  },
  {
    label: "User accounts",
    launch: "Included",
    growth: "Included",
    custom: "Advanced",
  },
  {
    label: "Backend",
    launch: "Basic",
    growth: "Included",
    custom: "Custom",
  },
  {
    label: "Payments",
    launch: "Optional",
    growth: "Included",
    custom: "As required",
  },
  {
    label: "Push notifications",
    launch: "Basic",
    growth: "Included",
    custom: "Advanced",
  },
  {
    label: "Admin dashboard",
    launch: "Optional",
    growth: "Included",
    custom: "Advanced",
  },
  {
    label: "API integrations",
    launch: "Limited",
    growth: "Standard",
    custom: "Advanced",
  },
  {
    label: "Multiple user roles",
    launch: "—",
    growth: "Limited",
    custom: "Included",
  },
  {
    label: "Real-time functionality",
    launch: "—",
    growth: "Optional",
    custom: "As required",
  },
];

const process = [
  {
    number: "01",
    title: "Product Discovery",
    description:
      "We define the users, business model, product objectives and the problem the application must solve.",
  },
  {
    number: "02",
    title: "Product Structure",
    description:
      "Core functionality, navigation, user roles and product journeys are mapped before development.",
  },
  {
    number: "03",
    title: "UX & Interface",
    description:
      "Screens and interactions are designed around mobile behaviour, clarity and your product identity.",
  },
  {
    number: "04",
    title: "Engineering",
    description:
      "The mobile application, backend systems, database and required integrations are implemented.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Critical workflows, device behaviour, user states and application performance are reviewed.",
  },
  {
    number: "06",
    title: "Release",
    description:
      "Production builds, deployment requirements and store-release preparation are completed.",
  },
];

const faqs = [
  {
    question: "How much does a Fynaro mobile app cost?",
    answer:
      "Focused mobile MVPs start from ₦1,800,000. More complete business applications typically begin from ₦4,500,000, while advanced custom mobile products start from ₦8,500,000. Final pricing depends on product scope, user roles, backend requirements and integrations.",
  },
  {
    question: "Can Fynaro build for Android and iOS?",
    answer:
      "Yes. Fynaro can build cross-platform products for Android and iOS. The final technical approach depends on the product requirements, audience and long-term roadmap.",
  },
  {
    question: "What is included in the starting price?",
    answer:
      "Starting scopes typically include product discovery, interface design, mobile development, agreed backend functionality, testing and deployment preparation. Third-party services, infrastructure and unusual integrations are scoped separately where required.",
  },
  {
    question: "Can the app include an admin dashboard?",
    answer:
      "Yes. Growth and Custom products can include web-based administration for managing users, orders, transactions, content or other business operations.",
  },
  {
    question: "Can I launch a smaller MVP first?",
    answer:
      "Yes. In many cases that is the strongest approach. We can identify the smallest useful version of the product, launch it and then expand based on actual user behaviour and business priorities.",
  },
  {
    question: "Are Apple and Google fees included?",
    answer:
      "External platform accounts, paid APIs, infrastructure, SMS services and similar third-party charges are normally paid separately by the client unless explicitly included in the project proposal.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function MobileAppsPage() {
  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
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

          <span>Mobile Apps</span>
        </div>

        <div className="mt-7 grid gap-8 xl:grid-cols-[1.25fr_.75fr] xl:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-[#f7f7f3]">
                <Smartphone
                  size={15}
                  strokeWidth={1.6}
                />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
                Mobile Applications / 02
              </p>
            </div>

            <h1 className="max-w-[850px] text-[44px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[72px]">
              Build the product
              <br />
              people carry.
            </h1>
          </div>

          <div>
            <p className="max-w-[430px] text-[13px] leading-6 text-black/48">
              Mobile products designed around real users, useful
              workflows and the systems your business needs behind
              the interface.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/shop/requests/new?service=mobile-app"
                className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Mobile Project
                <ArrowUpRight size={13} />
              </Link>

              <a
                href="#pricing"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.09] bg-white px-4 text-[11px] font-semibold text-black/50 transition hover:border-black/20 hover:text-black"
              >
                View pricing
                <ChevronDown size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* APP TYPES */}
      <section
        id="app-types"
        className="py-10 lg:py-12"
      >
        <SectionHeading
          eyebrow="What we build"
          title="Mobile products built around real use."
          description="Choose the closest direction. The final product is shaped around your users, workflows and commercial model."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {appTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex min-h-[225px] flex-col rounded-[18px] border border-black/[0.08] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-[#111] hover:text-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.035] transition group-hover:bg-white/10">
                    <Icon
                      size={14}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="text-[9px] font-semibold text-black/25 transition group-hover:text-white/25">
                    {item.number}
                  </span>
                </div>

                <div className="mt-auto pt-8">
                  <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 max-w-[350px] text-[10px] leading-5 text-black/45 transition group-hover:text-white/48">
                    {item.description}
                  </p>

                  <div className="mt-4 flex translate-y-1 items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/40 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Explore product
                    <ArrowUpRight size={10} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-t border-black/[0.08] py-10 lg:py-12"
      >
        <SectionHeading
          eyebrow="Investment"
          title="Clear starting points for mobile products."
          description="Choose the level closest to your product. Final investment is confirmed after discovery and technical scoping."
        />

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {mobilePackages.map((pkg) => (
            <Link
              key={pkg.name}
              href={pkg.href}
              className={[
                "group relative flex min-h-[520px] flex-col rounded-[19px] border p-6 transition-all duration-300",
                pkg.recommended
                  ? "border-[#111] bg-[#111] text-white hover:-translate-y-1"
                  : "border-black/[0.08] bg-white hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_55px_rgba(0,0,0,0.06)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-[8px] font-semibold uppercase tracking-[0.16em] ${
                      pkg.recommended
                        ? "text-white/35"
                        : "text-black/30"
                    }`}
                  >
                    {pkg.eyebrow}
                  </p>

                  <span
                    className={`mt-2 block text-[9px] font-semibold ${
                      pkg.recommended
                        ? "text-white/25"
                        : "text-black/20"
                    }`}
                  >
                    {pkg.number}
                  </span>
                </div>

                {pkg.recommended && (
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/55">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-7">
                <h3 className="text-[27px] font-semibold tracking-[-0.04em]">
                  {pkg.name}
                </h3>

                <p
                  className={`mt-3 max-w-[330px] text-[10px] leading-5 ${
                    pkg.recommended
                      ? "text-white/48"
                      : "text-black/44"
                  }`}
                >
                  {pkg.description}
                </p>
              </div>

              <div
                className={`mt-6 border-t pt-5 ${
                  pkg.recommended
                    ? "border-white/10"
                    : "border-black/[0.07]"
                }`}
              >
                <ul className="space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2.5 text-[10px] ${
                        pkg.recommended
                          ? "text-white/60"
                          : "text-black/50"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.recommended
                            ? "bg-white/10"
                            : "bg-black/[0.04]"
                        }`}
                      >
                        <Check size={10} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-7">
                <div
                  className={`flex items-center justify-between border-t pt-5 ${
                    pkg.recommended
                      ? "border-white/10"
                      : "border-black/[0.07]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-[8px] font-semibold uppercase tracking-[0.14em] ${
                        pkg.recommended
                          ? "text-white/30"
                          : "text-black/30"
                      }`}
                    >
                      Starting from
                    </p>

                    <p className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em]">
                      {pkg.price}
                    </p>

                    <p
                      className={`mt-1 text-[9px] ${
                        pkg.recommended
                          ? "text-white/32"
                          : "text-black/32"
                      }`}
                    >
                      Typical delivery: {pkg.timeline}
                    </p>
                  </div>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      pkg.recommended
                        ? "bg-white text-black"
                        : "bg-[#111] text-white"
                    }`}
                  >
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <p className="max-w-[750px] text-[9px] leading-4 text-black/32">
            Starting prices exclude unusual third-party licensing,
            infrastructure costs and external platform charges unless
            explicitly included in your proposal.
          </p>

          <Link
            href="/shop/requests/new?service=mobile-app"
            className="text-[9px] font-semibold text-black/45 transition hover:text-black"
          >
            Need a custom estimate →
          </Link>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <SectionHeading
          eyebrow="Compare"
          title="See what changes as the product grows."
          description="A quick view of how functionality changes across the three engagement levels."
        />

        <div className="mt-6 overflow-x-auto rounded-[18px] border border-black/[0.08] bg-white">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.08]">
              <div className="p-4" />

              <div className="p-4 text-[10px] font-semibold">
                Launch
              </div>

              <div className="bg-[#111] p-4 text-[10px] font-semibold text-white">
                Growth
              </div>

              <div className="p-4 text-[10px] font-semibold">
                Custom
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.06] last:border-b-0"
              >
                <div className="p-4 text-[10px] font-medium text-black/55">
                  {row.label}
                </div>

                <div className="p-4 text-[10px] text-black/40">
                  {row.launch}
                </div>

                <div className="bg-[#111] p-4 text-[10px] text-white/60">
                  {row.growth}
                </div>

                <div className="p-4 text-[10px] text-black/40">
                  {row.custom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid overflow-hidden rounded-[20px] bg-[#111] text-white lg:grid-cols-[1.2fr_.8fr]">
          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Platform strategy
            </p>

            <h2 className="mt-4 max-w-[580px] text-[32px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[40px]">
              Android, iOS or both.
            </h2>

            <p className="mt-4 max-w-[510px] text-[11px] leading-5 text-white/46">
              Technology follows the product. We choose the right
              approach based on audience, functionality, release
              strategy and long-term ownership.
            </p>
          </div>

          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:border-l lg:border-t-0">
            <div className="group flex min-h-[180px] flex-col justify-between border-white/10 p-6 transition hover:bg-white/[0.04] sm:border-r">
              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/25">
                01
              </span>

              <div>
                <p className="text-[20px] font-semibold">
                  iOS
                </p>

                <p className="mt-2 text-[10px] leading-5 text-white/40">
                  Products prepared for Apple's mobile ecosystem.
                </p>
              </div>
            </div>

            <div className="group flex min-h-[180px] flex-col justify-between p-6 transition hover:bg-white/[0.04]">
              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/25">
                02
              </span>

              <div>
                <p className="text-[20px] font-semibold">
                  Android
                </p>

                <p className="mt-2 text-[10px] leading-5 text-white/40">
                  Products built for Android users and device environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="The product behind the screens."
          description="Serious applications depend on systems, data and integrations working behind the interface."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group min-h-[190px] rounded-[17px] border border-black/[0.08] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:bg-[#f8f8f4]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.035] transition group-hover:bg-[#111] group-hover:text-white">
                  <Icon
                    size={13}
                    strokeWidth={1.5}
                  />
                </span>

                <h3 className="mt-6 text-[16px] font-semibold tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-[320px] text-[10px] leading-5 text-black/42">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SYSTEM VIEW */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid overflow-hidden rounded-[20px] bg-[#e9e9e3] lg:grid-cols-2">
          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Beyond mobile
            </p>

            <h2 className="mt-4 max-w-[560px] text-[31px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[38px]">
              The app may be one part of a larger system.
            </h2>

            <p className="mt-4 max-w-[500px] text-[11px] leading-5 text-black/45">
              Customer applications often need dashboards, APIs,
              databases and internal tools behind them. Fynaro can
              scope those pieces together as one product.
            </p>
          </div>

          <div className="border-t border-black/[0.07] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Example architecture
            </p>

            <div className="mt-5 space-y-2">
              {[
                "Customer mobile application",
                "Business web dashboard",
                "Admin control panel",
                "Database & backend",
                "Payment infrastructure",
                "Notifications & integrations",
              ].map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between rounded-[12px] bg-white/65 px-4 py-3.5 transition hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-semibold text-black/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[10px] font-medium">
                      {item}
                    </p>
                  </div>

                  <ArrowRight
                    size={11}
                    className="text-black/25 transition-transform group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <SectionHeading
          eyebrow="Process"
          title="From product idea to release."
          description="A structured product process keeps engineering aligned with what the business and users actually need."
        />

        <div className="mt-6 border-y border-black/[0.08]">
          {process.map((item) => (
            <div
              key={item.number}
              className="group grid gap-3 border-b border-black/[0.07] py-5 last:border-b-0 transition hover:bg-[#f8f8f4] sm:grid-cols-[65px_210px_1fr] sm:px-3"
            >
              <span className="text-[9px] font-semibold text-black/25">
                {item.number}
              </span>

              <h3 className="text-[13px] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>

              <p className="max-w-[620px] text-[10px] leading-5 text-black/42">
                {item.description}
              </p>
            </div>
          ))}
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
              Before we build.
            </h2>

            <p className="mt-3 max-w-[300px] text-[10px] leading-5 text-black/40">
              Important questions around scope, platforms, pricing and
              how the engagement works.
            </p>
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
        <div className="rounded-[20px] bg-[#111] p-7 text-white sm:p-9 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Mobile Development
              </p>

              <h2 className="mt-4 max-w-[700px] text-[34px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[46px]">
                Have an app idea?
                <br />
                Start with the problem.
              </h2>
            </div>

            <div>
              <p className="max-w-[410px] text-[11px] leading-5 text-white/45">
                Tell us who the product is for, what users need to do
                and what the business needs behind it. We'll shape the
                right scope from there.
              </p>

              <Link
                href="/shop/requests/new?service=mobile-app"
                className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-[11px] font-semibold text-black transition hover:bg-white/90"
              >
                Start Mobile Project
                <ArrowRight size={13} />
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

        <h2 className="mt-2 max-w-[650px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[32px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[420px] text-[10px] leading-5 text-black/42 lg:justify-self-end">
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
          <p className="max-w-[670px] pb-5 pr-8 text-[10px] leading-5 text-black/45">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}