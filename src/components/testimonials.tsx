"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // optimized images
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chidera N.",
    role: "Founder, Giftwave",
    text: "Fynaro brought my brand vision to life with clarity and class. Every detail felt intentional — from logo to website.",
    image: "/clients/chidera.jpg",
    logo: "/logos/giftwave.svg",
  },
  {
    id: 2,
    name: "Michael A.",
    role: "CEO, Elite Prints",
    text: "They don’t just design — they think deeply about how your brand should feel. The result was premium and unforgettable.",
    image: "/clients/michael.jpg",
    logo: "/logos/eliteprints.svg",
  },
  {
    id: 3,
    name: "Aisha K.",
    role: "Creative Lead, Starlight Energy",
    text: "Our rebrand changed the perception of our entire company. The storytelling behind the visuals was powerful.",
    image: "/clients/aisha.jpg",
    logo: "/logos/starlight.svg",
  },
  {
    id: 4,
    name: "Tunde O.",
    role: "Marketing Lead, SparkTech",
    text: "Fynaro’s design elevated our campaign engagement dramatically. Their work feels alive and strategic.",
    image: "/clients/tunde.jpg",
    logo: "/logos/sparktech.svg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto-rotate testimonials every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];
  const nextItem = testimonials[(index + 1) % testimonials.length];

  return (
    <section className="relative w-full bg-gray-950 text-gray-100 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold mb-4"
          >
            Trusted by growing brands
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Thoughtful words from people we’ve helped shape, scale, and elevate.
          </p>
        </div>

        {/* Content */}
        <div className="relative grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-3xl p-10 flex flex-col justify-between"
            >
              <p className="text-xl leading-relaxed text-gray-200">
                “{current.text}”
              </p>

              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={current.image}
                      alt={`${current.name} - ${current.role}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{current.name}</p>
                    <p className="text-sm text-gray-400">{current.role}</p>
                  </div>
                </div>

                {/* Logo */}
                <div className="relative h-6 w-auto">
                  <Image
                    src={current.logo}
                    alt={`${current.name} logo`}
                    fill
                    className="object-contain opacity-70"
                    sizes="auto"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Secondary Preview (Desktop only) */}
          <div className="hidden lg:flex flex-col justify-between rounded-3xl bg-gray-900/40 p-10 border border-white/5">
            <p className="text-gray-400 text-lg leading-relaxed">“{nextItem.text}”</p>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={nextItem.image}
                    alt={`${nextItem.name} - ${nextItem.role}`}
                    fill
                    className="object-cover opacity-80"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{nextItem.name}</p>
                  <p className="text-xs text-gray-500">{nextItem.role}</p>
                </div>
              </div>

              {/* Logo */}
              <div className="relative h-5 w-auto">
                <Image
                  src={nextItem.logo}
                  alt={`${nextItem.name} logo`}
                  fill
                  className="object-contain opacity-40"
                  sizes="auto"
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute -bottom-16 left-0 flex items-center gap-3">
            <button
              onClick={() =>
                setIndex(index === 0 ? testimonials.length - 1 : index - 1)
              }
              className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setIndex((index + 1) % testimonials.length)
              }
              className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
