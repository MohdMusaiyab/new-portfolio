"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

export default function DefaultGithubActivity() {
  const customTheme = {
    light: ["#f3f4f6", "#ccfbf1", "#5eead4", "#14b8a6", "#0f766e"],
    dark: ["#f3f4f6", "#ccfbf1", "#5eead4", "#14b8a6", "#0f766e"],
  };

  return (
    <section
      id="github-activity"
      className="relative w-full bg-[#fdfbf7] pb-20 md:pb-32 text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-[#fdfbf7]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-16 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-10 md:w-12 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
                Open Source
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              GitHub <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
                Activity.
              </span>
            </h3>
          </div>
          <p className="max-w-[38ch] text-[#57534e] text-sm md:text-base lg:text-lg font-light leading-relaxed pb-2">
            Every day is a chance to build something new.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="w-full flex justify-center overflow-x-auto border-t-2 border-[#1c1917] pt-12 pb-4 scrollbar-none"
        >
          <div className="min-w-[800px] p-8 border border-[#0d9488]/20 bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-[0_10px_30px_-15px_rgba(13,148,136,0.15)] transition-all duration-500 hover:border-[#0d9488]/40 hover:shadow-[0_15px_40px_-15px_rgba(13,148,136,0.25)]">
            <GitHubCalendar
              username="MohdMusaiyab"
              colorScheme="light"
              theme={customTheme}
              blockSize={14}
              blockMargin={5}
              fontSize={12}
              style={{
                fontFamily: "inherit",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
