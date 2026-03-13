"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "API Design Specialist",
  "Backend Architect",
  "Full Stack Engineer",
  "Distributed Systems",
];

export default function WaterSandHero() {
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
    <section className="relative min-h-screen w-full flex flex-col font-sans overflow-hidden bg-[#fdfbf7]">
      {/* Background Image - Sharp and more visible */}
      <div className="absolute inset-0 z-0 opacity-80 transition-opacity duration-1000">
        <Image
          src="/default.png"
          alt="Mohd Musaiyab Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Horizon/Water Surface Effect Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Top Half (Water/Sky) */}
        <div className="absolute top-0 w-full h-1/2 bg-linear-to-b from-[#0d9488]/10 via-[#0d9488]/5 to-transparent" />
        {/* Bottom Half (Sand) */}
        <div className="absolute bottom-0 w-full h-1/2 bg-linear-to-t from-[#f5f5dc] via-[#fdfbf7]/80 to-transparent" />
        {/* Surface Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-[#0d9488]/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-5 py-24 text-center">
        {/* Floating/Submerged Name */}
        <div className="relative group mb-12">
          {/* Water reflection effect for the name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.2 },
              y: { 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-9xl font-black tracking-tighter leading-none select-none text-[#0d9488] relative z-20"
            style={{
              WebkitTextStroke: "1.5px white",
              maskImage: "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.3) 100%)",
            }}
          >
            Mohd <br className="sm:hidden" /> Musaiyab.
          </motion.h1>

          {/* Surface Ripples */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[120%] h-px bg-[#0d9488]/30 blur-sm z-15"
          />

          {/* Submerged Shadow/Reflection below */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-8 w-[80%] h-12 bg-[#0d9488]/20 blur-3xl rounded-full z-10"
          />
        </div>

        {/* Roles: Flowing Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative h-12 flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ width: [40, 60, 40] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-0.5 bg-[#0d9488]" 
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ x: 20, opacity: 0, filter: "blur(8px)" }}
                animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ x: -20, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-[#0d9488] drop-shadow-[0_2px_4px_rgba(13,148,136,0.15)]"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
            <motion.div 
              animate={{ width: [40, 60, 40] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-0.5 bg-[#0d9488]" 
            />
          </div>
        </motion.div>

        {/* Sand Section: Description and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-3xl space-y-12"
        >
          <p className="text-[#57534e] text-lg md:text-xl lg:text-2xl leading-relaxed italic font-light drop-shadow-sm">
            &ldquo;Crafting digital architectures that feel as natural as gravity and as fluid as the tides.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#projects"
              className="group relative px-10 py-5 bg-[#0d9488] text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-500 hover:scale-105 hover:rotate-2 shadow-[0_10px_40px_rgba(13,148,136,0.2)] hover:shadow-[#0d9488]/40 border border-[#0d9488]"
            >
              <span className="flex items-center gap-3">
                Dive In
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            
            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK || "/resume.pdf"}
              className="px-10 py-5 bg-white/40 backdrop-blur-md border border-[#0d9488]/20 text-[#1c1917] font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/80 hover:border-[#0d9488]/40 transition-all duration-500 hover:scale-105 hover:-rotate-2 shadow-sm"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Repositioned Info Box - Minimal and Grounded */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 bg-white/20 backdrop-blur-3xl px-8 py-4 rounded-full border border-white/30 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full border border-[#0d9488]/30 flex items-center justify-center bg-white/80 overflow-hidden">
            <motion.div
              className="absolute w-px h-4 bg-[#1c1917] origin-bottom"
              animate={{ rotate: degrees.h }}
            />
            <motion.div
              className="absolute w-[0.5px] h-5 bg-[#57534e] origin-bottom"
              animate={{ rotate: degrees.m }}
            />
            <motion.div
              className="absolute w-[0.5px] h-5 bg-[#0d9488] origin-bottom"
              animate={{ rotate: degrees.s }}
            />
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-[#a8a29e] uppercase tracking-widest leading-none mb-1">IST (GMT+5:30)</p>
            <p className="text-sm font-black text-[#1c1917] font-mono leading-none">{time ? formatIST(time) : "00:00:00"}</p>
          </div>
        </div>

        <div className="w-px h-6 bg-[#e7e5e4]" />

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-[#57534e]">Active in Noida, IN</span>
        </div>
      </motion.div>
    </section>
  );
}
