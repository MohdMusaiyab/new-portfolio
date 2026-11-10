"use client";

/**
 * Setup
 *   npm i react-icons framer-motion
 *   Put your banner at /public/header.svg
 *
 * Palette is taken from the banner: its dark-green outline ink and the
 * sun / river / grass / flower colours that fill each icon on hover.
 */

import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiGo,
  SiRedis,
  SiPostgresql,
  SiDocker,
  SiNextdotjs,
  SiTypescript,
  SiSocketdotio,
} from "react-icons/si";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { Check } from "lucide-react";

const INK = "#2b3a2f";

const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";
const GITHUB =
  process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab";
const LINKEDIN =
  process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab";

const SKILLS: { label: string; icon: IconType; color: string; tilt: number; tag?: string }[] = [
  { label: "Go", icon: SiGo, color: "#4fb3d9", tilt: -5, tag: "Go • Goroutines & Concurrency" },
  { label: "Redis", icon: SiRedis, color: "#ff9aa2", tilt: 4, tag: "Redis • Pub/Sub & Caching" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#bfe8f2", tilt: -4, tag: "PostgreSQL • Relational Schemas" },
  { label: "Docker", icon: SiDocker, color: "#ffd23f", tilt: 5, tag: "Docker • Containerization" },
  { label: "Next.js", icon: SiNextdotjs, color: "#a8d672", tilt: -5, tag: "Next.js • Full-stack SSR" },
  { label: "TypeScript", icon: SiTypescript, color: "#f4a259", tilt: 4, tag: "TypeScript • Type Safety" },
  { label: "WebSockets", icon: SiSocketdotio, color: "#c77dff", tilt: -4, tag: "WebSockets • Real-time Hub" },
];

/* ─────────────────────────────────────────────────────────────
   TILE
   Icon only. On hover: the tile lifts and tilts, a hard ink shadow
   appears, and a colour floods in from wherever the cursor entered
   (and drains out toward wherever it leaves). The name shows in a
   small tag, like the banner's speech bubbles.
───────────────────────────────────────────────────────────── */
type TileProps = {
  label: string;
  icon: IconType;
  color: string;
  tilt?: number;
  round?: boolean;
  href?: string;
  onClick?: () => void;
  override?: React.ReactNode; // swap the icon (e.g. a check mark)
  tag?: string; // tooltip text, defaults to label
};

function Tile({
  label,
  icon: Icon,
  color,
  tilt = 0,
  round = false,
  href,
  onClick,
  override,
  tag,
}: TileProps) {
  const fill = useRef<HTMLSpanElement>(null);

  const setOrigin = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    fill.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    fill.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const size = round ? "h-10 w-10" : "h-11 w-11 sm:h-14 sm:w-14";
  const shape = round ? "rounded-full" : "rounded-xl sm:rounded-2xl";

  const inner = (
    <>
      <span
        ref={fill}
        aria-hidden
        className="absolute inset-0 transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:circle(0px_at_var(--x,50%)_var(--y,50%))] group-hover:[clip-path:circle(160px_at_var(--x,50%)_var(--y,50%))] group-focus-within:[clip-path:circle(160px_at_var(--x,50%)_var(--y,50%))]"
        style={{ background: color }}
      />
      {override ?? (
        <Icon className="relative h-[18px] w-[18px] sm:h-6 sm:w-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      )}
    </>
  );

  const surface = `relative flex items-center justify-center overflow-hidden border-2 bg-white text-[#2b3a2f] transition-shadow duration-300 group-hover:shadow-[3px_3px_0_0_#2b3a2f] group-focus-within:shadow-[3px_3px_0_0_#2b3a2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3a2f] ${size} ${shape}`;
  const surfaceStyle = { borderColor: INK };

  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -6, rotate: tilt, scale: 1.06 }}
      whileTap={{ scale: 0.94, y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 16 }}
      onPointerEnter={setOrigin}
      onPointerLeave={setOrigin}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={surface}
          style={surfaceStyle}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className={`${surface} ${onClick ? "cursor-pointer" : "cursor-default"}`}
          style={surfaceStyle}
        >
          {inner}
        </button>
      )}

      {/* Name tag */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-mono font-bold text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 z-30 shadow-[2px_2px_0_0_#2b3a2f]"
        style={{ background: INK }}
      >
        {tag ?? label}
        <span
          className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent"
          style={{ borderTopColor: INK }}
        />
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  // The one orchestrated moment: skills drop in one after another,
  // like planks being laid across the river in the banner.
  const row: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.2 } },
  };
  const plank: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: -22, rotate: -8 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 380, damping: 18 },
    },
  };

  return (
    <section className="w-full bg-[#fdfbf7] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <h1 className="sr-only">Mohd Musaiyab, full stack developer</h1>

        {/* Banner (plain <img> so the SVG's own animation keeps playing) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/header.svg"
          alt="A cartoon builder lays a bridge across a river, plank by plank."
          width={1200}
          height={400}
          draggable={false}
          className="h-auto w-full select-none rounded-md border border-[#2b3a2f]/20 shadow-[2px_2px_0_0_#2b3a2f]"
        />

        {/* Content row: aligned horizontally with the banner edges */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row md:items-start justify-between gap-10 lg:gap-14">
          {/* About / Bio - Left Aligned */}
          <div className="flex-1 max-w-xl text-left">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2b3a2f] mb-3">
              Mohd Musaiyab
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#2b3a2f]/85 mb-4 font-medium">
              Systems &amp; Full Stack Engineer specializing in concurrent Go backends,
              distributed message queues, and high-concurrency microservices.
            </p>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/70 mb-6">
              I build resilient distributed pipelines under the hood—focusing on sub-50ms
              query discovery and worker-pool backpressure—paired with fast, clean web interfaces.
            </p>

            {/* Socials & Copy Email */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + SKILLS.length * 0.08 + 0.1, duration: 0.5 }}
              className="flex items-center gap-3 pt-1"
            >
              <Tile label="GitHub" icon={FaGithub} color="#ffd23f" href={GITHUB} round tilt={-6} />
              <Tile label="LinkedIn" icon={FaLinkedinIn} color="#4fb3d9" href={LINKEDIN} round tilt={6} />
              <Tile
                label="Copy email"
                tag={copied ? "Copied" : "Copy email"}
                icon={FaEnvelope}
                color="#ff9aa2"
                onClick={copyEmail}
                round
                tilt={-6}
                override={
                  copied ? <Check className="relative h-[18px] w-[18px]" /> : undefined
                }
              />
            </motion.div>
          </div>

          {/* Skills: Planks over water - Aligned to the Right on Desktop */}
          <div className="flex flex-col items-center md:items-end shrink-0 pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#2b3a2f]/60 mb-4 self-center md:self-end">
              Core Engineering Stack
            </span>

            <motion.ul
              variants={row}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-2.5 max-w-md"
            >
              {SKILLS.map((s) => (
                <motion.li key={s.label} variants={plank}>
                  <Tile {...s} />
                </motion.li>
              ))}
            </motion.ul>

            <svg aria-hidden className="mt-5 h-3 w-full max-w-[280px]">
              <defs>
                <pattern id="wave" width="24" height="12" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 6 Q6 0 12 6 T24 6"
                    fill="none"
                    stroke="#4fb3d9"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="12" fill="url(#wave)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}