// components/ChevronScrollArrowFM.tsx
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

type Props = {
  size?: number;          // width in px
  color?: string;         // or control via className (currentColor)
  strokeWidth?: number;   // line thickness
  drawSec?: number;       // time to draw in
  bobPx?: number;         // bob distance
  bobSec?: number;        // one bob cycle duration
  pauseSec?: number;      // pause before looping
  className?: string;
  cap?: "round" | "butt"; // round looks nicer; butt removes end-dots
};

export default function ChevronScrollArrowFM({
  size = 48,
  color = "currentColor",
  strokeWidth = 2,
  drawSec = 0.6,
  bobPx = 8,
  bobSec = 1.2,
  pauseSec = 0.3,
  className = "",
  cap = "round",
}: Props) {
  const g = useAnimationControls();
  const head = useAnimationControls();

  useEffect(() => {
    let stop = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!stop) {
        // Start fully hidden to avoid the initial dot
        await Promise.all([
          g.set({ y: 0 }),
          head.set({ pathLength: 0, opacity: 0 }),
        ]);

        // Draw chevron + fade-in slightly after start
        await head.start({
          pathLength: 1,
          opacity: [0, 1],
          transition: {
            pathLength: { duration: drawSec, ease: "easeInOut" },
            opacity: { duration: Math.max(0.2, drawSec * 0.35), delay: 0.06 },
          },
        });

        // Bob twice
        await g.start({
          y: [0, bobPx, 0],
          transition: { ease: "easeInOut", duration: bobSec, repeat: 1 },
        });

        // Fade out before retract so no dot shows
        await head.start({ opacity: 0, transition: { duration: 0.12 } });
        await head.start({ pathLength: 0, transition: { duration: 0.2 } });

        await sleep(pauseSec * 1000);
      }
    })();

    return () => {
      stop = true;
    };
  }, [bobPx, bobSec, drawSec, pauseSec, g, head]);

  return (
    <motion.svg
      width={size}
      height={(size * 64) / 64}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color }}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <motion.g animate={g}>
        <motion.path
          d="M20 28 L32 38 L44 28"   // chevron only
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap={cap}
          strokeLinejoin={cap === "round" ? "round" : "miter"}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={head}
        />
      </motion.g>
    </motion.svg>
  );
}
