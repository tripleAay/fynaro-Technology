"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Plus, Trash2 } from "lucide-react";

const MAX_GALLERY_IMAGES = 5;

type GalleryItem = {
  id: number;
  file: File | null;
  preview: string;
};

export default function UploadProjectPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("BRANDING / WEB");
  const [subtitle, setSubtitle] = useState("");
  const [year, setYear] = useState("2025");
  const [clientName, setClientName] = useState("");

  const [overview, setOverview] = useState("");
  const [challenge, setChallenge] = useState("");
  const [approach, setApproach] = useState("");
  const [outcome, setOutcome] = useState("");

  const [services, setServices] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState("");

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [gallery, setGallery] = useState<GalleryItem[]>(
    Array.from({ length: MAX_GALLERY_IMAGES }, (_, index) => ({
      id: index + 1,
      file: null,
      preview: "",
    }))
  );

  const handleCoverChange = (file: File | null) => {
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (id: number, file: File | null) => {
    if (!file) return;

    setGallery((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              file,
              preview: URL.createObjectURL(file),
            }
          : item
      )
    );
  };

  const removeGalleryImage = (id: number) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              file: null,
              preview: "",
            }
          : item
      )
    );
  };

  const addService = () => {
    const value = serviceInput.trim();
    if (!value || services.includes(value)) return;
    setServices((prev) => [...prev, value]);
    setServiceInput("");
  };

  const removeService = (service: string) => {
    setServices((prev) => prev.filter((item) => item !== service));
  };

  const resetForm = () => {
    setTitle("");
    setCategory("BRANDING / WEB");
    setSubtitle("");
    setYear("2025");
    setClientName("");
    setOverview("");
    setChallenge("");
    setApproach("");
    setOutcome("");
    setServices([]);
    setServiceInput("");
    setCoverImage(null);
    setCoverPreview("");
    setGallery(
      Array.from({ length: MAX_GALLERY_IMAGES }, (_, index) => ({
        id: index + 1,
        file: null,
        preview: "",
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!coverImage) {
      alert("Please upload a cover image.");
      return;
    }

    const filledGallery = gallery.filter((item) => item.file);
    if (filledGallery.length !== MAX_GALLERY_IMAGES) {
      alert("Please upload exactly 5 gallery images.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        category,
        subtitle,
        year,
        clientName,
        services,
        overview,
        challenge,
        approach,
        outcome,
      };

      const body = new FormData();
      body.append("project", JSON.stringify(payload));
      body.append("coverImage", coverImage);

      filledGallery.forEach((item) => {
        if (item.file) body.append("galleryImages", item.file);
      });

      const res = await fetch("/api/projects/upload", {
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
        throw new Error(data?.error || "Project upload failed");
      }

      console.log("Saved project:", data.project);
      alert("Project uploaded successfully ✅");
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
              href="/cp/admin/projects"
              className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#d6cc6d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Upload Project
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Fill the project details and upload exactly 5 gallery images.
            </p>
          </div>

          <button
            form="upload-project-form"
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#d6cc6d] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>

        <form
          id="upload-project-form"
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]"
        >
          <div className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Basic Info
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Project Title">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Starlight Energy"
                    className={inputClass}
                  />
                </Field>

                <Field label="Category">
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="BRANDING / WEB"
                    className={inputClass}
                  />
                </Field>

                <Field label="Year">
                  <input
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2025"
                    className={inputClass}
                  />
                </Field>

                <Field label="Client Name">
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Starlight Energy"
                    className={inputClass}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Short Intro">
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="A sharper brand and digital presence built for clarity, confidence, and trust."
                      className={`${inputClass} min-h-[100px] resize-none`}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Services
              </h2>

              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d6cc6d]/20 bg-[#d6cc6d]/10 px-3 py-1.5 text-xs text-[#efe4a8]"
                  >
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="text-white/60 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="Add service"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Project Story
              </h2>

              <div className="grid gap-4">
                <Field label="Overview">
                  <textarea
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                </Field>

                <Field label="Challenge">
                  <textarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                </Field>

                <Field label="Approach">
                  <textarea
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                </Field>

                <Field label="Outcome">
                  <textarea
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                </Field>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-4 text-base font-semibold text-white">
                Cover Image
              </h2>

              <label className="flex min-h-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-white/15 bg-white/[0.03] transition hover:border-[#d6cc6d]/40">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleCoverChange(e.target.files?.[0] ?? null)
                  }
                />

                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <ImagePlus className="h-7 w-7 text-white/35" />
                    <p className="text-sm text-white/55">Upload cover image</p>
                  </div>
                )}
              </label>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-white">
                  Project Gallery
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Upload exactly 5 gallery images for this project.
                </p>
              </div>

              <div className="grid gap-3">
                {gallery.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-[18px] border border-white/10 bg-black/20 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs text-white/55">
                        Image {index + 1} of {MAX_GALLERY_IMAGES}
                      </p>

                      {item.preview && (
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(item.id)}
                          className="text-white/35 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <label className="flex min-h-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border border-dashed border-white/15 bg-white/[0.03] transition hover:border-[#d6cc6d]/40">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleGalleryChange(
                            item.id,
                            e.target.files?.[0] ?? null
                          )
                        }
                      />

                      {item.preview ? (
                        <img
                          src={item.preview}
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlus className="h-6 w-6 text-white/30" />
                      )}
                    </label>
                  </div>
                ))}
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