import type { Metadata } from "next";

export type ProjectRecord = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  description: string[];
  tags: string[];
  status?: "coming-soon";
  coverImage: {
    src: string;
    alt: string;
  };
  hero?: {
    eyebrow?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  metadata?: Partial<Metadata>;
  timeline?: string;
  role?: string[];
  responsibilities?: string[];
  tools?: string[];
  outcomes?: string[];
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
};

export const projects: ProjectRecord[] = [
  {
    slug: "vosynia",
    title: "Vosynia",
    subtitle: "Living Worldbook",
    summary:
      "A living worldbook for a TTRPG setting—atlas, leaders, cultures, and creatures—built for fast onboarding and deep immersion.",
    description: [
      "Vosynia started as a giant folder of notes and sketches. I turned it into a searchable worldbook that keeps the table plugged in between sessions.",
      "The app stitches together fast exploration on the surface with deeper dives into lore. Everything is editable, versioned, and ready for AI assisted lookups.",
    ],
    tags: ["React", "TypeScript", "Chakra UI", "AWS", "OpenAI API", "Midjourney"],
    coverImage: {
      src: "/aurora-hyper.jpg",
      alt: "Vosynia project preview",
    },
    hero: {
      eyebrow: "Worldbuilding Platform",
      ctaLabel: "Open build",
      ctaHref: "/projects/vosynia",
    },
    timeline: "2023 — Present",
    role: ["Product, design, and full-stack dev"],
    responsibilities: [
      "Architected content models for atlas, leaders, factions, and timelines.",
      "Built a generative search assistant with OpenAI function calling.",
      "Designed component-driven UI with glass blocks and floating badges.",
    ],
    tools: [],
    outcomes: [
      "Sessions prep time dropped from hours to minutes with structured lore.",
      "Players stay immersed between games thanks to mobile-first content cards.",
      "AI assistant fields setting questions with grounded retrieval results.",
    ],
    gallery: [
      {
        src: "/aurora-hyper.jpg",
        alt: "Lore cards and faction overview",
        caption: "Cards keep factions, locations, and quests consistent across sessions.",
      },
      {
        src: "/aurora-hyper.jpg",
        alt: "Interactive map view",
        caption: "Map annotations jump players straight into relevant lore entries.",
      },
    ],
  },
  {
    slug: "writing-assistant",
    title: "Writing Assistant",
    subtitle: "AI Writing Workbench",
    summary:
      "OpenAI-powered writing flows with function calling, streaming UIs, and prompt evals to improve output quality.",
    description: [
      "I built an internal workbench for editorial teams experimenting with AI generated content. The goal: shorten iteration loops without losing tone or accuracy.",
      "The assistant orchestrates prompt templates, fact checks with retrieval, and delivers drafts in structured blocks editors can remix.",
    ],
    tags: ["Next.js", "FastAPI", "RAG", "pgvector"],
    coverImage: {
      src: "/aurora-hyper.jpg",
      alt: "Writing assistant preview",
    },
    hero: {
      eyebrow: "AI Workflow",
      ctaLabel: "Explore workflow",
      ctaHref: "/projects/writing-assistant",
    },
    timeline: "2022 — 2023",
    role: ["Full-stack engineer"],
    responsibilities: [
      "Designed streaming UI for token-by-token drafts with editor controls.",
      "Implemented retrieval augmented generation pipeline with pgvector.",
      "Built experiment tracking to compare prompt and model performance.",
    ],
    tools: ["Next.js", "FastAPI", "PostgreSQL", "OpenAI", "LangChain"],
    outcomes: [
      "Editors cut draft turnaround time by 55% with structured workflows.",
      "Prompt eval dashboard highlighted best-performing prompt/setting combos.",
      "Safeguards reduced hallucinations by gating responses through fact checks.",
    ],
    gallery: [
      {
        src: "/aurora-hyper.jpg",
        alt: "Draft generation UI",
        caption: "Streaming output keeps editors in the loop while the model writes.",
      },
      {
        src: "/aurora-hyper.jpg",
        alt: "Prompt evaluation dashboard",
        caption: "Evaluation view compares drafts across models and temperatures.",
      },
    ],
  },
  // {
  //   slug: "portfolio-platform",
  //   title: "Portfolio Platform",
  //   subtitle: "Personal Site Infrastructure",
  //   summary:
  //     "This site—component-driven design, glass blocks, animations, and a tidy App Router setup.",
  //   description: [
  //     "I use my own portfolio as a playground for design systems, motion, and tooling experiments.",
  //     "The platform stitches together reusable sections, rich motion primitives, and theme-preserving glass surfaces.",
  //   ],
  //   tags: ["Next.js", "Tailwind", "Framer Motion"],
  //   coverImage: {
  //     src: "/aurora-hyper.jpg",
  //     alt: "Portfolio platform preview",
  //   },
  //   hero: {
  //     eyebrow: "Design System",
  //     ctaLabel: "View live site",
  //     ctaHref: "/",
  //   },
  //   timeline: "2021 — Present",
  //   role: ["Design, frontend engineering"],
  //   responsibilities: [
  //     "Built a growing component library for sections, cards, and utilities.",
  //     "Implemented motion primitives with Framer Motion and Intersection Observer.",
  //     "Established dark/light friendly glassmorphism palette with CSS variables.",
  //   ],
  //   tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  //   outcomes: [
  //     "New sections ship faster thanks to composable layout utilities.",
  //     "Animations stay consistent across pages with one motion primitive.",
  //     "Marketing pages stay performant with image optimization and lazy motion.",
  //   ],
  //   gallery: [
  //     {
  //       src: "/aurora-hyper.jpg",
  //       alt: "Page frame grid overlay",
  //       caption: "PageFrame overlay keeps spacing consistent across sections.",
  //     },
  //     {
  //       src: "/aurora-hyper.jpg",
  //       alt: "Glass block components",
  //       caption: "Glass blocks reuse the shared palette variables defined per page.",
  //     },
  //   ],
  // },
  {
    slug: "hiking-app",
    title: "Baro-Hiking • iOS App",
    subtitle: "Outdoor Exploration",
    summary:
      "An iOS mobile app for ultra-accurate tracking of elevation gains while hiking, utilizing iPhone's built in barometer.",
    tags: ["Swift", "SwiftUI", "CoreLocation", "CoreMotion"],
    description: [
      "A pocket-sized loop machine with draggable tracks, instant recording, and playful themes.",
    ],
    status: "coming-soon",
    coverImage: {
      src: "/aurora-hyper.jpg",
      alt: "iOS audio app preview",
    },
    hero: {
      eyebrow: "Mobile",
    },
  },
  // {
  //   slug: "data-tools",
  //   title: "Data Tools",
  //   subtitle: "Automation Suite",
  //   summary:
  //     "Internal tools for data cleanup, batch processing, and quick visual checks.",
  //   tags: ["Python", "Pandas"],
  //   description: [
  //     "A grab-bag of CLI and web tools built to tame messy CSVs, schedule cleanups, and surface issues fast.",
  //   ],
  //   status: "coming-soon",
  //   coverImage: {
  //     src: "/aurora-hyper.jpg",
  //     alt: "Data tools preview",
  //   },
  //   hero: {
  //     eyebrow: "Automation",
  //   },
  // },
  // {
  //   slug: "mini-games",
  //   title: "Mini Games",
  //   subtitle: "Interaction Experiments",
  //   summary:
  //     "Tiny prototypes to explore interactions and micro-animations.",
  //   tags: ["React", "Canvas"],
  //   description: [
  //     "A rotating set of micro-games for testing ideas around physics, easing, and haptics.",
  //   ],
  //   status: "coming-soon",
  //   coverImage: {
  //     src: "/aurora-hyper.jpg",
  //     alt: "Mini games preview",
  //   },
  //   hero: {
  //     eyebrow: "Playground",
  //   },
  // },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
