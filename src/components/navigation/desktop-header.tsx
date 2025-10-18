"use client";

import { NavLink } from "@/components/navigation/nav-link";

type Link = { href: string; label: string };

type DesktopHeaderProps = {
  borders?: boolean;
  links: Link[];
};

export function DesktopHeader({ borders = false, links }: DesktopHeaderProps) {
  const navBox =
    "relative z-0 block w-full h-full grid place-items-center font-display uppercase leading-none font-bold " +
    "sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-6xl " +
    "bg-[var(--c-white)] text-[var(--c-black)] sm:hover:bg-[var(--c-black)] sm:hover:text-[var(--c-white)] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-red)] focus-visible:ring-offset-2";

  const desktopSep =
    'after:content-[""] after:absolute after:top-0 after:bottom-0 after:right-0 ' +
    "after:w-[var(--nav-bw)] after:bg-[var(--c-black)] dark:after:bg-[var(--c-white)] " +
    "last:after:hidden";

  const desktopRules = borders
    ? [
        'before:content-[""] before:pointer-events-none before:absolute before:z-10 before:left-0 before:right-0 before:top-0',
        "before:h-[var(--nav-bw)] before:bg-[var(--c-black)] dark:before:bg-[var(--c-white)]",
        'after:content-[""] after:pointer-events-none after:absolute after:z-10 after:left-0 after:right-0 after:bottom-0',
        "after:h-[var(--nav-bw)] after:bg-[var(--c-black)] dark:after:bg-[var(--c-white)]",
      ].join(" ")
    : "";

  return (
    <nav
      aria-label="Primary"
      className={[
        "relative isolate hidden sm:grid sm:grid-cols-4 h-24",
        "bg-background",
        "text-center text-2xl font-bold uppercase",
        desktopRules,
        "gap-0",
      ].join(" ")}
    >
      {links.map((link, index) => (
        <NavLink
          key={link.href}
          href={link.href}
          className={`${navBox} ${index < links.length - 1 ? desktopSep : ""}`}
          activeClassName="text-[var(--c-lilac)] sm:hover:text-[var(--c-lilac)]"
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
