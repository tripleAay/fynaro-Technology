"use client";

import ProductCard from "@/components/admin/products/product-card";
import type { AppProduct } from "@/types/product";

type ProductGridProps = {
  products: AppProduct[];
  onDelete?: (id: string | number) => void;
  onToggleHotStuff?: (id: string | number) => void;
};

export default function ProductGrid({
  products,
  onDelete,
  onToggleHotStuff,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No products yet.</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          Start adding products to your catalog
        </h3>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onToggleHotStuff={onToggleHotStuff}
        />
      ))}
    </section>
  );
}