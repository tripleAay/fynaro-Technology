"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend, FiLink } from "react-icons/fi";

import Header from "@/components/dashboard components/mainheader";
import { useFynaroToast } from "@/components/dashboard components/common/fynaroToast";
import Footer from "@/components/footer";

export default function VIPProjectRequestPage() {
  const { notifyProjectRequestCreated } = useFynaroToast();

  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brief, setBrief] = useState("");
  const [extraLink, setExtraLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    setTimeout(() => {
      notifyProjectRequestCreated({
        projectName: title || "New Fynaro Project Request",
      });
      setSubmitting(false);
      // Optional: reset form after success
      setTitle("");
      setBrandName("");
      setBrief("");
      setExtraLink("");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050506] to-[#111015] text-white flex flex-col">
      <Header />

      <div className="flex flex-col mt-10 justify-center items-center flex-1 px-5 py-20 max-w-2xl mx-auto space-y-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight"
        >
          Ready when you are
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-neutral-400 text-sm sm:text-base max-w-lg"
        >
          Submit your project request. Your proposal will be reviewed before
          details like pricing and scope are shared.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="w-full bg-[#0c0b10] rounded-3xl p-6 flex flex-col gap-4 shadow-[0_18px_55px_rgba(0,0,0,0.75)]"
        >
          <InputField
            label="Project title"
            placeholder="e.g. Rebrand + merch launch"
            value={title}
            onChange={setTitle}
            required
          />

          <InputField
            label="Brand / Company"
            placeholder="Which brand?"
            value={brandName}
            onChange={setBrandName}
          />

          <TextAreaField
            label="Quick project brief"
            placeholder="Goals, audience, must-haves..."
            value={brief}
            onChange={setBrief}
            required
          />

          <InputField
            icon={<FiLink />}
            label="Reference link (optional)"
            placeholder="Figma, Notion, Drive..."
            value={extraLink}
            onChange={setExtraLink}
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.96 }}
            disabled={submitting}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#c8a96a] text-black px-8 py-3 font-semibold text-sm shadow-lg hover:bg-[#d2b86a] disabled:opacity-70 transition-colors"
          >
            {submitting ? (
              <span className="h-3 w-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <>
                Send Request <FiSend />
              </>
            )}
          </motion.button>

          <p className="text-[10px] text-neutral-500 mt-2">
            No pressure. Only when you’re ready.
          </p>
        </motion.form>
      </div>

      <Footer />
    </main>
  );
}

/* ── Reusable Input Field ──────────────────────────────────────────────── */

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  required,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs text-neutral-300 mb-1">{label}</label>
      <div className="flex items-center gap-2 rounded-2xl bg-black/30 border border-neutral-800 px-3 py-2.5">
        {icon && <span className="text-neutral-500">{icon}</span>}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-white text-sm placeholder:text-neutral-500 outline-none"
        />
      </div>
    </div>
  );
}

/* ── Reusable TextArea Field ───────────────────────────────────────────── */

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  required,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-xs text-neutral-300 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        required={required}
        className="w-full rounded-2xl bg-black/30 border border-neutral-800 px-3 py-2.5 text-white text-sm placeholder:text-neutral-500 outline-none resize-none"
      />
    </div>
  );
}