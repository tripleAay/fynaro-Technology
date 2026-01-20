"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DashboardHero() {
  const [visible, setVisible] = useState(true);
  const [isJourneying, setIsJourneying] = useState(false);

  const handleBeginJourney = () => {
    if (isJourneying) return;
    setIsJourneying(true);

    // Let the spinner run briefly, then close the hero with a burst
    setTimeout(() => {
      setVisible(false);
    }, 1000); // tweak if you want longer/shorter
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="hero"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }} // 🔥 burst close
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="relative mt-20 mx-6 overflow-hidden rounded-3xl text-[#111014] h-[230px] sm:h-[260px] md:h-[300px]"
          style={{
            backgroundImage: "url('/images/v2osk--LRuNvY8W7Q-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-white/55 backdrop-blur-[6px]" />

          {/* Gentle light gradients */}
          <div className="absolute top-0 left-0 w-56 h-56 bg-[#111014]/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#111014]/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          {/* Main content */}
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-6 text-center sm:py-8 md:py-10">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight leading-tight"
            >
              Welcome to Your{" "}
              <span className="text-[#111014]/90">Creative Hub</span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-neutral-700"
            >
              Track your orders, manage requests and access everything in one
              space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              className="mt-4 flex justify-center"
            >
              <motion.button
                whileHover={!isJourneying ? { scale: 1.03 } : {}}
                whileTap={!isJourneying ? { scale: 0.96 } : {}}
                onClick={handleBeginJourney}
                disabled={isJourneying}
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[#111014] px-7 py-2.5 sm:px-8 sm:py-3 text-white text-sm sm:text-base tracking-tight shadow-md hover:bg-neutral-900 transition-all disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {/* Spinner INSIDE button */}
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
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                      />
                      <span className="text-xs sm:text-sm">
                        Preparing your space...
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
                      Begin Your Journey
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
