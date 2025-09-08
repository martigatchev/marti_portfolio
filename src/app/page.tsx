// app/page.tsx
import PixelMosaic from "@/components/ui/pixel-mosaic";
import Expertise from "@/components/sections/expertise";
import FeaturedProject from "@/components/sections/featured-project";
import ExperienceSection from "@/components/sections/professional-experience";
import { PageFrame } from "@/components/page-frame";
import ChevronScrollArrowFM from "@/components/ui/chevron-scroll-arrow";
import { AnimateOnView, AoVChild } from "@/components/ui/animate-on-view";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <section className="min-h-screen w-full p-0">
      <main>
        {/* HERO (full-bleed) */}
        <div className="relative w-full max-w-none">
          <Hero />
        </div>

        {/* Everything below the hero gets frame + grid */}
        <PageFrame showGrid inset="p-6 sm:p-8 lg:p-10">
          {/* Expertise */}
          <div className="mt-12">
            <AnimateOnView
              as="h1"
              preset="slideLeft"
              amount={0.2}
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-12 sm:mb-12"
            >
              My Expertise
            </AnimateOnView>

            <AnimateOnView as="div" preset="fadeUp" delay={0.08} amount={0.2}>
              <Expertise />
            </AnimateOnView>
          </div>

          <hr className="mx-auto my-18 w-5/5 border-0 border-t-[4px] border-black dark:border-white opacity-100" />

          {/* Experience */}
          <div className="mt-18">
            <AnimateOnView
              as="h2"
              preset="slideLeft"
              once
              amount={0.2}
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-12 sm:mb-12"
            >
              Professional Experience
            </AnimateOnView>

            <AnimateOnView
              as="div"
              preset="fadeUp"
              delay={0.08}
              once
              amount={0.2}
            >
              <ExperienceSection resumeHref="/resume.pdf" />
            </AnimateOnView>
          </div>

          <hr className="mx-auto my-18 w-5/5 border-0 border-t-[4px] border-black dark:border-white opacity-100" />

          {/* Projects */}
          <div className="mt-18">
            <AnimateOnView
              as="h2"
              preset="slideLeft"
              once
              amount={0.2}
              className="font-display text-center text-5xl sm:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-12 sm:mb-12"
            >
              My Projects
            </AnimateOnView>

            <AnimateOnView
              as="div"
              preset="fadeUp"
              delay={0.08}
              once
              amount={0.2}
            >
              <FeaturedProject
                title="Vosynia"
                summary="A living worldbook for the TTRPG setting of Vosynia—an atlas of provinces, leaders, cultures, and creatures; built to onboard new players fast and keep veterans immersed between sessions."
                bullets={[
                  "React, TypeScript, ChakraUI",
                  "Python, OpenAI API",
                  "Selenium, Midjourney",
                  "AWS",
                ]}
                ctaHref="/projects/vosynia"
                ctaLabel="View Project"
                imageSrc="/aurora-hyper.jpg"
                imageAlt="Marti portrait"
                imageAspect="phone"
                tilt={false}
              />
            </AnimateOnView>
          </div>
        </PageFrame>
      </main>
    </section>
  );
}
