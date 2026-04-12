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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No services yet.</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          Start adding services to your catalog
        </h3>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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