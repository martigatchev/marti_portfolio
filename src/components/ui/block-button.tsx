// components/ui/block-button.tsx
'use client';

import React from 'react';
import Link from 'next/link';

type CSSVars = { [key: `--${string}`]: string | number };

type BlockButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  cornerRadius?: string;                  // NEW
  style?: (React.CSSProperties & CSSVars) // optional inline vars
};

const sizeClasses = {
  sm: 'px-4 py-2 text-base sm:text-lg',
  md: 'px-6 py-3.5 text-xl sm:text-2xl',
  lg: 'px-7 py-4 text-2xl sm:text-[2.5rem]',
} as const;

export function BlockButton({
  href,
  children,
  className = '',
  withBorder = true,
  size = 'md',
  ariaLabel,
  type = 'button',
  cornerRadius,           // NEW
  style,                  // NEW
}: BlockButtonProps) {
  const base =
    'relative z-0 inline-grid place-items-center ' +
    'font-display uppercase leading-none font-bold ' +
    `${sizeClasses[size]} ` +
    'bg-[var(--c-lilac)] text-[var(--c-black)] ' +
    'hover:bg-[var(--c-black)] hover:text-[var(--c-white)] ' +
    'transition-colors duration-500 ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--c-red)] focus-visible:ring-offset-2 ' +
    'rounded-[var(--corner-r,0px)]';

  const border = withBorder
    ? ' border-[var(--c-black)] [border-width:var(--divider-w,4px)]'
    : '';

  const classes = `${base}${border} ${className}`.trim();

  // Inject corner radius var if provided
  const vars: (React.CSSProperties & CSSVars) | undefined =
    cornerRadius ? { '--corner-r': cornerRadius } : undefined;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} style={{ ...vars, ...style }}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} style={{ ...vars, ...style }}>
      {children}
    </button>
  );
}
