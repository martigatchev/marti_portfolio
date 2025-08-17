// about/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Marti Gatchev",
  description: "About Marti Gatchev — full-stack software engineer.",
};

export default function AboutPage() {
  return (
    <section className="bg-grid min-h-screen w-full px-6 sm:px-12 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-center">
          About
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-center">
          A short story about me, my values, and how I work. (Placeholder)
        </p>

        <div className="mt-12 space-y-6 text-base sm:text-lg leading-relaxed">
          <p>
            I’m a full-stack engineer who enjoys building immersive tools and
            AI-powered systems. This page will include a bio, highlights, and a
            few photos.
          </p>
          <p>
            Outside of code: interests, communities, and things that keep me
            curious.
          </p>
        </div>
      </div>
    </section>
  );
}
