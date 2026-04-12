"use client";

import { useState } from "react";
import ProductActions from "@/components/admin/products/product-actions";
import ProductGrid from "@/components/admin/products/product-grid";
import type { AppProduct } from "@/types/product";

const initialProducts: AppProduct[] = [
  {
    id: "1",
    name: "Fynaro Limited Edition Hoodie",
    price: "₦65,000.00",
    category: "Merch",
    image: "/images/hoodie.jpg",
    images: ["/images/hoodie.jpg", "/images/hoodie-alt.png"],
    description: "A rare drop featuring smooth fleece cotton.",
    specs: [],
    stock: "12 pcs",
    status: "Active",
    rating: 5,
    tag: "🔥 Trending",
    isHotStuff: true,
  },
  {
    id: "2",
    name: "Fynaro Premium Tote Bag",
    price: "₦25,000.00",
    category: "Accessories",
    image: "/images/coolTee_shirt.jpg",
    images: ["/images/coolTee_shirt.jpg"],
    description: "A minimalist tote made from eco-friendly canvas.",
    specs: [],
    stock: "30 pcs",
    status: "Draft",
    rating: 4,
    tag: "✨ Bestseller",
    isHotStuff: false,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AppProduct[]>(initialProducts);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleToggleHotStuff = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isHotStuff: !product.isHotStuff }
          : product
      )
    );
  };

  return (
    <div className="space-y-6">
      <ProductActions />
      <ProductGrid
        products={products}
        onDelete={handleDelete}
        onToggleHotStuff={handleToggleHotStuff}
      />
    </div>
  );
}