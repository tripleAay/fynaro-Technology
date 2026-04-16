"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Plus, Trash2, X } from "lucide-react";

const MAX_GALLERY_IMAGES = 5;

type GalleryItem = {
  id: number;
  file: File | null;
  preview: string;
  isExisting?: boolean;
};

type ProjectPayload = {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  year: string;
  client_name: string;
  services: string[];
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  cover_image: string;
  gallery_images: string[];
  status?: "Published" | "Draft" | "Archived";
  link?: string;
};

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = typeof params?.id === "string" ? params.id : "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const [status, setStatus] = useState<"Published" | "Draft" | "Archived">(
    "Published"
  );
  const [link, setLink] = useState("");

  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [gallery, setGallery] = useState<GalleryItem[]>(
    Array.from({ length: MAX_GALLERY_IMAGES }, (_, index) => ({
      id: index + 1,
      file: null,
      preview: "",
      isExisting: false,
    }))
  );

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`, {
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
          throw new Error(data?.error || "Failed to fetch project");
        }

        const project: ProjectPayload = data.project;

        setTitle(project.title || "");
        setCategory(project.category || "BRANDING / WEB");
        setSubtitle(project.subtitle || "");
        setYear(project.year || "2025");
        setClientName(project.client_name || "");
        setServices(project.services || []);
        setOverview(project.overview || "");
        setChallenge(project.challenge || "");
        setApproach(project.approach || "");
        setOutcome(project.outcome || "");
        setStatus(project.status || "Published");
        setLink(project.link || "");
        setCoverPreview(project.cover_image || "");

        const existingGallery = Array.isArray(project.gallery_images)
          ? project.gallery_images.slice(0, MAX_GALLERY_IMAGES)
          : [];

        const normalizedGallery = Array.from(
          { length: MAX_GALLERY_IMAGES },
          (_, index) => ({
            id: index + 1,
            file: null,
            preview: existingGallery[index] || "",
            isExisting: !!existingGallery[index],
          })
        );

        setGallery(normalizedGallery);
      } catch (error) {
        console.error(error);
        alert(
          error instanceof Error ? error.message : "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    return () => {
      if (coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }

      gallery.forEach((item) => {
        if (item.preview.startsWith("blob:")) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [coverPreview, gallery]);

  const handleCoverChange = (file: File | null) => {
    if (!file) return;

    if (coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (id: number, file: File | null) => {
    if (!file) return;

    setGallery((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.preview.startsWith("blob:")) {
          URL.revokeObjectURL(item.preview);
        }

        return {
          ...item,
          file,
          preview: URL.createObjectURL(file),
          isExisting: false,
        };
      })
    );
  };

  const removeGalleryImage = (id: number) => {
    setGallery((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.preview.startsWith("blob:")) {
          URL.revokeObjectURL(item.preview);
        }

        return {
          ...item,
          file: null,
          preview: "",
          isExisting: false,
        };
      })
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

  const filledGalleryCount = useMemo(() => {
    return gallery.filter((item) => item.preview).length;
  }, [gallery]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!projectId || saving) return;

    if (!title.trim()) {
      alert("Project title is required.");
      return;
    }

    if (!coverPreview) {
      alert("Cover image is required.");
      return;
    }

    if (filledGalleryCount !== MAX_GALLERY_IMAGES) {
      alert("Please keep exactly 5 gallery images.");
      return;
    }

    setSaving(true);

    try {
      const galleryImages = gallery
        .map((item) => item.preview)
        .filter(Boolean)
        .slice(0, MAX_GALLERY_IMAGES);

      const payload = {
        title,
        category,
        subtitle,
        year,
        client_name: clientName,
        services,
        overview,
        challenge,
        approach,
        outcome,
        cover_image: coverPreview,
        gallery_images: galleryImages,
        status,
        link,
      };

      const res = await fetch(`/api/projects/${projectId}`, {
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
        throw new Error(data?.error || "Failed to update project");
      }

      alert("Project updated successfully ✅");
      router.push("/cp/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update project"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId || deleting) return;

    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
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
        throw new Error(data?.error || "Failed to delete project");
      }

      alert("Project deleted successfully");
      router.push("/cp/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete project"
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
            <p className="text-sm text-white/60">Loading project...</p>
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
              href="/cp/admin/projects"
              className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#d6cc6d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Edit Project
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Update the project details and keep exactly 5 gallery images.
            </p>
          </div>

          <button
            form="edit-project-form"
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#d6cc6d] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <form
          id="edit-project-form"
          onSubmit={handleUpdate}
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
                      placeholder="Short project description..."
                      className={`${inputClass} min-h-[100px] resize-none`}
                    />
                  </Field>
                </div>

                <Field label="Status">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as "Published" | "Draft" | "Archived"
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </Field>

                <Field label="Live Link">
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    className={inputClass}
                  />
                </Field>
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
                  Keep exactly 5 gallery images for this project.
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
                          <X className="h-4 w-4" />
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

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/12 px-5 py-3 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Deleting..." : "Delete Project"}
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