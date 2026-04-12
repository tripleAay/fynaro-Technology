"use client";

import Link from "next/link";
import { Plus, Upload, BriefcaseBusiness } from "lucide-react";

export default function ServiceActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Services</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Service Management
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/cp/admin/services/upload"
          className="inline-flex items-center gap-2 rounded-xl bg-[#d6cc6d] px-4 py-3 text-sm font-medium text-slate-900 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Upload className="h-4 w-4" />
          Upload Assets
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Manage Offers
        </button>
      </div>
    </div>
  );
}