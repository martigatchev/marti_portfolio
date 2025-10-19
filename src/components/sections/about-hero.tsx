// components/sections/about-hero.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimateOnView } from "@/components/ui/animate-on-view";
import {
  Github,
  Linkedin,
  FileText,
  Sparkles,
  Cog,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

/* Smooth, symmetric float */
function Floaty({
  children,
  className = "",
  delay = 0,
  ampY = 12,
  ampX = 2,
  duration = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  ampY?: number;
  ampX?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-ampY, ampY], x: [-ampX, ampX] }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: duration * 1.15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 0.2,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutHero() {
  return (
    // Section width knob
    <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
      {/* Desktop-only translucent frame (hidden on mobile by using sm: utilities) */}
      <div
        className="
          sm:ring-4 sm:ring-black sm:rounded-[0.8rem]
          sm:px-6 sm:py-8 sm:bg-clip-padding
          sm:[background:linear-gradient(360deg,var(--p6-15)_0%,var(--p5-25)_100%),rgba(255,255,255,0.6)]
        "
      >
        {/* One grid; slightly tighter gaps */}
        <div className="grid gap-y-8 gap-x-6 md:grid-cols-12 md:items-center lg:gap-x-8">
          {/* Image FIRST on mobile, RIGHT on desktop */}
          <AnimateOnView
            as="div"
            preset="fadeUp"
            delay={0.06}
            amount={0.2}
            className="order-1 md:order-2 md:col-span-5 md:pr-8 lg:pr-12"
          >
            {/* Portrait size caps */}
            <div className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px]">
              <div className="absolute inset-0 grid place-items-center rounded-full border-4 border-black bg-white">
                <Image
                  src="/aurora-hyper.jpg"
                  alt="Marti portrait"
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 768px) 320px, (min-width: 640px) 280px, 85vw"
                  className="object-cover rounded-full"
                />
              </div>

              {/* Floaties */}
              <Floaty
                className="absolute -top-0 left-3 sm:left-6"
                delay={0.2}
                ampY={10}
                ampX={2}
                duration={6}
              >
                <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#fbefffff] px-2.5 py-1 text-xs font-semibold">
                  <Sparkles className="size-3.5" /> AI
                </span>
              </Floaty>
              <Floaty
                className="absolute top-8 -right-3 sm:-right-6"
                delay={0.4}
                ampY={10}
                ampX={3}
                duration={5.5}
              >
                <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#fbefffff] px-2.5 py-1 text-xs font-semibold">
                  <Cog className="size-3.5" /> Backend
                </span>
              </Floaty>
              <Floaty
                className="absolute -bottom-3 right-6"
                delay={0.25}
                ampY={12}
                ampX={2}
                duration={6.5}
              >
                <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#fbefffff] px-2.5 py-1 text-xs font-semibold">
                  <Palette className="size-3.5" /> Frontend
                </span>
              </Floaty>
            </div>
          </AnimateOnView>

          {/* Text SECOND on mobile, LEFT on desktop */}
          <AnimateOnView
            as="div"
            preset="fadeUp"
            amount={0.2}
            className="order-2 md:order-1 text-center md:text-left md:col-span-7 md:pl-8 lg:pl-12"
          >
            <div className="space-y-3">
              <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight">
                Marti Gatchev
              </h2>
              <p className="text-sub text-base sm:text-lg uppercase tracking-wide text-black/80">
                Full-Stack Engineer
              </p>

              <p className="mt-2 text-sub text-lg sm:text-xl text-black/85">
                I ship small, useful features fast—clean React/Next.js on the
                front, practical Python for AI integrations and automation. I
                focus on AI that actually helps people: tool-calling, retrieval,
                and human-in-the-loop flows that turn ideas into real product
                value.
              </p>

              <AnimateOnView as="div" preset="slideLeft">
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  href="https://github.com/yourprofile"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
                >
                  <Github className="size-4" />
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/yourprofile"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold border-2 border-black text-black bg-[#fbefffff] hover:bg-[#CEAED5] transition-colors"
                >
                  <FileText className="size-4" />
                  View Resume
                </Link>
              </div>
              </AnimateOnView>
            </div>
          </AnimateOnView>

          {/* About Me — spans both columns */}
          <AnimateOnView
            as="div"
            preset="fadeUp"
            delay={0.08}
            amount={0.2}
            className="order-3 md:col-span-12 text-center md:text-left md:px-8 lg:px-12"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              About Me
            </h3>
            <div className="w-full space-y-4 text-sub text-base sm:text-lg leading-relaxed text-black/85">
              <p>
                I’m a full-stack engineer who likes turning fuzzy ideas into
                dependable software. On the front end I build with React/Next.js
                + TypeScript. For AI and automation I work in Python—integrating
                LLMs, calling tools, and wiring up simple services and scripts
                that support the product. I care about readable code, small
                iterations, and getting real feedback early.
              </p>
              <p>
                I’m especially interested in human-centered AI: features that
                assist rather than replace. That means function calling,
                retrieval (pgvector/Postgres), and basic guardrails/evals so the
                output is reliable and worth using. If a feature doesn’t beat
                “just use ChatGPT,” I rework the spec until it does.{" "}
              </p>
              <p>
                Before engineering I worked in marketing for live events,
                collaborating closely with product teams. That background keeps
                me focused on users, clear outcomes, and shipping things people
                actually adopt.
              </p>
              <p>
                I also like to prototype end-to-end ideas. Recently I built Vosynia, a worldbuilding project that orchestrates OpenAI with automated image generation (Midjourney via Selenium), which taught me a lot about stitching tools together responsibly. I’m also tinkering with a small iOS hiking app that uses the phone’s barometer for accurate elevation tracking.
              </p>
              <p>
                Outside of code, I make music and photography, and I read a lot of history and philosophy—those loops in sound, images, and ideas keep my taste sharp and shape how I think about interfaces, narrative, and problem-solving.
              </p>
              <p>
                If you’re building products that use AI to solve real
                problems—and care about thoughtful UX and maintainable
                systems—I’d love to contribute.
              </p>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </div>
  );
}
