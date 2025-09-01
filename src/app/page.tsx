// page.tsx
import Image from "next/image";
import PixelMosaic from "@/components/ui/pixel-mosaic";

export default function Home() {
  return (
    <section className="bg-grid min-h-screen w-full px-6 sm:px-12 py-20 ring-8 ring-red-500 ring-inset">
  <main className="flex flex-col items-center justify-center text-center ring-8 ring-blue-500 ring-inset">
    <div className="relative w-full max-w-5xl ring-8 ring-green-500 ring-inset">
      <div className="relative w-full h-140 2xl:border overflow-hidden ring-8 ring-fuchsia-500 ring-inset">
        
            <PixelMosaic
              className="w-full h-full"           // fill container
              pixelSize={1}
              speed={0.2}
              noiseScale={1.5}
              contrast={1.5}
              palette={["#0b0b0c", "#b48cff", "#a78bfa", "#ff9acb", "#ff6d98"]}
              paletteMix={0.45}
              toneGamma={1.1}
              tint="var(--c-lilac)"
              tintAmount={1.5}
              edgeFeather={0.4}   // widen/narrow the fade ramp
              edgeMinAlpha={0.2}  // opacity at the very edges/corners
              quality={1}
            />

            {/* Overlay content */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 px-4 text-center">
                <h1 className="font-display tracking-tightest uppercase text-white text-6xl sm:text-8xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                  MARTI GATCHEV
                </h1>
                <p className="font-display uppercase text-white/90 text-[10px] sm:text-sm md:text-2xl tracking-[0.28em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                  SOFTWARE ENGINEER, FRONT-END, & APP DEVELOPER
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sub uppercase max-w-xl text-lg sm:text-xl text-muted-foreground">
          I’m a full-stack software engineer—React and TypeScript on the front
          end; Python and C# on the back end. I care about clarity, reliability,
          and thoughtful UX. I apply AI in my own creative projects and bring
          those capabilities into approachable, user-first workflows.
        </p>

        <p className="mt-20 max-w-xl font-sans font-light tracking-[0.02em] leading-relaxed text-lg sm:text-xl text-muted-foreground">
          I’m a full-stack software engineer—React and TypeScript on the front
          end; Python and C# on the back end. I care about clarity, reliability,
          and thoughtful UX. I apply AI in my own creative projects and bring
          those capabilities into approachable, user-first workflows.
        </p>

        <p className="mt-20 max-w-xl font-sans font-light tracking-[0.02em] leading-relaxed text-lg sm:text-xl text-muted-foreground">
          I’m a full-stack software engineer experienced in TypeScript/React,
          Python, and C#. I care about clarity, reliability, and thoughtful UX.
          I apply AI in my own creative projects and bring those capabilities
          into approachable, user-first workflows.
        </p>

        <Image
          src="/aurora-hyper.jpg"
          alt="Marti portrait"
          width={1200}
          height={800}
          className="mt-12 w-full max-w-3xl rounded-lg border"
          priority={false}
        />
      </main>
    </section>
  );
}
