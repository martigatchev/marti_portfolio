// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { inter, display } from "./fonts";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Marti Gatchev – Portfolio",
  description: "Full-stack developer portfolio site of Marti Gatchev.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable}`}
    >
      <body className="antialiased font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex">
              <PageFrame inset="p-0">{children}</PageFrame>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
