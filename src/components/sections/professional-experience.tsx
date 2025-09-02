"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, MapPin, ExternalLink, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ============ Types ============ */
export type ExperienceItem = {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
  logoSrc?: string;
};

export type ExperienceProps = {
  title?: string;
  items?: ExperienceItem[];
  resumeHref?: string;
  className?: string;
  accordion?: boolean;
  defaultOpenIndex?: number | null;
};

/* ============ Small pill tag ============ */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-white/10 text-white/90 ring-1 ring-white/15">
      {children}
    </span>
  );
}

/* ============ One row ============ */
function ExperienceRow({
  item,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.li
      layout="position"
      initial={false}
      className="w-full max-w-full py-3 overflow-x-clip [contain:layout_paint]"
      style={{ boxSizing: "border-box" }}
    >
      {/* HEADER: title left (truncates), button right */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full max-w-full min-w-0 overflow-hidden
                    flex items-center gap-3 sm:gap-4
                    px-4 sm:px-6 py-4 sm:py-5
                    text-left rounded-lg transition-colors duration-300
                    outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0
          ${open ? "bg-[var(--c-lilac,#a78bfa)] text-black" : "bg-violet-700 text-white hover:bg-violet-600"}`}
        aria-expanded={open}
      >
        {/* LEFT: the only flexible area */}
        <div className="flex-1 basis-0 min-w-0">
          {/* make tiny for debugging; change to text-base/sm:text-lg later */}
          <div className="truncate text-[12px] sm:text-base">
            <span className="font-bold">{item.role}</span>
            <span className="mx-1">@</span>
            <span className="font-semibold">{item.company}</span>
          </div>
        </div>

        {/* RIGHT: the toggle button, pinned to the edge */}
        <motion.div
          className="ml-2 shrink-0 grid place-items-center size-7 rounded-md bg-black/10"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </motion.div>
      </button>

      {/* DETAILS: unchanged (you can keep dates here if you want) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl ring-1 ring-white/15 bg-sky-400/20 px-4 sm:px-6 py-6">
              <div className="grid gap-6 md:grid-cols-[1fr,240px] md:items-start">
                {/* Left: meta + text */}
                <div className="grid gap-4 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/85">
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-4 opacity-80" /> {item.location}
                      </span>
                    )}
                    {item.companyUrl && (
                      <Link
                        href={item.companyUrl}
                        target="_blank"
                        className="inline-flex items-center gap-1 hover:underline max-w-full truncate"
                      >
                        <ExternalLink className="size-4 opacity-80" />
                        {item.companyUrl.replace(/^https?:\/\//, "")}
                      </Link>
                    )}
                    {/* keep dates inside the details if you like */}
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-4 opacity-80" /> {item.start} – {item.end}
                    </span>
                  </div>

                  <p className="leading-relaxed text-white/90">{item.summary}</p>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="list-disc pl-5 grid gap-2 text-white/90">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((t, i) => (
                        <Tag key={i}>{t}</Tag>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: logo / image (only at md+) */}
                <div className="hidden md:flex justify-end">
                  {item.logoSrc && (
                    <div className="relative w-48 h-24 rounded-lg overflow-hidden ring-1 ring-white/20 bg-white/5">
                      <Image
                        src={item.logoSrc}
                        alt={`${item.company} logo`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/* ============ Main Section ============ */
export default function ExperienceSection({
  title = "Professional Experience",
  items = DEFAULT_ITEMS,
  resumeHref = "/resume.pdf",
  className = "",
  accordion = true,
  defaultOpenIndex = null,
}: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    accordion && typeof defaultOpenIndex === "number" ? defaultOpenIndex : null
  );

  return (
    <section
      className={`relative isolate mx-auto w-full max-w-7xl px-4 sm:px-6 overflow-x-clip ${className}`}
      aria-labelledby="experience-title"
    >
      {/* Outer orange frame + separators between rows */}
      <div className="w-full overflow-hidden rounded-xl ring-2 ring-orange-500 ring-inset">
        <ul className="w-full list-none p-0 m-0 divide-y-2 divide-orange-500 overflow-x-clip">
          {items.map((it, idx) => (
            <ExperienceRow
              key={idx}
              item={it}
              open={accordion ? openIndex === idx : false}
              onToggle={() =>
                accordion && setOpenIndex((prev) => (prev === idx ? null : idx))
              }
            />
          ))}
        </ul>
      </div>

      {resumeHref && (
        <div className="mt-8 flex justify-center">
          <Link
            href={resumeHref}
            target="_blank"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold bg-[var(--c-lilac,#a78bfa)] text-black hover:opacity-90 transition"
          >
            Download Resume
          </Link>
        </div>
      )}
    </section>
  );
}

/* ============ Example data ============ */
const DEFAULT_ITEMS: ExperienceItem[] = [
  {
    role: "Co-Founder",
    company: "Life Coach Elevate",
    companyUrl: "https://lifecoachelevate.com",
    location: "Arizona, USA",
    start: "2024",
    end: "Present",
    summary:
      "Co-founded Life Coach Elevate, managing end-to-end technical infrastructure (server architecture, CI/CD), and leading web dev/design efforts to optimize scalability and performance.",
    tags: ["DevOps", "CI/CD", "Kubernetes", "JS/TS", "NextJS"],
    logoSrc: "/logos/lce.png",
  },
  {
    role: "Senior Lead Software Engineer",
    company: "Saimon Global Ltd",
    location: "Remote",
    start: "2019",
    end: "2024",
    summary:
      "Led a cross-functional team building customer-facing web apps and internal tooling. Owned architecture, reviews, and delivery cadence with a focus on DX and reliability.",
    bullets: [
      "Scoped and shipped 20+ features across 5 products",
      "Cut build times 45% with incremental bundling and caching",
      "Introduced typed API clients and contract tests",
    ],
    tags: ["React", "TypeScript", "Node.js", "Postgres"],
    logoSrc: "/logos/saimon.png",
  },
  {
    role: "Web Developer",
    company: "influenceTHIS Canada",
    location: "Toronto, Canada (Remote)",
    start: "2018",
    end: "2019",
    summary:
      "Developed the UI/UX ecosystem for a conference event platform using modular component structures with JS, SCSS, and Gulp on Node.",
    tags: ["JS", "SCSS", "Gulp", "Node.js"],
    logoSrc: "/logos/influencethis.png",
  },
];
