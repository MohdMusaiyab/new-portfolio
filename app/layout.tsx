import type { Metadata } from "next";
import { Cinzel, DM_Mono, Inter, Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import ExperienceProvider from "@/components/ExperienceProvider";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
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
  preload: false,
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
      className={`${cinzel.variable} ${cormorant.variable} ${dmMono.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-white/20"
      >
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        >
          <defs>
            <filter
              id="skill-pill-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>
        </svg>

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
