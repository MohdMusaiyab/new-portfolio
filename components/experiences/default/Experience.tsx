"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";

const INK = "#2b3a2f";

export default function DefaultExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="experience" className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#fdfbf7] border-t border-[#2b3a2f]/10">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading matching Hero Vibe */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <Briefcase size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Work Experience
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/50">
            Click row to expand
          </span>
        </div>

        {/* Compressed Experience Cards List */}
        <div className="space-y-3.5">
          {experienceData.experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className={`group rounded-md border-2 bg-white text-[#2b3a2f] transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "shadow-[3px_3px_0_0_#2b3a2f]"
                    : "hover:shadow-[3px_3px_0_0_#2b3a2f] hover:-translate-y-0.5 shadow-[1px_1px_0_0_#2b3a2f]"
                }`}
                style={{ borderColor: INK }}
              >
                {/* Clickable Header Row: Company, Logo, Duration */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer select-none transition-colors hover:bg-[#2b3a2f]/[0.02]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Logo Box */}
                    <div
                      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md border bg-white shrink-0 overflow-hidden flex items-center justify-center p-1.5"
                      style={{ borderColor: INK }}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-sm font-bold text-[#2b3a2f]">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Company Name & Position Summary */}
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] truncate tracking-tight">
                        {exp.company}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-medium text-[#2b3a2f]/70 truncate">
                        {exp.position}
                      </p>
                    </div>
                  </div>

                  {/* Right Meta: Duration, Location & Caret */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-3">
                    <div className="flex flex-col items-end text-right font-mono text-[11px] sm:text-xs">
                      <span className="font-bold text-[#2b3a2f] tabular-nums">
                        {exp.duration.start} — {exp.duration.end}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#2b3a2f]/55 flex items-center gap-1">
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Expand/Collapse Chevron */}
                    <div
                      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-transform duration-200 ${
                        isExpanded
                          ? "rotate-180 bg-[#ffd23f] text-[#2b3a2f]"
                          : "bg-white text-[#2b3a2f]/70 group-hover:text-[#2b3a2f]"
                      }`}
                      style={{ borderColor: INK }}
                    >
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Details Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: `${INK}20` }}
                    >
                      <div className="p-4 sm:p-5 bg-[#faf8f5]/60 pl-16 sm:pl-19">
                        {/* Key Highlights */}
                        <div className="mb-4">
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 mb-2 font-semibold">
                            Key Accomplishments &amp; Systems Scope
                          </span>
                          <ul className="space-y-1.5 list-disc list-outside ml-3">
                            {exp.highlights.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/80 font-normal marker:text-[#2b3a2f]/40"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech & Competency Badges */}
                        <div>
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 mb-2 font-semibold">
                            Technologies &amp; Competencies
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {exp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f] hover:bg-[#ffd23f] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all duration-150 cursor-default select-none"
                                style={{ borderColor: INK }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
