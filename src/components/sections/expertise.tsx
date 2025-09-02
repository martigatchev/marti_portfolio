'use client';

import { Monitor, Atom, Smartphone } from 'lucide-react';

type Card = {
  icon: React.ReactNode;
  titleTop: string;
  titleBottom: string;
  underlineClass: string;
  blurb: string;
};

const CARDS: Card[] = [
  {
    icon: <Monitor className="size-8 sm:size-10" />,
    titleTop: 'Software',
    titleBottom: 'Development',
    underlineClass: 'decoration-pink-500',
    blurb:
      'Experienced in both functional and OOP: Dart, Python, Java, JavaScript, TypeScript.',
  },
  {
    icon: <Atom className="size-8 sm:size-10" />,
    titleTop: 'Frontend Dev',
    titleBottom: 'React, NextJS',
    underlineClass: 'decoration-blue-500',
    blurb:
      'Passionate about UI/UX. Over 5 years of development experience in HTML, CSS, JS, React and NextJS.',
  },
  {
    icon: <Smartphone className="size-8 sm:size-10" />,
    titleTop: 'Flutter Dev',
    titleBottom: 'Android, iOS',
    underlineClass: 'decoration-orange-500',
    blurb:
      'Hybrid mobile apps and cross-platform solutions using the Flutter framework.',
  },
];

function ExpertiseCard({ c }: { c: Card }) {
  return (
    <div className="h-full p-8 sm:p-10 bg-white/20">
      <div className="flex items-start gap-4">
        <div className="opacity-90">{c.icon}</div>
        <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-black">
          <span className={`underline underline-offset-[10px] decoration-4 ${c.underlineClass}`}>
            {c.titleTop}
          </span>
          <br />
          {c.titleBottom}
        </h3>
      </div>

      <div className="mt-6 text-sm text-black/80">
        <span className="block text-black/50 text-xs">&lt;h3&gt;</span>
        <p className="mt-2 border-l border-white/30 pl-4 leading-relaxed">
          {c.blurb}
        </p>
        <span className="mt-2 block text-black/50 text-xs">&lt;/h3&gt;</span>
      </div>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="h-full p-8 sm:p-10 bg-sky-400/20 flex">
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
