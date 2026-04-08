export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: string;
  client: string;
  year: string;
  status: "Draft" | "Published" | "Featured";
  summary: string;
  cover: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  availability: "Available" | "Limited" | "Sold Out";
  status: "Draft" | "Published";
  image: string;
  summary: string;
};

export type Service = {
  id: string;
  title: string;
  category: string;
  priceFrom: string;
  timeline: string;
  status: "Active" | "Draft";
  updatedAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  date: string;
  status: "New" | "Read" | "Replied" | "Archived";
  message: string;
};

export type MediaItem = {
  id: string;
  name: string;
  type: "Image" | "Video" | "Document";
  url: string;
  usedIn: string;
  date: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Starlight Marketplace",
    slug: "starlight-marketplace",
    category: "Web Development",
    type: "Web App",
    client: "Starlight Energy",
    year: "2026",
    status: "Featured",
    summary: "A marketplace and agritech platform built for structured commerce and product visibility.",
    cover: "/images/project-1.jpg",
  },
  {
    id: "2",
    title: "Fynaro Identity System",
    slug: "fynaro-identity-system",
    category: "Branding",
    type: "Identity",
    client: "Fynaro",
    year: "2026",
    status: "Published",
    summary: "A premium visual identity system focused on clarity, confidence, and luxury restraint.",
    cover: "/images/project-2.jpg",
  },
  {
    id: "3",
    title: "Pay Daddie UI Concept",
    slug: "pay-daddie-ui-concept",
    category: "Product Design",
    type: "Mobile App",
    client: "Internal",
    year: "2025",
    status: "Draft",
    summary: "A sleek fintech interface built around trust, movement, and clean dashboard composition.",
    cover: "/images/project-3.jpg",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Landing Page Pack",
    slug: "premium-landing-page-pack",
    category: "Website Template",
    price: "₦85,000",
    availability: "Available",
    status: "Published",
    image: "/images/product-1.jpg",
    summary: "A polished conversion-focused landing page starter pack for modern brands.",
  },
  {
    id: "2",
    name: "Brand Identity Starter Kit",
    slug: "brand-identity-starter-kit",
    category: "Branding Kit",
    price: "₦120,000",
    availability: "Limited",
    status: "Draft",
    image: "/images/product-2.jpg",
    summary: "A clean starter brand system with logo direction, palette, and typography guide.",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Website Design",
    category: "Web",
    priceFrom: "From ₦250,000",
    timeline: "2 - 4 weeks",
    status: "Active",
    updatedAt: "Apr 7, 2026",
  },
  {
    id: "2",
    title: "Brand Identity",
    category: "Branding",
    priceFrom: "From ₦180,000",
    timeline: "1 - 3 weeks",
    status: "Active",
    updatedAt: "Apr 5, 2026",
  },
  {
    id: "3",
    title: "UI/UX Design",
    category: "Product Design",
    priceFrom: "From ₦220,000",
    timeline: "2 - 5 weeks",
    status: "Draft",
    updatedAt: "Apr 2, 2026",
  },
];

export const messages: Message[] = [
  {
    id: "1",
    name: "David Okeke",
    email: "david@example.com",
    service: "Website Design",
    budget: "₦300k - ₦500k",
    date: "Apr 7, 2026",
    status: "New",
    message:
      "Hello, I want a premium website for my company. I need something modern, clean, and serious. Kindly share your process and timeline.",
  },
  {
    id: "2",
    name: "Amaka Ibe",
    email: "amaka@example.com",
    service: "Brand Identity",
    budget: "₦150k - ₦250k",
    date: "Apr 6, 2026",
    status: "Read",
    message:
      "I need branding for a new business. I want it to feel premium and international.",
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "project-cover-hero.jpg",
    type: "Image",
    url: "/images/project-1.jpg",
    usedIn: "Starlight Marketplace",
    date: "Apr 7, 2026",
  },
  {
    id: "2",
    name: "brand-preview.mp4",
    type: "Video",
    url: "/videos/brand-preview.mp4",
    usedIn: "Fynaro Identity System",
    date: "Apr 6, 2026",
  },
];