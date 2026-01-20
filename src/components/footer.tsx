"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-300 py-14 px-6 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Fynaro</h2>
          <p className="mt-3 text-gray-400 max-w-xs">
            Crafting digital experiences where creativity meets technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-center gap-2">
              <Mail size={16} /> 
              <a
                href="mailto:hello@fynaro.com"
                className="hover:text-white transition-colors"
              >
                hello@fynaro.com
              </a>
            </li>
            <li>Ibadan, Nigeria</li>
          </ul>

          <div className="flex items-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white transition-transform hover:scale-110"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white transition-transform hover:scale-110"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition-transform hover:scale-110"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-white transition-transform hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fynaro. All rights reserved.</p>
      </div>
    </footer>
  );
}
