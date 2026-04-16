"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UploadCloud, X, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AppProduct } from "@/types/product";

const MAX_IMAGES = 4;

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const [form, setForm] = useState<AppProduct | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "GET",
          cache: "no-store",
        });

        const text = await res.text();

        let data: any;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Invalid server response: ${text}`);
        }

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch product");
        }

        const product: AppProduct = data.product;

        setForm(product);
        setPreviewImages(
          product.images?.length
            ? product.images
            : product.image
            ? [product.image]
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !form) {
    return <p className="text-sm text-slate-500">Loading product...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev!,
      [name]:
        name === "rating" || name === "reviewsCount"
          ? Number(value)
          : value,
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

    const newUrls = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => {
      const merged = [...prev, ...newUrls].slice(0, MAX_IMAGES);

      setForm((current) => ({
        ...current!,
        image: merged[0] ?? "",
        images: merged,
      }));

      return merged;
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => {
      const updated = [...prev];
      const removed = updated[index];

      if (removed?.startsWith("blob:")) {
        URL.revokeObjectURL(removed);
      }

      updated.splice(index, 1);

      setForm((current) => ({
        ...current!,
        image: updated[0] ?? "",
        images: updated,
      }));

      return updated;
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UPDATE PRODUCT:", form);
  };

  const handleDelete = async () => {
    console.log("DELETE PRODUCT:", form.id);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/cp/admin" className="hover:text-slate-900">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link href="/cp/admin/products" className="hover:text-slate-900">
          Products
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-900">Edit Product</span>
      </div>

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
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Product Images
          </label>

          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100">
            <UploadCloud className="h-6 w-6 text-slate-400" />
            <p className="text-sm text-slate-500">Upload images</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImages}
            />
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previewImages.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                <img
                  src={img}
                  alt={`Preview ${i + 1}`}
                  className="h-28 w-full object-cover"
                />

                {i === 0 && (
                  <div className="absolute left-2 top-2 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-medium text-white">
                    Cover
                  </div>
                )}

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

        <div>
          <label className="text-sm font-medium">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            name="category"
            value={form.category ?? ""}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border px-4 py-3"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            step={0.1}
            value={form.rating}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            type="number"
            name="reviewsCount"
            min={0}
            value={form.reviewsCount ?? 0}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
          <input
            name="stock"
            value={form.stock ?? ""}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          >
            <option>Active</option>
            <option>Draft</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tag</label>
          <input
            name="tag"
            value={form.tag ?? ""}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border px-4 py-3"
          />
        </div>

        <label className="flex items-center gap-3 rounded-xl border p-4">
          <input
            type="checkbox"
            name="isHotStuff"
            checked={!!form.isHotStuff}
            onChange={handleCheckbox}
          />
          Feature in Hot Stuff
        </label>

        <label className="flex items-center gap-3 rounded-xl border p-4">
          <input
            type="checkbox"
            name="isFulfilled"
            checked={!!form.isFulfilled}
            onChange={handleCheckbox}
          />
          Fulfilled by Fynaro
        </label>

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