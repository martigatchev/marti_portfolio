// components/page-frame.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{
  className?: string;
  inset?: string;          // inner padding
  showGrid?: boolean;      // <— NEW: opt-in grid
}>;

export function PageFrame({
  children,
  className,
  inset = 'p-6 sm:p-8 lg:p-10',
  showGrid = false,
}: Props) {
  return (
    <div className={cn('flex-1 mx-0 my-0 sm:mx-6 sm:my-6 lg:mx-8 lg:my-8')}>
      <div
        className={cn(
          'relative bg-card rounded-none',
          '[--frame-bw:0px] sm:[--frame-bw:2px] lg:[--frame-bw:8px]',
          'sm:border-[var(--c-black)] dark:sm:border-[var(--c-white)]'
        )}
        style={{ borderWidth: 'var(--frame-bw)' }}
      >
        <div className={cn('min-h-full', inset, className, showGrid && 'bg-grid-in-frame')}>
          {children}
        </div>
      </div>
    </div>
  );
}
