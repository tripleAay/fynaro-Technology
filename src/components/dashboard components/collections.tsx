"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import FynaroWebPackages from "../../components/dashboard components/webPackages";

export default function Collections() {
return ( <main className="min-h-screen overflow-hidden bg-black text-white"> <div className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
{/* Page introduction */}
<motion.header
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
transition={{
duration: 0.45,
ease: [0.22, 1, 0.36, 1],
}}
className="max-w-2xl"
> <div className="flex items-center gap-2"> <span className="h-1.5 w-1.5 rounded-full bg-[#F5B400]" />


        <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/35">
          Web & Mobile
        </span>
      </div>

      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">
        Build the digital side of your business.
      </h1>

      <p className="mt-2 max-w-xl text-xs leading-6 text-white/40 sm:text-sm">
        Websites, ecommerce experiences and custom digital products
        designed around what your business actually needs.
      </p>
    </motion.header>

    {/* Web packages */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-2"
    >
      <FynaroWebPackages />
    </motion.div>

    {/* Custom project CTA */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-2 max-w-6xl pb-8"
    >
      <Link
        href="/shop/requests/new"
        className="group flex items-center justify-between gap-5 rounded-[1.25rem] border border-white/[0.06] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:border-white/[0.11] hover:bg-white/[0.04] sm:px-6"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#F5B400]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#F5B400]">
              Need something different?
            </p>
          </div>

          <p className="mt-1.5 text-[11px] leading-5 text-white/40">
            Tell us what you&apos;re building and we&apos;ll shape the right
            digital solution around it.
          </p>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5B400] text-[#111014] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.9} />
        </span>
      </Link>
    </motion.div>
  </div>
</main>


);
}
