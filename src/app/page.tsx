// app/page.tsx
import PixelMosaic from '@/components/ui/pixel-mosaic';
import Expertise from '@/components/sections/expertise';
import FeaturedProject from '@/components/sections/featured-project';
import ExperienceSection from '@/components/sections/professional-experience';
import { PageFrame } from '@/components/page-frame';

export default function Home() {
  return (
    <section className="min-h-screen w-full p-0">
      <main>
        {/* HERO (full-bleed) */}
        <div className="relative w-full max-w-none">
          <div className="relative w-full h-[100dvh] overflow-hidden">
            <PixelMosaic
              className="w-full h-full"
              pixelSize={1}
              speed={0.2}
              noiseScale={1.5}
              contrast={1.5}
              palette={['#0b0b0c', '#b48cff', '#a78bfa', '#ff9acb', '#ff6d98']}
              paletteMix={0.45}
              toneGamma={1.1}
              tint="var(--c-lilac)"
              tintAmount={1.5}
              edgeFeather={0.4}
              edgeMinAlpha={0.2}
              quality={1}
            />

            {/* Overlay content */}
            <div className="pointer-events-none absolute inset-0 z-10 grid place-content-center px-4 text-center">
              <div className="flex flex-col items-center gap-3">
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

        {/* Everything below the hero gets frame + grid */}
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          <div className="mt-24">
            <h2
              id="expertise-title"
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-10 sm:mb-14"
            >
              My Expertise
            </h2>
            <Expertise />
          </div>

          <div className="mt-24">
            <h2
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-10 sm:mb-14"
            >
              Professional Experience
            </h2>
            <ExperienceSection resumeHref="/resume.pdf" />
          </div>

          <div className="mt-24">
            <h2
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-10 sm:mb-14"
            >
              My Projects
            </h2>
            <FeaturedProject
              title="Tryotel App"
              summary="Deployed scalable travel/event/telemedicine apps using React SPA + PWA. 140+ projects, 50+ clients worldwide. Interested in data analytics and viz."
              bullets={['React, Next.js, TypeScript', 'Hybrid mobile (Capacitor/Flutter)', 'CI/CD, Vercel, Netlify']}
              ctaHref="/projects/tryotel"
              ctaLabel="View Project"
              imageSrc="/aurora-hyper.jpg"
              imageAlt="Marti portrait"
              imageAspect="phone"
              tilt={false}
            />
          </div>
        </PageFrame>
      </main>
    </section>
  );
}
