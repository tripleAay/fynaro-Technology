"use client";

import { useEffect, useState } from "react";
import ProductActions from "@/components/admin/products/product-actions";
import ProductGrid from "@/components/admin/products/product-grid";
import type { AppProduct } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
        cache: "no-store",
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch products");
      }

      setProducts(data.products ?? []);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string | number) => {
    const stringId = String(id);
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${stringId}`, {
        method: "DELETE",
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter((product) => String(product.id) !== stringId)
      );
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  };

  const handleToggleHotStuff = async (id: string | number) => {
    const stringId = String(id);
    const current = products.find(
      (product) => String(product.id) === stringId
    );
    if (!current) return;

    const nextValue = !current.isHotStuff;

    try {
      const res = await fetch(`/api/products/${stringId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isHotStuff: nextValue,
        }),
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update product");
      }

      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === stringId
            ? { ...product, isHotStuff: nextValue }
            : product
        )
      );
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Update failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <ProductActions onProductAdded={fetchProducts} />
      <ProductGrid
        products={products}
        onDelete={handleDelete}
        onToggleHotStuff={handleToggleHotStuff}
      />
    </div>
  );
}