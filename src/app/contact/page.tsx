"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import Header from "@/components/dashboard components/homeHeader";


const contactItems = [
  {
    icon: Phone,
    value: "+234 000 000 0000",
  },
  {
    icon: Mail,
    value: "hello@fynaro.com",
  },
  {
    icon: MapPin,
    value: "Ibadan, Nigeria",
  },
];

export default function ContactSection() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#0b0b0c] text-white">
      <Header />

      <main className="relative mt-20 flex flex-1 items-center justify-center px-4 py-6 sm:px-6 md:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-[#d6cc6d]/6 blur-3xl" />
          <div className="absolute bottom-[10%] right-[10%] h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative w-full max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6 md:p-8">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#d6cc6d]">
              Contact
            </p>
            <h1 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
              Start a conversation
            </h1>
          </div>

          <ContactForm />

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d6cc6d]/10 text-[#d6cc6d]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-white/75">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

     
    </div>
  );
}