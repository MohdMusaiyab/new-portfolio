"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Backend Architect",
  "Full Stack Engineer",
  "Distributed Systems",
  "API Design Specialist",
];

const FLOW_ITEMS = [
  "Backend Principles",
  "Artificial Intelligence",
  "Data Structures & Algorithms",
];

export default function BentoHero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    const roleTimer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(roleTimer);
    };
  }, []);

  const formatIST = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  const getISTDegrees = (d: Date | null) => {
    if (!d) return { h: 0, m: 0, s: 0 };
    const istStr = d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istStr);
    const seconds = istDate.getSeconds();
    const minutes = istDate.getMinutes();
    const hours = istDate.getHours();
    return {
      s: seconds * 6,
      m: minutes * 6 + seconds * 0.1,
      h: (hours % 12) * 30 + minutes * 0.5,
    };
  };

  const degrees = getISTDegrees(time);

  return (
    <section className="min-h-screen bg-[#f1ede8] flex items-center justify-center p-4 md:p-8 font-sans text-[#1c1917]">
      <div className="grid grid-cols-12 gap-3 w-full max-w-[1160px] auto-rows-auto md:grid-rows-[minmax(340px,auto)_180px]">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 md:col-span-7 bg-[#faf8f5] border border-[#e7e2db] rounded-[24px] p-8 md:p-12 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-6">
              Mohd Musaiyab · 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6">
              Building systems <br />
              that{" "}
              <em className="italic font-light text-blue-600 not-italic">
                scale.
              </em>
            </h1>
            <div className="flex items-center gap-3 h-6 overflow-hidden mb-6">
              <div className="w-6 h-[1px] bg-[#a8a29e]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIdx]}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-sm font-medium text-[#57534e] uppercase tracking-wider"
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-[#57534e] text-sm md:text-base leading-relaxed max-w-[48ch]">
              I&apos;m a backend-heavy full stack engineer focused on robust
              infrastructure. Currently specializing in scalable architectures
              and performant web products.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#e7e2db]">
            <a
              href="#projects"
              className="bg-[#1c1917] text-white px-6 py-3 rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform"
            >
              View Projects ↗
            </a>
            <a
              href="/resume.pdf"
              className="border border-[#e7e2db] px-6 py-3 rounded-xl text-xs font-bold text-[#57534e] hover:bg-[#f1ede8] transition-colors"
            >
              Resume
            </a>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-5 relative bg-[#d8d0c8] rounded-[24px] overflow-hidden group min-h-[300px]"
        >
          <Image
            src="/personal1.jpeg"
            alt="Mohd Musaiyab"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-4 bg-[#faf8f5] border border-[#e7e2db] rounded-[24px] flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#e7e2db] text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            Currently Learning
          </div>
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col">
              {FLOW_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-3.5 border-b border-[#e7e2db] last:border-none text-xs font-semibold flex items-center justify-between group cursor-default hover:bg-[#f1ede8] transition-colors"
                >
                  {item}
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 md:col-span-3 bg-[#faf8f5] border border-[#e7e2db] rounded-[24px] p-6 flex flex-col overflow-hidden"
        >
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-2">
            Connect
          </div>
          <p className="text-[11px] text-[#78716c] leading-relaxed mb-4">
            Let&apos;s build something together — find me on these platforms.
          </p>
          <div className="flex flex-row flex-wrap gap-2 mt-auto">
            <a
              href="https://github.com/MohdMusaiyab"
              target="_blank"
              aria-label="GitHub"
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#e7e2db] hover:bg-[#f1ede8] hover:scale-110 transition-all duration-200 group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#57534e] group-hover:text-blue-500 transition-colors"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#e7e2db] hover:bg-[#f1ede8] hover:scale-110 transition-all duration-200 group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#57534e] group-hover:text-blue-500 transition-colors"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              aria-label="Twitter"
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#e7e2db] hover:bg-[#f1ede8] hover:scale-110 transition-all duration-200 group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#57534e] group-hover:text-blue-500 transition-colors"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 md:col-span-5 bg-[#1c1917] rounded-[24px] p-6 flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Location
            </p>
            <p className="text-white font-bold text-sm">Pune, IN</p>
            <div className="flex items-center gap-2 mt-1">
              {}
              <div className="relative w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-white/5 shadow-inner">
                {}
                <div
                  className="absolute w-[1.5px] h-[4px] bg-white origin-bottom rounded-full"
                  style={{
                    transform: `translateY(-2px) rotate(${degrees.h}deg)`,
                  }}
                />
                {}
                <div
                  className="absolute w-[1px] h-[6px] bg-white/80 origin-bottom rounded-full"
                  style={{
                    transform: `translateY(-3px) rotate(${degrees.m}deg)`,
                  }}
                />
                {}
                <div
                  className="absolute w-[0.5px] h-[7px] bg-[#93E7FB] origin-bottom rounded-full"
                  style={{
                    transform: `translateY(-3.5px) rotate(${degrees.s}deg)`,
                  }}
                />
                {}
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full z-10" />
              </div>
              <p className="text-white/40 text-[10px] font-mono leading-none">
                {time ? formatIST(time) : "--:--:--"} IST
              </p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xl font-bold text-white tracking-tighter">
                1<sup className="text-[10px] text-blue-400 ml-0.5">YR</sup>
              </p>
              <p className="text-[9px] uppercase font-bold tracking-widest text-white/30">
                Exp
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white tracking-tighter">
                12<sup className="text-[10px] text-blue-400 ml-0.5">+</sup>
              </p>
              <p className="text-[9px] uppercase font-bold tracking-widest text-white/30">
                Projects
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-white/80 font-bold uppercase tracking-widest">
              Active
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
