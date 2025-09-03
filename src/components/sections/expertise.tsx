'use client';

import { Monitor, Atom, Smartphone } from 'lucide-react';

type Card = {
  icon: React.ReactNode;
  titleTop: string;
  titleBottom?: string;
  techs: string[];
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
    <div className="h-full p-8 sm:p-10 bg-white/70 bg-clip-padding">
      <div className="flex items-center gap-4">
        <div className="opacity-90">{c.icon}</div>
        <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-black">
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
            Science is magic that works.
          </p>
        </div>
        <footer className="text-black/70 text-sm">
          — Kurt Vonnegut, &quot;Cat&apos;s Cradle&quot;
        </footer>
      </blockquote>
    </div>
  );
}

export default function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-6">
      {/* Outer frame sits OUTSIDE the grid so translucency never washes it out */}
      <div className="rounded-xl ring-4 ring-black-500">
        {/* Grid */}
        <div
          className="
            relative
            grid auto-rows-fr
            grid-cols-1 md:grid-cols-2 xl:grid-cols-3
            overflow-hidden rounded-xl

            /* Mobile (1-col): use native divides between items */
            divide-y-4 divide-black-500

            /* From md up we draw lines with a pseudo-element (no real borders) */
            md:divide-y-0 md:divide-x-0
            md:before:content-[''] md:before:absolute md:before:inset-0
            md:before:pointer-events-none md:before:rounded-xl md:before:bg-no-repeat
            /* md (2x2): one vertical at 50%, one horizontal at 50% */
            md:before:bg-[linear-gradient(black),linear-gradient(black)]
            md:before:[background-size:4px_100%,100%_4px]
            md:before:[background-position:50%_0,0_50%]

            /* xl (3 across): two verticals at 33.333% and 66.666%; no horizontal */
            xl:before:bg-[linear-gradient(black),linear-gradient(black)]
            xl:before:[background-size:4px_100%,4px_100%]
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

      
    </section>
  );
}










// 'use client';

// import { useEffect, useState } from 'react';
// import type { ReactNode } from 'react';
// import { Monitor, Atom, Smartphone } from 'lucide-react';

// /* ============ Types ============ */
// type Card = {
//   icon: ReactNode;
//   titleTop: string;
//   titleBottom?: string;
//   techs: string[];
//   blurb: string;
// };

// /* ============ Data ============ */
// const CARDS: Card[] = [
//   {
//     icon: <Monitor className="size-8 sm:size-10" />,
//     titleTop: 'Backend',
//     titleBottom: 'Development',
//     techs: ['Python', 'C#', 'REST APIs'],
//     blurb:
//       'API-first services with authentication, testing, and clean, maintainable code.',
//   },
//   {
//     icon: <Atom className="size-8 sm:size-10" />,
//     titleTop: 'Frontend',
//     titleBottom: 'Development',
//     techs: ['React', 'Next.js', 'TypeScript'],
//     blurb:
//       'Accessible, responsive UI with strong UX fundamentals and component-driven design.',
//   },
//   {
//     icon: <Smartphone className="size-8 sm:size-10" />,
//     titleTop: 'iOS',
//     titleBottom: 'Development',
//     techs: ['Swift', 'SwiftUI'],
//     blurb:
//       'Native iOS apps with modern SwiftUI patterns, state management, and smooth animations.',
//   },
// ];

// /* ============ Hooks ============ */
// function useMediaQuery(query: string) {
//   const [matches, setMatches] = useState(false);
//   useEffect(() => {
//     const m = window.matchMedia(query);
//     const onChange = () => setMatches(m.matches);
//     onChange();
//     m.addEventListener('change', onChange);
//     return () => m.removeEventListener('change', onChange);
//   }, [query]);
//   return matches;
// }

// /* ============ UI ============ */
// function DotList({ items }: { items: string[] }) {
//   return (
//     <div className="mt-1 text-lg sm:text-xl font-semibold text-black/90 tracking-wide">
//       {items.join(' · ')}
//     </div>
//   );
// }

