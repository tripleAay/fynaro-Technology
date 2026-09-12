"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Brush,
  Check,
  ChevronDown,
  Component,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import { useState } from "react";

const designCategories = [
  {
    number: "01",
    eyebrow: "Brand",
    title: "Brand Identity",
    description:
      "Visual identity systems that give businesses a clearer, more recognizable and more consistent presence.",
    icon: Palette,
    href: "/shop/design/brand",
    items: [
      "Logo systems",
      "Visual direction",
      "Brand guidelines",
      "Campaign assets",
    ],
  },
  {
    number: "02",
    eyebrow: "Digital",
    title: "UI / UX Design",
    description:
      "Interfaces designed around real user journeys, business goals and clear interaction patterns.",
    icon: MonitorSmartphone,
    href: "/shop/design/ui-ux",
    items: [
      "Website interfaces",
      "Mobile interfaces",
      "User journeys",
      "Interaction design",
    ],
  },
  {
    number: "03",
    eyebrow: "Product",
    title: "Product Design",
    description:
      "End-to-end product thinking for platforms, dashboards, applications and software experiences.",
    icon: Component,
    href: "/shop/design/product",
    items: [
      "Product flows",
      "Wireframes",
      "Prototypes",
      "Interface systems",
    ],
  },
  {
    number: "04",
    eyebrow: "Systems",
    title: "Design Systems",
    description:
      "Reusable visual and interface rules that keep digital products consistent as they grow.",
    icon: Boxes,
    href: "/shop/design/design-systems",
    items: [
      "Components",
      "Typography",
      "Spacing systems",
      "Interface standards",
    ],
  },
];

const brandServices = [
  "Logo identity",
  "Typography direction",
  "Colour systems",
  "Brand guidelines",
  "Social templates",
  "Marketing assets",
  "Campaign direction",
  "Brand refresh",
];

const digitalServices = [
  "Website UI design",
  "Mobile app design",
  "Dashboard design",
  "SaaS interface design",
  "Wireframing",
  "Interactive prototypes",
  "UX flows",
  "Design systems",
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We establish the business, audience, goals, product context and what the design needs to communicate or accomplish.",
  },
  {
    number: "02",
    title: "Direction",
    description:
      "Visual references, structure and creative direction are used to define a clear path before detailed design begins.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "The identity or interface system is developed around the approved direction and project requirements.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Feedback is reviewed and the work is refined while protecting consistency and the original design objective.",
  },
  {
    number: "05",
    title: "Systemize",
    description:
      "Reusable rules, components and visual decisions are organized so the work remains consistent beyond one screen or asset.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "Final design files, guidelines, components or approved assets are prepared for implementation and continued use.",
  },
];

const faqs = [
  {
    question: "Can Fynaro design without developing the product?",
    answer:
      "Yes. Design can be handled as a standalone engagement. Fynaro can deliver approved interface files, prototypes and design systems for another development team to implement.",
  },
  {
    question: "Can Fynaro redesign an existing brand?",
    answer:
      "Yes. Existing brands can be refreshed or repositioned while retaining useful parts of the current identity where appropriate.",
  },
  {
    question: "What is the difference between UI/UX and product design?",
    answer:
      "UI/UX focuses heavily on interface structure, user journeys and screen design. Product design extends that thinking into the broader product itself, including workflows, feature behaviour and how the experience fits together.",
  },
  {
    question: "Can branding and website design be one project?",
    answer:
      "Yes. Brand identity, website design and development can be scoped together when a business needs a more complete launch or repositioning.",
  },
  {
    question: "Do design projects use fixed packages?",
    answer:
      "Some design work can fit defined packages, while larger identity systems and product design engagements are scoped around the actual requirements.",
  },
];

