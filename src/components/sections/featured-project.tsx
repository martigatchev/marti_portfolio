// components/sections/featured-project.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlockButton } from "../ui/block-button";

type Props = {
  eyebrow?: string;
  title: string;
  summary: string;
  bullets?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  imageSrc: string;
  imageAlt: string;
  imageAspect?: "video" | "phone" | "square";
  tilt?: boolean;
  className?: string;
};

// Desktop/tablet aspect helper (mobile is always landscape 16:9)
const mdAspectClass = (a?: Props["imageAspect"]) =>
  a === "phone"
    ? "lg:aspect-[9/16]"
    : a === "square"
    ? "lg:aspect-square"
    : "lg:aspect-video";

// Mobile-first aspect (landscape) + lg override
const responsiveAspect = (a?: Props["imageAspect"]) =>
  `aspect-video ${mdAspectClass(a)}`;

export default function FeaturedProject({
  eyebrow = "Featured Project",
  title,
  summary,
  bullets = [],
  ctaHref = "#",
  ctaLabel = "View Project",
  imageSrc,
  imageAlt,
  imageAspect = "phone",
  tilt = false,
  className = "",
}: Props) {
  return (
    <section id="projects" className={`mx-auto max-w-7xl px-6 ${className}`}>
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr
          overflow-hidden
          ring-4 ring-black rounded-[0.8rem]
          divide-y-4 lg:divide-y-0 lg:divide-x-4 lg:divide-x-reverse
          divide-black
        "
      >
        {/* RIGHT (on desktop), TOP (on mobile): preview panel */}
        <div className="order-1 lg:order-2 bg-white/70 p-6 sm:p-10 lg:h-full lg:flex">
          <div
            className={
              "relative w-full aspect-video lg:aspect-auto lg:h-full max-h-[70vh] lg:max-h-none mx-auto"
            }
          >
            <div
              className={`absolute inset-0 rounded-xl overflow-hidden ring-1 ring-white/30
                          ${tilt ? "rotate-6 origin-[85%_85%]" : ""}`}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 600px, 90vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* LEFT (on desktop), BOTTOM (on mobile): description panel */}
        <div className="order-2 lg:order-1 bg-white/70 h-full p-8 sm:p-12 flex flex-col gap-8">
          <div className="grid gap-4">
            <p className="text-sub uppercase tracking-widest text-xs font-medium text-black/70">
              {eyebrow}
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight text-[var(--c-fg,black)]">
              {title}
            </h3>
            <p className="text-sub sm:text-lg leading-relaxed text-black/85">
              {summary}
            </p>

            {bullets.length > 0 && (
              <ul className="text-sub mt-2 grid gap-2 text-black/90 list-disc pl-5">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-4">
  <Link
    href={ctaHref}
    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
               border-2 border-black text-black
               bg-[#fbefffff] hover:bg-[#CEAED5]
               transition-colors"
  >
    {ctaLabel} <ArrowUpRight className="size-4" />
  </Link>
</div>

        </div>
      </div>

      <div className="mt-12 mb-2 flex justify-center">
        <BlockButton href="/projects" cornerRadius="0.0rem">
          View all projects.
        </BlockButton>
      </div>
    </section>
  );
}
