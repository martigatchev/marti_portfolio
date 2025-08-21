// page.tsx

import Image from "next/image";

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

        {/* Image at the bottom */}
        <Image
          src="/aurora-hyper.jpg"           // put your file in /public/marti.jpg
          alt="Marti portrait"
          width={1200}               // pick sensible intrinsic size
          height={800}
          className="mt-12 w-full max-w-3xl rounded-lg border"
          priority={false}           // keep lazy-loading (default); set true if above-the-fold
        />
      </main>
    </section>
  );
}