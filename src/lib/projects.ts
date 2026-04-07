export type ProjectCategory = "Products" | "Branding" | "Web" | "Mobile Apps";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  meta: string;
  year: string;
 cover: string;
  gallery: string[];
  summary: string;
  intro: string;
  challenge: string;
  approach: string;
  outcome: string;
  services: string[];
  featured?: boolean;
  videoUrl?: string;
videoPoster?: string;
galleryCaptions?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "starlight-energy",
    title: "Starlight Energy",
    category: "Branding",
    meta: "Branding / Web",
    year: "2025",
    cover: "/portfolio/starlight-cover.jpg",
    gallery: [
      "/portfolio/starlight-cover.jpg",
      "/portfolio/starlight-2.jpg",
      "/portfolio/starlight-3.jpg",
    ],
    summary:
      "A sharper brand and digital presence built for clarity, confidence, and trust.",
    intro:
      "This project focused on improving how the brand presents itself across digital touchpoints. The goal was not just refinement, but a more structured and credible presence that communicates clearly and holds attention.",
    challenge:
      "The brand needed a more confident and structured digital presence that felt modern, credible, and aligned with growth.",
    approach:
      "We refined the visual direction, simplified the presentation system, and shaped a cleaner digital language across key brand touchpoints.",
    outcome:
      "A stronger, clearer presence that improves trust, strengthens positioning, and gives the brand a more mature public face.",
    services: ["Brand Strategy", "Identity Direction", "Web Direction"],
    featured: true,
  },
  {
    id: 2,
    slug: "farm-produce-marketplace",
    title: "Farm Produce Marketplace",
    category: "Products",
    meta: "Product / Web",
    year: "2025",
    cover: "/portfolio/farm-marketplace-cover.jpg",
    gallery: [
      "/portfolio/farm-marketplace-cover.jpg",
      "/portfolio/farm-marketplace-2.jpg",
      "/portfolio/farm-marketplace-3.jpg",
    ],
    summary:
      "A marketplace concept structured to improve usability and product interaction.",
    intro:
      "The marketplace was designed to make agricultural exchange feel more organized, more trustworthy, and easier to navigate for real users.",
    challenge:
      "The platform needed to feel more usable and organized for marketplace interaction, product discovery, and trust.",
    approach:
      "We focused on information structure, navigation clarity, product visibility, and a cleaner user flow from browsing to action.",
    outcome:
      "A more usable and structured marketplace experience with better clarity for both platform presentation and product interaction.",
    services: ["Product Strategy", "UX Structure", "Web Interface Design"],
  },
  {
    id: 3,
    slug: "operations-dashboard",
    title: "Operations Dashboard",
    category: "Web",
    meta: "Product / Dashboard",
    year: "2025",
    cover: "/portfolio/operations-dashboard-cover.jpg",
    gallery: [
      "/portfolio/operations-dashboard-cover.jpg",
      "/portfolio/operations-dashboard-2.jpg",
      "/portfolio/operations-dashboard-3.jpg",
    ],
    summary:
      "A system designed to manage users, products, and activity with clarity.",
    intro:
      "This dashboard experience was shaped to simplify operational oversight and make dense business information easier to read and act on.",
    challenge:
      "The system needed to manage multiple workflows while still feeling clean, usable, and efficient.",
    approach:
      "We organized the interface around clear hierarchy, modular panels, table usability, and smoother control patterns for admin operations.",
    outcome:
      "A management system that feels more structured, more readable, and easier to use across complex tasks.",
    services: ["Dashboard UX", "System Design", "UI Architecture"],
  },
  {
    id: 4,
    slug: "pay-daddie",
    title: "Pay Daddie",
    category: "Mobile Apps",
    meta: "Mobile App",
    year: "2024",
    cover: "/portfolio/paydaddie-cover.jpg",
    gallery: [
      "/portfolio/paydaddie-cover.jpg",
      "/portfolio/paydaddie-2.jpg",
      "/portfolio/paydaddie-3.jpg",
    ],
    summary:
      "A fintech app experience built around flow, usability, and visual confidence.",
    intro:
      "The mobile experience was designed to feel intuitive, modern, and trustworthy, with smoother task flow around money movement and wallet interaction.",
    challenge:
      "The app needed to feel simple, trustworthy, and easy to use while still carrying a stronger premium presence.",
    approach:
      "We refined user flows, improved wallet and transfer interactions, and built a more consistent visual system for the app experience.",
    outcome:
      "A more confident mobile experience built for trust, ease of use, and stronger product presentation.",
    services: ["Mobile UX", "Fintech Interface Design", "Interaction Design"],
  },
];