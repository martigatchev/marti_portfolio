"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/nav-link";

// Toggle: top/bottom chrome on or off
export function Header({ borders = false }: { borders?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [pathname]);

  // Core button styling (no borders on items)
  const navBox =
    "relative z-0 block w-full h-full grid place-items-center " +
    "font-display uppercase leading-none font-bold " +
    "text-xl sm:text-6xl " +
    "bg-[var(--c-white)] text-[var(--c-black)] " +
    "sm:hover:bg-[var(--c-black)] sm:hover:text-[var(--c-white)] " +
    "transition-colors duration-500 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-red)] focus-visible:ring-offset-2";

  // Desktop vertical separator: right side only, not on last item
  const desktopSep =
    'after:content-[""] after:absolute after:top-0 after:bottom-0 after:right-0 ' +
    "after:w-[var(--nav-bw)] after:bg-[var(--c-black)] dark:after:bg-[var(--c-white)] " +
    "last:after:hidden";

  const STAGGER = 90;
  const ITEM_BASE =
    "origin-top overflow-hidden transform-gpu will-change-transform will-change-opacity transition-[opacity,transform]";
  const ITEM_OPEN = "opacity-100 translate-y-0 scale-y-100 duration-500 ease-out";
  const ITEM_INIT = "opacity-0 -translate-y-4 scale-y-95";

  const LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
  ];

  // Header (fixed overlay)
  const headerClass = [
    "fixed inset-x-0 top-0 z-50",
    "pt-[env(safe-area-inset-top)]",
    "[--nav-bw:4px] sm:[--nav-bw:6px] lg:[--nav-bw:6px]",
    "bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur",
    "shadow-sm",
  ].join(" ");

  // Toggleable borders (mobile + desktop)
  const mobileWrapBorders = borders
    ? "border-x-[var(--c-black)] [border-left-width:var(--nav-bw)] [border-right-width:var(--nav-bw)]"
    : "";
  const mobileTopBarBorder = borders
    ? "border-[var(--c-black)] [border-bottom-width:var(--nav-bw)]"
    : "";
  const mobileListBottomBorder = borders
    ? "border-[var(--c-black)] [border-bottom-width:var(--nav-bw)]"
    : "";

  const desktopRules = borders
    ? [
        'before:content-[""] before:pointer-events-none before:absolute before:z-10 before:left-0 before:right-0 before:top-0',
        "before:h-[var(--nav-bw)] before:bg-[var(--c-black)] dark:before:bg-[var(--c-white)]",
        'after:content-[""] after:pointer-events-none after:absolute after:z-10 after:left-0 after:right-0 after:bottom-0',
        "after:h-[var(--nav-bw)] after:bg-[var(--c-black)] dark:after:bg-[var(--c-white)]",
      ].join(" ")
    : "";

  return (
    <header className={headerClass}>
      {/* ===== MOBILE ===== */}
      <div className={`sm:hidden bg-background ${mobileWrapBorders}`}>
        <div className={`h-16 flex items-center justify-between px-4 ${mobileTopBarBorder}`}>
          <div className="text-lg font-bold">martig.dev</div>
          <button
            type="button"
            className="text-xl font-bold"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={[
            "overflow-hidden",
            "transition-[max-height,opacity,transform] duration-300 ease-out",
            mobileOpen
              ? "max-h-[80vh] opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          <nav>
            <ul
              onClickCapture={() => setMobileOpen(false)}
              className={`flex flex-col ${mobileListBottomBorder} divide-y-[var(--nav-bw)] divide-[var(--c-black)]`}
            >
              {LINKS.map((link, i) => {
                const itemClasses = [ITEM_BASE, mobileOpen ? ITEM_OPEN : ITEM_INIT].join(" ");
                const delayStyle = mobileOpen ? { transitionDelay: `${i * STAGGER}ms` } : undefined;

                return (
                  <li key={link.href} className={itemClasses} style={delayStyle}>
                    <NavLink
                      href={link.href}
                      className={`${navBox} px-4 py-3`}
                      activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
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

      {/* ===== DESKTOP ===== */}
      <nav
        aria-label="Primary"
        className={[
          "relative isolate hidden sm:grid sm:grid-cols-4 h-24",
          "bg-background",
          "text-center text-2xl font-bold uppercase",
          desktopRules, // top/bottom bars only if borders=true
          "gap-0",
        ].join(" ")}
      >
        <NavLink
          href="/"
          className={`${navBox} ${desktopSep}`}
          activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
        >
          Home
        </NavLink>
        <NavLink
          href="/about"
          className={`${navBox} ${desktopSep}`}
          activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
        >
          About
        </NavLink>
        <NavLink
          href="/projects"
          className={`${navBox} ${desktopSep}`}
          activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
        >
          Projects
        </NavLink>
        <NavLink
          href="/resume"
          className={`${navBox}`}
          activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
        >
          Resume
        </NavLink>
      </nav>
    </header>
  );
}
