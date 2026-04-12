"use client";

import { useState } from "react";
import ServiceActions from "@/components/admin/services/service-actions";
import ServiceGrid from "@/components/admin/services/service-grid";
import type { ServiceItem } from "@/components/admin/services/service-card";

const initialServices: ServiceItem[] = [
  {
    id: "1",
    title: "Web Design & Development",
    category: "Development",
    image: "/images/service-1.jpg",
    pricing: "From ₦250,000",
    delivery: "2 - 4 weeks",
    status: "Active",
  },
  {
    id: "2",
    title: "Brand Identity Design",
    category: "Branding",
    image: "/images/service-2.jpg",
    pricing: "From ₦120,000",
    delivery: "1 - 2 weeks",
    status: "Draft",
  },
  {
    id: "3",
    title: "Packaging & Print Design",
    category: "Creative",
    image: "/images/service-3.jpg",
    pricing: "From ₦80,000",
    delivery: "5 - 10 days",
    status: "Paused",
  },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <div className="space-y-6">
      <ServiceActions />
      <ServiceGrid services={services} onDelete={handleDelete} />
    </div>
  );
}