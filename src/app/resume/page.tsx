// resume/pages.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Marti Gatchev",
  description: "Resume/CV overview for Marti Gatchev.",
};

export default function ResumePage() {
  return (
    <section className="bg-grid min-h-screen w-full px-6 sm:px-12 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-center">
          Resume
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-center">
          Roles, experience, education, and skills. (Placeholder layout)
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold">Experience</h2>
            <ul className="mt-4 space-y-4">
              <li className="rounded-lg border p-4">
                <div className="font-medium">Company · Role</div>
                <div className="text-sm text-muted-foreground">
                  2023 — Present · City, Country
                </div>
                <p className="mt-2 text-sm">
                  Bullet points of impact and responsibilities.
                </p>
              </li>
              <li className="rounded-lg border p-4">
                <div className="font-medium">Company · Role</div>
                <div className="text-sm text-muted-foreground">
                  2021 — 2023 · City, Country
                </div>
                <p className="mt-2 text-sm">
                  Another role summary with measurable outcomes.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Education</h2>
            <ul className="mt-4 space-y-4">
              <li className="rounded-lg border p-4">
                <div className="font-medium">School · Program</div>
                <div className="text-sm text-muted-foreground">Year — Year</div>
                <p className="mt-2 text-sm">Notes, awards, focus areas.</p>
              </li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold">Skills</h2>
            <div className="mt-4 rounded-lg border p-4 text-sm">
              React, Next.js, TypeScript, Node.js, Tailwind, shadcn/ui, …
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
