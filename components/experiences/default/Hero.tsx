"use client";

/**
 * Hero
 *
 * - Name and title live only in /header.svg. An sr-only <h1> keeps the page
 *   semantics and SEO without repeating them visually.
 * - Skills are tactile, labelled items (no dead buttons, no hover-only info).
 * - Socials are real links with visible labels; one hover effect (lift).
 * - Respects prefers-reduced-motion for the entrance and the wave.
 */

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
  SiReact,
} from "react-icons/si";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaXTwitter } from "react-icons/fa6";

const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";
const GITHUB =
  process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab";
const LINKEDIN =
  process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab";
const TWITTER =
  process.env.NEXT_PUBLIC_PERSONAL_TWITTER || "https://x.com/mohd_musaiyab";

const EASE = [0.16, 1, 0.3, 1] as const;

const SKILLS: { label: string; note: string; icon: IconType; color: string }[] = [
  { label: "Go", note: "Concurrency", icon: SiGo, color: "#4fb3d9" },
  { label: "Redis", note: "Pub/Sub & caching", icon: SiRedis, color: "#ff9aa2" },
  { label: "PostgreSQL", note: "Relational schemas", icon: SiPostgresql, color: "#bfe8f2" },
  { label: "Docker", note: "Containers", icon: SiDocker, color: "#ffd23f" },
  { label: "Next.js", note: "Full-stack SSR", icon: SiNextdotjs, color: "#a8d672" },
  { label: "TypeScript", note: "Type safety", icon: SiTypescript, color: "#f4a259" },
  { label: "WebSockets", note: "Real-time", icon: SiSocketdotio, color: "#c77dff" },
  { label: "MERN", note: "Full-stack apps", icon: SiReact, color: "#61dafb" },
];

const SOCIALS: { label: string; icon: IconType; href: string; color: string }[] = [
  { label: "GitHub", icon: FaGithub, href: GITHUB, color: "#ffd23f" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: LINKEDIN, color: "#4fb3d9" },
  { label: "X", icon: FaXTwitter, href: TWITTER, color: "#a8d672" },
  { label: "Email", icon: FaEnvelope, href: `mailto:${EMAIL_ADDRESS}`, color: "#ff9aa2" },
];

/* ───────────── Tactile skill plank with micro-interaction ───────────── */
function Skill({ label, note, icon: Icon, color }: (typeof SKILLS)[number]) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduce
          ? undefined
          : {
              y: -2.5,
              transition: { duration: 0.16, ease: EASE },
            }
      }
      whileTap={reduce ? undefined : { y: 0 }}
      className="group relative flex cursor-default select-none items-center gap-3 rounded-md border-2 border-[#2b3a2f] bg-white p-2 pr-3 shadow-[2px_2px_0_0_#2b3a2f] transition-shadow duration-150 hover:shadow-[4px_4px_0_0_#2b3a2f] active:shadow-[1px_1px_0_0_#2b3a2f]"
    >
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border-2 border-[#2b3a2f] text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] transition-transform duration-200 ease-out group-hover:scale-105 group-hover:-rotate-3 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
        style={{ background: color }}
      >
        <Icon className="h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-tight text-[#2b3a2f]">
          {label}
        </span>
        <span className="block text-[13px] leading-snug text-[#4a5a4e]">{note}</span>
      </span>
    </motion.div>
  );
}

/* ───────────── Social link: visible label, one hover effect (lift) ───────────── */
function SocialLink({ label, icon: Icon, href, color }: (typeof SOCIALS)[number]) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-md border-2 border-[#2b3a2f] px-3.5 py-2 text-[15px] font-semibold text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#2b3a2f] active:translate-y-0 active:shadow-[1px_1px_0_0_#2b3a2f] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3a2f]"
      style={{ background: color }}
    >
      <Icon aria-hidden className="h-4 w-4" />
      {label}
    </a>
  );
}

/* ───────────── Hero ───────────── */
export default function Hero() {
  const reduce = useReducedMotion();

  const stagger = (each: number, delay = 0): Variants => ({
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : each, delayChildren: delay },
    },
  });

  const rise: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  };

  const plank: Variants = {
    hidden: (i: number) =>
      reduce
        ? { opacity: 1 }
        : {
            opacity: 0,
            y: -14,
            rotate: i % 2 === 0 ? -2.5 : 2.5,
            scale: 0.96,
          },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 360,
        damping: 22,
        mass: 0.8,
      },
    },
  };

  return (
    <section
      className="relative w-full bg-[#f8fafc] px-4 pb-20 pt-28 sm:px-6 sm:pt-36"
    >
      <div className="mx-auto max-w-5xl">
        {/* Name + title are part of the illustration; h1 is for semantics only */}
        <h1 className="sr-only">Mohd Musaiyab, Full Stack Developer</h1>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/header.svg"
            alt="A cartoon builder lays a bridge across a river, plank by plank."
            width={1200}
            height={400}
            draggable={false}
            fetchPriority="high"
            className="h-auto w-full select-none rounded-md border-2 border-[#2b3a2f] shadow-[3px_3px_0_0_#2b3a2f]"
          />
        </motion.div>

        <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-2 md:gap-12">
          {/* Bio + socials */}
          <motion.div
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.p
              variants={rise}
              className="text-xl font-semibold leading-snug text-[#2b3a2f] sm:text-2xl"
            >
              I take real-world problems and build clean, reliable software around them.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 text-base leading-relaxed text-[#4a5a4e]"
            >
              Most of my work is high-performance backends, distributed systems, and
              full-stack web apps.
            </motion.p>

            <motion.ul
              variants={stagger(0.06)}
              aria-label="Links"
              className="mt-8 flex flex-wrap gap-3"
            >
              {SOCIALS.map((s) => (
                <motion.li key={s.label} variants={rise}>
                  <SocialLink {...s} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Core stack card: planks on top, water along the bottom */}
          <div className="self-start overflow-hidden rounded-md border-2 border-[#2b3a2f] bg-white shadow-[3px_3px_0_0_#2b3a2f]">
            <div className="border-b-2 border-[#2b3a2f] bg-[#a8d672] px-4 py-2">
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f]">
                Core stack
              </h2>
            </div>

            <motion.ul
              variants={stagger(0.06, 0.2)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-2.5 p-4 min-[420px]:grid-cols-2"
            >
              {SKILLS.map((s, i) => (
                <motion.li key={s.label} custom={i} variants={plank}>
                  <Skill {...s} />
                </motion.li>
              ))}
            </motion.ul>

            <div
              aria-hidden
              className="overflow-hidden border-t-2 border-[#2b3a2f] bg-[#e6f5fa] py-2"
            >
              <motion.div
                className="flex w-[calc(100%+24px)]"
                animate={reduce ? {} : { x: [0, -24] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              >
                <svg className="h-3 w-full">
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
