"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  const defaultLogoColor =
    "text-[#134E4A] drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]";
  const defaultNavColor = "text-[#134E4A]/70";
  const defaultNavHover = "hover:text-[#134E4A]";
  const defaultNavActive =
    "text-[#134E4A] font-black underline decoration-[#0D9488] decoration-2 underline-offset-8";
  const defaultUnderline = "bg-[#0D9488]";
  const defaultToggle =
    "text-[#134E4A] bg-white/30 backdrop-blur-xl border-white/40 shadow-sm hover:bg-white/50 transition-all";

  return (
    <>
      {}
      <header
        id="site-header-desktop"
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-6 lg:px-12 h-20 transition-all duration-500 ${
          isWinter
            ? scrolled
              ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent border-b border-transparent"
            : scrolled
              ? "bg-white/20 backdrop-blur-[32px] border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        {}
        <Link
          href="/"
          aria-label="Back to top"
          className={`font-cormorant text-2xl lg:text-3xl font-black tracking-[0.25em] transition-opacity hover:opacity-70 ${
            isWinter ? "text-white" : defaultLogoColor
          }`}
        >
          MM
        </Link>

        {}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <ul className="flex items-center gap-12 list-none m-0 p-0">
            {NAV.map(({ label, href }) => {
              const id = href.replace("/#", "");
              const isActive = active === id;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative font-cormorant text-[13px] lg:text-[14px] font-black tracking-[0.2em] uppercase transition-colors duration-300 pb-1.5 ${
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
                      className={`absolute bottom-0 left-0 right-0 h-px transform origin-left transition-transform duration-300 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      } ${isWinter ? "bg-white" : defaultUnderline}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
          className={`flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-all duration-300 ${
            isWinter
              ? "text-white/70 border-white/20 hover:text-white hover:border-white hover:bg-white/5"
              : defaultToggle
          }`}
        >
          {isWinter ? <IconSun /> : <IconSnow />}
          {isWinter ? "Day" : "Night"}
        </button>
      </header>

      {}
      <nav
        id="site-nav-mobile"
        aria-label="Mobile navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center items-end pointer-events-none pb-6"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1.5 px-3 py-2.5 rounded-[24px] shadow-2xl backdrop-blur-3xl border transition-colors duration-500 ${
            isWinter
              ? "bg-black/60 border-white/10 shadow-black/80"
              : "bg-white/20 border-white/30 shadow-xl"
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
                className={`group flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? isWinter
                      ? "bg-white/10 text-white scale-110"
                      : "bg-[#0d9488]/10 text-[#0d9488] scale-110"
                    : isWinter
                      ? "text-white/50 hover:text-white hover:bg-white/5"
                      : "text-[#78716c] hover:text-[#1c1917] hover:bg-[#1c1917]/5"
                }`}
              >
                <Icon />
              </Link>
            );
          })}

          <div
            className={`w-px h-8 mx-1 ${isWinter ? "bg-white/10" : "bg-[#1c1917]/10"}`}
          />

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
            className={`group flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              isWinter
                ? "text-white/50 hover:text-white hover:bg-white/5"
                : "text-[#78716c] hover:text-[#1c1917] hover:bg-[#1c1917]/5"
            }`}
          >
            <div className="transition-transform duration-300 group-hover:rotate-45">
              {isWinter ? <IconSun /> : <IconSnow />}
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
