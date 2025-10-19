// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/navigation/header";
import { inter, display } from "./fonts";
import StickyFooter from "@/components/navigation/sticky-footer";

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
      <body className="antialiased font-sans bg-background text-foreground overscroll-y-none">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col overscroll-contain">
            <Header borders={true} />
            {/* No global PageFrame here */}
            <main className="flex-1 flex">{children}</main>

            {/* <MultiFollowCursor
  hideSystemCursor
  blendMode="normal"
  dotColor="#000000ff"
  ring1Color="#f6d6faff"        // inner ring
  ring2Color="#e3b2f4ff"        // middle ring
  ring3Color="#af71cfff"        // outer ring
  ring2Enabled={false}
  ring3Enabled={false}
/> */}
            <StickyFooter />
            {/* <StickyFooter height={400} /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
