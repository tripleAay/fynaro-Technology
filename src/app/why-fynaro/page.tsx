"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/dashboard components/homeHeader";
import WhyFynaroHero from "@/components/whyfyna-hero";
import CoreValue from "@/components/core-value";
import WhyFynaroPillars from "@/components/WhyFynaroPillars";
import WhyFynaroClosing from "@/components/WhyFynaroClosing";
import Footer from "@/components/footer";

const pillars = [
  {
    id: "strategy",
    label: "01 / STRATEGY",
    title: "Strategy gives the work direction.",
    text: "Before anything is designed or built, the thinking has to be right. Strategy is where Fynaro defines the problem, sharpens the opportunity, and sets the direction for what the brand or product needs to become.",
    points: [
      "Positioning and clarity",
      "Product and brand direction",
      "Decision-making before execution",
    ],
    image: "/images/kaleidico-26MJGnCM0Wc-unsplash.jpg",
    alt: "Strategic planning illustration",
  },
  {
    id: "design",
    label: "02 / DESIGN",
    title: "Design makes the direction visible.",
    text: "Design turns strategy into something people can see, feel, and understand. It shapes identity, interface, hierarchy, and perception into an experience that feels clear, refined, and memorable.",
    points: [
      "Identity and interface clarity",
      "Visual confidence and presence",
      "Experiences that feel intentional",
    ],
    image: "/images/amelie-mourichon-sv8oOQaUb-o-unsplash.jpg",
    alt: "Design illustration",
  },
  {
    id: "code",
    label: "03 / CODE",
    title: "Code brings the idea to life.",
    text: "Code is where the vision stops being a concept and becomes real. It makes the product work, makes the interaction responsive, and gives the brand a digital presence that actually holds up in use.",
    points: [
      "Functional web and mobile builds",
      "Performance with structure",
      "Execution that makes it real",
    ],
    image: "/images/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    alt: "Code and execution illustration",
  },
];

export default function WhyFynaroPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-black text-white">
        {/* atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)]" />
        </div>

        {/* hero */}
        <WhyFynaroHero />
        <CoreValue />
        <WhyFynaroPillars pillars={pillars} />
        <WhyFynaroClosing />

        
      </main>

      <Footer />
    </>
  );
}


