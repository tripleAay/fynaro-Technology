"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export type ServiceItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  pricing: string;
  delivery: string;
  status: "Active" | "Draft" | "Paused";
};

type ServiceCardProps = {
  service: ServiceItem;
  onDelete?: (id: string) => void;
};

export default function ServiceCard({
  service,
  onDelete,
}: ServiceCardProps) {
  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Draft: "bg-amber-50 text-amber-700 border-amber-100",
    Paused: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              {service.category}
            </p>
            <h3 className="mt-1 truncate text-lg font-semibold text-slate-900">
              {service.title}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles[service.status]}`}
          >
            {service.status}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Pricing</p>
            <p className="text-base font-semibold text-slate-900">
              {service.pricing}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">Delivery</p>
            <p className="text-base font-semibold text-slate-900">
              {service.delivery}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/cp/admin/services/edit/${service.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete?.(service.id)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}