"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

type DbService = {
  id: string;
  title: string | null;
  category: string | null;
  subtitle: string | null;
  pricing: string | null;
  delivery: string | null;
  status: "Active" | "Draft" | "Paused" | null;
  description: string | null;
  cta_note: string | null;
  tag: string | null;
  is_featured: boolean | null;
  image: string | null;
  features: string[] | null;
  deliverables: string[] | null;
};

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const serviceId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
  ]);

  const [deliverables, setDeliverables] = useState<ServiceDeliverable[]>([
    { id: 1, value: "" },
  ]);

  useEffect(() => {
    if (!serviceId) return;

    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`, {
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
          throw new Error(data?.error || "Failed to fetch service");
        }

        const service: DbService = data.service;

        setTitle(service.title || "");
        setCategory(service.category || "Development");
        setSubtitle(service.subtitle || "");
        setPricing(service.pricing || "From ₦250,000");
        setDelivery(service.delivery || "2 - 4 weeks");
        setStatus(service.status || "Active");
        setDescription(service.description || "");
        setCtaNote(service.cta_note || "");
        setTag(service.tag || "");
        setIsFeatured(!!service.is_featured);
        setImagePreview(service.image || "");

        const normalizedFeatures =
          service.features?.length
            ? service.features.map((value, index) => ({
                id: index + 1,
                value,
              }))
            : [{ id: 1, value: "" }];

        const normalizedDeliverables =
          service.deliverables?.length
            ? service.deliverables.map((value, index) => ({
                id: index + 1,
                value,
              }))
            : [{ id: 1, value: "" }];

        setFeatures(normalizedFeatures);
        setDeliverables(normalizedDeliverables);
      } catch (error) {
        console.error(error);
        alert(
          error instanceof Error ? error.message : "Failed to fetch service"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || saving) return;

    if (!title.trim()) {
      alert("Service title is required.");
      return;
    }

    if (!imagePreview) {
      alert("Please keep or upload a service image.");
      return;
    }

    const cleanedFeatures = features
      .map((item) => item.value.trim())
      .filter(Boolean);

    const cleanedDeliverables = deliverables
      .map((item) => item.value.trim())
      .filter(Boolean);

    setSaving(true);

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
        image: imagePreview,
        features: cleanedFeatures,
        deliverables: cleanedDeliverables,
      };

      const res = await fetch(`/api/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid server response: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update service");
      }

      alert("Service updated successfully ✅");
      router.push("/cp/admin/services");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update service"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceId || deleting) return;

    const confirmed = window.confirm("Delete this service?");
    if (!confirmed) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid server response: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete service");
      }

      alert("Service deleted successfully");
      router.push("/cp/admin/services");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete service"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm text-white/60">Loading service...</p>
          </div>
        </div>
      </div>
    );
  }

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
              Edit Service
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Update your service details, pricing, delivery timeline, and offer structure.
            </p>
          </div>

          <button
            form="edit-service-form"
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#d6cc6d] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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
          <span className="text-white">Edit Service</span>
        </div>

        <form
          id="edit-service-form"
          onSubmit={handleUpdate}
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
                      setStatus(e.target.value as "Active" | "Draft" | "Paused")
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
                    Push the service more prominently across your pages.
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

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/12 px-5 py-3 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Deleting..." : "Delete Service"}
            </button>
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