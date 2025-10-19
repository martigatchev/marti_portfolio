"use client";

import { useLayoutEffect, useRef } from "react";

import { MobileHeader } from "@/components/navigation/mobile-header";
import { DesktopHeader } from "@/components/navigation/desktop-header";

type Link = { href: string; label: string };

const LINKS: Link[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

export function Header({ borders = false }: { borders?: boolean }) {
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const viewport = window.visualViewport;
    const node = headerRef.current;
    if (!viewport || !node) return;

    // Freeze the initial offset so Safari URL-bar collapsing can't reduce it mid-scroll.
    const lockedTop = Math.round(viewport.offsetTop ?? 0);
    node.style.setProperty(
      "--locked-safe-area",
      `${lockedTop}px`
    );
  }, []);

  const headerClass = [
    "fixed inset-x-0 top-0 z-50",
    "pt-[env(safe-area-inset-top)]",
    "[--nav-bw:4px] sm:[--nav-bw:6px] lg:[--nav-bw:6px]",
    "bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur",
    "shadow-sm",
  ].join(" ");

  return (
    <header
      ref={headerRef}
      className={headerClass}
      style={{
        paddingTop: "var(--locked-safe-area, env(safe-area-inset-top))",
      }}
    >
      <MobileHeader borders={borders} links={LINKS} />
      <DesktopHeader borders={borders} links={LINKS} />
    </header>
  );
}
