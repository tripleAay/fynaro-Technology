"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PillarItem = {
  id: string | number;
  label: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  points: string[];
};

type WhyFynaroPillarsProps = {
  pillars: PillarItem[];
};

export default function WhyFynaroPillars({
  pillars,
}: WhyFynaroPillarsProps) {
  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-32 md:space-y-40">
          {pillars.map((item, index) => {
            const reverse = index % 2 === 1;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="group relative grid items-center gap-14 md:grid-cols-12 md:gap-20"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6cc6d]/10" />
                </div>

                <div
                  className={`md:col-span-6 ${
                    reverse ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#d6cc6d]/30 group-hover:shadow-[0_20px_70px_rgba(214,204,109,0.10)]">
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition duration-500 group-hover:from-black/35" />

                      <div className="absolute inset-0 bg-gradient-to-br from-[#d6cc6d]/0 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100 group-hover:from-[#d6cc6d]/10" />

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-80" />
                    </div>
                  </div>
                </div>

                <div
                  className={`md:col-span-6 ${
                    reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <p className="mb-5 text-[10px] tracking-[0.4em] text-[#d6cc6d]/80 transition duration-300 group-hover:text-[#d6cc6d]">
                    {item.label}
                  </p>

                  <h3 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight transition duration-300 group-hover:text-white sm:text-4xl md:text-5xl">
                    {item.title}
                  </h3>

                  <p className="mt-6 max-w-lg text-base leading-8 text-white/65 transition duration-300 group-hover:text-white/72 md:text-lg">
                    {item.text}
                  </p>

                  <div className="mt-10 space-y-5">
                    {item.points.map((point, pointIndex) => (
                      <div
                        key={point}
                        className="flex items-start gap-4 transition duration-300 group-hover:translate-x-1"
                        style={{ transitionDelay: `${pointIndex * 40}ms` }}
                      >
                        <span className="mt-1.5 h-[6px] w-[6px] rounded-full bg-[#d6cc6d] transition duration-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(214,204,109,0.7)]" />
                        <p className="text-sm leading-7 text-white/55 transition duration-300 group-hover:text-white/68 md:text-base">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 h-px w-16 bg-white/10 transition-all duration-500 group-hover:w-28 group-hover:bg-[#d6cc6d]/50" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}