"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/store/useExperience";

const NAV = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
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

const MOB_NAV = [
  { label: "Experience", href: "#experience", Icon: IconTimeline },
  { label: "Projects", href: "#projects", Icon: IconBriefcase },
  { label: "Education", href: "#education", Icon: IconGraduate },
  { label: "Skills", href: "#skills", Icon: IconStar },
  { label: "Contact", href: "#contact", Icon: IconMail },
] as const;

function IconSnow() {
  return (
    <svg
      width="15"
      height="15"
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
      width="15"
      height="15"
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const ids = NAV.map((n) => n.href.replace("#", ""));
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

  const ink = isWinter ? "#ffffff" : "#0f172a";
  const inkDim = isWinter ? "rgba(255,255,255,0.5)" : "#94a3b8";

  // Clean white glass for default, dark glass for winter
  const bg = scrolled
    ? isWinter
      ? "rgba(15,23,42,0.85)"
      : "rgba(255,255,255,0.9)"
    : "transparent";
  const border = scrolled
    ? isWinter
      ? "rgba(255,255,255,0.1)"
      : "rgba(15,23,42,0.08)"
    : "transparent";

  if (!mounted) return null;

  return (
    <>
      <style>{`
        #site-header-desktop { display: none; }
        #site-nav-mobile     { display: flex; }
        @media (min-width: 768px) {
          #site-header-desktop { display: flex; }
          #site-nav-mobile     { display: none; }
        }
      `}</style>
      {/* Desktop / tablet header */}
      <header
        id="site-header-desktop"
        aria-label="Site navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          height: "64px",
          background: bg,
          borderBottom: `1px solid ${border}`,
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          transition:
            "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          willChange: "background",
        }}
      >
        <a
          href="#"
          aria-label="Back to top"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "0.95rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            color: ink,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          MM
        </a>

        <nav>
          <ul
            style={{
              display: "flex",
              gap: "2.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isActive ? ink : inkDim,
                      textDecoration: "none",
                      position: "relative",
                      paddingBottom: "4px",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = ink)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = isActive
                        ? ink
                        : inkDim)
                    }
                  >
                    {label}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: ink,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition:
                          "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: inkDim,
            background: "transparent",
            border: `1px solid ${border || (isWinter ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.15)")}`,
            borderRadius: "100px",
            padding: "0.4em 1em",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color = isWinter ? "#0f172a" : "#ffffff";
            el.style.backgroundColor = ink;
            el.style.borderColor = ink;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = inkDim;
            el.style.backgroundColor = "transparent";
            el.style.borderColor =
              border ||
              (isWinter ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.15)");
          }}
        >
          {isWinter ? <IconSun /> : <IconSnow />}
          {isWinter ? "Default" : "Dark"}
        </button>
      </header>

      {/* Mobile navigation floating pill */}
      <nav
        id="site-nav-mobile"
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          bottom: "env(safe-area-inset-bottom, 16px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          marginBottom: "16px",
          alignItems: "center",
          gap: "4px",
          background: isWinter
            ? "rgba(15,23,42,0.9)"
            : "rgba(255,255,255,0.95)",
          border: `1px solid ${isWinter ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)"}`,
          borderRadius: "100px",
          padding: "6px 10px",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: isWinter
            ? "0 10px 40px rgba(0,0,0,0.5)"
            : "0 10px 40px rgba(15,23,42,0.1)",
        }}
      >
        {MOB_NAV.map(({ label, href, Icon }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "8px 14px",
              borderRadius: "100px",
              color: active === href.replace("#", "") ? ink : inkDim,
              textDecoration: "none",
              background:
                active === href.replace("#", "")
                  ? isWinter
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(15,23,42,0.06)"
                  : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <Icon />
            <span
              style={{
                fontSize: "8.5px",
                fontFamily: "var(--font-dm-mono), monospace",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          </a>
        ))}

        <div
          style={{
            width: "1px",
            height: "28px",
            background: isWinter
              ? "rgba(255,255,255,0.15)"
              : "rgba(15,23,42,0.15)",
            margin: "0 2px",
          }}
        />
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isWinter ? "Default" : "Dark"} theme`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            padding: "8px 14px",
            borderRadius: "100px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: inkDim,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = ink)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = inkDim)
          }
        >
          {isWinter ? <IconSun /> : <IconSnow />}
          <span
            style={{
              fontSize: "8.5px",
              fontFamily: "var(--font-dm-mono), monospace",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {isWinter ? "Light" : "Dark"}
          </span>
        </button>
      </nav>
    </>
  );
}
