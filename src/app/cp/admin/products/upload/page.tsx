"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, UploadCloud, X, Plus, Trash2 } from "lucide-react";
import type { AppProduct, ProductSpec } from "@/types/product";

const MAX_IMAGES = 4;

const INITIAL_FORM: AppProduct = {
  id: "",
  name: "",
  price: "",
  category: "",
  image: "",
  images: [],
  description: "",
  specs: [{ label: "", value: "" }],
  rating: 5,
  reviewsCount: 0,
  isFulfilled: true,
  tag: "",
  stock: "",
  status: "Active",
  isHotStuff: false,
};

export default function UploadProductPage() {
  const [form, setForm] = useState<AppProduct>(INITIAL_FORM);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const resetForm = () => {
    previewImages.forEach((url) => URL.revokeObjectURL(url));
    setPreviewImages([]);
    setSelectedFiles([]);
    setForm(INITIAL_FORM);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "rating" || name === "reviewsCount"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remainingSlots = MAX_IMAGES - previewImages.length;
    if (remainingSlots <= 0) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    const urls = limitedFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => {
      const next = [...prev, ...urls];

      setForm((current) => ({
        ...current,
        image: next[0] ?? "",
        images: next,
      }));

      return next;
    });

    setSelectedFiles((prev) => [...prev, ...limitedFiles]);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => {
      const next = [...prev];
      const removed = next[index];

      if (removed) URL.revokeObjectURL(removed);
      next.splice(index, 1);

      setSelectedFiles((current) => current.filter((_, i) => i !== index));

      setForm((current) => ({
        ...current,
        image: next[0] ?? "",
        images: next,
      }));

      return next;
    });
  };

  const handleSpecChange = (
    index: number,
    key: keyof ProductSpec,
    value: string
  ) => {
    setForm((prev) => {
      const nextSpecs = [...prev.specs];
      nextSpecs[index] = {
        ...nextSpecs[index],
        [key]: value,
      };

      return {
        ...prev,
        specs: nextSpecs,
      };
    });
  };

  const addSpec = () => {
    setForm((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: "", value: "" }],
    }));
  };

  const removeSpec = (index: number) => {
    setForm((prev) => {
      const nextSpecs = prev.specs.filter((_, i) => i !== index);

      return {
        ...prev,
        specs: nextSpecs.length ? nextSpecs : [{ label: "", value: "" }],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const cleanedSpecs = form.specs.filter(
        (spec) => spec.label.trim() !== "" && spec.value.trim() !== ""
      );

      const productId = crypto.randomUUID();

      const payload: AppProduct = {
        ...form,
        id: productId,
        image: "",
        images: [],
        specs: cleanedSpecs,
      };

      const body = new FormData();
      body.append("product", JSON.stringify(payload));

      selectedFiles.forEach((file) => {
        body.append("images", file);
      });

      const res = await fetch("/api/products/upload", {
        method: "POST",
        body,
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Non-JSON response: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      console.log("Saved product:", data.product);
      alert("Product uploaded successfully ✅");

      resetForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.error(message);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TAG_OPTIONS = [
    "🔥 Trending",
    "✨ Bestseller",
    "💎 Collector’s Pick",
    "🚀 New Arrival",
    "🖤 Limited Edition",
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/cp/admin" className="hover:text-slate-900">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link href="/cp/admin/products" className="hover:text-slate-900">
          Products
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-900">Upload Product</span>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">Products</p>
        <h1 className="mt-1 text-3xl font-semibold text-slate-900">
          Upload New Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
      >
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Product Images
            </label>
            <p className="mt-1 text-xs text-slate-500">
              Upload up to 4 images. The first image will be used as the main
              product cover.
            </p>
          </div>

          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100">
            <UploadCloud className="h-6 w-6 text-slate-400" />
            <p className="mt-2 text-sm text-slate-500">
              Click to upload up to 4 images
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImages}
            />
          </label>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {previewImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  <img
                    src={src}
                    alt={`Product preview ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />

                  {index === 0 && (
                    <div className="absolute left-2 top-2 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-medium text-white">
                      Cover
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Product Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₦25,000"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              name="category"
              value={form.category ?? ""}
              onChange={handleChange}
              placeholder="Packaging / Print / Merch"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the product..."
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Stock</label>
            <input
              name="stock"
              value={form.stock ?? ""}
              onChange={handleChange}
              placeholder="12 pcs"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              name="status"
              value={form.status ?? "Active"}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Rating</label>
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              step={0.1}
              value={form.rating}
              onChange={handleChange}
              placeholder="4.8"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Reviews Count
            </label>
            <input
              type="number"
              name="reviewsCount"
              min={0}
              value={form.reviewsCount ?? 0}
              onChange={handleChange}
              placeholder="89"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Product Tag
          </label>

          <div className="mt-3 flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => {
              const isActive = form.tag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      tag,
                    }))
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#d6cc6d] text-slate-900"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <input
            name="tag"
            value={form.tag ?? ""}
            onChange={handleChange}
            placeholder="Or type custom tag..."
            className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Product Specs
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add the details you want shown in the product modal.
              </p>
            </div>

            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Plus size={16} />
              Add Spec
            </button>
          </div>

          <div className="space-y-3">
            {form.specs.map((spec, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <input
                  value={spec.label}
                  onChange={(e) =>
                    handleSpecChange(index, "label", e.target.value)
                  }
                  placeholder="Spec label e.g. Material"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
                />

                <input
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  placeholder="Spec value e.g. Fleece Cotton"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#d6cc6d]"
                />

                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="inline-flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-red-600 hover:bg-red-100"
                  aria-label={`Remove spec ${index + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="isHotStuff"
                checked={form.isHotStuff}
                onChange={handleCheckbox}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8f8440] focus:ring-[#d6cc6d]"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Feature in Hot Stuff
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Make this product appear in your Hot Stuff section.
                </p>
              </div>
            </label>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="isFulfilled"
                checked={form.isFulfilled ?? true}
                onChange={handleCheckbox}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8f8440] focus:ring-[#d6cc6d]"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Fulfilled by Fynaro
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Use this if fulfillment is handled directly by your brand.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#d6cc6d] px-6 py-3 text-sm font-medium text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload Product"}
          </button>
        </div>
      </form>
    </div>
  );
}