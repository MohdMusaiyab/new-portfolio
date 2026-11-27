"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useExperience } from "@/store/useExperience";
import { Sun, Snowflake } from "lucide-react";

/* ── Light / Default Theme Navigation (Custom Ordering & Naming) ── */
const LIGHT_NAV = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Github", href: "/#github-activity", id: "github-activity" },
  { label: "Work", href: "/#experience", id: "experience" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Education", href: "/#education", id: "education" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

/* ── Winter / Dark Theme Navigation (Original Sequence Preserved) ── */
const WINTER_NAV = [
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Education", href: "/#education", id: "education" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

function IconBriefcase() {
  return (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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

function IconUser() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="8" r="4.5" />
      <path strokeLinecap="round" d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

function IconGitCommit() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="3" />
      <line x1="3" y1="12" x2="9" y2="12" strokeLinecap="round" />
      <line x1="15" y1="12" x2="21" y2="12" strokeLinecap="round" />
    </svg>
  );
}

const LIGHT_MOB_NAV = [
  { label: "About", href: "/#about", id: "about", Icon: IconUser },
  { label: "Projects", href: "/#projects", id: "projects", Icon: IconBriefcase },
  { label: "Github", href: "/#github-activity", id: "github-activity", Icon: IconGitCommit },
  { label: "Work", href: "/#experience", id: "experience", Icon: IconTimeline },
  { label: "Skills", href: "/#skills", id: "skills", Icon: IconStar },
  { label: "Education", href: "/#education", id: "education", Icon: IconGraduate },
  { label: "Contact", href: "/#contact", id: "contact", Icon: IconMail },
] as const;

const WINTER_MOB_NAV = [
  { label: "Experience", href: "/#experience", id: "experience", Icon: IconTimeline },
  { label: "Projects", href: "/#projects", id: "projects", Icon: IconBriefcase },
  { label: "Education", href: "/#education", id: "education", Icon: IconGraduate },
  { label: "Skills", href: "/#skills", id: "skills", Icon: IconStar },
  { label: "Contact", href: "/#contact", id: "contact", Icon: IconMail },
] as const;

function ThemedLogo({ isLight }: { isLight: boolean }) {
  const strokeColor = isLight ? "#09090b" : "#FFFFFF";
  const glowColor = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)";

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke={glowColor}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <motion.circle
        cx="115"
        cy="60"
        r="4"
        fill={strokeColor}
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
  const { activeExperience, setExperience } = useExperience();
  const isLight = activeExperience === "default";
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("");
  const raf = useRef<number | null>(null);

  const currentNav = isLight ? LIGHT_NAV : WINTER_NAV;
  const currentMobNav = isLight ? LIGHT_MOB_NAV : WINTER_MOB_NAV;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const ids = (isLight ? LIGHT_NAV : WINTER_NAV).map((n) => n.id);
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el && el.getBoundingClientRect().top <= 140) {
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
  }, [isLight]);

  if (!mounted) return null;

  return (
    <>
      {/* ════════ DESKTOP HEADER ════════ */}
      <header
        id="site-header-desktop"
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center h-16 transition-all duration-300 ${
          scrolled
            ? isLight
              ? "bg-white/80 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs"
              : "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto w-full flex items-center justify-between h-full relative ${
            isLight ? "max-w-4xl px-4 sm:px-6 lg:px-8" : "px-6 lg:px-12"
          }`}
        >
          {/* Left: Brand Logo */}
          <Link
            href="/"
            aria-label="Back to top"
            className="flex items-center transition-transform duration-200 hover:opacity-80 active:scale-95"
          >
            <ThemedLogo isLight={isLight} />
          </Link>

          {/* Center: Navigation */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <ul
              className={`flex items-center ${
                isLight ? "gap-6" : "gap-8"
              } list-none m-0 p-0`}
            >
              {currentNav.map(({ label, href, id }) => {
                const isActive = active === id;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-[13px] font-mono tracking-tight transition-colors duration-200 pb-1 ${
                        isLight
                          ? isActive
                            ? "text-zinc-950 font-semibold"
                            : "text-zinc-500 hover:text-zinc-950"
                          : isActive
                          ? "text-white font-bold"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[1.5px] transform origin-left transition-transform duration-200 ease-out ${
                          isLight ? "bg-zinc-950" : "bg-white"
                        } ${isActive ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Theme Switcher via Icons */}
          <div className="flex items-center">
            <div
              className={`flex items-center p-1 rounded-full border transition-colors ${
                isLight
                  ? "border-zinc-200 bg-zinc-100/80 text-zinc-600"
                  : "border-white/15 bg-white/5 text-white/70"
              }`}
              role="group"
              aria-label="Theme switcher"
            >
              <button
                type="button"
                onClick={() => setExperience("default")}
                aria-label="Switch to Light theme"
                title="Light theme"
                className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isLight
                    ? "bg-white text-zinc-950 shadow-2xs"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Sun size={15} />
              </button>
              <button
                type="button"
                onClick={() => setExperience("winter")}
                aria-label="Switch to Winter theme"
                title="Winter theme"
                className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  !isLight
                    ? "bg-white text-zinc-950 shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-900"
                }`}
              >
                <Snowflake size={15} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════ MOBILE BOTTOM NAVIGATION ════════ */}
      <nav
        id="site-nav-mobile"
        aria-label="Mobile navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center items-end pointer-events-none pb-6"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full shadow-lg backdrop-blur-xl border transition-all duration-300 ${
            isLight
              ? "bg-white/90 border-zinc-200/90 shadow-zinc-950/5 text-zinc-600"
              : "bg-black/80 border-white/10 shadow-black/80 text-white"
          }`}
        >
          {currentMobNav.map(({ label, href, id, Icon }) => {
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`group flex flex-col items-center p-1.5 rounded-full transition-all duration-200 ${
                  isLight
                    ? isActive
                      ? "bg-zinc-100 text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-800"
                    : isActive
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Icon />
              </Link>
            );
          })}

          {/* Mobile Theme Toggle Icon */}
          <button
            type="button"
            onClick={() => setExperience(isLight ? "winter" : "default")}
            className={`p-1.5 rounded-full transition-all ml-1 cursor-pointer ${
              isLight
                ? "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={isLight ? "Switch to Winter theme" : "Switch to Light theme"}
            aria-label={isLight ? "Switch to Winter theme" : "Switch to Light theme"}
          >
            {isLight ? <Snowflake size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </nav>
    </>
  );
}
