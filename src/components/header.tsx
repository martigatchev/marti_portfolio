// header.tsx

'use client';

import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { NavLink } from '@/components/nav-link';

/**
 * NAV “variables” — tweak these in one place.
 * border.pattern examples:
 *  - 'border-4' (all sides)
 *  - 'border-x-4' (left/right only)
 *  - 'border-t-8 border-x-4' (custom mix)
 */
// NAV “variables” — tweak these in one place

const NAV = {
  border: { pattern: 'border-4', color: 'border-[var(--c-fg)]', radius: '' },
  colors: {
    bg:      'bg-[var(--c-bg)]',
    fg:      'text-[var(--c-fg)]',
    hoverBg: 'hover:bg-[var(--c-fg)]',
    hoverFg: 'hover:text-[var(--c-accent)]',
  },
  sizing: { desktopHeight: 'h-24', mobilePadding: 'px-4 py-3' },
  effects: {
    transition: 'transition-colors duration-200',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2',
  },
  // Active = thin inner ring + (optionally) red outer border
  // Use !border[...] to guarantee it overrides the base border color.
  active: { ring: '!border-[var(--c-accent)] ring-inset ring-1 ring-[var(--c-accent)]' },
};

// Shared boxed tab styles
const navBox = [
  'block w-full h-full grid place-items-center font-display uppercase leading-none',
  'text-xl sm:text-6xl',              // ← bigger font on the boxes
  'font-bold',      // ← ensure weight is on the box, not the container
  NAV.border.pattern,
  NAV.border.color,
  NAV.border.radius,
  NAV.colors.bg,
  NAV.colors.fg,
  NAV.colors.hoverBg,
  NAV.colors.hoverFg,
  NAV.effects.transition,
  NAV.effects.focus,
].join(' ');

export function Header() {
  return (
    <header className="border-b pt-[env(safe-area-inset-top)]">
      {/* Mobile */}
      <div className="block sm:hidden bg-white h-16 flex items-center justify-between px-4">
        <div className="text-lg font-bold">martig.dev</div>
        <Sheet>
          <SheetTrigger className="text-xl font-bold" aria-label="Open navigation">☰</SheetTrigger>
          <SheetContent side="left" aria-label="Main navigation">
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <nav aria-label="Primary" className="mt-8 text-2xl font-semibold flex flex-col gap-3">
              <NavLink href="/"         className={`${NAV.sizing.mobilePadding} ${navBox}`} activeClassName={NAV.active.ring}>Home</NavLink>
              <NavLink href="/projects" className={`${NAV.sizing.mobilePadding} ${navBox}`} activeClassName={NAV.active.ring}>Projects</NavLink>
              <NavLink href="/about"    className={`${NAV.sizing.mobilePadding} ${navBox}`} activeClassName={NAV.active.ring}>About</NavLink>
              <NavLink href="/resume"   className={`${NAV.sizing.mobilePadding} ${navBox}`} activeClassName={NAV.active.ring}>Resume</NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <nav aria-label="Primary" className={`hidden sm:grid sm:grid-cols-4 bg-background ${NAV.sizing.desktopHeight} text-center text-2xl font-bold uppercase`}>
        <NavLink href="/"         className={navBox} activeClassName={NAV.active.ring}>Home</NavLink>
        <NavLink href="/projects" className={navBox} activeClassName={NAV.active.ring}>Projects</NavLink>
        <NavLink href="/about"    className={navBox} activeClassName={NAV.active.ring}>About</NavLink>
        <NavLink href="/resume"   className={navBox} activeClassName={NAV.active.ring}>Resume</NavLink>
      </nav>
    </header>
  );
}
