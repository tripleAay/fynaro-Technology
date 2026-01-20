"use client";

import { useState } from "react";
import Image from "next/image";

type ProductCategory = {
  id: number;
  name: string;
  iconSrc: string;
  iconAlt: string;
};

const CATEGORIES: ProductCategory[] = [
  { id: 1, name: "Oils", iconSrc: "/auto-tech/oill.png", iconAlt: "Oil can" },
  { id: 2, name: "AC & Cooling System", iconSrc: "/auto-tech/AC.png", iconAlt: "AC & cooling system" },
  { id: 3, name: "Diesel System", iconSrc: "/auto-tech/nozzle.png", iconAlt: "Diesel injector" },
  { id: 4, name: "Ignition System", iconSrc: "/auto-tech/2a118140-b148-4386-98a1-fb8af34224f4.svg", iconAlt: "Ignition plug" },
  { id: 5, name: "Braking System", iconSrc: "/auto-tech/brake and disc.png", iconAlt: "Brake disc" },
  { id: 6, name: "Filters", iconSrc: "/auto-tech/filter.png", iconAlt: "Filter" },
  { id: 7, name: "Additives", iconSrc: "/auto-tech/oil.png", iconAlt: "Additives" },
  { id: 8, name: "Lighting System", iconSrc: "/auto-tech/lightening.png", iconAlt: "Lighting system" },
  { id: 9, name: "Suspension System", iconSrc: "/auto-tech/chasis.svg", iconAlt: "Suspension system" },
  { id: 10, name: "Clutch System", iconSrc: "/auto-tech/clutch.png", iconAlt: "Clutch system" },
];

export default function ProductFinderGrid() {
  const [activeId, setActiveId] = useState<number>(8);

  return (
    <section className="w-full py-10 sm:py-14">
      <div className="mx-auto max-w-6xl flex flex-col items-center px-4">
        
        {/* Top label */}
        <p className="text-xs tracking-[0.22em] text-white uppercase">Products we serve</p>

        {/* Heading */}
        <div className="mt-2 text-center leading-tight">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            HELPS YOU TO FIND
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            YOUR PRODUCT <span className="text-[#c7a25a]">EASILY</span>
          </p>
        </div>

        {/* GRID */}
        <div className="mt-8 w-full space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                active={cat.id === activeId}
                onClick={() => setActiveId(cat.id)}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.slice(5).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                active={cat.id === activeId}
                onClick={() => setActiveId(cat.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SINGLE TILE ---------- */

type CardProps = {
  category: ProductCategory;
  active: boolean;
  onClick: () => void;
};

function CategoryCard({ category, active, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        "group relative flex h-44 sm:h-52 w-full flex-col justify-between rounded-md border",
        "transition-all duration-300 ease-out shadow-[0_14px_30px_rgba(0,0,0,0.06)]",
        
        // DEFAULT (white)
        "bg-white text-neutral-900 border-transparent",

        // ACTIVE TILE
        active && "bg-[#c7a25a] border-[#c7a25a] text-white",

        // HOVER TILE — background turns gold but text stays original color
        !active &&
          "hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)] hover:bg-[#c7a25a]/90 hover:border-[#c7a25a]/90",
      ].join(" ")}
    >
      {/* number */}
      <div
        className={[
          "px-4 pt-3 text-lg font-semibold transition-colors duration-300",
          active ? "text-white" : "text-neutral-900",
          !active && "group-hover:text-neutral-900",
        ].join(" ")}
      >
        {category.id}
      </div>

      {/* icon */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative h-16 w-16 sm:h-20 sm:w-20">
          <Image
            src={category.iconSrc}
            alt={category.iconAlt}
            fill
            className={[
              "object-contain transition-transform duration-300 group-hover:scale-105",
              active ? "brightness-[400%] invert" : "opacity-90",
            ].join(" ")}
          />
        </div>
      </div>

      {/* label */}
      <div
        className={[
          "pb-4 text-center text-xs sm:text-sm font-semibold transition-colors duration-300",
          active ? "text-white" : "text-neutral-900",
          !active && "group-hover:text-neutral-900",
        ].join(" ")}
      >
        {category.name}
      </div>
    </button>
  );
}
