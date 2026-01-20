"use client";

import { motion } from "framer-motion";

const techItems = [
  {
    id: "framer-motion",
    label: "Framer Motion",
    title: "Framer Motion",
    body: "Handles scroll-triggered sections, pinned moments, fades, and smooth transforms across the page.",
    extra: "Used for: hero motion, process steps, case panels, subtle entrance animations.",
  },
  {
    id: "lenis",
    label: "Lenis",
    title: "Lenis (or similar smooth-scroll)",
    body: "Gives the page a smoother, cinematic scroll feeling without fighting the browser.",
    extra: "Used for: easing between sections so motion feels intentional, not jittery.",
  },
  {
    id: "r3f",
    label: "React Three Fiber",
    title: "React Three Fiber (optional)",
    body: "Powers true 3D scenes when we need the hero object to feel physical, not just layered.",
    extra: "Used for: the F-totem, depth, lighting, and subtle camera moves.",
  },
  {
    id: "parallax",
    label: "Parallax",
    title: "Parallax Layers",
    body: "Foreground and background move at different speeds to add depth without heavy assets.",
    extra: "Used for: case study mockups, background glows, and scroll depth.",
  },
  {
    id: "perspective",
    label: "Perspective",
    title: "Perspective & Fake 3D",
    body: "CSS transforms + gradients to mimic depth for cards and mockups without a full 3D engine.",
    extra: "Used for: tilting cards, hovering panels, and the general \"feels 3D\" behavior.",
  },
  {
    id: "camera-light",
    label: "Camera & Light",
    title: "Camera & Light Animation",
    body: "Subtle shifts in angle, shadow, and glow that make the interface feel alive—not noisy.",
    extra: "Used for: hero, CTA totem, and key focus areas where attention matters.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.06, // automatic stagger — 60ms delay between each card
    },
  },
};

export default function PhaseTenTechNotes() {
  return (
    <section className="relative w-full bg-[#050507] text-white py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,#121019,#050507_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_bottom,#0b0b11,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/60">
            <span className="inline-flex h-1 w-6 rounded-full bg-[#c8a96a]" />
            <span>Phase 10 — Under the Hood</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Built with the same care{" "}
            <span className="text-[#f5e4b5]">behind the scenes as on screen.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            For the devs and technical founders: a quick snapshot of what powers the motion,
            depth, and feel of this experience.
          </p>
        </div>

        {/* Tech cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
        >
          {techItems.map((item) => (
            <motion.div key={item.id} className="relative">
              <motion.div
                whileHover={{
                  y: -3,
                  rotateX: -2,
                  rotateY: 2,
                  boxShadow:
                    "0 20px 70px rgba(0,0,0,0.9), 0 0 20px rgba(200,169,106,0.35)",
                  borderColor: "rgba(245, 228, 181, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#171720,#050508_80%)] px-5 py-5 sm:px-6 sm:py-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                    {item.label}
                  </p>
                  <span className="h-[1px] w-10 bg-gradient-to-r from-[#c8a96a] to-transparent opacity-70" />
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-2">
                  {item.body}
                </p>

                {item.extra && (
                  <p className="mt-auto text-[11px] sm:text-xs text-white/45">
                    {item.extra}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-white/45">
          Want the stack wired into your own product? We can hand over clean implementation
          notes or collaborate directly with your dev team.
        </div>
      </div>
    </section>
  );
}