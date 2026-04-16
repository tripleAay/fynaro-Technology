"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Trash2,
  ChevronRight,
} from "lucide-react";

type ServiceFeature = {
  id: number;
  value: string;
};

type ServiceDeliverable = {
  id: number;
  value: string;
};

export default function UploadServicePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [subtitle, setSubtitle] = useState("");
  const [pricing, setPricing] = useState("From ₦250,000");
  const [delivery, setDelivery] = useState("2 - 4 weeks");
  const [status, setStatus] = useState<"Active" | "Draft" | "Paused">("Active");

  const [description, setDescription] = useState("");
  const [ctaNote, setCtaNote] = useState("");
  const [tag, setTag] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [features, setFeatures] = useState<ServiceFeature[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ]);

  const [deliverables, setDeliverables] = useState<ServiceDeliverable[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFeatureChange = (id: number, value: string) => {
    setFeatures((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addFeature = () => {
    setFeatures((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const removeFeature = (id: number) => {
    setFeatures((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next.length ? next : [{ id: Date.now(), value: "" }];
    });
  };

  const handleDeliverableChange = (id: number, value: string) => {
    setDeliverables((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addDeliverable = () => {
    setDeliverables((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const removeDeliverable = (id: number) => {
    setDeliverables((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next.length ? next : [{ id: Date.now(), value: "" }];
    });
  };

  const resetForm = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setTitle("");
    setCategory("Development");
    setSubtitle("");
    setPricing("From ₦250,000");
    setDelivery("2 - 4 weeks");
    setStatus("Active");
    setDescription("");
    setCtaNote("");
    setTag("");
    setIsFeatured(false);
    setImageFile(null);
    setImagePreview("");
    setFeatures([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
    ]);
    setDeliverables([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!title.trim()) {
      alert("Service title is required.");
      return;
    }

    if (!imageFile) {
      alert("Please upload a service image.");
      return;
    }

    const cleanedFeatures = features
      .map((item) => item.value.trim())
      .filter(Boolean);

    const cleanedDeliverables = deliverables
      .map((item) => item.value.trim())
      .filter(Boolean);

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        category,
        subtitle,
        pricing,
        delivery,
        status,
        description,
        ctaNote,
        tag,
        isFeatured,
        features: cleanedFeatures,
        deliverables: cleanedDeliverables,
      };

      const body = new FormData();
      body.append("service", JSON.stringify(payload));
      body.append("image", imageFile);

      // replace later with your real endpoint
      const res = await fetch("/api/services/upload", {
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
        throw new Error(data?.error || "Service upload failed");
      }

      console.log("Saved service:", data.service);
      alert("Service uploaded successfully ✅");
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

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/cp/admin/services"
              className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#d6cc6d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Upload Service
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Add a complete service entry with pricing, delivery, benefits,
              and clear offer details.
            </p>
          </div>

          <button
            form="upload-service-form"
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#d6cc6d] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>

        <div className="mb-6 flex items-center gap-2 text-sm text-white/45">
          <Link href="/cp/admin" className="hover:text-white">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cp/admin/services" className="hover:text-white">
            Services
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Upload Service</span>
        </div>

        <form
          id="upload-service-form"
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]"
        >
          <div className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Basic Info
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Service Title">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Web Design & Development"
                    className={inputClass}
                  />
                </Field>

                <Field label="Category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Development">Development</option>
                    <option value="Branding">Branding</option>
                    <option value="Creative">Creative</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </Field>

                <Field label="Price Tag">
                  <input
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    placeholder="From ₦250,000"
                    className={inputClass}
                  />
                </Field>

                <Field label="Delivery Timeline">
                  <input
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    placeholder="2 - 4 weeks"
                    className={inputClass}
                  />
                </Field>

                <Field label="Status">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as "Active" | "Draft" | "Paused"
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Paused">Paused</option>
                  </select>
                </Field>

                <Field label="Tag">
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Popular / Premium / New"
                    className={inputClass}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Short Intro">
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="A sharp service summary that explains the value at first glance."
                      className={`${inputClass} min-h-[100px] resize-none`}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Service Description
              </h2>

              <div className="grid gap-4">
                <Field label="Full Description">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the service clearly, who it is for, and why it matters."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </Field>

                <Field label="CTA Note">
                  <textarea
                    value={ctaNote}
                    onChange={(e) => setCtaNote(e.target.value)}
                    placeholder="Ideal for brands that need a premium digital presence with strategy and execution."
                    className={`${inputClass} min-h-[100px] resize-none`}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Key Features
                </h2>

                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3"
                  >
                    <input
                      value={feature.value}
                      onChange={(e) =>
                        handleFeatureChange(feature.id, e.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => removeFeature(feature.id)}
                      className="rounded-xl bg-red-500/12 p-3 text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Deliverables
                </h2>

                <button
                  type="button"
                  onClick={addDeliverable}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Deliverable
                </button>
              </div>

              <div className="space-y-3">
                {deliverables.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <input
                      value={item.value}
                      onChange={(e) =>
                        handleDeliverableChange(item.id, e.target.value)
                      }
                      placeholder={`Deliverable ${index + 1}`}
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => removeDeliverable(item.id)}
                      className="rounded-xl bg-red-500/12 p-3 text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Service Image
              </h2>

              <label className="flex min-h-[260px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-white/15 bg-white/[0.03] transition hover:border-[#d6cc6d]/40">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] ?? null)
                  }
                />

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <ImagePlus className="h-7 w-7 text-white/35" />
                    <p className="text-sm text-white/55">
                      Upload service cover image
                    </p>
                  </div>
                )}
              </label>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Offer Settings
              </h2>

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    Feature this service
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Use this to push the service more prominently across your admin and public pages.
                  </p>
                </div>
              </label>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-3 text-base font-semibold text-white">
                Preview Summary
              </h2>

              <div className="space-y-3 rounded-[18px] border border-white/10 bg-black/20 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-white">{category || "—"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Title
                  </p>
                  <p className="mt-1 text-sm text-white">{title || "—"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Pricing
                    </p>
                    <p className="mt-1 text-sm text-white">{pricing || "—"}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Delivery
                    </p>
                    <p className="mt-1 text-sm text-white">{delivery || "—"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Status
                  </p>
                  <p className="mt-1 text-sm text-white">{status}</p>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6cc6d]/50 focus:bg-white/[0.06]";