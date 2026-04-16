"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ServiceActions from "@/components/admin/services/service-actions";
import ServiceGrid from "@/components/admin/services/service-grid";
import type { ServiceItem } from "@/components/admin/services/service-card";

type DbService = {
  id: string;
  title: string | null;
  category: string | null;
  image: string | null;
  pricing: string | null;
  delivery: string | null;
  status: "Active" | "Draft" | "Paused" | null;
  created_at?: string | null;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services", {
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
        throw new Error(data?.error || "Failed to fetch services");
      }

      const mappedServices: ServiceItem[] = (data.services ?? []).map(
        (service: DbService) => ({
          id: service.id,
          title: service.title || "Untitled Service",
          category: service.category || "Service",
          image: service.image || "/images/placeholder-service.jpg",
          pricing: service.pricing || "Custom Pricing",
          delivery: service.delivery || "Timeline on request",
          status: service.status ?? "Active",
        })
      );

      setServices(mappedServices);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this service?");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/services/${id}`, {
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
        throw new Error(data?.error || "Failed to delete service");
      }

      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return services;

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.pricing.toLowerCase().includes(query) ||
        service.delivery.toLowerCase().includes(query) ||
        service.status.toLowerCase().includes(query)
      );
    });
  }, [services, search]);

  if (loading) {
    return (
      <div className="space-y-6">
        <ServiceActions />
        <div className="rounded-[28px] border border-black/5 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ServiceActions />

      <section className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Services</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Service Library
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View, search, edit, and delete uploaded services.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300"
              />
            </label>
          </div>
        </div>
      </section>

      <ServiceGrid
        services={filteredServices}
        onDelete={handleDelete}
      />
    </div>
  );
}