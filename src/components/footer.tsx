"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-300 pt-16 pb-10 px-6 md:px-10 border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Single Center Block */}
        <div className="max-w-xl w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Fynaro Tech</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Crafting digital experiences where creativity meets precision technology.
          </p>

          {/* Newsletter */}
          <div className="w-full mb-10">
            <p className="text-sm text-gray-500 mb-3">Stay updated with our latest work</p>
            <form className="flex justify-center">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border border-gray-800 rounded-l-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-600/50 transition-colors w-64"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 rounded-r-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="mb-10">
            <h3 className="text-base font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              Navigation
            </h3>
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {["Home", "About", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              Connect
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-3 text-gray-400">
                <Mail size={18} className="text-emerald-500/80" />
                <a
                  href="mailto:hello@fynaro.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  hello@fynaro.com
                </a>
              </div>
              <p className="text-gray-400">Ibadan, Nigeria</p>
            </div>

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
                  className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={22} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-8 border-t border-gray-800/60 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fynaro. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6 text-xs">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}