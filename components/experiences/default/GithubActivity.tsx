"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit } from "lucide-react";

const INK = "#2b3a2f";

export default function DefaultGithubActivity() {
  const customTheme = {
    light: ["#f5f5f4", "#d7ead0", "#a8d672", "#4fb3d9", "#2b3a2f"],
    dark: ["#f5f5f4", "#d7ead0", "#a8d672", "#4fb3d9", "#2b3a2f"],
  };

  return (
    <section id="github-activity" className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <GitCommit size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Contribution Activity
            </h2>
          </div>
          <a
            href="https://github.com/MohdMusaiyab"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono font-bold text-[#2b3a2f] hover:text-[#4fb3d9] transition-colors"
          >
            github.com/MohdMusaiyab ↗
          </a>
        </div>

        {/* Activity Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="rounded-md border-2 bg-white p-4 sm:p-6 overflow-x-auto scrollbar-none shadow-[2px_2px_0_0_#2b3a2f] hover:shadow-[3px_3px_0_0_#2b3a2f] transition-all duration-200"
          style={{ borderColor: INK }}
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
                color: INK,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
