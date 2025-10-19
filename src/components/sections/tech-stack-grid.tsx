"use client";

import React from "react";
import { Monitor, Atom, ServerCog } from "lucide-react";
// ⬇️ Import only the icons you need from Simple Icons
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siFramer,
  siSwift,
  siReacthookform,
  siThreedotjs,
  siPython,
  siNodedotjs,
  siPostgresql,
  siDotnet,
  siJsonwebtokens,
  siAuth0,
  siOpenai,
  siPostman,
  siVercel,
  siGithub,
  siGithubactions,
  siLinux,
  siFirebase,
  siSwagger,
  siPrisma as siPrismaORM,
  siShadcnui,
  siChakraui,
  siDocker,
  siJavascript,
  siGooglegemini,
  siSelenium,
  siLangchain,
  siSupabase,
} from "simple-icons/icons";
import { AnimateOnView } from "../ui/animate-on-view";

// Minimal runtime type for a Simple Icons object
type SI = { path: string; title: string; hex?: string };

/* ----------------------------- Pill with icon ----------------------------- */
type Tech = {
  label: string;
  si?: SI; // Simple Icons object (e.g., siReact)
};

function TechPill({ tech }: { tech: Tech }) {
  return (
    <span
      className="
        inline-flex items-center gap-2
        rounded-full border-2 border-black
        px-3.5 py-2 text-sm font-semibold
        bg-[#fbefffff] hover:bg-[#CEAED5]
        transition-colors
        text-black cursor-default
      "
      title={tech.label}
    >
      {tech.si ? (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          role="img"
          aria-label={tech.si.title || tech.label}
          className="inline-block"
        >
          <path d={tech.si.path} fill="currentColor" />
        </svg>
      ) : null}
      <span>{tech.label}</span>
    </span>
  );
}

/* ------------------------------ Card framing ------------------------------ */
function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 mb-2 text-[0.8rem] uppercase tracking-wide text-black/70">
      {children}
    </p>
  );
}

