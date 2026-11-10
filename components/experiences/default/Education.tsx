"use client";

import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";
import { GraduationCap } from "lucide-react";

const INK = "#2b3a2f";

export default function DefaultEducation() {
  const sorted = [...educationData.education].reverse();

  return (
    <section id="education" className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#fdfbf7] border-t border-[#2b3a2f]/10">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <GraduationCap size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Education
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/50">
            Academic Background
          </span>
        </div>

        {/* Education Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {sorted.map((edu, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-md border-2 bg-white text-[#2b3a2f] p-4 sm:p-5 shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[3px_3px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: INK }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] tracking-tight">
                  {edu.institution}
                </h3>
                <span className="text-[11px] font-mono font-bold text-[#2b3a2f]/70 tabular-nums">
                  {edu.startYear} — {edu.endYear}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#2b3a2f]/80 font-medium mb-3">
                {edu.degree}
              </p>

              {edu.score && (
                <div
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ffd23f]/30 text-[#2b3a2f] border mb-3"
                  style={{ borderColor: INK }}
                >
                  Score: {edu.score}
                </div>
              )}

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="space-y-1 pl-3 border-l-2" style={{ borderColor: `${INK}30` }}>
                  {edu.highlights.map((h, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-[11px] sm:text-[12px] leading-relaxed text-[#2b3a2f]/75"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
