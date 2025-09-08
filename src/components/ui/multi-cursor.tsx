"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

/** One visual follower element (dot or ring) */
type FollowerConfig = {
  size: number;       // px
  border?: number;    // px; if present -> ring (stroke), else filled dot
  stiffness: number;  // spring stiffness
  damping: number;    // spring damping
  mass?: number;      // spring mass
  opacity?: number;   // 0..1
  fill?: string;      // used when no border (dot)
  stroke?: string;    // used when border (ring)
  blendMode?: React.CSSProperties["mixBlendMode"];
};

type Props = {
  /** Quick on/off switches */
  dotEnabled?: boolean;
  ring1Enabled?: boolean;
  ring2Enabled?: boolean;
  ring3Enabled?: boolean;

  /** Exact colors per element (used if not providing `followers`) */
  dotColor?: string;
  ring1Color?: string;
  ring2Color?: string;
  ring3Color?: string;

  /** Sizing (used if not providing `followers`) */
  headSize?: number;
  ring1Size?: number;
  ring2Size?: number;
  ring3Size?: number;
  ringBorder?: number;

  /** Spring feel (used if not providing `followers`) */
  headSpring?: { stiffness: number; damping: number; mass?: number };
  ring1Spring?: { stiffness: number; damping: number; mass?: number };
  ring2Spring?: { stiffness: number; damping: number; mass?: number };
  ring3Spring?: { stiffness: number; damping: number; mass?: number };

  /** Advanced: completely override with your own followers array */
  followers?: FollowerConfig[];

  /** Global options */
  zIndex?: number;
  blendMode?: React.CSSProperties["mixBlendMode"]; // "normal" shows true colors; "difference" inverts vs bg
  hideSystemCursor?: boolean;
  enabled?: boolean;
};

export default function MultiFollowCursor({
  // toggles
  dotEnabled = true,
  ring1Enabled = true,
  ring2Enabled = true,
  ring3Enabled = true,

  // colors
  dotColor = "#000000",
  ring1Color = "#FFFFFF",
  ring2Color = "#B14EFF",
  ring3Color = "#8A2BE2",

  // sizes
  headSize = 12,
  ring1Size = 28,
  ring2Size = 46,
  ring3Size = 66,
  ringBorder = 2,

  // springs
  headSpring = { stiffness: 900, damping: 45, mass: 0.6 },
  ring1Spring = { stiffness: 400, damping: 35, mass: 0.9 },
  ring2Spring = { stiffness: 250, damping: 30, mass: 1.1 },
  ring3Spring = { stiffness: 180, damping: 24, mass: 1.3 },

  // advanced override
  followers,

  // global
  zIndex = 9999,
  blendMode = "normal",
  hideSystemCursor = true,
  enabled = true,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mqPointer = window.matchMedia("(pointer: coarse)");
    setIsTouch(mqPointer.matches);
    const onPointerChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mqPointer.addEventListener?.("change", onPointerChange);

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mqReduced.matches);
    const onReducedChange = (e: MediaQueryListEvent) =>
      setPrefersReduced(e.matches);
    mqReduced.addEventListener?.("change", onReducedChange);

    return () => {
      mqPointer.removeEventListener?.("change", onPointerChange);
      mqReduced.removeEventListener?.("change", onReducedChange);
    };
  }, []);

  // Build followers either from override array or from simple props
  const cfg: FollowerConfig[] = useMemo(() => {
    if (followers && followers.length) return followers;

    const out: FollowerConfig[] = [];
    if (dotEnabled) {
      out.push({
        size: headSize,
        stiffness: headSpring.stiffness,
        damping: headSpring.damping,
        mass: headSpring.mass ?? 1,
        opacity: 1,
        fill: dotColor,
      });
    }
    if (ring1Enabled) {
      out.push({
        size: ring1Size,
        border: ringBorder,
        stiffness: ring1Spring.stiffness,
        damping: ring1Spring.damping,
        mass: ring1Spring.mass ?? 1,
        opacity: 0.95,
        stroke: ring1Color,
      });
    }
    if (ring2Enabled) {
      out.push({
        size: ring2Size,
        border: ringBorder,
        stiffness: ring2Spring.stiffness,
        damping: ring2Spring.damping,
        mass: ring2Spring.mass ?? 1,
        opacity: 0.9,
        stroke: ring2Color,
      });
    }
    if (ring3Enabled) {
      out.push({
        size: ring3Size,
        border: ringBorder,
        stiffness: ring3Spring.stiffness,
        damping: ring3Spring.damping,
        mass: ring3Spring.mass ?? 1,
        opacity: 0.85,
        stroke: ring3Color,
      });
    }
    return out;
  }, [
    followers,

    dotEnabled,
    ring1Enabled,
    ring2Enabled,
    ring3Enabled,

    headSize,
    ring1Size,
    ring2Size,
    ring3Size,
    ringBorder,

    headSpring,
    ring1Spring,
    ring2Spring,
    ring3Spring,

    dotColor,
    ring1Color,
    ring2Color,
    ring3Color,
  ]);

  // Shared pointer position
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  useEffect(() => {
    if (!mounted || !enabled || isTouch || prefersReduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mounted, enabled, isTouch, prefersReduced, mx, my]);

  // Hide system cursor while active
  useEffect(() => {
    if (!mounted || !hideSystemCursor || !enabled || isTouch || prefersReduced)
      return;
    const style = document.createElement("style");
    style.setAttribute("data-multi-follow-cursor", "true");
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [mounted, hideSystemCursor, enabled, isTouch, prefersReduced]);

  if (!mounted || !enabled || isTouch || prefersReduced) return null;

  return createPortal(
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex, pointerEvents: "none" }}
    >
      {cfg.map((c, i) => (
        <Follower key={i} mx={mx} my={my} cfg={c} blendMode={c.blendMode ?? blendMode} />
      ))}
    </div>,
    document.body
  );
}

/** One follower element (dot or ring) */
function Follower({
  mx,
  my,
  cfg,
  blendMode,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  cfg: FollowerConfig;
  blendMode?: React.CSSProperties["mixBlendMode"];
}) {
  const sx = useSpring(mx, {
    stiffness: cfg.stiffness,
    damping: cfg.damping,
    mass: cfg.mass ?? 1,
  });
  const sy = useSpring(my, {
    stiffness: cfg.stiffness,
    damping: cfg.damping,
    mass: cfg.mass ?? 1,
  });

  // Center element on pointer
  const x = useTransform(sx, (v) => v - cfg.size / 2);
  const y = useTransform(sy, (v) => v - cfg.size / 2);

  const isRing = !!cfg.border && cfg.border > 0;

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    width: cfg.size,
    height: cfg.size,
    borderRadius: 9999,
    mixBlendMode: blendMode,
    opacity: cfg.opacity ?? 1,
    pointerEvents: "none",
    willChange: "transform",
    background: isRing ? "transparent" : cfg.fill,
    ...(isRing ? { border: `${cfg.border}px solid ${cfg.stroke}` } : null),
  };

  return <motion.div style={{ x, y, ...style }} />;
}
