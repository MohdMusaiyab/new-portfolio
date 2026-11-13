"use client";

/**
 * Education Section (Default / Light Theme)
 *
 * Aesthetic:
 *   - Editorial dossier with line-art styling matching the cartoon builder banner.
 *   - Dark-green ink (#2b3a2f), low roundedness (rounded-md), hard offset shadows.
 *   - Compact by default: Institution name, schooling year, degree, and percentage badge.
 *   - Interactive disclosure: Expands on click to reveal detailed accomplishments and accolades.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import educationData from "@/app/data/education.json";
import { GraduationCap, ChevronDown } from "lucide-react";

const INK = "#2b3a2f";

export default function DefaultEducation() {
  const reduce = useReducedMotion();
  // State for which education item is currently expanded (null = none expanded)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Reverse chronological order (latest academic qualification first)
  const sorted = [...educationData.education].reverse();

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="education"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading with Icon Pill */}
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
        </div>

        {/* Compressed Interactive Education Accordion */}
        <div className="space-y-3.5">
          {sorted.map((edu, idx) => {
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
                {/* Clickable Header Row: Institution Name, Degree, Percentage, Duration */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer select-none transition-colors hover:bg-[#2b3a2f]/[0.02]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Institution Logo Box with Hard Ink Border */}
                    <div
                      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md border bg-white shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-[1px_1px_0_0_#2b3a2f]"
                      style={{ borderColor: INK }}
                    >
                      {edu.logo ? (
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-sm font-bold text-[#2b3a2f]">
                          {edu.institution.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Institution Name & Degree Qualification */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] tracking-tight">
                          {edu.institution}
                        </h3>
                        {/* Compact Percentage / Score Badge visible in collapsed state */}
                        {edu.score && (
                          <span
                            className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ffd23f]/30 text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f]"
                            style={{ borderColor: INK }}
                          >
                            {edu.score}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-[13px] font-medium text-[#2b3a2f]/70 truncate mt-0.5 group-hover:text-[#2b3a2f] transition-colors duration-200">
                        {edu.degree}
                      </p>
                    </div>
                  </div>

                  {/* Right Metadata: Year of Schooling, Mobile Score Pill, and Interactive Chevron */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 pl-3">
                    <div className="flex flex-col items-end text-right font-mono text-[11px] sm:text-xs">
                      <span className="font-bold text-[#2b3a2f] tabular-nums">
                        {edu.startYear} — {edu.endYear}
                      </span>
                      {/* Mobile view percentage badge */}
                      {edu.score && (
                        <span
                          className="sm:hidden mt-0.5 inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#ffd23f]/30 text-[#2b3a2f] border"
                          style={{ borderColor: INK }}
                        >
                          {edu.score}
                        </span>
                      )}
                    </div>

                    {/* Expand/Collapse Chevron Indicator */}
                    <div
                      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-transform duration-200 shadow-[1px_1px_0_0_#2b3a2f] ${
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

                {/* Collapsible Academic Scope & Achievements Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={
                        reduce ? { opacity: 1 } : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }
                      }
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: `${INK}20` }}
                    >
                      <div className="p-4 sm:p-5 bg-white sm:pl-16">
                        {/* Detailed Bullet Highlights */}
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="space-y-2.5 mb-3">
                            {edu.highlights.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="group/item flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/75 font-normal transition-all duration-150 hover:text-[#2b3a2f] hover:translate-x-1"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-[1px] bg-[#2b3a2f]/35 group-hover/item:bg-[#ffd23f] group-hover/item:shadow-[1px_1px_0_0_#2b3a2f] mt-1.5 shrink-0 transition-all duration-150"
                                  aria-hidden
                                />
                                <span className="transition-colors duration-150">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Full Grade Summary in Expanded Panel */}
                        {edu.score && (
                          <div className="mt-3.5 pt-3 border-t border-[#2b3a2f]/10 flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 font-semibold">
                              Score:
                            </span>
                            <span
                              className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold bg-[#ffd23f]/25 text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f]"
                              style={{ borderColor: INK }}
                            >
                              {edu.score}
                            </span>
                          </div>
                        )}
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
