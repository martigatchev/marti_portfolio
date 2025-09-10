// components/sections/Hero.tsx
"use client";

import { useRef } from "react";
// Use ONE of these imports depending on your setup:
import { motion, useScroll, useTransform } from "framer-motion";


import PixelMosaic from "@/components/ui/pixel-mosaic";
import ChevronScrollArrowFM from "@/components/ui/chevron-scroll-arrow";
import { AnimateOnView } from "@/components/ui/animate-on-view";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // 0 → 1 as you scroll from hero top to hero bottom (past the top edge of viewport)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Fade PixelMosaic 1 → 0 (title remains 1.0)
  const mosaicOpacity = useTransform(scrollYProgress, [0, 1], [1, 0], {
    clamp: true,
  });

  return (
    <div ref={heroRef} className="relative w-full h-[100svh] overflow-hidden">
      {/* Only the background fades */}
      <motion.div
        style={{ opacity: mosaicOpacity, willChange: "opacity" }}
        className="w-full h-full"
      >
        <PixelMosaic
          className="w-full h-full"
          pixelSize={1}
          speed={0.4}
          noiseScale={1.0}
          contrast={1.9}
          palette={["#CEAED5", "#b48cff", "#e799c0ff", "#a78bfa", "#ffffffff"]}
          paletteMix={0.8}
          toneGamma={1.1}
          tint="var(--c-lilac)"
          tintAmount={1.5}
          edgeFeather={0.4}
          edgeMinAlpha={0.3}
          quality={1}
        />
      </motion.div>

      {/* Title/subtitle: stays fully opaque */}
      <div className="pointer-events-none absolute inset-0 z-10 grid place-content-center px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <h1
            className="font-display uppercase text-black leading-none tracking-tightest
                       text-[clamp(3.5rem,8vw,12rem)]"
          >
            MARTI GATCHEV
          </h1>

          <AnimateOnView
            as="p"
            preset="fadeUp"
            once
            amount={0.3}
            className="font-display uppercase text-black/90
                       text-[clamp(0.9rem,2.2vw,2.5rem)]
                       tracking-[clamp(0.14em,0.6vw,0.28em)]"
          >
            SOFTWARE ENGINEER • FRONT-END • APP DEVELOPER
          </AnimateOnView>
        </div>
      </div>

      {/* Arrow: also stays fully opaque (remove if you want it faded too) */}
      <div className="absolute inset-x-0 bottom-8 z-20 grid place-items-center pointer-events-none">
        <ChevronScrollArrowFM size={56} strokeWidth={2} className="text-black" />
      </div>
    </div>
  );
}
