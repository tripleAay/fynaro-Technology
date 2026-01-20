// src/components/credit/CreditProviderTabs.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type Provider = {
  id: string;
  label: string;
  iconSrc: string;
};

type Props = {
  providers?: Provider[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
};

/**
 * NOTE: Make sure these icon files exist under /public/credit/
 */
const DEFAULT_PROVIDERS: Provider[] = [
  {
    id: "itunes",
    label: "iTunes&Apple",
    iconSrc: "/credit/itunes-apple.png",
  },
  {
    id: "steam",
    label: "Steam",
    iconSrc: "/credit/steam.png",
  },
  {
    id: "google",
    label: "Google",
    iconSrc: "/credit/google.png",
  },
  {
    id: "amazon",
    label: "Amazon",
    iconSrc: "/credit/amazon.png",
  },
  {
    id: "netflix",
    label: "Netflix",
    iconSrc: "/credit/netflix.png",
  },
  {
    id: "playstation",
    label: "PlayStation",
    iconSrc: "/credit/playstation.png",
  },
  {
    id: "xbox",
    label: "Xbox Live",
    iconSrc: "/credit/xbox.png",
  },
  {
    id: "spotify",
    label: "Spotify",
    iconSrc: "/credit/spotify.png",
  },
  {
    id: "uber",
    label: "Uber",
    iconSrc: "/credit/uber.png",
  },
  {
    id: "airbnb",
    label: "Airbnb",
    iconSrc: "/credit/airbnb.png",
  },
  {
    id: "starbucks",
    label: "Starbucks",
    iconSrc: "/credit/starbucks.png",
  },
  {
    id: "nintendo",
    label: "Nintendo",
    iconSrc: "/credit/nintendo.png",
  },
  {
    id: "roblox",
    label: "Roblox",
    iconSrc: "/credit/roblox.png",
  },
];

export default function CreditProviderTabs({
  providers = DEFAULT_PROVIDERS,
  defaultActiveId = "itunes",
  onChange,
}: Props) {
  const [activeId, setActiveId] = useState(defaultActiveId);

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 mt-20">
      {/* Inner bar – full-width, horizontal scroll */}
      <div className="mx-auto flex h-12 w-full max-w-5xl items-center px-3 sm:px-4">
        <div className="flex flex-1 items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
          {providers.map((p) => {
            const isActive = p.id === activeId;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleClick(p.id)}
                className={`flex items-center gap-1.5 pb-2 border-b-2 whitespace-nowrap transition-all
                  ${
                    isActive
                      ? "border-sky-500 text-slate-900"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full overflow-hidden">
                  <Image
                    src={p.iconSrc}
                    alt={p.label}
                    width={24}
                    height={24}
                    className={isActive ? "" : "opacity-60"}
                  />
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
