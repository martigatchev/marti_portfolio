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
      h-[360px] max-sm:h-[240px] sm:h-[320px] md:h-[280px] lg:h-[320px] xl:h-[360px]
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
  React.ComponentPropsWithoutRef<"div">
>(({ className = "", children, ...rest }, ref) => {
  return (
    <footer
      ref={ref}
      {...rest}
      className={[
        "h-full w-full box-border",
        "bg-[var(--c-black,#0a0a0a)] text-[var(--c-white,#ffffff)]",
        "border-t border-black/50",
        "px-4 pt-0 pb-0",
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
     {/* MD & below (right-aligned, square + links aligned) */}
<div className="relative h-full flex flex-col lg:hidden">
  <div className="grid grid-cols-[auto_1fr] items-end md:items-center gap-x-4 pt-4">
    {/* square */}
    <div className="relative h-14 w-14 sm:h-20 sm:w-20 md:h-20 md:w-20">
      <div className="absolute inset-0 bg-[#CEAED5] border border-black/40" />
    </div>

    {/* right side */}
    <div className="w-full flex flex-col items-end text-right">
  {/* tagline: only ≥ sm */}
  {/* <p className="hidden md:block text-sub text-white/70 text-sm">
    Available for junior software engineering roles.
  </p> */}

  {/* links row: match square height + bottom-align */}
  <div className="h-16 md:h-20 flex items-end justify-end self-end ">
    <div
      className="
        font-display uppercase tracking-tightest text-white
        text-[3rem] sm:text-[4rem] md:text-[5rem]   /* 64px = h-16, 80px = md:h-20 */
        leading-[0.85]               /* tighten line box so bottom sits flush */
        mr-[-1px]                    /* tiny visual nudge to align with the V */
      "
    >
      <Link href="https://github.com/martigatchev" className="transition-colors hover:text-[#CEAED5] focus-visible:text-[#CEAED5]">
        GITHUB
      </Link>
      <span className="px-3">•</span>
      <Link href="https://www.linkedin.com/in/mgatchev/" className="transition-colors hover:text-[#CEAED5] focus-visible:text-[#CEAED5]">
        LINKEDIN
      </Link>
    </div>
  </div>
</div>
  </div>

  {/* bottom name unchanged */}
  <div className="mt-auto">
    <div className="relative ml-auto w-max leading-none">
      <span className="block text-right font-display uppercase tracking-tightest leading-none whitespace-nowrap text-white text-[22vw] md:text-[14vw]">
        MARTI GATCHEV
      </span>
      <span className="absolute right-0 bottom-[calc(100%+0.25rem)] text-xs text-white/60">
        © {new Date().getFullYear()}
      </span>
    </div>
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
            <span className="text-xs text-white/60 text-sub">© {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* RIGHT: square top-right + bottom-right links */}
        <div className="relative h-full">
          <div className="absolute top-4 right-0 size-20 xl:size-24 bg-[#CEAED5] border border-black/40" />
          <div className="absolute right-4 bottom-4 text-right space-y-1">
            <p className="text-white/70 leading-tight text-sub lg:text-xs xl:text-sm">
              Available for junior software engineering roles.
            </p>
            <div className="font-display uppercase tracking-tightest leading-none text-white text-6xl xl:text-7xl">
  <Link
    href="https://github.com/martigatchev"
    className="transition-colors hover:text-[#CEAED5] focus-visible:text-[#CEAED5]"
  >
    GITHUB
  </Link>
  <span className="px-3">•</span>
  <Link
    href="https://www.linkedin.com/in/mgatchev/"
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

