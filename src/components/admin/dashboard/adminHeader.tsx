"use client";

export default function AdminHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 sm:px-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8f8440]">
          Fynaro Tech
        </p>
        <h1 className="text-sm font-semibold text-slate-900">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-black/10 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 sm:block">
          Control Panel
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          F
        </div>
      </div>
    </div>
  );
}