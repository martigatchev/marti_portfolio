// app/projects/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import { PageFrame } from "@/components/page-frame";
import { projects as projectData, type ProjectRecord } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Marti Gatchev",
  description: "Selected projects and experiments by Marti Gatchev.",
};

/* ===== Shared mini components (server-safe) ===== */

type CSSVars = { [key: `--${string}`]: string };

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-black px-3 py-1 text-xs font-semibold bg-[#fbefffff]">
      {children}
    </span>
  );
}

function GlassBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[0.8rem] border-4 border-black bg-clip-padding overflow-hidden",
        className,
      ].join(" ")}
      style={{
        // Translucent: grid shows through slightly (same recipe as About)
        background:
          "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255, 255, 255, 0.6)",
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectRecord }) {
  const { title, summary, tags, coverImage, status, slug } = project;
  const isInteractive = status !== "coming-soon";
  const targetHref = `/projects/${slug}`;

  const card = (
    <GlassBlock
      className={[
        "flex h-full flex-col transition-transform duration-300",
        isInteractive
          ? "group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Media */}
      <div className="relative w-full aspect-video">
        <Image
          src={coverImage.src}
          alt={coverImage.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 40vw, (min-width: 768px) 45vw, (min-width: 640px) 75vw, 95vw"
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
        <h3 className="font-display text-2xl font-extrabold leading-tight">
          {title}
        </h3>
        <p className="text-sub text-black/85 leading-relaxed">{summary}</p>

        {tags?.length ? (
          <div className="mt-1 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-auto pt-2">
          {isInteractive ? (
            <span
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
                         border-2 border-black text-black
                         bg-[#fbefffff] transition-colors
                         group-hover:bg-[#CEAED5]"
            >
              View project
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
                              border-2 border-black text-black bg-[#fbefffff] opacity-70"
            >
              Coming soon
            </span>
          )}
        </div>
      </div>
    </GlassBlock>
  );

  if (!isInteractive) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <Link
      href={targetHref}
      aria-label={`View project: ${title}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
    >
      {card}
    </Link>
  );
}

/* ===== Page ===== */

export default function ProjectsPage() {
  // Palette vars shared with About
  const paletteVars: CSSVars = {
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
  };

  const projects = projectData;

  const projectCount = projects.length;
  const gridLayoutClasses = [
    "relative grid grid-cols-1 gap-6 md:gap-8 overflow-hidden rounded-[0.8rem]",
    projectCount >= 2 ? "md:grid-cols-2" : "",
    projectCount >= 3 ? "xl:grid-cols-3" : "",
    projectCount <= 2 ? "mx-auto w-full max-w-7xl" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={[
        "min-h-screen w-full p-0",
        // Header offset (same as About) so the fixed header doesn’t overlap
        "pt-[calc(4rem+env(safe-area-inset-top)+4px)] sm:pt-[calc(6rem+6px)]",
      ].join(" ")}
      style={paletteVars}
    >
      <main>
        {/* Frame + grid (matching About) */}
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <AnimateOnView
            as="h1"
            preset="slideLeft"
            amount={0.2}
            className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white"
          >
            Projects
          </AnimateOnView>
          <AnimateOnView
            as="p"
            preset="fadeUp"
            delay={0.06}
            amount={0.2}
            className="mt-4 text-center text-lg sm:text-xl text-black/80"
          >
            A few things I’ve built and shipped.
          </AnimateOnView>

          {/* Grid of projects inside a big glass block (no internal divider lines) */}
          <div className="mt-10">
            <div className="rounded-[0.8rem]">
              <div className={gridLayoutClasses}>
                {projects.map((p, i) => (
                  <AnimateOnView
                    key={i}
                    as="div"
                    preset="fadeUp"
                    delay={i * 0.03}
                    amount={0.15}
                    className="h-full"
                  >
                    <ProjectCard project={p} />
                  </AnimateOnView>
                ))}
              </div>
            </div>
          </div>

          {/* Optional section break */}
          <hr className="mx-auto my-18 w-full border-0 border-t-[4px] border-black dark:border-white opacity-100" />

          {/* Future: secondary grids, experiments, or a “More on GitHub” CTA */}
          <AnimateOnView as="div" preset="fadeUp" amount={0.2}>
            <div className="mx-auto max-w-3xl text-center text-sub text-black/75">
              More soon — I’m constantly prototyping and iterating. For the full
              history, check my GitHub.
            </div>
          </AnimateOnView>
        </PageFrame>
      </main>
    </section>
  );
}
