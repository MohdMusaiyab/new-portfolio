"use client";

/**
 * Education Section (Default / Light Theme)
 *
 * Aesthetic:
 *   - Tactile neo-craft dossier matching Hero & Experience sections.
 *   - Vibrant Hero-inspired titlebars (River Blue & Sun Yellow).
 *   - Clear typography hierarchy: Degree title, institution subtitle, score chip.
 *   - Clean 1px hairline internal dividers with restrained outer ink borders.
 *   - Generous bullet readability (14.5px) with subtle hover enlargement.
 *   - Accessible motion with prefers-reduced-motion compliance.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import educationData from "@/app/data/education.json";
import { GraduationCap, ChevronDown } from "lucide-react";

const INK = "#2b3a2f";
const EASE = [0.16, 1, 0.3, 1] as const;

/* Palette matching the Hero banner world */
const BANNER_COLORS = [
  "#4fb3d9", // River Blue
  "#ffd23f", // Sun Yellow
  "#a8d672", // Foliage Green
  "#ff9aa2", // Blossom Coral
  "#c77dff", // Lavender
  "#f4a259", // Warm Peach
];

export default function DefaultEducation() {
  const reduce = useReducedMotion();
  // Latest qualification expanded by default for instant readability
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Reverse chronological order (latest academic qualification first)
  const sorted = [...educationData.education].reverse();

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  /* Smooth decelerated card entrance */
  const cardVariant: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: reduce ? 0 : i * 0.1,
        ease: EASE,
      },
    }),
  };

  return (
    <section
      id="education"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
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
        </div>

        {/* Education Cards */}
        <div className="space-y-4 sm:space-y-5">
          {sorted.map((edu, idx) => {
            const isExpanded = expandedIndex === idx;
            const headerColor = BANNER_COLORS[idx % BANNER_COLORS.length];

            return (
              <motion.article
                key={idx}
                custom={idx}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className={`group rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? "shadow-[4px_4px_0_0_#2b3a2f]"
                    : "shadow-[2.5px_2.5px_0_0_#2b3a2f] hover:shadow-[4px_4px_0_0_#2b3a2f] hover:-translate-y-0.5"
                }`}
                style={{ borderColor: INK }}
              >
                {/* Hero-matched Themed Titlebar */}
                <div
                  className="border-b px-3.5 sm:px-4 py-2 flex items-center justify-between select-none"
                  style={{ borderColor: `${INK}20`, backgroundColor: headerColor }}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f] truncate">
                    {edu.institution}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#2b3a2f] tabular-nums shrink-0 ml-2">
                    {edu.startYear} — {edu.endYear}
                  </span>
                </div>

                {/* Main Interactive Header Row */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer select-none transition-colors hover:bg-[#2b3a2f]/[0.02]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Institution Logo Box with Clean 1px Ink Border */}
                    <div
                      className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-md border bg-white shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-[1px_1px_0_0_#2b3a2f] transition-transform duration-150 group-hover:scale-105"
                      style={{ borderColor: INK }}
                    >
                      {edu.logo ? (
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-base font-bold text-[#2b3a2f]">
                          {edu.institution.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Degree Title & Score */}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#2b3a2f] tracking-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        <span className="text-xs sm:text-[13px] font-medium text-[#2b3a2f]/70">
                          {edu.institution}
                        </span>
                        {edu.score && (
                          <>
                            <span className="text-[#2b3a2f]/30">•</span>
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold bg-[#ffd23f]/30 text-[#2b3a2f] border border-[#2b3a2f]/20 shadow-[1px_1px_0_0_#2b3a2f]"
                            >
                              {edu.score}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Chevron Indicator */}
                  <div className="pl-3 shrink-0">
                    <div
                      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all duration-200 shadow-[1px_1px_0_0_#2b3a2f] ${
                        isExpanded
                          ? "rotate-180 bg-[#ffd23f] text-[#2b3a2f]"
                          : "bg-white text-[#2b3a2f]/70 group-hover:text-[#2b3a2f] group-hover:bg-[#f8fafc]"
                      }`}
                      style={{ borderColor: INK }}
                      aria-hidden
                    >
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Academic Highlights Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: `${INK}15` }}
                    >
                      <div className="p-4 sm:p-5 bg-white sm:pl-16">
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="space-y-2.5">
                            {edu.highlights.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="group/item flex items-start gap-2.5 text-sm sm:text-[14.5px] leading-relaxed text-[#2b3a2f]/80 font-normal transition-all duration-150 origin-left hover:text-[#2b3a2f] hover:scale-[1.015] hover:translate-x-1"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-[1px] bg-[#2b3a2f] group-hover/item:bg-[#ffd23f] group-hover/item:shadow-[1px_1px_0_0_#2b3a2f] mt-2 shrink-0 transition-all duration-150"
                                  aria-hidden
                                />
                                <span className="transition-colors duration-150">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
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
