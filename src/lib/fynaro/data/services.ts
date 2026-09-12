// lib/fynaro/services.ts

import type {
  ProjectService,
} from "@/lib/fynaro/type";

export const serviceMap: Record<
  ProjectService,
  {
    label: string;
    shortLabel: string;
  }
> = {
  "web-development": {
    label: "Web Development",
    shortLabel: "Web",
  },

  "mobile-app": {
    label: "Mobile Apps",
    shortLabel: "Mobile",
  },

  "digital-product": {
    label: "Digital Product",
    shortLabel: "Product",
  },

  "brand-design": {
    label: "Brand Design",
    shortLabel: "Brand",
  },

  "ui-ux-design": {
    label: "UI / UX Design",
    shortLabel: "UI / UX",
  },

  other: {
    label: "Custom Project",
    shortLabel: "Custom",
  },
};

export function getServiceLabel(
  service: ProjectService
) {
  return serviceMap[service].label;
}