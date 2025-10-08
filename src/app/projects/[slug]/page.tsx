import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { PageFrame } from "@/components/page-frame";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import { getProjectBySlug, projects as allProjects } from "@/data/projects";

type ProjectPageParams = {
  params: {
    slug: string;
  };
};

const liveProjects = allProjects.filter(
  (project) => project.status !== "coming-soon",
);

export function generateStaticParams() {
  return liveProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: ProjectPageParams): Metadata | undefined {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return;
  }
  const title = `${project.title} — Projects — Marti Gatchev`;
  return {
    title,
    description: project.summary,
    ...project.metadata,
  };
}

function DetailPanel({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="font-display text-lg font-semibold tracking-tight text-black">
        {title}
      </h4>
      <ul className="mt-2 space-y-1 text-sm text-black/80">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetailPage({ params }: ProjectPageParams) {
  const project = getProjectBySlug(params.slug);

  if (!project || project.status === "coming-soon") {
    notFound();
  }

  const {
    title,
    subtitle,
    summary,
    description,
    hero,
    coverImage,
    timeline,
    role,
    responsibilities,
    tools,
    outcomes,
    gallery,
    tags,
    slug,
  } = project;

  const paletteVars = {
    "--p0": "#000000ff",
    "--p1": "#b48cff",
    "--p2": "#a78bfa",
    "--p3": "#ff9acb",
    "--p4": "#ff6d98",
    "--p5": "#CEAED5",
    "--p6": "#fbefffff",
    "--p1-15": "rgba(180, 140, 255, 0.15)",
    "--p2-15": "rgba(167, 139, 250, 0.15)",
    "--p3-15": "rgba(255, 154, 203, 0.15)",
    "--p5-25": "rgba(206, 174, 213, 0.25)",
    "--p5-55": "rgba(206, 174, 213, 0.55)",
    "--p6-15": "rgba(255, 255, 255, 0.15)",
  } as CSSProperties;

  const currentIndex = liveProjects.findIndex((item) => item.slug === slug);
  const prevProject =
    currentIndex > 0 ? liveProjects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex >= 0 && currentIndex < liveProjects.length - 1
      ? liveProjects[currentIndex + 1]
      : undefined;

  return (
    <section
      className={[
        "min-h-screen w-full p-0",
        "pt-[calc(4rem+env(safe-area-inset-top)+4px)] sm:pt-[calc(6rem+6px)]",
      ].join(" ")}
      style={paletteVars}
    >
      <main>
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-7xl space-y-16">
            <AnimateOnView
              as="div"
              preset="fadeUp"
              amount={0.2}
              className="space-y-6"
            >
              <nav className="flex flex-wrap items-center gap-2 text-sm text-black/60">
                <Link
                  href="/projects"
                  className="transition-colors hover:text-black underline-offset-4 hover:underline"
                >
                  Projects
                </Link>
                <span aria-hidden="true">›</span>
                <span className="font-medium text-black">{title}</span>
              </nav>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-black/60">
                    {hero?.eyebrow ?? subtitle ?? "Project"}
                  </p>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white">
                    {title}
                  </h1>
                  <p className="text-sub text-lg sm:text-xl text-black/80">
                    {summary}
                  </p>
                </div>

                {hero?.ctaHref ? (
                  <Link
                    href={hero.ctaHref}
                    className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
                    target={hero.ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={
                      hero.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                  >
                    {hero.ctaLabel ?? "Visit website"}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </AnimateOnView>

            <AnimateOnView
              as="div"
              preset="fadeUp"
              amount={0.2}
              className="rounded-[0.8rem] border-4 border-black overflow-hidden bg-clip-padding"
              style={{
                background:
                  "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255, 255, 255, 0.6)",
              }}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={coverImage.src}
                  alt={coverImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 70vw, (min-width: 768px) 85vw, 95vw"
                  priority
                />
              </div>
            </AnimateOnView>

            <div
              className="rounded-[0.8rem] border-0 sm:border-4 sm:border-black bg-clip-padding glass-shell bg-transparent sm:[background:linear-gradient(360deg,var(--p6-15)_0%,var(--p5-25)_100%),rgba(255,255,255,0.6)] sm:shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
            >
              <div className="grid gap-12 p-6 sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <AnimateOnView
                  as="div"
                  preset="fadeUp"
                  amount={0.2}
                  className="space-y-8"
                >
                  <div className="space-y-6 text-sub text-base sm:text-lg leading-relaxed text-black/85">
                    {description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {responsibilities?.length ? (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        What I built
                      </h3>
                      <ul className="space-y-3 text-sub text-base text-black/85 leading-relaxed">
                        {responsibilities.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {outcomes?.length ? (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        Impact
                      </h3>
                      <ul className="space-y-3 text-sub text-base text-black/85 leading-relaxed">
                        {outcomes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </AnimateOnView>

                <AnimateOnView
                  as="aside"
                  preset="fadeUp"
                  delay={0.08}
                  amount={0.2}
                  className="space-y-6"
                >
                  <div className="rounded-[0.8rem] border-4 border-black bg-clip-padding p-6 sm:p-8 bg-white space-y-6">
                    <div className="space-y-6">
                      <DetailPanel
                        title="Timeline"
                        items={timeline ? [timeline] : []}
                      />
                      <DetailPanel title="Role" items={role} />
                    </div>

                    {(tags?.length || tools?.length) ? (
                      <div className="space-y-3">
                        <h4 className="font-display text-lg font-semibold tracking-tight text-black">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[...(tags ?? []), ...(tools ?? [])].map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className="inline-flex items-center rounded-full border-2 border-black px-3 py-1 text-xs font-semibold bg-[#fbefffff] transition-colors duration-200 hover:bg-[#CEAED5] cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </AnimateOnView>
              </div>
            </div>

            {gallery?.length ? (
              <div className="space-y-10">
                {gallery.map((item, index) => (
                  <AnimateOnView
                    key={`${item.src}-${index}`}
                    as="figure"
                    preset="fadeUp"
                    amount={0.2}
                    className="space-y-4"
                  >
                    <div
                      className="rounded-[0.8rem] border-4 border-black overflow-hidden bg-clip-padding"
                      style={{
                        background:
                          "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 70vw, (min-width: 768px) 85vw, 95vw"
                        />
                      </div>
                    </div>
                    {item.caption ? (
                      <figcaption className="text-sm text-black/70">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </AnimateOnView>
                ))}
              </div>
            ) : null}

            {(prevProject || nextProject) && (
              <AnimateOnView
                as="nav"
                preset="fadeUp"
                amount={0.2}
                className="flex flex-col gap-6 border-t-4 border-black pt-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <Link
                  href={
                    prevProject
                      ? `/projects/${prevProject.slug}`
                      : "/projects"
                  }
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
                >
                  ← {prevProject ? prevProject.title : "Back to all projects"}
                </Link>
                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors self-end"
                  >
                    Next project → {nextProject.title}
                  </Link>
                ) : null}
              </AnimateOnView>
            )}
          </div>
        </PageFrame>
      </main>
    </section>
  );
}
