// app/resume/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import { Download, FileText } from "lucide-react";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siShadcnui,
  siFramer,
  siFigma,
  siPython,
  siNodedotjs,
  siSwagger,
  siSupabase,
  siDocker,
  siVercel,
  siOpenai,
  siGooglegemini,
  siLangchain,
  siLinear,
  siGithub,
  siDotnet,
  siJsonwebtokens,
  siJavascript,
} from "simple-icons/icons";

export const metadata: Metadata = {
  title: "Resume — Marti Gatchev",
  description: "Resume/CV overview for Marti Gatchev.",
};

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
        "max-sm:border-none max-sm:rounded-none max-sm:bg-transparent",
        "sm:rounded-[0.8rem] sm:border-4 sm:border-black sm:bg-clip-padding sm:overflow-hidden",
        "sm:[background:linear-gradient(360deg,var(--p6-15)_0%,var(--p5-25)_100%),rgba(255,255,255,0.6)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
      {children}
    </h2>
  );
}

type SI = { path: string; title: string; hex?: string };

function SkillPill({ children, si }: { children: React.ReactNode; si?: SI }) {
  return (
    <span
      className="
        inline-flex items-center gap-2 rounded-full border-2 border-black
        bg-[#fbefffff] px-3.5 py-1.5 text-sm font-semibold text-black
        transition-colors duration-200 hover:bg-[#CEAED5]
      "
    >
      {si ? (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          role="img"
          aria-label={si.title || String(children)}
          className="inline-block"
        >
          <path d={si.path} fill="currentColor" />
        </svg>
      ) : null}
      <span>{children}</span>
    </span>
  );
}

export default function ResumePage() {
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
    "--p6-15": "rgba(255, 255, 255, 0.15)",
  };

  const skillGroups: {
    title: string;
    blurb: string;
    items: { label: string; si?: SI }[];
  }[] = [
    {
      title: "Frontend",
      blurb:
        "React/Next.js product surfaces with design systems that stay accessible and fast.",
      items: [
        { label: "React", si: siReact },
        { label: "Next.js", si: siNextdotjs },
        { label: "TypeScript", si: siTypescript },
        { label: "JavaScript", si: siJavascript },
        { label: "Tailwind CSS", si: siTailwindcss },
        { label: "shadcn/ui", si: siShadcnui },
        { label: "Framer Motion", si: siFramer },
        { label: "Figma", si: siFigma },
      ],
    },
    {
      title: "Backend & Ops",
      blurb:
        "API-first services with instrumentation, CI, and deploy pipelines tuned for fast iteration.",
      items: [
        { label: "Python", si: siPython },
        { label: "C# / .NET", si: siDotnet },
        { label: "Node.js", si: siNodedotjs },
        { label: "REST APIs", si: siSwagger },
        { label: "JWT / OAuth", si: siJsonwebtokens },
        { label: "Supabase", si: siSupabase },
        { label: "Docker", si: siDocker },
        { label: "Vercel", si: siVercel },
      ],
    },
    {
      title: "AI & Automation",
      blurb:
        "LLM-powered workflows that stay reliable—retrieval, evals, and guarded automation loops.",
      items: [
        { label: "OpenAI API", si: siOpenai },
        { label: "LangChain Tooling", si: siLangchain },
        { label: "Prompt Engineering", si: siGooglegemini },
        { label: "Midjourney" },
      ],
    },
    {
      title: "Collaboration",
      blurb:
        "Run product work end-to-end with clear communication and steady delivery rhythm.",
      items: [
        { label: "GitHub", si: siGithub },
        { label: "Linear", si: siLinear },
        { label: "Agile / Scrum" },
        { label: "Pairing & Reviews" },
        { label: "Product Development" },
      ],
    },
  ];

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
          <AnimateOnView
            as="h1"
            preset="fadeUp"
            amount={0.2}
            className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white"
          >
            Resume
          </AnimateOnView>
          <AnimateOnView as="div" preset="fadeUp" delay={0.06} amount={0.2}>
            <p className="mt-4 text-center text-lg sm:text-xl text-black/80">
              Roles, experience, education, and skills.
            </p>
          </AnimateOnView>

          <AnimateOnView as="div" preset="slideLeft" amount={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/resume.pdf"
                download
                aria-label="Download PDF resume"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#fbefffff] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#CEAED5] lg:gap-3 lg:px-6 lg:py-3 lg:text-base"
              >
                <Download className="h-4 w-4 lg:h-5 lg:w-5" />
                Download PDF
              </Link>

              <Link
                href="/resume.pdf"
                aria-label="Open resume PDF in new tab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#fbefffff] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#CEAED5] lg:gap-3 lg:px-6 lg:py-3 lg:text-base"
              >
                <FileText className="h-4 w-4 lg:h-5 lg:w-5" />
                View in browser
              </Link>
            </div>
          </AnimateOnView>

          <div className="mt-10 mx-auto w-full max-w-7xl px-2 sm:px-8 space-y-8">
            <AnimateOnView as="div" preset="fadeUp" amount={0.2}>
            <GlassBlock className="py-2 sm:p-8">
              <SectionTitle>Experience</SectionTitle>
              <div className="mt-6 space-y-6">
                <article className="rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-6">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold">
                        Lead Software Engineer
                      </h3>
                      <p className="text-sub text-sm sm:text-base text-black/75">
                        Risings Education · Contract · Part-time · Remote
                      </p>
                    </div>
                    <span className="text-sub text-sm sm:text-base font-semibold text-black/80 tracking-tight">
                      <span>May 2024 — Nov 2024</span>
                      <span className="mx-2 font-normal text-black/70">•</span>
                      <span>Vancouver, BC (Remote)</span>
                    </span>
                  </header>
                  <p className="mt-3 text-sub text-black/85 leading-relaxed">
                    Led the end-to-end build of an OpenAI-powered writing
                    platform, pairing rapid experimentation with
                    production-ready delivery.
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sub text-black/80 leading-relaxed">
                    <li>
                      Designed and shipped the core application leveraging
                      OpenAI&apos;s API to elevate content quality and
                      turnaround time.
                    </li>
                    <li>
                      Ran deep research cycles and A/B testing to tune
                      workflows, raising efficiency and user satisfaction across
                      the product.
                    </li>
                    <li>
                      Architected robust RESTful endpoints and multi-stage API
                      chains so editors could orchestrate complex writing flows
                      without friction.
                    </li>
                    <li>
                      Delivered a scalable Python (Flask) back end with a React
                      front end, opting for modular microservices that keep
                      future iterations flexible.
                    </li>
                  </ul>
                  <p className="mt-4 text-xs uppercase tracking-wide text-black/60">
                    Python · Flask · React · OpenAI API · REST · Microservices
                  </p>
                </article>

                
                  <article className="rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-6">
                    <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold">
                          Software Engineer (Co-op)
                        </h3>
                        <p className="text-sub text-sm sm:text-base text-black/75">
                          CubicFarm Systems Corp. · Contract · Full-time
                        </p>
                      </div>
                      <span className="text-sub text-sm sm:text-base font-semibold text-black/80 tracking-tight">
                        <span>Jan 2022 — Aug 2022</span>
                        <span className="mx-2 font-normal text-black/70">
                          •
                        </span>
                        <span>Vancouver, BC</span>
                      </span>
                    </header>
                    <p className="mt-3 text-sub text-black/85 leading-relaxed">
                      Contributed across the stack on ag-tech tooling,
                      supporting sustainable farming initiatives with secure,
                      scalable software.
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sub text-black/80 leading-relaxed">
                      <li>
                        Built an internal front-end console that accelerated
                        customer org provisioning in Azure with precise role and
                        auth controls.
                      </li>
                      <li>
                        Developed an ngrok tunnel activation tool that bridged
                        local developer functions with Azure event subscriptions
                        to streamline workflows.
                      </li>
                      <li>
                        Helped transition the logging framework to Serilog,
                        improving traceability and debugging clarity for the
                        engineering team.
                      </li>
                      <li>
                        Implemented a JWT-based API to deliver SSO into
                        Document360, simplifying knowledge access across the
                        organization.
                      </li>
                      <li>
                        Scripted operational safeguards—including environment
                        backups—using Bash to keep dev environments healthy.
                      </li>
                      <li>
                        Practiced Agile + DevOps fundamentals daily across
                        Terraform, Docker, YAML pipelines, and the broader Azure
                        ecosystem.
                      </li>
                    </ul>
                    <p className="mt-4 text-xs uppercase tracking-wide text-black/60">
                      C# · .NET · Azure · Serilog · Terraform · Docker · JWT ·
                      Bash
                    </p>
                  </article>

              </div>
            </GlassBlock>
            </AnimateOnView>

            <AnimateOnView as="div" preset="fadeUp" amount={0.2} delay={0.05}>
              <GlassBlock className="py-2 sm:p-8">
                <SectionTitle>Skills</SectionTitle>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {skillGroups.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-5"
                    >
                      <h4 className="font-display text-2xl sm:text-3xl font-semibold">
                        {group.title}
                      </h4>
                      <p className="mt-2 text-sub text-black/80 leading-relaxed">
                        {group.blurb}
                      </p>
                      <AnimateOnView as="div" preset="slideLeft" amount={0.2}>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {group.items.map((item) => (
                            <SkillPill key={item.label} si={item.si}>
                              {item.label}
                            </SkillPill>
                          ))}
                        </div>
                      </AnimateOnView>
                    </div>
                  ))}
                </div>
              </GlassBlock>
            </AnimateOnView>

            <AnimateOnView as="div" preset="fadeUp" amount={0.2} delay={0.1}>
              <GlassBlock className="py-2 sm:p-8">
                <SectionTitle>Education</SectionTitle>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold">
                      BCIT • Computer Systems Technology
                    </h3>
                    <p className="mt-1 text-sub text-sm sm:text-base font-semibold text-black/80 tracking-tight">
                      <span>2021 — 2023</span>
                      <span className="mx-2 font-normal text-black/70">•</span>
                      <span>Vancouver, BC</span>
                    </p>
                    <p className="mt-3 text-sub text-black/80 leading-relaxed">
                      • Predictive Analytics Specialization
                    </p>
                  </div>
                  <div className="rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold">
                      Concordia University • BCom, Marketing
                    </h3>
                    <p className="mt-1 text-sub text-sm sm:text-base font-semibold text-black/80 tracking-tight">
                      <span>2011 — 2015</span>
                      <span className="mx-2 font-normal text-black/70">•</span>
                      <span>Montreal, QC</span>
                    </p>
                    <p className="mt-3 text-sub text-black/80 leading-relaxed">
                      • Marketing Major
                    </p>
                    <p className="mt-3 text-sub text-black/80 leading-relaxed">
                      • Economics Minor
                    </p>
                  </div>
                  {/* <div className="rounded-[0.6rem] border-2 border-black/80 bg-white/90 p-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    Certifications & Highlights
                  </h3>
                  <p className="mt-3 text-sub text-black/80 leading-relaxed">
                    Add relevant certifications, hackathons, or scholarships once you have them—keeping the format simple.
                  </p>
                </div> */}
                </div>
              </GlassBlock>
            </AnimateOnView>
            <AnimateOnView as="div" preset="fadeUp" amount={0.2} delay={0.15}>
              <GlassBlock className="px-2 py-2 sm:p-8">
                <SectionTitle>Languages</SectionTitle>
                <div className="mt-6 rounded-[0.6rem] border-2 border-black/80 bg-white/70 p-4 sm:p-6">
                  <AnimateOnView as="div" preset="slideLeft" amount={0.2}>
                  <ul className="grid gap-5 text-sub text-black/80 leading-relaxed sm:grid-cols-2">
                    <li className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-black">
                        English
                      </span>
                      <span className="text-sm uppercase tracking-wide text-black/70">
                        Fluent
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-black">
                        Bulgarian
                      </span>
                      <span className="text-sm uppercase tracking-wide text-black/70">
                        Fluent
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-black">
                        Russian
                      </span>
                      <span className="text-sm uppercase tracking-wide text-black/70">
                        Elementary
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-black">
                        French
                      </span>
                      <span className="text-sm uppercase tracking-wide text-black/70">
                        Elementary
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-black">
                        Mandarin Chinese
                      </span>
                      <span className="text-sm uppercase tracking-wide text-black/70">
                        Beginner
                      </span>
                    </li>
                  </ul>
                  </AnimateOnView>
                </div>
              </GlassBlock>
            </AnimateOnView>
          </div>
        </PageFrame>
      </main>
    </section>
  );
}
