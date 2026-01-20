"use client";

import { useState, useMemo } from "react";
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

const DEFAULT_PROVIDERS: Provider[] = [
  { id: "itunes", label: "iTunes&Apple", iconSrc: "/credit/itunes.png" },
  { id: "steam", label: "Steam", iconSrc: "/credit/steam.png" },
  { id: "google", label: "Google", iconSrc: "/credit/google.png" },
  { id: "amazon", label: "Amazon", iconSrc: "/credit/amazon.png" },
  { id: "netflix", label: "Netflix", iconSrc: "/credit/netflix.png" },
  { id: "playstation", label: "PlayStation", iconSrc: "/credit/playstation.png" },
  { id: "xbox", label: "Xbox Live", iconSrc: "/credit/xbox.png" },
  { id: "spotify", label: "Spotify", iconSrc: "/credit/spotify.png" },
  { id: "uber", label: "Uber", iconSrc: "/credit/uber.png" },
  { id: "airbnb", label: "Airbnb", iconSrc: "/credit/airbnb.png" },
  { id: "starbucks", label: "Starbucks", iconSrc: "/credit/starbucks.png" },
  { id: "nintendo", label: "Nintendo", iconSrc: "/credit/nitendo.png" },
  { id: "roblox", label: "Roblox", iconSrc: "/credit/roblox.png" },
];

export default function CreditProviderTabs({
  providers = DEFAULT_PROVIDERS,
  defaultActiveId = "itunes",
  onChange,
}: Props) {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeProvider = useMemo(
    () => providers.find((p) => p.id === activeId) ?? providers[0],
    [providers, activeId]
  );

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const handleMobileSelect = (id: string) => {
    handleClick(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* MAIN BAR – DARK THEME */}
      <div className="w-full bg-black border-b border-white/10 mt-2 py-3">
        <div className="w-full px-4 sm:px-6 lg:px-10">

          {/* MOBILE — title + hamburger */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Gift card
              </span>
              <span className="text-xs font-medium text-white">
                {activeProvider?.label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/20 bg-black shadow-sm"
            >
              <div className="flex flex-col gap-[3px]">
                <span className="h-[2px] w-4 rounded-full bg-white" />
                <span className="h-[2px] w-3 rounded-full bg-white/70" />
                <span className="h-[2px] w-4 rounded-full bg-white" />
              </div>
            </button>
          </div>

          {/* DESKTOP ROW */}
          <div
            className="
              hidden md:flex
              flex-wrap justify-center items-center
              gap-x-6 gap-y-4 py-1
            "
          >
            {providers.map((p) => {
              const isActive = p.id === activeId;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleClick(p.id)}
                  className={`
                    flex items-center gap-2
                    border-b-2 pb-1.5
                    transition-all whitespace-nowrap

                    ${
                      isActive
                        ? "border-sky-400 text-white"
                        : "border-transparent text-white/50 hover:text-white"
                    }
                  `}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full overflow-hidden">
                    <Image
                      src={p.iconSrc}
                      alt={p.label}
                      width={26}
                      height={26}
                      className={isActive ? "" : "opacity-70"}
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

      {/* MOBILE SLIDE-OUT — BLACK THEME */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* DARK BACKDROP */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* DARK PANEL */}
        <div
          className={`
            absolute left-0 top-0
            h-full min-h-screen
            w-[78%] max-w-xs
            bg-black border-r border-white/10
            shadow-[4px_0_30px_rgba(0,0,0,0.6)]
            flex flex-col
            transform transition-transform duration-300 ease-out
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <span className="text-xs font-semibold text-white tracking-wide">
              Choose gift card
            </span>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="h-7 w-7 flex items-center justify-center rounded-full bg-white/10"
            >
              <div className="relative h-3 w-3">
                <span className="absolute inset-0 h-[2px] w-full bg-white rotate-45 rounded-full" />
                <span className="absolute inset-0 h-[2px] w-full bg-white -rotate-45 rounded-full" />
              </div>
            </button>
          </div>

          {/* PROVIDERS LIST */}
          <div className="flex-1 overflow-y-auto px-3 pt-3 pb-6 space-y-2">
            {providers.map((p) => {
              const isActive = p.id === activeId;

              return (
                <button
                  key={p.id}
                  onClick={() => handleMobileSelect(p.id)}
                  className={`
                    w-full flex items-center justify-between
                    rounded-xl px-3 py-3
                    text-xs font-medium
                    transition-colors

                    ${
                      isActive
                        ? "bg-sky-500/20 text-sky-300"
                        : "bg-white/5 text-white/90 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-white/10">
                      <Image
                        src={p.iconSrc}
                        alt={p.label}
                        width={26}
                        height={26}
                        className={isActive ? "" : "opacity-80"}
                      />
                    </span>
                    <span>{p.label}</span>
                  </div>

                  {isActive && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-sky-400">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
