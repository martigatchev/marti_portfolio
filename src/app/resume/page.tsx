// app/resume/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import { BlockButton } from "@/components/ui/block-button";

export const metadata: Metadata = {
  title: "Resume — Marti Gatchev",
  description: "Resume/CV overview for Marti Gatchev.",
};

/* --- shared minis --- */
type CSSVars = { [key: `--${string}`]: string };

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
        background:
          "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255,255,255,0.6)",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
      {children}
    </h2>
  );
}

/* --- page --- */
export default function ResumePage() {
  // match About/Projects palette
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
  };

  return (
    <section
      className={[
        "min-h-screen w-full p-0",
        // keep Home hero pristine; offset only here
        "pt-[calc(4rem+env(safe-area-inset-top)+4px)] sm:pt-[calc(6rem+6px)]",
      ].join(" ")}
      style={paletteVars}
    >
      <main>
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <AnimateOnView
            as="h1"
            preset="slideLeft"
            amount={0.2}
            className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white"
          >
            Resume
          </AnimateOnView>
          <AnimateOnView as="p" preset="fadeUp" delay={0.06} amount={0.2}>
            <p className="mt-4 text-center text-lg sm:text-xl text-black/80">
              Roles, experience, education, and skills.
            </p>
          </AnimateOnView>

          {/* Download CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* If your file lives at /public/resume.pdf this will work */}
            <BlockButton href="/resume.pdf" size="lg" cornerRadius="0.8rem" ariaLabel="Download PDF resume">
              Download PDF
            </BlockButton>

            {/* Optional: view-in-browser fallback */}
            <Link
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
                         border-2 border-black text-black
                         bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
            >
              View in browser
            </Link>
          </div>

          {/* Content */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left: Experience (spans 2 cols on desktop) */}
            <div className="lg:col-span-2">
              <GlassBlock className="p-6 sm:p-8">
                <SectionTitle>Experience</SectionTitle>
                <div className="mt-6 grid gap-6">
                  <div className="rounded-[0.6rem] border-2 border-black p-4 sm:p-5 bg-white/60">
                    <div className="font-display text-xl font-bold">Risings Education · Lead Software Developer</div>
                    <div className="text-sub text-sm text-black/70">May 2024 — Nov 2024 · Vancouver, Canada (Remote)</div>
                    <p className="mt-3 text-sub text-black/85">
                      Led an OpenAI-powered writing platform end to end; owned backend architecture and integration focused on
                      workflow speed and output quality.
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sub space-y-1">
                      <li>Architected multi-stage generation pipelines and REST endpoints.</li>
                      <li>Delivered a modular Python + Flask service with React front end.</li>
                      <li>Ran A/B tests and refined prompts; implemented orchestration for chained API calls.</li>
                    </ul>
                    <div className="mt-3 text-xs">Python · React · OpenAI API · REST</div>
                  </div>

                  <div className="rounded-[0.6rem] border-2 border-black p-4 sm:p-5 bg-white/60">
                    <div className="font-display text-xl font-bold">CubicFarms Systems · Software Engineer (Co-op)</div>
                    <div className="text-sub text-sm text-black/70">Jan 2022 — Aug 2022 · Langley, Canada (Remote)</div>
                    <p className="mt-3 text-sub text-black/85">
                      Built internal tooling and authentication flows for an ag-tech platform, focusing on secure onboarding and
                      developer velocity in Azure.
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sub space-y-1">
                      <li>Org-setup console for Azure DB with role provisioning and SSO.</li>
                      <li>JWT-based gateway integrating Document360 with the web app.</li>
                      <li>Dev workflow improvements with ngrok tunnel activator for events.</li>
                    </ul>
                    <div className="mt-3 text-xs">C# · .NET · Docker · Azure DevOps</div>
                  </div>
                </div>
              </GlassBlock>
            </div>

            {/* Right: Education & Skills */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              <GlassBlock className="p-6 sm:p-8">
                <SectionTitle>Education</SectionTitle>
                <div className="mt-4 grid gap-4">
                  <div className="rounded-[0.6rem] border-2 border-black p-4 bg-white/60">
                    <div className="font-semibold">University / Program</div>
                    <div className="text-sub text-sm text-black/70">Year — Year</div>
                    <p className="mt-2 text-sub">Notes, awards, focus areas.</p>
                  </div>
                </div>
              </GlassBlock>

              <GlassBlock className="p-6 sm:p-8">
                <SectionTitle>Skills</SectionTitle>
                <p className="mt-4 text-sub text-black/85 leading-relaxed">
                  React, Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion, Node/Express, Python (FastAPI),
                  Postgres, Auth, Docker, CI (GitHub Actions), Vercel.
                </p>
                {/* Link out to your fuller Skills grid if you want */}
                {/* <div className="mt-4"><Link href="/about#skills" className="underline">See detailed skills</Link></div> */}
              </GlassBlock>
            </div>
          </div>

          {/* Optional: second CTA */}
          <div className="mt-12 flex justify-center">
            <BlockButton href="/resume.pdf" size="md" cornerRadius="0.8rem" ariaLabel="Download PDF resume (bottom)">
              Download PDF
            </BlockButton>
          </div>
        </PageFrame>
      </main>
    </section>
  );
}
