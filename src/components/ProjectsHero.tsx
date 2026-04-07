"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";

export default function ProjectsHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-32 md:items-center md:pb-28">
      
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/public/images/edoardo-giudici-saraval-h-EmytKmWYc-unsplash.jpg"
          alt="Fynaro Tech projects background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlays (kept subtle) */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,204,109,0.12),transparent_38%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Small Label (now accent + lighter) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-[11px] font-medium tracking-[0.45em] text-[#d6cc6d]"
        >
          PROJECTS
        </motion.p>

        {/* Main Headline (dominant) */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          Selected work across products, branding, web, and mobile.
        </motion.h1>

        {/* Supporting Text (lighter + more space) */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-10 max-w-2xl text-base leading-8 text-white/60 md:text-lg"
        >
          A curated view of how Fynaro Tech approaches ideas — with
          strategy, design, and code shaped around clarity and intent.
        </motion.p>

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#selected-work"
            className="inline-flex items-center gap-2 rounded-full bg-[#d6cc6d] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#e4d97a]"
          >
            View Selected Work <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition hover:border-[#d6cc6d]/40 hover:bg-white/[0.05]"
          >
            Start a Project <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}