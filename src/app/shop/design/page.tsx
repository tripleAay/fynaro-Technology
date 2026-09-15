"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  Component,
  MonitorSmartphone,
  Palette,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                  SERVICES                                  */
/* -------------------------------------------------------------------------- */

const designServices = [
  {
    id: "brand-identity",
    number: "01",
    eyebrow: "Brand",
    title: "Brand Identity",
    description:
      "A complete visual foundation for businesses that need to look credible, consistent and recognisable.",
    price: "₦350,000",
    timeline: "2–4 weeks",
    icon: Palette,
    href: "/shop/requests/new?service=design&type=brand-identity&startingPrice=350000",
    deliverables: [
      "Primary logo system",
      "Logo variations",
      "Colour system",
      "Typography direction",
      "Visual language",
      "Brand guidelines",
      "Core brand assets",
    ],
    idealFor: "Businesses, startups & rebrands",
  },
  {
    id: "ui-ux",
    number: "02",
    eyebrow: "Digital",
    title: "UI / UX Design",
    description:
      "Digital interfaces designed around clear user journeys, commercial goals and intuitive interaction.",
    price: "₦500,000",
    timeline: "3–6 weeks",
    icon: MonitorSmartphone,
    href: "/shop/requests/new?service=design&type=ui-ux&startingPrice=500000",
    deliverables: [
      "UX direction",
      "User flows",
      "Wireframes",
      "Custom interface design",
      "Responsive states",
      "Interactive prototype",
      "Developer-ready handoff",
    ],
    idealFor: "Websites, mobile apps & SaaS",
  },
  {
    id: "product-design",
    number: "03",
    eyebrow: "Product",
    title: "Product Design",
    description:
      "End-to-end experience design for software products with deeper workflows, roles and product behaviour.",
    price: "₦850,000",
    timeline: "4–8 weeks",
    icon: Component,
    href: "/shop/requests/new?service=design&type=product-design&startingPrice=850000",
    deliverables: [
      "Product discovery",
      "Experience architecture",
      "Core user journeys",
      "Wireframes",
      "High-fidelity interfaces",
      "Interactive prototype",
      "Product design specification",
    ],
    idealFor: "Platforms, dashboards & SaaS",
  },
  {
    id: "design-system",
    number: "04",
    eyebrow: "System",
    title: "Design System",
    description:
      "Reusable components, visual rules and interface standards for products that need to scale consistently.",
    price: "₦650,000",
    timeline: "3–6 weeks",
    icon: Boxes,
    href: "/shop/requests/new?service=design&type=design-system&startingPrice=650000",
    deliverables: [
      "Typography system",
      "Colour tokens",
      "Spacing rules",
      "Core UI components",
      "Component states",
      "Usage patterns",
      "Design documentation",
    ],
    idealFor: "Growing digital products",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PROCESS                                  */
/* -------------------------------------------------------------------------- */

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "Business goals, audience, product context and requirements are established.",
  },
  {
    number: "02",
    title: "Direction",
    description:
      "The visual or experience direction is defined before detailed design begins.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "The identity, interface or product system is developed around the approved direction.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Feedback is incorporated while protecting consistency and the original objective.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Approved assets, files, prototypes and documentation are prepared for implementation.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

const faqs = [
  {
    question: "Are these fixed prices?",
    answer:
      "No. These are starting investments for defined scopes. The final quote depends on the number of screens, assets, concepts, product complexity, research requirements and delivery timeline.",
  },
  {
    question: "Can I hire Fynaro for design only?",
    answer:
      "Yes. Fynaro can deliver the approved identity, UI files, prototypes or design system for your own development or marketing team to implement.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Standard projects include structured revision rounds during the agreed design process. Additional rounds or major changes outside the approved direction can be scoped separately.",
  },
  {
    question: "Can Fynaro also develop what it designs?",
    answer:
      "Yes. Brand, UI/UX and product-design work can continue into a Fynaro web, mobile or custom-product development engagement.",
  },
  {
    question: "What do I need before starting?",
    answer:
      "You do not need a finished brief. Start with your business, product, target audience and what you are trying to improve or launch. Discovery helps clarify the rest.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function DesignPage() {
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

          <span>Design</span>
        </div>

        <div className="mt-7 grid gap-8 xl:grid-cols-[1.3fr_.7fr] xl:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f4ef]">
                <Palette
                  size={15}
                  strokeWidth={1.6}
                />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
                Design / 04
              </p>
            </div>

            <h1 className="max-w-[850px] text-[44px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]">
              Make the business
              <br />
              look as serious as it is.
            </h1>
          </div>

          <div>
            <p className="max-w-[420px] text-[12px] leading-6 text-black/48">
              Brand identity, UI/UX and product design built to improve
              recognition, usability and how your business is perceived.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#services"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
              >
                View Design Services
                <ChevronDown size={12} />
              </a>

              <Link
                href="/shop/requests/new?service=design"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.09] px-4 text-[10px] font-semibold text-black/50 transition hover:border-black/20 hover:text-black"
              >
                Request Design
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE + PRICING */}
      <section
        id="services"
        className="py-10 lg:py-12"
      >
        <SectionHeading
          eyebrow="Design services"
          title="Choose what you need designed."
          description="Clear starting scopes with room to expand when the project requires more depth."
        />

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {designServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="
                  group
                  relative
                  flex
                  min-h-[430px]
                  flex-col
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-black/[0.08]
                  bg-white
                  p-6
                  text-[#111]
                  transition-all
                  duration-300
                  ease-out

                  hover:-translate-y-[2px]
                  hover:border-black/[0.14]
                  hover:bg-[#f4f4ef]
                  hover:shadow-[0_14px_35px_rgba(0,0,0,0.045)]
                "
              >
                {/* SOFT ACCENT LINE */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-5
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    rounded-full
                    bg-[#c9c9bd]
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-x-100
                  "
                />

                {/* TOP */}
                <div className="relative z-10 flex items-start justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-black/[0.035]
                        text-black/55
                        transition-all
                        duration-300

                        group-hover:bg-white/80
                        group-hover:text-black/75
                        group-hover:shadow-[0_3px_10px_rgba(0,0,0,0.035)]
                      "
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.6}
                      />
                    </span>

                    <div>
                      <p
                        className="
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-black/30
                          transition-colors
                          duration-300
                          group-hover:text-black/48
                        "
                      >
                        {service.eyebrow}
                      </p>

                      <p className="mt-1 text-[8px] text-black/20">
                        {service.number}
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/[0.07]
                      bg-white/0
                      text-black/25
                      transition-all
                      duration-300

                      group-hover:border-black/[0.1]
                      group-hover:bg-white/65
                      group-hover:text-black/55
                    "
                  >
                    <ArrowUpRight size={11} />
                  </span>
                </div>

                {/* TITLE */}
                <div className="relative z-10 mt-7">
                  <h2 className="text-[25px] font-semibold tracking-[-0.04em]">
                    {service.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-[470px]
                      text-[10px]
                      leading-5
                      text-black/44
                      transition-colors
                      duration-300
                      group-hover:text-black/52
                    "
                  >
                    {service.description}
                  </p>
                </div>

                {/* DETAILS */}
                <div
                  className="
                    relative
                    z-10
                    mt-6
                    grid
                    gap-6
                    border-t
                    border-black/[0.07]
                    pt-5
                    transition-colors
                    duration-300
                    group-hover:border-black/[0.09]
                    sm:grid-cols-[1fr_.75fr]
                  "
                >
                  {/* INCLUDED */}
                  <div>
                    <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.14em] text-black/28">
                      Included
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2"
                        >
                          <span
                            className="
                              flex
                              h-4
                              w-4
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-black/[0.04]
                              text-black/40
                              transition-all
                              duration-300

                              group-hover:bg-white/80
                              group-hover:text-black/60
                            "
                          >
                            <Check size={8} />
                          </span>

                          <span
                            className="
                              text-[9px]
                              text-black/48
                              transition-colors
                              duration-300
                              group-hover:text-black/56
                            "
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BEST FOR */}
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/28">
                      Best for
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-black/48">
                      {service.idealFor}
                    </p>

                    <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-black/28">
                      Typical timeline
                    </p>

                    <p className="mt-1.5 text-[10px] font-medium text-black/55">
                      {service.timeline}
                    </p>
                  </div>
                </div>

                {/* PRICE + CTA */}
                <div
                  className="
                    relative
                    z-10
                    mt-auto
                    flex
                    items-end
                    justify-between
                    gap-5
                    border-t
                    border-black/[0.07]
                    pt-5
                    transition-colors
                    duration-300
                    group-hover:border-black/[0.09]
                  "
                >
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/28">
                      Starting from
                    </p>

                    <p className="mt-1.5 text-[23px] font-semibold tracking-[-0.04em]">
                      {service.price}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="
                      group/button
                      inline-flex
                      h-10
                      items-center
                      gap-2
                      rounded-full
                      bg-[#111]
                      px-4
                      text-[9px]
                      font-semibold
                      text-white
                      transition-all
                      duration-300

                      hover:bg-black/80

                      group-hover:shadow-[0_5px_15px_rgba(0,0,0,0.08)]
                    "
                  >
                    Start Project

                    <ArrowUpRight
                      size={11}
                      className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* PRICE NOTE */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[680px] text-[9px] leading-4 text-black/30">
            Starting prices are planning baselines. Final pricing is confirmed
            after scope, deliverables, complexity and timeline are reviewed.
          </p>

          <Link
            href="/shop/requests/new?service=design"
            className="group flex w-fit items-center gap-1.5 text-[9px] font-semibold text-black/40 transition hover:text-black"
          >
            Not sure which service?

            <ArrowRight
              size={10}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* DESIGN + BUILD */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid overflow-hidden rounded-[18px] bg-[#e9e9e3] lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-7 sm:p-8 lg:p-9">
            <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-black/35">
              Design + Engineering
            </p>

            <h2 className="mt-4 max-w-[550px] text-[29px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[36px]">
              The work does not have to stop at the mockup.
            </h2>

            <p className="mt-4 max-w-[480px] text-[10px] leading-5 text-black/45">
              When Fynaro also develops the website, application or product,
              the same product direction can continue directly into engineering.
            </p>

            <Link
              href="/shop/requests/new?service=design-and-development"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-4 text-[9px] font-semibold text-white transition hover:bg-black/80"
            >
              Discuss Design + Build
              <ArrowUpRight size={11} />
            </Link>
          </div>

          <div className="border-t border-black/[0.07] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
              One engagement can cover
            </p>

            <div className="mt-5">
              {[
                "Brand direction",
                "UX strategy",
                "Interface design",
                "Responsive development",
                "Product engineering",
                "Launch support",
              ].map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between border-b border-black/[0.07] py-3.5 first:pt-0 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-semibold text-black/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[10px] font-medium">
                      {item}
                    </span>
                  </div>

                  <ArrowRight
                    size={10}
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
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Process
            </p>

            <h2 className="mt-3 max-w-[350px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em]">
              Direction before decoration.
            </h2>

            <p className="mt-3 max-w-[330px] text-[10px] leading-5 text-black/40">
              Every engagement moves through a deliberate process so visual
              decisions are tied to a clear objective.
            </p>
          </div>

          <div className="border-y border-black/[0.08]">
            {process.map((item) => (
              <div
                key={item.number}
                className="grid gap-3 border-b border-black/[0.07] py-4 last:border-b-0 sm:grid-cols-[50px_130px_1fr]"
              >
                <span className="text-[8px] font-semibold text-black/30">
                  {item.number}
                </span>

                <h3 className="text-[11px] font-semibold">
                  {item.title}
                </h3>

                <p className="max-w-[540px] text-[9px] leading-5 text-black/42">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/[0.08] py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Questions
            </p>

            <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.035em]">
              Before we design.
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
        <div className="rounded-[18px] bg-[#e9e9e3] p-7 sm:p-9 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={10}
                  className="text-black/35"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-black/35">
                  Design with Fynaro
                </p>
              </div>

              <h2 className="mt-4 max-w-[660px] text-[32px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[42px]">
                Make it clearer.
                <br />
                Make it recognisable.
              </h2>
            </div>

            <div>
              <p className="max-w-[390px] text-[10px] leading-5 text-black/45">
                Choose a service above or tell us what you are building.
                We will recommend the right scope.
              </p>

              <Link
                href="/shop/requests/new?service=design"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
              >
                Start Design Project
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
/*                                    FAQ                                     */
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
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.08] transition-all duration-300",
            open
              ? "rotate-180 bg-[#e9e9e3] text-black"
              : "group-hover:border-black/15 group-hover:bg-[#f4f4ef]",
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