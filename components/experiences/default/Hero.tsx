"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Cpu, 
  MousePointer2,
  Code,
  MapPin,
  Clock,
  Cat
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   THEME & CONSTANTS
═══════════════════════════════════════════════════ */
const THEME = {
  bg: "#fdfbf7",
  card: "rgba(255,255,255,0.45)",
  cardStrong: "rgba(255,255,255,0.85)",
  border: "rgba(13,148,136,0.12)",
  accent: "#0d9488",
  text: "#1c1917",
  textSub: "#44403c",
  textMuted: "#78716c",
  shadow: "rgba(13,148,136,0.1)",
} as const;

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 0.1 * i, 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
};

/* ═══════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════ */

/**
 * Live Clock and Status Card
 * Features aggregate Glassmorphism + Neomorphism
 */
function StatusCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(istTime);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="relative group w-full lg:w-[420px]"
    >
      {/* Glow Backplate */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-3xl p-8 shadow-[20px_20px_60px_-15px_rgba(13,148,136,0.1),-10px_-10px_30px_rgba(255,255,255,0.8)]">
        {/* Time Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-2xl bg-teal-50 shadow-inner">
                <Clock size={20} className="text-teal-600" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-800/40">Current Time (IST)</p>
                <p className="text-3xl font-black tabular-nums tracking-tighter text-stone-900">{time || "00:00:00"}</p>
             </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-600/5 flex items-center justify-center animate-pulse">
             <div className="w-2 h-2 rounded-full bg-teal-500" />
          </div>
        </div>

        {/* Status Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <MapPin size={18} className="text-stone-400" />
             <span className="text-sm font-bold text-stone-600">Based in Delhi, India</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
             <span className="text-sm font-bold text-stone-600">Currently building premium UI systems</span>
          </div>
        </div>

        {/* Centered Profile Avatar (Neomorphic) */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#fdfbf7] p-3 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,1)]">
            <div className="w-full h-full rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-black">M</div>
        </div>
      </div>
    </motion.div>
  );
}

function PencilArrow() {
  return (
    <motion.svg
      width="100"
      height="45"
      viewBox="0 0 100 45"
      fill="none"
      className="absolute -bottom-12 -right-16 hidden lg:block"
    >
      <motion.path
        d="M5 5C15 15 65 35 95 40M95 40L80 32M95 40L83 48"
        stroke={THEME.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1.2 }}
      />
    </motion.svg>
  );
}

const HIGHLIGHTS = [
  { Icon: Code, title: "Full Stack", sub: "MERN Engineer" },
  { Icon: Cpu, title: "Architecture", sub: "Backend systems" },
  { Icon: MousePointer2, title: "UX Design", sub: "Bespoke craft" },
] as const;

function HighlightRow() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-4 lg:gap-12 w-full pt-4">
      {HIGHLIGHTS.map((c, i) => {
        const Icon = c.Icon;
        return (
          <motion.div
            key={c.title}
            custom={8 + i}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 35px -5px rgba(13,148,136,0.18)",
              borderColor: "rgba(13,148,136,0.3)" 
            }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-3 py-3 rounded-2xl border border-transparent cursor-default last:col-span-2 last:mx-auto md:last:col-span-1 md:last:mx-0 min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-teal-500/5 group-hover:scale-110 shrink-0">
                <Icon size={18} className="text-teal-600" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-black uppercase tracking-widest text-stone-900 leading-tight truncate">{c.title}</p>
              <p className="text-[10px] font-medium text-stone-400 tracking-wide uppercase truncate">{c.sub}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════ */
export default function Hero2() {
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK || "#";

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#fdfbf7] overflow-hidden py-16 px-6 md:px-12 lg:px-24">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
           animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-teal-50/50 rounded-full blur-[160px]" 
        />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="flex-1 flex flex-col gap-10 items-center lg:items-start text-center lg:text-left max-w-2xl">
            
            {/* Headline */}
            <motion.div custom={0} variants={fadeUp} initial="initial" animate="animate">
              <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.82] text-stone-900">
                Hello,<br />
                <span className="text-[0.6em] text-stone-400 font-extrabold mr-4">I&apos;m</span>
                <span className="text-[0.6em] bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800">Musaiyab.</span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <div className="relative max-w-lg">
              <motion.p
                custom={1} variants={fadeUp} initial="initial" animate="animate"
                className="text-base md:text-lg font-medium leading-relaxed text-stone-500"
              >
                Full Stack Developer specializing in <span className="text-teal-700 font-bold decoration-teal-200 decoration-2 underline underline-offset-4">MERN, Next.js, and Go</span>. 
                Focused on architectural web systems, robust API design, and creating scalable, premium digital experiences.
              </motion.p>
              <PencilArrow />
            </div>

            {/* Actions */}
            <motion.div
              custom={2} variants={fadeUp} initial="initial" animate="animate"
              className="w-full max-w-sm lg:max-w-none grid grid-cols-2 lg:flex lg:items-center gap-3 md:gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 30px rgba(13,148,136,0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 md:px-8 py-3 md:py-3.5 rounded-xl bg-teal-600 text-white text-[11px] md:text-[12px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 text-center"
              >
                Hire Expert
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-[11px] md:text-[12px] font-black uppercase tracking-widest hover:border-teal-500/30 hover:bg-teal-50/10 transition-all text-center"
              >
                Explore <Cat size={14} className="group-hover:rotate-12 transition-transform hidden sm:block" />
              </motion.a>
              <motion.a
                href={resumeLink}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -3 }}
                className="col-span-2 lg:col-auto mx-auto lg:mx-0 w-fit p-3.5 rounded-xl bg-stone-100 text-stone-500 hover:text-teal-600 transition-colors"
              >
                <Download size={18} />
              </motion.a>
            </motion.div>

            <HighlightRow />

            {/* Socials */}
            <motion.div
              custom={5} variants={fadeUp} initial="initial" animate="animate"
              className="flex items-center gap-4 py-4"
            >
              {[
                { Icon: Github, href: "https://github.com/musaiyab" },
                { Icon: Linkedin, href: "https://linkedin.com/in/musaiyab" },
                { Icon: Mail, href: "mailto:hello@musaiyab.com" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i} href={href} 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-teal-600 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: STATUS CARD */}
          <StatusCard />

        </div>
      </div>

      {/* Modern Scroll Reveal */}
      <motion.div
        animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-stone-500">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent" />
      </motion.div>

    </section>
  );
}
