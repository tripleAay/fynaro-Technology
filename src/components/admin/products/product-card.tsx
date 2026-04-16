"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Flame } from "lucide-react";
import { AppProduct } from "@/types/product";

type ProductCardProps = {
  product: AppProduct;
  onDelete?: (id: string | number) => void;
  onToggleHotStuff?: (id: string | number) => void;
};

export default function ProductCard({
  product,
  onDelete,
  onToggleHotStuff,
}: ProductCardProps) {
  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Draft: "bg-amber-50 text-amber-700 border-amber-100",
    "Out of Stock": "bg-rose-50 text-rose-700 border-rose-100",
  };

  const gallery =
    product.images?.length > 0
      ? product.images.slice(0, 4)
      : product.image
      ? [product.image]
      : [];

  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative bg-slate-100 p-3">
        <div className="grid grid-cols-2 gap-2">
          {gallery.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative aspect-square overflow-hidden rounded-xl bg-slate-200"
            >
              <Image
                src={img}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {product.isHotStuff && (
          <div className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white">
            <Flame className="h-3 w-3 text-orange-400" />
            Hot Stuff
          </div>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              {product.category}
            </p>
            <h3 className="mt-1 truncate text-lg font-semibold text-slate-900">
              {product.name}
            </h3>
          </div>

          {product.status && (
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                statusStyles[
                  product.status as "Active" | "Draft" | "Out of Stock"
                ]
              }`}
            >
              {product.status}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Price</p>
            <p className="text-base font-semibold text-slate-900">
              {product.price}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">Stock</p>
            <p className="text-base font-semibold text-slate-900">
              {product.stock}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleHotStuff?.(product.id)}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
            product.isHotStuff
              ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Flame className="h-4 w-4" />
          {product.isHotStuff ? "Remove from Hot Stuff" : "Add to Hot Stuff"}
        </button>

        <div className="flex items-center gap-3 pt-1">
          <Link
            href={`/cp/admin/products/edit/${product.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete?.(product.id)}
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