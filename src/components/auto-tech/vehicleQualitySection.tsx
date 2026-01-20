"use client";

import Image from "next/image";

export default function VehicleQualitySection() {
  return (
    <section className="w-full mb-10 bg-[#faf8f4]">
      <div className="flex w-full flex-col items-center gap-8 px-4 py-10 md:flex-row md:py-16 lg:gap-12 lg:px-8">
        {/* LEFT: VEHICLES IMAGE */}
        <div className="relative w-full md:flex-1">
          <div className="relative w-full overflow-visible aspect-[16/9]">
            {/* subtle ground shadow */}
            <div className="absolute inset-x-6 bottom-0 h-8 rounded-full bg-black/5 blur-md md:inset-x-10" />
            <Image
              src="/auto-tech/benz.png"
              alt="Truck and car illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT: COPY BLOCK */}
        <div className="w-full md:flex-1 space-y-4">
          <p className="text-xs font-semibold tracking-[0.22em] text-neutral-500 uppercase">
            We bring you to the future
          </p>

          <div className="space-y-1">
            <p className="text-3xl font-extrabold leading-tight tracking-tight text-[#c7a25a] md:text-4xl">
              TRUSTED AUTO-TECH,
            </p>
            <p className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-4xl">
              BUILT ON TRANSPARENCY &amp; QUALITY
            </p>
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 md:text-base">
            <li className="flex gap-2">
              <span className="font-semibold text-[#c7a25a]">•</span>
              <span>Reliable sourcing for select vehicle parts.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-[#c7a25a]">•</span>
              <span>Growing expertise across diagnostics and modern vehicle systems.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-[#c7a25a]">•</span>
              <span>Fair pricing, honest work, and commitment to long-term value.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
