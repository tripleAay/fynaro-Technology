"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GiftcardTradingHero() {
  const [visible, setVisible] = useState(true);
  const [isJourneying, setIsJourneying] = useState(false);

  const handleBeginJourney = () => {
    if (isJourneying) return;
    setIsJourneying(true);

    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="giftcard-hero"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="
            relative 
            w-full
            bg-white         /* 🔥 White background wrapper */
            pt-6 pb-6        /* 🔥 Added mobile padding top + bottom */
            sm:pt-8 sm:pb-8
            md:pt-10 md:pb-10
          "
        >
          {/* HERO BOX */}
          <div
            className="
              relative mx-4 sm:mx-6 md:mx-auto
              overflow-hidden rounded-3xl
              h-[150px] sm:h-[160px] md:h-[180px]
            "
            style={{
              backgroundImage: "url('/images/giftcards-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Soft glass overlay */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[8px]" />

            {/* Light glows */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-[-40px] h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full items-center">
              <div className="w-full px-4 text-center">
                {/* 🔥 Text stretches full width now */}
                <motion.h1
                  initial={{ y: -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="
                    text-[18px] text-black sm:text-[20px] md:text-[22px]
                    font-semibold tracking-tight leading-snug
                  "
                >
                  Unlock the{" "}
                  <span className="bg-gradient-to-r from-sky-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
                    best gift card rates
                  </span>{" "}
                  in real time.
                </motion.h1>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="
                    mt-1.5 w-full text-[11px] sm:text-xs md:text-sm
                    text-neutral-700
                  "
                >
                  Instantly compare vendors, secure the top buy price, and cash
                  out faster than ever.
                </motion.p>

                {/* BUTTON */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                  className="mt-3 flex justify-center"
                >
                  <motion.button
                    whileHover={!isJourneying ? { scale: 1.03 } : {}}
                    whileTap={!isJourneying ? { scale: 0.96 } : {}}
                    onClick={handleBeginJourney}
                    disabled={isJourneying}
                    className="
                      relative inline-flex items-center justify-center gap-2
                      rounded-full bg-[#050816]
                      px-6 py-2 sm:px-7 sm:py-2.5
                      text-white text-xs sm:text-sm md:text-[13px]
                      tracking-tight shadow-md
                      hover:bg-black transition-all
                      disabled:opacity-80 disabled:cursor-not-allowed
                    "
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isJourneying ? (
                        <motion.span
                          key="spinner"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.span
                            className="h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full border-2 border-white/30 border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                          />
                          <span className="text-[11px] sm:text-xs">
                            Fetching live rates…
                          </span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          Open trading desk
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
