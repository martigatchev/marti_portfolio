// about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";


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

 <div className="mx-auto max-w-3xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sub uppercase text-lg sm:text-xl text-muted-foreground">
              I’m a full-stack software engineer—React and TypeScript on the front
              end; Python and C# on the back end. I care about clarity, reliability,
              and thoughtful UX. I apply AI in my own creative projects and bring
              those capabilities into approachable, user-first workflows.
            </p>

            <p className="mt-20 font-sans font-light tracking-[0.02em] leading-relaxed text-lg sm:text-xl text-muted-foreground">
              I’m a full-stack software engineer—React and TypeScript on the front
              end; Python and C# on the back end. I care about clarity, reliability,
              and thoughtful UX. I apply AI in my own creative projects and bring
              those capabilities into approachable, user-first workflows.
            </p>

            <p className="mt-20 font-sans font-light tracking-[0.02em] leading-relaxed text-lg sm:text-xl text-muted-foreground">
              I’m a full-stack software engineer experienced in TypeScript/React,
              Python, and C#. I care about clarity, reliability, and thoughtful UX.
              I apply AI in my own creative projects and bring those capabilities
              into approachable, user-first workflows.
            </p>
          </div>
          </div>

      <Image
        src="/aurora-hyper.jpg"
        alt="Marti portrait"
        width={1200}
        height={800}
        className="mt-12 w-full rounded-lg border"
        priority={false}
      />
    </section>
  );
}
