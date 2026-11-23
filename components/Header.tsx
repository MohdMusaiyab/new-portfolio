"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;

function IconBriefcase() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path
        strokeLinecap="round"
        d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      />
    </svg>
  );
}
function IconTimeline() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 10h10M4 14h6"
      />
    </svg>
  );
}
function IconStar() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" d="m2 4 10 9 10-9" />
    </svg>
  );
}
function IconGraduate() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 2 9l10 6 10-6-10-6Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9v8l10 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 9v8l-10 6" />
    </svg>
  );
}

const MOB_NAV = [
  { label: "Experience", href: "/#experience", Icon: IconTimeline },
  { label: "Projects", href: "/#projects", Icon: IconBriefcase },
  { label: "Education", href: "/#education", Icon: IconGraduate },
  { label: "Skills", href: "/#skills", Icon: IconStar },
  { label: "Contact", href: "/#contact", Icon: IconMail },
] as const;

function ThemedLogo() {
  return (
    <motion.svg
      width="42"
      height="42"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Decorative Shadow/Glow Layer */}
      <path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Main Logo Path */}
      <path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        style={{
          filter: "drop-shadow(0 0 12px rgba(255,255,255,0.6))",
        }}
      />

      {/* Modern Accent Dot */}
      <motion.circle
        cx="115"
        cy="60"
        r="4"
        fill="#FFFFFF"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity },
          scale: { duration: 2, repeat: Infinity },
        }}
      />
    </motion.svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const ids = NAV.map((n) => n.href.replace("/#", ""));
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el && el.getBoundingClientRect().top <= 120) {
            setActive(ids[i]);
            return;
          }
        }
        setActive("");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ════════ DESKTOP HEADER (WINTER) ════════ */}
      <header
        id="site-header-desktop"
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-6 lg:px-12 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          aria-label="Back to top"
          className="flex items-center transition-transform duration-200 hover:opacity-80 active:scale-95"
        >
          <ThemedLogo />
        </Link>

        {/* Center: Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {NAV.map(({ label, href }) => {
              const id = href.replace("/#", "");
              const isActive = active === id;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative text-[13px] font-dm-mono uppercase tracking-[0.14em] transition-colors duration-200 pb-1 ${
                      isActive ? "text-white font-bold" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] transform origin-left transition-transform duration-200 ease-out bg-white ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Contact CTA Button */}
        <Link
          href="/#contact"
          className="hidden md:inline-flex items-center gap-1.5 font-dm-mono text-[11px] font-medium uppercase tracking-[0.16em] px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer"
        >
          Say Hello
        </Link>
      </header>

      {/* ════════ MOBILE BOTTOM NAVIGATION (WINTER) ════════ */}
      <nav
        id="site-nav-mobile"
        aria-label="Mobile navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center items-end pointer-events-none pb-6"
      >
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg backdrop-blur-xl border transition-all duration-300 bg-black/80 border-white/10 shadow-black/80">
          {MOB_NAV.map(({ label, href, Icon }) => {
            const id = href.replace("/#", "");
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`group flex flex-col items-center p-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