export default function DesignPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="border-b border-black/[0.09] pb-14 lg:pb-20">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link href="/shop" className="transition hover:text-black">
            Dashboard
          </Link>

          <span>/</span>

          <span>Design</span>
        </div>

        <div className="mt-10 grid gap-12 xl:grid-cols-[1.35fr_.65fr] xl:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.1] bg-white">
                <Palette size={17} strokeWidth={1.6} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Design / 04
              </p>
            </div>

            <h1 className="max-w-[900px] text-[48px] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[82px]">
              Design what people
              <br />
              see, use and remember.
            </h1>
          </div>

          <div className="xl:pb-2">
            <p className="max-w-[460px] text-[14px] leading-7 text-black/50">
              Brand identity, interfaces and product systems designed
              to make businesses clearer, stronger and easier to use.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop/requests/new?service=design"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Design Project
                <ArrowUpRight size={14} />
              </Link>

              <a
                href="#design-services"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-black/[0.1] bg-white px-5 text-[12px] font-semibold text-black/60 transition hover:text-black"
              >
                Explore services
                <ChevronDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DESIGN CATEGORIES */}
      <section id="design-services" className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="Design capabilities"
          title="Two sides of the same experience."
          description="Your brand shapes how people recognize you. Your interface shapes how they experience you."
        />

        <div className="mt-10 grid overflow-hidden rounded-[22px] border border-black/[0.09] bg-white lg:grid-cols-2">
          {designCategories.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={[
                  "group flex min-h-[390px] flex-col p-7 transition hover:bg-[#f8f8f4] sm:p-9 lg:p-10",
                  "border-b border-black/[0.08]",
                  index % 2 === 0 ? "lg:border-r" : "",
                  index >= 2 ? "lg:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.09]">
                      <Icon size={16} strokeWidth={1.6} />
                    </div>

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                      {item.eyebrow}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-black/25">
                    {item.number}
                  </span>
                </div>

                <div className="mt-10">
                  <h3 className="text-[30px] font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[430px] text-[13px] leading-6 text-black/48">
                    {item.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.items.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-black/[0.08] px-3 py-1.5 text-[10px] font-medium text-black/45"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-10">
                  <span className="text-[12px] font-semibold">
                    Explore service
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111] text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BRAND VS DIGITAL */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] border border-black/[0.09] lg:grid-cols-2">
          {/* Brand */}
          <div className="bg-[#111] p-8 text-white sm:p-10 lg:p-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
              <Brush size={17} strokeWidth={1.5} />
            </div>

            <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Brand Design
            </p>

            <h2 className="mt-4 max-w-[500px] text-[38px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[46px]">
              Build the identity people recognize.
            </h2>

            <p className="mt-6 max-w-[500px] text-[13px] leading-6 text-white/50">
              For businesses that need a clear visual language across
              their identity, marketing and customer-facing materials.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
              {brandServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 border-t border-white/10 pt-4"
                >
                  <Check size={12} className="text-white/35" />
                  <span className="text-[11px] text-white/60">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/shop/design/brand"
              className="mt-10 inline-flex h-11 items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black"
            >
              Explore Brand Design
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Digital */}
          <div className="bg-white p-8 sm:p-10 lg:p-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.09]">
              <LayoutTemplate size={17} strokeWidth={1.5} />
            </div>

            <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Digital Design
            </p>

            <h2 className="mt-4 max-w-[500px] text-[38px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[46px]">
              Design the experience people use.
            </h2>

            <p className="mt-6 max-w-[500px] text-[13px] leading-6 text-black/50">
              For websites, applications and digital products where
              usability, hierarchy and interaction matter as much as
              appearance.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
              {digitalServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 border-t border-black/[0.08] pt-4"
                >
                  <Check size={12} className="text-black/30" />
                  <span className="text-[11px] text-black/55">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/shop/design/ui-ux"
              className="mt-10 inline-flex h-11 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white"
            >
              Explore Digital Design
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <SectionHeading
          eyebrow="Design system"
          title="Good design should keep working after one screen."
          description="Fynaro can build reusable visual rules that make future pages, features and assets feel like part of the same product."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-black/[0.09] bg-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Typography",
              description:
                "Type scales and hierarchy that create consistency across content.",
              icon: Type,
            },
            {
              title: "Components",
              description:
                "Reusable interface elements designed to behave consistently.",
              icon: Component,
            },
            {
              title: "Visual Language",
              description:
                "Shape, spacing, imagery and styling decisions that belong together.",
              icon: Shapes,
            },
            {
              title: "Patterns",
              description:
                "Repeatable interaction and layout approaches for future product growth.",
              icon: PenTool,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="min-h-[260px] bg-white p-7"
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-black/40"
                />

                <h3 className="mt-12 text-[20px] font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[12px] leading-6 text-black/45">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESIGN + BUILD */}
      <section className="border-t border-black/[0.09] py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[#e9e9e3] lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Design + Development
            </p>

            <h2 className="mt-6 max-w-[620px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[50px]">
              Design does not have to stop at the mockup.
            </h2>

            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-black/50">
              When Fynaro is also building the website, app or product,
              the same team can carry the design direction through into
              implementation.
            </p>
          </div>

          <div className="border-t border-black/[0.08] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
              One engagement can include
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Brand direction",
                "UX strategy",
                "Interface design",
                "Responsive development",
                "Product implementation",
                "Launch support",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[14px] bg-white/65 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-semibold text-black/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[12px] font-medium">
                      {item}
                    </span>
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
          eyebrow="Process"
          title="From direction to system."
          description="Design moves through a defined sequence so decisions are intentional rather than a collection of disconnected visuals."
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
              Before we design.
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

      {/* CTA */}
      <section className="pb-6 pt-4 lg:pb-10">
        <div className="relative overflow-hidden rounded-[24px] bg-[#111] p-8 text-white sm:p-10 lg:p-14">
          <Sparkles
            size={240}
            strokeWidth={0.25}
            className="absolute -right-16 -top-16 text-white/[0.07]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Design with Fynaro
              </p>

              <h2 className="mt-5 max-w-[720px] text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[54px]">
                Make the business
                <br />
                easier to recognize.
                <br />
                Easier to use.
              </h2>
            </div>

            <div>
              <p className="max-w-[420px] text-[13px] leading-6 text-white/50">
                Tell us whether you're building a brand, redesigning an
                interface or shaping a complete product experience.
              </p>

              <Link
                href="/shop/requests/new?service=design"
                className="mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black"
              >
                Start Design Project
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