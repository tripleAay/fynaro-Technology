// components/dashboard/ExploreByCategorySection.tsx
"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Car,
  Boxes,
  Cog,
  CreditCard,
  PenTool,
  Smartphone,
} from "lucide-react";

export type Category = {
  id: string | number;
  name: string;
  icon?: ReactNode;
  description?: string;
};

type ExploreByCategorySectionProps = {
  isLoading?: boolean;
  categories: Category[]; // Added categories prop
  activeCategoryId?: string | number;
  onSelectCategory?: (category: Category) => void;
};

// 🎯 Icon mapping
const defaultIcons: Record<string, ReactNode> = {
  "Brand & Print Studio": <PenTool size={24} />,
  "Web & Mobile Service": <Smartphone size={24} />,
  "Auto Tech": <Car size={26} />,
  "Fynaro Credits": <CreditCard size={24} />,
  Settings: <Cog size={24} />,
};

// 🔗 Route mapping (adjust to your actual routes)
const categoryRoutes: Record<string, string> = {
  "brand-print": "/shop",
  "Brand & Print Studio": "/shop",

  "web-mobile": "/shop/web-mobile",
  "Web & Mobile Service": "/shop/web-mobile",

  "auto-tech": "/shop/auto-tech",
  "Auto Tech": "/shop/auto-tech",

  "fynaro-credits": "/shop/credits",
  "Fynaro Credits": "/shop/credits",
};

function getCategoryPath(cat: Category): string {
  if (typeof cat.id === "string" && categoryRoutes[cat.id]) {
    return categoryRoutes[cat.id];
  }
  if (categoryRoutes[cat.name]) {
    return categoryRoutes[cat.name];
  }

  const slug = cat.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `/${slug}`;
}

// ✅ Keys for mapping active state from outside
const BRAND_PRINT_KEYS = [
  "brand-print",
  "Brand & Print Studio",
  "Branding",
  "branding",
  "Print",
  "print",
];

const WEB_MOBILE_KEYS = [
  "web-mobile",
  "Web & Mobile Service",
  "Web",
  "web",
  "Web Service",
  "web-service",
  "Mobile",
  "mobile",
];

const AUTO_TECH_KEYS = ["auto-tech", "Auto Tech", "autotech", "auto_tech"];

const CREDITS_KEYS = [
  "fynaro-credits",
  "Fynaro Credits",
  "credits",
  "credit",
  "fynaro_credits",
];

export default function ExploreByCategorySection({
  isLoading,
  categories, // Use categories from props
  activeCategoryId,
  onSelectCategory,
}: ExploreByCategorySectionProps) {
  const router = useRouter();
  const [loadingKey, setLoadingKey] = useState<string | number | null>(null);

  const activeKey = activeCategoryId != null ? String(activeCategoryId) : "";

  if (isLoading) {
    return (
      <section className="mt-10 mb-6 px-4 sm:px-6 lg:px-10">
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-6 w-56 bg-neutral-800/70 rounded-full mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-neutral-900/70 border border-neutral-800/80 rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mb-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/60 border border-neutral-800 px-3 py-1 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8a96a]" />
          <span className="text-[11px] sm:text-xs font-medium text-neutral-200 tracking-tight">
            Brand & Print · Web & Mobile · AutoTech · Credits
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Explore your Fynaro workspace
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
          Four pillars, one ecosystem — manage your brand, web, auto services and
          credits from a single, calm view.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {categories.map((cat) => { // Use categories from props
            const key = cat.id;

            // 🔥 Smart active state mapping
            let isActive = false;
            if (cat.id === "brand-print") {
              isActive = BRAND_PRINT_KEYS.includes(activeKey);
            } else if (cat.id === "web-mobile") {
              isActive = WEB_MOBILE_KEYS.includes(activeKey);
            } else if (cat.id === "auto-tech") {
              isActive = AUTO_TECH_KEYS.includes(activeKey);
            } else if (cat.id === "fynaro-credits") {
              isActive = CREDITS_KEYS.includes(activeKey);
            }

            const isLoadingThis = loadingKey === key;

            const handleClick = () => {
              if (isLoadingThis) return;

              onSelectCategory?.(cat);
              setLoadingKey(key);

              const target = getCategoryPath(cat);
              setTimeout(() => {
                router.push(target);
              }, 800);
            };

            return (
              <motion.button
                key={key}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClick}
                disabled={isLoadingThis}
                className={`
                  relative overflow-hidden cursor-pointer
                  w-[46%] xs:w-[44%] sm:w-[15rem] lg:w-[15.5rem]
                  rounded-2xl border bg-gradient-to-b from-white/95 to-neutral-50
                  dark:from-neutral-900 dark:to-neutral-950
                  px-4 sm:px-5 py-5 sm:py-6
                  flex flex-col items-center text-center shadow-sm
                  transition-all duration-200
                  ${
                    isActive
                      ? "border-[#c8a96a] shadow-[0_0_0_1px_rgba(200,169,106,0.45)]"
                      : "border-neutral-200/80 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-500 hover:shadow-md"
                  }
                  ${isLoadingThis ? "opacity-80" : ""}
                `}
              >
                {/* subtle top glow in Fynaro gold */}
                <div className="pointer-events-none absolute inset-x-0 -top-6 h-12 bg-gradient-to-b from-[#c8a96a]/22 to-transparent" />

                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e8d0] dark:bg-[#c8a96a]/12 text-[#c8a96a]">
                  {cat.icon ?? defaultIcons[cat.name] ?? <Boxes size={22} />}
                </div>

                <h3
                  className={`text-sm sm:text-[0.95rem] font-medium tracking-tight flex items-center justify-center gap-2
                    ${
                      isActive
                        ? "text-[#c8a96a]"
                        : "text-neutral-900 dark:text-neutral-50"
                    }`}
                >
                  {isLoadingThis && (
                    <motion.span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full border-[2px] border-[#c8a96a] border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        ease: "linear",
                      }}
                    />
                  )}
                  <span>{cat.name}</span>
                </h3>

                {cat.description && (
                  <p className="mt-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}