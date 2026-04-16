"use client";

import ServiceCard, {
  ServiceItem,
} from "@/components/admin/services/service-card";

type ServiceGridProps = {
  services: ServiceItem[];
  onDelete?: (id: string) => void;
};

export default function ServiceGrid({
  services,
  onDelete,
}: ServiceGridProps) {
  if (!services.length) {
    return (
      <div className="overflow-hidden rounded-[28px] border border-dashed border-black/10 bg-white">
        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.03]">
            <span className="text-xl">+</span>
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
            Service Library
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            No services yet
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Start adding services to build a clearer and stronger offer catalog
            inside your admin workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}