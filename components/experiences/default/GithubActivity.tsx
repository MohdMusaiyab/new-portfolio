"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit } from "lucide-react";

export default function DefaultGithubActivity() {
  const customTheme = {
    light: ["#f5f5f4", "#e7e5e4", "#a8a29e", "#57534e", "#1c1917"],
    dark: ["#f5f5f4", "#e7e5e4", "#a8a29e", "#57534e", "#1c1917"],
  };

  return (
    <section id="github-activity" className="w-full py-12 sm:py-16 px-5 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GitCommit size={14} className="text-stone-400" />
            <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
              Contribution Graph
            </h2>
          </div>
          <a
            href="https://github.com/MohdMusaiyab"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-dm-mono text-stone-500 hover:text-stone-900 transition-colors"
          >
            github.com/MohdMusaiyab
          </a>
        </div>

        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="p-4 sm:p-5 rounded-lg border border-stone-200/80 bg-white/70 overflow-x-auto scrollbar-none shadow-2xs"
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
                fontFamily: "var(--font-dm-mono), monospace",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