function Card({
  icon,
  titleTop,
  titleBottom,
  primary = [],
  working = [],
  blurb,
}: {
  icon: React.ReactNode;
  titleTop: string;
  titleBottom?: string;
  primary?: Tech[];
  working?: Tech[];
  blurb?: string;
}) {
  return (
    <div className="h-full p-8 sm:p-10 bg-white/70 bg-clip-padding">
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="opacity-90">{icon}</div>
        <div className="font-display text-3xl sm:text-4xl font-extrabold text-black leading-tight">
          <span>{titleTop}</span>
          {titleBottom ? (
            <>
              <br />
              {titleBottom}
            </>
          ) : null}
        </div>
      </div>

      {blurb ? (
        <p
          className="
            mt-4 relative text-sub text-base sm:text-lg text-black/85 leading-relaxed
            pl-[calc(var(--rule-w,6px)+var(--rule-gap,14px))]
            before:content-[''] before:absolute before:left-0 before:inset-y-1
            before:w-[var(--rule-w,6px)] before:bg-[var(--c-lilac,#a78bfa)]
          "
          style={
            {
              "--rule-w": "4px",
              "--rule-gap": "16px",
            } as React.CSSProperties
          }
        >
          {blurb}
        </p>
      ) : null}

      {primary.length > 0 && (
        <>
          <Subhead>Primary stack</Subhead>
          <AnimateOnView as="div" preset="slideLeft" amount={0.2}>
          <div className="flex flex-wrap gap-2.5">
            {primary.map((t) => (
              <TechPill key={t.label} tech={t} />
            ))}
          </div>
          </AnimateOnView>
        </>
      )}

      {working.length > 0 && (
        <>
          <Subhead>Working knowledge</Subhead>
          <AnimateOnView as="div" preset="slideLeft" amount={0.2}>
          <div className="flex flex-wrap gap-2.5">
            {working.map((t) => (
              <TechPill key={t.label} tech={t} />
            ))}
          </div>
          </AnimateOnView>
        </>
      )}
    </div>
  );
}

/* ------------------------------ Grid wrapper ------------------------------ */
export default function TechStackGrid() {
  const uiVars = {
    "--corner-r": "0.8rem",
    "--divider-w": "4px",
    "--divider-color": "black",
  } as React.CSSProperties;

  return (
    <section
      aria-labelledby="skills-title"
      className="mx-auto max-w-7xl px-6"
      style={uiVars}
    >
      <h2 id="skills-title" className="sr-only">
        Tech Stack
      </h2>

      <div className="rounded-[var(--corner-r,0px)] ring-4 ring-black">
        <div
          className="
            relative
            grid auto-rows-fr
            grid-cols-1 md:grid-cols-2 xl:grid-cols-3
            overflow-hidden rounded-[var(--corner-r,0px)]

            divide-y-[var(--divider-w,4px)] divide-[var(--divider-color,black)]
            md:divide-y-0 md:divide-x-0
            md:before:content-[''] md:before:absolute md:before:inset-0
            md:before:pointer-events-none md:before:rounded-[var(--corner-r,0px)] md:before:bg-no-repeat
            md:before:bg-[linear-gradient(var(--divider-color,black)),linear-gradient(var(--divider-color,black))]
            md:before:[background-size:var(--divider-w,4px)_100%,100%_var(--divider-w,4px)]
            md:before:[background-position:50%_0,0_50%]
            xl:before:bg-[linear-gradient(var(--divider-color,black)),linear-gradient(var(--divider-color,black))]
            xl:before:[background-size:var(--divider-w,4px)_100%,var(--divider-w,4px)_100%]
            xl:before:[background-position:33.333%_0,66.666%_0]
          "
        >
          {/* Backend */}
          <Card
            icon={<Monitor className="size-8 sm:size-10" />}
            titleTop="Backend"
            titleBottom="Engineering"
            blurb="API-first services with clean models and auth."
            primary={[
              { label: "Python", si: siPython },
              { label: "C# / .NET", si: siDotnet },
              { label: "REST APIs", si: siSwagger },
            ]}
            working={[
              { label: "Supabase", si: siSupabase },
              { label: "Node.js / Express", si: siNodedotjs },
              { label: "JWT / OAuth", si: siJsonwebtokens },
              { label: "Swift", si: siSwift },
            ]}
          />

          {/* Frontend */}
          <Card
            icon={<Atom className="size-8 sm:size-10" />}
            titleTop="Frontend"
            titleBottom="Engineering"
            blurb="Accessible, responsive UI with component-driven architecture."
            primary={[
              { label: "React", si: siReact },
              { label: "Next.js", si: siNextdotjs },
              { label: "TypeScript", si: siTypescript },
              { label: "JavaScript", si: siJavascript },
              { label: "Tailwind", si: siTailwindcss },
              { label: "Chakra UI", si: siChakraui },
            ]}
            working={[
              { label: "shadcn/ui", si: siShadcnui },
              { label: "Framer Motion", si: siFramer },
            ]}
          />

          {/* AI & Automation */}
          <Card
            icon={<ServerCog className="size-8 sm:size-10" />}
            titleTop="AI"
            titleBottom="Engineering"
            blurb="LLM features with tool use, data grounding, and smooth UX."
            primary={[
              { label: "OpenAI API / Playground", si: siOpenai },
              { label: "OpenAI Codex", si: siOpenai },
              { label: "Midjourney" },
            ]}
            working={[
              { label: "Gemini", si: siGooglegemini },
              { label: "LangChain Tooling", si: siLangchain },
            ]}
          />

          {/* Optional balancing tile on small screens */}
          <div className="xl:hidden h-full p-8 sm:p-10 bg-white/70 bg-clip-padding">
            <div className="h-full grid place-items-center text-center">
              <p className="font-display text-xl sm:text-2xl font-extrabold text-black">
                Always learning, always shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
