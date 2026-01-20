"use client";

import React, { useState } from "react";
import Image from "next/image"; // ← Added this import
import {
  ChevronDown,
  Menu as MenuIcon,
  X,
  Printer,
  Layers,
  Palette,
  Settings,
  Home,
  Package,
  ClipboardList,
  Heart,
} from "lucide-react";

type DropdownKey = "prints" | "branding" | null;

const Dashhead: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (dropdown: DropdownKey) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#111014] text-white p-2 rounded-md hover:bg-[#1b1a22] transition-all duration-300 shadow-md"
        aria-label="Open navigation"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-72 lg:w-64 bg-white text-[#111014] px-7 py-8 flex flex-col justify-between transform transition-transform duration-500 ease-in-out z-50 border-r border-gray-200/80
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Branding */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="block">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-[#111014]">Fynaro</span>{" "}
                <span className="text-[#111014]/30">Studio</span>
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gray-400">
                Dashboard
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-black transition-all"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info */}
          <div className="mb-6 rounded-2xl bg-[#111014]/5 px-4 py-3">
            <p className="text-xs font-medium text-gray-600">
              Active Workspace
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111014]">
              Product & Print Management
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-6 text-sm">
            {/* Dashboard */}
            <button className="group flex items-center justify-between w-full font-semibold text-[#111014] hover:text-[#F5B400] transition-all">
              <span className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-[#111014]/5 p-1.5">
                  <Home size={15} />
                </span>
                <span>Overview</span>
              </span>
            </button>

            {/* Orders & Activity */}
            <div className="space-y-3">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-gray-400">
                Activity
              </p>
              <button className="flex items-center gap-3 w-full text-[#111014] hover:text-[#F5B400] font-medium transition-all">
                <Package size={16} />
                <span>Orders & Fulfilment</span>
              </button>
              <button className="flex items-center gap-3 w-full text-[#111014] hover:text-[#F5B400] font-medium transition-all">
                <ClipboardList size={16} />
                <span>Print Requests</span>
              </button>
              <button className="flex items-center gap-3 w-full text-[#111014] hover:text-[#F5B400] font-medium transition-all">
                <Heart size={16} />
                <span>Saved Products</span>
              </button>
            </div>

            {/* Print Products */}
            <div className="space-y-3">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-gray-400">
                Services
              </p>

              <div>
                <button
                  onClick={() => toggleDropdown("prints")}
                  className="flex items-center justify-between w-full font-semibold text-[#111014] hover:text-[#F5B400] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Printer size={16} />
                    <span>Print Products</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === "prints"
                        ? "rotate-180 text-[#F5B400]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {openDropdown === "prints" && (
                  <div className="mt-3 pl-7 space-y-2 text-[13px] text-gray-600">
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Business Cards
                    </button>
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Posters & Banners
                    </button>
                    <button className="block hover:text-[#111014] transition-all text-left">
                      T-Shirts & Apparel
                    </button>
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Packaging Prints
                    </button>
                  </div>
                )}
              </div>

              {/* Branding Services */}
              <div>
                <button
                  onClick={() => toggleDropdown("branding")}
                  className="flex items-center justify-between w-full font-semibold text-[#111014] hover:text-[#F5B400] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Layers size={16} />
                    <span>Branding Services</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === "branding"
                        ? "rotate-180 text-[#F5B400]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {openDropdown === "branding" && (
                  <div className="mt-3 pl-7 space-y-2 text-[13px] text-gray-600">
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Logo Design
                    </button>
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Brand Identity Systems
                    </button>
                    <button className="block hover:text-[#111014] transition-all text-left">
                      Social Media Kit
                    </button>
                  </div>
                )}
              </div>

              {/* Digital Design */}
              <button className="flex items-center gap-3 w-full font-semibold text-[#111014] hover:text-[#F5B400] transition-all">
                <Palette size={16} />
                <span>Digital Design Assets</span>
              </button>
            </div>

            {/* Settings */}
            <div className="pt-2 border-t border-gray-200/70 mt-4">
              <button className="flex items-center gap-3 w-full text-[14px] font-medium text-[#111014] hover:text-[#F5B400] transition-all">
                <Settings size={16} />
                <span>Workspace Settings</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Footer Currency Section */}
        <footer className="mt-8 border-t border-gray-200 pt-4 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 relative">
                <Image
                  src="https://flagcdn.com/w20/ng.png"
                  alt="Nigeria Flag"
                  fill
                  className="object-cover"
                  sizes="24px" // small flag, no need for larger sizes
                  priority={false} // not above the fold
                />
              </div>
              <button className="flex items-center gap-1 font-medium text-[#111014] hover:text-[#F5B400] transition-all">
                NGN
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[0.7rem] text-gray-400">
              Prices shown in Nigerian Naira
            </p>
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Dashhead;