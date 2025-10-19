'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';

function firstSegment(href: string): string | null {
  if (!href || href === '/') return null;
  // '/projects', '/projects/abc', '/about' → 'projects' | 'about'
  const seg = href.split('/').filter(Boolean)[0];
  return seg ?? null;
}

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;        // your base classes (e.g., navBox)
  activeClassName?: string;  // override the active classes if you want
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function NavLink({
  href,
  children,
  className,
  activeClassName = 'bg-black text-white',
  onClick,
}: Props) {
  const currentSeg = useSelectedLayoutSegment(); // null on '/'
  const targetSeg = firstSegment(href);

  const active =
    (targetSeg === null && currentSeg === null) || // home
    currentSeg === targetSeg;

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </Link>
  );
}
