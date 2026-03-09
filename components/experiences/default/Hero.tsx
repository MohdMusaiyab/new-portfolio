"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Backend Architect",
  "Full Stack Engineer",
  "Systems Thinker",
  "API Design Specialist",
];

const LEARNING = [
  "Backend Principles",
  "Artificial Intelligence",
  "Data Structures & Algorithms",
];

// ── Tiny clock helper ──────────────────────────────────────────
function MiniClock({
  degrees,
}: {
  degrees: { h: number; m: number; s: number };
}) {
  return (
    <div className="relative w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center">
      <div
        className="absolute w-[1.5px] h-[5px] bg-slate-700 origin-bottom rounded-full"
        style={{ transform: `translateY(-2.5px) rotate(${degrees.h}deg)` }}
      />
      <div
        className="absolute w-px h-[7px] bg-slate-500 origin-bottom rounded-full"
        style={{ transform: `translateY(-3.5px) rotate(${degrees.m}deg)` }}
      />
      <div
        className="absolute origin-bottom rounded-full"
        style={{
          width: "0.5px",
          height: "8px",
          background: "#0f172a",
          transform: `translateY(-4px) rotate(${degrees.s}deg)`,
        }}
      />
      <div className="absolute w-1 h-1 bg-slate-700 rounded-full z-10" />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function BentoHero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const t1 = setInterval(tick, 1000);
    const t2 = setInterval(
      () => setRoleIdx((p) => (p + 1) % ROLES.length),
      3200,
    );
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  const formatIST = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

  const getHands = (d: Date | null) => {
    if (!d) return { h: 0, m: 0, s: 0 };
    const ist = new Date(
      d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );
    const sec = ist.getSeconds(),
      min = ist.getMinutes(),
      hrs = ist.getHours();
    return {
      s: sec * 6,
      m: min * 6 + sec * 0.1,
      h: (hrs % 12) * 30 + min * 0.5,
    };
  };

  const hands = getHands(time);

  // Card base class
  const card =
    "bg-white border border-slate-200 rounded-2xl shadow-[0_2px_16px_rgba(15,23,42,0.05)] p-5";

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 md:py-20 font-sans">
      {/* Soft neutral gradient halo */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 left-0 w-[500px] h-[500px] rounded-full bg-slate-100/70 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-slate-100/60 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1140px] flex flex-col lg:flex-row gap-8 items-stretch">
        {/* ═══ LEFT — Identity block ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col justify-between bg-white border border-slate-200 rounded-[2rem] md:rounded-3xl
            p-6 sm:p-8 md:p-12 shadow-[0_4px_28px_rgba(15,23,42,0.06)] min-h-[480px]"
        >
          {/* Top meta */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            <span className="w-5 h-px bg-slate-300" />
            Mohd Musaiyab · Full Stack Engineer
          </div>

          {/* Headline */}
          <div className="my-auto py-8 md:py-10">
            <h1 className="text-4xl sm:text-5xl md:text-[68px] lg:text-7xl font-extrabold tracking-tighter leading-[1.05] md:leading-[0.92] text-slate-900 mb-5 md:mb-6">
              Building
              <br />
              systems that{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                  backgroundSize: "200% auto",
                  animation: "shine 4s linear infinite",
                }}
              >
                scale.
              </span>
            </h1>

            {/* Animated role */}
            <div className="flex items-center gap-3 h-6 overflow-hidden mb-8">
              <div className="w-5 h-px bg-slate-300" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIdx]}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500"
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-slate-500 text-sm sm:text-[15px] leading-[1.6] md:leading-[1.75] max-w-[44ch]">
              Backend-heavy full stack engineer focused on robust
              infrastructure, scalable architectures, and performant web
              products. Currently at Infosys as a Systems Engineer.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-slate-100 pt-6 md:pt-7">
            <a
              href="#projects"
              className="flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-xl text-xs font-bold
                hover:bg-slate-700 hover:scale-[1.02] transition-all duration-200 shadow-md shadow-slate-900/20"
            >
              View Projects <span className="text-slate-400">↗</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1DoJQ6utcStOsnQwvycPzRirq6FNgJjaJ/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-200 bg-white px-7 py-3 rounded-xl text-xs font-bold text-slate-700
                hover:border-slate-400 hover:bg-slate-50 hover:scale-[1.02] transition-all duration-200"
            >
              Resume
            </a>
            <div className="mt-3 sm:mt-0 sm:ml-auto flex shrink-0 items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                Open to work
              </span>
            </div>
          </div>

          <style>{`
            @keyframes shine {
              0%   { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
        </motion.div>

        {/* ═══ RIGHT — Info grid ═══════════════════════════════════ */}
        <div className="w-full lg:w-[360px] flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`${card} flex items-center justify-around hover:scale-[1.02] transition-transform duration-300`}
          >
            {[
              { val: "1", sup: "YR", label: "Experience" },
              { val: "7", sup: "+", label: "Projects" },
            ].map(({ val, sup, label }) => (
              <div key={label} className="text-center px-4">
                <p className="text-3xl font-extrabold tracking-tighter text-slate-900">
                  {val}
                  <sup className="text-[11px] text-slate-400 ml-0.5 font-bold">
                    {sup}
                  </sup>
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                  {label}
                </p>
              </div>
            ))}
            <div className="w-px h-10 bg-slate-100" />
            {/* Location + Clock */}
            <div className="flex flex-col items-center gap-1 px-4">
              <MiniClock degrees={hands} />
              <p className="text-[9px] font-mono text-slate-400">
                {time ? formatIST(time) : "--:--:--"}
              </p>
              <p className="text-[10px] font-bold text-slate-700">Pune, IN</p>
            </div>
          </motion.div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_16px_rgba(15,23,42,0.05)] overflow-hidden hover:shadow-[0_4px_24px_rgba(15,23,42,0.1)] transition-all duration-300"
          >
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Currently Learning
              </span>
            </div>
            {LEARNING.map((item, i) => (
              <div
                key={i}
                className="px-5 py-3 border-b border-slate-50 last:border-none flex items-center justify-between
                  group cursor-default hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 group-hover:scale-105 group-hover:translate-x-0.5 inline-block transition-all duration-200">
                  {item}
                </span>
                <span className="text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-xs">
                  →
                </span>
              </div>
            ))}
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`${card} col-span-1 sm:col-span-2 lg:col-span-1`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Connect
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Building something interesting? Let&apos;s talk.
            </p>
            <div className="flex gap-2">
              {[
                {
                  href: "https://github.com/MohdMusaiyab",
                  label: "GitHub",
                  d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
                },
                {
                  href: "https://x.com",
                  label: "Twitter",
                  d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className="group flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-200
                    hover:bg-slate-900 hover:border-slate-900 hover:scale-[1.08] hover:shadow-[0_0_14px_rgba(15,23,42,0.28)] transition-all duration-200"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-500 group-hover:text-white transition-colors"
                  >
                    <path d={s.d} />
                    {s.label === "LinkedIn" && (
                      <>
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
