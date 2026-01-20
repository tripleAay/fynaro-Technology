"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";

type CaseStudy = {
  id: string;
  clientName: string;
  tag: string;
  headline: string;
  details: string;
  stat?: string;
  deviceMockup: string; // image path
  tint: string; // tailwind color class or custom hex-ish token
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "glowmart",
    clientName: "GlowMart",
    tag: "E-commerce",
    headline:
      "We turned a local retail shop into a sharp online brand with 2.4× more quote requests.",
    details: "Brand system • Website redesign • Conversion-focused landing",
    stat: "+30% average session time",
    deviceMockup: "/images/case-glowmart.png",
    tint: "#4f46e5", // indigo-ish
  },
  {
    id: "taskloop",
    clientName: "TaskLoop",
    tag: "SaaS / Product",
    headline:
      "We rebuilt their product UI so the dashboard finally felt as smart as the product.",
    details: "UI system • UX flow rebuild • SaaS dashboard redesign",
    stat: "-48% user confusion during onboarding",
    deviceMockup: "/images/case-taskloop.png",
    tint: "#0f766e", // teal-ish
  },
  {
    id: "studio-lume",
    clientName: "Studio Lume",
    tag: "Creator / Studio",
    headline:
      "We turned scattered work into a single digital home that closes projects 3× faster.",
    details: "Portfolio design • Identity refresh • Motion graphics support",
    stat: "3× inbound project conversions",
    deviceMockup: "/images/case-studiolume.png",
    tint: "#ea580c", // warm orange
  },
];

// same tilt logic vibe as your process phase, but scoped to the mockup
function useTiltCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    x.set(relX - 0.5);
    y.set(relY - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handlePointerMove, handlePointerLeave };
}

type CasePanelProps = {
  study: CaseStudy;
  index: number;
};

function CasePanel({ study, index }: CasePanelProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Parallax layers
  const textY = useTransform(scrollYProgress, [0, 1], [40, -10]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [50, -40]);
  const bgY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const fromLeft = index % 2 === 0;
  const { rotateX, rotateY, handlePointerMove, handlePointerLeave } =
    useTiltCard();

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#050507]"
    >
      {/* shared Fynaro-style radial background */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

      {/* Brand tint glow */}
      <motion.div
        style={{ y: bgY, opacity }}
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <div
          className="absolute -right-40 top-24 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: study.tint }}
        />
        <div
          className="absolute -left-32 bottom-10 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: "#c8a96a" }}
        />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:gap-16 lg:px-10">
          {/* TEXT BLOCK */}
          <motion.div
            style={{ y: textY, opacity }}
            initial={{ x: fromLeft ? -90 : 90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`max-w-xl ${
              fromLeft ? "md:order-1" : "md:order-2"
            } text-slate-100`}
          >
            {/* Tag pill – gold accent like process phase */}
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#f5e4b5]/25 bg-white/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
              <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
              Selected Work
            </div>

            {/* Client meta */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wide">
                {study.clientName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-50">
                  {study.clientName}
                </p>
                <p className="text-xs text-white/60">{study.tag}</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-balance text-2xl font-semibold leading-snug text-slate-50 sm:text-3xl lg:text-4xl">
              {study.headline}
            </h2>

            {/* Details */}
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {study.details}
            </p>

            {/* Stat */}
            {study.stat && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c8a96a]/15 px-3 py-1.5 text-[11px] font-medium text-[#f5e4b5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5e4b5]" />
                {study.stat}
              </div>
            )}
          </motion.div>

          {/* DEVICE MOCKUP */}
          <motion.div
            style={{ y: mockupY, opacity }}
            initial={{ x: fromLeft ? 90 : -90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className={`relative flex flex-1 items-center justify-center ${
              fromLeft ? "md:order-2" : "md:order-1"
            }`}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative h-[260px] w-[360px] origin-center rounded-[26px] border border-white/12 bg-[radial-gradient(circle_at_top,#171720,#050508_75%)] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.9)] backdrop-blur-xl md:h-[320px] md:w-[460px]"
            >
              {/* Fake laptop frame */}
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#050509]">
                {/* Top bar */}
                <div className="flex h-8 items-center justify-between border-b border-white/10 bg-white/5 px-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                  </div>
                  <span className="text-[10px] text-slate-300">
                    {study.clientName}
                  </span>
                </div>

                {/* Screen */}
                <div className="relative flex-1">
                  <Image
                    src={study.deviceMockup}
                    alt={`${study.clientName} website mockup`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 460px, 360px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function PhaseFiveSelectedWork() {
  return (
    <section className="bg-[#050507]">
      {/* Section Header – matches your process tone */}
      <div className="relative w-full py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-left text-slate-50 lg:px-10">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 5 — Selected Work</span>
          </div>

          <h1 className="text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Brands we&apos;ve helped{" "}
            <span className="text-[#f5e4b5]">glow online.</span>
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-white/70">
            A curated look at projects where we took raw hustle, half-built
            products, and offline energy into premium digital brands.
          </p>
        </div>
      </div>

      {/* Full-screen cinematic panels */}
      <div className="w-full">
        {CASE_STUDIES.map((study, index) => (
          <CasePanel key={study.id} study={study} index={index} />
        ))}
      </div>
    </section>
  );
}
