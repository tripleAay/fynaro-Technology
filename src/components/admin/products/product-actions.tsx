"use client";

import Link from "next/link";
import { Plus, Upload, Boxes } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Products</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Product Management
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/cp/admin/products/upload"
          className="inline-flex items-center gap-2 rounded-xl bg-[#d6cc6d] px-4 py-3 text-sm font-medium text-slate-900 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Upload className="h-4 w-4" />
          Bulk Upload
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Boxes className="h-4 w-4" />
          Manage Categories
        </button>
      </div>
    </div>
  );
}