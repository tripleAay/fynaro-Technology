
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Heart,
  Menu as MenuIcon,
  Package,
  Settings,
  Sparkles,
  X,
  Wrench,
} from "lucide-react";

const Dashhead: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const closeMenu = () => setIsOpen(false);

  const serviceItems = [
    {
      href: "/shop/web-services",
      icon: Sparkles,
      number: "01",
      title: "Web & Mobile",
      description: "Websites · Apps · Ecommerce",
    },
    {
      href: "/shop/branding-services",
      icon: BriefcaseBusiness,
      number: "02",
      title: "Brand & Design",
      description: "Identity · Interfaces · Visuals",
    },
    {
      href: "/shop/digital-support",
      icon: Wrench,
      number: "03",
      title: "Digital Support",
      description: "Maintenance · Optimization · Support",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed
          left-4
          top-4
          z-50
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-black/10
          bg-white/95
          text-[#111014]
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-black/20
          hover:shadow-md
          lg:hidden
        "
        aria-label="Open navigation"
      >
        <MenuIcon className="h-[18px] w-[18px]" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/25
            backdrop-blur-[3px]
            lg:hidden
          "
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          w-[280px]
          flex-col
          border-r
          border-black/[0.07]
          bg-white
          px-6
          py-7
          text-[#111014]
          shadow-[12px_0_40px_rgba(17,16,20,0.04)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:static
          lg:h-auto
          lg:w-[270px]
          lg:translate-x-0
          lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Top */}
        <div>
          {/* Brand */}
          <div className="mb-9 flex items-start justify-between">
            <Link
              href="/shop"
              onClick={closeMenu}
              className="group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#111014]
                    text-[10px]
                    font-bold
                    tracking-tight
                    text-white
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  F
                </div>

                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.02em]">
                    Fynaro
                  </div>

                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                    Workspace
                  </div>
                </div>
              </div>
            </Link>

            <button
              onClick={closeMenu}
              className="
                text-neutral-400
                transition-colors
                hover:text-[#111014]
                lg:hidden
              "
              aria-label="Close navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Services */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                What are you building?
              </p>

              <span className="text-[9px] text-neutral-300">
                03
              </span>
            </div>

            <div className="space-y-2">
              {serviceItems.map((service) => {
                const Icon = service.icon;
                const active = isActive(service.href);

                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={closeMenu}
                    className={`
                      group
                      relative
                      block
                      rounded-2xl
                      border
                      px-4
                      py-3.5
                      transition-all
                      duration-300
                      ${
                        active
                          ? "border-[#F5B400]/30 bg-[#F5B400]/[0.07]"
                          : "border-transparent hover:border-black/[0.07] hover:bg-black/[0.025]"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {active && (
                      <span className="absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full bg-[#F5B400]" />
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          mt-0.5
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          transition-all
                          duration-300
                          ${
                            active
                              ? "bg-[#F5B400]/15 text-[#111014]"
                              : "bg-black/[0.035] text-neutral-500 group-hover:bg-[#F5B400]/10 group-hover:text-[#111014]"
                          }
                        `}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`
                              text-[13px]
                              font-semibold
                              tracking-[-0.015em]
                              ${
                                active
                                  ? "text-[#111014]"
                                  : "text-[#25242a]"
                              }
                            `}
                          >
                            {service.title}
                          </span>

                          <span
                            className={`
                              text-[8px]
                              font-medium
                              tracking-wider
                              transition-colors
                              ${
                                active
                                  ? "text-[#F5B400]"
                                  : "text-neutral-300 group-hover:text-neutral-400"
                              }
                            `}
                          >
                            {service.number}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] leading-4 text-neutral-400">
                          {service.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        className="
                          mt-1
                          h-3.5
                          w-3.5
                          shrink-0
                          text-neutral-300
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:text-[#111014]
                          group-hover:opacity-100
                        "
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Workspace */}
          <div className="mb-8">
            <p className="mb-3 px-1 text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Workspace
            </p>

            <nav className="space-y-1">
              <Link
                href="/shop"
                onClick={closeMenu}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive("/shop")
                      ? "bg-black/[0.045] text-[#111014]"
                      : "text-neutral-500 hover:bg-black/[0.025] hover:text-[#111014]"
                  }
                `}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Overview
              </Link>

              <Link
                href="/shop/order"
                onClick={closeMenu}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive("/shop/order")
                      ? "bg-black/[0.045] text-[#111014]"
                      : "text-neutral-500 hover:bg-black/[0.025] hover:text-[#111014]"
                  }
                `}
              >
                <Package className="h-3.5 w-3.5" />
                Orders & Activity
              </Link>

              <Link
                href="/shop/wish-list"
                onClick={closeMenu}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive("/shop/wish-list")
                      ? "bg-black/[0.045] text-[#111014]"
                      : "text-neutral-500 hover:bg-black/[0.025] hover:text-[#111014]"
                  }
                `}
              >
                <Heart className="h-3.5 w-3.5" />
                Saved
              </Link>
            </nav>
          </div>

          {/* Studio / Merchandise */}
          <div>
            <p className="mb-3 px-1 text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Studio
            </p>

            <Link
              href="/shop/printed-products"
              onClick={closeMenu}
              className="
                group
                flex
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-[13px]
                font-medium
                text-neutral-500
                transition-all
                duration-200
                hover:bg-black/[0.025]
                hover:text-[#111014]
              "
            >
              <span className="flex items-center gap-3">
                <Package className="h-3.5 w-3.5" />
                Merchandise
              </span>

              <ArrowUpRight
                className="
                  h-3.5
                  w-3.5
                  text-neutral-300
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>

            <Link
              href="/shop/settings"
              onClick={closeMenu}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-[13px]
                font-medium
                transition-all
                duration-200
                ${
                  isActive("/shop/settings")
                    ? "bg-black/[0.045] text-[#111014]"
                    : "text-neutral-500 hover:bg-black/[0.025] hover:text-[#111014]"
                }
              `}
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <footer className="mt-8 border-t border-black/[0.06] pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full border border-black/10">
                <Image
                  src="https://flagcdn.com/w20/ng.png"
                  alt="Nigeria Flag"
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>

              <button
                className="
                  flex
                  items-center
                  gap-1
                  text-[10px]
                  font-medium
                  text-neutral-500
                  transition-colors
                  hover:text-[#111014]
                "
              >
                NGN
                <ChevronDown className="h-2.5 w-2.5" />
              </button>
            </div>

            <span className="text-[9px] text-neutral-300">
              Fynaro Studio
            </span>
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Dashhead;
