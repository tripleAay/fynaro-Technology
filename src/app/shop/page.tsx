"use client";

import Link from "next/link";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Layers3,
  Palette,
  Plus,
  Smartphone,
} from "lucide-react";

type Capability = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  priceLabel: string;
  price?: string;
  items: string[];
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
};

const capabilities: Capability[] = [
  {
    number: "01",
    eyebrow: "Web",
    title: "Web Development",
    description:
      "Websites built for businesses that expect more from the web.",
    href: "/shop/web-development",
    priceLabel: "From",
    price: "₦350,000",
    items: [
      "Business websites",
      "Ecommerce",
      "Web platforms",
    ],
    icon: Globe2,
  },
  {
    number: "02",
    eyebrow: "Mobile",
    title: "Mobile Apps",
    description:
      "Mobile experiences designed around users and real workflows.",
    href: "/shop/mobile",
    priceLabel: "Project based",
    items: [
      "iOS & Android",
      "Cross-platform",
      "Business apps",
    ],
    icon: Smartphone,
  },
  {
    number: "03",
    eyebrow: "Product",
    title: "Digital Products",
    description:
      "Platforms and software built around how your business works.",
    href: "/shop/product",
    priceLabel: "From",
    price: "₦1,500,000",
    items: [
      "SaaS products",
      "Dashboards",
      "Marketplaces",
    ],
    icon: Layers3,
  },
  {
    number: "04",
    eyebrow: "Design",
    title: "Design",
    description:
      "Brand and digital product design with clarity and purpose.",
    href: "/shop/design",
    priceLabel: "Explore services",
    items: [
      "Brand identity",
      "UI / UX",
      "Product design",
    ],
    icon: Palette,
  },
];

const startingPoints = [
  {
    title: "Business Website",
    description: "A professional digital home for your business.",
    price: "From ₦350,000",
    href: "/shop/web-development/launch",
  },
  {
    title: "Ecommerce Store",
    description: "Sell, manage and operate online.",
    price: "From ₦750,000",
    href: "/shop/web-development/growth",
  },
  {
    title: "Brand Identity",
    description: "Build a visual system your business can grow with.",
    price: "Explore packages",
    href: "/shop/design",
  },
  {
    title: "Custom Platform",
    description: "Build a product beyond a conventional website.",
    price: "From ₦1,500,000",
    href: "/shop/product",
  },
];

const activity = [
  {
    title: "Payment received",
    meta: "Growth Website",
    value: "₦375,000",
    date: "Sep 07",
  },
  {
    title: "Homepage design approved",
    meta: "NewJersey.ng",
    value: "Design milestone",
    date: "Sep 06",
  },
  {
    title: "Proposal ready",
    meta: "Brand Identity",
    value: "Review proposal",
    date: "Sep 04",
  },
];

