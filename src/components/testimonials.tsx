"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chidera Nwoye",
    text: "Fynaro brought clarity to our idea and translated it into a design that feels intentional and confident.",
    image: "/clients/chidera.jpg",
    logo: "/logos/giftwave.svg",
  },
  {
    id: 2,
    name: "Okoye C. B.",
    text: "The website feels structured and easy to understand. Clients now trust us before even speaking to us.",
    image: "/clients/okoye.jpg",
    logo: "/logos/eliteprints.svg",
  },
  {
    id: 3,
    name: "Bamigbade Akintunde",
    text: "Fynaro approached the project with patience and clear thinking. The result feels solid and well thought-out.",
    image: "/clients/akintunde.jpg",
    logo: "/logos/starlight.svg",
  },
  {
    id: 4,
    name: "Tunde Adebayo",
    text: "Our brand presence improved immediately. Everything now looks deliberate and professionally arranged.",
    image: "/clients/tunde.jpg",
    logo: "/logos/sparktech.svg",
  },
  {
    id: 5,
    name: "Daniel Okafor",
    text: "There was a clear process from start to finish. No confusion, just steady progress and strong results.",
    image: "/clients/daniel.jpg",
    logo: "/logos/novacore.svg",
  },
  {
    id: 6,
    name: "Sarah Adeyemi",
    text: "The attention to spacing, flow, and structure made the entire site feel premium without overdoing it.",
    image: "/clients/sarah.jpg",
    logo: "/logos/zenith.svg",
  },
  {
    id: 7,
    name: "Ibrahim Sadiq",
    text: "The final design feels calm, focused, and professional. It reflects our values properly.",
    image: "/clients/ibrahim.jpg",
    logo: "/logos/fluxa.svg",
  },
  {
    id: 8,
    name: "Kemi Ogunleye",
    text: "This is the first time our website truly represents who we are as a brand.",
    image: "/clients/kemi.jpg",
    logo: "/logos/orion.svg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto-rotate every 8s, stepping by 2 (shows pairs)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 2) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <section className="relative w-full bg-[#BFBDC1] text-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted by brands who value depth, not noise.
          </h2>
          <p className="text-black text-lg md:text-xl leading-relaxed">
            These are not compliments — they’re outcomes of deliberate thinking,
            strong narrative, and intentional design.
          </p>
        </div>

        {/* Testimonials */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {visible.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-black rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl shadow-black/30 flex flex-col"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 md:w-14 md:h-14 text-white/15" />

                <p className="text-lg md:text-xl leading-relaxed text-gray-100 mb-10 md:mb-12 font-light">
                  “{item.text}”
                </p>

                <div className="mt-auto flex items-center justify-between gap-6">
                  {/* Person */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-2 ring-white/10 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 80px"
                      />
                    </div>
                    <p className="font-semibold text-base md:text-lg">
                      {item.name}
                    </p>
                  </div>

                  {/* Brand Logo */}
                  <div className="relative h-9 md:h-10 w-28 md:w-32 opacity-80">
                    <Image
                      src={item.logo}
                      alt={`${item.name} brand logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 112px, 128px"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center items-center gap-12 mt-16">
          <button
            onClick={() =>
              setIndex(
                (prev) => (prev - 2 + testimonials.length) % testimonials.length
              )
            }
            className="flex items-center gap-3 text-black hover:text-white transition-colors text-lg font-medium"
            aria-label="Previous pair"
          >
            <ChevronLeft className="w-6 h-6" />
            Previous
          </button>

          <button
            onClick={() =>
              setIndex((prev) => (prev + 2) % testimonials.length)
            }
            className="flex items-center gap-3 text-black hover:text-white transition-colors text-lg font-medium"
            aria-label="Next pair"
          >
            Next
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
