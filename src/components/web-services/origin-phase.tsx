"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

type BeatProps = {
  title?: string;
  lines: string[];
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

function OriginBeat({ title, lines, opacity, y }: BeatProps) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="space-y-3">
        {title && (
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-white/60">
            {title}
          </p>
        )}

        <div className="space-y-2">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FynaroOriginPhase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // pinned while this section is in view
  });

  // === 3D Card "raw → polished" morph ===
  const cardY = useTransform(scrollYProgress, [0, 1], [20, -40]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  // Raw layer (more muted, less glow)
  const rawLayerOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45],
    [1, 1, 0]
  );

  // Polished layer (more glow, sharper, more “finished”)
  const polishedLayerOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.55, 1],
    [0, 0.7, 1]
  );

  // Extra glow & highlight as you reach the end
  const glowStrength = useTransform(scrollYProgress, [0.4, 1], [0.2, 1]);

  // MotionValue<string> for box-shadow
  const boxShadow = useTransform(glowStrength, (v) => {
    const alpha = 0.4 + v * 0.4; // 0.4 → 0.8
    return `0 0 60px rgba(200,169,106,${alpha})`;
  });

  // === Beats timing (one at a time) ===
  // Beat 1: 0.00 → 0.25
  const beat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25],
    [1, 1, 0]
  );
  const beat1Y = useTransform(scrollYProgress, [0, 0.25], [0, -20]);

  // Beat 2: 0.25 → 0.5
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.5],
    [0, 1, 0]
  );
  const beat2Y = useTransform(scrollYProgress, [0.25, 0.5], [20, -10]);

  // Beat 3: 0.5 → 0.75
  const beat3Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.75],
    [0, 1, 0]
  );
  const beat3Y = useTransform(scrollYProgress, [0.5, 0.75], [20, -10]);

  // Beat 4 (summary): 0.75 → 1
  const beat4Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.85, 1],
    [0, 1, 1]
  );
  const beat4Y = useTransform(scrollYProgress, [0.75, 1], [20, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-[#050507] text-white"
    >
      {/* Pinned content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#111014,#050507_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0f1014,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

        <div className="relative z-10 flex h-full flex-col max-w-6xl mx-auto px-4 pt-6 pb-10 sm:px-8 md:px-10 lg:px-16">
          {/* Tiny label */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60 mb-6">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 2 — Origin / Concept</span>
          </div>

          {/* Main layout */}
          <div className="flex flex-1 flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16">
            {/* 3D card block */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                style={{
                  y: cardY,
                  scale: cardScale,
                  rotateZ: cardRotate,
                }}
                className="relative"
              >
                <div className="relative flex h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64 items-center justify-center rounded-[34px] border border-white/8 bg-[radial-gradient(circle_at_top,#18181b,#050507_70%)] shadow-[0_40px_140px_rgba(0,0,0,0.9)]">
                  {/* Raw layer */}
                  <motion.div
                    style={{ opacity: rawLayerOpacity }}
                    className="absolute inset-[13%] rounded-[26px] bg-[radial-gradient(circle_at_top,#b19763,#2a2216)] blur-[0.5px]"
                  />

                  {/* Polished layer */}
                  <motion.div
                    style={{
                      opacity: polishedLayerOpacity,
                      boxShadow,
                    }}
                    className="absolute inset-[11%] rounded-[26px] bg-[radial-gradient(circle_at_top,#f5e4b5,#362718)]"
                  />

                  {/* Stylized F */}
                  <span className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.16em] text-[#050507]">
                    F
                  </span>

                  {/* Inner edge */}
                  <div className="pointer-events-none absolute inset-[4px] rounded-[30px] border border-white/12" />

                  {/* Under shadow */}
                  <motion.div
                    style={{ opacity: polishedLayerOpacity }}
                    className="pointer-events-none absolute -bottom-6 left-5 h-8 w-[72%] rounded-[22px] bg-black/85 blur-[20px]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Beats block */}
            <div className="flex-1 relative max-w-xl h-64 sm:h-72 md:h-80">
              <OriginBeat
                title="Beat 1"
                lines={[
                  "Fynaro started from the street.",
                  "Merch, posters, hustle, no budget — just ideas.",
                ]}
                opacity={beat1Opacity}
                y={beat1Y}
              />

              <OriginBeat
                title="Beat 2"
                lines={[
                  "We learned what makes people stop scrolling.",
                  "And what makes them trust what they see.",
                ]}
                opacity={beat2Opacity}
                y={beat2Y}
              />

              <OriginBeat
                title="Beat 3"
                lines={[
                  "Now we bring that same edge to brands, products,",
                  "and experiences online.",
                ]}
                opacity={beat3Opacity}
                y={beat3Y}
              />

              <OriginBeat
                title="Beat 4 — Summary"
                lines={[
                  'Not just “a website”.',
                  "A digital home that feels like you.",
                ]}
                opacity={beat4Opacity}
                y={beat4Y}
              />
            </div>
          </div>

          {/* Bottom hint */}
          <div className="mt-6 flex items-center justify-between text-[10px] sm:text-xs text-white/38">
            <span>Scroll through the story. Each line is a beat.</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="h-px w-6 bg-white/25" />
              <span>Why Fynaro exists.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
