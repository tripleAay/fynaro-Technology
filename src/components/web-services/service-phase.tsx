"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

type ServiceCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  y: MotionValue<number>;
};

function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 → 1
    const relY = (e.clientY - rect.top) / rect.height; // 0 → 1
    x.set(relX - 0.5);
    y.set(relY - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handlePointerMove, handlePointerLeave };
}

function ServiceCard({
  eyebrow,
  title,
  body,
  bullets,
  y,
}: ServiceCardProps) {
  const { rotateX, rotateY, handlePointerMove, handlePointerLeave } = useTilt();

  return (
    <motion.div
      style={{ y, rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ rotateZ: -1.5, translateY: -8 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.3, once: false }}
      className="group relative h-full rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,#14151a,#050609_70%)]/90
                 shadow-[0_26px_90px_rgba(0,0,0,0.85)] overflow-hidden px-6 py-7 sm:px-7 sm:py-8 flex flex-col gap-4
                 backdrop-blur-xl"
    >
      {/* Glass/glow accent */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-[radial-gradient(circle_at_top,#f5e4b544,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
          {eyebrow}
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
          {body}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {bullets.map((b, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full border border-white/12 bg-white/3
                         px-3 py-1 text-[11px] sm:text-xs text-white/75 backdrop-blur-md"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FynaroServicesPhase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 20%"], // when this section is active
  });

  // Parallax Y offsets for each card (subtle)
  const card1Y = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [40, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#07070a] text-white py-16 sm:py-24"
    >
      {/* Soft background tint */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#11121a,#050508_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0d0d12,transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 3 — Services / Pillars</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            What we actually{" "}
            <span className="text-[#f5e4b5]">build at Fynaro.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            The pillars that turn raw hustle into sharp, premium brands and
            digital products.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          <ServiceCard
            eyebrow="Pillar 1"
            title="Brand & Visual Identity"
            body="Logos, systems, and visual language that make your product instantly recognizable."
            bullets={[
              "Identity systems",
              "Launch visuals",
              "Merch & packaging",
            ]}
            y={card1Y}
          />

          <ServiceCard
            eyebrow="Pillar 2"
            title="Web & Product Experience"
            body="Premium websites and product experiences for teams who care how things feel and convert."
            bullets={[
              "Marketing sites",
              "Web apps & dashboards",
              "Landing pages that convert",
            ]}
            y={card2Y}
          />

          <ServiceCard
            eyebrow="Pillar 3"
            title="Content & Launch Support"
            body="Not just files — we help you show up properly when it’s time to go live."
            bullets={[
              "Campaigns",
              "Creative direction",
              "Ongoing retainers",
            ]}
            y={card3Y}
          />
        </div>

        {/* Mobile hint */}
        <div className="mt-6 text-[10px] sm:text-xs text-white/40 md:hidden">
          Scroll to explore each pillar. On desktop, they line up side by side.
        </div>
      </div>
    </section>
  );
}
