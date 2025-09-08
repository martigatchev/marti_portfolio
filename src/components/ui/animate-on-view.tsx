'use client';

import { PropsWithChildren, useMemo } from 'react';
import {
  motion,
  type HTMLMotionProps,
  type Variants,
  type TargetAndTransition,
} from 'framer-motion';

type PresetKey = 'fadeUp' | 'slideLeft' | 'zoomIn' | 'rotateIn';
type PresetName = PresetKey | 'random';

type PresetVariants = {
  hidden: TargetAndTransition;
  show: TargetAndTransition;
};

const PRESETS: Record<PresetKey, PresetVariants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeOut' } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 1.5, ease: 'easeOut' } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -6 },
    show: { opacity: 1, rotate: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
} as const;

/** Limit to the tags you actually use to keep types tight. Add more as needed. */
type AsTag = 'div' | 'section' | 'h1' | 'h2' | 'p' | 'ul' | 'li' | 'span';

type MotionMap = {
  [K in AsTag]: React.ComponentType<HTMLMotionProps<K>>;
};

const MOTION_MAP: MotionMap = {
  div: motion.div,
  section: motion.section,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
};

export type AnimateOnViewProps = PropsWithChildren<{
  /** Choose a preset or 'random' */
  preset?: PresetName;
  /** Only run the first time it becomes visible */
  once?: boolean;
  /** How much should be visible to trigger (0–1, 'some', or 'all') */
  amount?: number | 'some' | 'all';
  /** Which element to render */
  as?: AsTag;
  /** Extra delay (seconds) for the whole block */
  delay?: number;
  /** Stagger children (seconds) if they also have variants */
  staggerChildren?: number;
  /** Pass-through props */
  className?: string;
  style?: React.CSSProperties;
}>;

/**
 * Wrap anything to animate it when it scrolls into view.
 */
export function AnimateOnView({
  children,
  preset = 'fadeUp',
  once = true,
  amount = 0.2,
  as = 'div',
  delay = 0,
  staggerChildren,
  className,
  style,
}: AnimateOnViewProps) {
  const chosen: PresetKey = useMemo(() => {
    if (preset !== 'random') return preset;
    const keys = Object.keys(PRESETS) as PresetKey[];
    return keys[Math.floor(Math.random() * keys.length)];
  }, [preset]);

  const Comp = MOTION_MAP[as];

  // Build a Variants object, merging in delay and optional child staggering.
  const base = PRESETS[chosen];
  const variants: Variants =
    staggerChildren != null
      ? {
          hidden: { ...base.hidden },
          show: {
            ...base.show,
            transition: {
              ...(base.show.transition ?? {}),
              delay,
              staggerChildren,
            },
          },
        }
      : {
          hidden: { ...base.hidden },
          show: {
            ...base.show,
            transition: {
              ...(base.show.transition ?? {}),
              delay,
            },
          },
        };

  return (
    <Comp
      className={className}
      style={{ willChange: 'transform, opacity', ...style }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

/** Optional helper for child items when using `staggerChildren` on the parent. */
const defaultChildVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function AoVChild({
  children,
  variants = defaultChildVariants,
  as = 'div',
  className,
  style,
}: PropsWithChildren<{
  variants?: Variants;
  as?: AsTag;
  className?: string;
  style?: React.CSSProperties;
}>) {
  const Comp = MOTION_MAP[as];
  return (
    <Comp variants={variants} className={className} style={style}>
      {children}
    </Comp>
  );
}
