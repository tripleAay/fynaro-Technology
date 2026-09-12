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

const appTypes = [
  {
    number: "01",
    title: "Consumer Apps",
    description:
      "Customer-facing mobile experiences built around usability, engagement and repeat interaction.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Commerce Apps",
    description:
      "Mobile shopping, ordering and transaction experiences built around products, payments and customers.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Business Apps",
    description:
      "Mobile tools that help teams manage operations, workflows, customers and internal processes.",
    icon: BriefcaseBusiness,
  },
  {
    number: "04",
    title: "Booking Apps",
    description:
      "Appointment, reservation and service-booking experiences with scheduling and customer flows.",
    icon: PanelsTopLeft,
  },
  {
    number: "05",
    title: "Membership Apps",
    description:
      "Private mobile experiences for communities, organizations, subscribers and recurring customers.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Custom Mobile Products",
    description:
      "Mobile products built around unique ideas, workflows and business models that need custom architecture.",
    icon: Layers3,
  },
];

const capabilities = [
  {
    title: "User Accounts",
    description:
      "Sign up, login, profiles, verification and personalized user experiences.",
    icon: UsersRound,
  },
  {
    title: "Payments",
    description:
      "Payment flows for purchases, subscriptions, bookings and other transactions.",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    description:
      "Push notifications and alerts that keep users connected to important activity.",
    icon: BellRing,
  },
  {
    title: "Messaging",
    description:
      "Customer support, conversations or communication features where the product requires them.",
    icon: MessageSquareText,
  },
  {
    title: "Location",
    description:
      "Location-aware experiences for delivery, discovery, tracking and nearby services.",
    icon: MapPin,
  },
  {
    title: "Workflows",
    description:
      "Structured actions that connect users, data, approvals and operational processes.",
    icon: Workflow,
  },
];

const process = [
  {
    number: "01",
    title: "Product Discovery",
    description:
      "We define the users, problem, business model, expected behaviour and the role the mobile app needs to play.",
  },
  {
    number: "02",
    title: "User Experience",
    description:
      "Key journeys, screens, navigation and interactions are mapped before heavy development begins.",
  },
  {
    number: "03",
    title: "Interface Design",
    description:
      "The app is designed for clarity, consistency, mobile ergonomics and the visual direction of the brand.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "The interface, application logic, backend connections and required integrations are implemented.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Critical flows are reviewed across devices, user states, responsiveness and application behaviour.",
  },
  {
    number: "06",
    title: "Release",
    description:
      "The production version is prepared for deployment and release, with further iterations scoped as needed.",
  },
];

const faqs = [
  {
    question: "How much does a mobile app cost?",
    answer:
      "Mobile applications are scoped individually because cost depends heavily on screens, user roles, backend functionality, integrations, platform requirements and product complexity.",
  },
  {
    question: "Can Fynaro build for both Android and iOS?",
    answer:
      "Yes. The exact development approach depends on the project requirements, target users and expected product behaviour.",
  },
  {
    question: "Do I need a website before building an app?",
    answer:
      "No. An app can exist as the primary product. Some projects may benefit from a supporting website or web dashboard, but that depends on the business.",
  },
  {
    question: "Can the app include an admin dashboard?",
    answer:
      "Yes. Many mobile products require a web-based admin or operational dashboard for managing users, content, transactions, orders or other business activity.",
  },
  {
    question: "Can I start with a smaller first version?",
    answer:
      "Yes. A focused first release can be scoped around the most important user journeys before additional functionality is added.",
  },
];

