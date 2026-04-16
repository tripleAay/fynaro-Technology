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
    Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Draft: "border-amber-200 bg-amber-50 text-amber-700",
    Paused: "border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <article className="group overflow-hidden rounded-[26px] border border-black/6 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyles[service.status]}`}
          >
            {service.status}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {service.category}
          </p>

          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-slate-900">
            {service.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-[20px] bg-slate-50 p-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Pricing
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {service.pricing}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Delivery
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {service.delivery}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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