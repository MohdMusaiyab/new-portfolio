"use client";

import Link from "next/link";
import { useExperience } from "@/store/useExperience";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const INK = "#2b3a2f";

export default function NotFound() {
  const reduce = useReducedMotion();
  const { activeExperience } = useExperience();
  const [mounted, setMounted] = useState(false);
  const isWinter = activeExperience === "winter";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // ════════ WINTER (DARK) THEME ════════
  if (isWinter) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#080808] overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('/bg.webp')`,
            backgroundPosition: "center top",
          }}
        />

        {/* Atmospheric Radial Gradient Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(8,8,8,0.92) 75%, #080808 100%)",
          }}
        />

        {/* Film Grain Texture */}
        <div className="grain-overlay z-2" aria-hidden="true" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center px-6">
          {/* Hero 404 Title */}
          <motion.h1
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.05, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="font-cinzel font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest text-white mb-4"
            style={{
              textShadow:
                "0 0 40px rgba(255,255,255,0.25), 0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            404
          </motion.h1>

          {/* Subheading with signature horizontal rule accents */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center justify-center gap-3 md:gap-5 mb-8"
          >
            <div className="w-8 md:w-12 h-px bg-white/40" />
            <h2
              className="font-mono text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/80"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              Page Not Found
            </h2>
            <div className="w-8 md:w-12 h-px bg-white/40" />
          </motion.div>

          {/* Authentic Winter Action Button */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 px-6 md:px-7 py-3 font-mono text-[11px] md:text-xs tracking-[0.22em] uppercase bg-white text-black border border-white/80 hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Return to Portfolio</span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ════════ DEFAULT (LIGHT) THEME ════════
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[#f8fafc] text-[#2b3a2f] font-sans selection:bg-[#ffd23f]/40">
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-md border-2 bg-white text-[#2b3a2f] shadow-[3px_3px_0_0_#2b3a2f] overflow-hidden"
        style={{ borderColor: INK }}
      >
        {/* Software Viewport Window Header */}
        <div
          className="flex items-center justify-between px-3.5 py-2 bg-white border-b select-none"
          style={{ borderColor: `${INK}20` }}
        >
          {/* Window dots */}
          <div className="flex items-center gap-1.5" aria-hidden>
            <span
              className="w-2.5 h-2.5 rounded-full border"
              style={{ borderColor: INK, backgroundColor: "#ff9aa2" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border"
              style={{ borderColor: INK, backgroundColor: "#ffd23f" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border"
              style={{ borderColor: INK, backgroundColor: "#a8d672" }}
            />
          </div>
        </div>

        {/* Window Content */}
        <div className="p-8 sm:p-10 text-center space-y-4">
          <span className="block text-6xl sm:text-7xl font-mono font-bold tracking-tight text-[#2b3a2f]">
            404
          </span>

          <h1 className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] font-bold text-[#2b3a2f]/80">
            Page Not Found
          </h1>

          <div className="pt-4">
            <Link href="/">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border-2 font-mono text-xs font-bold text-[#2b3a2f] bg-[#ffd23f] shadow-[2px_2px_0_0_#2b3a2f] hover:shadow-[3.5px_3.5px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
                style={{ borderColor: INK }}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
                <span>Return to Portfolio</span>
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
