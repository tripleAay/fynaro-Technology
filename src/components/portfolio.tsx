"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Starlight Energy",
    category: "Branding",
    desc: "A bold identity system built to position a modern energy brand for scale.",
    cover: "/portfolio/brand-1.jpg",
  },
  {
    id: 2,
    title: "Fynaro Tech Website",
    category: "Web Design",
    desc: "A high-performance website focused on clarity, trust, and conversion.",
    cover: "/portfolio/web-1.jpg",
  },
  {
    id: 3,
    title: "Elite Prints",
    category: "Packaging",
    desc: "Premium packaging design crafted for luxury perception.",
    cover: "/portfolio/packaging-1.jpg",
  },
  {
    id: 4,
    title: "Giftwave",
    category: "Product",
    desc: "Clean product UX for secure and seamless gift card trading.",
    cover: "/portfolio/giftcards-1.jpg",
  },
];

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Selected <span className="text-green-600">Work</span>
          </h2>
          <p className="text-gray-500 text-lg">
            A refined collection of projects where strategy, design, and technology meet.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-14">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === c
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={400}
                  height={256}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-1">
                  {p.category}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-white font-medium hover:bg-gray-800 transition-all"
          >
            View Full Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
