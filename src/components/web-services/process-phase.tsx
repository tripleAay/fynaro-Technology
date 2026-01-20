"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { key: "listen", label: "Listen", title: "Listen", body: "We ask about your story, goals, and why this matters." },
  { key: "frame", label: "Frame", title: "Frame", body: "We lock the angle, tone, and how your website should feel." },
  { key: "build", label: "Build", title: "Build", body: "Design, prototype, and develop with tight feedback loops." },
  { key: "launch", label: "Launch", title: "Launch", body: "We ship, test, and help you show up like you’ve been here before." },
];

export default function FynaroProcessPhase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const n = steps.length;

  // ── Glow line height ──
  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ── Card animations (one set per step — top level only) ──
  const opacity0 = useTransform(scrollYProgress, [0 / n, 0.5 / n, 1 / n], [0, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [1 / n, 1.5 / n, 2 / n], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [2 / n, 2.5 / n, 3 / n], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [3 / n, 3.5 / n, 4 / n], [0, 1, 0]);

  const x0 = useTransform(scrollYProgress, [0 / n, 1 / n], [60, 0]);
  const x1 = useTransform(scrollYProgress, [1 / n, 2 / n], [60, 0]);
  const x2 = useTransform(scrollYProgress, [2 / n, 3 / n], [60, 0]);
  const x3 = useTransform(scrollYProgress, [3 / n, 4 / n], [60, 0]);

  const scale0 = useTransform(scrollYProgress, [0 / n, 0.5 / n, 1 / n], [0.96, 1.03, 0.97]);
  const scale1 = useTransform(scrollYProgress, [1 / n, 1.5 / n, 2 / n], [0.96, 1.03, 0.97]);
  const scale2 = useTransform(scrollYProgress, [2 / n, 2.5 / n, 3 / n], [0.96, 1.03, 0.97]);
  const scale3 = useTransform(scrollYProgress, [3 / n, 3.5 / n, 4 / n], [0.96, 1.03, 0.97]);

  const opacities = [opacity0, opacity1, opacity2, opacity3];
  const xs = [x0, x1, x2, x3];
  const scales = [scale0, scale1, scale2, scale3];

  // ── Derived transforms for dots & labels (still top-level) ──
  const dotScale0 = useTransform(opacity0, [0, 1], [0.8, 1.25]);
  const dotScale1 = useTransform(opacity1, [0, 1], [0.8, 1.25]);
  const dotScale2 = useTransform(opacity2, [0, 1], [0.8, 1.25]);
  const dotScale3 = useTransform(opacity3, [0, 1], [0.8, 1.25]);

  const dotGlow0 = useTransform(opacity0, [0, 1], [0.2, 0.85]);
  const dotGlow1 = useTransform(opacity1, [0, 1], [0.2, 0.85]);
  const dotGlow2 = useTransform(opacity2, [0, 1], [0.2, 0.85]);
  const dotGlow3 = useTransform(opacity3, [0, 1], [0.2, 0.85]);

  const labelOpacity0 = useTransform(opacity0, [0, 1], [0.4, 1]);
  const labelOpacity1 = useTransform(opacity1, [0, 1], [0.4, 1]);
  const labelOpacity2 = useTransform(opacity2, [0, 1], [0.4, 1]);
  const labelOpacity3 = useTransform(opacity3, [0, 1], [0.4, 1]);

  const labelX0 = useTransform(opacity0, [0, 1], [0, 4]);
  const labelX1 = useTransform(opacity1, [0, 1], [0, 4]);
  const labelX2 = useTransform(opacity2, [0, 1], [0, 4]);
  const labelX3 = useTransform(opacity3, [0, 1], [0, 4]);

  const dotScales = [dotScale0, dotScale1, dotScale2, dotScale3];
  const dotGlows = [dotGlow0, dotGlow1, dotGlow2, dotGlow3];
  const labelOpacities = [labelOpacity0, labelOpacity1, labelOpacity2, labelOpacity3];
  const labelXs = [labelX0, labelX1, labelX2, labelX3];

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-[#050507] text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

        <div className="relative z-10 flex h-full flex-col max-w-6xl mx-auto px-4 pt-6 pb-10 sm:px-8 md:px-10 lg:px-16">
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
              <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
              <span>Phase 4 — From Sketch to Screen</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              A cinematic process that still <span className="text-[#f5e4b5]">feels trustworthy.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl">
              Four clear beats from first conversation to launch — so you always know where your project stands.
            </p>
          </div>

          {/* Timeline + Active Cards */}
          <div className="flex-1 flex flex-col md:flex-row gap-10 md:gap-14 items-stretch">
            {/* Timeline */}
            <div className="relative md:w-1/3">
              <div className="relative h-full flex items-center md:items-start">
                <div className="relative w-px h-full mx-auto md:mx-0 md:ml-2 bg-white/8 overflow-hidden rounded-full">
                  <motion.div
                    style={{ height: glowHeight }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#c8a96a] via-[#f5e4b5] to-transparent shadow-[0_0_30px_rgba(200,169,106,0.5)]"
                  />
                </div>

                {/* Timeline steps */}
                <div className="absolute inset-y-0 left-1/2 md:left-0 md:-translate-x-1 translate-x-[-50%] md:translate-x-0 flex flex-col justify-between py-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.key}
                      className="flex items-center gap-3 mb-4 last:mb-0"
                      style={{ opacity: labelOpacities[index] }}
                    >
                      <motion.div
                        style={{ scale: dotScales[index] }}
                        className="relative h-4 w-4 rounded-full bg-[#2a2416] border border-[#c8a96a]/60 flex items-center justify-center"
                      >
                        <motion.span
                          style={{ opacity: dotGlows[index] }}
                          className="block h-2.5 w-2.5 rounded-full bg-[#f5e4b5] shadow-[0_0_22px_rgba(200,169,106,0.9)]"
                        />
                      </motion.div>

                      <motion.div style={{ x: labelXs[index] }} className="flex flex-col">
                        <span className="text-xs font-medium tracking-[0.22em] uppercase text-white/70">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                        <span className="text-sm sm:text-base font-semibold">{step.label}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Cards */}
            <div className="md:w-2/3 flex items-center">
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.key}
                    style={{
                      opacity: opacities[index],
                      x: xs[index],
                      scale: scales[index],
                    }}
                    className="absolute inset-0"
                  >
                    <div
                      className="group relative h-full w-full rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,#171720,#050508_75%)] shadow-[0_26px_90px_rgba(0,0,0,0.9)] overflow-hidden px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between backdrop-blur-xl"
                    >
                      {/* Subtle glow sweep on hover */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                        <div className="absolute -top-24 left-0 right-0 h-40 bg-[radial-gradient(circle_at_top,#f5e4b53b,transparent_70%)]" />
                      </div>

                      <div className="relative z-10 flex flex-col gap-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                          Step {index + 1} • {step.label}
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/75 max-w-lg leading-relaxed">
                          {step.body}
                        </p>
                      </div>

                      <div className="relative z-10 text-[11px] sm:text-xs text-white/40 mt-4">
                        From sketch to screen — this is where we are right now in the process.
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="mt-6 text-[10px] sm:text-xs text-white/40 flex items-center justify-between">
            <span>Scroll to move from Listen → Frame → Build → Launch.</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="h-px w-6 bg-white/25" />
              <span>From first question to full launch.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}