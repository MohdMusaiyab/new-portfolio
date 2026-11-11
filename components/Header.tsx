"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useExperience } from "@/store/useExperience";

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

function IconSnow() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}
function IconSun() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function ThemedLogo({ isWinter }: { isWinter: boolean }) {
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
      <motion.path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke={isWinter ? "rgba(255,255,255,0.1)" : "rgba(28,25,23,0.05)"}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
        animate={{
          stroke: isWinter ? "rgba(255,255,255,0.1)" : "rgba(28,25,23,0.05)",
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Main Logo Path */}
      <motion.path
        d="M10 60V20L35 45L60 20V60 M60 60V20L85 45L110 20V60"
        stroke={isWinter ? "#FFFFFF" : "#1c1917"}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        animate={{
          stroke: isWinter ? "#FFFFFF" : "#1c1917",
          filter: isWinter 
            ? "drop-shadow(0 0 12px rgba(255,255,255,0.6))" 
            : "drop-shadow(0 1px 2px rgba(28,25,23,0.08))",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Modern Accent Dot */}
      <motion.circle
        cx="115"
        cy="60"
        r="4"
        animate={{
          fill: isWinter ? "#FFFFFF" : "#1c1917",
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          fill: { duration: 0.8 },
          opacity: { duration: 2, repeat: Infinity },
          scale: { duration: 2, repeat: Infinity }
        }}
      />
    </motion.svg>
  );
}

export default function Header() {
  const { activeExperience, setExperience } = useExperience();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("");
  const raf = useRef<number | null>(null);
  const isWinter = activeExperience === "winter";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const toggleTheme = () => setExperience(isWinter ? "default" : "winter");

  if (!mounted) return null;

  const defaultNavColor = "text-stone-500";
  const defaultNavHover = "hover:text-stone-900";
  const defaultNavActive = "text-stone-900 font-semibold";
  const defaultUnderline = "bg-stone-900";
  const defaultToggle =
    "text-stone-700 bg-stone-100/90 border-stone-200/90 hover:bg-stone-200/70 hover:text-stone-900 transition-colors shadow-2xs";

  return (
    <>
      {/* ════════ DESKTOP HEADER ════════ */}
      <header
        id="site-header-desktop"
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-6 lg:px-12 h-16 transition-all duration-300 ${
          isWinter
            ? scrolled
              ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent border-b border-transparent"
            : scrolled
              ? "bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-2xs"
              : "bg-white/40 backdrop-blur-xs border-b border-transparent"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          aria-label="Back to top"
          className="flex items-center transition-transform duration-200 hover:opacity-80 active:scale-95"
        >
          <ThemedLogo isWinter={isWinter} />
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
                      isWinter
                        ? isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white"
                        : isActive
                          ? defaultNavActive
                          : `${defaultNavColor} ${defaultNavHover}`
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] transform origin-left transition-transform duration-200 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      } ${isWinter ? "bg-white" : defaultUnderline}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Theme Toggle Pill */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
          className={`flex items-center gap-2 font-dm-mono text-[11px] font-medium uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
            isWinter
              ? "text-white/70 border-white/20 hover:text-white hover:border-white hover:bg-white/5"
              : defaultToggle
          }`}
        >
          {isWinter ? <IconSun /> : <IconSnow />}
          {isWinter ? "Light" : "Frost"}
        </button>
      </header>

      {/* ════════ MOBILE BOTTOM NAVIGATION ════════ */}
      <nav
        id="site-nav-mobile"
        aria-label="Mobile navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center items-end pointer-events-none pb-6"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg backdrop-blur-xl border transition-all duration-300 ${
            isWinter
              ? "bg-black/80 border-white/10 shadow-black/80"
              : "bg-[#faf8f5]/90 border-stone-200/90 shadow-stone-300/40"
          }`}
        >
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
                    ? isWinter
                      ? "bg-white/15 text-white"
                      : "bg-stone-900 text-stone-50"
                    : isWinter
                      ? "text-white/50 hover:text-white"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <Icon />
              </Link>
            );
          })}

          <div
            className={`w-px h-6 mx-1 ${isWinter ? "bg-white/10" : "bg-stone-300"}`}
          />

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
            className={`group flex flex-col items-center p-2 rounded-full transition-all duration-200 cursor-pointer ${
              isWinter
                ? "text-white/50 hover:text-white"
                : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            }`}
          >
            <div className="transition-transform duration-200 group-hover:rotate-45">
              {isWinter ? <IconSun /> : <IconSnow />}
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
