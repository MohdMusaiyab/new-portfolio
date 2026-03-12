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
    <section className="relative min-h-screen flex items-center justify-start p-6 md:p-12 lg:px-24 lg:py-12 font-sans text-[#292524] overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/default.png"
          alt="Mohd Musaiyab Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        {/* Gradient Overlay for Text Readability - Beige to Cyan blend */}
        <div className="absolute inset-0 bg-linear-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/80 to-[#0d9488]/30 z-10" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full max-w-2xl transform lg:-translate-y-8">
        <div className="flex flex-col">
          <h1 className="text-[clamp(3.5rem,12vmin,8rem)] font-extrabold tracking-tighter leading-[0.9] mb-4 md:mb-6 drop-shadow-sm text-[#1c1917]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              Mohd
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              Musaiyab
            </motion.div>
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-4 h-8 overflow-hidden mb-6"
          >
            <div className="w-8 h-[2px] bg-[#0d9488]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="text-base md:text-xl font-medium text-[#57534e] uppercase tracking-wider drop-shadow-sm"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#57534e] text-base md:text-lg lg:text-xl leading-relaxed max-w-[45ch] mb-10 drop-shadow-sm font-light"
          >
            I&apos;m a backend-heavy full stack engineer focused on robust
            infrastructure. Currently specializing in scalable architectures and
            performant web products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="bg-[#1c1917] text-white px-8 py-4 rounded-xl text-sm md:text-base font-bold transition-all hover:scale-[1.02] shadow-xl hover:shadow-[#1c1917]/20"
            >
              View Projects ↗
            </a>
            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK || "/resume.pdf"}
              target="blank"
              className="bg-white/60 backdrop-blur-md border border-[#0d9488]/20 px-8 py-4 rounded-xl text-sm md:text-base font-bold text-[#0d9488] hover:bg-white/90 hover:border-[#0d9488]/40 transition-all hover:scale-[1.02] shadow-[0_4px_20px_-4px_rgba(13,148,136,0.15)]"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-6 bg-[#fdfbf7]/80 backdrop-blur-xl border border-[#e7e5e4] rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
      >
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            Location
          </p>
          <p className="text-[#1c1917] font-bold text-base">INDIA</p>
          <div className="flex items-center gap-3 mt-1 group cursor-default">
            {/* Clock Face */}
            <div className="relative w-5 h-5 rounded-full border border-[#0d9488]/40 flex items-center justify-center bg-white shadow-inner group-hover:border-[#0d9488]/80 group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(13,148,136,0.2)] transition-all duration-300">
              {/* Hours */}
              <div
                className="absolute w-[2px] h-[5px] bg-[#1c1917] origin-bottom rounded-full"
                style={{
                  transform: `translateY(-2.5px) rotate(${degrees.h}deg)`,
                }}
              />
              {/* Minutes */}
              <div
                className="absolute w-[1.5px] h-[7px] bg-[#57534e] origin-bottom rounded-full"
                style={{
                  transform: `translateY(-3.5px) rotate(${degrees.m}deg)`,
                }}
              />
              {/* Seconds */}
              <div
                className="absolute w-px h-[9px] bg-[#0d9488] origin-bottom rounded-full"
                style={{
                  transform: `translateY(-4.5px) rotate(${degrees.s}deg)`,
                }}
              />
              <div className="absolute w-[3px] h-[3px] bg-[#1c1917] rounded-full z-10" />
            </div>
            <p className="text-[#57534e] text-xs font-mono leading-none">
              {time ? formatIST(time) : "--:--:--"} IST
            </p>
          </div>
          <div className="h-12 w-px bg-[#e7e5e4]" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488] animate-pulse shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
            <span className="text-[10px] text-[#57534e] font-bold uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>
        <div className="h-12 w-px bg-[#e7e5e4]" />
        <div className="flex gap-4">
          <a
            href="https://github.com/MohdMusaiyab"
            target="_blank"
            aria-label="GitHub"
            className="group"
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
              className="text-[#57534e] group-hover:text-[#1c1917] transition-colors"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href={
              process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN ||
              "https://linkedin.com"
            }
            target="_blank"
            aria-label="LinkedIn"
            className="group"
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
              className="text-[#57534e] group-hover:text-[#0d9488] transition-colors"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_PERSONAL_TWITTER}
            target="_blank"
            aria-label="Twitter"
            className="group"
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
              className="text-[#57534e] group-hover:text-black transition-colors"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
