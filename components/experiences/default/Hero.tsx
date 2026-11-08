"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS & CONFIG
   Refined, craftsmanship-first, zero AI slop.
───────────────────────────────────────────────────────────── */
const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";

const SOCIALS = [
  {
    name: "GitHub",
    href: process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab",
    icon: Linkedin,
  },
] as const;

const CORE_STACK = [
  "Go",
  "Redis",
  "PostgreSQL",
  "Docker",
  "Next.js",
  "TypeScript",
  "WebSockets",
] as const;

export default function Hero() {
  const [localTime, setLocalTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Local IST time updater
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-16 px-5 sm:px-8 border-b border-stone-200/80 bg-[#faf8f5]/60 selection:bg-stone-200 selection:text-stone-900">
      <div className="max-w-2xl mx-auto">
        {/* Top bar: Calm Status Badge + Location & Local Time */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between gap-3 text-xs font-dm-mono text-stone-500 mb-7 select-none"
        >
          {/* Calm, disciplined status indicator (No generic pulsating dot) */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
            <span className="font-medium tracking-tight text-[11px]">
              Available for roles
            </span>
          </div>

          {/* Location & Time */}
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] sm:text-xs">
            <MapPin size={12} className="text-stone-400" />
            <span>Pune, IN</span>
            {localTime && (
              <>
                <span className="text-stone-300">•</span>
                <span className="tabular-nums font-mono">{localTime}</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Identity: Name, Role & Interactive Monochromatic Avatar */}
        <div className="flex items-start justify-between gap-5 mb-5">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900"
            >
              Mohd Musaiyab
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base text-stone-600 font-medium mt-0.5 tracking-tight"
            >
              Backend &amp; Distributed Systems Engineer
            </motion.p>
          </div>

          {/* Profile Picture with tactile hover frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-stone-300/80 bg-white shadow-2xs hover:border-stone-400 hover:shadow-xs transition-all duration-300 shrink-0"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100">
              <Image
                src="/portfolio.jpg"
                alt="Mohd Musaiyab"
                fill
                sizes="64px"
                priority
                className="object-cover grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-500 ease-out"
              />
            </div>
          </motion.div>
        </div>

        {/* Bio paragraph: High-signal, authentic technical focus */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-[15px] leading-relaxed text-stone-700 font-normal mb-6 text-pretty"
        >
          Specializing in concurrent Go backends, high-throughput message brokers,
          and resilient distributed pipelines. I focus on sub-50ms query discovery,
          worker-pool backpressure, and solid system architectures under the hood,
          paired with crisp Next.js interfaces when needed.
        </motion.p>

        {/* Core Stack strip with subtle interactive hover states */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center gap-1.5 mb-7"
        >
          <span className="inline-flex items-center gap-1 text-[11px] font-dm-mono uppercase tracking-wider text-stone-500 mr-1 select-none">
            <Terminal size={11} className="text-stone-400" />
            Stack:
          </span>
          {CORE_STACK.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-dm-mono bg-stone-100/90 text-stone-700 border border-stone-200/90 hover:border-stone-300 hover:bg-stone-200/70 hover:text-stone-900 transition-colors duration-200 cursor-default select-none"
            >
              {tech}
            </span>
          ))}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-dm-mono bg-emerald-50 text-emerald-800 border border-emerald-200/70 ml-1">
            Production &amp; Concurrency
          </span>
        </motion.div>

        {/* Action CTAs + Socials + Fast Copy Email */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200/80"
        >
          {/* Quick Nav Anchors */}
          <div className="flex items-center gap-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-stone-800 active:scale-[0.98] text-xs font-medium tracking-tight transition-all duration-200 shadow-2xs"
            >
              <span>Projects</span>
              <ArrowUpRight
                size={13}
                className="text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 hover:text-stone-900 active:scale-[0.98] text-xs font-medium tracking-tight transition-all duration-200 shadow-2xs"
            >
              <span>Contact</span>
            </a>
          </div>

          {/* Social Links & Copy Email (tactile, accessible min-h targets) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 active:scale-[0.97] text-xs transition-colors duration-200 cursor-pointer"
            >
              {copied ? (
                <Check size={13} className="text-emerald-600" />
              ) : (
                <Copy size={13} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
              )}
              <span className="font-dm-mono text-[11px]">
                {copied ? "Copied" : "Email"}
              </span>
            </button>

            {SOCIALS.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 active:scale-[0.97] text-xs transition-colors duration-200"
              >
                <Icon size={13} />
                <span className="hidden sm:inline font-dm-mono text-[11px]">{name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
