"use client";

import Link from "next/link";
import React, { useRef } from "react";

type StickyFooterProps = {
  children?: React.ReactNode;
};

/**
 * StickyFooter
 * - Uses a clipped wrapper + sticky positioning so the footer "reveals" naturally.
 */

export default function StickyFooter({ children }: StickyFooterProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="
      relative w-full
      h-[520px] sm:h-[560px] md:h-[640px] lg:h-[420px]
      [clip-path:polygon(0%_0,100%_0,100%_100%,0_100%)]
    "
    >
      {/* Inherit height from parent — no more duplicating values */}
      <div className="fixed inset-x-0 bottom-0 h-[inherit]">
        <FooterSurface ref={contentRef} className="h-full">
          {children}
        </FooterSurface>
      </div>
    </div>
  );
}

const FooterSurface = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className = "", children, ...rest }, ref) => {
  return (
    <footer
      className={[
        // layout
        "h-full w-full box-border",
        // colors
        "bg-[var(--c-black,#0a0a0a)] text-[var(--c-white,#ffffff)]",
        // optional: keep the hairline top border; remove if you want zero line
        "border-t border-black/50",
        // spacing: NO top padding; only side padding; bottom uses safe-area only
        "px-4 pt-0 pb-0",
        // no debug ring / glow
        "ring-0 shadow-none",
        className,
      ].join(" ")}
    >
      {children ?? <DefaultFooterContent />}
    </footer>
  );
});
FooterSurface.displayName = "FooterSurface";

/** Simple default content so it looks good out-of-the-box. Replace freely. */
function DefaultFooterContent() {
  return (
    <div className="h-full grid gap-10 md:grid-cols-3">
      {/* 1) Left: MARTI */}
      <div className="h-full flex items-end overflow-hidden">
        <span
          className="
            font-display uppercase tracking-tightest block leading-none
            text-white 
            text-[22vw] md:text-[10vw] lg:text-[10vw]
            
          "
        >
          MARTI
        </span>
      </div>

      {/* 2) Middle: headline + blurb + CTA (vertically centered, left-aligned) */}
<div className="h-full flex flex-col gap-4 items-start md:justify-center">
  <h2 className="font-display text-2xl md:text-3xl tracking-tight">
    Let’s build something cool.
  </h2>
  <p className="text-sm/6 text-white/70 max-w-prose">
    Portfolio, experiments, and apps by Marti Gatchev. Available for
    junior software engineering roles.
  </p>

  <Link
    href="/contact"
    className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[var(--c-lilac,#a78bfa)] px-4 py-2 font-semibold text-black transition hover:opacity-90"
  >
    Get in touch
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path d="M5 12h11m0 0-4-4m4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </Link>
</div>

      {/* 3) Right: Site / Elsewhere + copyright at bottom-right */}
      <div className="h-full flex flex-col">
        <nav className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="mb-2 font-semibold tracking-wide text-white/80">
              Site
            </h3>
            <ul className="space-y-1">
              <li>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold tracking-wide text-white/80">
              Elsewhere
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  className="hover:underline"
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="hover:underline" href="mailto:hello@example.com">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-auto self-end text-xs text-white/60">
          © {new Date().getFullYear()} Marti Gatchev. All rights reserved.
        </div>
      </div>
    </div>
  );
}
