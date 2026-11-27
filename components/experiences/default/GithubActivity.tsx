"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight } from "lucide-react";

export default function DefaultGithubActivity() {
  const reduce = useReducedMotion();
  const customTheme = {
    light: ["#f4f4f5", "#d1fae5", "#6ee7b7", "#10b981", "#047857"],
    dark: ["#f4f4f5", "#d1fae5", "#6ee7b7", "#10b981", "#047857"],
  };

  return (
    <section
      id="github-activity"
      className="w-full py-10 sm:py-14 bg-white border-b border-zinc-100"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-5 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-zinc-950 font-sans">
              Contribution Activity
            </h2>
          </div>
          <a
            href="https://github.com/MohdMusaiyab"
            target="_blank"
            rel="noreferrer"
            aria-label="View Mohd Musaiyab's GitHub Profile"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-mono font-medium text-zinc-600 hover:text-zinc-950 transition-colors py-1 px-2.5 rounded-lg border border-zinc-200/80 hover:border-zinc-300 bg-zinc-50/60"
          >
            <span>github.com/MohdMusaiyab</span>
            <ArrowUpRight size={12} className="text-zinc-400" />
          </a>
        </div>

        {/* Calendar Card (Optimized for Mobile Touch Scrolling & Crisp Fonts) */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="mt-6 sm:mt-7 rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5.5 shadow-2xs"
        >
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent touch-pan-x [-webkit-overflow-scrolling:touch]">
            <div className="min-w-[680px]">
              <GitHubCalendar
                username="MohdMusaiyab"
                colorScheme="light"
                theme={customTheme}
                blockSize={12}
                blockMargin={3.5}
                fontSize={12}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#52525b",
                }}
              />
            </div>
          </div>

          {/* Mobile Swipe Guidance Footer */}
          <div className="flex sm:hidden items-center justify-between pt-3 mt-1 border-t border-zinc-100 text-[11px] font-mono text-zinc-400">
            <span>← Swipe to explore calendar →</span>
            <span>365 Days</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
