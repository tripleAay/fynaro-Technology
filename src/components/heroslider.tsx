"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/green.jpg",
    title: "Design That Speaks Growth",
    text: "We blend creativity and technology to help brands look powerful and intentional — just like the ideas behind them.",
  },
  {
    id: 2,
    image: "/images/desk.jpg",
    title: "Web Experiences That Convert",
    text: "From portfolio sites to full-scale platforms, Fynaro builds digital spaces that feel premium and perform flawlessly.",
  },
  {
    id: 3,
    image: "/images/digital.jpg",
    title: "Building the Future of Digital Brands",
    text: "We don’t just design — we craft visual and digital identities that stand out and sell out in any market.",
  },
  {
    id: 4,
    image: "/images/hardwork.jpg",
    title: "From Hustle to Legacy",
    text: "Fynaro was born from the street, built with skill, and raised on ambition — now it’s your brand’s turn to rise.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const slide = slides[current];

  // Mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX - innerWidth / 2) / innerWidth;
    const offsetY = (e.clientY - innerHeight / 2) / innerHeight;
    x.set(offsetX);
    y.set(offsetY);
  };

  const parallaxX = useTransform(x, [-0.5, 0.5], ["-15px", "15px"]);
  const parallaxY = useTransform(y, [-0.5, 0.5], ["-10px", "10px"]);

  // Typing effect for title
  useEffect(() => {
    setTypedText("");
    setIsTyping(true);

    const title = slide.title;
    let i = 0;

    const typeInterval = setInterval(() => {
      i++;
      setTypedText(title.slice(0, i));

      if (i === title.length) {
        clearInterval(typeInterval);
        setTimeout(() => setIsTyping(false), 700);
      }
    }, 85);

    return () => clearInterval(typeInterval);
  }, [current, slide.title]);

  // Auto slide AFTER typing is done
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // ❗ Variants – removed unused "direction" parameter
  const variants = {
    enter: () => ({
      opacity: 0,
      scale: 1.02,
    }),
    center: {
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: () => ({
      opacity: 0,
      scale: 0.99,
      zIndex: 0,
    }),
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.9, ease: "easeInOut" },
            scale: { duration: 0.9, ease: "easeInOut" },
          }}
          className="absolute inset-0"
        >
          {/* Background image with parallax */}
          <motion.img
            src={slide.image}
            alt={slide.title}
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 md:scale-100"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            <motion.h1
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg tracking-tight leading-tight max-w-3xl"
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: isTyping ? Infinity : 0,
                }}
                className="inline-block w-[8px] h-[1.2em] bg-green-400 ml-1 align-middle"
              />
            </motion.h1>

            {!isTyping && (
              <motion.p
                key={slide.text}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mt-4 max-w-2xl text-gray-200 text-lg md:text-xl leading-relaxed"
              >
                {slide.text}
              </motion.p>
            )}

            {/* Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-8 flex space-x-3"
            >
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === current) return;
                    setCurrent(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current
                      ? "bg-green-400 scale-125"
                      : "bg-gray-400/60 hover:bg-gray-200"
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
