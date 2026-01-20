"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TypewriterOptions = {
  text: string;
  start: boolean;
  speed?: number; // ms per character
};

function useTypewriter({ text, start, speed = 70 }: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;

    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, start, speed]);

  return displayed;
}

export default function AutoTechHero() {
  const [startTyping, setStartTyping] = useState(false);

  // ⏱️ Wait 3 seconds before starting the typing animation
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const line1Full = "Welcome To";
  const line2Full = "Fynaro AutoTech";
  const subFull = "Automotive & Spare Parts Technical Trading";

  const line1 = useTypewriter({
    text: line1Full,
    start: startTyping,
    speed: 80,
  });

  const line1Done = line1 === line1Full;

  const line2 = useTypewriter({
    text: line2Full,
    start: startTyping && line1Done,
    speed: 90,
  });

  const line2Done = line2 === line2Full;

  const sub = useTypewriter({
    text: subFull,
    start: startTyping && line1Done && line2Done,
    speed: 25,
  });

  return (
    <section className="relative mt-10 w-full min-h-[70vh] md:min-h-screen overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="/auto-tech/download.jpeg"
        alt="AutoTech showroom with automotive and spare parts"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] md:min-h-screen items-center justify-center">
        <div className="max-w-4xl px-4 text-center text-white">
          {/* Main heading */}
          <h1 className="text-3xl mt-16 sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-[1.15]">
            <span className="block">
              {line1}
              {/* Optional caret */}
              {startTyping && !line1Done && (
                <span className="inline-block w-[2px] h-[1.2em] bg-white ml-1 animate-pulse" />
              )}
            </span>
            <span className="block text-[#d5b15c]">
              {line2}
              {startTyping && line1Done && !line2Done && (
                <span className="inline-block w-[2px] h-[1.2em] bg-[#d5b15c] ml-1 animate-pulse" />
              )}
            </span>
          </h1>

          {/* Sub-heading */}
          <p className="mt-4 text-base sm:text-lg md:text-2xl text-slate-100 min-h-[1.5em]">
            {sub}
            {startTyping && line1Done && line2Done && sub !== subFull && (
              <span className="inline-block w-[2px] h-[1.2em] bg-slate-100 ml-1 animate-pulse" />
            )}
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="#explore"
              className="inline-flex items-center rounded-full bg-[#c8a45a] px-8 py-3 text-sm sm:text-base font-semibold text-black shadow-lg shadow-black/30 transition hover:bg-[#e0bf6c] hover:shadow-xl"
            >
              Explore &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
