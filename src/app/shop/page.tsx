// pages/shop.tsx
"use client";

import { useState, useEffect } from "react";

import DashboardHeader from "../../components/dashboard components/mainheader";
import HeroSlider from "../../components/dashboard components/mainheroe";
import Collections from "../../components/dashboard components/collections";
import HotStuffSection from "../../components/dashboard components/hotstuffSections";
import Footer from "../../components/footer";

import ExploreByCategorySection from "@/components/dashboard components/exploreByCategorySection";
import HowItWorksSection from "../../components/dashboard components/howItWorksSection";
import ProjectModeCTA from "../../components/dashboard components/projectModeCTA";

// 🔹 Dashboard-style categories (AutoTech-flavoured)
const dashboardCategories = [
  {
    id: "web-services",
    name: "Web Services",
    image: "/categories/web.png",
    description:
      "Landing pages, dashboards & booking flows for AutoTech brands.",
    badge: "AutoTech",
  },
  {
    id: "brand-design",
    name: "Brand Design",
    image: "/categories/design.png",
    description: "Logos, identity systems and brand kits for serious teams.",
    badge: "Studio",
  },
  {
    id: "printed-products",
    name: "Printed Products",
    image: "/categories/print.png",
    description: "Business cards, merch, packaging and rollout materials.",
    badge: "Print",
  },
];

export default function ShopPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | number>(
    "web-services"
  );

  const [isLoading, setIsLoading] = useState(true);

  // 🦴 simple fake loading – later you can tie this to real data fetching
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      {/* Fixed dashboard header */}
      <DashboardHeader />

      {/* pad for fixed header */}
      <main className="pt-16">
        {/* ===================== HERO / TOP BLOCK ===================== */}
        {isLoading ? (
          <section className="px-4 sm:px-6 lg:px-10 mt-4 animate-pulse">
            <div className="max-w-6xl mx-auto">
              <div className="h-40 sm:h-56 lg:h-64 rounded-3xl bg-gradient-to-r from-neutral-800/70 to-neutral-900/70 border border-neutral-800/60" />
              <div className="mt-4 flex gap-3">
                <div className="h-8 w-32 rounded-full bg-neutral-800/80" />
                <div className="h-8 w-20 rounded-full bg-neutral-800/60" />
              </div>
            </div>
          </section>
        ) : (
          <HeroSlider />
        )}

        {/* ===================== COLLECTIONS ===================== */}
        {isLoading ? (
          <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-40 rounded-full bg-neutral-800/80" />
              <div className="h-6 w-20 rounded-full bg-neutral-800/60" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
                >
                  <div className="h-32 rounded-xl bg-neutral-800/80 mb-3" />
                  <div className="h-4 w-3/4 bg-neutral-800/80 rounded-full mb-2" />
                  <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1.5" />
                  <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <Collections />
        )}

        {/* ===================== HOT STUFF SECTION ===================== */}
        {isLoading ? (
          <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-32 rounded-full bg-neutral-800/80" />
              <div className="h-6 w-16 rounded-full bg-neutral-800/60" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
                >
                  <div className="h-24 rounded-xl bg-neutral-800/80 mb-3" />
                  <div className="h-4 w-2/3 bg-neutral-800/80 rounded-full mb-2" />
                  <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1" />
                  <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <HotStuffSection />
        )}

        {/* ===================== Dashboard Categories ===================== */}
        <ExploreByCategorySection
          isLoading={isLoading}
          categories={dashboardCategories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(cat) => {
            setActiveCategoryId(cat.id);
            console.log("Selected category:", cat.id);
          }}
        />

        {/* ===================== How It Works ===================== */}
        <HowItWorksSection isLoading={isLoading} />

        {/* ===================== Call-to-Action ===================== */}
        <ProjectModeCTA />
      </main>

      <Footer />
    </div>
  );
}
