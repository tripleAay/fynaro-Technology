import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import Header from "@/components/dashboard components/homeHeader";
import Footer from "@/components/footer";
import { projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Header />

      <main className="bg-black text-white">
        {/* hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 md:pb-24 md:pt-40">
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>

            <div className="max-w-4xl">
              <p className="mb-4 text-[11px] tracking-[0.35em] text-[#d6cc6d]">
                {project.meta.toUpperCase()}
              </p>

              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                {project.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.10)]">
                  {project.year}
                </span>

                {project.services.map((service, index) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:rotate-[1deg] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.10)]"
                    style={{ transitionDelay: `${index * 35}ms` }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* cover */}
        <section className="px-6 pb-20 md:px-8 md:pb-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] p-3">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-[24px]">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* overview */}
        <section className="px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] text-white/35">
                OVERVIEW
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="text-base leading-8 text-white/68 md:text-lg">
                {project.intro}
              </p>
            </div>
          </div>
        </section>

        {/* optional video */}
        {project.videoUrl && (
          <section className="border-t border-white/8 px-6 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <p className="mb-8 text-[11px] tracking-[0.35em] text-white/35">
                PROJECT PRESENTATION
              </p>

              <div className="overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] p-3">
                <div className="relative overflow-hidden rounded-[24px]">
                  <video
                    controls
                    playsInline
                    poster={project.videoPoster}
                    className="aspect-[16/9] w-full bg-black object-cover"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>

                  {!project.videoPoster && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* challenge / approach / outcome */}
        <section className="border-t border-white/8 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6">
                <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                  CHALLENGE
                </p>
                <p className="text-sm leading-8 text-white/65 md:text-base">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6">
                <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                  APPROACH
                </p>
                <p className="text-sm leading-8 text-white/65 md:text-base">
                  {project.approach}
                </p>
              </div>

              <div className="rounded-[28px] border border-[#d6cc6d]/20 bg-[#d6cc6d]/[0.06] p-6">
                <p className="mb-3 text-[11px] tracking-[0.28em] text-white/35">
                  OUTCOME
                </p>
                <p className="text-sm leading-8 text-white md:text-base">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* gallery */}
        <section className="border-t border-white/8 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="mb-10 text-[11px] tracking-[0.35em] text-white/35">
              PROJECT GALLERY
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, index) => {
                const isLarge = index === 0;

                return (
                  <div
                    key={`${project.slug}-${index}`}
                    className={`group overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.02] p-3 ${
                      isLarge ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[20px] ${
                        isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#d6cc6d]/10 via-transparent to-transparent" />
                    </div>

                    {project.galleryCaptions?.[index] && (
                      <p className="px-1 pt-4 text-sm text-white/52">
                        {project.galleryCaptions[index]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}