'use client';

import { Monitor, Atom, Smartphone } from 'lucide-react';

type Card = {
  icon: React.ReactNode;
  titleTop: string;
  titleBottom?: string;
  techs: string[];         // array -> renders as dot-separated chips
  blurb: string;
};

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
    <div className="mt-1 text-lg sm:text-xl font-semibold text-black/90 tracking-wide">
      {items.join(' · ')}
    </div>
  );
}

function ExpertiseCard({ c }: { c: Card }) {
  return (
    <div className="h-full p-8 sm:p-10 bg-white/70">
      <div className="flex items-center gap-4">
        <div className="opacity-90">{c.icon}</div>
        <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-black">
          <span className="underline decoration-[var(--c-lilac,#a78bfa)] decoration-4 underline-offset-0">
            {c.titleTop}
          </span>
          {c.titleBottom ? <><br />{c.titleBottom}</> : null}
          <DotList items={c.techs} />
        </div>
      </div>

      <div className="mt-6 text-sm text-black/80">
        <p className="mt-2 border-l border-white/30 pl-4 leading-relaxed">
          {c.blurb}
        </p>
      </div>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="h-full p-8 sm:p-10 bg-sky-400/70 flex">
      <blockquote className="m-0 grid gap-4">
        <div className="flex gap-4">
          <div className="w-1 rounded-full bg-[var(--c-lilac,#a78bfa)]" />
          <p className="text-2xl sm:text-3xl font-extrabold leading-snug text-black">
            Sometimes the best way<br />
            to solve a problem is to<br />
            help others.
          </p>
        </div>
        <footer className="text-black/70 text-sm">— Uncle Iroh, ‘Avatar’</footer>
      </blockquote>
    </div>
  );
}

export default function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-6">
      

      {/* Outer orange frame + orange separators BETWEEN cards */}
      <div
  className="
    grid auto-rows-fr
    grid-cols-1 md:grid-cols-2 xl:grid-cols-3
    overflow-hidden rounded-xl
    ring-2 ring-orange-500 ring-inset            /* outer frame */

    divide-y-2 divide-orange-500                 /* mobile: vertical stack -> horizontal lines */
    md:divide-x-2 md:divide-y-2                  /* md-lg: 2x2 -> BOTH directions */
    xl:divide-y-0                                /* xl: 3-across -> only vertical lines */
  "
>
  <ExpertiseCard c={CARDS[0]} />
  <ExpertiseCard c={CARDS[1]} />
  <ExpertiseCard c={CARDS[2]} />
  <div className="xl:hidden">
    <QuoteCard />
  </div>
</div>
    </section>
  );
}
