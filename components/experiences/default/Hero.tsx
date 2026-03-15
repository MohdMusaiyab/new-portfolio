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

const fadeUpVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const statusBarVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const roleVariant = {
  initial: { opacity: 0, y: 5, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, y: -5, filter: "blur(4px)" },
};

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

  const formatIST = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Asia/Kolkata",
    });

  const getISTDegrees = (d: Date | null) => {
    if (!d) return { h: 0, m: 0, s: 0 };
    const ist = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const s = ist.getSeconds(), m = ist.getMinutes(), h = ist.getHours();
    return { s: s * 6, m: m * 6 + s * 0.1, h: (h % 12) * 30 + m * 0.5 };
  };

  const degrees = getISTDegrees(time);

  return (
    <>
      {/* Only keyframe animations and Google Fonts stay in <style> — unavoidable */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

        @keyframes float {
          0%   { transform: translateY(0px) rotate(-0.3deg); }
          30%  { transform: translateY(-10px) rotate(0.2deg); }
          60%  { transform: translateY(-16px) rotate(-0.15deg); }
          100% { transform: translateY(0px) rotate(-0.3deg); }
        }
        @keyframes rippleBar {
          0%, 100% { transform: translateX(-50%) scaleX(0.72); opacity: 0.45; }
          50%       { transform: translateX(-50%) scaleX(1.08); opacity: 0.18; }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(180,220,215,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(180,220,215,0); }
        }
        .name-float {
          animation: float 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          font-family: 'Cormorant Garamond', Georgia, serif;
          will-change: transform;
        }
      `}</style>

      {/* ── SECTION ── */}
      <section
        className="relative min-h-screen w-full flex flex-col overflow-hidden"
        style={{ background: "#EFE7DB" }}
      >

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/default.png"
            alt="Background"
            fill
            priority
            className="object-cover object-center opacity-[0.88]"
          />
        </div>

        {/* Mid-zone contrast scrim */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 5%, rgba(4,52,44,0.32) 28%, rgba(4,52,44,0.48) 50%, rgba(4,52,44,0.26) 66%, transparent 82%)",
          }}
        />

        {/* Bottom scrim */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none h-[42%]"
          style={{
            background:
              "linear-gradient(to top, rgba(4,52,44,0.38) 0%, rgba(4,52,44,0.18) 40%, transparent 100%)",
          }}
        />

        {/* Top water shimmer */}
        <div
          className="absolute top-0 w-full z-[2] pointer-events-none h-[48%]"
          style={{
            background: "linear-gradient(to bottom, rgba(110,167,163,0.07) 0%, transparent 100%)",
          }}
        />

        {/* Foam horizon line */}
        <div
          className="absolute z-[3] pointer-events-none"
          style={{
            top: "51%",
            left: "50%",
            width: "78%",
            height: "1.5px",
            background:
              "linear-gradient(to right, transparent, rgba(247,245,242,0.5) 25%, rgba(242,246,244,0.75) 50%, rgba(247,245,242,0.5) 75%, transparent)",
            animation: "rippleBar 5s ease-in-out infinite",
          }}
        />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">

          {/* NAME */}
          <div className="relative mb-5 sm:mb-6 w-full">
            <h1
              className="name-float select-none leading-[0.88] tracking-tight w-full inline-block"
              style={{
                fontSize: "clamp(3.2rem, 11.5vw, 9rem)",
                fontWeight: 800,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#F4ECE1",
                WebkitTextStroke: "1.8px rgba(255,255,255,0.6)",
                textShadow: `
                  2px  2px 0 rgba(4,52,44,0.95),
                 -1px -1px 0 rgba(4,52,44,0.85),
                  1px -1px 0 rgba(4,52,44,0.85),
                 -1px  1px 0 rgba(4,52,44,0.85),
                  0    5px 20px rgba(4,52,44,0.75),
                  0   10px 45px rgba(15,110,86,0.4),
                  0    0   70px rgba(93,202,165,0.1)
                `,
              }}
            >
              Mohd Musaiyab
            </h1>

            {/* Ripple beneath name */}
            <div
              className="absolute -bottom-2 left-1/2 pointer-events-none h-px"
              style={{
                transform: "translateX(-50%)",
                width: "52%",
                background:
                  "linear-gradient(to right, transparent, rgba(155,200,195,0.55) 30%, rgba(242,246,244,0.7) 50%, rgba(155,200,195,0.55) 70%, transparent)",
                animation: "rippleBar 4.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* ROLES PILL */}
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full justify-center">
            <div
              className="flex-shrink-0 rounded-sm"
              style={{ width: "clamp(24px, 4vw, 44px)", height: "1.5px", background: "rgba(155,200,195,0.75)" }}
            />

            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                variants={roleVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="uppercase whitespace-nowrap font-bold tracking-[0.2em] backdrop-blur-sm"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.58rem, 1.4vw, 0.82rem)",
                  background: "rgba(4,52,44,0.62)",
                  WebkitBackdropFilter: "blur(14px)",
                  color: "#9BC8C3",
                  border: "0.5px solid rgba(155,200,195,0.38)",
                  padding: "5px 16px",
                  borderRadius: 999,
                }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>

            <div
              className="flex-shrink-0 rounded-sm"
              style={{ width: "clamp(24px, 4vw, 44px)", height: "1.5px", background: "rgba(155,200,195,0.75)" }}
            />
          </div>

          {/* QUOTE + CTAs */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85, duration: 0.7 }}
            className="w-full max-w-2xl space-y-8 sm:space-y-10 px-2"
          >
            {/* Quote */}
            <p
              className="italic font-light leading-relaxed tracking-[0.01em]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.9vw, 1.12rem)",
                color: "rgba(244,236,225,0.92)",
                textShadow: "0 1px 8px rgba(4,52,44,0.8), 0 2px 20px rgba(4,52,44,0.5)",
              }}
            >
              &ldquo;Crafting digital architectures that feel as natural as gravity and as fluid as the tides.&rdquo;
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">

              {/* Primary CTA — hover via Framer Motion replacing CSS class */}
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 18px 50px rgba(15,110,86,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-3 rounded-2xl font-bold uppercase tracking-widest"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.25rem)",
                  fontSize: "clamp(0.65rem, 1.3vw, 0.8rem)",
                  background: "#0F6E56",
                  color: "#F4ECE1",
                  border: "1px solid rgba(93,202,165,0.28)",
                  boxShadow: "0 8px 32px rgba(4,52,44,0.4)",
                }}
              >
                Dive In
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href={process.env.NEXT_PUBLIC_RESUME_LINK || "/resume.pdf"}
                whileHover={{
                  scale: 1.05,
                  rotate: -1,
                  background: "rgba(255,255,255,0.22)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl font-bold uppercase tracking-widest backdrop-blur-md"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.25rem)",
                  fontSize: "clamp(0.65rem, 1.3vw, 0.8rem)",
                  background: "rgba(4,52,44,0.42)",
                  color: "#F4ECE1",
                  border: "1px solid rgba(244,236,225,0.25)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <motion.div
          variants={statusBarVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-20
                     flex items-center gap-4 sm:gap-7
                     px-5 sm:px-7 py-2.5 sm:py-3
                     rounded-full whitespace-nowrap backdrop-blur-[36px]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "rgba(4,52,44,0.28)",
            WebkitBackdropFilter: "blur(36px)",
            border: "0.5px solid rgba(200,230,228,0.18)",
            boxShadow: "0 4px 24px rgba(4,52,44,0.18)",
          }}
        >

          {/* Analog clock */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="relative flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 32,
                height: 32,
                background: "rgba(244,236,225,0.92)",
                border: "0.5px solid rgba(110,167,163,0.5)",
              }}
            >
              {/* Hour hand */}
              <motion.div
                className="absolute origin-bottom rounded-sm"
                style={{ width: 1.5, height: 8, background: "#0F6E56", bottom: "50%" }}
                animate={{ rotate: degrees.h }}
                transition={{ type: "tween", ease: "linear", duration: 0.5 }}
              />
              {/* Minute hand */}
              <motion.div
                className="absolute origin-bottom rounded-sm"
                style={{ width: 1, height: 11, background: "#6EA7A3", bottom: "50%" }}
                animate={{ rotate: degrees.m }}
                transition={{ type: "tween", ease: "linear", duration: 0.5 }}
              />
              {/* Second hand */}
              <motion.div
                className="absolute origin-bottom rounded-sm"
                style={{ width: 0.75, height: 12, background: "#D85A30", bottom: "50%" }}
                animate={{ rotate: degrees.s }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
              />
              {/* Center dot */}
              <div className="absolute w-[3px] h-[3px] rounded-full bg-[#043424]" />
            </div>

            {/* Digital readout */}
            <div className="text-left">
              <p className="uppercase leading-none mb-[3px] tracking-[0.1em]"
                style={{ fontSize: 8, fontWeight: 700, color: "rgba(200,228,224,0.6)" }}>
                IST (GMT+5:30)
              </p>
              <p className="tabular-nums"
                style={{ fontSize: 12, fontWeight: 600, color: "#F4ECE1" }}>
                {time ? formatIST(time) : "00:00:00"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex-shrink-0 w-px h-[18px]" style={{ background: "rgba(200,228,224,0.15)" }} />

          {/* Active status */}
          <div className="flex items-center gap-2">
            <div
              className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{
                background: "#A8D8D2",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              className="uppercase tracking-[0.1em]"
              style={{ fontSize: 8, fontWeight: 700, color: "rgba(220,238,236,0.55)" }}
            >
              Active · INDIA
            </span>
          </div>

        </motion.div>
      </section>
    </>
  );
}