"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />

        <Field
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/35">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project."
          required
          className="min-h-[160px] w-full resize-none rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-white placeholder:text-white/28 outline-none transition focus:border-[#d6cc6d]/70 focus:bg-white/[0.04]"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[#d6cc6d] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
        >
          Send message
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Field({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="h-13 w-full rounded-[22px] border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-[#d6cc6d]/70 focus:bg-white/[0.04]"
      />
    </div>
  );
}