// function ExpertiseCard({ c }: { c: Card }) {
//   return (
//     <div className="h-full p-8 sm:p-10 bg-white/70 bg-clip-padding">
//       <div className="flex items-center gap-4">
//         <div className="opacity-90">{c.icon}</div>
//         <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-black">
//           <span className="underline decoration-[var(--c-lilac,#a78bfa)] decoration-4 underline-offset-0">
//             {c.titleTop}
//           </span>
//           {c.titleBottom ? (
//             <>
//               <br />
//               {c.titleBottom}
//             </>
//           ) : null}
//           <DotList items={c.techs} />
//         </div>
//       </div>

//       <div className="mt-6 text-sm text-black/80">
//         <p className="mt-2 border-l border-white/30 pl-4 leading-relaxed">
//           {c.blurb}
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuoteCard() {
//   return (
//     <div className="h-full p-8 sm:p-10 bg-sky-400/70 flex">
//       <blockquote className="m-0 grid gap-4">
//         <div className="flex gap-4">
//           <div className="w-1 rounded-full bg-[var(--c-lilac,#a78bfa)]" />
//           <p className="text-2xl sm:text-3xl font-extrabold leading-snug text-black">
//             Science is magic that works.
//           </p>
//         </div>
//         <footer className="text-black/70 text-sm">
//           — Kurt Vonnegut, &quot;Cat&apos;s Cradle&quot;
//         </footer>
//       </blockquote>
//     </div>
//   );
// }

// /* ============ Page ============ */
// export default function Expertise() {
//   const isXL = useMediaQuery('(min-width: 1280px)');
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   return (
//     <section aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-6">
//       {/* Frame — change width/color here */}
//       {/* e.g., border-[3px] border-neutral-800 */}
//       <div className="rounded-xl border-2 border-black">
//         <div
//           className="
//             grid auto-rows-fr overflow-hidden rounded-xl
//             grid-cols-1
//             divide-y-2 divide-black                 /* 1-col: horizontal lines */

//             md:grid-cols-2 md:divide-x-2 md:divide-y-2 /* 2×2: both directions */
//             xl:grid-cols-3 xl:divide-y-0               /* 3-across: vertical only */
//           "
//         >
//           <ExpertiseCard c={CARDS[0]} />
//           <ExpertiseCard c={CARDS[1]} />
//           <ExpertiseCard c={CARDS[2]} />

//           {/* Render the quote ONLY below xl so it doesn't affect dividers on desktop */}
//           {mounted && !isXL && (
//             <div>
//               <QuoteCard />
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }











// 'use client';

// import { Monitor, Atom, Smartphone } from 'lucide-react';
// import React from 'react';

// type Card = {
//   icon: React.ReactNode;
//   titleTop: string;
//   titleBottom?: string;
//   techs: string[];
//   blurb: string;
// };

// const CARDS: Card[] = [
//   {
//     icon: <Monitor className="size-8 sm:size-10" />,
//     titleTop: 'Backend',
//     titleBottom: 'Development',
//     techs: ['Python', 'C#', 'REST APIs'],
//     blurb:
//       'API-first services with authentication, testing, and clean, maintainable code.',
//   },
//   {
//     icon: <Atom className="size-8 sm:size-10" />,
//     titleTop: 'Frontend',
//     titleBottom: 'Development',
//     techs: ['React', 'Next.js', 'TypeScript'],
//     blurb:
//       'Accessible, responsive UI with strong UX fundamentals and component-driven design.',
//   },
//   {
//     icon: <Smartphone className="size-8 sm:size-10" />,
//     titleTop: 'iOS',
//     titleBottom: 'Development',
//     techs: ['Swift', 'SwiftUI'],
//     blurb:
//       'Native iOS apps with modern SwiftUI patterns, state management, and smooth animations.',
//   },
// ];

// function DotList({ items }: { items: string[] }) {
//   return (
//     <div className="mt-1 text-lg sm:text-xl font-semibold text-black/90 tracking-wide">
//       {items.join(' · ')}
//     </div>
//   );
// }

// function ExpertiseCard({ c }: { c: Card }) {
//   return (
//     <div className="h-full p-8 sm:p-10 bg-[var(--exp-card-bg)] bg-clip-padding">
//       <div className="flex items-center gap-4">
//         <div className="opacity-90">{c.icon}</div>
//         <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-black">
//           <span className="underline decoration-[var(--c-lilac,#a78bfa)] decoration-4 underline-offset-0">
//             {c.titleTop}
//           </span>
//           {c.titleBottom ? (
//             <>
//               <br />
//               {c.titleBottom}
//             </>
//           ) : null}
//           <DotList items={c.techs} />
//         </div>
//       </div>

//       <div className="mt-6 text-sm text-black/80">
//         <p className="mt-2 border-l border-white/30 pl-4 leading-relaxed">
//           {c.blurb}
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuoteCard() {
//   return (
//     <div className="h-full p-8 sm:p-10 bg-sky-400/70 flex">
//       <blockquote className="m-0 grid gap-4">
//         <div className="flex gap-4">
//           <div className="w-1 rounded-full bg-[var(--c-lilac,#a78bfa)]" />
//           <p className="text-2xl sm:text-3xl font-extrabold leading-snug text-black">
//             Science is magic that works.
//           </p>
//         </div>
//         <footer className="text-black/70 text-sm">
//           — Kurt Vonnegut, &quot;Cat&apos;s Cradle&quot;
//         </footer>
//       </blockquote>
//     </div>
//   );
// }

// export default function Expertise() {
//   return (
//     <section aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-6">
//       {/* Set all theme knobs here */}
//       <div
//         style={
//           {
//             // color for frame + separators
//             ['--exp-line' as any]: '#000',
//             // outer frame width
//             ['--exp-frame-w' as any]: '2px',
//             // internal divider width
//             ['--exp-sep-w' as any]: '2px',
//             // card background (color + opacity)
//             ['--exp-card-bg' as any]: 'rgba(255,255,255,0.70)',
//           } as React.CSSProperties
//         }
//         className="rounded-xl border-[var(--exp-frame-w)] border-[var(--exp-line)]"
//       >
//         <div
//           className="
//             relative
//             grid auto-rows-fr
//             grid-cols-1 md:grid-cols-2 xl:grid-cols-3
//             overflow-hidden rounded-xl

//             /* Mobile (1-col): simple native divides, now black */
//             divide-y-[var(--exp-sep-w)] divide-[var(--exp-line)]

//             /* md/xl: draw lines with a single overlay (prevents doubles) */
//             md:divide-y-0 md:divide-x-0
//             md:before:content-[''] md:before:absolute md:before:inset-0
//             md:before:pointer-events-none md:before:rounded-xl md:before:bg-no-repeat

//             /* md (2x2): one vertical @ 50%, one horizontal @ 50% */
//             md:before:bg-[linear-gradient(var(--exp-line),var(--exp-line)),linear-gradient(var(--exp-line),var(--exp-line))]
//             md:before:[background-size:var(--exp-sep-w)_100%,100%_var(--exp-sep-w)]
//             md:before:[background-position:50%_0,0_50%]

//             /* xl (3 across): two verticals @ 33.333% & 66.666% */
//             xl:before:bg-[linear-gradient(var(--exp-line),var(--exp-line)),linear-gradient(var(--exp-line),var(--exp-line))]
//             xl:before:[background-size:var(--exp-sep-w)_100%,var(--exp-sep-w)_100%]
//             xl:before:[background-position:33.333%_0,66.666%_0]
//           "
//         >
//           <ExpertiseCard c={CARDS[0]} />
//           <ExpertiseCard c={CARDS[1]} />
//           <ExpertiseCard c={CARDS[2]} />
//           <div className="xl:hidden">
//             <QuoteCard />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