export default function MobileAppsPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="border-b border-black/[0.09] pb-14 lg:pb-20">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link href="/shop" className="transition hover:text-black">
            Dashboard
          </Link>

          <span>/</span>

          <span>Mobile Apps</span>
        </div>

        <div className="mt-10 grid gap-12 xl:grid-cols-[1.35fr_.65fr] xl:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white">
                <Smartphone size={17} strokeWidth={1.6} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Mobile Apps / 02
              </p>
            </div>

            <h1 className="max-w-[900px] text-[48px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[82px]">
              Build the product
              <br />
              people carry.
            </h1>
          </div>

          <div className="xl:pb-2">
            <p className="max-w-[460px] text-[14px] leading-7 text-black/50">
              Mobile experiences designed around real users, useful
              workflows and the way your business needs to operate.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop/requests/new?service=mobile-app"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Mobile Project
                <ArrowUpRight size={14} />
              </Link>

              <a
                href="#app-types"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-black/[0.1] bg-white px-5 text-[12px] font-semibold text-black/60 transition hover:text-black"
              >
                Explore app types
                <ChevronDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* APP TYPES */}
      <section id="app-types" className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="What we build"
          title="Mobile products for different kinds of businesses."
          description="Start with the closest category. The final application can be shaped around your exact users and workflows."
        />

        <div className="mt-10 grid overflow-hidden rounded-[22px] border border-black/[0.09] bg-white md:grid-cols-2 xl:grid-cols-3">
          {appTypes.map((item, index) => {
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

      {/* PLATFORM */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#111] text-white lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Platform
            </p>

            <h2 className="mt-6 max-w-[620px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[52px]">
              Android, iOS or both.
            </h2>

            <p className="mt-6 max-w-[530px] text-[13px] leading-6 text-white/50">
              The technology should follow the product. We determine the
              right approach based on your audience, functionality,
              release plan and long-term requirements.
            </p>
          </div>

          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:border-l lg:border-t-0">
            <div className="flex min-h-[240px] flex-col justify-between border-b border-white/10 p-8 sm:border-b-0 sm:border-r">
              <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                01
              </span>

              <div>
                <p className="text-[24px] font-semibold tracking-[-0.035em]">
                  iOS
                </p>

                <p className="mt-3 text-[12px] leading-6 text-white/45">
                  Experiences designed and built for Apple's mobile ecosystem.
                </p>
              </div>
            </div>

            <div className="flex min-h-[240px] flex-col justify-between p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                02
              </span>

              <div>
                <p className="text-[24px] font-semibold tracking-[-0.035em]">
                  Android
                </p>

                <p className="mt-3 text-[12px] leading-6 text-white/45">
                  Mobile products designed for Android users and devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="More than screens."
          description="Modern mobile products often depend on backend systems, customer data and integrations working quietly behind the interface."
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

      {/* PROJECT PRICING */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Project scope
            </p>

            <h2 className="mt-4 max-w-[420px] text-[34px] font-semibold leading-[1.02] tracking-[-0.04em]">
              Mobile projects are priced around the product.
            </h2>
          </div>

          <div className="rounded-[22px] border border-black/[0.09] bg-white p-7 sm:p-9 lg:p-10">
            <p className="max-w-[680px] text-[15px] leading-7 text-black/55">
              A mobile app with customer accounts, payments, notifications,
              maps and an admin system is a very different build from a
              smaller utility app.
            </p>

            <div className="mt-9 grid gap-px overflow-hidden rounded-[18px] border border-black/[0.08] bg-black/[0.07] sm:grid-cols-2">
              {[
                "Number of screens",
                "User roles",
                "Backend requirements",
                "Payments",
                "Third-party integrations",
                "Admin systems",
                "Device capabilities",
                "Release requirements",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-[#fafaf8] p-5"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.05]">
                    <Check size={11} />
                  </span>

                  <p className="text-[12px] text-black/55">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-black/[0.08] pt-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
                  Pricing
                </p>

                <p className="mt-2 text-[27px] font-semibold tracking-[-0.04em]">
                  Project based
                </p>
              </div>

              <Link
                href="/shop/requests/new?service=mobile-app"
                className="inline-flex h-11 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white"
              >
                Get an estimate
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RELATIONSHIP */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#e9e9e3] lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Mobile + Product
            </p>

            <h2 className="mt-6 max-w-[570px] text-[38px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[48px]">
              Sometimes the app is only one part of the system.
            </h2>

            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-black/50">
              Your mobile product may also require a web dashboard,
              backend services, administration tools or a customer-facing
              website. Fynaro can scope those pieces together as one system.
            </p>
          </div>

          <div className="border-t border-black/[0.08] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Example system
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Customer mobile app",
                "Business web dashboard",
                "Admin control panel",
                "Database & backend",
                "Payment infrastructure",
                "Notifications & integrations",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[14px] bg-white/60 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-semibold text-black/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[12px] font-medium">
                      {item}
                    </p>
                  </div>

                  <ArrowRight size={13} className="text-black/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Our process"
          title="From product idea to release."
          description="Mobile projects move through a structured product process rather than jumping directly into development."
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

      {/* FAQ */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Questions
            </p>

            <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.04em]">
              Before we build.
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
        <div className="rounded-[24px] bg-[#111] p-8 text-white sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Mobile Development
              </p>

              <h2 className="mt-5 max-w-[730px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[54px]">
                Have an app idea?
                <br />
                Start with the problem.
              </h2>
            </div>

            <div>
              <p className="max-w-[420px] text-[13px] leading-6 text-white/50">
                Tell us who the app is for, what users should be able
                to do and how it fits into your business. We'll help
                shape the right scope from there.
              </p>

              <Link
                href="/shop/requests/new?service=mobile-app"
                className="mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black"
              >
                Start Mobile Project
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