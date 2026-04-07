"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MoveRight,
  Layers3,
  Globe,
  Smartphone,
  Palette,
} from "lucide-react";
import Header from "@/components/dashboard components/homeHeader";
import ProjectsHero from "@/components/ProjectsHero";
import ProjectsIntro from "@/components/projects-intro";
import ProjectsGrid from "@/components/project/project-grid";
import ProjectsPhilosophy from "@/components/ProjectsPhilosophy";
import WhoItsFor from "@/components/WhoItsFor";
import ProjectFinalCTA from "@/components/projectsFinalCTA";
import Footer from "@/components/footer";

type ProjectCategory = "All" | "Products" | "Branding" | "Web" | "Mobile Apps";

type Project = {
  id: number;
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
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
};

const filters: ProjectCategory[] = [
  "All",
  "Products",
  "Branding",
  "Web",
  "Mobile Apps",
];

const projects: Project[] = [
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
  {
    id: 5,
    slug: "fynaro-identity-direction",
    title: "Fynaro Identity Direction",
    category: "Branding",
    meta: "Branding",
    year: "2026",
    cover: "/portfolio/fynaro-brand-cover.jpg",
    gallery: [
      "/portfolio/fynaro-brand-cover.jpg",
      "/portfolio/fynaro-brand-2.jpg",
      "/portfolio/fynaro-brand-3.jpg",
    ],
    summary:
      "A brand system shaped to reflect premium execution and strong positioning.",
    intro:
      "This identity direction established a cleaner, sharper, and more intentional foundation for how the brand presents itself across digital and visual environments.",
    challenge:
      "The brand needed stronger positioning and a more refined visual tone that felt premium without becoming loud.",
    approach:
      "We focused on visual restraint, typography discipline, stronger hierarchy, and a more mature brand rhythm across touchpoints.",
    outcome:
      "A clearer and more intentional brand presence designed to support credibility, distinction, and long-term growth.",
    services: ["Brand Direction", "Identity Design", "Creative System"],
  },
  {
    id: 6,
    slug: "fynaro-tech-website",
    title: "Fynaro Tech Website",
    category: "Web",
    meta: "Web",
    year: "2026",
    cover: "/portfolio/fynaro-site-cover.jpg",
    gallery: [
      "/portfolio/fynaro-site-cover.jpg",
      "/portfolio/fynaro-site-2.jpg",
      "/portfolio/fynaro-site-3.jpg",
    ],
    summary:
      "A digital presence designed to communicate capability and build trust.",
    intro:
      "The website was built to feel more like a product studio than a generic services page, with clearer positioning and stronger visual confidence.",
    challenge:
      "The site needed to communicate products, branding, web, and mobile capability with greater clarity and authority.",
    approach:
      "We structured the experience around intentional section flow, stronger hierarchy, richer project storytelling, and a cleaner premium interface.",
    outcome:
      "A more mature digital presence that presents the business with greater confidence and conversion potential.",
    services: ["Web Strategy", "UI Design", "Front-end Build"],
  },
];

function categoryIcon(category: ProjectCategory) {
  switch (category) {
    case "Products":
      return <Layers3 size={16} />;
    case "Branding":
      return <Palette size={16} />;
    case "Web":
      return <Globe size={16} />;
    case "Mobile Apps":
      return <Smartphone size={16} />;
    default:
      return <Layers3 size={16} />;
  }
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const caseStudyProjects = projects.slice(0, 3);

  return (
    <>
      <main className="overflow-hidden bg-black text-white">
        <Header />

        {/* HERO */}
        <ProjectsHero />
        <ProjectsIntro
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* FILTER STRIP */}


        {/* FEATURED PROJECT */}
        <section className="border-t border-white/8 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-center justify-between gap-6">
              <div>
                <p className="mb-4 text-[11px] tracking-[0.35em] text-white/35">
                  FEATURED PROJECT
                </p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Work with weight.
                </h2>
              </div>
            </div>

            <div className="grid gap-8 overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] p-4 md:grid-cols-12 md:p-5">
              <div className="relative min-h-[320px] overflow-hidden rounded-[24px] md:col-span-7 md:min-h-[560px]">
                <Image
                  src={featuredProject.cover}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              <div className="flex flex-col justify-between rounded-[24px] border border-white/8 bg-black/30 p-6 md:col-span-5 md:p-8">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#d6cc6d]/30 bg-[#d6cc6d]/10 px-3 py-1 text-[11px] tracking-[0.25em] text-[#d6cc6d]">
                      {featuredProject.meta.toUpperCase()}
                    </span>
                    <span className="text-sm text-white/38">
                      {featuredProject.year}
                    </span>
                  </div>

                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-5 text-lg leading-8 text-white/78">
                    {featuredProject.summary}
                  </p>

                  <p className="mt-6 text-sm leading-7 text-white/55 md:text-base">
                    {featuredProject.intro}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {featuredProject.services.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/62"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#d6cc6d] transition hover:gap-3"
                >
                  View Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT GRID */}
        <ProjectsGrid
          activeFilter={activeFilter}
          filteredProjects={filteredProjects}
        />

        {/* CASE STUDIES */}
        <section className="border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[11px] tracking-[0.35em] text-white/35">
                INSIDE THE WORK
              </p>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                A closer look at the thinking behind selected projects.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/60 md:text-lg">
                Beyond visuals, each project carries decisions around structure,
                usability, and communication.
              </p>
            </div>

            <div className="space-y-20">
              {caseStudyProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="grid gap-10 border-t border-white/8 pt-14 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-14"
                >
                  <div className="md:col-span-5">
                    <p className="mb-4 text-[11px] tracking-[0.35em] text-white/35">
                      0{index + 1}
                    </p>
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-8 text-[#d6cc6d]">
                      {project.summary}
                    </p>

                    <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[24px] border border-white/8">
                      <Image
                        src={project.gallery[1] || project.cover}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-5">
                        <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                          CHALLENGE
                        </p>
                        <p className="text-sm leading-7 text-white/68">
                          {project.challenge}
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-5">
                        <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                          APPROACH
                        </p>
                        <p className="text-sm leading-7 text-white/68">
                          {project.approach}
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-[#d6cc6d]/20 bg-[#d6cc6d]/[0.06] p-5">
                        <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                          OUTCOME
                        </p>
                        <p className="text-sm leading-7 text-white">
                          {project.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {(project.gallery.slice(1, 3) || []).map((image, idx) => (
                        <div
                          key={`${project.id}-${idx}`}
                          className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/8"
                        >
                          <Image
                            src={image}
                            alt={`${project.title} preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <ProjectsPhilosophy />
        {/* POSITIONING */}
        <WhoItsFor />
        {/* FINAL CTA */}
        <ProjectFinalCTA />

      </main>

      <Footer />
    </>
  );
}