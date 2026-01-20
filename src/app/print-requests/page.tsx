"use client";

import { motion } from "framer-motion";
import {
  FileText,
  PlusCircle,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const requests = [
  {
    id: "PR-001",
    title: "Business Card Design",
    status: "Processing",
    date: "Jan 14, 2025",
    description: "Premium matte finishing with gold foil.",
  },
  {
    id: "PR-002",
    title: "T-Shirt Branding (Bulk)",
    status: "Completed",
    date: "Jan 11, 2025",
    description: "Fynaro black tees with white logo print.",
  },
  {
    id: "PR-003",
    title: "Logo Vectorization",
    status: "Pending",
    date: "Jan 10, 2025",
    description: "Customer uploaded low-res PNG.",
  },
];

export default function PrintRequestsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#050505] text-white px-4 sm:px-6 lg:px-10">
      {/* Top: header + back button */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Print Requests
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Manage all your print jobs — branding, merch, apparel & more.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-white text-xs sm:text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
      </div>

      {/* CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="bg-gradient-to-br from-[#111] to-[#000] border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium">
              Submit a New Print Request
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-sm">
              Apparel, packaging, card prints, bulk merch — upload your files &
              let Fynaro handle production.
            </p>
          </div>

          <Link
            href="/print-requests/new"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-200 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Request
          </Link>
        </div>
      </motion.div>

      {/* Requests List */}
      <div className="max-w-6xl mx-auto space-y-4">
        {requests.map((req, idx) => {
          const statusColor =
            req.status === "Completed"
              ? "text-emerald-400"
              : req.status === "Processing"
              ? "text-yellow-400"
              : "text-neutral-300";

          const statusIcon =
            req.status === "Completed" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : req.status === "Processing" ? (
              <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
            ) : (
              <Clock className="w-4 h-4 text-neutral-400" />
            );

          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0A0A0A] p-5 sm:p-6 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-neutral-300" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                      {req.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
                      {req.description}
                    </p>

                    <p className="mt-2 text-[11px] sm:text-xs text-neutral-500">
                      {req.date}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1 text-[11px] sm:text-xs">
                  {statusIcon}
                  <span className={`${statusColor}`}>{req.status}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto mt-10 text-center text-[11px] sm:text-xs text-neutral-500">
        Uploads, revisions and print approvals will appear here in real-time.
      </div>
    </main>
  );
}
