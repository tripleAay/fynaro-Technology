"use client";

import { useEffect, useState } from "react";
import { UploadCloud, X, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AppProduct } from "@/types/product";

const MAX_IMAGES = 4;

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState<AppProduct | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mock: AppProduct = {
      id: params.id,
      name: "Fynaro Premium Hoodie",
      price: "₦65,000",
      category: "Apparel",
      image: "/images/hoodie.jpg",
      images: ["/images/hoodie.jpg"],
      description: "Premium hoodie for bold people.",
      specs: [],
      rating: 5,
      stock: "6 pcs",
      status: "Active",
      isHotStuff: true,
    };

    setForm(mock);
    setPreviewImages(mock.images);
    setLoading(false);
  }, [params.id]);

  if (loading || !form) {
    return <p className="text-sm text-slate-500">Loading product...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev!,
      [name]: checked,
    }));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const limited = files.slice(0, MAX_IMAGES);
    const urls = limited.map((file) => URL.createObjectURL(file));

    setPreviewImages(urls);

    setForm((prev) => ({
      ...prev!,
      image: urls[0],
      images: urls,
    }));
  };

  const removeImage = (index: number) => {
    const updated = [...previewImages];
    updated.splice(index, 1);

    setPreviewImages(updated);

    setForm((prev) => ({
      ...prev!,
      image: updated[0] ?? "",
      images: updated,
    }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UPDATE PRODUCT:", form);
  };

  const handleDelete = () => {
    console.log("DELETE PRODUCT:", form.id);
  };

  return (
    <div className="max-w-3xl space-y-6">

      {/* 🔥 BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/cp/admin" className="hover:text-slate-900">
          Dashboard
        </Link>
        <ChevronRight size={14} />

        <Link href="/cp/admin/products" className="hover:text-slate-900">
          Products
        </Link>
        <ChevronRight size={14} />

        <span className="font-medium text-slate-900">
          Edit Product
        </span>
      </div>

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">Products</p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Edit Product
        </h1>
      </div>

      <form
        onSubmit={handleUpdate}
        className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
      >
        {/* IMAGES */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Product Images
          </label>

          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100">
            <UploadCloud className="h-6 w-6 text-slate-400" />
            <p className="text-sm text-slate-500">Upload images</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImages}
            />
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previewImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="h-28 w-full rounded-xl object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm font-medium">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* PRICE + CATEGORY */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border px-4 py-3"
        />

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option>Active</option>
          <option>Draft</option>
          <option>Out of Stock</option>
        </select>

        {/* HOT STUFF */}
        <label className="flex items-center gap-3 rounded-xl border p-4">
          <input
            type="checkbox"
            name="isHotStuff"
            checked={form.isHotStuff}
            onChange={handleCheckbox}
          />
          Feature in Hot Stuff
        </label>

        {/* ACTIONS */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#d6cc6d] px-6 py-3 font-medium"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}