export default function FynaroDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="border-b border-black/[0.09] pb-10 lg:pb-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
          Fynaro / Client Workspace
        </p>

        <div className="mt-8 grid gap-10 xl:grid-cols-[1fr_400px] xl:items-end">
          <div>
            <p className="mb-4 text-[13px] font-medium text-black/45">
              Welcome back, Shina.
            </p>

            <h1 className="max-w-[780px] text-[46px] font-semibold leading-[0.93] tracking-[-0.055em] sm:text-[60px] lg:text-[76px]">
              What are we
              <br />
              building?
            </h1>
          </div>

          <div className="xl:pb-1">
            <p className="max-w-[390px] text-[14px] leading-7 text-black/50">
              Start something new with Fynaro or continue managing
              an existing project from your workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/shop/requests/new"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white transition hover:bg-black/80"
              >
                <Plus size={15} />
                Start a project
              </Link>

              <a
                href="#capabilities"
                className="inline-flex h-12 items-center gap-3 rounded-full px-4 text-[12px] font-semibold text-black/55 transition hover:text-black"
              >
                Explore our capabilities
                <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="py-12 lg:py-16">
        <SectionHeading
          eyebrow="Capabilities"
          title="Build with Fynaro."
          description="Choose what you're trying to create. We'll take you into the right service, scope and starting point."
        />

        <div className="mt-8 grid overflow-hidden rounded-[22px] border border-black/[0.1] bg-white lg:grid-cols-2">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="border-t border-black/[0.09] py-12 lg:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Your workspace
            </p>

            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.035em]">
              2 active projects
            </h2>
          </div>

          <Link
            href="/shop/projects"
            className="flex items-center gap-2 text-[12px] font-semibold text-black/45 transition hover:text-black"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          {/* Main project */}
          <Link
            href="/shop/projects/newjersey"
            className="group rounded-[20px] border border-black/[0.09] bg-white p-6 transition hover:border-black/20 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/35">
                  Web Development
                </p>

                <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
                  NewJersey.ng Website
                </h3>
              </div>

              <StatusBadge label="Active" />
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-black/40">
                  Project progress
                </span>
                <span className="font-semibold">68%</span>
              </div>

              <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-black/[0.07]">
                <div className="h-full w-[68%] rounded-full bg-[#111]" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-black/[0.08] pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-black/30">
                  Next milestone
                </p>

                <p className="mt-2 text-[13px] font-medium">
                  Frontend implementation
                </p>
              </div>

              <span className="flex items-center gap-2 text-[12px] font-semibold">
                Open project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          {/* Needs attention */}
          <div className="rounded-[20px] bg-[#111] p-6 text-white sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/35">
              Needs attention
            </p>

            <h3 className="mt-5 max-w-[300px] text-[26px] font-semibold leading-[1.05] tracking-[-0.035em]">
              2 things are waiting for you.
            </h3>

            <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
              <Link
                href="/shop/proposals"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <p className="text-[12px] font-medium">
                    Proposal ready
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
                    Brand Identity
                  </p>
                </div>

                <ChevronRight
                  size={15}
                  className="text-white/40 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/shop/projects"
                className="group flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <p className="text-[12px] font-medium">
                    Design approval
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
                    NewJersey.ng
                  </p>
                </div>

                <ChevronRight
                  size={15}
                  className="text-white/40 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STARTING POINTS */}
      <section className="border-t border-black/[0.09] py-12 lg:py-16">
        <SectionHeading
          eyebrow="Popular starting points"
          title="Start with something clear."
          description="Common ways clients begin working with Fynaro."
        />

        <div className="mt-8 border-y border-black/[0.09]">
          {startingPoints.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group grid gap-4 border-b border-black/[0.08] py-6 last:border-b-0 sm:grid-cols-[1fr_1fr_auto] sm:items-center lg:py-7"
            >
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[12px] leading-5 text-black/40 sm:hidden">
                  {item.description}
                </p>
              </div>

              <p className="hidden max-w-[330px] text-[12px] leading-5 text-black/40 sm:block">
                {item.description}
              </p>

              <div className="flex items-center gap-5">
                <span className="text-[12px] font-medium text-black/50">
                  {item.price}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* GUIDANCE CTA */}
      <section className="py-6 lg:py-10">
        <div className="grid overflow-hidden rounded-[24px] bg-[#e9e9e3] lg:grid-cols-[1.25fr_.75fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Not sure where to start?
            </p>

            <h2 className="mt-6 max-w-[600px] text-[36px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[46px]">
              Tell us what you're trying to make happen.
            </h2>

            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-black/50">
              You don't need to know the technical solution.
              Describe the business, problem or idea and Fynaro will
              help shape the right approach.
            </p>

            <Link
              href="/shop/requests/new"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-5 text-[12px] font-semibold text-white"
            >
              Tell us about your idea
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative hidden border-l border-black/[0.08] lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border border-black/[0.12]">
                <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#111] text-white">
                  <ArrowUpRight size={28} strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="border-t border-black/[0.09] py-12 lg:py-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Workspace
            </p>

            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.035em]">
              Recent activity
            </h2>
          </div>
        </div>

        <div className="mt-7">
          {activity.map((item) => (
            <div
              key={`${item.title}-${item.date}`}
              className="grid gap-2 border-t border-black/[0.08] py-5 sm:grid-cols-[90px_1fr_1fr_auto] sm:items-center"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-black/30">
                {item.date}
              </span>

              <p className="text-[13px] font-semibold">
                {item.title}
              </p>

              <p className="text-[12px] text-black/40">
                {item.meta}
              </p>

              <p className="text-[12px] font-medium text-black/60">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  const Icon = capability.icon;

  const desktopBorders =
    index === 0
      ? "lg:border-r lg:border-b"
      : index === 1
        ? "lg:border-b"
        : index === 2
          ? "lg:border-r"
          : "";

  return (
    <Link
      href={capability.href}
      className={[
        "group relative flex min-h-[390px] flex-col p-7 transition-colors duration-300 sm:p-9 lg:p-10",
        "border-b border-black/[0.09] last:border-b-0 lg:border-b-0",
        desktopBorders,
        "hover:bg-[#f7f7f3]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.09]">
            <Icon size={15} strokeWidth={1.6} />
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
            {capability.eyebrow}
          </span>
        </div>

        <span className="text-[11px] font-semibold text-black/25">
          {capability.number}
        </span>
      </div>

      <div className="mt-10">
        <h3 className="text-[30px] font-semibold tracking-[-0.04em] sm:text-[34px]">
          {capability.title}
        </h3>

        <p className="mt-4 max-w-[390px] text-[13px] leading-6 text-black/48">
          {capability.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {capability.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/[0.08] px-3 py-1.5 text-[10px] font-medium text-black/45"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-6 pt-10">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
            {capability.priceLabel}
          </p>

          {capability.price && (
            <p className="mt-1 text-[21px] font-semibold tracking-[-0.03em]">
              {capability.price}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
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

        <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] sm:text-[38px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[430px] text-[12px] leading-6 text-black/45 lg:justify-self-end">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#edf4ed] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#315d38]">
      <CheckCircle2 size={11} />
      {label}
    </span>
  );
}







// "use client";

// import { useState, useEffect } from "react";
// import DashboardHeader from "../../components/dashboard components/mainheader";
// import HeroSlider from "../../components/dashboard components/mainheroe";
// import Collections from "../../components/dashboard components/collections";
// import ProductTileGrid from "@/components/dashboard components/ProductTileGridMirror";
// import HotStuffSection from "../../components/dashboard components/hotstuffSections";
// import Footer from "../../components/footer";
// import ExploreByCategorySection from "@/components/dashboard components/exploreByCategorySection";
// import HowItWorksSection from "@/components/dashboard components/howItWorksSection";
// import ProjectModeCTA from "../../components/dashboard components/projectModeCTA";

// const dashboardCategories = [
//   {
//     id: "web-services",
//     name: "Web & Mobile App",
//     image: "/categories/web.png",
//     description:
//       "High-performance websites, mobile apps and digital product experiences crafted to position your brand with clarity, speed and premium execution.",
//     badge: "Digital Build",
//   },
//   {
//     id: "services",
//     name: "Services",
//     image: "/categories/design.png",
//     description:
//       "Explore Fynaro’s service offers, pricing and execution options across websites, design, product support and brand-focused solutions for serious businesses.",
//     badge: "Pricing & Offers",
//   },
//   {
//     id: "printed-products",
//     name: "Printed Products",
//     image: "/categories/print.png",
//     description:
//       "Premium print, packaging and branded materials designed to carry your identity beautifully into the physical world.",
//     badge: "Physical Brand",
//   },
// ];

// export default function ShopPage() {
//   const [activeCategoryId, setActiveCategoryId] = useState<string | number>(
//     "web-services"
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#050506] text-white">
//       <DashboardHeader />

//       <main className="pt-16">
//         {isLoading ? (
//           <section className="px-4 sm:px-6 lg:px-10 mt-4 animate-pulse">
//             <div className="max-w-6xl mx-auto">
//               <div className="h-40 sm:h-56 lg:h-64 rounded-3xl bg-gradient-to-r from-neutral-800/70 to-neutral-900/70 border border-neutral-800/60" />
//               <div className="mt-4 flex gap-3">
//                 <div className="h-8 w-32 rounded-full bg-neutral-800/80" />
//                 <div className="h-8 w-20 rounded-full bg-neutral-800/60" />
//               </div>
//             </div>
//           </section>
//         ) : (
//           <HeroSlider />
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-40 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-20 rounded-full bg-neutral-800/60" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-32 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-3/4 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1.5" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <Collections />
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-40 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-20 rounded-full bg-neutral-800/60" />
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-32 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-3/4 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1.5" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold tracking-tight">
//                 Featured Products
//               </h2>
//               <button className="text-sm text-white/60 hover:text-white transition">
//                 View all
//               </button>
//             </div>

//             <ProductTileGrid />
//           </section>
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-32 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-16 rounded-full bg-neutral-800/60" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-24 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-2/3 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <HotStuffSection />
//         )}

//         <ExploreByCategorySection
//           isLoading={isLoading}
//           categories={dashboardCategories}
//           activeCategoryId={activeCategoryId}
//           onSelectCategory={(cat) => {
//             setActiveCategoryId(cat.id);
//             console.log("Selected category:", cat.id);
//           }}
//         />

//         <HowItWorksSection isLoading={isLoading} />
//         <ProjectModeCTA />
//       </main>

//       <Footer />
//     </div>
//   );
// }