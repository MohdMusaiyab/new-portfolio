"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

const CHARCOAL = "#0a0a0a";
const WHITE = "#ffffff";
const WA = (a: number) => `rgba(255,255,255,${a})`;

export default function GithubActivity() {
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-60px" });
  const calendarInView = useInView(calendarRef, {
    once: false,
    margin: "-60px",
  });

  const customTheme = {
    light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
    dark: [
      "rgba(255,255,255,0.05)",
      "rgba(255,255,255,0.2)",
      "rgba(255,255,255,0.4)",
      "rgba(255,255,255,0.7)",
      "#ffffff",
    ],
  };

  return (
    <section
      id="github-activity"
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ background: CHARCOAL }}
    >
      <div
        className="absolute left-[80%] top-[10%] w-[30%] h-[40%] pointer-events-none rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
      />

      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 md:mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h3
              className="font-cinzel font-bold text-3xl md:text-4xl leading-none transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-default"
              style={{
                color: WHITE,
                letterSpacing: "0.02em",
              }}
            >
              Open Source Activity
            </h3>
          </div>
          <p
            className="font-dm-mono text-[11px] tracking-widest max-w-[200px] md:text-right leading-relaxed"
            style={{ color: WA(0.3) }}
          >
            Every day is a chance to build something new.
          </p>
        </motion.div>

        <motion.div
          ref={calendarRef}
          initial={{ opacity: 0, y: 30 }}
          animate={calendarInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="w-full flex items-center justify-center overflow-x-auto scrollbar-none pb-4"
        >
          <div className="min-w-[800px] p-8 border border-white/5 bg-white/2 transition-colors duration-500 hover:border-white/20 hover:bg-white/4 group rounded-sm">
            <GitHubCalendar
              username="MohdMusaiyab"
              colorScheme="dark"
              theme={customTheme}
              blockSize={14}
              blockMargin={5}
              fontSize={12}
              style={{
                fontFamily: "'DM Mono', monospace",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
