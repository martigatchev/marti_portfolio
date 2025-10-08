// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

import { PageFrame } from "@/components/page-frame";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import AboutHero from "@/components/sections/about-hero";
import TechStackGrid from "@/components/sections/tech-stack-grid";

export const metadata: Metadata = {
  title: "About — Marti Gatchev",
  description: "About Marti Gatchev — full-stack software engineer.",
};

type CSSVars = { [key: `--${string}`]: string };

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function GlassPanel({
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
        "px-4 sm:px-6 py-6",
        className,
      ].join(" ")}
      style={{
        // translucent: grid shows through slightly (same recipe as your other sections)
        background:
          "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255, 255, 255, 0.6)",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  // palette for translucent panels (matches your Experience/Featured)
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

  return (
    <section
      className={[
        "min-h-screen w-full p-0",
        // About-only header offset (keeps Home hero pristine)
        "pt-[calc(4rem+env(safe-area-inset-top)+4px)] sm:pt-[calc(6rem+6px)]",
      ].join(" ")}
      style={paletteVars}
    >
      <main>
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          {/* ===== About / Highlight (component) ===== */}
          <div className="mt-6 sm:mt-8">


            <AboutHero />
          </div>

          <hr className="mx-auto my-18 w-full border-0 border-t-[4px] border-black dark:border-white opacity-100" />

          {/* ===== Skills (inline for now) ===== */}
          <div className="mt-6">
  <AnimateOnView
    as="h2"
    preset="fadeUp"
    once
    amount={0.2}
    className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-12 sm:mb-12"
  >
    Tech-Stack
  </AnimateOnView>

  <AnimateOnView as="div" preset="fadeUp" delay={0.08} once amount={0.2}>
    <TechStackGrid />
  </AnimateOnView>
</div>

<hr className="mx-auto mt-18 mb-8 w-full border-0 border-t-[4px] border-black dark:border-white opacity-100" />
          
        </PageFrame>
      </main>
    </section>
  );
}
