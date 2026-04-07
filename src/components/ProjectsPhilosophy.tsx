"use client";

import { motion } from "framer-motion";

const items = [
    "Product Thinking",
    "Brand Direction",
    "Web Experiences",
    "Mobile App Design",
    "Interface Systems",
    "Visual Clarity",
];

export default function ProjectsPhilosophy() {
    return (
        <section className="relative overflow-hidden px-6 py-32 md:px-8 md:py-44">
            {/* ambient */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl">
                {/* intro */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="mb-5 text-[11px] tracking-[0.38em] text-[#d6cc6d]">
                        WHAT THE WORK REFLECTS
                    </p>

                    <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
                        More than output.
                        <span className="text-[#d6cc6d]"> A way of thinking.</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                        These projects are not just results. They reflect how Fynaro approaches
                        product thinking, brand direction, and digital execution.
                    </p>
                </motion.div>

                {/* spaced tags */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-16 flex flex-wrap justify-center gap-4"
                >
                    {items.map((item, i) => (
                        <div
                            key={item}
                            className="
        group relative overflow-hidden
        rounded-full border border-white/10
        bg-white/[0.02]
        px-6 py-3 text-sm text-white/75
        transition-all duration-300 ease-out

        hover:-translate-y-1
        hover:bg-white
        hover:text-black
        hover:border-white
        hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)]
      "
                            style={{ transitionDelay: `${i * 40}ms` }}
                        >
                            {/* subtle inner glow */}
                            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent" />
                            </div>

                            {/* content */}
                            <span className="relative z-10 transition-colors duration-300">
                                {item}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* closing line */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto mt-16 max-w-2xl text-center text-base leading-8 text-white/55 md:text-lg"
                >
                    Different projects. Same principle — build with purpose, design with
                    clarity, and execute with intent.
                </motion.p>

                {/* bottom spacer */}
                <div className="mt-20 flex justify-center">
                    <div className="h-px w-20 bg-white/10" />
                </div>
            </div>
        </section>
    );
}