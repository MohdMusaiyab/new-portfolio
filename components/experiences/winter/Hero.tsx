"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/store/useExperience";

const ROLES = [
  "Backend Architect",
  "Full Stack Engineer",
  "Distributed Systems",
  "API Design Specialist",
];

export default function Hero() {
  const { setExperience } = useExperience();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        /* ── NEST HUB / LANDSCAPE OPTIMIZATION ── */
        @media (max-height: 720px) and (min-width: 768px) {
          .winter-title {
            font-size: clamp(2rem, 9vh, 4.5rem) !important;
            margin-bottom: 1rem !important;
          }
          .winter-bio {
            font-size: clamp(0.75rem, 4vh, 1rem) !important;
            margin-bottom: 1rem !important;
          }
          .winter-buttons {
            gap: 0.75rem !important;
          }
          .winter-btn {
            padding: 0.5rem 1rem !important;
          }
          .winter-footer {
            margin-top: 1rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
      <section className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#080808] pt-20">
        {}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.webp')`,
            backgroundPosition: "center top",
          }}
        />

        {}
        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.98) 100%)",
          }}
        />

        {}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          {}
          <motion.h1
            initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-cinzel font-bold leading-[0.9] tracking-wider md:tracking-widest mb-3 md:mb-6 text-white text-[clamp(1.85rem,9vmin,105px)] winter-title"
            style={{
              textShadow:
                "0 0 40px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Mohd <br className="md:hidden" />
            Musaiyab
          </motion.h1>

          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center justify-center gap-3 md:gap-6 mb-3 md:mb-8 lg:mb-12 h-6"
          >
            <div className="hidden md:block w-8 md:w-12 h-px bg-white/40" />
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-mono text-[10px] md:text-xs lg:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-white shadow-black"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
            <div className="hidden md:block w-8 md:w-12 h-px bg-white/40" />
          </motion.div>

          {}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="font-sans font-light text-[13px] md:text-base lg:text-lg leading-relaxed text-white/90 max-w-2xl mb-5 md:mb-8 drop-shadow-xl text-balance winter-bio"
          >
            Hey, I’m Musaiyab — a full stack developer who enjoys building
            clean, fast, and reliable products. I care about both how things
            look and how they work under the hood.
          </motion.p>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.75,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 winter-buttons"
          >
            <a
              href="#projects"
              className="winter-btn inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 font-mono text-[9px] md:text-xs tracking-[0.14em] md:tracking-[0.22em] uppercase bg-white text-black border border-white/80 hover:bg-transparent hover:text-white hover:border-white transition-all duration-300"
            >
              Explore
            </a>

            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK || "/resume.pdf"}
              target="_blank"
              className="winter-btn inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 font-mono text-[9px] md:text-xs tracking-[0.14em] md:tracking-[0.22em] uppercase text-white/90 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: "linear" }}
            className="flex items-center justify-center gap-3 md:gap-6 mt-6 md:mt-14 lg:mt-20 font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.28em] uppercase text-white/50 drop-shadow-md winter-footer"
          >
            <span>1 Yrs Exp</span>
            <span className="w-px h-2.5 md:h-3 bg-white/30" />
            <span>Full Stack</span>
            <span className="w-px h-2.5 md:h-3 bg-white/30" />
            <span className="text-white/80">Open to Work</span>
          </motion.div>
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 z-20 scroll-indicator"
        >
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-white/50">
            Scroll
          </span>
          <motion.div
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
              originY: 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 md:h-12 bg-linear-to-b from-white/80 to-transparent"
          />
        </motion.div>
      </section>
    </>
  );
}
