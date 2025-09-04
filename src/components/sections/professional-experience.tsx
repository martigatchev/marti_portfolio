"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, MapPin, ExternalLink, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlockButton } from "../ui/block-button";

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

type CSSVars = { [key: `--${string}`]: string };

/* ============ Small pill tag ============ */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-black/85 border-2 border-black"
      style={{ backgroundColor: "var(--p5-55)" }}
    >
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
      {/* HEADER: title left (truncates), icon right (no box) */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full max-w-full min-w-0 overflow-hidden
                    flex items-center gap-3 sm:gap-4
                    px-4 sm:px-6 py-4 sm:py-5
                    text-left transition-colors duration-300
                    outline-none focus-visible:ring-2 focus-visible:ring-[var(--p4)] focus-visible:ring-offset-0
                    rounded-[0.8rem]
    border-4 border-black
                    
          ${open ? "bg-[var(--p5)] text-[var(--p0)]" : "bg-[var(--p6)] text-[var(--p0)] hover:bg-[var(--p5)]"}`}
        aria-expanded={open}
      >
        <div className="flex-1 basis-0 min-w-0">
          {/* Role uses display font; company remains body font */}
          <div className="truncate text-sub sm:text-lg leading-relaxed text-black/85">
            <span className="font-display sm:text-lg md:text-2xl font-bold">{item.role}</span>
            <span className="mx-2 font-display text-xl">@</span>
            <span className="font-display sm:text-md md:text-xl">{item.company}</span>
          </div>
        </div>

        {/* Just the + / − character, no surrounding box */}
        <motion.span
          className="ml-2 shrink-0"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-hidden
        >
          {open ? <Minus className="size-5 sm:size-6" /> : <Plus className="size-5 sm:size-6" />}
        </motion.span>
      </button>

      {/* DETAILS */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
  className="
    mt-3
    overflow-hidden
    rounded-[0.8rem]
    border-4 border-black
    px-4 sm:px-6 py-6
    text-sub sm:text-lg leading-relaxed text-black/85
  "
  style={{
    background:
      "linear-gradient(360deg, var(--p6-15) 0%, var(--p5-25) 100%), rgba(255, 255, 255, 0.6)",
  }}
>
              {/* 2/3 (left text) + 1/3 (right logo) */}
              <div className="grid gap-6 md:gap-10 md:grid-cols-3 md:items-start">
                {/* Left: spans 2/3 */}
                <div className="grid gap-4 min-w-0 md:col-span-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-4 opacity-80" /> {item.location}
                      </span>
                    )}
                    {item.companyUrl && (
                      <Link
                        href={item.companyUrl}
                        target="_blank"
                        className="font-bold inline-flex items-center gap-1 hover:underline max-w-full truncate"
                      >
                        <ExternalLink className="size-4 opacity-80" />
                        {item.companyUrl.replace(/^https?:\/\//, "")}
                      </Link>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-4 opacity-80" /> {item.start} – {item.end}
                    </span>
                  </div>

                  <p>{item.summary}</p>

                  {item.bullets?.length ? (
                    <ul className="list-disc pl-5 grid gap-2">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}

                  {item.tags?.length ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((t, i) => (
                        <Tag key={i}>{t}</Tag>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Right: spans 1/3, square logo aligned to the right (no divider) */}
                <div className="hidden md:flex md:col-span-1 md:pl-8 md:justify-end">
                  {item.logoSrc && (
                    <div className="relative w-full max-w-[340px] min-w-[220px] aspect-square rounded-xl overflow-hidden ">
                      <Image
                        src={item.logoSrc}
                        alt={`${item.company} logo`}
                        fill
                        className="object-contain p-6 scale-90 [filter:grayscale(50%)]"
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
      className={` relative isolate mx-auto w-full max-w-7xl px-4 sm:px-6 overflow-x-clip ${className}`}
      aria-labelledby="experience-title"
      style={paletteVars}
    >
      {/* No outer borders; per-row borders handled inside */}
      <ul className="w-full list-none p-0 m-0 overflow-x-clip">
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

      <div className="mt-8 flex justify-center">
        <BlockButton href="/resume" cornerRadius="0.0rem">
          View Resume.
        </BlockButton>
      </div>
    </section>
  );
}

/* ============ Example data ============ */
const DEFAULT_ITEMS: ExperienceItem[] = [
  {
    role: "Software Engineer • Co-op",
    company: "CubicFarms Systems",
    companyUrl: "https://cubicfarms.com",
    location: "Langley, Canada (Remote)",
    start: "2022",
    end: "2022",
    summary:
      "Led a cross-functional team building customer-facing web apps and internal tooling. Owned architecture, reviews, and delivery cadence with a focus on DX and reliability.",
    bullets: [
      "Scoped and shipped 20+ features across 5 products",
      "Cut build times 45% with incremental bundling and caching",
      "Introduced typed API clients and contract tests",
    ],
    tags: ["C#", ".NET", "Docker", "Azure DevOps", "Rest APIs", "Git"],
    logoSrc: "/CubicFarms_Logo.jpg",
  },
  {
    role: "Lead Software Developer",
    company: "Risings Education",
    companyUrl: "https://risingsedu.com",
    location: "Vancouver, Canada (Remote)",
    start: "2018",
    end: "2019",
    summary:
      "Developed the UI/UX ecosystem for a conference event platform using modular component structures with JS, SCSS, and Gulp on Node.",
    tags: ["JS", "SCSS", "Gulp", "Node.js"],
    bullets: [
      "Scoped and shipped 20+ features across 5 products",
      "Cut build times 45% with incremental bundling and caching",
      "Introduced typed API clients and contract tests",
    ],
    logoSrc: "/RisingsEducation_Logo.png",
  },
];
