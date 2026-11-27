"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Copy, Check } from "lucide-react";
import BentoGallery from "./BentoGallery";

const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";
const GITHUB =
  process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab";
const LINKEDIN =
  process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab";
const TWITTER =
  process.env.NEXT_PUBLIC_PERSONAL_TWITTER || "https://x.com/mohd_musaiyab";

export default function Hero() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative w-full bg-white pt-20 pb-12 sm:pt-24 sm:pb-16 border-b border-zinc-100">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        {/* Compact Personal Bento Photo Grid */}
        <BentoGallery />

        {/* Identity & Role */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-zinc-950 font-sans leading-[1.2]">
          Mohd Musaiyab
        </h1>

        <p className="mt-1.5 text-base sm:text-lg font-normal text-zinc-500 tracking-tight font-sans">
          Systems &amp; Full-Stack Engineer · Pune, India
        </p>

        {/* Concise Narrative */}
        <p className="mt-4 text-[15px] sm:text-base leading-[1.7] text-zinc-600 max-w-[62ch] font-sans">
          I build distributed backend systems in Go, event-driven pipelines, and
          clean, responsive web applications with Next.js and TypeScript.
          Currently working as a Systems Engineer at{" "}
          <strong className="font-medium text-zinc-900">Infosys</strong>, focused
          on production reliability, database logic, and scalable architectures.
        </p>

        {/* Action Controls & Direct Links */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-950 text-white text-sm font-medium hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={copied ? "Email address copied" : `Copy email address ${EMAIL_ADDRESS}`}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 text-sm hover:bg-zinc-50 hover:text-zinc-950 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span className="font-mono text-xs text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                <span className="font-mono text-xs">{EMAIL_ADDRESS}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 sm:ml-2">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <FaGithub className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <FaLinkedinIn className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={TWITTER}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter) profile"
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <FaXTwitter className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Technical Focus & Core Tooling Breakdown */}
        <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-zinc-200/60 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
              Core Architecture
            </h2>
            <p className="mt-1.5 text-zinc-900 font-medium font-sans">
              Distributed Systems &amp; Concurrency
            </p>
            <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed font-sans">
              Go worker pools, Redis Pub/Sub, relational schemas &amp; low-latency event pipelines.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
              Primary Tooling
            </h2>
            <p className="mt-1.5 text-zinc-900 font-medium font-sans">
              Go · Redis · PostgreSQL · Next.js
            </p>
            <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed font-sans">
              Strict TypeScript architectures, Docker containers, and responsive user interfaces.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
