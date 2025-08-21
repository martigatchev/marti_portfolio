'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/components/nav-link';

const NAV = {
  // NOTE: border only on desktop by default now
  border: { pattern: 'sm:border-4', color: 'border-[var(--c-black)]', radius: '' },
  colors: {
    bg:      'bg-[var(--c-white)]',
    fg:      'text-[var(--c-black)]',
    hoverBg: 'hover:bg-[var(--c-black)]',
    hoverFg: 'hover:text-[var(--c-white)]',
  },
  sizing: { desktopHeight: 'h-24', mobilePadding: 'px-4 py-3' },
  effects: {
    transition: 'transition-colors duration-500',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-red)] focus-visible:ring-offset-2',
  },
  // active: { ring: '!border-[var(--c-black)] ring-inset ring-3 ring-[var(--c-white)]' },
  // active: { ring: 'text-[var(--c-lilac)]' },
  active: { ring: 'text-[var(--c-lilac)] hover:text-[var(--c-lilac)]' },
};

// Shared desktop styles live in navBox; mobile adds its own border pattern
const navBox = [
  'block w-full h-full grid place-items-center font-display uppercase leading-none',
  'text-xl sm:text-6xl',
  'font-bold',
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

// Mobile-only border pattern: single lines, no doubles
const mobileItemBorders =
  'border-x-4 border-y-0 first:border-t-4 last:border-b-4';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close when route changes (e.g. after clicking a link)
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="border-b pt-[env(safe-area-inset-top)]">
      {/* Mobile top bar (unchanged) */}
      <div className="sm:hidden bg-white h-16 flex items-center justify-between px-4">
        <div className="text-lg font-bold">martig.dev</div>
        <button
          type="button"
          className="text-xl font-bold"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-nav"
        aria-label="Primary"
        className={[
          'sm:hidden overflow-hidden',
          'transition-[max-height,opacity,transform] duration-300 ease-out',
          mobileOpen
            ? 'max-h-[80vh] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <nav className="flex flex-col">
          <div onClickCapture={() => setMobileOpen(false)}>
            <NavLink
              href="/"
              className={`${NAV.sizing.mobilePadding} ${navBox} ${mobileItemBorders}`}
              activeClassName={NAV.active.ring}
            >
              Home
            </NavLink>
          </div>
          <div onClickCapture={() => setMobileOpen(false)}>
            <NavLink
              href="/projects"
              className={`${NAV.sizing.mobilePadding} ${navBox} ${mobileItemBorders}`}
              activeClassName={NAV.active.ring}
            >
              Projects
            </NavLink>
          </div>
          <div onClickCapture={() => setMobileOpen(false)}>
            <NavLink
              href="/about"
              className={`${NAV.sizing.mobilePadding} ${navBox} ${mobileItemBorders}`}
              activeClassName={NAV.active.ring}
            >
              About
            </NavLink>
          </div>
          <div onClickCapture={() => setMobileOpen(false)}>
            <NavLink
              href="/resume"
              className={`${NAV.sizing.mobilePadding} ${navBox} ${mobileItemBorders}`}
              activeClassName={NAV.active.ring}
            >
              Resume
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Desktop */}
      <nav
        aria-label="Primary"
        className={`hidden sm:grid sm:grid-cols-4 bg-background ${NAV.sizing.desktopHeight} text-center text-2xl font-bold uppercase`}
      >
        <NavLink href="/"         className={navBox} activeClassName={NAV.active.ring}>Home</NavLink>
        <NavLink href="/projects" className={navBox} activeClassName={NAV.active.ring}>Projects</NavLink>
        <NavLink href="/about"    className={navBox} activeClassName={NAV.active.ring}>About</NavLink>
        <NavLink href="/resume"   className={navBox} activeClassName={NAV.active.ring}>Resume</NavLink>
      </nav>
    </header>
  );
}
