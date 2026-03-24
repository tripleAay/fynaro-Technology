"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#000000] text-gray-300 pt-16 pb-10 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Center Block */}
        <div className="max-w-xl w-full flex flex-col items-center">
          
          {/* 🔥 BRAND */}
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Fynaro <span className="text-[#d6cc6d]">Tech</span>
          </h2>

          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Crafting digital experiences where creativity meets precision technology.
          </p>

          {/* 🔥 Newsletter */}
          <div className="w-full mb-10">
            <p className="text-sm text-gray-500 mb-3">
              Stay updated with our latest work
            </p>

            <form className="flex justify-center">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#0f0f10] border border-white/10 rounded-l-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-[#d6cc6d]/60 transition-all w-64"
              />

              <button
                type="submit"
                className="bg-[#d6cc6d] hover:bg-[#cbbf5f] text-black px-5 rounded-r-lg transition-all flex items-center gap-2 text-sm font-medium"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* 🔥 Navigation */}
          <div className="mb-10">
            <h3 className="text-xs font-semibold text-white/70 mb-4 uppercase tracking-[0.18em]">
              Navigation
            </h3>

            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {["Home", "About", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#d6cc6d] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔥 Contact */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-white/70 mb-4 uppercase tracking-[0.18em]">
              Connect
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-3 text-gray-400">
                <Mail size={18} className="text-[#d6cc6d]" />
                <a
                  href="mailto:hello@fynaro.com"
                  className="hover:text-[#d6cc6d] transition-colors"
                >
                  hello@fynaro.com
                </a>
              </div>

              <p className="text-gray-500">Ibadan, Nigeria</p>
            </div>

            {/* 🔥 Socials */}
            <div className="mt-6 flex justify-center items-center gap-5">
              {[
                { icon: Facebook, href: "https://facebook.com/fynaro" },
                { icon: Instagram, href: "https://instagram.com/fynaro" },
                { icon: Twitter, href: "https://twitter.com/fynaro" },
                { icon: Linkedin, href: "https://linkedin.com/company/fynaro" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#d6cc6d] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={22} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fynaro. All rights reserved.</p>

        <div className="mt-2 flex justify-center gap-6 text-xs">
          <Link href="/privacy" className="hover:text-[#d6cc6d] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#d6cc6d] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}