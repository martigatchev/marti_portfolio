'use client';

import React from 'react';
import Link from 'next/link';
import { Monitor, Atom, Smartphone } from 'lucide-react';
import { BlockButton } from '../ui/block-button';

type Card = {
  icon: React.ReactNode;
  titleTop: string;
  titleBottom?: string;
  techs: string[];
  blurb: string;
};

// Allow CSS custom properties without `any`
type CSSVars = { [key: `--${string}`]: string | number };

const CARDS: Card[] = [
  {
    icon: <Monitor className="size-8 sm:size-10" />,
    titleTop: 'Backend',
    titleBottom: 'Development',
    techs: ['Python', 'C#', 'REST APIs'],
    blurb:
      'API-first services with authentication, testing, and clean, maintainable code.',
  },
  {
    icon: <Atom className="size-8 sm:size-10" />,
    titleTop: 'Frontend',
    titleBottom: 'Development',
    techs: ['React', 'Next.js', 'TypeScript'],
    blurb:
      'Accessible, responsive UI with strong UX fundamentals and component-driven design.',
  },
  {
    icon: <Smartphone className="size-8 sm:size-10" />,
    titleTop: 'iOS',
    titleBottom: 'Development',
    techs: ['Swift', 'SwiftUI'],
    blurb:
      'Native iOS apps with modern SwiftUI patterns, state management, and smooth animations.',
  },
];

function DotList({ items }: { items: string[] }) {
  return (
    <div className="mt-1 text-xl sm:text-2xl font-semibold text-black/90 tracking-wide">
      {items.join(' · ')}
    </div>
  );
}

function ExpertiseCard({ c }: { c: Card }) {
  return (
    <div className="h-full p-8 sm:p-10 bg-white/70 bg-clip-padding">
      <div className="flex items-center gap-8">
        <div className="opacity-90">{c.icon}</div>
        <div className="font-display text-4xl sm:text-4xl font-extrabold text-black">
          <span className="underline decoration-[var(--c-lilac,#a78bfa)] decoration-4 underline-offset-0">
            {c.titleTop}
          </span>
          {c.titleBottom ? (
            <>
              <br />
              {c.titleBottom}
            </>
          ) : null}
          <DotList items={c.techs} />
        </div>
      </div>

      {/* Subtext uses your requested style */}
      <p
        className="
          mt-6 relative
          text-sub text-lg sm:text-xl text-muted-foreground leading-relaxed

          /* space between rule and text = rule width + gap */
          pl-[calc(var(--rule-w,6px)+var(--rule-gap,12px))]

          /* the vertical rule */
          before:content-[''] before:absolute before:left-0 before:inset-y-1
          before:w-[var(--rule-w,6px)]
          before:rounded-[var(--rule-radius,0px)]
          before:bg-[var(--c-lilac,#a78bfa)]
        "
        style={
          {
            '--rule-w': '4px',        // thickness
            '--rule-gap': '36px',     // gap between rule & text
            '--rule-radius': '0px',   // 0px=square, 8px=soft, 9999px=pill
          } as React.CSSProperties
        }
      >
        {c.blurb}
      </p>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="h-full p-8 sm:p-10 bg-lilac/60 flex items-center justify-center text-center">
      <blockquote className="m-0 max-w-3xl">
        <p className="font-display text-2xl sm:text-3xl font-extrabold leading-snug text-black">
          Science is magic that works.
        </p>
        <footer className="mt-3 text-sub text-black/70 text-sm sm:text-base">
          — Kurt Vonnegut, &quot;Cat&apos;s Cradle&quot;
        </footer>
      </blockquote>
    </div>
  );
}


export default function Expertise() {
  // 🔧 All your tweakables in one place (no `any`, type-safe)
  const uiVars: React.CSSProperties & CSSVars = {
    '--corner-r': '0.8rem',     // overall corner rounding (set to 0 for square)
    '--divider-w': '4px',       // divider thickness
    '--divider-color': 'black', // divider color
  };

  return (
    <section
      aria-labelledby="expertise-title"
      className="mx-auto max-w-7xl px-6"
      style={uiVars} // apply on a parent so both ring & grid inherit
    >
      {/* Outer frame sits OUTSIDE the grid so translucency never washes it out */}
      <div className="rounded-[var(--corner-r,0px)] ring-4 ring-black-500">
        {/* Grid */}
        <div
          className="
            relative
            grid auto-rows-fr
            grid-cols-1 md:grid-cols-2 xl:grid-cols-3
            overflow-hidden rounded-[var(--corner-r,0px)]

            /* Mobile (1-col): use native divides between items, variable-driven */
            divide-y-[var(--divider-w,4px)] divide-[var(--divider-color,black)]

            /* From md up we draw lines with a pseudo-element (no double borders) */
            md:divide-y-0 md:divide-x-0
            md:before:content-[''] md:before:absolute md:before:inset-0
            md:before:pointer-events-none md:before:rounded-[var(--corner-r,0px)] md:before:bg-no-repeat

            /* md (2x2): one vertical at 50%, one horizontal at 50% */
            md:before:bg-[linear-gradient(var(--divider-color,black)),linear-gradient(var(--divider-color,black))]
            md:before:[background-size:var(--divider-w,4px)_100%,100%_var(--divider-w,4px)]
            md:before:[background-position:50%_0,0_50%]

            /* xl (3 across): two verticals at 33.333% and 66.666%; no horizontal */
            xl:before:bg-[linear-gradient(var(--divider-color,black)),linear-gradient(var(--divider-color,black))]
            xl:before:[background-size:var(--divider-w,4px)_100%,var(--divider-w,4px)_100%]
            xl:before:[background-position:33.333%_0,66.666%_0]
          "
        >
          <ExpertiseCard c={CARDS[0]} />
          <ExpertiseCard c={CARDS[1]} />
          <ExpertiseCard c={CARDS[2]} />
          <div className="xl:hidden">
            <QuoteCard />
          </div>
        </div>
      </div>

      {/* CTA below grid */}
      <div className="mt-20 mb-2 flex justify-center">
  <BlockButton href="/resume" cornerRadius="0.0rem">
  Download Resume.
</BlockButton>
</div>
    </section>
  );
}
