"use client";

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
  const headerClass = [
    "fixed inset-x-0 top-0 z-50",
    "pt-[env(safe-area-inset-top)]",
    "[--nav-bw:4px] sm:[--nav-bw:6px] lg:[--nav-bw:6px]",
    "bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur",
    "shadow-sm",
  ].join(" ");

  return (
    <header className={headerClass}>
      <MobileHeader borders={borders} links={LINKS} />
      <DesktopHeader borders={borders} links={LINKS} />
    </header>
  );
}
