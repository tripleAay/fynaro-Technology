








"use client";

import { motion } from "framer-motion";
import Header from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";

const services = [
  {
    number: "01",
    title: "Products",
    headline: "Digital products shaped around real use.",
    description:
      "We help turn ideas into usable digital products with clear structure, thoughtful flows, and execution that makes sense from concept to launch.",
    offers: [
      "Product strategy",
      "User flow planning",
      "Interface direction",
      "MVP definition",
    ],
    features: [
      "Clear product thinking",
      "User-centered structure",
      "Scalable decision-making",
      "Execution-ready direction",
    ],
    outcome:
      "A product with clarity, purpose, and a direction that is ready to be built well.",
  },
  {
    number: "02",
    title: "Branding",
    headline: "Identity systems with position and meaning.",
    description:
      "Branding is not decoration. We build identities that help businesses look distinct, feel intentional, and communicate with confidence across touchpoints.",
    offers: [
      "Brand identity",
      "Creative direction",
      "Visual systems",
      "Brand application",
    ],
    features: [
      "Clear positioning",
      "Premium visual language",
      "Consistency across platforms",
      "Designed for recognition",
    ],
    outcome:
      "A stronger brand presence that feels aligned, credible, and easier for people to trust.",
  },
  {
    number: "03",
    title: "Web",
    headline: "Web experiences built to present and convert.",
    description:
      "From brand websites to business platforms, we design and build web experiences that are fast, refined, and focused on communication, trust, and action.",
    offers: [
      "Company websites",
      "Landing pages",
      "Portfolio platforms",
      "Business web systems",
    ],
    features: [
      "Responsive layouts",
      "Modern UI systems",
      "Performance-minded builds",
      "Conversion-aware structure",
    ],
    outcome:
      "A website that does more than sit online — it represents, persuades, and performs.",
  },
  {
    number: "04",
    title: "Mobile Apps",
    headline: "Mobile experiences designed for real interaction.",
    description:
      "We design mobile app experiences with structure, usability, and clarity so the product feels intuitive, polished, and ready for adoption.",
    offers: [
      "App UI/UX design",
      "Mobile product flows",
      "Prototype design",
      "Design systems for apps",
    ],
    features: [
      "Simple user journeys",
      "Clean interaction thinking",
      "Strong visual consistency",
      "Built for usability",
    ],
    outcome:
      "A mobile product experience that feels focused, modern, and ready to grow with users.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="bg-black text-white overflow-hidden">
        <Header />

        {/* HERO */}
        {/* HERO */}
<section className="relative flex min-h-screen items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
  
  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <img
      src="/images/ayush-kumar-QwwjJ1297cA-unsplash.jpg" // 🔁 replace with your image
      alt=""
      className="w-full h-full object-cover"
    />
    
    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/70" />

    {/* OPTIONAL GRADIENT (premium depth) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 mx-auto max-w-6xl text-center">
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 text-[11px] font-medium tracking-[0.45em] text-white/50"
    >
      STRATEGY DESIGN CODE
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
    >
      We build brands,
      <br />
      products, websites,
      <br />
      and mobile apps
      <span className="text-[#d6cc6d]"> with intent.</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
    >
      Fynaro Tech helps businesses shape digital presence and digital
      products with clarity — from identity and interface to web and mobile experience.
    </motion.p>
  </div>
</section>

        {/* INTRO STRIP */}
        <section className="border-y border-white/8 px-6 py-10">
  <div className="mx-auto grid max-w-6xl gap-6 text-center md:grid-cols-4 md:text-left">
    {["Products", "Branding", "Web", "Mobile Apps"].map((item) => (
      <div
        key={item}
        className="
          group relative overflow-hidden rounded-2xl
          border border-white/8
          bg-white/[0.02]
          px-6 py-8
          transition-all duration-500 ease-out

          hover:-translate-y-2
          hover:border-[#d6cc6d]/40
          hover:bg-white/[0.04]
        "
      >
        {/* subtle gradient sweep */}
        <div
          className="
            pointer-events-none absolute inset-0 opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
            bg-gradient-to-br from-[#d6cc6d]/10 via-transparent to-transparent
          "
        />

        {/* glow blur */}
        <div
          className="
            pointer-events-none absolute -inset-1 rounded-2xl
            opacity-0 blur-xl transition duration-500
            group-hover:opacity-100
            bg-[#d6cc6d]/10
          "
        />

        {/* content */}
        <p
          className="
            relative z-10 text-sm font-medium tracking-wide
            text-white/80 transition-all duration-300

            group-hover:text-white
            group-hover:tracking-[0.08em]
          "
        >
          {item}
        </p>

        {/* underline accent */}
        <div
          className="
            relative z-10 mt-4 h-[2px] w-0 bg-[#d6cc6d]
            transition-all duration-500
            group-hover:w-10
          "
        />
      </div>
    ))}
  </div>
</section>

        {/* SERVICES */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl space-y-24">
            {services.map((service, index) => (
              <ServiceBlock key={service.number} {...service} index={index} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/8 px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-[11px] tracking-[0.35em] text-white/40">
              STRATEGY DESIGN CODE
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Build with clarity.
              <br />
              Launch with confidence.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60">
              Whether you need a product direction, a sharper brand, a better
              website, or a stronger app experience, the goal is the same:
              build something that works and feels right.
            </p>
            <button className="mt-10 rounded-full bg-[#d6cc6d] px-10 py-4 text-sm font-medium text-black transition hover:bg-[#e5d97a]">
              Start a Project
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ServiceBlock({
  number,
  title,
  headline,
  description,
  offers,
  features,
  outcome,
  index,
}: {
  number: string;
  title: string;
  headline: string;
  description: string;
  offers: string[];
  features: string[];
  outcome: string;
  index: number;
}) {
  return (
    <section className="border-t border-white/8 pt-16 first:border-t-0 first:pt-0">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: index * 0.04 }}
          className="md:col-span-5"
        >
          <p className="mb-4 text-[11px] tracking-[0.35em] text-white/35">
            {number}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-xl leading-8 text-[#d6cc6d]">
            {headline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="md:col-span-7"
        >
          <p className="max-w-2xl text-base leading-8 text-white/65">
            {description}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="mb-5 text-[11px] tracking-[0.28em] text-white/35">
                WHAT WE DO
              </p>
              <ul className="space-y-4 text-sm text-white/75">
                {offers.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#d6cc6d]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="mb-5 text-[11px] tracking-[0.28em] text-white/35">
                WHAT IT GIVES
              </p>
              <ul className="space-y-4 text-sm text-white/75">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#d6cc6d]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#d6cc6d]/20 bg-[#d6cc6d]/[0.06] p-6">
            <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
              OUTCOME
            </p>
            <p className="text-lg leading-8 text-white">{outcome}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}