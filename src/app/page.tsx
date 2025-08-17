// page.tsx

export default function Home() {
  return (
    <section className="bg-grid min-h-screen w-full px-6 sm:px-12 py-20">
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="font-display tracking-tightest uppercase text-4xl sm:text-8xl">
          Hello, I’m Marti
        </h1>
        <p className="text-sub uppercase max-w-xl text-lg sm:text-xl text-muted-foreground">
          I’m a full-stack software engineer who loves building immersive tools and AI-powered systems.
        </p>

        <p className="mt-20 max-w-xl font-sans font-light tracking-[0.02em] leading-relaxed text-lg sm:text-xl text-muted-foreground">
  I’m a full-stack software engineer who loves building immersive tools and AI-powered systems.
</p>
      </main>
    </section>
  );
}
