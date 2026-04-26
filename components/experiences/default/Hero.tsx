"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import SkillNode from "@/components/ui/SkillNode";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/** Letter-by-letter name reveal */
const letterContainer: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};
const letterChild: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Spring pop for chips / cards */
const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.78 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.45 + i * 0.055,
      type: "spring",
      stiffness: 380,
      damping: 22,
    },
  }),
};

/** Soft float for right-panel cards */
const floatUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ─────────────────────────────────────────────
   LIVE CLOCK
───────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[#0d9488] font-bold tabular-nums tracking-tight text-sm">
      {time} IST
    </span>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED NAME WORD
───────────────────────────────────────────── */
function AnimatedWord({
  text,
  outlined,
  delay,
}: {
  text: string;
  outlined?: boolean;
  delay: number;
}) {
  return (
    <motion.span
      className="inline-flex overflow-hidden"
      style={{ perspective: 600 }}
      custom={delay}
      variants={letterContainer}
      initial="hidden"
      animate="show"
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          variants={letterChild}
          className="inline-block"
          style={
            outlined
              ? {
                  WebkitTextStroke: "2.5px #0d9488",
                  color: "transparent",
                }
              : {}
          }
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const SKILLS = [
  "Next.js",
  "Go",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
] as const;

const SOCIALS = [
  {
    Icon: Github,
    href: `${process.env.NEXT_PUBLIC_PERSONAL_GITHUB}`,
    label: "GitHub",
  },
  {
    Icon: Linkedin,
    href: `${process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN}`,
    label: "LinkedIn",
  },
  {
    Icon: Mail,
    href: `mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL}`,
    label: "Email",
  },
] as const;

const STATS = [
  { value: "1+", label: "Years" },
  { value: "7+", label: "Projects" },
  { value: "∞", label: "Tea" },
] as const;

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK || "#";
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative w-full min-h-screen bg-[#fdfbf7] flex flex-col overflow-hidden">
      {/* ── Animated ambient blob (top-right) ── */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-24 w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full bg-teal-300/[0.07] md:bg-teal-300/10 blur-[80px] md:blur-[140px]"
        animate={
          prefersReduced
            ? {}
            : {
                scale: [1, 1.12, 1.04, 1],
                x: [0, 18, -8, 0],
                y: [0, -14, 10, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* ── Animated ambient blob (bottom-left) ── */}
      <motion.div
        className="pointer-events-none absolute -bottom-16 -left-16 w-[180px] h-[180px] md:w-[340px] md:h-[340px] rounded-full bg-teal-200/[0.05] md:bg-teal-200/10 blur-[60px] md:blur-[100px]"
        animate={
          prefersReduced
            ? {}
            : {
                scale: [1, 1.08, 1],
                x: [0, -12, 0],
                y: [0, 10, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── BODY ──
          pt-28 on md/lg to clear fixed header and allow vertical centering below it.
          pb-24 clears mobile nav when applicable.
      ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 md:gap-12 lg:gap-8 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-20 pt-20 md:pt-24 lg:pt-24 pb-16 sm:pb-20 lg:pb-8">
        {/* ════════ LEFT ════════ */}
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 lg:max-w-[640px]">
          {/* Intro Badge */}
          <motion.div
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center gap-2"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0d9488]/80">
              Full Stack Engineer
            </span>
          </motion.div>
          {/* Name — letter-by-letter */}
          <h1
            className="font-black uppercase tracking-tighter leading-[0.84] text-[#1c1917]"
            style={{ fontSize: "clamp(32px, min(9vw, 11vh), 110px)" }}
          >
            <AnimatedWord text="Mohd" delay={0.08} />
            <br />
            <AnimatedWord text="Musaiyab" outlined delay={0.28} />
          </h1>

          {/* Bio */}
          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="text-[14px] sm:text-[15px] lg:text-base text-[#57534e] leading-[1.8] font-medium max-w-[480px] lg:max-w-[540px]"
          >
            I build scalable web systems — from{" "}
            <span className="text-[#0d9488] font-semibold">MERN & Next.js</span>{" "}
            frontends to robust{" "}
            <span className="text-[#0d9488] font-semibold">Go backends</span>.
            Passionate about clean architecture and premium digital experiences.
          </motion.p>

          {/* Skills — spring pop-in */}
          <div className="flex flex-wrap gap-2 pt-1">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill}
                custom={i}
                variants={springPop}
                initial="hidden"
                animate="show"
              >
                <SkillNode name={skill} delay={0} small />
              </motion.div>
            ))}
          </div>

          {/* CTAs — shimmer slide-up */}
          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-2 md:gap-2.5 pt-1"
          >
            {/* Primary */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.04,
                y: -2,
                boxShadow: "0 14px 32px rgba(13,148,136,0.28)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 md:px-6 md:py-2.5 bg-[#0d9488] text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.18em] rounded-md md:rounded-xl shadow-lg shadow-teal-500/20"
            >
              {/* shimmer sweep */}
              <motion.span
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{
                  delay: 1.4,
                  duration: 0.7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
              Let&apos;s Connect <ArrowUpRight size={11} className="md:size-[13px]" />
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-6 md:py-2.5 bg-white border border-[#e7e5e4] text-[#1c1917] text-[9px] md:text-[11px] font-black uppercase tracking-[0.18em] rounded-md md:rounded-xl hover:border-[#0d9488]/30 hover:bg-teal-50/20 transition-all"
            >
              Projects
            </motion.a>

            <motion.a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-3 py-1.5 md:px-5 md:py-2.5 bg-white border border-[#e7e5e4] text-[#57534e] text-[9px] md:text-[11px] font-black uppercase tracking-[0.18em] rounded-md md:rounded-xl hover:border-[#0d9488]/30 hover:text-[#0d9488] transition-all"
            >
              Resume <ExternalLink size={10} className="md:size-[11px]" />
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center gap-6 pt-2"
          >
            <div className="flex items-center gap-5">
              {SOCIALS.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.8 + i * 0.08,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.25,
                    y: -3,
                    color: "#0d9488",
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  className="text-[#a8a29e] transition-colors"
                >
                  <Icon size={19} strokeWidth={2} />
                </motion.a>
              ))}
            </div>
            <div className="w-px h-5 bg-[#e7e5e4]" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c7c3bf]">
                Pune, India
              </span>
            </div>
          </motion.div>
        </div>

        {/* ════════ RIGHT: INFO PANEL ════════ */}
        <div className="flex flex-col gap-3 w-full lg:w-[300px] lg:min-w-[300px] shrink-0 mt-8 lg:mt-0">
          {/* Clock — float up */}
          <motion.div
            custom={0}
            variants={floatUp}
            initial="hidden"
            animate="show"
            className="flex items-center justify-between px-5 py-4 bg-white/90 border border-[#e7e5e4] rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] backdrop-blur-md"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#a8a29e] mb-1">
                Local Time
              </p>
              <LiveClock />
            </div>
            {/* Subtle rotating ring */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="w-10 h-10 rounded-full border border-[#0d9488]/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute w-2 h-2 rounded-full bg-[#0d9488] shadow-[0_0_10px_rgba(13,148,136,0.5)] animate-pulse" />
            </div>
          </motion.div>

          {/* Stats — staggered spring */}
          <div className="grid grid-cols-3 gap-3">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                custom={i + 1}
                variants={floatUp}
                initial="hidden"
                animate="show"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(13,148,136,0.25)",
                  backgroundColor: "rgba(255,255,255,1)",
                }}
                className="flex flex-col items-center py-4 bg-white/90 border border-[#e7e5e4] rounded-2xl shadow-[0_4px_20px_-12px_rgba(0,0,0,0.05)] transition-all cursor-default"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.65 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="text-xl md:text-2xl font-black tracking-tighter text-[#1c1917]"
                >
                  {value}
                </motion.span>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#a8a29e] mt-1">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Currently Building */}
          <motion.a
            href="https://github.com/MohdMusaiyab/snippitt"
            target="_blank"
            rel="noopener noreferrer"
            custom={4}
            variants={floatUp}
            initial="hidden"
            animate="show"
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: "0 20px 40px -15px rgba(13,148,136,0.15)",
              borderColor: "rgba(13,148,136,0.3)",
            }}
            className="group flex flex-col gap-3 px-5 py-4 bg-white/90 border border-[#e7e5e4] rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-2 h-2 rounded-full bg-[#0d9488] animate-ping opacity-40" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0d9488]">
                  Currently Building
                </span>
              </div>
              <motion.div
                whileHover={{ x: 2, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowUpRight
                  size={14}
                  className="text-[#a8a29e] group-hover:text-[#0d9488] transition-colors"
                />
              </motion.div>
            </div>
            <div className="pl-4 border-l-2 border-[#0d9488]/20 group-hover:border-[#0d9488]/40 transition-colors">
              <p className="text-[13px] font-black text-[#1c1917] tracking-tight">Snippitt</p>
              <p className="text-[11px] text-[#57534e] font-medium mt-1 leading-relaxed">
                A searchable knowledge base to capture and organize insights.
              </p>
            </div>
            <div className="flex items-center gap-2 pl-4">
              <Github size={12} className="text-[#a8a29e]" />
              <span className="text-[10px] font-bold text-[#a8a29e] tracking-tight">
                MohdMusaiyab/snippitt
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-20 pb-6 sm:pb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pt-4 border-t border-[#e7e5e4]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7c3bf]">
            Open to freelance &amp; full-time roles
          </p>
          <motion.a
            href="#experience"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#78716c] hover:text-[#0d9488] transition-colors group"
          >
            View experience{" "}
            <ArrowUpRight
              size={11}
              className="group-hover:rotate-12 transition-transform"
            />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
