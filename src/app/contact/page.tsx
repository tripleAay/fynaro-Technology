"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/dashboard components/homeHeader";
import ContactForm from "@/components/contact-form";

export default function ContactSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#191716] to-[#0f0f10] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <Header />

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-56 h-80 bg-[#1f1e1d] rounded-2xl flex items-center justify-center text-gray-500 text-sm border border-gray-700">
            Human Figure
          </div>
        </motion.div>

        {/* Form Wrapper */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 bg-[#22201E]/70 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <ContactForm />

          {/* Contact Info */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>+123 456 7890</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-500" />
              <span>hello@fynaro.com</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>Ibadan, Nigeria</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1/3 h-1/3 absolute top-10 left-10 border-l border-t border-green-500/30 rounded-full animate-pulse"></div>
        <div className="w-1/4 h-1/4 absolute bottom-10 right-10 border-r border-b border-green-500/30 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
}