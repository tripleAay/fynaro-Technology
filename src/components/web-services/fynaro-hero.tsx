"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";

function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the raw pointer values so the tilt feels premium
  const smoothX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  // Slightly exaggerated tilt for visible effect
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [24, -24]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 → 1
    const relY = (e.clientY - rect.top) / rect.height; // 0 → 1

    x.set(relX - 0.5); // -0.5 → 0.5
    y.set(relY - 0.5); // -0.5 → 0.5
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handlePointerMove, handlePointerLeave };
}

type GlowProps = {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function ScrollGlow({ progress }: GlowProps) {
  const scale = useTransform(progress, [0, 1], [1, 1.1]);
  const opacity = useTransform(progress, [0, 1], [0.8, 0.35]);
  const y = useTransform(progress, [0, 1], [0, -40]);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#c8a96a2b,transparent_60%)]"
    />
  );
}

const particles = [
  { left: "16%", size: "2px", duration: 26, delay: 0 },
  { left: "36%", size: "3px", duration: 30, delay: 3 },
  { left: "52%", size: "2px", duration: 24, delay: 1.5 },
  { left: "68%", size: "3px", duration: 28, delay: 4 },
];

export default function FynaroHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { rotateX, rotateY, handlePointerMove, handlePointerLeave } =
    useTilt(cardRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Card responds to scroll as if you're moving through depth
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.75]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[170vh] bg-[#050507] text-white"
    >
      {/* Sticky hero content – Scene pins while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient – full-screen dark hero */}
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#111014,#050507_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 mix-blend-soft-light bg-[radial-gradient(circle_at_top,#f5f5f5_0,transparent_55%)]" />

        {/* Soft radial gold glow behind the object */}
        <ScrollGlow progress={scrollYProgress} />

        {/* Subtle particles drifting upwards like grain */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {particles.map((p, idx) => (
            <span
              key={idx}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
              className="absolute bottom-[-10%] rounded-full bg-[#f5e4b5] opacity-35 animate-[fynaroFloat_28s_linear_infinite]"
            />
          ))}
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex h-full flex-col justify-between px-4 pt-5 pb-10 sm:px-8 md:px-16 lg:px-24">
          {/* Top-left tag – tiny, minimal copy */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Fynaro Studio • Brand &amp; Web</span>
          </div>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center gap-10">
            {/* 3D scene wrapper for proper perspective */}
            <div
              className="relative"
              style={{
                perspective: 1200,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={{
                  rotateX,
                  rotateY,
                  y: cardY,
                  scale: cardScale,
                  opacity: cardOpacity,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 items-center justify-center rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,#18181b,#050507_65%)] shadow-[0_36px_140px_rgba(0,0,0,0.85)]"
              >
                {/* Inner glowing face – gold card / totem */}
                <div className="absolute inset-[12%] rounded-[26px] bg-[radial-gradient(circle_at_top,#f5e4b5,#322617)] opacity-95 shadow-[0_0_55px_rgba(200,169,106,0.6)]" />

                {/* Stylized “F” – 3D-ish totem */}
                <span className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.16em] text-[#050507]">
                  F
                </span>

                {/* Edge highlight */}
                <div className="pointer-events-none absolute inset-[3px] rounded-[30px] border border-white/10" />

                {/* Soft under shadow */}
                <motion.div
                  style={{ scale: cardScale, opacity: cardOpacity }}
                  className="pointer-events-none absolute -bottom-5 left-4 h-7 w-[72%] rounded-[22px] bg-black/80 blur-[18px]"
                />
              </motion.div>
            </div>

            {/* Text + CTAs – ultra minimal, as described */}
            <div className="space-y-4 max-w-3xl">
              {/* Main line – fades in from bottom on load, slight scroll shift */}
              <motion.h1
                style={{ y: titleY, opacity: titleOpacity }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-semibold leading-tight md:leading-[1.1] tracking-tight"
              >
                We turn raw hustle into{" "}
                <span className="text-[#f5e4b5]">
                  premium digital brands.
                </span>
              </motion.h1>

              {/* Sub line – small, supportive */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto"
              >
                Design, web, and strategy for products that should not look
                average.
              </motion.p>

              {/* Primary CTA + ghost button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Link
                  href="#start-project"
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#050507] px-7 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-[15px] font-semibold shadow-[0_18px_40px_rgba(0,0,0,0.45)] hover:bg-[#f5e4b5] hover:text-[#111014] transition-colors"
                >
                  Start a project
                </Link>

                <Link
                  href="#work"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-[15px] font-medium text-white/85 hover:bg-white/10 hover:border-white/40 transition-colors"
                >
                  See work
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/40">
            <span>Scroll to see how we build brands &amp; web experiences.</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="h-px w-6 bg-white/30" />
              <span>Born from hustle. Built for clarity.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Keyframes for particles */}
      <style jsx global>{`
        @keyframes fynaroFloat {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}