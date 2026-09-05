
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function DashboardHero() {
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
          key="hero"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(5px)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-4
            mt-12
            overflow-hidden
            rounded-[1.5rem]
            text-[#111014]
            sm:mx-6
            md:mt-14
          "
        >
          {/* Background */}
          <div
            className="
              absolute
              inset-0
              scale-[1.01]
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage:
                "url('/images/v2osk--LRuNvY8W7Q-unsplash.jpg')",
            }}
          />

          {/* Soft readability layer */}
          <div className="absolute inset-0 bg-white/78" />

          {/* Very subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/65 to-white/75" />

          {/* Soft ambient glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-[#F5B400]/15
              blur-[60px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-16
              h-52
              w-52
              rounded-full
              bg-black/5
              blur-[65px]
            "
          />

          {/* Fine border */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-black/10" />

          {/* Content */}
          <div
            className="
              relative
              z-10
              mx-auto
              flex
              min-h-[220px]
              max-w-3xl
              flex-col
              items-center
              justify-center
              px-5
              py-9
              text-center
              sm:min-h-[240px]
              sm:px-8
              sm:py-10
              md:min-h-[260px]
              md:px-10
              md:py-11
            "
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="
                mb-3
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-black/10
                bg-white/55
                px-2.5
                py-1
                text-[8px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-neutral-600
                backdrop-blur-md
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5B400] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F5B400]" />
              </span>

              <Sparkles className="h-2.5 w-2.5" />

              Fynaro Workspace
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-2xl
                text-[1.7rem]
                font-semibold
                leading-[1.05]
                tracking-[-0.04em]
                text-[#111014]
                sm:text-3xl
                md:text-[3rem]
              "
            >
              Build something{" "}
              <span className="relative inline-block">
                worth remembering.

                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[2px]
                    w-full
                    origin-left
                    rounded-full
                    bg-[#F5B400]
                    sm:-bottom-1.5
                  "
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.22,
                ease: "easeOut",
              }}
              className="
                mt-3
                max-w-xl
                text-xs
                leading-5
                text-neutral-600
                sm:mt-3.5
                sm:text-sm
                sm:leading-6
                md:text-[15px]
              "
            >
              Explore Fynaro&apos;s digital services, submit a project,
              track active work, and manage everything from one
              thoughtfully designed workspace.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.34,
                ease: "easeOut",
              }}
              className="mt-5"
            >
              <motion.button
                type="button"
                onClick={handleBeginJourney}
                disabled={isJourneying}
                whileHover={
                  !isJourneying
                    ? {
                        scale: 1.02,
                        y: -1,
                      }
                    : undefined
                }
                whileTap={
                  !isJourneying
                    ? {
                        scale: 0.98,
                      }
                    : undefined
                }
                className="
                  group
                  relative
                  inline-flex
                  min-w-[175px]
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-full
                  bg-[#111014]
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  shadow-[0_8px_22px_rgba(17,16,20,0.16)]
                  transition-shadow
                  hover:shadow-[0_10px_28px_rgba(17,16,20,0.22)]
                  disabled:cursor-not-allowed
                "
              >
                {/* Subtle shine */}
                {!isJourneying && (
                  <motion.span
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      w-12
                      -skew-x-12
                      bg-white/10
                    "
                  />
                )}

                <AnimatePresence mode="wait" initial={false}>
                  {isJourneying ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        className="
                          h-3.5
                          w-3.5
                          rounded-full
                          border-2
                          border-white/25
                          border-t-white
                        "
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                      />

                      <span>Preparing your workspace...</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative flex items-center gap-1.5"
                    >
                      <span>Enter your workspace</span>

                      <ArrowRight
                        className="
                          h-3.5
                          w-3.5
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Reassurance */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="
                mt-2.5
                text-[9px]
                tracking-wide
                text-neutral-400
              "
            >
              Your projects. Your progress. One workspace.
            </motion.p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

