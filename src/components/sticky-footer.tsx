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
      h-[360px] sm:h-[360px] md:h-[360px] lg:h-[320px] xl:h-[360px]
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
    <div className="h-full">
      {/* MD & below (new layout) */}
      <div className="relative h-full flex flex-col lg:hidden">
        {/* lilac square top-left */}
        <div className="absolute top-4 left-4 size-16 md:size-20 bg-[#CEAED5] border border-black/40" />

        {/* centered tagline + links */}
        <div className="pt-8 md:pt-10 text-center space-y-2">
          <p className="text-white/70">
            Available for junior software engineering roles.
          </p>
          <div
            className="
              font-display uppercase tracking-tightest leading-none text-white
              text-4xl sm:text-5xl md:text-6xl
            "
          >
            <Link href="https://github.com/" className="hover:opacity-90">GITHUB</Link>
            <span className="px-3">•</span>
            <Link href="https://www.linkedin.com/" className="hover:opacity-90">LINKEDIN</Link>
          </div>
        </div>

        {/* bottom: big name + © aligned on baseline */}
        <div className="mt-auto flex items-baseline justify-between overflow-hidden">
          <span
            className="
              font-display uppercase tracking-tightest leading-none whitespace-nowrap
              text-white
              text-6xl md:text-10xl translate-y-[0.04em]
            "
          >
            MARTI GATCHEV
          </span>
          <span className="ml-3 text-xs text-white/60">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* LG & up (previous desktop layout) */}
      <div className="hidden lg:grid h-full lg:grid-cols-[3fr_1fr]">
        {/* LEFT: big name + © aligned on same baseline */}
        <div className="h-full flex items-end overflow-hidden">
          <div className="flex items-baseline gap-2 translate-y-[0.04em]">
            <span
              className="
                font-display uppercase tracking-tightest leading-none whitespace-nowrap
                text-white
                lg:text-9xl xl:text-10xl
                
              "
            >
              MARTI GATCHEV
            </span>
            <span className="text-xs text-white/60">© {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* RIGHT: square top-right + bottom-right links */}
        <div className="relative h-full">
          <div className="absolute top-4 right-0 size-20 xl:size-24 bg-[#CEAED5] border border-black/40" />
          <div className="absolute right-4 bottom-4 text-right space-y-1">
            <p className="text-white/70 leading-tight lg:text-sm xl:text-sm">
              Available for junior software engineering roles.
            </p>
            <div className="font-display uppercase tracking-tightest leading-none text-white text-6xl xl:text-7xl">
  <Link
    href="https://github.com/"
    className="transition-colors hover:text-[#CEAED5] focus-visible:text-[#CEAED5]"
  >
    GITHUB
  </Link>
  <span className="px-3">•</span>
  <Link
    href="https://www.linkedin.com/"
    className="transition-colors hover:text-[#CEAED5] focus-visible:text-[#CEAED5]"
  >
    LINKEDIN
  </Link>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

