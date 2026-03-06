import type { Metadata } from "next";
import { Cinzel, DM_Mono, Inter, Geist, Geist_Mono } from "next/font/google";
import ExperienceProvider from "@/components/ExperienceProvider";
import "./globals.css";

/* ─── Self-hosted fonts via next/font ────────────────────────────────────────
   Each font is downloaded at build time and served from the same origin.
   No render-blocking network request to fonts.googleapis.com.
   display:"swap" ensures text is visible immediately with fallback.
─────────────────────────────────────────────────────────────────────────── */

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
  preload: false, // only used in body copy — no need to preload
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohd Musaiyab — Full Stack Developer",
  description:
    "Portfolio of Mohd Musaiyab — Full Stack & Backend Engineer specialising in high-concurrency systems, React, Next.js, Go, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      /* CSS variables from next/font are applied here so every component
         can access them via var(--font-cinzel), var(--font-dm-mono), etc. */
      className={`${cinzel.variable} ${dmMono.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let state = localStorage.getItem("experience-storage");
                if (state) {
                  let parsed = JSON.parse(state);
                  let exp = parsed?.state?.activeExperience;
                  if (exp) {
                    document.documentElement.setAttribute("data-experience", exp);
                  }
                }
              } catch (e) {}
            `,
          }}
        />
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
