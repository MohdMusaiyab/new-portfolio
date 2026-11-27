"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit, ArrowUpRight } from "lucide-react";

export default function DefaultGithubActivity() {
  const reduce = useReducedMotion();
  const customTheme = {
    light: ["#f4f4f5", "#d1fae5", "#6ee7b7", "#10b981", "#047857"],
    dark: ["#f4f4f5", "#d1fae5", "#6ee7b7", "#10b981", "#047857"],
  };

  return (
    <section id="github-activity" className="w-full py-16 sm:py-20 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Contribution Activity
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Consistent open-source telemetry and development cadence.
            </p>
          </div>
          <a
            href="https://github.com/MohdMusaiyab"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <span>MohdMusaiyab</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="mt-8 rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 overflow-x-auto shadow-xs"
        >
          <div className="min-w-[680px]">
            <GitHubCalendar
              username="MohdMusaiyab"
              colorScheme="light"
              theme={customTheme}
              blockSize={12}
              blockMargin={4}
              fontSize={11}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#52525b",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
