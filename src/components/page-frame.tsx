'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{
  className?: string;
  inset?: string;          // inner padding
}>;

/**
 * Thin, square-corner frame. Border is off on mobile, on from sm+.
 * Grid stays as you set it in globals (Option A = always on).
 */
export function PageFrame({ children, className, inset = "p-6 sm:p-8 lg:p-10" }: Props) {
  return (
    <div className={cn("flex-1 mx-0 my-0 sm:mx-6 sm:my-6 lg:mx-8 lg:my-8")}>
      <div
        className={cn(
          "relative bg-card rounded-none", // <- no rounded corners
          // thinner border than before (was 10/12px)
          "[--frame-bw:0px] sm:[--frame-bw:2px] lg:[--frame-bw:2px]",
          "sm:border-[var(--c-black)] dark:sm:border-[var(--c-white)]"
          // removed the subtle extra hairline to avoid a “double edge” look:
          // "shadow-[0_0_0_1px_var(--border)]"
        )}
        style={{ borderWidth: "var(--frame-bw)" }}
      >
        {/* No corner rounding/clip needed anymore */}
        <div className="min-h-full">
          <div className={cn("min-h-full bg-grid-in-frame", inset, className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
