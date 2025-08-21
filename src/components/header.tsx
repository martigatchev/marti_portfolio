'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/components/nav-link';

const NAV = {
  border: { pattern: 'sm:border-4', color: 'border-[var(--c-black)]', radius: '' },
  colors: {
    bg: 'bg-[var(--c-white)]',
    fg: 'text-[var(--c-black)]',
    // desktop-only hover to avoid sticky touch on mobile
    hoverBg: 'sm:hover:bg-[var(--c-black)]',
    hoverFg: 'sm:hover:text-[var(--c-white)]',
  },
  sizing: { desktopHeight: 'h-24', mobilePadding: 'px-4 py-3' },
  effects: {
    transition: 'transition-colors duration-500',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-red)] focus-visible:ring-offset-2',
  },
  active: { ring: 'text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]' },
};

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

// Open = stagger; Close = instant hide
const STAGGER = 90;
const ITEM_BASE = 'origin-top overflow-hidden transform-gpu will-change-transform will-change-opacity transition-[opacity,transform]';
const ITEM_OPEN = 'opacity-100 translate-y-0 scale-y-100 duration-500 ease-out';
const ITEM_INIT = 'opacity-0 -translate-y-4 scale-y-95';

export function Header() {
  const pathname = usePathname();

  const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/resume', label: 'Resume' },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => setMobileOpen(false);

  // If route changes, just close immediately
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="pt-[env(safe-area-inset-top)] sm:border-b">
      {/* MOBILE WRAPPER owns side rails */}
      <div className="sm:hidden bg-white border-x-4 border-[var(--c-black)]">
        {/* Top bar with persistent bottom line */}
        <div className="h-16 flex items-center justify-between px-4 border-b-4 border-[var(--c-black)]">
          <div className="text-lg font-bold">martig.dev</div>
          <button
            type="button"
            className="text-xl font-bold"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => (mobileOpen ? closeMenu() : openMenu())}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Slide-down */}
        <div
          id="mobile-nav"
          className={[
            'overflow-hidden',
            'transition-[max-height,opacity,transform] duration-300 ease-out',
            mobileOpen
              ? 'max-h-[80vh] opacity-100 translate-y-0 pointer-events-auto'
              : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none',
          ].join(' ')}
        >
          <nav>
            <ul
              onClickCapture={closeMenu} // close instantly when a link is tapped
              className={[
                'flex flex-col',
                'border-b-4 border-[var(--c-black)]',   // bottom frame; sides are on wrapper; top is the bar
                'divide-y-4 divide-[var(--c-black)]',   // single separators
              ].join(' ')}
            >
              {LINKS.map((link, i) => {
                const itemClasses = [ITEM_BASE, mobileOpen ? ITEM_OPEN : ITEM_INIT].join(' ');
                const delayStyle = mobileOpen ? { transitionDelay: `${i * STAGGER}ms` } : undefined;

                return (
                  <li key={link.href} className={itemClasses} style={delayStyle}>
                    <NavLink
                      href={link.href}
                      className={`${NAV.sizing.mobilePadding} ${navBox}`}
                      activeClassName={NAV.active.ring}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* DESKTOP */}
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
