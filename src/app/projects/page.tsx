//projects/page.tsx
 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Marti Gatchev",
  description: "Selected projects and experiments by Marti Gatchev.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-grid min-h-screen w-full px-6 sm:px-12 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-center">
          Projects
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-center">
          A few things I’ve built and shipped. (Placeholder content)
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="rounded-lg border p-6">
              <div className="h-28 rounded-md bg-muted/40" />
              <h3 className="mt-4 text-xl font-semibold">Project {i}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Short description goes here. Tech stack, role, outcomes.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
